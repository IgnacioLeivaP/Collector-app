import { CollectionItem } from '../types/collection';

const STORAGE_KEY = 'collection_items';
const CATEGORIES_KEY = 'collection_categories';

export function loadAllItems(): CollectionItem[] {
  const items = localStorage.getItem(STORAGE_KEY);
  if (!items) return [];
  try {
    return JSON.parse(items);
  } catch {
    return [];
  }
}

export function saveItem(item: CollectionItem) {
  const items = loadAllItems();
  const existingIndex = items.findIndex((i) => i.id === item.id);
  
  if (existingIndex >= 0) {
    items[existingIndex] = item;
  } else {
    items.push(item);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function deleteItem(id: string) {
  const items = loadAllItems();
  const filteredItems = items.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems));
}

export function toggleShelfItem(id: string): boolean {
  const items = loadAllItems();
  const item = items.find((i) => i.id === id);
  
  if (!item) return false;
  
  item.isShelfItem = !item.isShelfItem;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return true;
}

export function loadCategories(): string[] {
  const categories = localStorage.getItem(CATEGORIES_KEY);
  if (!categories) return [];
  try {
    return JSON.parse(categories);
  } catch {
    return [];
  }
}

export function saveCategory(category: string) {
  const categories = loadCategories();
  if (!categories.includes(category)) {
    categories.push(category);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
  return categories;
}