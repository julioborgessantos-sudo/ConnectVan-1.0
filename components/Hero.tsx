
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  images: string[];
}

const Hero: React.FC<HeroProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  // Handle case where images might be empty
  const displayImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1600'];

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {displayImages.map((img, idx) => (
        <div
          key={`${img}-${idx}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={img} className="w-full h-full object-cover" alt="Transporte Escolar" />
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>
      ))}
      
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 max-w-3xl leading-tight">
          Segurança e Conforto para o <span className="text-indigo-400">Transporte dos seus Filhos</span>
        </h1>
        <p className="text-lg md:text-2xl mb-10 max-w-2xl text-slate-200 font-light">
          O marketplace definitivo para encontrar os melhores motoristas escolares e parceiros da sua região em poucos cliques.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/#motoristas" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all text-center shadow-lg shadow-indigo-500/30">
            Ver Motoristas
          </Link>
          <Link to="/#parceiros" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/30 transition-all text-center">
            Nossos Parceiros
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {displayImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? 'bg-indigo-500 w-8' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
