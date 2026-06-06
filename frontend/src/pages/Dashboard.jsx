import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-main p-6 sm:p-8 font-sans flex flex-col items-center justify-center">
      <main className="w-full max-w-md flex flex-col items-center bg-white p-8 rounded-3xl shadow-sm text-center">
        <div className="w-20 h-20 bg-highlight rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-10 h-10 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-primary text-3xl font-bold tracking-tight mb-4">
          Parabéns!
        </h1>
        
        <p className="text-text-secondary text-base sm:text-lg leading-normal mb-8">
          Você está logado com sucesso no Simplifisca.
        </p>

        <button 
          onClick={() => navigate('/')} 
          className="w-full bg-primary text-white font-semibold text-lg py-3.5 rounded-2xl shadow-md hover:bg-opacity-90 transition-all active:scale-95"
        >
          Sair
        </button>
      </main>
    </div>
  );
}

export default Dashboard;
