import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Scissors, 
  Droplets, 
  Thermometer, 
  Sun, 
  Calendar, 
  Volume2, 
  VolumeX, 
  Leaf, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { 
  RoseIcon, 
  DiamondIcon, 
  FlowerCareKitIcon, 
  StemCut45Icon 
} from './CustomIcons';

export default function FlowerCareGuideWidget({
  isEmbedded = false,
  onApplyConfig = null,
  onClose = null,
  initialData = null
}) {
  // Flower selection: fresh roses vs. preserved roses
  const [flowerType, setFlowerType] = useState(initialData?.flowerType || 'fresh_roses');
  
  // Care parameters
  const [hasCutStem, setHasCutStem] = useState(initialData?.hasCutStem ?? true);
  const [hasNutrients, setHasNutrients] = useState(initialData?.hasNutrients ?? true);
  const [roomTemp, setRoomTemp] = useState(initialData?.roomTemp ?? 19);
  const [waterChangeFreq, setWaterChangeFreq] = useState(initialData?.waterChangeFreq || 'every_2_days');
  const [hasDirectSun, setHasDirectSun] = useState(initialData?.hasDirectSun ?? false);
  const [protectGlitter, setProtectGlitter] = useState(initialData?.protectGlitter ?? true);
  
  // Selected Kit Addon
  const [selectedKitId, setSelectedKitId] = useState(initialData?.kitId || 'kit_standard');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCutAnimated, setIsCutAnimated] = useState(false);
  const [isCopiedSuccess, setIsCopiedSuccess] = useState(false);

  // Audio Context Ref
  const audioCtxRef = useRef(null);

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

  // Sound 1: Precision Floral Shears Stem Snip Sound
  const playStemCutSound = () => {
    if (!soundEnabled) return;
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.08);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio error ignored
    }
  };

  // Sound 2: Fresh Water Trickle Sound
  const playWaterPourSound = () => {
    if (!soundEnabled) return;
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(4.0, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio error ignored
    }
  };

  // Trigger Stem Cut Animation
  const handleTestStemCut = () => {
    setIsCutAnimated(true);
    playStemCutSound();
    setTimeout(() => {
      setIsCutAnimated(false);
      playWaterPourSound();
    }, 600);
  };

  // Longevity Calculation Logic
  const calculateLongevity = () => {
    if (flowerType === 'preserved_roses') {
      let years = 3.0;
      if (!hasDirectSun) years += 1.5;
      if (protectGlitter) years += 0.5;
      return {
        value: years.toFixed(1),
        unit: 'Ani',
        freshnessScore: Math.min(100, Math.round((years / 5) * 100)),
        badge: 'Trandafiri Nemuritori Stabilizați',
        color: '#10b981'
      };
    } else {
      let days = 7;
      if (hasCutStem) days += 3;
      if (hasNutrients) days += 3;
      
      // Temperature impact
      if (roomTemp <= 18) days += 2;
      else if (roomTemp <= 20) days += 1;
      else if (roomTemp >= 24) days -= 2;

      // Water change frequency
      if (waterChangeFreq === 'daily') days += 2;
      else if (waterChangeFreq === 'every_2_days') days += 1;
      else if (waterChangeFreq === 'rarely') days -= 2;

      // Sun impact
      if (hasDirectSun) days -= 2;

      // Glitter care
      if (protectGlitter) days += 1;

      const clampedDays = Math.max(5, Math.min(17, days));
      const score = Math.min(100, Math.round((clampedDays / 16) * 100));

      return {
        value: clampedDays,
        unit: 'Zile de Prospețime',
        freshnessScore: score,
        badge: clampedDays >= 13 ? 'Prospețime Dublă de Atelier' : (clampedDays >= 10 ? 'Durată Excelentă' : 'Longevitate Standard'),
        color: clampedDays >= 13 ? '#10b981' : (clampedDays >= 10 ? '#f59e0b' : '#ef4444')
      };
    }
  };

  const longevityData = calculateLongevity();

  // Care Kit Packages
  const CARE_KITS = [
    {
      id: 'kit_standard',
      name: 'Kit Îngrijire & Nutrienți Chrysal (3 Plicuri + Bisturiu 45°)',
      price: 29,
      sub: 'Nutrienți olandezi cu glucoză & bactericid organic + bisturiu',
      items: ['3x Plicuri Chrysal Supreme Olanda', '1x Bisturiu de atelier tăiere 45°', 'Ghid fizic caligrafic tipărit']
    },
    {
      id: 'kit_deluxe',
      name: 'Set Regal Master Florist (Nutrienți + Flacon Spray + Foarfecă)',
      price: 45,
      sub: 'Kit complet de atelier pentru păstrare optimă 14-16 zile',
      items: ['5x Plicuri Chrysal Supreme', '1x Foarfecă florală japoneză', '1x Flacon spray rehidratare tijă', 'Ghid premium']
    }
  ];

  const currentKit = CARE_KITS.find(k => k.id === selectedKitId) || CARE_KITS[0];

  const handleApply = () => {
    const config = {
      flowerType,
      hasCutStem,
      hasNutrients,
      roomTemp,
      waterChangeFreq,
      hasDirectSun,
      protectGlitter,
      kitId: currentKit.id,
      kitName: currentKit.name,
      estimatedDays: longevityData.value,
      totalPrice: currentKit.price
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
      className="flower-care-guide-container"
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
      {/* Background Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 2, paddingRight: isEmbedded ? '0' : '52px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', marginBottom: '8px' }}>
            <FlowerCareKitIcon size={14} color="#10b981" />
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#6ee7b7' }}>
              Ghid Științific de Atelier • Longevitate 14+ Zile
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', fontFamily: "'Cinzel', serif", color: '#ffffff', letterSpacing: '0.5px' }}>
            Ghid Interactiv de Îngrijire & Calculator de Longevitate
          </h2>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, maxWidth: '640px', lineHeight: '1.5' }}>
            Află exact cum să dublezi durata de viață a trandafirilor tăi Stardust. Ajustează temperatura camerei, tăierea tijei și nutrienții pentru a simula în timp real prospețimea și strălucirea diamantului.
          </p>
        </div>

        {/* Sound Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            id="btn-toggle-care-sound"
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
              color: soundEnabled ? '#10b981' : '#6b7280',
              cursor: 'pointer'
            }}
            title={soundEnabled ? "Dezactivează sunetele acustice" : "Activează sunetele acustice"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Flower Type Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '22px', position: 'relative', zIndex: 2 }}>
        <button
          type="button"
          id="btn-care-type-fresh"
          onClick={() => setFlowerType('fresh_roses')}
          style={{
            flex: 1,
            background: flowerType === 'fresh_roses' ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.3) 0%, rgba(136, 19, 55, 0.4) 100%)' : 'rgba(255, 255, 255, 0.04)',
            border: flowerType === 'fresh_roses' ? '1.5px solid rgba(244, 63, 94, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '14px',
            padding: '12px 16px',
            color: '#ffffff',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            whiteSpace: 'nowrap !important'
          }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(225, 29, 72, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <RoseIcon size={18} color="#f43f5e" />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800' }}>Trandafiri Proaspeți cu Sclipici Diamant</div>
            <div style={{ fontSize: '11px', color: '#fda4af' }}>Flori proaspete naturale ecuadoriene de grad A+ (7-16 Zile)</div>
          </div>
        </button>

        <button
          type="button"
          id="btn-care-type-preserved"
          onClick={() => setFlowerType('preserved_roses')}
          style={{
            flex: 1,
            background: flowerType === 'preserved_roses' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(6, 78, 59, 0.4) 100%)' : 'rgba(255, 255, 255, 0.04)',
            border: flowerType === 'preserved_roses' ? '1.5px solid rgba(52, 211, 153, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '14px',
            padding: '12px 16px',
            color: '#ffffff',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            whiteSpace: 'nowrap !important'
          }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <DiamondIcon size={18} color="#34d399" />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800' }}>Trandafiri Nemuritori Stabilizați</div>
            <div style={{ fontSize: '11px', color: '#a7f3d0' }}>Tratați criogenic organic prin glicerinare (3-5 Ani Veșnici)</div>
          </div>
        </button>
      </div>

      {/* Dynamic Longevity Forecast Dashboard Banner */}
      <div 
        id="care-longevity-dashboard-hud"
        style={{
          background: 'linear-gradient(180deg, rgba(17, 8, 22, 0.95) 0%, rgba(10, 4, 13, 0.95) 100%)',
          border: '1.5px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '18px',
          padding: '20px 24px',
          marginBottom: '24px',
          boxShadow: 'inset 0 0 35px rgba(0, 0, 0, 0.7)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: longevityData.color,
                boxShadow: `0 0 8px ${longevityData.color}` 
              }} />
              <span style={{ fontSize: '11px', fontWeight: '800', color: longevityData.color, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {longevityData.badge}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <div style={{ fontSize: '38px', fontWeight: '900', fontFamily: "'Cinzel', serif", color: '#ffffff' }}>
                {longevityData.value}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#d1d5db' }}>
                {longevityData.unit}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
              {flowerType === 'fresh_roses' 
                ? 'Garantat de atelier prin aplicarea corectă a celor 3 pași esențiali.'
                : 'Păstrați în cutia originală, feriți de expunerea directă la soare și umiditate extremă.'}
            </div>
          </div>

          {/* Freshness Vitality Meter */}
          <div style={{ minWidth: '220px', flex: '1 1 240px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
              <span style={{ color: '#d1d5db' }}>Scor Vitalitate & Strălucire:</span>
              <span style={{ color: longevityData.color }}>{longevityData.freshnessScore}%</span>
            </div>
            <div style={{ height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <div 
                style={{
                  height: '100%',
                  width: `${longevityData.freshnessScore}%`,
                  background: `linear-gradient(90deg, #e11d48 0%, #f59e0b 50%, #10b981 100%)`,
                  borderRadius: '10px',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>
              <span>Standard (7 zile)</span>
              <span>Dublat (14+ zile)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px', marginBottom: '26px' }}>
        
        {/* Left Column: Environmental & Care Toggles */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#e5e7eb', marginBottom: '12px' }}>
            Factori de Mediu & Îngrijire Acasă:
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* Cut stem toggle */}
            <label 
              id="label-care-cut-stem"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                background: hasCutStem ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: hasCutStem ? '1.5px solid rgba(16, 185, 129, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StemCut45Icon size={18} color={hasCutStem ? '#34d399' : '#9ca3af'} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                    Tăiere Tijă la 45° Sub Jet de Apă
                  </div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                    Mărește absorbția capilară cu 141% (+3 Zile)
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                id="checkbox-care-cut-stem"
                checked={hasCutStem}
                onChange={(e) => setHasCutStem(e.target.checked)}
                style={{ accentColor: '#10b981', width: '16px', height: '16px' }}
              />
            </label>

            {/* Nutrients toggle */}
            <label 
              id="label-care-nutrients"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                background: hasNutrients ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: hasNutrients ? '1.5px solid rgba(16, 185, 129, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FlowerCareKitIcon size={18} color={hasNutrients ? '#34d399' : '#9ca3af'} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                    Adăugare Plic Nutrienți Chrysal
                  </div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                    Inhibă bacteriile & oferă glucoză pură (+3 Zile)
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                id="checkbox-care-nutrients"
                checked={hasNutrients}
                onChange={(e) => setHasNutrients(e.target.checked)}
                style={{ accentColor: '#10b981', width: '16px', height: '16px' }}
              />
            </label>

            {/* Room temperature slider */}
            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Thermometer size={16} color="#fbbf24" />
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Temperatura Camerei:</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '800', color: roomTemp <= 20 ? '#34d399' : (roomTemp <= 23 ? '#fbbf24' : '#ef4444') }}>
                  {roomTemp}°C {roomTemp <= 20 ? '(Optim Atelier)' : (roomTemp >= 24 ? '(Risc Căldură)' : '')}
                </span>
              </div>
              <input
                type="range"
                id="slider-care-room-temp"
                min={16}
                max={26}
                value={roomTemp}
                onChange={(e) => setRoomTemp(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>
                <span>16°C (Răcoare nobilă)</span>
                <span>20°C (Optim)</span>
                <span>26°C (Căldură excesivă)</span>
              </div>
            </div>

            {/* Water change frequency */}
            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Droplets size={16} color="#38bdf8" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Frecvență Schimbare Apă:</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {[
                  { id: 'daily', label: 'Zilnic (+2 Zile)' },
                  { id: 'every_2_days', label: 'La 2 Zile (Recomandat)' },
                  { id: 'rarely', label: 'Rar / Niciodată' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    id={`btn-care-water-${opt.id}`}
                    onClick={() => setWaterChangeFreq(opt.id)}
                    style={{
                      background: waterChangeFreq === opt.id ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                      border: waterChangeFreq === opt.id ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '6px 8px',
                      fontSize: '11px',
                      fontWeight: waterChangeFreq === opt.id ? '700' : '500',
                      color: waterChangeFreq === opt.id ? '#7dd3fc' : '#9ca3af',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap !important'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sunlight & Air Draft Protection */}
            <label 
              id="label-care-direct-sun"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '12px',
                background: hasDirectSun ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: hasDirectSun ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sun size={16} color={hasDirectSun ? '#f87171' : '#9ca3af'} />
                <div style={{ fontSize: '12px', color: '#d1d5db' }}>
                  Așezat în bătaia directă a soarelui sau lângă calorifer?
                </div>
              </div>
              <input
                type="checkbox"
                id="checkbox-care-direct-sun"
                checked={hasDirectSun}
                onChange={(e) => setHasDirectSun(e.target.checked)}
                style={{ accentColor: '#ef4444', width: '15px', height: '15px' }}
              />
            </label>

          </div>
        </div>

        {/* Right Column: Stem Cut Angle Visualizer & 4 Golden Rules */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#e5e7eb', marginBottom: '12px' }}>
            Știința Tăierii Tijei: Unghi 90° vs. 45°:
          </label>

          {/* Interactive Bevel Cut Visualizer */}
          <div 
            style={{
              background: 'linear-gradient(180deg, rgba(20, 10, 24, 0.8) 0%, rgba(10, 4, 14, 0.9) 100%)',
              border: '1.5px solid rgba(225, 29, 72, 0.3)',
              borderRadius: '16px',
              padding: '16px 18px',
              marginBottom: '16px',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '12px', marginBottom: '12px' }}>
              
              {/* 90-degree Flat Cut (Bad) */}
              <div style={{ opacity: 0.65 }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#f87171', marginBottom: '6px' }}>
                  Tăietură Dreaptă (90°)
                </div>
                <div style={{ width: '40px', height: '70px', margin: '0 auto', background: '#3f3f46', borderRadius: '4px 4px 0 0', borderBottom: '3px solid #ef4444', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: '#ef4444', whiteSpace: 'nowrap' }}>
                    Canale Blocate
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '22px' }}>Absorbție 40%</div>
              </div>

              <div style={{ fontSize: '16px', color: '#6b7280', fontWeight: '800' }}>VS</div>

              {/* 45-degree Beveled Cut (Recommended) */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#34d399', marginBottom: '6px' }}>
                  Unghi Diagonal (45°) Stardust
                </div>
                <div 
                  style={{ 
                    width: '40px', 
                    height: '70px', 
                    margin: '0 auto', 
                    background: isCutAnimated ? '#10b981' : '#15803d', 
                    borderRadius: '4px 4px 0 0', 
                    clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 100%)',
                    boxShadow: isCutAnimated ? '0 0 15px #10b981' : 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#ffffff', fontWeight: '800' }}>
                    45°
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: '#34d399', fontWeight: '700', marginTop: '10px' }}>Absorbție 100% (+141%)</div>
              </div>
            </div>

            <button
              type="button"
              id="btn-care-simulate-stem-cut"
              onClick={handleTestStemCut}
              style={{
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                color: '#6ee7b7',
                padding: '7px 16px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap !important'
              }}
            >
              <Scissors size={14} />
              <span>Simulează Tăierea la 45° (Sunet Foarfecă)</span>
            </button>
          </div>

          {/* 4 Golden Care Rules from Master Florist Elena */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ padding: '8px 10px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4' }}>
              <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '2px' }}>1. 3-5 cm Apă în Vază</strong>
              Tijele nu au nevoie de multă apă; apa în exces favorizează apariția bacteriilor.
            </div>
            <div style={{ padding: '8px 10px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4' }}>
              <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '2px' }}>2. Fără Fructe Aproape</strong>
              Bananele și merele emană etilenă care grăbește ofilirea petalelor.
            </div>
            <div style={{ padding: '8px 10px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4' }}>
              <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '2px' }}>3. Tăiere Sub Jet de Apă</strong>
              Previne formarea bulelor microscopice de aer (embolie vasculară vegetală).
            </div>
            <div style={{ padding: '8px 10px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4' }}>
              <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '2px' }}>4. Nu Uda Petalele</strong>
              Sclipiciul Stardust este fixat organic; apa pulverizată pe floare dăunează.
            </div>
          </div>
        </div>

      </div>

      {/* VIP Care Kit Addon Selector */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#e5e7eb', marginBottom: '10px' }}>
          Adaugă Kitul Fizic de Îngrijire & Nutrienți de Atelier:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          {CARE_KITS.map((kit) => {
            const isSelected = selectedKitId === kit.id;
            return (
              <button
                key={kit.id}
                type="button"
                id={`btn-care-kit-${kit.id}`}
                onClick={() => setSelectedKitId(kit.id)}
                style={{
                  background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? '1.5px solid rgba(16, 185, 129, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  whiteSpace: 'nowrap !important'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff' }}>
                    {kit.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                    {kit.sub}
                  </div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#34d399', marginLeft: '12px' }}>
                  +{kit.price} RON
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Footer Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', borderTop: '1.5px solid rgba(16, 185, 129, 0.3)', paddingTop: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af' }}>
            Kit Îngrijire Longevitate Selectat:
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', fontFamily: "'Cinzel', serif" }}>
            {currentKit.price} RON
            <span style={{ fontSize: '12px', fontWeight: '500', color: '#9ca3af', marginLeft: '6px', fontFamily: 'sans-serif' }}>
              (garantează 14+ zile de prospețime)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onClose && (
            <button
              type="button"
              id="btn-close-care-modal"
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
            id="btn-apply-care-config"
            onClick={handleApply}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: '1px solid rgba(52, 211, 153, 0.5)',
              color: '#ffffff',
              padding: '12px 26px',
              borderRadius: '14px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.45)',
              whiteSpace: 'nowrap !important'
            }}
          >
            {isCopiedSuccess ? <Check size={16} /> : <FlowerCareKitIcon size={16} color="#ffffff" />}
            <span>{isCopiedSuccess ? 'Kit Salvat!' : `Adaugă Kitul de Îngrijire (${currentKit.price} RON)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
