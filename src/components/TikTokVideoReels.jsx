import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Heart, MessageCircle, Share2, Sparkles, Volume2, VolumeX, 
  ShoppingBag, ChevronLeft, ChevronRight, X, Maximize2, Check, Send, 
  Flame, LayoutGrid, Smartphone, Eye, Music
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { playHeartPopSound, playLuxuryChime } from '../utils/audioAlert';
import { RoseIcon, MetroIcon, GiftBoxIcon, SparkleIcon } from './CustomIcons';

export const REEL_VIDEOS = [
  {
    id: 'reel-1',
    category: 'metro',
    author: '@alexandru_romance',
    caption: 'Reacția ei când a văzut trandafirii cu sclipici în metrou... A meritat fiecare secundă! #stardustflorals #surpriza',
    views: '348.2K',
    initialLikes: 42100,
    cover: '/images/client-surpriza-metrou-lifestyle.webp',
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Buchet Dual Noir & Rouge',
    price: '269 RON',
    badge: 'VIRAL METROU',
    duration: 12,
    comments: [
      { id: 1, user: '@andreea_p', text: 'Doamne cât de frumos strălucește! Chiar nu se ia sclipiciul?' },
      { id: 2, user: '@stardust_atelier', text: '@andreea_p Absolut deloc! Fixat manual cu formulă satinată bio.' },
      { id: 3, user: '@marius_k', text: 'Am comandat pentru aniversarea de 5 ani, a fost în extaz!' }
    ]
  },
  {
    id: 'reel-2',
    category: 'led',
    author: '@elena_glow',
    caption: 'Când aprinzi luminițele LED pe întuneric... Strălucește ca un diamant veritabil! Nu am mai văzut așa ceva!',
    views: '512.9K',
    initialLikes: 68400,
    cover: '/images/buchet-dual-noir-rouge-hero.webp',
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Signature Dual cu Luminițe LED',
    price: '269 RON',
    badge: 'EFECT NOCTURN',
    duration: 15,
    comments: [
      { id: 1, user: '@diana_m', text: 'Combinația de negru la exterior și roșu la mijloc e genială!' },
      { id: 2, user: '@cristina_v', text: 'Bateriile la luminițe sunt incluse? Cât țin?' },
      { id: 3, user: '@stardust_atelier', text: '@cristina_v Da, vin incluse, au 3 moduri de sclipire și țin peste 72 de ore!' }
    ]
  },
  {
    id: 'reel-3',
    category: 'metro',
    author: '@surprize_bucuresti',
    caption: 'Livrare surpriză la stația Piața Unirii! Toată lumea din metrou s-a oprit să admire trandafirii negri.',
    views: '284.1K',
    initialLikes: 39500,
    cover: '/images/client-livrare-metrou-cadou.webp',
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Buchetul Viral Metrou',
    price: '269 RON',
    badge: 'LIVRARE LIVE',
    duration: 10,
    comments: [
      { id: 1, user: '@florina_b', text: 'Am fost în vagon când a primit! Arată de 10 ori mai wow în realitate!' },
      { id: 2, user: '@bogdan_t', text: 'Curierul a fost punctual? Vreau și eu azi în Sectorul 3.' }
    ]
  },
  {
    id: 'reel-4',
    category: 'craft',
    author: '@atelier_flori_lux',
    caption: 'Macro detaliu 4K: Cum pudrăm manual fiecare petală de trandafir cu particule de sclipici cosmetic fin. 100% artizanal!',
    views: '420.1K',
    initialLikes: 53900,
    cover: '/images/buchet-dual-noir-rouge-closeup.webp',
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Artizanat Trandafiri Negri',
    price: '269 RON',
    badge: 'CRAFT ATELIER',
    duration: 14,
    comments: [
      { id: 1, user: '@ioana_art', text: 'Respect pentru munca depusă la fiecare trandafir în parte!' },
      { id: 2, user: '@simona_l', text: 'Cât durează realizarea unui buchet mare de 35 de fire?' }
    ]
  },
  {
    id: 'reel-5',
    category: 'led',
    author: '@claudia_aesthetic',
    caption: 'Unboxing oficial la cutia de catifea: Panglica satinată Stardust și felicitarea regală cu sigiliu de ceară roșie!',
    views: '318.4K',
    initialLikes: 46200,
    cover: '/images/buchet-dual-noir-rouge-overhead.webp',
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Pachet Regal Velvet',
    price: '269 RON',
    badge: 'UNBOXING',
    duration: 12,
    comments: [
      { id: 1, user: '@bianca_c', text: 'Cutia e inclusă sau se plătește separat?' },
      { id: 2, user: '@stardust_atelier', text: '@bianca_c Buchetul Signature vine ambalat de lux în hârtie nobilă & panglică!' }
    ]
  },
  {
    id: 'reel-6',
    category: 'craft',
    author: '@andreea_craft',
    caption: 'Unghiul de 45°: Trandafirii roșii din centru pulsează printre cei negri catifelați de pe margine. Contrast regal pur!',
    views: '255.6K',
    initialLikes: 34100,
    cover: '/images/buchet-dual-noir-rouge-angle.webp',
    bouquetId: 'signature-dual-noir-rouge',
    bouquetName: 'Dual Noir & Rouge (Unghi 45°)',
    price: '269 RON',
    badge: 'TOP SELLER',
    duration: 11,
    comments: [
      { id: 1, user: '@raluca_v', text: 'Nu mă pot opri din admirat! E cel mai frumos buchet din România.' }
    ]
  }
];

export default function TikTokVideoReels() {
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'vertical'
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'metro' | 'led' | 'craft'
  const [playingInlineId, setPlayingInlineId] = useState(null);
  
  // Likes management
  const [likesState, setLikesState] = useState(
    REEL_VIDEOS.reduce((acc, r) => ({ ...acc, [r.id]: { count: r.initialLikes, liked: false } }), {})
  );

  // Full-screen modal story state
  const [activeModalReel, setActiveModalReel] = useState(null);
  const [modalProgress, setModalProgress] = useState(0);
  const [isModalPaused, setIsModalPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [copiedShareToast, setCopiedShareToast] = useState(false);

  // Carousel ref
  const carouselRef = useRef(null);

  // Filtered reels
  const filteredReels = REEL_VIDEOS.filter((r) => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  // Scroll actions
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -310 : 310;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Toggle inline play
  const toggleInlinePlay = (id) => {
    setPlayingInlineId(playingInlineId === id ? null : id);
  };

  // Like handle
  const handleLike = (id, e) => {
    if (e) e.stopPropagation();
    setLikesState((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      const nextLiked = !current.liked;
      if (nextLiked) {
        playHeartPopSound();
      }
      return {
        ...prev,
        [id]: {
          count: nextLiked ? current.count + 1 : current.count - 1,
          liked: nextLiked
        }
      };
    });
  };

  // Open modal story
  const openStoryModal = (reel) => {
    setActiveModalReel(reel);
    setModalProgress(0);
    setIsModalPaused(false);
    setShowCommentsDrawer(false);
    playLuxuryChime();
  };

  // Close modal
  const closeStoryModal = () => {
    setActiveModalReel(null);
    setModalProgress(0);
    setShowCommentsDrawer(false);
  };

  // Story auto-progress timer
  useEffect(() => {
    if (!activeModalReel || isModalPaused || showCommentsDrawer) return;

    const interval = setInterval(() => {
      setModalProgress((prev) => {
        if (prev >= 100) {
          // Switch to next reel
          handleNextModalReel();
          return 0;
        }
        return prev + 1.2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeModalReel, isModalPaused, showCommentsDrawer]);

  // Next / Prev reel in modal
  const handleNextModalReel = () => {
    if (!activeModalReel) return;
    const currentIndex = filteredReels.findIndex((r) => r.id === activeModalReel.id);
    const nextIndex = (currentIndex + 1) % filteredReels.length;
    setActiveModalReel(filteredReels[nextIndex]);
    setModalProgress(0);
  };

  const handlePrevModalReel = () => {
    if (!activeModalReel) return;
    const currentIndex = filteredReels.findIndex((r) => r.id === activeModalReel.id);
    const prevIndex = (currentIndex - 1 + filteredReels.length) % filteredReels.length;
    setActiveModalReel(filteredReels[prevIndex]);
    setModalProgress(0);
  };

  // Double tap / double click to heart effect
  const handleCardDoubleTap = (reel, e) => {
    e.stopPropagation();
    handleLike(reel.id);
    const heartId = Date.now();
    setFloatingHearts((prev) => [...prev, { id: heartId }]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId));
    }, 900);
  };

  // Share handle
  const handleShare = (reel, e) => {
    if (e) e.stopPropagation();
    const shareText = `Vezi trandafirii virali Stardust Florals (${reel.bouquetName}) pe TikTok: ${window.location.origin}/recenzii`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShareToast(true);
      setTimeout(() => setCopiedShareToast(false), 2600);
    }
  };

  return (
    <section 
      id="tiktok-video-reels-section"
      style={{ 
        padding: '80px 0', 
        background: 'radial-gradient(ellipse at top, #19080c 0%, #0d0305 100%)', 
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle ambient light */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '-15%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '700px', 
          height: '400px', 
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.18) 0%, transparent 70%)', 
          filter: 'blur(50px)', 
          pointerEvents: 'none' 
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225, 29, 72, 0.15)', color: '#fb7185', border: '1px solid rgba(225, 29, 72, 0.4)', padding: '6px 18px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>
            <Sparkles size={14} /> FENOMENUL VIRAL SOCIAL MEDIA • TIKTOK & REELS
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#ffffff', margin: '16px 0 14px', fontFamily: 'var(--font-heading)' }}>
            Reacții Reale: <span className="highlight-rose">Trandafiri cu Sclipici în Mișcare</span>
          </h2>
          <p style={{ color: '#fecdd3', fontSize: '1.08rem', lineHeight: 1.6 }}>
            Peste 1.7 milioane de vizualizări pe TikTok. Vezi reacțiile sincere la primire în metrou, strălucirea nocturnă la LED și meșteșugul manual din atelierul nostru.
          </p>

          {/* Controls Bar: Categories & Mode Switcher */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginTop: '28px', borderTop: '1px solid rgba(254, 205, 211, 0.12)', paddingTop: '22px' }}>
            {/* Category Filter Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { id: 'all', label: 'Toate Reacțiile', Icon: Flame, count: REEL_VIDEOS.length },
                { id: 'metro', label: 'În Metrou & Public', Icon: MetroIcon, count: REEL_VIDEOS.filter(r => r.category === 'metro').length },
                { id: 'led', label: 'Unboxing & LED', Icon: GiftBoxIcon, count: REEL_VIDEOS.filter(r => r.category === 'led').length },
                { id: 'craft', label: 'Detaliu Atelier', Icon: SparkleIcon, count: REEL_VIDEOS.filter(r => r.category === 'craft').length },
              ].map((cat) => {
                const IconComp = cat.Icon;
                return (
                  <button
                    key={cat.id}
                    id={`btn-reel-filter-${cat.id}`}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: selectedCategory === cat.id ? 'var(--rose-600)' : 'rgba(255, 255, 255, 0.08)',
                      color: selectedCategory === cat.id ? '#ffffff' : '#fda4af',
                      border: selectedCategory === cat.id ? '1px solid #f43f5e' : '1px solid rgba(254, 205, 211, 0.18)',
                      padding: '8px 16px',
                      borderRadius: '24px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <IconComp size={14} color={selectedCategory === cat.id ? '#ffffff' : '#fda4af'} />
                    <span>{cat.label}</span>
                    <span style={{ fontSize: '0.72rem', opacity: 0.8 }}>({cat.count})</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle: Carousel vs Vertical Feed */}
            <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(254, 205, 211, 0.2)', borderRadius: '30px', padding: '3px' }}>
              <button
                id="btn-mode-carousel"
                onClick={() => setViewMode('carousel')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: viewMode === 'carousel' ? 'var(--rose-600)' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 16px',
                  borderRadius: '24px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <LayoutGrid size={14} /> Carusel Orizontal
              </button>
              <button
                id="btn-mode-vertical"
                onClick={() => setViewMode('vertical')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: viewMode === 'vertical' ? 'var(--rose-600)' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 16px',
                  borderRadius: '24px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <Smartphone size={14} /> Feed Vertical TikTok
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        {viewMode === 'carousel' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '12px' }}>
            <button
              id="btn-reel-scroll-prev"
              onClick={() => scrollCarousel('left')}
              aria-label="Previous reel"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(254, 205, 211, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              id="btn-reel-scroll-next"
              onClick={() => scrollCarousel('right')}
              aria-label="Next reel"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(254, 205, 211, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* VIEW 1: HORIZONTAL SLIDING CAROUSEL */}
        {viewMode === 'carousel' ? (
          <div 
            ref={carouselRef} 
            className="reel-carousel-track"
            id="reel-carousel-track"
          >
            {filteredReels.map((reel) => {
              const isInlinePlaying = playingInlineId === reel.id;
              const likeData = likesState[reel.id] || { count: reel.initialLikes, liked: false };

              return (
                <div
                  key={reel.id}
                  id={`reel-card-${reel.id}`}
                  className="reel-slide-card"
                  onClick={() => openStoryModal(reel)}
                  onDoubleClick={(e) => handleCardDoubleTap(reel, e)}
                >
                  {/* Photo Cover */}
                  <img
                    src={reel.cover}
                    alt={reel.caption}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: isInlinePlaying ? 0.96 : 0.85,
                      transform: isInlinePlaying ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 3.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.65) 100%)', 
                      pointerEvents: 'none' 
                    }} 
                  />

                  {/* Top Bar: Badge, Views & Fullscreen Trigger */}
                  <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 3 }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, background: 'var(--rose-600)', color: '#fff', padding: '4px 10px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(225,29,72,0.5)' }}>
                      {reel.badge}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.74rem', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', color: '#fecdd3', padding: '4px 10px', borderRadius: '20px', fontWeight: 600 }}>
                        <Eye size={11} style={{ display: 'inline', marginRight: '4px' }} />{reel.views}
                      </span>
                      <button
                        title="Deschide Ecran Complet"
                        onClick={(e) => {
                          e.stopPropagation();
                          openStoryModal(reel);
                        }}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: 'rgba(0,0,0,0.65)',
                          backdropFilter: 'blur(6px)',
                          border: 'none',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Maximize2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Center Play Button */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      top: '44%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)', 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%', 
                      background: 'rgba(225, 29, 72, 0.88)', 
                      backdropFilter: 'blur(8px)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#fff', 
                      boxShadow: '0 10px 28px rgba(225, 29, 72, 0.6)', 
                      zIndex: 3 
                    }}
                  >
                    <Play size={26} style={{ marginLeft: '4px' }} fill="#fff" />
                  </div>

                  {/* Right Social Actions */}
                  <div style={{ position: 'absolute', right: '12px', bottom: '115px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', zIndex: 4 }}>
                    <button
                      id={`btn-reel-like-${reel.id}`}
                      onClick={(e) => handleLike(reel.id, e)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', gap: '3px' }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={20} fill={likeData.liked ? '#e11d48' : 'none'} color={likeData.liked ? '#e11d48' : '#ffffff'} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800 }}>{likeData.count.toLocaleString()}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openStoryModal(reel);
                        setShowCommentsDrawer(true);
                      }}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', gap: '3px' }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageCircle size={18} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800 }}>{reel.comments?.length || 12}</span>
                    </button>

                    <button
                      onClick={(e) => handleShare(reel, e)}
                      title="Copiază link"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', gap: '3px' }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Share2 size={18} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800 }}>Share</span>
                    </button>
                  </div>

                  {/* Bottom Text & Quick Buy Link */}
                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '68px', zIndex: 4, textAlign: 'left' }}>
                    <strong style={{ fontSize: '0.88rem', color: '#fda4af', display: 'block', marginBottom: '4px' }}>
                      {reel.author}
                    </strong>
                    <p style={{ fontSize: '0.78rem', color: '#ffffff', lineHeight: 1.35, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {reel.caption}
                    </p>

                    <Link
                      to={`/checkout?bouquet=${reel.bouquetId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-primary btn-sm"
                      style={{ 
                        fontSize: '0.75rem', 
                        padding: '7px 12px', 
                        width: '100%', 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, var(--rose-600), #9f1239)',
                        border: 'none',
                        borderRadius: '20px'
                      }}
                    >
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Comandă ({reel.price})</span>
                      <ShoppingBag size={13} style={{ flexShrink: 0, marginLeft: '6px' }} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* VIEW 2: VERTICAL FULL FEED TIKTOK SIMULATOR */
          <div className="reel-vertical-feed" id="reel-vertical-feed">
            {filteredReels.map((reel) => {
              const likeData = likesState[reel.id] || { count: reel.initialLikes, liked: false };

              return (
                <div
                  key={reel.id}
                  id={`reel-vcard-${reel.id}`}
                  className="reel-vertical-card"
                  onClick={() => openStoryModal(reel)}
                  onDoubleClick={(e) => handleCardDoubleTap(reel, e)}
                >
                  <img
                    src={reel.cover}
                    alt={reel.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 50%, rgba(0,0,0,0.7) 100%)', pointerEvents: 'none' }} />

                  {/* Header Badge */}
                  <div style={{ position: 'absolute', top: '18px', left: '18px', right: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 3 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'var(--rose-600)', color: '#fff', padding: '5px 12px', borderRadius: '20px' }}>
                      {reel.badge}
                    </span>
                    <span style={{ fontSize: '0.76rem', background: 'rgba(0,0,0,0.65)', color: '#fecdd3', padding: '4px 12px', borderRadius: '20px', fontWeight: 700 }}>
                      <Eye size={12} style={{ display: 'inline', marginRight: '4px' }} />{reel.views}
                    </span>
                  </div>

                  {/* Play Center */}
                  <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(225, 29, 72, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 30px rgba(225, 29, 72, 0.6)' }}>
                    <Play size={28} style={{ marginLeft: '4px' }} fill="#fff" />
                  </div>

                  {/* Right Social */}
                  <div style={{ position: 'absolute', right: '16px', bottom: '130px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', zIndex: 3 }}>
                    <button
                      onClick={(e) => handleLike(reel.id, e)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff' }}
                    >
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={22} fill={likeData.liked ? '#e11d48' : 'none'} color={likeData.liked ? '#e11d48' : '#fff'} />
                      </div>
                      <span style={{ fontSize: '0.76rem', fontWeight: 800, marginTop: '3px' }}>{likeData.count.toLocaleString()}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openStoryModal(reel);
                        setShowCommentsDrawer(true);
                      }}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff' }}
                    >
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageCircle size={20} />
                      </div>
                      <span style={{ fontSize: '0.76rem', fontWeight: 800, marginTop: '3px' }}>{reel.comments?.length || 12}</span>
                    </button>

                    <button
                      onClick={(e) => handleShare(reel, e)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff' }}
                    >
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Share2 size={20} />
                      </div>
                      <span style={{ fontSize: '0.76rem', fontWeight: 800, marginTop: '3px' }}>Share</span>
                    </button>
                  </div>

                  {/* Bottom Text & CTA */}
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '80px', zIndex: 3 }}>
                    <strong style={{ fontSize: '0.94rem', color: '#fda4af', display: 'block', marginBottom: '6px' }}>{reel.author}</strong>
                    <p style={{ fontSize: '0.85rem', color: '#ffffff', lineHeight: 1.4, marginBottom: '14px' }}>{reel.caption}</p>
                    <Link
                      to={`/checkout?bouquet=${reel.bouquetId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'space-between', padding: '10px 18px', borderRadius: '24px' }}
                    >
                      <span>Vreau acest buchet ({reel.price})</span>
                      <ShoppingBag size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          IMMERSIVE TIKTOK STORY PLAYER MODAL (9:16 VERTICAL EXPERIENCE)
          ========================================================================= */}
      {activeModalReel && (
        <div 
          id="tiktok-story-modal"
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0, 0, 0, 0.88)', 
            backdropFilter: 'blur(12px)', 
            zIndex: 99999, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '16px' 
          }}
          onClick={closeStoryModal}
        >
          {/* Main 9:16 Frame */}
          <div
            id="tiktok-story-viewport"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => handleCardDoubleTap(activeModalReel, e)}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '410px',
              height: '92vh',
              maxHeight: '740px',
              borderRadius: '28px',
              overflow: 'hidden',
              background: '#000000',
              boxShadow: '0 25px 60px rgba(225, 29, 72, 0.4), 0 0 0 1px rgba(254, 205, 211, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              userSelect: 'none'
            }}
          >
            {/* Top Story Progress Bar */}
            <div className="story-progress-bar-rail">
              <div 
                className="story-progress-fill" 
                style={{ width: `${modalProgress}%` }} 
              />
            </div>

            {/* Top Bar Header */}
            <div style={{ position: 'absolute', top: '24px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RoseIcon size={16} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{activeModalReel.author}</span>
                    <Check size={13} color="#38bdf8" strokeWidth={3} />
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#fecdd3' }}>Clip Viral Stardust Florals</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Sound Toggle */}
                <button
                  id="btn-reel-sound-toggle"
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (isMuted) playLuxuryChime();
                  }}
                  title={isMuted ? 'Activează Sunet' : 'Dezactivează Sunet'}
                  style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Pause/Play Toggle */}
                <button
                  id="btn-reel-pause-toggle"
                  onClick={() => setIsModalPaused(!isModalPaused)}
                  title={isModalPaused ? 'Redă' : 'Pauză'}
                  style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  {isModalPaused ? <Play size={16} fill="#fff" /> : <Pause size={16} />}
                </button>

                {/* Close Button */}
                <button
                  id="btn-modal-close"
                  onClick={closeStoryModal}
                  title="Închide"
                  style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Video Simulator Background */}
            <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
              <img
                src={activeModalReel.cover}
                alt={activeModalReel.caption}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isModalPaused ? 'scale(1)' : 'scale(1.05)',
                  transition: 'transform 8s ease-out'
                }}
              />

              {/* Shading gradients */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 100%)', pointerEvents: 'none' }} />

              {/* Tap Center Feedback */}
              {isModalPaused && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Play size={32} style={{ marginLeft: '4px' }} fill="#fff" />
                </div>
              )}

              {/* Floating Hearts from double tap */}
              {floatingHearts.map((h) => (
                <div key={h.id} className="floating-heart-burst">
                  <Heart size={68} fill="#e11d48" color="#ffffff" />
                </div>
              ))}

              {/* Right Sidebar Interaction Icons */}
              <div style={{ position: 'absolute', right: '14px', bottom: '110px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', zIndex: 24 }}>
                {/* Like Button */}
                <button
                  id="btn-modal-like"
                  onClick={() => handleLike(activeModalReel.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff' }}
                >
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart 
                      size={24} 
                      fill={likesState[activeModalReel.id]?.liked ? '#e11d48' : 'none'} 
                      color={likesState[activeModalReel.id]?.liked ? '#e11d48' : '#ffffff'} 
                    />
                  </div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, marginTop: '4px' }}>
                    {likesState[activeModalReel.id]?.count?.toLocaleString() || activeModalReel.initialLikes}
                  </span>
                </button>

                {/* Comments Button */}
                <button
                  id="btn-modal-comments"
                  onClick={() => setShowCommentsDrawer(!showCommentsDrawer)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff' }}
                >
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={22} />
                  </div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, marginTop: '4px' }}>
                    {activeModalReel.comments?.length || 12}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  id="btn-modal-share"
                  onClick={(e) => handleShare(activeModalReel, e)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff' }}
                >
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Share2 size={22} />
                  </div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, marginTop: '4px' }}>Share</span>
                </button>

                {/* Next Reel Down-Arrow */}
                <button
                  id="btn-modal-next-reel"
                  onClick={handleNextModalReel}
                  title="Următorul Reel"
                  style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(225, 29, 72, 0.4)', border: '1px solid #f43f5e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: '6px' }}
                >
                  <ChevronRight size={22} style={{ transform: 'rotate(90deg)' }} />
                </button>
              </div>

              {/* Bottom Caption, Music Ticker & Buy Link */}
              <div style={{ position: 'absolute', bottom: '14px', left: '16px', right: '74px', zIndex: 24, textAlign: 'left' }}>
                <p style={{ fontSize: '0.84rem', color: '#ffffff', lineHeight: 1.4, marginBottom: '8px' }}>
                  {activeModalReel.caption}
                </p>

                {/* Music Ticker */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#fecdd3', marginBottom: '12px' }}>
                  <Music size={13} color="#fecdd3" style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    Sunet Original • Stardust Atelier București (Chopin & Petale)
                  </span>
                </div>

                {/* Instant Purchase CTA */}
                <Link
                  id="btn-modal-buy"
                  to={`/checkout?bouquet=${activeModalReel.bouquetId}`}
                  onClick={closeStoryModal}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    fontSize: '0.82rem',
                    justifyContent: 'space-between',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, var(--rose-600), #9f1239)',
                    boxShadow: '0 8px 24px rgba(225, 29, 72, 0.6)'
                  }}
                >
                  <span>Comandă Buchetul ({activeModalReel.price})</span>
                  <ShoppingBag size={15} />
                </Link>
              </div>

              {/* Comments Slide-up Drawer */}
              {showCommentsDrawer && (
                <div
                  id="tiktok-comments-drawer"
                  style={{
                    position: 'absolute',
                    inset: '160px 0 0 0',
                    background: 'rgba(15, 5, 8, 0.96)',
                    backdropFilter: 'blur(16px)',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    borderTop: '1px solid rgba(254, 205, 211, 0.25)',
                    zIndex: 30,
                    padding: '20px 18px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(254, 205, 211, 0.1)', paddingBottom: '10px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
                      Comentarii Comunitate ({activeModalReel.comments?.length || 0})
                    </div>
                    <button
                      onClick={() => setShowCommentsDrawer(false)}
                      style={{ background: 'transparent', border: 'none', color: '#fecdd3', cursor: 'pointer' }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {activeModalReel.comments?.map((c) => (
                      <div key={c.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                          {c.user[1]?.toUpperCase() || 'U'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fda4af' }}>{c.user}</div>
                          <div style={{ fontSize: '0.8rem', color: '#ffffff', marginTop: '2px', lineHeight: 1.35 }}>{c.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(254, 205, 211, 0.1)', paddingTop: '10px', display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Adaugă un comentariu..."
                      style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(254,205,211,0.2)', borderRadius: '20px', padding: '8px 14px', fontSize: '0.78rem', color: '#fff', outline: 'none' }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          const newCom = { id: Date.now(), user: '@vizitator_nou', text: e.target.value.trim() };
                          activeModalReel.comments.push(newCom);
                          e.target.value = '';
                          playHeartPopSound();
                        }
                      }}
                    />
                    <button
                      onClick={() => playHeartPopSound()}
                      style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--rose-600)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Toast on Share */}
          {copiedShareToast && (
            <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#ffffff', padding: '10px 20px', borderRadius: '30px', fontWeight: 700, fontSize: '0.85rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', zIndex: 100000, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={16} /> Link copiat! Îl poți trimite pe WhatsApp sau Instagram!
            </div>
          )}
        </div>
      )}
    </section>
  );
}
