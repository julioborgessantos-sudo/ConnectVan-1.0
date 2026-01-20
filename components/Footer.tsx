
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-indigo-600 mb-4">ConnectVan</h3>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Conectando famílias a serviços de transporte escolar de alta qualidade e parceiros locais confiáveis.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>contato@connectvan.com.br</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Privacidade</li>
              <li>Termos de Uso</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} ConnectVan Marketplace. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
