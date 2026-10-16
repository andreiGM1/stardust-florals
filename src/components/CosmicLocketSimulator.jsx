import React, { useState, useEffect, useRef } from 'react';
import { 
  CosmicLocketIcon, 
  JewelerLoupeIcon 
} from './CustomIcons';
import { 
  Volume2, 
  VolumeX, 
  Check, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  RotateCw,
  Compass,
  ShieldCheck
} from 'lucide-react';

export const LOCKET_METALS = [
  {
    id: 'rose-gold-18k',
    name: 'Titan & Aur Roz 18K (Rose Gold Royale)',
    desc: 'Titan aerospațial hipoalergenic placat gros cu aur roz 18K și cristal safir 9 Mohs',
    price: 0,
    hex: '#fb7185',
    metalGradient: 'linear-gradient(135deg, #fda4af 0%, #e11d48 50%, #881337 100%)',
    textColor: '#fecdd3'
  },
  {
    id: 'platinum-silver',
    name: 'Argint 925 Rodiat cu Platină & Titan Pur',
    desc: 'Luciu argintiu pur cu tratament anti-oxidare din platină nobilă de laborator',
    price: 15,
    hex: '#e2e8f0',
    metalGradient: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #64748b 100%)',
    textColor: '#f8fafc'
  },
  {
    id: 'noir-gold',
    name: 'Titan Negru Noir & Aur Galben 24K (Contrast)',
    desc: 'Finisaj PVD negru mat satinat cu inel filetat și accente din aur galben 24K',
    price: 20,
    hex: '#f59e0b',
    metalGradient: 'linear-gradient(135deg, #451a03 0%, #171717 40%, #d97706 100%)',
    textColor: '#fef3c7'
  }
];

export const LOCKET_SHAPES = [
  {
    id: 'celestial-teardrop',
    name: 'Picătură de Rouă Cosmică (Celestial Teardrop)',
    desc: 'Siluetă organică alungită ce permite particulelor de diamant să plutească natural',
    price: 0,
    badge: 'SIGNATURE'
  },
  {
    id: 'starlight-heart',
    name: 'Inimă Astrală Fațetată (Starlight Heart)',
    desc: 'Inimă romantică sculptată cu fațete prismatice în cristalul de safir',
    price: 15,
    badge: 'ROMANTIC'
  },
  {
    id: 'time-capsule',
    name: 'Capsulă Cilindrică Hermetică (Eternal Time Capsule)',
    desc: 'Design de capsulă a timpului cu vizor panoramic 360° și filet etanș',
    price: 19,
    badge: 'CAPSULA TIMPULUI'
  }
];

export const DIAMOND_DUSTS = [
  {
    id: 'white-stardust',
    name: 'Pulbere de Diamant Alb Pur Stardust',
    desc: 'Micro-diamante naturale calibrate fin cu reflexii pure de prismă albă',
    price: 0,
    dustColor: '#ffffff',
    dustGlow: 'rgba(255, 255, 255, 0.9)',
    rgb: [255, 255, 255]
  },
  {
    id: 'blush-rose-dust',
    name: 'Pulbere de Diamant Roz Argyle & Aur Roz',
    desc: 'Cristale rare roz-rubiniu combinate cu micro-foiță de aur roz 18K',
    price: 20,
    dustColor: '#f472b6',
    dustGlow: 'rgba(244, 114, 182, 0.95)',
    rgb: [244, 114, 182]
  },
  {
    id: 'midnight-emerald',
    name: 'Pulbere de Diamant Negru & Micro-Smarald',
    desc: 'Contrast hipnotic de particule negre diamantate și reflexii verzi smarald',
    price: 25,
    dustColor: '#34d399',
    dustGlow: 'rgba(52, 211, 153, 0.95)',
    rgb: [52, 211, 153]
  }
];

export const CHAIN_LENGTHS = [
  {
    id: 'chain-45',
    name: 'Lănțișor Fin Forțat 45 cm (La Baza Gâtului)',
    desc: 'Dispunere ideală pentru decolteu fin sau purtare zilnică discretă',
    price: 0
  },
  {
    id: 'chain-55',
    name: 'Lănțișor Regal Veneziana 55 cm (La Nivelul Inimii)',
    desc: 'Lungime mai amplă ce așază pandantivul exact deasupra pieptului',
    price: 15
  }
];

export default function CosmicLocketSimulator({
  onApplyConfig,
  initialData = null,
  isEmbedded = false
}) {
  const [selectedMetal, setSelectedMetal] = useState(
    initialData?.metalId || 'rose-gold-18k'
  );
  const [selectedShape, setSelectedShape] = useState(
    initialData?.shapeId || 'celestial-teardrop'
  );
  const [selectedDust, setSelectedDust] = useState(
    initialData?.dustId || 'white-stardust'
  );
  const [selectedChain, setSelectedChain] = useState(
    initialData?.chainId || 'chain-45'
  );

  const [secretMessage, setSecretMessage] = useState(
    initialData?.secretMessage || 'Ești Universul Meu Etern'
  );
  const [coordinatesDate, setCoordinatesDate] = useState(
    initialData?.coordinatesDate || '44°26\'N 26°06\'E • 24.10.2023'
  );

  const [viewMode, setViewMode] = useState('macro-loupe'); // 'overview' | 'macro-loupe'
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0, isHover: false });

  const currentMetal = LOCKET_METALS.find(m => m.id === selectedMetal) || LOCKET_METALS[0];
  const currentShape = LOCKET_SHAPES.find(s => s.id === selectedShape) || LOCKET_SHAPES[0];
  const currentDust = DIAMOND_DUSTS.find(d => d.id === selectedDust) || DIAMOND_DUSTS[0];
  const currentChain = CHAIN_LENGTHS.find(c => c.id === selectedChain) || CHAIN_LENGTHS[0];

  const basePrice = 69;
  const totalPrice = basePrice + currentMetal.price + currentShape.price + currentDust.price + currentChain.price;

  // Synthesize delicate hermetic jewelry click and crystal diamond chime
  const playLocketSound = () => {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. Precious metal thread screw / haptic click
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(140, now + 0.08);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // 2. High ethereal diamond chime (3 harmonics)
      const freqs = [1760, 2637, 3520];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + 0.04 + i * 0.03);
        gain.gain.setValueAtTime(0.08 / (i + 1), now + 0.04 + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5 + i * 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.04 + i * 0.03);
        osc.stop(now + 0.65);
      });
    } catch (e) {
      // Audio autoplay gracefully handled
    }
  };

  // Canvas interactive rendering (Overview vs Loupe Mode)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    // Diamond dust particles in chamber
    const particles = [];
    const particleCount = viewMode === 'macro-loupe' ? 65 : 25;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * (viewMode === 'macro-loupe' ? 140 : 25),
        y: (Math.random() - 0.5) * (viewMode === 'macro-loupe' ? 150 : 35),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: (Math.random() * 2 + 1) * (viewMode === 'macro-loupe' ? 1.6 : 0.7),
        sparkleSpeed: 0.03 + Math.random() * 0.05,
        sparklePhase: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Dark luxury background
      const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, w * 0.7);
      bgGrad.addColorStop(0, '#1a0815');
      bgGrad.addColorStop(0.6, '#0b0209');
      bgGrad.addColorStop(1, '#040103');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const mouse = mousePosRef.current;
      const tiltX = (mouse.x - cx) * 0.05;
      const tiltY = (mouse.y - cy) * 0.05;

      if (viewMode === 'overview') {
        // --- 1. OVERVIEW MODE: Life-size Locket on Chain ---
        
        // Draw delicate chain draped from top
        ctx.save();
        ctx.strokeStyle = currentMetal.hex;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(cx - 70, 0);
        ctx.quadraticCurveTo(cx - 30, cy - 80, cx, cy - 65);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx + 70, 0);
        ctx.quadraticCurveTo(cx + 30, cy - 80, cx, cy - 65);
        ctx.stroke();
        ctx.restore();

        // Chain bale ring
        ctx.save();
        ctx.translate(cx + tiltX * 0.4, cy - 65 + tiltY * 0.4);
        ctx.strokeStyle = currentMetal.hex;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Locket Outer Body
        ctx.save();
        ctx.translate(cx + tiltX, cy - 10 + tiltY);

        // Drop shadow
        ctx.shadowColor = currentMetal.hex;
        ctx.shadowBlur = 18;
        ctx.fillStyle = currentMetal.hex;

        // Shape rendering
        if (selectedShape === 'celestial-teardrop') {
          ctx.beginPath();
          ctx.moveTo(0, -42);
          ctx.bezierCurveTo(32, -10, 42, 28, 0, 48);
          ctx.bezierCurveTo(-42, 28, -32, -10, 0, -42);
          ctx.fill();
        } else if (selectedShape === 'starlight-heart') {
          ctx.beginPath();
          ctx.moveTo(0, 38);
          ctx.bezierCurveTo(42, 10, 42, -28, 0, -10);
          ctx.bezierCurveTo(-42, -28, -42, 10, 0, 38);
          ctx.fill();
        } else {
          // Time Capsule
          ctx.beginPath();
          ctx.roundRect(-24, -40, 48, 80, 24);
          ctx.fill();
        }

        // Inner Sapphire Crystal Chamber Window
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(6, 3, 10, 0.9)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.2;

        if (selectedShape === 'celestial-teardrop') {
          ctx.beginPath();
          ctx.moveTo(0, -32);
          ctx.bezierCurveTo(24, -6, 30, 22, 0, 38);
          ctx.bezierCurveTo(-30, 22, -24, -6, 0, -32);
          ctx.fill();
          ctx.stroke();
        } else if (selectedShape === 'starlight-heart') {
          ctx.beginPath();
          ctx.moveTo(0, 28);
          ctx.bezierCurveTo(32, 6, 32, -20, 0, -5);
          ctx.bezierCurveTo(-32, -20, -32, 6, 0, 28);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.roundRect(-18, -32, 36, 64, 18);
          ctx.fill();
          ctx.stroke();
        }

        // Floating Diamond Dust in Chamber
        const rgb = currentDust.rgb;
        particles.forEach(p => {
          p.sparklePhase += p.sparkleSpeed;
          const alpha = 0.4 + Math.sin(p.sparklePhase) * 0.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y + 6, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
          ctx.fill();
        });

        // Crystal highlight streak
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(-10, 0, 16, Math.PI * 0.8, Math.PI * 1.3);
        ctx.stroke();

        ctx.restore();

      } else {
        // --- 2. MACRO LOUPE MODE: Jeweler's 30x Precision View ---
        
        // Loupe Brass Frame & Reticle
        ctx.save();

        // Circular Loupe Outer Ring
        ctx.beginPath();
        ctx.arc(cx, cy, 145, 0, Math.PI * 2);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 5;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
        ctx.shadowBlur = 15;
        ctx.stroke();

        // Measurement ticks on rim
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.lineWidth = 1;
        for (let a = 0; a < 360; a += 15) {
          const rad = (a * Math.PI) / 180;
          const r1 = 140;
          const r2 = a % 45 === 0 ? 130 : 135;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(rad) * r1, cy + Math.sin(rad) * r1);
          ctx.lineTo(cx + Math.cos(rad) * r2, cy + Math.sin(rad) * r2);
          ctx.stroke();
        }

        // Loupe Glass Lens Background
        const lensGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
        lensGrad.addColorStop(0, 'rgba(28, 10, 24, 0.95)');
        lensGrad.addColorStop(0.7, 'rgba(12, 3, 10, 0.98)');
        lensGrad.addColorStop(1, 'rgba(4, 1, 3, 1)');
        ctx.fillStyle = lensGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 140, 0, Math.PI * 2);
        ctx.fill();

        // Clip to loupe lens
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, 138, 0, Math.PI * 2);
        ctx.clip();

        // Micro-engraved Titanium Plaque in center
        ctx.save();
        ctx.translate(cx + tiltX * 0.5, cy + tiltY * 0.5);

        // Titanium Plaque Base
        const plaqueGrad = ctx.createLinearGradient(-100, -50, 100, 50);
        plaqueGrad.addColorStop(0, '#334155');
        plaqueGrad.addColorStop(0.5, '#1e293b');
        plaqueGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = plaqueGrad;
        ctx.strokeStyle = currentMetal.hex;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-105, -55, 210, 110, 12);
        ctx.fill();
        ctx.stroke();

        // 24K Gold Nanometer Laser Engraving Lines
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.textAlign = 'center';

        // Atelier Crown Logo
        ctx.font = 'bold 9px Cinzel, serif';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('• STARDUST JEWEL ATELIER •', 0, -32);

        // Main Secret Message (Magnified)
        ctx.font = 'bold 12.5px Cinzel, serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`„${secretMessage}”`, 0, -8);

        // GPS Coordinates / Date
        ctx.font = '9px monospace';
        ctx.fillStyle = '#fde68a';
        ctx.fillText(coordinatesDate, 0, 14);

        // Laser Nanometer Specs
        ctx.font = '7.5px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.shadowBlur = 0;
        ctx.fillText('NANO-LASER RES: 0.05μm • TITANIUM 99.8% • GENUINE STARDUST', 0, 32);

        ctx.restore();

        // Floating Diamond Dust Swirling over Plaque
        const rgb = currentDust.rgb;
        particles.forEach(p => {
          p.sparklePhase += p.sparkleSpeed;
          p.x += p.vx + Math.sin(p.sparklePhase) * 0.2;
          p.y += p.vy + Math.cos(p.sparklePhase) * 0.2;

          // Boundary bounce within loupe
          if (Math.abs(p.x) > 110) p.vx = -p.vx;
          if (Math.abs(p.y) > 110) p.vy = -p.vy;

          const alpha = 0.5 + Math.sin(p.sparklePhase) * 0.45;
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx + p.x + tiltX, cy + p.y + tiltY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
          ctx.shadowColor = currentDust.dustColor;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        });

        // Optical Crosshair Reticle Lines (Loupe precision overlay)
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 138, cy);
        ctx.lineTo(cx - 30, cy);
        ctx.moveTo(cx + 30, cy);
        ctx.lineTo(cx + 138, cy);
        ctx.moveTo(cx, cy - 138);
        ctx.lineTo(cx, cy - 30);
        ctx.moveTo(cx, cy + 30);
        ctx.lineTo(cx, cy + 138);
        ctx.stroke();

        ctx.restore(); // end clip

        // Magnification watermark
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = '#f59e0b';
        ctx.textAlign = 'right';
        ctx.fillText('JEWELER\'S LOUPE 30x', cx + 130, cy + 125);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewMode, selectedMetal, selectedShape, selectedDust, secretMessage, coordinatesDate]);

  // Mouse move handler for gyro parallax
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mousePosRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      isHover: true
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current.isHover = false;
  };

  // Submit / Apply Configuration
  const handleApply = () => {
    const configData = {
      metalId: selectedMetal,
      metalName: currentMetal.name,
      shapeId: selectedShape,
      shapeName: currentShape.name,
      dustId: selectedDust,
      dustName: currentDust.name,
      chainId: selectedChain,
      chainName: currentChain.name,
      secretMessage: secretMessage.trim() || 'Ești Universul Meu Etern',
      coordinatesDate: coordinatesDate.trim() || '44°26\'N 26°06\'E • 24.10.2023',
      totalPrice: totalPrice
    };

    if (onApplyConfig) {
      onApplyConfig(configData);
    }
  };

  return (
    <div
      id="cosmic-locket-simulator-widget"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #200818 0%, #0c0209 100%)',
        borderRadius: '24px',
        border: '1.5px solid rgba(244, 63, 94, 0.45)',
        padding: isEmbedded ? '20px' : '28px',
        color: '#ffffff',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.65), 0 0 32px rgba(244, 63, 94, 0.2)',
        maxWidth: '1020px',
        margin: '0 auto',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Header Badge & Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.5)',
            padding: '5px 14px',
            borderRadius: '20px',
            fontSize: '0.76rem',
            fontWeight: 800,
            color: '#fda4af',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <CosmicLocketIcon size={14} color="#f43f5e" />
            <span>PANDANTIV SECRET • PULBERE DIAMANT COSMIC & SAFIR</span>
          </div>
          <h3 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: isEmbedded ? '1.4rem' : '1.75rem',
            color: '#fbcfe8',
            marginTop: '8px',
            marginBottom: '4px',
            fontWeight: 800
          }}>
            Medalion Hermetic cu Micro-Gravură & Praf de Stele
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0, maxWidth: '640px' }}>
            Ascuns în inima trandafirului central: o capsulă de safir cu pulbere de diamant cosmic ce plutește liber, adăpostind o plăcuță din titan gravată microscopic cu mesajul vostru secret. Include lupă de bijutier 30x în cutie.
          </p>
        </div>

        {/* Audio Toggle */}
        <button
          type="button"
          id="btn-toggle-locket-audio"
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          style={{
            background: isSoundEnabled ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: isSoundEnabled ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.2)',
            color: isSoundEnabled ? '#fda4af' : 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            padding: '8px 14px',
            cursor: 'pointer',
            fontSize: '0.78rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap !important'
          }}
          title={isSoundEnabled ? 'Dezactivează clinchetul de bijuterie' : 'Activează sunetul de bijuterie'}
        >
          {isSoundEnabled ? <Volume2 size={15} color="#fda4af" /> : <VolumeX size={15} color="rgba(255,255,255,0.5)" />}
          <span>{isSoundEnabled ? 'Sunet Safir Activ' : 'Sunet Oprit'}</span>
        </button>
      </div>

      {/* Main Grid: Canvas on Left, Controls on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isEmbedded ? '1fr' : 'minmax(320px, 460px) 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Canvas Simulator with Zoom Switch */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '20px',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Canvas Wrapper */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '460px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: `0 0 24px rgba(244, 63, 94, 0.25)`
          }}>
            <canvas
              ref={canvasRef}
              width={460}
              height={340}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                cursor: 'crosshair',
                background: '#090207'
              }}
            />

            {/* Overlaid Mode Indicator */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(6px)',
              border: '1px solid #f43f5e',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#fda4af',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {viewMode === 'macro-loupe' ? <JewelerLoupeIcon size={12} color="#f43f5e" /> : <Eye size={12} color="#f43f5e" />}
              <span>{viewMode === 'macro-loupe' ? 'LUPĂ MACRO 30x (GRAVURĂ)' : 'VEDERE ANSAMBLU (LĂNȚIȘOR)'}</span>
            </div>

            {/* Metal Badge Top-Right */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: currentMetal.textColor
            }}>
              {currentMetal.name.split('(')[0].trim()}
            </div>
          </div>

          {/* Toggle View Mode Button */}
          <div style={{ width: '100%', marginTop: '14px', display: 'flex', gap: '10px' }}>
            <button
              type="button"
              id="btn-view-macro-loupe"
              onClick={() => {
                setViewMode('macro-loupe');
                playLocketSound();
              }}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                background: viewMode === 'macro-loupe' ? 'linear-gradient(135deg, #e11d48, #9f1239)' : 'rgba(255,255,255,0.06)',
                border: viewMode === 'macro-loupe' ? 'none' : '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                boxShadow: viewMode === 'macro-loupe' ? '0 4px 14px rgba(225, 29, 72, 0.4)' : 'none',
                whiteSpace: 'nowrap !important'
              }}
            >
              <ZoomIn size={15} />
              <span>Lupă Macro 30x</span>
            </button>

            <button
              type="button"
              id="btn-view-overview"
              onClick={() => {
                setViewMode('overview');
                playLocketSound();
              }}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                background: viewMode === 'overview' ? 'linear-gradient(135deg, #e11d48, #9f1239)' : 'rgba(255,255,255,0.06)',
                border: viewMode === 'overview' ? 'none' : '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                boxShadow: viewMode === 'overview' ? '0 4px 14px rgba(225, 29, 72, 0.4)' : 'none',
                whiteSpace: 'nowrap !important'
              }}
            >
              <ZoomOut size={15} />
              <span>Vedere Pandantiv</span>
            </button>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Metal Nobil */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#fbcfe8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '10px'
            }}>
              1. Metal Nobil & Carcasă Medalion:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {LOCKET_METALS.map(m => {
                const isSelected = selectedMetal === m.id;
                return (
                  <div
                    key={m.id}
                    id={`opt-locket-metal-${m.id}`}
                    onClick={() => {
                      setSelectedMetal(m.id);
                      playLocketSound();
                    }}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? `2px solid ${m.hex}` : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: m.hex,
                          boxShadow: `0 0 8px ${m.hex}`,
                          display: 'inline-block'
                        }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                          {m.name.split('(')[0].trim()}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: m.price === 0 ? '#10b981' : '#f59e0b'
                      }}>
                        {m.price === 0 ? 'Inclus' : `+${m.price} RON`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.35 }}>
                      {m.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Geometrie Capsulă */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#fbcfe8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '10px'
            }}>
              2. Forma Geometrică a Medalionului:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {LOCKET_SHAPES.map(s => {
                const isSelected = selectedShape === s.id;
                return (
                  <div
                    key={s.id}
                    id={`opt-locket-shape-${s.id}`}
                    onClick={() => {
                      setSelectedShape(s.id);
                      playLocketSound();
                    }}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '2px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                        {s.name.split('(')[0].trim()}
                      </span>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: s.price === 0 ? '#10b981' : '#f59e0b'
                      }}>
                        {s.price === 0 ? 'Inclus' : `+${s.price} RON`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.35 }}>
                      {s.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Pulbere Diamant Cosmic */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#fbcfe8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '10px'
            }}>
              3. Nuanța Pulberii de Diamant Cosmic:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {DIAMOND_DUSTS.map(d => {
                const isSelected = selectedDust === d.id;
                return (
                  <div
                    key={d.id}
                    id={`opt-locket-dust-${d.id}`}
                    onClick={() => {
                      setSelectedDust(d.id);
                      playLocketSound();
                    }}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? `2px solid ${d.dustColor}` : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                        {d.name.split('(')[0].trim()}
                      </span>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: d.price === 0 ? '#10b981' : '#f59e0b'
                      }}>
                        {d.price === 0 ? 'Inclus' : `+${d.price} RON`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.35 }}>
                      {d.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Micro-Gravură Laser Nanometrică */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#fbcfe8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '10px'
            }}>
              4. Micro-Gravură pe Plăcuța Interioară de Titan (Lupă Inclusă):
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '4px' }}>
                  Mesaj Secret Gravat (max 40 caractere):
                </span>
                <input
                  type="text"
                  id="input-locket-secret-message"
                  value={secretMessage}
                  maxLength={40}
                  onChange={(e) => setSecretMessage(e.target.value)}
                  placeholder="ex: Ești Universul Meu Etern"
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '4px' }}>
                  Coordonate GPS sau Dată Specială:
                </span>
                <input
                  type="text"
                  id="input-locket-coordinates"
                  value={coordinatesDate}
                  maxLength={36}
                  onChange={(e) => setCoordinatesDate(e.target.value)}
                  placeholder="ex: 44°26'N 26°06'E • 24.10.2023"
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#fde68a', marginTop: '6px', fontStyle: 'italic' }}>
              • Include mini-lupă pliabilă de bijutier 30x cu ramă de alamă ambalată în husă de piele pentru citirea gravurii.
            </div>
          </div>

          {/* Pricing & Apply Action Bar */}
          <div style={{
            marginTop: '8px',
            background: 'rgba(0, 0, 0, 0.55)',
            border: '1px solid rgba(244, 63, 94, 0.35)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                TOTAL PANDANTIV SECRET CU DIAMANT COSMIC:
              </span>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fda4af', fontFamily: 'Cinzel, serif' }}>
                +{totalPrice} RON
              </div>
              <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                {currentMetal.name.split('(')[0].trim()} • {currentShape.name.split('(')[0].trim()} • Lupă 30x Inclusă
              </div>
            </div>

            <button
              type="button"
              id="btn-apply-cosmic-locket-config"
              onClick={handleApply}
              className="btn btn-primary btn-lg"
              style={{
                padding: '12px 28px',
                borderRadius: '14px',
                fontWeight: 800,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(225, 29, 72, 0.4)',
                cursor: 'pointer',
                whiteSpace: 'nowrap !important'
              }}
            >
              <Check size={18} />
              <span>Configurează Pandantivul (+{totalPrice} RON)</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
