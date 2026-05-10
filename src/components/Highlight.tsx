import type { ReactNode } from 'react';

const colors = [
  'text-sky-400',
  'text-cyan-400',
  'text-emerald-400',
  'text-amber-400',
  'text-purple-400',
  'text-rose-400',
];

export function H({ children, i = 0 }: { children: ReactNode; i?: number }) {
  return <span className={`${colors[i % colors.length]} font-semibold`}>{children}</span>;
}

// For bold text only (no color)
export function B({ children }: { children: ReactNode }) {
  return <span className="text-slate-200 font-semibold">{children}</span>;
}
