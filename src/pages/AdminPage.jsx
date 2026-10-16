import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Download, Trash2, Send, ExternalLink, Key, RefreshCw, CheckCircle, Database, Volume2, VolumeX, Bell, Sparkles } from 'lucide-react';
import { exportToCsv } from '../utils/leadDispatcher';
import { playLuxuryChime } from '../utils/audioAlert';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [orders, setOrders] = useState([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('stardust_admin_sound_enabled') !== 'false';
  });
  const [recentAlert, setRecentAlert] = useState(null);

  const prevLeadsCountRef = useRef(0);
  const prevOrdersCountRef = useRef(0);

  useEffect(() => {
    // Check if session authenticated
    if (sessionStorage.getItem('stardust_admin_auth') === 'true') {
      setIsAuthenticated(true);
      loadData(true);
    }
    const savedWebhook = localStorage.getItem('stardust_webhook_url') || '';
    setWebhookUrl(savedWebhook);
  }, []);

  // Periodic polling for live lead detection while admin tab is open
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      checkForNewData();
    }, 2500);

    const handleStorageChange = (e) => {
      if (e.key === 'stardust_leads' || e.key === 'stardust_orders') {
        checkForNewData();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated, soundEnabled]);

  const loadData = (isInitial = false) => {
    const storedLeads = JSON.parse(localStorage.getItem('stardust_leads') || '[]');
    const storedOrders = JSON.parse(localStorage.getItem('stardust_orders') || '[]');
    setLeads(storedLeads);
    setOrders(storedOrders);
    if (isInitial) {
      prevLeadsCountRef.current = storedLeads.length;
      prevOrdersCountRef.current = storedOrders.length;
    }
  };

  const checkForNewData = () => {
    const storedLeads = JSON.parse(localStorage.getItem('stardust_leads') || '[]');
    const storedOrders = JSON.parse(localStorage.getItem('stardust_orders') || '[]');

    if (storedLeads.length > prevLeadsCountRef.current) {
      const newestLead = storedLeads[0];
      setRecentAlert({
        type: 'lead',
        title: 'Lead Nou Înregistrat!',
        subtitle: `${newestLead.name || 'Client'} (${newestLead.phone || ''}) din ${newestLead.source || 'Site'}`,
        timestamp: new Date().toLocaleTimeString('ro-RO')
      });
      if (soundEnabled) {
        playLuxuryChime();
      }
      prevLeadsCountRef.current = storedLeads.length;
      setLeads(storedLeads);
    }

    if (storedOrders.length > prevOrdersCountRef.current) {
      const newestOrder = storedOrders[0];
      setRecentAlert({
        type: 'order',
        title: 'Comandă Nouă Plasată!',
        subtitle: `#${newestOrder.orderId} — ${newestOrder.bouquet} (${newestOrder.total})`,
        timestamp: new Date().toLocaleTimeString('ro-RO')
      });
      if (soundEnabled) {
        playLuxuryChime();
      }
      prevOrdersCountRef.current = storedOrders.length;
      setOrders(storedOrders);
    }
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    localStorage.setItem('stardust_admin_sound_enabled', String(nextVal));
    if (nextVal) {
      playLuxuryChime();
    }
  };

  const testAudioChime = () => {
    playLuxuryChime();
    setRecentAlert({
      type: 'test',
      title: 'Test Alertă Audio Activată!',
      subtitle: 'Sunetul de notificare luxos funcționează perfect în browser.',
      timestamp: new Date().toLocaleTimeString('ro-RO')
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('stardust_admin_auth', 'true');
      loadData();
    } else {
      alert('PIN incorect. Încearcă 1234.');
    }
  };

  const handleSaveWebhook = (e) => {
    e.preventDefault();
    localStorage.setItem('stardust_webhook_url', webhookUrl.trim());
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 3000);
  };

  const handleClearData = () => {
    if (window.confirm('Ești sigur că vrei să ștergi istoricul local de lead-uri și comenzi?')) {
      localStorage.removeItem('stardust_leads');
      localStorage.removeItem('stardust_orders');
      loadData();
    }
  };

  const filteredLeads = leads.filter((l) => {
    const q = searchQuery.toLowerCase();
    return (
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.phone && l.phone.toLowerCase().includes(q)) ||
      (l.source && l.source.toLowerCase().includes(q))
    );
  });

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '40px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <Key size={30} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Panou Proprietar</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Introdu codul PIN de securitate pentru a accesa baza de date de lead-uri și comenzi.
          </p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input 
              type="password" 
              placeholder="PIN de acces (implicit: 1234)" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1.5px solid var(--border-light)', textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
              autoFocus
            />
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Autentificare
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, o) => {
    const num = parseInt(o.total || '0', 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div style={{ padding: '50px 0 90px' }}>
      <div className="container">
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
              <ShieldCheck size={14} /> AUTENTIFICAT CA PROPRIETAR
            </div>
            <h1 style={{ fontSize: '2.4rem', marginTop: '8px' }}>Panou de Control & Lead-uri</h1>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={toggleSound} 
              className={`btn btn-sm ${soundEnabled ? 'btn-primary' : 'btn-secondary'}`}
              title="Activează/Dezactivează semnalul sonor la comenzi noi"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span>{soundEnabled ? 'Sunet: Activ' : 'Sunet: Oprit'}</span>
            </button>
            <button 
              onClick={testAudioChime} 
              className="btn btn-secondary btn-sm"
              title="Redă sunetul de alertă luxos în difuzoare"
            >
              <Bell size={15} /> <span>Test Sunet</span>
            </button>
            <button onClick={() => exportToCsv('stardust_leads_export', leads)} className="btn btn-secondary btn-sm">
              <Download size={15} /> Exportă Lead-uri CSV
            </button>
            <button onClick={() => exportToCsv('stardust_orders_export', orders)} className="btn btn-secondary btn-sm">
              <Download size={15} /> Exportă Comenzi CSV
            </button>
            <button onClick={handleClearData} className="btn btn-sm" style={{ background: '#fee2e2', color: '#dc2626', border: 'none' }}>
              <Trash2 size={15} /> Curăță Teste
            </button>
          </div>
        </div>

        {/* Live Alert Notification Banner */}
        {recentAlert && (
          <div style={{
            background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
            border: '1.5px solid var(--rose-300)',
            borderRadius: '16px',
            padding: '16px 22px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 8px 25px rgba(225, 29, 72, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--rose-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '1.02rem', color: 'var(--rose-700)', display: 'block' }}>{recentAlert.title} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>({recentAlert.timestamp})</span></strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{recentAlert.subtitle}</span>
              </div>
            </div>
            <button 
              onClick={() => setRecentAlert(null)}
              className="btn btn-sm btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.8rem', flexShrink: 0 }}
            >
              Închide
            </button>
          </div>
        )}

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '22px', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Lead-uri Captate</span>
            <strong style={{ fontSize: '2.4rem', color: 'var(--rose-600)', display: 'block', marginTop: '6px' }}>{leads.length}</strong>
            <span style={{ fontSize: '0.78rem', color: '#10b981' }}>● Numere WhatsApp & contacte</span>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '22px', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Comenzi Plasate</span>
            <strong style={{ fontSize: '2.4rem', color: 'var(--text-main)', display: 'block', marginTop: '6px' }}>{orders.length}</strong>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Trimise pe WhatsApp</span>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '22px', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Valoare Totală Estimată</span>
            <strong style={{ fontSize: '2.4rem', color: '#10b981', display: 'block', marginTop: '6px' }}>{totalRevenue} RON</strong>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Din comenzi inițiate</span>
          </div>
        </div>

        {/* Webhook Configuration Box */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '28px', marginBottom: '40px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Database size={20} color="var(--rose-600)" />
            <h3 style={{ fontSize: '1.25rem' }}>Integrare Webhook Extern (Google Sheets, Make, Zapier, n8n)</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '18px' }}>
            Introdu URL-ul webhook-ului tău. De fiecare dată când un client trimite o comandă sau revendică un cupon de 10%, datele vor fi transmise automat prin POST request către CRM-ul sau tabelul tău!
          </p>

          <form onSubmit={handleSaveWebhook} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input 
              type="url" 
              placeholder="https://hook.eu1.make.com/... sau https://script.google.com/..." 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              style={{ flex: 1, minWidth: '280px', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', fontSize: '0.9rem', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
            />
            <button type="submit" className="btn btn-primary btn-md">
              <span>Salvează Webhook</span>
              <CheckCircle size={16} />
            </button>
          </form>
          {webhookSaved && (
            <span style={{ color: '#10b981', fontSize: '0.82rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
              <CheckCircle size={14} color="#10b981" /> Webhook salvat cu succes! Toate lead-urile viitoare vor fi transmise automat.
            </span>
          )}
        </div>

        {/* Leads Table Section */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: '40px' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem' }}>Baza de Date Lead-uri ({filteredLeads.length})</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Clienți potențiali colectați din pop-up-ul VIP, formularul de contact și checkout.</p>
            </div>
            <input 
              type="text" 
              placeholder="Caută după nume, telefon, sursă..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-light)', outline: 'none', fontSize: '0.88rem', minWidth: '240px', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '14px 20px' }}>Data & Ora</th>
                  <th style={{ padding: '14px 20px' }}>Nume</th>
                  <th style={{ padding: '14px 20px' }}>Telefon</th>
                  <th style={{ padding: '14px 20px' }}>Sursă Lead</th>
                  <th style={{ padding: '14px 20px' }}>Detalii / Buchet</th>
                  <th style={{ padding: '14px 20px' }}>Acțiune</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Nu există lead-uri înregistrate încă. Deschide site-ul într-o fereastră nouă și testează formularul!
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((l, i) => {
                    const isVeryRecent = i === 0;
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)', background: isVeryRecent ? 'rgba(225, 29, 72, 0.03)' : 'transparent' }}>
                        <td style={{ padding: '14px 20px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {isVeryRecent && (
                              <span style={{ fontSize: '0.68rem', fontWeight: 900, background: 'var(--rose-600)', color: '#fff', padding: '2px 6px', borderRadius: '6px', letterSpacing: '0.5px' }}>
                                NOU
                              </span>
                            )}
                            <span>{l.formattedDate || (l.timestamp ? new Date(l.timestamp).toLocaleString('ro-RO') : 'Recent')}</span>
                          </div>
                        </td>
                      <td style={{ padding: '14px 20px', fontWeight: 700 }}>{l.name || 'Anonim'}</td>
                      <td style={{ padding: '14px 20px', fontWeight: 600 }}>{l.phone}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: '12px', background: 'var(--rose-50)', color: 'var(--rose-600)' }}>
                          {l.source || 'General'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                        {l.bouquet || l.requestType || (l.total ? `Comandă: ${l.total}` : 'Cupon 10% deblocat')}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        {l.phone && (
                          <a 
                            href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bună ${l.name || ''}! Îți scriem de la Stardust Florals legat de buchetul cu sclipici dorit.`)}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-sm btn-whatsapp"
                            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                          >
                            <Send size={12} /> WhatsApp
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Table Section */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.35rem' }}>Comenzi Înregistrate ({orders.length})</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Toate detaliile comenzilor pregătite pentru livrare.</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '14px 20px' }}>ID Comandă</th>
                  <th style={{ padding: '14px 20px' }}>Expeditor</th>
                  <th style={{ padding: '14px 20px' }}>Destinatar & Adresă</th>
                  <th style={{ padding: '14px 20px' }}>Buchet & Culoare</th>
                  <th style={{ padding: '14px 20px' }}>Dată Livrare</th>
                  <th style={{ padding: '14px 20px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Nu există comenzi plasate încă.
                    </td>
                  </tr>
                ) : (
                  orders.map((o, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--rose-600)' }}>#{o.orderId}</td>
                      <td style={{ padding: '14px 20px' }}>{o.senderName} ({o.senderPhone})</td>
                      <td style={{ padding: '14px 20px', maxWidth: '240px' }}>
                        <strong>{o.recipientName}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{o.recipientAddress}</div>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <div>{o.bouquet}</div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{o.color}</span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        {o.date} <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({o.timeSlot})</span>
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: 800 }}>{o.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
