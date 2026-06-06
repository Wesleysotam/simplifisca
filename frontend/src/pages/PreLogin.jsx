import React from 'react';
import { useNavigate } from 'react-router-dom';

function PreLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-main flex flex-col items-center justify-between p-6 sm:p-8 font-sans">
      
      {/* Header */}
      <header className="w-full flex justify-center mt-8">
        <img src="/logo.png" alt="Simplifisca" className="h-8 w-auto" />
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto my-12">
        <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full bg-bg-secondary flex items-end justify-center overflow-hidden mb-12 shadow-inner">
          <img src="/img01.png" alt="Ilustração MEI" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="text-center space-y-3 px-4">
          <h2 className="text-primary text-[28px] sm:text-3xl font-bold leading-tight tracking-tight">
            Descomplique sua<br />rotina como MEI
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-normal max-w-[280px] sm:max-w-xs mx-auto">
            Gerencie suas declarações e mantenha tudo em dia de forma prática.
          </p>
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="w-full max-w-md flex items-center justify-center gap-6 sm:gap-8 mb-8 px-4">
        <button 
          onClick={() => navigate('/cadastro')}
          className="text-primary font-semibold text-lg py-3.5 px-6 sm:px-8 rounded-2xl hover:bg-primary/5 transition-all active:scale-95"
        >
          Cadastre-se
        </button>
        <button 
          onClick={() => navigate('/login')}
          className="bg-primary text-white font-semibold text-lg py-3.5 px-8 sm:px-10 rounded-2xl shadow-md hover:bg-opacity-90 transition-all active:scale-95"
        >
          Entrar
        </button>
      </footer>
      
    </div>
  );
}

export default PreLogin;
