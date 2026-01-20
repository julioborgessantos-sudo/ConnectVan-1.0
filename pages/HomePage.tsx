
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { Driver, Partner } from '../types';

interface HomePageProps {
  drivers: Driver[];
  partners: Partner[];
  heroImages: string[];
}

const HomePage: React.FC<HomePageProps> = ({ drivers, partners, heroImages }) => {
  const [driverSearch, setDriverSearch] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('');
  const location = useLocation();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const firstPartnerRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => Array.from(new Set(partners.map(p => p.category))), [partners]);

  const filteredDrivers = drivers.filter(d => 
    (d.name.toLowerCase().includes(driverSearch.toLowerCase()) || 
     d.neighborhoods.some(n => n.toLowerCase().includes(driverSearch.toLowerCase())) ||
     d.schools.some(s => s.toLowerCase().includes(driverSearch.toLowerCase())))
  );

  const filteredPartners = partners.filter(p => 
    partnerFilter === '' || p.category === partnerFilter
  );

  useEffect(() => {
    if (location.hash === '#motoristas') {
      searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => searchInputRef.current?.focus(), 600);
    } else if (location.hash === '#parceiros') {
      firstPartnerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [location.hash]);

  const steps = [
    { title: 'Busque', desc: 'Encontre motoristas que atendem seu bairro ou escola.', icon: '🔍' },
    { title: 'Compare', desc: 'Veja o tipo de veículo e detalhes dos bairros atendidos.', icon: '📋' },
    { title: 'Conecte', desc: 'Fale direto pelo WhatsApp e combine os detalhes.', icon: '💬' },
    { title: 'Tranquilidade', desc: 'Saiba que seus filhos estão em boas mãos.', icon: '✨' },
  ];

  const WhatsAppIcon = () => (
    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );

  return (
    <div className="pt-20">
      <Hero images={heroImages} />

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Passo a Passo</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Como Funciona?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative group text-center lg:text-left">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto lg:mx-0 group-hover:bg-indigo-50 group-hover:scale-110 transition-all border border-slate-100 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section id="motoristas" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Diretório</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">Encontre seu Profissional</h2>
              <p className="text-slate-500 mt-4 text-lg">Transporte escolar de confiança com motoristas certificados.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-grow">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </span>
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Nome, Bairro ou Escola..." 
                  className="w-full sm:w-80 pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm font-medium"
                  value={driverSearch}
                  onChange={(e) => setDriverSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDrivers.length > 0 ? filteredDrivers.map(driver => (
              <div key={driver.id} className="bg-white rounded-[3.5rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 border border-slate-100 group flex flex-col h-full">
                <div className="relative mb-6 overflow-hidden rounded-[3rem] aspect-square shadow-inner bg-slate-50 border border-slate-100">
                  <img src={driver.photo} alt={driver.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors leading-tight">
                    {driver.name}
                  </h3>
                  <div className="flex items-center text-indigo-500 text-[11px] font-black uppercase tracking-widest mb-4">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {driver.vehicleType}
                  </div>
                  
                  {/* Schools Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {driver.schools.map((s, i) => (
                      <span key={i} className="bg-indigo-50/50 text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-xl border border-indigo-100/50 uppercase tracking-tight">
                        🏫 {s}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8">
                    {driver.description}
                  </p>
                </div>
                
                <a 
                  href={`https://wa.me/${driver.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center space-x-3 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-5 rounded-[2.2rem] transition-all duration-300 shadow-xl shadow-[#25D366]/20 active:scale-95 hover:-translate-y-1"
                >
                  <WhatsAppIcon />
                  <span className="uppercase tracking-widest text-sm font-black">Chamar no WhatsApp</span>
                </a>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center">
                <div className="text-6xl mb-4 text-slate-200">🚐</div>
                <h3 className="text-xl font-bold text-slate-700">Nenhum motorista encontrado</h3>
                <p className="text-slate-500">Tente buscar por outro nome, bairro ou escola.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Pronto para encontrar seu transporte?</h2>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
              Centenas de pais já confiam na ConnectVan para encontrar os melhores profissionais da região. 
              Junte-se a nós hoje mesmo.
            </p>
            <Link to="/#motoristas" className="bg-white text-indigo-600 hover:bg-slate-100 px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-black/10 active:scale-95">
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="parceiros" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Comunidade</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight">Rede de Parceiros</h2>
            <p className="text-slate-500 max-w-xl font-medium">Descontos exclusivos para a comunidade ConnectVan.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button 
              onClick={() => setPartnerFilter('')}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border ${partnerFilter === '' ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200'}`}
            >
              Todos os Serviços
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setPartnerFilter(cat)}
                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border ${partnerFilter === cat ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100' : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPartners.map((partner, index) => (
              <div 
                key={partner.id} 
                ref={index === 0 ? firstPartnerRef : null}
                className="bg-white rounded-[3.5rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 border border-slate-100 group flex flex-col h-full cursor-default"
              >
                <div className="relative mb-6 overflow-hidden rounded-[3rem] aspect-square bg-slate-50 border border-slate-100 shadow-inner">
                  <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">
                    {partner.name}
                  </h3>
                  
                  <div className="flex items-center text-indigo-500 text-[11px] font-black uppercase tracking-widest mb-4">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {partner.category}
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {partner.description}
                  </p>
                </div>
                
                <a 
                  href={`https://wa.me/${partner.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center space-x-3 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-5 rounded-[2.2rem] transition-all duration-300 shadow-xl shadow-[#25D366]/20 active:scale-95 hover:-translate-y-1"
                >
                  <WhatsAppIcon />
                  <span className="uppercase tracking-widest text-sm font-black">Falar com Parceiro</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
