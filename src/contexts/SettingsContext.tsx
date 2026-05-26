import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SETTINGS_KEY = 'app_settings';

export type AppTheme = 'dark' | 'light';

export type AppSettings = {
  theme: AppTheme;
  defaultSort: string;
  showCollection: boolean;
  showShelf: boolean;
  showWanted: boolean;
};

type SettingsContextType = {
  settings: AppSettings;
  toggleTheme: () => void;
  setDefaultSort: (sortId: string) => void;
  setSectionVisibility: (section: keyof Omit<AppSettings, 'theme' | 'defaultSort'>, visible: boolean) => void;
  clearAppData: () => void;
};

const defaultSettings: AppSettings = {
  theme: 'dark',
  defaultSort: 'name-asc',
  showCollection: true,
  showShelf: true,
  showWanted: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function loadSettings(): AppSettings {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (!saved) return defaultSettings;
  try {
    const value = JSON.parse(saved) as Partial<AppSettings>;
    return {
      theme: value.theme === 'light' ? 'light' : 'dark',
      defaultSort: value.defaultSort ?? defaultSettings.defaultSort,
      showCollection: value.showCollection ?? defaultSettings.showCollection,
      showShelf: value.showShelf ?? defaultSettings.showShelf,
      showWanted: value.showWanted ?? defaultSettings.showWanted,
    };
  } catch {
    return defaultSettings;
  }
}

function saveSettings(settings: AppSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', settings.theme === 'light');
    document.documentElement.classList.toggle('theme-dark', settings.theme === 'dark');
    saveSettings(settings);
  }, [settings]);

  const toggleTheme = () => {
    setSettings((current) => ({
      ...current,
      theme: current.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const setDefaultSort = (sortId: string) => {
    setSettings((current) => ({ ...current, defaultSort: sortId }));
  };

  const setSectionVisibility = (
    section: keyof Omit<AppSettings, 'theme' | 'defaultSort'>,
    visible: boolean
  ) => {
    setSettings((current) => ({ ...current, [section]: visible }));
  };

  const clearAppData = () => {
    localStorage.removeItem('collection_items');
    localStorage.removeItem('collection_categories');
    localStorage.removeItem(SETTINGS_KEY);
    window.location.reload();
  };

  const value = useMemo(
    () => ({ settings, toggleTheme, setDefaultSort, setSectionVisibility, clearAppData }),
    [settings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
