import { CollectionItem } from '../types/collection';

const STORAGE_KEY = 'shelfu_items';
const CATEGORIES_KEY = 'shelfu_categories';

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
    purchasePrice: item.purchasePrice !== undefined ? Number(item.purchasePrice) || undefined : undefined,
    has: isStringArray(item.has) ? item.has.map((e) => e.trim()) : [],
    missing: isStringArray(item.missing) ? item.missing.map((e) => e.trim()) : [],
    isShelfItem: Boolean(item.isShelfItem),
    isForSale: Boolean(item.isForSale),
    isWanted: Boolean(item.isWanted),
  };
}

export function loadAllItems(): CollectionItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeItem)
      .filter((item): item is CollectionItem => item !== null);
  } catch {
    return [];
  }
}

export function saveItem(item: CollectionItem) {
  const sanitized: CollectionItem = {
    ...item,
    name: item.name.trim(),
    category: item.category.trim(),
    description: item.description.trim(),
    condition: item.condition.trim(),
    imageUrl: item.imageUrl.trim(),
    acquisitionDate: item.acquisitionDate.trim(),
    value: Number(item.value) || 0,
    purchasePrice: item.purchasePrice !== undefined ? Number(item.purchasePrice) || undefined : undefined,
    has: Array.isArray(item.has) ? item.has.map((e) => String(e).trim()) : [],
    missing: Array.isArray(item.missing) ? item.missing.map((e) => String(e).trim()) : [],
    isShelfItem: Boolean(item.isShelfItem),
    isForSale: Boolean(item.isForSale),
    isWanted: Boolean(item.isWanted),
  };

  const items = loadAllItems();
  const idx = items.findIndex((i) => i.id === sanitized.id);
  if (idx >= 0) {
    items[idx] = sanitized;
  } else {
    items.push(sanitized);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function deleteItem(id: string) {
  const items = loadAllItems().filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function toggleShelfItem(id: string): boolean {
  const items = loadAllItems();
  const item = items.find((i) => i.id === id);
  if (!item) return false;
  item.isShelfItem = !item.isShelfItem;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return true;
}

export function toggleForSale(id: string): boolean {
  const items = loadAllItems();
  const item = items.find((i) => i.id === id);
  if (!item) return false;
  item.isForSale = !item.isForSale;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return true;
}

export function toggleWantedItem(id: string): boolean {
  const items = loadAllItems();
  const item = items.find((i) => i.id === id);
  if (!item) return false;
  const nextIsWanted = !item.isWanted;
  item.isWanted = nextIsWanted;
  if (nextIsWanted) item.isShelfItem = false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return true;
}

export function loadCategories(): string[] {
  const raw = localStorage.getItem(CATEGORIES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!isStringArray(parsed)) return [];
    return Array.from(new Set(parsed.map((c) => c.trim()).filter(Boolean))).sort();
  } catch {
    return [];
  }
}

export function saveCategory(category: string): string[] {
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

export function exportCollection() {
  const items = loadAllItems();
  const categories = loadCategories();
  const data = {
    items,
    categories,
    exportDate: new Date().toISOString(),
    version: '2.0',
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dust-collector-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importCollection(file: File): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (!data.items || !Array.isArray(data.items)) {
          throw new Error('Invalid format: missing items array');
        }
        if (!data.categories || !Array.isArray(data.categories)) {
          throw new Error('Invalid format: missing categories array');
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.items));
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(data.categories));
        resolve({
          success: true,
          message: `Imported ${data.items.length} items and ${data.categories.length} categories`,
        });
      } catch (error) {
        resolve({
          success: false,
          message: `Import error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    };
    reader.onerror = () => resolve({ success: false, message: 'Error reading file' });
    reader.readAsText(file);
  });
}
