
import React, { useState, useMemo, useRef } from 'react';
import { Driver, Partner } from '../types';

interface AdminPageProps {
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  heroImages: string[];
  setHeroImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const AdminPage: React.FC<AdminPageProps> = ({ drivers, setDrivers, partners, setPartners, heroImages, setHeroImages }) => {
  const [activeTab, setActiveTab] = useState<'drivers' | 'partners' | 'hero'>('drivers');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [driverForm, setDriverForm] = useState<Partial<Driver>>({});
  const [partnerForm, setPartnerForm] = useState<Partial<Partner>>({});
  const [neighborhoodsInput, setNeighborhoodsInput] = useState('');
  const [schoolsInput, setSchoolsInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  // Pie Chart Logic
  const totalItems = drivers.length + partners.length;
  const driversPercent = totalItems > 0 ? (drivers.length / totalItems) * 100 : 50;

  // Filters
  const filteredList = activeTab === 'drivers' 
    ? drivers.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : activeTab === 'partners'
      ? partners.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : [];

  // Image Upload Handler for Drivers/Partners
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (activeTab === 'drivers') {
          setDriverForm(prev => ({ ...prev, photo: base64String }));
        } else if (activeTab === 'partners') {
          setPartnerForm(prev => ({ ...prev, logo: base64String }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Hero Image Upload Handler
  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setHeroImages(prev => [...prev, base64String]);
        if (heroFileInputRef.current) heroFileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteHeroImage = (index: number) => {
    if (window.confirm('Deseja remover esta imagem do banner?')) {
      setHeroImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleDeleteDriver = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este motorista?')) {
      setDrivers(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleDeletePartner = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este parceiro?')) {
      setPartners(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveDriver = (e: React.FormEvent) => {
    e.preventDefault();
    const neighborhoods = neighborhoodsInput.split(',').map(n => n.trim()).filter(n => n !== '');
    const schools = schoolsInput.split(',').map(s => s.trim()).filter(s => s !== '');
    
    if (editingId) {
      setDrivers(prev => prev.map(d => d.id === editingId ? { ...d, ...driverForm, neighborhoods, schools } as Driver : d));
    } else {
      const newDriver: Driver = {
        ...driverForm,
        id: Math.random().toString(36).substr(2, 9),
        neighborhoods,
        schools,
        photo: driverForm.photo || `https://picsum.photos/seed/driver-${Math.random()}/400/400`,
      } as Driver;
      setDrivers(prev => [newDriver, ...prev]);
    }
    resetForm();
  };

  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPartners(prev => prev.map(p => p.id === editingId ? { ...p, ...partnerForm } as Partner : p));
    } else {
      const newPartner: Partner = {
        ...partnerForm,
        id: Math.random().toString(36).substr(2, 9),
        logo: partnerForm.logo || `https://picsum.photos/seed/partner-${Math.random()}/200/200`,
      } as Partner;
      setPartners(prev => [newPartner, ...prev]);
    }
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setDriverForm({});
    setPartnerForm({});
    setNeighborhoodsInput('');
    setSchoolsInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    window.scrollTo({ top: document.getElementById('form-section')?.offsetTop ? document.getElementById('form-section')!.offsetTop - 100 : 0, behavior: 'smooth' });
  };

  const startEditDriver = (driver: Driver) => {
    setEditingId(driver.id);
    setDriverForm(driver);
    setNeighborhoodsInput(driver.neighborhoods.join(', '));
    setSchoolsInput(driver.schools.join(', '));
    window.scrollTo({ top: document.getElementById('form-section')?.offsetTop ? document.getElementById('form-section')!.offsetTop - 100 : 0, behavior: 'smooth' });
  };

  const startEditPartner = (partner: Partner) => {
    setEditingId(partner.id);
    setPartnerForm(partner);
    window.scrollTo({ top: document.getElementById('form-section')?.offsetTop ? document.getElementById('form-section')!.offsetTop - 100 : 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-28 pb-24 px-4 bg-[#F8FAFC] min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Moderno */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] bg-indigo-50 px-3 py-1 rounded-full">Painel de Controle</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-3">Gestão de Ecossistema</h1>
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
              <button 
                onClick={() => setActiveTab('drivers')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'drivers' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Motoristas
              </button>
              <button 
                onClick={() => setActiveTab('partners')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'partners' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Parceiros
              </button>
              <button 
                onClick={() => setActiveTab('hero')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'hero' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Banner Hero
              </button>
            </div>
            {activeTab !== 'hero' && (
              <button 
                onClick={resetForm}
                className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                <span>Novo Registro</span>
              </button>
            )}
          </div>
        </div>

        {/* Dashboards Sections */}
        {activeTab !== 'hero' ? (
          <>
            {/* Dashboard Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Distribuição da Rede</h3>
                    <p className="text-sm text-slate-400 font-medium">Equilíbrio entre oferta e parcerias</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900">{totalItems}</span>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Geral</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-around gap-12">
                  <div className="relative w-48 h-48">
                    <div 
                      className="w-full h-full rounded-full shadow-inner flex items-center justify-center overflow-hidden"
                      style={{ 
                        background: `conic-gradient(#4f46e5 0% ${driversPercent}%, #10b981 ${driversPercent}% 100%)` 
                      }}
                    >
                      <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-lg">
                        <span className="text-2xl font-black text-slate-900">{totalItems > 0 ? Math.round(driversPercent) : 0}%</span>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Motoristas</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 w-full md:w-auto">
                    <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                      <div className="w-3 h-3 bg-indigo-600 rounded-full shadow-sm shadow-indigo-200"></div>
                      <div className="flex-grow">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motoristas</p>
                        <p className="text-lg font-black text-slate-900">{drivers.length} Cadastrados</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm shadow-emerald-200"></div>
                      <div className="flex-grow">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parceiros</p>
                        <p className="text-lg font-black text-slate-900">{partners.length} Cadastrados</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-emerald-500 p-8 rounded-[3rem] shadow-xl shadow-emerald-500/20 text-white flex flex-col justify-between h-1/2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-emerald-400/30 group-hover:scale-125 transition-transform duration-500">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m12-9.91c1.21-.49 2.1-1.59 2.1-2.91 0-1.31-.88-2.4-2.1-2.91M12 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <h4 className="text-emerald-100 font-bold uppercase tracking-[0.2em] text-[10px]">Crescimento da Rede</h4>
                  <p className="text-5xl font-black mt-2">+12%</p>
                  <div className="mt-4 flex items-center text-xs font-bold text-emerald-100">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                    Novas adesões
                  </div>
                </div>
                <div className="bg-indigo-600 p-8 rounded-[3rem] shadow-xl shadow-indigo-600/20 text-white flex flex-col justify-between h-1/2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-indigo-400/30 group-hover:scale-125 transition-transform duration-500">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                  </div>
                  <h4 className="text-indigo-100 font-bold uppercase tracking-[0.2em] text-[10px]">Capacidade Total</h4>
                  <p className="text-5xl font-black mt-2">1.2k</p>
                  <div className="mt-4 flex items-center text-xs font-bold text-indigo-100">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                    Alunos atendidos
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              {/* Barra de Busca e Filtros Clean */}
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex-grow w-full">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </span>
                  <input 
                    type="text" 
                    placeholder={`Pesquisar por nome de ${activeTab === 'drivers' ? 'motorista' : 'parceiro'}...`}
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* List Table Premium */}
              <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Listagem Detalhada</h3>
                  </div>
                  <span className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                    {filteredList.length} registros exibidos
                  </span>
                </div>
                
                <div className="overflow-x-auto px-6">
                  <table className="w-full text-left border-separate border-spacing-y-4">
                    <thead className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                      <tr>
                        <th className="px-6 pb-2">Identificação</th>
                        <th className="px-6 pb-2">Contato / Principal</th>
                        <th className="px-6 pb-2 text-right">Ações de Gestão</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredList.map((item: any) => (
                        <tr key={item.id} className="group transition-all">
                          <td className="px-6 py-6 bg-slate-50/50 first:rounded-l-[2rem] border-y border-l border-slate-100/50">
                            <div className="flex items-center">
                              <img 
                                src={activeTab === 'drivers' ? item.photo : item.logo} 
                                alt={item.name} 
                                className="w-14 h-14 rounded-[1.2rem] mr-4 object-cover shadow-sm group-hover:scale-105 transition-transform" 
                              />
                              <div>
                                <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors text-lg">{item.name}</p>
                                <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">ID: {item.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 bg-slate-50/50 border-y border-slate-100/50">
                            {activeTab === 'drivers' ? (
                              <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-indigo-600">{item.email}</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{item.vehicleType}</span>
                              </div>
                            ) : (
                              <span className="px-4 py-1.5 bg-indigo-100/50 text-indigo-600 text-[10px] font-black rounded-xl uppercase tracking-widest">{item.category}</span>
                            )}
                          </td>
                          <td className="px-6 py-6 bg-slate-50/50 last:rounded-r-[2rem] border-y border-r border-slate-100/50 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button 
                                onClick={() => activeTab === 'drivers' ? startEditDriver(item) : startEditPartner(item)}
                                className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-2xl transition-all shadow-sm hover:shadow-md"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button 
                                onClick={() => activeTab === 'drivers' ? handleDeleteDriver(item.id) : handleDeletePartner(item.id)}
                                className="p-3 text-slate-400 hover:text-rose-600 hover:bg-white rounded-2xl transition-all shadow-sm hover:shadow-md"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Form Section Modernizado */}
              <div id="form-section" className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                <div className="flex items-center space-x-4 mb-10">
                  <div className="w-14 h-14 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 shadow-inner">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{editingId ? 'Editar Detalhes' : 'Novo Cadastro'}</h2>
                    <p className="text-slate-400 text-sm font-medium">Os dados inseridos serão refletidos instantaneamente na plataforma pública.</p>
                  </div>
                </div>

                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

                {activeTab === 'drivers' ? (
                  <form onSubmit={handleSaveDriver} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 flex flex-col items-center mb-4">
                      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                          <img src={driverForm.photo || 'https://picsum.photos/seed/placeholder/400/400'} className="w-full h-full object-cover" alt="Preview" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/20 text-white">
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Motorista</label>
                      <input required className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700" value={driverForm.name || ''} onChange={e => setDriverForm({...driverForm, name: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail de Contato</label>
                      <input required type="email" className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700" value={driverForm.email || ''} onChange={e => setDriverForm({...driverForm, email: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bairros (Vírgulas)</label>
                      <input required className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700" value={neighborhoodsInput} onChange={e => setNeighborhoodsInput(e.target.value)} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Escolas (Vírgulas)</label>
                      <input required className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700" value={schoolsInput} onChange={e => setSchoolsInput(e.target.value)} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                      <input required className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700" value={driverForm.whatsapp || ''} onChange={e => setDriverForm({...driverForm, whatsapp: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipo de Veículo</label>
                      <input required className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700" value={driverForm.vehicleType || ''} onChange={e => setDriverForm({...driverForm, vehicleType: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                      <textarea required rows={4} className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 resize-none" value={driverForm.description || ''} onChange={e => setDriverForm({...driverForm, description: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 flex space-x-4 pt-4">
                      <button type="submit" className="flex-1 bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-indigo-500/20">{editingId ? 'Confirmar Atualização' : 'Finalizar Cadastro'}</button>
                      {editingId && <button type="button" onClick={resetForm} className="px-10 bg-slate-100 text-slate-500 py-5 rounded-3xl font-black">Cancelar</button>}
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSavePartner} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 flex flex-col items-center mb-4">
                      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center p-2">
                          <img src={partnerForm.logo || 'https://picsum.photos/seed/placeholder-logo/200/200'} className="max-w-full max-h-full object-contain" alt="Logo Preview" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/20 text-white">
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Empresa</label>
                      <input required className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700" value={partnerForm.name || ''} onChange={e => setPartnerForm({...partnerForm, name: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
                      <select required className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700" value={partnerForm.category || ''} onChange={e => setPartnerForm({...partnerForm, category: e.target.value})}>
                        <option value="">Selecione...</option>
                        <option value="Borracharia">Borracharia</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Papelaria">Papelaria</option>
                        <option value="Seguros">Seguros</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                      <input required className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700" value={partnerForm.whatsapp || ''} onChange={e => setPartnerForm({...partnerForm, whatsapp: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição Oferta</label>
                      <textarea required rows={4} className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 resize-none" value={partnerForm.description || ''} onChange={e => setPartnerForm({...partnerForm, description: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 flex space-x-4 pt-4">
                      <button type="submit" className="flex-1 bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-indigo-500/20">{editingId ? 'Salvar Alterações' : 'Cadastrar Parceiro'}</button>
                      {editingId && <button type="button" onClick={resetForm} className="px-10 bg-slate-100 text-slate-500 py-5 rounded-3xl font-black">Cancelar</button>}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Gerenciamento do Banner Hero */
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Banner Principal (Hero)</h2>
                <p className="text-slate-400 text-sm font-medium">Gerencie o carrossel de imagens da página inicial da ConnectVan.</p>
              </div>
              <button 
                onClick={() => heroFileInputRef.current?.click()}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all flex items-center space-x-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                <span>Adicionar Imagem</span>
              </button>
              <input 
                type="file" 
                ref={heroFileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleHeroImageUpload} 
              />
            </div>

            {/* Observação de Resolução */}
            <div className="mb-10 flex items-start space-x-4 bg-blue-50 border border-blue-100 p-6 rounded-3xl">
              <div className="bg-blue-600 p-2 rounded-xl text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-blue-900 font-black text-sm uppercase tracking-wider mb-1">Dica de Resolução</h4>
                <p className="text-blue-700 text-sm font-medium leading-relaxed">
                  Para uma visualização perfeita em computadores e celulares, recomendamos o uso de imagens com resolução de <strong>1600x600 pixels</strong> (proporção 8:3). Imagens muito pequenas podem ficar desfocadas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {heroImages.map((img, index) => (
                <div key={index} className="group relative aspect-video rounded-3xl overflow-hidden border-2 border-slate-100 shadow-sm">
                  <img src={img} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button 
                      onClick={() => handleDeleteHeroImage(index)}
                      className="bg-rose-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900">
                    Slide {index + 1}
                  </div>
                </div>
              ))}
              {heroImages.length === 0 && (
                <div className="col-span-full py-20 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 italic">
                   <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   Nenhuma imagem configurada. O sistema usará uma imagem padrão.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
