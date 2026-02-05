import { Asset, MainCategory, SubCategory } from './types';

// URLs
export const LINKS = {
  HOME: 'https://www.db3drender.com/',
  CHECKOUT: 'https://www.db3drender.com/',
  INSTAGRAM: 'https://www.instagram.com/db3d.render/',
};

// =========================================================================
// 網站全域設定 (從 JSON 的 "overrides" 複製貼上到這裡)
// =========================================================================
export const SITE_CONFIG = {
  // 若您有更改 Logo，請將 JSON "overrides" -> "site_logo" 的內容貼在引號內
  logo: "https://placehold.co/100x100/3e2723/ffffff?text=DB",
  
  // 若您有更改首頁影片，請將 JSON "overrides" -> "hero_video" 的內容貼在引號內
  // 若留空則會顯示預設上傳介面
  heroVideo: "", 
};

// =========================================================================
// 素材資料庫
// =========================================================================

// 自動生成 Brick-DB3D_01 到 Brick-DB3D_62 的資料
const exteriorBrickAssets: Asset[] = Array.from({ length: 62 }, (_, index) => {
  const num = (index + 1).toString().padStart(2, '0'); // 轉為 01, 02... 62
  const filename = `Brick-DB3D_${num}`;
  
  return {
    id: filename.toLowerCase().replace('_', '-'), // ID: brick-db3d-01
    title: filename,                              // Title: Brick-DB3D_01
    mainCategory: 'MATERIALS',
    subCategory: SubCategory.EXTERIOR,
    imageUrl: `/images/${filename}.png`,          // Path: /images/Brick-DB3D_01.png
    description: 'D5 Render Exterior Material'
  };
});

export const ASSETS: Asset[] = [
  ...exteriorBrickAssets,
  // 未來若有其他手動新增的項目可以接續在下面
];

export const CATEGORY_MAP: Record<MainCategory, SubCategory[]> = {
  MATERIALS: [
    SubCategory.EXTERIOR,
    SubCategory.WOOD_FLOOR,
    SubCategory.WOOD_GRAIN,
    SubCategory.GLASS_METAL,
    SubCategory.WALL_PAINT,
    SubCategory.LEATHER,
    SubCategory.FABRIC,
    SubCategory.STONE,
    SubCategory.TILES,
    SubCategory.TERRAZZO,
  ],
  MODELS: [
    SubCategory.SOFA,
    SubCategory.BED,
    SubCategory.CHAIR,
    SubCategory.COFFEE_TABLE,
    SubCategory.TABLE,
    SubCategory.ELECTRONICS,
    SubCategory.LIGHTING,
    SubCategory.TRACK_LIGHT,
    SubCategory.KITCHENWARE,
    SubCategory.PLANTS,
    SubCategory.DECO,
    SubCategory.BATHROOM,
    SubCategory.RUG,
    SubCategory.CURTAIN,
  ],
};