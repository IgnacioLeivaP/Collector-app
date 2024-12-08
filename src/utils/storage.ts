import { CollectionItem } from '../types/collection';

const DEFAULT_CATEGORIES = ['videogames', 'consoles', 'coins', 'miniature-cars', 'books', 'comics'];

export const saveItem = (item: CollectionItem): void => {
  const items = getItems();
  items.push(item);
  localStorage.setItem('collection', JSON.stringify(items));
};

export const getItems = (): CollectionItem[] => {
  const items = localStorage.getItem('collection');
  return items ? JSON.parse(items) : [];
};

export const deleteItem = (id: string): void => {
  const items = getItems().filter(item => item.id !== id);
  localStorage.setItem('collection', JSON.stringify(items));
};

export const getCategories = (): string[] => {
  const categories = localStorage.getItem('categories');
  return categories ? JSON.parse(categories) : DEFAULT_CATEGORIES;
};

export const addCategory = (category: string): void => {
  const categories = getCategories();
  if (!categories.includes(category)) {
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
  }
};