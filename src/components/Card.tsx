import type { ReactNode } from 'react'
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-xl p-6 transition-all duration-200 hover:border-sky-400 hover:-translate-y-0.5 hover:shadow-md card-hover ${className}`}>
      {children}
    </div>
  )
}