import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Sparkles, ShoppingBag, Menu, X, Gift, PhoneCall, Moon, Sun, Smartphone, Star, Truck, Rocket, Compass } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import EmergencyAnnouncementBar from './EmergencyAnnouncementBar';
import { RoseIcon, SparkleIcon, GiftBoxIcon, ScrollDiplomaIcon, ConciergeBellIcon, ParchmentScrollIcon, CalendarHeartIcon, FairyLightsIcon, ChampagneFlutesIcon, AudioWaveformIcon, PopUpGreetingCardIcon, MusicBoxCrankIcon, UnboxingVaultIcon, LaserPetalEngraverIcon, FlowerCareKitIcon, CeramicMedallionIcon, HolographicPrismIcon, SecretDrawerIcon, SmokeCascadeIcon, CosmicLocketIcon, MechatronicRoseIcon, MicroTelescopeIcon } from './CustomIcons';

export default function Navbar({ onOpenLeadModal, onOpenGiftQuiz, onOpenCertificateModal, onOpenConcierge, onOpenLoveLetter, onOpenAnniversary, onOpenLedSimulator, onOpenGourmetTasting, onOpenAudioEngraving, onOpenPopUpCard, onOpenMusicBox, onOpenUnboxing, onOpenPetalLaser, onOpenCareGuide, onOpenAromaMedallion, onOpenHoloCard, onOpenSecretDrawer, onOpenSmokeCascade, onOpenCosmicLocket, onOpenMechatronicRose, onOpenKaleidoscope }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('stardust_theme') || 'light';
  });
  const { currency, toggleCurrency } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('stardust_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className="navbar-wrapper">
        <EmergencyAnnouncementBar onOpenLeadModal={onOpenLeadModal} />

        <div className="container nav-container">
          <Link to="/" className="brand-logo" onClick={handleLinkClick}>
            <span className="sparkle-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <SparkleIcon size={20} color="var(--gold-400)" />
            </span>
            <span>Stardust<span className="brand-highlight">Florals</span></span>
          </Link>

          <nav className="nav-menu">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Acasă
            </NavLink>
            <NavLink to="/colectie" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Colecție
            </NavLink>
            <NavLink to="/video-qr" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Video QR
            </NavLink>
            <NavLink to="/recenzii" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Recenzii
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
            <NavLink to="/urmarire-comanda" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Urmărire AWB
            </NavLink>
          </nav>

          <div className="nav-actions">
            <button 
              className="btn btn-secondary btn-sm nav-action-secondary" 
              onClick={onOpenGiftQuiz || (() => window.dispatchEvent(new CustomEvent('open-gift-quiz')))} 
              title="Găsește Cadoul Ideal în 60s"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 11px', whiteSpace: 'nowrap' }}
            >
              <Compass size={14} color="#e11d48" />
              <span>Ghid Cadou</span>
            </button>

            <button 
              className="btn btn-secondary btn-sm nav-action-secondary" 
              onClick={onOpenConcierge ? () => onOpenConcierge() : (() => window.dispatchEvent(new CustomEvent('open-vip-concierge')))} 
              title="Consultă Maestrul Florar Elena în timp real"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 11px', whiteSpace: 'nowrap', position: 'relative' }}
              id="btn-navbar-concierge"
            >
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <ConciergeBellIcon size={14} color="#e11d48" />
                <span style={{ position: 'absolute', top: '-2px', right: '-3px', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <span>Concierge VIP</span>
            </button>

            <button 
              className="btn btn-secondary btn-sm nav-action-secondary" 
              onClick={onOpenCertificateModal ? () => onOpenCertificateModal() : (() => window.dispatchEvent(new CustomEvent('open-certificate-modal')))} 
              title="Vezi Certificatul Oficial de Autenticitate & Serie"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 11px', whiteSpace: 'nowrap' }}
              id="btn-navbar-certificate"
            >
              <ScrollDiplomaIcon size={14} color="#d97706" />
              <span>Certificat VIP</span>
            </button>

            <button 
              className="btn btn-secondary btn-sm nav-action-desktop-only" 
              onClick={onOpenLeadModal} 
              title="Deblochează 10% Reducere Cadou"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 11px', whiteSpace: 'nowrap' }}
            >
              <GiftBoxIcon size={14} color="#e11d48" />
              <span>Cadou 10%</span>
            </button>

            <button 
              className="btn btn-secondary btn-sm nav-action-desktop-only" 
              onClick={toggleTheme} 
              title={theme === 'dark' ? 'Comută pe tema Rose Gold' : 'Comută pe tema Midnight Glam'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 9px', whiteSpace: 'nowrap' }}
            >
              {theme === 'dark' ? <Sun size={14} color="#fbbf24" /> : <Moon size={14} color="#e11d48" />}
              <span style={{ fontSize: '0.78rem' }}>{theme === 'dark' ? 'Rose Gold' : 'Midnight'}</span>
            </button>

            <button 
              className="btn btn-secondary btn-sm nav-action-desktop-only" 
              onClick={toggleCurrency} 
              title={currency === 'RON' ? 'Comută prețurile în Euro (€)' : 'Comută prețurile în Lei (RON)'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 9px', fontWeight: 800, fontSize: '0.78rem', whiteSpace: 'nowrap' }}
            >
              <span style={{ color: 'var(--rose-600)', letterSpacing: '0.5px' }}>{currency}</span>
            </button>

            <Link to="/checkout" className="btn btn-primary btn-sm" style={{ padding: '7px 12px', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', whiteSpace: 'nowrap', minHeight: '38px' }}>
              <ShoppingBag size={14} />
              <span>Comandă</span>
            </Link>

            <button 
              className="mobile-toggle" 
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Deschide Meniu Navigare"
              style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" className="nav-link" onClick={handleLinkClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <RoseIcon size={18} color="var(--rose-600)" />
                <span>Acasă</span>
              </Link>
            </li>
            <li>
              <Link to="/colectie" className="nav-link" onClick={handleLinkClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <SparkleIcon size={18} color="var(--gold-500)" />
                <span>Colecție & Aranjamente</span>
              </Link>
            </li>
            <li>
              <Link to="/video-qr" className="nav-link" onClick={handleLinkClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={18} color="var(--rose-500)" />
                <span>Felicitare Video QR</span>
              </Link>
            </li>
            <li>
              <Link to="/recenzii" className="nav-link" onClick={handleLinkClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Star size={18} color="#eab308" fill="#eab308" />
                <span>Recenzii & TikTok Viral</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link" onClick={handleLinkClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={18} color="var(--rose-500)" />
                <span>Contact & Comenzi Speciale</span>
              </Link>
            </li>
            <li>
              <Link to="/urmarire-comanda" className="nav-link" onClick={handleLinkClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} color="var(--gold-500)" />
                <span>Urmărire Comandă (Live AWB)</span>
              </Link>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenGiftQuiz) onOpenGiftQuiz();
                  else window.dispatchEvent(new CustomEvent('open-gift-quiz'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
              >
                <Compass size={18} color="var(--rose-600)" />
                <span>Ghid Cadou Inteligent (Quiz 60s)</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenCertificateModal) onOpenCertificateModal();
                  else window.dispatchEvent(new CustomEvent('open-certificate-modal'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
              >
                <ScrollDiplomaIcon size={18} color="var(--gold-500)" />
                <span>Certificat de Autenticitate & Serie</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenConcierge) onOpenConcierge();
                  else window.dispatchEvent(new CustomEvent('open-vip-concierge'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-concierge"
              >
                <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                  <ConciergeBellIcon size={18} color="#e11d48" />
                  <span style={{ position: 'absolute', top: '-1px', right: '-2px', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                </div>
                <span>Concierge VIP (Florar Live de Atelier)</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenLoveLetter) onOpenLoveLetter();
                  else window.dispatchEvent(new CustomEvent('open-vintage-love-letter'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-love-letter"
              >
                <ParchmentScrollIcon size={18} color="var(--rose-600)" />
                <span>Scrisoare Pergament cu Sigiliu Ceară</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenAnniversary) onOpenAnniversary();
                  else window.dispatchEvent(new CustomEvent('open-anniversary-scheduler'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-anniversary"
              >
                <CalendarHeartIcon size={18} color="var(--rose-600)" />
                <span>Nu Mai Uita Ziua Ei (Reminder VIP)</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenLedSimulator) onOpenLedSimulator();
                  else window.dispatchEvent(new CustomEvent('open-micro-led-simulator'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-led-simulator"
              >
                <FairyLightsIcon size={18} color="#f59e0b" />
                <span>Simulator Luminițe Micro-LED (Noapte & Licurici)</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenGourmetTasting) onOpenGourmetTasting();
                  else window.dispatchEvent(new CustomEvent('open-gourmet-tasting'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-gourmet"
              >
                <ChampagneFlutesIcon size={18} color="#f59e0b" />
                <span>Pachet Gourmet Moët & Căpșuni cu Aur 24K</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenAudioEngraving) onOpenAudioEngraving();
                  else window.dispatchEvent(new CustomEvent('open-audio-engraving'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-audio-engraving"
              >
                <AudioWaveformIcon size={18} color="#f59e0b" />
                <span>Gravură Audio & Spectrogramă Foiță Aur 24K</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenPopUpCard) onOpenPopUpCard();
                  else window.dispatchEvent(new CustomEvent('open-popup-card-simulator'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-popup-card"
              >
                <PopUpGreetingCardIcon size={18} color="#e11d48" />
                <span>Felicitare Pop-Up 3D & Petale Plutitoare</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenMusicBox) onOpenMusicBox();
                  else window.dispatchEvent(new CustomEvent('open-music-box-configurator'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-music-box"
              >
                <MusicBoxCrankIcon size={18} color="#f59e0b" />
                <span>Cutie Muzicală Mecanică (Baza Aranjamentului)</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenUnboxing) onOpenUnboxing();
                  else window.dispatchEvent(new CustomEvent('open-royal-unboxing'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-unboxing"
              >
                <UnboxingVaultIcon size={18} color="#e11d48" />
                <span>Simulator Despachetare Cadou 3D (4 Straturi)</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenPetalLaser) onOpenPetalLaser();
                  else window.dispatchEvent(new CustomEvent('open-petal-laser-engraver'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-laser-engraving"
              >
                <LaserPetalEngraverIcon size={18} color="#f43f5e" />
                <span>Gravură Laser pe Petală Naturală (Mesaj Secret)</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenCareGuide) onOpenCareGuide();
                  else window.dispatchEvent(new CustomEvent('open-care-guide-modal'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-care-guide"
              >
                <FlowerCareKitIcon size={18} color="#10b981" />
                <span>Ghid Îngrijire & Longevitate Trandafiri (Calculator)</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenAromaMedallion) onOpenAromaMedallion();
                  else window.dispatchEvent(new CustomEvent('open-ceramic-aroma-medallion'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-aroma-medallion"
              >
                <CeramicMedallionIcon size={18} color="#0284c7" />
                <span>Medalion Ceramic & Atmosferă Olfactivă Grasse</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenHoloCard) onOpenHoloCard();
                  else window.dispatchEvent(new CustomEvent('open-holographic-card-modal'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-holographic-card"
              >
                <HolographicPrismIcon size={18} color="#c084fc" />
                <span>Felicitare Holografică 3D (Folie Lenticulară)</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenSecretDrawer) onOpenSecretDrawer();
                  else window.dispatchEvent(new CustomEvent('open-secret-drawer-modal'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-secret-drawer"
              >
                <SecretDrawerIcon size={18} color="#f43f5e" />
                <span>Cutie Secretă cu Sertar Glisant & Bijuterie VIP</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenSmokeCascade) onOpenSmokeCascade();
                  else window.dispatchEvent(new CustomEvent('open-smoke-cascade-modal'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-smoke-cascade"
              >
                <SmokeCascadeIcon size={18} color="#f43f5e" />
                <span>Efect Teatral Vapori Reci & Dry Ice Cascade</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenCosmicLocket) onOpenCosmicLocket();
                  else window.dispatchEvent(new CustomEvent('open-cosmic-locket-modal'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-cosmic-locket"
              >
                <CosmicLocketIcon size={18} color="#f43f5e" />
                <span>Pandantiv Hermetic & Pulbere Diamant Cosmic</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenMechatronicRose) onOpenMechatronicRose();
                  else window.dispatchEvent(new CustomEvent('open-mechatronic-rose-modal'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-mechatronic-rose"
              >
                <MechatronicRoseIcon size={18} color="#f43f5e" />
                <span>Trandafir Mecatronic & Puls Cardiac Live</span>
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => {
                  handleLinkClick();
                  if (onOpenKaleidoscope) onOpenKaleidoscope();
                  else window.dispatchEvent(new CustomEvent('open-kaleidoscope-modal'));
                }}
                className="nav-link" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '12px 0' }}
                id="btn-drawer-kaleidoscope-telescope"
              >
                <MicroTelescopeIcon size={18} color="#f59e0b" />
                <span>Micro-Telescop Caleidoscopic în Tijă (Mesaj Secret)</span>
              </button>
            </li>
            <li style={{ padding: '8px 0' }}>
              <button 
                onClick={toggleTheme}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '8px' }}
              >
                {theme === 'dark' ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#e11d48" />}
                <span>Temă: {theme === 'dark' ? 'Rose Gold Luminoasă' : 'Midnight Glam Dark'}</span>
              </button>
              <button 
                onClick={toggleCurrency}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center', fontWeight: 800 }}
              >
                <span>Monedă Afișată: {currency === 'RON' ? 'RON (Lei)' : 'EUR (€)'}</span>
              </button>
            </li>
            <li style={{ paddingTop: '10px' }}>
              <button 
                className="btn btn-gold btn-md" 
                style={{ width: '100%', marginBottom: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => { setMobileOpen(false); onOpenLeadModal(); }}
              >
                <GiftBoxIcon size={18} color="#92400e" />
                <span>Revendică Cupon 10% Off</span>
              </button>
              <Link 
                to="/checkout" 
                className="btn btn-primary btn-md" 
                style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={handleLinkClick}
              >
                <Rocket size={18} />
                <span>Plasează Comanda Imediat</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
