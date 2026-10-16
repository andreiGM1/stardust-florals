import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import MicroLedLightSimulator from './MicroLedLightSimulator';

export default function MicroLedSimulatorModal({ isOpen, onClose, onApplyMode }) {
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
      id="micro-led-simulator-modal"
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
        id="micro-led-simulator-dialog"
        className="modal-content"
        style={{
          background: 'linear-gradient(145deg, #17040e 0%, #090105 100%)',
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

        <MicroLedLightSimulator
          isEmbedded={false}
          onApplyMode={(data) => {
            if (onApplyMode) onApplyMode(data);
          }}
        />
      </div>
    </div>
  );
}
