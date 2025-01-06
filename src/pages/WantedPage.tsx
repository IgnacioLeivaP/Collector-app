import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortOptions } from '../components/SortOptions';
import { WantedList } from '../components/WantedList';
import { EditItemModal } from '../components/EditItemModal';
import { CollectionItem } from '../types/collection';

export function WantedPage() {
  const navigate = useNavigate();
  const { items, loading, error, loadItems } = useItems();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState('name-asc');
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);

  const wantedItems = items.filter(item => item.isWanted);
  const filteredItems = selectedCategory
    ? wantedItems.filter(item => item.category === selectedCategory)
    : wantedItems;

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
        <p className="text-red-400 mb-2">Error loading wanted items</p>
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
        <h2 className="text-2xl font-bold text-white">Wanted Items</h2>
        <div className="flex items-center gap-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <SortOptions
            currentSort={currentSort}
            onSortChange={setCurrentSort}
          />
          <button
            onClick={() => navigate('/add')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Wanted Item</span>
          </button>
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center">
          <p className="text-dark-300 mb-2">No wanted items found</p>
          <p className="text-dark-400 text-sm mb-4">
            Add items to your wanted list to see them here
          </p>
          <button
            onClick={() => navigate('/add')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Wanted Item</span>
          </button>
        </div>
      ) : (
        <WantedList
          items={sortedItems}
          onItemDeleted={loadItems}
          onEditItem={setEditingItem}
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