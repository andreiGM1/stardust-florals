import React, { useState, useEffect } from 'react';
import { 
  X, Check, Sparkles, Heart, Crown, Feather, RefreshCw, 
  Eye, Volume2, Copy, Send, ShieldCheck, Bookmark, FileText
} from 'lucide-react';
import { 
  ParchmentScrollIcon, WaxSealStampIcon, QuillIcon, RoseIcon, 
  CrownIcon, FleurDeLisIcon, SparkleIcon, SecretMaskIcon 
} from './CustomIcons';
import { playLuxuryChime, playWaxSealBreakSound } from '../utils/audioAlert';

const PAPER_TYPES = [
  {
    id: 'pergament-ars',
    name: 'Pergament Antic Ars pe Margini (1880)',
    tag: 'AUTENTIC VINTAGE',
    bgColor: '#f7f1e1',
    borderColor: '#78350f',
    textColor: '#382013',
    boxShadow: 'inset 0 0 40px rgba(120, 53, 15, 0.45), 0 12px 36px rgba(0, 0, 0, 0.45)',
    borderStyle: '3px solid #92400e',
    burnedEdges: true
  },
  {
    id: 'matase-crem',
    name: 'Hârtie de Bumbac & Mătase Fildeș Regal',
    tag: 'ELEGANȚĂ ARISTOCRATICĂ',
    bgColor: '#fffdf7',
    borderColor: '#d97706',
    textColor: '#1c1917',
    boxShadow: 'inset 0 0 25px rgba(217, 119, 6, 0.15), 0 12px 36px rgba(0, 0, 0, 0.35)',
    borderStyle: '2px solid #f59e0b',
    burnedEdges: false
  },
  {
    id: 'nocturne-noir',
    name: 'Carton Mat Noir Onyx cu Cerneală Aurie',
    tag: 'NOCTURNE GLAMOUR',
    bgColor: '#0f040a',
    borderColor: '#f59e0b',
    textColor: '#fef08a',
    boxShadow: 'inset 0 0 35px rgba(245, 158, 11, 0.2), 0 12px 36px rgba(0, 0, 0, 0.7)',
    borderStyle: '2px solid rgba(245, 158, 11, 0.4)',
    burnedEdges: false
  }
];

const WAX_COLORS = [
  { id: 'bordeaux', name: 'Roșu Rubiniu Bordeaux', hex: '#881337', secondary: '#4c0519', label: 'Tradițional Regal' },
  { id: 'gold-24k', name: 'Aur Imperial 24K', hex: '#d97706', secondary: '#78350f', label: 'Opulență & Strălucire' },
  { id: 'midnight-noir', name: 'Negru Onyx Midnight', hex: '#1e0515', secondary: '#090106', label: 'Mister Gotico-Modern' },
  { id: 'rose-gold', name: 'Rose Gold Sidefat', hex: '#be185d', secondary: '#700732', label: 'Romantism Delicat' }
];

const SEAL_EMBLEMS = [
  { id: 'coroana', name: 'Coroană Imperială', Icon: CrownIcon, description: 'Simbolul devotamentului nobil' },
  { id: 'trandafir', name: 'Inimă & Trandafir', Icon: RoseIcon, description: 'Iubire pasională eternă' },
  { id: 'fleur-de-lis', name: 'Floare de Lys Regală', Icon: FleurDeLisIcon, description: 'Puritate și distincție aristocrată' },
  { id: 'initiale', name: 'Monogramă Inițiale', Icon: QuillIcon, description: 'Gravură manuală cu inițialele voastre' }
];

const POETIC_TEMPLATES = [
  {
    id: 'dragoste-eterna',
    title: 'Dragoste Eternă',
    recipient: 'Iubita Mea Suflet Pereche',
    sender: 'Al tău pentru totdeauna',
    text: 'Privesc acești trandafiri și știu că nicio petală din lume nu poate cuprinde tot ce simt pentru tine. În fiecare zi în care îmi zâmbești, timpul se oprește în loc, iar universul devine o simplă ramă pentru privirea ta. Te iubesc dincolo de cuvinte, dincolo de anotimpuri, cu fiecare bătaie a inimii mele.'
  },
  {
    id: 'aniversare',
    title: 'Aniversare Regală',
    recipient: 'Pentru Cea Mai Minunată Femeie',
    sender: 'Cu infinită recunoștință și dragoste',
    text: 'Fiecare an alături de tine este o pagină aurită dintr-o poveste fără sfârșit. Îți mulțumesc pentru râsetele împărtășite, pentru căldura din priviri și pentru că faci din fiecare zi obișnuită o sărbătoare regală. La mulți ani, iubirea mea!'
  },
  {
    id: 'cerere-viitor',
    title: 'Promisiune & Cerere',
    recipient: 'Reginei Inimii Mele',
    sender: 'Cel ce te adoră',
    text: 'Tu ești lumina care transformă orice umbră în diamant și liniștea în care îmi găsesc mereu acasă. Vreau ca fiecare răsărit să te găsească în brațele mele și fiecare buchet din viața ta să-ți amintească de jurământul meu solemn. Vrei să scriem viitorul împreună?'
  },
  {
    id: 'reconciliere',
    title: 'Iertare & Împăcare',
    recipient: 'Pentru Inima Ta Bună',
    sender: 'Din tot sufletul',
    text: 'Orgoliul pălește în fața dragostei adevărate, iar tăcerea dintre noi a fost cel mai greu ecou. Îți dăruiesc acești trandafiri ca pe o rugăminte sinceră și o promisiune că voi prețui fiecare secundă în care îmi ești aproape. Iartă-mă și lasă-mă să-ți readuc zâmbetul.'
  },
  {
    id: 'admirator-secret',
    title: 'Admirator Secret',
    recipient: 'Unei Femei De Neuitat',
    sender: 'Un Admirator Care Te Privește Cu Fascinație',
    text: 'Unele sentimente sunt prea pure pentru a fi risipite în vorbe de rând. Treci prin lume lăsând în urmă o lumină pe care puțini știu să o prețuiască la adevărata ei măreție. Acest buchet poartă un gând sincer de admirație și speranța că îți va lumina ziua la fel cum prezența ta luminează totul în jur.'
  }
];

export default function VintageLoveLetterModal({ isOpen, onClose, onApplyLetter }) {
  const [selectedPaper, setSelectedPaper] = useState('pergament-ars');
  const [selectedWax, setSelectedWax] = useState('bordeaux');
  const [selectedEmblem, setSelectedEmblem] = useState('coroana');
  const [customInitials, setCustomInitials] = useState('A & I');
  const [fontFamily, setFontFamily] = useState('Playfair Display, Georgia, serif');
  const [recipientName, setRecipientName] = useState(POETIC_TEMPLATES[0].recipient);
  const [senderName, setSenderName] = useState(POETIC_TEMPLATES[0].sender);
  const [letterBody, setLetterBody] = useState(POETIC_TEMPLATES[0].text);
  const [isSealedView, setIsSealedView] = useState(false);
  const [isStampingAnimation, setIsStampingAnimation] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('stardust_love_letter');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.paper) setSelectedPaper(parsed.paper);
        if (parsed.wax) setSelectedWax(parsed.wax);
        if (parsed.emblem) setSelectedEmblem(parsed.emblem);
        if (parsed.initials) setCustomInitials(parsed.initials);
        if (parsed.recipient) setRecipientName(parsed.recipient);
        if (parsed.sender) setSenderName(parsed.sender);
        if (parsed.text) setLetterBody(parsed.text);
      }
    } catch {
      // fallback to default
    }
  }, []);

  if (!isOpen) return null;

  const currentPaper = PAPER_TYPES.find((p) => p.id === selectedPaper) || PAPER_TYPES[0];
  const currentWax = WAX_COLORS.find((w) => w.id === selectedWax) || WAX_COLORS[0];
  const currentEmblemObj = SEAL_EMBLEMS.find((e) => e.id === selectedEmblem) || SEAL_EMBLEMS[0];
  const EmblemIcon = currentEmblemObj.Icon;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleApplyTemplate = (tmpl) => {
    setRecipientName(tmpl.recipient);
    setSenderName(tmpl.sender);
    setLetterBody(tmpl.text);
    playLuxuryChime(880);
    showToast(`Șablonul „${tmpl.title}” a fost aplicat.`);
  };

  const handleStampWax = () => {
    setIsStampingAnimation(true);
    playWaxSealBreakSound();
    setTimeout(() => {
      setIsStampingAnimation(false);
      playLuxuryChime(1040);
      showToast('Sigiliul regal din ceară naturală a fost aplicat cu succes!');
    }, 600);
  };

  const handleToggleSealedEnvelope = () => {
    if (!isSealedView) {
      playWaxSealBreakSound();
      setIsSealedView(true);
    } else {
      playLuxuryChime(920);
      setIsSealedView(false);
    }
  };

  const handleSaveAndApply = () => {
    const letterData = {
      paper: selectedPaper,
      paperName: currentPaper.name,
      wax: selectedWax,
      waxName: currentWax.name,
      waxColorHex: currentWax.hex,
      emblem: selectedEmblem,
      emblemName: currentEmblemObj.name,
      initials: customInitials,
      recipient: recipientName,
      sender: senderName,
      text: letterBody,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('stardust_love_letter', JSON.stringify(letterData));
    playLuxuryChime(960);
    
    if (onApplyLetter) {
      onApplyLetter(letterData);
    }
    window.dispatchEvent(new CustomEvent('love-letter-applied', { detail: letterData }));
    showToast('Scrisoarea regală a fost atașată buchetului!');
    setTimeout(() => onClose(), 800);
  };

  return (
    <div 
      id="vintage-love-letter-modal"
      className="modal-overlay" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 2, 6, 0.85)',
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
        id="vintage-love-letter-modal-dialog"
        className="modal-content"
        style={{
          background: 'linear-gradient(135deg, #170611 0%, #090106 100%)',
          border: '1.5px solid rgba(225, 29, 72, 0.4)',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '1040px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(225, 29, 72, 0.2)',
          color: '#ffffff',
          overflow: 'hidden'
        }}
      >
        {/* Top Header */}
        <div style={{
          padding: '20px 26px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.35)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #881337, #4c0519)',
              border: '1.5px solid #f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(245, 158, 11, 0.35)'
            }}>
              <ParchmentScrollIcon size={22} color="#fef08a" />
            </div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: '#fbcfe8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <QuillIcon size={13} color="#f43f5e" />
                <span>NOSTALGIE ARISTOCRATICĂ • CALIGRAFIE DE ATELIER</span>
              </div>
              <h2 id="modal-love-letter-title" style={{ fontSize: '1.45rem', margin: '2px 0 0', fontFamily: 'Cinzel, Georgia, serif', color: '#ffffff' }}>
                Scrisoare de Dragoste pe Pergament cu Sigiliu Regal de Ceară
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              id="btn-toggle-envelope-preview"
              onClick={handleToggleSealedEnvelope}
              className="btn btn-secondary btn-sm"
              style={{
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Eye size={14} color="#f59e0b" />
              <span>{isSealedView ? 'Deschide Scrisoarea Pergament' : 'Previzualizează Plicul Sigilat'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Închide fereastra"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Controls & Templates, Right Live Parchment Sheet */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 26px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '28px'
        }}>
          {/* LEFT COLUMN: Customizer Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 1. Quick Inspiration Templates */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbcfe8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  1. Alege Inspirația Poetică (Șabloane de Salon):
                </label>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {POETIC_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    id={`btn-template-${tmpl.id}`}
                    type="button"
                    onClick={() => handleApplyTemplate(tmpl)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '12px',
                      padding: '5px 10px',
                      color: '#fdf2f8',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    <Heart size={11} color="#f43f5e" />
                    <span>{tmpl.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Paper Selection */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbcfe8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                2. Suport Texturat & Tip Pergament:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PAPER_TYPES.map((paper) => {
                  const isSelected = selectedPaper === paper.id;
                  return (
                    <button
                      key={paper.id}
                      id={`btn-paper-${paper.id}`}
                      type="button"
                      onClick={() => {
                        setSelectedPaper(paper.id);
                        playLuxuryChime(760);
                      }}
                      style={{
                        background: isSelected ? 'rgba(225, 29, 72, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '14px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '18px', height: '18px', borderRadius: '4px', background: paper.bgColor, border: '1px solid #78350f', display: 'inline-block' }} />
                        <div>
                          <strong style={{ fontSize: '0.86rem', color: isSelected ? '#ffffff' : '#e2e8f0', display: 'block' }}>
                            {paper.name}
                          </strong>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{paper.tag}</span>
                        </div>
                      </div>
                      {isSelected && <Check size={16} color="#f43f5e" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Wax Seal Color & Emblem */}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbcfe8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  3. Punct de Ceară & Sigiliu Regal:
                </label>
                <button
                  type="button"
                  id="btn-stamp-wax-sound"
                  onClick={handleStampWax}
                  style={{
                    background: 'rgba(217, 119, 6, 0.2)',
                    border: '1px solid #d97706',
                    borderRadius: '10px',
                    padding: '3px 8px',
                    color: '#fef08a',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Simulează presarea ștampilei din alamă pe ceara fierbinte"
                >
                  <WaxSealStampIcon size={12} color="#fef08a" />
                  <span>Ștanțează Ceara (Audio)</span>
                </button>
              </div>

              {/* Wax Color Palette */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px' }}>
                {WAX_COLORS.map((wax) => {
                  const isSelected = selectedWax === wax.id;
                  return (
                    <button
                      key={wax.id}
                      id={`btn-wax-${wax.id}`}
                      type="button"
                      onClick={() => {
                        setSelectedWax(wax.id);
                        playLuxuryChime(820);
                      }}
                      style={{
                        background: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? `2px solid ${wax.hex}` : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '8px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle at 35% 35%, ${wax.hex}, ${wax.secondary})`,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.4)'
                      }} />
                      <div style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#ffffff', display: 'block', lineHeight: 1.1 }}>{wax.name.split(' ')[0]}</span>
                        <span style={{ fontSize: '0.64rem', color: '#94a3b8' }}>{wax.label.split(' ')[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Seal Emblem Choices */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {SEAL_EMBLEMS.map((emblem) => {
                  const isSelected = selectedEmblem === emblem.id;
                  const Icon = emblem.Icon;
                  return (
                    <button
                      key={emblem.id}
                      id={`btn-emblem-${emblem.id}`}
                      type="button"
                      onClick={() => {
                        setSelectedEmblem(emblem.id);
                        playLuxuryChime(900);
                      }}
                      style={{
                        background: isSelected ? 'rgba(225, 29, 72, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '8px 4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                      title={emblem.description}
                    >
                      <Icon size={16} color={isSelected ? '#fda4af' : '#cbd5e1'} />
                      <span style={{ fontSize: '0.66rem', color: isSelected ? '#ffffff' : '#94a3b8', textAlign: 'center' }}>
                        {emblem.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Initials Input if emblem is initials */}
              {selectedEmblem === 'initiale' && (
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '0.72rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
                    Inițiale Gravate pe Ștampilă (ex: A & I):
                  </label>
                  <input 
                    type="text"
                    id="input-wax-initials"
                    maxLength={7}
                    value={customInitials}
                    onChange={(e) => setCustomInitials(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.07)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      color: '#fef08a',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      letterSpacing: '1px',
                      outline: 'none',
                      fontFamily: 'Cinzel, serif'
                    }}
                  />
                </div>
              )}
            </div>

            {/* 4. Text Content Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                  Destinatar / Apelativ Regal:
                </label>
                <input 
                  type="text"
                  id="input-letter-recipient"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Iubita Mea / Numele Destinatarei"
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                  Textul Scrisorii de Dragoste:
                </label>
                <textarea 
                  rows={4}
                  id="input-letter-body"
                  value={letterBody}
                  onChange={(e) => setLetterBody(e.target.value)}
                  placeholder="Scrie din inimă mesajul tău..."
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    lineHeight: 1.5,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                  Semnătură Expeditor:
                </label>
                <input 
                  type="text"
                  id="input-letter-sender"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Al tău pentru totdeauna, Andrei"
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Realistic Live Parchment Sheet or Sealed Envelope */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            {!isSealedView ? (
              /* --- Unfolded Vintage Parchment Sheet --- */
              <div 
                className="parchment-sheet"
                style={{
                  width: '100%',
                  maxWidth: '460px',
                  background: currentPaper.bgColor,
                  color: currentPaper.textColor,
                  padding: '36px 32px 32px',
                  borderRadius: currentPaper.burnedEdges ? '16px 28px 14px 24px' : '18px',
                  boxShadow: currentPaper.boxShadow,
                  border: currentPaper.borderStyle,
                  position: 'relative',
                  transform: 'rotate(-0.5deg)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '440px'
                }}
              >
                {/* Decorative Antique Corner Vignettes */}
                <div style={{ position: 'absolute', top: '12px', left: '14px', opacity: 0.45 }}>
                  <SparkleIcon size={16} color={selectedPaper === 'nocturne-noir' ? '#fef08a' : '#78350f'} />
                </div>
                <div style={{ position: 'absolute', top: '12px', right: '14px', opacity: 0.45 }}>
                  <SparkleIcon size={16} color={selectedPaper === 'nocturne-noir' ? '#fef08a' : '#78350f'} />
                </div>

                {/* Letter Header */}
                <div style={{ textAlign: 'center', borderBottom: `1px dashed ${selectedPaper === 'nocturne-noir' ? 'rgba(254, 240, 138, 0.3)' : 'rgba(120, 53, 15, 0.3)'}`, paddingBottom: '14px', marginBottom: '18px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase', color: selectedPaper === 'nocturne-noir' ? '#fde047' : '#92400e', fontWeight: 800 }}>
                    <FleurDeLisIcon size={12} color="currentColor" />
                    <span>STARDUST FLORALS • ATELIER REGAL</span>
                    <FleurDeLisIcon size={12} color="currentColor" />
                  </div>
                  <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '0.98rem', fontWeight: 800, marginTop: '4px' }}>
                    {recipientName || 'Prețioasa Mea Iubită'}
                  </div>
                </div>

                {/* Body Text */}
                <div style={{
                  fontFamily: fontFamily,
                  fontStyle: 'italic',
                  fontSize: '0.96rem',
                  lineHeight: 1.7,
                  flex: 1,
                  textAlign: 'left',
                  whiteSpace: 'pre-line',
                  textShadow: selectedPaper === 'nocturne-noir' ? '0 0 8px rgba(254, 240, 138, 0.4)' : 'none'
                }}>
                  {letterBody || 'Scrie propriul mesaj în câmpul din stânga...'}
                </div>

                {/* Footer Signature & Wax Seal Stamp */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '24px', paddingTop: '12px', borderTop: `1px dashed ${selectedPaper === 'nocturne-noir' ? 'rgba(254, 240, 138, 0.3)' : 'rgba(120, 53, 15, 0.3)'}` }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', opacity: 0.75, display: 'block' }}>Cu aleasă prețuire:</span>
                    <div style={{ fontFamily: 'Playfair Display, cursive', fontSize: '1.05rem', fontWeight: 800 }}>
                      {senderName || 'Al tău pentru totdeauna'}
                    </div>
                  </div>

                  {/* Physical 3D Wax Seal Stamp on Letter */}
                  <div 
                    onClick={handleStampWax}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 35%, ${currentWax.hex}, ${currentWax.secondary})`,
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                      border: '1.5px solid rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transform: isStampingAnimation ? 'scale(1.15) rotate(10deg)' : 'scale(1)',
                      transition: 'transform 0.25s ease'
                    }}
                    title="Apasă pentru a re-ștampila ceara cu efect sonor"
                  >
                    {selectedEmblem === 'initiale' ? (
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#fef08a', fontFamily: 'Cinzel, serif', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
                        {customInitials}
                      </span>
                    ) : (
                      <EmblemIcon size={22} color="#fef08a" />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* --- Sealed 3D Royal Envelope View --- */
              <div 
                id="sealed-envelope-card"
                style={{
                  width: '100%',
                  maxWidth: '440px',
                  background: 'linear-gradient(135deg, #1f0714, #0d0208)',
                  border: '2px solid #e11d48',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '0.76rem', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
                  PLIC CERAT DE SALON • SIGILAT MANUAL
                </div>
                
                <h3 style={{ fontSize: '1.35rem', margin: '0 0 16px', color: '#ffffff', fontFamily: 'Cinzel, Georgia, serif' }}>
                  Pentru: {recipientName || 'Persoana Iubită'}
                </h3>

                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '24px', lineHeight: 1.5 }}>
                  Scrisoarea este împăturită manual în plic de catifea texturată și sigilată ermetic cu ceară caldă {currentWax.name}.
                </p>

                {/* Big Wax Seal Button to Break and Reveal */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <button
                    type="button"
                    id="btn-break-seal-envelope"
                    onClick={handleToggleSealedEnvelope}
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 35%, ${currentWax.hex}, ${currentWax.secondary})`,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 2px 6px rgba(255, 255, 255, 0.5)',
                      border: '2px solid rgba(255, 255, 255, 0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    title="Apasă pentru a rupe sigiliul și a deschide scrisoarea"
                  >
                    {selectedEmblem === 'initiale' ? (
                      <span style={{ fontSize: '1rem', fontWeight: 900, color: '#fef08a', fontFamily: 'Cinzel, serif' }}>
                        {customInitials}
                      </span>
                    ) : (
                      <EmblemIcon size={32} color="#fef08a" />
                    )}
                  </button>
                </div>

                <div style={{ fontSize: '0.74rem', color: '#fbcfe8', fontWeight: 700 }}>
                  Apasă pe sigiliul din ceară pentru a deschide scrisoarea
                </div>
              </div>
            )}

            {/* Notification Toast */}
            {toastMessage && (
              <div style={{
                marginTop: '16px',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10b981',
                borderRadius: '12px',
                padding: '8px 16px',
                color: '#a7f3d0',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Check size={14} color="#10b981" />
                <span>{toastMessage}</span>
              </div>
            )}

          </div>
        </div>

        {/* Modal Footer Actions */}
        <div style={{
          padding: '16px 26px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'rgba(0, 0, 0, 0.35)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#94a3b8' }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>Caligrafiat manual de florar cu cerneală rezistentă • Inclus în pachetul buchetului</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '12px', padding: '8px 16px' }}
            >
              Închide
            </button>
            <button
              type="button"
              id="btn-confirm-love-letter"
              onClick={handleSaveAndApply}
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: '12px',
                padding: '8px 20px',
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                boxShadow: '0 4px 16px rgba(225, 29, 72, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <WaxSealStampIcon size={16} color="#ffffff" />
              <span>Atașează Scrisoarea Regală la Buchet</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
