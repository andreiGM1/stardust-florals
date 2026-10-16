import React, { useEffect } from 'react';
import MechatronicRoseSimulator from './MechatronicRoseSimulator';
import { X } from 'lucide-react';

export default function MechatronicRoseModal({ isOpen, onClose, onApplyConfig, initialData }) {
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
      id="mechatronic-rose-modal-overlay"
      onClick={(e) => {
        if (e.target.id === 'mechatronic-rose-modal-overlay') {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(6, 2, 8, 0.88)',
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
          id="btn-close-mechatronic-rose-x"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
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
          title="Închide fereastra"
        >
          <X size={20} />
        </button>

        <div style={{
          background: 'linear-gradient(145deg, #180514 0%, #0d020c 60%, #050105 100%)',
          border: '1.5px solid rgba(244, 63, 94, 0.35)',
          borderRadius: '28px',
          padding: '28px 32px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(244, 63, 94, 0.2)'
        }}>
          <MechatronicRoseSimulator 
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
    </div>
  );
}
