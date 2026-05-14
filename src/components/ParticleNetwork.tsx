import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  pulseOffset: number;
  pulseSpeed: number;
  color: [number, number, number];
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 90;
    const CONNECTION_DIST = 220;
    const MOUSE_DIST = 280;
    const MOUSE_CONNECTION_DIST = 200;

    let animationId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isBright = Math.random() > 0.6;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: isBright
          ? Math.random() * 2.5 + 1.5   // bright: 1.5-4.0
          : Math.random() * 1.2 + 0.4,  // dim: 0.4-1.6
        baseAlpha: isBright
          ? Math.random() * 0.3 + 0.5    // bright: 0.5-0.8
          : Math.random() * 0.25 + 0.15, // dim: 0.15-0.4
        pulseOffset: Math.random() * 3000,
        pulseSpeed: Math.random() * 800 + 500, // 500-1300ms
        color: isBright
          ? [34, 211, 238]               // cyan-400
          : [56, 189, 248],              // sky-400
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

      // Draw ALL connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Particle-to-particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }

        // Mouse-to-particle connections
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_CONNECTION_DIST) {
          const mOpacity = (1 - mDist / MOUSE_CONNECTION_DIST) * 0.25;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouseX, mouseY);
          ctx!.strokeStyle = `rgba(34, 211, 238, ${mOpacity})`;
          ctx!.lineWidth = 0.8;
          ctx!.stroke();
        }
      }

      // Draw particles with pulse + glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        // Mouse attraction
        const mdx2 = mouseX - p.x;
        const mdy2 = mouseY - p.y;
        const md2 = Math.sqrt(mdx2 * mdx2 + mdy2 * mdy2);
        if (md2 < MOUSE_DIST) {
          p.vx += mdx2 * 0.00006;
          p.vy += mdy2 * 0.00006;
        }

        // Dampen + clamp
        p.vx *= 0.998;
        p.vy *= 0.998;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        // BLINK: alpha pulses
        const pulsePhase = ((t + p.pulseOffset) % p.pulseSpeed) / p.pulseSpeed;
        const blink = pulsePhase < 0.5
          ? 0.2 + (pulsePhase / 0.5) * 0.8
          : 1.0 - ((pulsePhase - 0.5) / 0.5) * 0.8;
        const alpha = Math.min(1, p.baseAlpha * blink);

        // SCALE: size pulses
        const scalePhase = ((t + p.pulseOffset) % (p.pulseSpeed * 0.6)) / (p.pulseSpeed * 0.6);
        const scale = scalePhase < 0.5
          ? 0.6 + (scalePhase / 0.5) * 0.8
          : 1.4 - ((scalePhase - 0.5) / 0.5) * 0.8;
        const s = p.size * scale;

        const [r, g, b] = p.color;

        // Outer radial glow
        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, s * 6);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`);
        glow.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.1})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, s * 6, 0, Math.PI * 2);
        ctx!.fill();

        // Inner glow
        const inner = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, s * 2.5);
        inner.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`);
        inner.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx!.fillStyle = inner;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, s * 2.5, 0, Math.PI * 2);
        ctx!.fill();

        // Core
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
