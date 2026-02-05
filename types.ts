export type MainCategory = 'MODELS' | 'MATERIALS';

export enum SubCategory {
  // Materials
  WOOD_FLOOR = '木地板 (Wood Floor)',
  WOOD_GRAIN = '木紋 (Wood Grain)',
  GLASS_METAL = '玻璃金屬 (Glass & Metal)',
  WALL_PAINT = '牆漆塗料 (Wall Paint)',
  LEATHER = '皮革 (Leather)',
  FABRIC = '布料 (Fabric)',
  STONE = '石紋 (Stone)',
  TILES = '磁磚 (Tiles)',
  TERRAZZO = '水磨石 (Terrazzo)',
  EXTERIOR = '室外磚+鋪面 (Exterior)',

  // Models
  SOFA = '沙發 (Sofa)',
  BED = '床 (Bed)',
  CHAIR = '單椅 (Chair)',
  COFFEE_TABLE = '茶几 (Coffee Table)',
  TABLE = '桌子 (Table)',
  ELECTRONICS = '家電3C (Electronics)',
  LIGHTING = '燈具 (Lighting)',
  TRACK_LIGHT = '嵌燈軌道燈 (Track Light)',
  KITCHENWARE = '廚房用品 (Kitchenware)',
  PLANTS = '植栽 (Plants)',
  DECO = '擺飾 (Decor)',
  BATHROOM = '衛浴設備 (Bathroom)',
  RUG = '地毯 (Rug)',
  CURTAIN = '窗簾 (Curtain)',
}

export interface Asset {
  id: string;
  title: string;
  mainCategory: MainCategory;
  subCategory: SubCategory;
  imageUrl: string;
  description?: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}