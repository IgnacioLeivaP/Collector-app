import React, { useRef } from 'react';
import { Settings, Download, Upload, Coffee, MessageCircle, Sun, Moon, Trash2 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useNotifications } from '../contexts/NotificationsContext';
import { exportCollection, importCollection } from '../utils/storage';

export function SettingsPage() {
  const { settings, updateSettings, toggleTheme, clearAppData } = useSettings();
  const { notify } = useNotifications();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await importCollection(file);
    notify(result.message, result.success ? 'success' : 'error');
    if (result.success) window.location.reload();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-indigo-500' : 'bg-dark-700'}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform bg-white ${value ? 'translate-x-6' : ''}`} />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-indigo-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <p className="text-dark-300 text-sm">Customize your experience</p>
        </div>
      </div>

      {/* Appearance */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {settings.theme === 'dark' ? (
              <Moon className="w-5 h-5 text-indigo-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
            <label className="text-dark-100">
              {settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </label>
          </div>
          <Toggle value={settings.theme === 'light'} onChange={toggleTheme} />
        </div>
      </div>

      {/* Navigation Settings */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
        <div className="space-y-4">
          {[
            { key: 'showShelf', label: 'Show Shelf Tab' },
            { key: 'showSelling', label: 'Show Selling Tab' },
            { key: 'showWanted', label: 'Show Wanted Tab' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-dark-100">{label}</label>
              <Toggle
                value={settings[key as keyof typeof settings] as boolean}
                onChange={() => updateSettings({ [key]: !settings[key as keyof typeof settings] })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Currency Settings */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Currency Format</h3>
        <div className="space-y-4">
          <div>
            <label className="text-dark-100 block mb-2">Currency Symbol</label>
            <select
              value={settings.currencySymbol}
              onChange={(e) => updateSettings({ currencySymbol: e.target.value })}
              className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
            >
              <option value="$">$ (Dollar)</option>
              <option value="€">€ (Euro)</option>
              <option value="£">£ (Pound)</option>
              <option value="¥">¥ (Yen)</option>
            </select>
          </div>

          <div>
            <label className="text-dark-100 block mb-2">Thousands Separator</label>
            <select
              value={settings.thousandsSeparator}
              onChange={(e) => updateSettings({ thousandsSeparator: e.target.value as '.' | ',' })}
              className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
            >
              <option value=",">Comma (1,234.56)</option>
              <option value=".">Point (1.234,56)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-dark-100">Show Cents</label>
            <Toggle
              value={settings.showCents}
              onChange={() => updateSettings({ showCents: !settings.showCents })}
            />
          </div>
        </div>
      </div>

      {/* Shelf Display Settings */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Shelf Display</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-dark-100">Show Item Values</label>
            <Toggle
              value={settings.showShelfItemValues}
              onChange={() => updateSettings({ showShelfItemValues: !settings.showShelfItemValues })}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-dark-100">Show Total Value</label>
            <Toggle
              value={settings.showShelfTotalValue}
              onChange={() => updateSettings({ showShelfTotalValue: !settings.showShelfTotalValue })}
            />
          </div>
        </div>
      </div>

      {/* Import/Export */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
        <div className="space-y-4">
          <button
            onClick={() => { exportCollection(); notify('Collection exported', 'success'); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Collection
          </button>

          <label className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            Import Collection
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (window.confirm('Delete ALL data? This cannot be undone.')) {
                clearAppData();
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            Clear All Data
          </button>
        </div>
      </div>

      {/* Support */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
        <div className="space-y-4">
          <a
            href="https://buymeacoffee.com/nispero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors"
          >
            <Coffee className="w-5 h-5 text-yellow-500" />
            <div>
              <h4 className="text-white font-medium">Buy me a coffee</h4>
              <p className="text-dark-300 text-sm">Support the development</p>
            </div>
          </a>

          <a
            href="mailto:ignacio.leiva06@gmail.com"
            className="flex items-center gap-3 p-3 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-indigo-400" />
            <div>
              <h4 className="text-white font-medium">Send Feedback</h4>
              <p className="text-dark-300 text-sm">ignacio.leiva06@gmail.com</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
