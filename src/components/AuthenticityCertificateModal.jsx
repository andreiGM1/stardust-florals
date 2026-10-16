import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Check, Copy, Printer, ShieldCheck, Sparkles, Award, 
  ExternalLink, RefreshCw, Edit3, CheckCircle2, Lock
} from 'lucide-react';
import { 
  CrownIcon, RoseIcon, FleurDeLisIcon, DiamondIcon, 
  WaxSealStampIcon, QuillIcon, ScrollDiplomaIcon, CertificateBadgeIcon,
  SparkleIcon
} from './CustomIcons';
import { playLuxuryChime, playWaxSealBreakSound } from '../utils/audioAlert';

export default function AuthenticityCertificateModal({ isOpen, onClose, initialData = null }) {
  const [certTheme, setCertTheme] = useState('ivory'); // 'ivory' | 'noir'
  const [recipientName, setRecipientName] = useState('Persoana Iubită');
  const [bouquetName, setBouquetName] = useState('Buchet Signature Dual Noir & Rouge (Ediție Atelier)');
  const [rosesCount, setRosesCount] = useState(15);
  const [colorName, setColorName] = useState('Signature Dual (Negru contur + Roșu centru)');
  const [serialNumber, setSerialNumber] = useState('SF-2026-0849');
  const [issueDate, setIssueDate] = useState('');
  const [artisanName, setArtisanName] = useState('Elena V., Maestru Florar & Director Atelier');
  const [diamondGrade, setDiamondGrade] = useState('0.15mm Micro-Prismatic (Grad Cosmetic Ecologic, Fără Cădere)');
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [customNameInput, setCustomNameInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSealInspected, setIsSealInspected] = useState(false);
  
  const certRef = useRef(null);

  // Sync initialData or generate defaults
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ro-RO', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    setIssueDate(formattedDate);

    if (initialData) {
      if (initialData.recipientName) {
        setRecipientName(initialData.recipientName);
        setCustomNameInput(initialData.recipientName);
      }
      if (initialData.bouquetName) setBouquetName(initialData.bouquetName);
      if (initialData.rosesCount) setRosesCount(initialData.rosesCount);
      if (initialData.colorName) setColorName(initialData.colorName);
      if (initialData.serialNumber) setSerialNumber(initialData.serialNumber);
      if (initialData.diamondGrade) setDiamondGrade(initialData.diamondGrade);
    } else {
      // Check if there is saved lead info
      const savedLead = JSON.parse(localStorage.getItem('stardust_lead_info') || '{}');
      if (savedLead.name) {
        setRecipientName(savedLead.name);
        setCustomNameInput(savedLead.name);
      }
      // Check stored serial or generate persistent
      const savedSerial = localStorage.getItem('stardust_active_cert_serial');
      if (savedSerial) {
        setSerialNumber(savedSerial);
      } else {
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const newSerial = `SF-2026-${randNum}`;
        localStorage.setItem('stardust_active_cert_serial', newSerial);
        setSerialNumber(newSerial);
      }
    }
  }, [initialData, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopySerial = () => {
    navigator.clipboard.writeText(serialNumber);
    setCopied(true);
    playLuxuryChime();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRegenerateSerial = () => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newSerial = `SF-2026-${randNum}`;
    setSerialNumber(newSerial);
    localStorage.setItem('stardust_active_cert_serial', newSerial);
    playLuxuryChime();
  };

  const handleSealClick = () => {
    playWaxSealBreakSound();
    setIsSealInspected((prev) => !prev);
  };

  const handlePrint = () => {
    playLuxuryChime();
    window.print();
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    if (customNameInput.trim()) {
      setRecipientName(customNameInput.trim());
    }
    setIsEditingName(false);
  };

  const isDark = certTheme === 'noir';

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 1, 3, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      {/* Print-specific style injection to guarantee pristine physical print output */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-authenticity-certificate,
          #printable-authenticity-certificate * {
            visibility: visible !important;
          }
          #printable-authenticity-certificate {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 28px !important;
            box-shadow: none !important;
            border: 2px solid #b45309 !important;
            background: #ffffff !important;
            color: #1a0b12 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '820px',
          background: '#120409',
          border: '1.5px solid rgba(225, 29, 72, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(225, 29, 72, 0.2)',
          overflow: 'hidden',
          margin: 'auto',
          color: '#ffe4e6',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        
        {/* Top Header Controls (No Print) */}
        <div 
          className="no-print" 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid rgba(225, 29, 72, 0.25)',
            background: '#1a070f'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#2c0b16', border: '1px solid #be123c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ScrollDiplomaIcon size={20} color="#fbbf24" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 id="cert-modal-title" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fff', margin: 0 }}>
                  Certificat de Autenticitate & Serie Unică
                </h3>
                <span style={{ fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.15)', color: '#fef08a', border: '1px solid rgba(251, 191, 36, 0.3)', fontWeight: 800 }}>
                  ATELIER OFICIAL
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#f43f5e', opacity: 0.85, margin: 0 }}>
                Document de atestare oficială a calității și originii creației florale
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Theme switcher */}
            <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '10px', padding: '3px', border: '1px solid rgba(225, 29, 72, 0.3)' }}>
              <button
                type="button"
                onClick={() => setCertTheme('ivory')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: certTheme === 'ivory' ? '#fef3c7' : 'transparent',
                  color: certTheme === 'ivory' ? '#78350f' : '#fecdd3',
                  transition: 'all 0.2s'
                }}
              >
                Ivory Sidef
              </button>
              <button
                type="button"
                onClick={() => setCertTheme('noir')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: certTheme === 'noir' ? '#881337' : 'transparent',
                  color: certTheme === 'noir' ? '#fde047' : '#fecdd3',
                  transition: 'all 0.2s'
                }}
              >
                Noir Velvet
              </button>
            </div>

            {/* Print button */}
            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-gold btn-sm"
              style={{ padding: '6px 12px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              title="Printează sau salvează ca PDF format A5/A4"
            >
              <Printer size={14} />
              <span>Printează</span>
            </button>

            {/* Close modal */}
            <button
              type="button"
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(225, 29, 72, 0.4)',
                color: '#f43f5e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Închide fereastra"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Action Bar Sub-strip (Customize Name & Quick Serial) */}
        <div 
          className="no-print" 
          style={{
            padding: '10px 20px',
            background: 'rgba(0, 0, 0, 0.55)',
            borderBottom: '1px solid rgba(225, 29, 72, 0.2)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            fontSize: '0.78rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: '#fecdd3', fontWeight: 600 }}>Destinatară pe diplomă:</span>
            {isEditingName ? (
              <form onSubmit={handleSaveName} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="text"
                  value={customNameInput}
                  onChange={(e) => setCustomNameInput(e.target.value)}
                  placeholder="Ex: Ana Maria"
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #f59e0b',
                    background: '#000',
                    color: '#fef08a',
                    fontSize: '0.78rem',
                    outline: 'none'
                  }}
                  autoFocus
                />
                <button
                  type="submit"
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: '#f59e0b',
                    color: '#000',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  Salvează
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  style={{ background: 'none', border: 'none', color: '#fda4af', cursor: 'pointer', fontSize: '0.72rem' }}
                >
                  Anulează
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setCustomNameInput(recipientName);
                  setIsEditingName(true);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'rgba(225, 29, 72, 0.2)',
                  border: '1px solid rgba(225, 29, 72, 0.4)',
                  color: '#fef08a',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <span>{recipientName}</span>
                <Edit3 size={11} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#fef08a', letterSpacing: '1px' }}>
              {serialNumber}
            </span>
            <button
              type="button"
              onClick={handleCopySerial}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
              <span>{copied ? 'Copiat!' : 'Copiază'}</span>
            </button>
            <button
              type="button"
              onClick={handleRegenerateSerial}
              style={{
                padding: '3px 6px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                cursor: 'pointer'
              }}
              title="Simulează o serie nouă de atelier"
            >
              <RefreshCw size={12} />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div style={{ padding: '24px 20px', overflowY: 'auto', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          
          {/* THE PHYSICAL/DIGITAL CERTIFICATE SHEET */}
          <div 
            id="printable-authenticity-certificate"
            ref={certRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              height: 'auto',
              borderRadius: '20px',
              padding: '36px 30px',
              background: isDark 
                ? 'linear-gradient(145deg, #160710 0%, #0d0309 60%, #1a0813 100%)' 
                : 'linear-gradient(145deg, #fffefc 0%, #fdfbf7 50%, #faf4e8 100%)',
              color: isDark ? '#fff1f2' : '#292524',
              border: isDark ? '2px solid #b45309' : '2px solid #92400e',
              boxShadow: isDark 
                ? '0 0 50px rgba(225, 29, 72, 0.25), inset 0 0 30px rgba(245, 158, 11, 0.12)' 
                : '0 20px 45px rgba(0, 0, 0, 0.2), inset 0 0 35px rgba(217, 119, 6, 0.08)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Ornate Double Hairline Inner Border */}
            <div 
              style={{
                position: 'absolute',
                inset: '10px',
                borderRadius: '12px',
                pointerEvents: 'none',
                border: isDark ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(180, 83, 9, 0.4)'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: '15px',
                borderRadius: '10px',
                pointerEvents: 'none',
                border: isDark ? '1px dashed rgba(245, 158, 11, 0.2)' : '1px dashed rgba(180, 83, 9, 0.25)'
              }}
            />

            {/* Corner Ornaments (Baroque Fleur-de-lis) */}
            <div style={{ position: 'absolute', top: '18px', left: '18px', opacity: 0.85 }}>
              <FleurDeLisIcon size={20} color={isDark ? '#fbbf24' : '#b45309'} />
            </div>
            <div style={{ position: 'absolute', top: '18px', right: '18px', opacity: 0.85 }}>
              <FleurDeLisIcon size={20} color={isDark ? '#fbbf24' : '#b45309'} />
            </div>
            <div style={{ position: 'absolute', bottom: '18px', left: '18px', opacity: 0.85 }}>
              <FleurDeLisIcon size={20} color={isDark ? '#fbbf24' : '#b45309'} />
            </div>
            <div style={{ position: 'absolute', bottom: '18px', right: '18px', opacity: 0.85 }}>
              <FleurDeLisIcon size={20} color={isDark ? '#fbbf24' : '#b45309'} />
            </div>

            {/* Subtle Watermark Emblem in Background Center */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', opacity: isDark ? 0.04 : 0.05 }}>
              <CrownIcon size={240} color={isDark ? '#ffffff' : '#000000'} />
            </div>

            {/* Content Container */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* Top Crest / Atelier Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ height: '1px', width: '50px', background: isDark ? 'rgba(251, 191, 36, 0.5)' : 'rgba(180, 83, 9, 0.4)' }} />
                <CrownIcon size={22} color={isDark ? '#fbbf24' : '#b45309'} />
                <span style={{ height: '1px', width: '50px', background: isDark ? 'rgba(251, 191, 36, 0.5)' : 'rgba(180, 83, 9, 0.4)' }} />
              </div>

              <div style={{
                fontSize: '0.72rem',
                letterSpacing: '3px',
                fontFamily: 'sans-serif',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: isDark ? '#fbbf24' : '#92400e',
                marginBottom: '4px'
              }}>
                STARDUST FLORALS™ • HAUTE COUTURE ATELIER
              </div>

              <h1 style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)',
                fontWeight: 900,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                margin: '4px 0',
                color: isDark ? '#fef08a' : '#78350f'
              }}>
                Certificat de Autenticitate
              </h1>

              <div style={{
                fontSize: '0.78rem',
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                color: isDark ? '#fecdd3' : '#57534e',
                maxWidth: '520px',
                marginBottom: '14px',
                lineHeight: 1.4
              }}>
                Document oficial de atestare a creației artizanale florale și a infuzării manuale cu praf de diamant cosmetic
              </div>

              {/* Official Monospace Serial Plaque */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '30px',
                border: isDark ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(180, 83, 9, 0.4)',
                background: isDark ? 'rgba(0,0,0,0.6)' : '#fef3c7',
                color: isDark ? '#fbbf24' : '#92400e',
                marginBottom: '18px'
              }}>
                <ShieldCheck size={14} color={isDark ? '#fbbf24' : '#b45309'} />
                <span style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 800 }}>SERIE REGISTRU:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 900, letterSpacing: '2px', fontSize: '0.95rem' }}>{serialNumber}</span>
              </div>

              {/* Dedication Text */}
              <div style={{ fontSize: '0.82rem', fontStyle: 'italic', color: isDark ? '#fda4af' : '#78716c', marginBottom: '4px' }}>
                Emis cu aleasă prețuire și admirație în onoarea destinatarei:
              </div>

              {/* Recipient's Name - Master Typography Calligraphy */}
              <div style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)',
                fontWeight: 900,
                color: isDark ? '#fef08a' : '#881337',
                borderBottom: isDark ? '1.5px solid rgba(254, 240, 138, 0.3)' : '1.5px solid rgba(136, 19, 55, 0.3)',
                padding: '4px 20px 8px',
                margin: '4px 0 16px',
                letterSpacing: '1px'
              }}>
                „ {recipientName} ”
              </div>

              {/* Atelier Details Grid */}
              <div style={{
                width: '100%',
                borderRadius: '14px',
                padding: '16px 18px',
                background: isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.85)',
                border: isDark ? '1px solid rgba(225, 29, 72, 0.25)' : '1px solid rgba(180, 83, 9, 0.2)',
                textAlign: 'left',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                marginBottom: '16px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <RoseIcon size={16} color={isDark ? '#f43f5e' : '#be123c'} style={{ marginTop: '2px' }} />
                      <div>
                        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: isDark ? '#fda4af' : '#78716c', fontWeight: 700, display: 'block' }}>Creație Florală:</span>
                        <strong style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.88rem' }}>{bouquetName}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <DiamondIcon size={16} color={isDark ? '#38bdf8' : '#0284c7'} style={{ marginTop: '2px' }} />
                      <div>
                        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: isDark ? '#fda4af' : '#78716c', fontWeight: 700, display: 'block' }}>Infuzație Diamant Cosmetic:</span>
                        <span>{diamondGrade}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <SparkleIcon size={16} color={isDark ? '#fbbf24' : '#d97706'} style={{ marginTop: '2px' }} />
                      <div>
                        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: isDark ? '#fda4af' : '#78716c', fontWeight: 700, display: 'block' }}>Arhitectură & Volum:</span>
                        <span>{rosesCount} Trandafiri Mari de Ecuador • {colorName}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CertificateBadgeIcon size={16} color={isDark ? '#34d399' : '#059669'} style={{ marginTop: '2px' }} />
                      <div>
                        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: isDark ? '#fda4af' : '#78716c', fontWeight: 700, display: 'block' }}>Garanție de Atelier:</span>
                        <span>Strălucire intactă 3+ ani în mediu ferit de umiditate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Master Statement Clause */}
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: '0.78rem',
                color: isDark ? '#fbcfe8' : '#57534e',
                maxWidth: '540px',
                marginBottom: '20px',
                lineHeight: 1.5
              }}>
                „Prin prezentul act, Atelierul Stardust Florals garantează selecția manuală a bobocilor, 
                aderența ecologică a pulberii prismatice fără cădere și unicitatea absolută a fiecărui aranjament conceput.”
              </p>

              {/* Footer Signatures and Interactive Wax Seal */}
              <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: isDark ? '1px dashed rgba(245, 158, 11, 0.3)' : '1px dashed rgba(180, 83, 9, 0.3)',
                gap: '12px'
              }}>
                
                {/* Left: Master Artisan Signature */}
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontFamily: 'Playfair Display, cursive',
                    fontStyle: 'italic',
                    fontSize: '1.15rem',
                    color: isDark ? '#fef08a' : '#881337',
                    marginBottom: '2px'
                  }}>
                    Elena Vasilescu
                  </div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: isDark ? '#fda4af' : '#57534e' }}>
                    {artisanName}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: isDark ? '#f43f5e' : '#a8a29e' }}>
                    Data Emiterii: {issueDate}
                  </div>
                </div>

                {/* Center / Right: Interactive 3D Red Wax Seal */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={handleSealClick}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      position: 'relative'
                    }}
                    title="Apasă pentru inspecția digitală a sigiliului regal de ceară"
                  >
                    {/* 3D Wax Seal Badge */}
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #450a0a 100%)',
                      boxShadow: '0 8px 18px rgba(185, 28, 28, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(254, 240, 138, 0.7)'
                    }}>
                      <WaxSealStampIcon size={24} color="#fef08a" />
                      <span style={{ fontSize: '0.55rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase', color: '#fef08a', marginTop: '2px' }}>
                        STARDUST
                      </span>
                    </div>

                    {/* Verified indicator badge */}
                    <span style={{
                      position: 'absolute',
                      bottom: '-6px',
                      right: '-6px',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      background: '#16a34a',
                      color: '#fff',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '2px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                    }}>
                      <Check size={8} />
                      Sigilat
                    </span>
                  </button>
                  <span style={{ fontSize: '0.62rem', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, color: isDark ? '#fbbf24' : '#b45309' }}>
                    Sigiliu Atelier București
                  </span>
                </div>
              </div>

              {/* Seal Inspection Popover (Triggered on Click) */}
              {isSealInspected && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'rgba(6, 78, 59, 0.9)',
                  border: '1px solid #10b981',
                  color: '#ecfdf5',
                  fontSize: '0.78rem',
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>Sigiliu de Ceară Verificat & Validat Oficial</strong>
                    <span style={{ color: '#a7f3d0', fontSize: '0.74rem' }}>
                      Seria <strong>{serialNumber}</strong> este înregistrată în Registrul Unic de Atelier Stardust Florals București. Atestă boboci autentici de Ecuador și infuzare manuală fără cădere în laborator protejat.
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Bottom Modal Footer with Fast CTAs (No Print) */}
        <div 
          className="no-print" 
          style={{
            padding: '14px 20px',
            background: '#15050c',
            borderTop: '1px solid rgba(225, 29, 72, 0.25)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '0.78rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbcfe8', maxWidth: '480px' }}>
            <Lock size={14} color="#f59e0b" style={{ flexShrink: 0 }} />
            <span>Fiecare buchet comandat vine însoțit de acest certificat tipărit pe carton satinat de 300g/m² cu sigiliu fizic din ceară naturală.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-gold btn-md"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px' }}
            >
              <Printer size={15} />
              <span>Descarcă / Printează Card A5</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-md"
              style={{ padding: '8px 16px' }}
            >
              Închide
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
