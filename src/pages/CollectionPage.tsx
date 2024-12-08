import React, { useState } from 'react';
import { CollectionGrid } from '../components/CollectionGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import { useItems } from '../hooks/useItems';
import { useCategories } from '../hooks/useCategories';

export function CollectionPage() {
  const { items, loadItems } = useItems();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categoriesWithItems = useCategories(items);

  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">My Collection</h2>
        <p className="text-dark-300">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
        </p>
      </div>

      {categoriesWithItems.length > 0 ? (
        <>
          <CategoryFilter
            categories={categoriesWithItems}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <CollectionGrid items={filteredItems} onItemDeleted={loadItems} />
        </>
      ) : (
        <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center">
          <p className="text-dark-300 mb-2">Your collection is empty</p>
          <p className="text-dark-400 text-sm">
            Add some items to start organizing your collection
          </p>
        </div>
      )}
    </div>
  );
}