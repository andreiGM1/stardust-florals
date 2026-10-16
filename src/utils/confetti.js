// Luxury Rose Petal & Gold Glitter Confetti Engine for Stardust Florals
export function launchLuxuryConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'stardust-confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize);

  const colors = [
    '#e11d48', // rose-600
    '#fb7185', // rose-400
    '#f43f5e', // rose-500
    '#ffd700', // gold
    '#f59e0b', // amber gold
    '#ffffff', // diamond white
    '#fda4af', // soft petal pink
    '#881337', // dark wine noir
  ];

  const particlesCount = 90;
  const particles = [];

  for (let i = 0; i < particlesCount; i++) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 200,
      y: height * 0.4 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      gravity: 0.28,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      size: Math.random() * 12 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      type: Math.random() > 0.4 ? 'petal' : 'glitter',
      wobble: Math.random() * 10,
      wobbleSpeed: Math.random() * 0.1 + 0.05
    });
  }

  let animationFrameId;
  let startTime = Date.now();
  const duration = 4500; // 4.5 seconds

  function render() {
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      window.removeEventListener('resize', handleResize);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.wobble += p.wobbleSpeed;

      // Slight horizontal drift
      p.x += Math.sin(p.wobble) * 1.5;

      // Fade out towards the end
      if (elapsed > duration - 1200) {
        p.opacity = Math.max(0, (duration - elapsed) / 1200);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.type === 'petal') {
        // Draw organic curved rose petal
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        // Draw diamond sparkle 4-pointed star or rectangle
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.3, -p.size * 0.3);
        ctx.lineTo(p.size, 0);
        ctx.lineTo(p.size * 0.3, p.size * 0.3);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.3, p.size * 0.3);
        ctx.lineTo(-p.size, 0);
        ctx.lineTo(-p.size * 0.3, -p.size * 0.3);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    });

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}
