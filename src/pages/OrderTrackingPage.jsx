import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, CheckCircle2, Clock, Truck, Gift, Sparkles, Send, ShieldCheck, MapPin, Phone, Share2, RefreshCw, Star } from 'lucide-react';
import { GiftBoxIcon, ScrollDiplomaIcon, PerfumeBottleIcon, CameraPlusIcon, CouponVoucherIcon, ClimateVanIcon, ThermometerGaugeIcon } from '../components/CustomIcons';
import ClimateDeliveryMapSimulator from '../components/ClimateDeliveryMapSimulator';

export default function OrderTrackingPage({ onOpenCertificateModal, onOpenReviewModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || 'ST-9482';

  const [searchId, setSearchId] = useState(initialId);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && id !== searchId) {
      setSearchId(id);
    }
  }, [searchParams]);

  useEffect(() => {
    loadOrder(searchId);
  }, [searchId]);

  const loadOrder = (idToFind) => {
    const cleanId = (idToFind || '').trim().toUpperCase();
    const storedOrders = JSON.parse(localStorage.getItem('stardust_orders') || '[]');
    const found = storedOrders.find(
      (o) => String(o.orderId).toUpperCase() === cleanId || String(o.orderId).toUpperCase() === cleanId.replace('#', '')
    );

    if (found) {
      setActiveOrder({
        ...found,
        statusStep: 4, // in transit
        statusText: 'În Tranzit către Destinatar',
        courierName: 'Marius D. (Curier Dedicat Stardust VIP)',
        courierPhone: '0722123456',
        estimatedTime: 'Astăzi, în intervalul ' + (found.timeSlot || '14:00 - 18:00'),
      });
    } else {
      // Demo order preview for tracking exploration
      setActiveOrder({
        orderId: cleanId || 'ST-9482',
        bouquet: 'Buchet Signature Dual Noir & Rouge (Ediție Atelier)',
        color: 'Dual Noir & Rouge (Negru exterior + Roșu sclipitor)',
        recipientName: 'Ioana Popescu',
        recipientAddress: 'București, Sector 1, Calea Victoriei 122',
        date: 'Astăzi',
        timeSlot: '14:00 - 18:00',
        total: '269 RON',
        statusStep: 4,
        statusText: 'În Tranzit către Destinatar',
        courierName: 'Marius D. (Curier Dedicat Stardust VIP)',
        courierPhone: '0722123456',
        estimatedTime: 'Astăzi, 15:30 - 16:30',
        videoQrAttached: true,
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId) {
      setSearchParams({ id: searchId });
      loadOrder(searchId);
    }
  };

  const STEPS = [
    {
      num: 1,
      title: 'Comandă Preluată & Confirmată Atelier',
      desc: 'Florarii noștri au selectat trandafirii proaspeți de calibru mare.',
      time: '09:15',
    },
    {
      num: 2,
      title: 'Aplicare Manuală Sclipici Diamant',
      desc: 'Strat dublu de sclipici cosmetic rezistent aplicat boboc cu boboc.',
      time: '10:45',
    },
    {
      num: 3,
      title: 'Cod QR Video & Ghirlandă Micro-LED',
      desc: 'Felicitarea personalizată este sigilată în plic cu ceară și atașată.',
      time: '12:00',
    },
    {
      num: 4,
      title: 'Preluat de Curier Dedicat (În Tranzit)',
      desc: 'Aranjamentul este transportat în cutie termică rigidă de protecție.',
      time: '13:30',
    },
    {
      num: 5,
      title: 'Livrat cu Emoție & Surpriză',
      desc: 'Înmânare festivă în fața ușii destinatarului.',
      time: 'Estimare 15:45',
    },
  ];

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 40px', background: 'radial-gradient(circle at 50% 20%, rgba(225, 29, 72, 0.07), transparent 70%)', textAlign: 'center' }}>
        <div className="container">
          <span className="tag-badge">TRANSPARENȚĂ TOTALĂ & CONCIERGE</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', margin: '14px 0 16px' }}>
            Urmărire Comandă în <span className="highlight-rose">Timp Real</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '620px', margin: '0 auto 30px' }}>
            Află exact în ce stadiu de pregătire se află buchetul tău cu sclipici și când ajunge la ușa persoanei dragi.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Introdu ID Comandă (ex: ST-9482)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ flex: 1, padding: '14px 18px', borderRadius: '12px', border: '1.5px solid var(--border-light)', outline: 'none', fontSize: '1rem', background: 'var(--bg-surface)', color: 'var(--text-main)', boxShadow: 'var(--shadow-sm)' }}
            />
            <button type="submit" className="btn btn-primary btn-md">
              <Search size={18} />
              <span>Caută</span>
            </button>
          </form>
        </div>
      </section>

      {/* Main Tracking Content */}
      <div className="container" style={{ marginTop: '20px' }}>
        {activeOrder && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            
            {/* Left: Interactive Progress Timeline */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '28px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Stadiu Curent</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a', display: 'inline-block', boxShadow: '0 0 0 4px #bbf7d0' }} />
                    <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{activeOrder.statusText}</strong>
                  </div>
                </div>
                <span className="tag-badge" style={{ fontSize: '0.85rem' }}>
                  ID: #{activeOrder.orderId}
                </span>
              </div>

              {/* Timeline Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
                {STEPS.map((step) => {
                  const isCompleted = step.num < activeOrder.statusStep;
                  const isCurrent = step.num === activeOrder.statusStep;

                  return (
                    <div key={step.num} style={{ display: 'flex', gap: '18px', position: 'relative' }}>
                      {/* Step Circle */}
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isCompleted ? '#16a34a' : isCurrent ? 'var(--rose-600)' : 'var(--bg-subtle)',
                        color: isCompleted || isCurrent ? '#fff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        flexShrink: 0,
                        boxShadow: isCurrent ? '0 0 0 5px rgba(225, 29, 72, 0.2)' : 'none'
                      }}>
                        {isCompleted ? <CheckCircle2 size={20} /> : step.num}
                      </div>

                      {/* Step Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '1.05rem', color: isCurrent ? 'var(--rose-700)' : 'var(--text-main)' }}>
                            {step.title}
                          </strong>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isCurrent ? 'var(--rose-600)' : 'var(--text-muted)' }}>
                            {step.time}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Courier Mini Card */}
              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '18px', marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Truck size={22} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem', display: 'block', color: 'var(--text-main)' }}>{activeOrder.courierName}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Livrare programată: {activeOrder.estimatedTime}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    id="btn-tracking-view-climate-map"
                    onClick={() => {
                      const el = document.getElementById('climate-map-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn btn-sm btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <ClimateVanIcon size={14} color="#38bdf8" />
                    <span>Traseu Climatizat 18°C</span>
                  </button>
                  <a 
                    href={`tel:${activeOrder.courierPhone}`}
                    className="btn btn-sm btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Phone size={14} /> Contact Curier
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '30px', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                  Detaliile Buchetului
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Aranjament:</span>
                    <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--text-main)', marginTop: '2px' }}>{activeOrder.bouquet}</strong>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Paletă Cromatică:</span>
                    <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{activeOrder.color}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Destinatar & Adresă:</span>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: '4px' }}>
                      <MapPin size={16} color="#e11d48" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>{activeOrder.recipientName}</strong>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>{activeOrder.recipientAddress}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Felicitare Video QR:</span>
                    <div style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <Sparkles size={16} /> Atașată pe Buchet (Cod QR activ)
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Certificat de Autenticitate:</span>
                    <div style={{ color: '#b45309', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}>
                        <ScrollDiplomaIcon size={16} color="#b45309" />
                        <span>Serie: SF-2026-{(activeOrder.orderId || '').replace(/[^0-9]/g, '').slice(-4) || '0849'}</span>
                      </span>
                      <button
                        type="button"
                        id="btn-tracking-view-cert"
                        onClick={() => {
                          const serial = `SF-2026-${(activeOrder.orderId || '').replace(/[^0-9]/g, '').slice(-4) || '0849'}`;
                          const data = {
                            recipientName: activeOrder.recipientName || 'Persoana Iubită',
                            bouquetName: activeOrder.bouquet,
                            rosesCount: 15,
                            colorName: activeOrder.color,
                            serialNumber: serial,
                            orderId: activeOrder.orderId,
                            orderDate: activeOrder.date
                          };
                          if (onOpenCertificateModal) onOpenCertificateModal(data);
                          else window.dispatchEvent(new CustomEvent('open-certificate-modal', { detail: data }));
                        }}
                        className="btn btn-gold btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                      >
                        Deschide Certificat
                      </button>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Parfum Ambalaj Atelier:</span>
                    <div style={{ color: '#be185d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', fontSize: '0.88rem' }}>
                      <PerfumeBottleIcon size={16} color="#db2777" />
                      <span>{activeOrder.fragrance || 'Trandafir Damascen & Bujor Imperial'}</span>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px', marginTop: '20px' }}>
                  <a 
                    href={`https://wa.me/40722123456?text=${encodeURIComponent(`Bună ziua! Vă contactez în legătură cu comanda #${activeOrder.orderId} pentru ${activeOrder.recipientName}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp btn-md"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Send size={16} /> Asistență Rapidă Florar WhatsApp
                  </a>
                </div>
              </div>

              {/* Post-Order UGC Photo Review Card (Task 48) */}
              <div style={{ background: 'radial-gradient(circle at 50% 0%, rgba(225, 29, 72, 0.12) 0%, rgba(12, 3, 7, 0.95) 100%)', border: '1.5px solid #e11d48', borderRadius: '24px', padding: '24px', boxShadow: '0 8px 30px rgba(225, 29, 72, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CameraPlusIcon size={20} color="#f43f5e" />
                  <span className="tag-badge" style={{ background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8', margin: 0 }}>
                    RECOMPENSĂ FOTO EXCLUSIVĂ
                  </span>
                </div>
                <h4 style={{ fontSize: '1.2rem', margin: '4px 0 8px', color: '#ffffff' }}>
                  Ai primit buchetul? Lasă o recenzie foto!
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>
                  Încarcă o poză cu reacția destinatarei sau cu trandafirii și primești automat un cupon VIP de <strong>20% reducere</strong> (<strong style={{ color: '#f59e0b' }}>STARDUST20</strong>)!
                </p>
                <button
                  type="button"
                  id="btn-tracking-open-review"
                  onClick={() => {
                    const data = {
                      orderId: activeOrder.orderId,
                      recipientName: activeOrder.recipientName || 'Persoana Iubită',
                      bouquetName: activeOrder.bouquet,
                      city: 'București'
                    };
                    if (onOpenReviewModal) onOpenReviewModal(data);
                    else window.dispatchEvent(new CustomEvent('open-post-order-review', { detail: data }));
                  }}
                  className="btn btn-primary btn-md"
                  style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #e11d48, #be123c)' }}
                >
                  <CouponVoucherIcon size={16} color="#ffffff" />
                  <span>Evaluează Comanda & Ia Cuponul 20%</span>
                </button>
              </div>

              {/* Re-order Loyalty Reward & Share Card (Task 27) */}
              <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--rose-600)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <GiftBoxIcon size={20} color="var(--rose-600)" />
                  <span className="tag-badge" style={{ margin: 0 }}>PROGRAM FIDELITATE STARDUST</span>
                </div>
                <h4 style={{ fontSize: '1.2rem', margin: '4px 0 8px' }}>
                  Vrei să comanzi din nou?
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>
                  Ai <strong>15% reducere garantată</strong> pentru următoarea aniversare cu codul secret de loialitate <strong style={{ color: 'var(--rose-600)' }}>STARDUST15</strong>!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link 
                    to={`/checkout?bouquet=signature-dual-noir-rouge&discount=STARDUST15`} 
                    className="btn btn-primary btn-md"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <RefreshCw size={15} />
                    <span>Re-comandă Acest Buchet (-15%)</span>
                  </Link>

                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(`Urmărește traseul live al buchetului cu sclipici (#${activeOrder.orderId}) aici: ${window.location.origin}/urmarire-comanda?id=${activeOrder.orderId}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-md"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Share2 size={15} />
                    <span>Trimite Urmărirea pe WhatsApp</span>
                  </a>

                  <Link 
                    to="/recenzii" 
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
                  >
                    <Star size={13} color="#f59e0b" fill="#f59e0b" />
                    <span>Vezi Impresiile Clienților</span>
                  </Link>
                </div>
              </div>

              {/* Guarantee Box */}
              <div style={{ background: 'var(--rose-50)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '22px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <ShieldCheck size={32} color="var(--rose-600)" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem', display: 'block' }}>Garanție 100% de Livrare Impecabilă</strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0, opacity: 0.9 }}>
                    Fiecare buchet este inspectat de un maestru florar înainte de plecare și protejat termic pe durata transportului.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Interactive Climate-Controlled GPS Route & Telemetry Simulator (Task 50) */}
        {activeOrder && (
          <div id="climate-map-section" style={{ marginTop: '40px' }}>
            <ClimateDeliveryMapSimulator 
              orderId={activeOrder.orderId}
              recipientName={activeOrder.recipientName}
              recipientAddress={activeOrder.recipientAddress}
            />
          </div>
        )}
      </div>
    </div>
  );
}
