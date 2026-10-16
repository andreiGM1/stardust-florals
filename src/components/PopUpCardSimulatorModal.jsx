import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import PopUpCard3DSimulator from './PopUpCard3DSimulator';

export default function PopUpCardSimulatorModal({ isOpen, onClose, onApplyCard, initialData }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="popup-card-simulator-modal"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(12, 3, 9, 0.88)',
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
        id="popup-card-simulator-dialog"
        className="modal-content"
        style={{
          background: 'linear-gradient(145deg, #1c0613 0%, #0a0106 100%)',
          border: '1.5px solid rgba(244, 63, 94, 0.45)',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(244, 63, 94, 0.25)',
          color: '#ffffff',
          position: 'relative',
          overflowY: 'auto'
        }}
      >
        <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 10 }}>
          <button
            type="button"
            id="btn-close-popup-card-modal"
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

        <div style={{ padding: '28px 24px 8px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '0 0 6px', fontFamily: 'Cinzel, serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Felicitare Pop-Up 3D cu Petale Plutitoare & Plic Sigilat</span>
          </h2>
          <p style={{ color: '#fda4af', fontSize: '0.88rem', margin: 0, lineHeight: 1.45 }}>
            Desfă virtual plicul cerat și admiră sculptura din hârtie fină care se înalță tridimensional, acompaniată de o ploaie diafană de petale de trandafir și foiță de aur.
          </p>
        </div>

        <div style={{ padding: '12px 24px 28px' }}>
          <PopUpCard3DSimulator
            isEmbedded={false}
            initialSculpture={initialData?.sculpture?.id || 'rose-sculpture'}
            initialEnvelope={initialData?.envelope?.id || 'bordeaux-wax'}
            initialMessage={initialData?.message || 'Pentru persoana care aduce magie în fiecare clipă din viața mea. Te iubesc din tot sufletul!'}
            initialRecipient={initialData?.recipient || 'Pentru Andreea'}
            initialSender={initialData?.sender || 'Cu dragoste eternă, Andrei'}
            onApplyCard={(data) => {
              if (onApplyCard) onApplyCard(data);
              onClose();
            }}
            onCloseModal={onClose}
          />
        </div>
      </div>
    </div>
  );
}
