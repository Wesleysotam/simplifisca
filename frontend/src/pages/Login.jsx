import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, Lock, Unlock, Loader2 } from 'lucide-react';

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.72 17.56V20.31H19.28C21.36 18.39 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12 23C14.97 23 17.46 22.02 19.28 20.31L15.72 17.56C14.74 18.22 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.12H2.18V16.96C3.99 20.55 7.7 23 12 23Z" fill="#34A853"/>
    <path d="M5.84 14.12C5.62 13.46 5.49 12.75 5.49 12C5.49 11.25 5.62 10.54 5.84 9.88V7.04H2.18C1.43 8.53 1 10.21 1 12C1 13.79 1.43 15.47 2.18 16.96L5.84 14.12Z" fill="#FBBC05"/>
    <path d="M12 5.38C13.62 5.38 15.06 5.94 16.2 7.03L19.36 3.87C17.45 2.08 14.97 1 12 1C7.7 1 3.99 3.45 2.18 7.04L5.84 9.88C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EA4335"/>
  </svg>
);

function Login() {
  const navigate = useNavigate();
  const [view, setView] = useState('login'); // 'login', 'forgot', 'reset', 'force_reset'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const clearMessages = () => { setError(''); setMessage(''); };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3333/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Erro ao logar');
      
      if (data.mustChangePassword) {
        setView('force_reset');
        setMessage(data.message);
      } else {
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3333/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao solicitar');
      
      setMessage('Código enviado para seu e-mail!');
      setView('reset');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    clearMessages();
    if (newPassword !== confirmPassword) return setError('As senhas não coincidem');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3333/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao redefinir senha');
      
      setMessage('Senha alterada com sucesso! Faça login.');
      setView('login');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForceReset = async (e) => {
    e.preventDefault();
    clearMessages();
    if (newPassword !== confirmPassword) return setError('As senhas não coincidem');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3333/api/auth/force-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword: password, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao alterar senha');
      
      setMessage('Senha alterada com sucesso! Faça login com a nova senha.');
      setView('login');
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderErrorAndMessage = () => (
    <>
      {error && <div className="text-red-500 text-sm font-medium mb-4 text-center bg-red-50 p-2 rounded-xl border border-red-100">{error}</div>}
      {message && <div className="text-green-600 text-sm font-medium mb-4 text-center bg-green-50 p-2 rounded-xl border border-green-100">{message}</div>}
    </>
  );

  return (
    <div className="min-h-screen bg-bg-main p-6 sm:p-8 font-sans flex flex-col items-center">
      
      <div className="w-full max-w-md relative flex justify-center mt-2 mb-8">
        <button 
          onClick={() => {
            if (view !== 'login') { setView('login'); clearMessages(); }
            else navigate(-1);
          }} 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <div className="h-10" />
      </div>

      <main className="w-full max-w-md flex flex-col">
        {renderErrorAndMessage()}

        {/* LOGIN VIEW */}
        {view === 'login' && (
          <>
            <div className="text-center space-y-4 mb-10">
              <h1 className="text-primary text-4xl font-bold tracking-tight">Entrar</h1>
              <p className="text-text-secondary text-base sm:text-lg leading-normal max-w-[280px] sm:max-w-xs mx-auto">
                Entre com sua conta para gerenciar sua declaração anual.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <label className="text-dark font-normal text-sm block">E-mail</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="exemplo@gmail.com" required
                    className="w-full bg-white rounded-2xl py-3.5 pl-4 pr-12 text-dark placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={20} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-dark font-normal text-sm block">Senha</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="********" required
                    className="w-full bg-white rounded-2xl py-3.5 pl-4 pr-12 text-dark placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary">
                    {showPassword ? <Unlock size={20} /> : <Lock size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 pb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                  <span className="text-dark text-sm font-normal">Lembrar-me</span>
                </label>
                <span className="text-dark text-sm font-medium">
                  <button type="button" onClick={() => { setView('forgot'); clearMessages(); }} className="text-primary font-bold hover:underline bg-transparent border-none p-0 cursor-pointer">Recuperar</button>
                </span>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold text-lg py-3.5 rounded-2xl shadow-md flex items-center justify-center hover:bg-opacity-90 active:scale-95 transition-all">
                {loading ? <Loader2 className="animate-spin" size={24} /> : 'Entrar'}
              </button>
            </form>

            <div className="flex items-center justify-center space-x-4 my-8">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-gray-400 text-sm">ou</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <button className="w-full bg-white text-gray-500 font-medium text-lg py-3.5 rounded-2xl shadow-sm flex items-center justify-center space-x-3 hover:bg-gray-50 active:scale-95 transition-all">
              <GoogleIcon />
              <span>Continuar com o Google</span>
            </button>
          </>
        )}

        {/* FORGOT PASSWORD VIEW */}
        {view === 'forgot' && (
          <>
            <div className="text-center space-y-4 mb-10">
              <h1 className="text-primary text-4xl font-bold tracking-tight">Recuperar Senha</h1>
              <p className="text-text-secondary text-base sm:text-lg leading-normal max-w-[280px] mx-auto">
                Digite seu e-mail para receber o código de recuperação.
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleForgotPassword}>
              <div className="space-y-1.5">
                <label className="text-dark font-normal text-sm block">E-mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white rounded-2xl py-3.5 px-4 text-dark shadow-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold text-lg py-3.5 rounded-2xl shadow-md flex justify-center hover:bg-opacity-90 active:scale-95 transition-all">
                {loading ? <Loader2 className="animate-spin" size={24} /> : 'Enviar Código'}
              </button>
            </form>
          </>
        )}

        {/* RESET PASSWORD VIEW */}
        {view === 'reset' && (
          <>
            <div className="text-center space-y-4 mb-10">
              <h1 className="text-primary text-4xl font-bold tracking-tight">Nova Senha</h1>
              <p className="text-text-secondary text-base sm:text-lg leading-normal max-w-[280px] mx-auto">
                Digite o código recebido no e-mail e sua nova senha.
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleResetPassword}>
              <div className="space-y-1.5">
                <label className="text-dark font-normal text-sm block">Código de 6 dígitos</label>
                <input type="text" value={code} onChange={e => setCode(e.target.value)} required maxLength={6} className="w-full bg-white rounded-2xl py-3.5 px-4 text-dark shadow-sm text-center tracking-widest text-lg font-bold focus:ring-2 focus:ring-primary/20 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-dark font-normal text-sm block">Nova Senha</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full bg-white rounded-2xl py-3.5 px-4 text-dark shadow-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-dark font-normal text-sm block">Confirmar Nova Senha</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full bg-white rounded-2xl py-3.5 px-4 text-dark shadow-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold text-lg py-3.5 rounded-2xl shadow-md flex justify-center hover:bg-opacity-90 active:scale-95 transition-all">
                {loading ? <Loader2 className="animate-spin" size={24} /> : 'Alterar Senha'}
              </button>
            </form>
          </>
        )}

        {/* FORCE RESET VIEW */}
        {view === 'force_reset' && (
          <>
            <div className="text-center space-y-4 mb-10">
              <h1 className="text-primary text-4xl font-bold tracking-tight">Atualização Obrigatória</h1>
              <p className="text-text-secondary text-base sm:text-lg leading-normal max-w-[280px] mx-auto">
                Você precisa definir uma nova senha para acessar o sistema.
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleForceReset}>
              <div className="space-y-1.5">
                <label className="text-dark font-normal text-sm block">Nova Senha</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full bg-white rounded-2xl py-3.5 px-4 text-dark shadow-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-dark font-normal text-sm block">Confirmar Nova Senha</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full bg-white rounded-2xl py-3.5 px-4 text-dark shadow-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold text-lg py-3.5 rounded-2xl shadow-md flex justify-center hover:bg-opacity-90 active:scale-95 transition-all">
                {loading ? <Loader2 className="animate-spin" size={24} /> : 'Salvar e Continuar'}
              </button>
            </form>
          </>
        )}

      </main>

      {view === 'login' && (
        <footer className="mt-auto pt-8 pb-4">
          <p className="text-dark text-base font-medium">
            Não possui uma conta? <button type="button" onClick={() => navigate('/cadastro')} className="text-primary font-bold hover:underline bg-transparent border-none p-0 cursor-pointer">Cadastre-se</button>
          </p>
        </footer>
      )}
      
    </div>
  );
}

export default Login;
