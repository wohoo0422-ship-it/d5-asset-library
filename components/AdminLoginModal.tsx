import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { X, Lock } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAdmin();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      // Focus the input when modal opens
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onClose();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-darker/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-brand-beige w-full max-w-sm rounded-xl shadow-2xl overflow-hidden border border-white/20 transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-brand-darker p-6 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-accent shadow-inner ring-1 ring-white/20">
            <Lock size={20} />
          </div>
          <h3 className="text-xl font-bold text-white font-serif-title tracking-wide">管理員登入</h3>
        </div>

        {/* Body */}
        <div className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <input
                        ref={inputRef}
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                        placeholder="請輸入密碼"
                        className={`w-full bg-white px-4 py-3 rounded-lg border text-brand-darker outline-none focus:ring-2 transition-all placeholder:text-stone-400 ${
                            error 
                            ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                            : 'border-stone-200 focus:border-brand-accent focus:ring-brand-accent/20'
                        }`}
                    />
                    {error && (
                        <p className="text-red-500 text-xs mt-2 ml-1 font-medium animate-pulse">密碼錯誤，請重新輸入。</p>
                    )}
                </div>

                <button 
                    type="submit"
                    className="w-full bg-brand-accent hover:bg-brand-accentHover text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    確認
                </button>
            </form>
        </div>

      </div>
    </div>
  );
};