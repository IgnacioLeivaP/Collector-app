import { CollectionItem } from '../types/collection';

const STORAGE_KEY = 'collection_items';
const CATEGORIES_KEY = 'collection_categories';

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isValidCollectionItem(value: unknown): value is CollectionItem {
  if (typeof value !== 'object' || value === null) return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.category === 'string' &&
    typeof item.description === 'string' &&
    typeof item.condition === 'string' &&
    typeof item.value === 'number' &&
    typeof item.imageUrl === 'string' &&
    typeof item.acquisitionDate === 'string' &&
    Array.isArray(item.has) &&
    Array.isArray(item.missing)
  );
}

function normalizeItem(value: unknown): CollectionItem | null {
  if (!isValidCollectionItem(value)) return null;

  const item = value as CollectionItem;
  return {
    ...item,
    name: item.name.trim(),
    category: item.category.trim(),
    description: item.description.trim(),
    condition: item.condition.trim(),
    imageUrl: item.imageUrl.trim(),
    acquisitionDate: item.acquisitionDate.trim(),
    value: Number(item.value) || 0,
    has: isStringArray(item.has) ? item.has.map((entry) => entry.trim()) : [],
    missing: isStringArray(item.missing) ? item.missing.map((entry) => entry.trim()) : [],
    isShelfItem: Boolean(item.isShelfItem),
    isWanted: Boolean(item.isWanted),
  };
}

export function loadAllItems(): CollectionItem[] {
  const items = localStorage.getItem(STORAGE_KEY);
  if (!items) return [];

  try {
    const parsed = JSON.parse(items);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeItem)
      .filter((item): item is CollectionItem => item !== null)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

export function saveItem(item: CollectionItem) {
  const sanitizedItem: CollectionItem = {
    ...item,
    id: item.id,
    name: item.name.trim(),
    category: item.category.trim(),
    description: item.description.trim(),
    condition: item.condition.trim(),
    imageUrl: item.imageUrl.trim(),
    acquisitionDate: item.acquisitionDate.trim(),
    value: Number(item.value) || 0,
    has: Array.isArray(item.has) ? item.has.map((entry) => String(entry).trim()) : [],
    missing: Array.isArray(item.missing) ? item.missing.map((entry) => String(entry).trim()) : [],
    isShelfItem: Boolean(item.isShelfItem),
    isWanted: Boolean(item.isWanted),
  };

  const items = loadAllItems();
  const existingIndex = items.findIndex((i) => i.id === sanitizedItem.id);
  
  if (existingIndex >= 0) {
    items[existingIndex] = sanitizedItem;
  } else {
    items.push(sanitizedItem);
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

export function toggleWantedItem(id: string): boolean {
  const items = loadAllItems();
  const item = items.find((i) => i.id === id);
  if (!item) return false;

  const nextIsWanted = !item.isWanted;
  item.isWanted = nextIsWanted;
  if (nextIsWanted) {
    item.isShelfItem = false;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return true;
}

export function loadCategories(): string[] {
  const categories = localStorage.getItem(CATEGORIES_KEY);
  if (!categories) return [];

  try {
    const parsed = JSON.parse(categories);
    if (!isStringArray(parsed)) return [];
    return Array.from(new Set(parsed.map((category) => category.trim()).filter(Boolean))).sort();
  } catch {
    return [];
  }
}

export function saveCategory(category: string) {
  const normalized = category.trim();
  if (!normalized) return loadCategories();

  const categories = loadCategories();
  if (!categories.includes(normalized)) {
    categories.push(normalized);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
  return categories;
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(CATEGORIES_KEY);
}
