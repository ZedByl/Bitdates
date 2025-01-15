import { useState, useEffect } from 'react';

/**
 * Хук для дебаунса значения.
 *
 * @param value Значение, которое нужно дебаунсировать.
 * @param delay Задержка в миллисекундах.
 * @returns Дебаунсированное значение.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
