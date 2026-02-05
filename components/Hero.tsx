import React, { useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Upload, Film, Play } from 'lucide-react';
import { SITE_CONFIG } from '../constants';

export const Hero: React.FC = () => {
  const { isAdmin, overrides, updateAssetImage } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Check overrides first, then fall back to SITE_CONFIG
  const videoSrc = overrides['hero_video'] || SITE_CONFIG.heroVideo;

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // LocalStorage has a limit of around 5MB per domain. 
      // Videos are heavy, so we warn the user.
      if (file.size > 5 * 1024 * 1024) {
         alert("注意：影片檔案超過 5MB，可能會導致瀏覽器儲存空間不足而儲存失敗。建議使用極短的循環影片或大幅壓縮後的檔案。");
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        try {
            updateAssetImage('hero_video', base64String);
        } catch (e) {
            alert("儲存失敗：檔案太大。");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 flex items-center overflow-hidden bg-brand-beige min-h-[85vh]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-5/12 z-20">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-brand-darker drop-shadow-sm font-serif-title">
              D5極速素材庫
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-stone-700 mb-8 font-serif-title leading-normal">
              1300個家具模型 <span className="text-brand-accent">+</span> 近700組寫實材質
            </h2>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 text-lg md:text-xl text-stone-600 font-medium tracking-wider mb-8">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                一秒上色
              </span>
              <span className="hidden md:block text-stone-400">|</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                極速建立場景
              </span>
              <span className="hidden md:block text-stone-400">|</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                無須調整任何參數
              </span>
            </div>
          </div>

          {/* Right: Video Section (Editable by Admin) */}
          <div className="w-full lg:w-7/12 relative group perspective-1000">
             <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-brand-darker/5 border-4 border-white/40 transform transition-transform duration-700 hover:scale-[1.01]">
                {videoSrc ? (
                  <video 
                    src={videoSrc} 
                    className="w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200/50 text-stone-400 gap-4">
                     <Film size={64} className="opacity-20" />
                     {isAdmin && <span className="text-sm font-medium opacity-60">點擊上傳展示影片 (建議 16:9)</span>}
                  </div>
                )}

                {/* Admin Upload Overlay */}
                {isAdmin && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-brand-accent hover:bg-brand-accentHover text-white px-8 py-4 rounded-full shadow-xl border border-white/30 backdrop-blur-sm transition-all transform hover:scale-110 flex items-center gap-3 font-bold text-lg"
                    >
                      <Upload size={24} />
                      {videoSrc ? '更換影片' : '上傳影片'}
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleVideoUpload} 
                      className="hidden" 
                      accept="video/mp4,video/webm"
                    />
                  </div>
                )}

                {/* Play icon decoration if video exists but controls are hidden (aesthetic) */}
                {videoSrc && !isAdmin && (
                   <div className="absolute top-4 right-4 text-white/50 bg-black/20 p-2 rounded-full backdrop-blur-md">
                      <Play size={16} fill="currentColor" />
                   </div>
                )}
             </div>

             {/* Background Decorative Blobs */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-darker/10 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};