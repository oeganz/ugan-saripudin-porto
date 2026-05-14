import { motion } from 'framer-motion'

const oldWayItems = [
  { time: '10:00', text: 'hey, quick question...' },
  { time: '10:05', text: 'can you check the deploy?' },
  { time: '10:12', text: 'nevermind, figured it out' },
  { time: '10:30', text: 'actually wait...' },
]

const newWayItems = [
  { time: '09:00', text: 'Deploy v2.4.1 ready for review' },
  { time: '09:30', text: 'AI tests passed \u2705 QA approved' },
  { time: '10:00', text: 'Merged to staging \u2014 changelog attached' },
  { time: '10:15', text: 'Deploying to prod \u2014 ETA 14:00' },
]

export function OldWayNewWayChat() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[2px] text-sky-400/70 mb-2">How I Work</p>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-50">Old Way vs. How I Deliver</h3>
      </motion.div>

      {/* Old Way Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="text-sm font-bold text-rose-400">Old Way</span>
        </div>

        {/* Timeline items */}
        <div className="space-y-3">
          {oldWayItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="flex items-center gap-4"
            >
              <span className="text-xs font-mono text-slate-500 w-10 flex-shrink-0">{item.time}</span>
              <span className="text-sm text-slate-400">{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-rose-500/15" />

        {/* Result */}
        <div className="flex items-center gap-2">
          <span className="text-rose-400 text-sm">&times;</span>
          <span className="text-sm font-semibold text-rose-400">3 hours burned. Zero shipped. Team scattered.</span>
        </div>
      </motion.div>

      {/* New Way Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-sm font-bold text-emerald-400">ADLC Way</span>
        </div>

        {/* Timeline items */}
        <div className="space-y-3">
          {newWayItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
              className="flex items-center gap-4"
            >
              <span className="text-xs font-mono text-slate-500 w-10 flex-shrink-0">{item.time}</span>
              <span className="text-sm text-slate-200">{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-emerald-500/15" />

        {/* Result */}
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-sm">&#10003;</span>
          <span className="text-sm font-semibold text-emerald-400">4 features shipped. Team in flow. Zero meetings.</span>
        </div>
      </motion.div>
    </div>
  )
}
