# Documentação da Implementação do Sistema de Login

Neste documento, registramos o que foi efetivamente implementado no projeto, seguindo a arquitetura proposta em `Login.md`.

## 1. Banco de Dados (`prisma/schema.prisma`)
O modelo `User` foi atualizado para suportar novos controles de segurança e gerenciamento de tokens. Foram incluídas as seguintes colunas:
- `role`: (`String`, default `"USER"`) Controle de perfil de acesso.
- `tokenHash`: (`String?`) Armazena o hash criptográfico do Refresh Token Opaque emitido ao usuário.
- `resetToken`: (`String?`) Armazena o código de 6 dígitos temporário gerado para recuperação de senha.
- `resetTokenExpires`: (`DateTime?`) Determina o tempo de vida do código de recuperação (15 minutos).
- `changePasswordNextLogin`: (`Boolean`, default `false`) Flag que, quando ativa, forçará o usuário a definir uma nova senha imediatamente após informar a senha atual.

---

## 2. Backend (Node.js + Express)
O backend foi ajustado para receber requisições de autenticação e emitir e tratar os novos tokens de segurança.

### Dependências Adicionadas
- `argon2`: Para a criptografia forte de senhas (hashing).
- `jsonwebtoken`: Para a geração de Access Tokens curtos e eficientes.
- `nodemailer`: Para gerenciar o disparo de e-mails na recuperação de senha.
- `cookie-parser`: Middleware configurado no `server.js` para manipulação segura do Refresh Token via Cookie `HttpOnly`.

### Rotas de Autenticação (`backend/src/routes/auth.routes.js`)
As seguintes rotas foram implementadas no contexto de `/api/auth`:
- **`POST /login`**: Recebe `email` e `password`. Verifica a credencial via Argon2 (com fallback temporário para transição da senha limpa "123"). Retorna o Access Token (JWT válido por 15m) e atribui o Refresh Token no Cookie (`HttpOnly`).
- **`POST /refresh`**: Lê o cookie `refreshToken`, converte em hash, valida com `tokenHash` no banco e, se válido, rotaciona ambos (devolve um novo Cookie e Access Token novo).
- **`POST /logout`**: Limpa o Cookie do navegador e anula o `tokenHash` correspondente no banco.
- **`POST /forgot-password`**: Identifica o usuário por `email`, gera um código de 6 dígitos, salva no banco e dispara o e-mail via Nodemailer (ambiente de testes `Ethereal`).
- **`POST /reset-password`**: Valida o código recebido no e-mail com o `resetToken` do banco de dados, caso válido, processa e criptografa a nova senha.
- **`POST /force-reset-password`**: Rota especial que permite a redefinição obrigatória da senha quando a flag `changePasswordNextLogin` é detectada no momento do `/login`.

---

## 3. Frontend (React + Vite)
O componente `frontend/src/pages/Login.jsx` foi remodelado para gerenciar 4 sub-telas de forma contínua, sem necessidade de redirecionamentos adicionais entre páginas (`Single Page App`).

### Gerenciamento de Estados
O componente utiliza a variável de estado `view` para chavear entre:
1. **`login`**: Tela principal de acesso. Se a API responder com `mustChangePassword`, o frontend redireciona a visualização para `force_reset`. Caso tudo esteja correto, armazena o `accessToken` e navega para `/dashboard`.
2. **`forgot`**: Formulário de recuperação solicitando apenas o e-mail. Ao enviar, vai para o estado `reset`.
3. **`reset`**: Formulário para inserção do Código de 6 dígitos + Nova Senha. Após a troca, volta ao fluxo `login`.
4. **`force_reset`**: Tela de bloqueio obrigatório. Solicita a Nova Senha utilizando a validação em segundo plano com a senha anterior para autorizar a operação na rota `/force-reset-password`.

A tela de pós-login (`Dashboard.jsx`) também foi criada e configurada nas rotas do sistema.
