import React, { useState, useEffect, useRef } from 'react';
import { SmokeCascadeIcon, DryIceFlaskIcon } from './CustomIcons';
import { Volume2, VolumeX, Check, RotateCcw, Flame, Play, Square, ShieldCheck, Radio, Wind } from 'lucide-react';

export const MIST_LIGHTINGS = [
  {
    id: 'white-diamond',
    name: 'Aura Albă Regală (Pure Diamond White)',
    desc: 'Vapori denși albi ca zăpada, iluminați neutru cu reflexii reci de diamant',
    price: 0,
    hex: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.85)',
    smokeRgb: [255, 255, 255]
  },
  {
    id: 'rose-gold',
    name: 'Aura Roz Pudrată (Rose Gold Ethereal Glow)',
    desc: 'Nuanță caldă roz-aurie difuzată de micro-leduri ascunse sub buza cutiei',
    price: 15,
    hex: '#f472b6',
    glowColor: 'rgba(244, 114, 182, 0.9)',
    smokeRgb: [244, 114, 182]
  },
  {
    id: 'midnight-violet',
    name: 'Aura Violet Nocturn (Mystic Midnight Violet)',
    desc: 'Lumină misterioasă violet-indigo ce intensifică reflexiile petalelor noir',
    price: 19,
    hex: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.9)',
    smokeRgb: [192, 132, 252]
  }
];

export const MIST_AROMAS = [
  {
    id: 'rose-hydrosol',
    name: 'Apă Pură de Trandafiri de Damasc (Organic Hydrosol)',
    desc: 'Aromă 100% naturală de petale proaspete culese în zori și apă termală',
    price: 0,
    badge: 'INCLUS'
  },
  {
    id: 'vanilla-amber',
    name: 'Vapori de Vanilie Bourbon & Ambră Senzuală',
    desc: 'Nor catifelat și cald cu note gurmande de vanilie de Madagascar',
    price: 19,
    badge: 'GOURMET'
  },
  {
    id: 'mint-peony',
    name: 'Esență Răcoritoare Eucalipt Alb & Bujor de Mai',
    desc: 'Vapori proaspeți și reci ce amplifică senzația tactilă de gheață pură',
    price: 15,
    badge: 'FRESH VIP'
  }
];

export const CASCADE_TRIGGERS = [
  {
    id: 'lid-switch',
    name: 'Declanșare Automată la Ridicarea Capacului (Micro-Switch)',
    desc: 'Cascada izbucnește automat și silențios în secunda în care capacul este ridicat',
    price: 0,
    badge: 'STANDARD ATELIER'
  },
  {
    id: 'gold-pin',
    name: 'Siguranță cu Pin Aurit 24K (Trage de Inel înainte de Deschidere)',
    desc: 'Experiență ceremonioasă VIP: se scoate cuiul aurit din bază, apoi se deschide capacul',
    price: 15,
    badge: 'CEREMONIAL 24K'
  },
  {
    id: 'wireless-remote',
    name: 'Telecomandă Wireless de Buzunar (Pentru Momentul Surpriză)',
    desc: 'Declanșează discret cascada din buzunar înainte ca destinatarul să se apropie de cutie',
    price: 35,
    badge: 'WOW SURPRIZĂ'
  }
];

export const EMISSION_DURATIONS = [
  {
    id: 'standard-45',
    name: 'Durată Standard Atelier (45 secunde cascadă continuă)',
    desc: 'Timp ideal pentru reacție emoționantă spontană și fotografii rapide',
    price: 0
  },
  {
    id: 'cinema-90',
    name: 'Ediție Prelungită Cinema & Reels (90 secunde flux dens)',
    desc: 'Capsulă dublă criogenică pentru filmări video 4K / Instagram Reels profesionale',
    price: 20
  }
];

export default function SmokeCascadeSimulator({ 
  onApplyConfig, 
  initialData = null, 
  isEmbedded = false 
}) {
  const [selectedLighting, setSelectedLighting] = useState(
    initialData?.lightingId || 'white-diamond'
  );
  const [selectedAroma, setSelectedAroma] = useState(
    initialData?.aromaId || 'rose-hydrosol'
  );
  const [selectedTrigger, setSelectedTrigger] = useState(
    initialData?.triggerId || 'lid-switch'
  );
  const [selectedDuration, setSelectedDuration] = useState(
    initialData?.durationId || 'standard-45'
  );

  const [isLidOpen, setIsLidOpen] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isWindActive, setIsWindActive] = useState(false);
  const [interactiveNotice, setInteractiveNotice] = useState('Mișcă cursorul peste vapori pentru adiere de vânt!');

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const noiseSourceRef = useRef(null);
  const gainNodeRef = useRef(null);
  const mousePosRef = useRef({ x: -999, y: -999, isHover: false });

  // Calculate pricing
  const currentLighting = MIST_LIGHTINGS.find(l => l.id === selectedLighting) || MIST_LIGHTINGS[0];
  const currentAroma = MIST_AROMAS.find(a => a.id === selectedAroma) || MIST_AROMAS[0];
  const currentTrigger = CASCADE_TRIGGERS.find(t => t.id === selectedTrigger) || CASCADE_TRIGGERS[0];
  const currentDuration = EMISSION_DURATIONS.find(d => d.id === selectedDuration) || EMISSION_DURATIONS[0];

  const basePrice = 59;
  const totalPrice = basePrice + currentLighting.price + currentAroma.price + currentTrigger.price + currentDuration.price;

  // Synthesize realistic cold steam release hiss + crystal chime
  const playSteamHiss = (start = true) => {
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

      if (!start) {
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
        }
        return;
      }

      // 1. Initial pleasant activation chime
      const osc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);
      chimeGain.gain.setValueAtTime(0.12, ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.55);

      // 2. Filtered pinkish/white noise for gentle cold vapor hiss
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.06;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(750, ctx.currentTime + 2.0);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.25);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      noiseSourceRef.current = whiteNoise;
      gainNodeRef.current = gain;
    } catch (e) {
      // Audio autoplay gracefully handled
    }
  };

  const stopSteamHiss = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      } catch (e) {}
    }
  };

  // Toggle Box Lid
  const handleToggleLid = () => {
    const nextState = !isLidOpen;
    setIsLidOpen(nextState);
    if (nextState) {
      playSteamHiss(true);
      setInteractiveNotice('Vaporii reci se revarsă în cascadă! Interacționează cu mouse-ul.');
    } else {
      stopSteamHiss();
      setInteractiveNotice('Capacul este închis. Deschide-l pentru a revedea cascada!');
    }
  };

  // Particle canvas simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const particles = [];
    const maxParticles = 140;

    // Diamond glitter particles
    const glitters = [];
    for (let i = 0; i < 24; i++) {
      glitters.push({
        x: 100 + Math.random() * 260,
        y: 110 + Math.random() * 80,
        size: 1 + Math.random() * 2,
        alpha: Math.random(),
        speed: 0.02 + Math.random() * 0.03
      });
    }

    const rgb = currentLighting.smokeRgb;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw luxury velvet table backdrop
      const gradBg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradBg.addColorStop(0, '#150610');
      gradBg.addColorStop(0.6, '#0c0309');
      gradBg.addColorStop(1, '#050104');
      ctx.fillStyle = gradBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Table reflection plane
      const tableGrad = ctx.createLinearGradient(0, 240, 0, canvas.height);
      tableGrad.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      tableGrad.addColorStop(0.5, 'rgba(225, 29, 72, 0.06)');
      tableGrad.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = tableGrad;
      ctx.fillRect(0, 240, canvas.width, canvas.height - 240);

      // 2. Draw Flower Box Base
      // Shadow under box
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(230, 275, 110, 25, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.filter = 'blur(8px)';
      ctx.fill();
      ctx.restore();

      // Box body (Velvet Black & Gold Trim)
      const boxGrad = ctx.createLinearGradient(140, 160, 320, 260);
      boxGrad.addColorStop(0, '#240a17');
      boxGrad.addColorStop(0.5, '#12040c');
      boxGrad.addColorStop(1, '#070104');
      ctx.fillStyle = boxGrad;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 1.5;

      // Rounded trapezoid box body
      ctx.beginPath();
      ctx.moveTo(140, 160);
      ctx.lineTo(320, 160);
      ctx.lineTo(305, 265);
      ctx.lineTo(155, 265);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Gold atelier emblem on box
      ctx.save();
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 9px Cinzel, serif';
      ctx.textAlign = 'center';
      ctx.fillText('STARDUST FLORALS', 230, 220);
      ctx.font = '7px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillText('CRYO-CASCADE VIP', 230, 232);
      ctx.restore();

      // Interior flowers (Roses) peeking out
      const roseColors = ['#e11d48', '#be123c', '#9f1239', '#fb7185', '#be123c'];
      for (let r = 0; r < 7; r++) {
        const rx = 165 + r * 19;
        const ry = 145 + Math.sin(r * 1.5) * 8;
        ctx.save();
        ctx.beginPath();
        ctx.arc(rx, ry, 12, 0, Math.PI * 2);
        ctx.fillStyle = roseColors[r % roseColors.length];
        ctx.fill();

        // Diamond glitter center
        ctx.beginPath();
        ctx.arc(rx - 2, ry - 2, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();
        ctx.restore();
      }

      // Glitters in flower arrangement
      glitters.forEach(g => {
        g.alpha += g.speed;
        if (g.alpha > 1 || g.alpha < 0) g.speed = -g.speed;
        ctx.save();
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(g.alpha)})`;
        ctx.shadowColor = currentLighting.hex;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      // 3. Box Lid State
      if (!isLidOpen) {
        // Closed lid covering the top
        ctx.save();
        const lidGrad = ctx.createLinearGradient(130, 130, 330, 165);
        lidGrad.addColorStop(0, '#2e0d1e');
        lidGrad.addColorStop(0.5, '#17050f');
        lidGrad.addColorStop(1, '#090206');
        ctx.fillStyle = lidGrad;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(132, 135, 196, 32, [8, 8, 2, 2]);
        ctx.fill();
        ctx.stroke();

        // Gold ribbon bow on top
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(230, 135, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        // Lid lifted and tilted upward in background
        ctx.save();
        ctx.translate(230, 100);
        ctx.rotate(-0.25);
        const lidOpenGrad = ctx.createLinearGradient(-95, -15, 95, 15);
        lidOpenGrad.addColorStop(0, '#2a0c1c');
        lidOpenGrad.addColorStop(1, '#0d0208');
        ctx.fillStyle = lidOpenGrad;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-95, -15, 190, 24, 6);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // 4. Generate cascading cold vapor particles if lid is open
        if (particles.length < maxParticles) {
          for (let p = 0; p < 2; p++) {
            particles.push({
              x: 170 + Math.random() * 120,
              y: 155 + Math.random() * 10,
              vx: (Math.random() - 0.5) * 1.8,
              vy: 0.6 + Math.random() * 1.2, // Gravity: cold dense dry ice falls downwards
              radius: 12 + Math.random() * 14,
              maxRadius: 36 + Math.random() * 32,
              alpha: 0.05,
              maxAlpha: 0.45 + Math.random() * 0.35,
              life: 0,
              maxLife: 95 + Math.random() * 45
            });
          }
        }
      }

      // 5. Update and render smoke particles
      const mouse = mousePosRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Size expansion
        if (p.radius < p.maxRadius) {
          p.radius += 0.35;
        }

        // Fade in and out
        if (p.life < 20) {
          p.alpha = (p.life / 20) * p.maxAlpha;
        } else if (p.life > p.maxLife - 30) {
          p.alpha = ((p.maxLife - p.life) / 30) * p.maxAlpha;
        }

        // Movement with slight curl turbulence
        p.x += p.vx + Math.sin(p.life * 0.08) * 0.4;
        p.y += p.vy;

        // Cascade overflow: when particles reach rim, cascade down sides
        if (p.y > 170 && p.y < 260) {
          if (p.x < 230) p.vx -= 0.04; // flow to left edge
          if (p.x >= 230) p.vx += 0.04; // flow to right edge
        }

        // Floor pooling: slow down Y when reaching bottom table
        if (p.y > 270) {
          p.vy *= 0.85;
          p.vx *= 1.05; // expand horizontally over table surface
        }

        // Interactive wind effect from mouse cursor
        if (mouse.isHover) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 75 && dist > 0) {
            const force = (75 - dist) / 75;
            p.x += (dx / dist) * force * 5.5;
            p.y += (dy / dist) * force * 3.5;
          }
        }

        // Render particle with soft radial gradient
        ctx.save();
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(1, p.radius));
        radGrad.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.alpha * 0.95})`);
        radGrad.addColorStop(0.4, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.alpha * 0.6})`);
        radGrad.addColorStop(0.8, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.alpha * 0.2})`);
        radGrad.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Remove dead particles
        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLidOpen, currentLighting]);

  // Mouse move handlers for particle wind interaction
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

  const handleTouchMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mousePosRef.current = {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY,
      isHover: true
    };
  };

  // Submit / Apply Configuration
  const handleApply = () => {
    const configData = {
      lightingId: selectedLighting,
      lightingName: currentLighting.name,
      lightingHex: currentLighting.hex,
      aromaId: selectedAroma,
      aromaName: currentAroma.name,
      triggerId: selectedTrigger,
      triggerName: currentTrigger.name,
      durationId: selectedDuration,
      durationName: currentDuration.name,
      totalPrice: totalPrice
    };

    if (onApplyConfig) {
      onApplyConfig(configData);
    }
  };

  return (
    <div 
      id="smoke-cascade-simulator-widget"
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
            <SmokeCascadeIcon size={14} color="#f43f5e" />
            <span>EFECT TEATRAL VAPORI RECI • DRY ICE CASCADE VIP</span>
          </div>
          <h3 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: isEmbedded ? '1.4rem' : '1.75rem',
            color: '#fbcfe8',
            marginTop: '8px',
            marginBottom: '4px',
            fontWeight: 800
          }}>
            Cascadă Cinematică de Vapori & Apă de Trandafiri
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0, maxWidth: '640px' }}>
            La deschiderea cutiei de catifea, o cascadă delicată de vapori reci aromatizați cu apă de trandafiri se revarsă lin peste masă. Efectul perfect pentru un moment memorabil și video-uri virale pe rețelele sociale.
          </p>
        </div>

        {/* Audio Toggle */}
        <button
          type="button"
          id="btn-toggle-smoke-audio"
          onClick={() => {
            setIsSoundEnabled(!isSoundEnabled);
            if (isSoundEnabled) stopSteamHiss();
          }}
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
          title={isSoundEnabled ? 'Dezactivează fâșâitul de abur rece' : 'Activează sunetul de vapori'}
        >
          {isSoundEnabled ? <Volume2 size={15} color="#fda4af" /> : <VolumeX size={15} color="rgba(255,255,255,0.5)" />}
          <span>{isSoundEnabled ? 'Sunet Vapori Activ' : 'Sunet Oprit'}</span>
        </button>
      </div>

      {/* Main Grid: Interactive Canvas on Left, Options on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isEmbedded ? '1fr' : 'minmax(320px, 460px) 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Canvas Simulator */}
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
            boxShadow: `0 0 24px ${currentLighting.glowColor}`
          }}>
            <canvas
              ref={canvasRef}
              width={460}
              height={340}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                cursor: 'crosshair',
                background: '#090207'
              }}
            />

            {/* Overlaid status badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(6px)',
              border: `1px solid ${currentLighting.hex}`,
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: currentLighting.hex,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: isLidOpen ? '#10b981' : '#ef4444',
                boxShadow: isLidOpen ? '0 0 6px #10b981' : 'none'
              }} />
              <span>{isLidOpen ? 'CASCADĂ ACTIVĂ' : 'CAPAC ÎNCHIS'}</span>
            </div>

            {/* Aroma Badge Top-Right */}
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
              color: '#fbcfe8'
            }}>
              {currentAroma.name.split('(')[0].trim()}
            </div>
          </div>

          {/* Interactive Hint */}
          <div style={{
            fontSize: '0.76rem',
            color: 'rgba(255, 255, 255, 0.65)',
            marginTop: '10px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Wind size={13} color="#fda4af" />
            <span>{interactiveNotice}</span>
          </div>

          {/* Toggle Lid CTA Button */}
          <div style={{ width: '100%', marginTop: '14px' }}>
            <button
              type="button"
              id="btn-toggle-smoke-lid"
              onClick={handleToggleLid}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px 18px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                background: isLidOpen 
                  ? 'linear-gradient(135deg, #4c0519 0%, #1c0309 100%)' 
                  : 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
                border: isLidOpen ? '1px solid #f43f5e' : 'none',
                color: '#ffffff',
                boxShadow: '0 8px 20px rgba(225, 29, 72, 0.35)',
                whiteSpace: 'nowrap !important'
              }}
            >
              {isLidOpen ? (
                <>
                  <Square size={16} />
                  <span>Închide Capacul Cutiei</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Ridică Capacul & Declanșează Cascada</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Nuanță Iluminare Vapori */}
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
              1. Aura & Iluminarea Vaporilor de Gheață:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {MIST_LIGHTINGS.map(l => {
                const isSelected = selectedLighting === l.id;
                return (
                  <div
                    key={l.id}
                    id={`opt-smoke-lighting-${l.id}`}
                    onClick={() => setSelectedLighting(l.id)}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? `2px solid ${l.hex}` : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? `0 0 14px ${l.glowColor}` : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: l.hex,
                          boxShadow: `0 0 8px ${l.hex}`,
                          display: 'inline-block'
                        }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                          {l.name.split('(')[0].trim()}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: l.price === 0 ? '#10b981' : '#f59e0b'
                      }}>
                        {l.price === 0 ? 'Inclus' : `+${l.price} RON`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.35 }}>
                      {l.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Aroma Vaporilor Termali */}
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
              2. Parfumul Eteric Difuzat în Vapori:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {MIST_AROMAS.map(a => {
                const isSelected = selectedAroma === a.id;
                return (
                  <div
                    key={a.id}
                    id={`opt-smoke-aroma-${a.id}`}
                    onClick={() => setSelectedAroma(a.id)}
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
                        {a.name.split('(')[0].trim()}
                      </span>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: a.price === 0 ? '#10b981' : '#f59e0b'
                      }}>
                        {a.price === 0 ? 'Inclus' : `+${a.price} RON`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.35 }}>
                      {a.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Declanșator Mecanic / Siguranță */}
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
              3. Mod de Declanșare al Cascadei:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {CASCADE_TRIGGERS.map(t => {
                const isSelected = selectedTrigger === t.id;
                return (
                  <div
                    key={t.id}
                    id={`opt-smoke-trigger-${t.id}`}
                    onClick={() => setSelectedTrigger(t.id)}
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
                        {t.name.split('(')[0].trim()}
                      </span>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: t.price === 0 ? '#10b981' : '#f59e0b'
                      }}>
                        {t.price === 0 ? 'Inclus' : `+${t.price} RON`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.35 }}>
                      {t.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Durată Cascadă */}
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
              4. Durată & Rezervă Criogenică:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {EMISSION_DURATIONS.map(d => {
                const isSelected = selectedDuration === d.id;
                return (
                  <div
                    key={d.id}
                    id={`opt-smoke-duration-${d.id}`}
                    onClick={() => setSelectedDuration(d.id)}
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
                TOTAL EFECT VAPORI RECI CASADE:
              </span>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fda4af', fontFamily: 'Cinzel, serif' }}>
                +{totalPrice} RON
              </div>
              <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                {currentLighting.name.split('(')[0].trim()} • {currentAroma.name.split('(')[0].trim()}
              </div>
            </div>

            <button
              type="button"
              id="btn-apply-smoke-cascade-config"
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
              <span>Configurează Efectul (+{totalPrice} RON)</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
