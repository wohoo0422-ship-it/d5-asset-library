import React, { useState, useMemo, useRef } from 'react';
import { CATEGORY_MAP } from '../constants';
import { MainCategory, SubCategory } from '../types';
import { AssetCard } from './AssetCard';
import { Layers, Box, UploadCloud, Loader2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const Gallery: React.FC = () => {
  const { overrides, assets, isAdmin, batchAddAssets, deleteAsset } = useAdmin();
  const [activeMain, setActiveMain] = useState<MainCategory>('MATERIALS');
  const [activeSub, setActiveSub] = useState<SubCategory>(CATEGORY_MAP['MATERIALS'][0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const batchInputRef = useRef<HTMLInputElement>(null);
  
  // Update sub-category when main category changes
  const handleMainChange = (main: MainCategory) => {
    setActiveMain(main);
    setActiveSub(CATEGORY_MAP[main][0]);
  };

  // Merge default assets with overrides and filter
  const displayAssets = useMemo(() => {
    return assets.map(asset => ({
      ...asset,
      imageUrl: overrides[asset.id] || asset.imageUrl
    })).filter(asset => asset.subCategory === activeSub);
  }, [assets, activeSub, overrides]);

  const handleBatchUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);

    const fileReaders: Promise<string>[] = [];

    Array.from(files).forEach((file: File) => {
        // Basic size check
        if (file.size > 3 * 1024 * 1024) {
             console.warn(`File ${file.name} is too large, skipping.`);
             return;
        }

        const reader = new Promise<string>((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result as string);
            fr.onerror = reject;
            fr.readAsDataURL(file);
        });
        fileReaders.push(reader);
    });

    Promise.all(fileReaders)
        .then(images => {
            batchAddAssets(activeMain, activeSub, images);
            // Reset input
            if (batchInputRef.current) batchInputRef.current.value = '';
        })
        .catch(err => {
            console.error("Error reading files", err);
            alert("讀取圖片失敗");
        })
        .finally(() => {
            setIsProcessing(false);
        });
  };

  return (
    <section id="gallery" className="pb-24 bg-brand-beige min-h-screen relative">
      
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
            <div className="w-16 h-1 bg-brand-accent mx-auto mb-3"></div>
        </div>

        {/* Main Category Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#C8C0B5] p-1.5 rounded-full border border-white/20 flex relative shadow-inner">
             <button
              onClick={() => handleMainChange('MATERIALS')}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 z-10 ${
                activeMain === 'MATERIALS' 
                  ? 'bg-brand-accent text-white shadow-lg' 
                  : 'text-stone-600 hover:text-brand-darker'
              }`}
            >
              <Layers size={18} />
              3D 材質
            </button>
            <button
              onClick={() => handleMainChange('MODELS')}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 z-10 ${
                activeMain === 'MODELS' 
                  ? 'bg-brand-accent text-white shadow-lg' 
                  : 'text-stone-600 hover:text-brand-darker'
              }`}
            >
              <Box size={18} />
              3D 模型
            </button>
          </div>
        </div>

        {/* Sub Category List */}
        <div className="mb-12 overflow-x-auto pb-6 hide-scrollbar">
          <div className="flex flex-wrap justify-center gap-3 min-w-max md:min-w-0 px-2">
            {CATEGORY_MAP[activeMain].map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-300 border ${
                  activeSub === sub
                    ? 'bg-brand-darker text-white border-brand-darker font-bold shadow-md transform scale-105'
                    : 'bg-transparent text-stone-600 border-stone-400/30 hover:border-brand-accent hover:text-brand-accent'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Title */}
        <div className="mb-8 flex items-end justify-between border-b border-brand-darker/10 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-brand-darker font-serif-title">{activeSub}</h3>
          </div>
          <span className="text-stone-600 text-sm">共 {displayAssets.length} 項</span>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {displayAssets.map((asset) => (
            <div key={asset.id}>
              <AssetCard 
                asset={asset} 
                onDelete={() => deleteAsset(asset.id)}
              />
            </div>
          ))}

          {/* ADD BUTTON CARD (Admin Only) - Multi Upload */}
          {isAdmin && (
            <>
                <button
                    onClick={() => !isProcessing && batchInputRef.current?.click()}
                    disabled={isProcessing}
                    className={`group relative bg-white/50 hover:bg-white rounded-lg overflow-hidden border-2 border-dashed border-brand-accent/30 hover:border-brand-accent flex flex-col items-center justify-center min-h-[300px] transition-all duration-300 gap-4 aspect-square ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
                >
                    <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-colors text-brand-accent">
                        {isProcessing ? <Loader2 size={32} className="animate-spin" /> : <UploadCloud size={32} />}
                    </div>
                    <span className="text-brand-darker font-bold tracking-wide">
                        {isProcessing ? '正在處理圖片...' : '批量新增圖片'}
                    </span>
                    <span className="text-xs text-stone-500">
                        {isProcessing ? '請稍候' : '(可多選，支援 200+ 張)'}
                    </span>
                </button>
                <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    className="hidden" 
                    ref={batchInputRef}
                    onChange={handleBatchUpload}
                />
            </>
          )}
        </div>

        {displayAssets.length === 0 && !isAdmin && (
          <div className="text-center py-32 text-stone-500 bg-white/30 rounded-xl border border-dashed border-brand-darker/10">
            此分類暫無項目
          </div>
        )}
      </div>
    </section>
  );
};