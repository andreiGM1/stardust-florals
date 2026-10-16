/**
 * Utility for generating high-end luxury audio effects using Web Audio API.
 * Synthesizes harmonious bell chimes and tactile wax-seal crackles without requiring external audio files.
 */

export function playLuxuryChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // High-end major 9th chime (D5, F#5, A5, D6)
    const notes = [587.33, 739.99, 880.00, 1174.66];
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.11);

      // Smooth attack & long crystal decay
      const startTime = ctx.currentTime + idx * 0.11;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.9);
    });
  } catch (e) {
    console.warn('Audio chime warning:', e);
  }
}

/**
 * Synthesizes a tactile wax-seal break sound followed by a soft golden harp arpeggio
 * when opening the 3D royal envelope.
 */
export function playWaxSealBreakSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const t = ctx.currentTime;

    // 1. Tactile Wax Snap / Crackle (Filtered fast pop)
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.type = 'triangle';
    popOsc.frequency.setValueAtTime(1400, t);
    popOsc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

    popGain.gain.setValueAtTime(0.001, t);
    popGain.gain.exponentialRampToValueAtTime(0.35, t + 0.015);
    popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    popOsc.connect(popGain);
    popGain.connect(ctx.destination);
    popOsc.start(t);
    popOsc.stop(t + 0.09);

    // 2. Secondary soft wax crinkle
    const crinkleOsc = ctx.createOscillator();
    const crinkleGain = ctx.createGain();
    crinkleOsc.type = 'sine';
    crinkleOsc.frequency.setValueAtTime(600, t + 0.04);
    crinkleOsc.frequency.exponentialRampToValueAtTime(200, t + 0.12);

    crinkleGain.gain.setValueAtTime(0.001, t + 0.04);
    crinkleGain.gain.exponentialRampToValueAtTime(0.15, t + 0.06);
    crinkleGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    crinkleOsc.connect(crinkleGain);
    crinkleGain.connect(ctx.destination);
    crinkleOsc.start(t + 0.04);
    crinkleOsc.stop(t + 0.13);

    // 3. Romantic Harp Glissando (C5, E5, G5, B5, C6)
    const harpNotes = [523.25, 659.25, 783.99, 987.77, 1046.50];
    harpNotes.forEach((freq, i) => {
      const harpOsc = ctx.createOscillator();
      const harpGain = ctx.createGain();
      const startTime = t + 0.14 + (i * 0.09);

      harpOsc.type = 'sine';
      harpOsc.frequency.setValueAtTime(freq, startTime);

      harpGain.gain.setValueAtTime(0.0001, startTime);
      harpGain.gain.exponentialRampToValueAtTime(0.16, startTime + 0.03);
      harpGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.9);

      harpOsc.connect(harpGain);
      harpGain.connect(ctx.destination);

      harpOsc.start(startTime);
      harpOsc.stop(startTime + 0.95);
    });
  } catch (e) {
    console.warn('Audio seal sound warning:', e);
  }
}

/**
 * Synthesizes a bubbly double-tap heart pop sound for TikTok reel likes and social reactions.
 */
export function playHeartPopSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, t);
    osc.frequency.exponentialRampToValueAtTime(1180, t + 0.08);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.17);
  } catch (e) {
    console.warn('Audio pop warning:', e);
  }
}
