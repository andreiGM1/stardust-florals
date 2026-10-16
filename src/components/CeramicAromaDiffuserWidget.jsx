import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Check, 
  Droplets, 
  Wind, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Sparkle,
  Compass,
  CheckCircle2,
  Clock,
  Home
} from 'lucide-react';
import { 
  RoseIcon, 
  DiamondIcon, 
  CrownIcon,
  CeramicMedallionIcon,
  AromaWavesIcon,
  PerfumeBottleIcon
} from './CustomIcons';

export const AROMA_ESSENCES = [
  {
    id: 'rosa-damascena',
    name: 'Rosa Damascena de Grasse',
    tagline: 'Petale nobile de trandafir, rouă matinală & lychee dulce',
    pyramid: 'Vârf: Rouă de Mai • Inimă: Trandafir de Damasc • Bază: Lemn de cedru alb',
    intensity: 'Delicată & Proaspătă',
    diffusionDays: 30,
    price: 39,
    accentColor: '#f43f5e',
    badge: 'SIGNATURE ATELIER',
    mood: 'Romantism pur, eleganță diafană'
  },
  {
    id: 'oud-imperial',
    name: 'Oud Imperial & Trandafir Negru',
    tagline: 'Lemn nobil de agar, fum de tămâie & trandafir sălbatic misterios',
    pyramid: 'Vârf: Șofran & Bergamotă • Inimă: Trandafir Noir • Bază: Oud afumat & Ambră gri',
    intensity: 'Opulentă & Profundă',
    diffusionDays: 35,
    price: 45,
    accentColor: '#d97706',
    badge: 'OPULENȚĂ NOCTURNĂ',
    mood: 'Mister aristocratic, senzualitate regală'
  },
  {
    id: 'vanille-madagascar',
    name: 'Vanilie de Madagascar & Mosc Alb',
    tagline: 'Păstăi cremoase de vanilie bourbon, mosc catifelat & iasomie',
    pyramid: 'Vârf: Flori de portocal • Inimă: Vanilie orhidee • Bază: Mosc alb & Boabe de Tonka',
    intensity: 'Caldă & Gourmet',
    diffusionDays: 30,
    price: 39,
    accentColor: '#fbbf24',
    badge: 'CALD & CATIFELAT',
    mood: 'Confort intim, îmbrățișare dulce'
  },
  {
    id: 'ambra-sofran',
    name: 'Ambră Aurie & Șofran Regal',
    tagline: 'Șofran persan rar, ambră caldă solară & piele fină toscană',
    pyramid: 'Vârf: Șofran roșu • Inimă: Rășină de ambră • Bază: Piele de căprioară & Paciuli',
    intensity: 'Intensă & Persistentă',
    diffusionDays: 35,
    price: 45,
    accentColor: '#ea580c',
    badge: 'EDIȚIE LIMITATĂ',
    mood: 'Eleganță somptuoasă, aur lichid'
  }
];

export const DIFFUSION_LEVELS = [
  {
    id: 'intimate',
    drops: 1,
    label: 'Aura Intimă',
    radius: '1.0 metri',
    coverage: 'Zona buchetului & noptieră',
    duration: '20-25 Zile',
    desc: 'Sesizabil la apropierea de aranjament ori la deschiderea cutiei'
  },
  {
    id: 'optimal',
    drops: 3,
    label: 'Boudoir Regal (Recomandat)',
    radius: '2.5 metri',
    coverage: 'Dormitor / Cameră de zi (15-20 m²)',
    duration: '30-35 Zile',
    desc: 'Învăluie întreaga cameră într-o atmosferă caldă fără a deveni obositor'
  },
  {
    id: 'grand',
    drops: 5,
    label: 'Prezență de Salon',
    radius: '4.5 metri',
    coverage: 'Living deschis / Spațiu amplu (30-45 m²)',
    duration: '35-40 Zile',
    desc: 'Difuzie puternică de lungă durată, persistentă la fiecare intrare în încăpere'
  }
];

export default function CeramicAromaDiffuserWidget({
  isEmbedded = false,
  onApplyConfig = null,
  onClose = null,
  initialData = null
}) {
  const [selectedEssenceId, setSelectedEssenceId] = useState(
    initialData?.essenceId || AROMA_ESSENCES[0].id
  );
  const [selectedLevelId, setSelectedLevelId] = useState(
    initialData?.levelId || DIFFUSION_LEVELS[1].id
  );
  const [isApplyingDrops, setIsApplyingDrops] = useState(false);
  const [dropletCount, setDropletCount] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [appliedTimestamp, setAppliedTimestamp] = useState(Date.now());

  const audioCtxRef = useRef(null);

  const currentEssence = AROMA_ESSENCES.find(e => e.id === selectedEssenceId) || AROMA_ESSENCES[0];
  const currentLevel = DIFFUSION_LEVELS.find(l => l.id === selectedLevelId) || DIFFUSION_LEVELS[1];

  // Synthesize realistic acoustic perfume droplet sound
  const playPerfumeDropletSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      // High-pitched glassy droplet impact
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);

      // Warm porcelain body resonance
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(420, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(280, now + 0.3);

      gain2.gain.setValueAtTime(0.12, now + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now + 0.04);
      osc2.stop(now + 0.38);
    } catch {
      // Audio fallback silent
    }
  };

  // Synthesize warm ambient aroma expansion wave
  const playAromaWaveSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.9);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(1200, now + 0.5);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.0);
    } catch {
      // Audio fallback silent
    }
  };

  const handleApplyDroplets = () => {
    setIsApplyingDrops(true);
    playPerfumeDropletSound();
    setTimeout(() => {
      playPerfumeDropletSound();
    }, 180);
    setTimeout(() => {
      playAromaWaveSound();
      setIsApplyingDrops(false);
      setAppliedTimestamp(Date.now());
    }, 450);
  };

  const handleSaveAndApply = () => {
    const configData = {
      essenceId: currentEssence.id,
      essenceName: currentEssence.name,
      essenceTagline: currentEssence.tagline,
      levelId: currentLevel.id,
      levelLabel: currentLevel.label,
      radius: currentLevel.radius,
      coverage: currentLevel.coverage,
      drops: currentLevel.drops,
      diffusionDays: currentEssence.diffusionDays,
      totalPrice: currentEssence.price
    };

    try {
      localStorage.setItem('stardust_aroma_medallion', JSON.stringify(configData));
    } catch {
      // Ignore localStorage quotas
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
      id="ceramic-aroma-diffuser-widget-root"
      style={{
        background: isEmbedded 
          ? 'linear-gradient(145deg, #180914 0%, #0c030a 100%)' 
          : 'transparent',
        border: isEmbedded ? '1.5px solid rgba(244, 63, 94, 0.35)' : 'none',
        borderRadius: isEmbedded ? '24px' : '0',
        padding: isEmbedded ? '28px 24px' : '16px 12px',
        color: '#ffffff',
        boxShadow: isEmbedded ? '0 16px 45px rgba(0, 0, 0, 0.65)' : 'none',
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
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#fda4af',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            <CeramicMedallionIcon size={14} color="#f43f5e" />
            <span>AROMATERAPIE REGALĂ • DIFUZOR PASIV 30 ZILE</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)', margin: '0 0 6px', color: '#ffffff', fontFamily: 'Cinzel, Georgia, serif', letterSpacing: '0.3px' }}>
            Medalion Ceramic Poros & Esență Pură de Grasse
          </h2>

          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: 1.55, maxWidth: '720px' }}>
            Descoperă magia aromaterapiei nobile: un medalion artizanal din biscuite de porțelan Limoges ascuns în baza cutiei de catifea, impregnat cu esențe pure fără flacără, ce parfumează camera timp de o lună întreagă.
          </p>
        </div>

        {/* Audio Mute/Unmute */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn btn-secondary btn-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '12px',
              padding: '6px 12px',
              color: '#ffffff',
              fontSize: '0.78rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            title={soundEnabled ? 'Dezactivează sunetul' : 'Activează sunetul'}
          >
            {soundEnabled ? <Volume2 size={14} color="#fda4af" /> : <VolumeX size={14} color="#94a3b8" />}
            <span>{soundEnabled ? 'Sunet Activ' : 'Mut'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Column (Medallion & Diffusion Simulator) | Right Column (Essences & Controls) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        
        {/* Left Column: Visual Medallion & Room Diffusion Map */}
        <div
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(35, 12, 30, 0.95) 0%, rgba(12, 4, 10, 0.98) 100%)',
            border: `1.5px solid ${currentEssence.accentColor}55`,
            borderRadius: '20px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            boxShadow: `0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px ${currentEssence.accentColor}22`,
            overflow: 'hidden'
          }}
        >
          {/* Animated Glow Aura */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: currentLevel.drops === 1 ? '180px' : currentLevel.drops === 3 ? '260px' : '320px',
              height: currentLevel.drops === 1 ? '180px' : currentLevel.drops === 3 ? '260px' : '320px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${currentEssence.accentColor}33 0%, transparent 70%)`,
              pointerEvents: 'none',
              transition: 'all 0.5s ease',
              animation: 'pulseGlow 3s infinite ease-in-out'
            }}
          />

          {/* Medallion Inspection Header */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', zIndex: 2 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: currentEssence.accentColor, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AromaWavesIcon size={14} color={currentEssence.accentColor} />
              <span>SIMULARE VIZUALĂ DIFUZIE</span>
            </span>
            <span style={{ fontSize: '0.72rem', color: '#a7f3d0', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.35)', fontWeight: 700 }}>
              30 Zile Pasiv
            </span>
          </div>

          {/* The Porous Ceramic Disc Graphic */}
          <div
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #fbf9f5 0%, #e8e3d9 70%, #d4ccbd 100%)',
              border: '4px solid #ffffff',
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), inset 0 2px 6px rgba(255,255,255,0.9), 0 0 20px ${currentEssence.accentColor}44`,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '12px 0 20px',
              transition: 'transform 0.3s ease',
              transform: isApplyingDrops ? 'scale(1.04)' : 'scale(1)'
            }}
          >
            {/* Silk Ribbon Hanging Loop on Top */}
            <div
              style={{
                position: 'absolute',
                top: '-22px',
                width: '18px',
                height: '32px',
                border: `3px solid ${currentEssence.accentColor}`,
                borderRadius: '8px 8px 0 0',
                background: 'rgba(255, 255, 255, 0.2)',
                zIndex: 1
              }}
            />

            {/* Beaded Edge Rim */}
            <div
              style={{
                position: 'absolute',
                inset: '6px',
                borderRadius: '50%',
                border: '1.5px dashed #b8ad9b',
                pointerEvents: 'none'
              }}
            />

            {/* Central Embossed Atelier Crest */}
            <div style={{ textAlign: 'center', color: '#574838', zIndex: 2, padding: '0 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
                <RoseIcon size={24} color="#8a2036" />
              </div>
              <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '0.68rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase', color: '#3d3023' }}>
                STARDUST
              </div>
              <div style={{ fontSize: '0.52rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#7a6854', fontWeight: 700 }}>
                PORCELAINE DE GRASSE
              </div>
            </div>

            {/* Essence Droplet Absorption Stain */}
            <div
              key={appliedTimestamp}
              style={{
                position: 'absolute',
                width: currentLevel.drops === 1 ? '40px' : currentLevel.drops === 3 ? '70px' : '95px',
                height: currentLevel.drops === 1 ? '40px' : currentLevel.drops === 3 ? '70px' : '95px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${currentEssence.accentColor}44 0%, ${currentEssence.accentColor}11 70%, transparent 100%)`,
                animation: 'absorbDrop 1.2s ease-out forwards',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Interactive Droplet Trigger Button */}
          <button
            type="button"
            id="btn-apply-aroma-drops"
            onClick={handleApplyDroplets}
            className="btn btn-secondary btn-sm"
            style={{
              background: `linear-gradient(135deg, ${currentEssence.accentColor}22, rgba(255, 255, 255, 0.05))`,
              border: `1.5px solid ${currentEssence.accentColor}`,
              color: '#ffffff',
              borderRadius: '24px',
              padding: '8px 18px',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginBottom: '18px',
              boxShadow: `0 4px 14px ${currentEssence.accentColor}33`,
              whiteSpace: 'nowrap'
            }}
          >
            <Droplets size={15} color={currentEssence.accentColor} />
            <span>Aplică {currentLevel.drops} Picături ({currentEssence.name.split('&')[0].trim()})</span>
          </button>

          {/* Architectural Room Diffusion Reach Bar */}
          <div
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '14px 16px',
              zIndex: 2
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', marginBottom: '8px' }}>
              <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Home size={13} color="#94a3b8" />
                <span>Raza de Acoperire:</span>
              </span>
              <strong style={{ color: currentEssence.accentColor }}>{currentLevel.radius} ({currentLevel.coverage})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#94a3b8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} color="#10b981" />
                <span>Persistență pasivă:</span>
              </span>
              <span style={{ color: '#ecfdf5', fontWeight: 700 }}>{currentLevel.duration}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Essence Selector & Diffusion Intensity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Section: Choose Grasse Essence Oil */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fbcfe8', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              1. Alege Esența Pură de Grasse (Franța):
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {AROMA_ESSENCES.map((essence) => {
                const isSelected = selectedEssenceId === essence.id;
                return (
                  <div
                    key={essence.id}
                    onClick={() => {
                      setSelectedEssenceId(essence.id);
                      playPerfumeDropletSound();
                    }}
                    style={{
                      background: isSelected 
                        ? `linear-gradient(135deg, ${essence.accentColor}22 0%, rgba(255, 255, 255, 0.05) 100%)`
                        : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected 
                        ? `2px solid ${essence.accentColor}`
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? `0 6px 18px ${essence.accentColor}25` : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: `2px solid ${essence.accentColor}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isSelected ? essence.accentColor : 'transparent'
                          }}
                        >
                          {isSelected && <Check size={12} color="#ffffff" />}
                        </div>
                        <strong style={{ fontSize: '0.94rem', color: isSelected ? '#ffffff' : '#f1f5f9' }}>
                          {essence.name}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', background: `${essence.accentColor}25`, color: essence.accentColor, border: `1px solid ${essence.accentColor}55` }}>
                          {essence.badge}
                        </span>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fbcfe8' }}>
                          +{essence.price} RON
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginLeft: '26px', lineHeight: 1.4 }}>
                      {essence.tagline}
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic', marginLeft: '26px', marginTop: '4px' }}>
                      {essence.pyramid}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Choose Diffusion Radius / Intensity */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fbcfe8', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              2. Intensitate & Rază de Difuzie Recomandată:
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {DIFFUSION_LEVELS.map((level) => {
                const isSelected = selectedLevelId === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => {
                      setSelectedLevelId(level.id);
                      setDropletCount(level.drops);
                      playPerfumeDropletSound();
                    }}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1.5px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '14px',
                      padding: '12px 10px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 14px rgba(244, 63, 94, 0.25)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: isSelected ? '#fda4af' : '#ffffff' }}>
                      {level.drops} {level.drops === 1 ? 'Picătură' : 'Picături'}
                    </div>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, margin: '2px 0', color: isSelected ? '#fbcfe8' : '#cbd5e1' }}>
                      {level.label.split('(')[0].trim()}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                      {level.radius}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Perks Box: Mini Pipette Bottle Included */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '16px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f43f5e, #be123c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(244, 63, 94, 0.35)'
              }}
            >
              <PerfumeBottleIcon size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fda4af', marginBottom: '2px' }}>
                Mini-Flacon 5ml cu Pipetă Inclus în Pachet
              </div>
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Permite reîmprospătarea medalionului ceramic după cele 30 de zile inițiale, oferind până la 6 luni de aromă nobilă cumulată.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Summary & Action Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          paddingTop: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div>
          <div style={{ fontSize: '0.74rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            PACHET CERAMIC SELECTAT:
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Cinzel, Georgia, serif' }}>
            +{currentEssence.price} RON{' '}
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#a7f3d0' }}>
              ({currentEssence.name})
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-md"
              style={{
                borderRadius: '14px',
                padding: '10px 18px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Închide
            </button>
          )}

          <button
            type="button"
            id="btn-apply-aroma-medallion-config"
            onClick={handleSaveAndApply}
            className="btn btn-primary btn-md"
            style={{
              borderRadius: '14px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(244, 63, 94, 0.45)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <CeramicMedallionIcon size={18} color="#ffffff" />
            <span>Adaugă Medalionul Ceramic ({currentEssence.price} RON)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
