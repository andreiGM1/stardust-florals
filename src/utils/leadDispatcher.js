/**
 * Lead Dispatcher & Storage Utility
 * Gestionează salvarea locală a lead-urilor și trimiterea automată către Webhook (Google Sheets, Make, Zapier, n8n)
 */

export async function dispatchLead(leadData) {
  try {
    const timestamp = new Date().toISOString();
    const fullLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp,
      formattedDate: new Date().toLocaleString('ro-RO'),
      ...leadData
    };

    // 1. Salvare în localStorage
    const existingLeads = JSON.parse(localStorage.getItem('stardust_leads') || '[]');
    existingLeads.unshift(fullLead);
    localStorage.setItem('stardust_leads', JSON.stringify(existingLeads));

    // 2. Dispatch către Webhook extern dacă este configurat
    const webhookUrl = localStorage.getItem('stardust_webhook_url');
    if (webhookUrl && webhookUrl.trim().startsWith('http')) {
      try {
        await fetch(webhookUrl.trim(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullLead),
          mode: 'no-cors' // Permite apeluri către webhook-uri fără configurare CORS complexă
        });
        console.log('Lead dispatchat cu succes către webhook extern:', webhookUrl);
      } catch (err) {
        console.warn('Eroare trimitere webhook (lead-ul este salvat local):', err);
      }
    }

    return fullLead;
  } catch (e) {
    console.error('Eroare în dispatchLead:', e);
    return null;
  }
}

export function exportToCsv(filename, rows) {
  if (!rows || !rows.length) {
    alert('Nu există date pentru export.');
    return;
  }

  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map((row) =>
        keys
          .map((k) => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            cell = cell instanceof Array ? cell.join('; ') : cell.toString();
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator)
      )
      .join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
