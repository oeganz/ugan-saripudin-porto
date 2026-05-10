export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 py-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs text-slate-700">&copy; {new Date().getFullYear()} Ugan Saripudin. Built with React, Tailwind & AI.</p>
      </div>
    </footer>
  )
}