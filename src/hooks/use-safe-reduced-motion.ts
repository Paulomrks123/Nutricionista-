import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const snapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const serverSnapshot = () => false;

export function useSafeReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}