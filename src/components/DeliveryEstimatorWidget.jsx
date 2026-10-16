import React, { useState, useEffect } from 'react';
import { Truck, Clock, MapPin, CheckCircle, Zap, Package } from 'lucide-react';

const CITIES = [
  { name: 'București (Toate sectoarele)', fast: 'Livrare în 2-4 Ore', sameDay: true },
  { name: 'Ilfov (Voluntari, Otopeni, Popești etc.)', fast: 'Livrare în 3-4 Ore', sameDay: true },
  { name: 'Cluj-Napoca', fast: 'Livrare în 24h cu protecție termică', sameDay: false },
  { name: 'Timișoara', fast: 'Livrare în 24h cu protecție termică', sameDay: false },
  { name: 'Iași', fast: 'Livrare în 24h cu protecție termică', sameDay: false },
  { name: 'Brașov', fast: 'Livrare în 24h cu protecție termică', sameDay: false },
  { name: 'Constanța', fast: 'Livrare în 24h cu protecție termică', sameDay: false },
  { name: 'Alt Oraș din România', fast: 'Livrare rapidă 24h oriunde în țară', sameDay: false }
];

export default function DeliveryEstimatorWidget() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0].name);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const cityData = CITIES.find((c) => c.name === selectedCity) || CITIES[0];

  return (
    <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-light)', borderRadius: '20px', padding: '20px 24px', boxShadow: 'var(--shadow-sm)', maxWidth: '960px', margin: '0 auto 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* City Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '260px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MapPin size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
              Verifică Livrarea în Orașul Tău:
            </span>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-light)', background: 'var(--bg-surface)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', outline: 'none', marginTop: '2px' }}
            >
              {CITIES.map((c, i) => (
                <option key={i} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Speed & Guarantee Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '240px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={22} />
          </div>
          <div>
            <strong style={{ fontSize: '0.95rem', color: '#10b981', display: 'block' }}>
              {cityData.fast}
            </strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              {cityData.sameDay ? (
                <>
                  <Zap size={13} color="#10b981" /> Curier propriu dedicat Stardust
                </>
              ) : (
                <>
                  <Package size={13} color="var(--rose-500)" /> Curierat rapid securizat cu protecție
                </>
              )}
            </span>
          </div>
        </div>

        {/* Countdown */}
        <div style={{ background: 'var(--rose-50)', border: '1px solid var(--border-light)', borderRadius: '14px', padding: '10px 16px', textAlign: 'center', minWidth: '180px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--rose-900)', fontWeight: 700, display: 'block' }}>
            Comandă în următoarele:
          </span>
          <strong style={{ fontSize: '1.15rem', color: 'var(--rose-600)', fontFamily: 'monospace', letterSpacing: '1px' }}>
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </strong>
        </div>

      </div>
    </div>
  );
}
