import React, { useState } from 'react';
import { Gift, X, CheckCircle, Sparkles, ArrowRight, Lock } from 'lucide-react';
import { PartyIcon } from './CustomIcons';
import { useNavigate } from 'react-router-dom';
import { dispatchLead } from '../utils/leadDispatcher';

export default function LeadCaptureModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;

    // Dispatch lead (salvează local + trimite la webhook dacă e configurat)
    dispatchLead({
      name: name.trim(),
      phone: phone.trim(),
      source: 'lead_modal_10_percent'
    });

    localStorage.setItem('stardust_active_discount', 'STARDUST10');
    localStorage.setItem('stardust_lead_info', JSON.stringify({ name, phone }));

    setSubmitted(true);
  };

  const handleUseDiscount = () => {
    onClose();
    navigate('/checkout?discount=STARDUST10');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-luxury" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Închide">
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ width: '64px', height: '64px', background: 'var(--rose-50)', color: 'var(--rose-600)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Gift size={32} />
            </div>

            <span className="tag-badge" style={{ marginBottom: '12px' }}>
              <Sparkles size={13} /> OFERTĂ EXCLUSIVĂ VIP
            </span>

            <h3 style={{ fontSize: '1.9rem', marginBottom: '12px', lineHeight: 1.25 }}>
              Primește <span className="highlight-rose">10% Reducere</span> + Felicitare QR Inclusă Gratuit!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
              Lasă-ne numărul tău de WhatsApp și primești instant codul tău promoțional pentru primul buchet cu sclipici comandat.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Numele Tău
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Alexandru Popescu" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid var(--border-light)', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Număr de Telefon (WhatsApp)
                </label>
                <input 
                  type="tel" 
                  placeholder="07xx xxx xxx" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid var(--border-light)', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '10px', width: '100%' }}>
                <span>Deblochează Reducerea de 10%</span>
                <ArrowRight size={18} />
              </button>

              <span style={{ fontSize: '0.75rem', color: '#9f737c', textAlign: 'center', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <Lock size={12} color="#9f737c" /> Datele tale sunt 100% confidențiale. Fără spam.
              </span>
            </form>
          </div>
        ) : (
          <div style={{ padding: '10px 0' }}>
            <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>Felicitări, {name || 'dragă iubitor de frumos'}!</span>
              <PartyIcon size={24} color="var(--rose-600)" />
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Codul tău de reducere exclusiv este activat:
            </p>

            <div style={{ background: 'var(--rose-50)', border: '2px dashed var(--rose-600)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--rose-600)', letterSpacing: '2px', display: 'block' }}>
                STARDUST10
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                10% REDUCERE APLICATĂ AUTOMAT LA CHECKOUT
              </span>
            </div>

            <button onClick={handleUseDiscount} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              <span>Mergi la Comandă cu Reducerea de 10%</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
