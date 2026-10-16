import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, TrendingDown, Leaf, Droplets, Trash2, ShieldCheck, 
  Heart, ArrowRight, CheckCircle2, Clock, DollarSign, Gift
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { playLuxuryChime } from '../utils/audioAlert';
import { RoseIcon, RingIcon, CrownIcon, WiltedFlowerIcon, SparkleIcon } from './CustomIcons';

export default function SavingsSustainabilityCalculator() {
  const { currency, formatPrice } = useCurrency();

  // Preset profiles
  const PRESETS = [
    { id: 'romantic', label: 'Cuplu Romantic', Icon: Heart, occasions: 4, labelOccasions: '4 ocazii/an (Ziua Ei, 14 Feb, 8 Mar, Aniversare)' },
    { id: 'engaged', label: 'Proaspăt Logodiți', Icon: RingIcon, occasions: 5, labelOccasions: '5 ocazii/an (plus onomastică și Crăciun)' },
    { id: 'occasional', label: 'Gesturi Rare', Icon: RoseIcon, occasions: 2, labelOccasions: '2 ocazii/an (Ziua de Naștere & Crăciun)' },
    { id: 'enthusiast', label: 'Iubitor de Flori', Icon: CrownIcon, occasions: 6, labelOccasions: '6 ocazii/an (evenimente multiple în an)' }
  ];

  const isEur = currency === 'EUR';
  const defaultFreshCost = isEur ? 50 : 250;
  const minFreshCost = isEur ? 25 : 120;
  const maxFreshCost = isEur ? 100 : 500;
  const stepFreshCost = isEur ? 5 : 10;
  const stardustOneTime = isEur ? 54 : 269;

  // Component state
  const [activePreset, setActivePreset] = useState('romantic');
  const [occasionsPerYear, setOccasionsPerYear] = useState(4);
  const [freshBouquetCost, setFreshBouquetCost] = useState(defaultFreshCost);
  const [yearsHorizon, setYearsHorizon] = useState(3);

  // Dynamic calculations
  const totalOccasions = occasionsPerYear * yearsHorizon;
  const totalFreshCost = totalOccasions * freshBouquetCost;
  const totalSaved = Math.max(0, totalFreshCost - stardustOneTime);
  const percentSaved = Math.min(96, Math.max(10, Math.round((totalSaved / totalFreshCost) * 100)));
  const bouquetsSaved = totalOccasions;
  const waterSavedLiters = totalOccasions * 18;

  const handlePresetSelect = (preset) => {
    setActivePreset(preset.id);
    setOccasionsPerYear(preset.occasions);
    playLuxuryChime();
  };

  return (
    <section 
      id="calculator-sustenabilitate-sectiune"
      className="section"
      style={{ 
        background: 'linear-gradient(180deg, var(--bg-main) 0%, var(--bg-surface) 50%, var(--bg-main) 100%)',
        position: 'relative',
        padding: '85px 0',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '6px 18px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.8px', marginBottom: '14px' }}>
            <Leaf size={14} /> SUSTENABILITATE & VALOARE ÎN TIMP • ECONOMIE REZONABILĂ
          </div>

          <h2 style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)', margin: '10px 0 16px', fontFamily: 'var(--font-heading)' }}>
            Cât Economisești cu <span className="highlight-rose">Trandafirii Nemuritori?</span>
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.08rem', lineHeight: 1.6 }}>
            Florile proaspete se ofilesc și ajung la coșul de gunoi în doar <strong>5 zile</strong>. Un buchet artizanal Stardust Florals™ își păstrează strălucirea și catifeaua peste <strong>3 ani</strong>. Calculează economia reală:
          </p>
        </div>

        {/* Interactive Controls Card */}
        <div 
          style={{ 
            background: 'var(--bg-card)', 
            border: '1.5px solid var(--border-light)', 
            borderRadius: '28px', 
            padding: '36px 32px', 
            boxShadow: 'var(--shadow-md)',
            marginBottom: '36px'
          }}
        >
          {/* Preset Buttons */}
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--rose-600)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>
              Selectează un Profil Rapid:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {PRESETS.map((p) => {
                const IconComp = p.Icon;
                return (
                  <button
                    key={p.id}
                    id={`btn-calc-preset-${p.id}`}
                    onClick={() => handlePresetSelect(p)}
                    style={{
                      background: activePreset === p.id ? 'var(--rose-600)' : 'var(--bg-subtle)',
                      color: activePreset === p.id ? '#ffffff' : 'var(--text-main)',
                      border: activePreset === p.id ? '1px solid #e11d48' : '1px solid var(--border-light)',
                      padding: '8px 16px',
                      borderRadius: '24px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px'
                    }}
                  >
                    <IconComp size={15} color={activePreset === p.id ? '#ffffff' : 'var(--rose-600)'} />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {/* Slider 1: Occasions / year */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label htmlFor="input-occasions" style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Gift size={16} color="var(--rose-600)" /> Ocazii / Sărbători pe An:
                </label>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--rose-600)', background: '#ffe4e6', padding: '2px 10px', borderRadius: '12px' }}>
                  {occasionsPerYear} ocazii
                </span>
              </div>
              <input
                id="input-occasions"
                type="range"
                min="1"
                max="8"
                step="1"
                value={occasionsPerYear}
                onChange={(e) => {
                  setOccasionsPerYear(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="luxury-range"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#94a3b8', marginTop: '6px' }}>
                <span>1 ocazie (minim)</span>
                <span>4 ocazii (media)</span>
                <span>8 ocazii (maxim)</span>
              </div>
            </div>

            {/* Slider 2: Average price of fresh flower bouquet */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label htmlFor="input-fresh-cost" style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarSign size={16} color="var(--rose-600)" /> Preț Mediu Buchet Natural:
                </label>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--rose-600)', background: '#ffe4e6', padding: '2px 10px', borderRadius: '12px' }}>
                  {formatPrice(freshBouquetCost)}
                </span>
              </div>
              <input
                id="input-fresh-cost"
                type="range"
                min={minFreshCost}
                max={maxFreshCost}
                step={stepFreshCost}
                value={freshBouquetCost}
                onChange={(e) => setFreshBouquetCost(Number(e.target.value))}
                className="luxury-range"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#94a3b8', marginTop: '6px' }}>
                <span>{formatPrice(minFreshCost)} (Standard)</span>
                <span>{formatPrice(defaultFreshCost)} (Florărie Mall)</span>
                <span>{formatPrice(maxFreshCost)} (Buchet Premium)</span>
              </div>
            </div>
          </div>

          {/* Time Horizon Selector */}
          <div style={{ marginTop: '28px', paddingTop: '22px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="var(--rose-600)" /> Orizont de Timp Comparat:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { y: 1, label: '1 An' },
                { y: 2, label: '2 Ani' },
                { y: 3, label: '3 Ani (Recomandat)' },
                { y: 5, label: '5 Ani' }
              ].map((item) => (
                <button
                  key={item.y}
                  id={`btn-calc-year-${item.y}`}
                  onClick={() => setYearsHorizon(item.y)}
                  style={{
                    background: yearsHorizon === item.y ? 'var(--rose-600)' : 'var(--bg-subtle)',
                    color: yearsHorizon === item.y ? '#ffffff' : 'var(--text-main)',
                    border: yearsHorizon === item.y ? '1.5px solid var(--rose-600)' : '1px solid var(--border-light)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="calc-comparison-grid">
          {/* Card 1: Traditional Fresh Flowers */}
          <div className="calc-card-fresh" id="calc-card-fresh">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 12px', borderRadius: '16px', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <WiltedFlowerIcon size={14} color="#f87171" />
                <span>FLORI NATURALE TRADIȚIONALE</span>
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{yearsHorizon} {yearsHorizon === 1 ? 'An' : 'Ani'}</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--text-main)' }}>Flori Naturale Tăiate</h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f87171', margin: '8px 0 16px', letterSpacing: '-0.5px' }}>
              {formatPrice(totalFreshCost)}
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
              Cheltuieli repetitive pentru <strong>{totalOccasions} buchete</strong> separate de flori perisabile.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                <Clock size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                <span><strong>Durată de viață:</strong> 4 – 6 Zile (efemer)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                <Trash2 size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                <span><strong>Deșeuri generate:</strong> {bouquetsSaved} buchete aruncate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                <Droplets size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                <span><strong>Apă consumată:</strong> ~{waterSavedLiters} L apă schimbată</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                <TrendingDown size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                <span><strong>Amintire:</strong> Petale uscate și miros stătut</span>
              </div>
            </div>
          </div>

          {/* Card 2: Stardust Florals Immortal Roses */}
          <div className="calc-card-stardust" id="calc-card-stardust">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, background: 'rgba(225, 29, 72, 0.3)', color: '#fda4af', border: '1px solid #f43f5e', padding: '4px 12px', borderRadius: '16px', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <SparkleIcon size={14} color="#fda4af" />
                <span>TRANDAFIRI NEMURITORI STARDUST™</span>
              </span>
              <span style={{ fontSize: '0.8rem', color: '#fda4af' }}>{yearsHorizon} {yearsHorizon === 1 ? 'An' : 'Ani'}</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: '#ffffff' }}>Signature Dual Noir & Rouge</h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f43f5e', margin: '8px 0 16px', letterSpacing: '-0.5px' }}>
              {formatPrice(stardustOneTime)}
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fda4af', marginLeft: '8px', textTransform: 'uppercase' }}>
                (Plată Unică)
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#fecdd3', marginBottom: '20px', lineHeight: 1.5 }}>
              O singură piesă de artă florală ce strălucește pe noptieră sau living an după an.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', borderTop: '1px solid rgba(254, 205, 211, 0.2)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffe4e6' }}>
                <Sparkles size={16} color="#f43f5e" style={{ flexShrink: 0 }} />
                <span><strong>Durată de viață:</strong> 3+ Ani Garantat (Nu se ofilesc)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffe4e6' }}>
                <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                <span><strong>Deșeuri generate:</strong> 0 buchete (Reutilizabil 100%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffe4e6' }}>
                <Droplets size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                <span><strong>Întreținere:</strong> 0 L apă (Fără vază sau tăieri)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffe4e6' }}>
                <Heart size={16} color="#e11d48" style={{ flexShrink: 0 }} />
                <span><strong>Amintire:</strong> Cod QR video & sclipici diamant etern</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Savings Callout Banner */}
        <div 
          id="calc-savings-result"
          style={{ 
            marginTop: '36px', 
            background: 'radial-gradient(ellipse at center, #19080c 0%, #0d0305 100%)', 
            border: '2px solid rgba(225, 29, 72, 0.4)', 
            borderRadius: '26px', 
            padding: '36px 32px', 
            textAlign: 'center', 
            color: '#ffffff', 
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Ambient Glow */}
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '380px', height: '180px', background: 'radial-gradient(circle, rgba(225, 29, 72, 0.3) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fb7185', background: 'rgba(225,29,72,0.2)', padding: '5px 16px', borderRadius: '20px', letterSpacing: '1px' }}>
              REZULTATUL CALCULULUI PE {yearsHorizon} {yearsHorizon === 1 ? 'AN' : 'ANI'}
            </span>

            <div style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', margin: '14px 0 6px', fontFamily: 'var(--font-heading)' }}>
              Economisești <span style={{ color: '#10b981' }}>{formatPrice(totalSaved)}</span>
            </div>

            <p style={{ fontSize: '1.1rem', color: '#fecdd3', maxWidth: '620px', margin: '0 auto 24px' }}>
              Plătești cu <strong>{percentSaved}% mai puțin</strong> decât ai cheltui pe florile care mor într-o săptămână, oferindu-i un cadou pe care îl va admira în fiecare zi.
            </p>

            {/* Ecological Badge */}
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(254, 205, 211, 0.15)', padding: '12px 24px', borderRadius: '30px', marginBottom: '28px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#a7f3d0' }}>
                <Leaf size={16} color="#10b981" /> Salvezi <strong>{bouquetsSaved} buchete</strong> de la gunoi
              </span>
              <span style={{ color: 'rgba(254, 205, 211, 0.3)' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#bae6fd' }}>
                <Droplets size={16} color="#38bdf8" /> Economisești <strong>~{waterSavedLiters} L</strong> apă potabilă
              </span>
            </div>

            {/* Call to Action Row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link 
                id="btn-calc-buy-stardust"
                to="/checkout?bouquet=signature-dual-noir-rouge" 
                className="btn btn-primary btn-lg"
                style={{ 
                  background: 'linear-gradient(135deg, var(--rose-600), #9f1239)',
                  padding: '14px 32px',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.6)'
                }}
              >
                <span>Investește În Strălucire Nemuritoare ({formatPrice(stardustOneTime)})</span>
                <ArrowRight size={18} />
              </Link>
              <Link 
                id="btn-calc-explore-collection"
                to="/colectie" 
                className="btn btn-secondary btn-lg"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(254, 205, 211, 0.3)' }}
              >
                <span>Explorează Colecția</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
