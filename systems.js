/* ============================================================
   HAKAI PROTOCOL — RETENTION SYSTEMS
   ============================================================
   Everything here answers one question: why would you open this
   today, specifically, and again tomorrow?

   The core loop already rewards you for ticking a habit. What it
   had no answer for:

   - nothing about the game changed from one day to the next, so
     there was no reason for today to be the day  -> DAILY DIRECTIVE
   - one missed day destroyed a 40-day streak, which is the single
     biggest quit trigger in a habit app            -> STREAK SHIELDS
   - every reward was deterministic and known in advance, and a
     fixed reward schedule is the weakest one for forming a habit
                                                    -> SHADOW CACHES
   - unlocks were invisible until they landed, so there was nothing
     to look forward to                             -> PROXIMITY SCAN
   - after a broken streak you were behind with no path back, which
     turns one bad week into churn                  -> REBUILD PROTOCOL
   - nothing reminded you it existed                -> APP BADGE

   This file is deliberately separate from engine.js and touches the
   engine through four named seams only (recalcStreak,
   getStreakMultiplier, toggleHabit, renderAll), each of which keeps
   and calls the original. Every entry point is wrapped in a guard so
   that if anything in here fails, the game degrades to exactly the
   game that shipped before it rather than to a blank screen.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------------------------------------------------- tuning
     All balance numbers live here so the economy can be reasoned
     about in one place instead of being spread through the file. */
  var CFG = {
    shieldEvery: 7,          // complete days per shield earned
    maxShields: 3,
    cacheChance: 0.14,       // per newly completed quest
    riskHour: 18,            // local hour after which the evening nudge shows
    riskFinalHours: 4,       // always warn inside this much of the day flipping
    rebuildDays: 3,          // length of the comeback bonus
    rebuildBonus: 0.5,       // +50% XP while rebuilding
    rebuildTrigger: 2,       // missed days needed to offer it
    keepHistoryDays: 10      // prune per-day bookkeeping older than this
  };

  var CACHE_TIERS = [
    { id: 'common', name: 'COMMON CACHE',  color: '#94a3b8', weight: 68, xp: [15, 30],   shield: false },
    { id: 'rare',   name: 'RARE CACHE',    color: '#60a5fa', weight: 26, xp: [40, 75],   shield: false },
    { id: 'epic',   name: 'EPIC CACHE',    color: '#e879f9', weight: 6,  xp: [120, 180], shield: true  }
  ];

  var DEFAULTS = {
    shields: 0, shieldedDays: {}, lastShieldAt: 0,
    caches: 0, totalCachesOpened: 0, cacheLog: [], rolled: {},
    directive: null, directivesDone: 0,
    stamps: {}, rebuildUntil: null, lastSeen: null
  };

  /* ---------------------------------------------------------- utils */
  function guard(label, fn) {
    return function () {
      try { return fn.apply(this, arguments); }
      catch (e) { if (window.console) console.warn('[systems] ' + label, e); }
    };
  }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* Date keys follow the engine's convention: the UTC date out of
     toISOString. Parsing 'YYYY-MM-DD' with no zone yields LOCAL
     midnight, and formatting that back through toISOString shifts the
     key by a day for every timezone east of UTC -- in IST it made
     every derived key point at the day before. Staying in UTC means a
     key round-trips to itself everywhere. */
  function dayKey(d) { return d.toISOString().split('T')[0]; }
  function keyDate(key) { return new Date(key + 'T00:00:00Z'); }
  function shiftKey(key, days) {
    var d = keyDate(key); d.setUTCDate(d.getUTCDate() + days); return dayKey(d);
  }
  /* Stable per-string hash, so a date always yields the same directive.
     Without this the objective would reroll on every refresh, which
     makes it worth nothing. */
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
    return h >>> 0;
  }
  function sys() { return S.sys; }

  function ensureSys() {
    if (!S.sys || typeof S.sys !== 'object') S.sys = {};
    Object.keys(DEFAULTS).forEach(function (k) {
      if (S.sys[k] === undefined || S.sys[k] === null && DEFAULTS[k] !== null) {
        S.sys[k] = clone(DEFAULTS[k]);
      }
    });
  }

  /* Per-day bookkeeping grows forever otherwise, and localStorage is
     a few megabytes shared with the whole save. */
  function prune() {
    var cutoff = shiftKey(todayKey(), -CFG.keepHistoryDays);
    ['rolled', 'stamps'].forEach(function (bag) {
      Object.keys(sys()[bag]).forEach(function (k) {
        if (k.split('|')[0] < cutoff) delete sys()[bag][k];
      });
    });
  }

  /* ------------------------------------------------ today's numbers */
  function todayHabits() { return getHabitsForDate(todayKey()) || []; }
  function doneMap() { return S.habitData[todayKey()] || {}; }
  function doneToday() {
    var d = doneMap();
    return todayHabits().filter(function (h) { return d[h.id]; }).length;
  }
  function remainingToday() { return Math.max(0, todayHabits().length - doneToday()); }
  function stampHour(habitId) {
    var t = sys().stamps[todayKey() + '|' + habitId];
    return t ? new Date(t).getHours() : null;
  }
  function clearedBefore(hour) {
    return todayHabits().filter(function (h) {
      var hh = stampHour(h.id);
      return doneMap()[h.id] && hh !== null && hh < hour;
    }).length;
  }
  function weakestStat() {
    var best = null, lowest = Infinity;
    Object.keys(S.stats || {}).forEach(function (k) {
      if (S.stats[k] < lowest) { lowest = S.stats[k]; best = k; }
    });
    return best || 'STR';
  }
  function habitsWithStat(stat) {
    return todayHabits().filter(function (h) { return h.stat === stat; });
  }

  /* ================================================ DAILY DIRECTIVE
     One rotating objective per day with a bonus reward that expires
     at midnight. This is the piece that makes today different from
     yesterday, which is the whole reason to open the app now rather
     than at some point this week. */
  var DIRECTIVES = [
    { id: 'perfect', icon: '\uD83C\uDF1F', name: 'PERFECT PROTOCOL', xp: 100, timed: false,
      desc: function () { return 'Clear every quest today'; },
      target: function () { return todayHabits().length || 1; },
      progress: function () { return doneToday(); },
      available: function () { return todayHabits().length > 0; } },
    { id: 'triple', icon: '\u2694\uFE0F', name: 'TRIPLE STRIKE', xp: 60, timed: false,
      desc: function () { return 'Clear any 3 quests today'; },
      target: function () { return Math.min(3, todayHabits().length || 3); },
      progress: function () { return doneToday(); },
      available: function () { return todayHabits().length >= 3; } },
    { id: 'dawn', icon: '\uD83C\uDF05', name: 'DAWN PROTOCOL', xp: 75, timed: 9,
      desc: function () { return 'Clear your first quest before 09:00'; },
      target: function () { return 1; },
      progress: function () { return clearedBefore(9); },
      available: function () { return todayHabits().length > 0; } },
    { id: 'noon', icon: '\u23F1\uFE0F', name: 'EARLY STRIKE', xp: 75, timed: 12,
      desc: function () { return 'Clear 2 quests before 12:00'; },
      target: function () { return 2; },
      progress: function () { return clearedBefore(12); },
      available: function () { return todayHabits().length >= 2; } },
    { id: 'focus', icon: '\uD83C\uDFAF', name: 'WEAK POINT', xp: 60, timed: false,
      desc: function () { return 'Clear a ' + weakestStat() + ' quest today'; },
      target: function () { return 1; },
      progress: function () {
        var d = doneMap();
        return habitsWithStat(weakestStat()).filter(function (h) { return d[h.id]; }).length ? 1 : 0;
      },
      available: function () { return habitsWithStat(weakestStat()).length > 0; } }
  ];

  function directiveById(id) {
    for (var i = 0; i < DIRECTIVES.length; i++) if (DIRECTIVES[i].id === id) return DIRECTIVES[i];
    return null;
  }

  /* A time-gated objective handed out at 20:00 is not a challenge, it
     is a dead card. Anything whose window has already closed is taken
     out of the pool before the pick. */
  function pickDirective(key) {
    var hour = new Date().getHours();
    var pool = DIRECTIVES.filter(function (d) {
      if (!d.available()) return false;
      if (d.timed && hour >= d.timed) return false;
      return true;
    });
    if (!pool.length) pool = DIRECTIVES.filter(function (d) { return !d.timed && d.available(); });
    if (!pool.length) return null;
    return pool[hash(key) % pool.length];
  }

  function ensureDirective() {
    var key = todayKey();
    var cur = sys().directive;
    if (cur && cur.date === key) return cur;
    var d = pickDirective(key);
    if (!d) { sys().directive = null; return null; }
    sys().directive = { date: key, id: d.id, done: false, claimed: false };
    return sys().directive;
  }

  function directiveState() {
    var rec = sys().directive;
    if (!rec || rec.date !== todayKey()) return null;
    var def = directiveById(rec.id);
    if (!def) return null;
    var target = Math.max(1, def.target());
    var progress = Math.min(target, def.progress());
    return { rec: rec, def: def, target: target, progress: progress, pct: Math.round(100 * progress / target) };
  }

  function checkDirective() {
    var st = directiveState();
    if (!st || st.rec.claimed) return;
    if (st.progress < st.target) return;
    st.rec.done = true; st.rec.claimed = true;
    sys().directivesDone++;
    S.xp += st.def.xp; S.totalXPEarned += st.def.xp;
    grantCache(1);
    saveState();
    if (typeof checkLevelUp === 'function') checkLevelUp();
    showSystemNotif('\uD83C\uDFAF', 'DIRECTIVE COMPLETE',
      st.def.icon + ' ' + st.def.name + '\n+' + st.def.xp + ' BONUS XP\n+1 SHADOW CACHE');
  }

  /* ================================================= STREAK SHIELDS
     A streak that can be destroyed by a single bad day punishes the
     exact behaviour it is supposed to encourage: the player who has
     been consistent for a month has the most to lose and quits the
     hardest. A shield is earned by consistency and spent
     automatically, so the streak survives one miss without the miss
     being free -- the shield is gone. */
  function awardShieldIfDue() {
    if (S.streak <= 0) return;
    if (S.streak < sys().lastShieldAt + CFG.shieldEvery) return;
    sys().lastShieldAt = S.streak - (S.streak % CFG.shieldEvery);
    if (sys().shields >= CFG.maxShields) return;
    sys().shields++;
    saveState();
    showSystemNotif('\uD83D\uDEE1\uFE0F', 'STREAK SHIELD EARNED',
      'A shield now absorbs one missed day.\nHeld: ' + sys().shields + '/' + CFG.maxShields);
  }

  function dayCounts(key) {
    return isDayComplete(key) || !!sys().shieldedDays[key];
  }

  /* Replaces the engine's version. Identical walk, except a shielded
     day counts as held. Today being incomplete still does not break
     the streak -- that behaviour is deliberate and preserved. */
  function recalcStreakShielded() {
    var streak = 0, key = todayKey();
    for (var i = 0; i < 500; i++) {
      if (i === 0 && !dayCounts(key)) { key = shiftKey(key, -1); continue; }
      if (!dayCounts(key)) break;
      streak++; key = shiftKey(key, -1);
    }
    S.streak = streak;
    if (streak > S.longestStreak) S.longestStreak = streak;
  }

  /* Run once per launch: spend shields on the days that were missed
     while the app was closed. */
  function applyShields() {
    var today = todayKey();
    var last = sys().lastSeen;
    if (!last || last >= today) return 0;
    var spent = 0;
    for (var k = shiftKey(last, 0); k < today; k = shiftKey(k, 1)) {
      if (dayCounts(k)) continue;
      if (sys().shields <= 0) break;
      sys().shields--; sys().shieldedDays[k] = true; spent++;
    }
    return spent;
  }

  /* ================================================== SHADOW CACHES
     The one reward in the game that is not knowable in advance. Rolled
     once per quest per day and recorded, so undoing and redoing a
     quest cannot farm it -- an exploitable reward stops being a
     reward and starts being a chore. */
  function grantCache(n) { sys().caches += n; }

  function rollCacheFor(habitId) {
    var key = todayKey() + '|' + habitId;
    if (sys().rolled[key]) return false;
    sys().rolled[key] = true;
    if (Math.random() >= CFG.cacheChance) return false;
    grantCache(1);
    return true;
  }

  function rollTier() {
    var total = CACHE_TIERS.reduce(function (a, t) { return a + t.weight; }, 0);
    var r = Math.random() * total;
    for (var i = 0; i < CACHE_TIERS.length; i++) {
      r -= CACHE_TIERS[i].weight;
      if (r <= 0) return CACHE_TIERS[i];
    }
    return CACHE_TIERS[0];
  }

  function openCache() {
    if (sys().caches <= 0) return;
    sys().caches--;
    var tier = rollTier();
    var xp = tier.xp[0] + Math.floor(Math.random() * (tier.xp[1] - tier.xp[0] + 1));
    S.xp += xp; S.totalXPEarned += xp;
    var gotShield = false;
    if (tier.shield && sys().shields < CFG.maxShields) { sys().shields++; gotShield = true; }
    sys().totalCachesOpened++;
    sys().cacheLog.unshift({ tier: tier.id, xp: xp, shield: gotShield, at: Date.now() });
    sys().cacheLog = sys().cacheLog.slice(0, 12);
    saveState();
    if (typeof playUISuccess === 'function') playUISuccess();
    showCacheReward(tier, xp, gotShield);
    if (typeof checkLevelUp === 'function') checkLevelUp();
    if (typeof checkAchievements === 'function') checkAchievements();
    render();
  }

  function showCacheReward(tier, xp, gotShield) {
    var o = el('sx-cache-overlay');
    if (!o) return;
    o.querySelector('.sx-cache-card').style.borderColor = tier.color;
    o.querySelector('.sx-cache-glyph').textContent = '\uD83D\uDCE6';
    var t = o.querySelector('.sx-cache-tier');
    t.textContent = tier.name; t.style.color = tier.color;
    o.querySelector('.sx-cache-reward').innerHTML =
      '+' + xp + ' XP' + (gotShield ? '<br><span style="color:#22d3ee">+1 STREAK SHIELD</span>' : '');
    o.classList.add('open');
  }
  function closeCache() { var o = el('sx-cache-overlay'); if (o) o.classList.remove('open'); }

  /* ================================================== PROXIMITY SCAN
     Every unlock in the game was invisible until the moment it fired.
     Naming the next three and the exact distance to each turns an
     opaque system into something to aim at, which is what actually
     brings a player back tomorrow. */
  function upcoming() {
    var out = [];
    function add(icon, label, need, unit) {
      if (need > 0 && isFinite(need)) out.push({ icon: icon, label: label, need: need, unit: unit });
    }

    add('\u2B06\uFE0F', 'LEVEL ' + (S.level + 1), Math.max(1, xpForLevel(S.level) - S.xp), 'XP');

    var rank = getRank(S.level), next = null;
    for (var i = 0; i < RANKS.length; i++) if (RANKS[i].minLevel > S.level) { next = RANKS[i]; break; }
    if (next) add('\uD83C\uDF96\uFE0F', next.label, next.minLevel - S.level, 'levels');

    CREATURES.forEach(function (c) {
      if (S.unlockedCreatures.indexOf(c.id) !== -1) return;
      var o = c.obtain, need = null, unit = '';
      if (o.type === 'streak') { need = o.value - S.streak; unit = 'day streak'; }
      else if (o.type === 'level') { need = o.value - S.level; unit = 'levels'; }
      else if (o.type === 'completions') { need = o.value - (S.totalDaysCompleted || 0); unit = 'full days'; }
      else if (o.type === 'gate_clears') { need = o.value - getGateClearCount(); unit = 'gates'; }
      else if (o.type === 'habit') { need = o.value - countHabitCompletions(o.habitId); unit = 'x ' + o.habitId; }
      if (need !== null) add(c.icon || '\uD83D\uDC3E', c.name, need, unit);
    });

    WEAPONS_DATA.forEach(function (wd) {
      var done = countHabitCompletions(wd.habitId);
      for (var i = 0; i < wd.tiers.length; i++) {
        if (done < wd.tiers[i].threshold) {
          add(wd.tiers[i].icon || '\uD83D\uDDE1\uFE0F', wd.tiers[i].name,
              wd.tiers[i].threshold - done, 'x ' + wd.habitName);
          break;
        }
      }
    });

    BOSSES.forEach(function (b) {
      if (S.bossDefeated.indexOf(b.id) !== -1) return;
      if (S.level < b.level) { add(b.icon || '\uD83D\uDC80', b.name, b.level - S.level, 'levels'); return; }
      add(b.icon || '\uD83D\uDC80', b.name, b.hpRequired - (S.bossProgress[b.id] || 0), 'quests');
    });

    return out.sort(function (a, b) { return a.need - b.need; }).slice(0, 3);
  }

  /* ================================================ REBUILD PROTOCOL
     The dangerous moment is not the missed day, it is the day after,
     when the streak reads zero and starting again looks pointless.
     Coming back is framed as its own objective with a real bonus so
     that the return is the reward, not the punishment. */
  function rebuildActive() {
    return !!(sys().rebuildUntil && todayKey() <= sys().rebuildUntil);
  }
  function maybeStartRebuild(missed) {
    if (missed < CFG.rebuildTrigger) return false;
    if (rebuildActive()) return false;
    sys().rebuildUntil = shiftKey(todayKey(), CFG.rebuildDays - 1);
    return true;
  }

  /* ------------------------------------------------------ app badge
     An installed PWA can put a count on its own home-screen icon.
     This is the only nudge available without a push server, and it is
     the whole reason the app gets opened at all on a bad day. */
  function syncBadge() {
    if (!('setAppBadge' in navigator)) return;
    var left = remainingToday();
    try {
      if (left > 0) navigator.setAppBadge(left); else navigator.clearAppBadge();
    } catch (e) { /* not installed, or unsupported: silently fine */ }
  }

  /* =============================================================== UI */
  function buildUI() {
    var panel = el('tab-quests');
    if (!panel || el('sx-top')) return;

    var top = document.createElement('div');
    top.id = 'sx-top';
    top.innerHTML =
      '<div id="sx-risk" class="sx-risk" style="display:none"></div>' +
      '<div id="sx-directive" class="sx-directive"></div>' +
      '<div id="sx-status" class="sx-status"></div>';
    var anchor = panel.querySelector('.streak-row');
    if (anchor) panel.insertBefore(top, anchor); else panel.insertBefore(top, panel.firstChild);

    var scan = document.createElement('div');
    scan.id = 'sx-scan';
    scan.className = 'sx-scan';
    var mgmt = panel.querySelector('.quest-mgmt-section');
    var mgmtBtn = mgmt ? mgmt.previousElementSibling : null;
    if (mgmtBtn) panel.insertBefore(scan, mgmtBtn); else panel.appendChild(scan);

    var ov = document.createElement('div');
    ov.id = 'sx-cache-overlay';
    ov.className = 'sx-cache-overlay';
    ov.innerHTML =
      '<div class="sx-cache-card">' +
        '<div class="sx-cache-glyph">\uD83D\uDCE6</div>' +
        '<div class="sx-cache-tier"></div>' +
        '<div class="sx-cache-reward"></div>' +
        '<button class="sx-btn sx-btn-primary" id="sx-cache-close">CLAIM</button>' +
      '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) closeCache(); });
    el('sx-cache-close').addEventListener('click', closeCache);
  }

  /* todayKey() is a UTC date, so the day the game scores by flips at
     00:00 UTC, not at local midnight. A countdown to local midnight
     would be a lie in every timezone but one. */
  function msToDayEnd() {
    var n = new Date(), m = new Date(n);
    m.setUTCHours(24, 0, 0, 0);
    return m - n;
  }
  function countdownText() {
    var ms = msToDayEnd(), h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000);
    return h > 0 ? h + 'h ' + m + 'm left' : m + 'm left';
  }

  function renderDirective() {
    var host = el('sx-directive');
    if (!host) return;
    ensureDirective();
    var st = directiveState();
    if (!st) { host.innerHTML = ''; return; }
    var done = st.rec.claimed;
    host.className = 'sx-directive' + (done ? ' done' : '');
    host.innerHTML =
      '<div class="sx-d-head">' +
        '<span class="sx-d-tag">DAILY DIRECTIVE</span>' +
        '<span class="sx-d-timer">' + (done ? 'COMPLETE' : esc(countdownText())) + '</span>' +
      '</div>' +
      '<div class="sx-d-body">' +
        '<div class="sx-d-icon">' + st.def.icon + '</div>' +
        '<div class="sx-d-main">' +
          '<div class="sx-d-name">' + esc(st.def.name) + '</div>' +
          '<div class="sx-d-desc">' + esc(st.def.desc()) + '</div>' +
          '<div class="sx-d-bar"><div class="sx-d-fill" style="width:' + st.pct + '%"></div></div>' +
        '</div>' +
        '<div class="sx-d-reward">' +
          '<div class="sx-d-xp">+' + st.def.xp + ' XP</div>' +
          '<div class="sx-d-cache">\uD83D\uDCE6 +1</div>' +
          '<div class="sx-d-count">' + st.progress + '/' + st.target + '</div>' +
        '</div>' +
      '</div>';
  }

  function renderStatus() {
    var host = el('sx-status');
    if (!host) return;
    var s = sys();
    var chips = [];
    chips.push('<div class="sx-chip"><span class="sx-chip-n" style="color:#22d3ee">\uD83D\uDEE1\uFE0F ' +
      s.shields + '</span><span class="sx-chip-l">SHIELDS ' + s.shields + '/' + CFG.maxShields + '</span></div>');
    chips.push('<div class="sx-chip' + (s.caches > 0 ? ' live' : '') + '">' +
      '<span class="sx-chip-n" style="color:#fbbf24">\uD83D\uDCE6 ' + s.caches + '</span>' +
      '<span class="sx-chip-l">CACHES</span></div>');
    chips.push('<div class="sx-chip"><span class="sx-chip-n" style="color:#a78bfa">\uD83C\uDFAF ' +
      s.directivesDone + '</span><span class="sx-chip-l">DIRECTIVES</span></div>');
    if (rebuildActive()) {
      chips.push('<div class="sx-chip rebuild"><span class="sx-chip-n">\u26A1 +' +
        Math.round(CFG.rebuildBonus * 100) + '%</span><span class="sx-chip-l">REBUILD ACTIVE</span></div>');
    }
    host.innerHTML = chips.join('') +
      (s.caches > 0
        ? '<button class="sx-btn sx-btn-primary sx-open-btn" id="sx-open-cache">OPEN CACHE (' + s.caches + ')</button>'
        : '');
    var b = el('sx-open-cache');
    if (b) b.addEventListener('click', guard('openCache', openCache));
  }

  function renderRisk() {
    var host = el('sx-risk');
    if (!host) return;
    var left = remainingToday();
    /* Nudge in the evening, and never go quiet in the final hours
       before the day flips -- which local time alone would do wherever
       the UTC boundary falls after local midnight. */
    var late = new Date().getHours() >= CFG.riskHour ||
      msToDayEnd() <= CFG.riskFinalHours * 3600000;
    if (!left || !late || S.streak <= 0) { host.style.display = 'none'; return; }
    host.style.display = 'block';
    host.innerHTML = '\u26A0 <b>' + S.streak + '-DAY STREAK AT RISK</b> \u2014 ' + left +
      ' quest' + (left > 1 ? 's' : '') + ' left today' +
      (sys().shields > 0 ? ' \u00B7 ' + sys().shields + ' shield' + (sys().shields > 1 ? 's' : '') + ' will absorb a miss' : '');
  }

  function renderScan() {
    var host = el('sx-scan');
    if (!host) return;
    var items = upcoming();
    if (!items.length) { host.innerHTML = ''; return; }
    host.innerHTML =
      '<div class="sx-scan-head">PROXIMITY SCAN \u2014 CLOSEST UNLOCKS</div>' +
      '<div class="sx-scan-grid">' + items.map(function (i) {
        return '<div class="sx-scan-item">' +
          '<div class="sx-scan-icon">' + i.icon + '</div>' +
          '<div class="sx-scan-name">' + esc(i.label) + '</div>' +
          '<div class="sx-scan-need">' + i.need + ' <span>' + esc(i.unit) + '</span></div>' +
        '</div>';
      }).join('') + '</div>';
  }

  function render() {
    renderRisk(); renderDirective(); renderStatus(); renderScan(); syncBadge();
  }

  /* ============================================================ seams */
  var origRecalc = window.recalcStreak;
  var origMult = window.getStreakMultiplier;
  var origToggle = window.toggleHabit;
  var origRenderAll = window.renderAll;

  window.recalcStreak = function () {
    if (!S.sys) return origRecalc.apply(this, arguments);
    try { return recalcStreakShielded(); }
    catch (e) { return origRecalc.apply(this, arguments); }
  };

  window.getStreakMultiplier = function () {
    var base = origMult.apply(this, arguments);
    try {
      if (S.sys && rebuildActive()) return Math.round(base * (1 + CFG.rebuildBonus) * 100) / 100;
    } catch (e) { /* fall through to the base multiplier */ }
    return base;
  };

  window.toggleHabit = function (habitId) {
    var date = (typeof selectedQuestDate !== 'undefined' && selectedQuestDate) || todayKey();
    var wasDone = !!((S.habitData[date] || {})[habitId]);
    var out = origToggle.apply(this, arguments);
    try {
      if (!S.sys) return out;
      /* Only today drives the daily systems. Back-filling a past day
         must not hand out today's directive or a cache. */
      if (!wasDone && date === todayKey()) {
        var sk = date + '|' + habitId;
        if (!sys().stamps[sk]) sys().stamps[sk] = Date.now();
        var dropped = rollCacheFor(habitId);
        checkDirective();
        awardShieldIfDue();
        saveState();
        if (dropped) {
          toast('\uD83D\uDCE6 SHADOW CACHE DROPPED');
          if (typeof playUISuccess === 'function') playUISuccess();
        }
      }
      render();
    } catch (e) { if (window.console) console.warn('[systems] toggleHabit', e); }
    return out;
  };

  window.renderAll = function () {
    var out = origRenderAll.apply(this, arguments);
    try { if (S.sys) render(); } catch (e) { if (window.console) console.warn('[systems] render', e); }
    return out;
  };

  /* Extra goals for the new systems, appended to the existing list so
     the achievements tab picks them up with no changes. */
  if (typeof ACHIEVEMENTS !== 'undefined' && ACHIEVEMENTS.push) {
    ACHIEVEMENTS.push(
      { id: 'sx_shield', icon: '\uD83D\uDEE1\uFE0F', name: 'UNBROKEN', desc: 'Have a shield absorb a missed day',
        condition: function () { return S.sys && Object.keys(S.sys.shieldedDays || {}).length >= 1; }, xp: 250 },
      { id: 'sx_cache10', icon: '\uD83D\uDCE6', name: 'SCAVENGER', desc: 'Open 10 shadow caches',
        condition: function () { return S.sys && (S.sys.totalCachesOpened || 0) >= 10; }, xp: 300 },
      { id: 'sx_dir7', icon: '\uD83C\uDFAF', name: 'ORDERS FOLLOWED', desc: 'Complete 7 daily directives',
        condition: function () { return S.sys && (S.sys.directivesDone || 0) >= 7; }, xp: 400 },
      { id: 'sx_dir30', icon: '\uD83C\uDFC5', name: 'PERFECT OPERATOR', desc: 'Complete 30 daily directives',
        condition: function () { return S.sys && (S.sys.directivesDone || 0) >= 30; }, xp: 900 }
    );
  }

  /* ============================================================= boot
     The day can turn over while the app is open, so the rollover is a
     named operation rather than something that only happens on launch:
     otherwise a session left running overnight would keep yesterday's
     directive and never spend a shield on the day that was missed. */
  function rollover() {
    ensureSys();
    var today = todayKey();
    var missed = 0;
    if (sys().lastSeen && sys().lastSeen < today) {
      for (var k = sys().lastSeen; k < today; k = shiftKey(k, 1)) {
        if (!isDayComplete(k)) missed++;
      }
    }
    var spent = applyShields();
    recalcStreakShielded();
    /* A day a shield absorbed was not missed. Only the misses the
       shields could not cover justify a comeback bonus. */
    var rebuilt = maybeStartRebuild(missed - spent);
    ensureDirective();
    sys().lastSeen = today;
    saveState();
    return { missed: missed, spent: spent, rebuilt: rebuilt };
  }

  var timer = null;
  var init = guard('init', function () {
    ensureSys();
    prune();

    var roll = rollover();
    var missed = roll.missed, spent = roll.spent, rebuilt = roll.rebuilt;

    buildUI();
    render();

    if (spent > 0) {
      setTimeout(function () {
        showSystemNotif('\uD83D\uDEE1\uFE0F', 'STREAK SHIELD USED',
          spent + ' missed day' + (spent > 1 ? 's' : '') + ' absorbed.\nYour ' + S.streak +
          '-day streak survived.\nShields left: ' + sys().shields + '/' + CFG.maxShields);
      }, 1400);
    } else if (rebuilt) {
      setTimeout(function () {
        showSystemNotif('\u26A1', 'REBUILD PROTOCOL',
          'You were away ' + missed + ' day' + (missed > 1 ? 's' : '') + '. That is over.\n+' +
          Math.round(CFG.rebuildBonus * 100) + '% XP for the next ' + CFG.rebuildDays +
          ' days.\nStreaks are rebuilt, not mourned.');
      }, 1400);
    }

    /* The directive countdown is the only thing that has to tick.
       One interval, created once. */
    if (!timer) timer = setInterval(guard('tick', function () {
      if (sys().lastSeen !== todayKey()) { rollover(); prune(); render(); }
      renderDirective(); renderRisk();
    }), 30000);
  });

  /* engine.js registers its DOMContentLoaded handler first, so state is
     already loaded by the time this runs. */
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.HakaiSystems = {
    open: guard('open', openCache),
    render: guard('render', render),
    rollover: guard('rollover', rollover),
    cfg: CFG
  };
})();
