import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, QrCode, Video, Heart, ArrowRight, CheckCircle, 
  ShieldCheck, Download, Printer, Play, Pause, Volume2, 
  RotateCcw, Mail, Eye, Sparkle, Film, MessageCircle, Camera, Smartphone, X 
} from 'lucide-react';
import { playWaxSealBreakSound, playLuxuryChime } from '../utils/audioAlert';
import { 
  RoseIcon, RingIcon, CrownIcon, PartyIcon, CakeIcon, 
  SparkleIcon, DiamondIcon, QuillIcon, FleurDeLisIcon, WaxSealStampIcon,
  ParchmentScrollIcon
} from '../components/CustomIcons';

const PRESET_MESSAGES = {
  love: [
    { title: 'Floarea Vieții', Icon: Heart, text: 'Ești cea mai frumoasă floare din viața mea. Te iubesc mai mult cu fiecare clipă ce trece!' },
    { title: 'Universul Meu', Icon: RoseIcon, text: 'Din miliarde de oameni, inima mea te-a ales pe tine. Strălucești mai tare decât orice trandafir!' },
    { title: 'Fără Sfârșit', Icon: SparkleIcon, text: 'Te iubesc nu doar pentru ceea ce ești, ci pentru ceea ce sunt eu când sunt lângă tine.' },
  ],
  proposal: [
    { title: 'Căsătorește-te cu mine', Icon: RingIcon, text: 'Vrei să facem fiecare zi din viața noastră la fel de strălucitoare ca acești trandafiri? Căsătorește-te cu mine!' },
    { title: 'Regina Mea', Icon: CrownIcon, text: 'Promit să-ți aduc flori și să te fac să zâmbești pentru tot restul vieții noastre împreună. Spune DA!' },
  ],
  birthday: [
    { title: 'La Mulți Ani, Iubire!', Icon: PartyIcon, text: 'La mulți ani, minunea mea! Îți mulțumesc pentru fiecare zâmbet pe care îl aduci în viața mea. Meriți tot ce-i mai frumos!' },
    { title: 'Strălucire Aniversară', Icon: CakeIcon, text: 'Să nu uiți niciodată cât de prețioasă și iubită ești. O aniversare la fel de magică precum sufletul tău!' },
  ],
  apology: [
    { title: 'Iartă-mă', Icon: RoseIcon, text: 'Nicio floare nu poate șterge o greșeală, dar sper că acești trandafiri îți vor aminti cât de mult contezi pentru mine. Iartă-mă!' },
    { title: 'O Nouă Șansă', Icon: Heart, text: 'Îmi pasă de tine mai mult decât pot exprima în cuvinte. Hai să lăsăm supărarea în urmă și să strălucim din nou!' },
  ],
  gratitude: [
    { title: 'Meriți Tot', Icon: SparkleIcon, text: 'Nu aveam nevoie de o ocazie specială ca să-ți amintesc cât de mult însemni pentru mine. Mulțumesc că exiști!' },
    { title: 'Pentru O Persoană Dragă', Icon: Heart, text: 'Pentru cel mai cald și nobil suflet, care oferă mereu bunătate necondiționată. Cu toată recunoștința mea!' },
  ]
};

export default function VideoQrPage() {
  const [videoLink, setVideoLink] = useState('');
  const [customQuote, setCustomQuote] = useState('Ești cea mai frumoasă floare din viața mea. Te iubesc enorm!');
  const [cardTheme, setCardTheme] = useState('ivory');
  const [previewMode, setPreviewMode] = useState('envelope'); // 'envelope' | 'flat'
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('love');
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [printFormat, setPrintFormat] = useState('postcard'); // 'postcard' (10x15cm) | 'a5' (diplomă)
  const [videoPlayerModalOpen, setVideoPlayerModalOpen] = useState(false);
  const [isPlayingDemoVideo, setIsPlayingDemoVideo] = useState(true);
  const [reactionHearts, setReactionHearts] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);
  const navigate = useNavigate();

  const handleOpenEnvelope = () => {
    playWaxSealBreakSound();
    setEnvelopeOpen(true);
  };

  const handleResealEnvelope = () => {
    setEnvelopeOpen(false);
  };

  const handlePrintCard = () => {
    window.print();
  };

  const handleDownloadCanvasPng = () => {
    const canvas = document.createElement('canvas');
    // Ultra-High Resolution 300 DPI: 2400 x 1400 px
    canvas.width = 2400;
    canvas.height = 1400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background based on cardTheme
    if (cardTheme === 'noir') {
      ctx.fillStyle = '#14080b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (cardTheme === 'rose') {
      ctx.fillStyle = '#fff1f2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Outer Gilded Gold Border (Triple Layer Baroque Frame)
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 10;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

    // Baroque Corner Flourishes (Ornate Vector Curves & Fleur-de-lis)
    const drawCornerFlourish = (x, y, flipX, flipY) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
      ctx.strokeStyle = '#d97706';
      ctx.fillStyle = '#fbbf24';
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.moveTo(0, 50);
      ctx.quadraticCurveTo(20, 20, 50, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(35, 35, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.moveTo(35, 20);
      ctx.lineTo(44, 35);
      ctx.lineTo(35, 50);
      ctx.lineTo(26, 35);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    drawCornerFlourish(85, 85, false, false);
    drawCornerFlourish(canvas.width - 85, 85, true, false);
    drawCornerFlourish(85, canvas.height - 85, false, true);
    drawCornerFlourish(canvas.width - 85, canvas.height - 85, true, true);

    // Royal Brand Header
    ctx.textAlign = 'center';
    ctx.font = 'bold 58px Georgia, serif';
    ctx.fillStyle = cardTheme === 'noir' ? '#fbbf24' : '#881337';
    ctx.fillText('STARDUST FLORALS', canvas.width / 2, 160);

    ctx.font = 'bold 26px sans-serif';
    ctx.fillStyle = '#e11d48';
    ctx.fillText('HAUTE COUTURE ATELIER • FELICITARE CU MESAJ VIDEO EXCLUSIV', canvas.width / 2, 210);

    // Golden Divider Ribbon
    const grad = ctx.createLinearGradient(200, 245, canvas.width - 200, 245);
    grad.addColorStop(0, 'rgba(217, 119, 6, 0)');
    grad.addColorStop(0.5, '#d97706');
    grad.addColorStop(1, 'rgba(217, 119, 6, 0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(250, 245);
    ctx.lineTo(canvas.width - 250, 245);
    ctx.stroke();

    // QR Code Box Placeholder on left (High-Res 650x650)
    const qrX = 160;
    const qrY = 320;
    const qrSize = 650;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 8;
    ctx.strokeRect(qrX, qrY, qrSize, qrSize);

    // Large Sharp Finder Corners
    ctx.fillStyle = '#1a0c10';
    // Top-Left
    ctx.fillRect(qrX + 50, qrY + 50, 150, 150);
    ctx.clearRect(qrX + 75, qrY + 75, 100, 100);
    ctx.fillRect(qrX + 100, qrY + 100, 50, 50);
    // Top-Right
    ctx.fillRect(qrX + qrSize - 200, qrY + 50, 150, 150);
    ctx.clearRect(qrX + qrSize - 175, qrY + 75, 100, 100);
    ctx.fillRect(qrX + qrSize - 150, qrY + 100, 50, 50);
    // Bottom-Left
    ctx.fillRect(qrX + 50, qrY + qrSize - 200, 150, 150);
    ctx.clearRect(qrX + 75, qrY + qrSize - 175, 100, 100);
    ctx.fillRect(qrX + 100, qrY + qrSize - 150, 50, 50);

    // Central Crimson Rose / Diamond Medallion
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(qrX + qrSize / 2 - 60, qrY + qrSize / 2 - 60, 120, 120);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    const cx = qrX + qrSize / 2;
    const cy = qrY + qrSize / 2;
    ctx.moveTo(cx, cy - 36);
    ctx.lineTo(cx + 32, cy);
    ctx.lineTo(cx, cy + 36);
    ctx.lineTo(cx - 32, cy);
    ctx.closePath();
    ctx.fill();

    // Sharp Pattern Grid
    ctx.fillStyle = '#1a0c10';
    const dotsHighRes = [
      [270, 90], [350, 110], [410, 80], [290, 270], [330, 350], [410, 310],
      [470, 150], [530, 270], [550, 390], [250, 490], [350, 510], [470, 530],
      [110, 310], [150, 370], [310, 430], [390, 450], [530, 490]
    ];
    dotsHighRes.forEach(([dx, dy]) => {
      ctx.fillRect(qrX + dx, qrY + dy, 36, 36);
    });

    // Caption under QR Code
    ctx.font = 'bold 36px sans-serif';
    ctx.fillStyle = '#e11d48';
    ctx.textAlign = 'center';
    ctx.fillText('SCANEAZĂ CU CAMERA TELEFONULUI', qrX + qrSize / 2, qrY + qrSize + 75);

    // Right Column: Handwritten Quote & Message
    ctx.textAlign = 'left';
    ctx.fillStyle = cardTheme === 'noir' ? '#fdf2f4' : '#1e1b4b';
    ctx.font = 'italic 56px Georgia, serif';

    const textX = 940;
    let textY = 430;
    const maxWidth = 1300;
    const words = (customQuote || 'Pentru cea mai specială persoană din univers!').split(' ');
    let line = '„';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, textX, textY);
        line = words[n] + ' ';
        textY += 88;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim() + '”', textX, textY);

    // Video status tag on right
    textY += 110;
    ctx.font = 'bold 38px sans-serif';
    ctx.fillStyle = '#047857';
    ctx.fillText('Mesaj Video Atașat Cu Dragoste & Tehnologie QR', textX, textY);

    // Wax Seal Stamp Illustration on bottom right
    const sealX = canvas.width - 260;
    const sealY = canvas.height - 230;
    ctx.save();
    ctx.beginPath();
    ctx.arc(sealX, sealY, 90, 0, Math.PI * 2);
    const sealGrad = ctx.createRadialGradient(sealX - 25, sealY - 25, 10, sealX, sealY, 90);
    sealGrad.addColorStop(0, '#fb7185');
    sealGrad.addColorStop(0.5, '#e11d48');
    sealGrad.addColorStop(1, '#881337');
    ctx.fillStyle = sealGrad;
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.font = 'bold 64px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('S', sealX, sealY + 22);

    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.fillText('STARDUST • SIGILLVM', sealX, sealY + 60);
    ctx.restore();

    // Footer Attribution
    ctx.font = '28px sans-serif';
    ctx.fillStyle = 'rgba(225, 29, 72, 0.85)';
    ctx.fillText('Haute Couture Atelier București • stardustflorals.ro', textX, canvas.height - 130);

    // Download PNG 2400x1400 (Ultra-HD Print Grade)
    const link = document.createElement('a');
    link.download = `stardust-felicitare-regala-300dpi-${Date.now().toString().slice(-4)}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const handleProceedToCheckout = () => {
    localStorage.setItem('stardust_draft_message', customQuote);
    localStorage.setItem('stardust_draft_videolink', videoLink);
    navigate('/checkout');
  };

  const getCardBg = () => {
    if (cardTheme === 'noir') return '#1a0c10';
    if (cardTheme === 'rose') return '#ffe4e6';
    return '#ffffff';
  };

  const getCardTextColor = () => {
    if (cardTheme === 'noir') return '#ffffff';
    return '#20080f';
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 40px', background: 'radial-gradient(circle at 50% 20%, rgba(225, 29, 72, 0.08), transparent 70%)', textAlign: 'center' }}>
        <div className="container">
          <span className="tag-badge">EXPERIENȚĂ DIGITALĂ & FIZICĂ</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', margin: '14px 0 16px' }}>
            Simulator Felicitare cu <span className="highlight-rose">Cod QR Video</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto' }}>
            Inclusă gratuit la orice comandă. Personalizează în direct mesajul și linkul video, rupe sigiliul de ceară în simulatorul 3D și previzualizează experiența persoanei iubite.
          </p>
        </div>
      </section>

      {/* Interactive Studio */}
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'start', gap: '48px' }}>
          {/* Controls Panel */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Personalizează Felicitarea</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Link Video (TikTok, YouTube, Reels sau Drive)
                </label>
                <input 
                  type="url" 
                  placeholder="https://vm.tiktok.com/... sau https://youtu.be/..." 
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid var(--border-light)', fontSize: '0.95rem', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <SparkleIcon size={12} color="var(--rose-600)" />
                  <span>Dacă nu ai un link acum, îl poți trimite ulterior pe WhatsApp florarului!</span>
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Mesajul Scris pe Felicitare
                </label>
                <textarea 
                  rows={3}
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                  placeholder="Scrie aici mesajul tău de dragoste..."
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid var(--border-light)', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                />
                
                {/* Categorized AI Inspiration Presets */}
                <div style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--rose-600)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <SparkleIcon size={12} color="var(--rose-600)" />
                      <span>Alege o Urare după Emoție:</span>
                    </span>
                  </div>

                  {/* Category Pills */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    {[
                      { id: 'love', label: 'Dragoste', Icon: Heart },
                      { id: 'proposal', label: 'Căsătorie', Icon: RingIcon },
                      { id: 'birthday', label: 'Aniversare', Icon: PartyIcon },
                      { id: 'apology', label: 'Scuze', Icon: RoseIcon },
                      { id: 'gratitude', label: 'Recunoștință', Icon: SparkleIcon },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`btn btn-sm ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ fontSize: '0.72rem', padding: '4px 9px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      >
                        <cat.Icon size={12} />
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Preset Options for Active Category */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {PRESET_MESSAGES[activeCategory].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCustomQuote(preset.text)}
                        style={{
                          textAlign: 'left',
                          background: 'rgba(254, 205, 211, 0.2)',
                          border: '1px solid rgba(225, 29, 72, 0.2)',
                          borderRadius: '8px',
                          padding: '7px 11px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(254, 205, 211, 0.4)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(254, 205, 211, 0.2)'}
                      >
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--rose-600)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          {preset.Icon && <preset.Icon size={12} color="var(--rose-600)" />}
                          <span>{preset.title}</span>
                        </span>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{preset.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Model & Nuanță Carton Felicitare
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => setCardTheme('ivory')}
                    className={`btn btn-sm ${cardTheme === 'ivory' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <QuillIcon size={12} />
                    <span>Satin Ivory</span>
                  </button>
                  <button 
                    onClick={() => setCardTheme('rose')}
                    className={`btn btn-sm ${cardTheme === 'rose' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <RoseIcon size={12} />
                    <span>Roz Trandafiriu</span>
                  </button>
                  <button 
                    onClick={() => setCardTheme('noir')}
                    className={`btn btn-sm ${cardTheme === 'noir' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <DiamondIcon size={12} />
                    <span>Catifea Noir</span>
                  </button>
                </div>
              </div>

              <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    id="btn-simulate-scan"
                    onClick={() => setTestModalOpen(true)} 
                    className="btn btn-secondary btn-md"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Smartphone size={16} />
                    <span>Simulează Scanarea</span>
                  </button>
                  <button 
                    id="btn-download-print"
                    onClick={() => setDownloadModalOpen(true)} 
                    className="btn btn-secondary btn-md"
                  >
                    <Download size={16} />
                    <span>Descarcă / Tipărește</span>
                  </button>
                </div>
                <button 
                  id="btn-proceed-checkout-card"
                  onClick={handleProceedToCheckout} 
                  className="btn btn-primary btn-md" 
                  style={{ width: '100%' }}
                >
                  <span>Continuă la Comandă cu acest Card</span>
                  <ArrowRight size={16} />
                </button>

                {/* Companion Perk: Vintage Wax-Sealed Love Letter */}
                <div 
                  id="videoqr-love-letter-companion-card"
                  style={{
                    marginTop: '8px',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.08) 0%, rgba(136, 19, 55, 0.08) 100%)',
                    border: '1px solid rgba(217, 119, 6, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #b45309, #881337)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: '0 4px 10px rgba(180, 83, 9, 0.25)',
                      flexShrink: 0
                    }}>
                      <ParchmentScrollIcon size={18} color="#ffffff" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.2px' }}>
                        Dorești și o Scrisoare pe Pergament?
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Caligrafie pe pergament vintage cu sigiliu din ceară royală turnat manual.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    id="btn-videoqr-open-love-letter"
                    onClick={() => {
                      playLuxuryChime();
                      window.dispatchEvent(new CustomEvent('open-vintage-love-letter'));
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{
                      borderColor: 'rgba(217, 119, 6, 0.4)',
                      color: '#b45309',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 700,
                      padding: '6px 12px'
                    }}
                  >
                    <WaxSealStampIcon size={13} color="#b45309" />
                    <span>Personalizează Gratuit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Live Preview Mockup with 3D Envelope Switcher */}
          <div>
            {/* View Mode Switcher */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              <button
                type="button"
                id="btn-mode-envelope"
                onClick={() => setPreviewMode('envelope')}
                className={`btn btn-sm ${previewMode === 'envelope' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Mail size={14} />
                <span>Plic Regal 3D (Sigiliu)</span>
              </button>
              <button
                type="button"
                id="btn-mode-flat"
                onClick={() => setPreviewMode('flat')}
                className={`btn btn-sm ${previewMode === 'flat' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <QuillIcon size={14} />
                <span>Format Carton Deschis</span>
              </button>
            </div>

            {/* Mode 1: 3D Royal Interactive Envelope */}
            {previewMode === 'envelope' ? (
              <div className="envelope-3d-stage">
                <div className={`envelope-box ${envelopeOpen ? 'is-open' : ''}`}>
                  {/* Flap */}
                  <div className="envelope-flap" />

                  {/* Wax Seal Button */}
                  <button
                    type="button"
                    id="wax-seal-button"
                    className={`wax-seal-badge ${envelopeOpen ? 'is-broken' : ''}`}
                    onClick={handleOpenEnvelope}
                    title="Apasă pentru a rupe sigiliul de ceară și a deschide plicul"
                  >
                    <RoseIcon size={22} color="#ffffff" />
                    <span style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.5px' }}>SIGILIU</span>
                  </button>

                  {/* Sliding Inner Card */}
                  <div className="envelope-slide-card">
                    <div style={{ 
                      background: getCardBg(), 
                      color: getCardTextColor(), 
                      borderRadius: '18px', 
                      padding: '24px 20px', 
                      border: '1.5px solid #fecdd3', 
                      boxShadow: envelopeOpen ? '0 20px 40px rgba(0,0,0,0.35)' : 'none' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(225, 29, 72, 0.2)', paddingBottom: '8px', marginBottom: '14px' }}>
                        <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.05rem', color: cardTheme === 'noir' ? '#fecdd3' : 'var(--rose-600)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <SparkleIcon size={14} color="#f59e0b" />
                          <span>Stardust Florals</span>
                        </span>
                        <span style={{ fontSize: '0.66rem', fontWeight: 800, background: 'rgba(225, 29, 72, 0.15)', color: cardTheme === 'noir' ? '#fecdd3' : 'var(--rose-600)', padding: '2px 8px', borderRadius: '12px' }}>
                          EDIȚIE COUTURE
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ background: '#fff', padding: '8px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid #fecdd3', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                          <svg viewBox="0 0 100 100" width="100" height="100">
                            <rect width="100" height="100" fill="#ffffff" />
                            <rect x="8" y="8" width="24" height="24" fill="#20080f" rx="3" />
                            <rect x="12" y="12" width="16" height="16" fill="#ffffff" rx="2" />
                            <rect x="15" y="15" width="10" height="10" fill="#e11d48" rx="1" />
                            <rect x="68" y="8" width="24" height="24" fill="#20080f" rx="3" />
                            <rect x="72" y="12" width="16" height="16" fill="#ffffff" rx="2" />
                            <rect x="75" y="15" width="10" height="10" fill="#e11d48" rx="1" />
                            <rect x="8" y="68" width="24" height="24" fill="#20080f" rx="3" />
                            <rect x="12" y="72" width="16" height="16" fill="#ffffff" rx="2" />
                            <rect x="15" y="75" width="10" height="10" fill="#e11d48" rx="1" />
                            <rect x="36" y="10" width="6" height="6" fill="#20080f" />
                            <rect x="46" y="14" width="6" height="6" fill="#20080f" />
                            <rect x="48" y="22" width="6" height="6" fill="#e11d48" />
                            <rect x="42" y="38" width="16" height="16" fill="#20080f" rx="2" />
                            <rect x="66" y="38" width="6" height="6" fill="#20080f" />
                            <rect x="48" y="58" width="6" height="6" fill="#e11d48" />
                            <rect x="38" y="72" width="6" height="6" fill="#20080f" />
                            <rect x="62" y="74" width="8" height="6" fill="#20080f" />
                            <rect x="38" y="84" width="10" height="6" fill="#20080f" />
                            <rect x="70" y="84" width="14" height="6" fill="#20080f" />
                          </svg>
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--rose-600)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <span>SCAN ME</span>
                            <Camera size={10} />
                          </span>
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '0.98rem', lineHeight: 1.45, margin: '0 0 10px', color: getCardTextColor() }}>
                            „{customQuote || 'Scrie mesajul tău magic aici...' }”
                          </p>
                          <div style={{ fontSize: '0.72rem', color: '#047857', background: '#d1fae5', padding: '4px 8px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}>
                            <Video size={12} />
                            <span>{videoLink ? 'Video conectat' : 'Video YouTube / TikTok inclus'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Opened Card Action Controls */}
                      {envelopeOpen && (
                        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(225, 29, 72, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            id="btn-play-video-direct"
                            onClick={() => {
                              setVideoPlayerModalOpen(true);
                              setIsPlayingDemoVideo(true);
                              playLuxuryChime();
                            }}
                            className="btn btn-primary btn-sm"
                            style={{ fontSize: '0.76rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Play size={13} fill="currentColor" />
                            <span>Redă Mesajul Video în Direct</span>
                          </button>

                          <button
                            type="button"
                            id="btn-reseal-envelope"
                            onClick={handleResealEnvelope}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.74rem', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}
                          >
                            <RotateCcw size={12} />
                            <span>Sigilează la loc</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Envelope Front Pocket */}
                  <div className="envelope-pocket-front" />

                  {/* Guidance when sealed */}
                  {!envelopeOpen && (
                    <div style={{ position: 'absolute', bottom: '24px', left: 0, right: 0, textAlign: 'center', zIndex: 12, pointerEvents: 'none' }}>
                      <span style={{ fontSize: '0.82rem', color: '#fecdd3', background: 'rgba(0,0,0,0.65)', padding: '5px 14px', borderRadius: '20px', backdropFilter: 'blur(4px)', border: '1px solid rgba(251,191,36,0.3)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <SparkleIcon size={13} color="#fbbf24" />
                        <span>Apasă pe sigiliul din ceară roșie pentru deschidere</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Mode 2: Flat Classical Preview Card */
              <div style={{ background: 'linear-gradient(135deg, #fff5f5, #ffe4e6)', border: '2px dashed var(--rose-600)', padding: '28px', borderRadius: '28px', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ background: getCardBg(), color: getCardTextColor(), borderRadius: '20px', padding: '32px', border: '1px solid #fecdd3', boxShadow: 'var(--shadow-md)', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(225, 29, 72, 0.2)', paddingBottom: '14px', marginBottom: '24px' }}>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.2rem', color: cardTheme === 'noir' ? '#fecdd3' : 'var(--rose-600)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <SparkleIcon size={16} color="#f59e0b" />
                      <span>Stardust Florals</span>
                    </span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, background: 'rgba(225, 29, 72, 0.15)', color: cardTheme === 'noir' ? '#fecdd3' : 'var(--rose-600)', padding: '4px 10px', borderRadius: '20px' }}>
                      EDITIE SPECIALĂ
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '22px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ background: '#fff', padding: '10px', borderRadius: '14px', boxShadow: 'var(--shadow-sm)', border: '1px solid #fecdd3', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <svg viewBox="0 0 100 100" width="120" height="120">
                        <rect width="100" height="100" fill="#ffffff" />
                        <rect x="8" y="8" width="24" height="24" fill="#20080f" rx="3" />
                        <rect x="12" y="12" width="16" height="16" fill="#ffffff" rx="2" />
                        <rect x="15" y="15" width="10" height="10" fill="#e11d48" rx="1" />
                        <rect x="68" y="8" width="24" height="24" fill="#20080f" rx="3" />
                        <rect x="72" y="12" width="16" height="16" fill="#ffffff" rx="2" />
                        <rect x="75" y="15" width="10" height="10" fill="#e11d48" rx="1" />
                        <rect x="8" y="68" width="24" height="24" fill="#20080f" rx="3" />
                        <rect x="12" y="72" width="16" height="16" fill="#ffffff" rx="2" />
                        <rect x="15" y="75" width="10" height="10" fill="#e11d48" rx="1" />
                        <rect x="36" y="10" width="6" height="6" fill="#20080f" />
                        <rect x="46" y="14" width="6" height="6" fill="#20080f" />
                        <rect x="48" y="22" width="6" height="6" fill="#e11d48" />
                        <rect x="42" y="38" width="16" height="16" fill="#20080f" rx="2" />
                        <rect x="66" y="38" width="6" height="6" fill="#20080f" />
                        <rect x="48" y="58" width="6" height="6" fill="#e11d48" />
                        <rect x="38" y="72" width="6" height="6" fill="#20080f" />
                        <rect x="62" y="74" width="8" height="6" fill="#20080f" />
                        <rect x="38" y="84" width="10" height="6" fill="#20080f" />
                        <rect x="70" y="84" width="14" height="6" fill="#20080f" />
                      </svg>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--rose-600)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <span>SCAN ME</span>
                        <Camera size={11} />
                      </span>
                    </div>

                    <div style={{ flex: 1, minWidth: '180px' }}>
                      <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '14px', color: getCardTextColor() }}>
                        „{customQuote || 'Scrie mesajul tău magic aici...' }”
                      </p>
                      <div style={{ fontSize: '0.78rem', color: '#047857', background: '#d1fae5', padding: '4px 10px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                        <Video size={14} />
                        <span>{videoLink ? 'Video conectat cu succes' : 'Video TikTok / YouTube inclus'}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid rgba(225, 29, 72, 0.15)', fontSize: '0.75rem', opacity: 0.8, textAlign: 'right' }}>
                    Sigiliu de ceară roșie & ambalaj satinat cadou
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
              <button 
                type="button"
                onClick={() => setDownloadModalOpen(true)} 
                className="btn btn-secondary btn-sm" 
                style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Printer size={16} />
                <span>Tipărește Felicitarea</span>
              </button>
              <button 
                type="button"
                onClick={handleDownloadCanvasPng} 
                className="btn btn-secondary btn-sm" 
                style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Download size={16} />
                <span>Descarcă PNG High-Res</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Direct In-Page Video Player Modal (Task 31) */}
      {videoPlayerModalOpen && (
        <div className="modal-overlay" onClick={() => setVideoPlayerModalOpen(false)}>
          <div className="modal-content-luxury" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', padding: '28px' }}>
            {/* Header with Live Atelier Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Player Video Stardust Atelier</strong>
              </div>
              <button 
                type="button" 
                onClick={() => setVideoPlayerModalOpen(false)}
                style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
                aria-label="Închide video player"
              >
                <X size={18} />
              </button>
            </div>

            {/* Luxury Video Screen Mockup */}
            <div style={{ position: 'relative', width: '100%', height: '270px', borderRadius: '16px', overflow: 'hidden', background: '#0a0305', border: '2px solid rgba(225, 29, 72, 0.4)', boxShadow: '0 12px 30px rgba(0,0,0,0.5)', marginBottom: '18px' }}>
              {/* Background Video Frame Mockup */}
              <img 
                src="/IMG_1551.webp" 
                alt="Trandafiri Sclipici Stardust" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.05)' }} 
              />

              {/* Sparkle & Romantic Vignette Overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, rgba(10, 3, 5, 0.8) 100%)', pointerEvents: 'none' }} />

              {/* Top Video Indicator & Audio Waveform */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '3px 8px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Film size={12} color="#fb7185" />
                  <span>Mesaj Personalizat</span>
                </span>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.65)', padding: '3px 8px', borderRadius: '10px' }}>
                  <Volume2 size={13} color="#f43f5e" style={{ marginRight: '6px' }} />
                  <span className="audio-visualizer-bar" />
                  <span className="audio-visualizer-bar" />
                  <span className="audio-visualizer-bar" />
                  <span className="audio-visualizer-bar" />
                </div>
              </div>

              {/* Centered Play/Pause Button */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 6 }}>
                <button
                  type="button"
                  onClick={() => setIsPlayingDemoVideo(!isPlayingDemoVideo)}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(225, 29, 72, 0.85)',
                    border: '2px solid #fff',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {isPlayingDemoVideo ? <Pause size={24} fill="#fff" /> : <Play size={24} fill="#fff" style={{ marginLeft: '3px' }} />}
                </button>
              </div>

              {/* Bottom Subtitle / Quote Overlay */}
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', zIndex: 5 }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.72)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(254, 205, 211, 0.3)' }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '0.86rem', color: '#fff', margin: 0, lineHeight: 1.35, textAlign: 'center' }}>
                    „{customQuote}”
                  </p>
                </div>
              </div>
            </div>

            {/* Audio Track & Reaction Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Fond Muzical Atelier:</span>
                <strong style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>Frédéric Chopin — Nocturne Op. 9</strong>
              </div>

              {/* Interactive Heart Reaction */}
              <button
                type="button"
                id="btn-react-heart"
                onClick={() => {
                  setReactionHearts(prev => prev + 1);
                  setHasLiked(true);
                  playLuxuryChime();
                }}
                className={`btn btn-sm ${hasLiked ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.76rem', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Heart size={14} fill={hasLiked ? 'currentColor' : 'none'} />
                <span>{reactionHearts}</span>
              </button>
            </div>

            {/* WhatsApp Reaction Dispatch */}
            <a
              href={`https://wa.me/40733814871?text=${encodeURIComponent(`Bună ziua! Am primit buchetul Stardust Florals și am văzut mesajul video din felicitare: "${customQuote}". Este cel mai frumos cadou din viața mea!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-md"
              style={{ width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <MessageCircle size={16} />
              <span>Trimite Reacție pe WhatsApp Florarului</span>
            </a>

            <button 
              type="button" 
              onClick={() => setVideoPlayerModalOpen(false)} 
              className="btn btn-secondary btn-sm" 
              style={{ width: '100%' }}
            >
              Închide Playerul
            </button>
          </div>
        </div>
      )}

      {/* Test Scan Simulator Modal */}
      {testModalOpen && (
        <div className="modal-overlay" onClick={() => setTestModalOpen(false)}>
          <div className="modal-content-luxury" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--rose-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Smartphone size={28} color="var(--rose-600)" />
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Simulare Scanare Reușită!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '18px' }}>
              Exact așa va arăta ecranul telefonului când persoana iubită apropie camera de felicitare:
            </p>

            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '14px', padding: '18px', textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <QrCode size={13} />
                <span>Link detectat:</span>
              </div>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                {videoLink || 'https://stardustflorals.ro/video-surpriza-ta'}
              </strong>
              <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-main)' }}>
                  „{customQuote}”
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                id="btn-modal-open-video"
                onClick={() => {
                  setTestModalOpen(false);
                  setVideoPlayerModalOpen(true);
                  playLuxuryChime();
                }}
                className="btn btn-primary btn-md" 
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Play size={15} fill="currentColor" />
                <span>Deschide Video</span>
              </button>
              <button 
                type="button" 
                onClick={() => setTestModalOpen(false)} 
                className="btn btn-secondary btn-md" 
                style={{ flex: 1 }}
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download & Print Luxury Modal (Task 35 Haute Couture Vector) */}
      {downloadModalOpen && (
        <div className="modal-overlay" onClick={() => setDownloadModalOpen(false)}>
          <div className="modal-content-luxury" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: '32px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--rose-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
              <Printer size={28} color="var(--rose-600)" />
            </div>
            <h3 style={{ fontSize: '1.7rem', marginBottom: '6px' }}>Felicitare Gata de Imprimare & PDF</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Alege formatul dorit pentru cartonul tău satinat. Generăm documentul la rezoluție vectorială completă:
            </p>

            {/* Format Selector Pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '18px' }}>
              <button
                type="button"
                id="btn-format-postcard"
                onClick={() => setPrintFormat('postcard')}
                className={`btn btn-sm ${printFormat === 'postcard' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.78rem', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={13} />
                <span>Format 10x15 CM (Carte Poștală)</span>
              </button>
              <button
                type="button"
                id="btn-format-a5"
                onClick={() => setPrintFormat('a5')}
                className={`btn btn-sm ${printFormat === 'a5' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.78rem', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <QuillIcon size={13} />
                <span>Format A5 Regal (Diplomă de Iubire)</span>
              </button>
            </div>

            {/* Printable target wrapper with Baroque Corners & Vector Gold Rim */}
            <div 
              className="printable-card-target gold-shimmer-border" 
              style={{ 
                position: 'relative',
                background: getCardBg(), 
                color: getCardTextColor(), 
                borderRadius: '16px', 
                padding: printFormat === 'a5' ? '30px 24px' : '22px 20px', 
                border: '3px double #d97706', 
                boxShadow: 'var(--shadow-sm)', 
                textAlign: 'left', 
                marginBottom: '20px',
                overflow: 'hidden'
              }}
            >
              {/* Baroque Vector Corner Ornaments */}
              <svg className="baroque-corner top-left" viewBox="0 0 100 100">
                <path d="M10,10 Q50,10 50,50 Q10,50 10,10 Z M20,20 Q40,20 40,40 Q20,40 20,20 Z" fill="#d97706" />
                <circle cx="30" cy="30" r="6" fill="#fbbf24" />
              </svg>
              <svg className="baroque-corner top-right" viewBox="0 0 100 100">
                <path d="M10,10 Q50,10 50,50 Q10,50 10,10 Z M20,20 Q40,20 40,40 Q20,40 20,20 Z" fill="#d97706" />
                <circle cx="30" cy="30" r="6" fill="#fbbf24" />
              </svg>
              <svg className="baroque-corner bottom-left" viewBox="0 0 100 100">
                <path d="M10,10 Q50,10 50,50 Q10,50 10,10 Z M20,20 Q40,20 40,40 Q20,40 20,20 Z" fill="#d97706" />
                <circle cx="30" cy="30" r="6" fill="#fbbf24" />
              </svg>
              <svg className="baroque-corner bottom-right" viewBox="0 0 100 100">
                <path d="M10,10 Q50,10 50,50 Q10,50 10,10 Z M20,20 Q40,20 40,40 Q20,40 20,20 Z" fill="#d97706" />
                <circle cx="30" cy="30" r="6" fill="#fbbf24" />
              </svg>

              {/* Watermark Crest in background */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', opacity: 0.06 }}>
                <FleurDeLisIcon size={180} color="#d97706" />
              </div>

              {/* Header inside card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(217, 119, 6, 0.3)', paddingBottom: '10px', marginBottom: '14px' }}>
                <div>
                  <strong style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: cardTheme === 'noir' ? '#fbbf24' : '#881337', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <SparkleIcon size={16} color="#fbbf24" />
                    <span>Stardust Florals — Haute Couture</span>
                  </strong>
                  <span style={{ fontSize: '0.66rem', color: '#e11d48', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 700 }}>
                    EDITION ROYALE DE LUXE
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', background: 'rgba(217, 119, 6, 0.15)', color: cardTheme === 'noir' ? '#fef08a' : '#b45309', padding: '3px 9px', borderRadius: '12px', fontWeight: 800 }}>
                  {printFormat === 'a5' ? 'FORMAT A5 REGAL' : 'FORMAT 10x15 CM'}
                </span>
              </div>

              {/* QR and Quote Layout */}
              <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                <div style={{ width: '84px', height: '84px', background: '#fff', border: '1.5px solid #d97706', borderRadius: '12px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <QrCode size={70} color="#e11d48" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '0.98rem', lineHeight: 1.45, margin: '0 0 8px', color: getCardTextColor() }}>
                    „{customQuote}”
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 700, background: '#d1fae5', padding: '2px 8px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {videoLink ? <Video size={12} /> : <RoseIcon size={12} />}
                      <span>{videoLink ? 'Mesaj Video Atașat' : 'Cod QR Video Dedicat'}</span>
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#b45309', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <WaxSealStampIcon size={12} color="#b45309" />
                      <span>Sigiliu Autentic Atelier</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <button 
                type="button" 
                id="btn-modal-download-300dpi"
                onClick={handleDownloadCanvasPng} 
                className="btn btn-primary btn-md"
              >
                <Download size={16} />
                <span>Descarcă Ultra-HD 300 DPI</span>
              </button>
              <button 
                type="button" 
                id="btn-modal-print-pdf"
                onClick={handlePrintCard} 
                className="btn btn-whatsapp btn-md"
              >
                <Printer size={16} />
                <span>Imprimă / Salvează PDF</span>
              </button>
            </div>

            <button type="button" onClick={() => setDownloadModalOpen(false)} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Închide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
