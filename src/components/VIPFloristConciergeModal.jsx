import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Sparkles, Clock, ShieldCheck, 
  Truck, Heart, HelpCircle, ExternalLink, RefreshCw, 
  Copy, Check, User, ChevronRight, MessageCircle 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { playLuxuryChime } from '../utils/audioAlert';
import { 
  RoseIcon, CrownIcon, SparkleIcon, PerfumeBottleIcon, 
  SecretMaskIcon, ConciergeBellIcon, DiamondIcon, ScrollDiplomaIcon 
} from './CustomIcons';

const QUICK_PROMPTS = [
  {
    id: 'colors',
    label: 'Combinații de culori & efect sclipici',
    Icon: RoseIcon,
    iconColor: '#f43f5e',
    query: 'Ce combinație de culori și sclipici arată cel mai spectaculos la lumina serii?'
  },
  {
    id: 'express',
    label: 'Urgență livrare AZI (2-4 ore)',
    Icon: Truck,
    iconColor: '#10b981',
    query: 'Pot primi un buchet astăzi în 2-4 ore în București sau Ilfov?'
  },
  {
    id: 'video_qr',
    label: 'Cum pregătesc felicitarea Video QR?',
    Icon: Sparkles,
    iconColor: '#a855f7',
    query: 'Cum funcționează felicitarea video QR și sigiliul de ceară?'
  },
  {
    id: 'fragrance',
    label: 'Ce parfum de atelier să aleg?',
    Icon: PerfumeBottleIcon,
    iconColor: '#ec4899',
    query: 'Ce parfum de nișă recomandați pentru infuzarea pe ambalaj?'
  },
  {
    id: 'secret',
    label: 'Livrare 100% secretă & anonimă',
    Icon: SecretMaskIcon,
    iconColor: '#38bdf8',
    query: 'Vreau să trimit buchetul anonim, fără să știe că e de la mine. Cum procedăm?'
  },
  {
    id: 'glitter',
    label: 'Sclipiciul cade pe haine?',
    Icon: DiamondIcon,
    iconColor: '#fbbf24',
    query: 'Sclipiciul de diamant cade pe haine sau pe mâini la atingere?'
  }
];

export default function VIPFloristConciergeModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'concierge',
      text: 'Bună ziua! Sunt Elena Vasilescu, Maestrul Florar de serviciu în atelierul Stardust. Vă ajut cu mare bucurie să alegeți aranjamentul ideal, să verificați disponibilitatea pe rutele de livrare rapidă sau să pregătim felicitarea video QR. Despre ce ocazie este vorba?',
      timestamp: 'Acum',
      suggestions: [
        'Combinații de culori & efect sclipici',
        'Urgență livrare AZI (2-4 ore)',
        'Cum pregătesc felicitarea Video QR?',
        'Ce parfum de atelier să aleg?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  const generateConciergeResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    // 1. Culori & Sclipici & Bicolor
    if (q.includes('culoar') || q.includes('sclipici') || q.includes('negru') || q.includes('rosu') || q.includes('roz') || q.includes('bicolor') || q.includes('dual')) {
      return {
        text: 'Creația noastră semnătură este Buchetul Signature Dual Noir & Rouge: petalele exterioare de catifea neagră mată creează un contrast hipnotizant cu roșul aprins din mijloc. Peste fiecare boboc aplicăm manual pulbere de diamant cosmetic micro-prismatic 0.15mm — în lumina serii sau a lumânărilor, buchetul are un efect tridimensional spectaculos. Iar sclipiciul este fixat ecologic și nu cade pe haine deloc!',
        cardData: {
          title: 'Buchet Signature Dual Noir & Rouge',
          price: '269 RON',
          badge: 'FAVORIT VIRAL TIKTOK',
          link: '/checkout?bouquet=signature-dual-noir-rouge&discount=STARDUST10',
          image: '/images/buchet-dual-noir-rouge-angle.webp',
          actionText: 'Comandă cu -10% Reducere'
        },
        suggestions: ['Urgență livrare AZI (2-4 ore)', 'Cum pregătesc felicitarea Video QR?', 'Ce parfum de atelier să aleg?']
      };
    }

    // 2. Livrare express azi / ore / transport
    if (q.includes('livr') || q.includes('azi') || q.includes('urgent') || q.includes('ore') || q.includes('timp') || q.includes('bucuresti') || q.includes('ilfov')) {
      return {
        text: 'Da, desigur! Avem propria flotă de curieri VIP în mașini climatizate la 18°C constant. Pentru București și Ilfov, dacă plasați comanda acum, plecarea este prioritară în 2-4 ore. Pentru alte orașe din țară (Cluj, Timișoara, Iași etc.), livrarea se realizează în 24 de ore în cutie rigidă termo-izolantă anti-șoc.',
        cardData: {
          title: 'Livrare Express Dedicată (2-4h)',
          price: '0 RON (București)',
          badge: 'FLOTĂ CLIMATIZATĂ 18°C',
          link: '/checkout',
          actionText: 'Verifică Adresa în Checkout'
        },
        suggestions: ['Livrare 100% secretă & anonimă', 'Combinații de culori & efect sclipici', 'Vreau să vorbesc pe WhatsApp']
      };
    }

    // 3. Felicitare Video QR
    if (q.includes('video') || q.includes('qr') || q.includes('felicit') || q.includes('ceara') || q.includes('sigiliu')) {
      return {
        text: 'Felicitarea Video QR este cel mai emoționant moment al cadoului! Dumneavoastră introduceți orice link video (YouTube, TikTok, Google Drive, Loom sau un clip privat). Noi tipărim codul QR pe carton satinat de 300g și îl sigilăm manual cu ceară naturală roșie cu monograma atelierului. La deschidere, destinatara scanează codul cu camera telefonului și vizionează instant clipul dumneavoastră personalizat! Opțional, puteți seta chiar și un cod PIN de securitate din 4 cifre.',
        cardData: {
          title: 'Felicitare Video QR cu Sigiliu Ceară',
          price: 'GRATUIT (Inclus)',
          badge: 'EXCLUSIVITATE ATELIER',
          link: '/video-qr',
          actionText: 'Testează Simulatorul Video QR'
        },
        suggestions: ['Ce parfum de atelier să aleg?', 'Combinații de culori & efect sclipici', 'Urgență livrare AZI (2-4 ore)']
      };
    }

    // 4. Parfum de nișă pe ambalaj
    if (q.includes('parfum') || q.includes('miros') || q.includes('esenta') || q.includes('vanilie') || q.includes('oud') || q.includes('damasc')) {
      return {
        text: 'Pentru o experiență multisenzorială regală, pulverizăm manual pe hârtia de mătase și catifeaua din cutie una dintre cele 4 esențe de nișă: Trandafir Damascen & Bujor (romantic și diafan, persistență 48h), Vanilie Bourbon & Ambră (cald și gurmand, 72h), Oud Nobil & Șofran (lemnos și maiestuos, 72h+) sau varianta Hipoalergenică Natural Pur fără parfum. Infuzarea este oferită cadou de către atelier!',
        cardData: {
          title: 'Infuzie Olfactivă de Atelier',
          price: 'GRATUIT (Inclus)',
          badge: '4 ESENȚE DISPONIBILE',
          link: '/#fragrance-selector-section',
          actionText: 'Descoperă Piramida Olfactivă'
        },
        suggestions: ['Combinații de culori & efect sclipici', 'Livrare 100% secretă & anonimă', 'Cum pregătesc felicitarea Video QR?']
      };
    }

    // 5. Livrare Secretă / Anonimă
    if (q.includes('secret') || q.includes('anonim') || q.includes('surpriz') || q.includes('admirator')) {
      return {
        text: 'Absolut! Opțiunea de Livrare Secretă este foarte solicitată. Pe documentul AWB și pe cutie nu apare absolut niciun detaliu despre expeditor. Curierul nostru înmânează buchetul menționând doar că este o surpriză specială, iar în plic putem include indiciul ales de dumneavoastră (de exemplu: „De la un admirator secret”). Doar dumneavoastră decideți dacă și când doriți să vă dezvăluiți identitatea!',
        cardData: {
          title: 'Opțiune Livrare 100% Anonimă',
          price: 'GRATUIT',
          badge: 'DISCREȚIE TOTALĂ GARANTATĂ',
          link: '/checkout',
          actionText: 'Bifează Livrare Secretă în Pasul 3'
        },
        suggestions: ['Urgență livrare AZI (2-4 ore)', 'Combinații de culori & efect sclipici', 'Vreau să vorbesc pe WhatsApp']
      };
    }

    // 6. Preț / Reduceri / Cupoane
    if (q.includes('pret') || q.includes('reduc') || q.includes('cupon') || q.includes('discount') || q.includes('cost')) {
      return {
        text: 'Buchetele noastre cu sclipici de diamant pornesc de la 189 RON (Petite Sparkle), buchetul cel mai popular este Signature Dual (269 RON), iar cutiile gigant de lux ajung la 389 RON. Vă ofer cu drag codul secret de atelier STARDUST10 pentru 10% reducere imediată la checkout, iar dacă lăsați o recenzie foto după primire, primiți un voucher de 20% reducere (STARDUST20)!',
        cardData: {
          title: 'Cupon Special Atelier: STARDUST10',
          price: '-10% Reducere Instant',
          badge: 'VALABIL PENTRU DVS.',
          link: '/checkout?discount=STARDUST10',
          actionText: 'Aplică Cuponul la Checkout'
        },
        suggestions: ['Combinații de culori & efect sclipici', 'Urgență livrare AZI (2-4 ore)', 'Ce parfum de atelier să aleg?']
      };
    }

    // Default response
    return {
      text: 'Vă mulțumesc pentru întrebare! În calitate de florar de atelier, mă asigur personal că fiecare floare este de calibru mare, proaspătă și pudrată cu sclipici impecabil. Puteți comanda direct de pe site cu confirmare imediată pe WhatsApp sau mă puteți contacta direct pentru asistență specială.',
      cardData: {
        title: 'Asistență Prioritară Florar',
        price: 'Răspuns Imediat',
        badge: 'ATELIER LIVE',
        link: '/checkout',
        actionText: 'Continuă Comanda'
      },
      suggestions: ['Combinații de culori & efect sclipici', 'Urgență livrare AZI (2-4 ore)', 'Cum pregătesc felicitarea Video QR?']
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Append user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: 'Chiar acum'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    playLuxuryChime();

    // Simulate concierge typing and response
    setTimeout(() => {
      const response = generateConciergeResponse(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'concierge',
        text: response.text,
        cardData: response.cardData,
        suggestions: response.suggestions,
        timestamp: 'Chiar acum'
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playLuxuryChime();
    }, 700);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCouponCopied(true);
    playLuxuryChime();
    setTimeout(() => setCouponCopied(false), 2500);
  };

  const handleEscalateToWhatsApp = () => {
    const lastUserQuery = [...messages].reverse().find(m => m.sender === 'user')?.text || 'Aș dori asistență din atelier';
    const waText = `Bună ziua, Elena! Discutam în asistentul VIP de pe site despre: "${lastUserQuery}". Aș dori asistență directă pentru finalizarea comenzii.`;
    window.open(`https://wa.me/40733814871?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div 
      className="modal-overlay"
      style={{
        zIndex: 10000,
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 1, 3, 0.82)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="vip-concierge-modal-card"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #1e0915 0%, #0d0208 100%)',
          border: '1.5px solid #e11d48',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '540px',
          height: '88vh',
          maxHeight: '740px',
          display: 'flex',
          flexDirection: 'column',
          color: '#ffffff',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(225, 29, 72, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div style={{
          padding: '18px 22px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e11d48, #9f1239)',
                border: '2px solid #fbcfe8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <ConciergeBellIcon size={22} color="#ffffff" />
              </div>
              <span style={{
                position: 'absolute',
                bottom: '1px',
                right: '1px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid #0d0208',
                boxShadow: '0 0 8px #10b981'
              }} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <strong style={{ fontSize: '1rem', color: '#ffffff', letterSpacing: '0.3px' }}>
                  Elena Vasilescu
                </strong>
                <span style={{
                  fontSize: '0.66rem',
                  background: 'rgba(244, 63, 94, 0.2)',
                  color: '#fb7185',
                  border: '1px solid rgba(244, 63, 94, 0.4)',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: 800
                }}>
                  MAESTRU FLORAR
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                <span>Live în atelier • Răspunde în timp real</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-concierge"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Închide asistentul concierge"
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick Topic Chips Strip */}
        <div style={{
          padding: '10px 16px',
          background: 'rgba(0, 0, 0, 0.25)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {QUICK_PROMPTS.map((prompt) => {
            const IconComp = prompt.Icon;
            return (
              <button
                key={prompt.id}
                type="button"
                onClick={() => handleSendMessage(prompt.query)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '5px 11px',
                  color: '#fbcfe8',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  flexShrink: 0,
                  transition: 'all 0.18s ease'
                }}
              >
                <IconComp size={13} color={prompt.iconColor} />
                <span>{prompt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Messages Log */}
        <div style={{
          flex: 1,
          padding: '20px 18px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((msg) => {
            const isBot = msg.sender === 'concierge';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '92%',
                  alignSelf: isBot ? 'flex-start' : 'flex-end'
                }}
              >
                <div style={{
                  background: isBot 
                    ? 'rgba(255, 255, 255, 0.06)' 
                    : 'linear-gradient(135deg, #e11d48, #be123c)',
                  border: isBot ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #f43f5e',
                  borderRadius: isBot ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                  padding: '13px 16px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
                }}>
                  {msg.text}

                  {/* Recommendation Card if available */}
                  {msg.cardData && (
                    <div style={{
                      marginTop: '12px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1.5px solid #f59e0b',
                      borderRadius: '14px',
                      padding: '12px',
                      color: '#ffffff'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#fef08a', background: 'rgba(245, 158, 11, 0.2)', padding: '2px 6px', borderRadius: '8px', letterSpacing: '0.5px' }}>
                          {msg.cardData.badge}
                        </span>
                        <strong style={{ fontSize: '0.86rem', color: '#fb7185' }}>
                          {msg.cardData.price}
                        </strong>
                      </div>

                      <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>
                        {msg.cardData.title}
                      </div>

                      {msg.cardData.image && (
                        <img 
                          src={msg.cardData.image} 
                          alt={msg.cardData.title}
                          style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                        />
                      )}

                      <a
                        href={msg.cardData.link}
                        onClick={onClose}
                        className="btn btn-primary btn-sm"
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          fontSize: '0.78rem',
                          padding: '7px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'linear-gradient(135deg, #e11d48, #be123c)'
                        }}
                      >
                        <span>{msg.cardData.actionText}</span>
                        <ChevronRight size={14} />
                      </a>
                    </div>
                  )}
                </div>

                <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px', padding: '0 4px' }}>
                  {isBot ? 'Elena Vasilescu • ' : 'Tu • '} {msg.timestamp}
                </span>

                {/* Inline follow-up suggestion chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => handleSendMessage(sug)}
                        style={{
                          background: 'rgba(225, 29, 72, 0.12)',
                          border: '1px solid rgba(225, 29, 72, 0.3)',
                          borderRadius: '12px',
                          padding: '4px 9px',
                          color: '#fda4af',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '14px',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fb7185', animation: 'pulse 1s infinite' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fb7185', animation: 'pulse 1s infinite 0.2s' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fb7185', animation: 'pulse 1s infinite 0.4s' }} />
                <span style={{ fontSize: '0.74rem', color: '#fda4af', marginLeft: '4px' }}>
                  Elena consultă registrul atelierului...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer Actions & Input */}
        <div style={{
          padding: '12px 16px 16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(10, 2, 7, 0.95)'
        }}>
          {/* WhatsApp Escalation Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              Preferi consultanță directă pe mobil?
            </span>
            <button
              type="button"
              id="btn-concierge-transfer-whatsapp"
              onClick={handleEscalateToWhatsApp}
              style={{
                background: 'rgba(37, 211, 102, 0.15)',
                border: '1px solid #25d366',
                color: '#4ade80',
                borderRadius: '12px',
                padding: '3px 9px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <MessageCircle size={13} color="#25d366" />
              <span>Deschide WhatsApp cu Elena</span>
            </button>
          </div>

          {/* Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }} 
            style={{ display: 'flex', gap: '8px' }}
          >
            <input 
              id="input-concierge-user-query"
              type="text"
              placeholder="Întreabă florarul despre buchete, culori, livrare..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '14px',
                padding: '11px 14px',
                color: '#ffffff',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              id="btn-concierge-send"
              disabled={!inputText.trim()}
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: '14px',
                padding: '0 16px',
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                opacity: inputText.trim() ? 1 : 0.6,
                cursor: inputText.trim() ? 'pointer' : 'not-allowed'
              }}
              aria-label="Trimite întrebarea"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
