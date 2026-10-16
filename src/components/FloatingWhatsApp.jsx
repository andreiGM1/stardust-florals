import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, Flame, Heart, QrCode, ShieldCheck, Zap, Smartphone } from 'lucide-react';
import { RoseIcon, SecretMaskIcon } from './CustomIcons';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');

  const QUICK_INTENTS = [
    {
      id: 'urgent',
      Icon: Zap,
      iconColor: '#e11d48',
      label: 'Vreau buchet livrat AZI (Urgență 2-4h)',
      message: 'Bună! Am o urgență și aș dori să aflu dacă mai puteți livra un buchet cu sclipici astăzi în 2-4 ore în București/Ilfov.'
    },
    {
      id: 'dual',
      Icon: RoseIcon,
      iconColor: '#be123c',
      label: 'Detalii Buchet Bicolor Dual Noir & Rouge',
      message: 'Bună! Mă interesează buchetul bicolor Signature Dual Noir & Rouge (negru pe margine și roșu în mijloc). Cum îl pot comanda?'
    },
    {
      id: 'qr',
      Icon: Smartphone,
      iconColor: '#7c3aed',
      label: 'Cum trimit video pentru Felicitarea QR?',
      message: 'Bună! Aș dori să știu cum trimit linkul video pentru felicitarea QR cu sigiliu de ceară.'
    },
    {
      id: 'secret',
      Icon: SecretMaskIcon,
      iconColor: '#0284c7',
      label: 'Livrare Secretă / Anonimă',
      message: 'Bună! Aș dori o livrare secretă / surpriză. Cum procedăm ca destinatarul să nu știe de la cine este?'
    }
  ];

  const handleOpenWhatsApp = (text) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/40700000000?text=${encoded}`, '_blank');
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    handleOpenWhatsApp(`Bună! ${customQuestion.trim()}`);
    setCustomQuestion('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Concierge Popover Card */}
      {isOpen && (
        <div className="whatsapp-concierge-card" role="dialog" aria-label="Asistență WhatsApp Concierge">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#25d366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={22} />
                </div>
                <span style={{ position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', border: '2px solid #fff' }}></span>
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-main)' }}>Florar Atelier Stardust</strong>
                <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 700 }}>● Online • Răspunde în ~2 min</span>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
              aria-label="Închide asistentul WhatsApp"
            >
              <X size={18} />
            </button>
          </div>

          {/* Welcome Bubble */}
          <div style={{ background: 'var(--rose-50)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '12px 14px', fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <RoseIcon size={16} color="var(--rose-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Bună!</strong> Suntem în atelier și pregătim trandafirii cu sclipici. Alege un subiect rapid sau scrie-ne direct:
            </div>
          </div>

          {/* Quick Intent Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {QUICK_INTENTS.map((intent) => {
              const IconComp = intent.Icon;
              return (
                <button
                  key={intent.id}
                  type="button"
                  onClick={() => handleOpenWhatsApp(intent.message)}
                  className="whatsapp-intent-btn"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <IconComp size={15} color={intent.iconColor || 'var(--rose-600)'} />
                    <span>{intent.label}</span>
                  </span>
                  <span style={{ color: '#25d366', fontWeight: 800 }}>→</span>
                </button>
              );
            })}
          </div>

          {/* Custom Question Form */}
          <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
            <input 
              type="text" 
              placeholder="Scrie o întrebare directă..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              style={{ flex: 1, padding: '9px 12px', borderRadius: '10px', border: '1.5px solid var(--border-light)', fontSize: '0.85rem', outline: 'none' }}
            />
            <button 
              type="submit" 
              className="btn btn-whatsapp btn-sm"
              style={{ padding: '0 14px' }}
              title="Trimite pe WhatsApp"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="floating-whatsapp-btn"
        title="Deschide asistența florăriei pe WhatsApp"
        aria-label="Contact rapid WhatsApp"
        style={{ border: 'none', cursor: 'pointer' }}
      >
        {!isOpen && <div className="floating-badge-ping"></div>}
        {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
      </button>
    </>
  );
}
