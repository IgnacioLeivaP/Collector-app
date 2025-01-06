import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { CollectionItem } from '../types/collection';
import { saveItem } from '../utils/storage';

interface EditItemModalProps {
  item: CollectionItem;
  onClose: () => void;
  onSave: () => void;
}

export function EditItemModal({ item, onClose, onSave }: EditItemModalProps) {
  const [formData, setFormData] = useState({
    ...item,
    has: item.has || [],
    missing: item.missing || []
  });
  const [newHasItem, setNewHasItem] = useState('');
  const [newMissingItem, setNewMissingItem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveItem(formData);
    onSave();
  };

  const addHasItem = () => {
    if (newHasItem.trim() && newHasItem.length <= 30) {
      setFormData(prev => ({
        ...prev,
        has: [...prev.has, newHasItem.trim()]
      }));
      setNewHasItem('');
    }
  };

  const addMissingItem = () => {
    if (newMissingItem.trim() && newMissingItem.length <= 30) {
      setFormData(prev => ({
        ...prev,
        missing: [...prev.missing, newMissingItem.trim()]
      }));
      setNewMissingItem('');
    }
  };

  const removeHasItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      has: prev.has.filter((_, i) => i !== index)
    }));
  };

  const removeMissingItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      missing: prev.missing.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-800 p-6 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Edit Item</h2>
          <button onClick={onClose} className="text-dark-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-200">Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200">Category</label>
            <select
              required
              className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200">Description</label>
            <textarea
              className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200">Condition</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200">Value ($)</label>
            <input
              type="number"
              step="0.01"
              required
              className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200">Acquisition Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
              value={formData.acquisitionDate}
              onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200">Image URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Has</label>
              <div className="space-y-2">
                {formData.has.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-white flex-1">{item}</span>
                    <button
                      type="button"
                      onClick={() => removeHasItem(index)}
                      className="text-dark-300 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHasItem}
                    onChange={(e) => setNewHasItem(e.target.value)}
                    maxLength={30}
                    placeholder="Add new item"
                    className="flex-1 rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 py-1 text-sm"
                  />
                  <button
                    type="button"
                    onClick={addHasItem}
                    className="p-1 text-dark-300 hover:text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Missing</label>
              <div className="space-y-2">
                {formData.missing.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-white flex-1">{item}</span>
                    <button
                      type="button"
                      onClick={() => removeMissingItem(index)}
                      className="text-dark-300 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMissingItem}
                    onChange={(e) => setNewMissingItem(e.target.value)}
                    maxLength={30}
                    placeholder="Add new item"
                    className="flex-1 rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 py-1 text-sm"
                  />
                  <button
                    type="button"
                    onClick={addMissingItem}
                    className="p-1 text-dark-300 hover:text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-dark-200 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 