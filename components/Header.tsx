import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Upload, Instagram } from 'lucide-react';
import { LINKS } from '../constants';
import { useAdmin } from '../context/AdminContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { isAdmin, updateAssetImage, logoUrl } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Logo 圖片過大，建議小於 2MB。");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateAssetImage('site_logo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-brand-beige/95 backdrop-blur-md shadow-sm py-4 border-b border-brand-darker/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="relative group flex items-center gap-4">
          <a href={LINKS.HOME} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src={logoUrl} 
              alt="DB3D Logo" 
              className="w-12 h-12 rounded-full object-cover shadow-md" 
            />
            <span className="font-serif-title font-bold text-xl tracking-widest text-brand-darker">
              DB3D.RENDER
            </span>
          </a>
          
          {/* Admin Logo Upload */}
          {isAdmin && (
            <div className="absolute -top-1 -left-1 z-50">
               <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                title="更換 Logo"
              >
                <Upload size={12} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-medium">
          <a 
            href={LINKS.CHECKOUT} 
            target="_blank" 
            rel="noreferrer" 
            className="bg-brand-accent text-white px-6 py-2.5 rounded-full shadow-md hover:bg-brand-accentHover hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-bold tracking-wide"
          >
            D5室內外超寫實課程
          </a>
          <a 
            href={LINKS.INSTAGRAM} 
            target="_blank" 
            rel="noreferrer" 
            className="text-brand-accent hover:text-brand-accentHover transition-all duration-300 hover:scale-110 p-2"
            aria-label="Instagram"
          >
             <Instagram size={28} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-brand-darker hover:text-brand-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-beige border-b border-brand-darker/10 p-6 flex flex-col gap-6 shadow-2xl animate-fade-in">
           <a 
            href={LINKS.CHECKOUT} 
            className="bg-brand-accent text-white px-6 py-3 rounded-lg text-center font-bold shadow-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            D5室內外超寫實課程
          </a>
          <a 
            href={LINKS.INSTAGRAM} 
            className="text-brand-accent hover:text-brand-accentHover text-lg font-bold flex items-center justify-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Instagram size={24} />
            Instagram
          </a>
        </div>
      )}
    </header>
  );
};