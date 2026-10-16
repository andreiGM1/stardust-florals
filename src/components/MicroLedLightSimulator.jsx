import React, { useState, useEffect } from 'react';
import { Sparkles, Moon, Sun, Flame, Zap, ShieldCheck, CheckCircle2, RotateCcw, Power, Eye, Sliders } from 'lucide-react';
import { FairyLightsIcon, DiamondIcon, RoseIcon } from './CustomIcons';

const LIGHT_MODES = [
  { id: 'static', label: 'Static Romantic', desc: 'Lumină caldă continuă, intimă și relaxantă (2700K)' },
  { id: 'firefly', label: 'Licurici Delicat', desc: 'Pulsări asincrone discrete ce imită licuricii într-o noapte de vară' },
  { id: 'breathing', label: 'Pulsare Lentă', desc: 'Respirație luminoasă ritmică și hipnotică la 3.5 secunde' }
];

const LIGHT_COLORS = [
  { id: 'warm-gold', name: 'Aur Cald (2700K)', hex: '#fbbf24', glow: 'rgba(251, 191, 36, 0.85)', desc: 'Recomandat pentru trandafiri roșii & negri' },
  { id: 'rose-gold', name: 'Rose Gold Sidefat', hex: '#fb7185', glow: 'rgba(251, 113, 133, 0.85)', desc: 'Nuanță feminină, delicată și pudrată' },
  { id: 'diamond-white', name: 'Alb Diamant Pur', hex: '#e0f2fe', glow: 'rgba(224, 242, 254, 0.95)', desc: 'Scântei reci precum diamantul veritabil' }
];

const AMBIENCE_LEVELS = [
  { id: 'night', label: 'Noapte Romantică', darkness: 0.88, desc: 'Efect maxim spectaculos în cameră întunecată' },
  { id: 'twilight', label: 'Amurg de Salon', darkness: 0.50, desc: 'Lumină caldă de interior la cină' },
  { id: 'daylight', label: 'Lumină de Zi', darkness: 0.12, desc: 'Strălucire subtilă în lumina ferestrei' }
];

// Strategic coordinates for 16 micro-LEDs placed around bouquet center and petals (% based)
const LED_COORDINATES = [
  { x: 42, y: 38, delay: 0.2, duration: 1.8 },
  { x: 55, y: 34, delay: 0.9, duration: 2.2 },
  { x: 62, y: 46, delay: 0.4, duration: 1.6 },
  { x: 48, y: 52, delay: 1.2, duration: 2.5 },
  { x: 38, y: 48, delay: 0.7, duration: 1.9 },
  { x: 52, y: 42, delay: 1.5, duration: 2.1 },
  { x: 33, y: 36, delay: 0.3, duration: 1.7 },
  { x: 68, y: 38, delay: 1.1, duration: 2.4 },
  { x: 44, y: 26, delay: 0.8, duration: 1.5 },
  { x: 58, y: 24, delay: 1.4, duration: 2.0 },
  { x: 74, y: 48, delay: 0.5, duration: 1.9 },
  { x: 28, y: 46, delay: 1.3, duration: 2.3 },
  { x: 40, y: 64, delay: 0.6, duration: 1.6 },
  { x: 56, y: 62, delay: 1.0, duration: 2.2 },
  { x: 66, y: 58, delay: 0.1, duration: 1.8 },
  { x: 48, y: 72, delay: 1.6, duration: 2.6 }
];

function playToggleAudio(isOn) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const freq = isOn ? 1040 : 440;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(isOn ? 1480 : 280, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // audio unavailable
  }
}

export default function MicroLedLightSimulator({ isEmbedded = false, onApplyMode }) {
  const [isLightsOn, setIsLightsOn] = useState(true);
  const [activeMode, setActiveMode] = useState('firefly');
  const [activeColor, setActiveColor] = useState('warm-gold');
  const [activeAmbience, setActiveAmbience] = useState('night');
  const [brightness, setBrightness] = useState(85);
  const [toastMessage, setToastMessage] = useState('');

  const currentColorObj = LIGHT_COLORS.find((c) => c.id === activeColor) || LIGHT_COLORS[0];
  const currentAmbienceObj = AMBIENCE_LEVELS.find((a) => a.id === activeAmbience) || AMBIENCE_LEVELS[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleToggleLights = () => {
    const newState = !isLightsOn;
    setIsLightsOn(newState);
    playToggleAudio(newState);
    showToast(newState ? 'Ghirlanda Micro-LED activată!' : 'Luminițele au fost oprite.');
  };

  const handleModeChange = (modeId) => {
    setActiveMode(modeId);
    if (!isLightsOn) setIsLightsOn(true);
    showToast(`Mod selectat: ${LIGHT_MODES.find((m) => m.id === modeId)?.label}`);
    if (onApplyMode) {
      onApplyMode({
        mode: modeId,
        color: activeColor,
        brightness
      });
    }
  };

  return (
    <div
      id="micro-led-light-simulator"
      style={{
        background: 'linear-gradient(145deg, #16040d 0%, #090105 100%)',
        border: '1.5px solid rgba(225, 29, 72, 0.4)',
        borderRadius: '24px',
        padding: isEmbedded ? '20px' : '32px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 35px rgba(225, 29, 72, 0.15)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            color: '#ffffff',
            padding: '8px 20px',
            borderRadius: '24px',
            fontSize: '0.82rem',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(225, 29, 72, 0.5)',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225, 29, 72, 0.18)', border: '1px solid rgba(225, 29, 72, 0.35)', padding: '4px 12px', borderRadius: '18px', fontSize: '0.74rem', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
            <FairyLightsIcon size={14} color="#fbbf24" />
            <span>SIMULATOR VIZUAL NOAPTE / ZI • SPECTACOL NOCTURN</span>
          </div>
          <h3 style={{ fontSize: isEmbedded ? '1.35rem' : '1.75rem', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.01em' }}>
            Ghirlandă Micro-LED & Pulbere Diamant
          </h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#fda4af', maxWidth: '620px', lineHeight: 1.5 }}>
            Simulează efectul vizual fascinant al micro-LED-urilor calde (fir de cupru invizibil de 0.2mm) împletite manual printre trandafirii cu sclipici diamant.
          </p>
        </div>

        {/* Master ON/OFF Switch */}
        <button
          type="button"
          id="btn-toggle-led-power"
          onClick={handleToggleLights}
          className="btn btn-sm"
          style={{
            background: isLightsOn ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'rgba(255, 255, 255, 0.08)',
            border: isLightsOn ? '1.5px solid #fb7185' : '1.5px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            padding: '10px 20px',
            fontSize: '0.88rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: isLightsOn ? '0 6px 20px rgba(225, 29, 72, 0.5)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <Power size={16} color={isLightsOn ? '#ffffff' : '#94a3b8'} />
          <span>{isLightsOn ? 'Luminițe: ACTIVE' : 'Luminițe: OPRITE'}</span>
        </button>
      </div>

      {/* Main Grid: Visual Stage (Left) & Controls Panel (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: isEmbedded ? '1fr' : '1.15fr 1fr', gap: '28px', alignItems: 'center' }}>
        
        {/* Visual Stage Card */}
        <div
          id="led-stage-container"
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            height: isEmbedded ? '320px' : '390px',
            background: '#040103',
            border: '2px solid rgba(225, 29, 72, 0.3)',
            boxShadow: isLightsOn
              ? `0 15px 45px rgba(0, 0, 0, 0.8), 0 0 35px ${currentColorObj.glow}`
              : '0 15px 45px rgba(0, 0, 0, 0.8)',
            transition: 'box-shadow 0.4s ease'
          }}
        >
          {/* Base Flower Photo */}
          <img
            src="/images/buchet-dual-noir-rouge-hero.webp"
            alt="Simulare buchet cu trandafiri cu sclipici și luminițe micro-LED"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: `brightness(${1 - currentAmbienceObj.darkness * 0.65}) contrast(${isLightsOn ? 1.15 : 0.95})`,
              transition: 'filter 0.5s ease'
            }}
          />

          {/* Ambience Darkness Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#040103',
              opacity: isLightsOn ? currentAmbienceObj.darkness * 0.82 : currentAmbienceObj.darkness * 0.92,
              pointerEvents: 'none',
              transition: 'opacity 0.5s ease'
            }}
          />

          {/* Micro-LED Light Sparkles Overlay */}
          {isLightsOn && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {LED_COORDINATES.map((led, idx) => {
                const effectiveBrightness = (brightness / 100);
                
                // Mode-based styles
                let animationStyle = 'none';
                if (activeMode === 'firefly') {
                  animationStyle = `fireflyTwinkle ${led.duration}s infinite ease-in-out ${led.delay}s`;
                } else if (activeMode === 'breathing') {
                  animationStyle = 'ledBreathing 3.5s infinite ease-in-out';
                }

                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `${led.x}%`,
                      top: `${led.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: currentColorObj.hex,
                      boxShadow: `0 0 8px ${currentColorObj.hex}, 0 0 20px ${currentColorObj.glow}, 0 0 32px ${currentColorObj.glow}`,
                      opacity: effectiveBrightness,
                      animation: animationStyle
                    }}
                  >
                    {/* Micro starburst glare */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${currentColorObj.hex} 0%, transparent 70%)`,
                        opacity: 0.6
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Ambience Badge & Night Simulator Status */}
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '14px',
              background: 'rgba(7, 2, 6, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: '#ffffff'
            }}
          >
            <Moon size={13} color="#fbbf24" />
            <span>{currentAmbienceObj.label}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
            <span style={{ color: isLightsOn ? '#10b981' : '#f87171', fontWeight: 700 }}>
              {isLightsOn ? `${brightness}% Luminozitate` : 'Luminițe Oprite'}
            </span>
          </div>

          {/* Diamond Glitter Glint Badge */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'rgba(7, 2, 6, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(251, 191, 36, 0.4)',
              borderRadius: '20px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              color: '#fef08a',
              fontWeight: 800
            }}
          >
            <DiamondIcon size={13} color="#fef08a" />
            <span>REFLEXIE DIAMANT 3D</span>
          </div>
        </div>

        {/* Controls Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Ambience Selector (Day / Twilight / Night) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '8px' }}>
              1. Alege Ambianța Încăperii:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {AMBIENCE_LEVELS.map((amb) => {
                const isSelected = activeAmbience === amb.id;
                return (
                  <button
                    key={amb.id}
                    type="button"
                    onClick={() => setActiveAmbience(amb.id)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '12px',
                      border: isSelected ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(225, 29, 72, 0.22)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? '#ffffff' : '#fda4af',
                      fontSize: '0.78rem',
                      fontWeight: isSelected ? 800 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {amb.id === 'night' ? <Moon size={14} color="#fbbf24" /> : amb.id === 'twilight' ? <Flame size={14} color="#f97316" /> : <Sun size={14} color="#38bdf8" />}
                    <span>{amb.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Lighting Mode Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '8px' }}>
              2. Modul de Iluminare Interactivă:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {LIGHT_MODES.map((mode) => {
                const isSelected = activeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => handleModeChange(mode.id)}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: isSelected ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(225, 29, 72, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? '#ffffff' : '#fecdd3',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#fbcfe8' }}>
                        {mode.label}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#fda4af', marginTop: '2px' }}>
                        {mode.desc}
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 size={16} color="#e11d48" style={{ flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Color Temperature Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '8px' }}>
              3. Nuanța LED & Căldura Luminii:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {LIGHT_COLORS.map((col) => {
                const isSelected = activeColor === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setActiveColor(col.id)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '12px',
                      border: isSelected ? `2px solid ${col.hex}` : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      color: isSelected ? '#ffffff' : '#fbcfe8',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.76rem',
                      fontWeight: isSelected ? 800 : 500
                    }}
                  >
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: col.hex,
                        boxShadow: `0 0 10px ${col.glow}`,
                        border: '1.5px solid #ffffff'
                      }}
                    />
                    <span>{col.name.split(' (')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Brightness Dimmer Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label htmlFor="input-led-dimmer" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fbcfe8' }}>
                4. Intensitate Luminoasă (Dimmer):
              </label>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fbbf24' }}>
                {brightness}%
              </span>
            </div>
            <input
              id="input-led-dimmer"
              type="range"
              min="20"
              max="100"
              step="5"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#e11d48',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Workshop Guarantee Badge */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(225, 29, 72, 0.25)',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.78rem',
              color: '#fda4af'
            }}
          >
            <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0 }} />
            <span>
              Fir de cupru ultrafin camuflat • Baterii de schimb incluse gratuit • Autonomie peste 48h continuu.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
