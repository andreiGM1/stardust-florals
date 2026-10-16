import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkle, 
  Crown, 
  Heart, 
  Volume2, 
  VolumeX, 
  Check, 
  ChevronRight, 
  Eye, 
  Sliders, 
  Lock, 
  Unlock,
  Key,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { 
  SecretDrawerIcon, 
  EngagementRingIcon, 
  CrownIcon, 
  DiamondIcon, 
  ScrollIcon 
} from './CustomIcons';

export const DRAWER_CONTENTS = [
  {
    id: 'ring_solitaire',
    name: 'Slot Inel de Logodnă (Solitaire Proposal Vault)',
    badge: 'CERERE ÎN CĂSĂTORIE',
    tagline: 'Pernuță profilată cu fantă centrală pentru inelul tău de cerere.',
    description: 'Baza sertarului este prevăzută cu o fantă verticală căptușită cu catifea densă ce ține inelul fix, gata să scânteieze la deschidere.',
    price: 49,
    accentColor: '#f43f5e',
    IconComponent: EngagementRingIcon
  },
  {
    id: 'necklace_pendant',
    name: 'Slot Pandantiv & Colier (Cleme Invizibile de Mătase)',
    badge: 'BIJUTERIE DE LUX',
    tagline: 'Dispunere în V cu suport perlat pentru lănțișor sau pandantiv.',
    description: 'Pernuță capitonată cu două micro-cleme discrete de mătase ce expun pandantivul sau colierul în unghi ideal de refracție a luminii.',
    price: 49,
    accentColor: '#f59e0b',
    IconComponent: DiamondIcon
  },
  {
    id: 'secret_scroll',
    name: 'Pergament Secret cu Sigiliu Ceară & Panglică',
    badge: 'SCRISOARE TĂINUITĂ',
    tagline: 'Rulou de bumbac caligrafiat de mână și legat cu ceară roșie.',
    description: 'Hârtie artizanală cu textură vintage, înfășurată cu panglică de mătase și marcată cu sigiliul din ceară naturală al atelierului.',
    price: 39,
    accentColor: '#ec4899',
    IconComponent: ScrollIcon
  },
  {
    id: 'golden_key',
    name: 'Cheia Veșniciei din Alamă Aurită 24K Gravată',
    badge: 'SIMBOL ETERN',
    tagline: 'Cheiță simbolică artizanală reprezentând cheia inimii tale eterne.',
    description: 'Piesă masivă din alamă turnată și aurită, gravată cu inițialele cuplului pe o pernuță de catifea neagră.',
    price: 45,
    accentColor: '#8b5cf6',
    IconComponent: Key
  }
];

export const VELVET_LININGS = [
  {
    id: 'bordeaux_imperial',
    name: 'Bordeaux Impérial',
    subtitle: 'Catifea roșu-rubiniu profund',
    bg: 'linear-gradient(135deg, #4c0519 0%, #1c0209 100%)',
    textColor: '#fda4af',
    accentColor: '#f43f5e',
    shadowColor: 'rgba(244, 63, 94, 0.4)'
  },
  {
    id: 'noir_midnight',
    name: 'Noir Midnight & Micro-Sparkle',
    subtitle: 'Catifea neagră densă cu pulbere diamant',
    bg: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
    textColor: '#e2e8f0',
    accentColor: '#fcd34d',
    shadowColor: 'rgba(252, 211, 77, 0.35)'
  },
  {
    id: 'emerald_royal',
    name: 'Verde Smarald Regal',
    subtitle: 'Catifea nobiliară smarald închis',
    bg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
    textColor: '#6ee7b7',
    accentColor: '#10b981',
    shadowColor: 'rgba(16, 185, 129, 0.4)'
  },
  {
    id: 'rose_poudre',
    name: 'Rose Poudré Haute Couture',
    subtitle: 'Catifea pudrată romantică și caldă',
    bg: 'linear-gradient(135deg, #831843 0%, #500724 100%)',
    textColor: '#fbcfe8',
    accentColor: '#f472b6',
    shadowColor: 'rgba(244, 114, 182, 0.4)'
  }
];

export const DRAWER_HANDLES = [
  {
    id: 'knob_gold',
    name: 'Buton Alamă Aurită 24K',
    desc: 'Finisaj sferic lucios de 12mm cu șurub ascuns'
  },
  {
    id: 'tassel_silk',
    name: 'Ciucure Mătase de Lyon',
    desc: 'Ciucuraș artizanal din fir împletit cu reflexie aurie'
  },
  {
    id: 'ribbon_satin',
    name: 'Panglică Minimalistă Satin',
    desc: 'Trăgaci suplu din satin noir brodat manual'
  }
];

export default function SecretDrawerBoxWidget({
  isEmbedded = false,
  onApplyConfig = null,
  onClose = null,
  initialData = null
}) {
  const [selectedContentId, setSelectedContentId] = useState(
    initialData?.contentId || DRAWER_CONTENTS[0].id
  );
  const [selectedVelvetId, setSelectedVelvetId] = useState(
    initialData?.velvetId || VELVET_LININGS[0].id
  );
  const [selectedHandleId, setSelectedHandleId] = useState(
    initialData?.handleId || DRAWER_HANDLES[0].id
  );
  const [secretMessage, setSecretMessage] = useState(
    initialData?.secretMessage || 'Vrei să fii soția mea?'
  );
  const [monogramInitials, setMonogramInitials] = useState(
    initialData?.monogramInitials || 'A & E'
  );

  // Interactive 3D Simulator State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const audioCtxRef = useRef(null);

  const currentContent = DRAWER_CONTENTS.find(c => c.id === selectedContentId) || DRAWER_CONTENTS[0];
  const currentVelvet = VELVET_LININGS.find(v => v.id === selectedVelvetId) || VELVET_LININGS[0];
  const currentHandle = DRAWER_HANDLES.find(h => h.id === selectedHandleId) || DRAWER_HANDLES[0];

  // Synthesizer: Velvet sliding sound + crystal chime
  const playSlideAudio = (opening = true) => {
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

      // 1. Soft velvet friction noise
      const bufferSize = ctx.sampleRate * 0.35;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(opening ? 380 : 280, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.08);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(ctx.currentTime);
      whiteNoise.stop(ctx.currentTime + 0.35);

      // 2. If opening, add precious metal sparkle chime
      if (opening) {
        const chimeNotes = [1760.00, 2093.00, 2637.02]; // A6, C7, E7
        chimeNotes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + 0.2 + idx * 0.07);

          gain.gain.setValueAtTime(0.035, ctx.currentTime + 0.2 + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2 + idx * 0.07 + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + 0.2 + idx * 0.07);
          osc.stop(ctx.currentTime + 0.2 + idx * 0.07 + 0.45);
        });
      }
    } catch {
      // Audio playback failsafe
    }
  };

  const handleToggleDrawer = () => {
    const nextState = !isDrawerOpen;
    setIsDrawerOpen(nextState);
    playSlideAudio(nextState);
  };

  const handleSaveAndApply = () => {
    const configData = {
      contentId: currentContent.id,
      contentName: currentContent.name,
      velvetId: currentVelvet.id,
      velvetName: currentVelvet.name,
      handleId: currentHandle.id,
      handleName: currentHandle.name,
      secretMessage: secretMessage.trim(),
      monogramInitials: monogramInitials.trim(),
      totalPrice: currentContent.price
    };

    try {
      localStorage.setItem('stardust_secret_drawer', JSON.stringify(configData));
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
      id="secret-drawer-simulator-root"
      style={{
        background: isEmbedded 
          ? 'linear-gradient(145deg, #180812 0%, #0c0208 100%)' 
          : 'transparent',
        border: isEmbedded ? '1.5px solid rgba(244, 63, 94, 0.35)' : 'none',
        borderRadius: isEmbedded ? '24px' : '0',
        padding: isEmbedded ? '28px 24px' : '16px 12px',
        color: '#ffffff',
        boxShadow: isEmbedded ? '0 16px 45px rgba(0, 0, 0, 0.75)' : 'none',
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
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              color: '#fda4af',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: '8px'
            }}
          >
            <SecretDrawerIcon size={14} color="#f43f5e" />
            <span>CUTIE SECRETĂ DUBLU-COMPARTIMENT • BIJUTERIE SURPRIZĂ</span>
          </div>

          <h3 style={{ fontSize: '1.55rem', margin: '0 0 6px', color: '#ffffff', fontFamily: 'Cinzel, Georgia, serif', letterSpacing: '-0.01em' }}>
            Cutie Tezaur cu Sertar Glisant Catifelat
          </h3>

          <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', maxWidth: '640px', lineHeight: 1.5 }}>
            Compartiment secret discret la baza buchetului de trandafiri: glisează lin dezvăluind inelul de logodnă sau bijuteria aleasă, așezată pe catifea imperială.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            id="btn-toggle-secret-drawer-sound"
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: soundEnabled ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: soundEnabled ? '1px solid rgba(244, 63, 94, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
              color: soundEnabled ? '#fda4af' : '#94a3b8',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap !important'
            }}
          >
            {soundEnabled ? <Volume2 size={14} color="#f43f5e" /> : <VolumeX size={14} />}
            <span>{soundEnabled ? 'Sunet Catifea Activ' : 'Sunet Oprit'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid: Left 3D Canvas / Right Configuration */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
        
        {/* Left Column: 3D Box Simulator with Sliding Drawer Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* 3D Box Display Container */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: '100%',
              maxWidth: '380px',
              minHeight: '460px',
              borderRadius: '26px',
              background: 'radial-gradient(circle at 50% 20%, #290818 0%, #10020a 100%)',
              border: '2px solid rgba(244, 63, 94, 0.45)',
              boxShadow: `0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px ${currentVelvet.shadowColor}`,
              position: 'relative',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              perspective: '1200px'
            }}
          >
            {/* Top Vault: Rose Bouquet Chamber Display */}
            <div
              style={{
                background: 'linear-gradient(180deg, rgba(20, 4, 13, 0.95) 0%, rgba(10, 2, 7, 0.95) 100%)',
                border: '1.5px solid rgba(254, 240, 138, 0.35)',
                borderRadius: '20px',
                padding: '16px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: 'inset 0 4px 15px rgba(0,0,0,0.7)',
                zIndex: 2
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.68rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fde047', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Crown size={12} color="#fde047" />
                  <span>COMPARTIMENT TRANDAFIRI</span>
                </span>
                <span style={{ fontSize: '0.68rem', background: 'rgba(244, 63, 94, 0.25)', border: '1px solid #f43f5e', color: '#fda4af', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
                  ETAJUL 1
                </span>
              </div>

              {/* Bouquet Miniature Mockup */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '12px 0 6px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'radial-gradient(circle, #e11d48, #881337)', border: '1.5px solid #fde047', boxShadow: '0 0 10px rgba(225,29,72,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkle size={14} color="#fff" />
                </div>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'radial-gradient(circle, #18181b, #000)', border: '1.5px solid #fde047', boxShadow: '0 0 12px rgba(254,240,138,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Crown size={16} color="#fde047" />
                </div>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'radial-gradient(circle, #e11d48, #881337)', border: '1.5px solid #fde047', boxShadow: '0 0 10px rgba(225,29,72,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkle size={14} color="#fff" />
                </div>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#fbcfe8', fontWeight: 600 }}>
                Trandafiri Bicolori cu Sclipici Diamant
              </div>
            </div>

            {/* Middle Divider: Secret Compartment Shelf */}
            <div style={{ margin: '14px 0', textAlign: 'center', position: 'relative' }}>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, rgba(254, 240, 138, 0.6), transparent)' }} />
              <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#1c0410', padding: '0 10px', fontSize: '0.65rem', color: '#fde047', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {isDrawerOpen ? 'SERTAR DESCHIS' : 'Bază Secretă Zăvorâtă'}
              </div>
            </div>

            {/* Bottom 3D Sliding Drawer Mechanism */}
            <div
              style={{
                position: 'relative',
                transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isDrawerOpen ? 'translateY(18px) scale(1.02)' : 'translateY(0) scale(1)',
                zIndex: isDrawerOpen ? 10 : 3
              }}
            >
              {/* Outer Drawer Front Panel */}
              <div
                style={{
                  background: isDrawerOpen ? currentVelvet.bg : 'linear-gradient(180deg, #240715 0%, #12020a 100%)',
                  border: isDrawerOpen ? `2px solid ${currentVelvet.accentColor}` : '1.5px solid rgba(254, 240, 138, 0.3)',
                  borderRadius: '18px',
                  padding: '16px',
                  boxShadow: isDrawerOpen ? `0 15px 35px rgba(0,0,0,0.9), 0 0 25px ${currentVelvet.shadowColor}` : 'inset 0 2px 6px rgba(0,0,0,0.6)',
                  cursor: 'pointer'
                }}
                onClick={handleToggleDrawer}
                title="Apasă pentru a deschide / închide sertarul"
              >
                {/* Drawer Interior (Visible when open) */}
                {isDrawerOpen ? (
                  <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.7rem', color: currentVelvet.textColor, fontWeight: 800, textTransform: 'uppercase' }}>
                        {currentVelvet.name}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#fde047', fontWeight: 800 }}>
                        {monogramInitials}
                      </span>
                    </div>

                    {/* Central Jewelry / Surprise Display Cushion */}
                    <div
                      style={{
                        background: 'rgba(0, 0, 0, 0.55)',
                        border: `1.5px dashed ${currentVelvet.accentColor}`,
                        borderRadius: '14px',
                        padding: '14px 10px',
                        margin: '8px 0',
                        position: 'relative',
                        boxShadow: 'inset 0 3px 12px rgba(0,0,0,0.8)'
                      }}
                    >
                      {/* Item Icon */}
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: currentVelvet.bg,
                          border: `2px solid ${currentContent.accentColor}`,
                          boxShadow: `0 0 20px ${currentContent.accentColor}88`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 10px',
                          position: 'relative'
                        }}
                      >
                        {selectedContentId === 'ring_solitaire' && (
                          <EngagementRingIcon size={32} color="#fde047" />
                        )}
                        {selectedContentId === 'necklace_pendant' && (
                          <DiamondIcon size={28} color="#f59e0b" />
                        )}
                        {selectedContentId === 'secret_scroll' && (
                          <ScrollIcon size={28} color="#ec4899" />
                        )}
                        {selectedContentId === 'golden_key' && (
                          <Key size={28} color="#fde047" />
                        )}
                        <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                          <Sparkle size={13} color="#ffffff" />
                        </div>
                      </div>

                      {/* Content Name */}
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>
                        {currentContent.name.split('(')[0]}
                      </div>

                      {/* Secret Inscribed Plate */}
                      <div
                        style={{
                          marginTop: '8px',
                          background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.2), rgba(245, 158, 11, 0.15))',
                          border: '1px solid rgba(254, 240, 138, 0.45)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          fontFamily: 'Cinzel, Georgia, serif',
                          fontSize: '0.82rem',
                          color: '#fef08a',
                          letterSpacing: '0.5px'
                        }}
                      >
                        „{secretMessage || 'Vrei să fii soția mea?'}”
                      </div>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '6px' }}>
                      (Apasă oriunde pe sertar pentru a-l zăvorî)
                    </div>
                  </div>
                ) : (
                  /* Closed Drawer Front Face */
                  <div style={{ textAlign: 'center', padding: '12px 6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Lock size={14} color="#fde047" />
                      <span style={{ fontSize: '0.76rem', color: '#fde047', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                        Sertar Secret Tăinuit
                      </span>
                    </div>

                    {/* Pull Handle Mockup */}
                    <div style={{ margin: '10px auto', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                      {selectedHandleId === 'knob_gold' && (
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'radial-gradient(circle, #fef08a, #d97706)', border: '1.5px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.8)' }} />
                      )}
                      {selectedHandleId === 'tassel_silk' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d97706' }} />
                          <div style={{ width: '6px', height: '18px', background: 'linear-gradient(180deg, #d97706, #92400e)', borderRadius: '2px' }} />
                        </div>
                      )}
                      {selectedHandleId === 'ribbon_satin' && (
                        <div style={{ width: '28px', height: '8px', borderRadius: '4px', background: '#18181b', border: '1px solid #fde047' }} />
                      )}
                      <span style={{ fontSize: '0.68rem', color: '#cbd5e1', marginTop: '4px' }}>
                        Trage pentru Surpriză
                      </span>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#fda4af', fontWeight: 700 }}>
                      Plăcuță cu Monogramă: [{monogramInitials}]
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Toggle Button */}
            <div style={{ marginTop: '14px', textAlign: 'center' }}>
              <button
                type="button"
                id="btn-toggle-secret-drawer-slide"
                onClick={handleToggleDrawer}
                className="btn btn-secondary btn-sm"
                style={{
                  width: '100%',
                  background: isDrawerOpen ? 'rgba(244, 63, 94, 0.2)' : 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                  border: isDrawerOpen ? '1px solid #f43f5e' : 'none',
                  color: '#ffffff',
                  padding: '9px 16px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap !important',
                  boxShadow: isDrawerOpen ? 'none' : '0 4px 15px rgba(244, 63, 94, 0.4)'
                }}
              >
                {isDrawerOpen ? (
                  <>
                    <Lock size={15} />
                    <span>Zăvorăște Sertarul Secret</span>
                  </>
                ) : (
                  <>
                    <Unlock size={15} />
                    <span>Glisează & Deschide Sertarul Secret</span>
                  </>
                )}
              </button>
            </div>

          </div>

          <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
            <span>Mecanism pe ghidaj dublu de catifea • Zăvor invizibil magnetic</span>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div>
          
          {/* 1. Drawer Content Presets */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#fbcfe8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              <SecretDrawerIcon size={15} color="#f43f5e" />
              <span>1. Alege Conținutul Sertarului Secret:</span>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {DRAWER_CONTENTS.map((content) => {
                const isSelected = content.id === selectedContentId;
                const IconComponent = content.IconComponent;
                return (
                  <div
                    key={content.id}
                    onClick={() => {
                      setSelectedContentId(content.id);
                      if (!isDrawerOpen) {
                        setIsDrawerOpen(true);
                        playSlideAudio(true);
                      }
                    }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: isSelected ? 'rgba(244, 63, 94, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? `1.5px solid ${content.accentColor}` : '1px solid rgba(255, 255, 255, 0.12)',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: isSelected ? `0 4px 18px ${content.accentColor}33` : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: isSelected ? content.accentColor : 'rgba(255, 255, 255, 0.08)',
                          color: isSelected ? '#ffffff' : '#e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isSelected ? '#ffffff' : '#e2e8f0' }}>
                            {content.name}
                          </span>
                          <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '6px', background: isSelected ? content.accentColor : 'rgba(255,255,255,0.1)', color: '#ffffff', fontWeight: 800 }}>
                            {content.badge}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                          {content.tagline}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: content.accentColor, flexShrink: 0, marginLeft: '12px' }}>
                      +{content.price} RON
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Velvet Interior Lining Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#fbcfe8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              <Crown size={15} color="#f43f5e" />
              <span>2. Căptușeală Catifea Interior Sertar:</span>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
              {VELVET_LININGS.map((velvet) => {
                const isSelected = velvet.id === selectedVelvetId;
                return (
                  <button
                    key={velvet.id}
                    type="button"
                    onClick={() => setSelectedVelvetId(velvet.id)}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? `2px solid ${velvet.accentColor}` : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: velvet.bg,
                          border: '1px solid rgba(255, 255, 255, 0.4)'
                        }}
                      />
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                        {velvet.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                      {velvet.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Drawer Pull Handle */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#fbcfe8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              <Sliders size={15} color="#f43f5e" />
              <span>3. Tip Trăgaci Sertar:</span>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
              {DRAWER_HANDLES.map((handle) => {
                const isSelected = handle.id === selectedHandleId;
                return (
                  <button
                    key={handle.id}
                    type="button"
                    onClick={() => setSelectedHandleId(handle.id)}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '2px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: isSelected ? '#ffffff' : '#cbd5e1', marginBottom: '2px' }}>
                      {handle.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                      {handle.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Text & Monogram Customization */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#fbcfe8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              <Key size={15} color="#f43f5e" />
              <span>4. Gravură Mesaj Secret & Inițiale Monogramă:</span>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
                  Mesaj Secret Gravat pe Plăcuță:
                </label>
                <input
                  type="text"
                  value={secretMessage}
                  onChange={(e) => setSecretMessage(e.target.value)}
                  maxLength={40}
                  placeholder="ex: Vrei să fii soția mea?"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1.5px solid rgba(244, 63, 94, 0.4)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
                  Inițiale Monogramă:
                </label>
                <input
                  type="text"
                  value={monogramInitials}
                  onChange={(e) => setMonogramInitials(e.target.value.toUpperCase())}
                  maxLength={8}
                  placeholder="ex: A & E"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1.5px solid rgba(244, 63, 94, 0.4)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Price Bar & Save Button */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1.5px solid rgba(244, 63, 94, 0.35)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Opțiune Cutie Secretă:
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fda4af' }}>
                +{currentContent.price} RON
              </div>
              <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                {currentContent.name.split('(')[0]} • {currentVelvet.name}
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
                id="btn-apply-secret-drawer-config"
                onClick={handleSaveAndApply}
                className="btn btn-primary btn-md"
                style={{
                  background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                  boxShadow: '0 4px 18px rgba(244, 63, 94, 0.45)',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap !important'
                }}
              >
                <SecretDrawerIcon size={16} color="#ffffff" />
                <span>Configurează Cutia Secretă (+{currentContent.price} RON)</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
