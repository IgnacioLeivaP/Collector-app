export type ItemCondition = 'M' | 'NM' | 'VG' | 'G' | 'F' | 'P';
export type PackagingState = 'S' | 'CIB' | 'Boxed' | 'Loose' | 'N/A';

export interface CollectionItem {
  id: string;
  name: string;
  category: string;
  description: string;
  condition: ItemCondition;
  packagingState: PackagingState;
  value: number;
  purchasePrice?: number;
  imageUrl: string;
  acquisitionDate: string;
  isShelfItem?: boolean;
  isForSale?: boolean;
  has: string[];
  missing: string[];
  releaseDate?: string;
  color?: string;
  variant?: string;
  isWanted?: boolean;
}