import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortOptions } from '../components/SortOptions';
import { CollectionGrid } from '../components/CollectionGrid';
import { EditItemModal } from '../components/EditItemModal';
import { CollectionItem } from '../types/collection';
import { Library } from 'lucide-react';

export function CollectionPage() {
  const { items, loading, error, loadItems } = useItems();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState('name-asc');
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);

  const collectionItems = items.filter(item => !item.isWanted);
  const filteredItems = selectedCategory
    ? collectionItems.filter(item => item.category === selectedCategory)
    : collectionItems;

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (currentSort) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'value-asc':
        return a.value - b.value;
      case 'value-desc':
        return b.value - a.value;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-dark-300">Loading...</div>
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
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center gap-3 mb-8">
        <Library className="w-8 h-8 text-indigo-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Collection</h2>
          <p className="text-dark-300 text-sm">Manage and organize your items</p>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-lg">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <div className="glass-card p-4 rounded-lg">
        <SortOptions
          currentSort={currentSort}
          onSortChange={setCurrentSort}
        />
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
          onItemDeleted={loadItems}
          onEditItem={setEditingItem}
          onShelfToggle={loadItems}
        />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={() => {
            loadItems();
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}