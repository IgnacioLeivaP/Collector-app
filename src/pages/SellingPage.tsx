import React from 'react';
import { DollarSign } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { CollectionGrid } from '../components/CollectionGrid';

export function SellingPage() {
  const { items, loadItems } = useItems();
  const sellingItems = items.filter(item => item.isForSale);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <DollarSign className="w-8 h-8 text-green-500" />
        <div>
          <h2 className="text-2xl font-bold text-white">Items for Sale</h2>
          <p className="text-dark-300 text-sm">Manage your items that are currently for sale</p>
        </div>
      </div>

      {sellingItems.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center">
          <p className="text-dark-300 mb-2">No items for sale</p>
          <p className="text-dark-400 text-sm">
            Mark items for sale from their detail page to see them here
          </p>
        </div>
      ) : (
        <CollectionGrid
          items={sellingItems}
          onItemDeleted={loadItems}
          onEditItem={() => {}}
          onShelfToggle={loadItems}
        />
      )}
    </div>
  );
}