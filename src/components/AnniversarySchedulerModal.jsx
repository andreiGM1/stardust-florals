import React, { useState, useEffect } from 'react';
import { X, Calendar, Bell, Heart, Sparkles, Clock, Gift, CheckCircle2, Trash2, ShieldCheck, Send, AlertCircle } from 'lucide-react';
import { CalendarHeartIcon, RoseIcon } from './CustomIcons';

const EVENT_TYPES = [
  { id: 'zi-nastere', label: 'Zi de Naștere', defaultOffsetDays: 7 },
  { id: 'aniversare-relatie', label: 'Aniversare Relație / Căsătorie', defaultOffsetDays: 7 },
  { id: 'valentines-day', label: 'Valentine\'s Day (14 Februarie)', fixedMonth: 2, fixedDay: 14, defaultOffsetDays: 7 },
  { id: 'ziua-femeii', label: 'Ziua Femeii (8 Martie)', fixedMonth: 3, fixedDay: 8, defaultOffsetDays: 7 },
  { id: 'onomastica', label: 'Zi Onomastică / Nume', defaultOffsetDays: 3 },
  { id: 'alta-zi', label: 'Alt Moment Special', defaultOffsetDays: 5 }
];

const PREFERRED_BOUQUETS = [
  'Buchet Signature Dual Noir & Rouge (Bicolor)',
  'Buchet Regal Glamour (19 Trandafiri Roșii)',
  'Buchet Petite Sparkle (9 Trandafiri)',
  'Cutie Rotundă de Catifea Stardust Luxury',
  'Trandafir Etern sub Cupolă de Sticlă'
];

const MONTHS = [
  { value: 1, label: 'Ianuarie' },
  { value: 2, label: 'Februarie' },
  { value: 3, label: 'Martie' },
  { value: 4, label: 'Aprilie' },
  { value: 5, label: 'Mai' },
  { value: 6, label: 'Iunie' },
  { value: 7, label: 'Iulie' },
  { value: 8, label: 'August' },
  { value: 9, label: 'Septembrie' },
  { value: 10, label: 'Octombrie' },
  { value: 11, label: 'Noiembrie' },
  { value: 12, label: 'Decembrie' }
];

function playLuxuryChime(frequency = 960) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // audio unavailable
  }
}

export default function AnniversarySchedulerModal({ isOpen, onClose }) {
  const [recipientName, setRecipientName] = useState('');
  const [eventType, setEventType] = useState('zi-nastere');
  const [eventDay, setEventDay] = useState(15);
  const [eventMonth, setEventMonth] = useState(2);
  const [phone, setPhone] = useState('');
  const [preferredBouquet, setPreferredBouquet] = useState(PREFERRED_BOUQUETS[0]);
  const [alertDaysBefore, setAlertDaysBefore] = useState(7);
  const [reminders, setReminders] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'list'

  // Load saved reminders
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stardust_anniversary_reminders');
      if (saved) {
        setReminders(JSON.parse(saved));
      }
    } catch {
      // storage unavailable
    }
  }, [isOpen]);

  // Sync event date for fixed events
  useEffect(() => {
    const selected = EVENT_TYPES.find((t) => t.id === eventType);
    if (selected?.fixedMonth && selected?.fixedDay) {
      setEventMonth(selected.fixedMonth);
      setEventDay(selected.fixedDay);
    }
  }, [eventType]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2800);
  };

  const calculateDaysUntil = (day, month) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, month - 1, day);
    if (target < now && (target.getDate() !== now.getDate() || target.getMonth() !== now.getMonth())) {
      target = new Date(currentYear + 1, month - 1, day);
    }
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSaveReminder = (e) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      showToast('Te rugăm să introduci numele destinatarei.');
      return;
    }
    if (!phone.trim()) {
      showToast('Te rugăm să introduci numărul de WhatsApp pentru notificare.');
      return;
    }

    const eventLabel = EVENT_TYPES.find((t) => t.id === eventType)?.label || 'Eveniment Special';
    const monthLabel = MONTHS.find((m) => m.value === Number(eventMonth))?.label || '';

    const newReminder = {
      id: 'rem_' + Date.now(),
      recipientName: recipientName.trim(),
      eventType,
      eventLabel,
      eventDay: Number(eventDay),
      eventMonth: Number(eventMonth),
      monthLabel,
      phone: phone.trim(),
      preferredBouquet,
      alertDaysBefore: Number(alertDaysBefore),
      createdAt: new Date().toISOString()
    };

    const updated = [newReminder, ...reminders];
    setReminders(updated);
    try {
      localStorage.setItem('stardust_anniversary_reminders', JSON.stringify(updated));
    } catch {
      // storage unavailable
    }

    playLuxuryChime(1120);
    showToast(`Evenimentul pentru ${recipientName.trim()} a fost salvat cu succes!`);
    setActiveTab('list');
  };

  const handleDeleteReminder = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    try {
      localStorage.setItem('stardust_anniversary_reminders', JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
    playLuxuryChime(640);
    showToast('Evenimentul a fost eliminat.');
  };

  const handleTestWhatsAppNotification = (rem) => {
    const daysUntil = calculateDaysUntil(rem.eventDay, rem.eventMonth);
    const message = `Buna! Aici este Floraria Stardust Florals Concierge. Iti amintim discret ca in ${daysUntil > 0 ? daysUntil + ' zile' : 'curand'} este ${rem.eventLabel} pentru ${rem.recipientName} (${rem.eventDay} ${rem.monthLabel})! Am rezervat prioritar stocul pentru buchetul preferat: "${rem.preferredBouquet}". Beneficiezi de 15% reducere VIP cu codul ANIVERSARE15. Doresti sa stabilim ora de livrare si felicitarea video QR?`;
    const encoded = encodeURIComponent(message);
    const cleanPhone = rem.phone.replace(/[^0-9]/g, '');
    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div
      id="anniversary-scheduler-modal"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 2, 6, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <div
        id="anniversary-scheduler-dialog"
        className="modal-content"
        style={{
          background: 'linear-gradient(145deg, #180510 0%, #0a0106 100%)',
          border: '1.5px solid rgba(225, 29, 72, 0.45)',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(225, 29, 72, 0.25)',
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
              top: '18px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              color: '#ffffff',
              padding: '10px 22px',
              borderRadius: '30px',
              fontSize: '0.86rem',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(225, 29, 72, 0.6)',
              animation: 'slideInLeft 0.3s ease-out'
            }}
          >
            {toastMessage}
          </div>
        )}

        {/* Modal Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid rgba(225, 29, 72, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(225, 29, 72, 0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #e11d48, #9f1239)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(225, 29, 72, 0.4)'
              }}
            >
              <CalendarHeartIcon size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  Nu Mai Uita Niciodată Ziua Ei
                </h2>
                <span
                  style={{
                    background: 'rgba(245, 158, 11, 0.18)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 9px',
                    borderRadius: '12px',
                    letterSpacing: '0.5px'
                  }}
                >
                  VIP CONCIERGE
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.86rem', color: '#fda4af' }}>
                Programează aniversarea o singură dată. Te anunțăm din timp pe WhatsApp și blocăm buchetul favorit.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Închide fereastra"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            padding: '12px 28px 0 28px',
            gap: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            style={{
              padding: '10px 18px',
              background: activeTab === 'form' ? 'rgba(225, 29, 72, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'form' ? '2.5px solid #e11d48' : '2.5px solid transparent',
              color: activeTab === 'form' ? '#ffffff' : '#fda4af',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Calendar size={16} />
            <span>Programează Aniversare Nouă</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            style={{
              padding: '10px 18px',
              background: activeTab === 'list' ? 'rgba(225, 29, 72, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'list' ? '2.5px solid #e11d48' : '2.5px solid transparent',
              color: activeTab === 'list' ? '#ffffff' : '#fda4af',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Bell size={16} />
            <span>Evenimente Active ({reminders.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '24px 28px',
            overflowY: 'auto',
            flex: 1
          }}
        >
          {activeTab === 'form' ? (
            <form onSubmit={handleSaveReminder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Event Type Grid */}
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '8px' }}>
                  Alege Tipul Evenimentului:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                  {EVENT_TYPES.map((type) => {
                    const isSelected = eventType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setEventType(type.id)}
                        style={{
                          textAlign: 'left',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          border: isSelected ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                          background: isSelected ? 'rgba(225, 29, 72, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                          color: isSelected ? '#ffffff' : '#fecdd3',
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Heart size={14} color={isSelected ? '#e11d48' : '#fda4af'} />
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recipient & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label htmlFor="input-rem-recipient" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '6px' }}>
                    Numele Ei (Destinatara):
                  </label>
                  <input
                    id="input-rem-recipient"
                    type="text"
                    required
                    placeholder="Ex: Andreea, Maria, Soția mea"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1.5px solid rgba(225, 29, 72, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="input-rem-phone" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '6px' }}>
                    Numărul Tău de WhatsApp (pentru Alertă Discretă):
                  </label>
                  <input
                    id="input-rem-phone"
                    type="tel"
                    required
                    placeholder="Ex: 0740 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1.5px solid rgba(225, 29, 72, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Date Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div>
                  <label htmlFor="select-rem-day" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '6px' }}>
                    Ziua:
                  </label>
                  <select
                    id="select-rem-day"
                    value={eventDay}
                    onChange={(e) => setEventDay(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: '#190610',
                      border: '1.5px solid rgba(225, 29, 72, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="select-rem-month" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '6px' }}>
                    Luna:
                  </label>
                  <select
                    id="select-rem-month"
                    value={eventMonth}
                    onChange={(e) => setEventMonth(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: '#190610',
                      border: '1.5px solid rgba(225, 29, 72, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  >
                    {MONTHS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bouquet Preference & Alert Window */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label htmlFor="select-rem-bouquet" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '6px' }}>
                    Buchetul Favorit Recomandat:
                  </label>
                  <select
                    id="select-rem-bouquet"
                    value={preferredBouquet}
                    onChange={(e) => setPreferredBouquet(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: '#190610',
                      border: '1.5px solid rgba(225, 29, 72, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  >
                    {PREFERRED_BOUQUETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="select-rem-alert" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#fbcfe8', marginBottom: '6px' }}>
                    Când dorești să primești Alerta pe WhatsApp?
                  </label>
                  <select
                    id="select-rem-alert"
                    value={alertDaysBefore}
                    onChange={(e) => setAlertDaysBefore(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: '#190610',
                      border: '1.5px solid rgba(225, 29, 72, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  >
                    <option value={7}>Cu 7 zile înainte (Recomandat — Blocare stoc)</option>
                    <option value={3}>Cu 3 zile înainte (Verificare oră livrare)</option>
                    <option value={1}>Cu 1 zi înainte (Alertă Express de Urgență)</option>
                    <option value={0}>În dimineața evenimentului (ora 08:00)</option>
                  </select>
                </div>
              </div>

              {/* VIP Perks Highlight Banner */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.12), rgba(245, 158, 11, 0.08))',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={20} color="#fbbf24" />
                </div>
                <div style={{ fontSize: '0.82rem', color: '#fef3c7', lineHeight: 1.45 }}>
                  <strong>Garanție de Atelier VIP:</strong> Rezervare prioritară a stocului de trandafiri cu sclipici chiar în perioadele de vârf. Primești automat <strong>15% reducere VIP</strong> la comanda aniversară (cupon salvat: <code>ANIVERSARE15</code>).
                </div>
              </div>

              {/* Submit CTA */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                <button
                  type="submit"
                  id="btn-save-anniversary-reminder"
                  className="btn btn-primary btn-md"
                  style={{
                    flex: 1,
                    padding: '14px 24px',
                    fontSize: '0.98rem',
                    boxShadow: '0 8px 25px rgba(225, 29, 72, 0.5)'
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>Salvează în Calendarul Regal de Amintire</span>
                </button>
              </div>
            </form>
          ) : (
            /* Saved Events List */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reminders.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '48px 20px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '20px',
                    border: '1px dashed rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'rgba(225, 29, 72, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto'
                    }}
                  >
                    <CalendarHeartIcon size={28} color="#e11d48" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
                    Nu ai programat încă nicio aniversare
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#fda4af', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                    Salvează data ei de naștere sau aniversarea relației pentru a primi un reminder discret pe WhatsApp din timp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Adaugă Primul Eveniment</span>
                  </button>
                </div>
              ) : (
                reminders.map((rem) => {
                  const daysUntil = calculateDaysUntil(rem.eventDay, rem.eventMonth);
                  return (
                    <div
                      key={rem.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1.5px solid rgba(225, 29, 72, 0.25)',
                        borderRadius: '18px',
                        padding: '18px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span
                              style={{
                                background: 'rgba(225, 29, 72, 0.2)',
                                color: '#fda4af',
                                fontSize: '0.74rem',
                                fontWeight: 800,
                                padding: '3px 9px',
                                borderRadius: '10px',
                                border: '1px solid rgba(225, 29, 72, 0.35)'
                              }}
                            >
                              {rem.eventLabel}
                            </span>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                              {rem.recipientName}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '0.85rem', color: '#fbcfe8' }}>
                            <Calendar size={14} color="#e11d48" />
                            <span>
                              {rem.eventDay} {rem.monthLabel}
                            </span>
                            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                            <Clock size={14} color="#fbbf24" />
                            <span style={{ color: '#fbbf24', fontWeight: 700 }}>
                              {daysUntil === 0
                                ? 'Astăzi este ziua!'
                                : daysUntil === 1
                                ? 'Mâine este evenimentul!'
                                : `Mai sunt ${daysUntil} zile`}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteReminder(rem.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.12)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#f87171',
                            borderRadius: '10px',
                            padding: '6px 10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.78rem'
                          }}
                          title="Șterge evenimentul"
                        >
                          <Trash2 size={13} />
                          <span>Șterge</span>
                        </button>
                      </div>

                      {/* Bouquet and Alert Details */}
                      <div
                        style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          borderRadius: '12px',
                          padding: '10px 14px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '14px',
                          alignItems: 'center',
                          fontSize: '0.8rem',
                          color: '#e2e8f0'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <RoseIcon size={14} color="#e11d48" />
                          <span>Buchet: <strong>{rem.preferredBouquet}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Bell size={14} color="#fbbf24" />
                          <span>Alertă WhatsApp: <strong>{rem.phone}</strong> (cu {rem.alertDaysBefore} zile înainte)</span>
                        </div>
                      </div>

                      {/* WhatsApp Simulation Test Button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => handleTestWhatsAppNotification(rem)}
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: '6px 14px',
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Send size={13} color="#25d366" />
                          <span>Simulează Alertă WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid rgba(225, 29, 72, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(225, 29, 72, 0.03)',
            fontSize: '0.78rem',
            color: '#fda4af'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#fbbf24" />
            <span>Datele sunt protejate și stocate exclusiv în atelierul Stardust Florals.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 16px' }}
          >
            <span>Închide</span>
          </button>
        </div>
      </div>
    </div>
  );
}
