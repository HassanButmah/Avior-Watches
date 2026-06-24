const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'watches');
fs.mkdirSync(dir, { recursive: true });

const watches = [
  { id: 'prestige-pro', dial: '#0a1628', bezel: '#C8A96E', case: '#E8E8E8', accent: '#ffffff' },
  { id: 'prestige-classic', dial: '#f5f0e8', bezel: '#C8A96E', case: '#D4AF37', accent: '#333333' },
  { id: 'sports-infinity', dial: '#111111', bezel: '#333333', case: '#888888', accent: '#C8A96E' },
  { id: 'elegant-rose', dial: '#f5e6d3', bezel: '#B76E79', case: '#E8B4B8', accent: '#ffffff' },
  { id: 'marine-blue', dial: '#0a2463', bezel: '#1e3a8a', case: '#94a3b8', accent: '#60a5fa' },
  { id: 'heritage-vintage', dial: '#f5f0dc', bezel: '#8B7355', case: '#A0926C', accent: '#5c4a32' },
];

function makeMarkers(bezel) {
  let markers = '';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const x1 = Math.cos(a) * 110;
    const y1 = Math.sin(a) * 110;
    const x2 = Math.cos(a) * 125;
    const y2 = Math.sin(a) * 125;
    markers += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${bezel}" stroke-width="3" stroke-linecap="round"/>`;
  }
  return markers;
}

function makeSvg(w, variant) {
  const rot = variant * 15;
  const shine = variant === 1 ? 0.3 : variant === 2 ? 0.5 : 0.15;
  const uid = `${w.id}-${variant}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
  <defs>
    <radialGradient id="bg-${uid}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="bezel-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${w.bezel}"/>
      <stop offset="100%" stop-color="${w.bezel}88"/>
    </linearGradient>
    <linearGradient id="case-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${w.case}"/>
      <stop offset="100%" stop-color="${w.case}88"/>
    </linearGradient>
    <radialGradient id="dial-${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${w.dial}"/>
      <stop offset="100%" stop-color="${w.dial}bb"/>
    </radialGradient>
    <filter id="glow-${uid}">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="600" height="700" fill="url(#bg-${uid})"/>
  <g transform="translate(300,350) rotate(${rot})">
    <rect x="-30" y="-280" width="60" height="80" rx="4" fill="url(#case-${uid})" opacity="0.9"/>
    <rect x="-28" y="-270" width="56" height="15" rx="2" fill="${w.bezel}" opacity="0.3"/>
    <rect x="-28" y="-245" width="56" height="15" rx="2" fill="${w.bezel}" opacity="0.3"/>
    <circle cx="0" cy="0" r="160" fill="url(#case-${uid})" filter="url(#glow-${uid})"/>
    <circle cx="0" cy="0" r="155" fill="none" stroke="url(#bezel-${uid})" stroke-width="12"/>
    <circle cx="0" cy="0" r="148" fill="none" stroke="${w.bezel}" stroke-width="2" opacity="0.5"/>
    <circle cx="0" cy="0" r="130" fill="url(#dial-${uid})"/>
    ${makeMarkers(w.bezel)}
    <line x1="0" y1="0" x2="0" y2="-70" stroke="${w.bezel}" stroke-width="4" stroke-linecap="round" transform="rotate(${30 + variant * 10})"/>
    <line x1="0" y1="0" x2="45" y2="-30" stroke="${w.bezel}" stroke-width="3" stroke-linecap="round" transform="rotate(${150 + variant * 5})" opacity="0.8"/>
    <line x1="0" y1="0" x2="-20" y2="-90" stroke="${w.accent}" stroke-width="1.5" stroke-linecap="round" transform="rotate(270)" opacity="0.6"/>
    <circle cx="0" cy="0" r="8" fill="${w.bezel}"/>
    <rect x="155" y="-12" width="20" height="24" rx="4" fill="${w.bezel}"/>
    <ellipse cx="-40" cy="-50" rx="60" ry="40" fill="white" opacity="${shine}" transform="rotate(-30)"/>
    <text x="0" y="50" text-anchor="middle" fill="${w.bezel}" font-family="Georgia,serif" font-size="14" letter-spacing="4" opacity="0.8">AVIOR</text>
    <rect x="-30" y="200" width="60" height="80" rx="4" fill="url(#case-${uid})" opacity="0.9"/>
    <rect x="-28" y="210" width="56" height="15" rx="2" fill="${w.bezel}" opacity="0.3"/>
    <rect x="-28" y="235" width="56" height="15" rx="2" fill="${w.bezel}" opacity="0.3"/>
  </g>
  <text x="300" y="680" text-anchor="middle" fill="#C8A96E" font-family="Georgia,serif" font-size="11" letter-spacing="6" opacity="0.5">AVIOR PRESTIGE</text>
</svg>`;
}

watches.forEach((w) => {
  fs.writeFileSync(path.join(dir, `${w.id}.svg`), makeSvg(w, 0));
  fs.writeFileSync(path.join(dir, `${w.id}-2.svg`), makeSvg(w, 1));
  fs.writeFileSync(path.join(dir, `${w.id}-3.svg`), makeSvg(w, 2));
});

console.log('Generated', watches.length * 3, 'watch SVGs');
