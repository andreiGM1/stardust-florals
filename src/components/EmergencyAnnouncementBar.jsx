import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Flame, Clock, Sparkles, X, ChevronRight, ChevronLeft, 
  ArrowRight, ShieldCheck, Gift, ShoppingBag, Eye, Zap
} from 'lucide-react';
import { playLuxuryChime } from '../utils/audioAlert';
import { AlertPulseDot, GiftBoxIcon, SnowflakeIcon } from './CustomIcons';

export default function EmergencyAnnouncementBar({ onOpenLeadModal }) {
  const navigate = useNavigate();

  // Dismissed state
  const [isDismissed, setIsDismissed] = useState(() => {
    return sessionStorage.getItem('stardust_emergency_bar_dismissed') === 'true';
  });

  // Active message slide
  const [messageIndex, setMessageIndex] = useState(0);

  // Dynamic Countdown Timer (e.g. countdown to next dispatch cutoff)
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    // Target 18:00 today or tomorrow
    const target = new Date();
    if (now.getHours() >= 18) {
      target.setDate(target.getDate() + 1);
      target.setHours(14, 0, 0, 0);
    } else {
      target.setHours(18, 0, 0, 0);
    }
    const diff = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
    return {
      hours: Math.floor(diff / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      seconds: diff % 60
    };
  });

  // Timer countdown interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 3, minutes: 45, seconds: 0 }; // reset cycle
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Message rotation interval
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % 4);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
    sessionStorage.setItem('stardust_emergency_bar_dismissed', 'true');
  };

  const handleRestore = () => {
    setIsDismissed(false);
    sessionStorage.removeItem('stardust_emergency_bar_dismissed');
    playLuxuryChime();
  };

  const padZero = (n) => String(n).padStart(2, '0');

  // Messages configuration
  const MESSAGES = [
    {
      id: 'express-countdown',
      badge: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Zap size={12} color="#fef08a" /> LIVRARE EXPRESS AZI (2-4H)
        </span>
      ),
      badgeBg: 'rgba(254, 240, 138, 0.25)',
      badgeColor: '#fef08a',
      content: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>Comandă în următoarele</span>
          <span 
            id="emergency-countdown-display"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)', 
              border: '1px solid rgba(254, 240, 138, 0.4)', 
              padding: '2px 8px', 
              borderRadius: '8px', 
              fontFamily: 'monospace', 
              fontWeight: 800, 
              color: '#fef08a',
              letterSpacing: '1px'
            }}
          >
            {padZero(timeLeft.hours)}:{padZero(timeLeft.minutes)}:{padZero(timeLeft.seconds)}
          </span>
          <span>pentru plecare prioritară de la atelier!</span>
        </span>
      ),
      actionText: 'Comandă Express',
      actionUrl: '/checkout?bouquet=signature-dual-noir-rouge&mode=express'
    },
    {
      id: 'stock-alert',
      badge: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <AlertPulseDot size={7} color="#ef4444" /> STOC CRITIC ATELIER
        </span>
      ),
      badgeBg: 'rgba(239, 68, 68, 0.3)',
      badgeColor: '#fca5a5',
      content: (
        <span>
          Au mai rămas doar <strong>2 buchete Signature</strong> (negru pe margine & roșu în mijloc) disponibile azi!
        </span>
      ),
      actionText: 'Rezervă Buchetul',
      actionUrl: '/checkout?bouquet=signature-dual-noir-rouge'
    },
    {
      id: 'promo-code',
      badge: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <GiftBoxIcon size={12} color="#fde68a" /> REDUCERE 10% ACTIVĂ
        </span>
      ),
      badgeBg: 'rgba(251, 191, 36, 0.25)',
      badgeColor: '#fde68a',
      content: (
        <span>
          Folosește codul <strong>STARDUST10</strong> în coș pentru 10% reducere + Felicitare QR Video cadou!
        </span>
      ),
      actionText: 'Aplică Reducerea',
      actionUrl: '/checkout?promo=STARDUST10'
    },
    {
      id: 'climate-guarantee',
      badge: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <SnowflakeIcon size={12} color="#bae6fd" /> FLOTĂ CLIMATIZATĂ (18°C)
        </span>
      ),
      badgeBg: 'rgba(56, 189, 248, 0.25)',
      badgeColor: '#bae6fd',
      content: (
        <span>
          Livrare climatizată anti-răsturnare • <strong>Transport Gratuit</strong> în București peste 200 RON!
        </span>
      ),
      actionText: 'Vezi Modelele',
      actionUrl: '/colectie'
    }
  ];

  const currentMsg = MESSAGES[messageIndex];

  if (isDismissed) {
    return (
      <div 
        id="emergency-bar-minimized-pill"
        onClick={handleRestore}
        style={{
          position: 'fixed',
          top: '72px',
          right: '18px',
          zIndex: 9990,
          background: 'linear-gradient(135deg, #19080c, #9f1239)',
          border: '1px solid rgba(254, 205, 211, 0.3)',
          color: '#ffffff',
          borderRadius: '30px',
          padding: '6px 14px',
          fontSize: '0.74rem',
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          animation: 'pulseGlow 3s infinite ease-in-out'
        }}
        title="Afișează Alertele de Urgență din Atelier"
      >
        <AlertPulseDot size={8} color="#ef4444" />
        <Zap size={13} color="#fef08a" />
        <span>2 Buchete Disponibile Azi (Deschide)</span>
      </div>
    );
  }

  return (
    <div 
      id="emergency-announcement-bar"
      className="emergency-bar-wrapper"
      style={{
        background: 'linear-gradient(90deg, #881337 0%, #be123c 25%, #e11d48 50%, #be123c 75%, #881337 100%)',
        backgroundSize: '200% 100%',
        animation: 'emergencyGradientPan 8s linear infinite',
        color: '#ffffff',
        padding: '7px 16px',
        fontSize: '0.78rem',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1001,
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 2px 10px rgba(136, 19, 55, 0.35)',
        userSelect: 'none'
      }}
    >
      {/* Left Arrow */}
      <button
        id="btn-emergency-prev-msg"
        className="emergency-nav-arrow"
        onClick={() => setMessageIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length)}
        aria-label="Mesaj anterior"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer',
          padding: '2px 4px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Center Dynamic Message */}
      <div 
        id="emergency-message-body"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '12px', 
          flex: 1, 
          textAlign: 'center',
          flexWrap: 'wrap',
          transition: 'all 0.3s ease-out'
        }}
      >
        {/* Pulsing Tag */}
        <span 
          style={{ 
            fontSize: '0.7rem', 
            fontWeight: 800, 
            background: currentMsg.badgeBg, 
            color: currentMsg.badgeColor, 
            border: `1px solid ${currentMsg.badgeColor}`, 
            padding: '2px 10px', 
            borderRadius: '16px', 
            letterSpacing: '0.6px',
            whiteSpace: 'nowrap'
          }}
        >
          {currentMsg.badge}
        </span>

        {/* Content text */}
        <span style={{ fontSize: '0.8rem', color: '#ffffff' }}>
          {currentMsg.content}
        </span>

        {/* Quick CTA button */}
        <Link
          id="btn-emergency-action"
          to={currentMsg.actionUrl}
          style={{
            background: '#ffffff',
            color: '#be123c',
            textDecoration: 'none',
            padding: '3px 12px',
            borderRadius: '16px',
            fontSize: '0.74rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
            transition: 'transform 0.15s, background 0.15s'
          }}
        >
          <span>{currentMsg.actionText}</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Right Controls: Next Arrow & Dismiss Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          id="btn-emergency-next-msg"
          className="emergency-nav-arrow"
          onClick={() => setMessageIndex((prev) => (prev + 1) % MESSAGES.length)}
          aria-label="Mesajul următor"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ChevronRight size={16} />
        </button>

        <button
          id="btn-emergency-dismiss"
          onClick={handleDismiss}
          title="Ascunde bara de notificări"
          aria-label="Închide bara"
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '4px'
          }}
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
