import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { useSettings } from '../contexts/SettingsContext';
import { useNotifications } from '../contexts/NotificationsContext';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortOptions } from '../components/SortOptions';
import { sortOptions } from '../constants/sortOptions';
import { WantedList } from '../components/WantedList';
import { EditItemModal } from '../components/EditItemModal';
import { CollectionItem } from '../types/collection';

export function WantedPage() {
  const navigate = useNavigate();
  const { items, loading, error, loadItems, removeItem, toggleWanted } = useItems();
  const { settings } = useSettings();
  const { notify } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState(settings.defaultSort);
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);

  useEffect(() => {
    setCurrentSort(settings.defaultSort);
  }, [settings.defaultSort]);

  const wantedItems = items.filter((item) => item.isWanted);
  const filteredItems = selectedCategory
    ? wantedItems.filter((item) => item.category === selectedCategory)
    : wantedItems;

  const sortOption = sortOptions.find((option) => option.id === currentSort) ?? sortOptions[0];
  const sortedItems = [...filteredItems].sort(sortOption.sortFn);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-40 rounded-full bg-dark-700 animate-pulse" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-3xl border border-dark-700 bg-dark-800 p-4 animate-pulse">
              <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                <div className="h-48 rounded-3xl bg-dark-700" />
                <div className="space-y-3">
                  <div className="h-5 w-3/4 rounded-full bg-dark-700" />
                  <div className="h-4 w-1/2 rounded-full bg-dark-700" />
                  <div className="h-4 w-2/3 rounded-full bg-dark-700" />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="h-4 rounded-full bg-dark-700" />
                    <div className="h-4 rounded-full bg-dark-700" />
                    <div className="h-4 rounded-full bg-dark-700" />
                  </div>
                </div>
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
          onDeleteItem={(id) => {
            removeItem(id);
            notify('Wanted item removed', 'success');
          }}
          onEditItem={setEditingItem}
          onToggleWanted={(id) => {
            toggleWanted(id);
            notify('Item moved back to collection', 'success');
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