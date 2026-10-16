import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { RoseIcon } from './CustomIcons';

const RECENT_SALES = [
  { name: 'Diana R.', city: 'București (Sector 3)', bouquet: 'Buchet Regal Glamour (19 Trandafiri)', time: 'acum 3 minute' },
  { name: 'Mihai C.', city: 'Cluj-Napoca', bouquet: 'Cutie Gigant Stardust Luxury', time: 'acum 8 minute' },
  { name: 'Ana-Maria S.', city: 'Iași', bouquet: 'Buchet Petite Sparkle', time: 'acum 14 minute' },
  { name: 'Vlad P.', city: 'Timișoara', bouquet: 'Inimă Catifea Midnight Sparkle', time: 'acum 21 minute' },
  { name: 'Cristina M.', city: 'Brașov', bouquet: 'Trandafir Etern sub Cupolă', time: 'acum 27 minute' }
];

export default function LiveSalesTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('stardust_hide_sales_ticker') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDismissed) return;

    // Show first toast after 7s to let user absorb the hero headline first
    const initialTimer = setTimeout(() => {
      setVisible(true);
      // Auto hide after 4.5s
      setTimeout(() => setVisible(false), 4500);
    }, 7000);

    // Then polite recurring interval: show for 4.5s every 16 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % RECENT_SALES.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }, 16000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem('stardust_hide_sales_ticker', 'true');
    } catch {
      // storage unavailable
    }
  };

  if (isDismissed || !visible) return null;

  const current = RECENT_SALES[currentIndex];

  return (
    <aside className="sales-ticker-toast" aria-label="Notificare vânzări recente">
      <div className="ticker-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RoseIcon size={18} color="var(--rose-600)" />
      </div>
      <div className="ticker-text" style={{ flex: 1, minWidth: 0 }}>
        <strong>{current.name} din {current.city}</strong>
        <span>A comandat <em>{current.bouquet}</em> ({current.time})</span>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="sales-ticker-close"
        title="Închide notificările"
        aria-label="Închide notificare"
      >
        <X size={13} />
      </button>
    </aside>
  );
}
