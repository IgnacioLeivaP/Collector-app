import React, { useState } from 'react';
import { PlusCircle, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { CollectionItem } from '../types/collection';
import { saveItem, saveCategory, loadCategories } from '../utils/storage';

interface AddItemFormProps {
  onItemAdded: () => void;
  categories: string[];
}

type AddToOption = 'collection' | 'wanted';

export function AddItemForm({ onItemAdded, categories }: AddItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0] || '',
    description: '',
    condition: '',
    value: '',
    imageUrl: '',
    acquisitionDate: '',
    isWanted: false,
    has: [] as string[],
    missing: [] as string[],
    releaseDate: '',
    color: '',
    variant: ''
  });

  const [addToOption, setAddToOption] = useState<AddToOption>('collection');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [newHasItem, setNewHasItem] = useState('');
  const [newMissingItem, setNewMissingItem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: CollectionItem = {
      id: crypto.randomUUID(),
      ...formData,
      value: Number(formData.value) || 0,
      isWanted: addToOption === 'wanted'
    };
    saveItem(newItem);
    onItemAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-dark-200 mb-2">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200 mb-2">Category</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-dark-200 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200 mb-2">Condition</label>
          <input
            type="text"
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200 mb-2">Value</label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200 mb-2">Image URL</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200 mb-2">Acquisition Date</label>
          <input
            type="date"
            value={formData.acquisitionDate}
            onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
            className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
          />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark-200 mb-2">Add to</label>
              <select
                value={addToOption}
                onChange={(e) => setAddToOption(e.target.value as AddToOption)}
                className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
              >
                <option value="collection">Collection</option>
                <option value="wanted">Wanted</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-dark-800 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 text-sm font-medium"
            >
              Add to {addToOption.charAt(0).toUpperCase() + addToOption.slice(1)}
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Options Section */}
      <div className="border border-dark-700 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="w-full px-4 py-3 flex items-center justify-between bg-dark-800 hover:bg-dark-700 transition-colors"
        >
          <span className="text-sm font-medium text-white">Advanced Options</span>
          {isAdvancedOpen ? (
            <ChevronUp className="w-5 h-5 text-dark-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-dark-300" />
          )}
        </button>

        {isAdvancedOpen && (
          <div className="p-4 bg-dark-800/50 border-t border-dark-700 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Release Date</label>
                <input
                  type="date"
                  value={formData.releaseDate}
                  onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                  className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Color</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g. Black, Red, Limited Edition"
                  className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Variant</label>
                <input
                  type="text"
                  value={formData.variant}
                  onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                  placeholder="e.g. US Version, PAL, Digital"
                  className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
                />
              </div>
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
                        onClick={() => {
                          const newHas = [...formData.has];
                          newHas.splice(index, 1);
                          setFormData({ ...formData, has: newHas });
                        }}
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
                      className="flex-1 rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newHasItem.trim()) {
                          setFormData({
                            ...formData,
                            has: [...formData.has, newHasItem.trim()]
                          });
                          setNewHasItem('');
                        }
                      }}
                      className="p-2 text-dark-300 hover:text-white"
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
                        onClick={() => {
                          const newMissing = [...formData.missing];
                          newMissing.splice(index, 1);
                          setFormData({ ...formData, missing: newMissing });
                        }}
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
                      className="flex-1 rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newMissingItem.trim()) {
                          setFormData({
                            ...formData,
                            missing: [...formData.missing, newMissingItem.trim()]
                          });
                          setNewMissingItem('');
                        }
                      }}
                      className="p-2 text-dark-300 hover:text-white"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}