import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Eye, 
  Heart, 
  Edit3, 
  ShieldCheck, 
  Mail, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { 
  PopUpGreetingCardIcon, 
  FlyingPetalsIcon, 
  WaxSealStampIcon, 
  CrownIcon, 
  RoseIcon, 
  DiamondIcon, 
  FleurDeLisIcon 
} from './CustomIcons';
import { playLuxuryChime } from '../utils/audioAlert';
import { useCurrency } from '../context/CurrencyContext';

export const POPUP_SCULPTURES = [
  {
    id: 'rose-sculpture',
    name: 'Trandafir Imperial 3D (Petale Roșii & Carton Aurit)',
    price: 29,
    badge: 'BESTSELLER ATELIER',
    badgeColor: '#e11d48',
    description: 'Sculptură origami tridimensională cu 12 straturi concentrice de petale decupate cu laserul și margini tivite cu foiță de aur 24K.',
    accentColor: '#e11d48',
    previewType: 'rose'
  },
  {
    id: 'hearts-butterflies',
    name: 'Inimi Concentrice 3D & Fluturi de Mătase Foiță Aur',
    price: 35,
    badge: 'ROMANTISM PUR',
    badgeColor: '#f59e0b',
    description: 'Trei inimi ascendente din carton sidefat și 4 fluturi delicați care se desfac în zbor tridimensional la deschiderea felicitării.',
    accentColor: '#f59e0b',
    previewType: 'hearts'
  },
  {
    id: 'floral-arch',
    name: 'Arcadă Florală Regală & Porumbei de Dragoste',
    price: 35,
    badge: 'EVENIMENT & NUNTĂ',
    badgeColor: '#8b5cf6',
    description: 'Arcadă arhitecturală barocă împodobită cu flori albe sculptate și accente aurite, simbol al iubirii eterne.',
    accentColor: '#8b5cf6',
    previewType: 'arch'
  }
];

export const ENVELOPE_STYLES = [
  {
    id: 'bordeaux-wax',
    name: 'Plic Roșu Rubiniu Bordeaux & Sigiliu Aur 24K',
    envBg: 'linear-gradient(135deg, #4c0519 0%, #2a030e 100%)',
    flapBg: '#5c0720',
    envBorder: 'rgba(244, 63, 94, 0.45)',
    textColor: '#ffe4e6',
    sealColor: '#d97706',
    sealGlow: 'rgba(217, 119, 6, 0.4)',
    sealLabel: 'AUR IMPERIAL 24K'
  },
  {
    id: 'noir-wax',
    name: 'Plic Noir Onyx Mat & Sigiliu Ceară Roșie Rubinie',
    envBg: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
    flapBg: '#27272a',
    envBorder: 'rgba(245, 158, 11, 0.4)',
    textColor: '#f4f4f5',
    sealColor: '#be123c',
    sealGlow: 'rgba(190, 18, 60, 0.45)',
    sealLabel: 'RUBIN BORDEAUX'
  },
  {
    id: 'ivory-wax',
    name: 'Plic Fildeș & Hârtie de Bumbac & Sigiliu Rose Gold',
    envBg: 'linear-gradient(135deg, #fffbf5 0%, #f7ede2 100%)',
    flapBg: '#faebd7',
    envBorder: 'rgba(225, 29, 72, 0.35)',
    textColor: '#1c1917',
    sealColor: '#e11d48',
    sealGlow: 'rgba(225, 29, 72, 0.35)',
    sealLabel: 'ROSE GOLD REGAL'
  }
];

export const POPUP_MESSAGE_PRESETS = [
  {
    id: 'love-forever',
    title: 'Dragoste Eternă',
    recipient: 'Pentru Femeia Vieții Mele',
    sender: 'Al tău pentru totdeauna, Andrei',
    text: 'Pentru persoana care aduce magie în fiecare clipă din viața mea. Te iubesc mai mult decât cuvintele o pot spune, la fel de intens ca strălucirea acestor trandafiri!'
  },
  {
    id: 'birthday-joy',
    title: 'Aniversare Magică',
    recipient: 'La Mulți Ani, Iubita Mea!',
    sender: 'Cu toată dragostea, Mihai',
    text: 'Să strălucești în fiecare zi la fel de intens cum strălucesc aceste flori Stardust. Fiecare an alături de tine este o binecuvântare cerească!'
  },
  {
    id: 'wedding-proposal',
    title: 'Cerere & Promisiune',
    recipient: 'Pentru Sufletul Meu Pereche',
    sender: 'Inima mea este a ta, Cristian',
    text: 'Vrei să deschidem împreună cel mai frumos capitol al poveștii noastre? Te aleg pe tine astăzi, mâine și în fiecare clipă din veșnicie.'
  },
  {
    id: 'gratitude',
    title: 'Admirație & Recunoștință',
    recipient: 'Pentru o Femeie Extraordinară',
    sender: 'Cu infinit respect și prețuire',
    text: 'Eleganța ta, căldura și bunătatea sufletului tău luminează fiecare încăpere în care pășești. Un gest sincer de admirație pentru tot ceea ce ești!'
  }
];

export default function PopUpCard3DSimulator({
  isEmbedded = false,
  initialSculpture = 'rose-sculpture',
  initialEnvelope = 'bordeaux-wax',
  initialMessage = 'Pentru persoana care aduce magie în fiecare clipă din viața mea. Te iubesc din tot sufletul!',
  initialRecipient = 'Pentru Andreea',
  initialSender = 'Cu dragoste eternă, Andrei',
  onApplyCard = null,
  onCloseModal = null
}) {
  const { formatPrice } = useCurrency();

  // Selected configurations
  const [selectedSculptureId, setSelectedSculptureId] = useState(initialSculpture);
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState(initialEnvelope);
  const [messageText, setMessageText] = useState(initialMessage);
  const [recipientName, setRecipientName] = useState(initialRecipient);
  const [senderName, setSenderName] = useState(initialSender);

  // Animation and interaction state: 'sealed' | 'opening' | 'opened'
  const [cardState, setCardState] = useState('sealed');
  const [floatingPetals, setFloatingPetals] = useState([]);
  const audioContextRef = useRef(null);

  const currentSculpture = POPUP_SCULPTURES.find((s) => s.id === selectedSculptureId) || POPUP_SCULPTURES[0];
  const currentEnvelope = ENVELOPE_STYLES.find((e) => e.id === selectedEnvelopeId) || ENVELOPE_STYLES[0];

  // Synthesize realistic wax crackle & paper rustle sound
  const playWaxSealCrackSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      // 1. Crack noise buffer for wax breaking
      const bufferSize = ctx.sampleRate * 0.15;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(3.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);

      // 2. Paper slide glide tone
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now + 0.05);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.35);

      oscGain.gain.setValueAtTime(0.0001, now + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.04, now + 0.12);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now + 0.05);
      osc.stop(now + 0.35);

      // 3. Luxury crystal chime upon full reveal
      setTimeout(() => {
        playLuxuryChime();
      }, 450);
    } catch {}
  };

  // Generate floating petals
  const spawnFloatingPetals = () => {
    const petals = [];
    for (let i = 0; i < 18; i++) {
      petals.push({
        id: i,
        left: Math.random() * 85 + 5,
        size: Math.random() * 14 + 10,
        delay: Math.random() * 0.8,
        duration: Math.random() * 2.2 + 2.5,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 60,
        isGold: i % 4 === 0
      });
    }
    setFloatingPetals(petals);
  };

  // Action: Open Envelope & Reveal Pop-Up Card
  const handleOpenEnvelope = () => {
    playWaxSealCrackSound();
    setCardState('opening');

    setTimeout(() => {
      setCardState('opened');
      spawnFloatingPetals();
    }, 450);
  };

  // Action: Reset & Reseal Envelope
  const handleResealEnvelope = () => {
    playLuxuryChime();
    setCardState('sealed');
    setFloatingPetals([]);
  };

  // Preset Selection
  const handleSelectPreset = (preset) => {
    playLuxuryChime();
    setMessageText(preset.text);
    setRecipientName(preset.recipient);
    setSenderName(preset.sender);
  };

  // Confirm Selection / Apply to Order
  const handleConfirm = () => {
    playLuxuryChime();
    const payload = {
      sculpture: currentSculpture,
      envelope: currentEnvelope,
      message: messageText,
      recipient: recipientName,
      sender: senderName,
      totalPrice: currentSculpture.price
    };

    if (onApplyCard) {
      onApplyCard(payload);
    }
    if (onCloseModal) {
      onCloseModal();
    }
  };

  return (
    <div 
      className="popup-card-3d-simulator"
      style={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      <style>{`
        @keyframes floatPetalCascade {
          0% {
            transform: translateY(-20px) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.95;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(280px) rotate(360deg) scale(1);
            opacity: 0;
          }
        }
        @keyframes popUpUnfold {
          0% {
            transform: scale(0.7) rotateX(45deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.05) rotateX(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }
        @keyframes sealGlowPulse {
          0%, 100% {
            box-shadow: 0 0 14px rgba(217, 119, 6, 0.4);
          }
          50% {
            box-shadow: 0 0 26px rgba(217, 119, 6, 0.85);
          }
        }
      `}</style>

      {/* Header section */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(225, 29, 72, 0.12)',
            border: '1px solid rgba(225, 29, 72, 0.35)',
            borderRadius: '24px',
            padding: '6px 16px',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#fb7185',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}
        >
          <PopUpGreetingCardIcon size={16} color="#fb7185" />
          <span>SIMULATOR INTERACTIV 3D • EFECT DE DESFACERE REGALĂ</span>
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
          Felicitare Pop-Up 3D cu Petale Plutitoare & Plic Sigilat
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
          Experimentează emoția unică a deschiderii plicului: la ruperea sigiliului de ceară, felicitarea se desface tridimensional, iar petalele parfumate și sclipiciul diamant se revarsă în aer.
        </p>
      </div>

      {/* Main Grid: Controls Left / 3D Virtual Stage Right */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* LEFT COLUMN: Controls & Caligraphy Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* STEP 1: POP-UP SCULPTURE STYLE */}
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
                <RoseIcon size={15} color="#e11d48" />
                <span>1. Sculptură Tridimensională Pop-Up</span>
              </label>
              <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600 }}>
                Origami de Salon
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {POPUP_SCULPTURES.map((sculpture) => {
                const isSelected = selectedSculptureId === sculpture.id;
                return (
                  <button
                    key={sculpture.id}
                    type="button"
                    onClick={() => {
                      setSelectedSculptureId(sculpture.id);
                      playLuxuryChime();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isSelected ? 'rgba(225, 29, 72, 0.12)' : 'rgba(0, 0, 0, 0.35)',
                      border: isSelected ? '2px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.12)',
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
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'rgba(225, 29, 72, 0.2)',
                          border: '1px solid rgba(225, 29, 72, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <PopUpGreetingCardIcon size={16} color={sculpture.accentColor} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                          {sculpture.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginTop: '3px', lineHeight: 1.3 }}>
                          {sculpture.description}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '10px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#fb7185', whiteSpace: 'nowrap' }}>
                        +{formatPrice(sculpture.price)}
                      </div>
                      <span 
                        style={{
                          display: 'inline-block',
                          fontSize: '0.64rem',
                          fontWeight: 800,
                          color: sculpture.badgeColor,
                          background: 'rgba(0,0,0,0.5)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          marginTop: '3px'
                        }}
                      >
                        {sculpture.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: ENVELOPE COLOR & WAX SEAL STYLE */}
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
                <WaxSealStampIcon size={15} color="#f59e0b" />
                <span>2. Plic de Mătase & Sigiliu din Ceară Naturală</span>
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {ENVELOPE_STYLES.map((env) => {
                const isSelected = selectedEnvelopeId === env.id;
                return (
                  <button
                    key={env.id}
                    type="button"
                    onClick={() => {
                      setSelectedEnvelopeId(env.id);
                      playLuxuryChime();
                    }}
                    style={{
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0,0,0,0.3)',
                      border: isSelected ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      padding: '10px 8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div 
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: env.sealColor,
                        boxShadow: `0 0 10px ${env.sealGlow}`,
                        margin: '0 auto 6px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FleurDeLisIcon size={14} color="#ffffff" />
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                      {env.name.split('&')[0]}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#fbbf24', marginTop: '2px', fontWeight: 600 }}>
                      {env.sealLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: CALIGRAPHIC DEDICATION & SENDER */}
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
                <Edit3 size={15} color="#fb7185" />
                <span>3. Mesaj Tipărit pe Cartonul Felicitării</span>
              </label>
            </div>

            {/* QUICK PRESETS PILLS */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {POPUP_MESSAGE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#e5e7eb',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {preset.title}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af', marginBottom: '4px' }}>
                  Pentru (Destinatar):
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Ex: Pentru Andreea"
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af', marginBottom: '4px' }}>
                  Semnătură (Expeditor):
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ex: Al tău, Andrei"
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af', marginBottom: '4px' }}>
                Textul Caligrafiat:
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={3}
                placeholder="Scrie mesajul tău de suflet..."
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
          </div>

          {/* CONFIRM BUTTON */}
          <button
            type="button"
            id="btn-confirm-popup-card"
            onClick={handleConfirm}
            className="btn btn-primary btn-lg"
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '0.98rem',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <CheckCircle2 size={18} />
            <span>Adaugă Felicitarea Pop-Up (+{formatPrice(currentSculpture.price)})</span>
          </button>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE 3D STAGE & SIMULATION */}
        <div style={{ position: 'sticky', top: '24px' }}>
          <div 
            style={{
              background: 'rgba(15, 15, 17, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '24px 20px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#fbbf24" />
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f3f4f6', letterSpacing: '0.5px' }}>
                  EXPERIENȚĂ VIRTUALĂ 3D DE DESFACERE
                </span>
              </div>
              <span 
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: cardState === 'opened' ? '#10b981' : '#f59e0b',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {cardState === 'sealed' ? 'Plic Sigilat' : (cardState === 'opening' ? 'Desigilare...' : 'Felicitare 3D Deschisă')}
              </span>
            </div>

            {/* 3D SCENE CONTAINER */}
            <div
              id="popup-card-3d-stage"
              style={{
                minHeight: '380px',
                background: 'radial-gradient(ellipse at 50% 30%, #1a0f18 0%, #080307 100%)',
                border: '1.5px solid rgba(244, 63, 94, 0.35)',
                borderRadius: '16px',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                perspective: '1000px',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
              }}
            >
              {/* FLOATING PETALS FX (SHOWN ON OPENED STATE) */}
              {cardState === 'opened' && floatingPetals.map((petal) => (
                <div
                  key={petal.id}
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: `${petal.left}%`,
                    width: `${petal.size}px`,
                    height: `${petal.size * 1.3}px`,
                    borderRadius: '50% 10% 50% 50%',
                    background: petal.isGold 
                      ? 'linear-gradient(135deg, #f59e0b, #fef08a)' 
                      : 'linear-gradient(135deg, #e11d48, #9f1239)',
                    boxShadow: petal.isGold 
                      ? '0 0 8px rgba(245, 158, 11, 0.6)' 
                      : '0 0 8px rgba(225, 29, 72, 0.5)',
                    opacity: 0,
                    animation: `floatPetalCascade ${petal.duration}s ease-in-out infinite`,
                    animationDelay: `${petal.delay}s`,
                    pointerEvents: 'none',
                    zIndex: 20
                  }}
                />
              ))}

              {/* STATE 1: SEALED ENVELOPE */}
              {cardState === 'sealed' && (
                <div 
                  id="sealed-envelope-card"
                  style={{
                    width: '100%',
                    maxWidth: '340px',
                    height: '220px',
                    background: currentEnvelope.envBg,
                    border: `1.5px solid ${currentEnvelope.envBorder}`,
                    borderRadius: '14px',
                    position: 'relative',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={handleOpenEnvelope}
                >
                  {/* Flap fold lines */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '110px',
                      background: currentEnvelope.flapBg,
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      opacity: 0.85,
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                  />

                  {/* WAX SEAL STAMP WITH MONOGRAM */}
                  <div 
                    id="envelope-wax-seal"
                    style={{
                      position: 'absolute',
                      top: '75px',
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: currentEnvelope.sealColor,
                      border: '3px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      cursor: 'pointer',
                      animation: 'sealGlowPulse 2.5s infinite',
                      boxShadow: `0 8px 24px ${currentEnvelope.sealGlow}`
                    }}
                    title="Apasă pentru a desigila plicul"
                  >
                    <CrownIcon size={18} color="#ffffff" style={{ marginBottom: '1px' }} />
                    <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.5px' }}>
                      STARDUST
                    </span>
                  </div>

                  <div style={{ position: 'absolute', bottom: '18px', textAlign: 'center', zIndex: 5 }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: currentEnvelope.textColor, letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {recipientName || 'Pentru Destinatar'}
                    </div>
                    <div style={{ fontSize: '0.64rem', color: '#9ca3af', marginTop: '2px' }}>
                      Atinge pentru a rupe sigiliul de ceară
                    </div>
                  </div>
                </div>
              )}

              {/* STATE 2 & 3: OPENED 3D POP-UP CARD */}
              {(cardState === 'opening' || cardState === 'opened') && (
                <div
                  id="opened-popup-card-structure"
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    background: 'radial-gradient(ellipse at 50% 10%, #fffbf5 0%, #f7ede2 100%)',
                    border: '2px solid rgba(217, 119, 6, 0.45)',
                    borderRadius: '16px',
                    padding: '24px 18px',
                    color: '#291b22',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.85), inset 0 0 20px rgba(245, 158, 11, 0.1)',
                    position: 'relative',
                    animation: 'popUpUnfold 0.55s ease forwards',
                    zIndex: 15
                  }}
                >
                  {/* Subtle inner gold frame */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: '6px',
                      border: '1px solid rgba(217, 119, 6, 0.35)',
                      borderRadius: '12px',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Header Dedication */}
                  <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '1.5px', color: '#92400e', textTransform: 'uppercase' }}>
                      STARDUST FLORALS™ • HAUTE PAPETERIE
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#881337', fontFamily: 'serif', marginTop: '2px' }}>
                      {recipientName || 'Pentru Andreea'}
                    </div>
                  </div>

                  {/* 3D SCULPTURE DISPLAY (CENTER) */}
                  <div 
                    style={{
                      height: '110px',
                      margin: '10px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Glowing Aura */}
                    <div 
                      style={{
                        position: 'absolute',
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(225,29,72,0.25) 0%, transparent 70%)',
                        filter: 'blur(6px)'
                      }}
                    />

                    {/* Rose Sculpture 3D Layered Representation */}
                    {currentSculpture.previewType === 'rose' && (
                      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <div style={{ width: '72px', height: '72px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <RoseIcon size={54} color="#e11d48" />
                        </div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9f1239', letterSpacing: '0.5px', marginTop: '2px' }}>
                          Trandafir 3D cu Foiță de Aur 24K
                        </div>
                      </div>
                    )}

                    {/* Hearts & Butterflies 3D Representation */}
                    {currentSculpture.previewType === 'hearts' && (
                      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <Heart size={38} color="#e11d48" fill="#e11d48" opacity={0.9} />
                          <Heart size={48} color="#f59e0b" fill="#f59e0b" opacity={0.8} />
                          <Heart size={34} color="#e11d48" fill="#e11d48" opacity={0.7} />
                        </div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#92400e', letterSpacing: '0.5px', marginTop: '4px' }}>
                          Inimi Ascendente & Fluturi de Mătase
                        </div>
                      </div>
                    )}

                    {/* Floral Arch 3D Representation */}
                    {currentSculpture.previewType === 'arch' && (
                      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <div style={{ width: '70px', height: '60px', margin: '0 auto', borderTop: '3px solid #8b5cf6', borderLeft: '3px solid #8b5cf6', borderRight: '3px solid #8b5cf6', borderRadius: '35px 35px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FleurDeLisIcon size={28} color="#8b5cf6" />
                        </div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6b21a8', letterSpacing: '0.5px', marginTop: '4px' }}>
                          Arcadă Barocă & Porumbei Albi
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Caligraphic Message Body */}
                  <div 
                    style={{
                      background: 'rgba(255, 255, 255, 0.65)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      border: '1px dashed rgba(217, 119, 6, 0.3)',
                      marginBottom: '10px'
                    }}
                  >
                    <p 
                      style={{
                        fontSize: '0.82rem',
                        fontFamily: 'serif',
                        fontStyle: 'italic',
                        color: '#4c0519',
                        lineHeight: 1.45,
                        margin: 0,
                        textAlign: 'center'
                      }}
                    >
                      „{messageText}”
                    </p>
                  </div>

                  {/* Sign-off & Stamp */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#78350f', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <WaxSealStampIcon size={12} color="#92400e" />
                      <span>{currentEnvelope.sealLabel}</span>
                    </div>
                    <strong style={{ fontStyle: 'italic', color: '#881337' }}>
                      {senderName || 'Al tău, Andrei'}
                    </strong>
                  </div>
                </div>
              )}

              {/* ACTION TOGGLE BUTTON ON STAGE */}
              <div style={{ marginTop: '20px', zIndex: 25 }}>
                {cardState === 'sealed' ? (
                  <button
                    type="button"
                    id="btn-stage-open-envelope"
                    onClick={handleOpenEnvelope}
                    className="btn btn-gold btn-md"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 22px',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)'
                    }}
                  >
                    <WaxSealStampIcon size={16} color="#78350f" />
                    <span>Rupe Sigiliul & Deschide Plicul</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    id="btn-stage-reseal-envelope"
                    onClick={handleResealEnvelope}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <RotateCcw size={14} />
                    <span>Închide & Re-Sigilează Plicul</span>
                  </button>
                )}
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
                <strong style={{ color: '#ffffff' }}>Garanție Stardust Papeterie™:</strong> Felicitarea este realizată manual de artizani caligrafi, decupată cu laser de precizie și sigilată cu ceară vegetală flexibilă care nu se sparge la transport.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
