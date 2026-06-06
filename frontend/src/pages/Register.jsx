import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Lock, Unlock } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-bg-main p-6 sm:p-8 font-sans flex flex-col items-center">
      
      <div className="w-full max-w-md relative flex justify-center mt-2 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <div className="h-10" /> {/* Spacer */}
      </div>

      <main className="w-full max-w-md flex flex-col">
        
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-primary text-4xl font-bold tracking-tight">Criar Conta</h1>
          <p className="text-text-secondary text-base sm:text-lg leading-normal max-w-[280px] sm:max-w-xs mx-auto">
            Crie sua conta e facilite sua declaração anual como MEI.
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          
          <div className="space-y-1.5">
            <label className="text-dark font-normal text-sm block">Nome</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ex: Tiago Cordeiro"
                className="w-full bg-white rounded-2xl py-3.5 pl-4 pr-12 text-dark placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-shadow"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={20} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-dark font-normal text-sm block">E-mail</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="tiago.cordeiro@gmail.com"
                className="w-full bg-white rounded-2xl py-3.5 pl-4 pr-12 text-dark placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-shadow"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={20} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-dark font-normal text-sm block">Senha</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="********"
                className="w-full bg-white rounded-2xl py-3.5 pl-4 pr-12 text-dark placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-shadow"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors focus:outline-none"
              >
                {showPassword ? <Unlock size={20} /> : <Lock size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-dark font-normal text-sm block">Confirmar Senha</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="********"
                className="w-full bg-white rounded-2xl py-3.5 pl-4 pr-12 text-dark placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-shadow"
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors focus:outline-none"
              >
                {showConfirmPassword ? <Unlock size={20} /> : <Lock size={20} />}
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="flex-1 text-primary font-semibold text-lg py-3.5 rounded-2xl hover:bg-primary/5 transition-all active:scale-95"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-primary text-white font-semibold text-lg py-3.5 rounded-2xl shadow-md hover:bg-opacity-90 transition-all active:scale-95"
            >
              Criar
            </button>
          </div>
        </form>

      </main>
      
    </div>
  );
}

export default Register;
