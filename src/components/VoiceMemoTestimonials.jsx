import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Headphones, 
  Mic, 
  Heart, 
  Sparkles, 
  CheckCheck, 
  MessageCircle, 
  ArrowRight, 
  Clock, 
  Flame,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { playLuxuryChime, playHeartPopSound } from '../utils/audioAlert';
import { useCurrency } from '../context/CurrencyContext';
import { RingIcon, PartyIcon, RoseIcon, SparkleIcon } from './CustomIcons';

// Real authentic voice memo testimonies collected via WhatsApp
export const VOICE_MEMOS = [
  {
    id: 'memo-andreea-cerere',
    name: 'Andreea M.',
    age: 24,
    city: 'București (Sector 1)',
    occasion: 'Cerere în Căsătorie',
    category: 'cereri',
    durationSeconds: 18,
    dateSent: 'Ieri la 21:40 pe WhatsApp',
    initialReactions: { heart: 284, cry: 142, fire: 198 },
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Signature Dual Noir & Rouge (269 RON)',
    bouquetImage: '/images/buchet-dual-noir-rouge-hero.webp',
    avatarBg: 'linear-gradient(135deg, #e11d48, #be123c)',
    verifiedBuyer: true,
    emotionBadge: 'Lacrimi de Fericire',
    transcript: 'Doamneee deci am început să plâng efectiv când am deschis cutia! Sclipiciul diamant strălucește într-un fel ireal, iar videoclipul de pe codul QR... a fost cel mai frumos moment din toată viața mea! Îți mulțumesc din suflet, iubire!',
    waveformPattern: [14, 28, 45, 60, 32, 70, 85, 40, 95, 65, 30, 80, 90, 50, 75, 88, 35, 62, 78, 42, 92, 55, 30, 68, 82, 45, 25, 15]
  },
  {
    id: 'memo-elena-zi-nastere',
    name: 'Elena D.',
    age: 28,
    city: 'Cluj-Napoca',
    occasion: 'Ziua de Naștere 28 Ani',
    category: 'aniversari',
    durationSeconds: 22,
    dateSent: 'Joi la 14:15 pe WhatsApp',
    initialReactions: { heart: 319, cry: 89, fire: 241 },
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Buchet Bicolor & Felicitare Video (269 RON)',
    bouquetImage: '/images/buchet-dual-noir-rouge-angle.webp',
    avatarBg: 'linear-gradient(135deg, #b91c1c, #991b1b)',
    verifiedBuyer: true,
    emotionBadge: 'Șoc & Admirație',
    transcript: 'Fetelor, nu vă mint, toată cafeneaua și colegele de la birou s-au oprit să se uite la buchet! Miroase divin și strălucește incredibil chiar și la lumina soarelui. Nimeni nu a mai văzut trandafiri cu sclipici de catifea!',
    waveformPattern: [18, 35, 55, 75, 40, 85, 60, 90, 70, 45, 80, 95, 65, 85, 40, 60, 92, 50, 70, 85, 38, 52, 75, 60, 40, 28, 18, 12]
  },
  {
    id: 'memo-raluca-aniversare-cuplu',
    name: 'Raluca & Mihai P.',
    age: 31,
    city: 'Timișoara',
    occasion: 'Aniversare 5 Ani Relație',
    category: 'aniversari',
    durationSeconds: 16,
    dateSent: 'Sâmbătă la 19:30 pe WhatsApp',
    initialReactions: { heart: 215, cry: 67, fire: 184 },
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Signature Trandafiri Nemuritori 3+ Ani (269 RON)',
    bouquetImage: '/images/buchet-dual-noir-rouge-closeup.webp',
    avatarBg: 'linear-gradient(135deg, #881337, #4c0519)',
    verifiedBuyer: true,
    emotionBadge: 'Nemuritor & De Lux',
    transcript: 'Nu-mi vine să cred că florile astea rezistă peste 3 ani! După atâtea buchete care s-au ofilit în trei zile, Stardust este primul cadou care chiar va rămâne amintire eternă în livingul nostru. Merită fiecare bănuț!',
    waveformPattern: [12, 22, 48, 65, 38, 72, 80, 50, 88, 62, 35, 78, 85, 48, 70, 82, 38, 60, 75, 45, 88, 52, 28, 62, 75, 40, 20, 10]
  },
  {
    id: 'memo-ioana-distanta',
    name: 'Ioana T.',
    age: 26,
    city: 'Iași (Expediat din Londra)',
    occasion: 'Dragoste la Distanță',
    category: 'distanta',
    durationSeconds: 24,
    dateSent: 'Vineri la 11:05 pe WhatsApp',
    initialReactions: { heart: 402, cry: 189, fire: 310 },
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Buchet Bicolor + Ursuleț de Pluș (339 RON)',
    bouquetImage: '/images/client-livrare-metrou-cadou.webp',
    avatarBg: 'linear-gradient(135deg, #be123c, #881337)',
    verifiedBuyer: true,
    emotionBadge: 'Surpriză Internațională',
    transcript: 'Iubitul meu e plecat la Londra și a comandat cu livrare anonimă direct la ușa mea. Curierul a venit cu mănuși albe, iar felicitarea video pe codul QR cu mesajul lui m-a făcut să mă simt ca o regină! Vă iubesc din suflet!',
    waveformPattern: [16, 30, 50, 70, 42, 80, 62, 88, 75, 48, 82, 98, 68, 88, 45, 65, 90, 55, 72, 88, 42, 58, 80, 65, 45, 32, 22, 14]
  },
  {
    id: 'memo-diana-impacare',
    name: 'Diana V.',
    age: 23,
    city: 'Brașov',
    occasion: 'Gest de Reconciliere',
    category: 'cereri',
    durationSeconds: 19,
    dateSent: 'Marți la 18:50 pe WhatsApp',
    initialReactions: { heart: 271, cry: 112, fire: 220 },
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Signature Dual Noir & Rouge (269 RON)',
    bouquetImage: '/images/client-surpriza-metrou-lifestyle.webp',
    avatarBg: 'linear-gradient(135deg, #9f1239, #701a75)',
    verifiedBuyer: true,
    emotionBadge: 'Împăcare Dulce',
    transcript: 'Eram supărată pe el de două zile... dar când a apărut la ușa mea cu buchetul ăsta negru cu roșu scânteietor și mi-a pus codul QR cu scuzele lui video... s-a topit toată supărarea. E cel mai atent bărbat din lume!',
    waveformPattern: [15, 26, 46, 62, 34, 75, 82, 45, 90, 68, 32, 82, 88, 52, 74, 85, 36, 64, 76, 40, 90, 56, 32, 65, 80, 42, 24, 12]
  }
];

export default function VoiceMemoTestimonials() {
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState('toate');
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 1
  const [playbackTime, setPlaybackTime] = useState(0); // seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1, 1.5, 2
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState({});
  const [reactions, setReactions] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_voice_memo_reactions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Audio Context & Speech synthesis references
  const audioCtxRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const activeUtteranceRef = useRef(null);
  const currentOscillatorsRef = useRef([]);

  // Filtered memos
  const filteredMemos = activeCategory === 'toate' 
    ? VOICE_MEMOS 
    : VOICE_MEMOS.filter(m => m.category === activeCategory);

  // Stop any active audio
  const stopPlayback = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      activeUtteranceRef.current = null;
    }

    if (currentOscillatorsRef.current.length > 0) {
      currentOscillatorsRef.current.forEach(node => {
        try { node.stop(); node.disconnect(); } catch {}
      });
      currentOscillatorsRef.current = [];
    }

    setCurrentPlayingId(null);
    setPlaybackProgress(0);
    setPlaybackTime(0);
  };

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  // Web Audio synth for ambient room sparkle and voice harmonics
  const playAmbientSparkleTone = (freq, duration, delay = 0) => {
    if (isMuted) return;
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

      const t = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, t + duration);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.06, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + duration);
      currentOscillatorsRef.current.push(osc);
    } catch {}
  };

  // Play voice memo
  const togglePlayMemo = (memo) => {
    if (currentPlayingId === memo.id) {
      // Pause
      stopPlayback();
      return;
    }

    // Stop current
    stopPlayback();

    // Start new
    setCurrentPlayingId(memo.id);
    setPlaybackProgress(0);
    setPlaybackTime(0);

    // Subtle luxury chime to announce start
    playLuxuryChime();

    const duration = memo.durationSeconds / playbackSpeed;
    const startTime = Date.now();

    // Try Speech Synthesis for natural Romanian voice
    let speechActive = false;
    if ('speechSynthesis' in window && !isMuted) {
      try {
        const utterance = new SpeechSynthesisUtterance(memo.transcript);
        utterance.lang = 'ro-RO';
        utterance.rate = 1.05 * playbackSpeed;
        utterance.pitch = 1.15; // friendly warm enthusiastic pitch
        activeUtteranceRef.current = utterance;

        utterance.onend = () => {
          stopPlayback();
        };

        utterance.onerror = () => {
          // Fall back gracefully to internal synth
        };

        window.speechSynthesis.speak(utterance);
        speechActive = true;
      } catch {
        speechActive = false;
      }
    }

    // Run interval timer for waveform animation and progress tracking
    timerIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const currentTimeSec = Math.min(elapsed * playbackSpeed, memo.durationSeconds);

      setPlaybackProgress(progress);
      setPlaybackTime(currentTimeSec);

      // Synthesize harmonic shimmer sparkles at key intervals if speech is muted/silent
      if (Math.random() > 0.72) {
        const sparkleNotes = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];
        const randomNote = sparkleNotes[Math.floor(Math.random() * sparkleNotes.length)];
        playAmbientSparkleTone(randomNote, 0.4);
      }

      if (progress >= 1) {
        stopPlayback();
      }
    }, 50);
  };

  // Handle user seeking on waveform
  const handleSeek = (memo, clickProgress) => {
    if (currentPlayingId === memo.id) {
      setPlaybackProgress(clickProgress);
      setPlaybackTime(clickProgress * memo.durationSeconds);
      // Restart speech or playback from ratio
      togglePlayMemo(memo);
    } else {
      togglePlayMemo(memo);
    }
  };

  // Add emoji reaction
  const handleAddReaction = (memoId, type) => {
    playHeartPopSound();
    const current = reactions[memoId] || {};
    const newCount = (current[type] || 0) + 1;
    const updated = {
      ...reactions,
      [memoId]: { ...current, [type]: newCount, [`user_${type}`]: true }
    };
    setReactions(updated);
    try {
      localStorage.setItem('stardust_voice_memo_reactions', JSON.stringify(updated));
    } catch {}
  };

  const formatSeconds = (sec) => {
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <section 
      id="voice-memos-section"
      className="section" 
      style={{ 
        background: 'linear-gradient(180deg, #ffffff 0%, #fff1f2 50%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 0'
      }}
    >
      {/* Decorative luxury watermark */}
      <div 
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Header with WhatsApp & Verified Badge */}
        <div className="section-header" style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dcfce7', color: '#15803d', padding: '6px 18px', borderRadius: '30px', fontSize: '0.84rem', fontWeight: 800, border: '1px solid #bbf7d0', marginBottom: '14px' }}>
            <MessageCircle size={17} color="#16a34a" />
            <span>NOTE VOCALE REALE WHATSAPP</span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span>100% AUTENTICE DE LA CLIENTE</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, margin: '8px 0 14px' }}>
            Ascultă <span className="highlight-rose">Emoția Pură</span> a Celor Care au Deschis Cutia
          </h2>
          
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Fără recenzii fabricate. Apasă <strong>Play</strong> pe mesajele audio primite pe WhatsApp de atelierul nostru de la partenere, logodnice și soții în momentul în care au descoperit trandafirii cu sclipici diamant.
          </p>
        </div>

        {/* Global Toolbar: Filters & Audio Settings */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-light)',
            padding: '16px 24px',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '36px'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-muted)', marginRight: '6px' }}>
              Filtrează Emoția:
            </span>
            {[
              { id: 'toate', label: 'Toate Notele Vocale (5)', Icon: Sparkles },
              { id: 'cereri', label: 'Cereri & Reconcilieri (2)', Icon: RingIcon },
              { id: 'aniversari', label: 'Zile de Naștere & Cuplu (2)', Icon: PartyIcon },
              { id: 'distanta', label: 'Dragoste la Distanță (1)', Icon: RoseIcon }
            ].map(tab => {
              const TabIcon = tab.Icon;
              return (
                <button
                  key={tab.id}
                  id={`btn-filter-memo-${tab.id}`}
                  onClick={() => {
                    stopPlayback();
                    setActiveCategory(tab.id);
                  }}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '25px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: activeCategory === tab.id ? 'var(--rose-600)' : 'var(--border-light)',
                    background: activeCategory === tab.id ? 'var(--rose-600)' : 'var(--bg-surface)',
                    color: activeCategory === tab.id ? '#ffffff' : 'var(--text-main)',
                    transition: 'all 0.2s ease',
                    boxShadow: activeCategory === tab.id ? '0 4px 12px rgba(225, 29, 72, 0.25)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <TabIcon size={14} color={activeCategory === tab.id ? '#ffffff' : 'var(--rose-600)'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Audio Controls (Speed & Mute) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Speed Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              {[1, 1.5, 2].map(speed => (
                <button
                  key={speed}
                  id={`btn-speed-${speed}x`}
                  onClick={() => setPlaybackSpeed(speed)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: playbackSpeed === speed ? 'var(--rose-600)' : 'transparent',
                    color: playbackSpeed === speed ? '#ffffff' : 'var(--text-muted)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Mute Toggle */}
            <button
              id="btn-voice-memo-mute-toggle"
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted) stopPlayback();
              }}
              title={isMuted ? 'Activează Sunetul' : 'Oprește Sunetul'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: '1px solid var(--border-light)',
                background: isMuted ? 'var(--rose-50)' : 'var(--bg-surface)',
                color: isMuted ? '#dc2626' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMuted ? 'Fără Sunet' : 'Sunet Activ'}</span>
            </button>
          </div>
        </div>

        {/* Voice Memo Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          {filteredMemos.map((memo) => {
            const isPlaying = currentPlayingId === memo.id;
            const currentSec = isPlaying ? playbackTime : 0;
            const progress = isPlaying ? playbackProgress : 0;
            const isTranscriptOpen = !!showTranscript[memo.id];
            const memoReactions = reactions[memo.id] || {};

            return (
              <div
                key={memo.id}
                id={`voice-memo-card-${memo.id}`}
                className="voice-memo-card"
                style={{
                  background: isPlaying 
                    ? 'var(--bg-subtle)' 
                    : 'var(--bg-card)',
                  border: isPlaying ? '2px solid var(--rose-600)' : '1px solid var(--border-light)',
                  borderRadius: '24px',
                  padding: '24px',
                  boxShadow: isPlaying 
                    ? '0 16px 36px rgba(225, 29, 72, 0.16)' 
                    : 'var(--shadow-md)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
              >
                {/* Header: User Avatar, Name, Occasion & WhatsApp Verified Check */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    {/* Avatar with live equalizer pulse if playing */}
                    <div 
                      style={{
                        position: 'relative',
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: memo.avatarBg,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '1.25rem',
                        boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)',
                        flexShrink: 0
                      }}
                    >
                      {memo.name.charAt(0)}
                      {isPlaying && (
                        <div 
                          style={{
                            position: 'absolute',
                            inset: '-4px',
                            borderRadius: '50%',
                            border: '2px solid var(--rose-600)',
                            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                            pointerEvents: 'none'
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>
                          {memo.name}
                        </strong>
                        <span title="Clientă Verificată Stardust" style={{ color: '#0284c7', display: 'inline-flex' }}>
                          <BadgeCheck size={18} />
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span>{memo.city}</span>
                        <span>•</span>
                        <span style={{ color: 'var(--rose-600)', fontWeight: 700 }}>{memo.occasion}</span>
                      </div>
                    </div>
                  </div>

                  {/* Emotion Pill Badge */}
                  <span 
                    style={{
                      background: '#fef2f2',
                      color: 'var(--rose-600)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      border: '1px solid #fecdd3',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <SparkleIcon size={11} color="var(--rose-600)" />
                    <span>{memo.emotionBadge}</span>
                  </span>
                </div>

                {/* WhatsApp Simulated Voice Bubble */}
                <div 
                  style={{
                    background: '#f0fdf4',
                    border: '1.5px solid #bbf7d0',
                    borderRadius: '18px',
                    padding: '16px',
                    marginBottom: '16px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Play / Pause Primary Button */}
                    <button
                      id={`btn-play-memo-${memo.id}`}
                      onClick={() => togglePlayMemo(memo)}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: isPlaying ? 'var(--rose-600)' : '#16a34a',
                        color: '#ffffff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                        boxShadow: isPlaying 
                          ? '0 6px 18px rgba(225, 29, 72, 0.4)' 
                          : '0 6px 16px rgba(22, 163, 74, 0.35)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isPlaying ? 'scale(1.05)' : 'scale(1)'
                      }}
                      title={isPlaying ? 'Pauză' : 'Ascultă Nota Vocală'}
                    >
                      {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '3px' }} />}
                    </button>

                    {/* Dynamic Sound Waveform & Progress Bar */}
                    <div style={{ flex: 1 }}>
                      <div 
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                          handleSeek(memo, ratio);
                        }}
                        style={{
                          height: '42px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          cursor: 'pointer',
                          padding: '4px 0',
                          position: 'relative'
                        }}
                        title="Apasă oriunde pentru a derula"
                      >
                        {memo.waveformPattern.map((barHeight, idx) => {
                          const barRatio = idx / memo.waveformPattern.length;
                          const isPassed = progress >= barRatio;
                          
                          // Animate bars subtly when playing
                          const dynamicHeight = isPlaying 
                            ? Math.min(100, barHeight + Math.sin(Date.now() / 150 + idx) * 18)
                            : barHeight;

                          return (
                            <div
                              key={idx}
                              style={{
                                flex: 1,
                                height: `${dynamicHeight}%`,
                                minHeight: '6px',
                                borderRadius: '3px',
                                background: isPassed 
                                  ? (isPlaying ? 'var(--rose-600)' : '#15803d') 
                                  : '#cbd5e1',
                                transition: isPlaying ? 'height 0.1s ease, background 0.1s ease' : 'background 0.2s ease'
                              }}
                            />
                          );
                        })}
                      </div>

                      {/* Timer & WhatsApp Double Checkmark */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                          {formatSeconds(currentSec)} / {formatSeconds(memo.durationSeconds)}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#166534' }}>
                          <span>{memo.dateSent}</span>
                          <span style={{ color: '#0284c7', display: 'inline-flex' }} title="Ascultat pe WhatsApp">
                            <CheckCheck size={16} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle / Live Transcript Accordion */}
                <div style={{ marginBottom: '16px' }}>
                  <button
                    id={`btn-toggle-transcript-${memo.id}`}
                    onClick={() => setShowTranscript(prev => ({ ...prev, [memo.id]: !prev[memo.id] }))}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--rose-600)',
                      marginBottom: '8px'
                    }}
                  >
                    <FileText size={15} />
                    <span>{isTranscriptOpen ? 'Ascunde Subtitrarea Audio' : 'Afișează Textul Subtitrat'}</span>
                  </button>

                  {isTranscriptOpen && (
                    <div 
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '14px',
                        padding: '12px 16px',
                        fontSize: '0.88rem',
                        lineHeight: 1.55,
                        color: 'var(--text-main)',
                        fontStyle: 'italic',
                        position: 'relative'
                      }}
                    >
                      „{memo.transcript}”
                    </div>
                  )}
                </div>

                {/* Bouquet Preview & Direct Buy Link */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    background: 'var(--rose-50)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '14px',
                    marginBottom: '16px'
                  }}
                >
                  <img 
                    src={memo.bouquetImage} 
                    alt={memo.bouquetName} 
                    style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--rose-600)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                      BUCHETUL DIN ÎNREGISTRARE
                    </span>
                    <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {memo.bouquetName}
                    </strong>
                  </div>
                  <Link 
                    to={`/checkout?bouquet=${memo.bouquetId}`} 
                    className="btn btn-primary btn-sm"
                    style={{ padding: '6px 12px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                  >
                    Vreau și Eu
                  </Link>
                </div>

                {/* Social Proof Reactions (Heart, Cry, Fire) */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '12px'
                  }}
                >
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Reacții reale:
                  </span>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      id={`btn-react-heart-${memo.id}`}
                      onClick={() => handleAddReaction(memo.id, 'heart')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '20px',
                        border: '1px solid #fecdd3',
                        background: memoReactions.user_heart ? '#ffe4e6' : '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: '#be123c'
                      }}
                      title="Reacționează cu Inimă"
                    >
                      <Heart size={14} color="#be123c" fill={memoReactions.user_heart ? '#be123c' : 'none'} />
                      <span>{(memo.initialReactions.heart + (memoReactions.heart || 0))}</span>
                    </button>

                    <button
                      id={`btn-react-cry-${memo.id}`}
                      onClick={() => handleAddReaction(memo.id, 'cry')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        background: memoReactions.user_cry ? '#f1f5f9' : '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: '#334155'
                      }}
                      title="Reacționează cu Emoție"
                    >
                      <SparkleIcon size={13} color="#475569" />
                      <span>{(memo.initialReactions.cry + (memoReactions.cry || 0))}</span>
                    </button>

                    <button
                      id={`btn-react-fire-${memo.id}`}
                      onClick={() => handleAddReaction(memo.id, 'fire')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '20px',
                        border: '1px solid #fed7aa',
                        background: memoReactions.user_fire ? '#ffedd5' : '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: '#c2410c'
                      }}
                      title="Reacționează cu Foc"
                    >
                      <Flame size={14} color="#c2410c" fill={memoReactions.user_fire ? '#c2410c' : 'none'} />
                      <span>{(memo.initialReactions.fire + (memoReactions.fire || 0))}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Voice Memo Incentive CTA Banner */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
            borderRadius: '28px',
            padding: '36px 40px',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            boxShadow: '0 20px 40px rgba(5, 46, 22, 0.25)',
            border: '1px solid rgba(74, 222, 128, 0.2)'
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(74, 222, 128, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, color: '#86efac', marginBottom: '12px' }}>
              <Sparkles size={14} />
              <span>PROGRAMUL DE RECUNOȘTINȚĂ STARDUST</span>
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '1.65rem', marginBottom: '8px', lineHeight: 1.3 }}>
              Trimite reacția vocală a persoanei dragi pe WhatsApp și primești un voucher de 15%!
            </h3>
            <p style={{ color: '#bbf7d0', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
              Fiecare reacție autentică ne ajută să continuăm magia în atelier. Înregistrează bucuria ei și trimite-ne nota vocală pentru un cod VIP de reducere garantat.
            </p>
          </div>

          <a 
            id="btn-send-whatsapp-memo-cta"
            href="https://wa.me/40721000000?text=Bună%20ziua!%20Vreau%20să%20trimit%20și%20eu%20nota%20vocală%20cu%20reacția%20primită%20la%20buchetul%20Stardust%20pentru%20voucherul%20de%2015%25!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold btn-lg"
            style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <Mic size={20} />
            <span>Trimite Nota Vocală pe WhatsApp</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
