<div align="center">

```
██╗  ██╗ █████╗ ██╗  ██╗ █████╗ ██╗    ██████╗ ██████╗  ██████╗ ████████╗ ██████╗  ██████╗ ██████╗ ██╗
██║  ██║██╔══██╗██║ ██╔╝██╔══██╗██║    ██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝██╔═══██╗██╔════╝██╔═══██╗██║
███████║███████║█████╔╝ ███████║██║    ██████╔╝██████╔╝██║   ██║   ██║   ██║   ██║██║     ██║   ██║██║
██╔══██║██╔══██║██╔═██╗ ██╔══██║██║    ██╔═══╝ ██╔══██╗██║   ██║   ██║   ██║   ██║██║     ██║   ██║██║
██║  ██║██║  ██║██║  ██╗██║  ██║██║    ██║     ██║  ██║╚██████╔╝   ██║   ╚██████╔╝╚██████╗╚██████╔╝███████╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝
```

### V 2.0 — HUNTER SYSTEM

*A real-life RPG where your habits are your power*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/Dependencies-ZERO-7c3aed?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-LIVE-22c55e?style=for-the-badge&logo=github)

</div>

---

## ⚡ What Is This?

**Hakai Protocol** is a dark-fantasy RPG habit tracker built entirely in vanilla HTML/CSS/JavaScript. No frameworks. No backend. No accounts. Just pure browser-side code that turns your daily real-world habits into in-game power.

The concept: every time you work out, read, code, meditate, or plan your day — you gain XP, level up, unlock creatures for your Shadow Army, forge legendary weapons, and fight world bosses. Your discipline is your build.

> *The system does not reward potential. It rewards execution.*

---

## 🛠 Technologies Used

| Layer | Technology | Purpose |
|---|---|---|
| Structure | **HTML5** | Game screens, modals, tab panels |
| Styling | **CSS3** | Animations, glassmorphism, keyframes, CSS variables |
| Logic | **Vanilla JavaScript (ES6+)** | Full game engine — state machine, unlock logic, rendering |
| Persistence | **localStorage** | Save/load game state across sessions, zero server needed |
| Fonts | **Google Fonts** (Orbitron, Rajdhani) | Sci-fi / RPG typography |
| Hosting | **GitHub Pages** | Free static deployment, live on any browser |
| Art | **AI-generated PNGs** | 27 unique images — creatures, bosses, weapons, characters |

**Zero dependencies.** No npm. No build step. No React, Vue, or jQuery. Open `index.html` and it runs.

---

## 🏗 Technical Architecture

### Engine Structure

The game engine is split into 8 modular files (concatenated into one `engine.js` at build time):

```
ep1.js  →  Constants & State Schema      (RANKS, CHARACTERS, DEFAULT_STATE)
ep2.js  →  Creature Database             (14 creatures, abilities, unlock conditions)
ep3.js  →  Weapons, Bosses, Gates Data   (5 weapon lines × 5 tiers, 5 bosses)
ep4.js  →  Story & Quest Data            (6 arcs, 30+ quests, lore entries)
ep5.js  →  Game Logic Core               (XP, leveling, unlock checks, streak calc)
ep6.js  →  Modal & Notification System   (creature modal, boss modal, weapon drop)
ep7.js  →  Habit & Gate Rendering        (habit cards, gate weekly tracker)
ep8.js  →  Full UI Renderer              (army, armory, bosses, calendar, HUD)
```

### Technical Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        USER ACTION                          │
│              (marks habit complete for today)               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    ep5.js — GAME LOGIC                      │
│                                                             │
│  completeHabit(habitId)                                     │
│    ├── Mark day in S.habitData[date][habitId] = true        │
│    ├── Award XP → S.xp += habitXP                          │
│    ├── Check isDayComplete() → increment S.totalDays        │
│    ├── recalcStreak() → walk back through habitData         │
│    ├── checkLevelUp() → compare xp vs level thresholds      │
│    ├── checkCreatureUnlocks() → scan all 14 CREATURES       │
│    ├── checkWeaponUpgrades() → scan all 5 WEAPONS_DATA      │
│    └── checkBossProgress() → deal 1 HP to active boss       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  UNLOCK CONDITIONS                          │
│                                                             │
│  Creature unlock types:                                     │
│    streak      → S.streak >= N days                         │
│    level       → S.level >= N                               │
│    completions → S.totalDaysCompleted >= N                  │
│    gate_clears → getGateClearCount() >= N (7/7 weeks)       │
│    floor       → S.storyProgress >= N (ascension)          │
│    habit       → countHabitCompletions(id) >= N             │
│                                                             │
│  Weapon unlock: countHabitCompletions(habitId) >= threshold │
│  Boss damage:  S.bossProgress[id]++ per habit completed     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   STATE PERSISTENCE                         │
│                                                             │
│  saveState()  →  localStorage.setItem('hakaiV2', JSON)      │
│  loadState()  →  localStorage.getItem('hakaiV2') + merge    │
│                                                             │
│  State shape:                                               │
│  { level, xp, rank, streak, playerName,                     │
│    habitData: { "2025-01-01": { workout:true, read:true }}, │
│    unlockedCreatures: ["goblin_scout", ...],                 │
│    weaponTiers: { workout: 3, read: 2 },                    │
│    bossDefeated: ["rift_crawler"],                           │
│    bossProgress: { kragath: 14 },                           │
│    completedGates: { "2025-W01": { days: [...] } } }        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  ep8.js — UI RENDERER                       │
│                                                             │
│  renderHUD()        →  level, XP bar, rank badge, streak    │
│  renderBestiary()   →  all 14 creature cards                │
│  renderMyArmy()     →  unlocked creatures only              │
│  renderArmory()     →  5 weapon lines with tier slots       │
│  renderBosses()     →  5 epic boss cards with HP bars       │
│  renderGates()      →  weekly 7-day habit tracker           │
│  renderQuests()     →  active story quests                  │
│  renderCalendar()   →  monthly habit calendar heatmap       │
└─────────────────────────────────────────────────────────────┘
```

### CSS Architecture

```
style.css (414 lines base)  +  css_add.css (modular additions)
    │
    ├── CSS Custom Properties (--bg-dark, --cyan, --blue-glow...)
    ├── Glassmorphism panels (backdrop-filter: blur)
    ├── Orbitron + Rajdhani font stack
    ├── Creature card system (portrait art + stat layout)
    ├── Weapon tier slot system
    ├── Epic boss card system (per-boss theme colors)
    ├── Creature modal (Ken Burns zoom, scan line, entrance anim)
    ├── Boss modal (full-art, color-matched border glow)
    └── 15+ @keyframe animations
```

---

## 📖 The Story

### World Lore

The world has changed. **Rifts** — dimensional tears in reality — have begun appearing across the globe. From them emerge creatures of increasing power, drawn to human potential the way predators are drawn to weakness.

The **Hakai Protocol** is the System's response. A hunter classification framework that identifies individuals with the capacity to grow, assigns them a rank, and tracks their evolution. You are one of these individuals.

You didn't choose this. The System chose you.

### Story Arcs

The game tells its story through **6 narrative arcs**, delivered as you level up and complete quests:

| Arc | Unlocks At | Theme |
|---|---|---|
| **The Awakening** | Level 1 | You are identified. The System initialises. Your first steps as a hunter. |
| **Resistance** | Level 10 | The world pushes back. Comfort is the first enemy. |
| **The Mechanism** | Level 25 | You start to understand the system is not random — it is testing you. |
| **Deep Systems** | Level 50 | The bosses are not obstacles. They are reflections. |
| **The Protocol** | Level 80 | The final enemy isn't a creature. It's the version of you that stopped. |
| **Transcendence** | Level 96 | Beyond rank. Beyond system. What comes after you've won? |

### The Bosses as Story Beats

Each world boss represents a real psychological obstacle:

```
LV 20 — THE RIFT CRAWLER     "The gap between potential and action"
         A dimensional parasite that nests in your excuses.
         Defeated by: closing the gap. Showing up anyway.

LV 40 — BONE WARLORD KRAGATH  "The weight of past failures"
         An undead general who tests if you're worthy of what you're building.
         Defeated by: consistency under pressure.

LV 60 — SERPENT QUEEN NYX     "Ancient judgment — are you worthy?"
         A primordial deity who doesn't attack. She evaluates.
         Defeated by: sustaining a 5-day streak.

LV 80 — THE VOID TITAN        "Entropy — the pull of doing nothing"
         A colossal entity made of compressed negative space.
         Defeated by: generating enough positive force to outweigh it.

LV 100 — THE PROTOCOL ITSELF  "The final boss is the system watching you"
          At the pinnacle, there is no external enemy.
          Defeated by: becoming the person who reaches level 100.
```

---

## 🎮 How to Play

### Core Loop

Every day, complete your real-world habits in the **HABITS** tab. Each completion:
- Awards **XP**
- Maintains your **streak**
- Deals **1 damage** to the active boss
- Progresses **unlock conditions** for creatures and weapons

### The 5 Habits

| Habit | Weapon Line | What counts |
|---|---|---|
| ⚔️ **WORKOUT** | Mjolnir → Excalibur → Void Sword | Any physical training |
| 📚 **READ / LEARN** | Staff of Wisdom → Demon Staff → Neil Bow | Books, courses, study |
| 💻 **BUILD / CODE** | Trishul → Gauntlets | Building, coding, creating |
| 🧘 **MEDITATE** | Cloak of Shadow | Mindfulness, stillness |
| 📋 **PLAN THE DAY** | Neil Bow → Demon Staff | Daily planning, strategy |

### Ranking System

| Rank | Level | Title |
|---|---|---|
| E | 1–10 | Shadow Initiate |
| D | 11–25 | Awakened Hunter |
| C | 26–40 | Field Hunter |
| B | 41–60 | Elite Hunter |
| A | 61–80 | Master Hunter |
| S | 81–95 | Shadow Monarch |
| SS | 96–100 | Transcendent |
| SSS | 101+ | System Origin |

### Shadow Army — 14 Creatures Across 7 Tiers

Build your army by completing real objectives:

```
E-RANK  Goblin Scout        →  Maintain a 3-day streak
E-RANK  Pack Wolf           →  Complete WORKOUT 5 times
D-RANK  Hobgoblin Warchief  →  Reach Level 11
D-RANK  Direwolf Alpha      →  Maintain a 7-day streak
C-RANK  Lizardman Shaman    →  Complete 30 full days
C-RANK  Cryptid Stalker     →  Achieve 3 full 7/7 Gate Clears
B-RANK  Insectoid General   →  Unlock Ascension Floor 15
B-RANK  Elven Shadowblade   →  Reach Level 41
A-RANK  Vampire Lord        →  Reach Level 61
A-RANK  Demon Knight        →  Unlock Ascension Floor 20
S-RANK  Archangel of Ruin   →  Reach Level 81
S-RANK  Primordial Demon    →  Unlock Ascension Floor 25
SS-RANK Elder Direwolf      →  Complete 75 full days
SS-RANK Void Cryptid        →  Reach Level 96
```

### Gates — Weekly Missions

Each week has a **Gate** with 7 daily objectives. Complete all 7 to achieve a **Full Gate Clear** — the hardest unlock condition in the game.

### Armory — Weapon Progression

Every habit has a weapon line that upgrades as you complete more reps:

```
Tier 1 → Tier 2 → Tier 3 → Tier 4 → Tier 5
                  (image)  (image)  (image)   ← Art unlocks from Tier 3
```

---

## 🚀 Play the Game

### 🎮 Normal Play
**[► LAUNCH HAKAI PROTOCOL](https://jeevan-0508.github.io/hakai-protocol-v2)**

> Your progress saves automatically in your browser. Each device has its own save.

---

### ⚙️ Developer / Sandbox Mode
**[► LAUNCH DEV MODE](https://jeevan-0508.github.io/hakai-protocol-v2/dev/)**

> Activates the dev panel: set level, unlock all creatures, toggle boss states, inject XP, navigate any tab instantly. For testing and exploration.

---

### 💾 Download & Run Locally

Want to run it offline or host it yourself?

**Option 1 — Simplest (just open the file):**
1. Click the green **Code** button above → **Download ZIP**
2. Extract the ZIP anywhere
3. Open `index.html` in any browser

**Option 2 — Local server (recommended, avoids browser restrictions):**
```bash
# Python (built into most systems)
cd hakai-protocol-v2
python -m http.server 8888
# then open http://localhost:8888
```

```bash
# Node.js
npx serve .
```

> The game needs to be served from a web server (not `file://`) for all features to work correctly. The included `hakai_dev_server.py` handles this automatically.

**Option 3 — One-click launcher (Windows):**
The ZIP includes `HAKAI DEV MODE.bat` — double-click it to start the local server and open the game automatically.

---

## 📁 Project Structure

```
hakai-protocol-v2/
├── index.html              # Main game shell (all screens + modals)
├── engine.js               # Full game engine (concatenated from ep1–ep8)
├── style.css               # All styles (base + modular additions)
├── dev_panel.js            # Developer sandbox overlay
├── dev/
│   └── index.html          # Dev mode activator (sets session flag → redirects)
│
├── # ── CREATURE ART (14 images) ──
├── goblin_scout.png        archangel.png
├── pack_wolf.png           primordial_demon.png
├── hobgoblin_chief.png     elder_direwolf.png
├── direwolf_alpha.png      void_cryptid.png
├── lizardman_shaman.png    elven_shadowblade.png
├── cryptid_stalker.png     vampire_lord.png
├── insectoid_general.png   demon_knight.png
│
├── # ── BOSS ART (5 images) ──
├── boss_rift_crawler.png   boss_void_titan.png
├── boss_kragath.png        boss_protocol.png
├── boss_nyx.png
│
├── # ── WEAPON ART (9 images) ──
├── mjolnir.png   excalibur.png   void_sword.png
├── staff_of_wisdom.png   demon_staff.png   neil_bow.png
├── trishul.png   gauntlets.png   cloak_of_shadow.png
│
└── # ── CHARACTERS + BACKGROUNDS ──
    striker_jk.png   cath_gems.png
    hakai_world.png  Hakaiworld-2.png
```

---

## 🧠 Design Philosophy

> "The system does not reward potential. It rewards execution."

Hakai Protocol is built on one idea: **gamification only works when the real-world action is the actual requirement**. You cannot fake a streak. You cannot buy XP. The only input is what you actually did today.

The RPG wrapper — the creatures, the weapons, the boss fights — exists to make the feedback loop feel earned. Defeating the Void Titan at level 80 should feel like something, because reaching level 80 means you actually showed up, consistently, for months.

---

<div align="center">

*Built by Jeevan · Hakai Protocol V2 · Hunter System*

**[▶ PLAY NOW](https://jeevan-0508.github.io/hakai-protocol-v2)** &nbsp;|&nbsp; **[⚙ DEV MODE](https://jeevan-0508.github.io/hakai-protocol-v2/dev/)**

</div>
