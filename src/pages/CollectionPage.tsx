import React, { useEffect, useState } from 'react';
import { useItems } from '../hooks/useItems';
import { useSettings } from '../contexts/SettingsContext';
import { useNotifications } from '../contexts/NotificationsContext';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortOptions } from '../components/SortOptions';
import { sortOptions } from '../constants/sortOptions';
import { CollectionGrid } from '../components/CollectionGrid';
import { EditItemModal } from '../components/EditItemModal';
import { CollectionItem } from '../types/collection';

export function CollectionPage() {
  const { items, loading, error, loadItems, removeItem, toggleShelf, toggleWanted } = useItems();
  const { settings } = useSettings();
  const { notify } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState(settings.defaultSort);
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);

  useEffect(() => {
    setCurrentSort(settings.defaultSort);
  }, [settings.defaultSort]);

  const collectionItems = items.filter((item) => !item.isWanted);
  const filteredItems = selectedCategory
    ? collectionItems.filter((item) => item.category === selectedCategory)
    : collectionItems;

  const sortOption = sortOptions.find((option) => option.id === currentSort) ?? sortOptions[0];
  const sortedItems = [...filteredItems].sort(sortOption.sortFn);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-40 rounded-full bg-dark-700 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-3xl border border-dark-700 bg-dark-800 p-4 animate-pulse">
              <div className="h-40 rounded-3xl bg-dark-700" />
              <div className="h-5 w-3/4 rounded-full bg-dark-700" />
              <div className="h-4 w-1/2 rounded-full bg-dark-700" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-4 rounded-full bg-dark-700" />
                <div className="h-4 rounded-full bg-dark-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center">
        <p className="text-red-400 mb-2">Error loading collection</p>
        <button
          onClick={loadItems}
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Collection</h2>
        <div className="flex gap-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <SortOptions
            currentSort={currentSort}
            onSortChange={setCurrentSort}
          />
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center">
          <p className="text-dark-300 mb-2">No items found</p>
          <p className="text-dark-400 text-sm">
            Add items to your collection to see them here
          </p>
        </div>
      ) : (
        <CollectionGrid
          items={sortedItems}
          onDeleteItem={(id) => {
            removeItem(id);
            notify('Item deleted from collection', 'success');
          }}
          onEditItem={setEditingItem}
          onToggleShelf={(id) => {
            toggleShelf(id);
            notify('Item shelf status updated', 'info');
          }}
          onToggleWanted={(id) => {
            toggleWanted(id);
            notify('Item moved to wanted', 'success');
          }}
        />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={() => {
            setEditingItem(null);
            notify('Item updated successfully', 'success');
          }}
        />
      )}
    </div>
  );
}