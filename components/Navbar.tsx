
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-200">
              <span className="text-white font-black text-xl tracking-tighter">CV</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">ConnectVan</span>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">Marketplace</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className={`text-sm font-semibold transition-all hover:text-indigo-600 ${location.pathname === '/' && !location.hash ? 'text-indigo-600' : 'text-slate-600'}`}>
              Início
            </Link>
            <Link to="/#motoristas" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-all">
              Motoristas
            </Link>
            <Link to="/#parceiros" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-all">
              Parceiros
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/admin" 
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    location.pathname === '/admin' 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={onLogout}
                  className="bg-rose-50 text-rose-600 px-6 py-2.5 rounded-xl text-sm font-bold transition-all border border-rose-100 hover:bg-rose-100 active:scale-95"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-indigo-600 text-white shadow-lg shadow-indigo-200 px-8 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-indigo-700 active:scale-95"
              >
                Entrar
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
             {isAuthenticated ? (
               <button onClick={onLogout} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
               </button>
             ) : (
               <Link to="/login" className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
               </Link>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
