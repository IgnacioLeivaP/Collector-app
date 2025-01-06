export type ItemCategory = string;

export interface CollectionItem {
  id: string;
  name: string;
  category: string;
  description: string;
  condition: string;
  value: number;
  imageUrl: string;
  acquisitionDate: string;
  isShelfItem?: boolean;
  has: string[];
  missing: string[];
  releaseDate?: string;
  color?: string;
  variant?: string;
  isWanted?: boolean;
}