import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Sparkles, Heart, Lock, MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import { SparkleIcon } from './CustomIcons';

export default function Footer() {
  return (
    <footer style={{ background: '#17060a', color: '#fecdd3', paddingTop: '70px', paddingBottom: '40px', borderTop: '1px solid #380d17' }}>
      <div className="container">
        {/* Trust Badges Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', paddingBottom: '50px', borderBottom: '1px solid #2d0b13', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'rgba(225, 29, 72, 0.2)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb7185' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.95rem' }}>100% Sclipici Cosmetic</strong>
              <span style={{ fontSize: '0.82rem', color: '#fda4af' }}>Netoxic, certificat & ecologic</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'rgba(225, 29, 72, 0.2)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb7185' }}>
              <Truck size={24} />
            </div>
            <div>
              <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.95rem' }}>Livrare Rapidă Securizată</strong>
              <span style={{ fontSize: '0.82rem', color: '#fda4af' }}>În 2-4h București/Ilfov, 24h național</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'rgba(225, 29, 72, 0.2)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb7185' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.95rem' }}>Garanție Prospețime 7 Zile</strong>
              <span style={{ fontSize: '0.82rem', color: '#fda4af' }}>Trandafiri premium de Ecuador</span>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.6rem', fontFamily: 'Playfair Display, serif', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px' }}>
              <SparkleIcon size={24} color="var(--gold-400)" />
              <span>Stardust<span style={{ color: '#e11d48', fontStyle: 'italic', fontWeight: 400 }}>Florals</span></span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#fda4af', lineHeight: 1.6, maxWidth: '280px' }}>
              Brandul nr. 1 din România pentru trandafiri cu sclipici de diamant și felicitare unică cu cod QR video. Cadoul viral care lasă fără cuvinte.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '18px' }}>Navigare Rapidă</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/" style={{ color: '#fecdd3', textDecoration: 'none', fontSize: '0.9rem' }}>Acasă</Link></li>
              <li><Link to="/colectie" style={{ color: '#fecdd3', textDecoration: 'none', fontSize: '0.9rem' }}>Colecție Trandafiri</Link></li>
              <li><Link to="/video-qr" style={{ color: '#fecdd3', textDecoration: 'none', fontSize: '0.9rem' }}>Felicitare Video QR</Link></li>
              <li><Link to="/recenzii" style={{ color: '#fecdd3', textDecoration: 'none', fontSize: '0.9rem' }}>Recenzii & TikTok</Link></li>
              <li><Link to="/checkout" style={{ color: '#fecdd3', textDecoration: 'none', fontSize: '0.9rem' }}>Comandă Imediată</Link></li>
              <li>
                <Link to="/urmarire-comanda" style={{ color: '#fecdd3', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={14} color="#fecdd3" />
                  <span>Urmărire Comandă (Live AWB)</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: '#fda4af', textDecoration: 'none', fontSize: '0.8rem', opacity: 0.7, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={12} color="#fda4af" />
                  <span>Panou Lead-uri (Admin)</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '18px' }}>Asistență & Comenzi</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="https://wa.me/40700000000" target="_blank" rel="noreferrer" style={{ color: '#25d366', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={15} color="#25d366" />
                  <span>WhatsApp Direct (24/7)</span>
                </a>
              </li>
              <li>
                <span style={{ color: '#fda4af', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} color="#fda4af" />
                  <span>Telefon: +40 700 000 000</span>
                </span>
              </li>
              <li>
                <span style={{ color: '#fda4af', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#fda4af" />
                  <span>Atelier: București, România</span>
                </span>
              </li>
              <li>
                <span style={{ color: '#fda4af', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="#fda4af" />
                  <span>Program comenzi: Non-stop online</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #2d0b13', fontSize: '0.82rem', color: '#9f737c', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <span>© {new Date().getFullYear()} Stardust Florals. Creat cu pasiune</span>
          <Heart size={14} color="#e11d48" fill="#e11d48" />
          <span>pentru surprize de neuitat.</span>
        </div>
      </div>
    </footer>
  );
}
