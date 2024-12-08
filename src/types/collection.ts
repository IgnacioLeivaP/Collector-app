export type ItemCategory = string;

export interface CollectionItem {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;
  condition: string;
  acquisitionDate: string;
  value: number;
  imageUrl?: string;
}