import React from 'react';
import { Star } from 'lucide-react';
import { useItems } from '../hooks/useItems';

export function ShelfPage() {
  const { items } = useItems();
  const shelfItems = items.filter(item => item.isShelfItem);
  const emptySlots = Array(24 - shelfItems.length).fill(null);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Star className="w-8 h-8 text-yellow-500" fill="currentColor" />
        <div>
          <h2 className="text-2xl font-bold text-white">Showcase Shelf</h2>
          <p className="text-dark-300 text-sm">Display the items you're most proud of</p>
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelfItems.map((item) => (
            <div
              key={item.id}
              className="bg-dark-900 rounded-lg overflow-hidden border border-dark-700 hover:border-indigo-500/50 transition-colors"
            >
              {item.imageUrl ? (
                <div className="aspect-square">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-dark-800 flex items-center justify-center">
                  <span className="text-dark-400">No image</span>
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-medium truncate uppercase text-sm">
                    {item.name}
                  </h3>
                  <p className="text-indigo-400 text-xs ml-2">
                    ${item.value.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {emptySlots.map((_, index) => (
            <div
              key={`empty-${index}`}
              className="aspect-square bg-dark-900/50 rounded-lg border border-dashed border-dark-700 flex items-center justify-center"
            >
              <span className="text-dark-400 text-sm">Empty Slot</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 