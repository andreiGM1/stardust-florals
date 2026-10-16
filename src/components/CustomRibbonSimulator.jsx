import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Check, 
  Crown, 
  Heart, 
  Type, 
  Palette, 
  Eye, 
  ArrowRight, 
  Copy, 
  CheckCircle2,
  RefreshCw,
  Gift,
  X
} from 'lucide-react';
import { playLuxuryChime, playHeartPopSound } from '../utils/audioAlert';
import { useCurrency } from '../context/CurrencyContext';
import { 
  CrownIcon, 
  RingIcon, 
  FleurDeLisIcon, 
  SparkleIcon, 
  RibbonIcon, 
  RoseIcon, 
  QuillIcon, 
  ColumnIcon,
  DiamondIcon
} from './CustomIcons';

export const RIBBON_FABRICS = [
  {
    id: 'noir-satin',
    name: 'Noir Onyx Satin',
    sub: 'Satin Negru Mat Adânc',
    bg: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #0c0a09 100%)',
    texture: 'satin-noir',
    foilSuitability: 'Contrast Maxim de Lux'
  },
  {
    id: 'rouge-velvet',
    name: 'Rouge Rubis Catifea',
    sub: 'Catifea Vișinie Regală',
    bg: 'linear-gradient(135deg, #881337 0%, #9f1239 50%, #4c0519 100%)',
    texture: 'velvet-rouge',
    foilSuitability: 'Pasiune & Eleganță'
  },
  {
    id: 'champagne-silk',
    name: 'Champagne Silk Mătase',
    sub: 'Mătase Alb-Perlat Aurit',
    bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef9c3 100%)',
    texture: 'silk-champagne',
    foilSuitability: 'Puritate de Nuntă'
  },
  {
    id: 'rose-poudre',
    name: 'Roz Pudrat Romantique',
    sub: 'Satin Fin Trandafiriu',
    bg: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 50%, #f9a8d4 100%)',
    texture: 'satin-rose',
    foilSuitability: 'Feminitate Delicată'
  },
  {
    id: 'emerald-velvet',
    name: 'Verde Smarald Imperial',
    sub: 'Catifea Nobiliară de Epocă',
    bg: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #022c22 100%)',
    texture: 'velvet-emerald',
    foilSuitability: 'Prestigiu Aristocratic'
  }
];

export const FOIL_FINISHES = [
  {
    id: 'gold-24k',
    name: 'Folie Aur 24K Lucios',
    gradient: 'linear-gradient(90deg, #d4af37, #fff275, #aa771c, #ffd700, #fffae0)',
    color: '#ffd700',
    shadow: '0 0 6px rgba(255, 215, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.9)'
  },
  {
    id: 'silver-cosmic',
    name: 'Folie Argint Diamant',
    gradient: 'linear-gradient(90deg, #e2e8f0, #ffffff, #94a3b8, #f8fafc)',
    color: '#ffffff',
    shadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold Shimmer',
    gradient: 'linear-gradient(90deg, #f43f5e, #fda4af, #e11d48, #ffe4e6)',
    color: '#fda4af',
    shadow: '0 0 6px rgba(244, 63, 94, 0.7), 0 1px 2px rgba(0, 0, 0, 0.9)'
  }
];

export const FONT_STYLES = [
  {
    id: 'cursive',
    name: 'Caligrafie Regală',
    family: "'Playfair Display', cursive, serif",
    style: 'italic',
    weight: '700',
    letterSpacing: '0.5px',
    Icon: QuillIcon
  },
  {
    id: 'imperial',
    name: 'Majuscule Imperiale',
    family: "'Cinzel', serif",
    style: 'normal',
    weight: '800',
    letterSpacing: '2.5px',
    transform: 'uppercase',
    Icon: ColumnIcon
  },
  {
    id: 'modern',
    name: 'Modern Romantique',
    family: "'Plus Jakarta Sans', sans-serif",
    style: 'normal',
    weight: '700',
    letterSpacing: '1px',
    Icon: SparkleIcon
  }
];

export const EMBLEMS = [
  { id: 'crown', label: 'Coroană Regală', Icon: CrownIcon },
  { id: 'hearts', label: 'Inimă Simbol', Icon: Heart },
  { id: 'ring', label: 'Inel Solitar', Icon: RingIcon },
  { id: 'fleur', label: 'Fleur-de-lis', Icon: FleurDeLisIcon },
  { id: 'star', label: 'Stea Radiantă', Icon: SparkleIcon },
  { id: 'none', label: 'Fără emblemă', Icon: null }
];

export const QUICK_PRESETS = [
  'Te iubesc infinit, viața mea!',
  'La mulți ani, regina mea!',
  '24.10.2023 — Pentru totdeauna',
  'Cea mai minunată mămică din lume',
  'Ești totul pentru mine',
  'Vrei să fii soția mea?'
];

export default function CustomRibbonSimulator({ onApplyRibbon, initialData, isEmbeddedInCheckout = false }) {
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [text, setText] = useState(initialData?.text || 'Te iubesc mai mult în fiecare zi, Ana');
  const [selectedFabric, setSelectedFabric] = useState(initialData?.fabric || 'noir-satin');
  const [selectedFoil, setSelectedFoil] = useState(initialData?.foil || 'gold-24k');
  const [selectedFont, setSelectedFont] = useState(initialData?.font || 'cursive');
  const [selectedEmblem, setSelectedEmblem] = useState(initialData?.emblem || 'crown');
  const [previewMode, setPreviewMode] = useState('ribbon'); // 'ribbon' or 'bouquet'
  const [isCopied, setIsCopied] = useState(false);

  const currentFabric = RIBBON_FABRICS.find(f => f.id === selectedFabric) || RIBBON_FABRICS[0];
  const currentFoil = FOIL_FINISHES.find(f => f.id === selectedFoil) || FOIL_FINISHES[0];
  const currentFont = FONT_STYLES.find(f => f.id === selectedFont) || FONT_STYLES[0];
  const currentEmblem = EMBLEMS.find(e => e.id === selectedEmblem) || EMBLEMS[0];
  const CurrentEmblemIcon = currentEmblem.Icon;

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.length <= 45) {
      setText(val);
    }
  };

  const handleApplyPreset = (presetText) => {
    playLuxuryChime();
    setText(presetText);
  };

  const handleSelectFabric = (id) => {
    playLuxuryChime();
    setSelectedFabric(id);
  };

  const handleSelectFoil = (id) => {
    playLuxuryChime();
    setSelectedFoil(id);
  };

  const handleSelectFont = (id) => {
    playLuxuryChime();
    setSelectedFont(id);
  };

  const handleSelectEmblem = (id) => {
    playHeartPopSound();
    setSelectedEmblem(id);
  };

  const handleApplyAction = () => {
    playLuxuryChime();
    const ribbonConfig = {
      text,
      fabric: currentFabric,
      foil: currentFoil,
      font: currentFont,
      emblem: currentEmblem,
      price: 25
    };

    if (onApplyRibbon) {
      onApplyRibbon(ribbonConfig);
    } else {
      // Standalone mode: navigate to checkout with params
      const encodedText = encodeURIComponent(text);
      navigate(`/checkout?bouquet=signature-dual-noir-rouge&addon=panglica-caligrafica&ribbonText=${encodedText}&ribbonFabric=${selectedFabric}&ribbonFoil=${selectedFoil}`);
    }
  };

  return (
    <div 
      id="custom-ribbon-simulator-card"
      style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-light)',
        borderRadius: '28px',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Simulator Top Header */}
      <div 
        style={{
          background: 'radial-gradient(circle at 50% 0%, #1f0b12, #0d0306)',
          color: '#ffffff',
          padding: '28px 32px 24px',
          borderBottom: '1px solid rgba(225, 29, 72, 0.25)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225, 29, 72, 0.2)', border: '1px solid rgba(254, 205, 211, 0.3)', padding: '5px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, color: '#fda4af', marginBottom: '8px' }}>
              <Sparkles size={14} />
              <span>ATELIER HAUTE COUTURE • PERSONALIZARE CALIGRAFICĂ</span>
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '1.65rem', margin: 0, fontFamily: 'Playfair Display, serif' }}>
              Simulator Panglică Satinată cu Text Auriu Foliat
            </h3>
            <p style={{ color: '#fbcfe8', fontSize: '0.9rem', margin: '6px 0 0', opacity: 0.9 }}>
              Imprimată manual literă cu literă cu folie aurie 24K pe catifea sau satin fin de atelier.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.74rem', color: '#fda4af', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
              UPGRADE MEȘTEȘUGĂRESC
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fef08a' }}>
                +{formatPrice(25)}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>(5 €)</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          <button
            id="btn-ribbon-view-detail"
            onClick={() => setPreviewMode('ribbon')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: previewMode === 'ribbon' ? '#e11d48' : 'rgba(255,255,255,0.12)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <RibbonIcon size={15} color="#ffffff" />
            <span>Detaliu Panglică Textilă</span>
          </button>

          <button
            id="btn-ribbon-view-bouquet"
            onClick={() => setPreviewMode('bouquet')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: previewMode === 'bouquet' ? '#e11d48' : 'rgba(255,255,255,0.12)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <SparkleIcon size={15} color="#ffffff" />
            <span>Montată pe Buchetul Bicolor</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas / Display Stage */}
      <div 
        id="ribbon-interactive-stage"
        style={{
          background: previewMode === 'bouquet' 
            ? '#0f0508' 
            : 'radial-gradient(circle at 50% 50%, #200812 0%, #0d0306 100%)',
          minHeight: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '30px 20px',
          overflow: 'hidden',
          boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.4)'
        }}
      >
        {previewMode === 'bouquet' ? (
          /* Bouquet Real Photo with Overlaid Ribbon */
          <div style={{ position: 'relative', width: '100%', maxWidth: '440px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.6)' }}>
            <img 
              src="/images/buchet-dual-noir-rouge-hero.webp" 
              alt="Buchet Stardust cu Panglică Caligrafică" 
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
            {/* Draped Ribbon Across Bouquet Stems */}
            <div 
              style={{
                position: 'absolute',
                bottom: '38px',
                left: '-10px',
                right: '-10px',
                background: currentFabric.bg,
                padding: '12px 20px',
                transform: 'rotate(-4deg)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                borderBottom: '1px solid rgba(0,0,0,0.4)',
                textAlign: 'center',
                zIndex: 2
              }}
            >
              <span 
                style={{
                  fontFamily: currentFont.family,
                  fontStyle: currentFont.style,
                  fontWeight: currentFont.weight,
                  textTransform: currentFont.transform || 'none',
                  letterSpacing: currentFont.letterSpacing,
                  color: currentFoil.color,
                  textShadow: currentFoil.shadow,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {CurrentEmblemIcon && <CurrentEmblemIcon size={16} color={currentFoil.color} />}
                <span>{text || 'Textul tău aici...'}</span>
                {CurrentEmblemIcon && <CurrentEmblemIcon size={16} color={currentFoil.color} />}
              </span>
            </div>
            {/* Hanging Ribbon Tails */}
            <div 
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '48px',
                width: '32px',
                height: '48px',
                background: currentFabric.bg,
                transform: 'rotate(12deg)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)',
                zIndex: 1
              }}
            />
          </div>
        ) : (
          /* Ribbon Detail Stage */
          <div style={{ width: '100%', maxWidth: '620px', position: 'relative' }}>
            {/* Bow Knot Accent */}
            <div 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: currentFabric.bg,
                border: '2px solid rgba(255,255,255,0.25)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.6)',
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: currentFoil.color
              }}
            >
              <FleurDeLisIcon size={18} color={currentFoil.color} />
            </div>

            {/* Main Flowing Satin Ribbon Banner */}
            <div 
              id="ribbon-main-banner"
              style={{
                background: currentFabric.bg,
                padding: '24px 36px',
                borderRadius: '8px',
                boxShadow: '0 14px 36px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.4)',
                textAlign: 'center',
                position: 'relative',
                borderTop: '1px solid rgba(255,255,255,0.3)',
                borderBottom: '1px solid rgba(0,0,0,0.5)',
                overflow: 'hidden'
              }}
            >
              {/* Glossy Silk Sheen Gradient Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 35%, transparent 65%)',
                  pointerEvents: 'none',
                  animation: 'ribbonSheen 4s ease-in-out infinite'
                }}
              />

              {/* Calligraphic Gold Foil Lettering */}
              <div 
                id="ribbon-live-text"
                style={{
                  fontFamily: currentFont.family,
                  fontStyle: currentFont.style,
                  fontWeight: currentFont.weight,
                  textTransform: currentFont.transform || 'none',
                  letterSpacing: currentFont.letterSpacing,
                  color: currentFoil.color,
                  textShadow: currentFoil.shadow,
                  fontSize: 'clamp(1.2rem, 3vw, 1.85rem)',
                  lineHeight: 1.3,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '4px 8px',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'all 0.2s ease'
                }}
              >
                {CurrentEmblemIcon && <CurrentEmblemIcon size={24} color={currentFoil.color} />}
                <span>{text || 'Scrie mesajul tău...'}</span>
                {CurrentEmblemIcon && <CurrentEmblemIcon size={24} color={currentFoil.color} />}
              </div>
            </div>

            {/* Left and Right Swallowtail Ribbon Tails */}
            <div 
              style={{
                position: 'absolute',
                left: '20px',
                bottom: '-28px',
                width: '64px',
                height: '42px',
                background: currentFabric.bg,
                clipPath: 'polygon(0% 0%, 100% 0%, 80% 50%, 100% 100%, 0% 100%)',
                boxShadow: '0 8px 18px rgba(0,0,0,0.4)',
                transform: 'rotate(-8deg)',
                zIndex: 1
              }}
            />
            <div 
              style={{
                position: 'absolute',
                right: '20px',
                bottom: '-28px',
                width: '64px',
                height: '42px',
                background: currentFabric.bg,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 20% 50%)',
                boxShadow: '0 8px 18px rgba(0,0,0,0.4)',
                transform: 'rotate(8deg)',
                zIndex: 1
              }}
            />
          </div>
        )}
      </div>

      {/* Simulator Controls & Options Panel */}
      <div style={{ padding: '28px 32px' }}>
        {/* Text Input & Character Counter */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Type size={16} color="#e11d48" />
              <span>Textul Tău Caligrafiat pe Panglică</span>
            </label>
            <span style={{ fontSize: '0.78rem', color: text.length >= 40 ? '#e11d48' : 'var(--text-muted)', fontWeight: 700 }}>
              {text.length}/45 caractere
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <input 
              id="input-ribbon-text"
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Ex: Te iubesc infinit, Ana"
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '14px',
                border: '1.5px solid var(--border-light)',
                fontSize: '1rem',
                outline: 'none',
                background: '#fafafa',
                fontWeight: 600
              }}
            />
            {text && (
              <button
                onClick={() => setText('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
              >
                Șterge
              </button>
            )}
          </div>

          {/* Quick Inspiration Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, alignSelf: 'center', marginRight: '4px' }}>
              Sugestii rapide:
            </span>
            {QUICK_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                id={`btn-preset-ribbon-${idx}`}
                onClick={() => handleApplyPreset(preset)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-main)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Fabric Material Selection */}
        <div style={{ marginBottom: '22px' }}>
          <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Palette size={16} color="#e11d48" />
            <span>1. Alege Țesătura & Culoarea Panglicii</span>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {RIBBON_FABRICS.map(fabric => {
              const isSelected = selectedFabric === fabric.id;
              return (
                <button
                  key={fabric.id}
                  id={`btn-ribbon-fabric-${fabric.id}`}
                  onClick={() => handleSelectFabric(fabric.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    border: isSelected ? '2px solid var(--rose-600)' : '1px solid var(--border-light)',
                    background: isSelected ? 'var(--rose-50)' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(225, 29, 72, 0.15)' : 'none'
                  }}
                >
                  <span 
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: fabric.bg,
                      border: '1px solid #ddd',
                      flexShrink: 0,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {fabric.name}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                      {fabric.sub}
                    </span>
                  </div>
                  {isSelected && <Check size={16} color="#e11d48" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Foil & Font Selection Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '22px' }}>
          {/* Foil Finish */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Sparkles size={16} color="#e11d48" />
              <span>2. Tipul Foliei Metalizate</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {FOIL_FINISHES.map(foil => {
                const isSelected = selectedFoil === foil.id;
                return (
                  <button
                    key={foil.id}
                    id={`btn-ribbon-foil-${foil.id}`}
                    onClick={() => handleSelectFoil(foil.id)}
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
                    <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {foil.name}
                    </span>
                    {isSelected && <Check size={16} color="#e11d48" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography Style */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Type size={16} color="#e11d48" />
              <span>3. Stil Caligrafic & Font</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {FONT_STYLES.map(font => {
                const isSelected = selectedFont === font.id;
                const FontIcon = font.Icon;
                return (
                  <button
                    key={font.id}
                    id={`btn-ribbon-font-${font.id}`}
                    onClick={() => handleSelectFont(font.id)}
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
                    <span style={{ fontFamily: font.family, fontStyle: font.style, fontSize: '0.92rem', fontWeight: font.weight, color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
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

        {/* 4. Emblems Selector */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Crown size={16} color="#e11d48" />
            <span>4. Emblemă Regală de Încadrare (Opțional)</span>
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {EMBLEMS.map(emblem => {
              const isSelected = selectedEmblem === emblem.id;
              const EmblemIcon = emblem.Icon;
              return (
                <button
                  key={emblem.id}
                  id={`btn-ribbon-emblem-${emblem.id}`}
                  onClick={() => handleSelectEmblem(emblem.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    border: isSelected ? '1.5px solid var(--rose-600)' : '1px solid var(--border-light)',
                    background: isSelected ? '#fff1f2' : '#ffffff',
                    color: isSelected ? '#be123c' : 'var(--text-main)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {EmblemIcon ? (
                    <EmblemIcon size={15} color={isSelected ? '#be123c' : 'var(--rose-600)'} />
                  ) : (
                    <X size={15} color={isSelected ? '#be123c' : 'var(--text-muted)'} />
                  )}
                  <span>{emblem.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Footer */}
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
            <RibbonIcon size={26} color="var(--rose-600)" />
            <div>
              <strong style={{ fontSize: '0.94rem', color: 'var(--text-main)', display: 'block' }}>
                Panglică Caligrafiată Auriu Inclusă la Buchet
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Se leagă manual în jurul tulpinii sau ambalajului cu nod imperial
              </span>
            </div>
          </div>

          <button
            id="btn-apply-ribbon-cta"
            onClick={handleApplyAction}
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
            <span>{isEmbeddedInCheckout ? 'Confirmă Panglica (+25 RON)' : 'Comandă Buchetul cu Această Panglică (+25 RON)'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
