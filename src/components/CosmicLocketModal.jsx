import React, { useEffect } from 'react';
import CosmicLocketSimulator from './CosmicLocketSimulator';
import { X } from 'lucide-react';

export default function CosmicLocketModal({ isOpen, onClose, onApplyConfig, initialData }) {
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
      id="cosmic-locket-modal-overlay"
      onClick={(e) => {
        if (e.target.id === 'cosmic-locket-modal-overlay') {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 2, 8, 0.85)',
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
          maxWidth: '1060px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '28px',
          background: 'transparent'
        }}
      >
        {/* Close Button X */}
        <button
          type="button"
          id="btn-close-cosmic-locket-x"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(244, 63, 94, 0.5)',
            color: '#ffffff',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.2s ease'
          }}
          title="Închide fereastra"
          aria-label="Închide configuratorul de pandantiv cosmic"
        >
          <X size={20} color="#fda4af" />
        </button>

        <CosmicLocketSimulator
          isEmbedded={false}
          initialData={initialData}
          onApplyConfig={(data) => {
            if (onApplyConfig) {
              onApplyConfig(data);
            }
            onClose();
          }}
        />
      </div>
    </div>
  );
}
