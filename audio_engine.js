/* ============================================================
   HAKAI PROTOCOL — Audio Engine v2
   12 synthesized sounds — zero file dependencies
   ============================================================ */
(function(){
  let ctx = null;
  if(localStorage.getItem('hakaiMuted')===null) localStorage.setItem('hakaiMuted','0');
  let muted = localStorage.getItem('hakaiMuted') === '1';

  function getCtx(){
    if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  /* schedule sound fn AFTER AudioContext is confirmed running */
  function withCtx(fn){
    if(muted) return;
    const c = getCtx();
    if(c.state === 'running'){ fn(c); }
    else { c.resume().then(() => fn(c)); }
  }

  /* ── master toggle ── */
  window.toggleMute = function(){
    muted = !muted;
    localStorage.setItem('hakaiMuted', muted ? '1' : '0');
    const btn = document.getElementById('audio-toggle-btn');
    if(btn) btn.textContent = muted ? '🔇' : '🔊';
    return muted;
  };
  window.isMuted = () => muted;

  /* ── unlock audio context on first real user gesture ── */
  window.unlockAudioContext = function(){
    const c = getCtx();
    if(c.state !== 'running') c.resume();
  };

  /* ── primitives ── */
  function note(c, freq, start, dur, vol=0.3, type='sine'){
    const osc = c.createOscillator(), gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.start(start); osc.stop(start + dur + 0.05);
  }

  function sweep(c, startFreq, endFreq, start, dur, vol=0.2, type='sine'){
    const osc = c.createOscillator(), gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, start);
    osc.frequency.linearRampToValueAtTime(endFreq, start + dur);
    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.start(start); osc.stop(start + dur + 0.05);
  }

  function noise(c, start, dur, vol=0.15, freqHz=200){
    const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const data = buf.getChannelData(0);
    for(let i=0; i<data.length; i++) data[i] = Math.random()*2-1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const gain = c.createGain(), filt = c.createBiquadFilter();
    filt.type = 'bandpass'; filt.frequency.value = freqHz;
    src.connect(filt); filt.connect(gain); gain.connect(c.destination);
    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    src.start(start); src.stop(start + dur + 0.05);
  }

  /* ══════════════════════════════════════════════
     SOUND LIBRARY
  ══════════════════════════════════════════════ */

  /* 1 — Generic UI click — ultra-short mechanical tick */
  window.playUIClick = function(){
    withCtx(c => {
      const t = c.currentTime;
      noise(c, t, 0.04, 0.12, 1200);
      note(c, 1800, t, 0.03, 0.08, 'square');
    });
  };

  /* 2 — Tab / nav switch — soft whoosh */
  window.playUINav = function(){
    withCtx(c => {
      const t = c.currentTime;
      sweep(c, 300, 600, t, 0.1, 0.15, 'sine');
      noise(c, t, 0.08, 0.06, 800);
    });
  };

  /* 3 — Modal open — dark cinematic swoosh in */
  window.playUIOpen = function(){
    withCtx(c => {
      const t = c.currentTime;
      sweep(c, 80, 220, t, 0.18, 0.25, 'sawtooth');
      sweep(c, 200, 500, t+0.05, 0.14, 0.12, 'sine');
      noise(c, t, 0.15, 0.1, 400);
    });
  };

  /* 4 — Modal close — soft pop / dismiss */
  window.playUIClose = function(){
    withCtx(c => {
      const t = c.currentTime;
      sweep(c, 400, 200, t, 0.1, 0.15, 'sine');
      noise(c, t, 0.06, 0.07, 600);
    });
  };

  /* 5 — Habit complete — clean triple ding */
  window.playHabitComplete = function(){
    withCtx(c => {
      const t = c.currentTime;
      note(c, 880,  t,      0.12, 0.25, 'sine');
      note(c, 1320, t+0.05, 0.18, 0.18, 'sine');
      note(c, 1760, t+0.10, 0.28, 0.12, 'sine');
    });
  };

  /* 6 — Habit untick — short descending blip */
  window.playHabitUntick = function(){
    withCtx(c => {
      const t = c.currentTime;
      sweep(c, 600, 300, t, 0.12, 0.15, 'sine');
      note(c, 300, t+0.08, 0.08, 0.08, 'triangle');
    });
  };

  /* 7 — Level up — ascending power arpeggio */
  window.playLevelUp = function(){
    withCtx(c => {
      const t = c.currentTime;
      [261,329,392,523,659,784,1046].forEach((f,i) =>
        note(c, f, t+i*0.09, 0.22, 0.22, 'triangle')
      );
      note(c, 65, t,      0.3,  0.35, 'sawtooth');
      note(c, 65, t+0.05, 0.25, 0.2,  'square');
      [523,659,784].forEach(f => note(c, f, t+0.65, 0.5, 0.15, 'sine'));
    });
  };

  /* 8 — Creature unlock — epic summon horn */
  window.playCreatureUnlock = function(){
    withCtx(c => {
      const t = c.currentTime;
      note(c, 55,  t,      0.4,  0.3,  'sawtooth');
      note(c, 82,  t+0.1,  0.35, 0.25, 'sawtooth');
      note(c, 220, t+0.2,  0.15, 0.3,  'square');
      note(c, 293, t+0.35, 0.15, 0.3,  'square');
      note(c, 369, t+0.50, 0.15, 0.3,  'square');
      note(c, 440, t+0.65, 0.4,  0.3,  'square');
      [880,1109,1320,1760].forEach((f,i) =>
        note(c, f, t+0.7+i*0.06, 0.2, 0.12, 'sine')
      );
    });
  };

  /* 9 — Boss damage — heavy thud */
  window.playBossDamage = function(){
    withCtx(c => {
      const t = c.currentTime;
      noise(c, t, 0.12, 0.25);
      note(c, 80, t,      0.15, 0.4, 'sawtooth');
      note(c, 60, t+0.04, 0.12, 0.3, 'square');
    });
  };

  /* 10 — Boss defeated — full victory fanfare */
  window.playBossDefeated = function(){
    withCtx(c => {
      const t = c.currentTime;
      note(c, 55, t,     0.5,  0.4,  'sawtooth');
      note(c, 41, t+0.1, 0.4,  0.35, 'sawtooth');
      noise(c, t, 0.25, 0.3);
      [[392,.5,.18],[392,.68,.18],[392,.86,.18],[523,1.05,.28],
       [392,1.35,.12],[440,1.48,.12],[523,1.61,.5]
      ].forEach(([f,d,dur]) => note(c, f, t+d, dur, 0.28, 'square'));
      [[261,.5,.18],[261,.68,.18],[261,.86,.18],[329,1.05,.28],
       [261,1.35,.12],[293,1.48,.12],[329,1.61,.5]
      ].forEach(([f,d,dur]) => note(c, f, t+d, dur, 0.18, 'triangle'));
      [523,659,784,1046,1318].forEach((f,i) =>
        note(c, f, t+2.1+i*0.07, 0.35, 0.14, 'sine')
      );
    });
  };

  /* 11 — Warning / danger — low buzzing alert */
  window.playUIWarning = function(){
    withCtx(c => {
      const t = c.currentTime;
      note(c, 120, t,      0.15, 0.35, 'sawtooth');
      note(c, 100, t+0.12, 0.15, 0.3,  'sawtooth');
      note(c, 80,  t+0.24, 0.2,  0.25, 'sawtooth');
      sweep(c, 200, 60, t, 0.4, 0.1, 'square');
    });
  };

  /* 12 — Story / ascension unlock — mystical shimmer */
  window.playUIStory = function(){
    withCtx(c => {
      const t = c.currentTime;
      [1046,1318,1568,2093].forEach((f,i) =>
        note(c, f, t+i*0.07, 0.3, 0.12, 'sine')
      );
      sweep(c, 300, 800, t, 0.25, 0.1, 'triangle');
      noise(c, t+0.1, 0.2, 0.05, 2000);
    });
  };

  /* 13 — Export / success — short positive chime */
  window.playUISuccess = function(){
    withCtx(c => {
      const t = c.currentTime;
      note(c, 659,  t,      0.15, 0.2,  'sine');
      note(c, 880,  t+0.1,  0.15, 0.18, 'sine');
      note(c, 1318, t+0.2,  0.25, 0.14, 'sine');
    });
  };

  /* 14 — Add habit — bright ping */
  window.playUIAddHabit = function(){
    withCtx(c => {
      const t = c.currentTime;
      sweep(c, 400, 1200, t, 0.12, 0.2, 'sine');
      note(c, 1200, t+0.1, 0.15, 0.12, 'sine');
    });
  };

  /* 15 — Remove habit — short sad descend */
  window.playUIRemove = function(){
    withCtx(c => {
      const t = c.currentTime;
      sweep(c, 500, 150, t, 0.18, 0.18, 'triangle');
      noise(c, t, 0.1, 0.06, 300);
    });
  };

  /* 16 — Character select — dramatic impact hit */
  window.playUISelect = function(){
    withCtx(c => {
      const t = c.currentTime;
      noise(c, t, 0.15, 0.3, 150);
      note(c, 110, t,      0.25, 0.4, 'sawtooth');
      note(c, 220, t+0.05, 0.2,  0.25, 'square');
      sweep(c, 500, 900, t+0.1, 0.2, 0.15, 'sine');
    });
  };

  /* ══════════════════════════════════════════════
     GLOBAL CLICK INTERCEPTOR
     plays generic tick for any button not already
     handled by a specific sound function
  ══════════════════════════════════════════════ */
  const SKIP_GENERIC = new Set(); /* populated by specific sound callers */

  document.addEventListener('click', function(e){
    const el = e.target.closest('button, [onclick], .char-card, .boss-card, .creature-card, .story-node, .weapon-tier-btn');
    if(!el) return;
    if(SKIP_GENERIC.has(el)) return;
    /* mute button handles its own sound */
    if(el.id === 'audio-toggle-btn') return;
    /* danger buttons get warning sound */
    if(el.classList.contains('danger')){ playUIWarning(); return; }
    /* default: generic tick */
    playUIClick();
  }, true); /* capture = fires before onclick handlers */

  /* helper: call this at start of specific handlers to suppress the generic tick */
  window.audioHandled = function(el){
    if(!el) return;
    SKIP_GENERIC.add(el);
    setTimeout(() => SKIP_GENERIC.delete(el), 50);
  };

  /* ── Inject mute button into HUD ── */
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.id = 'audio-toggle-btn';
    btn.textContent = muted ? '🔇' : '🔊';
    btn.title = 'Toggle Sound';
    btn.style.cssText = `
      position:fixed; top:12px; right:130px; z-index:9000;
      background:rgba(20,10,40,.85); border:1px solid #3b2060;
      color:#a78bfa; width:34px; height:34px; border-radius:8px;
      cursor:pointer; font-size:16px; display:flex;
      align-items:center; justify-content:center;
      backdrop-filter:blur(6px); transition:all .2s;
    `;
    btn.onmouseenter = () => btn.style.borderColor = '#7c3aed';
    btn.onmouseleave = () => btn.style.borderColor = '#3b2060';
    btn.onclick = () => {
      const nowMuted = toggleMute();
      if(typeof toast === 'function') toast(nowMuted ? '🔇 Sound Off' : '🔊 Sound On');
    };
    document.body.appendChild(btn);
  });

  /* 13 — Cinematic boot hum — low sustained drone with slow sweep */
  window.playCinematicHum = function(){
    withCtx(c => {
      const t = c.currentTime;
      sweep(c, 45, 62, t, 3.2, 0.16, 'sawtooth');
      sweep(c, 90, 124, t, 3.2, 0.06, 'sine');
      note(c, 45, t, 3.0, 0.1, 'triangle');
    });
  };

  /* 14 — Cinematic glitch stinger — sharp metallic hit for logo reveal */
  window.playCinematicStinger = function(){
    withCtx(c => {
      const t = c.currentTime;
      note(c, 880, t, 0.08, 0.18, 'square');
      note(c, 220, t, 0.35, 0.3, 'sawtooth');
      note(c, 55, t, 0.4, 0.28, 'triangle');
      noise(c, t, 0.06, 0.12);
      [1200,900,1500].forEach((f,i)=>note(c, f, t+i*0.02, 0.05, 0.08, 'square'));
    });
  };

  /* 15 — Cinematic whoosh — welcome-back line typing accent */
  window.playCinematicWhoosh = function(){
    withCtx(c => {
      const t = c.currentTime;
      sweep(c, 200, 900, t, 0.5, 0.12, 'sine');
    });
  };

})();
