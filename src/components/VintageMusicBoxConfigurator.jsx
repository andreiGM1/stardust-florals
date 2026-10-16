import React, { useState, useRef, useEffect } from 'react';
import { Check, Sparkles, X, Volume2 } from 'lucide-react';
import { 
  MusicBoxCrankIcon, 
  MusicMelodyRollIcon, 
  CrownIcon, 
  SparkleIcon, 
  DiamondIcon,
  RoseIcon
} from './CustomIcons';

// Melody definitions with realistic music box frequencies (Hz) and note durations (ms)
export const MUSIC_BOX_MELODIES = [
  {
    id: 'la-vie-en-rose',
    title: 'Édith Piaf — La Vie En Rose',
    composer: 'Édith Piaf & Louiguy',
    tempoDescription: 'Vals lent romantic parizian',
    notes: [
      { f: 392.00, d: 280 }, // G4
      { f: 440.00, d: 280 }, // A4
      { f: 493.88, d: 350 }, // B4
      { f: 587.33, d: 500 }, // D5
      { f: 493.88, d: 300 }, // B4
      { f: 440.00, d: 300 }, // A4
      { f: 392.00, d: 380 }, // G4
      { f: 329.63, d: 420 }, // E4
      { f: 392.00, d: 650 }, // G4
      { f: 440.00, d: 300 }, // A4
      { f: 493.88, d: 320 }, // B4
      { f: 587.33, d: 520 }, // D5
      { f: 523.25, d: 350 }, // C5
      { f: 440.00, d: 350 }, // A4
      { f: 392.00, d: 700 }  // G4
    ]
  },
  {
    id: 'swan-lake',
    title: 'P.I. Tchaikovsky — Lacul Lebedelor',
    composer: 'Piotr Ilici Ceaikovski',
    tempoDescription: 'Nobil, regal și misterios',
    notes: [
      { f: 493.88, d: 280 }, // B4
      { f: 659.25, d: 420 }, // E5
      { f: 739.99, d: 300 }, // F#5
      { f: 783.99, d: 420 }, // G5
      { f: 739.99, d: 300 }, // F#5
      { f: 659.25, d: 450 }, // E5
      { f: 493.88, d: 300 }, // B4
      { f: 659.25, d: 420 }, // E5
      { f: 783.99, d: 380 }, // G5
      { f: 880.00, d: 550 }, // A5
      { f: 783.99, d: 350 }, // G5
      { f: 739.99, d: 350 }, // F#5
      { f: 659.25, d: 700 }  // E5
    ]
  },
  {
    id: 'canon-in-d',
    title: 'Johann Pachelbel — Canon în D Major',
    composer: 'Johann Pachelbel',
    tempoDescription: 'Armonie solemnă & jurământ etern',
    notes: [
      { f: 739.99, d: 350 }, // F#5
      { f: 659.25, d: 350 }, // E5
      { f: 587.33, d: 350 }, // D5
      { f: 554.37, d: 350 }, // C#5
      { f: 493.88, d: 350 }, // B4
      { f: 440.00, d: 350 }, // A4
      { f: 493.88, d: 350 }, // B4
      { f: 554.37, d: 350 }, // C#5
      { f: 587.33, d: 450 }, // D5
      { f: 739.99, d: 450 }, // F#5
      { f: 880.00, d: 450 }, // A5
      { f: 587.33, d: 650 }  // D5
    ]
  },
  {
    id: 'romeo-and-juliet',
    title: 'Nino Rota — Love Theme (A Time For Us)',
    composer: 'Nino Rota',
    tempoDescription: 'Iubire pasională nemuritoare',
    notes: [
      { f: 659.25, d: 320 }, // E5
      { f: 880.00, d: 450 }, // A5
      { f: 830.61, d: 320 }, // G#5
      { f: 880.00, d: 320 }, // A5
      { f: 987.77, d: 420 }, // B5
      { f: 1046.50, d: 520 }, // C6
      { f: 987.77, d: 350 }, // B5
      { f: 880.00, d: 450 }, // A5
      { f: 659.25, d: 550 }, // E5
      { f: 587.33, d: 350 }, // D5
      { f: 659.25, d: 700 }  // E5
    ]
  },
  {
    id: 'clair-de-lune',
    title: 'Claude Debussy — Clair de Lune',
    composer: 'Claude Debussy',
    tempoDescription: 'Serenitate sub lumina lunii',
    notes: [
      { f: 698.46, d: 360 }, // F5
      { f: 622.25, d: 360 }, // Eb5
      { f: 554.37, d: 420 }, // Db5
      { f: 523.25, d: 360 }, // C5
      { f: 466.16, d: 420 }, // Bb4
      { f: 415.30, d: 500 }, // Ab4
      { f: 554.37, d: 400 }, // Db5
      { f: 698.46, d: 650 }  // F5
    ]
  }
];

export const MUSIC_BOX_FINISHES = [
  {
    id: 'swiss-gold-24k',
    name: 'Mecanism Elvețian Placat cu Aur 24K',
    price: 85,
    tag: 'RECOMANDAT VIP',
    badgeColor: '#fbbf24',
    badgeBg: 'rgba(245, 158, 11, 0.2)',
    description: '18 note de înaltă precizie, cilindru lustruit manual din alamă masivă și șasiu placat cu aur galben 24K sub sticlă cristal.',
    accentColor: '#fbbf24',
    cylinderGradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 50%, #b45309 100%)'
  },
  {
    id: 'sankyo-rose-gold',
    name: 'Mecanism Sankyo Deluxe Rose Gold & Cutie Acrilică',
    price: 95,
    tag: 'ULTRA-ROMANTIC',
    badgeColor: '#fb7185',
    badgeBg: 'rgba(244, 63, 94, 0.2)',
    description: '18 note acordate armonic, ton cald și catifelat, angrenaje din cupru rose gold vizibile prin cupolă acrilică securizată.',
    accentColor: '#fb7185',
    cylinderGradient: 'linear-gradient(135deg, #be123c 0%, #fb7185 50%, #9f1239 100%)'
  },
  {
    id: 'imperial-heritage-bronze',
    name: 'Mecanism Heritage 30 Note — Bronz Antichizat & Fildeș',
    price: 125,
    tag: 'POLIFONIE EXTINSĂ',
    badgeColor: '#fde68a',
    badgeBg: 'rgba(180, 83, 9, 0.25)',
    description: '30 de lame de rezonanță polifonică pentru o profunzime acustică de sală de concert vieneză și timbru nobil vintage.',
    accentColor: '#d97706',
    cylinderGradient: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #fde68a 100%)'
  }
];

export const ACTIVATION_MODES = [
  {
    id: 'optical-sensor',
    name: 'Senzor la Ridicarea Capacului (Surpriză Automată)',
    icon: SparkleIcon,
    description: 'Melodia pornește feeric și delicat în momentul exact în care destinatarul ridică capacul cutiei de catifea.'
  },
  {
    id: 'golden-crank',
    name: 'Manivelă Manuală Aurie la Baza Cutiei (Vintage Tactil)',
    icon: MusicBoxCrankIcon,
    description: 'Manivelă aurie retro montată discret pe lateralul bazei, ce poate fi rotită manual pentru a produce sunetul oricând.'
  }
];

export default function VintageMusicBoxConfigurator({ 
  onSaveConfig, 
  initialConfig = null, 
  isEmbedded = false,
  onClose = null 
}) {
  const [selectedMelodyId, setSelectedMelodyId] = useState(
    initialConfig?.melodyId || 'la-vie-en-rose'
  );
  const [selectedFinishId, setSelectedFinishId] = useState(
    initialConfig?.finishId || 'swiss-gold-24k'
  );
  const [selectedModeId, setSelectedModeId] = useState(
    initialConfig?.modeId || 'optical-sensor'
  );
  const [engravedPlateText, setEngravedPlateText] = useState(
    initialConfig?.engravedText || 'Pentru Sufletul Meu Pereche'
  );
  const [isWinding, setIsWinding] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNoteIdx, setActiveNoteIdx] = useState(-1);
  const [crankRotation, setCrankRotation] = useState(0);

  const audioCtxRef = useRef(null);
  const playbackTimeoutRef = useRef([]);

  const currentMelody = MUSIC_BOX_MELODIES.find(m => m.id === selectedMelodyId) || MUSIC_BOX_MELODIES[0];
  const currentFinish = MUSIC_BOX_FINISHES.find(f => f.id === selectedFinishId) || MUSIC_BOX_FINISHES[0];

  // Helper to lazily initialize Web Audio Context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Synthesize a mechanical music box tine pluck
  const playMusicBoxTine = (freq, durationMs = 600) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Mechanical "tine click/plink" impulse
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(freq * 3, now);
      clickOsc.frequency.exponentialRampToValueAtTime(100, now + 0.03);
      clickGain.gain.setValueAtTime(0.08, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.03);

      // 2. Primary resonant tine (Pure bell sine with subtle triangle richness)
      const primaryOsc = ctx.createOscillator();
      const primaryGain = ctx.createGain();
      primaryOsc.type = 'sine';
      primaryOsc.frequency.setValueAtTime(freq, now);

      // Fast attack, exponential music box bell decay
      primaryGain.gain.setValueAtTime(0.0001, now);
      primaryGain.gain.linearRampToValueAtTime(0.35, now + 0.004);
      primaryGain.gain.exponentialRampToValueAtTime(0.0001, now + (durationMs / 1000) * 1.6);

      primaryOsc.connect(primaryGain);

      // 3. Overtone harmonic (Music box comb tine 2nd overtone ~ 2.76x)
      const overtoneOsc = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtoneOsc.type = 'sine';
      overtoneOsc.frequency.setValueAtTime(freq * 2.76, now);

      overtoneGain.gain.setValueAtTime(0.0001, now);
      overtoneGain.gain.linearRampToValueAtTime(0.09, now + 0.003);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + (durationMs / 1000) * 0.7);

      overtoneOsc.connect(overtoneGain);

      // 4. Subtle warmth filter for wooden/metal resonance box
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, now);

      primaryGain.connect(filter);
      overtoneGain.connect(filter);
      filter.connect(ctx.destination);

      primaryOsc.start(now);
      overtoneOsc.start(now);

      const stopTime = now + (durationMs / 1000) * 1.8;
      primaryOsc.stop(stopTime);
      overtoneOsc.stop(stopTime);
    } catch {
      // Audio fallback silent fail
    }
  };

  // Play a vintage crank ratchet winding click
  const playCrankRatchetSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Silent fail
    }
  };

  const stopPlayback = () => {
    playbackTimeoutRef.current.forEach(clearTimeout);
    playbackTimeoutRef.current = [];
    setIsPlaying(false);
    setActiveNoteIdx(-1);
  };

  const handleWindAndPlay = () => {
    stopPlayback();
    setIsWinding(true);
    playCrankRatchetSound();
    setCrankRotation(prev => prev + 360);

    // After 600ms winding animation, start the music sequence
    const windTimer = setTimeout(() => {
      setIsWinding(false);
      setIsPlaying(true);

      let accumulatedTime = 0;
      currentMelody.notes.forEach((note, index) => {
        const timer = setTimeout(() => {
          setActiveNoteIdx(index);
          playMusicBoxTine(note.f, note.d);
        }, accumulatedTime);

        playbackTimeoutRef.current.push(timer);
        accumulatedTime += note.d;
      });

      // End of melody
      const endTimer = setTimeout(() => {
        setIsPlaying(false);
        setActiveNoteIdx(-1);
      }, accumulatedTime + 1000);

      playbackTimeoutRef.current.push(endTimer);
    }, 600);

    playbackTimeoutRef.current.push(windTimer);
  };

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  const handleSave = () => {
    stopPlayback();
    const configData = {
      melodyId: selectedMelodyId,
      melodyTitle: currentMelody.title,
      finishId: selectedFinishId,
      finishName: currentFinish.name,
      modeId: selectedModeId,
      modeName: ACTIVATION_MODES.find(m => m.id === selectedModeId)?.name,
      engravedText: engravedPlateText.trim(),
      totalPrice: currentFinish.price
    };

    if (onSaveConfig) {
      onSaveConfig(configData);
    }
  };

  return (
    <div 
      id="vintage-music-box-configurator-container"
      style={{
        width: '100%',
        maxWidth: '920px',
        margin: '0 auto',
        borderRadius: '26px',
        padding: '24px 28px',
        color: '#ffffff',
        background: isEmbedded 
          ? 'radial-gradient(circle at 50% 0%, rgba(38, 20, 10, 0.95) 0%, rgba(12, 7, 4, 0.98) 100%)' 
          : 'transparent',
        border: isEmbedded ? '1.5px solid rgba(245, 158, 11, 0.35)' : 'none',
        boxShadow: isEmbedded ? '0 20px 50px rgba(0,0,0,0.6)' : 'none',
        boxSizing: 'border-box'
      }}
    >
      {/* Header with Luxury Brand Seal */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
          paddingBottom: '20px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              marginBottom: '8px'
            }}
          >
            <MusicBoxCrankIcon size={14} color="#f59e0b" />
            <span>Mecanică Elvețiană & Acustică Vintage</span>
          </div>
          <h2 
            style={{
              fontSize: '1.75rem',
              fontWeight: 900,
              color: '#fef3c7',
              margin: '0 0 6px 0',
              fontFamily: 'serif',
              letterSpacing: '0.2px'
            }}
          >
            Cutie Muzicală Mecanică în Baza Aranjamentului
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#d1d5db', margin: 0, lineHeight: 1.5 }}>
            Mecanism cu arc din alamă lustruită montat ascuns în cutia de flori, ce intonează o melodie de dragoste nemuritoare.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Cost Addon</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24', fontFamily: 'serif' }}>+{currentFinish.price} RON</div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={() => {
                stopPlayback();
                onClose();
              }}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Închide"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Interactive 3D Music Box Showcase & Crank */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '360px',
              borderRadius: '24px',
              border: '1.5px solid rgba(245, 158, 11, 0.35)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'radial-gradient(circle at 50% 25%, #2a180d 0%, #170d06 60%, #0a0502 100%)',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Badges */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.68rem', color: 'rgba(251, 191, 36, 0.7)', fontFamily: 'monospace', letterSpacing: '1px' }}>
                18-TINES • SWISS CRAFT
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: '#fbbf24', fontFamily: 'monospace' }}>
                <CrownIcon size={12} color="#fbbf24" />
                <span>EDITION NO. 74</span>
              </div>
            </div>

            {/* Rotating Brass Cylinder & Comb Assembly Simulation */}
            <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0' }}>
              
              {/* Floating Music Notes Animation */}
              {isPlaying && (
                <div style={{ position: 'absolute', top: '-18px', left: 0, right: 0, display: 'flex', justifyContent: 'space-around', pointerEvents: 'none' }}>
                  <div style={{ animation: 'bounce 0.8s infinite' }}>
                    <MusicMelodyRollIcon size={14} color="#fcd34d" />
                  </div>
                  <div style={{ animation: 'pulse 0.6s infinite' }}>
                    <SparkleIcon size={12} color="#f472b6" />
                  </div>
                  <div style={{ animation: 'bounce 0.9s infinite' }}>
                    <MusicBoxCrankIcon size={14} color="#fde68a" />
                  </div>
                </div>
              )}

              {/* Glass Dome Acoustic Chamber */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '160px',
                  borderRadius: '18px',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, rgba(10, 6, 3, 0.8) 100%)',
                  backdropFilter: 'blur(4px)',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                  boxSizing: 'border-box',
                  overflow: 'hidden'
                }}
              >
                {/* Visual Glass Sheen Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: 0.15,
                    background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.6) 45%, transparent 60%)'
                  }}
                />

                {/* The Music Comb (Steel Tines at Top) */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '4px',
                    width: '100%',
                    marginBottom: '10px'
                  }}
                >
                  {[...Array(18)].map((_, i) => {
                    const isVibrating = activeNoteIdx % 18 === i;
                    return (
                      <div 
                        key={i} 
                        style={{
                          width: '7px',
                          height: `${24 + (i * 0.9)}px`,
                          borderRadius: '2px 2px 0 0',
                          backgroundColor: isVibrating ? '#fef08a' : '#d4af37',
                          boxShadow: isVibrating ? '0 0 10px #fbbf24' : '0 1px 2px rgba(0,0,0,0.4)',
                          transform: isVibrating ? 'translateY(3px)' : 'none',
                          transition: 'all 0.08s ease',
                          flexShrink: 0
                        }}
                      />
                    );
                  })}
                </div>

                {/* Rotating Pin Cylinder (Barrel) */}
                <div 
                  style={{
                    position: 'relative',
                    width: '88%',
                    height: '42px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '0 12px',
                    border: '1.5px solid rgba(254, 240, 138, 0.4)',
                    background: currentFinish.cylinderGradient,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.6)',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Subtle Cylinder Pin Grid */}
                  {[...Array(7)].map((_, pIdx) => (
                    <div 
                      key={pIdx} 
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 4px rgba(255,255,255,0.8)',
                        opacity: isPlaying ? 0.95 : 0.6,
                        transform: isPlaying ? 'scale(1.2)' : 'none',
                        transition: 'transform 0.15s ease'
                      }}
                    />
                  ))}
                </div>

                {/* Sound Chamber Base Text */}
                <div style={{ fontSize: '0.68rem', color: 'rgba(254, 240, 138, 0.8)', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'serif', marginTop: '10px' }}>
                  {currentFinish.name.split(' ')[1] || 'Sankyo'} • Soundboard 24K
                </div>
              </div>
            </div>

            {/* Engraved Brass Plate on Base */}
            <div 
              style={{
                width: '100%',
                marginTop: '12px',
                borderRadius: '10px',
                border: '1px solid rgba(245, 158, 11, 0.5)',
                background: 'linear-gradient(90deg, rgba(146, 64, 14, 0.7) 0%, rgba(180, 83, 9, 0.9) 50%, rgba(146, 64, 14, 0.7) 100%)',
                padding: '10px 14px',
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#fde68a', fontFamily: 'monospace' }}>
                Placă de Rezonanță din Alamă Masivă
              </div>
              <div style={{ fontSize: '0.88rem', fontFamily: 'serif', fontStyle: 'italic', color: '#ffffff', fontWeight: 800, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                "{engravedPlateText.trim() || 'Fără gravură'}"
              </div>
            </div>

            {/* Crank Winding Interactive Trigger */}
            <div 
              style={{
                width: '100%',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '16px',
                padding: '10px',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                boxSizing: 'border-box'
              }}
            >
              <button
                id="btn-wind-music-box-crank"
                type="button"
                onClick={handleWindAndPlay}
                disabled={isPlaying}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: isPlaying ? 'not-allowed' : 'pointer',
                  opacity: isPlaying ? 0.6 : 1,
                  border: 'none',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)',
                  color: '#0a0a0a',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
                  whiteSpace: 'nowrap',
                  boxSizing: 'border-box'
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    transform: `rotate(${crankRotation}deg)`,
                    transition: 'transform 0.5s ease'
                  }}
                >
                  <MusicBoxCrankIcon size={18} color="#0a0a0a" />
                </div>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {isWinding ? 'Se întoarce arcul...' : isPlaying ? 'Se intonează melodia...' : 'Rotește Manivela & Ascultă'}
                </span>
              </button>

              {isPlaying && (
                <button
                  type="button"
                  onClick={stopPlayback}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#e5e7eb',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  title="Oprește melodia"
                >
                  Stop
                </button>
              )}
            </div>
          </div>

          {/* Current Playing Melody Indicator */}
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#fde68a', fontFamily: 'serif', fontStyle: 'italic' }}>
              {isPlaying ? 'Redare acustică activă...' : 'Apasă butonul auriu pentru test acustic live'}
            </span>
          </div>
        </div>

        {/* Right Column: Melodies, Finishes, Activation Mode & Custom Engraving */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* 1. Selector Melodie */}
          <div 
            style={{
              background: 'rgba(24, 24, 27, 0.65)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '16px',
              padding: '16px 18px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#fbbf24', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MusicMelodyRollIcon size={15} color="#f59e0b" />
                <span>1. Alege Melodia Mecanică</span>
              </label>
              <span style={{ fontSize: '0.74rem', color: '#9ca3af' }}>5 capodopere romantice</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
              {MUSIC_BOX_MELODIES.map(melody => {
                const isSelected = selectedMelodyId === melody.id;
                return (
                  <button
                    key={melody.id}
                    type="button"
                    onClick={() => {
                      setSelectedMelodyId(melody.id);
                      stopPlayback();
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: isSelected ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.12)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 0, 0, 0.35)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: '6px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, fontFamily: 'serif', color: '#fef3c7', lineHeight: 1.3 }}>
                        {melody.title}
                      </span>
                      {isSelected && (
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check size={10} color="#0a0a0a" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontStyle: 'italic', marginTop: '4px' }}>
                      {melody.tempoDescription}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Selector Finisaj Mecanism */}
          <div 
            style={{
              background: 'rgba(24, 24, 27, 0.65)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '16px',
              padding: '16px 18px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#fbbf24', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CrownIcon size={15} color="#f59e0b" />
                <span>2. Calibru & Finisaj Mecanism</span>
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MUSIC_BOX_FINISHES.map(finish => {
                const isSelected = selectedFinishId === finish.id;
                return (
                  <div
                    key={finish.id}
                    onClick={() => setSelectedFinishId(finish.id)}
                    style={{
                      cursor: 'pointer',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: isSelected ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div 
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            border: `1.5px solid ${isSelected ? finish.accentColor : '#6b7280'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {isSelected && (
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: finish.accentColor }} />
                          )}
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'serif', color: '#ffffff' }}>
                          {finish.name}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span 
                          style={{
                            fontSize: '0.68rem',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            border: `1px solid ${finish.badgeColor}`,
                            background: finish.badgeBg,
                            color: finish.badgeColor,
                            fontWeight: 700
                          }}
                        >
                          {finish.tag}
                        </span>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fbbf24' }}>
                          +{finish.price} RON
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '4px 0 0 22px', lineHeight: 1.4 }}>
                      {finish.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Mod de Declanșare (Senzor vs. Manivelă) */}
          <div 
            style={{
              background: 'rgba(24, 24, 27, 0.65)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '16px',
              padding: '16px 18px',
              boxSizing: 'border-box'
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#fbbf24', fontWeight: 800, marginBottom: '10px' }}>
              <SparkleIcon size={14} color="#f59e0b" />
              <span>3. Mod de Activare la Destinatar</span>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
              {ACTIVATION_MODES.map(mode => {
                const isSelected = selectedModeId === mode.id;
                const ModeIcon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSelectedModeId(mode.id)}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: isSelected ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.18)' : 'rgba(0, 0, 0, 0.3)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ModeIcon size={15} color={isSelected ? '#fbbf24' : '#9ca3af'} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f3f4f6' }}>
                        {mode.name}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: '6px 0 0 0', lineHeight: 1.35 }}>
                      {mode.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Gravură Laser pe Placa de Alamă */}
          <div 
            style={{
              background: 'rgba(24, 24, 27, 0.65)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '16px',
              padding: '16px 18px',
              boxSizing: 'border-box'
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#fbbf24', fontWeight: 800, marginBottom: '8px' }}>
              <DiamondIcon size={14} color="#f59e0b" />
              <span>4. Text Gravat pe Placa de Rezonanță (Gratuit)</span>
            </label>
            <input
              id="input-music-box-engraved-text"
              type="text"
              maxLength={45}
              value={engravedPlateText}
              onChange={(e) => setEngravedPlateText(e.target.value)}
              placeholder="Ex: Pentru Teodora — Iubirea mea eternă (14.02.2026)"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fef3c7',
                fontSize: '0.85rem',
                fontFamily: 'serif',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#9ca3af', marginTop: '6px' }}>
              <span>Gravat laser pe alamă masivă cu font caligrafic regal</span>
              <span>{engravedPlateText.length}/45 caractere</span>
            </div>
          </div>

          {/* Action Button: Confirm & Save Config */}
          <div style={{ paddingTop: '6px' }}>
            <button
              id="btn-confirm-music-box-config"
              type="button"
              onClick={handleSave}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '16px',
                fontFamily: 'serif',
                fontSize: '0.92rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                border: 'none',
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)',
                color: '#0a0a0a',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box'
              }}
            >
              <Check size={18} color="#0a0a0a" strokeWidth={3} />
              <span style={{ whiteSpace: 'nowrap' }}>Confirmă Cutia Muzicală (+{currentFinish.price} RON)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
