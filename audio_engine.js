/* ============================================================
   HAKAI PROTOCOL — Audio Engine
   Synthesized sounds via Web Audio API — zero file dependencies
   ============================================================ */
(function(){
  let ctx = null;
  // Clear stale mute state — default to unmuted on first load
  if(localStorage.getItem('hakaiMuted')===null) localStorage.setItem('hakaiMuted','0');
  let muted = localStorage.getItem('hakaiMuted') === '1';

  function getCtx(){
    if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if(ctx.state === 'suspended') ctx.resume();
    return ctx;
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

  /* ── helpers ── */
  function note(freq, start, dur, vol=0.3, type='sine', ctx_=null){
    const c = ctx_ || getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.start(start); osc.stop(start + dur + 0.05);
  }

  function noise(start, dur, vol=0.15){
    const c = getCtx();
    const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const data = buf.getChannelData(0);
    for(let i=0; i<data.length; i++) data[i] = Math.random()*2-1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const gain = c.createGain();
    const filt = c.createBiquadFilter();
    filt.type = 'bandpass'; filt.frequency.value = 200;
    src.connect(filt); filt.connect(gain); gain.connect(c.destination);
    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    src.start(start); src.stop(start + dur + 0.05);
  }

  /* ── SOUND 1: Habit Complete — clean satisfying ding ── */
  window.playHabitComplete = function(){
    if(muted) return;
    const c = getCtx(), now = c.currentTime;
    note(880,  now,       0.12, 0.25, 'sine', c);
    note(1320, now+0.05,  0.18, 0.18, 'sine', c);
    note(1760, now+0.10,  0.28, 0.12, 'sine', c);
  };

  /* ── SOUND 2: Level Up — ascending power arpeggio ── */
  window.playLevelUp = function(){
    if(muted) return;
    const c = getCtx(), now = c.currentTime;
    const melody = [261, 329, 392, 523, 659, 784, 1046];
    melody.forEach((freq, i) => {
      note(freq, now + i*0.09, 0.22, 0.22, 'triangle', c);
    });
    // bass thud
    note(65, now, 0.3, 0.35, 'sawtooth', c);
    note(65, now+0.05, 0.25, 0.2, 'square', c);
    // final chord
    [523, 659, 784].forEach(f => note(f, now+0.65, 0.5, 0.15, 'sine', c));
  };

  /* ── SOUND 3: Creature Unlock — epic summon horn ── */
  window.playCreatureUnlock = function(){
    if(muted) return;
    const c = getCtx(), now = c.currentTime;
    // low rumble
    note(55,  now,      0.4, 0.3, 'sawtooth', c);
    note(82,  now+0.1,  0.35, 0.25, 'sawtooth', c);
    // horn
    note(220, now+0.2,  0.15, 0.3, 'square', c);
    note(293, now+0.35, 0.15, 0.3, 'square', c);
    note(369, now+0.50, 0.15, 0.3, 'square', c);
    note(440, now+0.65, 0.4,  0.3, 'square', c);
    // sparkle
    [880, 1109, 1320, 1760].forEach((f,i) =>
      note(f, now+0.7+i*0.06, 0.2, 0.12, 'sine', c)
    );
  };

  /* ── SOUND 4: Boss Damage — heavy impact thud ── */
  window.playBossDamage = function(){
    if(muted) return;
    const c = getCtx(), now = c.currentTime;
    noise(now, 0.12, 0.25);
    note(80,  now,      0.15, 0.4, 'sawtooth', c);
    note(60,  now+0.04, 0.12, 0.3, 'square',   c);
  };

  /* ── SOUND 5: Boss Defeated — full victory fanfare ── */
  window.playBossDefeated = function(){
    if(muted) return;
    const c = getCtx(), now = c.currentTime;
    // dramatic pause with low boom
    note(55, now,      0.5, 0.4, 'sawtooth', c);
    note(41, now+0.1,  0.4, 0.35,'sawtooth', c);
    noise(now, 0.25, 0.3);
    // fanfare melody
    const fanfare = [
      [392,0.5,0.18],[392,0.68,0.18],[392,0.86,0.18],
      [523,1.05,0.28],[392,1.35,0.12],[440,1.48,0.12],
      [523,1.61,0.5]
    ];
    fanfare.forEach(([f,t,d]) => note(f, now+t, d, 0.28, 'square', c));
    // harmony layer
    const harm = [
      [261,0.5,0.18],[261,0.68,0.18],[261,0.86,0.18],
      [329,1.05,0.28],[261,1.35,0.12],[293,1.48,0.12],
      [329,1.61,0.5]
    ];
    harm.forEach(([f,t,d]) => note(f, now+t, d, 0.18, 'triangle', c));
    // final sparkle
    [523,659,784,1046,1318].forEach((f,i) =>
      note(f, now+2.1+i*0.07, 0.35, 0.14, 'sine', c)
    );
  };


  /* ── Unlock AudioContext on first user interaction (Chrome autoplay policy) ── */
  function unlockAudio(){
    getCtx();
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchend', unlockAudio);
  }
  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchend', unlockAudio);
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
})();
