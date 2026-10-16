import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, Heart, Wine, Flame, Eye, Edit3, Volume2 } from 'lucide-react';
import { ChampagneFlutesIcon, StrawberryGoldIcon, DiamondIcon, CrownIcon } from './CustomIcons';
import { useCurrency } from '../context/CurrencyContext';

export const CHAMPAGNE_OPTIONS = [
  {
    id: 'moet-rose',
    name: 'Moët & Chandon Rosé Impérial',
    volume: '750ml',
    price: 280,
    badge: 'ALEGEREA REGALĂ',
    badgeColor: '#e11d48',
    gradient: 'linear-gradient(135deg, #881337 0%, #4c0519 100%)',
    tagline: 'Arome seducătoare de căpșuni sălbatice, zmeură, cireșe și petale de trandafir',
    pairing: 'Ideal alături de căpșunile glazurate în ciocolată Ruby'
  },
  {
    id: 'moet-brut',
    name: 'Moët & Chandon Brut Impérial',
    volume: '750ml',
    price: 250,
    badge: 'CLASIC ATEMPORAL',
    badgeColor: '#d97706',
    gradient: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)',
    tagline: 'Perlaj fin și radiant, accente de măr verde, citrice proaspete și brioșă caldă',
    pairing: 'Ideal alături de ciocolata neagră Callebaut 70%'
  },
  {
    id: 'bottega-rose',
    name: 'Bottega Rose Gold Pinot Nero Spumante',
    volume: '750ml',
    price: 140,
    badge: 'GLAMOUR ROSE GOLD',
    badgeColor: '#ec4899',
    gradient: 'linear-gradient(135deg, #9d174d 0%, #500724 100%)',
    tagline: 'Sticlă metalizată rose gold de colecție, arome de piersică de vie și flori albe',
    pairing: 'Efect vizual uluitor lângă trandafirii Stardust'
  },
  {
    id: 'none',
    name: 'Fără Băutură (Doar Căpșuni în Ciocolată)',
    volume: '—',
    price: 0,
    badge: 'DOAR DESERT',
    badgeColor: '#64748b',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    tagline: 'Savurează exclusiv cutia de căpșuni artizanale cu foiță de aur',
    pairing: 'Comandă fără alcool'
  }
];

export const STRAWBERRY_OPTIONS = [
  {
    id: 'box-12',
    name: 'Grand Box Regal — 12 Căpșuni cu Foiță de Aur 24K',
    pieces: 12,
    price: 120,
    badge: 'BESTSELLER GOURMET',
    desc: '6 Căpșuni în ciocolată neagră Callebaut 70% + 6 Căpșuni în ciocolată Ruby roz, foiță de aur 24K veritabil'
  },
  {
    id: 'box-6',
    name: 'Petite Box Delicat — 6 Căpșuni cu Foiță de Aur 24K',
    pieces: 6,
    price: 75,
    badge: 'DEGUSTARE INTIMĂ',
    desc: '3 Căpșuni în ciocolată neagră belgiană + 3 Căpșuni în ciocolată albă Bourbon cu perluțe crocante'
  },
  {
    id: 'none',
    name: 'Fără Căpșuni (Doar Șampanie)',
    pieces: 0,
    price: 0,
    badge: 'DOAR ȘAMPANIE',
    desc: 'Se livrează doar sticla de șampanie în ambalaj cadou izoterm'
  }
];

export const CHOCOLATE_GLAZE_OPTIONS = [
  { id: 'duo-fondant-ruby', name: 'Duo Regal: Ciocolată Neagră 70% & Ciocolată Ruby Roz Natural', desc: 'Contrast sofisticat între intensitatea amară de cacao și fructuozitatea acidulată' },
  { id: 'dark-intense', name: 'Fondant Pur: 100% Ciocolată Neagră Callebaut 70%', desc: 'Arome profunde de cacao veritabilă, perfecte pentru cunoscători' },
  { id: 'white-velvet', name: 'Velvet Alb & Vanilie Bourbon', desc: 'Dulceață cremoasă delicată cu perluțe perlate crocante' }
];

export function playChampagnePopSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // 1. Cork Pop (low frequency thump)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);

    // 2. Fizzy effervescence (white noise blast)
    const bufferSize = ctx.sampleRate * 0.4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 3500;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.06, ctx.currentTime + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    whiteNoise.start(ctx.currentTime + 0.05);

    // 3. Crystal Glass Chime
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chime.type = 'sine';
    chime.frequency.setValueAtTime(1760, ctx.currentTime + 0.12); // A6
    chimeGain.gain.setValueAtTime(0.12, ctx.currentTime + 0.12);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);
    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chime.start(ctx.currentTime + 0.12);
    chime.stop(ctx.currentTime + 0.7);
  } catch {
    // audio unavailable
  }
}

export default function GourmetChampagneStrawberriesSelector({ 
  isEmbedded = false, 
  initialChampagne = 'moet-rose',
  initialStrawberries = 'box-12',
  initialGlaze = 'duo-fondant-ruby',
  initialMessage = 'Te iubesc',
  onApplyPackage 
}) {
  const { formatPrice } = useCurrency();
  const [selectedChampagneId, setSelectedChampagneId] = useState(initialChampagne);
  const [selectedStrawberryId, setSelectedStrawberryId] = useState(initialStrawberries);
  const [selectedGlazeId, setSelectedGlazeId] = useState(initialGlaze);
  const [customMessage, setCustomMessage] = useState(initialMessage);
  const [includeChilledPackaging, setIncludeChilledPackaging] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const currentChampagne = CHAMPAGNE_OPTIONS.find((c) => c.id === selectedChampagneId) || CHAMPAGNE_OPTIONS[0];
  const currentStrawberries = STRAWBERRY_OPTIONS.find((s) => s.id === selectedStrawberryId) || STRAWBERRY_OPTIONS[0];
  const currentGlaze = CHOCOLATE_GLAZE_OPTIONS.find((g) => g.id === selectedGlazeId) || CHOCOLATE_GLAZE_OPTIONS[0];

  const totalGourmetPrice = currentChampagne.price + currentStrawberries.price;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleApply = () => {
    playChampagnePopSound();
    const pkgData = {
      champagne: currentChampagne,
      strawberries: currentStrawberries,
      glaze: currentGlaze,
      message: customMessage,
      includeChilledPackaging,
      totalPrice: totalGourmetPrice
    };

    localStorage.setItem('stardust_gourmet_package', JSON.stringify(pkgData));
    window.dispatchEvent(new CustomEvent('gourmet-package-updated', { detail: pkgData }));
    showToast('Pachetul Gourmet a fost actualizat cu succes!');
    if (onApplyPackage) onApplyPackage(pkgData);
  };

  return (
    <div
      id="gourmet-champagne-strawberries-selector"
      style={{
        background: isEmbedded ? 'transparent' : 'linear-gradient(145deg, #18030f 0%, #090106 100%)',
        color: '#ffffff',
        borderRadius: isEmbedded ? '0' : '24px',
        padding: isEmbedded ? '0' : '28px 24px',
        position: 'relative'
      }}
    >
      {toastMessage && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'linear-gradient(135deg, #059669, #047857)',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.84rem',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'start' }}>
        
        {/* Left Column: Visual Gourmet Showcase Card */}
        <div>
          <div
            id="gourmet-preview-card"
            style={{
              background: 'radial-gradient(circle at 50% 20%, #2a0819 0%, #0e0209 100%)',
              border: '1.5px solid rgba(225, 29, 72, 0.45)',
              borderRadius: '22px',
              padding: '24px',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7), 0 0 30px rgba(225, 29, 72, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Corner Luxury Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid rgba(245, 158, 11, 0.5)',
                color: '#fef08a',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                marginBottom: '16px'
              }}
            >
              <CrownIcon size={14} color="#fef08a" />
              <span>EXPERIENȚĂ GOURMET HAUTE COUTURE</span>
            </div>

            {/* Visual Pairing Composition */}
            <div
              style={{
                height: '240px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(20, 2, 12, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Bottle Showcase */}
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    width: '74px',
                    height: '160px',
                    borderRadius: '12px 12px 6px 6px',
                    background: currentChampagne.id !== 'none' 
                      ? currentChampagne.gradient 
                      : 'linear-gradient(180deg, #334155, #1e293b)',
                    border: '2px solid rgba(245, 158, 11, 0.6)',
                    boxShadow: currentChampagne.id !== 'none' 
                      ? '0 0 25px rgba(225, 29, 72, 0.5), inset 0 0 15px rgba(245, 158, 11, 0.3)' 
                      : 'none',
                    margin: '0 auto 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px'
                  }}
                >
                  {/* Foil Neck */}
                  <div style={{ width: '22px', height: '36px', background: 'linear-gradient(180deg, #fbbf24, #b45309)', borderRadius: '3px', border: '1px solid #fde047' }} />
                  {/* Champagne Label */}
                  <div style={{ background: '#fef3c7', border: '1px solid #b45309', borderRadius: '4px', padding: '3px 4px', width: '88%', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.58rem', fontWeight: 900, color: '#78350f', display: 'block', letterSpacing: '0.4px', lineHeight: 1.1 }}>
                      {currentChampagne.id === 'none' ? 'FĂRĂ ALCOOL' : currentChampagne.name.split(' ')[0]}
                    </span>
                    <span style={{ fontSize: '0.5rem', color: '#92400e', fontWeight: 700 }}>
                      {currentChampagne.volume}
                    </span>
                  </div>
                  {/* Base Punt */}
                  <div style={{ width: '40px', height: '6px', background: 'rgba(0,0,0,0.5)', borderRadius: '2px' }} />
                </div>
                <span style={{ fontSize: '0.74rem', color: '#fbcfe8', fontWeight: 700, display: 'block' }}>
                  {currentChampagne.name.split(' (')[0]}
                </span>
              </div>

              {/* Strawberries Gift Box Showcase */}
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '18px',
                    background: 'radial-gradient(circle, #2b0515 0%, #110208 100%)',
                    border: '2px solid rgba(245, 158, 11, 0.7)',
                    boxShadow: '0 0 25px rgba(245, 158, 11, 0.35)',
                    margin: '0 auto 8px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    padding: '10px',
                    gap: '6px',
                    alignItems: 'center',
                    justifyItems: 'center'
                  }}
                >
                  {currentStrawberries.id !== 'none' ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: i % 2 === 0 
                            ? 'linear-gradient(135deg, #1e0912, #0d0107)' 
                            : 'linear-gradient(135deg, #fb7185, #be123c)',
                          border: '1.5px solid #fbbf24',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 8px rgba(251, 191, 36, 0.5)'
                        }}
                        title="Căpșună în ciocolată belgiană cu foiță de aur 24K"
                      >
                        <StrawberryGoldIcon size={14} color="#fde047" />
                      </div>
                    ))
                  ) : (
                    <div style={{ gridColumn: 'span 3', color: '#64748b', fontSize: '0.72rem', fontStyle: 'italic' }}>
                      Doar Șampanie
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.74rem', color: '#fef08a', fontWeight: 700, display: 'block' }}>
                  {currentStrawberries.id !== 'none' 
                    ? `${currentStrawberries.pieces} Căpșuni Aur 24K` 
                    : 'Fără Căpșuni'}
                </span>
              </div>
            </div>

            {/* Inscription preview on chocolate */}
            {customMessage && currentStrawberries.id !== 'none' && (
              <div
                style={{
                  marginTop: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px dashed rgba(245, 158, 11, 0.4)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Edit3 size={14} color="#fde047" />
                  <span style={{ fontSize: '0.78rem', color: '#fda4af' }}>
                    Mesaj ciocolatier:
                  </span>
                  <strong style={{ fontFamily: 'Playfair Display, cursive', color: '#fef08a', fontSize: '0.95rem' }}>
                    „{customMessage}”
                  </strong>
                </div>
                <span style={{ fontSize: '0.68rem', background: '#059669', color: '#ffffff', padding: '2px 6px', borderRadius: '8px', fontWeight: 700 }}>
                  INCLUS
                </span>
              </div>
            )}

            {/* Price & Audio Button Bar */}
            <div
              style={{
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <span style={{ fontSize: '0.74rem', color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                  Preț Suplimentar Pachet:
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: totalGourmetPrice > 0 ? '#fef08a' : '#94a3b8' }}>
                  {totalGourmetPrice > 0 ? `+${formatPrice(totalGourmetPrice)}` : '0 RON'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  id="btn-sound-champagne-pop"
                  onClick={playChampagnePopSound}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', padding: '6px 12px' }}
                  title="Simulează sunetul desfundării dopului de șampanie și clinchetul cupelor"
                >
                  <Volume2 size={14} color="#f59e0b" />
                  <span>Sunet Pop Moët</span>
                </button>

                <button
                  type="button"
                  id="btn-apply-gourmet-package"
                  onClick={handleApply}
                  className="btn btn-gold btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '8px 16px', fontWeight: 800 }}
                >
                  <Sparkles size={14} />
                  <span>Aplică Pachetul</span>
                </button>
              </div>
            </div>

            {/* Isothermal Guarantee Box */}
            <div
              style={{
                marginTop: '14px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.74rem',
                color: '#a7f3d0'
              }}
            >
              <ShieldCheck size={16} color="#10b981" style={{ flexShrink: 0 }} />
              <span>
                Pungă termică izotermă cu gheață uscată la 4-8°C inclusă gratuit pentru prospețime desăvârșită.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Customizer Selectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Champagne Selector */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Wine size={16} color="#e11d48" />
              <label style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fbcfe8' }}>
                1. Alege Șampania / Vinul Spumant Regal:
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CHAMPAGNE_OPTIONS.map((item) => {
                const isSelected = selectedChampagneId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedChampagneId(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: isSelected ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(251, 191, 36, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      color: '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: isSelected ? '5px solid #fbbf24' : '2px solid rgba(255,255,255,0.3)',
                          flexShrink: 0
                        }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>{item.name}</span>
                          <span style={{ fontSize: '0.68rem', background: item.badgeColor, color: '#ffffff', padding: '1px 7px', borderRadius: '8px', fontWeight: 800 }}>
                            {item.badge}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.74rem', color: '#cbd5e1', display: 'block', marginTop: '2px' }}>
                          {item.tagline}
                        </span>
                      </div>
                    </div>

                    <strong style={{ color: item.price > 0 ? '#fef08a' : '#94a3b8', fontSize: '0.92rem', flexShrink: 0 }}>
                      {item.price > 0 ? `+${formatPrice(item.price)}` : '0 RON'}
                    </strong>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Strawberry Box Size */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <StrawberryGoldIcon size={16} color="#fbbf24" />
              <label style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fbcfe8' }}>
                2. Cutie Căpșuni Artizanale cu Foiță de Aur 24K:
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
              {STRAWBERRY_OPTIONS.map((straw) => {
                const isSelected = selectedStrawberryId === straw.id;
                return (
                  <button
                    key={straw.id}
                    type="button"
                    onClick={() => setSelectedStrawberryId(straw.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: isSelected ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(251, 191, 36, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      color: '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                      gap: '8px'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.68rem', background: '#d97706', color: '#ffffff', padding: '1px 6px', borderRadius: '8px', fontWeight: 800 }}>
                        {straw.badge}
                      </span>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, marginTop: '4px' }}>
                        {straw.name.split(' — ')[0]}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#cbd5e1', display: 'block', marginTop: '2px' }}>
                        {straw.desc}
                      </span>
                    </div>

                    <strong style={{ color: straw.price > 0 ? '#fef08a' : '#94a3b8', fontSize: '0.92rem' }}>
                      {straw.price > 0 ? `+${formatPrice(straw.price)}` : '0 RON'}
                    </strong>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Chocolate Glaze & Inscription */}
          {selectedStrawberryId !== 'none' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#fbcfe8', marginBottom: '8px' }}>
                3. Glazură & Sortiment Ciocolată Callebaut:
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                {CHOCOLATE_GLAZE_OPTIONS.map((glaze) => {
                  const isSelected = selectedGlazeId === glaze.id;
                  return (
                    <button
                      key={glaze.id}
                      type="button"
                      onClick={() => setSelectedGlazeId(glaze.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: isSelected ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isSelected ? 'rgba(225, 29, 72, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                        color: '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: isSelected ? 700 : 500
                      }}
                    >
                      <div style={{ color: isSelected ? '#fef08a' : '#ffffff', fontWeight: 700 }}>
                        {glaze.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                        {glaze.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Message Inscription Field */}
              <div>
                <label htmlFor="input-strawberry-message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '4px' }}>
                  Inscripție Caligrafiată cu Ciocolată Albă (Gratuit):
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="input-strawberry-message"
                    type="text"
                    maxLength={25}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Ex: Te iubesc, La Mulți Ani..."
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '0.86rem'
                    }}
                  />
                  {['Te iubesc', 'Forever', 'La Mulți Ani'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCustomMessage(preset)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#fbcfe8',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        fontSize: '0.72rem',
                        cursor: 'pointer'
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
