import { motion } from 'framer-motion'
import { Clock, MessageSquare, Globe, Wifi } from 'lucide-react'

const tools = [
  'Slack', 'Linear', 'Notion', 'GitHub', 'Zoom', 'Figma', 'Azure DevOps', 'Discord',
]

export function RemoteCredentialsSection() {
  return (
    <section className="py-24 px-4 bg-slate-800/20" id="remote-credentials">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-medium uppercase tracking-[2px] text-sky-400 mb-3">(03) REMOTE CREDENTIALS</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-50 mb-4">Remote-First, Async-Native</h2>
          <p className="text-base text-slate-400 max-w-2xl mb-12">
            Proven distributed team leader with 2+ years of remote-capable leadership and 12 months of fully remote contract work with Australian stakeholders.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { icon: Clock, label: 'WIB (UTC+7)', sub: 'Working Hours' },
            { icon: MessageSquare, label: 'Async-First', sub: 'Communication' },
            { icon: Globe, label: '3+ Timezones', sub: 'Team Leadership' },
            { icon: Wifi, label: 'Full Remote Setup', sub: 'Development Environment' },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30">
              <s.icon className="w-5 h-5 text-sky-400 mb-2" />
              <p className="text-sm font-semibold text-slate-200">{s.label}</p>
              <p className="text-xs text-slate-500">{s.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Working hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-6 mb-12 text-sm text-slate-400"
        >
          <span>6-9am US &middot; 2-6pm EU &middot; Full APAC</span>
          <span>Documentation-first culture</span>
          <span>Led pods across US/EU/APAC</span>
          <span>2+ years remote leadership</span>
          <span className="text-cyan-400">12mo Remote Australia Contract &middot; Xtramile &middot; 2hr timezone gap</span>
          <span>Enterprise Security Ready &middot; Healthcare compliance exp.</span>
        </motion.div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-slate-300 mb-4">Tools I use daily</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-sm text-slate-300">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Old Way vs ADLC Way chat comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Old Way */}
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="text-sm font-semibold text-red-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              Old Way
            </h3>
            <div className="space-y-3">
              {[
                { time: '10:00', text: 'hey, quick question...' },
                { time: '10:05', text: 'can you check the deploy?' },
                { time: '10:12', text: 'nevermind, figured it out' },
                { time: '10:30', text: 'actually wait...' },
              ].map((msg) => (
                <div key={msg.time} className="flex gap-3">
                  <span className="text-xs text-slate-600 font-mono flex-shrink-0 w-10">{msg.time}</span>
                  <span className="text-sm text-slate-400">{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-red-500/20">
              <p className="text-sm text-red-400 font-medium">
                <span className="text-red-500 mr-2">&#10005;</span>
                47 min lost to context switching
              </p>
            </div>
          </div>

          {/* ADLC Way */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <h3 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              ADLC Way
            </h3>
            <div className="space-y-3">
              {[
                { time: '09:00', text: 'Deploy v2.4.1 ready for review' },
                { time: '09:30', text: 'AI tests passed ✅ QA approved' },
                { time: '10:00', text: 'Merged to staging — changelog attached' },
                { time: '10:15', text: 'Deploying to prod — ETA 14:00' },
              ].map((msg) => (
                <div key={msg.time} className="flex gap-3">
                  <span className="text-xs text-slate-600 font-mono flex-shrink-0 w-10">{msg.time}</span>
                  <span className="text-sm text-slate-300">{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-500/20">
              <p className="text-sm text-emerald-400 font-medium">
                <span className="text-emerald-500 mr-2">&#10003;</span>
                4 hours of deep work preserved
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
