import React from 'react';
import { motion } from 'framer-motion';

export default function GlitterFlowersLanding() {
  return (
    <div className="min-h-screen bg-rose-50 font-sans text-rose-950">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="text-2xl font-black tracking-tight text-rose-900 flex items-center gap-2">
            ✨ Stardust<span className="font-light text-rose-400">Florals</span>
          </div>
          <a href="#comanda" className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/30">
            Comandă Acum
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-rose-200/50 text-rose-800 font-bold px-4 py-1.5 rounded-full text-sm mb-6 border border-rose-200"
            >
              💖 Cel mai dorit cadou pe TikTok
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-rose-950 tracking-tight mb-6 leading-tight"
            >
              Trandafiri care <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-400">strălucesc</span> la propriu.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-rose-800/80 mb-10 font-medium leading-relaxed max-w-xl mx-auto md:mx-0"
            >
              Buchete premium, acoperite cu praf de stele sclipitor. O surpriză memorabilă, ideală pentru aniversări, propuneri sau pur și simplu un "Te iubesc" de neuitat.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a href="#comanda" className="bg-rose-950 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-900 transition-all shadow-xl inline-block w-full sm:w-auto">
                Vezi Colecția (De la 149 Lei)
              </a>
            </motion.div>
          </div>
          <div className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-rose-100"
            >
              <div className="absolute inset-0 flex items-center justify-center flex-col text-rose-300">
                 <span className="text-8xl mb-4">🌹✨</span>
                 <p className="font-bold">Placeholder Imagine Buchet cu Sclipici</p>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-300/30 blur-[100px] rounded-full z-0 pointer-events-none" />
      </section>

      {/* How it Works (QR Code Scan) */}
      <section className="py-24 bg-white border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16">Cum funcționează magia?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Alegi Mărimea', desc: 'De la buchete cochete de 11 fire, până la aranjamente spectaculoase de 101 fire.' },
              { step: '2', title: 'Adăugăm Sclipiciul', desc: 'Folosim un spray special care fixează sclipiciul pe petale fără să afecteze durata de viață a trandafirilor.' },
              { step: '3', title: 'Livrare Surpriză', desc: 'Livrăm personal în 2-4 ore de la comandă direct la ușa persoanei iubite, împreună cu o felicitare.' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-7xl font-black text-rose-100 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-rose-800/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Widget */}
      <section id="comanda" className="py-24 bg-rose-950 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-rose-800 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Trimite-i un buchet chiar acum!</h2>
              <p className="text-rose-300 mb-6">Plasează comanda rapid pe WhatsApp, iar noi ne ocupăm de restul.</p>
              
              <div className="bg-rose-950 p-6 rounded-2xl border border-rose-800 inline-block text-left w-full">
                <h3 className="font-bold text-xl mb-4 border-b border-rose-800 pb-2">Prețuri (Sclipici Inclus)</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between"><span>11 Trandafiri</span> <span className="font-bold">149 RON</span></li>
                  <li className="flex justify-between"><span>25 Trandafiri</span> <span className="font-bold">299 RON</span></li>
                  <li className="flex justify-between"><span>51 Trandafiri</span> <span className="font-bold">549 RON</span></li>
                </ul>
              </div>
            </div>
            
            <div className="flex-1 w-full flex justify-center">
              <a 
                href="https://wa.me/40700000000?text=Buna!%20Vreau%20sa%20comand%20un%20buchet%20cu%20sclipici." 
                target="_blank" rel="noreferrer"
                className="bg-green-500 hover:bg-green-400 text-white w-full py-6 rounded-2xl font-black text-2xl transition-all shadow-xl shadow-green-500/20 flex flex-col items-center justify-center gap-2 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">💬</span>
                Comandă pe WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-8 text-center text-rose-300 border-t border-rose-100">
        <p>© 2026 Stardust Florals. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
}
