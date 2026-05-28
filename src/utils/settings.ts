export interface Settings {
  showShelf: boolean;
  showSelling: boolean;
  showWanted: boolean;
  currencySymbol: string;
  showCents: boolean;
  thousandsSeparator: '.' | ',';
  showShelfItemValues: boolean;
  showShelfTotalValue: boolean;
  theme: 'dark' | 'light';
  defaultSort: string;
}

const SETTINGS_KEY = 'shelfu_settings';

const defaultSettings: Settings = {
  showShelf: true,
  showSelling: true,
  showWanted: true,
  currencySymbol: '$',
  showCents: true,
  thousandsSeparator: ',',
  showShelfItemValues: true,
  showShelfTotalValue: true,
  theme: 'dark',
  defaultSort: 'name-asc',
};

export function loadSettings(): Settings {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return defaultSettings;
  try {
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: Partial<Settings>): Settings {
  const current = loadSettings();
  const next = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  return next;
}

export function formatCurrency(value: number, isShelfItem = false): string {
  const settings = loadSettings();
  if (isShelfItem && !settings.showShelfItemValues) return '—';

  const decimalSep = settings.thousandsSeparator === '.' ? ',' : '.';
  const parts = settings.showCents
    ? value.toFixed(2).split('.')
    : [Math.round(value).toString()];
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, settings.thousandsSeparator);

  return `${settings.currencySymbol}${parts.join(decimalSep)}`;
}
