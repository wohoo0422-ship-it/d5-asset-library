import React, { useRef } from 'react';
import { Asset } from '../types';
import { Upload, Trash2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AssetCardProps {
  asset: Asset;
  onDelete?: () => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onDelete }) => {
  const { isAdmin, updateAssetImage } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic size check (e.g., 3MB limit)
      if (file.size > 3 * 1024 * 1024) {
        alert("圖片檔案過大，建議小於 3MB 以避免儲存空間不足。");
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateAssetImage(asset.id, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col border border-transparent hover:border-brand-accent/30 cursor-default">
      {/* Changed aspect-video to aspect-square for 1:1 ratio */}
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={asset.imageUrl} 
          alt={asset.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Admin Controls - Visible on Hover */}
        {isAdmin && (
           <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             {/* Background gradient for better visibility of icons */}
             <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent"></div>

             {/* Upload Button (Top Right) */}
             <div className="absolute top-2 right-2 pointer-events-auto">
               <button 
                  onClick={handleUploadClick}
                  className="bg-brand-accent hover:bg-brand-accentHover text-white p-2 rounded-full shadow-lg border border-white/20 transition-all transform hover:scale-110 active:scale-95"
                  title="更換圖片 (Admin)"
               >
                  <Upload size={16} />
               </button>
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
               />
             </div>

             {/* Delete Button (Top Left) */}
             {onDelete && (
                <div className="absolute top-2 left-2 pointer-events-auto">
                  <button 
                      onClick={(e) => {
                          e.stopPropagation();
                          onDelete();
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg border border-white/20 transition-all transform hover:scale-110 active:scale-95"
                      title="刪除此項目"
                  >
                      <Trash2 size={16} />
                  </button>
                </div>
             )}
           </div>
        )}
      </div>
    </div>
  );
};