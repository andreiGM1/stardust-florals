import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Heart, Star, ChevronDown, Camera, ZoomIn, Search, ThumbsUp, ThumbsDown, Check, Flame, Smartphone, Truck, Droplets, Compass } from 'lucide-react';
import { PRODUCTS, FAQS, REAL_PORTFOLIO_GALLERY } from '../data/products';
import DeliveryEstimatorWidget from '../components/DeliveryEstimatorWidget';
import TikTokVideoReels from '../components/TikTokVideoReels';
import VoiceMemoTestimonials from '../components/VoiceMemoTestimonials';
import SavingsSustainabilityCalculator from '../components/SavingsSustainabilityCalculator';
import CustomRibbonSimulator from '../components/CustomRibbonSimulator';
import VelvetBoxEngravingCustomizer from '../components/VelvetBoxEngravingCustomizer';
import FloralFragranceSelector from '../components/FloralFragranceSelector';
import MicroLedLightSimulator from '../components/MicroLedLightSimulator';
import GourmetChampagneStrawberriesSelector from '../components/GourmetChampagneStrawberriesSelector';
import AudioWaveformEngravingSelector from '../components/AudioWaveformEngravingSelector';
import PopUpCard3DSimulator from '../components/PopUpCard3DSimulator';
import VintageMusicBoxConfigurator from '../components/VintageMusicBoxConfigurator';
import RoyalUnboxingSimulator from '../components/RoyalUnboxingSimulator';
import PetalLaserEngraver from '../components/PetalLaserEngraver';
import FlowerCareGuideWidget from '../components/FlowerCareGuideWidget';
import CeramicAromaDiffuserWidget from '../components/CeramicAromaDiffuserWidget';
import HolographicCard3DSimulator from '../components/HolographicCard3DSimulator';
import SecretDrawerBoxWidget from '../components/SecretDrawerBoxWidget';
import SmokeCascadeSimulator from '../components/SmokeCascadeSimulator';
import CosmicLocketSimulator from '../components/CosmicLocketSimulator';
import MechatronicRoseSimulator from '../components/MechatronicRoseSimulator';
import { useCurrency } from '../context/CurrencyContext';
import { 
  RoseIcon, DiamondIcon, CrownIcon, SparkleIcon, GiftBoxIcon, 
  ScrollDiplomaIcon, WaxSealStampIcon, FleurDeLisIcon, PerfumeBottleIcon,
  CameraPlusIcon, CouponVoucherIcon, ConciergeBellIcon, ClimateVanIcon, ThermometerGaugeIcon,
  ParchmentScrollIcon, QuillIcon, CalendarHeartIcon, FairyLightsIcon,
  ChampagneFlutesIcon, StrawberryGoldIcon, AudioWaveformIcon, VoiceRecordMicIcon,
  PopUpGreetingCardIcon, FlyingPetalsIcon, MusicBoxCrankIcon, MusicMelodyRollIcon,
  UnboxingVaultIcon, SatinRibbonBowIcon, LaserPetalEngraverIcon, PetalMagnifierIcon,
  FlowerCareKitIcon, StemCut45Icon, CeramicMedallionIcon, AromaWavesIcon,
  HolographicPrismIcon, LenticularEyeIcon, SecretDrawerIcon, EngagementRingIcon,
  SmokeCascadeIcon, DryIceFlaskIcon, CosmicLocketIcon, JewelerLoupeIcon,
  MechatronicRoseIcon, HeartbeatPulseIcon
} from '../components/CustomIcons';
import ClimateDeliveryMapSimulator from '../components/ClimateDeliveryMapSimulator';

export default function HomePage({ onOpenLeadModal, onOpenGiftQuiz, onOpenCertificateModal, onOpenReviewModal, onOpenConcierge, onOpenLoveLetter, onOpenAnniversary, onOpenLedSimulator, onOpenGourmetTasting, onOpenAudioEngraving, onOpenPopUpCard, onOpenMusicBox, onOpenUnboxing, onOpenPetalLaser, onOpenCareGuide, onOpenAromaMedallion, onOpenHoloCard, onOpenSecretDrawer, onOpenSmokeCascade, onOpenCosmicLocket, onOpenMechatronicRose }) {
  const { formatPrice } = useCurrency();
  const [openFaqIndices, setOpenFaqIndices] = useState([0]);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [faqCategory, setFaqCategory] = useState('all');
  const [faqFeedback, setFaqFeedback] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('stardust_faq_feedback') || '{}');
    } catch {
      return {};
    }
  });

  const toggleFaq = (idx) => {
    setOpenFaqIndices((prev) => 
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleFaqFeedback = (idx, type) => {
    const updated = { ...faqFeedback, [idx]: type };
    setFaqFeedback(updated);
    localStorage.setItem('stardust_faq_feedback', JSON.stringify(updated));
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '36px', paddingBottom: '54px', background: 'radial-gradient(circle at 50% 15%, rgba(225, 29, 72, 0.1), transparent 70%)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
            {/* Left Column: Text & CTA */}
            <div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '22px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--rose-50)', color: 'var(--rose-600)', border: '1px solid var(--border-light)', padding: '8px 18px', borderRadius: '30px', fontSize: '0.84rem', fontWeight: 700 }}>
                  <Heart size={15} color="var(--rose-600)" fill="var(--rose-600)" />
                  <span>Creație Autentică: Trandafiri Bicolori cu Sclipici Diamant</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
                  <Flame size={14} color="#dc2626" />
                  <span>STOC LIMITAT: Doar 3 buchete disponibile azi</span>
                </div>
              </div>

              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', lineHeight: 1.15, marginBottom: '22px' }}>
                Trandafiri care <br />
                <span className="highlight-rose">strălucesc</span> la propriu.
              </h1>

              <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.65 }}>
                Descoperă buchetul viral creat în atelierul nostru: <strong>trandafiri negri misterioși pe margine și roșu rubiniu în centru</strong>, infuzați manual cu pulbere de diamant cosmetic și ghirlandă de micro-LED-uri.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px', alignItems: 'center' }}>
                <Link to="/checkout?bouquet=signature-dual-noir-rouge" className="btn btn-primary btn-lg">
                  <span>Comandă Buchetul Signature</span>
                  <ArrowRight size={20} />
                </Link>
                <button 
                  type="button" 
                  id="btn-hero-start-quiz"
                  onClick={onOpenGiftQuiz}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Compass size={18} color="var(--rose-600)" />
                  <span>Găsește Cadoul Ideal (60s)</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-concierge"
                  onClick={onOpenConcierge || (() => window.dispatchEvent(new CustomEvent('open-vip-concierge')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Discută live cu Elena Vasilescu, Maestrul Florar Stardust"
                >
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <ConciergeBellIcon size={18} color="#e11d48" />
                    <span style={{ position: 'absolute', top: '-2px', right: '-3px', width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
                  </div>
                  <span>Concierge VIP Live</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-led-simulator"
                  onClick={onOpenLedSimulator || (() => window.dispatchEvent(new CustomEvent('open-micro-led-simulator')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Simulează efectul de noapte cu micro-LED-uri și licurici"
                >
                  <FairyLightsIcon size={18} color="#f59e0b" />
                  <span>Simulator Luminițe LED</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-gourmet"
                  onClick={onOpenGourmetTasting || (() => window.dispatchEvent(new CustomEvent('open-gourmet-tasting')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Pachet Gourmet: Moët & Chandon + Căpșuni Belgiane cu Foiță de Aur 24K"
                >
                  <ChampagneFlutesIcon size={18} color="#e11d48" />
                  <span>Pachet Gourmet Moët</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-audio-engraving"
                  onClick={onOpenAudioEngraving || (() => window.dispatchEvent(new CustomEvent('open-audio-engraving')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Gravură Audio & Spectrogramă Foiță de Aur 24K pe Carton de Colecție"
                >
                  <AudioWaveformIcon size={18} color="#f59e0b" />
                  <span>Gravură Audio 24K</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-popup-card"
                  onClick={onOpenPopUpCard || (() => window.dispatchEvent(new CustomEvent('open-popup-card-simulator')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Felicitare Pop-Up 3D cu Petale Plutitoare & Plic Sigilat"
                >
                  <PopUpGreetingCardIcon size={18} color="#e11d48" />
                  <span>Felicitare Pop-Up 3D</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-music-box"
                  onClick={onOpenMusicBox || (() => window.dispatchEvent(new CustomEvent('open-music-box-configurator')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Cutie Muzicală Mecanică Vintage în Baza Aranjamentului"
                >
                  <MusicBoxCrankIcon size={18} color="#f59e0b" />
                  <span>Cutie Muzicală Vintage</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-unboxing"
                  onClick={onOpenUnboxing || (() => window.dispatchEvent(new CustomEvent('open-royal-unboxing')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Simulator Interactiv de Despachetare Cadou — 4 Straturi de Lux"
                >
                  <UnboxingVaultIcon size={18} color="#e11d48" />
                  <span>Unboxing Regal 3D</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-laser-engraver"
                  onClick={onOpenPetalLaser || (() => window.dispatchEvent(new CustomEvent('open-petal-laser-engraver')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Gravură Micro-Laser pe Petală Naturală Stabilizată (Monogramă / Mesaj Secret)"
                >
                  <LaserPetalEngraverIcon size={18} color="#f43f5e" />
                  <span>Gravură Laser Petală</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-care-guide"
                  onClick={onOpenCareGuide || (() => window.dispatchEvent(new CustomEvent('open-care-guide-modal')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Ghid Interactiv de Îngrijire & Longevitate a Trandafirilor cu Sclipici Diamant (Calculator 14+ Zile)"
                >
                  <FlowerCareKitIcon size={18} color="#10b981" />
                  <span>Calculator Longevitate & Îngrijire</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-aroma-medallion"
                  onClick={onOpenAromaMedallion || (() => window.dispatchEvent(new CustomEvent('open-ceramic-aroma-medallion')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Simulator Interactiv de Difuzie Olfactivă & Medalion Ceramic Poros de Grasse"
                >
                  <CeramicMedallionIcon size={18} color="#0284c7" />
                  <span>Medalion Ceramic & Parfum Grasse</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-holo-card"
                  onClick={onOpenHoloCard || (() => window.dispatchEvent(new CustomEvent('open-holographic-card-modal')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Simulator Interactiv de Felicitare Holografică 3D cu Folie Lenticulară Japoneză"
                >
                  <HolographicPrismIcon size={18} color="#c084fc" />
                  <span>Felicitare Holografică 3D</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-secret-drawer"
                  onClick={onOpenSecretDrawer || (() => window.dispatchEvent(new CustomEvent('open-secret-drawer-modal')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Simulator Interactiv de Cutie Secretă cu Sertar Glisant Catifelat & Bijuterie Surpriză"
                >
                  <SecretDrawerIcon size={18} color="#f43f5e" />
                  <span>Cutie Secretă cu Sertar VIP</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-smoke-cascade"
                  onClick={onOpenSmokeCascade || (() => window.dispatchEvent(new CustomEvent('open-smoke-cascade-modal')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Simulator Interactiv de Efect Teatral „Smoke & Dry Ice Cascade” — Vapori Reci Aromatizați la Deschidere"
                >
                  <SmokeCascadeIcon size={18} color="#f43f5e" />
                  <span>Efect Teatral Vapori Reci</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-cosmic-locket"
                  onClick={onOpenCosmicLocket || (() => window.dispatchEvent(new CustomEvent('open-cosmic-locket-modal')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Configurator Interactiv de Pandantiv Hermetic Secret cu Capsulă de Pulbere de Diamant Cosmic & Mesaj Micro-Gravat"
                >
                  <CosmicLocketIcon size={18} color="#f43f5e" />
                  <span>Pandantiv Diamant Cosmic</span>
                </button>
                <button 
                  type="button" 
                  id="btn-hero-open-mechatronic-rose"
                  onClick={onOpenMechatronicRose || (() => window.dispatchEvent(new CustomEvent('open-mechatronic-rose-modal')))}
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  title="Configurator Interactiv de Trandafir Mecatronic cu Petale Motorizate & Senzor de Puls Cardiac"
                >
                  <MechatronicRoseIcon size={18} color="#f43f5e" />
                  <span>Trandafir Mecatronic & Puls</span>
                </button>
                <Link to="/colectie" className="btn btn-sm" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>
                  Toată Colecția →
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#e11d48" /> Poze 100% reale din atelier și de la livrare
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#e11d48" /> Sclipici cosmetic biodegradabil fixat sigur pe petale
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#e11d48" /> Felicitare cu cod QR video inclusă gratuit la fiecare comandă
                </span>
              </div>
            </div>

            {/* Right Column: Hero Real Showcase Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ background: 'var(--bg-card)', border: '2px solid var(--border-light)', borderRadius: '32px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', position: 'relative' }}>
                <img 
                  src="/images/buchet-dual-noir-rouge-hero.webp" 
                  alt="Buchet Stardust Dual Noir & Rouge - Poza Reală" 
                  style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(25, 8, 12, 0.88)', backdropFilter: 'blur(10px)', color: '#fff', padding: '16px 20px', borderRadius: '18px', border: '1px solid rgba(254, 205, 211, 0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#fb7185', letterSpacing: '1px', textTransform: 'uppercase' }}>FOTO REALĂ ATELIER</span>
                    <strong style={{ fontSize: '1.05rem', display: 'block', color: '#ffffff' }}>Signature Dual Noir & Rouge</strong>
                  </div>
                  <Link to="/checkout?bouquet=signature-dual-noir-rouge" className="btn btn-primary btn-sm">
                    269 RON
                  </Link>
                </div>
              </div>

              {/* Floating Lifestyle Badge */}
              <div style={{ position: 'absolute', top: '-18px', right: '-18px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '10px 14px', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                <img 
                  src="/images/client-surpriza-metrou-lifestyle.webp" 
                  alt="Client cu buchetul în metrou" 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 800, display: 'block' }}>● LIVRARE ÎN METROU</span>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>Emoție Reală</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Live Delivery City Estimator Widget */}
          <div style={{ marginTop: '48px' }}>
            <DeliveryEstimatorWidget />
          </div>

          {/* Interactive Climate-Controlled GPS Route Simulator Showcase (Task 50) */}
          <div style={{ marginTop: '32px' }}>
            <ClimateDeliveryMapSimulator 
              orderId="DEMO-VIP"
              recipientName="Persoana Iubită"
              recipientAddress="București, Sector 1, Calea Victoriei"
            />
          </div>
        </div>
      </section>

      {/* Real Portfolio Gallery Section */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="tag-badge">
              <Camera size={14} /> PORTOFOLIU REAL
            </span>
            <h2>Fiecare Buchet, O Operă de Artă</h2>
            <p>Imagini autentice realizate direct în atelier și în timpul livrării către destinatarii fericiți.</p>
          </div>

          <div className="grid-3">
            {REAL_PORTFOLIO_GALLERY.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedGalleryImg(item)}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'transform 0.25s, box-shadow 0.25s' }}
                className="gallery-card-item"
              >
                <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(25, 8, 12, 0.85)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px' }}>
                    {item.tag}
                  </span>
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.85)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rose-600)' }}>
                    <ZoomIn size={16} />
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedGalleryImg && (
        <div className="modal-overlay" onClick={() => setSelectedGalleryImg(null)}>
          <div className="modal-content-luxury" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', padding: '20px' }}>
            <img 
              src={selectedGalleryImg.image} 
              alt={selectedGalleryImg.title} 
              style={{ width: '100%', maxHeight: '540px', objectFit: 'contain', borderRadius: '14px', marginBottom: '16px' }}
            />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{selectedGalleryImg.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '18px' }}>{selectedGalleryImg.caption}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/checkout?bouquet=signature-dual-noir-rouge" className="btn btn-primary btn-md" style={{ flex: 1 }}>
                Vreau un Buchet ca Acesta (269 RON)
              </Link>
              <button onClick={() => setSelectedGalleryImg(null)} className="btn btn-secondary btn-md">
                Închide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vertical TikTok Video Reels Experience */}
      <TikTokVideoReels />

      {/* Real WhatsApp Voice Memo Testimonials */}
      <VoiceMemoTestimonials />

      {/* Post-Order UGC Review & 20% Discount Invitation Banner (Task 48) */}
      <section style={{ padding: '0 0 40px', background: 'var(--bg-subtle)' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(225, 29, 72, 0.15) 0%, rgba(17, 4, 10, 0.95) 100%)',
            border: '1.5px solid #e11d48',
            borderRadius: '24px',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            boxShadow: '0 10px 30px rgba(225, 29, 72, 0.18)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '600px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(225, 29, 72, 0.2)', border: '1px solid #fb7185', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CameraPlusIcon size={26} color="#fb7185" />
              </div>
              <div>
                <span className="tag-badge" style={{ background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8', marginBottom: '4px' }}>
                  COMUNITATEA STARDUST • RECOMPENSĂ FOTO
                </span>
                <h3 style={{ fontSize: '1.3rem', margin: '4px 0 6px', color: '#ffffff' }}>
                  Ai trăit magia Stardust? Încarcă o poză și primești 20% reducere!
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.86rem', margin: 0, lineHeight: 1.45 }}>
                  Arată-ne sclipiciul trandafirilor la desfacerea cutiei și deblochezi instant codul secret VIP <strong>STARDUST20</strong> valabil 365 de zile.
                </p>
              </div>
            </div>

            <button
              type="button"
              id="btn-homepage-open-review"
              onClick={() => {
                if (onOpenReviewModal) onOpenReviewModal();
                else window.dispatchEvent(new CustomEvent('open-post-order-review'));
              }}
              className="btn btn-primary btn-md"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                whiteSpace: 'nowrap'
              }}
            >
              <CouponVoucherIcon size={16} color="#ffffff" />
              <span>Trimite Poză & Ia Cuponul 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bestsellers Showcase */}
      <section className="section" id="bestsellers" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="tag-badge">COLECȚIA GLITTER 2026</span>
            <h2>Alege Aranjamentul Tău Preferat</h2>
            <p>Lucrate manual cu migală de artiști florari pasionați în România.</p>
          </div>

          <div className="grid-3">
            {PRODUCTS.slice(0, 3).map((prod) => (
              <div key={prod.id} className={`product-card ${prod.isBestseller ? 'bestseller' : ''}`}>
                <div className="product-img-wrap">
                  <img src={prod.image} alt={prod.name} loading="lazy" />
                  <span className={`card-badge-top ${prod.isBestseller ? 'viral' : ''}`}>
                    {prod.badge}
                  </span>
                </div>
                <div className="product-body">
                  <h3 className="product-title">{prod.name}</h3>
                  <p className="product-desc">{prod.description}</p>

                  <div className="card-footer-row">
                    <div className="price-box">
                      <span className="old-price">{formatPrice(prod.oldPrice)}</span>
                      <span className="current-price">{formatPrice(prod.price)}</span>
                    </div>
                    <Link to={`/checkout?bouquet=${prod.id}`} className="btn btn-primary btn-sm">
                      Comandă
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/colectie" className="btn btn-secondary btn-md">
              <span>Vezi toate modelele din colecție</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gift Finder Quiz Interactive Section */}
      <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-light)', borderRadius: '28px', padding: '40px 36px', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '30px' }}>
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span className="tag-badge" style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Compass size={13} color="var(--rose-600)" /> ASISTENT INTELIGENT 60 SECUNDE
                </span>
                <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 800 }}>
                  ● Recomandare 100% Personalizată
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', margin: '0 0 14px', lineHeight: 1.25, color: 'var(--text-main)' }}>
                Nu știi ce buchet să alegi? <br />
                <span className="highlight-rose">Găsim noi cadoul perfect pentru ea.</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>
                Răspunde la 3 întrebări simple (destinatar, ocazie și buget) iar meșteșugarul florar îți recomandă instant combinația optimă de trandafiri cu sclipici, accesoriile potrivite și codul de reducere VIP.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '280px' }}>
              <button 
                type="button"
                id="btn-homepage-start-quiz"
                onClick={onOpenGiftQuiz}
                className="btn btn-primary btn-lg"
                style={{ justifyContent: 'center', gap: '10px', boxShadow: '0 8px 25px rgba(225, 29, 72, 0.35)' }}
              >
                <Compass size={20} />
                <span>Pornește Chestionarul Rapid</span>
                <ArrowRight size={18} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <SparkleIcon size={12} color="var(--rose-600)" /> Durează doar 1 minut
                </span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} color="#10b981" /> Include cod STARDUST10
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Stardust Section */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="tag-badge">MAGIA STARDUST</span>
            <h2>De Ce Strălucesc Trandafirii Noștri Altfel?</h2>
            <p>O îmbinare rafinată între măiestrie florală și detalii create pentru un efect copleșitor.</p>
          </div>

          <div className="grid-4">
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <DiamondIcon size={38} color="var(--rose-600)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Pulbere Diamant Cosmetică</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Particule ecologice ultra-fine certificate. Nu se scutură pe îmbrăcăminte și nu afectează durata de viață a trandafirilor.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <SparkleIcon size={38} color="#eab308" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Micro-LED-uri Calde Incluse</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Ghirlande miniaturale discrete cu 3 moduri de iluminare și baterii camuflate între tulpini. Magie pură pe întuneric.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <RoseIcon size={38} color="var(--rose-600)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Trandafiri Proaspeți Ecuador</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Tulpini robuste de 60-70 cm și boboci bogați, recoltați la comanda ta pentru o garanție de prospețime de minim 7-10 zile.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <CrownIcon size={38} color="#d97706" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Design Bicolor Unicat</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Tehnică proprie de contur negru galactic pe margine și roșu rubiniu în centru, pentru un contrast vizual de neegalat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video QR Teaser Section */}
      <section className="section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="tag-badge">EXCLUSIVITATE STARDUST</span>
              <h2 style={{ fontSize: '2.6rem', margin: '14px 0 18px', lineHeight: 1.2 }}>
                Felicitare Fizică cu <br />
                <span className="highlight-rose">Cod QR Video Personalizat</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '28px' }}>
                Transformă un simplu buchet într-o amintire pentru toată viața! Destinatarul primește o felicitare elegantă din carton texturat cu sigiliu de ceară. Doar apropie camera telefonului de codul QR și videoclipul tău secret de pe TikTok, YouTube sau din galerie pornește pe ecran.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/video-qr" className="btn btn-primary btn-md">
                  <span>Testează Simulatorul de Cod QR</span>
                  <ArrowRight size={17} />
                </Link>
                <button onClick={onOpenLeadModal} className="btn btn-secondary btn-md" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <GiftBoxIcon size={16} color="var(--rose-600)" />
                  <span>Obține Felicitarea Gratuit</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--rose-50), var(--bg-subtle))', border: '2px dashed var(--rose-600)', padding: '24px', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '420px', transform: 'rotate(-1.5deg)' }}>
                <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '18px' }}>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--rose-600)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <SparkleIcon size={16} color="var(--rose-600)" />
                      <span>Stardust Florals</span>
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'var(--rose-50)', color: 'var(--rose-600)', padding: '3px 8px', borderRadius: '12px' }}>EXCLUSIV</span>
                  </div>
                  <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                    <div style={{ border: '1px solid var(--border-light)', padding: '6px', borderRadius: '10px', background: 'var(--bg-surface)', flexShrink: 0 }}>
                      <svg viewBox="0 0 100 100" width="105" height="105">
                        <rect width="100" height="100" fill="#ffffff" />
                        <rect x="8" y="8" width="24" height="24" fill="#20080f" rx="3" />
                        <rect x="12" y="12" width="16" height="16" fill="#ffffff" rx="2" />
                        <rect x="15" y="15" width="10" height="10" fill="#e11d48" rx="1" />
                        <rect x="68" y="8" width="24" height="24" fill="#20080f" rx="3" />
                        <rect x="72" y="12" width="16" height="16" fill="#ffffff" rx="2" />
                        <rect x="75" y="15" width="10" height="10" fill="#e11d48" rx="1" />
                        <rect x="8" y="68" width="24" height="24" fill="#20080f" rx="3" />
                        <rect x="12" y="72" width="16" height="16" fill="#ffffff" rx="2" />
                        <rect x="15" y="75" width="10" height="10" fill="#e11d48" rx="1" />
                        <rect x="36" y="10" width="6" height="6" fill="#20080f" />
                        <rect x="46" y="14" width="6" height="6" fill="#20080f" />
                        <rect x="36" y="24" width="6" height="6" fill="#20080f" />
                        <rect x="48" y="22" width="6" height="6" fill="#e11d48" />
                        <rect x="10" y="38" width="6" height="6" fill="#20080f" />
                        <rect x="42" y="38" width="16" height="16" fill="#20080f" rx="2" />
                        <rect x="66" y="38" width="6" height="6" fill="#20080f" />
                        <rect x="10" y="54" width="6" height="6" fill="#20080f" />
                        <rect x="36" y="60" width="6" height="6" fill="#20080f" />
                        <rect x="48" y="58" width="6" height="6" fill="#e11d48" />
                        <rect x="38" y="72" width="6" height="6" fill="#20080f" />
                        <rect x="62" y="74" width="8" height="6" fill="#20080f" />
                        <rect x="38" y="84" width="10" height="6" fill="#20080f" />
                        <rect x="70" y="84" width="14" height="6" fill="#20080f" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                        „Ești cea mai frumoasă floare din viața mea...”
                      </p>
                      <span style={{ fontSize: '0.72rem', color: '#047857', background: '#d1fae5', padding: '3px 8px', borderRadius: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Smartphone size={13} />
                        <span>Scanează cu camera</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Savings & Sustainability Calculator */}
      <SavingsSustainabilityCalculator />

      {/* Interactive Custom Calligraphic Ribbon Simulator */}
      <section className="section" style={{ background: 'var(--bg-subtle)', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge">NOU ÎN ATELIER • PERSONALIZARE REGALĂ</span>
            <h2>Panglică Satinată Caligrafiată cu Folie Aurie 24K</h2>
            <p>Scrie propriul mesaj de dragoste sau aniversare imprimat manual pe satin de mătase ori catifea.</p>
          </div>
          <CustomRibbonSimulator />
        </div>
      </section>

      {/* Interactive Velvet Box & Laser-Engraved Metal Plaque Customizer */}
      <section className="section" style={{ background: 'var(--bg-subtle)', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: 'var(--rose-50)', color: 'var(--rose-600)', border: '1px solid var(--border-light)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <DiamondIcon size={14} color="var(--rose-600)" />
              <span>EXCLUSIVITATE VIP • EDIȚIE DE COLECȚIE</span>
            </span>
            <h2>Cutie de Catifea cu Plăcuță Metalică Gravată Laser</h2>
            <p>Alege geometria cutiei de catifea fină și personalizează în timp real plăcuța metalică aurită sau argintată cu inițialele ori data voastră specială.</p>
          </div>
          <VelvetBoxEngravingCustomizer />
        </div>
      </section>

      {/* Configurator Interactiv de Luminițe Micro-LED cu Efect Licurici/Pulsare (Task 53) */}
      <section id="micro-led-showcase-section" className="section" style={{ background: 'linear-gradient(180deg, var(--bg-subtle) 0%, rgba(18, 4, 13, 0.96) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1020px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <FairyLightsIcon size={16} color="#d97706" />
              <span>SIMULATOR INTERACTIV DE ATELIER • GHIRLANDĂ MICRO-LED</span>
            </span>
            <h2 style={{ color: 'var(--text-main)' }}>Simulator de Luminițe Micro-LED & Licurici</h2>
            <p style={{ maxWidth: '680px', margin: '0 auto' }}>
              Experimentează în timp real cum arată buchetul tău Signature noaptea: testează modul static romantic, licuricii delicați sau respirația luminoasă ritmică.
            </p>
          </div>
          <MicroLedLightSimulator 
            isEmbedded={true} 
            onApplyMode={(data) => {
              if (onOpenLedSimulator) onOpenLedSimulator();
            }} 
          />
        </div>
      </section>

      {/* Selector Interactiv de Șampanie Moët & Căpșuni în Ciocolată Belgiană cu Foiță de Aur (Task 54) */}
      <section id="gourmet-experience-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(20, 3, 14, 0.98) 0%, rgba(9, 1, 6, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1020px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <StrawberryGoldIcon size={16} color="#db2777" />
              <span>EXPERIENȚĂ GOURMET HAUTE COUTURE • CALLEBAUT & MOËT</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Șampanie Moët & Căpșuni cu Foiță de Aur 24K</h2>
            <p style={{ maxWidth: '680px', margin: '0 auto', color: '#fda4af' }}>
              Alege asocierea supremă pentru buchetul tău: sticle nobile Moët & Chandon Rosé ori Brut și cutii de căpșuni proaspete glazurate manual în ciocolată belgiană Callebaut.
            </p>
          </div>
          <GourmetChampagneStrawberriesSelector 
            isEmbedded={true} 
            onApplyPackage={() => {
              if (onOpenGourmetTasting) onOpenGourmetTasting();
            }} 
          />
        </div>
      </section>

      {/* Task 55: Audio Waveform Engraving & 24K Gold Spectrogram Showcase Section */}
      <section id="audio-waveform-engraving-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(14, 6, 15, 0.98) 0%, rgba(6, 2, 7, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <AudioWaveformIcon size={16} color="#b45309" />
              <span>AMINTIRE ACUSTICĂ ETERNĂ • SPECTROGRAMĂ 24K & COD QR</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Gravură Audio Regală pe Carton de Colecție</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: '#fde68a' }}>
              Vocea ta capătă formă fizică: generăm frecvența sonoră a mesajului tău și o tipărim în foiță de aur 24K pe carton de lux de 450g, alături de un cod QR scanabil compatibil cu orice smartphone.
            </p>
          </div>
          <AudioWaveformEngravingSelector 
            isEmbedded={true} 
            onApplyEngraving={() => {
              if (onOpenAudioEngraving) onOpenAudioEngraving();
            }} 
          />
        </div>
      </section>

      {/* Task 56: 3D Pop-Up Greeting Card & Cascading Petals Showcase Section */}
      <section id="popup-card-showcase-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(22, 5, 16, 0.98) 0%, rgba(10, 2, 7, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fdf2f8', color: '#be123c', border: '1px solid #fbcfe8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <PopUpGreetingCardIcon size={16} color="#be123c" />
              <span>EXPERIENȚĂ VIRTUALĂ 3D • EFECT DE DESFACERE REGALĂ</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Felicitare Pop-Up 3D & Plic Sigilat cu Ceară Naturală</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: '#fda4af' }}>
              Descoperă arta papeteriei de lux: la deschiderea plicului, sculptura tridimensională se înalță spectaculos din felicitare, iar o cascadă diafană de petale parfumate se revarsă în aer.
            </p>
          </div>
          <PopUpCard3DSimulator 
            isEmbedded={true} 
            onApplyCard={() => {
              if (onOpenPopUpCard) onOpenPopUpCard();
            }} 
          />
        </div>
      </section>

      {/* Task 57: Vintage Mechanical Music Box Showcase Section */}
      <section id="vintage-music-box-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(24, 14, 6, 0.98) 0%, rgba(10, 6, 2, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MusicBoxCrankIcon size={16} color="#b45309" />
              <span>ARMONIE ACUSTICĂ NOBILĂ • MECANICĂ ELVEȚIANĂ</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Cutie Muzicală Mecanică Ascunsă în Baza Aranjamentului</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#fde68a' }}>
              Transformă buchetul într-un spectacol multisenzorial: mecanism vintage cu cilindru de alamă masivă și arc mecanic ce intonează capodopere romantice (La Vie En Rose, Lacul Lebedelor, Canon în D) la deschiderea cutiei de flori.
            </p>
          </div>
          <VintageMusicBoxConfigurator 
            isEmbedded={true} 
            onSaveConfig={() => {
              if (onOpenMusicBox) onOpenMusicBox();
            }} 
          />
        </div>
      </section>

      {/* Task 58: Royal Unboxing Experience 3D Simulator Showcase Section */}
      <section id="royal-unboxing-showcase-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(14, 6, 18, 0.98) 0%, rgba(8, 3, 10, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fdf2f8', color: '#be123c', border: '1px solid #fbcfe8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <UnboxingVaultIcon size={16} color="#be123c" />
              <span>EXPERIENȚĂ MULTISENZORIALĂ DESTINATAR • 4 STRATURI REGALE</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Royal Unboxing Experience™ — Despachetare 3D</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#fda4af' }}>
              Trăiește emoția primirii cadoului: explorează pas-cu-pas seiful exterior termo-protejat la 18°C, desfacerea hârtiei de mătase cu sigiliu cald de ceară, deznodarea panglicii de satin brodate și dezvăluirea trandafirilor cu sclipici diamant.
            </p>
          </div>
          <RoyalUnboxingSimulator 
            isEmbedded={true} 
            onApplyConfig={() => {
              if (onOpenUnboxing) onOpenUnboxing();
            }} 
          />
        </div>
      </section>

      {/* Task 59: Petal Laser Engraving Showcase Section */}
      <section id="petal-laser-engraving-showcase-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(16, 7, 18, 0.98) 0%, rgba(8, 2, 9, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fdf2f8', color: '#be123c', border: '1px solid #fbcfe8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <LaserPetalEngraverIcon size={16} color="#be123c" />
              <span>INOVAȚIE DE ATELIER • MICRO-LASER 0.2W PE PETALĂ VIE</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Gravură Laser pe Petală Naturală Stabilizată</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#fda4af' }}>
              Transformă trandafirul central într-un talisman etern: gravăm microscopic monograme, inițiale sau mesaje de dragoste infuzate cu pulbere de aur 24K direct pe fibra organică a petalei.
            </p>
          </div>
          <PetalLaserEngraver 
            isEmbedded={true} 
            onApplyConfig={() => {
              if (onOpenPetalLaser) onOpenPetalLaser();
            }} 
          />
        </div>
      </section>

      {/* Task 60: Flower Care & Longevity Calculator Showcase Section */}
      <section id="flower-care-longevity-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(7, 21, 16, 0.98) 0%, rgba(3, 8, 5, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <FlowerCareKitIcon size={16} color="#059669" />
              <span>SECRETELE MAESTRULUI FLORAR • GHID INTERACTIV LONGEVITATE</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Ghid Interactiv de Îngrijire & Longevitate a Trandafirilor</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#a7f3d0' }}>
              Descoperă cum să prelungești prospețimea trandafirilor tăi de la 7 până la 17+ zile (ori 3-5+ ani pentru trandafirii stabilizați): testează tăierea oblică la 45°, nutrienții Chrysal și scutul de protecție a sclipiciului.
            </p>
          </div>
          <FlowerCareGuideWidget 
            isEmbedded={true} 
            onApplyConfig={() => {
              if (onOpenCareGuide) onOpenCareGuide();
            }} 
          />
        </div>
      </section>

      {/* Task 61: Ceramic Aroma Medallion & Grasse Olfactory Atmosphere Simulator Showcase Section */}
      <section id="ceramic-aroma-medallion-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(8, 14, 26, 0.98) 0%, rgba(3, 7, 18, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CeramicMedallionIcon size={16} color="#0284c7" />
              <span>DIFUZIE CONTINUĂ 30 ZILE • PARFUMERIE PURĂ DE GRASSE</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Simulator Interactiv de Atmosferă Olfactivă & Medalion Ceramic</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#bae6fd' }}>
              Descoperă arta difuziei pasive: medalionul din ceramică poroasă de Limoges ascuns în baza cutiei absoarbe esențele pure de Grasse și eliberează continuu o aură nobilă de până la 30 de zile în întreaga încăpere.
            </p>
          </div>
          <CeramicAromaDiffuserWidget 
            isEmbedded={true} 
            onApplyConfig={() => {
              if (onOpenAromaMedallion) onOpenAromaMedallion();
            }} 
          />
        </div>
      </section>

      {/* Task 62: Holographic 3D Lenticular Optical Depth Card Showcase Section */}
      <section id="holographic-card-showcase-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(16, 7, 24, 0.98) 0%, rgba(8, 2, 13, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#faf5ff', color: '#9333ea', border: '1px solid #e9d5ff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <HolographicPrismIcon size={16} color="#9333ea" />
              <span>ILUZIE OPTICĂ 3D • FOLIE LENTICULARĂ JAPONEZĂ</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Simulator Interactiv de Felicitare Holografică 3D</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#e9d5ff' }}>
              Experimentează adâncimea infinită a foliei lenticulare aplicată pe carton negru satinat de 450g: diamante plutitoare și monogramă aurie refractară ce-și schimbă reflexiile la fiecare înclinare a mâinii.
            </p>
          </div>
          <HolographicCard3DSimulator 
            isEmbedded={true} 
            onApplyConfig={() => {
              if (onOpenHoloCard) onOpenHoloCard();
            }} 
          />
        </div>
      </section>

      {/* Task 63: Secret Drawer Box with Velvet Cushion & Surprise Jewelry Showcase Section */}
      <section id="secret-drawer-showcase-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(24, 8, 18, 0.98) 0%, rgba(12, 3, 9, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fdf2f8', color: '#f43f5e', border: '1px solid #fbcfe8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <SecretDrawerIcon size={16} color="#f43f5e" />
              <span>DUBLU COMPARTIMENT • SERTAR SECRET CU BIJUTERIE</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Cutie Tezaur cu Sertar Glisant Catifelat</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#fda4af' }}>
              Secretul unei cereri de neuitat: trandafirii bicolori strălucesc la etajul superior, iar la bază se ascunde un sertar glisant căptușit cu catifea densă pentru inelul de logodnă sau pandantivul ales.
            </p>
          </div>
          <SecretDrawerBoxWidget 
            isEmbedded={true} 
            onApplyConfig={() => {
              if (onOpenSecretDrawer) onOpenSecretDrawer();
            }} 
          />
        </div>
      </section>

      {/* Task 64: Smoke & Dry Ice Cascade Theatrical Mist Showcase Section */}
      <section id="smoke-cascade-showcase-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(20, 6, 16, 0.98) 0%, rgba(9, 2, 7, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fdf2f8', color: '#f43f5e', border: '1px solid #fbcfe8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <SmokeCascadeIcon size={16} color="#f43f5e" />
              <span>EFECT TEATRAL SCENIC • VAPORI RECI LA DESCHIDERE</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Efect Teatral „Smoke & Dry Ice Cascade”</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#fda4af' }}>
              Transformă livrarea într-un spectacol magic demn de marile scene: la ridicarea capacului, o cascadă hipnotică de vapori reci de trandafiri se revarsă lin, învăluind florile într-o aură de basm.
            </p>
          </div>
          <SmokeCascadeSimulator 
            isEmbedded={true} 
            onApplyConfig={() => {
              if (onOpenSmokeCascade) onOpenSmokeCascade();
            }} 
          />
        </div>
      </section>

      {/* Task 65: Cosmic Locket Secret Capsule Simulator Showcase Section */}
      <section id="cosmic-locket-showcase-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(22, 6, 20, 0.98) 0%, rgba(10, 2, 10, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fdf2f8', color: '#f43f5e', border: '1px solid #fbcfe8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CosmicLocketIcon size={16} color="#f43f5e" />
              <span>BIJUTERIE SECRETĂ • CAPSULĂ HERMETICĂ DE SAFIR & PULBERE DE DIAMANT</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Pandantiv Hermetic cu Pulbere de Diamant Cosmic & Gravură Laser</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#fda4af' }}>
              Purtat la gât sau suspendat discret printre trandafirii buchetului: o capsulă de titan aerospațial și cristal safir umplută cu pulbere de diamant cosmic ce plutește liber, însoțită de o micro-placă gravată cu mesaj secret vizibil prin lupa de bijutier 30x inclusă.
            </p>
          </div>
          <CosmicLocketSimulator 
            isEmbedded={true} 
            onApplyConfig={() => {
              if (onOpenCosmicLocket) onOpenCosmicLocket();
            }} 
          />
        </div>
      </section>

      {/* Task 66: Mechatronic Motorized Rose & Heartbeat Pulse Showcase Section */}
      <section id="mechatronic-rose-showcase-section" className="section" style={{ background: 'linear-gradient(180deg, rgba(20, 4, 16, 0.98) 0%, rgba(8, 1, 8, 1) 100%)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)', color: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MechatronicRoseIcon size={16} color="#e11d48" />
              <span>ARTĂ CINETICĂ • PETALE MOTORIZATE DIN TITAN & MĂTASE</span>
            </span>
            <h2 style={{ color: '#ffffff' }}>Trandafir Mecatronic cu Petale Motorizate & Senzor de Puls Cardiac</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', color: '#fda4af' }}>
              O capodoperă de fuziune mecatronică: petalele motorizate se deschid și se închid hipnotic în armonie cu pulsul inimii tale. Atinge senzorul tactil de pe soclu pentru a simți fiorul unei iubiri vii.
            </p>
          </div>
          <MechatronicRoseSimulator 
            isEmbedded={true} 
            onApplyConfig={() => {
              if (onOpenMechatronicRose) onOpenMechatronicRose();
            }} 
          />
        </div>
      </section>

      {/* Atelier Authenticity Certificate & Serial Showcase Section */}
      <section className="section" style={{ background: 'var(--bg-card)', paddingTop: '60px', paddingBottom: '70px', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
            
            {/* Left: Certificate Description & Luxury Perks */}
            <div>
              <span className="tag-badge" style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                <ScrollDiplomaIcon size={14} color="#92400e" />
                <span>ATESTARE OFICIALĂ • SERIE ÎNREGISTRATĂ</span>
              </span>

              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.9rem)', lineHeight: 1.2, marginBottom: '18px' }}>
                Certificat Regal de Autenticitate <br />
                <span style={{ color: 'var(--rose-600)', fontFamily: 'Cinzel, serif' }}>cu Sigiliu din Ceară Naturală</span>
              </h2>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                Fiecare buchet realizat manual în atelierul Stardust Florals primește o mini-diplomă numerotată individual (ex. <code>SF-2026-0849</code>). Documentul atestă originea nobilă a bobocilor de Ecuador, puritatea diamantului cosmetic fără cădere și garanția de strălucire intactă 3+ ani.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div style={{ padding: '14px', borderRadius: '14px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '4px' }}>
                    <ShieldCheck size={16} color="#059669" />
                    <span>Serie Unică Alocată</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Înregistrată în catalogul oficial al atelierului din București.
                  </p>
                </div>

                <div style={{ padding: '14px', borderRadius: '14px', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '4px' }}>
                    <WaxSealStampIcon size={16} color="#dc2626" />
                    <span>Sigiliu Ceară Roșie</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Ștanțat manual cu monograma regală pe carton satinat 300g.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  id="btn-homepage-preview-certificate"
                  onClick={onOpenCertificateModal ? () => onOpenCertificateModal() : (() => window.dispatchEvent(new CustomEvent('open-certificate-modal')))}
                  className="btn btn-gold btn-md"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <ScrollDiplomaIcon size={16} color="#78350f" />
                  <span>Vezi & Personalizează Certificatul</span>
                </button>

                <button
                  type="button"
                  id="btn-homepage-open-love-letter"
                  onClick={onOpenLoveLetter || (() => window.dispatchEvent(new CustomEvent('open-vintage-love-letter')))}
                  className="btn btn-secondary btn-md"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #b45309' }}
                >
                  <ParchmentScrollIcon size={16} color="#b45309" />
                  <span>Scrisoare Pergament cu Ceară</span>
                </button>

                <Link
                  to="/checkout"
                  className="btn btn-secondary btn-md"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>Comandă Buchet cu Certificat Inclus</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right: Interactive Certificate Visual Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div 
                id="homepage-certificate-preview-card"
                onClick={onOpenCertificateModal ? () => onOpenCertificateModal() : (() => window.dispatchEvent(new CustomEvent('open-certificate-modal')))}
                style={{ 
                  cursor: 'pointer',
                  width: '100%', 
                  maxWidth: '430px', 
                  borderRadius: '20px', 
                  background: 'linear-gradient(145deg, #fffefc, #faf5eb)', 
                  border: '2px solid #b45309', 
                  boxShadow: '0 20px 45px rgba(180, 83, 9, 0.15)',
                  padding: '28px 24px',
                  position: 'relative',
                  transform: 'rotate(1deg)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                className="hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Filigree Corner Decor */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', opacity: 0.7 }}>
                  <FleurDeLisIcon size={18} color="#b45309" />
                </div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', opacity: 0.7 }}>
                  <FleurDeLisIcon size={18} color="#b45309" />
                </div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', opacity: 0.7 }}>
                  <FleurDeLisIcon size={18} color="#b45309" />
                </div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', opacity: 0.7 }}>
                  <FleurDeLisIcon size={18} color="#b45309" />
                </div>

                {/* Inner Border Frame */}
                <div style={{ border: '1px solid rgba(180, 83, 9, 0.3)', borderRadius: '12px', padding: '20px 16px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.75)' }}>
                  
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#78350f', fontWeight: 800, marginBottom: '6px' }}>
                    <CrownIcon size={14} color="#b45309" />
                    <span>STARDUST FLORALS • ATELIER</span>
                  </div>

                  <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1.25rem', fontWeight: 900, color: '#78350f', margin: '0 0 6px', letterSpacing: '0.5px' }}>
                    CERTIFICAT DE AUTENTICITATE
                  </h3>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '15px', background: '#fef3c7', border: '1px solid #fde68a', fontSize: '0.72rem', color: '#92400e', fontWeight: 700, margin: '8px 0 14px' }}>
                    <ShieldCheck size={12} color="#92400e" />
                    <span>SERIE: SF-2026-0849</span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#57534e', fontStyle: 'italic', marginBottom: '4px' }}>
                    Decernat cu aleasă prețuire destinatarei:
                  </div>

                  <div style={{ fontFamily: 'Playfair Display, cursive', fontSize: '1.25rem', fontWeight: 800, color: '#881337', marginBottom: '14px' }}>
                    „ Persoana Iubită ”
                  </div>

                  <div style={{ background: '#fefbf3', border: '1px solid #f2e8cf', borderRadius: '10px', padding: '10px', fontSize: '0.74rem', color: '#44403c', textAlign: 'left', lineHeight: 1.5, marginBottom: '16px' }}>
                    <div><strong>Creație:</strong> Buchet Signature Dual Noir & Rouge</div>
                    <div><strong>Infuzație:</strong> Praf Diamant Cosmetic 0.15mm Micro-Prismatic</div>
                    <div><strong>Garanție:</strong> 3+ Ani Păstrare Strălucire Intactă</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #d6d3d1', paddingTop: '10px' }}>
                    <div style={{ textAlign: 'left', fontSize: '0.7rem', color: '#78716c' }}>
                      <span style={{ fontFamily: 'Playfair Display, cursive', color: '#881337', fontWeight: 700, display: 'block', fontSize: '0.85rem' }}>Elena V.</span>
                      <span>Maestru Florar</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fef08a', boxShadow: '0 2px 6px rgba(185, 28, 28, 0.4)', border: '1px solid #fde047' }}>
                        <WaxSealStampIcon size={16} color="#fef08a" />
                      </div>
                    </div>
                  </div>

                </div>

                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#b45309', fontWeight: 700, textDecoration: 'underline' }}>
                    Apasă pentru a deschide și personaliza certificatul complet &rarr;
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Multisensory Atelier Floral Fragrance Infusion Section (Task 47) */}
      <section id="fragrance-selector-section" className="section" style={{ background: 'var(--bg-subtle)', paddingTop: '50px', paddingBottom: '70px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge" style={{ background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <PerfumeBottleIcon size={14} color="#db2777" />
              <span>EXPERIENȚĂ MULTISENZORIALĂ • OLFACTIV DE LUX</span>
            </span>
            <h2>Parfum Floral de Nișă Infuzat pe Ambalaj</h2>
            <p>Descoperă cele 4 esențe aristocratice pulverizate manual pe hârtia de mătase și catifea la pregătirea buchetului.</p>
          </div>
          <FloralFragranceSelector />
        </div>
      </section>

      {/* VIP Florist Concierge Interactive Banner (Task 49) */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #180512 0%, #0a0106 100%)', color: '#ffffff', borderTop: '1px solid rgba(225, 29, 72, 0.25)', borderBottom: '1px solid rgba(225, 29, 72, 0.25)', padding: '56px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(225, 29, 72, 0.18), transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '1080px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 500px' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #e11d48', overflow: 'hidden', boxShadow: '0 0 20px rgba(225, 29, 72, 0.4)' }}>
                  <img 
                    src="/images/buchet-dual-noir-rouge-hero.webp" 
                    alt="Atelier Stardust" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <span style={{ position: 'absolute', bottom: '2px', right: '2px', width: '14px', height: '14px', borderRadius: '50%', background: '#10b981', border: '2px solid #180512', display: 'inline-block' }} />
              </div>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225, 29, 72, 0.2)', border: '1px solid rgba(225, 29, 72, 0.4)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.74rem', color: '#fbcfe8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  <ConciergeBellIcon size={14} color="#f43f5e" />
                  <span>CONCIERGE DIGITAL LIVE • ATELIER BUCUREȘTI</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', margin: '0 0 6px', color: '#ffffff', fontFamily: 'Cinzel, Georgia, serif' }}>
                  Elena Vasilescu — Maestrul Tău Florar Dedicat
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0, lineHeight: 1.5, maxWidth: '580px' }}>
                  Ai întrebări despre combinațiile de sclipici, parfumul de atelier sau vrei o livrare secretă în regim de urgență AZI? Discută live în 3 secunde.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                id="btn-homepage-open-concierge-banner"
                onClick={onOpenConcierge || (() => window.dispatchEvent(new CustomEvent('open-vip-concierge')))}
                className="btn btn-primary btn-lg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.35)',
                  whiteSpace: 'nowrap'
                }}
              >
                <ConciergeBellIcon size={18} color="#ffffff" />
                <span>Deschide Dialogul cu Elena (Live)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vintage Love Letter with Wax Seal Showcase Section (Task 51) */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #1c0a15 0%, #0e030b 100%)', color: '#ffffff', borderTop: '1px solid rgba(225, 29, 72, 0.25)', borderBottom: '1px solid rgba(225, 29, 72, 0.25)', padding: '56px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(217, 119, 6, 0.18), transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '1080px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 500px' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #d97706', background: 'linear-gradient(135deg, #78350f, #451a03)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(217, 119, 6, 0.4)' }}>
                  <ParchmentScrollIcon size={28} color="#fef08a" />
                </div>
              </div>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(217, 119, 6, 0.2)', border: '1px solid rgba(217, 119, 6, 0.4)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.74rem', color: '#fef08a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  <QuillIcon size={14} color="#fef08a" />
                  <span>ROMANTISM NOSTALGIC • CALIGRAFIE PE PERGAMENT</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', margin: '0 0 6px', color: '#ffffff', fontFamily: 'Cinzel, Georgia, serif' }}>
                  Scrisoare de Dragoste pe Pergament Antic cu Sigiliu din Ceară
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0, lineHeight: 1.5, maxWidth: '580px' }}>
                  Alege un pergament vechi cu margini arse sau mătase crem și scrie mesajul tău de suflet. Florarii noștri îl sigilează manual cu ceară caldă rubinie și ștampilă regală.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                id="btn-homepage-open-love-letter-banner"
                onClick={onOpenLoveLetter || (() => window.dispatchEvent(new CustomEvent('open-vintage-love-letter')))}
                className="btn btn-gold btn-lg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(217, 119, 6, 0.35)',
                  whiteSpace: 'nowrap'
                }}
              >
                <WaxSealStampIcon size={18} color="#78350f" />
                <span>Personalizează Scrisoarea Ta</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Anniversary Reminder Section - "Nu Mai Uita Niciodată Ziua Ei" */}
      <section 
        id="anniversary-scheduler-section"
        className="section" 
        style={{ 
          background: 'radial-gradient(circle at 30% 50%, rgba(225, 29, 72, 0.12), transparent 70%), linear-gradient(135deg, #13030b 0%, #080104 100%)', 
          borderTop: '1px solid rgba(225, 29, 72, 0.25)',
          borderBottom: '1px solid rgba(225, 29, 72, 0.25)',
          padding: '60px 0' 
        }}
      >
        <div className="container">
          <div 
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              border: '1.5px solid rgba(225, 29, 72, 0.35)', 
              borderRadius: '26px', 
              padding: '36px 40px', 
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(225, 29, 72, 0.15)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '28px'
            }}
          >
            <div style={{ display: 'flex', gap: '22px', alignItems: 'center', flex: '1 1 500px' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '20px', 
                    border: '2px solid #e11d48', 
                    background: 'linear-gradient(135deg, #e11d48, #881337)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    boxShadow: '0 0 25px rgba(225, 29, 72, 0.5)' 
                  }}
                >
                  <CalendarHeartIcon size={32} color="#ffffff" />
                </div>
              </div>
              <div>
                <div 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: 'rgba(225, 29, 72, 0.2)', 
                    border: '1px solid rgba(225, 29, 72, 0.4)', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.74rem', 
                    color: '#fda4af', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px', 
                    marginBottom: '8px' 
                  }}
                >
                  <Heart size={14} color="#e11d48" />
                  <span>SERVICIU EXCLUSIV VIP • ZERO STRES</span>
                </div>
                <h3 style={{ fontSize: '1.55rem', margin: '0 0 8px', color: '#ffffff', letterSpacing: '-0.01em' }}>
                  „Nu Mai Uita Niciodată Ziua Ei” — Calendar Aniversar VIP
                </h3>
                <p style={{ color: '#fda4af', fontSize: '0.92rem', margin: 0, lineHeight: 1.55, maxWidth: '620px' }}>
                  Salvează data zilei de naștere sau a aniversării de cuplu. Florarul tău dedicat te anunță din timp pe WhatsApp, îți blochează buchetul favorit în atelier și îți aplică automat <strong>15% reducere VIP</strong>.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                id="btn-homepage-open-anniversary"
                onClick={onOpenAnniversary || (() => window.dispatchEvent(new CustomEvent('open-anniversary-scheduler')))}
                className="btn btn-primary btn-lg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 25px rgba(225, 29, 72, 0.5)',
                  whiteSpace: 'nowrap'
                }}
              >
                <CalendarHeartIcon size={20} color="#ffffff" />
                <span>Programează Aniversarea Ei</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation CTA Banner */}
      <section className="section" style={{ background: 'var(--rose-gradient)', color: '#ffffff', textAlign: 'center', padding: '70px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <GiftBoxIcon size={14} color="#ffffff" />
              <span>Ofertă Limitată de Bun Venit</span>
            </span>
            <h2 style={{ color: '#ffffff', fontSize: '2.5rem', margin: '18px 0 14px' }}>
              Pregătești o surpriză de neuitat?
            </h2>
            <p style={{ color: '#ffe4e6', fontSize: '1.1rem', marginBottom: '32px' }}>
              Deblochează 10% reducere la comanda ta și asistență dedicată pe WhatsApp de la florarii noștri experți.
            </p>
            <button onClick={onOpenLeadModal} className="btn btn-gold btn-lg">
              <span>Revendică Codul Tău de Reducere</span>
              <Sparkles size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section with Instant Search & Filter */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div className="section-header">
            <span className="tag-badge">ÎNTREBĂRI FRECVENTE</span>
            <h2>Tot Ce Trebuie Să Știi</h2>
            <p>Răspunsuri la cele mai comune curiozități despre buchetele Stardust.</p>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--rose-600)' }} />
            <input 
              type="text" 
              placeholder="Caută în întrebări (ex: rezistă, livrare, toxic, cod QR, anonim)..."
              value={faqSearchQuery}
              onChange={(e) => {
                setFaqSearchQuery(e.target.value);
                if (e.target.value) setActiveFaq(0); // auto-open first match
              }}
              style={{ width: '100%', padding: '14px 16px 14px 46px', borderRadius: '14px', border: '1.5px solid var(--border-light)', outline: 'none', fontSize: '0.96rem', background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)', color: 'var(--text-main)' }}
            />
            {faqSearchQuery && (
              <button 
                onClick={() => setFaqSearchQuery('')}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}
              >
                Șterge
              </button>
            )}
          </div>

          {/* Category Filter Pills & Expand/Collapse All */}
          {(() => {
            const filteredFaqs = FAQS.filter((faq) => {
              const qMatches = !faqSearchQuery || 
                faq.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
                faq.a.toLowerCase().includes(faqSearchQuery.toLowerCase());
              if (!qMatches) return false;
              if (faqCategory === 'rezistenta') {
                return faq.q.toLowerCase().includes('rezistă') || faq.q.toLowerCase().includes('toxic');
              }
              if (faqCategory === 'livrare') {
                return faq.q.toLowerCase().includes('livrar') || faq.q.toLowerCase().includes('anonim');
              }
              if (faqCategory === 'qr') {
                return faq.q.toLowerCase().includes('qr') || faq.q.toLowerCase().includes('video');
              }
              return true;
            });

            const allIndices = filteredFaqs.map((_, i) => i);
            const areAllOpen = allIndices.length > 0 && allIndices.every((i) => openFaqIndices.includes(i));

            return (
              <>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px', justifyContent: 'center', alignItems: 'center' }}>
                  <button 
                    className={`btn btn-sm ${faqCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFaqCategory('all')}
                    style={{ fontSize: '0.82rem', padding: '7px 14px' }}
                  >
                    Toate ({FAQS.length})
                  </button>
                  <button 
                    className={`btn btn-sm ${faqCategory === 'rezistenta' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFaqCategory('rezistenta')}
                    style={{ fontSize: '0.82rem', padding: '7px 14px', display: 'inline-flex', alignItems: 'center' }}
                  >
                    <Droplets size={13} style={{ marginRight: '5px' }} />
                    <span>Rezistență & Siguranță</span>
                  </button>
                  <button 
                    className={`btn btn-sm ${faqCategory === 'livrare' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFaqCategory('livrare')}
                    style={{ fontSize: '0.82rem', padding: '7px 14px', display: 'inline-flex', alignItems: 'center' }}
                  >
                    <Truck size={13} style={{ marginRight: '5px' }} />
                    <span>Livrare & Confidențialitate</span>
                  </button>
                  <button 
                    className={`btn btn-sm ${faqCategory === 'qr' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFaqCategory('qr')}
                    style={{ fontSize: '0.82rem', padding: '7px 14px', display: 'inline-flex', alignItems: 'center' }}
                  >
                    <Smartphone size={13} style={{ marginRight: '5px' }} />
                    <span>Felicitare Video QR</span>
                  </button>
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                      if (areAllOpen) {
                        setOpenFaqIndices([]);
                      } else {
                        setOpenFaqIndices(allIndices);
                      }
                    }}
                    style={{ fontSize: '0.82rem', padding: '7px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', color: 'var(--text-main)' }}
                  >
                    {areAllOpen ? '▼ Restrânge Toate' : '▲ Deschide Toate'}
                  </button>
                </div>

                {filteredFaqs.length === 0 ? (
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '36px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '14px' }}>
                      Nu am găsit răspunsuri pentru „<strong>{faqSearchQuery}</strong>”.
                    </p>
                    <a 
                      href={`https://wa.me/40700000000?text=${encodeURIComponent(`Bună! Am o întrebare specifică: ${faqSearchQuery}`)}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="btn btn-whatsapp btn-sm"
                    >
                      Întreabă Direct pe WhatsApp
                    </a>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {filteredFaqs.map((faq, idx) => {
                      const isOpen = openFaqIndices.includes(idx);
                      const feedback = faqFeedback[idx];
                      return (
                        <div 
                          key={idx} 
                          style={{ border: '1px solid var(--border-light)', borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-card)', boxShadow: 'var(--shadow-xs)' }}
                        >
                          <button 
                            onClick={() => toggleFaq(idx)}
                            style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          >
                            <span>{faq.q}</span>
                            <ChevronDown 
                              size={20} 
                              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: 'var(--rose-600)', flexShrink: 0, marginLeft: '12px' }} 
                            />
                          </button>
                          {isOpen && (
                            <div style={{ padding: '0 24px 22px', color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.65, borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                              <p style={{ margin: '0 0 16px' }}>{faq.a}</p>

                              {/* Helpful Answer Feedback */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed var(--border-subtle)', paddingTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '8px' }}>
                                <span>A fost util acest răspuns?</span>
                                {feedback ? (
                                  <span style={{ color: '#16a34a', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    <Check size={14} /> Mulțumim pentru feedback!
                                  </span>
                                ) : (
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                      type="button" 
                                      onClick={() => handleFaqFeedback(idx, 'yes')}
                                      className="btn btn-sm btn-secondary"
                                      style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                    >
                                      <ThumbsUp size={12} /> Da
                                    </button>
                                    <button 
                                      type="button" 
                                      onClick={() => handleFaqFeedback(idx, 'no')}
                                      className="btn btn-sm btn-secondary"
                                      style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                    >
                                      <ThumbsDown size={12} /> Nu
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </section>
    </div>
  );
}
