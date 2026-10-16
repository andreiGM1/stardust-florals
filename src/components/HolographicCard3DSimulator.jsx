import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Eye, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Check, 
  Sparkle,
  Layers,
  Heart,
  Palette
} from 'lucide-react';
import { 
  HolographicPrismIcon, 
  LenticularEyeIcon, 
  RoseIcon, 
  CrownIcon, 
  DiamondIcon,
  QuillIcon
} from './CustomIcons';

export const HOLO_THEMES = [
  {
    id: 'constelatia-iubirii',
    name: 'Constelația Iubirii (Love Constellation)',
    tagline: 'Galaxie prismatică, stele scânteietoare & reflexii violet-aurii',
    description: 'Carton negru catifelat 450g cu micro-lentile ce creează iluzia unei adâncimi galactice de 5 cm în interiorul hârtiei.',
    badge: 'BESTSELLER CELESTIAL',
    price: 35,
    accentColor: '#818cf8',
    gradientBg: 'radial-gradient(circle at 50% 40%, rgba(99, 102, 241, 0.35) 0%, #1e1b4b 45%, #050314 100%)',
    foilSheen: 'linear-gradient(135deg, rgba(238, 130, 238, 0.4), rgba(0, 255, 255, 0.4), rgba(255, 215, 0, 0.4))'
  },
  {
    id: 'aurora-boreala',
    name: 'Aurora Boreală & Diamant (Northern Shimmer)',
    tagline: 'Valuri de lumină verde-smarald & magenta pe carton negru mat',
    description: 'Folie optică lenticulară ce reproduce dansul aurorelor boreale polare la orice mișcare a mâinii.',
    badge: 'LUMINĂ POLARĂ',
    price: 35,
    accentColor: '#10b981',
    gradientBg: 'radial-gradient(circle at 45% 35%, rgba(16, 185, 129, 0.35) 0%, #064e3b 45%, #021a12 100%)',
    foilSheen: 'linear-gradient(135deg, rgba(52, 211, 153, 0.45), rgba(244, 63, 94, 0.4), rgba(56, 189, 248, 0.45))'
  },
  {
    id: 'inima-infinite-depth',
    name: 'Inimă Infinite Depth (Infinity Abyss)',
    tagline: 'Efect optic de abis infinit cu inimi 3D concentrice pulsatorii',
    description: 'Iluzie optică hipnotică tip oglindă infinită ce pare că se adâncește la nesfârșit în centrul felicitării.',
    badge: 'EFECT OPTIC WOW',
    price: 39,
    accentColor: '#f43f5e',
    gradientBg: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.4) 0%, #4c0519 45%, #0f0106 100%)',
    foilSheen: 'linear-gradient(135deg, rgba(251, 113, 133, 0.5), rgba(217, 70, 239, 0.45), rgba(251, 191, 36, 0.4))'
  },
  {
    id: 'monograma-regala-aur',
    name: 'Monogramă Regală Aur Holografic (24K Prismatic)',
    tagline: 'Litere caligrafice în relief cu folie aurie refractară la 360°',
    description: 'Foil-stamping metalic de înaltă precizie cu micro-gravură prismatică ce reflectă spectrul complet al luminii.',
    badge: 'CALIGRAFIE REGALĂ',
    price: 39,
    accentColor: '#f59e0b',
    gradientBg: 'radial-gradient(circle at 50% 40%, rgba(245, 158, 11, 0.35) 0%, #78350f 45%, #140902 100%)',
    foilSheen: 'linear-gradient(135deg, rgba(252, 211, 77, 0.55), rgba(245, 158, 11, 0.45), rgba(244, 63, 94, 0.35))'
  }
];

export const FOIL_STAMP_COLORS = [
  { id: 'prismatic-rainbow', name: 'Curcubeu Prismatic (Holo Rainbow)', hex: 'linear-gradient(90deg, #f43f5e, #fbbf24, #10b981, #38bdf8, #c084fc)' },
  { id: 'holo-rose-gold', name: 'Aur Roz Holografic (Holo Rose Gold)', hex: 'linear-gradient(90deg, #fda4af, #f43f5e, #fbcfe8, #fb7185)' },
  { id: 'silver-galactic', name: 'Argintiu Galactic Stardust (Silver Stars)', hex: 'linear-gradient(90deg, #f8fafc, #94a3b8, #e2e8f0, #cbd5e1)' },
  { id: 'pure-gold-24k', name: 'Aur 24K Hologramat (24K Prismatic Gold)', hex: 'linear-gradient(90deg, #fef08a, #f59e0b, #fef3c7, #d97706)' }
];

export default function HolographicCard3DSimulator({
  isEmbedded = false,
  onApplyConfig = null,
  onClose = null,
  initialData = null
}) {
  const [selectedThemeId, setSelectedThemeId] = useState(
    initialData?.themeId || HOLO_THEMES[0].id
  );
  const [selectedFoilId, setSelectedFoilId] = useState(
    initialData?.foilId || FOIL_STAMP_COLORS[0].id
  );
  const [recipientName, setRecipientName] = useState(
    initialData?.recipientName || 'Pentru Sufletul Meu Pereche'
  );
  const [customDedication, setCustomDedication] = useState(
    initialData?.customDedication || 'În ochii tăi văd întregul univers strălucind mai frumos ca o mie de stele.'
  );
  const [senderName, setSenderName] = useState(
    initialData?.senderName || 'Cu dragoste veșnică, Andrei'
  );

  // 3D Physics Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isAutoShimmer, setIsAutoShimmer] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const cardRef = useRef(null);
  const audioCtxRef = useRef(null);

  const currentTheme = HOLO_THEMES.find(t => t.id === selectedThemeId) || HOLO_THEMES[0];
  const currentFoil = FOIL_STAMP_COLORS.find(f => f.id === selectedFoilId) || FOIL_STAMP_COLORS[0];

  // Sound Synthesizer: Prismatic Chime
  const playHoloChime = () => {
    if (!soundEnabled) return;
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

      const notes = [1318.51, 1567.98, 2093.00, 2637.02]; // E6, G6, C7, E7
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
      });
    } catch {
      // Audio playback failsafe
    }
  };

  // Mouse Move Tilt Calculation
  const handleMouseMove = (e) => {
    if (isAutoShimmer || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -16;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 16;

    setTilt({ x: rotX, y: rotY });
    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    if (!isAutoShimmer) {
      setTilt({ x: 0, y: 0 });
      setLightPos({ x: 50, y: 50 });
    }
  };

  // Auto-Shimmer Animation Loop
  useEffect(() => {
    let animId;
    let startTime = Date.now();

    if (isAutoShimmer) {
      const loop = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const angle = elapsed * 2.2;
        const sinVal = Math.sin(angle);
        const cosVal = Math.cos(angle * 0.85);

        setTilt({
          x: sinVal * 12,
          y: cosVal * 14
        });
        setLightPos({
          x: 50 + cosVal * 38,
          y: 50 + sinVal * 38
        });

        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isAutoShimmer]);

  const handleSaveAndApply = () => {
    const configData = {
      themeId: currentTheme.id,
      themeName: currentTheme.name,
      foilId: currentFoil.id,
      foilName: currentFoil.name,
      recipientName: recipientName.trim(),
      customDedication: customDedication.trim(),
      senderName: senderName.trim(),
      totalPrice: currentTheme.price
    };

    try {
      localStorage.setItem('stardust_holo_card', JSON.stringify(configData));
    } catch {
      // Storage quota failsafe
    }

    if (onApplyConfig) {
      onApplyConfig(configData);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      id="holographic-card-simulator-root"
      style={{
        background: isEmbedded 
          ? 'linear-gradient(145deg, #160a1e 0%, #08020d 100%)' 
          : 'transparent',
        border: isEmbedded ? '1.5px solid rgba(192, 132, 252, 0.35)' : 'none',
        borderRadius: isEmbedded ? '24px' : '0',
        padding: isEmbedded ? '28px 24px' : '16px 12px',
        color: '#ffffff',
        boxShadow: isEmbedded ? '0 16px 45px rgba(0, 0, 0, 0.7)' : 'none',
        maxWidth: '100%',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Header Badge & Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '22px' }}>
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(192, 132, 252, 0.15)',
              border: '1px solid rgba(192, 132, 252, 0.4)',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              color: '#d8b4fe',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: '8px'
            }}
          >
            <HolographicPrismIcon size={14} color="#c084fc" />
            <span>ILUZIE OPTICĂ 3D • FOLIE LENTICULARĂ PRISMATICĂ</span>
          </div>

          <h3 style={{ fontSize: '1.55rem', margin: '0 0 6px', color: '#ffffff', fontFamily: 'Cinzel, Georgia, serif', letterSpacing: '-0.01em' }}>
            Felicitare Holografică 3D cu Diamant & Sclipici Plutitor
          </h3>
          <p style={{ color: '#d8b4fe', fontSize: '0.88rem', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
            Plimbă cursorul peste felicitare pentru a observa reflexia prismatică a curcubeului și efectul de adâncime de 5 cm creat de folia lenticulară japoneză aplicată pe carton negru satinat de 450g.
          </p>
        </div>

        {/* Sound & Auto-Tilt Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => {
              setIsAutoShimmer(!isAutoShimmer);
              playHoloChime();
            }}
            className="btn btn-secondary btn-sm"
            style={{
              fontSize: '0.78rem',
              padding: '6px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: isAutoShimmer ? 'rgba(192, 132, 252, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: isAutoShimmer ? '1px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.15)',
              color: isAutoShimmer ? '#e9d5ff' : '#cbd5e1',
              borderRadius: '10px'
            }}
            title="Activează animația continuă de înclinare pentru a admira reflexiile fără cursor"
          >
            <LenticularEyeIcon size={14} color={isAutoShimmer ? '#c084fc' : '#94a3b8'} />
            <span>{isAutoShimmer ? 'Stop Balans 3D' : 'Balans Automat 3D'}</span>
          </button>

          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '6px 10px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: soundEnabled ? '#fef08a' : '#94a3b8',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem'
            }}
            title={soundEnabled ? 'Dezactivează sunetul' : 'Activează sunetul de cristal'}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{soundEnabled ? 'Sunet Activ' : 'Mut'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'start' }}>
        
        {/* Left Column: 3D Holographic Card Stage */}
        <div style={{ perspective: '1100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              width: '100%',
              maxWidth: '380px',
              height: '480px',
              borderRadius: '24px',
              background: currentTheme.gradientBg,
              border: `2px solid ${currentTheme.accentColor}`,
              boxShadow: `0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px ${currentTheme.accentColor}44`,
              position: 'relative',
              cursor: 'grab',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isAutoShimmer ? 'none' : 'transform 0.08s ease-out, box-shadow 0.2s ease',
              overflow: 'hidden',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              userSelect: 'none'
            }}
          >
            {/* Prismatic Specular Foil Overlay with Rainbow Iridescence */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, 0.55) 0%, transparent 45%), ${currentTheme.foilSheen}`,
                mixBlendMode: 'color-dodge',
                opacity: 0.75,
                pointerEvents: 'none',
                transition: isAutoShimmer ? 'none' : 'background 0.08s ease-out'
              }}
            />

            {/* Micro-Lenticular Slit Texture (Optical Grating Grid) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0.04) 2px, transparent 2px, transparent 4px)',
                opacity: 0.6,
                pointerEvents: 'none'
              }}
            />

            {/* Card Header (Deep Layer 1: translateZ 15px) */}
            <div style={{ transform: 'translateZ(20px)', position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#e0e7ff', fontWeight: 800 }}>
                <CrownIcon size={13} color="#fcd34d" />
                <span>STARDUST • HOLOGRAPHIC 3D</span>
              </div>
              <span style={{ fontSize: '0.68rem', background: 'rgba(0, 0, 0, 0.65)', border: `1px solid ${currentTheme.accentColor}`, color: currentTheme.accentColor, padding: '3px 9px', borderRadius: '12px', fontWeight: 800 }}>
                {currentTheme.badge}
              </span>
            </div>

            {/* Central 3D Embossed Artwork & Holographic Diamond (translateZ 45px) */}
            <div style={{ transform: 'translateZ(45px)', textAlign: 'center', margin: 'auto 0', position: 'relative', zIndex: 3 }}>
              {/* Prismatic Monogram Stamp */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.75)',
                  border: `2px solid ${currentTheme.accentColor}`,
                  boxShadow: `0 0 25px ${currentTheme.accentColor}77`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  position: 'relative'
                }}
              >
                <HolographicPrismIcon size={38} color={currentTheme.accentColor} />
                <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                  <Sparkle size={14} color="#fde047" />
                </div>
              </div>

              {/* Recipient Title (Custom Name) */}
              <div 
                style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif', 
                  fontSize: '1.45rem', 
                  fontWeight: 800, 
                  color: '#ffffff', 
                  textShadow: `0 2px 10px rgba(0, 0, 0, 0.9), 0 0 15px ${currentTheme.accentColor}`,
                  marginBottom: '10px'
                }}
              >
                {recipientName || 'Pentru Sufletul Meu'}
              </div>

              {/* Dedication Text */}
              <p
                style={{
                  fontStyle: 'italic',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  color: '#e2e8f0',
                  margin: '0 auto',
                  maxWidth: '300px',
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)'
                }}
              >
                „{customDedication || 'Te iubesc dincolo de cuvinte.'}”
              </p>
            </div>

            {/* Card Footer (translateZ 25px) */}
            <div style={{ transform: 'translateZ(30px)', position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Semnătura:</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc', fontStyle: 'italic' }}>
                  {senderName || 'Al tău pentru totdeauna'}
                </span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: '#cbd5e1' }}>
                <ShieldCheck size={13} color="#10b981" />
                <span>Folie 3D Japoneză</span>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '0.75rem', color: '#94a3b8' }}>
            <Eye size={13} color="#c084fc" />
            <span>Mărește / micșorează înclinarea mișcând mouse-ul pe card</span>
          </div>
        </div>

        {/* Right Column: Customization Panel */}
        <div>
          {/* 1. Theme Presets */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#e9d5ff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              <Layers size={15} color="#c084fc" />
              <span>1. Alege Tema Holografică 3D:</span>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {HOLO_THEMES.map((theme) => {
                const isSelected = theme.id === selectedThemeId;
                return (
                  <div
                    key={theme.id}
                    onClick={() => {
                      setSelectedThemeId(theme.id);
                      playHoloChime();
                    }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: isSelected ? 'rgba(192, 132, 252, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? `1.5px solid ${theme.accentColor}` : '1px solid rgba(255, 255, 255, 0.12)',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: isSelected ? `0 4px 18px ${theme.accentColor}33` : 'none'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.92rem', color: isSelected ? '#ffffff' : '#e2e8f0' }}>
                          {theme.name}
                        </span>
                        <span style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '6px', background: isSelected ? theme.accentColor : 'rgba(255,255,255,0.1)', color: isSelected ? '#000000' : '#cbd5e1', fontWeight: 800 }}>
                          {theme.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                        {theme.tagline}
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: theme.accentColor, flexShrink: 0, marginLeft: '12px' }}>
                      +{theme.price} RON
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Foil Stamp Reflection Hue */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#e9d5ff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              <Palette size={15} color="#c084fc" />
              <span>2. Nuanță Folie Prismatică Refractară:</span>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
              {FOIL_STAMP_COLORS.map((foil) => {
                const isSelected = foil.id === selectedFoilId;
                return (
                  <button
                    key={foil.id}
                    type="button"
                    onClick={() => {
                      setSelectedFoilId(foil.id);
                      playHoloChime();
                    }}
                    style={{
                      background: isSelected ? 'rgba(192, 132, 252, 0.22)' : 'rgba(255, 255, 255, 0.05)',
                      border: isSelected ? '1.5px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      padding: '8px 10px',
                      color: isSelected ? '#ffffff' : '#cbd5e1',
                      fontSize: '0.75rem',
                      fontWeight: isSelected ? 800 : 600,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span 
                      style={{ 
                        width: '14px', 
                        height: '14px', 
                        borderRadius: '50%', 
                        background: foil.hex, 
                        flexShrink: 0,
                        border: '1px solid rgba(255,255,255,0.4)' 
                      }} 
                    />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{foil.name.split('(')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Personalized Text Fields */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#e9d5ff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              <QuillIcon size={15} color="#c084fc" />
              <span>3. Text Personalizat Caligrafiat pe Felicitare:</span>
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                  Numele Destinatarei:
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  maxLength={40}
                  placeholder="Ex: Pentru Andreea, Iubita Mea"
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(192, 132, 252, 0.35)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '0.86rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                  Mesajul Tău de Dragoste (Va apărea cu reflexii aurii):
                </label>
                <textarea
                  value={customDedication}
                  onChange={(e) => setCustomDedication(e.target.value)}
                  maxLength={160}
                  rows={2}
                  placeholder="Scrie o declarație de suflet..."
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(192, 132, 252, 0.35)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    resize: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                  Semnătura Expeditorului:
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  maxLength={35}
                  placeholder="Ex: Al tău pentru totdeauna, Andrei"
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(192, 132, 252, 0.35)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '0.86rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Action CTA Box */}
          <div
            style={{
              background: 'rgba(192, 132, 252, 0.12)',
              border: '1px solid rgba(192, 132, 252, 0.35)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.74rem', color: '#c084fc', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px', display: 'block' }}>
                FELICITARE HOLOGRAFICĂ SELECTATĂ:
              </span>
              <strong style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                +{currentTheme.price} RON
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#d8b4fe', marginLeft: '6px' }}>
                ({currentTheme.name.split('(')[0]})
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '8px 14px', borderRadius: '10px' }}
                >
                  Închide
                </button>
              )}

              <button
                type="button"
                id="btn-apply-holo-card-config"
                onClick={handleSaveAndApply}
                className="btn btn-primary btn-md"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                  boxShadow: '0 4px 18px rgba(168, 85, 247, 0.45)',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap !important'
                }}
              >
                <HolographicPrismIcon size={16} color="#ffffff" />
                <span>Adaugă Felicitarea Holografică (+{currentTheme.price} RON)</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
