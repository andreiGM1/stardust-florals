import React from 'react';

/**
 * Stardust Florals™ — Haute Couture Custom Vector Icons
 * Handcrafted SVG icons designed specifically for luxury florist aesthetics.
 */

// 1. Haute Couture Blooming Rose
export function RoseIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon rose-icon ${className}`}
    >
      <path d="M12 4c2.5-2 6-1 7 1.5s-1 5-3.5 5.5c-2.5.5-3.5-1.5-3.5-1.5" />
      <path d="M12 4C9.5 2 6 3 5 5.5S6 10.5 8.5 11c2.5.5 3.5-1.5 3.5-1.5" />
      <path d="M12 9c2 1 4 3 3.5 5.5S12.5 18 10 17s-3-3.5-1-6" />
      <path d="M12 17v5" />
      <path d="M12 19c-2-1-4 0-5 2" />
      <path d="M12 18c2-1 4 0 5 1.5" />
      <circle cx="12" cy="7.5" r="1.5" fill={color} stroke="none" opacity="0.6" />
    </svg>
  );
}

// 2. Wilted Flower Stem
export function WiltedFlowerIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon wilted-icon ${className}`}
    >
      <path d="M10 9C7.5 9 5 11 5 13.5c0 2 2 3.5 4 3.5s3.5-1.5 3.5-3.5c0-1.5-.5-3-2.5-4.5z" />
      <path d="M12.5 13.5c1.5 2 3.5 4 3.5 7.5" />
      <path d="M14 17c1.5 0 3-.5 3.5-2" />
      <path d="M11 7c-1-2-3-3-5-2.5" />
      <circle cx="8" cy="13" r="1" fill={color} stroke="none" />
    </svg>
  );
}

// 3. Faceted Diamond Jewel
export function DiamondIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon diamond-icon ${className}`}
    >
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M10 3v6l2 12" />
      <path d="M14 3v6l-2 12" />
      <path d="M2 9h20" />
      <path d="M6 3l4 6" />
      <path d="M18 3l-4 6" />
    </svg>
  );
}

// 4. Imperial Crown
export function CrownIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon crown-icon ${className}`}
    >
      <path d="M3 18h18M3 18l2-11 5 4 2-6 2 6 5-4 2 11z" />
      <circle cx="5" cy="7" r="1" fill={color} />
      <circle cx="12" cy="5" r="1" fill={color} />
      <circle cx="19" cy="7" r="1" fill={color} />
      <path d="M4 21h16" />
    </svg>
  );
}

// 5. Solitaire Diamond Ring
export function RingIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon ring-icon ${className}`}
    >
      <circle cx="12" cy="14" r="7" />
      <path d="M9 7l3-4 3 4z" />
      <path d="M10 7h4" />
      <path d="M12 3v4" />
    </svg>
  );
}

// 6. French Royal Fleur-de-lis
export function FleurDeLisIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon fleur-icon ${className}`}
    >
      <path d="M12 3c-1.5 3-1.5 5 0 8 1.5-3 1.5-5 0-8z" fill={color} opacity="0.3" />
      <path d="M12 3c-1.5 3-1.5 5 0 8 1.5-3 1.5-5 0-8z" />
      <path d="M5 8c2.5 0 4 2 4 4.5S7.5 17 6 15c-1-1.5-.5-4.5 1-6" />
      <path d="M19 8c-2.5 0-4 2-4 4.5s1.5 4.5 3 2.5c1-1.5.5-4.5-1-6" />
      <path d="M4 14h16" />
      <path d="M12 14v7" />
      <path d="M9 21h6" />
    </svg>
  );
}

// 7. Stardust 4-Point Radiance Star
export function SparkleIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon sparkle-icon ${className}`}
    >
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" strokeWidth="1" opacity="0.3" />
      <path d="M12 3c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9z" fill={color} opacity="0.25" />
      <path d="M12 3c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9z" />
    </svg>
  );
}

// 8. Luxury Teddy Bear
export function TeddyIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon teddy-icon ${className}`}
    >
      {/* Ears */}
      <circle cx="7" cy="6" r="2.5" />
      <circle cx="17" cy="6" r="2.5" />
      {/* Head */}
      <circle cx="12" cy="10" r="5" />
      {/* Eyes & Snout */}
      <circle cx="10.5" cy="9.5" r="0.7" fill={color} />
      <circle cx="13.5" cy="9.5" r="0.7" fill={color} />
      <ellipse cx="12" cy="11.5" rx="1.5" ry="1" fill={color} opacity="0.3" />
      {/* Body */}
      <path d="M8 15c-1.5 1-2 4-1 6s4 1 5 1 4 1 5-1-.5-5-1-6" />
      {/* Bow Tie */}
      <path d="M10.5 14l3 1.5M13.5 14l-3 1.5" />
    </svg>
  );
}

// 9. Calligraphic Silk Ribbon
export function RibbonIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon ribbon-icon ${className}`}
    >
      <circle cx="12" cy="10" r="2.5" fill={color} opacity="0.3" />
      <path d="M9.5 10c-3-2-5-1-6 1s1 4 4 2l2-1.5" />
      <path d="M14.5 10c3-2 5-1 6 1s-1 4-4 2l-2-1.5" />
      <path d="M11 12l-3 9 3-2 2 2" />
      <path d="M13 12l3 9-3-2-2 2" />
    </svg>
  );
}

// 10. Subway Metro Train
export function MetroIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon metro-icon ${className}`}
    >
      <rect x="5" y="3" width="14" height="15" rx="3" />
      <line x1="5" y1="10" x2="19" y2="10" />
      <circle cx="8.5" cy="14.5" r="1" fill={color} />
      <circle cx="15.5" cy="14.5" r="1" fill={color} />
      <line x1="7" y1="18" x2="5" y2="21" />
      <line x1="17" y1="18" x2="19" y2="21" />
      <line x1="10" y1="6" x2="14" y2="6" />
    </svg>
  );
}

// 11. Porcelain Coffee Cup
export function CoffeeIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon coffee-icon ${className}`}
    >
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v7a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}

// 12. Celebration Cake
export function CakeIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon cake-icon ${className}`}
    >
      <path d="M20 21H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z" />
      <path d="M4 13l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2" />
      <path d="M12 5v4" />
      <circle cx="12" cy="3" r="1" fill={color} />
    </svg>
  );
}

// 13. Celebration Party Popper
export function PartyIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon party-icon ${className}`}
    >
      <path d="M4 19l4.5-12 10.5 4.5z" />
      <path d="M4 19l2-2" />
      <circle cx="16" cy="5" r="1" fill={color} />
      <circle cx="21" cy="9" r="1" fill={color} />
      <circle cx="19" cy="15" r="1" fill={color} />
      <path d="M12 3l1 2M15 11l2 2M8 4l2 1" />
    </svg>
  );
}

// 14. Luxury Gift Box
export function GiftBoxIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon gift-icon ${className}`}
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" rx="1" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

// 15. Crystalline Snowflake
export function SnowflakeIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon snowflake-icon ${className}`}
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="20" y1="7" x2="4" y2="17" />
      <line x1="20" y1="17" x2="4" y2="7" />
      <polyline points="10 4 12 2 14 4" />
      <polyline points="10 20 12 22 14 20" />
      <polyline points="18 10 20 7 17 6" />
      <polyline points="6 14 4 17 7 18" />
      <polyline points="18 14 20 17 17 18" />
      <polyline points="6 10 4 7 7 6" />
    </svg>
  );
}

// 16. Secret / Masquerade Mask
export function SecretMaskIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon mask-icon ${className}`}
    >
      <path d="M2 11c1-4 4-6 7-6 3 0 3 2 3 2s0-2 3-2c3 0 6 2 7 6-1 5-4 7-7 7-2 0-3-1-3-1s-1 1-3 1c-3 0-6-2-7-7z" />
      <ellipse cx="7.5" cy="11.5" rx="2.5" ry="1.5" />
      <ellipse cx="16.5" cy="11.5" rx="2.5" ry="1.5" />
    </svg>
  );
}

// 17. Classical Greco-Roman Column
export function ColumnIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon column-icon ${className}`}
    >
      <line x1="3" y1="4" x2="21" y2="4" />
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="7" y1="7" x2="7" y2="17" />
      <line x1="11" y1="7" x2="11" y2="17" />
      <line x1="13" y1="7" x2="13" y2="17" />
      <line x1="17" y1="7" x2="17" y2="17" />
      <line x1="5" y1="17" x2="19" y2="17" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  );
}

// 18. Calligraphic Quill Feather
export function QuillIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon quill-icon ${className}`}
    >
      <path d="M20 4c-5 0-9 4-11 9L7 20l7-2c5-2 6-8 6-14z" />
      <path d="M15 9l-4 4" />
    </svg>
  );
}

// 19. Royal Wax Seal Monogram
export function WaxSealStampIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon waxseal-icon ${className}`}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6" strokeDasharray="2 2" />
      <path d="M10 10c1-1 3-1 4 0s0 3-2 4 1 2 2 2" />
    </svg>
  );
}

// 20. Green Live Signal Pulse
export function LivePulseDot({ size = 8, color = '#10b981', style = {} }) {
  return (
    <span 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        borderRadius: '50%', 
        backgroundColor: color, 
        display: 'inline-block', 
        verticalAlign: 'middle',
        boxShadow: `0 0 6px ${color}`,
        flexShrink: 0,
        ...style 
      }} 
    />
  );
}

// 21. Critical Stock Alert Pulse
export function AlertPulseDot({ size = 8, color = '#f43f5e', style = {} }) {
  return (
    <span 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        borderRadius: '50%', 
        backgroundColor: color, 
        display: 'inline-block', 
        verticalAlign: 'middle',
        boxShadow: `0 0 6px ${color}`,
        flexShrink: 0,
        ...style 
      }} 
    />
  );
}

// 22. Scroll Diploma with Ribbon Seal
export function ScrollDiplomaIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon scroll-icon ${className}`}
    >
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10" />
      <path d="M4 3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14" />
      <line x1="8" y1="7" x2="15" y2="7" />
      <line x1="8" y1="11" x2="13" y2="11" />
      <circle cx="16" cy="18" r="2" fill={color} opacity="0.4" stroke={color} />
      <path d="M15 20l-1 2m3-2l1 2" />
    </svg>
  );
}

// 23. Certificate Seal with Star
export function CertificateBadgeIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon cert-badge-icon ${className}`}
    >
      <circle cx="12" cy="10" r="7" />
      <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11" />
      <path d="M12 7l1 2 2 .3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2-1.5-1.5 2-.3z" fill={color} opacity="0.6" stroke="none" />
    </svg>
  );
}

// 24. Vintage Crystal Perfume Atomizer Bottle
export function PerfumeBottleIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon perfume-icon ${className}`}
    >
      <rect x="6" y="9" width="12" height="12" rx="3" />
      <path d="M9 9V5h6v4" />
      <circle cx="12" cy="3" r="1.5" fill={color} />
      <line x1="12" y1="12" x2="12" y2="18" />
      <circle cx="12" cy="15" r="2" fill={color} opacity="0.3" stroke="none" />
      <path d="M3 6c1 1 2 1 3 0" opacity="0.7" />
      <path d="M2 9c1.5 1 2.5 1 4 0" opacity="0.5" />
    </svg>
  );
}

// 25. Aromatic Mist Spray Diffuser
export function MistSprayIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon mist-icon ${className}`}
    >
      <path d="M4 14h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" />
      <path d="M6 14V9a2 2 0 0 1 2-2h1" />
      <path d="M15 5c1.5-1 3.5-1 5 0" />
      <path d="M14 9c2.5-1.5 5.5-1.5 8 0" />
      <path d="M15 13c1.5-1 3.5-1 5 0" />
      <circle cx="17" cy="8" r="1" fill={color} />
      <circle cx="20" cy="12" r="1" fill={color} />
    </svg>
  );
}

// 26. Gilded Coupon Voucher Ticket
export function CouponVoucherIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon voucher-icon ${className}`}
    >
      <path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
      <line x1="13" y1="4" x2="13" y2="20" strokeDasharray="2 3" />
      <circle cx="8" cy="12" r="2" fill={color} opacity="0.4" stroke="none" />
    </svg>
  );
}

// 27. Camera Unboxing Photo Uploader
export function CameraPlusIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon camera-plus-icon ${className}`}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
      <circle cx="11.5" cy="13.5" r="3" />
      <line x1="19" y1="10" x2="19" y2="14" />
      <line x1="17" y1="12" x2="21" y2="12" />
    </svg>
  );
}

// 28. Gilded Atelier Concierge Reception Bell
export function ConciergeBellIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon concierge-bell-icon ${className}`}
    >
      <path d="M12 3v3" />
      <path d="M10 6h4" />
      <path d="M18 15a6 6 0 0 0-12 0" />
      <path d="M4 18h16" />
      <path d="M3 20h18" />
      <circle cx="12" cy="11" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

// 29. Climate-Controlled Luxury Delivery Van
export function ClimateVanIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon climate-van-icon ${className}`}
    >
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
      <path d="M7 8l2 2-2 2" />
      <path d="M10 10H6" />
      <path d="M11 6v8" />
    </svg>
  );
}

// 30. Precision Digital Atelier Climate Gauge (18°C)
export function ThermometerGaugeIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon thermometer-gauge-icon ${className}`}
    >
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      <circle cx="11.5" cy="17.5" r="2" fill={color} stroke="none" />
      <line x1="11.5" y1="7.5" x2="11.5" y2="15.5" stroke={color} strokeWidth="1.5" />
      <line x1="14" y1="6" x2="16" y2="6" />
      <line x1="14" y1="9" x2="17" y2="9" />
      <line x1="14" y1="12" x2="16" y2="12" />
    </svg>
  );
}

// 31. GPS Radar Beacon Pin with Live Pulses
export function GpsRoutePinIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon gps-route-pin-icon ${className}`}
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
      <circle cx="12" cy="9" r="2.5" fill={color} stroke="none" />
      <path d="M8 21h8" />
    </svg>
  );
}

// 32. Antique Burnt Edge Parchment Scroll
export function ParchmentScrollIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon parchment-scroll-icon ${className}`}
    >
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M8 21h11a2 2 0 0 0 2-2v-2H6" />
      <path d="M4 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14" />
      <line x1="7" y1="8" x2="15" y2="8" />
      <line x1="7" y1="12" x2="13" y2="12" />
      <circle cx="17.5" cy="18.5" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

// 29. VIP Calendar Heart Icon (Never Forget Her Day)
export function CalendarHeartIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon calendar-heart-icon ${className}`}
    >
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M12 18.2s-3.5-2.2-3.5-4.2a2.3 2.3 0 0 1 3.5-1.9 2.3 2.3 0 0 1 3.5 1.9c0 2-3.5 4.2-3.5 4.2z" fill={color} stroke="none" opacity="0.85" />
    </svg>
  );
}

// 30. Micro-LED Fairy Lights Icon (Warm Spark Garland)
export function FairyLightsIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon fairy-lights-icon ${className}`}
    >
      <path d="M2 9c4-3 8 4 12 1s6-5 8-1" />
      <circle cx="5" cy="11.5" r="2" fill={color} stroke="none" />
      <circle cx="10" cy="12" r="2" fill={color} stroke="none" />
      <circle cx="15.5" cy="8.5" r="2" fill={color} stroke="none" />
      <circle cx="20" cy="12" r="2" fill={color} stroke="none" />
      <line x1="5" y1="13.5" x2="5" y2="16" strokeWidth="1.2" />
      <line x1="10" y1="14" x2="10" y2="16.5" strokeWidth="1.2" />
      <line x1="15.5" y1="10.5" x2="15.5" y2="13" strokeWidth="1.2" />
      <line x1="20" y1="14" x2="20" y2="16.5" strokeWidth="1.2" />
      <path d="M4 17.5c0 1 1 1.5 1 1.5s1-.5 1-1.5c0-.8-.5-1.5-1-1.5s-1 .7-1 1.5z" fill={color} stroke="none" opacity="0.8" />
      <path d="M9 18c0 1 1 1.5 1 1.5s1-.5 1-1.5c0-.8-.5-1.5-1-1.5s-1 .7-1 1.5z" fill={color} stroke="none" opacity="0.8" />
      <path d="M14.5 14.5c0 1 1 1.5 1 1.5s1-.5 1-1.5c0-.8-.5-1.5-1-1.5s-1 .7-1 1.5z" fill={color} stroke="none" opacity="0.8" />
      <path d="M19 18c0 1 1 1.5 1 1.5s1-.5 1-1.5c0-.8-.5-1.5-1-1.5s-1 .7-1 1.5z" fill={color} stroke="none" opacity="0.8" />
    </svg>
  );
}

// 31. Haute Champagne Flutes (Moët & Chandon Tasting Celebration)
export function ChampagneFlutesIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon champagne-flutes-icon ${className}`}
    >
      {/* Left Glass */}
      <path d="M6 3l1.5 7a2.5 2.5 0 0 0 2.5 2.2h.5A2.5 2.5 0 0 0 13 10L14 3H6z" />
      <line x1="9.5" y1="12.2" x2="9.5" y2="19.5" />
      <path d="M6.5 20.5h6" />
      {/* Effervescence Bubbles */}
      <circle cx="8.5" cy="6" r="0.8" fill={color} stroke="none" />
      <circle cx="10.5" cy="8" r="0.7" fill={color} stroke="none" />
      <circle cx="9" cy="9.5" r="0.7" fill={color} stroke="none" />
      {/* Right Clinking Glass Rim Hint */}
      <path d="M15 3.5l1 5a2 2 0 0 0 2 1.7h.5a2 2 0 0 0 2-1.7L21 3.5h-6z" opacity="0.65" />
      <line x1="18" y1="10.2" x2="18" y2="17" opacity="0.65" />
      <path d="M15.5 18h5" opacity="0.65" />
    </svg>
  );
}

// 32. Belgian Chocolate Gold-Foil Strawberry (Gourmet Degustation)
export function StrawberryGoldIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon strawberry-gold-icon ${className}`}
    >
      {/* Leaf Calyx Top */}
      <path d="M12 2v2.5" />
      <path d="M8 4c1.5 1 3.5 1 4 0 1.5 1.5 3.5 1 4-.2" />
      {/* Strawberry Body */}
      <path d="M7 5.5C4.5 7.5 4 12 7 16.5 9 19.5 11 21.5 12 22c1-.5 3-2.5 5-5.5 3-4.5 2.5-9 0-11-2.5 0-3.5 1-5 1s-2.5-1-5-1z" />
      {/* Chocolate Dip Wave */}
      <path d="M5.5 12c2.5 2 4.5 1 6.5 2 2 1 4 0 6.5-1" strokeWidth="1.4" opacity="0.7" />
      {/* 24K Gold Foil Flakes */}
      <path d="M10 16l.5 1 .5-1-.5-.5z" fill={color} stroke="none" />
      <path d="M14 17l.5.8.5-.8-.5-.4z" fill={color} stroke="none" />
      <path d="M11 9l.4.6.4-.6-.4-.3z" fill={color} stroke="none" />
      <path d="M8.5 13l.4.5.4-.5-.4-.3z" fill={color} stroke="none" />
      <path d="M15.5 12l.4.5.4-.5-.4-.3z" fill={color} stroke="none" />
    </svg>
  );
}

// 33. Audio Sound Waveform & Spectrogram Engraving
export function AudioWaveformIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon audio-waveform-icon ${className}`}
    >
      {/* Vertical Spectrogram Sound Bars */}
      <line x1="2" y1="12" x2="2" y2="12" strokeWidth="2.4" />
      <line x1="5" y1="9" x2="5" y2="15" />
      <line x1="8" y1="6" x2="8" y2="18" strokeWidth="2" />
      <line x1="11" y1="3" x2="11" y2="21" strokeWidth="2" />
      <line x1="14" y1="7" x2="14" y2="17" strokeWidth="2" />
      <line x1="17" y1="5" x2="17" y2="19" strokeWidth="2" />
      <line x1="20" y1="10" x2="20" y2="14" />
      <line x1="22" y1="12" x2="22" y2="12" strokeWidth="2.4" />
    </svg>
  );
}

// 34. Voice Microphone with Sound Resonance Rings
export function VoiceRecordMicIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon voice-mic-icon ${className}`}
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
      {/* Sound Arc Waves */}
      <path d="M2 9a10 10 0 0 0 2 5" strokeWidth="1.4" opacity="0.6" />
      <path d="M22 9a10 10 0 0 1-2 5" strokeWidth="1.4" opacity="0.6" />
    </svg>
  );
}

// 35. 3D Pop-Up Greeting Card
export function PopUpGreetingCardIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon popup-card-icon ${className}`}
    >
      {/* Base Open Folded Card */}
      <path d="M3 17l9 4 9-4V7l-9-4-9 4v10z" />
      <path d="M12 21V11" />
      <path d="M3 7l9 4 9-4" />
      {/* 3D Pop-up Element (Heart / Petal Rising) */}
      <path d="M12 11c-1.5-3-4-2-4 0 0 2 4 4 4 4s4-2 4-4c0-2-2.5-3-4 0z" fill={color} opacity="0.8" />
    </svg>
  );
}

// 36. Floating Cascading Rose Petals
export function FlyingPetalsIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon flying-petals-icon ${className}`}
    >
      {/* Petal 1 (Large Top Left) */}
      <path d="M7 3C4 5 3 9 6 11s7 0 6-3-2-5-5-5z" fill={color} opacity="0.85" />
      {/* Petal 2 (Medium Center Right) */}
      <path d="M17 8c-2 1.5-2.5 4.5-.5 6s5 0 4.5-2-1.5-4-4-4z" fill={color} opacity="0.65" />
      {/* Petal 3 (Small Bottom Left) */}
      <path d="M10 16c-1.5 1-2 3-.5 4s3.5 0 3-1.5-1-2.5-2.5-2.5z" fill={color} opacity="0.5" />
      {/* Sparkle Twinkle */}
      <circle cx="19" cy="4" r="1" fill={color} stroke="none" />
      <circle cx="4" cy="18" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

// 37. Vintage Music Box Winding Crank & Key
export function MusicBoxCrankIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon music-box-crank-icon ${className}`}
    >
      {/* Central Axis & Base Socket */}
      <circle cx="12" cy="14" r="3" />
      <circle cx="12" cy="14" r="1.2" fill={color} stroke="none" />
      {/* Winding Crank Arm */}
      <path d="M12 11V6l4-2" />
      {/* Wooden / Ivory Pear Knob on Crank */}
      <circle cx="16" cy="4" r="2.2" fill={color} opacity="0.85" />
      {/* Musical Melody Sparkle / Floating Note */}
      <path d="M19 11v5" />
      <circle cx="17.5" cy="16" r="1.5" fill={color} />
      <path d="M19 11c1.5-1 3 0 3 0" />
      {/* Subtle Circular Wind Motion Arrow */}
      <path d="M6 14a6 6 0 0 1 4.5-5.8" strokeDasharray="1.5 2" opacity="0.6" />
    </svg>
  );
}

// 38. Mechanical Music Box Brass Cylinder Roll & Comb Tines
export function MusicMelodyRollIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon music-melody-roll-icon ${className}`}
    >
      {/* Brass Cylinder / Barrel */}
      <rect x="5" y="8" width="14" height="8" rx="2" strokeWidth="1.6" />
      {/* Left and Right Pivot Axles */}
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      {/* Cylinder Musical Pin Studs */}
      <circle cx="8" cy="10.5" r="0.8" fill={color} stroke="none" />
      <circle cx="11" cy="13.5" r="0.8" fill={color} stroke="none" />
      <circle cx="14" cy="10" r="0.8" fill={color} stroke="none" />
      <circle cx="16.5" cy="13" r="0.8" fill={color} stroke="none" />
      <circle cx="9.5" cy="14" r="0.8" fill={color} stroke="none" />
      {/* Steel Comb Tines (Reeds above barrel) */}
      <path d="M6 4v4" />
      <path d="M9 4v4" />
      <path d="M12 4v4" />
      <path d="M15 4v4" />
      <path d="M18 4v4" />
      <path d="M5 4h14" strokeWidth="2" />
    </svg>
  );
}

// 39. Royal Unboxing Vault Gift Box with Ajar Lid and Radiant Beams
export function UnboxingVaultIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon unboxing-vault-icon ${className}`}
    >
      {/* Lower Box Body */}
      <path d="M3 11v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" />
      {/* Box Ribbon Vertical Center Line */}
      <path d="M12 11v10" strokeDasharray="1.5 1.5" />
      {/* Ajar Angled Lid Lifting Off */}
      <path d="M2.5 8.5l17.5-4a1.2 1.2 0 0 1 1.4.9l.4 1.8a1.2 1.2 0 0 1-.9 1.4L3.4 12.6a1.2 1.2 0 0 1-1.4-.9l-.4-1.8a1.2 1.2 0 0 1 .9-1.4z" />
      {/* Radiating Sparkles Emerging from Vault */}
      <path d="M12 3v2" strokeWidth="2" />
      <path d="M7 5.5l1.2 1.5" strokeWidth="1.6" />
      <path d="M17 4.5l-1.2 1.5" strokeWidth="1.6" />
      <circle cx="12" cy="7" r="1" fill={color} stroke="none" />
    </svg>
  );
}

// 40. Imperial Wax Seal Stamp with Heraldic Monogram & Ribbon Tails
export function ImperialWaxRibbonSealIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon imperial-wax-seal-icon ${className}`}
    >
      {/* Wax Droplets / Ornate Outer Scalloped Crest */}
      <circle cx="12" cy="11" r="7" strokeWidth="2" />
      <circle cx="12" cy="11" r="5" strokeDasharray="1.5 2" opacity="0.6" strokeWidth="1.2" />
      {/* Inner Heraldic Monogram Crown / S */}
      <path d="M9.5 10c0-1.2 1.1-2 2.5-2s2.5.8 2.5 2c0 1.5-2.5 1.8-2.5 3h2.5" strokeWidth="1.6" />
      {/* Bottom Hanging Silk Ribbon Tails */}
      <path d="M9 17.5l-2 4.5 3-1 2 2" />
      <path d="M15 17.5l2 4.5-3-1-2 2" />
    </svg>
  );
}

// 41. Haute Couture Satin Ribbon Bow with Flowing Tails
export function SatinRibbonBowIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon satin-ribbon-bow-icon ${className}`}
    >
      {/* Center Diamond Knot */}
      <rect x="10" y="8" width="4" height="4" rx="1" fill={color} stroke="none" />
      {/* Left Bow Loop */}
      <path d="M10 10C6 7 2 8 2 11c0 2 3 3 8-1" />
      {/* Right Bow Loop */}
      <path d="M14 10c4-3 8-2 8 1 0 2-3 3-8-1" />
      {/* Left Flowing Ribbon Tail */}
      <path d="M11 12l-4 9 3-1.5 2 2.5" />
      {/* Right Flowing Ribbon Tail */}
      <path d="M13 12l4 9-3-1.5-2 2.5" />
    </svg>
  );
}

// 42. Laser Petal Engraver Icon (Micro-Laser Ray focusing on Organic Rose Petal)
export function LaserPetalEngraverIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon laser-petal-icon ${className}`}
    >
      {/* Organic Rose Petal Silhouette */}
      <path d="M4 14C3 8 7 3 14 3c4 0 7 3 7 7 0 6-5 11-11 11-4 0-6-3-6-7z" strokeWidth="1.6" opacity="0.85" />
      <path d="M8 12c2 1 5 1 8-2" strokeWidth="1.2" strokeDasharray="1.5 2" opacity="0.6" />
      {/* Overhead Micro-Laser Emitter Head */}
      <path d="M19 2l2 2-3 3-2-2z" fill={color} stroke="none" opacity="0.9" />
      <path d="M17 5l-5 6" strokeWidth="2" strokeDasharray="3 1.5" />
      {/* Laser Focal Spark & Radiance on Petal */}
      <circle cx="12" cy="11" r="1.5" fill={color} stroke="none" />
      <path d="M12 8.5v-1" strokeWidth="1.5" />
      <path d="M14.5 11h1" strokeWidth="1.5" />
      <path d="M12 13.5v1" strokeWidth="1.5" />
      <path d="M9.5 11h-1" strokeWidth="1.5" />
    </svg>
  );
}

// 43. Petal Macro Magnifier Inspection Icon
export function PetalMagnifierIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon petal-magnifier-icon ${className}`}
    >
      {/* Magnifier Lens Ring */}
      <circle cx="10" cy="10" r="7" strokeWidth="1.8" />
      {/* Inner Petal Veins inside Lens */}
      <path d="M6 11c2-3 5-4 7-2" strokeWidth="1.4" opacity="0.8" />
      <path d="M9.5 10c0-1 .8-1.8 1.8-1.8" strokeWidth="1.2" />
      {/* Sparkle Glint in Lens */}
      <circle cx="7" cy="7" r="1" fill={color} stroke="none" />
      {/* Handle */}
      <path d="M15.5 15.5L21 21" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18.5 18.5l1.5 1.5" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// 44. Flower Care Kit & Nutrient Sachet Icon
export function FlowerCareKitIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon flower-care-kit-icon ${className}`}
    >
      {/* Sachet Packet Silhouette */}
      <rect x="5" y="4" width="14" height="17" rx="2.5" strokeWidth="1.8" />
      {/* Top Tear Notch */}
      <line x1="5" y1="8" x2="19" y2="8" strokeDasharray="1.5 2" strokeWidth="1.2" opacity="0.6" />
      <path d="M5 8l2-1.5" strokeWidth="1.2" />
      {/* Central Botanical Nutrient Sprout & Dewdrop */}
      <path d="M12 17c0-3 2.5-4.5 4-5-1 3-2 5-4 5z" fill={color} opacity="0.8" />
      <path d="M12 17c0-2-1.8-3.5-3-3.8.8 2 1.5 3.5 3 3.8z" fill={color} opacity="0.5" />
      <path d="M12 18v-4" strokeWidth="1.5" />
      {/* Sparkle */}
      <circle cx="15.5" cy="11.5" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

// 45. 45-Degree Stem Cut Precision Angle Icon
export function StemCut45Icon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon stem-cut-icon ${className}`}
    >
      {/* Vertical Rose Stem */}
      <path d="M10 3v11l6-6V3" strokeWidth="1.8" />
      {/* 45-Degree Beveled Cut Base */}
      <path d="M10 14l6-6" strokeWidth="2.4" strokeLinecap="round" />
      {/* Water Capillary Inflow Arrows */}
      <path d="M7 19l3-3" strokeWidth="1.6" />
      <path d="M10 16l-1 3" strokeWidth="1.4" />
      <path d="M13 22l3-3" strokeWidth="1.6" />
      <path d="M16 19l-1 3" strokeWidth="1.4" />
      {/* 45 Degree Angle Arc */}
      <path d="M12 14a3 3 0 0 0 2-2" strokeWidth="1.2" strokeDasharray="1 1.5" opacity="0.8" />
    </svg>
  );
}

// 46. Porous Ceramic Aroma Diffuser Medallion Icon
export function CeramicMedallionIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon ceramic-medallion-icon ${className}`}
    >
      {/* Outer Ceramic Disc with Beaded Rim */}
      <circle cx="12" cy="12" r="9.5" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="7.5" strokeWidth="1" strokeDasharray="1.5 2" opacity="0.75" />
      {/* Top Silk Ribbon Loop */}
      <path d="M12 2.5v2" strokeWidth="2" />
      <path d="M10.5 2.5h3" strokeWidth="1.4" />
      {/* Central Botanical Flower Stamp & Fragrance Core */}
      <path d="M12 8c1.5 1 2 2.5 1 4-1 1.5-3 1.5-4 0-1-1.5-.5-3 1-4 1.5-.5 1-1.5 2-0z" fill={color} fillOpacity="0.15" />
      <circle cx="12" cy="12" r="2.2" fill={color} fillOpacity="0.8" />
      {/* Micro-droplet accents */}
      <path d="M12 15.5c-1 0-1.8.8-1.8 1.8 0 1.2 1.8 2.7 1.8 2.7s1.8-1.5 1.8-2.7c0-1-.8-1.8-1.8-1.8z" fill={color} stroke="none" opacity="0.9" />
    </svg>
  );
}

// 47. Concentric Aroma Wave Ripples Icon
export function AromaWavesIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon aroma-waves-icon ${className}`}
    >
      {/* Central Essence Droplet */}
      <path d="M12 7c-1.5 2-3 4-3 6a3 3 0 0 0 6 0c0-2-1.5-4-3-6z" fill={color} fillOpacity="0.4" strokeWidth="1.6" />
      {/* Concentric Aroma Pulse Waves */}
      <path d="M7 11a7 7 0 0 0 0 8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M4 8a11 11 0 0 0 0 14" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
      <path d="M17 11a7 7 0 0 1 0 8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M20 8a11 11 0 0 1 0 14" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
      {/* Tiny Golden Sparkles */}
      <circle cx="8" cy="5" r="0.8" fill={color} stroke="none" />
      <circle cx="16" cy="5" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

// 48. Faceted Holographic Prismatic Beam Icon (Task 62)
export function HolographicPrismIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon holo-prism-icon ${className}`}
    >
      {/* Triangular Crystal Prism Outline */}
      <polygon points="12 2 3 19 21 19" strokeWidth="1.8" fill={color} fillOpacity="0.12" />
      {/* Internal Reflection Facet Lines */}
      <line x1="12" y1="2" x2="12" y2="19" strokeWidth="1.2" opacity="0.6" strokeDasharray="2 1.5" />
      <line x1="7.5" y1="10.5" x2="16.5" y2="10.5" strokeWidth="1.2" opacity="0.5" />
      {/* Incident Light Beam on Left */}
      <path d="M1 9l5 4" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      {/* Refracted Prismatic Dispersed Beams on Right */}
      <path d="M17 11l6-2" strokeWidth="1.6" opacity="0.9" />
      <path d="M18 13l5 1" strokeWidth="1.6" opacity="0.75" />
      <path d="M19 16l4 4" strokeWidth="1.6" opacity="0.6" />
      <circle cx="12" cy="7" r="1" fill={color} stroke="none" />
      <circle cx="9" cy="15" r="0.8" fill={color} stroke="none" />
      <circle cx="15" cy="15" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

// 49. 3D Optical Lenticular Depth & Floating Diamond Sparkle Icon (Task 62)
export function LenticularEyeIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon lenticular-eye-icon ${className}`}
    >
      {/* 3D Depth Card Outer Border */}
      <rect x="3" y="4" width="18" height="16" rx="3" strokeWidth="1.8" />
      {/* Curved Parallax Lenticular Foil Slits */}
      <path d="M7 4c1 4 1 12 0 16" strokeWidth="1.2" opacity="0.45" />
      <path d="M17 4c-1 4-1 12 0 16" strokeWidth="1.2" opacity="0.45" />
      {/* Central 3D Floating Diamond Starburst */}
      <path d="M12 7l1.5 3.5L17 12l-3.5 1.5L12 17l-1.5-3.5L7 12l3.5-1.5z" fill={color} fillOpacity="0.3" strokeWidth="1.5" />
      {/* Floating Sparkle Dust */}
      <circle cx="5" cy="8" r="0.8" fill={color} stroke="none" />
      <circle cx="19" cy="16" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

// 50. Luxury Secret Sliding Drawer Box Icon (Task 63)
export function SecretDrawerIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon secret-drawer-icon ${className}`}
    >
      {/* Upper Hatbox Compartment (Rose Vault) */}
      <path d="M4 11V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
      <path d="M2 11h20" strokeWidth="2" />
      {/* Floral Bloom Crown Motif on Upper Box */}
      <path d="M8 7c1-2 3-2 4 0 1-2 3-2 4 0" opacity="0.75" />
      <circle cx="12" cy="7" r="1.2" fill={color} opacity="0.8" stroke="none" />
      {/* Lower Sliding Drawer Front (Pulled Out Forward) */}
      <rect x="3" y="13" width="18" height="8" rx="2" strokeWidth="1.8" fill={color} fillOpacity="0.08" />
      {/* Drawer Gilded Pull Knob / Ring */}
      <circle cx="12" cy="17" r="1.2" fill={color} stroke="none" />
      <path d="M10.5 17a1.5 1.5 0 0 0 3 0" strokeWidth="1.4" opacity="0.9" />
      {/* Secret Jewel Sparkle Inside Drawer */}
      <path d="M17 15.5l1 1-1 1-1-1z" fill={color} stroke="none" opacity="0.8" />
    </svg>
  );
}

// 51. Solitaire Engagement Ring with Sparkling Diamond (Task 63)
export function EngagementRingIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon engagement-ring-icon ${className}`}
    >
      {/* Circular Precious Metal Ring Band */}
      <circle cx="12" cy="14.5" r="6.5" strokeWidth="1.8" />
      {/* Ring Crown Prongs / Collet Setting */}
      <path d="M9 8h6l-1 2H10z" strokeWidth="1.4" fill={color} fillOpacity="0.2" />
      {/* Brilliant Cut Solitaire Diamond */}
      <polygon points="12 2 15 5 14 8 10 8 9 5" strokeWidth="1.6" fill={color} fillOpacity="0.35" />
      <line x1="12" y1="2" x2="12" y2="8" strokeWidth="1.2" opacity="0.7" />
      {/* Scintillating Sparkle Rays */}
      <line x1="12" y1="0.5" x2="12" y2="1.5" strokeWidth="1.5" />
      <line x1="16.5" y1="2.5" x2="15.5" y2="3.5" strokeWidth="1.4" />
      <line x1="7.5" y1="2.5" x2="8.5" y2="3.5" strokeWidth="1.4" />
      {/* Micro-sparkle stars */}
      <circle cx="17.5" cy="5" r="0.75" fill={color} stroke="none" />
      <circle cx="6.5" cy="5" r="0.75" fill={color} stroke="none" />
    </svg>
  );
}

// 52. Wax-Sealed Secret Parchment Scroll Icon (Task 63)
export function ScrollIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon scroll-icon ${className}`}
    >
      {/* Rolled Scroll Body */}
      <path d="M8 4h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      {/* Upper Rolled Edge */}
      <circle cx="6" cy="6" r="2" />
      {/* Lower Rolled Edge */}
      <path d="M4 16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2" />
      {/* Calligraphy Lines on Parchment */}
      <line x1="9" y1="9" x2="16" y2="9" strokeWidth="1.3" opacity="0.6" />
      <line x1="9" y1="12" x2="14" y2="12" strokeWidth="1.3" opacity="0.6" />
      {/* Wax Seal with Ribbon Tail */}
      <circle cx="16" cy="15" r="2.2" fill={color} fillOpacity="0.4" strokeWidth="1.5" />
      <path d="M15 17l-1 3 2-1 2 1-1-3" strokeWidth="1.2" opacity="0.8" />
    </svg>
  );
}

// 53. Dramatic Smoke & Dry Ice Cascade Box Icon (Task 64)
export function SmokeCascadeIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon smoke-cascade-icon ${className}`}
    >
      {/* Luxury Flower Box Body */}
      <path d="M4 13h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7z" strokeWidth="1.8" />
      {/* Box Lid Slightly Tilted / Lifted */}
      <path d="M3 11l18-3v2L3 13z" strokeWidth="1.5" fill={color} fillOpacity="0.15" />
      {/* Rising & Cascading Billowing Mist / Cold Vapor Waves */}
      <path d="M6 9C5 7 7 5.5 8.5 6.5C10 7.5 11 6 12.5 5.5C14 5 15.5 6 16.5 5C17.5 4 19 5.5 18 7" strokeWidth="1.5" opacity="0.85" />
      {/* Cascading Dense Fog Flowing Down Over Front Edge */}
      <path d="M5 15c-1.5 1-2 2.5-.5 3.5s3-.5 4.5.5c1.5 1 3 1.5 4.5.5s3 .5 4.5-.5c1.5-1 1-2.5-.5-3.5" strokeWidth="1.6" opacity="0.9" />
      {/* Lower Vapor Swirls on Table */}
      <path d="M3 21c2.5-.8 5.5.8 8.5 0s6-.8 8.5 0" strokeWidth="1.4" opacity="0.75" />
      {/* Frost Sparkle Crystals */}
      <path d="M12 2v2M11 3h2" strokeWidth="1.4" opacity="0.8" />
      <circle cx="7" cy="3.5" r="0.75" fill={color} stroke="none" />
      <circle cx="17" cy="2.5" r="0.75" fill={color} stroke="none" />
    </svg>
  );
}

// 54. Thermo-Chamber Dry Ice Vial / Thermal Capsule Icon (Task 64)
export function DryIceFlaskIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon dry-ice-icon ${className}`}
    >
      {/* Cylindrical Cryo Container / Thermal Flask */}
      <rect x="7" y="6" width="10" height="15" rx="3" strokeWidth="1.8" />
      {/* Insulated Cap / Valve Ring */}
      <path d="M9 3h6v3H9z" strokeWidth="1.6" fill={color} fillOpacity="0.2" />
      {/* Cryogenic Temperature Gauge Line */}
      <line x1="10" y1="11" x2="14" y2="11" strokeWidth="1.4" opacity="0.6" />
      <line x1="10" y1="14" x2="13" y2="14" strokeWidth="1.4" opacity="0.6" />
      {/* Micro Frost Snowflake Core */}
      <line x1="12" y1="16" x2="12" y2="18.5" strokeWidth="1.4" />
      <line x1="10.5" y1="17.25" x2="13.5" y2="17.25" strokeWidth="1.4" />
      {/* Cold Vapor Plume Emitting from Valve */}
      <path d="M8 2c-1.5 0-2.5-1-2-2" strokeWidth="1.2" opacity="0.7" />
      <path d="M16 2c1.5 0 2.5-1 2-2" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}

// 55. Cosmic Stardust Diamond Locket Pendant Icon (Task 65)
export function CosmicLocketIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon cosmic-locket-icon ${className}`}
    >
      {/* Delicate Necklace Chain Bale */}
      <path d="M12 2C8 2 6 5 6 7M12 2c4 0 6 3 6 5" strokeWidth="1.2" opacity="0.7" strokeDasharray="1.5 1.5" />
      <circle cx="12" cy="7.5" r="1.5" strokeWidth="1.6" />
      {/* Teardrop / Capsule Locket Outer Bezel */}
      <path d="M12 9c-4 3.5-5 7-5 9.5a5 5 0 0 0 10 0c0-2.5-1-6-5-9.5z" strokeWidth="1.8" />
      {/* Inner Transparent Sapphire Crystal Chamber */}
      <ellipse cx="12" cy="16.5" rx="3" ry="4" strokeWidth="1.3" fill={color} fillOpacity="0.18" />
      {/* Micro Floating Diamond Stardust Particles */}
      <circle cx="11" cy="15" r="0.8" fill={color} stroke="none" />
      <circle cx="13" cy="16" r="0.9" fill={color} stroke="none" />
      <circle cx="11.5" cy="18" r="0.75" fill={color} stroke="none" />
      <circle cx="12.5" cy="14" r="0.6" fill={color} stroke="none" />
      {/* External Radiant Sparkle Glint */}
      <line x1="18.5" y1="12" x2="18.5" y2="14" strokeWidth="1.3" />
      <line x1="17.5" y1="13" x2="19.5" y2="13" strokeWidth="1.3" />
    </svg>
  );
}

// 56. Jeweler's 30x Macro Loupe Magnifier Icon (Task 65)
export function JewelerLoupeIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon jeweler-loupe-icon ${className}`}
    >
      {/* Foldable Metal Protective Casing */}
      <path d="M5 19l4-4a6 6 0 1 1 8.5-8.5l-4 4" strokeWidth="1.6" />
      {/* Precision Lens Ring */}
      <circle cx="14.5" cy="9.5" r="5" strokeWidth="1.8" fill={color} fillOpacity="0.15" />
      {/* Glass Reflection Arc */}
      <path d="M12 8a3.5 3.5 0 0 1 4-1" strokeWidth="1.4" opacity="0.8" />
      {/* Pivot Screw Pin */}
      <circle cx="6" cy="18" r="1.5" strokeWidth="1.8" fill={color} />
      {/* Micro Crosshair Focus Center */}
      <circle cx="14.5" cy="9.5" r="0.9" fill={color} stroke="none" />
    </svg>
  );
}

// 57. Mechatronic Motorized Rose Kinetic Icon (Task 66)
export function MechatronicRoseIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon mechatronic-rose-icon ${className}`}
    >
      {/* Central Micro-Gear Rotor & Core Mechanism */}
      <circle cx="12" cy="11" r="3.2" strokeWidth="1.6" fill={color} fillOpacity="0.2" />
      <circle cx="12" cy="11" r="1.3" fill={color} stroke="none" />
      {/* Gear Teeth / Segment Guides */}
      <line x1="12" y1="6.8" x2="12" y2="7.8" strokeWidth="1.5" />
      <line x1="12" y1="14.2" x2="12" y2="15.2" strokeWidth="1.5" />
      <line x1="7.8" y1="11" x2="8.8" y2="11" strokeWidth="1.5" />
      <line x1="15.2" y1="11" x2="16.2" y2="11" strokeWidth="1.5" />
      {/* Kinetic Articulated Petals - Layer 1 (Left & Right Wings) */}
      <path d="M12 4.5c-3 0-5.5 2.5-5 5.5.4 2.2 2.2 4 4.5 4.5" strokeWidth="1.5" opacity="0.9" />
      <path d="M12 4.5c3 0 5.5 2.5 5 5.5-.4 2.2-2.2 4-4.5 4.5" strokeWidth="1.5" opacity="0.9" />
      {/* Outer Titanium Ribs / Motorized Framework */}
      <path d="M4 11c0 4.2 3.8 8 8 8s8-3.8 8-8" strokeWidth="1.6" />
      {/* Stem with Electronic Gold Ribbon / Bio-Trace */}
      <path d="M12 19v3.5" strokeWidth="1.8" />
      <path d="M10 21.5h4" strokeWidth="1.6" />
    </svg>
  );
}

// 58. Bio-Pulse Heartbeat Sensor Icon (Task 66)
export function HeartbeatPulseIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon heartbeat-pulse-icon ${className}`}
    >
      {/* Heart Silhouette Frame */}
      <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.566z" strokeWidth="1.5" opacity="0.45" />
      {/* Dynamic ECG Pulse Waveform Traversing the Core */}
      <polyline points="2 12 7 12 9 8 11.5 16 13.5 10 15 13 17 12 22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bio-Sensor Touch Fingerprint Node */}
      <circle cx="12" cy="12" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}

// 59. Precision Optical Micro-Telescope Icon (Task 67)
export function MicroTelescopeIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon micro-telescope-icon ${className}`}
    >
      {/* Stem Integration Line */}
      <path d="M4 20L8 16" strokeWidth="1.5" opacity="0.5" />
      {/* Main Brass Barrel Cylinder */}
      <path d="M7 17l6.5-6.5" strokeWidth="2.4" />
      {/* Knurled Adjustment Ring */}
      <path d="M10.5 10.5l3 3" strokeWidth="2" opacity="0.9" />
      <path d="M11.5 9.5l3 3" strokeWidth="1.2" />
      {/* Eyepiece / Objective Lens Outer Collar */}
      <path d="M13 11l5-5" strokeWidth="2.8" />
      <path d="M17 5l4 4" strokeWidth="2" />
      {/* Lens Optical Sapphire Flare */}
      <circle cx="19.5" cy="6.5" r="2" fill={color} fillOpacity="0.25" strokeWidth="1.2" />
      {/* Ambient Light Collector Side Prism */}
      <path d="M14 14l-2 1.5 1 2z" fill={color} fillOpacity="0.3" strokeWidth="1" />
      {/* Sparkle Glint at Lens Focal Point */}
      <path d="M21 3l.5 1.5L23 5l-1.5.5L21 7l-.5-1.5L19 5l1.5-.5z" fill={color} stroke="none" />
    </svg>
  );
}

// 60. Kaleidoscope Geometric Prism Mandala Icon (Task 67)
export function KaleidoscopeLensIcon({ size = 18, color = 'currentColor', style = {}, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      className={`luxury-icon kaleidoscope-lens-icon ${className}`}
    >
      {/* Outer Eyepiece Reticle Circle */}
      <circle cx="12" cy="12" r="9.5" strokeWidth="1.6" />
      {/* Inner Optical Chamber Circle */}
      <circle cx="12" cy="12" r="5" strokeWidth="1.2" strokeDasharray="1.5 2" opacity="0.75" />
      {/* Symmetric 6-Point Prism Mirror Facets */}
      <polygon points="12 3 19.8 7.5 19.8 16.5 12 21 4.2 16.5 4.2 7.5" strokeWidth="1.2" opacity="0.6" />
      {/* Triangular Prism Diamond Axes */}
      <line x1="12" y1="2.5" x2="12" y2="21.5" strokeWidth="1.2" opacity="0.5" />
      <line x1="3.8" y1="7.25" x2="20.2" y2="16.75" strokeWidth="1.2" opacity="0.5" />
      <line x1="3.8" y1="16.75" x2="20.2" y2="7.25" strokeWidth="1.2" opacity="0.5" />
      {/* Central Secret Message Node / Diamond Core */}
      <circle cx="12" cy="12" r="1.8" fill={color} stroke="none" />
    </svg>
  );
}




