import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Heart, Sparkles, Send, CheckCircle, Search, Camera, Filter, X, ZoomIn, MapPin, Video } from 'lucide-react';
import { MetroIcon, TeddyIcon, SparkleIcon, DiamondIcon, RoseIcon, CameraPlusIcon, CouponVoucherIcon } from '../components/CustomIcons';
import { REVIEWS } from '../data/products';
import TikTokVideoReels from '../components/TikTokVideoReels';
import VoiceMemoTestimonials from '../components/VoiceMemoTestimonials';

export default function ReviewsPage({ onOpenReviewModal }) {
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [bouquet, setBouquet] = useState('Buchet Signature Dual Noir & Rouge');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  // Filter & Search states
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'photo', '5star', 'teddy', 'bicolor'
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const loadStoredReviews = () => {
      const stored = JSON.parse(localStorage.getItem('stardust_user_reviews') || '[]');
      if (stored.length > 0) {
        setReviewsList([...stored, ...REVIEWS]);
      } else {
        setReviewsList(REVIEWS);
      }
    };

    loadStoredReviews();
    window.addEventListener('stardust-review-added', loadStoredReviews);
    return () => window.removeEventListener('stardust-review-added', loadStoredReviews);
  }, []);

  // Filter counts
  const countAll = reviewsList.length;
  const countPhoto = reviewsList.filter((r) => r.hasPhoto || r.photoUrl).length;
  const count5Star = reviewsList.filter((r) => r.rating === 5).length;
  const countTeddy = reviewsList.filter((r) => r.hasTeddy).length;
  const countBicolor = reviewsList.filter((r) => r.isBicolor || r.bouquet?.includes('Noir') || r.bouquet?.includes('bicolor') || r.bouquet?.includes('Dual')).length;

  const filteredReviews = reviewsList.filter((r) => {
    if (filterMode === 'photo' && !r.hasPhoto && !r.photoUrl) return false;
    if (filterMode === '5star' && r.rating !== 5) return false;
    if (filterMode === 'teddy' && !r.hasTeddy) return false;
    if (filterMode === 'bicolor' && !r.isBicolor && !r.bouquet?.includes('Noir') && !r.bouquet?.includes('bicolor') && !r.bouquet?.includes('Dual')) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        r.author?.toLowerCase().includes(q) ||
        r.city?.toLowerCase().includes(q) ||
        r.bouquet?.toLowerCase().includes(q) ||
        r.text?.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!author || !text) return;

    const newRev = {
      id: Date.now(),
      author: author.trim(),
      city: city.trim() || 'România',
      rating,
      date: 'Chiar acum',
      verified: true,
      text: text.trim(),
      bouquet
    };

    const stored = JSON.parse(localStorage.getItem('stardust_user_reviews') || '[]');
    stored.unshift(newRev);
    localStorage.setItem('stardust_user_reviews', JSON.stringify(stored));

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setAuthor('');
    setCity('');
    setText('');
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 40px', background: 'radial-gradient(circle at 50% 20%, rgba(225, 29, 72, 0.08), transparent 70%)', textAlign: 'center' }}>
        <div className="container">
          <span className="tag-badge">COMUNITATEA STARDUST</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', margin: '14px 0 16px' }}>
            Ce Spun Clienții pe <span className="highlight-rose">TikTok & Instagram</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Peste 1.500 de buchete livrate și lacrimi de bucurie provocate. Descoperă impresiile reale ale celor care au ales magia trandafirilor cu sclipici.
          </p>

          {/* Trust Score Box */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '16px 28px', borderRadius: '30px', boxShadow: 'var(--shadow-sm)', marginTop: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <div style={{ textAlign: 'left', borderLeft: '1px solid var(--border-light)', paddingLeft: '16px' }}>
              <strong style={{ fontSize: '1.2rem', color: 'var(--text-main)', display: 'block' }}>4.98 / 5.00 Scor</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Din 1.420+ recenzii verificate</span>
            </div>
          </div>

          {/* Hero UGC Review Modal Trigger (Task 48) */}
          <div style={{ marginTop: '24px' }}>
            <button
              type="button"
              id="btn-open-review-modal-hero"
              onClick={() => {
                if (onOpenReviewModal) onOpenReviewModal();
                else window.dispatchEvent(new CustomEvent('open-post-order-review'));
              }}
              className="btn btn-primary btn-md"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #e11d48, #be123c)', boxShadow: '0 6px 20px rgba(225, 29, 72, 0.35)' }}
            >
              <CameraPlusIcon size={18} color="#ffffff" />
              <span>Trimite Recenzia Ta cu Poză & Primește Cupon 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Real Delivery Photos Strip */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="tag-badge">MOMENTE REALE TIKTOK & STRADĂ</span>
            <h2 style={{ fontSize: '2.2rem', margin: '10px 0 8px' }}>Emoția Surprizelor în Direct</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>Imagini autentice surprinse chiar în drum spre persoana dragă.</p>
          </div>

          <div className="grid-4" style={{ gap: '20px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <img src="/images/client-surpriza-metrou-lifestyle.webp" alt="Client în metrou cu buchetul Stardust" style={{ width: '100%', height: '340px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <strong style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Surpriza din Metrou</span>
                  <MetroIcon size={14} color="var(--rose-600)" />
                </strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Pe drum spre aniversarea de 1 an. Toată lumea a întors capul după sclipiciul florilor!</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <img src="/images/client-livrare-metrou-cadou.webp" alt="Buchet și ursuleț de pluș" style={{ width: '100%', height: '340px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <strong style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Buchet Bicolor + Ursuleț</span>
                  <TeddyIcon size={14} color="#f59e0b" />
                </strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Pachetul complet: flori care strălucesc și pluș moale.</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <img src="/images/buchet-dual-noir-rouge-angle.webp" alt="Unghi detaliu buchet bicolor" style={{ width: '100%', height: '340px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <strong style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Finisaj Manual de Lux</span>
                  <SparkleIcon size={14} color="#f59e0b" />
                </strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Negru cosmic pe contur și roșu rubiniu în centru.</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <img src="/images/buchet-dual-noir-rouge-closeup.webp" alt="Macro sclipici diamant" style={{ width: '100%', height: '340px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <strong style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Sclipici Diamant Veritabil</span>
                  <DiamondIcon size={14} color="var(--rose-600)" />
                </strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Pulbere cosmetică fină fără cădere și miros încântător.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Reels Showcase */}
      <TikTokVideoReels />

      {/* Real WhatsApp Voice Memo Testimonials */}
      <VoiceMemoTestimonials />

      {/* Interactive Filter & Search Bar */}
      <div className="container" style={{ marginTop: '50px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '24px 28px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Caută în recenzii (oraș, metrou, sclipici, autor)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '11px 40px 11px 42px', borderRadius: '12px', border: '1.5px solid var(--border-light)', outline: 'none', fontSize: '0.92rem', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results count */}
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Afișăm <strong>{filteredReviews.length}</strong> din <strong>{countAll}</strong> recenzii reale
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              type="button"
              onClick={() => setFilterMode('all')}
              className={`btn btn-sm ${filterMode === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <SparkleIcon size={12} color="#f59e0b" />
              <span>Toate ({countAll})</span>
            </button>
            <button 
              type="button"
              onClick={() => setFilterMode('photo')}
              className={`btn btn-sm ${filterMode === 'photo' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Camera size={12} />
              <span>Cu Poze Reale ({countPhoto})</span>
            </button>
            <button 
              type="button"
              onClick={() => setFilterMode('5star')}
              className={`btn btn-sm ${filterMode === '5star' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Star size={12} fill="#f59e0b" color="#f59e0b" />
              <span>5 Stele ({count5Star})</span>
            </button>
            <button 
              type="button"
              onClick={() => setFilterMode('teddy')}
              className={`btn btn-sm ${filterMode === 'teddy' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <TeddyIcon size={12} color="#f59e0b" />
              <span>Cu Ursuleț Cadou ({countTeddy})</span>
            </button>
            <button 
              type="button"
              onClick={() => setFilterMode('bicolor')}
              className={`btn btn-sm ${filterMode === 'bicolor' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <RoseIcon size={12} color="var(--rose-600)" />
              <span>Dual Noir & Rouge ({countBicolor})</span>
            </button>
            <a 
              href="#tiktok-video-reels-section"
              className="btn btn-sm"
              style={{ fontSize: '0.82rem', background: '#19080c', color: '#fda4af', border: '1px solid #e11d48', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Video size={13} color="#f43f5e" />
              <span>Clipuri Video & Reels (6)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="container" style={{ marginBottom: '60px' }}>
        {filteredReviews.length === 0 ? (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '50px 20px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--rose-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Search size={28} color="var(--rose-600)" />
            </div>
            <h4 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Nicio recenzie nu corespunde criteriilor tale</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '18px' }}>
              Încearcă să resetezi căutarea sau alege o altă categorie din filtrele de mai sus.
            </p>
            <button 
              onClick={() => { setFilterMode('all'); setSearchQuery(''); }}
              className="btn btn-secondary btn-md"
            >
              Resetează Toate Filtrele
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {filteredReviews.map((rev) => (
              <div 
                key={rev.id} 
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                  </div>

                  {/* Attached photo thumbnail if available */}
                  {rev.photoUrl && (
                    <div 
                      onClick={() => setLightboxImg(rev.photoUrl)}
                      style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px', cursor: 'pointer', border: '1px solid var(--border-light)' }}
                      title="Apasă pentru a mări fotografia"
                    >
                      <img 
                        src={rev.photoUrl} 
                        alt={`Poză trimisă de ${rev.author}`} 
                        style={{ width: '100%', height: '190px', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }} 
                      />
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0, 0, 0, 0.7)', color: '#fff', padding: '4px 8px', borderRadius: '8px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)' }}>
                        <Camera size={12} />
                        <span>Poză Reală</span>
                        <ZoomIn size={12} />
                      </div>
                    </div>
                  )}

                  <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '18px' }}>
                    „{rev.text}”
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <strong>{rev.author}</strong>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                      <ShieldCheck size={12} /> Cumpărător Verificat
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="var(--rose-600)" />
                      <span>{rev.city}</span>
                    </span>
                    <span> • </span>
                    <span style={{ color: 'var(--rose-600)', fontWeight: 600 }}>{rev.bouquet}</span>
                  </div>

                  {/* Addon & Emotion Badges */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {rev.emotionTag && (
                      <span style={{ fontSize: '0.7rem', background: 'rgba(225, 29, 72, 0.15)', color: '#fb7185', border: '1px solid rgba(225, 29, 72, 0.3)', padding: '2px 8px', borderRadius: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Heart size={10} color="#fb7185" fill="#fb7185" />
                        <span>{rev.emotionTag}</span>
                      </span>
                    )}
                    {rev.hasPhoto && (
                      <span style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 6px', borderRadius: '6px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Camera size={11} color="#10b981" />
                        <span>Poză Verificată</span>
                      </span>
                    )}
                    {rev.hasTeddy && (
                      <span style={{ fontSize: '0.7rem', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '2px 6px', borderRadius: '6px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <TeddyIcon size={11} color="#f59e0b" />
                        <span>Ursuleț Inclus</span>
                      </span>
                    )}
                    {rev.isBicolor && (
                      <span style={{ fontSize: '0.7rem', background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', padding: '2px 6px', borderRadius: '6px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <RoseIcon size={11} color="#fb7185" />
                        <span>Dual Noir & Rouge</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Review Section */}
      <div className="container" style={{ maxWidth: '720px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '40px', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '8px', textAlign: 'center' }}>
            Ai primit sau ai dăruit un buchet Stardust?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', textAlign: 'center', marginBottom: '28px' }}>
            Împărtășește bucuria și ajută-i pe alții să aleagă surpriza perfectă!
          </p>

          {submitted && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '14px 20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} />
              <span>Mulțumim! Recenzia ta a fost adăugată cu succes.</span>
            </div>
          )}

          <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Numele Tău</label>
                <input 
                  type="text" 
                  required 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)} 
                  placeholder="Ex: Raluca I."
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Oraș</label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  placeholder="Ex: București"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Buchet Comandat</label>
              <select 
                value={bouquet} 
                onChange={(e) => setBouquet(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
              >
                <option value="Buchet Petite Sparkle (9 Trandafiri)">Buchet Petite Sparkle (9 Trandafiri)</option>
                <option value="Buchet Regal Glamour (19 Trandafiri)">Buchet Regal Glamour (19 Trandafiri)</option>
                <option value="Cutie Gigant Stardust Luxury (35 Trandafiri)">Cutie Gigant Stardust Luxury (35 Trandafiri)</option>
                <option value="Trandafir Etern sub Cupolă">Trandafir Etern sub Cupolă</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Părerea Ta & Reacția Persoanei Iubite</label>
              <textarea 
                rows={3} 
                required 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Cum a fost reacția la primirea florilor și scanarea codului QR?..."
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', fontFamily: 'inherit', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-md" style={{ width: '100%', marginTop: '8px' }}>
              <span>Trimite Recenzia</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {lightboxImg && (
        <div className="modal-overlay" onClick={() => setLightboxImg(null)}>
          <div 
            className="modal-content-luxury" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '680px', padding: '20px', textAlign: 'center' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={18} color="#e11d48" />
                <strong style={{ fontSize: '1rem' }}>Fotografie Reale de la Client Stardust</strong>
              </div>
              <button 
                onClick={() => setLightboxImg(null)}
                className="btn btn-sm btn-secondary"
                style={{ padding: '6px 12px' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-light)', maxHeight: '70vh', background: '#000' }}>
              <img 
                src={lightboxImg} 
                alt="Fotografie client mărită" 
                style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain', display: 'block' }} 
              />
            </div>

            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <SparkleIcon size={12} color="#f59e0b" />
                <span>Detaliu sclipici diamant și ambalaj de lux realizat manual în atelier</span>
              </span>
              <Link 
                to="/colectie" 
                onClick={() => setLightboxImg(null)}
                className="btn btn-primary btn-sm"
              >
                <span>Vezi Acest Buchet în Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
