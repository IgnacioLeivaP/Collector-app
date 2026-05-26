import React from 'react';
import { Sliders } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationsContext';
import { useSettings } from '../contexts/SettingsContext';
import { sortOptions } from '../constants/sortOptions';

export function SettingsPage() {
  const { settings, toggleTheme, setDefaultSort, setSectionVisibility, clearAppData } = useSettings();
  const { notify } = useNotifications();

  const exportData = () => {
    const payload = {
      collection_items: JSON.parse(localStorage.getItem('collection_items') ?? '[]'),
      collection_categories: JSON.parse(localStorage.getItem('collection_categories') ?? '[]'),
      app_settings: JSON.parse(localStorage.getItem('app_settings') ?? '{}'),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'collector-app-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    notify('Data exported successfully', 'success');
  };

  const applyImportedData = (payload: unknown) => {
    if (typeof payload !== 'object' || payload === null) {
      throw new Error('Import file must be a JSON object');
    }

    const imported = payload as Record<string, unknown>;

    if ('collection_items' in imported) {
      localStorage.setItem('collection_items', JSON.stringify(imported.collection_items));
    }
    if ('collection_categories' in imported) {
      localStorage.setItem('collection_categories', JSON.stringify(imported.collection_categories));
    }
    if ('app_settings' in imported) {
      localStorage.setItem('app_settings', JSON.stringify(imported.app_settings));
    }

    notify('Data imported successfully. Reloading...', 'success');
    setTimeout(() => window.location.reload(), 300);
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const rawText = await file.text();
      const payload = JSON.parse(rawText);
      applyImportedData(payload);
    } catch {
      notify('Unable to import file. Make sure it is valid JSON.', 'error');
    }
  };

  const handleClear = () => {
    if (
      window.confirm(
        'This will remove all items, categories and settings. Do you want to continue?'
      )
    ) {
      clearAppData();
      notify('All application data has been cleared', 'success');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Sliders className="w-6 h-6" />
            Settings
          </h2>
          <p className="text-dark-400 text-sm max-w-2xl">
            Configure theme, default sort order and which sections are visible in the app.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
          <p className="text-dark-300 mb-4">Switch between dark and light appearance.</p>
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              notify(`Theme switched to ${settings.theme === 'dark' ? 'light' : 'dark'}`, 'success');
            }}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
          >
            Use {settings.theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4">Default sort</h3>
          <p className="text-dark-300 mb-4">Choose how items are ordered when you open a list.</p>
          <select
            value={settings.defaultSort}
            onChange={(event) => setDefaultSort(event.target.value)}
            className="w-full rounded-lg bg-dark-900 border border-dark-700 px-4 py-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <h3 className="text-lg font-semibold text-white mb-4">Visible sections</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-dark-200">
            <input
              type="checkbox"
              checked={settings.showCollection}
              onChange={(event) => setSectionVisibility('showCollection', event.target.checked)}
              className="h-4 w-4 rounded border-dark-600 bg-dark-900 text-indigo-500 focus:ring-indigo-500"
            />
            Show Collection section
          </label>
          <label className="flex items-center gap-3 text-dark-200">
            <input
              type="checkbox"
              checked={settings.showShelf}
              onChange={(event) => setSectionVisibility('showShelf', event.target.checked)}
              className="h-4 w-4 rounded border-dark-600 bg-dark-900 text-indigo-500 focus:ring-indigo-500"
            />
            Show Shelf section
          </label>
          <label className="flex items-center gap-3 text-dark-200">
            <input
              type="checkbox"
              checked={settings.showWanted}
              onChange={(event) => setSectionVisibility('showWanted', event.target.checked)}
              className="h-4 w-4 rounded border-dark-600 bg-dark-900 text-indigo-500 focus:ring-indigo-500"
            />
            Show Wanted section
          </label>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4">Import data</h3>
          <p className="text-dark-300 mb-4">Upload a JSON export to restore app state.</p>
          <label className="block text-sm font-medium text-dark-200 mb-2">JSON file import</label>
          <input
            type="file"
            accept="application/json"
            onChange={handleImportFile}
            className="w-full rounded-lg bg-dark-900 border border-dark-700 text-white px-4 py-2"
          />
        </div>

        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4">Export data</h3>
          <p className="text-dark-300 mb-4">
            Download your current cards, categories, and settings in a JSON file that can be re-imported later.
          </p>
          <button
            type="button"
            onClick={exportData}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
          >
            Export JSON
          </button>
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Clear stored data</h3>
            <p className="text-dark-300 text-sm">
              Remove all saved items, categories and settings from local storage.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
          >
            Clear all data
          </button>
        </div>
      </div>
    </div>
  );
}
