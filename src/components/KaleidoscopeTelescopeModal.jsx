import React, { useEffect } from 'react';
import KaleidoscopeTelescopeSimulator from './KaleidoscopeTelescopeSimulator';
import { X } from 'lucide-react';

export default function KaleidoscopeTelescopeModal({ isOpen, onClose, onApplyConfig, initialConfig }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="kaleidoscope-telescope-modal-overlay"
      onClick={(e) => {
        if (e.target.id === 'kaleidoscope-telescope-modal-overlay') {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '980px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '28px',
          background: 'transparent'
        }}
      >
        {/* Close Button X */}
        <button
          type="button"
          id="btn-close-kaleidoscope-telescope-x"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            color: '#fef3c7',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Închide fereastra"
        >
          <X size={20} />
        </button>

        <div 
          style={{
            background: 'linear-gradient(145deg, #0f172a 0%, #090d16 60%, #030712 100%)',
            border: '1.5px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '28px',
            padding: '28px 32px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 158, 11, 0.15)'
          }}
        >
          <KaleidoscopeTelescopeSimulator 
            initialConfig={initialConfig}
            onApplyConfig={(cfg) => {
              if (onApplyConfig) {
                onApplyConfig(cfg);
              }
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
