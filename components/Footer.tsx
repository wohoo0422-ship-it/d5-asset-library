import React, { useState } from 'react';
import { Instagram, Globe, Mail, Lock } from 'lucide-react';
import { LINKS } from '../constants';
import { useAdmin } from '../context/AdminContext';
import { AdminLoginModal } from './AdminLoginModal';

export const Footer: React.FC = () => {
  const { isAdmin, logout } = useAdmin();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdmin) {
      if(confirm("確定要登出管理員模式嗎？")) {
        logout();
      }
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <footer className="bg-brand-darker border-t border-white/10 py-16 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2 font-serif-title tracking-wider">DB3D RENDER</h3>
            <p className="text-stone-500 text-sm tracking-wide">Elevating Architectural Visualization.</p>
          </div>

          <div className="flex gap-6">
            <a 
              href={LINKS.INSTAGRAM} 
              target="_blank" 
              rel="noreferrer" 
              className="w-12 h-12 rounded-full bg-brand-dark border border-white/5 flex items-center justify-center text-stone-400 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href={LINKS.HOME} 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-brand-dark border border-white/5 flex items-center justify-center text-stone-400 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
              aria-label="Website"
            >
              <Globe size={20} />
            </a>
            <a 
              href={`mailto:contact@db3drender.com`}
              className="w-12 h-12 rounded-full bg-brand-dark border border-white/5 flex items-center justify-center text-stone-400 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-stone-600 text-xs tracking-wider flex justify-center items-center relative">
          <p>&copy; {new Date().getFullYear()} DB3D Render. All rights reserved.</p>
          
          {/* Discreet Admin Button */}
          <button 
            onClick={handleAdminClick}
            className="absolute right-0 opacity-20 hover:opacity-100 transition-opacity text-[10px] text-stone-700 hover:text-brand-accent flex items-center gap-1"
            title="管理員登入"
          >
            {isAdmin ? '管理員登出' : '管理員登入'}
            <Lock size={8} />
          </button>
        </div>
      </div>
      
      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </footer>
  );
};