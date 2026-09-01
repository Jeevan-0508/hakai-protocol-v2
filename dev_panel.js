/* DEV PANEL — activates on localhost OR when launched via /dev/ link */
const _devAllowed = location.hostname === 'localhost' ||
                    location.hostname === '127.0.0.1' ||
                    sessionStorage.getItem('hakaiDevMode') === '1';

if (!_devAllowed) {
  /* Silent in production — visit /dev/ subfolder to activate */
} else {
/* =========================================================
   HAKAI PROTOCOL — DEV SANDBOX PANEL
   Floating overlay for testing & previewing all game states
   ========================================================= */
(function(){
  'use strict';

  /* ── inject styles ── */
  const style = document.createElement('style');
  style.textContent = `
    #dev-toggle {
      position:fixed; bottom:20px; right:20px; z-index:99999;
      width:48px; height:48px; border-radius:50%;
      background:linear-gradient(135deg,#7c3aed,#4f46e5);
      border:2px solid #a78bfa; color:#fff; font-size:20px;
      cursor:pointer; box-shadow:0 0 20px rgba(124,58,237,0.7);
      display:flex; align-items:center; justify-content:center;
      transition:transform .2s; user-select:none;
    }
    #dev-toggle:hover { transform:scale(1.15) rotate(20deg); }
    #dev-panel {
      position:fixed; bottom:80px; right:20px; z-index:99998;
      width:320px; max-height:80vh; overflow-y:auto;
      background:#0a0a14; border:1.5px solid #7c3aed;
      border-radius:14px; padding:0; font-family:'Orbitron',monospace;
      box-shadow:0 0 40px rgba(124,58,237,0.5);
      display:none; flex-direction:column;
    }
    #dev-panel.open { display:flex; }
    .dp-header {
      background:linear-gradient(90deg,#4c1d95,#1e1b4b);
      padding:12px 16px; border-radius:12px 12px 0 0;
      display:flex; align-items:center; justify-content:space-between;
    }
    .dp-title { color:#a78bfa; font-size:11px; font-weight:700; letter-spacing:3px; }
    .dp-close { color:#6b7280; cursor:pointer; font-size:16px; }
    .dp-close:hover { color:#fff; }
    .dp-body { padding:14px; display:flex; flex-direction:column; gap:12px; }
    .dp-section-title {
      font-size:8px; font-weight:700; letter-spacing:3px;
      color:#6b7280; text-transform:uppercase; margin-bottom:4px;
      border-bottom:1px solid #1f2937; padding-bottom:4px;
    }
    .dp-row { display:flex; gap:6px; flex-wrap:wrap; }
    .dp-btn {
      flex:1; min-width:60px; padding:7px 10px; border-radius:7px;
      border:1px solid #374151; background:#111827; color:#e5e7eb;
      font-family:'Orbitron',monospace; font-size:9px; font-weight:600;
      letter-spacing:1px; cursor:pointer; transition:all .15s;
      white-space:nowrap;
    }
    .dp-btn:hover { border-color:#7c3aed; color:#a78bfa; background:#1a1040; }
    .dp-btn.danger { border-color:#7f1d1d; color:#fca5a5; }
    .dp-btn.danger:hover { border-color:#ef4444; background:#1c0a0a; }
    .dp-btn.success { border-color:#14532d; color:#86efac; }
    .dp-btn.success:hover { border-color:#22c55e; background:#0a1c10; }
    .dp-btn.tab-btn-dp { border-color:#1e3a5f; color:#7dd3fc; font-size:8px; }
    .dp-btn.tab-btn-dp:hover { border-color:#3b82f6; background:#0c1a2e; }
    .dp-slider-row { display:flex; align-items:center; gap:10px; }
    .dp-slider-row label { font-size:9px; color:#9ca3af; white-space:nowrap; }
    .dp-slider {
      flex:1; -webkit-appearance:none; height:4px;
      background:#1f2937; border-radius:2px; outline:none;
    }
    .dp-slider::-webkit-slider-thumb {
      -webkit-appearance:none; width:14px; height:14px;
      border-radius:50%; background:#7c3aed; cursor:pointer;
      box-shadow:0 0 8px rgba(124,58,237,0.6);
    }
    .dp-val { font-size:11px; color:#a78bfa; font-weight:700; min-width:28px; text-align:right; }
    .dp-stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
    .dp-stat {
      background:#111827; border:1px solid #1f2937; border-radius:8px;
      padding:7px 10px;
    }
    .dp-stat-label { font-size:7px; color:#6b7280; letter-spacing:2px; }
    .dp-stat-val { font-size:14px; color:#e5e7eb; font-weight:700; margin-top:2px; }
    .dp-boss-row {
      display:flex; align-items:center; gap:8px;
      padding:6px 8px; background:#0d0d18; border-radius:8px;
      border:1px solid #1f2937;
    }
    .dp-boss-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
    .dp-boss-name { flex:1; font-size:8px; color:#9ca3af; letter-spacing:1px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
    .dp-boss-status { font-size:7px; padding:2px 6px; border-radius:10px; white-space:nowrap; }
    .dp-boss-status.active { background:rgba(239,68,68,0.15); color:#fca5a5; }
    .dp-boss-status.defeated { background:rgba(74,222,128,0.15); color:#4ade80; }
    .dp-boss-status.locked { background:#1f2937; color:#4b5563; }
    .dp-boss-btn { font-size:7px; padding:3px 7px; border-radius:5px; border:1px solid #374151; background:#111827; color:#9ca3af; cursor:pointer; white-space:nowrap; }
    .dp-boss-btn:hover { border-color:#7c3aed; color:#a78bfa; }
    .dp-toast {
      position:fixed; bottom:80px; left:50%; transform:translateX(-50%);
      background:#7c3aed; color:#fff; padding:8px 20px; border-radius:20px;
      font-family:'Orbitron',monospace; font-size:10px; letter-spacing:2px;
      z-index:999999; opacity:0; transition:opacity .3s; pointer-events:none;
    }
    .dp-toast.show { opacity:1; }
  `;
  document.head.appendChild(style);

  /* ── build HTML ── */
  const toggle = document.createElement('div');
  toggle.id = 'dev-toggle';
  toggle.textContent = '⚙';
  toggle.title = 'Dev Sandbox Panel';

  const panel = document.createElement('div');
  panel.id = 'dev-panel';

  const toast = document.createElement('div');
  toast.className = 'dp-toast';
  document.body.appendChild(toast);

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function rebuildPanel() {
    panel.innerHTML = '';

    /* header */
    const hdr = document.createElement('div');
    hdr.className = 'dp-header';
    hdr.innerHTML = `<span class="dp-title">⚡ DEV SANDBOX</span><span class="dp-close" id="dp-close-btn">✕</span>`;
    panel.appendChild(hdr);

    const body = document.createElement('div');
    body.className = 'dp-body';

    /* ── LIVE STATS ── */
    const statsLabel = document.createElement('div');
    statsLabel.className = 'dp-section-title';
    statsLabel.textContent = '◈ Current State';
    body.appendChild(statsLabel);

    const statsGrid = document.createElement('div');
    statsGrid.className = 'dp-stat-grid';
    statsGrid.innerHTML = `
      <div class="dp-stat"><div class="dp-stat-label">LEVEL</div><div class="dp-stat-val" id="dp-sv-level">${S.level}</div></div>
      <div class="dp-stat"><div class="dp-stat-label">XP</div><div class="dp-stat-val" id="dp-sv-xp">${S.xp}</div></div>
      <div class="dp-stat"><div class="dp-stat-label">STREAK</div><div class="dp-stat-val" id="dp-sv-streak">${S.streak}d</div></div>
      <div class="dp-stat"><div class="dp-stat-label">RANK</div><div class="dp-stat-val" id="dp-sv-rank" style="font-size:11px">${S.rank||'E'}</div></div>
    `;
    body.appendChild(statsGrid);

    /* ── LEVEL CONTROL ── */
    const lvlLabel = document.createElement('div');
    lvlLabel.className = 'dp-section-title';
    lvlLabel.textContent = '◈ Set Level';
    body.appendChild(lvlLabel);

    const sliderRow = document.createElement('div');
    sliderRow.className = 'dp-slider-row';
    sliderRow.innerHTML = `
      <label>LV</label>
      <input type="range" class="dp-slider" id="dp-lvl-slider" min="1" max="100" value="${S.level}">
      <span class="dp-val" id="dp-lvl-val">${S.level}</span>
    `;
    body.appendChild(sliderRow);

    const lvlBtns = document.createElement('div');
    lvlBtns.className = 'dp-row';
    [1,20,40,60,80,100].forEach(lv => {
      const b = document.createElement('button');
      b.className = 'dp-btn';
      b.textContent = `LV${lv}`;
      b.onclick = () => { setLevel(lv); };
      lvlBtns.appendChild(b);
    });
    body.appendChild(lvlBtns);

    /* ── XP INJECT ── */
    const xpLabel = document.createElement('div');
    xpLabel.className = 'dp-section-title';
    xpLabel.textContent = '◈ Inject XP';
    body.appendChild(xpLabel);

    const xpBtns = document.createElement('div');
    xpBtns.className = 'dp-row';
    [['+100',100],['+500',500],['+1k',1000],['+5k',5000],['MAX',99999]].forEach(([label,amt]) => {
      const b = document.createElement('button');
      b.className = 'dp-btn';
      b.textContent = label;
      b.onclick = () => { S.xp += amt; if(typeof recalcLevel==='function')recalcLevel(); saveState(); if(typeof renderAll==='function')renderAll(); else if(typeof renderHUD==='function')renderHUD(); showToast(`+${label} XP`); rebuildPanel(); };
      xpBtns.appendChild(b);
    });
    body.appendChild(xpBtns);

    /* ── QUICK TABS ── */
    const tabLabel = document.createElement('div');
    tabLabel.className = 'dp-section-title';
    tabLabel.textContent = '◈ Quick Navigate';
    body.appendChild(tabLabel);

    const tabRow = document.createElement('div');
    tabRow.className = 'dp-row';
    const TABS = [
      ['HABITS','tab-habits'],['QUESTS','tab-quests'],['ARMY','tab-army'],
      ['ARMORY','tab-armory'],['BOSSES','tab-bosses'],['GATES','tab-gates'],
      ['ASCEND','tab-ascension'],['CALENDAR','tab-calendar']
    ];
    TABS.forEach(([label, id]) => {
      const b = document.createElement('button');
      b.className = 'dp-btn tab-btn-dp';
      b.textContent = label;
      b.onclick = () => {
        if(document.getElementById('screen-game') && !document.getElementById('screen-game').classList.contains('visible')) {
          if(typeof showGame === 'function') showGame();
        }
        if(typeof switchTab === 'function') switchTab(id);
        showToast(label);
      };
      tabRow.appendChild(b);
    });
    body.appendChild(tabRow);

    /* ── BOSS CONTROLS ── */
    const bossLabel = document.createElement('div');
    bossLabel.className = 'dp-section-title';
    bossLabel.textContent = '◈ Boss States';
    body.appendChild(bossLabel);

    const bossColors = {
      rift_crawler:'#9333ea', kragath:'#ef4444',
      serpent_nyx:'#f59e0b', void_titan:'#8b5cf6', the_protocol:'#22c55e'
    };

    if(typeof BOSSES !== 'undefined') {
      BOSSES.forEach(boss => {
        const isDefeated = S.bossDefeated && S.bossDefeated.includes(boss.id);
        const isActive = S.level >= boss.level;
        const status = isDefeated ? 'defeated' : isActive ? 'active' : 'locked';
        const statusTxt = isDefeated ? '✓ DEFEATED' : isActive ? '▶ ACTIVE' : '◼ LOCKED';
        const color = bossColors[boss.id] || '#7c3aed';

        const row = document.createElement('div');
        row.className = 'dp-boss-row';
        row.innerHTML = `
          <div class="dp-boss-dot" style="background:${color}"></div>
          <div class="dp-boss-name">${boss.name}</div>
          <div class="dp-boss-status ${status}">${statusTxt}</div>
          <button class="dp-boss-btn" data-id="${boss.id}" data-def="${isDefeated}">${isDefeated ? 'RESET' : 'DEFEAT'}</button>
        `;
        row.querySelector('.dp-boss-btn').onclick = function() {
          const id = this.dataset.id;
          const wasDefeated = this.dataset.def === 'true';
          if(!S.bossDefeated) S.bossDefeated = [];
          if(!S.bossProgress) S.bossProgress = {};
          if(wasDefeated) {
            S.bossDefeated = S.bossDefeated.filter(x => x !== id);
            S.bossProgress[id] = 0;
          } else {
            const b = BOSSES.find(x => x.id === id);
            if(!S.bossDefeated.includes(id)) S.bossDefeated.push(id);
            S.bossProgress[id] = b ? b.hpRequired : 999;
          }
          saveState();
          if(typeof renderBosses === 'function') renderBosses();
          showToast(wasDefeated ? `${id} RESET` : `${id} DEFEATED`);
          rebuildPanel();
        };
        body.appendChild(row);
      });
    }

    /* ── UNLOCK ALL ── */
    const unlockLabel = document.createElement('div');
    unlockLabel.className = 'dp-section-title';
    unlockLabel.textContent = '◈ Power Actions';
    body.appendChild(unlockLabel);

    const actionRow = document.createElement('div');
    actionRow.className = 'dp-row';

    const unlockBtn = document.createElement('button');
    unlockBtn.className = 'dp-btn success';
    unlockBtn.textContent = '🔓 UNLOCK ALL';
    unlockBtn.onclick = () => {
      setLevel(100);
      // unlock all bosses
      if(typeof BOSSES !== 'undefined') {
        BOSSES.forEach(b => {
          if(!S.bossDefeated.includes(b.id)) S.bossDefeated.push(b.id);
          S.bossProgress[b.id] = b.hpRequired;
        });
      }
      // force-unlock all creatures directly (bypass condition checks)
      if(typeof CREATURES !== 'undefined') {
        if(!S.unlockedCreatures) S.unlockedCreatures = [];
        CREATURES.forEach(c => {
          if(!S.unlockedCreatures.includes(c.id)) S.unlockedCreatures.push(c.id);
        });
      }
      // fix correct state field names for condition-based unlocks
      S.streak = 100; S.longestStreak = 100;
      S.totalDaysCompleted = 999;   // completions check
      S.storyProgress = 25;         // floor check
      // fake habitData so countHabitCompletions returns 999
      if(!S.habitData) S.habitData = {};
      for(let i = 0; i < 10; i++) {
        S.habitData['dev-day-'+i] = {workout:true,read:true,code:true,meditate:true,plan:true};
      }
      // fake completedGates so getGateClearCount() returns >= 3
      if(!S.completedGates) S.completedGates = {};
      for(let w = 0; w < 4; w++) {
        S.completedGates['dev-gate-'+w] = {days:['m','t','w','th','f','sa','su']};
      }
      saveState();
      if(typeof renderAll==='function') renderAll();
      else {
        if(typeof renderBestiary==='function') renderBestiary();
        if(typeof renderMyArmy==='function') {}
        if(typeof renderBosses==='function') renderBosses();
        if(typeof renderHUD==='function') renderHUD();
      }
      showToast('✓ EVERYTHING UNLOCKED');
      rebuildPanel();
    };
    actionRow.appendChild(unlockBtn);

    const skipBtn = document.createElement('button');
    skipBtn.className = 'dp-btn';
    skipBtn.textContent = '⏩ SKIP INTRO';
    skipBtn.onclick = () => {
      if(typeof skipIntro==='function') skipIntro();
      if(typeof showGame==='function') showGame();
      showToast('INTRO SKIPPED');
    };
    actionRow.appendChild(skipBtn);

    const reloadBtn = document.createElement('button');
    reloadBtn.className = 'dp-btn';
    reloadBtn.textContent = '🔄 RELOAD';
    reloadBtn.onclick = () => location.reload();
    actionRow.appendChild(reloadBtn);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'dp-btn danger';
    resetBtn.textContent = '💀 RESET SAVE';
    resetBtn.onclick = () => {
      if(confirm('WIPE ALL SAVE DATA? This cannot be undone.')) {
        localStorage.clear();
        location.reload();
      }
    };
    actionRow.appendChild(resetBtn);
    body.appendChild(actionRow);

    panel.appendChild(body);

    /* bind close */
    document.getElementById('dp-close-btn').onclick = () => panel.classList.remove('open');

    /* bind slider */
    const slider = document.getElementById('dp-lvl-slider');
    const valSpan = document.getElementById('dp-lvl-val');
    slider.oninput = () => valSpan.textContent = slider.value;
    slider.onchange = () => { setLevel(parseInt(slider.value)); };
  }

  /* ── setLevel helper ── */
  function setLevel(lv) {
    S.level = lv;
    S.xp = lv * 100;
    if(typeof recalcLevel === 'function') recalcLevel();
    saveState();
    if(typeof renderAll === 'function') renderAll();
    else {
      if(typeof renderHUD === 'function') renderHUD();
      if(typeof renderBosses === 'function') renderBosses();
      if(typeof checkCreatureUnlock === 'function') checkCreatureUnlock();
    }
    showToast(`LEVEL SET → ${lv}`);
    setTimeout(rebuildPanel, 100);
  }

  /* ── toggle logic ── */
  toggle.onclick = () => {
    const isOpen = panel.classList.contains('open');
    if(!isOpen) { rebuildPanel(); panel.classList.add('open'); }
    else panel.classList.remove('open');
  };

  /* ── mount ── */
  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  /* ── refresh stats every 2s while open ── */
  setInterval(() => {
    if(!panel.classList.contains('open')) return;
    const lv = document.getElementById('dp-sv-level');
    const xp = document.getElementById('dp-sv-xp');
    const str = document.getElementById('dp-sv-streak');
    const rnk = document.getElementById('dp-sv-rank');
    if(lv) lv.textContent = S.level;
    if(xp) xp.textContent = S.xp;
    if(str) str.textContent = (S.streak||0)+'d';
    if(rnk) rnk.textContent = S.rank||'E';
  }, 2000);

  console.log('%c⚡ HAKAI DEV PANEL LOADED — click the ⚙ button (bottom-right)', 'color:#a78bfa;font-family:monospace;font-weight:bold;font-size:13px');
})();

} /* end dev guard */
