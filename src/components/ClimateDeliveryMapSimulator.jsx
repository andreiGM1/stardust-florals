import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, ShieldCheck, 
  MapPin, Clock, Phone, Send, CheckCircle2, Navigation,
  Activity, Wind, AlertCircle, Compass, Zap
} from 'lucide-react';
import { 
  ClimateVanIcon, ThermometerGaugeIcon, GpsRoutePinIcon, 
  SparkleIcon, RoseIcon, DiamondIcon 
} from './CustomIcons';

// Web Audio API Luxury Chime
function playLuxuryChime(frequency = 880) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  } catch {
    // Audio context may be restricted by browser policy before first interaction
  }
}

const ROUTES = [
  {
    id: 'bucuresti-express',
    name: 'București Express (Centru → Nord)',
    description: 'Tranzit prioritar în 2-4 ore • Flotă proprie dedicată',
    durationMinutes: 120,
    distanceKm: '8.7 km',
    waypoints: [
      { id: 1, name: 'Atelierul Central Stardust (Calea Victoriei)', x: 90, y: 310, status: 'Ambalare & Sigilare Termică', temp: 18.0, eta: '09:30' },
      { id: 2, name: 'Punct Verificare Piața Romană & Magheru', x: 210, y: 250, status: 'Verificare Senzor Climatizare 18.1°C', temp: 18.1, eta: '09:55' },
      { id: 3, name: 'Tranzit Calea Dorobanți & Floreasca', x: 340, y: 190, status: 'Senzor Anti-Șoc Stabil (0.02G)', temp: 17.9, eta: '10:25' },
      { id: 4, name: 'Bulevardul Aviatorilor / Arcul de Triumf', x: 470, y: 130, status: 'Curier în apropiere (5-10 min)', temp: 18.0, eta: '10:45' },
      { id: 5, name: 'Adresa Destinatarului (Zona Herăstrău)', x: 590, y: 80, status: 'Înmânare Festivă cu Mănuși Albe', temp: 18.2, eta: '11:00' }
    ]
  },
  {
    id: 'ilfov-vip',
    name: 'Ilfov VIP (Băneasa → Pipera → Otopeni)',
    description: 'Tranzit suburban în mașină izotermă 18°C',
    durationMinutes: 180,
    distanceKm: '16.4 km',
    waypoints: [
      { id: 1, name: 'Atelierul Central Stardust', x: 90, y: 310, status: 'Plecare din Atelier', temp: 18.0, eta: '11:00' },
      { id: 2, name: 'Șoseaua Kiseleff & Piața Presei', x: 230, y: 210, status: 'Răcire Compartiment Activat', temp: 17.8, eta: '11:35' },
      { id: 3, name: 'Bulevardul Pipera & Zonă Rezidențială', x: 380, y: 160, status: 'Fixare Verticală Fără Răsturnare', temp: 18.1, eta: '12:10' },
      { id: 4, name: 'Otopeni / Domeniul Rezidențial', x: 580, y: 95, status: 'Livrare Confirmată', temp: 18.0, eta: '12:45' }
    ]
  },
  {
    id: 'national-secure',
    name: 'Transport Național (Rută Izotermă 24h)',
    description: 'Cutie termo-izolantă anti-șoc cu indicator de temperatură',
    durationMinutes: 1440,
    distanceKm: '380 km',
    waypoints: [
      { id: 1, name: 'Centrul Logistic Specializat Stardust', x: 90, y: 310, status: 'Sigilare Cutie Rigidă Polimer', temp: 17.9, eta: 'Ziua 1 • 17:00' },
      { id: 2, name: 'Punct Tranzit Ploiești / Valea Prahovei', x: 260, y: 220, status: 'Monitorizare Temperatură Constantă', temp: 18.2, eta: 'Ziua 1 • 20:30' },
      { id: 3, name: 'Hub Logistic Regional Brașov / Cluj', x: 440, y: 150, status: 'Pregătire pentru Livrare Finală', temp: 18.0, eta: 'Ziua 2 • 07:15' },
      { id: 4, name: 'Reședință Destinatar', x: 590, y: 80, status: 'Desigilare Festivă de Către Destinatar', temp: 18.1, eta: 'Ziua 2 • 10:30' }
    ]
  }
];

export default function ClimateDeliveryMapSimulator({
  embedded = false,
  orderId = 'ST-9482',
  recipientName = 'Ioana Popescu',
  recipientAddress = 'București, Sector 1, Calea Victoriei 122'
}) {
  const [selectedRouteId, setSelectedRouteId] = useState('bucuresti-express');
  const [progress, setProgress] = useState(65); // 0 to 100 percentage
  const [isPlaying, setIsPlaying] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(1); // 1x, 2x, 4x
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeWaypointIdx, setActiveWaypointIdx] = useState(3);
  const [lastChimeWaypoint, setLastChimeWaypoint] = useState(-1);

  // Micro temperature and G-force oscillation for hyper-realistic telemetry
  const [telemetry, setTelemetry] = useState({
    temperature: 18.1,
    humidity: 62,
    gForce: 0.02,
    speedKmh: 34,
    airQuality: 'Filtrare HEPA Activă'
  });

  const activeRoute = ROUTES.find((r) => r.id === selectedRouteId) || ROUTES[0];
  const waypoints = activeRoute.waypoints;

  // Animation Loop for Simulator
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.35 * simulationSpeed;
        if (next >= 100) {
          return 0; // loop back for continuous interactive exploration
        }
        return next;
      });

      // Realistic sensor micro-jitter
      setTelemetry((prev) => ({
        ...prev,
        temperature: +(18.0 + (Math.sin(Date.now() / 3000) * 0.18)).toFixed(1),
        humidity: Math.floor(61 + Math.sin(Date.now() / 4500) * 2),
        gForce: +(0.01 + Math.abs(Math.sin(Date.now() / 1500) * 0.03)).toFixed(2),
        speedKmh: Math.floor(32 + Math.abs(Math.sin(Date.now() / 2000) * 8))
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed]);

  // Determine current waypoint index based on progress
  useEffect(() => {
    const totalWp = waypoints.length;
    const segmentSize = 100 / (totalWp - 1);
    const currentIdx = Math.min(Math.floor(progress / segmentSize), totalWp - 1);
    
    setActiveWaypointIdx(currentIdx);

    // Audio chime on passing new waypoint
    if (currentIdx !== lastChimeWaypoint) {
      if (soundEnabled && currentIdx > lastChimeWaypoint && lastChimeWaypoint !== -1) {
        playLuxuryChime(800 + currentIdx * 60);
      }
      setLastChimeWaypoint(currentIdx);
    }
  }, [progress, waypoints, soundEnabled, lastChimeWaypoint]);

  // Calculate Van position (Interpolation between waypoints)
  const calculateVanPosition = () => {
    const totalSegments = waypoints.length - 1;
    const segmentLength = 100 / totalSegments;
    const segmentIdx = Math.min(Math.floor(progress / segmentLength), totalSegments - 1);
    const segmentProgress = (progress - segmentIdx * segmentLength) / segmentLength;

    const startWp = waypoints[segmentIdx];
    const endWp = waypoints[segmentIdx + 1] || startWp;

    const currentX = startWp.x + (endWp.x - startWp.x) * segmentProgress;
    const currentY = startWp.y + (endWp.y - startWp.y) * segmentProgress;

    // Angle of motion
    const angleRad = Math.atan2(endWp.y - startWp.y, endWp.x - startWp.x);
    const angleDeg = (angleRad * 180) / Math.PI;

    return { x: currentX, y: currentY, angle: angleDeg };
  };

  const vanPos = calculateVanPosition();

  // Jump to specific waypoint
  const handleWaypointClick = (idx) => {
    const totalSegments = waypoints.length - 1;
    const targetProgress = (idx / totalSegments) * 100;
    setProgress(targetProgress);
    if (soundEnabled) playLuxuryChime(900);
  };

  // Generate SVG path string through all waypoints
  const routePathD = waypoints.reduce((acc, wp, idx) => {
    return idx === 0 ? `M ${wp.x} ${wp.y}` : `${acc} L ${wp.x} ${wp.y}`;
  }, '');

  return (
    <div 
      className="climate-delivery-simulator"
      style={{
        background: 'linear-gradient(145deg, #12040d 0%, #080106 100%)',
        border: '1.5px solid rgba(225, 29, 72, 0.35)',
        borderRadius: '26px',
        padding: embedded ? '22px' : '32px',
        color: '#ffffff',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(225, 29, 72, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative ambient background glows */}
      <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(225, 29, 72, 0.18), transparent 70%)', pointerEvents: 'none' }} />

      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.74rem', color: '#7dd3fc', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            <ThermometerGaugeIcon size={14} color="#38bdf8" />
            <span>FLOTĂ FRIGORIFICĂ VIP • CONSTANT 18°C</span>
          </div>
          <h3 style={{ fontSize: embedded ? '1.3rem' : '1.65rem', margin: '0 0 4px', fontFamily: 'Cinzel, Georgia, serif', color: '#ffffff' }}>
            Simulator Traseu Livrare Climatizată în Timp Real
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.86rem', margin: 0 }}>
            Urmărește telemetria senzorilor și poziția vehiculului securizat între atelier și destinatar.
          </p>
        </div>

        {/* Route Selector Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {ROUTES.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => {
                  setSelectedRouteId(route.id);
                  setProgress(40);
                  if (soundEnabled) playLuxuryChime(750);
                }}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'rgba(255, 255, 255, 0.06)',
                  border: isSelected ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '7px 14px',
                  color: isSelected ? '#ffffff' : '#fbcfe8',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(225, 29, 72, 0.35)' : 'none'
                }}
              >
                {route.name.split(' (')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive Map (Left) + Telemetry & Controls (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: embedded ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
        
        {/* Left: Futuristic SVG Satellite/Radar Vector Map */}
        <div style={{
          background: 'radial-gradient(circle at 50% 50%, #160814 0%, #0d020a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '16px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Top Map HUD Overlay */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '5px 10px', fontSize: '0.72rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', display: 'inline-block' }} />
              <span style={{ color: '#e2e8f0', fontWeight: 700 }}>GPS Telemetrie: LIVE (Transmisie 100ms)</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '5px 10px', fontSize: '0.72rem', color: '#fbcfe8' }}>
              <Navigation size={12} color="#e11d48" />
              <span>{activeRoute.distanceKm} • {Math.round(progress)}% din traseu parcurs</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div style={{ position: 'relative', width: '100%', height: '240px', margin: '10px 0' }}>
            <svg 
              viewBox="0 0 700 380" 
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              {/* City Grid Road Grid Background */}
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                </pattern>
                <linearGradient id="route-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <rect width="700" height="380" fill="url(#grid-pattern)" />

              {/* Decorative City Landmarks / Sector zones */}
              <circle cx="150" cy="180" r="60" fill="rgba(225, 29, 72, 0.03)" stroke="rgba(225, 29, 72, 0.1)" strokeDasharray="3 3" />
              <text x="150" y="185" fill="rgba(255, 255, 255, 0.15)" fontSize="10" textAnchor="middle" fontFamily="sans-serif">SECTOR 1 / CENTRU</text>

              <circle cx="500" cy="150" r="70" fill="rgba(56, 189, 248, 0.03)" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="3 3" />
              <text x="500" y="155" fill="rgba(255, 255, 255, 0.15)" fontSize="10" textAnchor="middle" fontFamily="sans-serif">ZONA NORD / HERĂSTRĂU</text>

              {/* Main Glowing Route Path */}
              <path 
                d={routePathD} 
                fill="none" 
                stroke="rgba(225, 29, 72, 0.2)" 
                strokeWidth="10" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d={routePathD} 
                fill="none" 
                stroke="url(#route-gradient)" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                filter="url(#glow)"
              />
              <path 
                d={routePathD} 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1" 
                strokeDasharray="6 6" 
                strokeLinecap="round" 
              />

              {/* Waypoint Markers */}
              {waypoints.map((wp, idx) => {
                const isPassed = idx <= activeWaypointIdx;
                const isCurrent = idx === activeWaypointIdx;

                return (
                  <g 
                    key={wp.id} 
                    onClick={() => handleWaypointClick(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Ripple ring for active waypoint */}
                    {isCurrent && (
                      <circle 
                        cx={wp.x} 
                        cy={wp.y} 
                        r="18" 
                        fill="none" 
                        stroke="#38bdf8" 
                        strokeWidth="1.5" 
                        opacity="0.7"
                      />
                    )}
                    
                    {/* Node circle */}
                    <circle 
                      cx={wp.x} 
                      cy={wp.y} 
                      r={isCurrent ? "10" : "7"} 
                      fill={isPassed ? (isCurrent ? '#38bdf8' : '#e11d48') : '#1e101c'} 
                      stroke="#ffffff" 
                      strokeWidth="2" 
                    />

                    {/* Step number */}
                    <text 
                      x={wp.x} 
                      y={wp.y + 3.5} 
                      fill="#ffffff" 
                      fontSize="9" 
                      fontWeight="bold" 
                      textAnchor="middle"
                    >
                      {idx + 1}
                    </text>

                    {/* Waypoint label */}
                    <text 
                      x={wp.x} 
                      y={wp.y + 24} 
                      fill={isCurrent ? '#38bdf8' : isPassed ? '#fbcfe8' : '#94a3b8'} 
                      fontSize="10" 
                      fontWeight={isCurrent ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {wp.name.split(' (')[0]}
                    </text>
                  </g>
                );
              })}

              {/* Animated Van Vehicle Marker */}
              <g 
                transform={`translate(${vanPos.x}, ${vanPos.y}) rotate(${vanPos.angle})`}
                filter="url(#glow)"
              >
                {/* Radar pulse around vehicle */}
                <circle cx="0" cy="0" r="22" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                
                {/* Vehicle background card */}
                <rect x="-16" y="-12" width="32" height="24" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                
                {/* Van mini graphic */}
                <circle cx="-7" cy="8" r="3" fill="#38bdf8" />
                <circle cx="7" cy="8" r="3" fill="#38bdf8" />
                <rect x="-12" y="-8" width="16" height="12" rx="2" fill="#e11d48" />
                <rect x="5" y="-6" width="6" height="8" rx="1" fill="#38bdf8" />
                
                {/* Snowflake cooling badge on vehicle roof */}
                <circle cx="-4" cy="-4" r="1.5" fill="#ffffff" />
              </g>
            </svg>
          </div>

          {/* Bottom Interactive Simulation Controller Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', background: 'rgba(0, 0, 0, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '8px 14px', zIndex: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                id="btn-simulator-play-toggle"
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  background: isPlaying ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #10b981, #059669)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                <span>{isPlaying ? 'Pauză Cursă' : 'Pornire Cursă'}</span>
              </button>

              <button
                type="button"
                id="btn-simulator-reset"
                onClick={() => {
                  setProgress(0);
                  if (soundEnabled) playLuxuryChime(600);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#cbd5e1',
                  borderRadius: '10px',
                  padding: '6px 10px',
                  fontSize: '0.76rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                title="Resetează cursa de la atelier"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>

            {/* Speed Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Viteză:</span>
              {[1, 2, 4].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setSimulationSpeed(spd)}
                  style={{
                    background: simulationSpeed === spd ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: simulationSpeed === spd ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: simulationSpeed === spd ? '#38bdf8' : '#94a3b8',
                    borderRadius: '8px',
                    padding: '3px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {spd}x
                </button>
              ))}

              {/* Sound Toggle */}
              <button
                type="button"
                id="btn-simulator-audio-toggle"
                onClick={() => setSoundEnabled(!soundEnabled)}
                style={{
                  background: soundEnabled ? 'rgba(225, 29, 72, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: soundEnabled ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: soundEnabled ? '#fda4af' : '#64748b',
                  borderRadius: '8px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  marginLeft: '4px'
                }}
                title={soundEnabled ? 'Dezactivează sunetul de lux la etape' : 'Activează sunetul de lux la etape'}
              >
                {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry Dashboard & Active Waypoint Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Real-time Telemetry Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            
            {/* Metric 1: Temperature Compartment */}
            <div style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1.5px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '16px',
              padding: '14px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.72rem', color: '#7dd3fc', fontWeight: 700, textTransform: 'uppercase' }}>
                  Temperatură Van
                </span>
                <ThermometerGaugeIcon size={16} color="#38bdf8" />
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                {telemetry.temperature}°C
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.68rem', color: '#10b981', fontWeight: 700, marginTop: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                <span>CLIMATIZARE CONSTANTĂ</span>
              </div>
            </div>

            {/* Metric 2: Anti-Shock / G-Force Sensor */}
            <div style={{
              background: 'rgba(225, 29, 72, 0.08)',
              border: '1.5px solid rgba(225, 29, 72, 0.35)',
              borderRadius: '16px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.72rem', color: '#fda4af', fontWeight: 700, textTransform: 'uppercase' }}>
                  Senzor Anti-Răsturnare
                </span>
                <ShieldCheck size={16} color="#e11d48" />
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                {telemetry.gForce} G
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.68rem', color: '#f43f5e', fontWeight: 700, marginTop: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f43f5e', display: 'inline-block' }} />
                <span>SUSPENSIE PNEUMATICĂ</span>
              </div>
            </div>

            {/* Metric 3: Relative Humidity */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '12px'
            }}>
              <span style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 600, display: 'block' }}>Umiditate Ambalaj</span>
              <strong style={{ fontSize: '1.25rem', color: '#ffffff', fontFamily: 'monospace' }}>{telemetry.humidity}% RH</strong>
              <span style={{ fontSize: '0.66rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>Păstrează hidratarea petalelor</span>
            </div>

            {/* Metric 4: Cruising Speed */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '12px'
            }}>
              <span style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 600, display: 'block' }}>Viteză Deplasare</span>
              <strong style={{ fontSize: '1.25rem', color: '#ffffff', fontFamily: 'monospace' }}>{telemetry.speedKmh} km/h</strong>
              <span style={{ fontSize: '0.66rem', color: '#10b981', display: 'block', marginTop: '2px' }}>Condus preventiv de salon</span>
            </div>

          </div>

          {/* Current Stage Card */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '18px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                Etapa Curentă (#{activeWaypointIdx + 1} din {waypoints.length})
              </span>
              <span style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 800 }}>
                ETA: {waypoints[activeWaypointIdx].eta}
              </span>
            </div>
            
            <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#fbcfe8' }}>
              {waypoints[activeWaypointIdx].name}
            </div>
            
            <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              {waypoints[activeWaypointIdx].status}
            </div>

            {/* Interactive Waypoint Quick Progress Bar */}
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden', marginTop: '6px' }}>
              <div 
                style={{ 
                  width: `${progress}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #e11d48, #38bdf8)',
                  transition: 'width 0.1s linear'
                }} 
              />
            </div>
          </div>

          {/* Dedicated VIP Courier Card */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '18px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1.5px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ClimateVanIcon size={20} color="#38bdf8" />
              </div>
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#ffffff', display: 'block' }}>
                  Marius D. (Curier Dedicat VIP)
                </strong>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                  Vehicul B-108-STF • Mercedes-Benz Citan Isothermal
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href="tel:0722123456"
                className="btn btn-secondary btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 10px',
                  fontSize: '0.74rem',
                  borderRadius: '10px'
                }}
              >
                <Phone size={13} color="#38bdf8" />
                <span>Apel Curier</span>
              </a>
              <a
                href={`https://wa.me/40722123456?text=${encodeURIComponent(`Bună ziua! Verific livrarea climatizată pentru comanda #${orderId} destinată ${recipientName}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 10px',
                  fontSize: '0.74rem',
                  borderRadius: '10px'
                }}
              >
                <Send size={13} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Guarantee Strip */}
      <div style={{
        marginTop: '22px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        fontSize: '0.78rem',
        color: '#94a3b8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="#10b981" /> Cutie Termică Rigidă Izotermă
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="#10b981" /> Fără Răsturnare (Sistem Vertical Sigilat)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="#10b981" /> Mănuși Albe la Predare & Sigiliu Ceară
          </span>
        </div>

        <div style={{ color: '#fbcfe8', fontWeight: 700 }}>
          Destinatar Curent: <strong>{recipientName}</strong> ({recipientAddress.split(',')[0]})
        </div>
      </div>
    </div>
  );
}
