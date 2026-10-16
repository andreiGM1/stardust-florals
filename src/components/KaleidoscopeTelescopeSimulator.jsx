import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  RotateCw, 
  Sparkles, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Check, 
  Layers, 
  ShieldCheck, 
  Compass,
  ZoomIn
} from 'lucide-react';
import { MicroTelescopeIcon, KaleidoscopeLensIcon, DiamondIcon, RoseIcon } from './CustomIcons';

// Finisaje Mecanice din Metale Nobile
export const TELESCOPE_FINISHES = [
  {
    id: 'brass-atelier',
    name: 'Alamă Aurită 24K & Piele Maron Saddlery',
    price: 0,
    badge: 'EDITION ATELIER',
    primaryColor: '#d97706',
    secondaryColor: '#f59e0b',
    bodyGradient: 'linear-gradient(135deg, #78350f 0%, #b45309 35%, #f59e0b 65%, #d97706 100%)',
    casingBorder: 'rgba(245, 158, 11, 0.6)',
    glow: 'rgba(245, 158, 11, 0.45)',
    description: 'Alamă nobilă șlefuită manual cu inel zimțat mecanic și inserție din piele naturală cusută artizanal.'
  },
  {
    id: 'titanium-rhodium',
    name: 'Titan Argintat Rodiat & Piele Noir Stardust',
    price: 22,
    badge: 'CELESTIAL PRECISION',
    primaryColor: '#e2e8f0',
    secondaryColor: '#94a3b8',
    bodyGradient: 'linear-gradient(135deg, #1e293b 0%, #475569 35%, #cbd5e1 65%, #f8fafc 100%)',
    casingBorder: 'rgba(226, 232, 240, 0.65)',
    glow: 'rgba(226, 232, 240, 0.45)',
    description: 'Titan ultra-ușor placat cu rodiu pur strălucitor și colier din piele neagră mată texturată.'
  },
  {
    id: 'rose-gold-velvet',
    name: 'Aur Roz 18K & Mătase Purpurie Imperială',
    price: 29,
    badge: 'HAUTE JOAILLERIE',
    primaryColor: '#fb7185',
    secondaryColor: '#f43f5e',
    bodyGradient: 'linear-gradient(135deg, #881337 0%, #be123c 35%, #fb7185 65%, #fda4af 100%)',
    casingBorder: 'rgba(251, 113, 133, 0.65)',
    glow: 'rgba(251, 113, 133, 0.45)',
    description: 'Aur roz regal cu reflexii catifelate și bandă de mătase purpurie impregnată cu ceară de albine.'
  }
];

// Compoziții Prisme & Cristale
export const GEMSTONE_PRISMS = [
  {
    id: 'diamond-rose',
    name: 'Diamant Alb & Petale de Trandafir Rubiniu',
    price: 0,
    colors: ['#ffffff', '#f43f5e', '#be123c', '#fb7185', '#ffe4e6'],
    sparkleRate: 1.0,
    description: 'Fragmente de pulbere de diamant cu 58 fațete și micro-petale uscate de trandafir roșu natural.'
  },
  {
    id: 'argyle-gold',
    name: 'Diamant Roz Argyle & Fulgi de Aur Pur 24K',
    price: 18,
    colors: ['#f472b6', '#fb7185', '#f59e0b', '#fbbf24', '#fffbeb'],
    sparkleRate: 1.35,
    description: 'Cristale rare de diamant roz australian combinate cu paiete plutitoare de foiță de aur 24K.'
  },
  {
    id: 'sapphire-emerald',
    name: 'Safir Astral & Smarald Imperial',
    price: 24,
    colors: ['#38bdf8', '#0284c7', '#10b981', '#34d399', '#ecfdf5'],
    sparkleRate: 1.2,
    description: 'Reflexii profunde de safir albastru de Ceylon și smarald columbian cu refracție intensă.'
  }
];

// Geometrii de Oglinzi Caleidoscopice
export const MIRROR_GEOMETRIES = [
  {
    id: 'hexagram-6',
    name: 'Hexagramă Clasică (6 Segmente Simetrice)',
    price: 0,
    segments: 6,
    angleStep: (Math.PI * 2) / 6,
    description: 'Simetrie armonioasă clasică cu 6 axe de reflexie stelară infinită.'
  },
  {
    id: 'octagon-8',
    name: 'Octogon Regal (8 Segmente Florale)',
    price: 14,
    segments: 8,
    angleStep: (Math.PI * 2) / 8,
    description: 'Mozaic hipnotic cu 8 unghiuri reflectate, generând tipare de petale dense.'
  },
  {
    id: 'dodecagram-12',
    name: 'Dodecagramă Sacră (12 Segmente Astrale)',
    price: 20,
    segments: 12,
    angleStep: (Math.PI * 2) / 12,
    description: 'Mozaic de înaltă orfevrărie cu 12 reflexii perimetrice de profunzime cosmică.'
  }
];

// Sinteza Sunetelor Optice prin Web Audio API
function playOpticsSound(type = 'click', isMuted = false) {
  if (isMuted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'ratchet') {
      // Sunet mecanic de inel zimțat din alamă rotit
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'chime') {
      // Clinchet de cristal și refracție de lentilă de safir
      const freqs = [1046.5, 1318.5, 1567.98, 2093.0];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.05 / (i + 1), ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.04 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + i * 0.04 + 0.45);
      });
    }
  } catch (err) {
    // Web Audio nesuportat sau restricționat de browser
  }
}

export default function KaleidoscopeTelescopeSimulator({
  onApplyConfig,
  initialConfig = null,
  isEmbedded = false
}) {
  // Stări principale configurator
  const [selectedFinish, setSelectedFinish] = useState(
    initialConfig?.finishId || TELESCOPE_FINISHES[0].id
  );
  const [selectedPrism, setSelectedPrism] = useState(
    initialConfig?.prismId || GEMSTONE_PRISMS[0].id
  );
  const [selectedGeometry, setSelectedGeometry] = useState(
    initialConfig?.geometryId || MIRROR_GEOMETRIES[0].id
  );
  const [secretMessage, setSecretMessage] = useState(
    initialConfig?.secretMessage || 'Ești Universul Meu'
  );
  const [engravedCollar, setEngravedCollar] = useState(
    initialConfig?.engravedCollar || 'Stardust Atelier • N° 7892'
  );

  // Stări vizuale & interactive
  const [viewMode, setViewMode] = useState('eyepiece'); // 'eyepiece' | 'stem'
  const [rotationAngle, setRotationAngle] = useState(0); // Unghi în radiani
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [focusClarity, setFocusClarity] = useState(90); // 30 - 100%
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);

  const currentFinish = TELESCOPE_FINISHES.find(f => f.id === selectedFinish) || TELESCOPE_FINISHES[0];
  const currentPrism = GEMSTONE_PRISMS.find(p => p.id === selectedPrism) || GEMSTONE_PRISMS[0];
  const currentGeometry = MIRROR_GEOMETRIES.find(g => g.id === selectedGeometry) || MIRROR_GEOMETRIES[0];

  // Calculul Prețului Total
  const basePrice = 79;
  const totalPrice = basePrice + currentFinish.price + currentPrism.price + currentGeometry.price;

  // Generare particule cristaline de bază pentru un sector caleidoscopic
  useEffect(() => {
    const count = 38;
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      // Coordonate polare relative la raza ocularului
      const dist = 0.15 + Math.random() * 0.75;
      const angle = (Math.random() * (Math.PI / 6)) - (Math.PI / 12);
      const size = 3 + Math.random() * 9;
      const shapeType = Math.floor(Math.random() * 4); // 0: diamond, 1: petal, 2: gold flake, 3: star
      const colorIdx = Math.floor(Math.random() * currentPrism.colors.length);
      const rotationSpeed = (Math.random() - 0.5) * 0.03;
      const selfAngle = Math.random() * Math.PI * 2;

      newParticles.push({
        dist,
        angle,
        size,
        shapeType,
        colorIdx,
        rotationSpeed,
        selfAngle,
        opacity: 0.7 + Math.random() * 0.3
      });
    }
    particlesRef.current = newParticles;
  }, [selectedPrism]);

  // Buclă de randare Canvas HTML5
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localAngle = rotationAngle;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 18;

      ctx.clearRect(0, 0, width, height);

      if (viewMode === 'eyepiece') {
        // --- VEDERE PRIN OCULARUL CALEIDOSCOPIC 360° ---

        // 1. Fundal sticlă optică safir profundă
        const bgGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
        bgGrad.addColorStop(0, '#0a0a14');
        bgGrad.addColorStop(0.7, '#05050a');
        bgGrad.addColorStop(1, '#000002');
        ctx.fillStyle = bgGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Randare Mozaic Caleidoscopic cu Simetrie Radială
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 4, 0, Math.PI * 2);
        ctx.clip(); // Limitare strictă în interiorul lentilei

        const segments = currentGeometry.segments;
        const segmentAngle = (Math.PI * 2) / segments;

        // Auto-rotație lină dacă este activată
        if (isAutoRotating && !isDragging) {
          localAngle += 0.0035;
          setRotationAngle(localAngle);
        }

        // Aplicare neclaritate optică dacă focalizarea e scăzută
        const blurAmount = Math.max(0, (100 - focusClarity) * 0.12);
        ctx.filter = blurAmount > 0.4 ? `blur(${blurAmount.toFixed(1)}px)` : 'none';

        // Desenare segmente simetrice reflectate
        for (let s = 0; s < segments; s++) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(localAngle + s * segmentAngle);

          // Alternanță reflexie în oglindă (stânga-dreapta)
          if (s % 2 === 1) {
            ctx.scale(1, -1);
          }

          // Randare particule din sector
          const particles = particlesRef.current;
          particles.forEach((p) => {
            const px = Math.cos(p.angle) * p.dist * radius;
            const py = Math.sin(p.angle) * p.dist * radius;
            const color = currentPrism.colors[p.colorIdx % currentPrism.colors.length];

            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(p.selfAngle + localAngle);

            ctx.fillStyle = color;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.6;
            ctx.globalAlpha = p.opacity;

            if (p.shapeType === 0) {
              // Romb / Fațetă Diamant
              ctx.beginPath();
              ctx.moveTo(0, -p.size);
              ctx.lineTo(p.size * 0.6, 0);
              ctx.lineTo(0, p.size);
              ctx.lineTo(-p.size * 0.6, 0);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();
            } else if (p.shapeType === 1) {
              // Petală de trandafir fină
              ctx.beginPath();
              ctx.ellipse(0, 0, p.size * 0.8, p.size * 0.4, 0.4, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.shapeType === 2) {
              // Fulg de aur neregulat
              ctx.beginPath();
              ctx.moveTo(-p.size * 0.5, -p.size * 0.3);
              ctx.lineTo(p.size * 0.4, -p.size * 0.5);
              ctx.lineTo(p.size * 0.6, p.size * 0.4);
              ctx.lineTo(-p.size * 0.3, p.size * 0.5);
              ctx.closePath();
              ctx.fill();
            } else {
              // Steluță / Scânteie prismatică
              ctx.beginPath();
              for (let pt = 0; pt < 4; pt++) {
                const a = (pt * Math.PI) / 2;
                ctx.lineTo(Math.cos(a) * p.size, Math.sin(a) * p.size);
                const aMid = a + Math.PI / 4;
                ctx.lineTo(Math.cos(aMid) * (p.size * 0.3), Math.sin(aMid) * (p.size * 0.3));
              }
              ctx.closePath();
              ctx.fill();
            }

            ctx.restore();
          });

          ctx.restore();
        }

        ctx.filter = 'none'; // Resetare filtru blur

        // 3. Iluminare Prismă Laterală & Halou Central
        const haloGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius * 0.48);
        haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
        haloGrad.addColorStop(0.3, currentFinish.glow);
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // 4. Reticul Optic de Precizie (Linii fine de ghidaj milimetric)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.32, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.65, 0, Math.PI * 2);
        ctx.stroke();

        // Axe reticul
        ctx.beginPath();
        ctx.moveTo(centerX - radius * 0.85, centerY);
        ctx.lineTo(centerX - radius * 0.36, centerY);
        ctx.moveTo(centerX + radius * 0.36, centerY);
        ctx.lineTo(centerX + radius * 0.85, centerY);
        ctx.moveTo(centerX, centerY - radius * 0.85);
        ctx.lineTo(centerX, centerY - radius * 0.36);
        ctx.moveTo(centerX, centerY + radius * 0.36);
        ctx.lineTo(centerX, centerY + radius * 0.85);
        ctx.stroke();

        // 5. Micro-Mesajul Secret Iluminat în Inima Lentilei
        if (secretMessage && secretMessage.trim()) {
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Efect de focalizare pe text
          const textBlur = Math.max(0, (100 - focusClarity) * 0.08);
          ctx.filter = textBlur > 0.3 ? `blur(${textBlur.toFixed(1)}px)` : 'none';

          // Micro-Plăcuță translucidă centrală
          ctx.fillStyle = 'rgba(10, 10, 18, 0.75)';
          ctx.strokeStyle = currentFinish.secondaryColor;
          ctx.lineWidth = 1;
          const boxW = Math.min(radius * 0.72, 170);
          const boxH = 34;
          ctx.beginPath();
          ctx.roundRect(centerX - boxW / 2, centerY - boxH / 2, boxW, boxH, 17);
          ctx.fill();
          ctx.stroke();

          // Text Caligrafic de Aur
          ctx.fillStyle = currentFinish.primaryColor;
          ctx.font = '600 11px "Cinzel", "Playfair Display", Georgia, serif';
          ctx.letterSpacing = '1px';
          ctx.fillText(secretMessage.slice(0, 32), centerX, centerY - 1);

          // Subtitlu nanometric
          ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.font = '8px sans-serif';
          ctx.fillText('OPTICĂ NANOMETRICĂ STARDUST', centerX, centerY + 9);

          ctx.restore();
        }

        ctx.restore(); // Restore clip lentilă

        // 6. Inelul Masiv de Alamă / Titan Exterior al Ocularului
        ctx.save();
        ctx.lineWidth = 14;
        const casingGrad = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
        casingGrad.addColorStop(0, '#1c1917');
        casingGrad.addColorStop(0.3, currentFinish.primaryColor);
        casingGrad.addColorStop(0.7, currentFinish.secondaryColor);
        casingGrad.addColorStop(1, '#0c0a09');
        ctx.strokeStyle = casingGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 7, 0, Math.PI * 2);
        ctx.stroke();

        // Inel zimțat mecanic (knurling notches pe margine)
        const notchCount = 72;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.2;
        for (let i = 0; i < notchCount; i++) {
          const a = (i * Math.PI * 2) / notchCount;
          const rInner = radius + 2;
          const rOuter = radius + 13;
          ctx.beginPath();
          ctx.moveTo(centerX + Math.cos(a) * rInner, centerY + Math.sin(a) * rInner);
          ctx.lineTo(centerX + Math.cos(a) * rOuter, centerY + Math.sin(a) * rOuter);
          ctx.stroke();
        }

        // Gravură laser pe inelul ocularului
        ctx.strokeStyle = currentFinish.casingBorder;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();

      } else {
        // --- VEDERE ANSAMBLU TIJĂ TRANDAFIR & MICRO-TELESCOP ---
        // Randare vizuală tehnică a tijei florale cu modulul optic montat

        // Fundal întunecat de studio de bijuterie
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Grid subtil de calibrare atelier
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 30) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Tija trandafirului central (verde smarald profund)
        ctx.save();
        ctx.strokeStyle = '#064e3b';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(centerX, 20);
        ctx.bezierCurveTo(centerX - 8, 100, centerX + 12, 190, centerX, height - 20);
        ctx.stroke();

        // Ghimpi stilizați și frunze fine de catifea
        ctx.fillStyle = '#047857';
        ctx.beginPath();
        ctx.moveTo(centerX - 5, 80);
        ctx.lineTo(centerX - 24, 75);
        ctx.lineTo(centerX - 5, 88);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(centerX + 5, 250);
        ctx.lineTo(centerX + 26, 245);
        ctx.lineTo(centerX + 5, 258);
        ctx.fill();

        // Corpul Micro-Telescopului din Alamă/Titan integrat în tijă
        const tubeY = 110;
        const tubeH = 135;
        const tubeW = 28;

        // Cilindru principal metalic
        const tubeGrad = ctx.createLinearGradient(centerX - tubeW / 2, 0, centerX + tubeW / 2, 0);
        tubeGrad.addColorStop(0, '#1c1917');
        tubeGrad.addColorStop(0.3, currentFinish.primaryColor);
        tubeGrad.addColorStop(0.7, currentFinish.secondaryColor);
        tubeGrad.addColorStop(1, '#0c0a09');

        ctx.fillStyle = tubeGrad;
        ctx.strokeStyle = currentFinish.casingBorder;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(centerX - tubeW / 2, tubeY, tubeW, tubeH, 4);
        ctx.fill();
        ctx.stroke();

        // Inel zimțat de focalizare mecanică (focal adjustment ring)
        const ringY = tubeY + 45;
        const ringH = 24;
        const ringW = 34;
        ctx.fillStyle = '#1c1917';
        ctx.strokeStyle = currentFinish.primaryColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(centerX - ringW / 2, ringY, ringW, ringH, 3);
        ctx.fill();
        ctx.stroke();

        // Zimți metalici inel
        ctx.strokeStyle = currentFinish.secondaryColor;
        ctx.lineWidth = 1.2;
        for (let i = centerX - ringW / 2 + 3; i < centerX + ringW / 2 - 2; i += 4) {
          ctx.beginPath();
          ctx.moveTo(i, ringY + 2);
          ctx.lineTo(i, ringY + ringH - 2);
          ctx.stroke();
        }

        // Prismă de safir laterală colectoare de lumină ambientală
        const prismX = centerX + tubeW / 2 + 1;
        const prismY = tubeY + 16;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(prismX, prismY);
        ctx.lineTo(prismX + 16, prismY + 6);
        ctx.lineTo(prismX + 16, prismY + 22);
        ctx.lineTo(prismX, prismY + 28);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Fascicul de lumină captat de prismă
        const beamGrad = ctx.createLinearGradient(prismX + 16, prismY + 14, prismX + 50, prismY - 10);
        beamGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
        beamGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(prismX + 16, prismY + 6);
        ctx.lineTo(prismX + 55, prismY - 14);
        ctx.lineTo(prismX + 45, prismY + 36);
        ctx.lineTo(prismX + 16, prismY + 22);
        ctx.closePath();
        ctx.fill();

        // Ocular superior orientat spre privitor
        const eyeY = tubeY - 12;
        const eyeH = 14;
        const eyeW = 38;
        ctx.fillStyle = currentFinish.primaryColor;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(centerX - eyeW / 2, eyeY, eyeW, eyeH, 5);
        ctx.fill();
        ctx.stroke();

        // Reflexie lentilă safir sus
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.ellipse(centerX, eyeY + 2, 12, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Etichetă & Colier Gravat
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '9px "Cinzel", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText(engravedCollar, centerX, tubeY + tubeH + 20);

        ctx.fillStyle = currentFinish.secondaryColor;
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText('MICRO-TELESCOP CALEIDOSCOPIC 24K', centerX, tubeY + tubeH + 34);

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [viewMode, rotationAngle, isAutoRotating, isDragging, focusClarity, currentFinish, currentPrism, currentGeometry, secretMessage, engravedCollar]);

  // Manipulare interacțiune rotație prin drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;
    const dx = curX - dragStartPos.x;
    const dy = curY - dragStartPos.y;

    const angleDelta = (dx + dy) * 0.015;
    setRotationAngle((prev) => {
      const next = prev + angleDelta;
      if (Math.abs(angleDelta) > 0.02) {
        playOpticsSound('ratchet', isAudioMuted);
      }
      return next;
    });
    setDragStartPos({ x: curX, y: curY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Interacțiune touch pentru dispozitive mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && canvasRef.current) {
      setIsDragging(true);
      setIsAutoRotating(false);
      const rect = canvasRef.current.getBoundingClientRect();
      setDragStartPos({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !canvasRef.current || e.touches.length !== 1) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const curX = e.touches[0].clientX - rect.left;
    const curY = e.touches[0].clientY - rect.top;
    const dx = curX - dragStartPos.x;
    const dy = curY - dragStartPos.y;

    const angleDelta = (dx + dy) * 0.018;
    setRotationAngle((prev) => {
      const next = prev + angleDelta;
      if (Math.abs(angleDelta) > 0.03) {
        playOpticsSound('ratchet', isAudioMuted);
      }
      return next;
    });
    setDragStartPos({ x: curX, y: curY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleRotateStep = (direction) => {
    setIsAutoRotating(false);
    playOpticsSound('ratchet', isAudioMuted);
    setRotationAngle((prev) => prev + direction * (Math.PI / 12));
  };

  const handleFinishChange = (finishId) => {
    setSelectedFinish(finishId);
    playOpticsSound('chime', isAudioMuted);
  };

  const handlePrismChange = (prismId) => {
    setSelectedPrism(prismId);
    playOpticsSound('chime', isAudioMuted);
  };

  const handleGeometryChange = (geometryId) => {
    setSelectedGeometry(geometryId);
    playOpticsSound('chime', isAudioMuted);
  };

  const handleApply = () => {
    const config = {
      finishId: currentFinish.id,
      finishName: currentFinish.name,
      prismId: currentPrism.id,
      prismName: currentPrism.name,
      geometryId: currentGeometry.id,
      geometryName: currentGeometry.name,
      secretMessage,
      engravedCollar,
      focusClarity,
      totalPrice
    };

    if (onApplyConfig) {
      onApplyConfig(config);
    }
  };

  return (
    <div 
      className={`kaleidoscope-simulator-container ${isEmbedded ? 'embedded-mode' : 'standalone-mode'}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        color: '#f8fafc',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      {/* 1. Header & Badge de Autenticitate */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid rgba(245, 158, 11, 0.25)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(217, 119, 6, 0.15) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(245, 158, 11, 0.4)'
            }}
          >
            <MicroTelescopeIcon size={20} color="#f59e0b" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#fef3c7', letterSpacing: '0.5px' }}>
              Micro-Telescop Caleidoscopic Stardust™
            </h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>
              Optică de safir montată în tija trandafirului central • Mesaj secret nanometric
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            id="btn-toggle-optics-audio"
            type="button"
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            title={isAudioMuted ? 'Activează efectele acustice optice' : 'Oprește sunetul'}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: isAudioMuted ? '#94a3b8' : '#f59e0b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}
          >
            {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isAudioMuted ? 'Mute' : 'Audio Optic'}</span>
          </button>

          <span 
            style={{
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#f59e0b',
              fontSize: '0.75rem',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}
          >
            +{totalPrice} RON
          </span>
        </div>
      </div>

      {/* 2. Zona Centrală de Randare Vizuală Canvas */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr)',
          gap: '1rem',
          background: 'rgba(15, 23, 42, 0.65)',
          borderRadius: '16px',
          padding: '1rem',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)'
        }}
      >
        {/* Butoane Comutare Vedere */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <button
            id="btn-kaleidoscope-view-eyepiece"
            type="button"
            onClick={() => {
              setViewMode('eyepiece');
              playOpticsSound('click', isAudioMuted);
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              border: viewMode === 'eyepiece' ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.12)',
              background: viewMode === 'eyepiece' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              color: viewMode === 'eyepiece' ? '#fef3c7' : '#94a3b8',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            <KaleidoscopeLensIcon size={14} color={viewMode === 'eyepiece' ? '#f59e0b' : 'currentColor'} />
            <span>Vedere Prin Ocular 360°</span>
          </button>

          <button
            id="btn-kaleidoscope-view-stem"
            type="button"
            onClick={() => {
              setViewMode('stem');
              playOpticsSound('click', isAudioMuted);
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              border: viewMode === 'stem' ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.12)',
              background: viewMode === 'stem' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              color: viewMode === 'stem' ? '#fef3c7' : '#94a3b8',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            <MicroTelescopeIcon size={14} color={viewMode === 'stem' ? '#f59e0b' : 'currentColor'} />
            <span>Vedere Tijă Florală & Finisaj</span>
          </button>
        </div>

        {/* Canvas Interactiv */}
        <div 
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              borderRadius: '50%',
              boxShadow: `0 0 35px ${currentFinish.glow}`,
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
              maxWidth: '100%',
              height: 'auto',
              border: `2px solid ${currentFinish.casingBorder}`
            }}
          />

          {/* Indicație Interacțiune Rotație */}
          <div 
            style={{
              marginTop: '0.65rem',
              fontSize: '0.72rem',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RotateCw size={12} className="spin-slow" />
            <span>Trage cu cursorul sau degetul pe lentilă pentru a roti caleidoscopul 360°</span>
          </div>
        </div>

        {/* Panou de Control Rapid pentru Rotație & Focalizare */}
        {viewMode === 'eyepiece' && (
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.85rem',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                id="btn-rotate-step-prev"
                type="button"
                onClick={() => handleRotateStep(-1)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: '#e2e8f0',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap'
                }}
              >
                -15° Inel
              </button>
              <button
                id="btn-rotate-step-next"
                type="button"
                onClick={() => handleRotateStep(1)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: '#e2e8f0',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap'
                }}
              >
                +15° Inel
              </button>
              <button
                id="btn-toggle-autorotate"
                type="button"
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                style={{
                  background: isAutoRotating ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  border: isAutoRotating ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: isAutoRotating ? '#fef3c7' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {isAutoRotating ? 'Pauză Rotație' : 'Auto-Rotire'}
              </button>
            </div>

            {/* Slider Focalizare Inel Zimțat */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, justifyContent: 'flex-end', minWidth: '150px' }}>
              <ZoomIn size={14} color="#f59e0b" />
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>Claritate:</span>
              <input
                id="range-optical-focus"
                type="range"
                min="35"
                max="100"
                value={focusClarity}
                onChange={(e) => {
                  setFocusClarity(Number(e.target.value));
                  if (Math.abs(Number(e.target.value) - focusClarity) > 5) {
                    playOpticsSound('ratchet', isAudioMuted);
                  }
                }}
                style={{
                  width: '90px',
                  accentColor: '#f59e0b',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#fef3c7', minWidth: '32px' }}>
                {focusClarity}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Opțiuni de Personalizare & Selecție */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* A. Finisaje din Metale Nobile */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fef3c7', marginBottom: '0.4rem' }}>
            1. Finisaj Mecanic din Metal Nobil al Micro-Telescopului:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.5rem' }}>
            {TELESCOPE_FINISHES.map((finish) => {
              const isSelected = finish.id === selectedFinish;
              return (
                <div
                  key={finish.id}
                  id={`finish-opt-${finish.id}`}
                  onClick={() => handleFinishChange(finish.id)}
                  style={{
                    padding: '0.65rem 0.8rem',
                    borderRadius: '10px',
                    border: isSelected ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isSelected ? '#fef3c7' : '#e2e8f0' }}>
                      {finish.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: finish.price === 0 ? '#10b981' : '#f59e0b' }}>
                      {finish.price === 0 ? 'Inclus' : `+${finish.price} RON`}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.35 }}>
                    {finish.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* B. Compoziții Prisme & Cristale */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fef3c7', marginBottom: '0.4rem' }}>
            2. Compoziție Cristale Prisatice & Pulberi Eterice:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.5rem' }}>
            {GEMSTONE_PRISMS.map((prism) => {
              const isSelected = prism.id === selectedPrism;
              return (
                <div
                  key={prism.id}
                  id={`prism-opt-${prism.id}`}
                  onClick={() => handlePrismChange(prism.id)}
                  style={{
                    padding: '0.65rem 0.8rem',
                    borderRadius: '10px',
                    border: isSelected ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isSelected ? '#fef3c7' : '#e2e8f0' }}>
                      {prism.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: prism.price === 0 ? '#10b981' : '#f59e0b' }}>
                      {prism.price === 0 ? 'Inclus' : `+${prism.price} RON`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {prism.colors.map((c, idx) => (
                      <span
                        key={idx}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: c,
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                      />
                    ))}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.35 }}>
                    {prism.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* C. Geometrii de Oglinzi Caleidoscopice */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fef3c7', marginBottom: '0.4rem' }}>
            3. Geometrie de Oglinzi Prisatice (Număr Segmente Simetrice):
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.5rem' }}>
            {MIRROR_GEOMETRIES.map((geom) => {
              const isSelected = geom.id === selectedGeometry;
              return (
                <div
                  key={geom.id}
                  id={`geometry-opt-${geom.id}`}
                  onClick={() => handleGeometryChange(geom.id)}
                  style={{
                    padding: '0.65rem 0.8rem',
                    borderRadius: '10px',
                    border: isSelected ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isSelected ? '#fef3c7' : '#e2e8f0' }}>
                      {geom.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: geom.price === 0 ? '#10b981' : '#f59e0b' }}>
                      {geom.price === 0 ? 'Inclus' : `+${geom.price} RON`}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.35 }}>
                    {geom.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* D. Micro-Mesaj Secret în Ocular & Gravură Inel */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0.75rem',
            padding: '0.85rem',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(245, 158, 11, 0.18)'
          }}
        >
          <div>
            <label 
              htmlFor="input-telescope-secret-msg" 
              style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#fef3c7', marginBottom: '0.3rem' }}
            >
              Mesaj Caligrafic Secret în Ocular (max 35 caractere):
            </label>
            <input
              id="input-telescope-secret-msg"
              type="text"
              maxLength={35}
              value={secretMessage}
              onChange={(e) => setSecretMessage(e.target.value)}
              placeholder="ex: Ești universul meu..."
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                color: '#fef3c7',
                fontSize: '0.82rem',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              Apare iluminat în centrul reflexiilor de diamant când se privește prin lentilă.
            </span>
          </div>

          <div>
            <label 
              htmlFor="input-telescope-engraving" 
              style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#fef3c7', marginBottom: '0.3rem' }}
            >
              Gravură Laser Colier Metalic (max 30 caractere):
            </label>
            <input
              id="input-telescope-engraving"
              type="text"
              maxLength={30}
              value={engravedCollar}
              onChange={(e) => setEngravedCollar(e.target.value)}
              placeholder="ex: A & M • 14.02.2024"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                color: '#fef3c7',
                fontSize: '0.82rem',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              Micro-gravură nanometrică pe inelul din alamă aurită a tijei.
            </span>
          </div>
        </div>

        {/* 4. Buton de Aplicare Configurație */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
          <button
            id="btn-apply-kaleidoscope-config"
            type="button"
            onClick={handleApply}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#0f172a',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 24px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
              whiteSpace: 'nowrap !important',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
          >
            <Check size={18} strokeWidth={2.5} />
            <span>Confirmă Configurația Micro-Telescopului (+{totalPrice} RON)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
