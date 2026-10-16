import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Zap, Sparkles, Volume2, VolumeX, Check, RotateCcw, 
  Activity, Disc, Sliders, ShieldCheck, Cpu, Play, Pause
} from 'lucide-react';
import { MechatronicRoseIcon, HeartbeatPulseIcon } from './CustomIcons';

export const MECHATRONIC_FINISHES = [
  {
    id: 'silk-gold',
    name: 'Mătase Roșie & Titan Aurit 24K (Clasic Regal)',
    desc: 'Petale din mătase roșie imperială susținute de nervuri din titan aerospațial placat cu aur galben 24K',
    price: 0,
    petalFill: '#b91c1c',
    petalStroke: '#fbbf24',
    coreColor: '#f59e0b',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    accentTag: 'SIGNATURE ATELIER'
  },
  {
    id: 'noir-copper',
    name: 'Noir Titan & Cupru Aurit Rose Gold (Contrast Misterios)',
    desc: 'Petale catifelate din mătase neagră obsidian cu nervuri flexibile din cupru electrolitic placat cu aur roz 18K',
    price: 25,
    petalFill: '#171717',
    petalStroke: '#f43f5e',
    coreColor: '#fb7185',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    accentTag: 'EDITION NOIR'
  },
  {
    id: 'diamond-silver',
    name: 'Cristal Alb Diamant & Argint Rodiat 925 (Puritate Astrală)',
    desc: 'Petale din mătase albă translucidă cu fibră optică integrată și balamale microscopice din argint 925 rodiat',
    price: 35,
    petalFill: '#f4f4f5',
    petalStroke: '#94a3b8',
    coreColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    accentTag: 'DIAMOND TRANSLUCENT'
  }
];

export const PULSE_PRESETS = [
  {
    id: 'rest-68',
    name: 'Puls Cald de Odihnă',
    bpm: 68,
    desc: 'Ritm liniștit, profund și relaxant de 68 bătăi pe minut',
    price: 0,
    badge: 'ARMONIE'
  },
  {
    id: 'emotion-86',
    name: 'Emoție la Prima Întâlnire',
    bpm: 86,
    desc: 'Ritm accelerat de fluturi în stomac și priviri complice',
    price: 10,
    badge: 'EMOȚIE'
  },
  {
    id: 'passion-104',
    name: 'Pasiune Fără Margini',
    bpm: 104,
    desc: 'Bătăi dinamice și viguroase ce exprimă iubire mistuitoare',
    price: 15,
    badge: 'PASIUNE'
  },
  {
    id: 'custom',
    name: 'Puls Personalizat (Live)',
    bpm: 78,
    desc: 'Setează manual BPM-ul exact sau atinge ritmic senzorul',
    price: 19,
    badge: 'PERSONALIZAT'
  }
];

export const PULSE_LIGHTINGS = [
  {
    id: 'ruby-warm',
    name: 'Aura Caldă Rubiniu Pulsatoriu',
    desc: 'Iluminare organică roșie ce pulsează în faza sistolică',
    price: 0,
    color: '#ef4444',
    lightGlow: 'rgba(239, 68, 68, 0.8)'
  },
  {
    id: 'amber-gold',
    name: 'Puls Eteric Aur Chihlimbar',
    desc: 'Lumină caldă de lumânare regală cu reflexii de aur cald',
    price: 15,
    color: '#f59e0b',
    lightGlow: 'rgba(245, 158, 11, 0.85)'
  },
  {
    id: 'stellar-white',
    name: 'Lumină Stea Polară & Fibră Optică',
    desc: 'Reflexii reci de diamant și fibră optică albastră pură',
    price: 20,
    color: '#38bdf8',
    lightGlow: 'rgba(56, 189, 248, 0.85)'
  }
];

export default function MechatronicRoseSimulator({ 
  onApplyConfig, 
  initialData = {}, 
  isEmbedded = false 
}) {
  const [selectedFinish, setSelectedFinish] = useState(initialData.finishId || MECHATRONIC_FINISHES[0].id);
  const [selectedPreset, setSelectedPreset] = useState(initialData.presetId || PULSE_PRESETS[0].id);
  const [customBpm, setCustomBpm] = useState(initialData.bpm || 68);
  const [selectedLighting, setSelectedLighting] = useState(initialData.lightingId || PULSE_LIGHTINGS[0].id);
  const [sensorDedication, setSensorDedication] = useState(initialData.sensorDedication || 'Inima mea bate doar pentru tine');
  const [senderName, setSenderName] = useState(initialData.senderName || 'Al tău pentru totdeauna');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isMeasuringLive, setIsMeasuringLive] = useState(false);
  const [liveTapTimes, setLiveTapTimes] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const canvasRef = useRef(null);
  const ecgCanvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const lastBeatTimeRef = useRef(0);
  const phaseRef = useRef(0);

  const currentFinish = MECHATRONIC_FINISHES.find(f => f.id === selectedFinish) || MECHATRONIC_FINISHES[0];
  const currentPreset = PULSE_PRESETS.find(p => p.id === selectedPreset) || PULSE_PRESETS[0];
  const currentLighting = PULSE_LIGHTINGS.find(l => l.id === selectedLighting) || PULSE_LIGHTINGS[0];

  const effectiveBpm = selectedPreset === 'custom' ? customBpm : currentPreset.bpm;

  // Calculate Total Dynamic Price
  const totalPrice = 95 + currentFinish.price + currentPreset.price + currentLighting.price;

  // Web Audio API Heartbeat Synthesizer
  const playHeartbeatAudio = (isSystolic = true) => {
    if (!isSoundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. Organic Heartbeat Oscillation ("lub-dub")
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Lower frequency for deeper thump
      const baseFreq = isSystolic ? 54 : 70;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + (isSystolic ? 0.12 : 0.08));

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(isSystolic ? 0.35 : 0.22, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (isSystolic ? 0.14 : 0.09));

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + (isSystolic ? 0.15 : 0.1));

      // 2. Micro-motor whispering gear sound (high-tech Swiss stepper whir)
      if (isSystolic) {
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.12;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const motorFilter = ctx.createBiquadFilter();
        motorFilter.type = 'bandpass';
        motorFilter.frequency.setValueAtTime(420, now);
        motorFilter.Q.setValueAtTime(4.0, now);

        const motorGain = ctx.createGain();
        motorGain.gain.setValueAtTime(0.001, now);
        motorGain.gain.linearRampToValueAtTime(0.03, now + 0.02);
        motorGain.gain.linearRampToValueAtTime(0.001, now + 0.06);

        whiteNoise.connect(motorFilter);
        motorFilter.connect(motorGain);
        motorGain.connect(ctx.destination);

        whiteNoise.start(now);
      }
    } catch (e) {
      // Audio playback safely handled
    }
  };

  // Live Tap Beat Measurement Handler
  const handleSensorTap = () => {
    const now = Date.now();
    const newTaps = [...liveTapTimes, now].filter(t => now - t < 4000);
    setLiveTapTimes(newTaps);

    if (newTaps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.min(130, Math.max(50, Math.round(60000 / avgInterval)));
      setSelectedPreset('custom');
      setCustomBpm(calculatedBpm);
    }

    playHeartbeatAudio(true);
  };

  // Main Canvas: Motorized Flower Kinetic Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let lastTimestamp = performance.now();
    let timeAccumulator = 0;

    // Stardust floating spark particles around flower
    const sparkParticles = [];
    for (let i = 0; i < 30; i++) {
      sparkParticles.push({
        x: (Math.random() - 0.5) * 320,
        y: (Math.random() - 0.5) * 300,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random()
      });
    }

    const render = (now) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (!isPaused) {
        timeAccumulator += delta;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2 - 10;

      // Dark futuristic jewel background
      const bg = ctx.createRadialGradient(cx, cy, 30, cx, cy, w * 0.7);
      bg.addColorStop(0, '#1a0614');
      bg.addColorStop(0.5, '#0d020a');
      bg.addColorStop(1, '#050104');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Period in seconds per heart beat
      const beatPeriod = 60 / effectiveBpm;
      const beatPhase = (timeAccumulator % beatPeriod) / beatPeriod; // 0 to 1

      // Double-pulse systolic curve (P1 at 0.05, P2 at 0.28)
      let pulseAmp = 0;
      if (beatPhase < 0.18) {
        // First main ventricular contraction (Systole)
        pulseAmp = Math.sin((beatPhase / 0.18) * Math.PI);
      } else if (beatPhase >= 0.22 && beatPhase < 0.38) {
        // Second dicrotic rebound (Diastole)
        pulseAmp = Math.sin(((beatPhase - 0.22) / 0.16) * Math.PI) * 0.55;
      }

      // Audio trigger on phase starts
      if (beatPhase < 0.05 && now - lastBeatTimeRef.current > beatPeriod * 800) {
        playHeartbeatAudio(true);
        lastBeatTimeRef.current = now;
      } else if (beatPhase >= 0.22 && beatPhase < 0.26 && now - lastBeatTimeRef.current > 150) {
        playHeartbeatAudio(false);
      }

      // 1. Draw glowing bio-pulse aura behind flower
      const auraRad = 80 + pulseAmp * 65;
      const auraGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, auraRad);
      auraGrad.addColorStop(0, currentLighting.lightGlow);
      auraGrad.addColorStop(0.5, currentFinish.glowColor);
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, auraRad, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Mechanical Titanium Stem & Wire Loom
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, cy + 30);
      ctx.lineTo(cx, h - 25);
      ctx.stroke();

      // Golden micro-circuits along stem
      ctx.strokeStyle = currentFinish.petalStroke;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx - 3, cy + 35);
      ctx.lineTo(cx - 3, h - 30);
      ctx.moveTo(cx + 3, cy + 35);
      ctx.lineTo(cx + 3, h - 30);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Stardust particles floating in ambient air
      sparkParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -w / 2) p.x = w / 2;
        if (p.x > w / 2) p.x = -w / 2;
        if (p.y < -h / 2) p.y = h / 2;
        if (p.y > h / 2) p.y = -h / 2;

        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + pulseAmp * 0.5})`;
        ctx.beginPath();
        ctx.arc(cx + p.x, cy + p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. KINETIC PETAL LAYERS (Motorized opening & closing)
      // Bloom expansion: base angle 0.35 rad (bud) up to 0.75 rad (bloomed beat)
      const bloomAngle = 0.32 + pulseAmp * 0.38;

      // Outer Layer: 10 articulated structural petals
      const outerCount = 10;
      for (let i = 0; i < outerCount; i++) {
        const angle = (i * 2 * Math.PI) / outerCount + (timeAccumulator * 0.05);
        drawKineticPetal(ctx, cx, cy, angle, 90, bloomAngle * 1.05, currentFinish, 0.45, pulseAmp, currentLighting.color);
      }

      // Middle Layer: 8 articulated silk petals
      const midCount = 8;
      for (let i = 0; i < midCount; i++) {
        const angle = (i * 2 * Math.PI) / midCount - (timeAccumulator * 0.03) + 0.3;
        drawKineticPetal(ctx, cx, cy, angle, 68, bloomAngle * 0.85, currentFinish, 0.75, pulseAmp, currentLighting.color);
      }

      // Inner Layer: 6 delicate inner petals
      const innerCount = 6;
      for (let i = 0; i < innerCount; i++) {
        const angle = (i * 2 * Math.PI) / innerCount + (timeAccumulator * 0.08) + 0.6;
        drawKineticPetal(ctx, cx, cy, angle, 44, bloomAngle * 0.65, currentFinish, 1.0, pulseAmp, currentLighting.color);
      }

      // 5. Central Mechatronic Micro-Gear & Stamen Heart
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(timeAccumulator * 0.4);

      // Brass/Titanium Gear Rotor
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = currentFinish.petalStroke;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Gear teeth
      for (let g = 0; g < 12; g++) {
        const ga = (g * Math.PI) / 6;
        ctx.fillStyle = currentFinish.petalStroke;
        ctx.fillRect(Math.cos(ga) * 16 - 2, Math.sin(ga) * 16 - 2, 4, 4);
      }

      // Center Pulsing Bio-Core LED
      ctx.fillStyle = currentLighting.color;
      ctx.shadowColor = currentLighting.color;
      ctx.shadowBlur = 15 + pulseAmp * 25;
      ctx.beginPath();
      ctx.arc(0, 0, 9 + pulseAmp * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 6. Tactile Sensor Base at Bottom
      const baseGrad = ctx.createLinearGradient(cx - 90, h - 30, cx + 90, h - 5);
      baseGrad.addColorStop(0, '#1e293b');
      baseGrad.addColorStop(0.5, '#334155');
      baseGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = baseGrad;
      ctx.strokeStyle = currentFinish.petalStroke;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx - 90, h - 32, 180, 26, 8);
      ctx.fill();
      ctx.stroke();

      // Engraved Laser Text on Base
      ctx.font = 'bold 9px Cinzel, serif';
      ctx.fillStyle = '#fef08a';
      ctx.textAlign = 'center';
      ctx.fillText(`• BIO-PULSE SENSOR • ${effectiveBpm} BPM •`, cx, h - 16);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [selectedFinish, effectiveBpm, selectedLighting, isPaused]);

  // Secondary Canvas: Live ECG Heartbeat Oscilloscope Waveform
  useEffect(() => {
    const canvas = ecgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let offset = 0;

    const renderEcg = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      // Dark grid background
      ctx.fillStyle = 'rgba(10, 4, 12, 0.9)';
      ctx.fillRect(0, 0, w, h);

      // Oscilloscope grid lines
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Generate ECG waveform points
      ctx.strokeStyle = currentLighting.color;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = currentLighting.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const wavelength = (60 / effectiveBpm) * 90; // Pixels per beat cycle
      offset = (offset + 1.4) % wavelength;

      for (let x = 0; x < w; x++) {
        const cyclePos = ((x + offset) % wavelength) / wavelength;
        let yVal = midY;

        // P-Q-R-S-T cardiac wave pattern
        if (cyclePos >= 0.15 && cyclePos < 0.22) {
          // P wave (atrial depolarization)
          yVal -= Math.sin(((cyclePos - 0.15) / 0.07) * Math.PI) * 6;
        } else if (cyclePos >= 0.25 && cyclePos < 0.28) {
          // Q dip
          yVal += 4;
        } else if (cyclePos >= 0.28 && cyclePos < 0.33) {
          // R peak (ventricular systole)
          const rFrac = (cyclePos - 0.28) / 0.05;
          yVal -= Math.sin(rFrac * Math.PI) * 26;
        } else if (cyclePos >= 0.33 && cyclePos < 0.36) {
          // S dip
          yVal += 8;
        } else if (cyclePos >= 0.44 && cyclePos < 0.56) {
          // T wave (ventricular repolarization)
          yVal -= Math.sin(((cyclePos - 0.44) / 0.12) * Math.PI) * 9;
        }

        if (x === 0) {
          ctx.moveTo(x, yVal);
        } else {
          ctx.lineTo(x, yVal);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(renderEcg);
    };

    animId = requestAnimationFrame(renderEcg);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [effectiveBpm, selectedLighting]);

  // Helper: Draw Kinetic Motorized Petal with golden veins and flexure hinge
  const drawKineticPetal = (ctx, cx, cy, angle, radius, spread, finish, opacity, pulseAmp, lightColor) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    // Tip position with dynamic spread angle
    const tipX = radius * (1 + pulseAmp * 0.15);
    const tipY = Math.sin(spread) * radius * 0.5;

    // Petal Silk/Metal Body
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(radius * 0.3, -radius * 0.45 * spread, radius * 0.7, -radius * 0.35 * spread, tipX, tipY);
    ctx.bezierCurveTo(radius * 0.7, radius * 0.35 * spread, radius * 0.3, radius * 0.45 * spread, 0, 0);

    const grad = ctx.createRadialGradient(0, 0, 5, radius * 0.6, 0, radius);
    grad.addColorStop(0, finish.coreColor);
    grad.addColorStop(0.6, finish.petalFill);
    grad.addColorStop(1, '#050104');
    ctx.fillStyle = grad;
    ctx.globalAlpha = opacity;
    ctx.fill();

    // Titanium Structural Rib / Flexure Hinge
    ctx.strokeStyle = finish.petalStroke;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Central Golden Electronic Nerve Line
    ctx.strokeStyle = finish.petalStroke;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(tipX * 0.9, tipY * 0.8);
    ctx.stroke();

    // Micro LED Node at Petal Tip
    ctx.fillStyle = lightColor;
    ctx.beginPath();
    ctx.arc(tipX, tipY, 1.2 + pulseAmp * 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const handleApply = () => {
    const configData = {
      finishId: selectedFinish,
      finishName: currentFinish.name,
      presetId: selectedPreset,
      presetName: currentPreset.name,
      bpm: effectiveBpm,
      lightingId: selectedLighting,
      lightingName: currentLighting.name,
      sensorDedication: sensorDedication.trim() || 'Inima mea bate doar pentru tine',
      senderName: senderName.trim() || 'Al tău pentru totdeauna',
      totalPrice: totalPrice
    };

    try {
      localStorage.setItem('stardust_mechatronic_rose', JSON.stringify(configData));
    } catch (e) {
      // storage quota handled
    }

    if (onApplyConfig) {
      onApplyConfig(configData);
    }
  };

  return (
    <div style={{
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Top Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(225, 29, 72, 0.1))',
            border: '1px solid rgba(244, 63, 94, 0.45)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#fda4af',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            <MechatronicRoseIcon size={14} color="#f43f5e" />
            <span>ARTĂ CINETICĂ MECATRONICĂ • BIO-SINCRONIZARE CARDIACĂ</span>
          </div>

          <h3 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: isEmbedded ? '1.25rem' : '1.5rem',
            color: '#fff',
            marginTop: '8px',
            marginBottom: '4px',
            fontWeight: 800
          }}>
            Trandafir Mecatronic cu Petale Motorizate & Senzor de Puls
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0, maxWidth: '640px' }}>
            O floare cinetică din mătase și titan flexibil mecatronic ascunsă în centrul aranjamentului: când destinatarul atinge senzorul tactil de pe soclu, petalele motorizate se deschid și se închid hipnotic în ritmul exact al bătăilor inimii tale.
          </p>
        </div>

        {/* Audio Toggle & Pause Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            id="btn-toggle-heartbeat-pause"
            onClick={() => setIsPaused(!isPaused)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title={isPaused ? 'Reia animația' : 'Pauză'}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            <span>{isPaused ? 'Reia' : 'Pauză'}</span>
          </button>

          <button
            type="button"
            id="btn-toggle-heartbeat-audio"
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            style={{
              background: isSoundEnabled ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: isSoundEnabled ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.2)',
              color: isSoundEnabled ? '#fda4af' : 'rgba(255, 255, 255, 0.5)',
              borderRadius: '12px',
              padding: '8px 14px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap !important'
            }}
            title={isSoundEnabled ? 'Dezactivează sunetul inimii' : 'Activează sunetul inimii'}
          >
            {isSoundEnabled ? <Volume2 size={15} color="#fda4af" /> : <VolumeX size={15} color="rgba(255,255,255,0.5)" />}
            <span>{isSoundEnabled ? 'Bătăi Cardiace Active' : 'Sunet Oprit'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Kinetic Canvas on Left, Controls on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isEmbedded ? '1fr' : 'minmax(320px, 460px) 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Canvas Kinetic Visualizer & ECG Waveform */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.55)',
          borderRadius: '20px',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Main Kinetic Flower Canvas */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '460px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: `0 0 28px rgba(244, 63, 94, 0.25)`
          }}>
            <canvas
              ref={canvasRef}
              width={460}
              height={360}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '16px'
              }}
            />

            {/* Kinetic State Badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #f43f5e',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#fda4af',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <HeartbeatPulseIcon size={13} color="#f43f5e" />
              <span>SINCRONIZARE: {effectiveBpm} BPM</span>
            </div>

            {/* Finish Badge Top-Right */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: currentFinish.petalStroke
            }}>
              {currentFinish.accentTag}
            </div>
          </div>

          {/* Real-Time ECG Heartbeat Oscilloscope */}
          <div style={{
            width: '100%',
            marginTop: '14px',
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            padding: '10px 12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#fbcfe8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={12} color="#f43f5e" />
                <span>OSCILOSCOP ECG BIO-CARDIAC:</span>
              </span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                Frecvență cardiacă: {effectiveBpm} BPM
              </span>
            </div>

            <canvas
              ref={ecgCanvasRef}
              width={420}
              height={60}
              style={{
                width: '100%',
                height: '50px',
                display: 'block',
                borderRadius: '8px'
              }}
            />
          </div>

          {/* Interactive Live Tap Sensor Button */}
          <div style={{ width: '100%', marginTop: '12px' }}>
            <button
              type="button"
              id="btn-live-pulse-touch-sensor"
              onClick={handleSensorTap}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '14px',
                border: '1.5px dashed #f43f5e',
                background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(159, 18, 57, 0.25))',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap !important'
              }}
            >
              <Heart size={16} color="#fda4af" />
              <span>Apasă Ritmice Senzorul (Măsoară Pulsul Tău Live)</span>
            </button>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)', textAlign: 'center', display: 'block', marginTop: '4px' }}>
              Apasă de 3-4 ori în ritmul inimii tale pentru a sincroniza automat frecvența trandafirului
            </span>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Finisaje Mecatronice de Lux */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#fbcfe8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '10px'
            }}>
              1. Finisaj Mecatronic & Materiale Nobile:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {MECHATRONIC_FINISHES.map(f => {
                const isSelected = selectedFinish === f.id;
                return (
                  <div
                    key={f.id}
                    id={`opt-mechatronic-finish-${f.id}`}
                    onClick={() => {
                      setSelectedFinish(f.id);
                      playHeartbeatAudio(true);
                    }}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '2px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: f.petalFill,
                          border: `1.5px solid ${f.petalStroke}`,
                          boxShadow: `0 0 6px ${f.glowColor}`
                        }} />
                        <span style={{ fontWeight: 800, fontSize: '0.88rem', color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.9)' }}>
                          {f.name.split('(')[0]}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: f.price === 0 ? '#10b981' : '#f59e0b'
                      }}>
                        {f.price === 0 ? 'Inclus' : `+${f.price} RON`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.35 }}>
                      {f.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Ritm Cardiac & Sincronizare BPM */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#fbcfe8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '10px'
            }}>
              2. Frecvență Cardiacă & Sincronizare Emoțională:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
              {PULSE_PRESETS.map(p => {
                const isSelected = selectedPreset === p.id;
                return (
                  <div
                    key={p.id}
                    id={`opt-pulse-preset-${p.id}`}
                    onClick={() => {
                      setSelectedPreset(p.id);
                      if (p.id !== 'custom') setCustomBpm(p.bpm);
                      playHeartbeatAudio(true);
                    }}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '2px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#fff' }}>
                        {p.name}
                      </span>
                      <span style={{
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        color: p.price === 0 ? '#10b981' : '#f59e0b'
                      }}>
                        {p.price === 0 ? 'Inclus' : `+${p.price} RON`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.3 }}>
                      {p.desc}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Slider for fine-tuning */}
            {selectedPreset === 'custom' && (
              <div style={{
                marginTop: '12px',
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                borderRadius: '12px',
                padding: '12px 16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fda4af' }}>
                    Calibrare Fină Ritm Cardiac:
                  </span>
                  <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1rem', color: '#fbcfe8' }}>
                    {customBpm} BPM
                  </span>
                </div>
                <input
                  type="range"
                  id="range-custom-bpm"
                  min={50}
                  max={130}
                  step={1}
                  value={customBpm}
                  onChange={(e) => setCustomBpm(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>
                  <span>50 BPM (Zen)</span>
                  <span>75 BPM (Echilibru)</span>
                  <span>100 BPM (Pasiune)</span>
                  <span>130 BPM (Fior)</span>
                </div>
              </div>
            )}
          </div>

          {/* 3. Iluminare Cardiacă Perimetrală */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#fbcfe8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '10px'
            }}>
              3. Aura de Iluminare Cardiacă:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
              {PULSE_LIGHTINGS.map(l => {
                const isSelected = selectedLighting === l.id;
                return (
                  <div
                    key={l.id}
                    id={`opt-pulse-lighting-${l.id}`}
                    onClick={() => {
                      setSelectedLighting(l.id);
                      playHeartbeatAudio(true);
                    }}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '2px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: l.color,
                          boxShadow: `0 0 8px ${l.color}`
                        }} />
                        <span style={{ fontWeight: 800, fontSize: '0.84rem', color: '#fff' }}>
                          {l.name}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: l.price === 0 ? '#10b981' : '#f59e0b'
                      }}>
                        {l.price === 0 ? 'Inclus' : `+${l.price} RON`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                      {l.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Gravură Laser pe Soclul Senzorului Tactil */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#fbcfe8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '10px'
            }}>
              4. Gravură Laser pe Soclul Senzorului Tactil:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '4px' }}>
                  Mesaj Secret Gravat (max 45 caractere):
                </span>
                <input
                  type="text"
                  id="input-sensor-dedication"
                  value={sensorDedication}
                  maxLength={45}
                  onChange={(e) => setSensorDedication(e.target.value)}
                  placeholder="Inima mea bate doar pentru tine"
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '0.84rem'
                  }}
                />
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '4px' }}>
                  Semnătură Expeditor / Inițiale:
                </span>
                <input
                  type="text"
                  id="input-sensor-sender-name"
                  value={senderName}
                  maxLength={30}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Al tău pentru totdeauna"
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '0.84rem'
                  }}
                />
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#fde68a', marginTop: '6px', display: 'block', fontStyle: 'italic' }}>
              • Soclul conține micro-senzorul capacitiv: la atingere luminează și activează pulsul înregistrat.
            </span>
          </div>

          {/* Price Summary & Apply Button */}
          <div style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(244, 63, 94, 0.25) 0%, rgba(0, 0, 0, 0.6) 100%)',
            border: '1.5px solid rgba(244, 63, 94, 0.45)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: '0.74rem', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                TOTAL TRANDAFIR MECATRONIC BIO-CARDIAC:
              </span>
              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.4rem', color: '#fbcfe8', marginTop: '2px' }}>
                +{totalPrice} RON
              </div>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                {currentFinish.name.split('(')[0]} • {effectiveBpm} BPM • Senzor Tactil Inclus
              </span>
            </div>

            <button
              type="button"
              id="btn-apply-mechatronic-rose-config"
              onClick={handleApply}
              className="btn btn-gold"
              style={{
                padding: '12px 24px',
                fontSize: '0.9rem',
                fontWeight: 800,
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                whiteSpace: 'nowrap !important',
                boxShadow: '0 4px 18px rgba(244, 63, 94, 0.4)'
              }}
            >
              <Check size={16} />
              <span>Configurează Trandafirul (+{totalPrice} RON)</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
