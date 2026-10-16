import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Check, 
  ShieldCheck, 
  Flame, 
  Play, 
  Eye, 
  ZoomIn, 
  ZoomOut 
} from 'lucide-react';
import { 
  RoseIcon, 
  DiamondIcon, 
  LaserPetalEngraverIcon, 
  PetalMagnifierIcon 
} from './CustomIcons';

export default function PetalLaserEngraver({
  isEmbedded = false,
  onApplyConfig = null,
  onClose = null,
  initialData = null
}) {
  // Config state
  const [engravedText, setEngravedText] = useState(initialData?.text || 'Ești Universul Meu');
  const [selectedStyleId, setSelectedStyleId] = useState(initialData?.styleId || 'script_regal');
  const [selectedFoilId, setSelectedFoilId] = useState(initialData?.foilId || 'gold_24k');
  const [selectedColorId, setSelectedColorId] = useState(initialData?.colorId || 'rouge_imperial');
  
  // Interactive Simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [laserProgress, setLaserProgress] = useState(100);
  const [laserBeamCoord, setLaserBeamCoord] = useState({ x: 50, y: 50 });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMagnified, setIsMagnified] = useState(false);
  const [isCopiedSuccess, setIsCopiedSuccess] = useState(false);

  // Web Audio Context reference
  const audioCtxRef = useRef(null);
  const animFrameRef = useRef(null);

  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Sound 1: Micro-Laser Ablation & Ionization Pulse
  const playLaserPulseSound = () => {
    if (!soundEnabled) return;
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      // Carrier high-frequency precision laser hum
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.16);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      // Lowpass filter for smooth biological burn sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Audio error ignored
    }
  };

  // Sound 2: Diamond Luster Finish Chime
  const playLaserFinishChime = () => {
    if (!soundEnabled) return;
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const freqs = [783.99, 987.77, 1174.66, 1567.98]; // G5, B5, D6, G6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        const startTime = ctx.currentTime + idx * 0.07;
        const dur = 0.9;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0005, startTime + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    } catch {
      // Audio error ignored
    }
  };

  // Laser Simulation Trigger
  const handleSimulateLaser = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setLaserProgress(0);

    const startTime = performance.now();
    const duration = 2400; // 2.4s scan

    let lastSoundPulse = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setLaserProgress(progress);

      // Calculate path coordinate across the text line (X from 25% to 75%, gentle wave in Y)
      const xPos = 24 + (progress / 100) * 52;
      const yPos = 49 + Math.sin((progress / 100) * Math.PI * 8) * 4;
      setLaserBeamCoord({ x: xPos, y: yPos });

      // Trigger periodic laser micro-burst sound
      if (currentTime - lastSoundPulse > 160 && progress < 96) {
        playLaserPulseSound();
        lastSoundPulse = currentTime;
      }

      if (progress < 100) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSimulating(false);
        setLaserProgress(100);
        playLaserFinishChime();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Engraving Styles
  const ENGRAVING_STYLES = [
    {
      id: 'script_regal',
      name: 'Caligrafie Regală Cursivă',
      sub: 'Litere cursive cursive aurite de atelier haute couture',
      fontFamily: "'Playfair Display', 'Brush Script MT', cursive, Georgia, serif",
      fontStyle: 'italic',
      letterSpacing: '1px'
    },
    {
      id: 'monogram_crest',
      name: 'Monogramă Heraldică & Siglă',
      sub: 'Simbolistică nobilă centrată pentru inițiale de cuplu',
      fontFamily: "'Cinzel', 'Times New Roman', serif",
      fontStyle: 'normal',
      letterSpacing: '3px'
    },
    {
      id: 'horlogerie_serif',
      name: 'Minimalist Haute Horlogerie',
      sub: 'Micro-serife elvețiene de ceasornicărie de precizie',
      fontFamily: "'Montserrat', 'Cinzel', sans-serif",
      fontStyle: 'normal',
      letterSpacing: '2px'
    }
  ];

  // Metallic Foil Infusions
  const FOIL_INFUSIONS = [
    {
      id: 'gold_24k',
      name: 'Pulbere de Aur 24K Topită',
      price: 49,
      sub: 'Litere aurii cu micropulbere pură 24K strălucitoare',
      textColor: '#ffd700',
      textGlow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(217, 119, 6, 0.6)',
      accentBorder: 'rgba(245, 158, 11, 0.7)'
    },
    {
      id: 'silver_diamond',
      name: 'Argint Diamantin & Perlat',
      price: 45,
      sub: 'Reflexii metalice reci de diamant și platină sidefată',
      textColor: '#f1f5f9',
      textGlow: '0 0 10px rgba(248, 250, 252, 0.9), 0 0 18px rgba(148, 163, 184, 0.7)',
      accentBorder: 'rgba(226, 232, 240, 0.7)'
    },
    {
      id: 'stealth_velvet',
      name: 'Filigran Mat Ton-pe-Ton',
      price: 39,
      sub: 'Marcaj secret tactil celular, vizibil discret la lumină',
      textColor: 'rgba(255, 255, 255, 0.55)',
      textGlow: '0 0 6px rgba(255, 255, 255, 0.35)',
      accentBorder: 'rgba(156, 163, 175, 0.5)'
    }
  ];

  // Petal Color Options
  const PETAL_COLORS = [
    {
      id: 'rouge_imperial',
      name: 'Rouge Impérial (Roșu Rubiniu)',
      sub: 'Catifea profundă de trandafir nobil Stardust',
      petalBg: 'radial-gradient(circle at 45% 40%, #be123c 0%, #881337 55%, #4c0519 100%)',
      petalBorder: 'rgba(225, 29, 72, 0.5)',
      ambientGlow: 'rgba(225, 29, 72, 0.35)'
    },
    {
      id: 'noir_onyx',
      name: 'Noir Onyx (Negru de Catifea)',
      sub: 'Fundal misterios pe care aurul scânteiază dramatic',
      petalBg: 'radial-gradient(circle at 45% 40%, #27272a 0%, #18181b 60%, #09090b 100%)',
      petalBorder: 'rgba(217, 119, 6, 0.45)',
      ambientGlow: 'rgba(217, 119, 6, 0.25)'
    },
    {
      id: 'bleu_saphir',
      name: 'Bleu Nuit (Safir Regal)',
      sub: 'Albastru cosmic nobil cu reflexii de ametist',
      petalBg: 'radial-gradient(circle at 45% 40%, #1e3a8a 0%, #172554 60%, #090e1f 100%)',
      petalBorder: 'rgba(59, 130, 246, 0.45)',
      ambientGlow: 'rgba(59, 130, 246, 0.3)'
    },
    {
      id: 'blanc_perle',
      name: 'Blanc Ivoire (Fildeș Perlat)',
      sub: 'Textură sidefată delicată cu nervuri subtile',
      petalBg: 'radial-gradient(circle at 45% 40%, #fdf4ff 0%, #f1f5f9 55%, #cbd5e1 100%)',
      petalBorder: 'rgba(244, 114, 182, 0.45)',
      ambientGlow: 'rgba(244, 114, 182, 0.25)'
    }
  ];

  // Quick Preset Messages
  const PRESET_MESSAGES = [
    'Ești Universul Meu',
    'Pentru totdeauna, A & M',
    'Je t\'aime à l\'infini',
    '12.10.2024 — Veșnic noi'
  ];

  const currentStyle = ENGRAVING_STYLES.find(s => s.id === selectedStyleId) || ENGRAVING_STYLES[0];
  const currentFoil = FOIL_INFUSIONS.find(f => f.id === selectedFoilId) || FOIL_INFUSIONS[0];
  const currentColor = PETAL_COLORS.find(c => c.id === selectedColorId) || PETAL_COLORS[0];

  const handleApply = () => {
    const config = {
      text: engravedText,
      styleId: currentStyle.id,
      styleName: currentStyle.name,
      foilId: currentFoil.id,
      foilName: currentFoil.name,
      colorId: currentColor.id,
      colorName: currentColor.name,
      totalPrice: currentFoil.price
    };
    if (onApplyConfig) {
      onApplyConfig(config);
    }
    setIsCopiedSuccess(true);
    setTimeout(() => {
      setIsCopiedSuccess(false);
      if (onClose) onClose();
    }, 400);
  };

  return (
    <div
      className="petal-laser-engraver-container"
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
          background: `radial-gradient(circle, ${currentColor.ambientGlow} 0%, transparent 70%)`,
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
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 2, paddingRight: isEmbedded ? '0' : '52px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.4)', marginBottom: '8px' }}>
            <LaserPetalEngraverIcon size={14} color="#f43f5e" />
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fb7185' }}>
              Atelier Haute Couture • Micro-Laser 0.2W
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', fontFamily: "'Cinzel', serif", color: '#ffffff', letterSpacing: '0.5px' }}>
            Gravură Laser pe Petală Naturală Stabilizată
          </h2>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, maxWidth: '620px', lineHeight: '1.5' }}>
            Gravează fin inițiale, monograme sau o confesiune secretă direct pe petala catifelată a trandafirului central. Procedura păstrează petala vie și intactă pentru 3-5 ani prin infuzie de pulbere metalică nobilă.
          </p>
        </div>

        {/* Sound & Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            id="btn-toggle-petal-laser-magnifier"
            onClick={() => setIsMagnified(!isMagnified)}
            title={isMagnified ? "Micșorează la Vedere Ansamblu" : "Lupă Macro 2.5x Inspecție Celulară"}
            style={{
              background: isMagnified ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: isMagnified ? '1px solid rgba(245, 158, 11, 0.7)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              padding: '8px 12px',
              color: isMagnified ? '#fbbf24' : '#d1d5db',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap !important'
            }}
          >
            {isMagnified ? <ZoomOut size={15} /> : <ZoomIn size={15} />}
            <span>{isMagnified ? "1x Ansamblu" : "2.5x Lupă Macro"}</span>
          </button>

          <button
            type="button"
            id="btn-toggle-petal-laser-sound"
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: soundEnabled ? '#e11d48' : '#6b7280',
              cursor: 'pointer'
            }}
            title={soundEnabled ? "Dezactivează sunetul optic" : "Activează sunetul optic"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage & Canvas */}
      <div 
        id="petal-laser-interactive-stage"
        style={{
          background: 'linear-gradient(180deg, rgba(17, 8, 22, 0.95) 0%, rgba(10, 4, 13, 0.95) 100%)',
          border: '1.5px solid rgba(225, 29, 72, 0.3)',
          borderRadius: '18px',
          padding: '24px 20px',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 35px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Laser Status HUD Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: isSimulating ? '#ef4444' : '#10b981',
              boxShadow: isSimulating ? '0 0 10px #ef4444' : '0 0 8px #10b981',
              display: 'inline-block' 
            }} />
            <span style={{ fontSize: '12px', fontWeight: '700', color: isSimulating ? '#fca5a5' : '#6ee7b7', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              {isSimulating ? "GRAVARE ACTIVĂ (LASER PULSE 0.2W)..." : "CALIBRAT: GATA DE PERSONALIZARE"}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Grosime fascicul:</span>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#f3f4f6', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 8px', borderRadius: '6px' }}>
              0.05 mm (Micro-Precizie)
            </span>
          </div>
        </div>

        {/* Visual Petal Canvas Display */}
        <div 
          style={{
            minHeight: '260px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '20px 0',
            perspective: '1000px'
          }}
        >
          {/* Natural Rose Background Atmosphere */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: isMagnified ? '540px' : '440px',
              height: isMagnified ? '280px' : '230px',
              borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
              background: currentColor.petalBg,
              boxShadow: `0 18px 45px rgba(0, 0, 0, 0.8), 0 0 35px ${currentColor.ambientGlow}, inset 0 2px 20px rgba(255, 255, 255, 0.15)`,
              border: `1.5px solid ${currentColor.petalBorder}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isMagnified ? 'scale(1.08)' : 'scale(1)',
              overflow: 'hidden'
            }}
          >
            {/* Delicate Natural Petal Veins Pattern */}
            <svg 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.18 }}
              viewBox="0 0 400 240"
              fill="none"
              stroke="#ffffff"
            >
              <path d="M200 230 C200 170 200 70 200 10" strokeWidth="1.8" />
              <path d="M200 190 C160 160 110 130 50 110" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M200 190 C240 160 290 130 350 110" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M200 140 C150 110 100 85 40 70" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M200 140 C250 110 300 85 360 70" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M200 80 C160 55 120 40 60 30" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M200 80 C240 55 280 40 340 30" strokeWidth="1.2" strokeDasharray="3 3" />
            </svg>

            {/* Micro Glitter Sprinkles On Petal */}
            <div style={{ position: 'absolute', top: '15%', left: '20%', width: '4px', height: '4px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 6px #fff, 0 0 12px #ffd700' }} />
            <div style={{ position: 'absolute', top: '28%', right: '18%', width: '3px', height: '3px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 5px #fff' }} />
            <div style={{ position: 'absolute', bottom: '22%', left: '25%', width: '4px', height: '4px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 6px #fff, 0 0 10px #ffd700' }} />
            <div style={{ position: 'absolute', bottom: '18%', right: '28%', width: '3px', height: '3px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 5px #fff' }} />

            {/* Dewdrop High Luxury Highlight */}
            <div 
              style={{
                position: 'absolute',
                top: '12%',
                left: '32%',
                width: '14px',
                height: '10px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
                boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4)',
                transform: 'rotate(-25deg)'
              }}
            />

            {/* Engraved Text Container with Laser Foil Shader */}
            <div 
              id="engraved-petal-text-render"
              style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '0 16px',
                width: '100%'
              }}
            >
              {/* Optional Monogram Crown Crest */}
              {selectedStyleId === 'monogram_crest' && (
                <div style={{ marginBottom: '6px', opacity: (laserProgress / 100) }}>
                  <svg width="28" height="18" viewBox="0 0 28 18" fill="none" stroke={currentFoil.textColor} strokeWidth="1.5">
                    <path d="M2 14L6 4L14 10L22 4L26 14Z" fill="none" />
                    <circle cx="6" cy="3" r="1.5" fill={currentFoil.textColor} />
                    <circle cx="14" cy="9" r="1.5" fill={currentFoil.textColor} />
                    <circle cx="22" cy="3" r="1.5" fill={currentFoil.textColor} />
                    <line x1="4" y1="16" x2="24" y2="16" strokeWidth="1.8" />
                  </svg>
                </div>
              )}

              {/* The Engraved Message */}
              <div
                style={{
                  fontFamily: currentStyle.fontFamily,
                  fontStyle: currentStyle.fontStyle,
                  fontSize: isMagnified ? '24px' : '19px',
                  fontWeight: selectedStyleId === 'script_regal' ? '700' : '600',
                  color: currentFoil.textColor,
                  letterSpacing: currentStyle.letterSpacing,
                  textShadow: currentFoil.textGlow,
                  lineHeight: '1.4',
                  wordBreak: 'break-word',
                  transition: 'all 0.3s ease',
                  opacity: isSimulating ? Math.max(0.2, (laserProgress / 100)) : 1,
                  filter: isSimulating ? `drop-shadow(0 0 ${(100 - laserProgress) * 0.1}px #ef4444)` : 'none'
                }}
              >
                {engravedText.trim() ? engravedText : "Mesajul Tău Secret"}
              </div>

              {/* Atelier Hallmark Micro-Stamp */}
              <div 
                style={{ 
                  marginTop: '8px', 
                  fontSize: '9px', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase', 
                  color: currentFoil.textColor, 
                  opacity: 0.65 * (laserProgress / 100),
                  fontFamily: "'Cinzel', serif"
                }}
              >
                STARDUST ATELIER • 24K GOLD INFUSED
              </div>
            </div>

            {/* Live Active Laser Beam & Spark Effect during Simulation */}
            {isSimulating && (
              <>
                {/* Laser Ray from top emitter */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${laserBeamCoord.x}%`,
                    width: '2px',
                    height: `${laserBeamCoord.y}%`,
                    background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.9) 0%, rgba(254, 240, 138, 1) 100%)',
                    boxShadow: '0 0 12px #ef4444, 0 0 20px #fbbf24',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}
                />

                {/* Intense Focal Point of Ablation */}
                <div 
                  style={{
                    position: 'absolute',
                    top: `${laserBeamCoord.y}%`,
                    left: `${laserBeamCoord.x}%`,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff 0%, #fde047 40%, #ef4444 80%, transparent 100%)',
                    boxShadow: '0 0 15px #ef4444, 0 0 30px #f59e0b, 0 0 45px #ffffff',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 11
                  }}
                />

                {/* Flying Micro-Sparks */}
                <div 
                  style={{
                    position: 'absolute',
                    top: `${laserBeamCoord.y - 3}%`,
                    left: `${laserBeamCoord.x + 3}%`,
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    boxShadow: '0 0 6px #ffd700',
                    pointerEvents: 'none',
                    zIndex: 12
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: `${laserBeamCoord.y + 4}%`,
                    left: `${laserBeamCoord.x - 4}%`,
                    width: '2.5px',
                    height: '2.5px',
                    borderRadius: '50%',
                    background: '#ffedd5',
                    boxShadow: '0 0 6px #ef4444',
                    pointerEvents: 'none',
                    zIndex: 12
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Laser Action Toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              id="btn-simulate-laser-engraving"
              onClick={handleSimulateLaser}
              disabled={isSimulating}
              style={{
                background: isSimulating ? 'rgba(239, 68, 68, 0.2)' : 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                border: isSimulating ? '1px solid #ef4444' : '1px solid rgba(244, 63, 94, 0.5)',
                color: '#ffffff',
                padding: '9px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: isSimulating ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isSimulating ? 'none' : '0 4px 15px rgba(225, 29, 72, 0.4)',
                whiteSpace: 'nowrap !important'
              }}
            >
              {isSimulating ? <Flame size={15} className="animate-spin" /> : <Play size={15} />}
              <span>{isSimulating ? `Gravare Laser în Curs (${Math.round(laserProgress)}%)...` : 'Simulează Gravarea cu Laser'}</span>
            </button>

            <span style={{ fontSize: '12px', color: '#9ca3af' }}>
              Rezistă <strong>3-5 ani</strong> fără decolorare
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span style={{ fontSize: '11px', color: '#a7f3d0' }}>
              Certificat Tehnic de Gravură Microscopică Inclus
            </span>
          </div>
        </div>
      </div>

      {/* Customizer Controls Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Left Column: Text Input & Presets */}
        <div>
          <label htmlFor="input-engraved-text" style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#e5e7eb', marginBottom: '8px' }}>
            1. Text Secret sau Monogramă pe Petală (Max 28 Caractere):
          </label>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <input
              id="input-engraved-text"
              type="text"
              maxLength={28}
              value={engravedText}
              onChange={(e) => setEngravedText(e.target.value)}
              placeholder="Ex: Te iubesc la infinit"
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1.5px solid rgba(225, 29, 72, 0.4)',
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <span style={{ position: 'absolute', right: '12px', top: '14px', fontSize: '11px', color: '#9ca3af' }}>
              {engravedText.length}/28
            </span>
          </div>

          {/* Quick Presets */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {PRESET_MESSAGES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                id={`btn-preset-laser-${idx}`}
                onClick={() => setEngravedText(preset)}
                style={{
                  background: engravedText === preset ? 'rgba(225, 29, 72, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                  border: engravedText === preset ? '1px solid rgba(225, 29, 72, 0.7)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '11px',
                  color: engravedText === preset ? '#fda4af' : '#d1d5db',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap !important'
                }}
              >
                „{preset}”
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Finishing & Metal Foil */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#e5e7eb', marginBottom: '8px' }}>
            2. Tipul Infuziei Metalice & Finisaj:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {FOIL_INFUSIONS.map((foil) => {
              const isSelected = selectedFoilId === foil.id;
              return (
                <button
                  key={foil.id}
                  type="button"
                  id={`btn-laser-foil-${foil.id}`}
                  onClick={() => setSelectedFoilId(foil.id)}
                  style={{
                    background: isSelected ? 'rgba(225, 29, 72, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? `1.5px solid ${foil.accentBorder}` : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap !important'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div 
                      style={{ 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '50%', 
                        background: foil.textColor,
                        boxShadow: `0 0 8px ${foil.textColor}`
                      }} 
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                        {foil.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                        {foil.sub}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#fb7185' }}>
                    +{foil.price} RON
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Row 2: Styles & Petal Color */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Style Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#e5e7eb', marginBottom: '8px' }}>
            3. Stil Caligrafic de Atelier:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ENGRAVING_STYLES.map((style) => {
              const isSelected = selectedStyleId === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  id={`btn-laser-style-${style.id}`}
                  onClick={() => setSelectedStyleId(style.id)}
                  style={{
                    background: isSelected ? 'rgba(217, 119, 6, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1.5px solid rgba(245, 158, 11, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    whiteSpace: 'nowrap !important'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', fontFamily: style.fontFamily, fontStyle: style.fontStyle }}>
                      {style.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                      {style.sub}
                    </div>
                  </div>
                  {isSelected && <Check size={16} color="#fbbf24" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Petal Color Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#e5e7eb', marginBottom: '8px' }}>
            4. Culoarea Petalei Trandafirului Central:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {PETAL_COLORS.map((col) => {
              const isSelected = selectedColorId === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  id={`btn-laser-petal-color-${col.id}`}
                  onClick={() => setSelectedColorId(col.id)}
                  style={{
                    background: isSelected ? 'rgba(225, 29, 72, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1.5px solid rgba(225, 29, 72, 0.7)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap !important'
                  }}
                >
                  <div 
                    style={{ 
                      width: '14px', 
                      height: '14px', 
                      borderRadius: '50%', 
                      background: col.petalBg,
                      border: '1px solid rgba(255,255,255,0.3)',
                      flexShrink: 0
                    }} 
                  />
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {col.name.split(' ')[0]} {col.name.split(' ')[1] || ''}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)', fontSize: '11px', color: '#9ca3af', lineHeight: '1.4' }}>
            <DiamondIcon size={12} color="#fbbf24" style={{ marginRight: '6px' }} />
            Petala centrală este selecționată manual din cele mai mari flori de trandafiri ecuadorieni de grad A+ și supusă unui proces de stabilizare organică de 72 de ore.
          </div>
        </div>

      </div>

      {/* Action Footer Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', borderTop: '1.5px solid rgba(225, 29, 72, 0.3)', paddingTop: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af' }}>
            Cost Gravură Petală Stabilizată:
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', fontFamily: "'Cinzel', serif" }}>
            {currentFoil.price} RON
            <span style={{ fontSize: '12px', fontWeight: '500', color: '#9ca3af', marginLeft: '6px', fontFamily: 'sans-serif' }}>
              (include trandafirul stabilizat & certificat)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onClose && (
            <button
              type="button"
              id="btn-close-petal-laser-modal"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#d1d5db',
                padding: '12px 20px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap !important'
              }}
            >
              Închide
            </button>
          )}

          <button
            type="button"
            id="btn-apply-petal-laser-config"
            onClick={handleApply}
            style={{
              background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              border: '1px solid rgba(244, 63, 94, 0.5)',
              color: '#ffffff',
              padding: '12px 26px',
              borderRadius: '14px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 25px rgba(225, 29, 72, 0.45)',
              whiteSpace: 'nowrap !important'
            }}
          >
            {isCopiedSuccess ? <Check size={16} /> : <LaserPetalEngraverIcon size={16} color="#ffffff" />}
            <span>{isCopiedSuccess ? 'Configurație Salvată!' : `Salvează Gravura Laser (${currentFoil.price} RON)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
