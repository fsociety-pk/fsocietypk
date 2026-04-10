const DEFAULT_API_URL = 'http://16.171.55.64:5000';

const normalizeBaseUrl = (url?: string): string => {
  const value = (url || DEFAULT_API_URL).trim();
  return value.replace(/\/+$/, '');
};

const normalizePrefix = (prefix?: string): string => {
  if (!prefix) return '';
  const trimmed = prefix.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}` : '';
};

export const API_URL = normalizeBaseUrl(import.meta.env.VITE_API_URL);
export const API_PREFIX = normalizePrefix(import.meta.env.VITE_API_PREFIX);
export const API_BASE_URL = `${API_URL}${API_PREFIX}`;
export const API_WITH_CREDENTIALS = import.meta.env.VITE_API_WITH_CREDENTIALS !== 'false';
