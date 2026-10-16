import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const EUR_RATE = 4.97;

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('stardust_currency') || 'RON';
  });

  useEffect(() => {
    localStorage.setItem('stardust_currency', currency);
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'RON' ? 'EUR' : 'RON'));
  };

  const formatPrice = (amountRon) => {
    const num = Number(amountRon) || 0;
    if (currency === 'EUR') {
      const eur = Math.round(num / EUR_RATE);
      return `${eur} €`;
    }
    return `${num} RON`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: 'RON',
      toggleCurrency: () => {},
      formatPrice: (num) => `${num} RON`
    };
  }
  return context;
}
