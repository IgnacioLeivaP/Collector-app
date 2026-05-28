import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Library, Plus, Settings, Star, Search, DollarSign, HelpCircle, BarChart, ChevronUp } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useSettings();

  const menuItems = [
    { icon: Library, label: 'Collection', path: '/' },
    { icon: Plus, label: 'Add New', path: '/add' },
    ...(settings.showShelf ? [{ icon: Star, label: 'Shelf', path: '/shelf' }] : []),
    ...(settings.showWanted ? [{ icon: Search, label: 'Wanted', path: '/wanted' }] : []),
    ...(settings.showSelling ? [{ icon: DollarSign, label: 'Selling', path: '/selling' }] : []),
    { icon: BarChart, label: 'Stats', path: '/stats' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className={`fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="w-full bg-dark-800 rounded-t-xl">
            <div className="w-full px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/dusticon.jpg" alt="Dust Collector" className="w-5 h-5 rounded-full object-cover" />
                <span className="logo-font text-sm text-white">Dust Collector</span>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
              >
                <span className="font-medium text-sm">Menu</span>
                <ChevronUp className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-4 p-0.5 bg-gradient-to-r from-indigo-600 to-purple-600">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`aspect-square flex flex-col items-center justify-center bg-dark-800 transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'text-dark-300 hover:text-white hover:bg-dark-700'
                      }`}
                    >
                      <Icon className="w-6 h-6 mb-1" />
                      <span className="text-xs font-medium text-center">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-dark-800 px-6 py-3 flex items-center justify-between rounded-t-xl shadow-[0_-4px_16px_-4px_#9333ea]"
        >
          <div className="flex items-center gap-2">
            <img src="/dusticon.jpg" alt="Dust Collector" className="w-5 h-5 rounded-full object-cover" />
            <span className="logo-font text-sm text-white">Dust Collector</span>
          </div>
          <div className="flex items-center gap-2 text-dark-300">
            <span className="font-medium text-sm">Menu</span>
            <ChevronUp className="w-5 h-5" />
          </div>
        </button>
      </div>
    </>
  );
}
