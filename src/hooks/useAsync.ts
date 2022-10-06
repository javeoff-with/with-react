import { useEffect } from 'react';

/**
 * Provide asynchronous callback to useEffect
 * @param callback async callback
 * @param args arguments of useEffect
 */
export function useAsync(
  callback: (...args: unknown[]) => Promise<void>,
  args: unknown[],
): void {
  return useEffect(() => {
    (async () => {
      await callback();
    })();
  }, args);
}
