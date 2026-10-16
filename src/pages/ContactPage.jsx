import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requestType, setRequestType] = useState('Cerere în căsătorie');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Save lead in localStorage
    const leads = JSON.parse(localStorage.getItem('stardust_leads') || '[]');
    leads.unshift({
      name,
      phone,
      requestType,
      message,
      timestamp: new Date().toISOString(),
      source: 'contact_vip_page'
    });
    localStorage.setItem('stardust_leads', JSON.stringify(leads));

    const waText = 
      `*CERERE SPECIALĂ VIP STARDUST FLORALS*\n\n` +
      `• Nume: ${name}\n` +
      `• Telefon: ${phone}\n` +
      `• Tip Eveniment: ${requestType}\n` +
      `• Detalii: ${message || 'Doresc consultanță personalizată.'}`;

    setSubmitted(true);
    window.open(`https://wa.me/40700000000?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 40px', background: 'radial-gradient(circle at 50% 20%, rgba(225, 29, 72, 0.08), transparent 70%)', textAlign: 'center' }}>
        <div className="container">
          <span className="tag-badge">ASISTENȚĂ 1-LA-1 & EVENIMENTE</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', margin: '14px 0 16px' }}>
            Serviciul Nostru <span className="highlight-rose">VIP Concierge</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Plănuiești o cerere în căsătorie secretă, un eveniment corporate sau o aniversare grandioasă? Florarii noștri seniori te consiliază gratuit pas cu pas.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="grid-2" style={{ alignItems: 'start', gap: '48px' }}>
          {/* Contact Details Card */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Informații Contact Direct</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={22} />
                </div>
                <div>
                  <strong style={{ fontSize: '1.05rem', display: 'block', color: 'var(--text-main)' }}>WhatsApp Oficial (Răspuns în &lt; 3 min)</strong>
                  <a href="https://wa.me/40700000000" target="_blank" rel="noreferrer" style={{ color: 'var(--rose-600)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
                    +40 700 000 000 (Click pentru chat)
                  </a>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Disponibil 7 zile din 7 pentru comenzi urgente și recomandări de mărimi.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} />
                </div>
                <div>
                  <strong style={{ fontSize: '1.05rem', display: 'block', color: 'var(--text-main)' }}>Telefon Apel Concierge</strong>
                  <a href="tel:+40700000000" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
                    +40 700 000 000
                  </a>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Luni – Duminică: 08:00 – 22:00
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <strong style={{ fontSize: '1.05rem', display: 'block', color: 'var(--text-main)' }}>Atelier de Creație & Livrare</strong>
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>București, România</span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Livrări rapide asigurate în toată România cu ambalaj termic de siguranță.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Capture VIP Form */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Solicită Consultanță Eveniment</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
              Completează formularul și te contactăm în maximum 15 minute cu oferta adaptată viziunii tale.
            </p>

            {submitted && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '14px 20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={20} />
                <span>Cererea a fost trimisă cu succes! Te contactăm în curând.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Numele Tău</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Ex: Marius Popa"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Telefon de Contact (WhatsApp)</label>
                <input 
                  type="tel" 
                  required 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="07xx xxx xxx"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Tipul Ocaziei</label>
                <select 
                  value={requestType} 
                  onChange={(e) => setRequestType(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                >
                  <option value="Cerere în căsătorie">Cerere în căsătorie specială</option>
                  <option value="Aniversare importantă">Aniversare de cuplu / Nuntă</option>
                  <option value="Comandă Corporate / B2B">Cadouri Corporate & Evenimente de Firmă</option>
                  <option value="Aranjament Gigant Personalizat">Aranjament Regal de peste 101 trandafiri</option>
                  <option value="Alt eveniment">Consultanță personalizată / Alt eveniment</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Detalii Dorite (Data, Buget estimat, Idei)</label>
                <textarea 
                  rows={3} 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Scrie-ne viziunea ta și orice dorințe speciale..."
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', fontFamily: 'inherit', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '6px' }}>
                <span>Trimite Solicitarea VIP</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
