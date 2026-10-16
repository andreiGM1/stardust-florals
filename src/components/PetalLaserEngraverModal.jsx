import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import PetalLaserEngraver from './PetalLaserEngraver';

export default function PetalLaserEngraverModal({
  isOpen,
  onClose,
  onApplyConfig,
  initialData = null
}) {
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
      id="petal-laser-modal-overlay"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(8, 4, 10, 0.92)',
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
        id="petal-laser-dialog"
        className="modal-content"
        style={{
          background: 'linear-gradient(145deg, #15091a 0%, #08020b 100%)',
          border: '1.5px solid rgba(225, 29, 72, 0.45)',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '960px',
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
            id="btn-close-petal-laser-x"
            onClick={onClose}
            className="modal-close-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(225, 29, 72, 0.4)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Închide fereastra"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '8px' }}>
          <PetalLaserEngraver
            isEmbedded={false}
            onClose={onClose}
            onApplyConfig={onApplyConfig}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
}
