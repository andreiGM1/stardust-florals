import React, { useState } from 'react';
import { 
  Sparkles, Check, Info, Wind, ShieldCheck, Heart, 
  Flame, Droplets, Volume2
} from 'lucide-react';
import { 
  RoseIcon, PerfumeBottleIcon, MistSprayIcon, SparkleIcon, CrownIcon
} from './CustomIcons';
import { playLuxuryChime } from '../utils/audioAlert';

export const FRAGRANCE_OPTIONS = [
  {
    id: 'rose-damascena',
    name: 'Trandafir Damascen & Bujor Imperial',
    category: 'Floral Romantic',
    desc: 'Distilat pur din petale de trandafir de Damasc și bujor roz diafan. Creează o aură delicată de grădină pariziană la deschiderea cutiei.',
    topNotes: 'Trandafir de Mai, Bergamotă Calabră',
    heartNotes: 'Bujor Roz Pudrat, Iasomie de Grasse',
    baseNotes: 'Mosc Alb Mătăsos, Lemn de Cedru',
    intensity: 'Persistent 48h',
    dots: 3,
    badge: 'FAVORIT ATELIER',
    themeColor: '#e11d48',
    glowColor: 'rgba(225, 29, 72, 0.35)',
    accentBg: '#fff1f2',
    accentBorder: '#fecdd3'
  },
  {
    id: 'vanilie-ambra',
    name: 'Vanilie Bourbon & Ambră Aurie',
    category: 'Oriental Cald & Senzual',
    desc: 'O căldură învăluitoare de vanilie gurmandă de Madagascar și ambră solară. Confortant, nobil și irezistibil de atrăgător.',
    topNotes: 'Floare de Portocal, Orhidee',
    heartNotes: 'Păstăi de Vanilie Bourbon, Praline Fine',
    baseNotes: 'Ambră Aurie Cristalizată, Santal',
    intensity: 'Intens 72h',
    dots: 3,
    badge: 'SENZUAL & LUXURIANT',
    themeColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.35)',
    accentBg: '#fef3c7',
    accentBorder: '#fde68a'
  },
  {
    id: 'oud-nobil',
    name: 'Oud Nobil & Șofran Imperial',
    category: 'Lemnos Aristocratic',
    desc: 'Esență rară inspirată din saloanele imperiale ale Orientului. Lemn prețios de agar, șofran mătăsos și o prezență hipnotizantă de neuitat.',
    topNotes: 'Șofran Persan, Piper Roz',
    heartNotes: 'Oud Nobil Selecționat, Patchouli',
    baseNotes: 'Rășină Sacră de Tămâie, Piele Catifelată',
    intensity: 'Majestic 72h+',
    dots: 3,
    badge: 'OPULENT & RAR',
    themeColor: '#9333ea',
    glowColor: 'rgba(147, 51, 234, 0.35)',
    accentBg: '#f3e8ff',
    accentBorder: '#e9d5ff'
  },
  {
    id: 'natural-pur',
    name: 'Fără Parfum Adăugat (Natural Pur)',
    category: 'Hipoalergenic & Pur',
    desc: 'Aroma nativă, proaspătă și curată a trandafirilor de seră. Ideal pentru persoane cu sensibilități la parfumuri sau mirosuri intense.',
    topNotes: 'Rouă Matinală, Tijă Verde',
    heartNotes: 'Parfum Nativ Subtil de Trandafir',
    baseNotes: 'Fără Uleiuri Esențiale Adăugate',
    intensity: 'Subtil Natural',
    dots: 1,
    badge: 'ZERO ALERGENI',
    themeColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.35)',
    accentBg: '#ecfdf5',
    accentBorder: '#a7f3d0'
  }
];

export default function FloralFragranceSelector({ 
  selectedId = 'rose-damascena', 
  onSelectFragrance = null,
  isEmbeddedInCheckout = false 
}) {
  const [activeFragranceId, setActiveFragranceId] = useState(selectedId);
  const [isSpraying, setIsSpraying] = useState(false);
  const [sprayCount, setSprayCount] = useState(0);

  const currentFragrance = FRAGRANCE_OPTIONS.find((f) => f.id === activeFragranceId) || FRAGRANCE_OPTIONS[0];

  const handleSelect = (fragrance) => {
    setActiveFragranceId(fragrance.id);
    playLuxuryChime();
    triggerMistAnimation();
    if (onSelectFragrance) {
      onSelectFragrance(fragrance);
    }
  };

  const triggerMistAnimation = () => {
    setIsSpraying(true);
    setSprayCount((prev) => prev + 1);
    setTimeout(() => {
      setIsSpraying(false);
    }, 1800);
  };

  return (
    <div 
      className="fragrance-selector-wrapper"
      style={{
        width: '100%',
        borderRadius: '24px',
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-light)',
        padding: isEmbeddedInCheckout ? '20px 16px' : '32px 24px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Mist Ambient Animation Styles */}
      <style>{`
        @keyframes mistExpand {
          0% {
            opacity: 0;
            transform: scale(0.6) translate(-50%, -20%);
          }
          40% {
            opacity: 0.85;
            transform: scale(1.1) translate(-50%, -50%);
          }
          100% {
            opacity: 0;
            transform: scale(1.8) translate(-50%, -70%);
          }
        }
        @keyframes dropletFloat {
          0% { transform: translateY(0px) scale(0.8); opacity: 0; }
          50% { opacity: 1; transform: translateY(-12px) scale(1.1); }
          100% { transform: translateY(-24px) scale(0.6); opacity: 0; }
        }
      `}</style>

      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '22px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '0.74rem', 
              fontWeight: 800, 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              padding: '3px 10px', 
              borderRadius: '20px', 
              background: currentFragrance.accentBg, 
              color: currentFragrance.themeColor,
              border: `1px solid ${currentFragrance.accentBorder}`
            }}>
              <PerfumeBottleIcon size={14} color={currentFragrance.themeColor} />
              <span>{currentFragrance.badge}</span>
            </span>

            <span style={{ fontSize: '0.74rem', color: '#059669', background: '#d1fae5', padding: '3px 9px', borderRadius: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} color="#059669" />
              <span>Inclus Gratuit la Comandă</span>
            </span>
          </div>

          <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: isEmbeddedInCheckout ? '1.25rem' : '1.65rem', margin: '4px 0 6px', color: 'var(--text-main)' }}>
            Infuzie Olfactivă de Atelier pe Hârtia de Mătase
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
            Fiecare creație Stardust este pulverizată manual cu esențe rare de parfum franțuzesc înainte de ambalare, asigurând un efect senzorial copleșitor la deschiderea cutiei.
          </p>
        </div>

        {/* Interactive Spray Tester Button */}
        <button
          type="button"
          id="btn-fragrance-spray-test"
          onClick={() => {
            playLuxuryChime();
            triggerMistAnimation();
          }}
          disabled={isSpraying}
          className="btn btn-secondary btn-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '0.8rem',
            borderColor: currentFragrance.themeColor,
            color: currentFragrance.themeColor
          }}
          title="Pulverizează o notă olfactivă demonstrativă"
        >
          <MistSprayIcon size={16} color={currentFragrance.themeColor} />
          <span>{isSpraying ? 'Se pulverizează...' : 'Testează Pulverizarea'}</span>
        </button>
      </div>

      {/* Fragrance Options Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {FRAGRANCE_OPTIONS.map((fragrance) => {
          const isSelected = fragrance.id === activeFragranceId;

          return (
            <div
              key={fragrance.id}
              id={`btn-fragrance-card-${fragrance.id}`}
              onClick={() => handleSelect(fragrance)}
              style={{
                position: 'relative',
                borderRadius: '18px',
                padding: '16px 14px',
                cursor: 'pointer',
                background: isSelected ? 'var(--bg-subtle)' : 'var(--bg-surface)',
                border: isSelected ? `2px solid ${fragrance.themeColor}` : '1.5px solid var(--border-subtle)',
                boxShadow: isSelected ? `0 8px 24px ${fragrance.glowColor}` : 'none',
                transform: isSelected ? 'translateY(-2px)' : 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Top Selected Indicator */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: fragrance.themeColor,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}>
                  <Check size={13} strokeWidth={3} />
                </div>
              )}

              {/* Fragrance Atomizer Icon Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: fragrance.accentBg,
                  border: `1px solid ${fragrance.accentBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: fragrance.themeColor
                }}>
                  <PerfumeBottleIcon size={20} color={fragrance.themeColor} />
                </div>

                <div style={{ flex: 1, paddingRight: isSelected ? '20px' : '0' }}>
                  <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>
                    {fragrance.category}
                  </span>
                  <strong style={{ fontSize: '0.9rem', color: isSelected ? fragrance.themeColor : 'var(--text-main)', lineHeight: 1.2, display: 'block' }}>
                    {fragrance.name.split('&')[0]}
                  </strong>
                </div>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: '0 0 10px', minHeight: '44px' }}>
                {fragrance.desc}
              </p>

              {/* Intensity indicator */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', fontSize: '0.72rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Persistență:</span>
                <span style={{ fontWeight: 800, color: fragrance.themeColor, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Wind size={12} color={fragrance.themeColor} />
                  <span>{fragrance.intensity}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Scent Pyramide Olfactive Card */}
      <div 
        style={{
          borderRadius: '18px',
          background: 'var(--bg-subtle)',
          border: `1.5px solid ${currentFragrance.accentBorder}`,
          padding: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated mist cloud when spraying */}
        {isSpraying && (
          <div 
            key={sprayCount}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${currentFragrance.glowColor} 0%, transparent 70%)`,
              pointerEvents: 'none',
              animation: 'mistExpand 1.6s ease-out forwards',
              zIndex: 20
            }}
          />
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CrownIcon size={18} color={currentFragrance.themeColor} />
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Piramida Olfactivă: {currentFragrance.name}
            </h4>
          </div>

          <span style={{ fontSize: '0.72rem', background: currentFragrance.accentBg, color: currentFragrance.themeColor, border: `1px solid ${currentFragrance.accentBorder}`, padding: '3px 10px', borderRadius: '15px', fontWeight: 800 }}>
            {currentFragrance.intensity}
          </span>
        </div>

        {/* 3 Notes Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          
          <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 800, display: 'block', marginBottom: '2px' }}>
              1. Note de Vârf (La Deschiderea Cutiei)
            </span>
            <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
              {currentFragrance.topNotes}
            </strong>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 800, display: 'block', marginBottom: '2px' }}>
              2. Note de Mijloc (Inima Buchetului)
            </span>
            <strong style={{ fontSize: '0.84rem', color: currentFragrance.themeColor }}>
              {currentFragrance.heartNotes}
            </strong>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 800, display: 'block', marginBottom: '2px' }}>
              3. Note de Bază (Sillage de Durată)
            </span>
            <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
              {currentFragrance.baseNotes}
            </strong>
          </div>

        </div>

        <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SparkleIcon size={14} color={currentFragrance.themeColor} />
            <span>Pulverizat cu atomizor cu pară de mătase pe ambalajul interior, fără a atinge direct bobocii de trandafir.</span>
          </div>

          <span style={{ fontWeight: 700, color: '#059669' }}>
            Selectat pentru comanda ta
          </span>
        </div>
      </div>
    </div>
  );
}
