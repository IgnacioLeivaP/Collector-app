import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { CollectionItem } from '../types/collection';
import { saveItem } from '../utils/storage';

interface AddItemFormProps {
  onItemAdded: () => void;
  categories: string[];
}

export function AddItemForm({ onItemAdded, categories }: AddItemFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0] || '',
    description: '',
    condition: '',
    acquisitionDate: '',
    value: '',
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: CollectionItem = {
      id: Date.now().toString(),
      ...formData,
      value: Number(formData.value),
    };
    saveItem(newItem);
    setFormData({
      name: '',
      category: categories[0] || '',
      description: '',
      condition: '',
      acquisitionDate: '',
      value: '',
      imageUrl: '',
    });
    onItemAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-800 p-6 rounded-xl shadow-xl border border-dark-700">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <PlusCircle className="w-6 h-6 text-indigo-400" />
        Add New Item
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-200">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200">Category</label>
          <select
            className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-dark-200">Description</label>
          <textarea
            className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200">Condition</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
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
            className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200">Acquisition Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            value={formData.acquisitionDate}
            onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200">Image URL</label>
          <input
            type="url"
            className="mt-1 block w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-dark-800 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
      >
        Add to Collection
      </button>
    </form>
  );
}