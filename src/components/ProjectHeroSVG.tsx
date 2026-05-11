import type { Project } from '@/data/projects';

interface ProjectHeroSVGProps {
  project: Pick<Project, 'id' | 'name' | 'company' | 'industry' | 'platform'>;
  width?: number;
  height?: number;
}

const industryColors: Record<string, { primary: string; secondary: string; accent: string }> = {
  'FinTech': { primary: '#0ea5e9', secondary: '#0284c7', accent: '#38bdf8' },
  'HealthTech': { primary: '#10b981', secondary: '#059669', accent: '#34d399' },
  'AgriTech': { primary: '#22c55e', secondary: '#16a34a', accent: '#4ade80' },
  'Telecom': { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' },
  'InsurTech': { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' },
  'E-commerce': { primary: '#ec4899', secondary: '#db2777', accent: '#f472b6' },
  'Enterprise': { primary: '#6366f1', secondary: '#4f46e5', accent: '#818cf8' },
  'Social Impact': { primary: '#14b8a6', secondary: '#0d9488', accent: '#2dd4bf' },
  'Gaming': { primary: '#f97316', secondary: '#ea580c', accent: '#fb923c' },
  'EdTech': { primary: '#a855f7', secondary: '#9333ea', accent: '#c084fc' },
};


export function ProjectHeroSVG({ project, width = 1200, height = 600 }: ProjectHeroSVGProps) {
  const colors = industryColors[project.industry] || industryColors['Enterprise'];
  const id = project.id.replace(/[^a-z0-9]/gi, '');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main gradient */}
        <radialGradient id={`grad-${id}`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.25" />
          <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
        </radialGradient>

        {/* Orb gradient */}
        <radialGradient id={`orb-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
        </radialGradient>

        {/* Noise filter */}
        <filter id={`noise-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        {/* Blur filter */}
        <filter id={`blur-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
        </filter>
      </defs>

      {/* Background */}
      <rect width={width} height={height} fill={`url(#grad-${id})`} />

      {/* Grid pattern */}
      <pattern id={`grid-${id}`} width="60" height="60" patternUnits="userSpaceOnUse">
        <path
          d="M 60 0 L 0 0 0 60"
          fill="none"
          stroke={colors.primary}
          strokeWidth="0.5"
          opacity="0.1"
        />
      </pattern>
      <rect width={width} height={height} fill={`url(#grid-${id})`} />

      {/* Animated orbs */}
      <g className="orbs">
        <circle
          cx={width * 0.75}
          cy={height * 0.3}
          r="200"
          fill={`url(#orb-${id})`}
          filter={`url(#blur-${id})`}
          className="orb-1"
        />
        <circle
          cx={width * 0.2}
          cy={height * 0.7}
          r="150"
          fill={`url(#orb-${id})`}
          filter={`url(#blur-${id})`}
          className="orb-2"
        />
        <circle
          cx={width * 0.85}
          cy={height * 0.8}
          r="120"
          fill={`url(#orb-${id})`}
          filter={`url(#blur-${id})`}
          className="orb-3"
        />
      </g>

      {/* Noise overlay */}
      <rect
        width={width}
        height={height}
        fill={`url(#noise-${id})`}
        opacity="0.03"
      />

      {/* Content container */}
      <g className="content">
        {/* Industry badge */}
        <g transform={`translate(${width * 0.08}, ${height * 0.15})`}>
          <rect
            x="0"
            y="0"
            width={project.industry.length * 10 + 24}
            height="32"
            rx="16"
            fill={colors.primary}
            fillOpacity="0.2"
            stroke={colors.primary}
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <text
            x="12"
            y="22"
            fill={colors.accent}
            fontSize="14"
            fontFamily="system-ui, sans-serif"
            fontWeight="500"
            letterSpacing="0.05em"
          >
            {project.industry.toUpperCase()}
          </text>
        </g>

        {/* Project name */}
        <text
          x={width * 0.08}
          y={height * 0.5}
          fill="white"
          fontSize={Math.min(72, project.name.length > 10 ? 56 : 72)}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          letterSpacing="-0.02em"
        >
          {project.name}
        </text>

        {/* Company */}
        <text
          x={width * 0.08}
          y={height * 0.62}
          fill={colors.accent}
          fontSize="20"
          fontFamily="system-ui, sans-serif"
          fontWeight="400"
          opacity="0.8"
        >
          {project.company}
        </text>

        {/* Platform icons */}
        <g transform={`translate(${width * 0.08}, ${height * 0.78})`}>
          {project.platform.map((p, i) => (
            <g key={p} transform={`translate(${i * 40}, 0)`}>
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeOpacity="0.2"
              />
              <text
                x="16"
                y="21"
                textAnchor="middle"
                fill={colors.accent}
                fontSize="11"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {p.charAt(0)}
              </text>
            </g>
          ))}
        </g>
      </g>

      <style>{`
        .orb-1 {
          animation: float1 8s ease-in-out infinite;
        }
        .orb-2 {
          animation: float2 10s ease-in-out infinite;
        }
        .orb-3 {
          animation: float3 12s ease-in-out infinite;
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, -30px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 25px) scale(1.08); }
        }
      `}</style>
    </svg>
  );
}
