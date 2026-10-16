import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import FlowerCareGuideWidget from './FlowerCareGuideWidget';

export default function FlowerCareGuideModal({
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
      id="flower-care-guide-modal-overlay"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 10, 8, 0.92)',
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
        id="flower-care-guide-dialog"
        className="modal-content"
        style={{
          background: 'linear-gradient(145deg, #071510 0%, #030805 100%)',
          border: '1.5px solid rgba(16, 185, 129, 0.45)',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(16, 185, 129, 0.22)',
          color: '#ffffff',
          position: 'relative',
          overflowY: 'auto'
        }}
      >
        <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 10 }}>
          <button
            type="button"
            id="btn-close-care-guide-x"
            onClick={onClose}
            className="modal-close-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            title="Închide ghidul de îngrijire"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '8px' }}>
          <FlowerCareGuideWidget
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
