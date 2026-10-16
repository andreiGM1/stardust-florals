import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LiveSalesTicker from './components/LiveSalesTicker';
import LeadCaptureModal from './components/LeadCaptureModal';
import GiftFinderQuizModal from './components/GiftFinderQuizModal';
import AuthenticityCertificateModal from './components/AuthenticityCertificateModal';
import PostOrderReviewModal from './components/PostOrderReviewModal';
import VIPFloristConciergeModal from './components/VIPFloristConciergeModal';
import VintageLoveLetterModal from './components/VintageLoveLetterModal';
import AnniversarySchedulerModal from './components/AnniversarySchedulerModal';
import MicroLedSimulatorModal from './components/MicroLedSimulatorModal';
import GourmetTastingModal from './components/GourmetTastingModal';
import AudioVoiceEngravingModal from './components/AudioVoiceEngravingModal';
import PopUpCardSimulatorModal from './components/PopUpCardSimulatorModal';
import VintageMusicBoxModal from './components/VintageMusicBoxModal';
import RoyalUnboxingModal from './components/RoyalUnboxingModal';
import PetalLaserEngraverModal from './components/PetalLaserEngraverModal';
import FlowerCareGuideModal from './components/FlowerCareGuideModal';
import CeramicAromaDiffuserModal from './components/CeramicAromaDiffuserModal';
import HolographicCard3DModal from './components/HolographicCard3DModal';
import SecretDrawerBoxModal from './components/SecretDrawerBoxModal';
import SmokeCascadeModal from './components/SmokeCascadeModal';
import CosmicLocketModal from './components/CosmicLocketModal';
import MechatronicRoseModal from './components/MechatronicRoseModal';
import { ConciergeBellIcon } from './components/CustomIcons';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import VideoQrPage from './pages/VideoQrPage';
import ReviewsPage from './pages/ReviewsPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import OrderTrackingPage from './pages/OrderTrackingPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isGiftQuizOpen, setIsGiftQuizOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certModalData, setCertModalData] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewModalData, setReviewModalData] = useState(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isLoveLetterOpen, setIsLoveLetterOpen] = useState(false);
  const [isAnniversaryOpen, setIsAnniversaryOpen] = useState(false);
  const [isLedModalOpen, setIsLedModalOpen] = useState(false);
  const [isGourmetModalOpen, setIsGourmetModalOpen] = useState(false);
  const [isAudioEngravingOpen, setIsAudioEngravingOpen] = useState(false);
  const [isPopUpModalOpen, setIsPopUpModalOpen] = useState(false);
  const [isMusicBoxModalOpen, setIsMusicBoxModalOpen] = useState(false);
  const [isUnboxingModalOpen, setIsUnboxingModalOpen] = useState(false);
  const [isPetalLaserModalOpen, setIsPetalLaserModalOpen] = useState(false);
  const [isCareGuideModalOpen, setIsCareGuideModalOpen] = useState(false);
  const [isAromaMedallionModalOpen, setIsAromaMedallionModalOpen] = useState(false);
  const [isHoloCardModalOpen, setIsHoloCardModalOpen] = useState(false);
  const [isSecretDrawerModalOpen, setIsSecretDrawerModalOpen] = useState(false);
  const [isSmokeCascadeOpen, setIsSmokeCascadeOpen] = useState(false);
  const [isCosmicLocketOpen, setIsCosmicLocketOpen] = useState(false);
  const [isMechatronicRoseOpen, setIsMechatronicRoseOpen] = useState(false);

  const handleOpenCertificate = (data = null) => {
    setCertModalData(data);
    setIsCertModalOpen(true);
  };

  const handleOpenReviewModal = (data = null) => {
    setReviewModalData(data);
    setIsReviewModalOpen(true);
  };

  useEffect(() => {
    // Attention grabber when user changes tabs
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = '(1) Ai uitat buchetul de lux! • Stardust Florals';
      } else {
        document.title = originalTitle;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleOpenQuiz = () => setIsGiftQuizOpen(true);
    window.addEventListener('open-gift-quiz', handleOpenQuiz);

    const handleOpenCertEvent = (e) => handleOpenCertificate(e.detail || null);
    window.addEventListener('open-certificate-modal', handleOpenCertEvent);

    const handleOpenReviewEvent = (e) => handleOpenReviewModal(e.detail || null);
    window.addEventListener('open-post-order-review', handleOpenReviewEvent);

    const handleOpenConcierge = () => setIsConciergeOpen(true);
    window.addEventListener('open-vip-concierge', handleOpenConcierge);

    const handleOpenLoveLetter = () => setIsLoveLetterOpen(true);
    window.addEventListener('open-vintage-love-letter', handleOpenLoveLetter);

    const handleOpenAnniversary = () => setIsAnniversaryOpen(true);
    window.addEventListener('open-anniversary-scheduler', handleOpenAnniversary);

    const handleOpenLedSimulator = () => setIsLedModalOpen(true);
    window.addEventListener('open-micro-led-simulator', handleOpenLedSimulator);

    const handleOpenGourmetTasting = () => setIsGourmetModalOpen(true);
    window.addEventListener('open-gourmet-tasting', handleOpenGourmetTasting);

    const handleOpenAudioEngraving = () => setIsAudioEngravingOpen(true);
    window.addEventListener('open-audio-engraving', handleOpenAudioEngraving);

    const handleOpenPopUpCard = () => setIsPopUpModalOpen(true);
    window.addEventListener('open-popup-card-simulator', handleOpenPopUpCard);

    const handleOpenMusicBox = () => setIsMusicBoxModalOpen(true);
    window.addEventListener('open-music-box-configurator', handleOpenMusicBox);

    const handleOpenUnboxing = () => setIsUnboxingModalOpen(true);
    window.addEventListener('open-royal-unboxing', handleOpenUnboxing);

    const handleOpenPetalLaser = () => setIsPetalLaserModalOpen(true);
    window.addEventListener('open-petal-laser-engraver', handleOpenPetalLaser);

    const handleOpenCareGuide = () => setIsCareGuideModalOpen(true);
    window.addEventListener('open-care-guide-modal', handleOpenCareGuide);

    const handleOpenAromaMedallion = () => setIsAromaMedallionModalOpen(true);
    window.addEventListener('open-ceramic-aroma-medallion', handleOpenAromaMedallion);

    const handleOpenHoloCard = () => setIsHoloCardModalOpen(true);
    window.addEventListener('open-holographic-card-modal', handleOpenHoloCard);

    const handleOpenSecretDrawer = () => setIsSecretDrawerModalOpen(true);
    window.addEventListener('open-secret-drawer-modal', handleOpenSecretDrawer);

    const handleOpenSmokeCascade = () => setIsSmokeCascadeOpen(true);
    window.addEventListener('open-smoke-cascade-modal', handleOpenSmokeCascade);

    const handleOpenCosmicLocket = () => setIsCosmicLocketOpen(true);
    window.addEventListener('open-cosmic-locket-modal', handleOpenCosmicLocket);

    const handleOpenMechatronicRose = () => setIsMechatronicRoseOpen(true);
    window.addEventListener('open-mechatronic-rose-modal', handleOpenMechatronicRose);

    // Auto trigger lead modal after 15s if user hasn't seen it
    const hasSeenLeadModal = localStorage.getItem('stardust_has_seen_lead_modal');
    let timer;
    if (!hasSeenLeadModal) {
      timer = setTimeout(() => {
        setIsLeadModalOpen(true);
        localStorage.setItem('stardust_has_seen_lead_modal', 'true');
      }, 15000);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('open-gift-quiz', handleOpenQuiz);
      window.removeEventListener('open-certificate-modal', handleOpenCertEvent);
      window.removeEventListener('open-post-order-review', handleOpenReviewEvent);
      window.removeEventListener('open-vip-concierge', handleOpenConcierge);
      window.removeEventListener('open-vintage-love-letter', handleOpenLoveLetter);
      window.removeEventListener('open-anniversary-scheduler', handleOpenAnniversary);
      window.removeEventListener('open-micro-led-simulator', handleOpenLedSimulator);
      window.removeEventListener('open-gourmet-tasting', handleOpenGourmetTasting);
      window.removeEventListener('open-audio-engraving', handleOpenAudioEngraving);
      window.removeEventListener('open-popup-card-simulator', handleOpenPopUpCard);
      window.removeEventListener('open-music-box-configurator', handleOpenMusicBox);
      window.removeEventListener('open-royal-unboxing', handleOpenUnboxing);
      window.removeEventListener('open-petal-laser-engraver', handleOpenPetalLaser);
      window.removeEventListener('open-care-guide-modal', handleOpenCareGuide);
      window.removeEventListener('open-ceramic-aroma-medallion', handleOpenAromaMedallion);
      window.removeEventListener('open-holographic-card-modal', handleOpenHoloCard);
      window.removeEventListener('open-secret-drawer-modal', handleOpenSecretDrawer);
      window.removeEventListener('open-smoke-cascade-modal', handleOpenSmokeCascade);
      window.removeEventListener('open-cosmic-locket-modal', handleOpenCosmicLocket);
      window.removeEventListener('open-mechatronic-rose-modal', handleOpenMechatronicRose);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar 
        onOpenLeadModal={() => setIsLeadModalOpen(true)} 
        onOpenGiftQuiz={() => setIsGiftQuizOpen(true)}
        onOpenCertificateModal={handleOpenCertificate}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenLoveLetter={() => setIsLoveLetterOpen(true)}
        onOpenAnniversary={() => setIsAnniversaryOpen(true)}
        onOpenLedSimulator={() => setIsLedModalOpen(true)}
        onOpenGourmetTasting={() => setIsGourmetModalOpen(true)}
        onOpenAudioEngraving={() => setIsAudioEngravingOpen(true)}
        onOpenPopUpCard={() => setIsPopUpModalOpen(true)}
        onOpenMusicBox={() => setIsMusicBoxModalOpen(true)}
        onOpenUnboxing={() => setIsUnboxingModalOpen(true)}
        onOpenPetalLaser={() => setIsPetalLaserModalOpen(true)}
        onOpenCareGuide={() => setIsCareGuideModalOpen(true)}
        onOpenAromaMedallion={() => setIsAromaMedallionModalOpen(true)}
        onOpenHoloCard={() => setIsHoloCardModalOpen(true)}
        onOpenSecretDrawer={() => setIsSecretDrawerModalOpen(true)}
        onOpenSmokeCascade={() => setIsSmokeCascadeOpen(true)}
        onOpenCosmicLocket={() => setIsCosmicLocketOpen(true)}
        onOpenMechatronicRose={() => setIsMechatronicRoseOpen(true)}
      />
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onOpenLeadModal={() => setIsLeadModalOpen(true)} 
                onOpenGiftQuiz={() => setIsGiftQuizOpen(true)} 
                onOpenCertificateModal={handleOpenCertificate}
                onOpenReviewModal={handleOpenReviewModal}
                onOpenConcierge={() => setIsConciergeOpen(true)}
                onOpenLoveLetter={() => setIsLoveLetterOpen(true)}
                onOpenAnniversary={() => setIsAnniversaryOpen(true)}
                onOpenLedSimulator={() => setIsLedModalOpen(true)}
                onOpenGourmetTasting={() => setIsGourmetModalOpen(true)}
                onOpenAudioEngraving={() => setIsAudioEngravingOpen(true)}
                onOpenPopUpCard={() => setIsPopUpModalOpen(true)}
                onOpenMusicBox={() => setIsMusicBoxModalOpen(true)}
                onOpenUnboxing={() => setIsUnboxingModalOpen(true)}
                onOpenPetalLaser={() => setIsPetalLaserModalOpen(true)}
                onOpenCareGuide={() => setIsCareGuideModalOpen(true)}
                onOpenAromaMedallion={() => setIsAromaMedallionModalOpen(true)}
                onOpenHoloCard={() => setIsHoloCardModalOpen(true)}
                onOpenSecretDrawer={() => setIsSecretDrawerModalOpen(true)}
                onOpenSmokeCascade={() => setIsSmokeCascadeOpen(true)}
                onOpenCosmicLocket={() => setIsCosmicLocketOpen(true)}
                onOpenMechatronicRose={() => setIsMechatronicRoseOpen(true)}
              />
            } 
          />
          <Route path="/colectie" element={<CollectionPage />} />
          <Route path="/video-qr" element={<VideoQrPage />} />
          <Route 
            path="/recenzii" 
            element={<ReviewsPage onOpenReviewModal={handleOpenReviewModal} />} 
          />
          <Route 
            path="/checkout" 
            element={
              <CheckoutPage 
                onOpenCertificateModal={handleOpenCertificate} 
                onOpenReviewModal={handleOpenReviewModal}
                onOpenAnniversary={() => setIsAnniversaryOpen(true)}
                onOpenLedSimulator={() => setIsLedModalOpen(true)}
                onOpenGourmetTasting={() => setIsGourmetModalOpen(true)}
                onOpenAudioEngraving={() => setIsAudioEngravingOpen(true)}
                onOpenPopUpCard={() => setIsPopUpModalOpen(true)}
                onOpenMusicBox={() => setIsMusicBoxModalOpen(true)}
                onOpenUnboxing={() => setIsUnboxingModalOpen(true)}
                onOpenPetalLaser={() => setIsPetalLaserModalOpen(true)}
                onOpenCareGuide={() => setIsCareGuideModalOpen(true)}
                onOpenAromaMedallion={() => setIsAromaMedallionModalOpen(true)}
                onOpenHoloCard={() => setIsHoloCardModalOpen(true)}
                onOpenSecretDrawer={() => setIsSecretDrawerModalOpen(true)}
                onOpenSmokeCascade={() => setIsSmokeCascadeOpen(true)}
                onOpenCosmicLocket={() => setIsCosmicLocketOpen(true)}
                onOpenMechatronicRose={() => setIsMechatronicRoseOpen(true)}
              />
            } 
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
            path="/urmarire-comanda" 
            element={
              <OrderTrackingPage 
                onOpenCertificateModal={handleOpenCertificate} 
                onOpenReviewModal={handleOpenReviewModal}
              />
            } 
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route 
            path="*" 
            element={
              <HomePage 
                onOpenLeadModal={() => setIsLeadModalOpen(true)} 
                onOpenGiftQuiz={() => setIsGiftQuizOpen(true)} 
                onOpenCertificateModal={handleOpenCertificate}
                onOpenReviewModal={handleOpenReviewModal}
                onOpenAnniversary={() => setIsAnniversaryOpen(true)}
                onOpenLedSimulator={() => setIsLedModalOpen(true)}
                onOpenGourmetTasting={() => setIsGourmetModalOpen(true)}
                onOpenAudioEngraving={() => setIsAudioEngravingOpen(true)}
                onOpenPopUpCard={() => setIsPopUpModalOpen(true)}
                onOpenMusicBox={() => setIsMusicBoxModalOpen(true)}
                onOpenUnboxing={() => setIsUnboxingModalOpen(true)}
                onOpenPetalLaser={() => setIsPetalLaserModalOpen(true)}
                onOpenCareGuide={() => setIsCareGuideModalOpen(true)}
                onOpenAromaMedallion={() => setIsAromaMedallionModalOpen(true)}
                onOpenHoloCard={() => setIsHoloCardModalOpen(true)}
                onOpenSecretDrawer={() => setIsSecretDrawerModalOpen(true)}
              />
            } 
          />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <LiveSalesTicker />
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
      <GiftFinderQuizModal isOpen={isGiftQuizOpen} onClose={() => setIsGiftQuizOpen(false)} />
      <AuthenticityCertificateModal 
        isOpen={isCertModalOpen} 
        onClose={() => setIsCertModalOpen(false)} 
        initialData={certModalData} 
      />
      <PostOrderReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        initialData={reviewModalData}
      />
      <VIPFloristConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
      <VintageLoveLetterModal
        isOpen={isLoveLetterOpen}
        onClose={() => setIsLoveLetterOpen(false)}
      />
      <AnniversarySchedulerModal
        isOpen={isAnniversaryOpen}
        onClose={() => setIsAnniversaryOpen(false)}
      />
      <MicroLedSimulatorModal
        isOpen={isLedModalOpen}
        onClose={() => setIsLedModalOpen(false)}
      />
      <GourmetTastingModal
        isOpen={isGourmetModalOpen}
        onClose={() => setIsGourmetModalOpen(false)}
      />
      <AudioVoiceEngravingModal
        isOpen={isAudioEngravingOpen}
        onClose={() => setIsAudioEngravingOpen(false)}
      />
      <PopUpCardSimulatorModal
        isOpen={isPopUpModalOpen}
        onClose={() => setIsPopUpModalOpen(false)}
      />
      <VintageMusicBoxModal
        isOpen={isMusicBoxModalOpen}
        onClose={() => setIsMusicBoxModalOpen(false)}
      />
      <RoyalUnboxingModal
        isOpen={isUnboxingModalOpen}
        onClose={() => setIsUnboxingModalOpen(false)}
      />
      <PetalLaserEngraverModal
        isOpen={isPetalLaserModalOpen}
        onClose={() => setIsPetalLaserModalOpen(false)}
      />
      <FlowerCareGuideModal
        isOpen={isCareGuideModalOpen}
        onClose={() => setIsCareGuideModalOpen(false)}
      />
      <CeramicAromaDiffuserModal
        isOpen={isAromaMedallionModalOpen}
        onClose={() => setIsAromaMedallionModalOpen(false)}
      />
      <HolographicCard3DModal
        isOpen={isHoloCardModalOpen}
        onClose={() => setIsHoloCardModalOpen(false)}
      />
      <SecretDrawerBoxModal
        isOpen={isSecretDrawerModalOpen}
        onClose={() => setIsSecretDrawerModalOpen(false)}
      />
      <SmokeCascadeModal
        isOpen={isSmokeCascadeOpen}
        onClose={() => setIsSmokeCascadeOpen(false)}
      />
      <CosmicLocketModal
        isOpen={isCosmicLocketOpen}
        onClose={() => setIsCosmicLocketOpen(false)}
      />
      <MechatronicRoseModal
        isOpen={isMechatronicRoseOpen}
        onClose={() => setIsMechatronicRoseOpen(false)}
      />

      {/* Floating Bottom-Right Concierge VIP Launcher Button (Stacked above WhatsApp) */}
      <button
        type="button"
        id="btn-floating-concierge"
        onClick={() => setIsConciergeOpen(true)}
        style={{
          position: 'fixed',
          bottom: '94px',
          right: '24px',
          zIndex: 999,
          background: 'linear-gradient(135deg, #1e0915, #0d0208)',
          border: '1.5px solid #e11d48',
          borderRadius: '30px',
          padding: '10px 18px',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(225, 29, 72, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 0.25s ease'
        }}
        title="Deschide asistența live cu Maestrul Florar Elena"
        aria-label="Asistent Florar Concierge VIP"
      >
        <div style={{ position: 'relative' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #e11d48, #9f1239)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ConciergeBellIcon size={16} color="#ffffff" />
          </div>
          <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '9px', height: '9px', borderRadius: '50%', background: '#10b981', border: '1.5px solid #0d0208' }} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fbcfe8', letterSpacing: '0.3px', lineHeight: 1.2 }}>
            Concierge VIP
          </div>
          <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700, lineHeight: 1.1 }}>
            Florar Online
          </div>
        </div>
      </button>
    </div>
  );
}
