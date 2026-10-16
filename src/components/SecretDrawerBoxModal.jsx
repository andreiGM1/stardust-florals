import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import SecretDrawerBoxWidget from './SecretDrawerBoxWidget';

export default function SecretDrawerBoxModal({
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
      id="secret-drawer-box-modal-overlay"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(12, 3, 8, 0.92)',
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
        id="secret-drawer-box-dialog"
        className="modal-content"
        style={{
          background: 'linear-gradient(145deg, #180812 0%, #0c0208 100%)',
          border: '1.5px solid rgba(244, 63, 94, 0.45)',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '1020px',
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
            id="btn-close-secret-drawer-x"
            onClick={onClose}
            className="modal-close-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'background 0.2s ease'
            }}
            aria-label="Închide configuratorul de cutie secretă cu sertar glisant"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          <SecretDrawerBoxWidget
            isEmbedded={false}
            initialData={initialData}
            onApplyConfig={(data) => {
              if (onApplyConfig) onApplyConfig(data);
              onClose();
            }}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
