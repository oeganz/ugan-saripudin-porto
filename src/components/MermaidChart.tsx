import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

// Initialize mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#0ea5e9',    // sky-500
    primaryTextColor: '#f1f5f9', // slate-100
    primaryBorderColor: '#334155', // slate-700
    lineColor: '#64748b',         // slate-500
    secondaryColor: '#1e293b',   // slate-800
    tertiaryColor: '#0f172a',    // slate-900
    background: '#0f172a',
    mainBkg: '#1e293b',
    nodeBorder: '#475569',
    clusterBkg: '#1e293b',
    titleColor: '#f1f5f9',
    edgeLabelBackground: '#1e293b',
  },
})

interface MermaidChartProps {
  code: string
  className?: string
}

export function MermaidChart({ code, className = '' }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`)

  useEffect(() => {
    if (!containerRef.current) return

    const render = async () => {
      try {
        const id = idRef.current
        const { svg } = await mermaid.render(id, code.trim())
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre class="text-red-400 text-sm p-4 bg-slate-800 rounded-lg overflow-x-auto">${code.trim()}</pre>`
        }
        console.error('Mermaid render error:', err)
      }
    }

    render()
  }, [code])

  return (
    <div
      ref={containerRef}
      className={`mermaid-chart flex justify-center my-6 ${className}`}
    />
  )
}
