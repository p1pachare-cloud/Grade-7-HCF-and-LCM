// src/hooks/useLocalStorage.js
// LocalStorage persistence hook with 24h expiration fallback support

import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      if (parsed.timestamp && Date.now() - parsed.timestamp > 86400000) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      return parsed.data !== undefined ? parsed.data : parsed;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      const payload = {
        timestamp: Date.now(),
        data: valueToStore
      };
      window.localStorage.setItem(key, JSON.stringify(payload));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
