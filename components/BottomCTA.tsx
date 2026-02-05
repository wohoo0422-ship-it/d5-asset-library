import React from 'react';
import { LINKS } from '../constants';
import { ArrowRight } from 'lucide-react';

export const BottomCTA: React.FC = () => {
  return (
    <section className="py-32 bg-brand-darker relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-brand-accent/5 radial-gradient"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif-title">
          準備好升級您的作品集了嗎？
        </h2>
        <p className="text-stone-400 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          不要錯過這些優質的 D5 渲染資源。立即獲取完整素材包，讓您的建築視覺化作品質感倍增。
        </p>
        
        <a 
          href={LINKS.CHECKOUT}
          className="inline-flex items-center justify-center px-12 py-5 text-xl font-bold rounded-sm text-white bg-brand-accent hover:bg-brand-accentHover transition-all shadow-xl hover:shadow-brand-accent/20 transform hover:-translate-y-1 gap-3 tracking-widest"
        >
          前往結帳
          <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
};