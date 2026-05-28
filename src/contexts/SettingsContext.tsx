import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Settings, loadSettings, saveSettings } from '../utils/settings';
import { clearAllData } from '../utils/storage';

interface SettingsContextType {
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  toggleTheme: () => void;
  clearAppData: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', settings.theme === 'light');
    saveSettings(settings);
  }, [settings]);

  const updateSettings = (patch: Partial<Settings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  };

  const toggleTheme = () => {
    setSettings((current) => ({
      ...current,
      theme: current.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const clearAppData = () => {
    clearAllData();
    localStorage.removeItem('shelfu_settings');
    window.location.reload();
  };

  const value = useMemo(
    () => ({ settings, updateSettings, toggleTheme, clearAppData }),
    [settings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
