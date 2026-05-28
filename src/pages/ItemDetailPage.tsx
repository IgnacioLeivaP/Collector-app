import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Edit, Trash2, DollarSign } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { useNotifications } from '../contexts/NotificationsContext';
import { formatCurrency } from '../utils/settings';
import { CONDITIONS, PACKAGING_STATES } from '../utils/conditions';

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, removeItem, toggleShelf, toggleForSale } = useItems();
  const { notify } = useNotifications();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center">
        <p className="text-dark-300 mb-2">Item not found</p>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    removeItem(item.id);
    notify(`"${item.name}" deleted`, 'info');
    navigate('/');
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => toggleShelf(item.id)}
              className={`p-2 rounded-lg transition-colors ${
                item.isShelfItem
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-dark-700 text-dark-300 hover:text-white'
              }`}
              title={item.isShelfItem ? 'Remove from Shelf' : 'Add to Shelf'}
            >
              <Star className="w-5 h-5" fill={item.isShelfItem ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={() => toggleForSale(item.id)}
              className={`p-2 rounded-lg transition-colors ${
                item.isForSale
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-dark-700 text-dark-300 hover:text-white'
              }`}
              title={item.isForSale ? 'Remove from Sale' : 'Mark for Sale'}
            >
              <DollarSign className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate(`/item/${item.id}/edit`)}
              className="p-2 rounded-lg bg-dark-700 text-dark-300 hover:text-white transition-colors"
              title="Edit Item"
            >
              <Edit className="w-5 h-5" />
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-lg bg-dark-700 text-red-400 hover:bg-red-500/20 transition-colors"
              title="Delete Item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full aspect-square object-cover rounded-xl"
              />
            ) : (
              <div className="w-full aspect-square bg-dark-800 rounded-xl flex items-center justify-center">
                <span className="text-dark-400">No image available</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{item.name}</h1>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
                {item.category}
              </span>
            </div>

            <p className="text-dark-200">{item.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-dark-300 mb-1">Current Value</h3>
                <p className="text-white text-lg">{formatCurrency(item.value)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-dark-300 mb-1">Condition</h3>
                <p className="text-white">
                  {CONDITIONS[item.condition as keyof typeof CONDITIONS] ?? item.condition} ({item.condition})
                </p>
              </div>

              {item.packagingState && (
                <div>
                  <h3 className="text-sm font-medium text-dark-300 mb-1">Packaging</h3>
                  <p className="text-white">{PACKAGING_STATES[item.packagingState as keyof typeof PACKAGING_STATES] ?? item.packagingState}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-dark-300 mb-1">Acquired</h3>
                <p className="text-white">{item.acquisitionDate}</p>
              </div>

              {item.purchasePrice !== undefined && (
                <div>
                  <h3 className="text-sm font-medium text-dark-300 mb-1">Purchase Price</h3>
                  <p className="text-white">{formatCurrency(item.purchasePrice)}</p>
                </div>
              )}

              {item.releaseDate && (
                <div>
                  <h3 className="text-sm font-medium text-dark-300 mb-1">Released</h3>
                  <p className="text-white">{item.releaseDate}</p>
                </div>
              )}

              {item.color && (
                <div>
                  <h3 className="text-sm font-medium text-dark-300 mb-1">Color</h3>
                  <p className="text-white">{item.color}</p>
                </div>
              )}

              {item.variant && (
                <div>
                  <h3 className="text-sm font-medium text-dark-300 mb-1">Variant</h3>
                  <p className="text-white">{item.variant}</p>
                </div>
              )}
            </div>

            <div className="border-t border-dark-700 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {item.has.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-dark-300 mb-2">Includes</h3>
                    <ul className="space-y-1">
                      {item.has.map((thing, index) => (
                        <li key={index} className="text-white text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                          {thing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.missing.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-dark-300 mb-2">Missing</h3>
                    <ul className="space-y-1">
                      {item.missing.map((thing, index) => (
                        <li key={index} className="text-dark-400 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-dark-500 rounded-full" />
                          {thing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-800 p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Item</h3>
            <p className="text-dark-300 mb-4">
              Are you sure you want to delete "{item.name}"? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-dark-200 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
