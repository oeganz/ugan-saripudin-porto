import type { ReactNode } from 'react';

// Inline SVG tech brand icons - no external dependencies, always sharp
export const techIconMap: Record<string, () => ReactNode> = {
  Android: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0225 3.503C15.5902 8.2439 13.8533 7.8502 12 7.8502c-1.8533 0-3.5902.3937-5.1367 1.0984L4.8407 5.4457a.416.416 0 00-.5677-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589.3432 18.6617h23.3136c0-4.0028-2.3457-7.475-5.775-9.3403"/></svg>
  ),
  Kotlin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M24 24H0V0h24L12 12z"/></svg>
  ),
  Java: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M8.851 18.378s-.917.539.652.722c1.928.221 2.914.19 5.042-.216 0 0 .56.35 1.341.654-4.764 2.048-10.783-.119-6.035-1.16zm-.569-2.654s-1.028.762.543.926c2.037.209 3.645.226 6.412-.307 0 0 .39.396.998.612-5.663 1.661-11.98.13-7.953-1.231"/>
    <path d="M13.565 10.507c1.158 1.333-.304 2.533-.304 2.533s2.939-1.516 1.589-3.418c-1.277-1.807-2.257-2.7 3.047-5.803 0 0-8.316 2.073-4.332 6.688zM19.082 20.391s.677.557-.745.986c-2.707.822-11.239 1.07-13.607.033-.854-.373.746-.887 1.251-.995.505-.11.795-.09.795-.09-.917-.647-5.922 1.267-2.543 1.815 9.198 1.493 16.787-.676 14.849-1.749zM9.284 13.947s-4.188.996-1.482 1.356c1.141.153 3.406.117 5.52-.06 1.728-.143 3.468-.447 3.468-.447s-.61.261-1.052.562c-4.266 1.12-12.491.598-10.116-.544 1.859-.901 3.662-.867 3.662-.867zm8.317 4.66c4.332-2.254 2.332-4.414.932-4.135-.343.071-.498.133-.498.133s.128-.201.372-.288c2.78-1.01 4.928 2.97-.893 5.228 0 0 .065-.058.087-.938z"/>
    <path d="M17.952 2.25s1.935 1.935-1.835 5.512c-3.105 2.76-.69 4.327 0 6.118-1.768-1.595-3.065-2.997-2.198-4.305 1.28-1.849 5.474-2.733 4.033-7.325zM12.707 22.664c4.159.266 10.562-.148 10.705-2.114 0 0-.29.743-3.438 1.333-3.558.668-7.954.59-10.556.162 0 0 .535.439 3.289.619z"/></svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><ellipse cx="12" cy="12" rx="3" ry="10.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="3" ry="10.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="10.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5"/></svg>
  ),
  'React Native': () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><ellipse cx="12" cy="12" rx="3" ry="10.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="3" ry="10.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="10.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5"/></svg>
  ),
  'Next.js': () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.938 15.889L9.41 7.111H8.672v9.778h1.195V9.436l7.113 7.555h1.279V7.111h-1.195v8.778z"/></svg>
  ),
  'Vue.js': () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M2 3h4l6 10.4L18 3h4L12 20 2 3z"/><path d="M5.5 3h3L12 10.7 15.5 3h3L12 17 5.5 3z" fillOpacity=".6"/></svg>
  ),
  'Node.js': () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12.002 0L1.603 6v12l3.37 1.94.002-12L12 3.68l6.995 4.04.004 8.02 3.37-1.94V6L12.002 0zM12 24l-4.547-2.624.006-3.04L12 20.36l4.54-2.62.006 3.04L12 24zm-8.466-7.08l-3.536-2.04v-4.14l3.536 2.04v4.14zm16.932 0v-4.14l3.536-2.04v4.14l-3.536 2.04z"/></svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M14.5 8v7.5M10.5 10.5h4m6 2.5a2.5 2.5 0 11-2.5-2.5" stroke="#0f172a" strokeWidth="1.5" fill="none"/></svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M16.5 15.5a1.5 1.5 0 01-3 0V10m-3 0v5.5a1.5 1.5 0 01-3 0" stroke="#0f172a" strokeWidth="1.5" fill="none"/></svg>
  ),
  Flutter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M4.2 4L15.8 15.6H8.6L4.2 11.2V4zM15.8 15.6L8.6 22.8H15.8V15.6zM15.8 8.4H8.6L11.2 11H19.8L15.8 8.4z"/></svg>
  ),
  Firebase: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M4.5 18.5L7 2l4.5 5.5L14 2l5.5 4.5-1.5 12h-13.5z"/></svg>
  ),
  GraphQL: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="2"/><circle cx="4.5" cy="7" r="1.5"/><circle cx="19.5" cy="7" r="1.5"/><circle cx="4.5" cy="17" r="1.5"/><circle cx="19.5" cy="17" r="1.5"/><circle cx="12" cy="21" r="1.5"/></svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><ellipse cx="12" cy="12" rx="4" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12.5 2C11 5.5 7 9 7 14c0 3.5 2 6.5 5 7.5V24h1v-2.5c3-1 5-4 5-7.5 0-5-4-8.5-5.5-12z"/></svg>
  ),
  Python: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.5 2 6 4.24 6 5.5h5c.55 0 1 .45 1 1v2.5H7.5C4.46 9 2 11.46 2 14.5S4.46 20 7.5 20h1v-2.5c0-1.38 1.12-2.5 2.5-2.5h4c1.66 0 3-1.34 3-3V5.5C18 4.24 17.5 2 12 2zM9 5.5a1 1 0 110-2 1 1 0 010 2z"/><path d="M16.5 9H18c3.04 0 5.5 2.46 5.5 5.5S21.04 20 18 20h-5c-.55 0-1-.45-1-1v-2.5h4.5c1.38 0 2.5-1.12 2.5-2.5S17.88 11.5 16.5 11.5h-1V9zm-2 10.5a1 1 0 110 2 1 1 0 010-2z"/></svg>
  ),
  Go: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><circle cx="8" cy="12" r="6"/><circle cx="17" cy="12" r="2.5"/><circle cx="20.5" cy="12" r="1"/></svg>
  ),
  AWS: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M6.5 12.5L2 15v-6l4.5 2.5zM12 8l4.5-2.5L12 3 7.5 5.5 12 8zm0 8l4.5 2.5L12 21l-4.5-2.5L12 16zm5.5-3.5L22 10v6l-4.5-2.5z"/><path d="M12 10l-3 1.5 3 1.5 3-1.5-3-1.5z" fillOpacity=".5"/></svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M4 10h2v2H4zm3.5 0h2v2h-2zm3.5 0h2v2h-2zm-7 3.5h2v2H4zm3.5 0h2v2h-2zm3.5 0h2v2h-2zm3.5 0h2v2h-2zM4 17h2v2H4zm3.5 0h2v2h-2zm3.5 0h2v2h-2zm3.5 0h2v2h-2zM20 13.5V11h-2.5v2.5H15v-5H2v8c0 2.5 2 4.5 4.5 4.5h11c2.5 0 4.5-2 4.5-4.5v-3h-2z"/></svg>
  ),
  WebSocket: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/><path d="M12 6v6l4 2"/><path d="M22 2l-4 4"/><path d="M22 2v4h-4"/></svg>
  ),
  SQLite: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M4 4h16v2H4zm0 5h12v2H4zm0 5h16v2H4zm0 5h10v2H4z"/></svg>
  ),
  'REST API': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
  ),
  WebRTC: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.51 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.49 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 12.85 9.51 11.75 7 11.75z"/></svg>
  ),
  Redux: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M15.6 14.1c.7.2 1.2.8 1.2 1.6 0 .9-.7 1.6-1.6 1.6-.5 0-.9-.2-1.2-.6l-3.2-3.8c-1.4.4-2.9.7-4.5.7H5v-2h1.3c1.2 0 2.3-.2 3.4-.5L6.6 8.2c-.3-.4-.3-.9-.1-1.3.4-.7 1.3-.9 2-.5l4.8 2.8c1.1-.8 2.3-1.5 3.6-2l.7 1.9c-1 .4-2 1-2.9 1.7l2.9 3.3z"/></svg>
  ),
  'HTML5/CSS3': () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M3 2l1.6 18L12 22l7.4-2L21 2H3zm14.5 6h-9l.2 2h8.6l-.6 6.5L12 17.5l-4.3-1.5-.3-3h2.1l.1 1.5 2.3.8 2.4-.8.2-2.5H7.4l-.6-8h13.2l-.5 2z"/></svg>
  ),
  'Push Notifications': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  'Payment Gateway': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
  ),
  'E2E Encryption': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  'GPS/Maps': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  'Barcode/QR': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M3 7V5a2 2 0 0 1 2-2h2M3 17v2a2 2 0 0 0 2 2h2M21 7V5a2 2 0 0 0-2-2h-2M21 17v2a2 2 0 0 1-2 2h-2M7 7h2v2H7zm8 0h2v2h-2zM7 15h2v2H7zm4-4h2v2h-2zm4 4h2v2h-2z"/></svg>
  ),
  NLP: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/><path d="M8 12s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>
  ),
  'Camera Integration': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
  ),
  'Offline-First': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  'CI/CD': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="7" r="1.5"/><circle cx="15" cy="15" r="1.5"/></svg>
  ),
  Azure: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505l7.726-16.553z"/></svg>
  ),
  Jira: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M11.53 2a5.89 5.89 0 0 0-5.89 5.89v.17L2.18 11.52a.55.55 0 0 0 0 .77l3.8 3.8v.17a5.89 5.89 0 0 0 10.06 4.16l2.54-2.54a.55.55 0 0 0 0-.77l-3.8-3.8v-.17A5.89 5.89 0 0 0 11.53 2z"/></svg>
  ),
  'Agile/Scrum': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>
  ),
  'GitHub Actions': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2z"/><path d="M8 12s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>
  ),
};

export function getTechIcon(name: string): (() => ReactNode) | undefined {
  return techIconMap[name];
}

// Default fallback icon for any tech not in the map
export function DefaultTechIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    </svg>
  );
}
