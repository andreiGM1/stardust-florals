import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS, COLOR_OPTIONS } from '../data/products';
import { ArrowRight, Sparkles, Filter, Check, Palette, Ruler, SlidersHorizontal, X, Star, CheckCircle2, ShieldCheck, Heart, Zap } from 'lucide-react';
import { RoseIcon, GiftBoxIcon, SparkleIcon } from '../components/CustomIcons';
import { useCurrency } from '../context/CurrencyContext';

export default function CollectionPage() {
  const { formatPrice } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();
  const colorParam = searchParams.get('color') || 'all';

  const [selectedColor, setSelectedColor] = useState(colorParam);
  const [sizeFilter, setSizeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(500);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (colorParam) {
      setSelectedColor(colorParam);
    }
  }, [colorParam]);

  const handleColorChange = (colId) => {
    setSelectedColor(colId);
    if (colId === 'all') {
      searchParams.delete('color');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ color: colId });
    }
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    // Filter by max price
    if (p.price > maxPrice) return false;

    // Filter by size
    if (sizeFilter === 'small' && p.rosesCount > 10) return false;
    if (sizeFilter === 'medium' && (p.rosesCount <= 10 || p.rosesCount > 25)) return false;
    if (sizeFilter === 'large' && p.rosesCount <= 25) return false;
    
    // Filter by color intent
    if (selectedColor === 'bicolor-noir-rouge' && p.id !== 'signature-dual-noir-rouge') {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return b.isBestseller ? 1 : -1;
  });

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 40px', background: 'radial-gradient(circle at 50% 20%, rgba(225, 29, 72, 0.06), transparent 70%)', textAlign: 'center' }}>
        <div className="container">
          <span className="tag-badge">CATALOG EXCLUSIV 2026</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', margin: '14px 0 16px' }}>
            Colecția de Trandafiri cu <span className="highlight-rose">Sclipici Diamant</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Alege dimensiunea perfectă și nuanța dorită. Fiecare aranjament include ghirlandă micro-LED și felicitare cu cod QR video inclusă gratuit.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="container" style={{ marginBottom: '40px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Color Swatches Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Palette size={16} color="#e11d48" /> Nuanță:
            </span>
            <button
              className={`btn btn-sm ${selectedColor === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleColorChange('all')}
            >
              Toate Culorile
            </button>
            <button
              className={`btn btn-sm ${selectedColor === 'bicolor-noir-rouge' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleColorChange('bicolor-noir-rouge')}
            >
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, #000 50%, #e11d48 50%)', display: 'inline-block', marginRight: '4px' }} />
              Signature Bicolor (Negru + Roșu)
            </button>
            {COLOR_OPTIONS.slice(1).map((col) => (
              <button
                key={col.id}
                className={`btn btn-sm ${selectedColor === col.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleColorChange(col.id)}
              >
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: col.hex, display: 'inline-block', marginRight: '4px' }} />
                {col.name.split('+')[0]}
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Size Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Filter size={15} /> Mărime:
              </span>
              <button 
                className={`btn btn-sm ${sizeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSizeFilter('all')}
              >
                Toate
              </button>
              <button 
                className={`btn btn-sm ${sizeFilter === 'small' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSizeFilter('small')}
              >
                Petite (1-9 fire)
              </button>
              <button 
                className={`btn btn-sm ${sizeFilter === 'medium' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSizeFilter('medium')}
              >
                Regal (15-25 fire)
              </button>
              <button 
                className={`btn btn-sm ${sizeFilter === 'large' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSizeFilter('large')}
              >
                Luxury (35-101 fire)
              </button>
            </div>

            {/* Sort By */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Sortare:
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.88rem', fontWeight: 600, outline: 'none' }}
              >
                <option value="featured">Populare (Recomandate)</option>
                <option value="price-asc">Preț: Mic la Mare</option>
                <option value="price-desc">Preț: Mare la Mic</option>
              </select>
            </div>
          </div>

          {/* Budget Slider & Size Guide Button */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SlidersHorizontal size={15} color="#e11d48" /> Buget Maxim:
              </span>
              <input 
                type="range" 
                min="170" 
                max="500" 
                step="10" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ accentColor: '#e11d48', cursor: 'pointer', width: '150px' }}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--rose-600)', background: 'var(--rose-50)', padding: '3px 10px', borderRadius: '8px' }}>
                ≤ {formatPrice(maxPrice)}
              </span>
              {maxPrice < 500 && (
                <button 
                  onClick={() => setMaxPrice(500)}
                  className="btn btn-sm"
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.78rem', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Resetează
                </button>
              )}
            </div>

            <button 
              onClick={() => setIsSizeGuideOpen(true)}
              className="btn btn-gold btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Ruler size={16} />
              <span>Ghid Mărimi & Comparație (9 vs 19 vs 29)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Products Grid */}
      <div className="container">
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Niciun buchet nu corespunde filtrelor selectate</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '18px' }}>Încearcă să resetezi filtrele pentru a vedea toate modelele disponibile.</p>
            <button onClick={() => { setSelectedColor('all'); setSizeFilter('all'); }} className="btn btn-primary btn-md">
              Resetează Toate Filtrele
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {filteredProducts.map((prod) => (
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

                  <ul style={{ listStyle: 'none', margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {prod.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Check size={14} color="#e11d48" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="card-footer-row">
                    <div className="price-box">
                      <span className="old-price">{formatPrice(prod.oldPrice)}</span>
                      <span className="current-price">{formatPrice(prod.price)}</span>
                    </div>
                    <Link to={`/checkout?bouquet=${prod.id}`} className="btn btn-primary btn-sm">
                      <span>Comandă</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sustainability & Long-Term Savings Value Banner */}
        <div style={{ marginTop: '54px', background: 'var(--bg-card)', border: '1.5px solid var(--border-light)', borderRadius: '24px', padding: '30px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '22px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ maxWidth: '620px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 12px', borderRadius: '16px', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={13} color="#10b981" /> INVESTIȚIE INTELIGENTĂ PE TERMEN LUNG
            </span>
            <h3 style={{ fontSize: '1.38rem', margin: '10px 0 6px', color: 'var(--text-main)' }}>
              Știai că economisești peste 2.700 RON alegând trandafirii Stardust?
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              Trandafirii noștri își păstrează forma, catifeaua și strălucirea peste 3 ani fără ofilire, eliminând risipa a peste 12 buchete de flori naturale aruncate la gunoi.
            </p>
          </div>
          <a 
            id="btn-collection-goto-calc"
            href="/#calculator-sustenabilitate-sectiune" 
            className="btn btn-primary btn-md"
            style={{ whiteSpace: 'nowrap' }}
          >
            <span>Calculează Economia Ta</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Bouquet Size Comparison Modal */}
      {isSizeGuideOpen && (
        <div className="modal-overlay" onClick={() => setIsSizeGuideOpen(false)}>
          <div 
            className="modal-content-luxury" 
            style={{ maxWidth: '920px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ruler size={20} />
                </span>
                <div>
                  <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Ghid Vizual de Mărimi & Comparație</h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Alege proporția perfectă pentru momentul tău special</span>
                </div>
              </div>
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="modal-close"
                style={{ position: 'static' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Comparison Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              
              {/* Size 1: Petit */}
              <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-light)', borderRadius: '18px', padding: '22px', display: 'flex', flexDirection: 'column' }}>
                <span className="tag-badge" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>PETIT ÉCLAT</span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>9 Trandafiri Diamant</strong>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--rose-600)', margin: '8px 0 16px' }}>de la {formatPrice(179)}</span>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Ruler size={13} color="var(--rose-600)" /> <span><strong>Diametru:</strong> ~25 - 28 cm</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RoseIcon size={13} color="var(--rose-600)" /> <span><strong>Înălțime:</strong> 50 - 55 cm</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={13} color="#d97706" /> <span><strong>Iluminare:</strong> 20 Micro-LED-uri incluse</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><GiftBoxIcon size={13} color="var(--rose-600)" /> <span><strong>Impact:</strong> Delicat, intim și elegant</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Heart size={13} color="#e11d48" fill="#e11d48" /> <span><strong>Ocazie:</strong> Gest spontan, prima întâlnire, mulțumire</span></li>
                </ul>

                <button 
                  onClick={() => { setSizeFilter('small'); setIsSizeGuideOpen(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Vezi Buchete Petit
                </button>
              </div>

              {/* Size 2: Regal Glamour (Popular) */}
              <div style={{ background: 'var(--bg-card)', border: '2px solid var(--rose-600)', borderRadius: '18px', padding: '22px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 8px 30px rgba(225, 29, 72, 0.12)' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--rose-600)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 12px', borderRadius: '12px', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={11} fill="#fff" /> ALEGEREA POPULARĂ
                </div>
                <span className="tag-badge" style={{ alignSelf: 'flex-start', marginBottom: '10px', marginTop: '6px' }}>REGAL GLAMOUR</span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>19 Trandafiri Diamant</strong>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--rose-600)', margin: '8px 0 16px' }}>{formatPrice(249)}</span>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Ruler size={13} color="var(--rose-600)" /> <span><strong>Diametru:</strong> ~38 - 42 cm</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RoseIcon size={13} color="var(--rose-600)" /> <span><strong>Înălțime:</strong> 60 - 65 cm</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={13} color="#d97706" /> <span><strong>Iluminare:</strong> 40 Micro-LED-uri incluse</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><GiftBoxIcon size={13} color="var(--rose-600)" /> <span><strong>Impact:</strong> Impunător, efect WOW garantat</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Heart size={13} color="#e11d48" fill="#e11d48" /> <span><strong>Ocazie:</strong> Aniversări, zi de naștere, împăcare</span></li>
                </ul>

                <button 
                  onClick={() => { setSizeFilter('medium'); setIsSizeGuideOpen(false); }}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Vezi Buchete Regal
                </button>
              </div>

              {/* Size 3: Grand Majesté / Signature */}
              <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-light)', borderRadius: '18px', padding: '22px', display: 'flex', flexDirection: 'column' }}>
                <span className="tag-badge" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>SIGNATURE ATELIER</span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>25 - 29 Trandafiri</strong>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--rose-600)', margin: '8px 0 16px' }}>{formatPrice(269)} - {formatPrice(389)}</span>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Ruler size={13} color="var(--rose-600)" /> <span><strong>Diametru:</strong> ~48 - 55 cm (Volum grandios)</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RoseIcon size={13} color="var(--rose-600)" /> <span><strong>Înălțime:</strong> 65 - 70 cm</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={13} color="#d97706" /> <span><strong>Iluminare:</strong> 60 Micro-LED-uri + Gypsophila</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><GiftBoxIcon size={13} color="var(--rose-600)" /> <span><strong>Impact:</strong> Lux absolut, capodoperă virală</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Heart size={13} color="#e11d48" fill="#e11d48" /> <span><strong>Ocazie:</strong> Cerere în căsătorie, majorat, lux</span></li>
                </ul>

                <Link 
                  to="/checkout?bouquet=signature-dual-noir-rouge"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="btn btn-gold btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Alege Ediția Atelier ({formatPrice(269)})
                </Link>
              </div>

            </div>

            <div style={{ textAlign: 'center', background: 'var(--rose-50)', padding: '14px', borderRadius: '12px', fontSize: '0.84rem', color: 'var(--rose-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <SparkleIcon size={14} color="var(--rose-600)" />
              <span><strong>Toate buchetele includ gratuit:</strong> Felicitare de lux cu cod QR video + Baterii pentru micro-LED-uri + Conservant floral.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
