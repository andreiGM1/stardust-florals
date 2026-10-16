import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, ShieldCheck, Camera, X, CheckCircle2, 
  UploadCloud, Sparkles, Copy, ArrowRight, Heart, 
  Image as ImageIcon, Trash2, Check, ExternalLink, Tag
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { launchLuxuryConfetti } from '../utils/confetti';
import { playLuxuryChime } from '../utils/audioAlert';
import { CouponVoucherIcon, CameraPlusIcon, RoseIcon, CrownIcon } from './CustomIcons';

const EMOTION_TAGS = [
  'A lăcrimat de fericire',
  'Sclipiciul arată divin în lumină',
  'Partenera a fost complet fascinată',
  'Livrare impecabilă la minut',
  'Felicitarea video QR a fost un mare succes',
  'Parfumul de atelier persistă incredibil'
];

const PRESET_SAMPLE_PHOTOS = [
  {
    id: 'lifestyle-metro',
    title: 'Surpriză la Metrou',
    url: '/images/client-surpriza-metrou-lifestyle.webp',
    desc: 'Cadou spectaculos în public'
  },
  {
    id: 'unboxing-delivery',
    title: 'Cutie & Ursuleț',
    url: '/images/client-livrare-metrou-cadou.webp',
    desc: 'Despachetare completă'
  },
  {
    id: 'bicolor-angle',
    title: 'Trandafiri Sclipitori',
    url: '/images/buchet-dual-noir-rouge-angle.webp',
    desc: 'Efect diamant în lumină'
  }
];

export default function PostOrderReviewModal({ 
  isOpen, 
  onClose, 
  initialData = {},
  onReviewSubmitted 
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState(EMOTION_TAGS[0]);
  const [authorName, setAuthorName] = useState('');
  const [cityName, setCityName] = useState('București');
  const [orderId, setOrderId] = useState('');
  const [bouquetName, setBouquetName] = useState(PRODUCTS[0].name);
  const [reviewText, setReviewText] = useState('');
  
  // Photo states
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  // Submit & Reward states
  const [isSuccessVoucher, setIsSuccessVoucher] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsSuccessVoucher(false);
      setCouponCopied(false);
      setErrorMessage('');

      if (initialData.orderId) setOrderId(initialData.orderId);
      if (initialData.recipientName) setAuthorName(initialData.recipientName);
      if (initialData.senderName && !initialData.recipientName) setAuthorName(initialData.senderName);
      if (initialData.bouquet) setBouquetName(initialData.bouquet);
      if (initialData.bouquetName) setBouquetName(initialData.bouquetName);
      if (initialData.city) setCityName(initialData.city);

      // Default review text suggestion if empty
      if (!reviewText) {
        setReviewText('Trandafirii au arătat absolut copleșitor! Sclipiciul de diamant nu cade deloc pe haine, iar deschiderea cutiei a fost un moment magic.');
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleRatingHover = (val) => setHoverRating(val);
  const handleRatingLeave = () => setHoverRating(0);
  const handleRatingClick = (val) => {
    setRating(val);
    playLuxuryChime();
  };

  const getRatingLabel = (val) => {
    switch (val) {
      case 5: return '5 Stele — Excepțional (Efect Wow Garantat)';
      case 4: return '4 Stele — Foarte Frumos (Cadou Reușit)';
      case 3: return '3 Stele — Bun (Conform Așteptărilor)';
      case 2: return '2 Stele — Satisfăcător';
      default: return '1 Stea — Necesită Îmbunătățiri';
    }
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Te rugăm să încarci un fișier de tip imagine (PNG, JPG, WEBP).');
      return;
    }
    setErrorMessage('');
    setPhotoFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedPhotoUrl(e.target.result);
      playLuxuryChime();
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPresetPhoto = (preset) => {
    setUploadedPhotoUrl(preset.url);
    setPhotoFileName(preset.title);
    setErrorMessage('');
    playLuxuryChime();
  };

  const handleRemovePhoto = () => {
    setUploadedPhotoUrl('');
    setPhotoFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setErrorMessage('Te rugăm să completezi numele tău.');
      return;
    }
    if (!reviewText.trim()) {
      setErrorMessage('Te rugăm să scrii câteva cuvinte despre experiența ta.');
      return;
    }

    const newReview = {
      id: Date.now(),
      author: authorName.trim(),
      city: cityName.trim() || 'România',
      orderId: orderId.trim() || `SF-${Math.floor(1000 + Math.random() * 9000)}`,
      rating,
      date: 'Chiar acum',
      verified: true,
      hasPhoto: Boolean(uploadedPhotoUrl),
      photoUrl: uploadedPhotoUrl || null,
      text: reviewText.trim(),
      bouquet: bouquetName,
      emotionTag: selectedEmotion,
      hasTeddy: reviewText.toLowerCase().includes('ursuleț') || reviewText.toLowerCase().includes('plus'),
      isBicolor: bouquetName.toLowerCase().includes('dual') || bouquetName.toLowerCase().includes('bicolor')
    };

    // Save to user reviews
    const stored = JSON.parse(localStorage.getItem('stardust_user_reviews') || '[]');
    stored.unshift(newReview);
    localStorage.setItem('stardust_user_reviews', JSON.stringify(stored));

    // Save 20% coupon to active discount
    localStorage.setItem('stardust_active_discount', 'STARDUST20');

    // Notify other components
    window.dispatchEvent(new CustomEvent('stardust-review-added', { detail: newReview }));
    if (onReviewSubmitted) onReviewSubmitted(newReview);

    // Trigger celebration effects
    launchLuxuryConfetti();
    playLuxuryChime();

    setIsSuccessVoucher(true);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('STARDUST20');
    setCouponCopied(true);
    playLuxuryChime();
    setTimeout(() => setCouponCopied(false), 3000);
  };

  const activeStarCount = hoverRating || rating;

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
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="post-order-review-modal-card"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #1a0812 0%, #0c0307 100%)',
          border: '1.5px solid #e11d48',
          borderRadius: '26px',
          padding: '32px 28px',
          width: '100%',
          maxWidth: '620px',
          color: '#ffffff',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(225, 29, 72, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          id="btn-close-review-modal"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          aria-label="Închide formularul"
        >
          <X size={18} />
        </button>

        {!isSuccessVoucher ? (
          <div>
            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.35)', padding: '5px 14px', borderRadius: '20px', marginBottom: '10px' }}>
                <CameraPlusIcon size={14} color="#f43f5e" />
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#fbcfe8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  RECENZIE FOTO • CUPON INSTANT 20%
                </span>
              </div>

              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.5rem, 3.8vw, 2.1rem)', margin: '4px 0 8px', color: '#ffffff' }}>
                Evaluează <span style={{ color: '#fb7185' }}>Experiența Magică</span>
              </h2>

              <p style={{ fontSize: '0.86rem', color: '#fda4af', margin: '0 auto', maxWidth: '480px', lineHeight: 1.45 }}>
                Încarcă o poză cu reacția sau desfacerea buchetului și primești automat un cupon exclusiv de <strong>20% reducere</strong> pentru comanda viitoare!
              </p>
            </div>

            {errorMessage && (
              <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '12px', padding: '10px 14px', fontSize: '0.82rem', color: '#fca5a5', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <X size={16} color="#ef4444" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Star Rating Section */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  Cum a fost reacția la primire?
                </span>

                <div 
                  id="review-star-rating-selector"
                  style={{ display: 'inline-flex', gap: '8px', cursor: 'pointer', margin: '4px 0 8px' }}
                  onMouseLeave={handleRatingLeave}
                >
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isLit = starVal <= activeStarCount;
                    return (
                      <button
                        type="button"
                        key={starVal}
                        id={`btn-star-rate-${starVal}`}
                        onClick={() => handleRatingClick(starVal)}
                        onMouseEnter={() => handleRatingHover(starVal)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px',
                          cursor: 'pointer',
                          transform: isLit ? 'scale(1.12)' : 'scale(1)',
                          transition: 'transform 0.15s ease'
                        }}
                        aria-label={`${starVal} din 5 stele`}
                      >
                        <Star 
                          size={28} 
                          color={isLit ? '#f59e0b' : '#64748b'} 
                          fill={isLit ? '#f59e0b' : 'none'} 
                        />
                      </button>
                    );
                  })}
                </div>

                <div style={{ fontSize: '0.8rem', color: '#fde047', fontWeight: 700 }}>
                  {getRatingLabel(activeStarCount)}
                </div>
              </div>

              {/* Emotion Reaction Badges */}
              <div>
                <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  Alege Sentimentul Principal:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {EMOTION_TAGS.map((tag) => {
                    const isSelected = selectedEmotion === tag;
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => {
                          setSelectedEmotion(tag);
                          playLuxuryChime();
                        }}
                        style={{
                          background: isSelected ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'rgba(255, 255, 255, 0.05)',
                          border: isSelected ? '1px solid #fb7185' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: isSelected ? '#ffffff' : '#fda4af',
                          fontSize: '0.76rem',
                          fontWeight: isSelected ? 700 : 500,
                          borderRadius: '20px',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Heart size={12} fill={isSelected ? '#ffffff' : 'none'} />
                        <span>{tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row: Name & City */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div>
                  <label htmlFor="input-review-author" style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Numele Tău:
                  </label>
                  <input 
                    id="input-review-author"
                    type="text"
                    required
                    placeholder="ex: Andrei V. sau Elena M."
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="input-review-city" style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Oraș / Zonă:
                  </label>
                  <input 
                    id="input-review-city"
                    type="text"
                    placeholder="ex: București (Sector 1)"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Row: Bouquet & Order ID */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div>
                  <label htmlFor="select-review-bouquet" style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Buchetul Evaluat:
                  </label>
                  <select
                    id="select-review-bouquet"
                    value={bouquetName}
                    onChange={(e) => setBouquetName(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#1c0914',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  >
                    {PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.name}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="input-review-orderid" style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Cod Comandă (Opțional):
                  </label>
                  <input 
                    id="input-review-orderid"
                    type="text"
                    placeholder="ex: SD-883719"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label htmlFor="textarea-review-text" style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  Impresia Ta / Reacția la Despachetare:
                </label>
                <textarea 
                  id="textarea-review-text"
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Cum a reacționat destinatara? Cum a arătat sclipiciul în lumina serii? A fost livrarea rapidă?"
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Photo Upload Zone (UGC Core Feature) */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1.5px dashed rgba(244, 63, 94, 0.4)', borderRadius: '18px', padding: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#fda4af', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '10px' }}>
                  <Camera size={14} color="#f43f5e" />
                  <span>Fotografie Reală de la Primire (Necesară pt. Cupon 20%)</span>
                </span>

                <input 
                  type="file" 
                  ref={fileInputRef}
                  id="input-file-review-photo"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />

                {!uploadedPhotoUrl ? (
                  <div>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        padding: '18px 12px',
                        borderRadius: '14px',
                        background: isDragging ? 'rgba(225, 29, 72, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        border: isDragging ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.06)',
                        transition: 'all 0.2s ease',
                        marginBottom: '12px'
                      }}
                    >
                      <UploadCloud size={28} color="#f43f5e" style={{ margin: '0 auto 6px' }} />
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>
                        Trage poza aici sau apasă pentru a încărca din telefon/PC
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                        Acceptă PNG, JPG, WEBP (format portret sau peisaj)
                      </div>
                    </div>

                    {/* Quick Preset Photos For Easy 1-Click Testing */}
                    <div style={{ textAlign: 'left', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                        Nu ai o poză la îndemână? Alege o mostră din atelier:
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {PRESET_SAMPLE_PHOTOS.map((preset) => (
                          <button
                            type="button"
                            key={preset.id}
                            id={`btn-preset-photo-${preset.id}`}
                            onClick={() => handleSelectPresetPhoto(preset)}
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              borderRadius: '10px',
                              padding: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              textAlign: 'left'
                            }}
                          >
                            <img 
                              src={preset.url} 
                              alt={preset.title}
                              style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                            />
                            <div style={{ overflow: 'hidden' }}>
                              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fbcfe8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {preset.title}
                              </div>
                              <div style={{ fontSize: '0.64rem', color: '#94a3b8' }}>
                                Exemplu
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '14px', padding: '10px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={uploadedPhotoUrl} 
                        alt="Previzualizare poză încărcată"
                        style={{ width: '54px', height: '54px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #10b981' }}
                      />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.78rem', fontWeight: 800 }}>
                          <CheckCircle2 size={14} />
                          <span>Poză Receptată & Verificată</span>
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: '2px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {photoFileName || 'Fotografie primire'}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      id="btn-remove-review-photo"
                      onClick={handleRemovePhoto}
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.74rem'
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Șterge</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="btn-submit-post-review"
                className="btn btn-primary btn-lg"
                style={{
                  width: '100%',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.4)'
                }}
              >
                <CouponVoucherIcon size={18} color="#ffffff" />
                <span>Trimite Recenzia & Generează Cuponul de 20%</span>
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen with Luxury Voucher */
          <div id="review-voucher-success-card" style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#10b981' }}>
              <CheckCircle2 size={36} />
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '4px 14px', borderRadius: '20px', marginBottom: '8px' }}>
              <CrownIcon size={14} color="#f59e0b" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#fef08a', letterSpacing: '1px', textTransform: 'uppercase' }}>
                RECOMPENSĂ ACTIVATĂ CU SUCCES
              </span>
            </div>

            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.9rem', margin: '6px 0 10px', color: '#ffffff' }}>
              Îți Mulțumim din Suflet, {authorName}!
            </h2>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.45 }}>
              Recenzia ta a fost publicată pe pagina comunității. Pentru aprecierea ta, am deblocat cuponul tău regal de reducere:
            </p>

            {/* Gilded Ticket Voucher */}
            <div style={{
              background: 'linear-gradient(135deg, #240c17 0%, #11040a 100%)',
              border: '2px solid #f59e0b',
              borderRadius: '20px',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 12px 36px rgba(245, 158, 11, 0.25)',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed rgba(245, 158, 11, 0.4)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CouponVoucherIcon size={20} color="#f59e0b" />
                  <span style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '0.85rem', fontWeight: 800, color: '#fef08a', letterSpacing: '1.5px' }}>
                    VOUCHER CADOU ATELIER
                  </span>
                </div>
                <span style={{ fontSize: '0.74rem', background: '#059669', color: '#ffffff', padding: '3px 8px', borderRadius: '10px', fontWeight: 800 }}>
                  -20% REDUCERE
                </span>
              </div>

              <div style={{ margin: '14px 0' }}>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                  Cod Cupon Exclusiv:
                </span>
                <div 
                  id="voucher-display-code"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '2rem',
                    fontWeight: 900,
                    letterSpacing: '3px',
                    color: '#fef08a',
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '8px 18px',
                    borderRadius: '12px',
                    display: 'inline-block',
                    border: '1px solid rgba(245, 158, 11, 0.3)'
                  }}
                >
                  STARDUST20
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '16px' }}>
                Valabil 365 de zile pentru orice buchet sau cutie Stardust Florals.
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  type="button"
                  id="btn-copy-review-voucher"
                  onClick={handleCopyCoupon}
                  className="btn btn-secondary btn-sm"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderColor: '#f59e0b',
                    color: '#fef08a',
                    background: 'rgba(245, 158, 11, 0.1)'
                  }}
                >
                  {couponCopied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                  <span>{couponCopied ? 'Cod Copiat în Clipboard!' : 'Copiază Codul STARDUST20'}</span>
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="/checkout?discount=STARDUST20"
                id="btn-apply-voucher-to-checkout"
                className="btn btn-primary btn-lg"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  borderColor: '#22c55e',
                  color: '#ffffff',
                  boxShadow: '0 8px 24px rgba(22, 163, 74, 0.3)'
                }}
              >
                <span>Folosește Cuponul la Următoarea Comandă (-20%)</span>
                <ArrowRight size={18} />
              </a>

              <button
                type="button"
                id="btn-finish-review-dialog"
                onClick={onClose}
                className="btn btn-secondary btn-md"
                style={{ width: '100%' }}
              >
                Închide Fereastra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
