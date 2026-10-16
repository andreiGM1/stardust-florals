/**
 * Stardust Florals — Bouquet Selection & Order Form Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const selectedBouquet = document.getElementById('selectedBouquet');
  const selectedColor = document.getElementById('selectedColor');
  const deliveryDate = document.getElementById('deliveryDate');
  const finalPriceDisplay = document.getElementById('finalPriceDisplay');
  const flowerOrderForm = document.getElementById('flowerOrderForm');
  const selectButtons = document.querySelectorAll('.select-prod-btn');

  // Set default delivery date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  deliveryDate.value = tomorrow.toISOString().split('T')[0];
  deliveryDate.min = tomorrow.toISOString().split('T')[0];

  function updatePrice() {
    const price = parseInt(selectedBouquet.value, 10);
    finalPriceDisplay.textContent = `${price} RON`;
  }

  selectedBouquet.addEventListener('change', updatePrice);
  updatePrice();

  // Handle card select buttons
  selectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const price = card.dataset.price;
      selectedBouquet.value = price;
      updatePrice();
      document.getElementById('comanda').scrollIntoView({ behavior: 'smooth' });
    });
  });

  flowerOrderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bouquetName = selectedBouquet.options[selectedBouquet.selectedIndex].text;
    const color = selectedColor.value;
    const date = deliveryDate.value;
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const message = document.getElementById('cardMessage').value.trim();
    const total = finalPriceDisplay.textContent;

    const waText = `🌹 COMANDĂ NOUĂ STARDUST FLORALS:\n` +
      `💐 Aranjament: ${bouquetName}\n` +
      `🎨 Culoare: ${color}\n` +
      `📅 Dată livrare: ${date}\n` +
      `💌 Mesaj Felicitare/QR: ${message || 'Fără mesaj scris'}\n` +
      `💰 Total: ${total}\n` +
      `👤 Expeditor: ${name} (${phone})\n` +
      `📍 Adresă destinatar: ${address}`;

    alert(`🎉 Comanda ta pentru ${bouquetName} a fost pregătită! Se deschide WhatsApp pentru confirmare.`);
    window.open(`https://wa.me/40700000000?text=${encodeURIComponent(waText)}`, '_blank');
  });

  // Mobile Menu Toggle Logic
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Închidere meniu la click pe orice link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Închidere meniu la click în exterior
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }
});
