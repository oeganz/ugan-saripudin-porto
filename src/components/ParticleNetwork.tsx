import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  pulseOffset: number;
  color: [number, number, number];
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 160;
    const MOUSE_DIST = 250;

    let animationId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.3,
        pulseOffset: Math.random() * 2000,
        color: Math.random() > 0.7
          ? [34, 211, 238]   // cyan-400 (30%)
          : Math.random() > 0.5
            ? [56, 189, 248] // sky-400 (20%)
            : [148, 163, 184], // slate-400 (50%)
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    const draw = (t: number) => {
      ctx!.clearRect(0, 0, w, h);

      // Draw connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.1;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }

      // Draw particles with pulse + glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Mouse attraction
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_DIST) {
          p.vx += mdx * 0.00008;
          p.vy += mdy * 0.00008;
        }

        // Dampen velocity
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) {
          p.vx = (p.vx / speed) * 1.2;
          p.vy = (p.vy / speed) * 1.2;
        }

        // PULSE: alpha blinks between dim and bright
        const pulsePhase = ((t + p.pulseOffset) % 1500) / 1500;
        const pulseAlpha = pulsePhase < 0.5
          ? 0.3 + (pulsePhase / 0.5) * 0.7  // 0.3 → 1.0
          : 1.0 - ((pulsePhase - 0.5) / 0.5) * 0.7; // 1.0 → 0.3
        const alpha = Math.min(1, p.baseAlpha * pulseAlpha);

        // SCALE: particle grows and shrinks
        const scalePhase = ((t + p.pulseOffset) % 800) / 800;
        const scale = scalePhase < 0.5
          ? 0.7 + (scalePhase / 0.5) * 0.6  // 0.7 → 1.3
          : 1.3 - ((scalePhase - 0.5) / 0.5) * 0.6; // 1.3 → 0.7

        const [r, g, b] = p.color;
        const s = p.size * scale;

        // Radial glow (outer)
        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, s * 5);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.25})`);
        glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.08})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, s * 5, 0, Math.PI * 2);
        ctx!.fill();

        // Inner glow
        const innerGlow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, s * 2);
        innerGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`);
        innerGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx!.fillStyle = innerGlow;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, s * 2, 0, Math.PI * 2);
        ctx!.fill();

        // Core dot
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx!.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
