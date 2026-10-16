import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import GourmetChampagneStrawberriesSelector from './GourmetChampagneStrawberriesSelector';

export default function GourmetTastingModal({ isOpen, onClose, onApplyPackage }) {
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
      id="gourmet-tasting-modal"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 2, 7, 0.88)',
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
        id="gourmet-tasting-dialog"
        className="modal-content"
        style={{
          background: 'linear-gradient(145deg, #1b0412 0%, #0a0107 100%)',
          border: '1.5px solid rgba(225, 29, 72, 0.45)',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(225, 29, 72, 0.25)',
          color: '#ffffff',
          position: 'relative',
          overflowY: 'auto'
        }}
      >
        <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 10 }}>
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

        <div style={{ padding: '28px 24px 12px' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '0 0 6px', fontFamily: 'Cinzel, serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Pachet Gourmet: Moët & Căpșuni cu Aur 24K</span>
          </h2>
          <p style={{ color: '#fda4af', fontSize: '0.88rem', margin: 0, lineHeight: 1.45 }}>
            Completează buchetul tău cu o sticlă de șampanie franțuzească nobilă și căpșuni proaspete glazurate în ciocolată belgiană Callebaut, pudrate manual cu foiță de aur 24K.
          </p>
        </div>

        <GourmetChampagneStrawberriesSelector
          isEmbedded={false}
          onApplyPackage={(data) => {
            if (onApplyPackage) onApplyPackage(data);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
