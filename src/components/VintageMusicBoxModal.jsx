import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import VintageMusicBoxConfigurator from './VintageMusicBoxConfigurator';

export default function VintageMusicBoxModal({ 
  isOpen, 
  onClose, 
  onApplyMusicBox, 
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
      id="vintage-music-box-modal"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 6, 4, 0.90)',
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
        id="vintage-music-box-dialog"
        className="modal-content"
        style={{
          background: 'linear-gradient(145deg, #1c1109 0%, #0c0704 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.45)',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(245, 158, 11, 0.25)',
          color: '#ffffff',
          position: 'relative',
          overflowY: 'auto'
        }}
      >
        <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 10 }}>
          <button
            type="button"
            id="btn-close-music-box-modal"
            onClick={onClose}
            className="modal-close-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Închide configuratorul de cutie muzicală"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '8px' }}>
          <VintageMusicBoxConfigurator
            isEmbedded={false}
            initialConfig={initialData}
            onClose={onClose}
            onSaveConfig={(config) => {
              if (onApplyMusicBox) {
                onApplyMusicBox(config);
              }
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
