
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Driver, Partner } from './types';
import { INITIAL_DRIVERS, INITIAL_PARTNERS, INITIAL_HERO_IMAGES } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(() => {
    const saved = localStorage.getItem('connectvan_drivers');
    return saved ? JSON.parse(saved) : INITIAL_DRIVERS;
  });

  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('connectvan_partners');
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });

  const [heroImages, setHeroImages] = useState<string[]>(() => {
    const saved = localStorage.getItem('connectvan_hero_images');
    return saved ? JSON.parse(saved) : INITIAL_HERO_IMAGES;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('is_admin_authenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('connectvan_drivers', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem('connectvan_partners', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('connectvan_hero_images', JSON.stringify(heroImages));
  }, [heroImages]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('is_admin_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('is_admin_authenticated');
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage drivers={drivers} partners={partners} heroImages={heroImages} />} 
            />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <AdminPage 
                    drivers={drivers} 
                    setDrivers={setDrivers} 
                    partners={partners} 
                    setPartners={setPartners} 
                    heroImages={heroImages}
                    setHeroImages={setHeroImages}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
