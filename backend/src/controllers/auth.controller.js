const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const z = require('zod');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Configuração do Nodemailer (usando ethereal email para dev)
let transporter;
nodemailer.createTestAccount().then(account => {
  transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });
});

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Usaremos bcrypt para o seed anterior, mas o projeto fala em argon2
    // Se a senha do seed foi criptografada como bcrypt/argon2?
    // A senha do seed foi colocada direto "123". Não usamos hash lá. 
    // Vamos fazer um mock para poder aceitar '123' sem hash APENAS no dev,
    // ou assumimos argon2 puro se estivesse hasheada.
    
    // Tratativa para senhas texto-plano temporária do Seed:
    let passwordValid = false;
    if (user.password === password) {
      // Atualiza o hash no banco para futuras autenticações (migração transparente)
      const newHash = await argon2.hash(password);
      await prisma.user.update({ where: { id: user.id }, data: { password: newHash } });
      passwordValid = true;
    } else {
      try {
        passwordValid = await argon2.verify(user.password, password);
      } catch (e) {
        passwordValid = false;
      }
    }

    if (!passwordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    if (user.changePasswordNextLogin) {
      return res.json({ mustChangePassword: true, message: 'É obrigatório alterar a senha' });
    }

    // Access Token (15 min)
    const accessToken = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });

    // Refresh Token Opaque
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    await prisma.user.update({
      where: { id: user.id },
      data: { tokenHash }
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    res.json({ accessToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ error: 'Não autenticado' });

    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const user = await prisma.user.findFirst({ where: { tokenHash } });

    if (!user) {
      res.clearCookie('refreshToken');
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Rotação
    const newRefreshToken = crypto.randomBytes(40).toString('hex');
    const newTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
    
    await prisma.user.update({ where: { id: user.id }, data: { tokenHash: newTokenHash } });

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      await prisma.user.updateMany({
        where: { tokenHash },
        data: { tokenHash: null }
      });
    }
    res.clearCookie('refreshToken');
    res.json({ message: 'Logout efetuado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    const resetTokenExpires = new Date(Date.now() + 15 * 60000); // 15 min

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires }
    });

    if (transporter) {
      const info = await transporter.sendMail({
        from: '"Simplifisca" <no-reply@simplifisca.com>',
        to: user.email,
        subject: "Recuperação de Senha",
        text: `Seu código de recuperação é: ${resetToken}`,
        html: `<b>Seu código de recuperação é: ${resetToken}</b>`,
      });
      console.log("E-mail de recuperação enviado! URL: %s", nodemailer.getTestMessageUrl(info));
    }

    res.json({ message: 'Código de recuperação enviado para o seu e-mail' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar código' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.resetToken !== code || new Date() > user.resetTokenExpires) {
      return res.status(400).json({ error: 'Código inválido ou expirado' });
    }

    const newHash = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { 
        password: newHash, 
        resetToken: null, 
        resetTokenExpires: null,
        changePasswordNextLogin: false // Limpa se estiver forçando troca
      }
    });

    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alterar senha' });
  }
};

exports.forceResetPassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inv�lidas' });
    let passwordValid = false;
    if (user.password === currentPassword) passwordValid = true;
    else {
      try { passwordValid = await argon2.verify(user.password, currentPassword); } catch (e) {}
    }
    if (!passwordValid) return res.status(401).json({ error: 'Credenciais inv�lidas' });
    if (!user.changePasswordNextLogin) return res.status(400).json({ error: 'Usu�rio n�o precisa for�ar troca' });
    const newHash = await argon2.hash(newPassword);
    await prisma.user.update({ where: { id: user.id }, data: { password: newHash, changePasswordNextLogin: false } });
    res.json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
