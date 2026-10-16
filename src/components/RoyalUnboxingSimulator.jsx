import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Check, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  Heart,
  Eye,
  Gift,
  Feather,
  Clock,
  Thermometer,
  Lock,
  Unlock
} from 'lucide-react';
import { 
  UnboxingVaultIcon, 
  WaxSealStampIcon, 
  SatinRibbonBowIcon, 
  RoseIcon, 
  DiamondIcon,
  CrownIcon
} from './CustomIcons';

// Packaging Theme Presets
export const PACKAGING_THEMES = [
  {
    id: 'noir_gold',
    name: 'Noir Onyx & Aur 24K',
    subtitle: 'Cutie mată neagră, mătase noir și sigiliu ceară aurie',
    boxBg: '#121214',
    boxBorder: '#d97706',
    ribbonColor: '#d97706',
    waxColor: '#b45309',
    waxText: '#fef3c7',
    silkBg: '#1c1917',
    silkTexture: '#292524',
    price: 35
  },
  {
    id: 'bordeaux_crimson',
    name: 'Bordeaux Imperial & Ceară Rubinie',
    subtitle: 'Cutie catifea rubinie, mătase vișinie și sigiliu roșu regal',
    boxBg: '#4c0519',
    boxBorder: '#e11d48',
    ribbonColor: '#e11d48',
    waxColor: '#9f1239',
    waxText: '#ffe4e6',
    silkBg: '#2a0812',
    silkTexture: '#3f0c1b',
    price: 39
  },
  {
    id: 'ivory_rose_gold',
    name: 'Fildeș Nobil & Rose Gold',
    subtitle: 'Cutie perlată fildeș, mătase sidefată și sigiliu aur roz',
    boxBg: '#272225',
    boxBorder: '#fb7185',
    ribbonColor: '#f43f5e',
    waxColor: '#e11d48',
    waxText: '#fff1f2',
    silkBg: '#231e21',
    silkTexture: '#352c32',
    price: 45
  }
];

// Bouquet Models for the Grand Reveal
export const UNBOXING_BOUQUETS = [
  {
    id: 'noir_rouge',
    name: 'Signature Dual Noir & Rouge',
    subtitle: 'Trandafiri negri de catifea cu miez rubiniu radiant',
    petalsColor: '#be123c',
    outerColor: '#18181b',
    sparkleColor: '#fde047',
    sparkleType: 'Diamant Galactic'
  },
  {
    id: 'ruby_glamour',
    name: 'Regal Ruby Glamour (19 Trandafiri)',
    subtitle: 'Roșu pasional imperial pudrat cu pulbere de aur 24K',
    petalsColor: '#e11d48',
    outerColor: '#9f1239',
    sparkleColor: '#f59e0b',
    sparkleType: 'Pulbere Aur 24K'
  },
  {
    id: 'midnight_blue',
    name: 'Midnight Sapphire & Diamant',
    subtitle: 'Cobalt profund catifelat cu micro-particule de platină',
    petalsColor: '#1d4ed8',
    outerColor: '#0f172a',
    sparkleColor: '#93c5fd',
    sparkleType: 'Platină Stardust'
  },
  {
    id: 'rose_pearl',
    name: 'Roz Șampanie & Perlă Fină',
    subtitle: 'Petale pastelate sidefate cu scânteieri delicate',
    petalsColor: '#f472b6',
    outerColor: '#831843',
    sparkleColor: '#fbcfe8',
    sparkleType: 'Perlă Shimmer'
  }
];

// Fragrance Mists
export const SCENT_MISTS = [
  { id: 'damask_rose', name: 'Trandafir Pur de Damasc', notes: 'Esență nobilă florală proaspătă' },
  { id: 'oud_vanilla', name: 'Oud Imperial & Vanilie Neagră', notes: 'Aromă profundă, hipnotică de seară' },
  { id: 'rose_champagne', name: 'Șampanie Roz & Cireș Japonez', notes: 'Efervescență luminoasă și romantică' }
];

export const RIBBON_PRESETS = [
  'Te iubesc dincolo de cuvinte',
  'La mulți ani, regina mea!',
  'Pentru sufletul meu pereche',
  'Pentru totdeauna noi doi'
];

export default function RoyalUnboxingSimulator({
  isEmbedded = false,
  onApplyConfig = null,
  initialConfig = null,
  onClose = null
}) {
  // Current unboxing stage: 0 (courier_box) -> 1 (wax_seal) -> 2 (satin_ribbon) -> 3 (grand_reveal)
  const [currentStage, setCurrentStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Configuration options
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (initialConfig?.themeId) {
      const match = PACKAGING_THEMES.find(t => t.id === initialConfig.themeId);
      if (match) return match;
    }
    return PACKAGING_THEMES[0];
  });

  const [selectedBouquet, setSelectedBouquet] = useState(() => {
    if (initialConfig?.bouquetId) {
      const match = UNBOXING_BOUQUETS.find(b => b.id === initialConfig.bouquetId);
      if (match) return match;
    }
    return UNBOXING_BOUQUETS[0];
  });

  const [ribbonMessage, setRibbonMessage] = useState(initialConfig?.ribbonText || 'Pentru Sufletul Meu Pereche');
  const [selectedScent, setSelectedScent] = useState(() => {
    if (initialConfig?.scentId) {
      const match = SCENT_MISTS.find(s => s.id === initialConfig.scentId);
      if (match) return match;
    }
    return SCENT_MISTS[0];
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasTornStrip, setHasTornStrip] = useState(false);
  const [hasCrackedWax, setHasCrackedWax] = useState(false);
  const [hasUntiedRibbon, setHasUntiedRibbon] = useState(false);
  const [lidLiftProgress, setLidLiftProgress] = useState(0);

  // Web Audio Context
  const audioCtxRef = useRef(null);

  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Sound 1: Cardboard Security Tear-Strip Sound
  const playCardboardTearSound = () => {
    if (!soundEnabled) return;
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.25));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(750, ctx.currentTime + 0.4);
      filter.Q.value = 2.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio error ignored
    }
  };

  // Sound 2: Wax Seal Snap & Silk Tissue Rustle
  const playWaxCrackSound = () => {
    if (!soundEnabled) return;
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      // 1. Crisp wax crack click
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.08);

      oscGain.gain.setValueAtTime(0.4, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);

      // 2. Silk paper rustle
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.2));
      }

      const rustle = ctx.createBufferSource();
      rustle.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.35);
      filter.Q.value = 3.2;

      const rustleGain = ctx.createGain();
      rustleGain.gain.setValueAtTime(0.25, ctx.currentTime + 0.02);
      rustleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      rustle.connect(filter);
      filter.connect(rustleGain);
      rustleGain.connect(ctx.destination);

      rustle.start(ctx.currentTime + 0.02);
    } catch {
      // Audio error ignored
    }
  };

  // Sound 3: Satin Ribbon Untie Gliding Swoosh
  const playSatinGlideSound = () => {
    if (!soundEnabled) return;
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio error ignored
    }
  };

  // Sound 4: Grand Reveal Diamond Harmonic Harp Chimes
  const playGrandRevealChime = () => {
    if (!soundEnabled) return;
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

        const startTime = ctx.currentTime + index * 0.08;
        const duration = 1.2;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0005, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {
      // Audio error ignored
    }
  };

  // Step 1 Trigger: Tear the Courier Outer Box Strip
  const handleTearStrip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTornStrip(true);
    playCardboardTearSound();

    setTimeout(() => {
      setCurrentStage(1);
      setIsAnimating(false);
    }, 700);
  };

  // Step 2 Trigger: Break the Hot Wax Seal
  const handleBreakWax = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasCrackedWax(true);
    playWaxCrackSound();

    setTimeout(() => {
      setCurrentStage(2);
      setIsAnimating(false);
    }, 650);
  };

  // Step 3 Trigger: Untie the Embroidered Satin Ribbon
  const handleUntieRibbon = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasUntiedRibbon(true);
    playSatinGlideSound();

    setTimeout(() => {
      setCurrentStage(3);
      setLidLiftProgress(1);
      playGrandRevealChime();
      setIsAnimating(false);
    }, 750);
  };

  // Replay Unboxing Experience
  const handleReplay = () => {
    setIsAnimating(false);
    setHasTornStrip(false);
    setHasCrackedWax(false);
    setHasUntiedRibbon(false);
    setLidLiftProgress(0);
    setCurrentStage(0);
  };

  // Jump directly to a stage
  const handleJumpStage = (stage) => {
    if (isAnimating) return;
    if (stage === 0) {
      handleReplay();
    } else if (stage === 1) {
      setHasTornStrip(true);
      setHasCrackedWax(false);
      setHasUntiedRibbon(false);
      setLidLiftProgress(0);
      setCurrentStage(1);
    } else if (stage === 2) {
      setHasTornStrip(true);
      setHasCrackedWax(true);
      setHasUntiedRibbon(false);
      setLidLiftProgress(0);
      setCurrentStage(2);
    } else if (stage === 3) {
      setHasTornStrip(true);
      setHasCrackedWax(true);
      setHasUntiedRibbon(true);
      setLidLiftProgress(1);
      setCurrentStage(3);
      playGrandRevealChime();
    }
  };

  const handleApply = () => {
    const config = {
      themeId: selectedTheme.id,
      themeName: selectedTheme.name,
      bouquetId: selectedBouquet.id,
      bouquetName: selectedBouquet.name,
      ribbonText: ribbonMessage,
      scentId: selectedScent.id,
      scentName: selectedScent.name,
      totalPrice: selectedTheme.price
    };
    if (onApplyConfig) {
      onApplyConfig(config);
    }
    if (onClose) {
      onClose();
    }
  };

  const STAGE_STEPS = [
    { id: 0, title: 'Seif de Transport', sub: 'Cutie termo-protejată 18°C', icon: ShieldCheck },
    { id: 1, title: 'Hârtie de Mătase', sub: 'Sigiliu ceară aurită SF', icon: WaxSealStampIcon },
    { id: 2, title: 'Panglică Satinată', sub: 'Caligrafie brodată nobilă', icon: SatinRibbonBowIcon },
    { id: 3, title: 'Dezvăluirea Regală', sub: 'Trandafiri diamant scânteietori', icon: RoseIcon }
  ];

  return (
    <div 
      className="royal-unboxing-container"
      style={{
        background: 'linear-gradient(145deg, #0e0712 0%, #15091a 50%, #0a030d 100%)',
        borderRadius: isEmbedded ? '20px' : '0',
        padding: isEmbedded ? '28px 24px' : '24px 20px',
        color: '#ffffff',
        boxShadow: isEmbedded ? '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(225, 29, 72, 0.25)' : 'none',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'visible'
      }}
    >
      {/* Background Ambience Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-30px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 2, paddingRight: isEmbedded ? '0' : '52px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.4)', marginBottom: '8px' }}>
            <UnboxingVaultIcon size={14} color="#f43f5e" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', color: '#fbcfe8', textTransform: 'uppercase' }}>
              Simulator 3D de Despachetare
            </span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 4px', color: '#ffffff', letterSpacing: '-0.3px', lineHeight: 1.25 }}>
            Royal Unboxing Experience™
          </h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', maxWidth: '580px', lineHeight: 1.4 }}>
            Explorează virtual fiecare dintre cele 4 straturi aristocratice de protecție și emoție la primirea cadoului.
          </p>
        </div>

        {/* Audio Toggle & Replay */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            id="btn-toggle-unboxing-sound"
            onClick={() => setSoundEnabled(prev => !prev)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '8px 12px',
              color: soundEnabled ? '#fbcfe8' : '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              whiteSpace: 'nowrap !important'
            }}
            title={soundEnabled ? 'Sunet activat' : 'Sunet dezactivat'}
          >
            {soundEnabled ? <Volume2 size={15} color="#e11d48" /> : <VolumeX size={15} color="#64748b" />}
            <span style={{ display: 'none' }}>Sunet</span>
          </button>

          <button
            type="button"
            id="btn-unboxing-replay"
            onClick={handleReplay}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '8px 12px',
              color: '#fbcfe8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              whiteSpace: 'nowrap !important'
            }}
            title="Reia de la primul strat"
          >
            <RotateCcw size={14} color="#f43f5e" />
            <span>Reia</span>
          </button>
        </div>
      </div>

      {/* Interactive Step Navigator */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '8px', 
          marginBottom: '22px', 
          position: 'relative', 
          zIndex: 2 
        }}
      >
        {STAGE_STEPS.map((step) => {
          const isActive = currentStage === step.id;
          const isPassed = currentStage > step.id;
          const StepIcon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              id={`btn-unboxing-step-${step.id}`}
              onClick={() => handleJumpStage(step.id)}
              style={{
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.25), rgba(159, 18, 57, 0.35))'
                  : isPassed
                  ? 'rgba(16, 185, 129, 0.12)'
                  : 'rgba(255, 255, 255, 0.04)',
                border: isActive
                  ? '1.5px solid #e11d48'
                  : isPassed
                  ? '1px solid rgba(16, 185, 129, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '10px 8px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 800, 
                  color: isActive ? '#f43f5e' : isPassed ? '#10b981' : '#64748b' 
                }}>
                  STRAT 0{step.id + 1}
                </span>
                {isPassed ? (
                  <Check size={13} color="#10b981" />
                ) : (
                  <StepIcon size={14} color={isActive ? '#f43f5e' : '#94a3b8'} />
                )}
              </div>
              <div style={{ 
                fontSize: '0.78rem', 
                fontWeight: 700, 
                color: isActive ? '#ffffff' : isPassed ? '#e2e8f0' : '#94a3b8',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {step.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Stage Arena */}
      <div 
        style={{
          background: 'linear-gradient(180deg, #180d22 0%, #0d0614 100%)',
          borderRadius: '16px',
          border: '1.5px solid rgba(225, 29, 72, 0.25)',
          padding: '24px 20px',
          marginBottom: '22px',
          position: 'relative',
          minHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        {/* STAGE 0: Outer Courier Vault */}
        {currentStage === 0 && (
          <div style={{ width: '100%', maxWidth: '420px', animation: 'fadeIn 0.4s ease' }}>
            {/* 3D Outer Shipping Box Illustration */}
            <div 
              style={{
                width: '260px',
                height: '175px',
                margin: '0 auto 20px',
                background: 'linear-gradient(145deg, #1e1b18 0%, #110e0c 100%)',
                border: '2px solid #78350f',
                borderRadius: '12px',
                boxShadow: '0 18px 36px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '14px',
                transform: hasTornStrip ? 'scale(0.96) rotateX(15deg)' : 'scale(1)',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Courier Vault Thermal Security Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(217, 119, 6, 0.2)', padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(217, 119, 6, 0.4)' }}>
                  <Thermometer size={12} color="#f59e0b" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#fef3c7' }}>18°C CLIMATE CONTROL</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(225, 29, 72, 0.2)', padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(225, 29, 72, 0.4)' }}>
                  <ShieldCheck size={12} color="#f43f5e" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#ffe4e6' }}>FRAGILE LUXURY</span>
                </div>
              </div>

              {/* Stardust Heraldic Brand Stamp on Carton */}
              <div style={{ margin: 'auto', textAlign: 'center' }}>
                <CrownIcon size={24} color="#d97706" />
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#fde68a', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>
                  STARDUST COURIER VAULT
                </div>
                <div style={{ fontSize: '0.65rem', color: '#a8a29e', letterSpacing: '0.5px' }}>
                  LIVRARE ÎNREGISTRATĂ VIP • DOAR DESTINATAR
                </div>
              </div>

              {/* Golden Tear Strip (Interactive Tamper-Evident Tape) */}
              <div 
                style={{
                  height: '22px',
                  background: hasTornStrip 
                    ? 'repeating-linear-gradient(45deg, #1c1917, #1c1917 8px, #292524 8px, #292524 16px)'
                    : 'linear-gradient(90deg, #b45309, #f59e0b, #d97706)',
                  borderRadius: '6px',
                  border: '1px dashed #fef3c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: hasTornStrip ? '#78716c' : '#451a03', letterSpacing: '1px' }}>
                  {hasTornStrip ? 'SIGILIU RUPT' : 'BANDĂ SIGILATĂ AURIE — TRAGE PENTRU DESCHIDERE'}
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              Stratul 1: Cutia Exterioară Termo-Izolantă Mată
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0 0 16px', lineHeight: 1.4 }}>
              Pachetul sosește discret și securizat la 18°C constant. Fără sigle vizibile de florărie pe exterior dacă se dorește surpriză absolută.
            </p>

            <button
              type="button"
              id="btn-unboxing-tear-strip"
              onClick={handleTearStrip}
              disabled={isAnimating}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                color: '#451a03',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(217, 119, 6, 0.4)',
                whiteSpace: 'nowrap !important',
                transition: 'transform 0.2s ease'
              }}
            >
              <Unlock size={16} color="#451a03" />
              <span>Desigilează Cutia de Transport</span>
              <ChevronRight size={16} color="#451a03" />
            </button>
          </div>
        )}

        {/* STAGE 1: Imperial Silk Tissue Cloak & Hot Wax Seal */}
        {currentStage === 1 && (
          <div style={{ width: '100%', maxWidth: '420px', animation: 'fadeIn 0.4s ease' }}>
            {/* Folded Silk Paper Cloak with Wax Seal */}
            <div 
              style={{
                width: '260px',
                height: '180px',
                margin: '0 auto 20px',
                background: selectedTheme.silkBg,
                border: `2px solid ${selectedTheme.boxBorder}`,
                borderRadius: '12px',
                boxShadow: '0 18px 36px rgba(0,0,0,0.7)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Crossed silk tissue folds */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  background: selectedTheme.silkTexture,
                  transform: hasCrackedWax ? 'translateX(-30px)' : 'none',
                  transition: 'all 0.5s ease',
                  borderRight: '1px solid rgba(255,255,255,0.06)'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '50%',
                  height: '100%',
                  background: selectedTheme.silkTexture,
                  transform: hasCrackedWax ? 'translateX(30px)' : 'none',
                  transition: 'all 0.5s ease',
                  borderLeft: '1px solid rgba(255,255,255,0.06)'
                }}
              />

              {/* Heraldic Wax Seal Medallion */}
              <div 
                style={{
                  position: 'relative',
                  zIndex: 3,
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${selectedTheme.waxColor} 0%, #3f0c1b 100%)`,
                  border: `2.5px solid ${selectedTheme.boxBorder}`,
                  boxShadow: '0 6px 18px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transform: hasCrackedWax ? 'scale(1.2) rotate(15deg) opacity(0)' : 'scale(1)',
                  transition: 'all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onClick={handleBreakWax}
                title="Apasă pentru a rupe sigiliul de ceară"
              >
                <CrownIcon size={18} color={selectedTheme.waxText} />
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: selectedTheme.waxText, letterSpacing: '1px' }}>
                  SF
                </span>
                <span style={{ position: 'absolute', bottom: '-8px', fontSize: '0.52rem', color: selectedTheme.waxText, background: '#1c1917', padding: '1px 4px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  CEARĂ
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              Stratul 2: Hârtia de Mătase Parfumată & Sigiliul Regal
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0 0 16px', lineHeight: 1.4 }}>
              Hârtie de mătase fină împăturită manual, parfumată cu esență de {selectedScent.name} și pecetluită cu ceară caldă turnată artizanal.
            </p>

            <button
              type="button"
              id="btn-unboxing-break-seal"
              onClick={handleBreakWax}
              disabled={isAnimating}
              style={{
                background: 'linear-gradient(135deg, #e11d48, #9f1239)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(225, 29, 72, 0.4)',
                whiteSpace: 'nowrap !important',
                transition: 'transform 0.2s ease'
              }}
            >
              <WaxSealStampIcon size={16} color="#ffffff" />
              <span>Rupe Sigiliul de Ceară</span>
              <ChevronRight size={16} color="#ffffff" />
            </button>
          </div>
        )}

        {/* STAGE 2: Hand-Tied Embroidered Satin Ribbon */}
        {currentStage === 2 && (
          <div style={{ width: '100%', maxWidth: '420px', animation: 'fadeIn 0.4s ease' }}>
            {/* Velvet Round Hatbox tied with ribbon */}
            <div 
              style={{
                width: '240px',
                height: '185px',
                margin: '0 auto 20px',
                background: selectedTheme.boxBg,
                border: `2px solid ${selectedTheme.boxBorder}`,
                borderRadius: '50% 50% 16px 16px / 28px 28px 16px 16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                overflow: 'hidden'
              }}
            >
              {/* Box Lid Upper Lip */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '38px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.08), transparent)',
                  borderBottom: `1.5px solid ${selectedTheme.boxBorder}`,
                  borderRadius: '50% 50% 0 0 / 28px 28px 0 0'
                }}
              />

              {/* Vertical Satin Ribbon */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '32px',
                  background: `linear-gradient(90deg, ${selectedTheme.ribbonColor}, #fb7185, ${selectedTheme.ribbonColor})`,
                  boxShadow: '0 0 10px rgba(225, 29, 72, 0.4)',
                  transform: hasUntiedRibbon ? 'scaleY(0) opacity(0)' : 'scaleY(1)',
                  transition: 'all 0.5s ease'
                }}
              />

              {/* Satin Ribbon Bow with Diamond Center Knot */}
              <div 
                style={{
                  position: 'relative',
                  zIndex: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: hasUntiedRibbon ? 'scale(1.3) translateY(20px) opacity(0)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer'
                }}
                onClick={handleUntieRibbon}
                title="Apasă pentru a deznoda panglica"
              >
                <div style={{ background: '#0e0712', borderRadius: '50%', padding: '6px', border: `1.5px solid ${selectedTheme.boxBorder}` }}>
                  <SatinRibbonBowIcon size={34} color={selectedTheme.ribbonColor} />
                </div>
                {/* Embroidered Ribbon Monogram / Dedication preview */}
                <div 
                  style={{
                    background: 'rgba(0,0,0,0.85)',
                    border: '1px solid #d97706',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    marginTop: '8px',
                    fontSize: '0.68rem',
                    color: '#fef3c7',
                    fontWeight: 700,
                    maxWidth: '190px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  "{ribbonMessage}"
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              Stratul 3: Panglica de Satin Brodată & Cutia de Catifea
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0 0 16px', lineHeight: 1.4 }}>
              Panglică lată cu text brodat caligrafic. La atingerea nodului, panglica alunecă fin dezvăluind capacul cutiei de catifea.
            </p>

            <button
              type="button"
              id="btn-unboxing-untie-ribbon"
              onClick={handleUntieRibbon}
              disabled={isAnimating}
              style={{
                background: 'linear-gradient(135deg, #be123c, #e11d48)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(225, 29, 72, 0.4)',
                whiteSpace: 'nowrap !important',
                transition: 'transform 0.2s ease'
              }}
            >
              <SatinRibbonBowIcon size={16} color="#ffffff" />
              <span>Deznodă Panglica de Mătase</span>
              <ChevronRight size={16} color="#ffffff" />
            </button>
          </div>
        )}

        {/* STAGE 3: The Grand Reveal & Diamond Sparkle Bloom */}
        {currentStage === 3 && (
          <div style={{ width: '100%', maxWidth: '440px', animation: 'fadeIn 0.5s ease' }}>
            {/* The Unboxed Luxury Box with Blooming Roses and Floating Sparkles */}
            <div 
              style={{
                width: '270px',
                height: '210px',
                margin: '0 auto 18px',
                background: 'radial-gradient(circle at center, #260f1e 0%, #12050e 100%)',
                border: `2px solid ${selectedBouquet.sparkleColor}`,
                borderRadius: '16px',
                boxShadow: `0 24px 48px rgba(0,0,0,0.85), 0 0 30px ${selectedBouquet.sparkleColor}33`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                overflow: 'hidden'
              }}
            >
              {/* Floating Diamond Sparkle Stars (CSS animations) */}
              <div style={{ position: 'absolute', top: '15px', left: '20px', animation: 'pulse 1.8s infinite' }}>
                <Sparkles size={16} color={selectedBouquet.sparkleColor} />
              </div>
              <div style={{ position: 'absolute', top: '25px', right: '25px', animation: 'pulse 1.4s infinite 0.4s' }}>
                <Sparkles size={14} color="#ffffff" />
              </div>
              <div style={{ position: 'absolute', bottom: '25px', left: '30px', animation: 'pulse 2s infinite 0.7s' }}>
                <DiamondIcon size={14} color={selectedBouquet.sparkleColor} />
              </div>
              <div style={{ position: 'absolute', bottom: '20px', right: '25px', animation: 'pulse 1.6s infinite 0.2s' }}>
                <DiamondIcon size={15} color="#ffffff" />
              </div>

              {/* Bouquet Arrangement Visual Representation */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* 3 Upper Roses */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '-6px' }}>
                  <div style={{ background: selectedBouquet.outerColor, borderRadius: '50%', padding: '6px', border: `1.5px solid ${selectedBouquet.sparkleColor}` }}>
                    <RoseIcon size={24} color={selectedBouquet.petalsColor} />
                  </div>
                  <div style={{ background: '#0e0712', borderRadius: '50%', padding: '8px', border: `2px solid ${selectedBouquet.sparkleColor}`, boxShadow: `0 0 16px ${selectedBouquet.sparkleColor}66` }}>
                    <RoseIcon size={30} color={selectedBouquet.petalsColor} />
                  </div>
                  <div style={{ background: selectedBouquet.outerColor, borderRadius: '50%', padding: '6px', border: `1.5px solid ${selectedBouquet.sparkleColor}` }}>
                    <RoseIcon size={24} color={selectedBouquet.petalsColor} />
                  </div>
                </div>

                {/* 2 Lower Flanking Roses */}
                <div style={{ display: 'flex', gap: '18px', zIndex: 2 }}>
                  <div style={{ background: selectedBouquet.outerColor, borderRadius: '50%', padding: '6px', border: `1.5px solid ${selectedBouquet.sparkleColor}` }}>
                    <RoseIcon size={24} color={selectedBouquet.petalsColor} />
                  </div>
                  <div style={{ background: selectedBouquet.outerColor, borderRadius: '50%', padding: '6px', border: `1.5px solid ${selectedBouquet.sparkleColor}` }}>
                    <RoseIcon size={24} color={selectedBouquet.petalsColor} />
                  </div>
                </div>
              </div>

              {/* Diamond Shimmer Badge */}
              <div 
                style={{
                  marginTop: '12px',
                  background: 'rgba(0,0,0,0.8)',
                  border: `1px solid ${selectedBouquet.sparkleColor}`,
                  borderRadius: '20px',
                  padding: '4px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: `0 0 12px ${selectedBouquet.sparkleColor}44`
                }}
              >
                <DiamondIcon size={13} color={selectedBouquet.sparkleColor} />
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f8fafc' }}>
                  {selectedBouquet.sparkleType} • Scânteiere Activă
                </span>
              </div>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
              Dezvăluirea Regală: {selectedBouquet.name}
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: '0 0 16px', lineHeight: 1.4 }}>
              Capacul este complet ridicat. Trandafirii strălucesc hipnotic la lumină, iar parfumul de {selectedScent.name} învăluie încăperea.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                type="button"
                id="btn-unboxing-replay-bloom"
                onClick={handleReplay}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  color: '#fbcfe8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap !important'
                }}
              >
                <RotateCcw size={14} color="#f43f5e" />
                <span>Reia Despachetarea</span>
              </button>

              <button
                type="button"
                id="btn-unboxing-confirm-package"
                onClick={handleApply}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 8px 18px rgba(16, 185, 129, 0.35)',
                  whiteSpace: 'nowrap !important'
                }}
              >
                <Check size={15} color="#ffffff" />
                <span>Alege Această Ambalare (+{selectedTheme.price} RON)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Customizer Tabs / Options Below Stage */}
      <div 
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '18px',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbcfe8', letterSpacing: '0.5px', marginBottom: '14px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={15} color="#e11d48" />
          <span>Personalizează Elementele de Ambalare</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          {/* Packaging Theme Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
              1. Tematică Cutie & Sigiliu de Ceară
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {PACKAGING_THEMES.map((theme) => {
                const isSelected = selectedTheme.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    id={`btn-unboxing-theme-${theme.id}`}
                    onClick={() => setSelectedTheme(theme)}
                    style={{
                      background: isSelected ? 'rgba(225, 29, 72, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '8px 10px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                        {theme.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                        {theme.subtitle}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f43f5e', whiteSpace: 'nowrap !important' }}>
                      +{theme.price} RON
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bouquet Model Preview Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
              2. Buchet de Previzualizat în Seif
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {UNBOXING_BOUQUETS.map((bq) => {
                const isSelected = selectedBouquet.id === bq.id;
                return (
                  <button
                    key={bq.id}
                    type="button"
                    id={`btn-unboxing-bouquet-${bq.id}`}
                    onClick={() => setSelectedBouquet(bq)}
                    style={{
                      background: isSelected ? 'rgba(217, 119, 6, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1.5px solid #d97706' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '8px 10px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                        {bq.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                        {bq.subtitle}
                      </div>
                    </div>
                    {isSelected && <Check size={14} color="#f59e0b" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ribbon Message Customization */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
            3. Text Brodat pe Panglica de Mătase (Stratul 3)
          </label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <input
              type="text"
              id="input-unboxing-ribbon-text"
              value={ribbonMessage}
              onChange={(e) => setRibbonMessage(e.target.value.slice(0, 42))}
              placeholder="Mesaj dedicat pe panglică..."
              style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#ffffff',
                fontSize: '0.82rem'
              }}
            />
          </div>
          {/* Quick Presets */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {RIBBON_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                id={`btn-unboxing-preset-${idx}`}
                onClick={() => setRibbonMessage(preset)}
                style={{
                  background: ribbonMessage === preset ? 'rgba(225, 29, 72, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                  border: ribbonMessage === preset ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: ribbonMessage === preset ? '#ffffff' : '#94a3b8',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap !important'
                }}
              >
                "{preset}"
              </button>
            ))}
          </div>
        </div>

        {/* Fragrance Infusion */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
            4. Infuzie Olfactivă Pulverizată la Ambalare (Stratul 2)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
            {SCENT_MISTS.map((scent) => {
              const isSelected = selectedScent.id === scent.id;
              return (
                <button
                  key={scent.id}
                  type="button"
                  id={`btn-unboxing-scent-${scent.id}`}
                  onClick={() => setSelectedScent(scent)}
                  style={{
                    background: isSelected ? 'rgba(225, 29, 72, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '8px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                    {scent.name}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>
                    {scent.notes}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar with CTA */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '20px', 
          paddingTop: '16px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative', 
          zIndex: 2,
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Configurație Selectată:
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
            {selectedTheme.name} • +{selectedTheme.price} RON
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {onClose && (
            <button
              type="button"
              id="btn-close-unboxing-bottom"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                padding: '10px 16px',
                color: '#94a3b8',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap !important'
              }}
            >
              Închide
            </button>
          )}

          <button
            type="button"
            id="btn-unboxing-apply-action"
            onClick={handleApply}
            style={{
              background: 'linear-gradient(135deg, #e11d48, #9f1239)',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 20px rgba(225, 29, 72, 0.4)',
              whiteSpace: 'nowrap !important'
            }}
          >
            <Check size={16} color="#ffffff" />
            <span>Salvează Pachetul Regal ({selectedTheme.price} RON)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
