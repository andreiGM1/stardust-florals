import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, ArrowRight, ArrowLeft, Check, Sparkles, Heart, 
  RotateCcw, Compass, ShieldCheck, Zap 
} from 'lucide-react';
import { 
  RoseIcon, DiamondIcon, CrownIcon, RingIcon, 
  SparkleIcon, GiftBoxIcon, RibbonIcon, TeddyIcon, 
  SecretMaskIcon 
} from './CustomIcons';
import { PRODUCTS, COLOR_OPTIONS, ADDONS } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';
import { playLuxuryChime } from '../utils/audioAlert';

export default function GiftFinderQuizModal({ isOpen, onClose }) {
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [recipient, setRecipient] = useState(null);
  const [occasion, setOccasion] = useState(null);
  const [budget, setBudget] = useState(null);

  if (!isOpen) return null;

  // Question 1: Destinatar
  const RECIPIENTS = [
    {
      id: 'partner',
      title: 'Iubită sau Logodnică',
      desc: 'Romantism intens, pasiune și efect wow de neuitat',
      Icon: RingIcon,
      accent: '#e11d48'
    },
    {
      id: 'wife',
      title: 'Soție & Căsnicie',
      desc: 'Eleganță nobilă, recunoștință și sentimente eterne',
      Icon: CrownIcon,
      accent: '#be123c'
    },
    {
      id: 'mother',
      title: 'Mamă sau Figură Maternă',
      desc: 'Căldură sufletească, rafinament și prețuire eternă',
      Icon: RoseIcon,
      accent: '#f43f5e'
    },
    {
      id: 'crush_secret',
      title: 'Admirator Secret / Spontan',
      desc: 'Mister, surpriză anonimă și curiozitate absolută',
      Icon: SecretMaskIcon,
      accent: '#0284c7'
    },
    {
      id: 'friend_bday',
      title: 'Prietenă / Zi de Naștere',
      desc: 'Bucurie festivă, strălucire virală și cadou chic',
      Icon: SparkleIcon,
      accent: '#d97706'
    }
  ];

  // Question 2: Ocazie
  const OCCASIONS = [
    {
      id: 'proposal_deep',
      title: 'Cerere în Căsătorie / Mare Moment',
      desc: 'Impact vizual monumental, cel mai important moment',
      Icon: RingIcon
    },
    {
      id: 'anniversary',
      title: 'Aniversare de Relație / Cuplu',
      desc: 'Celebrăm anii petrecuți împreună cu o amintire vie',
      Icon: Heart
    },
    {
      id: 'birthday',
      title: 'Zi de Naștere sau Onomastică',
      desc: 'Sărbătorim persoana dragă cu cel mai viral buchet',
      Icon: GiftBoxIcon
    },
    {
      id: 'reconciliation',
      title: 'Împăcare / Gest de Iertare',
      desc: 'O declarație sinceră ce topește orice supărare',
      Icon: RoseIcon
    },
    {
      id: 'spontaneous',
      title: 'Fără o ocazie anume (Doar Dragoste)',
      desc: 'Cele mai frumoase gesturi sunt cele neașteptate',
      Icon: DiamondIcon
    }
  ];

  // Question 3: Buget
  const BUDGETS = [
    {
      id: 'under_200',
      title: 'Sub 200 RON',
      desc: 'Delicat, intim și spectaculos (9 Trandafiri)',
      range: '149 - 189 RON'
    },
    {
      id: 'mid_200_300',
      title: '200 - 300 RON',
      desc: 'Alegerea No. 1: Ediția Atelier Bicolor sau Regal',
      range: '249 - 269 RON',
      isPopular: true
    },
    {
      id: 'vip_300_500',
      title: '300 - 500 RON',
      desc: 'Pachet Complet VIP: Buchet + Cutie Catifea + Panglică',
      range: '349 - 420 RON'
    },
    {
      id: 'luxury_over_500',
      title: 'Peste 500 RON',
      desc: 'Aranjamente Monumentale de 35 până la 101 Trandafiri',
      range: '500 - 999 RON'
    }
  ];

  // Calculator de recomandare inteligentă
  const calculateRecommendation = () => {
    let recommendedBouquetId = 'signature-dual-noir-rouge';
    let recommendedColorId = 'bicolor-noir-rouge';
    let recommendedAddons = ['panglica-caligrafica'];
    let reasonText = 'Combinația iconică din atelierul nostru: trandafirii negri catifelați cu sclipici galactic scot în evidență trandafirii roșii pasionali din centru.';
    let matchPercentage = 98;

    if (budget === 'under_200') {
      recommendedBouquetId = 'petite-sparkle';
      recommendedColorId = 'rosu-pasiune';
      recommendedAddons = ['panglica-caligrafica'];
      reasonText = '9 Trandafiri mari de Ecuador pudrați cu pulbere de diamant cosmetic, luminițe LED și panglică personalizată caligrafiată manual.';
      matchPercentage = 95;
    } else if (budget === 'luxury_over_500' || (occasion === 'proposal_deep' && budget === 'vip_300_500')) {
      recommendedBouquetId = 'cutie-gigant';
      recommendedColorId = 'bicolor-noir-rouge';
      recommendedAddons = ['cutie-catifea-gravata', 'panglica-caligrafica'];
      reasonText = '35 de trandafiri nobili într-o cutie rotundă regală de catifea cu plăcuță de alamă aurită 24K gravată laser cu data voastră.';
      matchPercentage = 99;
    } else if (recipient === 'mother') {
      recommendedBouquetId = 'regal-glamour';
      recommendedColorId = 'roz-pudrat';
      recommendedAddons = ['cutie-catifea-gravata'];
      reasonText = 'Trandafiri roz pudrat și alb perlat infuzați cu sclipici argintiu, emanați o eleganță discretă de salon pentru cea mai iubită mamă.';
      matchPercentage = 97;
    } else if (recipient === 'crush_secret') {
      recommendedBouquetId = 'signature-dual-noir-rouge';
      recommendedColorId = 'negru-galactic';
      recommendedAddons = ['panglica-caligrafica'];
      reasonText = 'Mister total cu trandafiri negri cosmici și opțiunea gratuită de livrare surpriză anonimă cu indiciu secret la ușa ei.';
      matchPercentage = 96;
    } else if (recipient === 'friend_bday') {
      recommendedBouquetId = 'regal-glamour';
      recommendedColorId = 'auriu-luxury';
      recommendedAddons = ['ursulet-plus', 'panglica-caligrafica'];
      reasonText = 'Strălucire glam aurie TikTok-virală cu ursuleț de pluș pufos, creând cel mai fotografiat moment al petrecerii.';
      matchPercentage = 96;
    } else {
      // Default VIP signature match
      recommendedBouquetId = 'signature-dual-noir-rouge';
      recommendedColorId = 'bicolor-noir-rouge';
      recommendedAddons = ['cutie-catifea-gravata', 'panglica-caligrafica'];
      reasonText = 'Creația de vârf a atelierului Stardust: contrastul regal negru-roșu rubiniu, felicitare video pe cod QR și cutia de catifea gravată laser.';
      matchPercentage = 99;
    }

    const bouquet = PRODUCTS.find(p => p.id === recommendedBouquetId) || PRODUCTS[0];
    const color = COLOR_OPTIONS.find(c => c.id === recommendedColorId) || COLOR_OPTIONS[0];
    const addonsData = ADDONS.filter(a => recommendedAddons.includes(a.id));

    let totalPrice = bouquet.price;
    addonsData.forEach(a => { totalPrice += a.price; });

    return {
      bouquet,
      color,
      addons: addonsData,
      reasonText,
      matchPercentage,
      totalPrice
    };
  };

  const handleSelectRecipient = (id) => {
    setRecipient(id);
    playLuxuryChime();
    setCurrentStep(2);
  };

  const handleSelectOccasion = (id) => {
    setOccasion(id);
    playLuxuryChime();
    setCurrentStep(3);
  };

  const handleSelectBudget = (id) => {
    setBudget(id);
    playLuxuryChime();
    setCurrentStep(4);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setRecipient(null);
    setOccasion(null);
    setBudget(null);
  };

  const handleApplyAndOrder = () => {
    const result = calculateRecommendation();
    const params = new URLSearchParams();
    params.set('bouquet', result.bouquet.id);
    params.set('color', result.color.id);
    params.set('discount', 'STARDUST10');
    
    // Transmitere addons
    const addonIds = result.addons.map(a => a.id).join(',');
    if (addonIds) {
      params.set('addons', addonIds);
    }

    onClose();
    navigate(`/checkout?${params.toString()}`);
  };

  const result = currentStep === 4 ? calculateRecommendation() : null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 1, 3, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1.5px solid var(--border-light)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(225, 29, 72, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh',
          animation: 'fadeInScale 0.25s ease-out'
        }}
      >
        {/* Header cu bară de progres */}
        <div style={{ padding: '20px 26px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--rose-600), #881337)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Compass size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.12rem', margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Asistent Cadou Inteligent</span>
                <span className="tag-badge" style={{ fontSize: '0.68rem', padding: '2px 8px', margin: 0 }}>60 SECUNDE</span>
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {currentStep < 4 ? `Pasul ${currentStep} din 3 • Găsim cadoul ideal` : 'Rețeta ta personalizată de atelier'}
              </span>
            </div>
          </div>

          <button 
            type="button" 
            id="btn-close-gift-quiz"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Închide asistentul de cadouri"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '3px', background: 'var(--border-subtle)' }}>
          <div 
            style={{ 
              width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%', 
              height: '100%', 
              background: 'linear-gradient(90deg, var(--rose-600), #f43f5e)',
              transition: 'width 0.3s ease'
            }} 
          />
        </div>

        {/* Body Container */}
        <div style={{ padding: '26px', overflowY: 'auto', flex: 1 }}>
          
          {/* PASUL 1: DESTINATAR */}
          {currentStep === 1 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <span className="tag-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <Heart size={12} color="var(--rose-600)" /> PASUL 1
                </span>
                <h2 style={{ fontSize: '1.5rem', margin: '4px 0 6px', color: 'var(--text-main)' }}>
                  Pentru cine dorești să fie cadoul?
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  Alege persoana specială pentru a adapta tonul și cromatica aranjamentului.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {RECIPIENTS.map((item) => {
                  const ItemIcon = item.Icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      id={`quiz-recipient-${item.id}`}
                      onClick={() => handleSelectRecipient(item.id)}
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        border: '1.5px solid var(--border-light)',
                        background: 'var(--bg-surface)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                        transition: 'all 0.2s',
                        color: 'var(--text-main)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--rose-600)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-light)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${item.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <ItemIcon size={20} color={item.accent} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.98rem', display: 'block', marginBottom: '3px' }}>{item.title}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, display: 'block' }}>{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASUL 2: OCAZIE */}
          {currentStep === 2 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <span className="tag-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <Sparkles size={12} color="var(--rose-600)" /> PASUL 2
                </span>
                <h2 style={{ fontSize: '1.5rem', margin: '4px 0 6px', color: 'var(--text-main)' }}>
                  Ce eveniment sau atmosferă sărbătoriți?
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  Fiecare ocazie cere un grad specific de strălucire și personalizare.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {OCCASIONS.map((item) => {
                  const ItemIcon = item.Icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      id={`quiz-occasion-${item.id}`}
                      onClick={() => handleSelectOccasion(item.id)}
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        border: '1.5px solid var(--border-light)',
                        background: 'var(--bg-surface)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                        transition: 'all 0.2s',
                        color: 'var(--text-main)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--rose-600)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-light)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(225, 29, 72, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <ItemIcon size={20} color="var(--rose-600)" />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.98rem', display: 'block', marginBottom: '3px' }}>{item.title}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, display: 'block' }}>{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                style={{ marginTop: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              >
                <ArrowLeft size={14} /> Înapoi la pasul anterior
              </button>
            </div>
          )}

          {/* PASUL 3: BUGET */}
          {currentStep === 3 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <span className="tag-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <DiamondIcon size={12} color="var(--rose-600)" /> PASUL 3
                </span>
                <h2 style={{ fontSize: '1.5rem', margin: '4px 0 6px', color: 'var(--text-main)' }}>
                  În ce buget dorești să te încadrezi?
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                  Toate opțiunile includ gratuit felicitarea cu cod QR video și bateriile pentru micro-LED-uri.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {BUDGETS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    id={`quiz-budget-${item.id}`}
                    onClick={() => handleSelectBudget(item.id)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: item.isPopular ? '2px solid var(--rose-600)' : '1.5px solid var(--border-light)',
                      background: item.isPopular ? 'var(--rose-50)' : 'var(--bg-surface)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                      color: 'var(--text-main)'
                    }}
                    onMouseEnter={(e) => {
                      if (!item.isPopular) e.currentTarget.style.borderColor = 'var(--rose-600)';
                    }}
                    onMouseLeave={(e) => {
                      if (!item.isPopular) e.currentTarget.style.borderColor = 'var(--border-light)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '1rem' }}>{item.title}</strong>
                        {item.isPopular && (
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'var(--rose-600)', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>
                            ALEGEREA POPULARĂ
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>{item.desc}</span>
                    </div>
                    <span style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--rose-600)', whiteSpace: 'nowrap' }}>
                      {item.range}
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                style={{ marginTop: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              >
                <ArrowLeft size={14} /> Înapoi la pasul anterior
              </button>
            </div>
          )}

          {/* PASUL 4: RECOMANDARE PERSONALIZATĂ DE ATELIER */}
          {currentStep === 4 && result && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              {/* Badge Potrivire */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
                  <ShieldCheck size={14} />
                  <span>{result.matchPercentage}% POTRIVIRE PERFECTĂ CU RĂSPUNSURILE TALE</span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
                >
                  <RotateCcw size={13} /> Reia chestionarul
                </button>
              </div>

              {/* Cardul Produsului Recomandat */}
              <div style={{ background: 'var(--bg-surface)', border: '1.5px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {/* Poză Buchet */}
                  <div style={{ width: '100%', maxWidth: '240px', minHeight: '190px', position: 'relative', flexShrink: 0 }}>
                    <img 
                      src={result.bouquet.image} 
                      alt={result.bouquet.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <span className="tag-badge" style={{ margin: 0, fontSize: '0.7rem' }}>RECOMANDAT 100%</span>
                    </div>
                  </div>

                  {/* Detalii Recomandare */}
                  <div style={{ padding: '20px', flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', margin: '0 0 6px', color: 'var(--text-main)' }}>
                        {result.bouquet.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: result.color.hex, display: 'inline-block' }} />
                          {result.color.name}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                        {result.reasonText}
                      </p>
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--rose-600)' }}>
                        {formatPrice(result.totalPrice)}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 700 }}>
                        Include Codul VIP STARDUST10 (-10%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accesorii Recomandate Incluse */}
                {result.addons.length > 0 && (
                  <div style={{ padding: '14px 20px', background: 'var(--rose-50)', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.82rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--rose-700)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <GiftBoxIcon size={14} color="var(--rose-600)" /> Pachet complet de cadou:
                    </span>
                    {result.addons.map((a, i) => (
                      <span key={a.id} style={{ color: 'var(--text-main)', background: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        + {a.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Ce include gratuit pachetul */}
              <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', padding: '14px 18px', border: '1px solid var(--border-light)', marginBottom: '22px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                  Ce primești gratuit în acest pachet de atelier:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={14} color="#10b981" /> <span>Felicitare carton satinat cu cod QR video</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={14} color="#10b981" /> <span>Ghirlandă micro-LED caldă + baterii</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={14} color="#10b981" /> <span>Praf de diamant cosmetic fără cădere</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={14} color="#10b981" /> <span>Garanție de strălucire intactă 3+ ani</span>
                  </div>
                </div>
              </div>

              {/* Buton CTA principal */}
              <button
                type="button"
                id="btn-apply-quiz-recommendation"
                onClick={handleApplyAndOrder}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center', gap: '10px' }}
              >
                <span>Comandă Pachetul Recomandat la Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
