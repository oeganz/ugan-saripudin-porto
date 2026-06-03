import { Card } from '@/components/Card'

export function ArticleCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Pulsing skeleton */}
      <div className="animate-pulse">
        <Card className="!border-slate-700/60">
          {/* Image - visible block */}
          <div className="w-full h-48 bg-slate-700/80 rounded-lg mb-4" />
          
          {/* Tags */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-16 rounded-md bg-slate-700/80" />
            <div className="h-5 w-12 rounded-md bg-slate-700/80" />
            <div className="ml-auto h-4 w-16 rounded bg-slate-700/80" />
          </div>

          {/* Title lines */}
          <div className="space-y-2 mb-4">
            <div className="h-5 w-full rounded bg-slate-700/80" />
            <div className="h-5 w-3/4 rounded bg-slate-700/60" />
          </div>

          {/* Excerpt lines */}
          <div className="space-y-2 mb-4">
            <div className="h-3 w-full rounded bg-slate-700/60" />
            <div className="h-3 w-2/3 rounded bg-slate-700/60" />
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 pt-4 border-t border-slate-700/40">
            <div className="h-3 w-20 rounded bg-slate-700/60" />
          </div>
        </Card>
      </div>

      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-slate-600/10 to-transparent pointer-events-none" />
    </div>
  )
}
