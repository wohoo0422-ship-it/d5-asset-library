import React from 'react';
import { Download, RotateCcw, Save } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminControls: React.FC = () => {
  const { isAdmin, exportConfig, resetConfig, overrides, hasStructureChanges } = useAdmin();

  if (!isAdmin) return null;

  const overridesCount = Object.keys(overrides).length;
  // If structure changed, we just show "Structure +" or similar, or just a generic "Changes present"
  // For simplicity, let's just show counts if possible, or just a "Unsaved Changes" indicator.
  
  const statusText = hasStructureChanges 
    ? `${overridesCount} 個修改 + 結構變更`
    : `${overridesCount} 個修改`;

  return (
    <div className="fixed bottom-24 left-6 z-[90] flex flex-col gap-3 animate-slide-in">
      <div className="bg-brand-darker/95 backdrop-blur text-white p-5 rounded-xl shadow-2xl border border-white/10 max-w-[300px]">
        <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm tracking-wider flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${overridesCount > 0 || hasStructureChanges ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${overridesCount > 0 || hasStructureChanges ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                </span>
                管理員模式
            </h4>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-stone-400 whitespace-nowrap">
                {statusText}
            </span>
        </div>
        
        <p className="text-xs text-stone-400 mb-4 leading-relaxed border-b border-white/5 pb-3">
            目前變更僅暫存於此電腦。若要正式發布給所有訪客，請下載設定檔並更新原始碼。
        </p>
        
        <div className="flex flex-col gap-2">
            <button 
                onClick={exportConfig}
                className="w-full bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-accent/20 hover:-translate-y-0.5 active:translate-y-0"
            >
                <Download size={14} />
                下載網站設定檔 (JSON)
            </button>
            
            <button 
                onClick={() => {
                    if(confirm('確定要重置所有變更嗎？這將會清除所有您上傳的圖片與新增的項目，且無法復原。')) {
                        resetConfig();
                    }
                }}
                className="w-full bg-transparent hover:bg-red-500/20 text-stone-500 hover:text-red-400 text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
                <RotateCcw size={12} />
                重置所有設定
            </button>
        </div>
      </div>
    </div>
  );
};