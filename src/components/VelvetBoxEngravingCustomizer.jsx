import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Check, 
  Crown, 
  Heart, 
  Type, 
  Palette, 
  ShieldCheck, 
  ArrowRight, 
  Box, 
  Layers,
  Circle,
  Hexagon
} from 'lucide-react';
import { playLuxuryChime, playHeartPopSound } from '../utils/audioAlert';
import { useCurrency } from '../context/CurrencyContext';
import { FleurDeLisIcon, CrownIcon, ColumnIcon, QuillIcon, SparkleIcon } from './CustomIcons';

export const BOX_SHAPES = [
  {
    id: 'round-hatbox',
    name: 'Cutie Rotundă Grand Hatbox',
    sub: 'Clasică de salon parizian (Ø 30 cm)',
    geometry: 'circle',
    borderRadius: '50%'
  },
  {
    id: 'hexagonal-royal',
    name: 'Cutie Hexagonală Regală',
    sub: 'Arhitectură geometrică de epocă',
    geometry: 'hexagon',
    borderRadius: '24px'
  },
  {
    id: 'heart-imperial',
    name: 'Cutie Inimă Imperială',
    sub: 'Contur sculptat de catifea romantică',
    geometry: 'heart',
    borderRadius: '30px'
  }
];

export const VELVET_COLORS = [
  {
    id: 'noir-absolu',
    name: 'Noir Absolu',
    sub: 'Catifea neagră densă cu reflexii mate',
    bg: 'radial-gradient(circle at 35% 30%, #27272a, #18181b 55%, #09090b 100%)',
    shadow: 'rgba(0, 0, 0, 0.7)'
  },
  {
    id: 'bordeaux-imperial',
    name: 'Bordeaux Imperial',
    sub: 'Vișiniu nobil aristocratic',
    bg: 'radial-gradient(circle at 35% 30%, #9f1239, #881337 55%, #4c0519 100%)',
    shadow: 'rgba(136, 19, 55, 0.5)'
  },
  {
    id: 'champagne-ecru',
    name: 'Champagne Écru',
    sub: 'Mătase-crem caldă de nuntă',
    bg: 'radial-gradient(circle at 35% 30%, #fef3c7, #fde68a 55%, #d97706 100%)',
    shadow: 'rgba(217, 119, 6, 0.35)'
  },
  {
    id: 'emerald-regal',
    name: 'Smarald Regal',
    sub: 'Verde smarald profund de palat',
    bg: 'radial-gradient(circle at 35% 30%, #047857, #064e3b 55%, #022c22 100%)',
    shadow: 'rgba(4, 120, 87, 0.5)'
  },
  {
    id: 'rose-poudre',
    name: 'Roz Pudrat Romantique',
    sub: 'Catifea fină trandafirie delicată',
    bg: 'radial-gradient(circle at 35% 30%, #fbcfe8, #f472b6 55%, #9d174d 100%)',
    shadow: 'rgba(244, 114, 182, 0.4)'
  }
];

export const METAL_PLAQUES = [
  {
    id: 'brushed-gold',
    name: 'Alamă Aurită Șlefuită (24K Gold)',
    sub: 'Reflexii calde de aur regal',
    bg: 'linear-gradient(135deg, #d4af37 0%, #fff275 25%, #aa771c 50%, #ffd700 75%, #bf953f 100%)',
    border: '2px solid #854d0e',
    textColor: '#3a2004',
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.7)',
    rivetColor: '#78350f'
  },
  {
    id: 'mirror-silver',
    name: 'Argint Oglindă (Chrome Silver)',
    sub: 'Placă cromată cu luciu de diamant',
    bg: 'linear-gradient(135deg, #cbd5e1 0%, #ffffff 30%, #94a3b8 50%, #f8fafc 75%, #64748b 100%)',
    border: '2px solid #475569',
    textColor: '#0f172a',
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.9)',
    rivetColor: '#334155'
  },
  {
    id: 'brushed-rose-gold',
    name: 'Cupru Rose Gold (Noble Bronze)',
    sub: 'Ton cald roz-arămiu strălucitor',
    bg: 'linear-gradient(135deg, #fb7185 0%, #ffe4e6 30%, #be123c 50%, #fda4af 75%, #881337 100%)',
    border: '2px solid #9f1239',
    textColor: '#4c0519',
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.6)',
    rivetColor: '#70092b'
  }
];

export const ENGRAVING_FONTS = [
  {
    id: 'cinzel',
    name: 'Majuscule Imperiale (Cinzel)',
    family: "'Cinzel', serif",
    letterSpacing: '2.5px',
    transform: 'uppercase',
    weight: '800',
    Icon: ColumnIcon
  },
  {
    id: 'playfair',
    name: 'Caligrafie Cursivă (Playfair)',
    family: "'Playfair Display', serif",
    fontStyle: 'italic',
    letterSpacing: '0.5px',
    weight: '700',
    Icon: QuillIcon
  },
  {
    id: 'modern',
    name: 'All-Caps Minimalist',
    family: "'Plus Jakarta Sans', sans-serif",
    letterSpacing: '1.5px',
    transform: 'uppercase',
    weight: '800',
    Icon: SparkleIcon
  }
];

export const ENGRAVING_PRESETS = [
  { line1: 'A & M', line2: '24.10.2023', line3: 'PENTRU TOTDEAUNA' },
  { line1: 'ANDREEA', line2: 'LA MULȚI ANI!', line3: 'EȘTI TOTUL PENTRU MINE' },
  { line1: 'SOȚIA MEA', line2: '5 ANI DE IUBIRE', line3: 'MULȚUMESC CĂ EȘTI A MEA' },
  { line1: 'MAMA', line2: 'CEA MAI IUBITĂ', line3: 'RECUNOȘTINȚĂ ETERNĂ' }
];

export default function VelvetBoxEngravingCustomizer({ onApplyConfig, initialData, isEmbeddedInCheckout = false }) {
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [selectedShape, setSelectedShape] = useState(initialData?.shape || 'round-hatbox');
  const [selectedColor, setSelectedColor] = useState(initialData?.color || 'bordeaux-imperial');
  const [selectedMetal, setSelectedMetal] = useState(initialData?.metal || 'brushed-gold');
  const [selectedFont, setSelectedFont] = useState(initialData?.font || 'cinzel');
  
  const [line1, setLine1] = useState(initialData?.line1 || 'A & M');
  const [line2, setLine2] = useState(initialData?.line2 || '24.10.2023');
  const [line3, setLine3] = useState(initialData?.line3 || 'PENTRU TOTDEAUNA');

  const currentShape = BOX_SHAPES.find(s => s.id === selectedShape) || BOX_SHAPES[0];
  const currentColor = VELVET_COLORS.find(c => c.id === selectedColor) || VELVET_COLORS[1];
  const currentMetal = METAL_PLAQUES.find(m => m.id === selectedMetal) || METAL_PLAQUES[0];
  const currentFont = ENGRAVING_FONTS.find(f => f.id === selectedFont) || ENGRAVING_FONTS[0];

  const handleApplyPreset = (preset) => {
    playLuxuryChime();
    setLine1(preset.line1);
    setLine2(preset.line2);
    setLine3(preset.line3);
  };

  const handleShapeSelect = (id) => {
    playLuxuryChime();
    setSelectedShape(id);
  };

  const handleColorSelect = (id) => {
    playLuxuryChime();
    setSelectedColor(id);
  };

  const handleMetalSelect = (id) => {
    playLuxuryChime();
    setSelectedMetal(id);
  };

  const handleFontSelect = (id) => {
    playLuxuryChime();
    setSelectedFont(id);
  };

  const handleConfirm = () => {
    playLuxuryChime();
    const config = {
      shape: currentShape,
      color: currentColor,
      metal: currentMetal,
      font: currentFont,
      line1,
      line2,
      line3,
      price: 49
    };

    if (onApplyConfig) {
      onApplyConfig(config);
    } else {
      const p1 = encodeURIComponent(line1);
      const p2 = encodeURIComponent(line2);
      const p3 = encodeURIComponent(line3);
      navigate(`/checkout?bouquet=signature-dual-noir-rouge&addon=cutie-catifea-gravata&boxShape=${selectedShape}&boxColor=${selectedColor}&boxMetal=${selectedMetal}&line1=${p1}&line2=${p2}&line3=${p3}`);
    }
  };

  return (
    <div 
      id="velvet-box-customizer-card"
      style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-light)',
        borderRadius: '28px',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Header Bar */}
      <div 
        style={{
          background: 'radial-gradient(circle at 50% 0%, #1f0b12, #090204)',
          color: '#ffffff',
          padding: '28px 32px 22px',
          borderBottom: '1px solid rgba(225, 29, 72, 0.25)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225, 29, 72, 0.2)', border: '1px solid rgba(254, 205, 211, 0.3)', padding: '5px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, color: '#fda4af', marginBottom: '8px' }}>
              <Crown size={14} color="#fef08a" />
              <span>ATELIER DE ARTIZANAT • GRAVURĂ LASER VIP</span>
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '1.65rem', margin: 0, fontFamily: 'Playfair Display, serif' }}>
              Cutie Regală de Catifea cu Plăcuță Metalică Gravată
            </h3>
            <p style={{ color: '#fbcfe8', fontSize: '0.9rem', margin: '6px 0 0', opacity: 0.9 }}>
              Personalizată cu laser de mare precizie în atelier pe plăcuță de alamă sau crom șlefuit.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.74rem', color: '#fda4af', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
              AMBALAJ DE LUX ETALAT
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fef08a' }}>
                +{formatPrice(49)}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>(10 €)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Visual Box & Plaque Stage */}
      <div 
        id="velvet-box-stage"
        style={{
          background: 'radial-gradient(circle at 50% 45%, #2a0815 0%, #110207 70%, #050002 100%)',
          minHeight: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '40px 20px',
          overflow: 'hidden'
        }}
      >
        {/* Ambient velvet glow */}
        <div 
          style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: currentColor.bg,
            filter: 'blur(70px)',
            opacity: 0.35,
            pointerEvents: 'none'
          }}
        />

        {/* 3D Velvet Box Body */}
        <div 
          id="velvet-box-body"
          style={{
            width: '100%',
            maxWidth: '380px',
            height: '240px',
            background: currentColor.bg,
            borderRadius: currentShape.id === 'round-hatbox' 
              ? '36px 36px 48px 48px' 
              : (currentShape.id === 'hexagonal-royal' ? '28px' : '40px 40px 30px 30px'),
            boxShadow: `0 24px 50px ${currentColor.shadow}, inset 0 3px 6px rgba(255,255,255,0.25), inset 0 -8px 16px rgba(0,0,0,0.7)`,
            position: 'relative',
            borderTop: '2px solid rgba(255,255,255,0.25)',
            borderBottom: '3px solid rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Box Lid Rim Accent */}
          <div 
            style={{
              position: 'absolute',
              top: '-14px',
              left: '10px',
              right: '10px',
              height: '26px',
              background: currentColor.bg,
              borderRadius: '20px',
              borderTop: '2px solid rgba(255,255,255,0.3)',
              borderBottom: '2px solid rgba(0,0,0,0.4)',
              boxShadow: '0 6px 14px rgba(0,0,0,0.5)'
            }}
          />

          {/* Golden Ribbon Accent Wrapped Around Box */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '38px',
              transform: 'translateY(-50%)',
              background: 'linear-gradient(90deg, #b38728, #fcf6ba 50%, #aa771c)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.5)',
              opacity: 0.85
            }}
          />

          {/* Laser-Engraved Metal Plaque (Centerpiece) */}
          <div 
            id="engraved-metal-plaque"
            style={{
              position: 'relative',
              zIndex: 3,
              width: '84%',
              maxWidth: '300px',
              background: currentMetal.bg,
              border: currentMetal.border,
              borderRadius: '8px',
              padding: '16px 20px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.4)',
              textAlign: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Shimmer glint animation over metal */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)',
                animation: 'plaqueGlint 5s ease-in-out infinite',
                pointerEvents: 'none'
              }}
            />

            {/* 4 Corner Engraved Rivets / Screws */}
            <div style={{ position: 'absolute', top: '5px', left: '6px', color: currentMetal.rivetColor }}><FleurDeLisIcon size={12} color={currentMetal.rivetColor} /></div>
            <div style={{ position: 'absolute', top: '5px', right: '6px', color: currentMetal.rivetColor }}><FleurDeLisIcon size={12} color={currentMetal.rivetColor} /></div>
            <div style={{ position: 'absolute', bottom: '5px', left: '6px', color: currentMetal.rivetColor }}><FleurDeLisIcon size={12} color={currentMetal.rivetColor} /></div>
            <div style={{ position: 'absolute', bottom: '5px', right: '6px', color: currentMetal.rivetColor }}><FleurDeLisIcon size={12} color={currentMetal.rivetColor} /></div>

            {/* Engraved Typography Lines */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Line 1: Monogram / Name */}
              <div 
                id="plaque-text-line1"
                style={{
                  fontFamily: currentFont.family,
                  fontStyle: currentFont.fontStyle || 'normal',
                  fontWeight: currentFont.weight,
                  letterSpacing: currentFont.letterSpacing,
                  textTransform: currentFont.transform || 'none',
                  color: currentMetal.textColor,
                  textShadow: currentMetal.textShadow,
                  fontSize: '1.25rem',
                  lineHeight: 1.2,
                  marginBottom: '4px'
                }}
              >
                {line1 || 'NUME / MONOGRAMĂ'}
              </div>

              {/* Decorative separator line */}
              <div 
                style={{
                  width: '60px',
                  height: '1px',
                  background: currentMetal.textColor,
                  opacity: 0.6,
                  margin: '4px auto 6px'
                }}
              />

              {/* Line 2: Date / Occasion */}
              <div 
                id="plaque-text-line2"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  letterSpacing: '2px',
                  color: currentMetal.textColor,
                  textShadow: currentMetal.textShadow,
                  marginBottom: '2px'
                }}
              >
                {line2 || 'DATA ANIVERSARĂ'}
              </div>

              {/* Line 3: Intimate Dedication */}
              <div 
                id="plaque-text-line3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: '0.74rem',
                  letterSpacing: '0.5px',
                  color: currentMetal.textColor,
                  textShadow: currentMetal.textShadow,
                  opacity: 0.95
                }}
              >
                {line3 || 'MESAJ PERSONALIZAT'}
              </div>
            </div>
          </div>
        </div>

        {/* Live Badge Below Box */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '22px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', padding: '5px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)', color: '#fda4af', fontSize: '0.78rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#fef08a" />
          <span>Cutie de Catifea {currentColor.name.split(' ')[1]} • Plăcuță {currentMetal.name.split(' ')[1]} Gravată Laser</span>
        </div>
      </div>

      {/* Controls & Customization Form */}
      <div style={{ padding: '28px 32px' }}>
        {/* 1. Laser Engraving Inputs */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <label style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Type size={16} color="#e11d48" />
              <span>1. Text Gravat pe Plăcuța Metalică (Laser Precision)</span>
            </label>
            <span style={{ fontSize: '0.74rem', color: '#059669', background: '#ecfdf5', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
              GRAVURĂ PERMANENTĂ
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Linia 1: Nume sau Monogramă
              </span>
              <input 
                id="input-plaque-line1"
                type="text" 
                maxLength={20}
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                placeholder="Ex: A & M sau ANDREEA"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', fontWeight: 700 }}
              />
            </div>

            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Linia 2: Dată sau Ocazie
              </span>
              <input 
                id="input-plaque-line2"
                type="text" 
                maxLength={25}
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                placeholder="Ex: 24.10.2023 sau LA MULȚI ANI!"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', fontWeight: 700 }}
              />
            </div>

            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Linia 3: Mesaj / Dedicație
              </span>
              <input 
                id="input-plaque-line3"
                type="text" 
                maxLength={35}
                value={line3}
                onChange={(e) => setLine3(e.target.value)}
                placeholder="Ex: PENTRU TOTDEAUNA"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', fontWeight: 700 }}
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, alignSelf: 'center', marginRight: '4px' }}>
              Modele gravură:
            </span>
            {ENGRAVING_PRESETS.map((pr, idx) => (
              <button
                key={idx}
                id={`btn-preset-engraving-${idx}`}
                onClick={() => handleApplyPreset(pr)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-main)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {pr.line1} • {pr.line2}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Box Geometry Selection */}
        <div style={{ marginBottom: '22px' }}>
          <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Box size={16} color="#e11d48" />
            <span>2. Geometria Cutiei de Catifea</span>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {BOX_SHAPES.map(shape => {
              const isSelected = selectedShape === shape.id;
              return (
                <button
                  key={shape.id}
                  id={`btn-box-shape-${shape.id}`}
                  onClick={() => handleShapeSelect(shape.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    border: isSelected ? '2px solid var(--rose-600)' : '1px solid var(--border-light)',
                    background: isSelected ? 'var(--rose-50)' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)', display: 'block' }}>
                      {shape.name}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {shape.sub}
                    </span>
                  </div>
                  {isSelected && <Check size={16} color="#e11d48" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Velvet Fabric Color Selection */}
        <div style={{ marginBottom: '22px' }}>
          <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Palette size={16} color="#e11d48" />
            <span>3. Nuanța Catifelei de Atelier</span>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {VELVET_COLORS.map(color => {
              const isSelected = selectedColor === color.id;
              return (
                <button
                  key={color.id}
                  id={`btn-velvet-color-${color.id}`}
                  onClick={() => handleColorSelect(color.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    border: isSelected ? '2px solid var(--rose-600)' : '1px solid var(--border-light)',
                    background: isSelected ? 'var(--rose-50)' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span 
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: color.bg,
                      border: '1px solid #ccc',
                      flexShrink: 0,
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)', display: 'block' }}>
                      {color.name}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {color.sub}
                    </span>
                  </div>
                  {isSelected && <Check size={16} color="#e11d48" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Metal Plaque Finish & Font Selection */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '26px' }}>
          {/* Metal Finish */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Sparkles size={16} color="#e11d48" />
              <span>4. Finisajul Plăcuței Metalice</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {METAL_PLAQUES.map(metal => {
                const isSelected = selectedMetal === metal.id;
                return (
                  <button
                    key={metal.id}
                    id={`btn-metal-plaque-${metal.id}`}
                    onClick={() => handleMetalSelect(metal.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid var(--rose-600)' : '1px solid var(--border-light)',
                      background: isSelected ? 'var(--rose-50)' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                        {metal.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {metal.sub}
                      </span>
                    </div>
                    {isSelected && <Check size={16} color="#e11d48" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Engraving Font */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Type size={16} color="#e11d48" />
              <span>5. Tipografia Gravurii Laser</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ENGRAVING_FONTS.map(font => {
                const isSelected = selectedFont === font.id;
                const FontIcon = font.Icon;
                return (
                  <button
                    key={font.id}
                    id={`btn-engraving-font-${font.id}`}
                    onClick={() => handleFontSelect(font.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid var(--rose-600)' : '1px solid var(--border-light)',
                      background: isSelected ? 'var(--rose-50)' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontFamily: font.family, fontStyle: font.fontStyle || 'normal', fontSize: '0.9rem', fontWeight: font.weight, color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      {FontIcon && <FontIcon size={15} color="var(--rose-600)" />}
                      <span>{font.name}</span>
                    </span>
                    {isSelected && <Check size={16} color="#e11d48" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA Action Bar */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-light)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CrownIcon size={26} color="var(--rose-600)" />
            <div>
              <strong style={{ fontSize: '0.94rem', color: 'var(--text-main)', display: 'block' }}>
                Cutie de Catifea + Plăcuță Metalică Gravată
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Include placare manuală, gravură laser și sigiliu Stardust
              </span>
            </div>
          </div>

          <button
            id="btn-apply-velvet-box-cta"
            onClick={handleConfirm}
            className="btn btn-primary btn-lg"
            style={{
              padding: '14px 28px',
              fontSize: '0.98rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(225, 29, 72, 0.3)'
            }}
          >
            <span>{isEmbeddedInCheckout ? 'Confirmă Cutia Gravată (+49 RON)' : 'Comandă Buchetul în Cutie Gravată (+49 RON)'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
