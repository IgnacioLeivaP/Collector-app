import React from 'react';
import { Sliders } from 'lucide-react';

export function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <Sliders className="w-6 h-6" />
        Settings
      </h2>
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <p className="text-dark-300">Settings page content coming soon...</p>
      </div>
    </div>
  );
}