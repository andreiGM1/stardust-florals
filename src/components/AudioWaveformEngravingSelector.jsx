import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  Square, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Edit3, 
  Share2, 
  ShieldCheck, 
  Heart,
  QrCode,
  Music
} from 'lucide-react';
import { 
  AudioWaveformIcon, 
  VoiceRecordMicIcon, 
  CrownIcon, 
  DiamondIcon, 
  RoseIcon 
} from './CustomIcons';
import { playLuxuryChime } from '../utils/audioAlert';
import { useCurrency } from '../context/CurrencyContext';

export const PAPER_STOCKS = [
  {
    id: 'noir-onyx',
    name: 'Carton Mat Noir Onyx (450g) & Undă Aurie 24K',
    subtitle: 'Aspect catifelat profund cu reflexii de aur regal',
    price: 39,
    badge: 'BESTSELLER REGAL',
    badgeColor: '#f59e0b',
    cardBg: 'radial-gradient(ellipse at 50% 20%, #1e131d 0%, #090408 100%)',
    borderColor: 'rgba(245, 158, 11, 0.55)',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    textColor: '#fef3c7',
    subtextColor: '#d4b996',
    waveColor: '#fbbf24',
    waveActiveColor: '#fef08a',
    monogramBorder: '#d97706',
    sampleBorder: '2px solid #f59e0b'
  },
  {
    id: 'ivory-rose',
    name: 'Carton Fildeș Regal (400g) & Undă Rose Gold',
    subtitle: 'Hârtie artizanală de bumbac cu foiță sidefată',
    price: 45,
    badge: 'DELICAT & ROMANTIC',
    badgeColor: '#e11d48',
    cardBg: 'radial-gradient(ellipse at 50% 20%, #fffbf5 0%, #f5ece1 100%)',
    borderColor: 'rgba(225, 29, 72, 0.45)',
    glowColor: 'rgba(225, 29, 72, 0.2)',
    textColor: '#291b22',
    subtextColor: '#705461',
    waveColor: '#e11d48',
    waveActiveColor: '#fda4af',
    monogramBorder: '#be123c',
    sampleBorder: '2px solid #e11d48'
  },
  {
    id: 'bordeaux-silver',
    name: 'Carton Bordeaux Imperial & Undă Argint Diamant',
    subtitle: 'Nuanță nobilă de vin cu pulbere strălucitoare',
    price: 45,
    badge: 'ELEGANȚĂ NOCTURNĂ',
    badgeColor: '#93c5fd',
    cardBg: 'radial-gradient(ellipse at 50% 20%, #350813 0%, #180308 100%)',
    borderColor: 'rgba(191, 219, 254, 0.55)',
    glowColor: 'rgba(191, 219, 254, 0.25)',
    textColor: '#f8fafc',
    subtextColor: '#cbd5e1',
    waveColor: '#93c5fd',
    waveActiveColor: '#ffffff',
    monogramBorder: '#60a5fa',
    sampleBorder: '2px solid #93c5fd'
  }
];

export const PRESET_VOICE_MEMOS = [
  {
    id: 'dragoste-eterna',
    title: 'Mărturisire de Dragoste Eternă',
    subtitle: 'Vocea mea este a ta pentru totdeauna',
    duration: 14,
    occasionBadge: 'Romantic VIP',
    transcript: 'Te iubesc din tot sufletul meu. Ești cel mai frumos capitol din viața mea și voi fi alături de tine la fiecare pas.',
    waveform: [24, 38, 55, 78, 92, 60, 42, 85, 96, 70, 50, 88, 94, 64, 45, 76, 89, 58, 38, 82, 95, 68, 44, 72, 84, 52, 30, 18]
  },
  {
    id: 'aniversare-regala',
    title: 'Aniversare de Poveste',
    subtitle: 'Să strălucești mereu în lumina fericirii',
    duration: 12,
    occasionBadge: 'Zi de Naștere',
    transcript: 'La mulți ani, suflet drag! Să strălucești mereu la fel de intens ca acești trandafiri Stardust! Te îmbrățișez strâns!',
    waveform: [18, 32, 64, 82, 95, 74, 48, 86, 90, 68, 42, 80, 92, 70, 50, 78, 88, 62, 40, 75, 90, 66, 42, 68, 79, 48, 26, 14]
  },
  {
    id: 'cerere-casatorie',
    title: 'Cerere în Căsătorie & Promisiune',
    subtitle: 'Vrei să scriem viitorul împreună?',
    duration: 16,
    occasionBadge: 'Cerere VIP',
    transcript: 'Vrei să fii soția mea și să scriem împreună cel mai frumos viitor? Inima mea îți aparține pentru totdeauna.',
    waveform: [25, 45, 70, 88, 98, 65, 52, 90, 100, 75, 55, 92, 96, 72, 48, 84, 94, 66, 45, 88, 98, 70, 50, 76, 88, 56, 32, 20]
  },
  {
    id: 'distanta-dor',
    title: 'Alinare & Dragoste la Distanță',
    subtitle: 'Distanța e doar spațiu, inima e la tine',
    duration: 15,
    occasionBadge: 'Dor & Alinare',
    transcript: 'Deși suntem la kilometri distanță, inima mea bate în același ritm cu a ta. Abia aștept să te strâng în brațe!',
    waveform: [20, 36, 58, 80, 90, 62, 40, 82, 94, 68, 48, 85, 92, 65, 44, 75, 88, 59, 36, 80, 92, 64, 42, 70, 82, 50, 28, 16]
  }
];

export default function AudioWaveformEngravingSelector({
  isEmbedded = false,
  initialPaperStock = 'noir-onyx',
  initialPresetId = 'dragoste-eterna',
  initialInitials = 'A & M',
  initialSubtitle = 'Vocea mea este a ta pentru totdeauna',
  initialCustomMessage = '',
  onApplyEngraving = null,
  onCloseModal = null
}) {
  const { formatPrice, currency } = useCurrency();

  // Mode: 'presets', 'record', 'custom'
  const [activeTab, setActiveTab] = useState('presets');
  const [selectedStockId, setSelectedStockId] = useState(initialPaperStock);
  const [selectedPresetId, setSelectedPresetId] = useState(initialPresetId);
  const [initials, setInitials] = useState(initialInitials);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [customText, setCustomText] = useState(initialCustomMessage);
  
  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [recordedWaveform, setRecordedWaveform] = useState([]);
  const recordIntervalRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 1
  const [playbackCurrentSeconds, setPlaybackCurrentSeconds] = useState(0);
  const playbackIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const activeOscillatorsRef = useRef([]);

  // Active configuration
  const currentStock = PAPER_STOCKS.find((s) => s.id === selectedStockId) || PAPER_STOCKS[0];
  const currentPreset = PRESET_VOICE_MEMOS.find((p) => p.id === selectedPresetId) || PRESET_VOICE_MEMOS[0];

  // Derive waveform and duration depending on mode
  const currentDuration = activeTab === 'record' && recordedDuration > 0
    ? recordedDuration
    : (activeTab === 'custom' && customText.trim().length > 0 ? 10 : currentPreset.duration);

  // Dynamic waveform computation for custom text or active preset
  const getActiveWaveform = () => {
    if (activeTab === 'record' && recordedWaveform.length > 0) {
      return recordedWaveform;
    }
    if (activeTab === 'custom' && customText.trim().length > 0) {
      // Deterministic waveform pattern derived from custom text characters
      const str = customText.trim();
      const bars = [];
      for (let i = 0; i < 28; i++) {
        const charCode = str.charCodeAt(i % str.length) || 75;
        const pseudoRand = ((charCode * (i + 3) * 17) % 80) + 18;
        bars.push(Math.min(98, Math.max(16, pseudoRand)));
      }
      return bars;
    }
    return currentPreset.waveform;
  };

  const activeWaveform = getActiveWaveform();
  const currentTranscript = activeTab === 'custom' 
    ? (customText.trim() || 'Inscripție caligrafiată personalizată')
    : (activeTab === 'record' ? 'Mesaj vocal înregistrat live de către client' : currentPreset.transcript);

  // Web Audio Warm Harmonics Synth
  const playHarmonicTones = (durationSec) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous
      activeOscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); } catch {}
      });
      activeOscillatorsRef.current = [];

      // Warm acoustic triad notes (C4, E4, G4, B4)
      const baseFreqs = [261.63, 329.63, 392.00, 493.88];
      const now = ctx.currentTime;

      baseFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        // Gentle vibrato modulation
        osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + durationSec);

        const volumeLevel = 0.04 / (idx + 1);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(volumeLevel, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + durationSec);
        activeOscillatorsRef.current.push(osc);
      });
    } catch {}
  };

  // Play / Pause Toggle
  const togglePlayAudio = () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    playLuxuryChime();
    setIsPlaying(true);
    setPlaybackProgress(0);
    setPlaybackCurrentSeconds(0);

    const totalDur = Math.max(2, currentDuration);
    playHarmonicTones(totalDur);

    // Also attempt SpeechSynthesis for Romanian voice if present
    if ('speechSynthesis' in window && activeTab !== 'record') {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentTranscript);
        utterance.lang = 'ro-RO';
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
      } catch {}
    }

    const startTime = Date.now();
    const intervalMs = 50;

    playbackIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const prog = Math.min(1, elapsed / totalDur);
      setPlaybackProgress(prog);
      setPlaybackCurrentSeconds(Math.min(totalDur, Math.floor(elapsed)));

      if (prog >= 1) {
        stopPlayback();
      }
    }, intervalMs);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    activeOscillatorsRef.current.forEach((osc) => {
      try { osc.stop(); } catch {}
    });
    activeOscillatorsRef.current = [];
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
      if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    };
  }, []);

  // Live Recording Handlers
  const startRecording = async () => {
    stopPlayback();
    setIsRecording(true);
    setRecordedDuration(0);
    setRecordedWaveform([]);

    // Fallback simulation or actual getUserMedia
    let stream = null;
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          setRecordedAudioBlob(blob);
          stream.getTracks().forEach((track) => track.stop());
        };
        mediaRecorder.start();
      }
    } catch {
      // Permission denied or not supported; gracefully fallback to simulation
    }

    const startTime = Date.now();
    const simulatedBars = [];

    recordIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setRecordedDuration(elapsed);

      // Generate random sound amplitude bar
      const newBar = Math.floor(Math.random() * 75) + 20;
      simulatedBars.push(newBar);
      if (simulatedBars.length > 28) simulatedBars.shift();
      setRecordedWaveform([...simulatedBars]);

      // Max 30 seconds limit
      if (elapsed >= 30) {
        stopRecording();
      }
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordIntervalRef.current) {
      clearInterval(recordIntervalRef.current);
      recordIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    // Pad waveform to 28 bars if needed
    setRecordedWaveform((prev) => {
      if (prev.length >= 28) return prev.slice(0, 28);
      const padded = [...prev];
      while (padded.length < 28) {
        padded.push(Math.floor(Math.random() * 60) + 20);
      }
      return padded;
    });
    playLuxuryChime();
  };

  // Preset Selection
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setSubtitle(preset.subtitle);
    stopPlayback();
    playLuxuryChime();
  };

  // Submit / Apply to Order
  const handleConfirm = () => {
    playLuxuryChime();
    const payload = {
      stock: currentStock,
      preset: activeTab === 'presets' ? currentPreset : null,
      mode: activeTab,
      initials: initials.trim() || 'A & M',
      subtitle: subtitle.trim() || 'Vocea mea este a ta pentru totdeauna',
      customText: activeTab === 'custom' ? customText : (activeTab === 'presets' ? currentPreset.transcript : 'Mesaj vocal înregistrat'),
      durationSeconds: currentDuration,
      waveform: activeWaveform,
      totalPrice: currentStock.price
    };

    if (onApplyEngraving) {
      onApplyEngraving(payload);
    }
    if (onCloseModal) {
      onCloseModal();
    }
  };

  // Format MM:SS helper
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      className="audio-waveform-engraving-customizer"
      style={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      {/* Header section (if not embedded or styled as luxury section) */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '24px',
            padding: '6px 16px',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#fbbf24',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}
        >
          <AudioWaveformIcon size={16} color="#fbbf24" />
          <span>GRAVURĂ ACUSTICĂ & SPECTROGRAMĂ TIPĂRITĂ</span>
        </div>
        <h3 
          style={{
            fontSize: isEmbedded ? '1.4rem' : '1.75rem',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 8px 0',
            fontFamily: 'serif',
            letterSpacing: '0.2px'
          }}
        >
          Vocea Ta Imprimată în Foiță de Aur 24K
        </h3>
        <p 
          style={{
            fontSize: '0.92rem',
            color: '#d1d5db',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.5
          }}
        >
          Transformă emoția vocii tale într-o operă de artă unică. Tipărim frecvența sonoră exactă pe carton de colecție, alături de un cod QR scanabil pentru ascultare eternă.
        </p>
      </div>

      {/* Main Grid: Left Configurator / Right Live Card Visualizer */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* LEFT COLUMN: Controls & Input Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* STEP 1: PAPER STOCK SELECTION */}
          <div 
            style={{
              background: 'rgba(24, 24, 27, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '18px 20px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DiamondIcon size={15} color="#f59e0b" />
                <span>1. Suport Carton de Colecție & Finisaj</span>
              </label>
              <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600 }}>
                Densitate 400-450g
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {PAPER_STOCKS.map((stock) => {
                const isSelected = selectedStockId === stock.id;
                return (
                  <button
                    key={stock.id}
                    type="button"
                    onClick={() => {
                      setSelectedStockId(stock.id);
                      playLuxuryChime();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isSelected ? 'rgba(245, 158, 11, 0.1)' : 'rgba(0, 0, 0, 0.35)',
                      border: isSelected ? stock.sampleBorder : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div 
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: stock.cardBg,
                          border: `1.5px solid ${stock.borderColor}`,
                          boxShadow: `0 0 10px ${stock.glowColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <AudioWaveformIcon size={14} color={stock.waveColor} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                          {stock.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginTop: '2px' }}>
                          {stock.subtitle}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#fbbf24', whiteSpace: 'nowrap' }}>
                        +{formatPrice(stock.price)}
                      </div>
                      <span 
                        style={{
                          display: 'inline-block',
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          color: stock.badgeColor,
                          background: 'rgba(0,0,0,0.4)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          marginTop: '3px'
                        }}
                      >
                        {stock.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: VOICE MODE SELECTOR (TABS) */}
          <div 
            style={{
              background: 'rgba(24, 24, 27, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '18px 20px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <VoiceRecordMicIcon size={16} color="#fbbf24" />
                <span>2. Mesajul Tău Acustic</span>
              </label>
              <span style={{ fontSize: '0.76rem', color: '#e5e7eb', background: 'rgba(245,158,11,0.2)', padding: '2px 8px', borderRadius: '6px' }}>
                {activeTab === 'presets' ? 'Mostre de Salon' : (activeTab === 'record' ? 'Microfon Live' : 'Text Caligrafiat')}
              </span>
            </div>

            {/* TAB BUTTONS */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                background: 'rgba(0, 0, 0, 0.45)',
                padding: '4px',
                borderRadius: '10px',
                marginBottom: '16px'
              }}
            >
              <button
                type="button"
                id="btn-audio-tab-presets"
                onClick={() => {
                  stopPlayback();
                  setActiveTab('presets');
                }}
                style={{
                  padding: '8px 6px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'presets' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
                  color: activeTab === 'presets' ? '#000000' : '#d1d5db',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <RoseIcon size={13} color={activeTab === 'presets' ? '#000000' : 'currentColor'} />
                <span>Mostre VIP</span>
              </button>

              <button
                type="button"
                id="btn-audio-tab-record"
                onClick={() => {
                  stopPlayback();
                  setActiveTab('record');
                }}
                style={{
                  padding: '8px 6px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'record' ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'transparent',
                  color: activeTab === 'record' ? '#ffffff' : '#d1d5db',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Mic size={13} />
                <span>Înregistrează</span>
              </button>

              <button
                type="button"
                id="btn-audio-tab-custom"
                onClick={() => {
                  stopPlayback();
                  setActiveTab('custom');
                }}
                style={{
                  padding: '8px 6px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'custom' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'transparent',
                  color: activeTab === 'custom' ? '#ffffff' : '#d1d5db',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Edit3 size={13} />
                <span>Scrie Text</span>
              </button>
            </div>

            {/* TAB CONTENT 1: PRESETS */}
            {activeTab === 'presets' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PRESET_VOICE_MEMOS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      style={{
                        background: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'rgba(0, 0, 0, 0.25)',
                        border: isSelected ? '1.5px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.84rem', fontWeight: 800, color: isSelected ? '#fbbf24' : '#ffffff' }}>
                          {preset.title}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.68rem', color: '#9ca3af', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                            {preset.duration}s
                          </span>
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#f59e0b' }}>
                            {preset.occasionBadge}
                          </span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.76rem', color: '#9ca3af', margin: 0, fontStyle: 'italic', lineHeight: 1.35 }}>
                        "{preset.transcript}"
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB CONTENT 2: LIVE RECORDING */}
            {activeTab === 'record' && (
              <div 
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px dashed rgba(225, 29, 72, 0.4)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center'
                }}
              >
                <div style={{ marginBottom: '14px' }}>
                  <div 
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: isRecording ? 'linear-gradient(135deg, #ef4444, #991b1b)' : 'linear-gradient(135deg, #e11d48, #be123c)',
                      boxShadow: isRecording ? '0 0 24px rgba(239, 68, 68, 0.7)' : '0 4px 16px rgba(225, 29, 72, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                    onClick={isRecording ? stopRecording : startRecording}
                    title={isRecording ? 'Apasă pentru oprire înregistrare' : 'Apasă pentru a începe înregistrarea'}
                  >
                    {isRecording ? <Square size={26} color="#ffffff" /> : <Mic size={28} color="#ffffff" />}
                  </div>
                </div>

                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: isRecording ? '#ef4444' : '#ffffff', marginBottom: '4px' }}>
                  {isRecording ? `Înregistrare în curs... (${recordedDuration}s / 30s)` : (recordedDuration > 0 ? `Înregistrat cu succes (${recordedDuration} secunde)` : 'Apasă pe microfon pentru a vorbi')}
                </div>
                
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0 0 14px 0' }}>
                  Spune un mesaj de dragoste, o urare călduroasă sau o amintire dragă (max 30 secunde).
                </p>

                {isRecording ? (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="btn btn-sm"
                    style={{
                      background: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '8px 18px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Oprește Înregistrarea
                  </button>
                ) : (
                  recordedDuration > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={startRecording}
                        className="btn btn-outline btn-sm"
                        style={{
                          padding: '6px 14px',
                          fontSize: '0.78rem',
                          whiteSpace: 'nowrap',
                          borderColor: '#e11d48',
                          color: '#f43f5e'
                        }}
                      >
                        Reînregistrează
                      </button>
                    </div>
                  )
                )}
              </div>
            )}

            {/* TAB CONTENT 3: CUSTOM TEXT */}
            {activeTab === 'custom' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#9ca3af', marginBottom: '6px' }}>
                  Mesaj personalizat (generăm spectrogame din frecvențele fonetice):
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => {
                    setCustomText(e.target.value);
                    stopPlayback();
                  }}
                  placeholder="Ex: Te iubesc la infinit și dincolo de stele. Mulțumesc că faci fiecare zi magică!"
                  rows={3}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#ffffff',
                    fontSize: '0.84rem',
                    lineHeight: 1.4,
                    boxSizing: 'border-box',
                    resize: 'none'
                  }}
                />
              </div>
            )}
          </div>

          {/* STEP 3: MONOGRAM & INSCRIPTION CUSTOMIZATION */}
          <div 
            style={{
              background: 'rgba(24, 24, 27, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '18px 20px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CrownIcon size={16} color="#fbbf24" />
                <span>3. Monogramă Regală & Inscripție Caligrafică</span>
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af', marginBottom: '4px' }}>
                  Inițiale Cuplu:
                </label>
                <input
                  type="text"
                  maxLength={7}
                  value={initials}
                  onChange={(e) => setInitials(e.target.value)}
                  placeholder="A & M"
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#fbbf24',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    textAlign: 'center',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af', marginBottom: '4px' }}>
                  Titlu Tipărit sub Spectrogramă:
                </label>
                <input
                  type="text"
                  maxLength={45}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Vocea mea este a ta pentru totdeauna"
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#ffffff',
                    fontSize: '0.84rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* CONFIRM / APPLY BUTTON */}
          <button
            type="button"
            id="btn-confirm-audio-engraving"
            onClick={handleConfirm}
            className="btn btn-gold btn-lg"
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '0.98rem',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <CheckCircle2 size={18} />
            <span>Confirmă Gravura Audio (+{formatPrice(currentStock.price)})</span>
          </button>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE PHYSICAL CARD PREVIEW */}
        <div style={{ position: 'sticky', top: '24px' }}>
          <div 
            style={{
              background: 'rgba(15, 15, 17, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '24px 20px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#fbbf24" />
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f3f4f6', letterSpacing: '0.5px' }}>
                  PREVIZUALIZARE CARTON TIPĂRIT (1:1)
                </span>
              </div>
              <span 
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: currentStock.badgeColor,
                  background: 'rgba(0,0,0,0.5)',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  border: `1px solid ${currentStock.borderColor}`
                }}
              >
                {currentStock.name.split('(')[0]}
              </span>
            </div>

            {/* PHYSICAL LUXURY CARD RENDERING */}
            <div
              id="printed-audio-card-preview"
              style={{
                background: currentStock.cardBg,
                border: `2px solid ${currentStock.borderColor}`,
                borderRadius: '16px',
                padding: '28px 22px',
                color: currentStock.textColor,
                boxShadow: `0 16px 40px ${currentStock.glowColor}, inset 0 0 30px rgba(0,0,0,0.5)`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Inner Fine Gold Border Line */}
              <div 
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  right: '8px',
                  bottom: '8px',
                  border: `1px solid ${currentStock.borderColor}`,
                  opacity: 0.45,
                  borderRadius: '10px',
                  pointerEvents: 'none'
                }}
              />

              {/* Card Header: Stardust Crest & Monogram */}
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '16px' }}>
                <div style={{ fontSize: '0.62rem', letterSpacing: '2.5px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '6px' }}>
                  STARDUST FLORALS™ • HAUTE PARFUMERIE & ACOUSTICS
                </div>
                
                {/* Monogram Seal */}
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: `1.5px solid ${currentStock.monogramBorder}`,
                    background: 'rgba(0,0,0,0.3)',
                    margin: '0 auto 8px auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 12px ${currentStock.glowColor}`
                  }}
                >
                  <CrownIcon size={12} color={currentStock.waveColor} style={{ marginBottom: '1px' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.5px', color: currentStock.waveColor }}>
                    {initials.trim() || 'A & M'}
                  </span>
                </div>

                <div 
                  style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    fontFamily: 'serif',
                    fontStyle: 'italic',
                    color: currentStock.textColor,
                    margin: '0 0 2px 0'
                  }}
                >
                  „{subtitle.trim() || 'Vocea mea este a ta pentru totdeauna'}”
                </div>
              </div>

              {/* SPECTROGRAM SOUND WAVE BARS (INTERACTIVE VISUALIZER) */}
              <div 
                style={{
                  position: 'relative',
                  zIndex: 2,
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '18px 12px 14px 12px',
                  marginBottom: '16px'
                }}
              >
                {/* Spectrogram Frequency Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '0.66rem', opacity: 0.75 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Volume2 size={11} color={currentStock.waveColor} />
                    <span>AUDIO WAVEFORM (24-BIT MASTER)</span>
                  </span>
                  <span>{formatTime(playbackCurrentSeconds)} / {formatTime(currentDuration)}</span>
                </div>

                {/* WAVEFORM BARS CONTAINER */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '56px',
                    gap: '3px',
                    padding: '0 4px'
                  }}
                >
                  {activeWaveform.map((barHeight, idx) => {
                    const barRatio = idx / activeWaveform.length;
                    const isPassed = barRatio <= playbackProgress;
                    const heightPercent = isPlaying && isPassed ? Math.min(100, barHeight * 1.08) : barHeight;

                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: `${heightPercent}%`,
                          minHeight: '6px',
                          borderRadius: '3px',
                          background: isPassed 
                            ? `linear-gradient(to top, ${currentStock.waveColor}, ${currentStock.waveActiveColor})`
                            : 'rgba(255, 255, 255, 0.18)',
                          boxShadow: isPassed ? `0 0 8px ${currentStock.waveColor}` : 'none',
                          transition: 'all 0.1s ease'
                        }}
                      />
                    );
                  })}
                </div>

                {/* PLAY / PAUSE BUTTON INTEGRATED INTO WAVE */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                  <button
                    type="button"
                    id="btn-play-card-audio"
                    onClick={togglePlayAudio}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: isPlaying ? 'rgba(239, 68, 68, 0.2)' : `linear-gradient(135deg, ${currentStock.waveColor}, ${currentStock.monogramBorder})`,
                      border: isPlaying ? '1px solid #ef4444' : 'none',
                      color: isPlaying ? '#ef4444' : '#000000',
                      borderRadius: '24px',
                      padding: '7px 18px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: isPlaying ? '0 0 14px rgba(239,68,68,0.4)' : `0 4px 14px ${currentStock.glowColor}`,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={14} />
                        <span>Oprește Audiția</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="#000000" />
                        <span>Ascultă Mesajul Vocal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* CARD FOOTER: DYNAMIC QR CODE & AUTHENTICITY STAMP */}
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                  paddingTop: '6px'
                }}
              >
                {/* Left: Wax Seal / Authenticity Stamp */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div 
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: `1px solid ${currentStock.borderColor}`,
                      background: 'rgba(0,0,0,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ShieldCheck size={16} color={currentStock.waveColor} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.64rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      GRAVURĂ UV CERTIFICATĂ
                    </div>
                    <div style={{ fontSize: '0.58rem', opacity: 0.65 }}>
                      Cerneală metalică 24K
                    </div>
                  </div>
                </div>

                {/* Right: Printed QR Code */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'right' }}>
                  <div>
                    <div style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase' }}>
                      SCAN PENTRU ASCULTARE
                    </div>
                    <div style={{ fontSize: '0.56rem', opacity: 0.65 }}>
                      Compatibil iOS & Android
                    </div>
                  </div>
                  {/* Stylized Vector QR Code Box */}
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      background: '#ffffff',
                      borderRadius: '6px',
                      padding: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      flexShrink: 0
                    }}
                  >
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="#000000">
                      {/* Top-Left QR Marker */}
                      <rect x="2" y="2" width="10" height="10" fill="#000000" />
                      <rect x="4" y="4" width="6" height="6" fill="#ffffff" />
                      <rect x="5" y="5" width="4" height="4" fill="#000000" />

                      {/* Top-Right QR Marker */}
                      <rect x="24" y="2" width="10" height="10" fill="#000000" />
                      <rect x="26" y="4" width="6" height="6" fill="#ffffff" />
                      <rect x="27" y="5" width="4" height="4" fill="#000000" />

                      {/* Bottom-Left QR Marker */}
                      <rect x="2" y="24" width="10" height="10" fill="#000000" />
                      <rect x="4" y="26" width="6" height="6" fill="#ffffff" />
                      <rect x="5" y="27" width="4" height="4" fill="#000000" />

                      {/* QR Data Pattern Dots */}
                      <rect x="14" y="4" width="2" height="4" />
                      <rect x="18" y="2" width="4" height="2" />
                      <rect x="14" y="10" width="3" height="3" />
                      <rect x="19" y="8" width="3" height="3" />
                      <rect x="8" y="14" width="4" height="2" />
                      <rect x="2" y="18" width="3" height="4" />
                      <rect x="14" y="15" width="8" height="6" fill={currentStock.waveColor} />
                      <rect x="24" y="14" width="4" height="3" />
                      <rect x="30" y="18" width="4" height="4" />
                      <rect x="14" y="24" width="3" height="4" />
                      <rect x="19" y="26" width="3" height="2" />
                      <rect x="24" y="24" width="4" height="4" />
                      <rect x="30" y="29" width="4" height="3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Atelier Guarantee Footer */}
            <div 
              style={{
                marginTop: '16px',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.74rem', color: '#9ca3af', lineHeight: 1.35 }}>
                <strong style={{ color: '#ffffff' }}>Garanție Stardust Audio™:</strong> Cartonul este livrat într-o mapă protectoare de mătase neagră, sigilat cu ceară regală, garantat împotriva decolorării timp de 10+ ani.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
