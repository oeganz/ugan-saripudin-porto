import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function ADLCFlowDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!canvas || !container) return

    const context = canvas.getContext('2d')
    if (!context) return
    const ctx = context

    const view = { w: 1000, h: 420 }
    const edges = [
      { from: [203, 70], to: [297, 70] },
      { from: [453, 70], to: [547, 70] },
      { from: [703, 70], to: [797, 70] },
      { from: [875, 109], to: [875, 180] },
      { from: [875, 240], to: [875, 311] },
      { from: [797, 350], to: [703, 350] },
      { from: [547, 350], to: [453, 350] },
      { from: [297, 350], to: [203, 350] },
      { from: [125, 320], to: [125, 249] },
      { from: [125, 171], to: [125, 100] },
      { from: [375, 320], to: [375, 100], feedback: true },
    ]
    const particles: any[] = []
    const rand = (min: number, max: number) => min + Math.random() * (max - min)

    function spawn(edgeIndex: number, randomProgress = true) {
      const edge = edges[edgeIndex]
      const dx = edge.to[0] - edge.from[0]
      const dy = edge.to[1] - edge.from[1]
      const len = Math.hypot(dx, dy) || 1
      return {
        edgeIndex,
        progress: randomProgress ? Math.random() : 0,
        speed: rand(0.0035, 0.009),
        offset: rand(-13, 13),
        size: edge.feedback ? rand(1.2, 2.2) : rand(1.2, 3.2),
        alpha: rand(0.35, 0.7),
        pulseOffset: rand(0, 1000),
        nx: -dy / len,
        ny: dx / len,
      }
    }

    edges.forEach((_, edgeIndex) => {
      for (let i = 0; i < 11; i++) particles.push(spawn(edgeIndex))
    })

    function resize() {
      if (!canvas || !container) return
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr * rect.width / view.w, 0, 0, dpr * rect.height / view.h, 0, 0)
    }

    function drawEdge(edge: any, t: number) {
      const [x1, y1] = edge.from
      const [x2, y2] = edge.to
      const rgba = edge.feedback ? (a: number) => `rgba(34, 211, 238, ${a})` : (a: number) => `rgba(56, 189, 248, ${a})`

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = rgba(edge.feedback ? 0.10 : 0.16)
      ctx.lineWidth = edge.feedback ? 1 : 1.6
      ctx.setLineDash(edge.feedback ? [3, 5] : [])
      ctx.stroke()
      ctx.setLineDash([])

      const phase = (t * 0.0007) % 1
      const dashOffset = -phase * 60
      const dashPulsePhase = (t % 1000) / 1000
      const dashPulseAlpha = dashPulsePhase < 0.5
        ? 0.2 + (dashPulsePhase / 0.5) * 0.3
        : 0.5 - ((dashPulsePhase - 0.5) / 0.5) * 0.3

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = rgba(dashPulseAlpha)
      ctx.lineWidth = edge.feedback ? 1.1 : 1.5
      ctx.lineCap = 'round'
      ctx.setLineDash(edge.feedback ? [4, 6] : [8, 8])
      ctx.lineDashOffset = dashOffset
      ctx.stroke()
      ctx.setLineDash([])
    }

    function drawParticle(p: any, t: number) {
      const edge = edges[p.edgeIndex]
      const [x1, y1] = edge.from
      const [x2, y2] = edge.to
      const x = x1 + (x2 - x1) * p.progress + p.nx * p.offset
      const y = y1 + (y2 - y1) * p.progress + p.ny * p.offset

      const pulsePhase = ((t + p.pulseOffset) % 1000) / 1000
      const pulseAlpha = pulsePhase < 0.5
        ? 0.3 + (pulsePhase / 0.5) * 0.5
        : 0.8 - ((pulsePhase - 0.5) / 0.5) * 0.5
      const alpha = Math.min(0.8, p.alpha * pulseAlpha)

      const scalePhase = ((t + p.pulseOffset) % 500) / 500
      const scale = scalePhase < 0.5
        ? 0.8 + (scalePhase / 0.5) * 0.4
        : 1.2 - ((scalePhase - 0.5) / 0.5) * 0.4

      const color = edge.feedback ? [34, 211, 238] : [103, 232, 249]
      const glow = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4 * scale)
      glow.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.35})`)
      glow.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`)

      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(x, y, p.size * 4 * scale, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
      ctx.beginPath()
      ctx.arc(x, y, p.size * scale, 0, Math.PI * 2)
      ctx.fill()
    }

    function frame(t: number) {
      ctx.clearRect(0, 0, view.w, view.h)
      edges.forEach(edge => drawEdge(edge, t))

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.progress += p.speed
        if (p.progress >= 1) {
          particles[i] = spawn(Math.floor(Math.random() * edges.length), false)
        } else {
          drawParticle(p, t)
        }
      }

      requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    const animationId = requestAnimationFrame(frame)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-xl overflow-hidden border border-slate-700/50 bg-[#0a101f] mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/50 border-b border-slate-700/40">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">adlc-pipeline.ts — ADLC Orchestrator</span>
        </div>
        <span className="text-[10px] text-slate-600 font-mono">v2.1</span>
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="inline-block px-2.5 py-1.5 rounded-full text-[10px] font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/25 mb-4">
          ADLC (Agentic Development Lifecycle)
        </span>

        <div ref={containerRef} className="w-full relative" style={{ aspectRatio: '1000 / 420' }}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />
          <svg viewBox="0 0 1000 420" className="w-full h-full relative z-[2]">
            <defs>
              <filter id="g">
                <feGaussianBlur stdDeviation="2" result="b"/>
                <feMerge>
                  <feMergeNode in="b"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <text x="500" y="222" textAnchor="middle" fill="#22d3ee" fillOpacity="0.22" fontSize="64" fontWeight="200">∞</text>

            <g>
              <rect x="47" y="40" width="156" height="60" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite"/>
              </rect>
              <text x="125" y="69" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">🎯 Goal Definition</text>
              <text x="125" y="85" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Intent, outcomes, constraints</text>
            </g>

            <g>
              <rect x="297" y="40" width="156" height="60" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite" begin="0.25s"/>
              </rect>
              <text x="375" y="69" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">📋 Build PRD</text>
              <text x="375" y="85" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Product spec and expected outcomes</text>
            </g>

            <g>
              <rect x="547" y="40" width="156" height="60" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
              </rect>
              <text x="625" y="69" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">📝 Write Skills</text>
              <text x="625" y="85" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Tools, prompts &amp; capabilities</text>
            </g>

            <g>
              <rect x="797" y="31" width="156" height="78" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite" begin="0.75s"/>
              </rect>
              <text x="875" y="69" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">🤖 Orchestrate agents</text>
              <text x="875" y="85" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Architecture &amp; DB design</text>
            </g>

            <g>
              <rect x="47" y="171" width="156" height="78" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite" begin="1s"/>
              </rect>
              <text x="125" y="209" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">📊 Monitoring &amp; Feedback</text>
              <text x="125" y="225" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Live perf, drift detection</text>
            </g>

            <g>
              <rect x="797" y="180" width="156" height="60" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite" begin="1.25s"/>
              </rect>
              <text x="875" y="209" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">💻 Autonomous Coding</text>
              <text x="875" y="225" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Agents write, refactor &amp; use tools</text>
            </g>

            <g>
              <rect x="47" y="320" width="156" height="60" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite" begin="1.5s"/>
              </rect>
              <text x="125" y="349" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">✅ Deployment</text>
              <text x="125" y="365" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Auto CI/CD via agents</text>
            </g>

            <g>
              <rect x="297" y="320" width="156" height="60" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite" begin="1.75s"/>
              </rect>
              <text x="375" y="349" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">🔍 Evaluation</text>
              <text x="375" y="365" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Approval, correction &amp; steering</text>
            </g>

            <g>
              <rect x="547" y="320" width="156" height="60" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite" begin="2s"/>
              </rect>
              <text x="625" y="349" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">📡 Observability</text>
              <text x="625" y="365" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Metrics, logs, traces</text>
            </g>

            <g>
              <rect x="797" y="311" width="156" height="78" rx="8" fill="#131c31" stroke="#22d3ee" strokeWidth="1.5" filter="url(#g)">
                <animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="2.5s" repeatCount="indefinite" begin="2.25s"/>
              </rect>
              <text x="875" y="349" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">🧪 Autonomous Testing</text>
              <text x="875" y="365" textAnchor="middle" fill="#22d3ee" fillOpacity="0.45" fontSize="8">Agent-run test suites &amp; evals</text>
            </g>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
