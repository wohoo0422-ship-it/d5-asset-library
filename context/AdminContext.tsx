import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ASSETS, SITE_CONFIG } from '../constants';
import { Asset, MainCategory, SubCategory } from '../types';

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  overrides: Record<string, string>;
  updateAssetImage: (id: string, newUrl: string) => void;
  logoUrl: string;
  // Dynamic Asset Management
  assets: Asset[];
  addAsset: (main: MainCategory, sub: SubCategory) => void;
  batchAddAssets: (main: MainCategory, sub: SubCategory, images: string[]) => void;
  deleteAsset: (id: string) => void;
  // Persistence
  exportConfig: () => void;
  resetConfig: () => void;
  hasStructureChanges: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [assets, setAssets] = useState<Asset[]>(ASSETS);
  const [hasStructureChanges, setHasStructureChanges] = useState(false);

  useEffect(() => {
    // 1. Load overrides (Images)
    const savedOverrides = localStorage.getItem('db3d_asset_overrides');
    if (savedOverrides) {
      try {
        setOverrides(JSON.parse(savedOverrides));
      } catch (e) {
        console.error("Failed to parse overrides", e);
      }
    }

    // 2. Load custom asset structure (List of items)
    const savedStructure = localStorage.getItem('db3d_assets_structure');
    if (savedStructure) {
      try {
        const parsedAssets = JSON.parse(savedStructure);
        setAssets(parsedAssets);
        // If saved structure exists, we assume there are changes unless it exactly matches initial ASSETS
        // However, if ASSETS is empty (initial state) and we have saved structure, that's definitely a change.
        if (ASSETS.length === 0 && parsedAssets.length > 0) {
            setHasStructureChanges(true);
        } else {
            // Simple check: if lengths differ
            setHasStructureChanges(parsedAssets.length !== ASSETS.length);
        }
      } catch (e) {
        console.error("Failed to parse asset structure", e);
      }
    }

    // 3. Check login session
    const sessionAdmin = sessionStorage.getItem('db3d_is_admin');
    if (sessionAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === 'db3ddb3dd5assetd5kit3d') {
      setIsAdmin(true);
      sessionStorage.setItem('db3d_is_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('db3d_is_admin');
  };

  const updateAssetImage = (id: string, newUrl: string) => {
    const newOverrides = { ...overrides, [id]: newUrl };
    setOverrides(newOverrides);
    try {
      localStorage.setItem('db3d_asset_overrides', JSON.stringify(newOverrides));
    } catch (e) {
      console.warn("LocalStorage full for overrides.");
      alert('注意：瀏覽器儲存空間已滿。圖片已更新於畫面，但重整後會消失。\n請務必立即下載設定檔 (JSON) 以保存變更。');
    }
  };

  const addAsset = (main: MainCategory, sub: SubCategory) => {
    const newId = `custom-${Date.now()}`;
    const newAsset: Asset = {
      id: newId,
      title: 'New Item',
      mainCategory: main,
      subCategory: sub,
      imageUrl: 'https://placehold.co/1080x1080/e7e5e4/292524?text=Click+Upload',
      description: 'New Description'
    };
    
    const updatedAssets = [...assets, newAsset];
    setAssets(updatedAssets);
    setHasStructureChanges(true);
    try {
      localStorage.setItem('db3d_assets_structure', JSON.stringify(updatedAssets));
    } catch (e) {
      alert("儲存結構失敗：空間不足。變更僅保留於記憶體中，請立即匯出設定檔。");
    }
  };

  const batchAddAssets = (main: MainCategory, sub: SubCategory, images: string[]) => {
    const timestamp = Date.now();
    const newAssets: Asset[] = images.map((img, index) => ({
      id: `custom-${timestamp}-${index}`,
      title: 'New Item',
      mainCategory: main,
      subCategory: sub,
      imageUrl: img,
      description: 'Batch Uploaded'
    }));

    const updatedAssets = [...assets, ...newAssets];
    setAssets(updatedAssets);
    setHasStructureChanges(true);

    try {
      localStorage.setItem('db3d_assets_structure', JSON.stringify(updatedAssets));
    } catch (e) {
      // Allow memory-only operation for large batches (200+ images)
      console.warn("LocalStorage quota exceeded during batch add. Keeping in memory.");
      alert(`已成功加入 ${images.length} 張圖片！\n\n注意：資料量超過瀏覽器暫存上限，無法自動存檔。重整頁面將會遺失這些資料。\n\n請務必立即點擊左下角的「下載網站設定檔」以保存資料！`);
    }
  };

  const deleteAsset = (id: string) => {
    if (!window.confirm("確定要刪除這個項目嗎？")) return;
    
    const updatedAssets = assets.filter(a => a.id !== id);
    setAssets(updatedAssets);
    setHasStructureChanges(true);
    
    // Also clean up overrides for this ID to save space
    if (overrides[id]) {
        const newOverrides = { ...overrides };
        delete newOverrides[id];
        setOverrides(newOverrides);
        try {
           localStorage.setItem('db3d_asset_overrides', JSON.stringify(newOverrides));
        } catch(e) { /* ignore */ }
    }

    try {
      localStorage.setItem('db3d_assets_structure', JSON.stringify(updatedAssets));
    } catch (e) {
       console.warn("Failed to save structure to local storage");
    }
  };

  const exportConfig = () => {
    const config = {
      assets, // Includes the images inside the object if added via batch
      overrides, // Includes Logo and Hero Video
      generatedAt: new Date().toISOString(),
      note: "Copy the 'assets' array to constants.ts ASSETS, and 'overrides' values to constants.ts SITE_CONFIG."
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `db3d-config-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const resetConfig = () => {
    localStorage.removeItem('db3d_asset_overrides');
    localStorage.removeItem('db3d_assets_structure');
    setOverrides({});
    setAssets(ASSETS);
    setHasStructureChanges(false);
    window.location.reload();
  };

  // Use SITE_CONFIG as fallback
  const logoUrl = overrides['site_logo'] || SITE_CONFIG.logo;

  return (
    <AdminContext.Provider value={{ 
      isAdmin, 
      login, 
      logout, 
      overrides, 
      updateAssetImage, 
      logoUrl,
      assets,
      addAsset,
      batchAddAssets,
      deleteAsset,
      exportConfig,
      resetConfig,
      hasStructureChanges
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};