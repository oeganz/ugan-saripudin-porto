export function ArticleCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-slate-800 rounded-t-lg mb-4" />
      
      {/* Tags row */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-16 h-5 bg-slate-800 rounded-md" />
        <div className="w-12 h-5 bg-slate-800 rounded-md" />
        <div className="ml-auto w-16 h-4 bg-slate-800 rounded" />
      </div>

      {/* Title */}
      <div className="w-3/4 h-6 bg-slate-800 rounded mb-3" />
      <div className="w-1/2 h-6 bg-slate-800 rounded mb-4" />

      {/* Excerpt */}
      <div className="w-full h-4 bg-slate-800 rounded mb-2" />
      <div className="w-2/3 h-4 bg-slate-800 rounded mb-4" />

      {/* Footer */}
      <div className="flex items-center gap-2 pt-4 border-t border-slate-700/30">
        <div className="w-20 h-3 bg-slate-800 rounded" />
      </div>
    </div>
  )
}
