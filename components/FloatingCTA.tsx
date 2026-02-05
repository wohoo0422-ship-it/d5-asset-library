import React from 'react';
import { ShoppingCart, ArrowUp } from 'lucide-react';
import { LINKS } from '../constants';

export const FloatingCTA: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-4 animate-fade-in">
      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className="bg-white text-brand-darker hover:text-brand-accent hover:-translate-y-1 p-3 rounded-full shadow-lg shadow-black/10 border border-brand-darker/10 transition-all duration-300 group"
        title="回到頂部"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Main CTA Button */}
      <a
        href={LINKS.CHECKOUT}
        className="bg-brand-accent text-white hover:bg-white hover:text-brand-darker hover:scale-105 px-6 py-4 rounded-full shadow-2xl shadow-black/30 transition-all duration-500 flex items-center justify-center gap-3 font-bold group border border-white/10"
      >
        <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
        <span className="hidden md:inline tracking-widest">立即購買</span>
        <span className="md:hidden">購買</span>
      </a>
    </div>
  );
};