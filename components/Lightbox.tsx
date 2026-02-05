import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Asset } from '../types';

interface LightboxProps {
  assets: Asset[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isOpen: boolean;
}

export const Lightbox: React.FC<LightboxProps> = ({ 
  assets, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev,
  isOpen 
}) => {
  const currentAsset = assets[currentIndex];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowRight':
        onNext();
        break;
      case 'ArrowLeft':
        onPrev();
        break;
    }
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen || !currentAsset) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      {/* Controls */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 hover:bg-white/20 p-2 rounded-full transition-all z-10"
      >
        <X size={32} />
      </button>

      <button 
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-white/20 p-3 rounded-full transition-all z-10 hidden md:block"
      >
        <ChevronLeft size={40} />
      </button>

      <button 
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-white/20 p-3 rounded-full transition-all z-10 hidden md:block"
      >
        <ChevronRight size={40} />
      </button>

      {/* Content */}
      <div className="relative max-w-7xl max-h-[90vh] flex flex-col items-center">
        <img 
          src={currentAsset.imageUrl} 
          alt={currentAsset.title}
          className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
        />
        <div className="mt-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white">{currentAsset.title}</h3>
          <p className="text-brand-accent text-sm md:text-base">{currentAsset.subCategory}</p>
        </div>
        
        <div className="mt-2 text-slate-500 text-sm">
            {currentIndex + 1} / {assets.length}
        </div>
      </div>
    </div>
  );
};