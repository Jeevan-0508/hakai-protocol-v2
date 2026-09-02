// HAKAI PROTOCOL V2 — ENGINE (constants + base data)
const RANKS=[
  {rank:'E', label:'E-RANK', minLevel:1,  color:'#94a3b8',desc:'Gap Detected. Protocol Active.',cls:'Shadow Initiate'},
  {rank:'D', label:'D-RANK', minLevel:11, color:'#4ade80',desc:'Awakened Hunter',  cls:'Shadow Stalker'},
  {rank:'C', label:'C-RANK', minLevel:26, color:'#60a5fa',desc:'Field Hunter',     cls:'Gate Breaker'},
  {rank:'B', label:'B-RANK', minLevel:41, color:'#c084fc',desc:'Elite Hunter',     cls:'Void Walker'},
  {rank:'A', label:'A-RANK', minLevel:61, color:'#fb923c',desc:'Master Hunter',    cls:'Protocol Master'},
  {rank:'S', label:'S-RANK', minLevel:81, color:'#fbbf24',desc:'Shadow Monarch',   cls:'Shadow Monarch'},
  {rank:'SS',label:'SS-RANK',minLevel:96, color:'#f87171',desc:'Transcendent',     cls:'Transcendent'},
  {rank:'SSS',label:'SSS-RANK',minLevel:101,color:'#e879f9',desc:'System Origin',  cls:'System Origin'},
];
const WEEK_DAYS=['MON','TUE','WED','THU','FRI','SAT','SUN'];
const CHARS={
  STRIKER:   {displayName:'STRIKER',  image:'striker_jk.png', cls:'Shadow Hunter'},
  CATH_GEMS: {displayName:'CATH GEMS',image:'cath_gems.png',  cls:'Arcane Walker'},
};
const DEFAULT_HABITS=[
  {id:'workout', name:'WORKOUT',     desc:'Forge the body. Strengthen the vessel.', icon:'⚔️', stat:'STR',xp:20,isDefault:true},
  {id:'read',    name:'READ/LEARN',  desc:'Expand the mind. Feed the system.',      icon:'📖',stat:'INT',xp:20,isDefault:true},
  {id:'code',    name:'BUILD/CODE',  desc:'Execute the plan. Ship the work.',       icon:'💻',stat:'AGI',xp:20,isDefault:true},
  {id:'meditate',name:'MEDITATE',    desc:'Calm the noise. Restore the core.',      icon:'🧘',stat:'VIT',xp:20,isDefault:true},
  {id:'plan',    name:'PLAN THE DAY',desc:'Define the path. Command the future.',   icon:'🗺️',stat:'SEN',xp:20,isDefault:true},
];
const QUEST_ICONS=['⚔️','📖','💻','🧘','🗺️','🏃','🧠','✍️','🥋','🎨','🎵','📝','🌿','🧪','🔬','💪','🏋️','🎯','🧩','🌙'];
// CREATURES DATA
const CREATURES=[
  {id:'goblin_scout',name:'GOBLIN SCOUT',species:'Goblin',tier:'E',color:'#94a3b8',icon:'👺',image:'goblin_scout.png',
   habitat:'Shattered Wastes',
   lore:'Spawned from the ambient fear that permeates the Shattered Wastes, Goblin Scouts are the first creatures a new Riftwalker encounters. Individually fragile, their value lies in relentless numbers and expendable energy. They remember nothing but the hunt.',
   abilities:[
     {name:'SWIFT STRIKE',type:'Physical',desc:'Attacks 3 times in rapid succession. Each hit has a 15% chance to stagger the target.'},
     {name:'RIFT DASH',type:'Void',desc:'Phases through the nearest obstacle at the speed of thought. Cannot be intercepted. Cooldown: 8s.'},
   ],
   passive:{name:'PACK TACTICS',desc:'For every 2 additional Goblin-type creatures in the army, all members gain +3% STR.'},
   armyBonus:'+2 STR to all army members',
   obtain:{type:'streak',value:3,desc:'Maintain a 3-day habit streak',icon:'🔥'},
  },
  {id:'pack_wolf',name:'PACK WOLF',species:'Dire Beast',tier:'E',color:'#94a3b8',icon:'🐺',image:'pack_wolf.png',
   habitat:'Howling Expanse',
   lore:'Ancient predators from the Howling Expanse, Pack Wolves were the first shadow beasts ever successfully extracted. Their loyalty is absolute once bonded — they will pursue a target across dimensional layers without rest, food, or instruction.',
   abilities:[
     {name:'SAVAGE BITE',type:'Physical',desc:'A ferocious strike that deals heavy physical damage and inflicts bleeding for 5 seconds.'},
     {name:'PACK HOWL',type:'Aura',desc:'Emits a sub-dimensional howl that boosts all army members\' speed by 30% for 10 seconds.'},
   ],
   passive:{name:'WOLF BOND',desc:'The wolf will sacrifice itself to intercept any fatal hit against the hunter. Triggers once per encounter.'},
   armyBonus:'+3 STR, +2 VIT',
   obtain:{type:'habit',habitId:'workout',value:5,desc:'Complete WORKOUT 5 times total',icon:'⚔️'},
  },
  {id:'hobgoblin_chief',name:'HOBGOBLIN WARCHIEF',species:'Hobgoblin',tier:'D',color:'#4ade80',icon:'👹',image:'hobgoblin_chief.png',
   habitat:'Iron Badlands',
   lore:'Evolved survivors of the Rift Purge — goblins who survived by consuming the essence of their fallen kin. Hobgoblin Warchiefs command with brutal efficiency. They respect only demonstrated strength and will follow a hunter who has proven themselves without hesitation.',
   abilities:[
     {name:'WAR CRY',type:'Aura',desc:'Emits a battle cry that increases all army members\' ATK by 25% for 15 seconds. Enemies in range are briefly stunned.'},
     {name:'IRON COMMAND',type:'Tactical',desc:'Forces all enemy creatures to target this unit, reducing incoming damage to the hunter by 60% for 8 seconds.'},
   ],
   passive:{name:'VETERAN',desc:'Cannot be killed in a single hit. Always survives with 1 HP regardless of damage taken.'},
   armyBonus:'+5 STR. Commands all lower-tier units',
   obtain:{type:'level',value:11,desc:'Reach Level 11',icon:'⬆️'},
  },
  {id:'direwolf_alpha',name:'DIREWOLF ALPHA',species:'Direwolf',tier:'D',color:'#4ade80',icon:'🐾',image:'direwolf_alpha.png',
   habitat:'Shadow Tundra',
   lore:'The apex predator of the Shadow Realm. A Direwolf Alpha\'s howl resonates across 7 dimensional layers, summoning its pack regardless of location. They only serve hunters who have demonstrated unwavering consistency — they test you before they follow you.',
   abilities:[
     {name:'ALPHA HOWL',type:'Sonic',desc:'A dimensional howl that stuns all enemies in a 20-meter radius for 3 seconds and halves their combat effectiveness for 10 seconds after.'},
     {name:'SHADOW CHASE',type:'Void',desc:'Phases into the shadow dimension and emerges directly behind any target, bypassing all defensive formations.'},
   ],
   passive:{name:'ALPHA\'S WILL',desc:'All Wolf-type creatures in the army gain +30% to all stats while the Alpha is alive.'},
   armyBonus:'+8 AGI, +5 SEN',
   obtain:{type:'streak',value:7,desc:'Maintain a 7-day habit streak',icon:'🔥'},
  },
  {id:'lizardman_shaman',name:'LIZARDMAN SHAMAN',species:'Lizardman',tier:'C',color:'#60a5fa',icon:'🦎',image:'lizardman_shaman.png',
   habitat:'Primordial Swamps',
   lore:'Ancient reptilian mystics from the Primordial Swamps who discovered void-channeling 10,000 years before the Protocol existed. Their blood rituals can temporarily amplify a hunter\'s abilities far beyond normal limits — at a cost they consider trivial.',
   abilities:[
     {name:'BLOOD RITUAL',type:'Arcane',desc:'Sacrifices 15% of current XP to double all allied stats for 30 seconds. The shaman considers this a bargain.'},
     {name:'VOID CHANNELING',type:'Void',desc:'Channels raw dimensional energy into a concentrated beam capable of destroying matter and non-matter simultaneously.'},
   ],
   passive:{name:'ANCIENT BLOOD',desc:'Immune to all status effects. Regenerates 2% HP per second continuously.'},
   armyBonus:'+10 VIT, +5 SEN',
   obtain:{type:'completions',value:30,desc:'Complete 30 total full days',icon:'📅'},
  },
  {id:'cryptid_stalker',name:'CRYPTID STALKER',species:'Cryptid',tier:'C',color:'#60a5fa',icon:'👁️',image:'cryptid_stalker.png',
   habitat:'Between Dimensions',
   lore:'No taxonomy can contain a Cryptid. They exist in the negative space between dimensional layers — observing without being observed. The fact that you can see yours means it has chosen to be seen. This is either very good news or very bad news. It hasn\'t decided which yet.',
   abilities:[
     {name:'PHASE SHIFT',type:'Void',desc:'Becomes temporarily intangible. All attacks, energy, and dimensional forces pass through harmlessly. Duration: 5 seconds.'},
     {name:'REALITY TEAR',type:'Dimensional',desc:'Opens a temporary rift that deals void damage to everything caught in it. Damage ignores all defenses including dimensional barriers.'},
   ],
   passive:{name:'UNKNOWN ORIGIN',desc:'A 5% chance each second to randomly activate any ability from any creature in the army. Even the Cryptid doesn\'t know what\'s happening.'},
   armyBonus:'+10 AGI, +8 INT',
   obtain:{type:'gate_clears',value:3,desc:'Achieve a full 7/7 Gate Clear 3 times',icon:'🚪'},
  },
  {id:'insectoid_general',name:'INSECTOID GENERAL',species:'Insectoid',tier:'B',color:'#c084fc',icon:'🦂',image:'insectoid_general.png',
   habitat:'Nexus Hive',
   lore:'Hive-mind commanders from the Nexus Hive, where individual consciousness is considered a design flaw. An Insectoid General contains the tactical knowledge of 10,000 drones and the combat experience of 1,000 generations. It does not think — it calculates.',
   abilities:[
     {name:'HIVE MIND',type:'Tactical',desc:'Connects all army members into a tactical network for 20 seconds. Every member anticipates and counters every incoming attack automatically.'},
     {name:'SWARM WAVE',type:'Physical',desc:'Releases 10,000 micro-drones that overwhelm a single target simultaneously, bypassing all physical and energy-based defenses.'},
   ],
   passive:{name:'COLLECTIVE INTELLIGENCE',desc:'For each unique creature species in the army, all members gain +5 INT.'},
   armyBonus:'+15 INT, +10 AGI',
   obtain:{type:'floor',value:15,desc:'Unlock Ascension Floor 15',icon:'🏰'},
  },
  {id:'elven_shadowblade',name:'ELVEN SHADOWBLADE',species:'Shadow Elf',tier:'B',color:'#c084fc',icon:'🧝',image:'elven_shadowblade.png',
   habitat:'Fractured Canopy',
   lore:'Ancient elves who willingly walked into the Shadow Realm seeking immortality. They found it — at the cost of their ability to feel sunlight, warmth, or connection. They traded everything for precision. The trade was worth it, they say. They say it often, as if reminding themselves.',
   abilities:[
     {name:'ANCIENT ARCHERY',type:'Temporal',desc:'An arrow that travels through time, hitting the target 3 seconds before it is fired. Cannot be evaded.'},
     {name:'SHADOW STEP',type:'Void',desc:'Teleports instantly to any location that has ever cast a shadow. Maximum range: unlimited.'},
   ],
   passive:{name:'FOREST BOND',desc:'In any terrain, generates a tactical advantage. Cannot be ambushed, surprised, or caught unprepared under any circumstance.'},
   armyBonus:'+15 AGI, +12 SEN',
   obtain:{type:'level',value:41,desc:'Reach Level 41',icon:'⬆️'},
  },
  {id:'vampire_lord',name:'VAMPIRE LORD',species:'Vampire',tier:'A',color:'#fb923c',icon:'🧛',image:'vampire_lord.png',
   habitat:'Crimson Citadel',
   lore:'Immortal predators who have fed on the life force of hundreds of worlds. Their power is not merely physical — they consume the memories, skills, and potential of everything they drain. Each Vampire Lord is thousands of beings compressed into one elegant, patient form.',
   abilities:[
     {name:'BLOOD DRAIN',type:'Life',desc:'Drains the life force of all enemies in range, healing the entire army for 50% of damage dealt simultaneously.'},
     {name:'MIST FORM',type:'Void',desc:'Converts to an invulnerable mist that penetrates any material. Duration: 10 seconds. Reforms anywhere within 100 meters.'},
     {name:'ETERNAL HUNGER',type:'Frenzy',desc:'Active: enters frenzy state. +200% ATK, immune to stagger, cannot be stopped. Duration: until all enemies are eliminated.'},
   ],
   passive:{name:'APEX PREDATOR',desc:'Continuously drains 0.5% HP from all enemies per second regardless of distance or barriers.'},
   armyBonus:'+20 STR, +20 VIT',
   obtain:{type:'level',value:61,desc:'Reach Level 61',icon:'⬆️'},
  },
  {id:'demon_knight',image:'demon_knight.png',image:'demon_knight.png',name:'DEMON KNIGHT',species:'Infernal Demon',tier:'A',color:'#fb923c',icon:'😈',
   habitat:'Infernal Planes',
   lore:'Warriors from the Infernal Planes who chose to serve a Riftwalker of sufficient power. Their loyalty is absolute — but only to those who have demonstrated enough strength to earn their respect. A Demon Knight who respects you is the most dangerous ally in any dimension.',
   abilities:[
     {name:'HELLFIRE BLADE',type:'Infernal',desc:'Coats the weapon in hellfire that burns through dimensional barriers. Deals simultaneous physical and dimensional damage that cannot be separately defended.'},
     {name:'SOUL SHATTER',type:'Spiritual',desc:'Targets the target\'s soul directly, bypassing all physical defenses entirely. Cannot be blocked by any material barrier.'},
     {name:'INFERNAL SURGE',type:'Frenzy',desc:'Calls forth the full power of the Infernal Planes. Triples all stats for 10 seconds. The ground in a 5m radius ignites.'},
   ],
   passive:{name:'INFERNAL OATH',desc:'Once sworn to a hunter, continues fighting for 30 seconds after death, dealing double damage.'},
   armyBonus:'+25 STR, +15 AGI',
   obtain:{type:'floor',value:20,desc:'Unlock Ascension Floor 20',icon:'🏰'},
  },
  {id:'archangel',image:'archangel.png',name:'ARCHANGEL OF RUIN',species:'Fallen Angel',tier:'S',color:'#fbbf24',icon:'👼',
   habitat:'Celestial Threshold',
   lore:'Fallen divine warriors who descend when the Protocol is threatened. They carry weapons that can sunder reality itself — not because they were built to, but because reality simply cannot withstand their intent. An Archangel does not fight. It judges. Everything else is a consequence.',
   abilities:[
     {name:'DIVINE JUDGMENT',type:'Divine',desc:'Marks a target. All damage to the marked target is multiplied by 10 for 30 seconds. Mark cannot be removed.'},
     {name:'RUINATION BEAM',type:'Divine',desc:'A beam of pure celestial energy that erases matter from existence on contact. Cannot be blocked, reflected, or dodged.'},
     {name:'HOLY NOVA',type:'Divine',desc:'Expands a sphere of divine energy that reduces all enemies within 100m to zero combat effectiveness for 5 seconds.'},
   ],
   passive:{name:'CELESTIAL GRACE',desc:'All allied creatures within range regenerate 5% HP per second. This unit cannot be targeted while any other ally is alive.'},
   armyBonus:'+30 to ALL stats',
   obtain:{type:'level',value:81,desc:'Reach Level 81',icon:'⬆️'},
  },
  {id:'primordial_demon',image:'primordial_demon.png',name:'PRIMORDIAL DEMON',species:'Primordial',tier:'S',color:'#fbbf24',icon:'👿',
   habitat:'Pre-Universe Void',
   lore:'Ancient entities predating the current reality. They are not evil — they simply operate on a scale that makes mortal concepts meaningless. A Primordial Demon does not destroy because it wants to. It destroys because destruction is the only language it learned before the universe was young enough to teach it others.',
   abilities:[
     {name:'VOID CONSUME',type:'Void',desc:'Consumes a 30-meter sphere of reality, converting all matter and energy within to raw power. Allied creatures are excluded.'},
     {name:'REALITY ANCHOR',type:'Dimensional',desc:'Anchors a location in spacetime, preventing all dimensional travel, teleportation, or escape within 50 meters.'},
     {name:'ABSOLUTE ANNIHILATION',type:'Cosmic',desc:'A strike that damages the concept of the target, not just the target itself. Effects persist across all dimensions simultaneously.'},
   ],
   passive:{name:'ANCIENT TERROR',desc:'All enemies within sight experience primordial fear, permanently reducing their combat effectiveness by 40%.'},
   armyBonus:'+40 STR and VIT',
   obtain:{type:'floor',value:25,desc:'Unlock Ascension Floor 25',icon:'🏰'},
  },
  {id:'elder_direwolf',image:'elder_direwolf.png',name:'ELDER DIREWOLF',species:'Elder Beast',tier:'SS',color:'#f87171',icon:'🌌',
   habitat:'The First Void',
   lore:'The First Wolf. Existed before the current universe. Its howl alone has ended civilizations — not through destruction, but because everything within hearing distance simply decides nothing after that sound could possibly matter. It serves no one. It travels with certain hunters. The distinction is important.',
   abilities:[
     {name:'PRIMORDIAL HOWL',type:'[REDACTED]',desc:'[ABOVE CURRENT CLEARANCE LEVEL]'},
     {name:'VOID STEP',type:'Causality',desc:'Moves at the speed of causality itself. Appears wherever the battle needs it, independent of physics.'},
     {name:'EXTINCTION CRY',type:'Cosmic',desc:'A howl that, if fully unleashed, would permanently end all conflict in a 10km radius. Currently suppressed to 0.001% capacity.'},
   ],
   passive:{name:'FIRST PREDATOR',desc:'Immune to all effects. Cannot be targeted. Does not appear on any detection system. Has always already won.'},
   armyBonus:'+50 to ALL stats',
   obtain:{type:'completions',value:75,desc:'Complete 75 total full days',icon:'📅'},
  },
  {id:'void_cryptid',image:'void_cryptid.png',name:'VOID CRYPTID',species:'Void Entity',tier:'SS',color:'#e879f9',icon:'🌀',
   habitat:'Nowhere',
   lore:'The apex entity of the Cryptid lineage. Its true form cannot be perceived by minds below SS-rank. What you see is a projection your mind is generating to avoid cognitive collapse. The actual entity is watching from a layer of reality you have no sensory organs for. It approves of your progress.',
   abilities:[
     {name:'[CLASSIFIED]',type:'???',desc:'[CLASSIFICATION LEVEL INSUFFICIENT]'},
     {name:'[CLASSIFIED]',type:'???',desc:'[CLASSIFICATION LEVEL INSUFFICIENT]'},
     {name:'EXISTENCE DENIAL',type:'Absolute',desc:'Removes a target from all histories, all presents, and all futures simultaneously. Irreversible.'},
   ],
   passive:{name:'INCOMPREHENSIBLE',desc:'Cannot be harmed, detected, or meaningfully interacted with by anything below SS-rank. Appears as static to lower-tier entities.'},
   armyBonus:'Unknown. Presumably significant.',
   obtain:{type:'level',value:96,desc:'Reach Level 96',icon:'⬆️'},
  },
];
// WEAPONS + BOSSES DATA
const WEAPONS_DATA=[
  // WORKOUT → brute force progression → Mjolnir → Void Sword
  {habitId:'workout',habitName:'WORKOUT',icon:'⚔️',lineName:'THE IRON PROTOCOL',
   tiers:[
    {tier:1,threshold:5,  rarity:'COMMON',   rarityColor:'#94a3b8',name:'BONE CRUSHER',   icon:'🥊',
     skill:'IRON DISCIPLINE',skillDesc:'The first strike of each day deals double damage. A body in motion refuses to stop.'},
    {tier:2,threshold:20, rarity:'UNCOMMON', rarityColor:'#4ade80',name:'WAR MAUL',        icon:'🔨',
     skill:'SUNDER ARMOR',   skillDesc:'Each consecutive hit permanently reduces the target\'s defense by 5%. Seven hits: they have no defense left.'},
    {tier:3,threshold:50, rarity:'RARE',     rarityColor:'#60a5fa',name:'MJOLNIR',         icon:'⚡',image:'mjolnir.png',
     skill:'THUNDER STRIKE', skillDesc:'Calls down a bolt of dimensional lightning on impact. The thunder follows 0 seconds later — they arrive together.'},
    {tier:4,threshold:100,rarity:'EPIC',     rarityColor:'#c084fc',name:'EXCALIBUR',       icon:'🗡️',image:'excalibur.png',
     skill:"KING'S JUDGMENT",skillDesc:'Only the worthy can wield it at full power. Damage scales with the hunter\'s total streak history. 100 days: unstoppable.'},
    {tier:5,threshold:200,rarity:'LEGENDARY',rarityColor:'#fbbf24',name:'VOID SWORD',      icon:'💫',image:'void_sword.png',
     skill:'DIMENSIONAL REND',skillDesc:'Cuts through all dimensions simultaneously. The eye in the blade watches everything. It has never missed. Not once.'},
   ]},

  // READ → knowledge accumulation → Staff of Wisdom → Demon Staff
  {habitId:'read',habitName:'READ/LEARN',icon:'📖',lineName:'THE CODEX',
   tiers:[
    {tier:1,threshold:5,  rarity:'COMMON',   rarityColor:'#94a3b8',name:'TORN CODEX',      icon:'📖',
     skill:'KNOWLEDGE BOLT',  skillDesc:'Fires concentrated information as kinetic force. Targets the mind, not the body.'},
    {tier:2,threshold:20, rarity:'UNCOMMON', rarityColor:'#4ade80',name:'CIPHER LENS',      icon:'🔮',
     skill:'NEURAL STORM',    skillDesc:'Scrambles the target\'s decision-making for 8 seconds. They can still move. They just can\'t choose.'},
    {tier:3,threshold:50, rarity:'RARE',     rarityColor:'#60a5fa',name:'STAFF OF WISDOM',  icon:'✨',image:'staff_of_wisdom.png',
     skill:'ANCIENT INSIGHT', skillDesc:'Each strike reveals a weakness in the target that persists for 24 hours. Knowledge cannot be unlearned.'},
    {tier:4,threshold:100,rarity:'EPIC',     rarityColor:'#c084fc',name:'DEMON STAFF',      icon:'👿',image:'demon_staff.png',
     skill:'SOUL REND',       skillDesc:'Bypasses all physical defenses and strikes the target\'s essence directly. The ram horns amplify the damage of every dark truth.'},
    {tier:5,threshold:200,rarity:'LEGENDARY',rarityColor:'#fbbf24',name:'NEIL BOW',         icon:'🏹',image:'neil_bow.png',
     skill:'FROZEN ARROW',    skillDesc:'The ice-forged arrow travels outside of time. It hits before it is fired. Dodge it if you can outrun a decision you already made.'},
   ]},

  // CODE → precision mastery → Trishul → Void Sword at master tier
  {habitId:'code',habitName:'BUILD/CODE',icon:'💻',lineName:'THE ARCHITECT',
   tiers:[
    {tier:1,threshold:5,  rarity:'COMMON',   rarityColor:'#94a3b8',name:'DEBUG BLADE',       icon:'🗡️',
     skill:'ERROR DETECTION',  skillDesc:'Automatically finds and exploits structural weaknesses. Every system has a flaw. This blade finds them.'},
    {tier:2,threshold:20, rarity:'UNCOMMON', rarityColor:'#4ade80',name:'ALGORITHM SPEAR',   icon:'⚡',
     skill:'OPTIMAL PATH',     skillDesc:'Always strikes the most mathematically efficient attack vector. Adapts in real-time to every defensive shift.'},
    {tier:3,threshold:50, rarity:'RARE',     rarityColor:'#60a5fa',name:'TRISHUL',            icon:'🔱',image:'trishul.png',
     skill:'TRIPLE PIERCE',    skillDesc:'Three simultaneous strikes at three separate critical points. One weapon, one motion, three kills. Shiva\'s geometry.'},
    {tier:4,threshold:100,rarity:'EPIC',     rarityColor:'#c084fc',name:'GAUNTLETS',          icon:'🥊',image:'gauntlets.png',
     skill:'ELEMENTAL FIST',   skillDesc:'Earth crushes. Thunder stuns. Fire burns. All three simultaneously. The architecture of destruction, written in one punch.'},
    {tier:5,threshold:200,rarity:'LEGENDARY',rarityColor:'#fbbf24',name:'MJOLNIR OVERRIDE',  icon:'⚙️',
     skill:'NULL POINTER',     skillDesc:'The system itself becomes the weapon. Removes the target\'s combat capabilities entirely. They still exist. They simply cannot function.'},
   ]},

  // MEDITATE → stillness → Cloak of Shadow → Trishul mastery
  {habitId:'meditate',habitName:'MEDITATE',icon:'🧘',lineName:'THE STILLWATER',
   tiers:[
    {tier:1,threshold:5,  rarity:'COMMON',   rarityColor:'#94a3b8',name:'STILLWATER SHIELD', icon:'🛡️',
     skill:'SERENITY',         skillDesc:'Negate the next attack completely. Perfect defense comes from perfect stillness.'},
    {tier:2,threshold:20, rarity:'UNCOMMON', rarityColor:'#4ade80',name:'VOID BARRIER',      icon:'🌊',
     skill:'ABSOLUTE WALL',    skillDesc:'An immovable defense created from compressed silence. Impenetrable for 3 seconds. Nothing breaks it. Not force. Not time.'},
    {tier:3,threshold:50, rarity:'RARE',     rarityColor:'#60a5fa',name:'CLOAK OF SHADOW',   icon:'🌑',image:'cloak_of_shadow.png',
     skill:'PHASE VANISH',     skillDesc:'Complete invisibility. Sound, heat, shadow — all suppressed. The hunter does not hide. The hunter ceases to be detectable.'},
    {tier:4,threshold:100,rarity:'EPIC',     rarityColor:'#c084fc',name:'SOUL ANCHOR',       icon:'⚓',
     skill:'EXISTENCE LOCK',   skillDesc:'Roots the hunter\'s existence to this dimensional layer. Cannot be displaced, removed, or erased from the battlefield by any force.'},
    {tier:5,threshold:200,rarity:'LEGENDARY',rarityColor:'#fbbf24',name:'ETERNAL AEGIS',     icon:'🌙',
     skill:'PERFECT DEFENSE',  skillDesc:'This defense has never been broken. In 10,000 years of battle, across 4 universes, not once. The stillness was always there.'},
   ]},

  // PLAN → strategy → Excalibur path → ultimate command
  {habitId:'plan',habitName:'PLAN THE DAY',icon:'🗺️',lineName:"THE ARCHITECT'S EYE",
   tiers:[
    {tier:1,threshold:5,  rarity:'COMMON',   rarityColor:'#94a3b8',name:'FIELD MAP',          icon:'🗺️',
     skill:'FIRST STRIKE',     skillDesc:'Guarantees the first strike in every engagement. Those who plan never react — they act.'},
    {tier:2,threshold:20, rarity:'UNCOMMON', rarityColor:'#4ade80',name:'FATE COMPASS',       icon:'🧭',
     skill:'OPTIMAL ROUTING',  skillDesc:'Always positions in the most advantageous location. Perfect positioning is perfect combat.'},
    {tier:3,threshold:50, rarity:'RARE',     rarityColor:'#60a5fa',name:'NEIL BOW — FARSIGHT',icon:'🎯',image:'neil_bow.png',
     skill:"FATE'S ARROW",     skillDesc:'An arrow fated to hit. The trajectory was calculated before the target existed. The future is just a plan executed perfectly.'},
    {tier:4,threshold:100,rarity:'EPIC',     rarityColor:'#c084fc',name:'DEMON STAFF — DARK PACT',icon:'📋',image:'demon_staff.png',
     skill:'MASTER STRATEGIST', skillDesc:'Triples all resource efficiency for 30 seconds. Draws power from the dark contract: the more you plan, the more it amplifies.'},
    {tier:5,threshold:200,rarity:'LEGENDARY',rarityColor:'#fbbf24',name:'WAR EQUATION',       icon:'♾️',
     skill:'INEVITABLE VICTORY',skillDesc:'The mathematics indicate this conflict has already been decided. The fight is simply the universe catching up to the outcome.'},
   ]},
];

const BOSSES=[
  {id:'rift_crawler',level:20,icon:'🕷️',image:'boss_rift_crawler.png',
   themeColor:'#9333ea',glowColor:'rgba(147,51,234,0.6)',
   name:'THE RIFT CRAWLER',species:'Dimensional Parasite',
   lore:'A massive dimensional parasite that feeds on the will of hunters who lose momentum. It detects the gap between potential and action, and nests inside it. Defeating it requires closing that gap entirely.',
   abilities:['Entropy Bite — reduces XP gain by 50% per day','Momentum Drain — steals streak progress','Void Cocoon — prevents habit completion for 24h'],
   hpRequired:15,reward:'UNLOCKS: Hobgoblin Warchief + War Maul Tier 2'},
  {id:'kragath',level:40,icon:'💀',image:'boss_kragath.png',
   themeColor:'#ef4444',glowColor:'rgba(239,68,68,0.6)',
   name:'BONE WARLORD KRAGATH',species:'Undead General',
   lore:'An undead general who died preventing the Second Rift War. He returned as something else entirely — not evil, not good, just absolute. He tests hunters to ensure they are worth the future they\'re building.',
   abilities:['Death March — army attacks drain the hunter\'s stats','Bone Storm — blocks the highest-leveled creature in army','Undying Rage — grows stronger as his HP decreases'],
   hpRequired:30,reward:'UNLOCKS: Elven Shadowblade + Mjolnir Tier 3'},
  {id:'serpent_nyx',level:60,icon:'🐍',image:'boss_nyx.png',
   themeColor:'#f59e0b',glowColor:'rgba(245,158,11,0.55)',
   name:'SERPENT QUEEN NYX',species:'Ancient Deity',
   lore:'A primordial reptilian deity awakened by the cumulative energy of Riftwalker activity. She is not aggressive — she is evaluating. Whether hunters pass her test determines whether she becomes ally or extinction event.',
   abilities:['Ancient Gaze — paralyzes the weakest habit in your arsenal','Primal Venom — corrupts stat gains for 3 days','World Serpent Form — becomes invulnerable until a 5-day streak is maintained'],
   hpRequired:50,reward:'UNLOCKS: Vampire Lord + Cloak of Shadow Tier 3'},
  {id:'void_titan',level:80,icon:'⬛',image:'boss_void_titan.png',
   themeColor:'#8b5cf6',glowColor:'rgba(139,92,246,0.65)',
   name:'THE VOID TITAN',species:'Dark Matter Entity',
   lore:'A colossal entity made entirely of compressed negative space. It does not attack — it erases. Hunters who encounter it must generate enough positive force through their habits to simply outweigh its entropy.',
   abilities:['Event Horizon — pulls all progress toward nullity','Mass Collapse — destroys one week of habit history','Singularity Pulse — resets the current week\'s gate progress'],
   hpRequired:70,reward:'UNLOCKS: Archangel of Ruin + Trishul Tier 3'},
  {id:'the_protocol',level:100,icon:'🌌',image:'boss_protocol.png',
   themeColor:'#22c55e',glowColor:'rgba(34,197,94,0.6)',
   name:'THE PROTOCOL ITSELF',species:'The System',
   lore:'At the pinnacle of the tower, there is no external enemy. The final boss is the system that has been watching you since the beginning — testing whether the person who reaches level 100 is worthy of what comes after. It fights with everything you have ever done. And everything you haven\'t.',
   abilities:['Mirror Strike — deals damage equal to missed habits','Consistency Check — examines your entire history','Final Examination — can only be defeated by achieving a 30-day perfect streak'],
   hpRequired:100,reward:'UNLOCKS: Void Cryptid + Void Sword Tier 5 + TITLE: Protocol Master'},
];// STORY DATA
const STORY=[
  {arc:'The Awakening',title:'The Gap',             text:'The Protocol does not choose. It measures. Somewhere between who you are and who you could be, there is a gap. The system has found yours. It is larger than you think.'},
  {arc:'The Awakening',title:'The Interface',       text:'The system was not built for you. It was already running. Tracking patterns across time. It noticed yours because your gap has a specific shape — one it has seen close before, in others who chose to close it.'},
  {arc:'The Awakening',title:'The First Choice',    text:'Every morning is a fork. Left is comfort. Right is unknown. You have been going left so long you forgot right exists.'},
  {arc:'The Awakening',title:'Resistance',          text:'The body protests. The mind invents reasons. This is not weakness — this is the immune response of your old self trying to survive.'},
  {arc:'The Awakening',title:'Seed of Awakening',   text:'Beneath all resistance, something ancient stirs. Not motivated by outcomes. Driven by nature. A hunter remembers how to hunt.'},
  {arc:'Resistance',   title:'The Weight',          text:'Progress is heavy at first. That weight is not punishment. It is the exact mass of who you are becoming.'},
  {arc:'Resistance',   title:'The Mirror',          text:'Discipline reveals you to yourself. What you skip tells you what you fear. What you complete tells you who you actually are.'},
  {arc:'Resistance',   title:'Signal and Noise',    text:'Most of what you feel is noise. The signal is small: just one more repetition, one more page, one more line of code.'},
  {arc:'Resistance',   title:'The Pain Protocol',   text:'Pain is not random. It has a direction. Follow it inward and you find the resistance point — the exact location of your next evolution.'},
  {arc:'Resistance',   title:'The Compound Effect', text:'You did not notice the first nine floors. You will notice the next ten. This is the silent math of consistency.'},
  {arc:'The Mechanism',title:'Identity Shift',      text:'The habits did not build someone new. They removed the layers of accumulated inaction sitting on top of who you always were. HAKAI. Destruction as revelation.'},
  {arc:'The Mechanism',title:'The Operating System',text:'Every habit is code. Every completion is a commit to a new version of yourself. The system compiles slowly, then all at once.'},
  {arc:'The Mechanism',title:'Pattern Recognition', text:'Your enemies are patterns, not events. Once you see a pattern, you cannot un-see it. This is the beginning of control.'},
  {arc:'The Mechanism',title:'Void Training',       text:'Some days you train without motivation. Without inspiration. In the void. These are the most important days. The system records them all.'},
  {arc:'The Mechanism',title:'The Silent Level',    text:'Not every growth is visible. Some levels happen entirely inside. The world has not changed. You have.'},
  {arc:'Deep Systems', title:'Compounding Returns', text:'The first month is invisible. The first year is noticeable. The first decade is undeniable. You are on the right timeline.'},
  {arc:'Deep Systems', title:'The Feedback Loop',   text:'Discipline creates energy. Energy creates output. Output creates proof. Proof destroys doubt. This loop is now active in your system.'},
  {arc:'Deep Systems', title:'Cognitive Reframing', text:'What you once called hard, you now call Tuesday. Your baseline has shifted. You are no longer the same unit of measure.'},
  {arc:'Deep Systems', title:'The 1% Protocol',     text:'Every completion adds 1% to a version of yourself that cannot be erased. In 100 days: unrecognizable. In 365: legendary.'},
  {arc:'Deep Systems', title:'Deep Calibration',    text:'You are now beyond motivation. You operate on something older and more reliable: identity. The Hunter does not need reasons to hunt.'},
  {arc:'The Protocol', title:'System Mastery',      text:'The system no longer feels external. It is yours. You built it day by day, habit by habit. Now it runs on its own momentum.'},
  {arc:'The Protocol', title:'The Emergence',       text:'Somewhere between floor 15 and here, something emerged that was not there before. Not a skill. Not a habit. A nature.'},
  {arc:'The Protocol', title:'Second Awakening',    text:'The first awakening was the choice to begin. The second is more subtle: you realize you cannot stop. Not because you must, but because you are.'},
  {arc:'The Protocol', title:'Protocol Lock',       text:'Your habits are no longer habits. They are the architecture of your day. Remove one and the structure trembles. This is mastery.'},
  {arc:'The Protocol', title:"The Hunter's Theorem",text:"The strong don't get strong and then start training. They train, and the strength arrives. You were never waiting to be ready."},
  {arc:'Transcendence',title:'Beyond the System',   text:'You built the system. Now you transcend it. The tools that built you are no longer constraints. They are your foundation.'},
  {arc:'Transcendence',title:'The Architect',       text:'You are no longer following a protocol. You are writing one. Every choice is a line of code in a system that outlives today.'},
  {arc:'Transcendence',title:'Signal Becomes Source',text:'What once required effort now generates energy. You are no longer drawing from a reservoir. You have become one.'},
  {arc:'Transcendence',title:'The Final Gate',      text:'There is no final gate. Every level is a gate. Every day is a choice. The protocol does not end — it deepens.'},
  {arc:'Transcendence',title:'You Become the System',text:'This is not an ending. There are no endings in exponential systems. You stand at a new beginning with the accumulated force of everything you chose to complete.'},
];

// ── ACHIEVEMENTS ──────────────────────────────────────────
const ACHIEVEMENTS=[
  {id:'first_habit', icon:'⚔️', name:'FIRST STRIKE',    desc:'Complete your first habit',           condition:()=>getTotalTasksDone()>=1,                              xp:50},
  {id:'first_day',   icon:'🌟', name:'DAY ONE',          desc:'Complete all habits in a single day', condition:()=>Object.keys(S.habitData).some(ds=>isDayComplete(ds)), xp:100},
  {id:'streak_3',    icon:'🔥', name:'KINDLING',         desc:'Reach a 3-day streak',                condition:()=>S.streak>=3,                                         xp:150},
  {id:'streak_7',    icon:'🔥', name:'WEEK OF FIRE',     desc:'Reach a 7-day streak',                condition:()=>S.streak>=7,                                         xp:300},
  {id:'streak_14',   icon:'🔥', name:'FORTNIGHT FLAME',  desc:'Reach a 14-day streak',               condition:()=>S.streak>=14,                                        xp:500},
  {id:'streak_30',   icon:'💎', name:'MONTHLY LEGEND',   desc:'Reach a 30-day streak',               condition:()=>S.streak>=30,                                        xp:1000},
  {id:'level_10',    icon:'⬆️', name:'AWAKENED',         desc:'Reach Level 10',                      condition:()=>S.level>=10,                                         xp:200},
  {id:'level_25',    icon:'⬆️', name:'HUNTER',           desc:'Reach Level 25',                      condition:()=>S.level>=25,                                         xp:400},
  {id:'level_50',    icon:'⬆️', name:'ELITE',            desc:'Reach Level 50',                      condition:()=>S.level>=50,                                         xp:800},
  {id:'srank',       icon:'🏆', name:'S-RANK HUNTER',    desc:'Achieve S-Rank status',               condition:()=>getRank(S.level).rank==='S',                          xp:600},
  {id:'gate_clear',  icon:'🚪', name:'GATE KEEPER',      desc:'Clear a full gate (7/7 days)',         condition:()=>getGateClearCount()>=1,                              xp:300},
  {id:'tasks_100',   icon:'💯', name:'CENTURION',        desc:'Complete 100 total tasks',             condition:()=>getTotalTasksDone()>=100,                            xp:500},
  {id:'army_3',      icon:'🐉', name:'COMMANDER',        desc:'Unlock 3 creatures',                  condition:()=>S.unlockedCreatures.length>=3,                       xp:250},
  {id:'boss_1',      icon:'💀', name:'BOSS SLAYER',      desc:'Defeat your first boss',              condition:()=>S.bossDefeated.length>=1,                            xp:400},
  {id:'weapon_t3',   icon:'🗡️', name:'MASTER CRAFTER',  desc:'Upgrade any weapon to Tier 3',        condition:()=>Object.values(S.weaponTiers).some(t=>t>=3),          xp:300},
];
// STATE + MATH + HABIT LOGIC
let S={
  playerName:null,level:1,xp:0,
  stats:{STR:1,AGI:1,INT:1,VIT:1,SEN:1},
  streak:0,longestStreak:0,totalDaysCompleted:0,
  habits:DEFAULT_HABITS.map(h=>({...h})),
  habitSnapshots:{},
  habitData:{},storyProgress:0,unlockedCreatures:[],
  weaponTiers:{},completedGates:{},totalXPEarned:0,
  bossProgress:{},bossDefeated:[],
  achievements:[],lastRecapWeek:null,
};
function loadState(){const r=localStorage.getItem('hakai_v2');if(r){try{const s=JSON.parse(r);S={...S,...s};if(!S.habits||!S.habits.length)S.habits=DEFAULT_HABITS.map(h=>({...h}));if(!S.habitSnapshots)S.habitSnapshots={};}catch(e){}}}
let selectedQuestDate=todayKey();
const _tdy=new Date();
let calYear=_tdy.getFullYear();let calMonth=_tdy.getMonth();
let calOpen=false;
function toggleCalendar(){calOpen=!calOpen;const body=document.getElementById('cal-body');const btn=document.getElementById('cal-toggle-btn');if(body){body.style.maxHeight=calOpen?body.scrollHeight+'px':'0';}if(btn){btn.querySelector('.cal-chevron').textContent=calOpen?'▲':'▼';btn.querySelector('.cal-toggle-label').textContent=calOpen?'HIDE CALENDAR':'BROWSE BY DATE';}}
function selectQuestDate(dKey){
  selectedQuestDate=dKey;
  const today=todayKey();
  if(!S.habitSnapshots)S.habitSnapshots={};
  // Lock in a snapshot for past days on first visit — prevents today's edits from changing them later
  if(dKey<today&&!S.habitSnapshots[dKey]){
    const dayData=S.habitData[dKey];
    if(dayData&&Object.keys(dayData).length){
      const ids=Object.keys(dayData);
      const snap=ids.map(id=>S.habits.find(h=>h.id===id)||DEFAULT_HABITS.find(h=>h.id===id)).filter(Boolean);
      S.habitSnapshots[dKey]=snap.length?snap:DEFAULT_HABITS.map(h=>({...h}));
    } else {
      S.habitSnapshots[dKey]=DEFAULT_HABITS.map(h=>({...h}));
    }
    saveState();
  }
  renderQuests();if(typeof playUINav==='function')playUINav();
}
function saveState(){localStorage.setItem('hakai_v2',JSON.stringify(S));}
function resetState(){if(!confirm('ERASE ALL PROGRESS? This cannot be undone.'))return;localStorage.removeItem('hakai_v2');location.reload();}
function xpForLevel(lv){return Math.floor(100*Math.pow(1.12,lv-1));}
function getRank(lv){let r=RANKS[0];for(const x of RANKS){if(lv>=x.minLevel)r=x;}return r;}
function todayKey(){return new Date().toISOString().split('T')[0];}
function getWeekKey(ds){
  const d=new Date(ds+'T00:00:00'),t=new Date(d);
  t.setHours(0,0,0,0);t.setDate(t.getDate()+3-(t.getDay()+6)%7);
  const w1=new Date(t.getFullYear(),0,4);
  const wk=1+Math.round(((t-w1)/86400000-3+(w1.getDay()+6)%7)/7);
  return `${d.getFullYear()}-W${String(wk).padStart(2,'0')}`;
}
function getHabitsForDate(date){
  const today=todayKey();
  // Today or future: always use current list
  if(date>=today)return S.habits;
  // Snapshot exists: use stored habit objects (immutable per-day)
  if(S.habitSnapshots&&S.habitSnapshots[date]&&S.habitSnapshots[date].length)return S.habitSnapshots[date];
  // Legacy (no snapshot): infer from habitData keys
  // Falls back to DEFAULT_HABITS for habits removed from S.habits so old days don't lose them
  const dayData=S.habitData[date];
  if(dayData){
    const ids=Object.keys(dayData);
    if(ids.length){
      const mapped=ids.map(id=>S.habits.find(h=>h.id===id)||DEFAULT_HABITS.find(h=>h.id===id)).filter(Boolean);
      if(mapped.length)return mapped;
    }
  }
  // No data for this day at all — return DEFAULT_HABITS, not live S.habits,
  // so today's quest changes never bleed into untouched past days
  return DEFAULT_HABITS.map(h=>({...h}));
}
function getDayCompletion(ds){const d=S.habitData[ds];if(!d)return 0;const h=getHabitsForDate(ds);if(!h.length)return 0;return h.filter(x=>d[x.id]).length/h.length;}
function isDayComplete(ds){return getDayCompletion(ds)>=1;}
function isDayActive(ds){const d=S.habitData[ds];if(!d)return false;return Object.values(d).some(v=>v===true);}
function countHabitCompletions(habitId){let c=0;Object.values(S.habitData).forEach(d=>{if(d[habitId])c++;});return c;}
function getGateClearCount(){return Object.values(S.completedGates).filter(g=>g.days&&g.days.length>=7).length;}

function getTotalTasksDone(){let n=0;Object.values(S.habitData).forEach(d=>Object.values(d).forEach(v=>{if(v===true)n++;}));return n;}

function getHabitStreak(habitId){
  const today=todayKey();let streak=0;
  const d=new Date(today+'T00:00:00');
  for(let i=0;i<365;i++){
    const dKey=d.toISOString().split('T')[0];
    if(!(S.habitData[dKey]&&S.habitData[dKey][habitId]))break;
    streak++;d.setDate(d.getDate()-1);
  }
  return streak;
}
function getStreakMultiplier(){
  if(S.streak>=30)return 2.0;
  if(S.streak>=14)return 1.5;
  if(S.streak>=7) return 1.25;
  if(S.streak>=3) return 1.1;
  return 1.0;
}
function getCreatureXPBonus(){
  const n=S.unlockedCreatures.length;
  if(n>=CREATURES.length)return 0.15;
  if(n>=5)return 0.08;if(n>=3)return 0.05;if(n>=1)return 0.02;
  return 0;
}
function checkAchievements(){
  const newUnlocks=[];
  ACHIEVEMENTS.forEach(a=>{
    if(!S.achievements.includes(a.id)&&a.condition()){
      S.achievements.push(a.id);newUnlocks.push(a);
    }
  });
  if(newUnlocks.length){
    saveState();
    newUnlocks.forEach((a,i)=>setTimeout(()=>{
      showSystemNotif('🏆','ACHIEVEMENT UNLOCKED',a.icon+' '+a.name+'\n'+a.desc+'\n+'+a.xp+' BONUS XP');
      S.xp+=a.xp;S.totalXPEarned+=a.xp;saveState();
    },i*2500));
  }
}
function recalcStreak(){
  let streak=0;const d=new Date();
  for(let i=0;i<500;i++){
    const key=d.toISOString().split('T')[0];
    if(i===0&&!isDayComplete(key)){d.setDate(d.getDate()-1);continue;}
    if(!isDayComplete(key))break;
    streak++;d.setDate(d.getDate()-1);
  }
  S.streak=streak;if(streak>S.longestStreak)S.longestStreak=streak;
}

function getWeaponTier(habitId){
  const c=countHabitCompletions(habitId);
  const wd=WEAPONS_DATA.find(w=>w.habitId===habitId);if(!wd)return 0;
  let tier=0;for(const t of wd.tiers){if(c>=t.threshold)tier=t.tier;}
  return tier;
}
function getEquippedWeapon(habitId){
  const tier=getWeaponTier(habitId);if(tier===0)return null;
  const wd=WEAPONS_DATA.find(w=>w.habitId===habitId);if(!wd)return null;
  return wd.tiers[tier-1]||null;
}

function isCreatureUnlockable(c){
  const o=c.obtain;
  switch(o.type){
    case 'streak':return S.streak>=o.value;
    case 'level':return S.level>=o.value;
    case 'completions':return (S.totalDaysCompleted||0)>=o.value;
    case 'gate_clears':return getGateClearCount()>=o.value;
    case 'floor':return S.storyProgress>=o.value;
    case 'habit':return countHabitCompletions(o.habitId)>=o.value;
    default:return false;
  }
}

function checkCreatureUnlocks(){
  let newUnlocks=[];
  CREATURES.forEach(c=>{
    if(S.unlockedCreatures.includes(c.id))return;
    if(isCreatureUnlockable(c)){S.unlockedCreatures.push(c.id);newUnlocks.push(c);}
  });
  if(newUnlocks.length){saveState();if(typeof playCreatureUnlock==='function')setTimeout(playCreatureUnlock,300);newUnlocks.forEach((c,i)=>setTimeout(()=>showCreatureUnlock(c),i*1200+400));}
}

function checkWeaponUpgrades(){
  let newDrops=[];
  WEAPONS_DATA.forEach(wd=>{
    const oldTier=S.weaponTiers[wd.habitId]||0;
    const newTier=getWeaponTier(wd.habitId);
    if(newTier>oldTier){S.weaponTiers[wd.habitId]=newTier;newDrops.push(wd.tiers[newTier-1]);}
  });
  if(newDrops.length){saveState();newDrops.forEach((w,i)=>setTimeout(()=>showWeaponDrop(w),i*1000+200));}
}

function checkBossProgress(){
  BOSSES.forEach(boss=>{
    if(S.bossDefeated.includes(boss.id))return;
    if(S.level<boss.level)return;
    if(!S.bossProgress[boss.id])S.bossProgress[boss.id]=0;
    S.bossProgress[boss.id]++;if(typeof playBossDamage==='function')playBossDamage();
    if(S.bossProgress[boss.id]>=boss.hpRequired){
      S.bossDefeated.push(boss.id);if(typeof playBossDefeated==='function')setTimeout(playBossDefeated,400);;saveState();
      setTimeout(()=>showBossDefeated(boss),600);
    }
  });
}

function toggleHabit(habitId){
  const date=selectedQuestDate||todayKey();
  if(!S.habitData[date]){S.habitData[date]={};if(!S.habitSnapshots)S.habitSnapshots={};if(!S.habitSnapshots[date]){const _td=todayKey();S.habitSnapshots[date]=date>=_td?S.habits.map(h=>({...h})):DEFAULT_HABITS.map(h=>({...h}));}}
  const wasDone=!!S.habitData[date][habitId];
  const habit=getHabitsForDate(date).find(h=>h.id===habitId);if(!habit)return;
  const prevCard=document.getElementById('card-'+habitId);
  const originRect=prevCard?prevCard.getBoundingClientRect():null;
  let earnedXP=0;
  if(wasDone){
    S.habitData[date][habitId]=false;if(typeof playHabitUntick==='function')playHabitUntick();
    S.xp=Math.max(0,S.xp-habit.xp);S.totalXPEarned=Math.max(0,S.totalXPEarned-habit.xp);
    S.stats[habit.stat]=Math.max(1,(S.stats[habit.stat]||1)-1);
  }else{
    S.habitData[date][habitId]=true;
    const mult=getStreakMultiplier();const crBonus=getCreatureXPBonus();
    earnedXP=Math.round(habit.xp*mult*(1+crBonus));
    S.xp+=earnedXP;S.totalXPEarned+=earnedXP;
    S.stats[habit.stat]=(S.stats[habit.stat]||1)+1;
    checkWeaponUpgrades();checkCreatureUnlocks();checkBossProgress();checkAchievements();if(typeof playHabitComplete==='function')playHabitComplete();
  }
  saveState();checkLevelUp();checkDayCompletion(date,!wasDone);renderAll();
  const card=document.getElementById('card-'+habitId);
  if(card&&!wasDone){
    card.classList.add('completing');setTimeout(()=>card.classList.remove('completing'),600);
    if(originRect)celebrateStatGain(habit,originRect,earnedXP);
  }
}

/* ── QUEST COMPLETE — flying stat gain + XP burst + sidebar pulse ── */
function celebrateStatGain(habit,originRect,earnedXP){
  const statEl=document.getElementById('stat-bar-'+habit.stat);
  const statRow=statEl?statEl.closest('.stat-row'):null;
  const statColors={STR:'#f87171',INT:'#60a5fa',AGI:'#4ade80',VIT:'#a78bfa',SEN:'#fbbf24'};
  const color=statColors[habit.stat]||'#22d3ee';

  // XP burst near the card
  const xpEl=document.createElement('div');
  xpEl.className='xp-burst';
  xpEl.textContent='+'+earnedXP+' XP';
  xpEl.style.left=(originRect.left+originRect.width*0.5-24)+'px';
  xpEl.style.top=(originRect.top+8)+'px';
  document.body.appendChild(xpEl);
  setTimeout(()=>xpEl.remove(),1000);

  // Flying stat badge -> sidebar stat row
  if(statRow){
    const targetRect=statRow.getBoundingClientRect();
    const fly=document.createElement('div');
    fly.className='stat-gain-fly';
    fly.textContent='+1 '+habit.stat;
    fly.style.color=color;
    fly.style.left=(originRect.right-40)+'px';
    fly.style.top=(originRect.top+originRect.height/2-10)+'px';
    document.body.appendChild(fly);
    const dx=(targetRect.left+16)-(originRect.right-40);
    const dy=(targetRect.top+targetRect.height/2-10)-(originRect.top+originRect.height/2-10);
    fly.style.setProperty('--fly-transform','translate('+dx+'px,'+dy+'px) scale(.4)');
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>fly.classList.add('flying'));
    });
    setTimeout(()=>{
      fly.remove();
      statRow.classList.add('stat-pulse');
      statRow.style.color=color;
      setTimeout(()=>{statRow.classList.remove('stat-pulse');statRow.style.color='';},650);
    },820);
  }
}

function checkLevelUp(){
  let leveled=false;
  while(S.xp>=xpForLevel(S.level)){
    const oldRank=getRank(S.level).rank;
    S.xp-=xpForLevel(S.level);S.level++;
    leveled=true;
    S.storyProgress=Math.min(Math.floor(S.level/3),30);
    const newRank=getRank(S.level).rank;
    if(newRank!==oldRank)setTimeout(()=>triggerRankUp(oldRank,newRank),1800);
  }
  if(leveled){if(typeof playLevelUp==='function')playLevelUp();triggerLevelUp();checkCreatureUnlocks();checkAchievements();}
}

function checkDayCompletion(date,completing){
  if(!completing||!isDayComplete(date))return;
  recalcStreak();
  const wk=getWeekKey(date);
  if(!S.completedGates[wk])S.completedGates[wk]={days:[],rank:''};
  if(!S.completedGates[wk].days.includes(date))S.completedGates[wk].days.push(date);
  const dc=S.completedGates[wk].days.length;
  if(dc>=7)S.completedGates[wk].rank='S';
  else if(dc>=5)S.completedGates[wk].rank='A';
  else if(dc>=3)S.completedGates[wk].rank='B';
  else S.completedGates[wk].rank='C';
  S.totalDaysCompleted=Object.keys(S.habitData).filter(ds=>isDayActive(ds)).length;
  if(completing)setTimeout(()=>showDayComplete(date),400);
  saveState();checkCreatureUnlocks();
  const _dc=getHabitsForDate(date);showSystemNotif('⚡','DAILY QUEST COMPLETE',`All ${_dc.length} quests accomplished.\nStreak: ${S.streak} days\n+${_dc.length*20} XP earned.`);
}

// Quest management
function addCustomHabit(){if(typeof playUIAddHabit==='function')playUIAddHabit();
  const name=document.getElementById('new-habit-name').value.trim().toUpperCase();
  const stat=document.getElementById('new-habit-stat').value;
  const icon=document.getElementById('new-habit-icon').value;
  if(!name){toast('ENTER A QUEST NAME');return;}
  if(name.length>30){toast('NAME TOO LONG (max 30 chars)');return;}
  const id='custom_'+Date.now();
  const newH={id,name,desc:'Custom quest.',icon,stat,xp:20,isDefault:false};
  const today=todayKey();const selDate=selectedQuestDate||today;
  if(!S.habitSnapshots)S.habitSnapshots={};
  if(selDate<today){
    // Past day: add only to that day's snapshot, not the global list
    if(!S.habitSnapshots[selDate])S.habitSnapshots[selDate]=getHabitsForDate(selDate).map(h=>({...h}));
    S.habitSnapshots[selDate].push(newH);
  } else {
    // Today/future: add to global list + refresh today's snapshot
    S.habits.push(newH);
    S.habitSnapshots[today]=S.habits.map(h=>({...h}));
  }
  saveState();renderQuests();renderQuestMgmt();toast('QUEST ADDED: '+name);
}
function removeHabit(habitId){if(typeof playUIRemove==='function')playUIRemove();
  const today=todayKey();const selDate=selectedQuestDate||today;
  if(!S.habitSnapshots)S.habitSnapshots={};
  if(selDate<today){
    // Past day: remove only from that day's snapshot
    const snap=S.habitSnapshots[selDate]||(S.habitSnapshots[selDate]=getHabitsForDate(selDate).map(h=>({...h})));
    if(snap.length<=1){toast('CANNOT REMOVE — Minimum 1 quest required.');return;}
    if(!confirm('Remove this quest from '+selDate+' only?'))return;
    S.habitSnapshots[selDate]=snap.filter(h=>h.id!==habitId);
  } else {
    // Today/future: remove from global list + refresh snapshot
    if(S.habits.length<=1){toast('CANNOT REMOVE — Minimum 1 quest required.');return;}
    if(!confirm('Remove this quest? Progress for this quest will be preserved in history.'))return;
    // Before removing: freeze snapshots for any past day that has this habit but no snapshot yet
    // This ensures removed habits don't disappear from past days
    Object.keys(S.habitData).forEach(d=>{
      if(d>=today)return;
      if(S.habitSnapshots[d]&&S.habitSnapshots[d].length)return;
      const ids=Object.keys(S.habitData[d]);
      if(!ids.includes(habitId))return;
      const snap=ids.map(id=>S.habits.find(h=>h.id===id)||DEFAULT_HABITS.find(h=>h.id===id)).filter(Boolean);
      if(snap.length)S.habitSnapshots[d]=snap;
    });
    S.habits=S.habits.filter(h=>h.id!==habitId);
    S.habitSnapshots[today]=S.habits.map(h=>({...h}));
  }
  saveState();renderQuests();renderQuestMgmt();toast('QUEST REMOVED');
}
let questMgmtOpen=false;
function toggleQuestMgmt(){
  questMgmtOpen=!questMgmtOpen;
  document.getElementById('quest-mgmt-section').style.display=questMgmtOpen?'block':'none';
  document.getElementById('quest-mgmt-toggle').textContent=questMgmtOpen?'⚙ HIDE QUEST MANAGER':'⚙ MANAGE QUESTS';
  if(questMgmtOpen)renderQuestMgmt();
}
function renderQuestMgmt(){
  const list=document.getElementById('quest-mgmt-list');list.innerHTML='';
  const selDate=selectedQuestDate||todayKey();
  const isPast=selDate<todayKey();
  if(isPast){const warn=document.getElementById('quest-mgmt-warn');if(warn)warn.style.display='block';}
  else{const warn=document.getElementById('quest-mgmt-warn');if(warn)warn.style.display='none';}
  getHabitsForDate(selDate).forEach(h=>{
    list.innerHTML+=`<div class="quest-mgmt-item">
      <span class="quest-mgmt-icon">${h.icon}</span>
      <span class="quest-mgmt-name">${h.name}</span>
      <span class="quest-mgmt-stat">${h.stat}</span>
      <button class="quest-mgmt-del" onclick="removeHabit('${h.id}')">REMOVE</button>
    </div>`;
  });
  const iconSel=document.getElementById('new-habit-icon');
  if(iconSel&&!iconSel.innerHTML){
    QUEST_ICONS.forEach(ic=>iconSel.innerHTML+=`<option value="${ic}">${ic}</option>`);
  }
}
// CINEMATICS + NOTIFICATIONS
function triggerLevelUp(){
  const o=document.getElementById('levelup-overlay');
  document.getElementById('levelup-num').textContent=`LEVEL ${S.level-1}  →  LEVEL ${S.level}`;
  const rank=getRank(S.level);
  document.getElementById('levelup-stats-gained').innerHTML=
    `<div class="levelup-stat-pill">RANK: ${rank.label}</div><div class="levelup-stat-pill">XP TO NEXT: ${xpForLevel(S.level)}</div>`;
  o.classList.add('open');
  o.querySelectorAll('.levelup-ring,.levelup-ring-2').forEach(r=>{r.style.animation='none';r.offsetHeight;r.style.animation='';});
  setTimeout(()=>closeLevelUp(),4500);
}
function closeLevelUp(){document.getElementById('levelup-overlay').classList.remove('open');}
function triggerRankUp(oldRank,newRank){
  const od=RANKS.find(r=>r.rank===oldRank)||RANKS[0];
  const nd=RANKS.find(r=>r.rank===newRank)||RANKS[1];
  const o=document.getElementById('rankup-overlay');
  const e1=document.getElementById('rankup-old');e1.textContent=od.label;e1.style.color=od.color;
  const e2=document.getElementById('rankup-new');e2.textContent=nd.label;e2.style.color=nd.color;
  document.getElementById('rankup-desc-text').textContent=nd.desc;
  o.classList.add('open');setTimeout(()=>o.classList.remove('open'),5500);
}
function closeRankUp(){document.getElementById('rankup-overlay').classList.remove('open');}
function showSystemNotif(icon,title,body,autoClose=false){
  const bg=document.getElementById('system-notif-bg');
  document.getElementById('sn-icon').textContent=icon;
  document.getElementById('sn-title').textContent=title;
  document.getElementById('sn-body').innerHTML=body.replace(/\n/g,'<br>');
  bg.classList.add('open');
  if(autoClose)setTimeout(()=>closeSystemNotif(),3500);
}
function closeSystemNotif(){document.getElementById('system-notif-bg').classList.remove('open');}

function showCreatureUnlock(creature){
  showSystemNotif('🌑','CREATURE EXTRACTED',
    `${creature.icon} ${creature.name} has joined your army.\nSpecies: ${creature.species}\nArmy Bonus: ${creature.armyBonus}`);
}
function showWeaponDrop(weapon){
  const bg=document.getElementById('weapon-drop-bg');
  document.getElementById('wd-rarity').textContent=weapon.rarity;
  document.getElementById('wd-rarity').style.color=weapon.rarityColor;
  document.getElementById('wd-icon').textContent=weapon.icon;
  document.getElementById('wd-name').textContent=weapon.name;
  document.getElementById('wd-skill-name').textContent=weapon.skill;
  document.getElementById('wd-skill-desc').textContent=weapon.skillDesc;
  bg.classList.add('open');
}
function closeWeaponDrop(){if(typeof playUIClose==='function')playUIClose();document.getElementById('weapon-drop-bg').classList.remove('open');}
function showBossDefeated(boss){
  showSystemNotif('💀','BOSS DEFEATED',`${boss.icon} ${boss.name} has been vanquished.\n${boss.reward}`);
}

let openCreatureData=null;
function openCreatureModal(creatureId){if(typeof playUIOpen==='function')playUIOpen();
  const c=CREATURES.find(x=>x.id===creatureId);if(!c)return;
  openCreatureData=c;
  const isUnlocked=S.unlockedCreatures.includes(c.id);
  const bg=document.getElementById('creature-modal-bg');
  bg.style.setProperty('--cm-color',c.color);

  // Build modal inner HTML dynamically based on whether image exists
  const modal=document.querySelector('.creature-modal');
  if(c.image){
    modal.innerHTML=`
      <button class="cm-close" onclick="closeCreatureModal()">✕ CLOSE</button>
      <div class="cm-art-header" style="--cm-clr:${c.color}">
        <img class="cm-art-img ${isUnlocked?'cm-art-alive':''}" src="${c.image}" alt="${c.name}"
             ${!isUnlocked?'style="filter:grayscale(1) brightness(.25)"':''}>
        <div class="cm-art-scan"></div>
        <div class="cm-art-gradient"></div>
        <div class="cm-art-particles"></div>
        <div class="cm-art-overlay-text cm-art-entrance">
          <div style="font-family:'Orbitron',sans-serif;font-size:.58rem;letter-spacing:4px;color:${c.color};margin-bottom:4px;text-shadow:0 0 12px ${c.color}">${c.tier}-RANK · ${c.species} · ${c.habitat}</div>
          <div style="font-family:'Orbitron',sans-serif;font-size:1.6rem;font-weight:900;letter-spacing:3px;color:#fff;text-shadow:0 0 30px ${c.color},0 2px 12px rgba(0,0,0,.9)">${c.name}</div>
          <div style="font-size:.72rem;color:${isUnlocked?c.color:'var(--text-dim)'};font-family:'Orbitron',sans-serif;letter-spacing:3px;margin-top:8px">${isUnlocked?'▶ IN ARMY':'◼ NOT YET EXTRACTED'}</div>
        </div>
        ${isUnlocked?`<div class="cm-art-glow-bar" style="background:linear-gradient(90deg,transparent,${c.color},transparent)"></div>`:''}
      </div>
      <div class="cm-body" id="cm-body"></div>`;
  } else {
    modal.innerHTML=`
      <button class="cm-close" onclick="closeCreatureModal()">✕ CLOSE</button>
      <div class="cm-header">
        <div class="cm-icon" id="cm-icon">${c.icon}</div>
        <div class="cm-meta">
          <div class="cm-tier" id="cm-tier">${c.tier}-RANK · ${c.species} · ${c.habitat}</div>
          <div class="cm-name" id="cm-name">${c.name}</div>
          <div style="font-family:'Orbitron',sans-serif;font-size:.6rem;letter-spacing:3px;margin-top:6px;color:${isUnlocked?c.color:'var(--text-dim)'}">${isUnlocked?'▶ IN ARMY':'◼ NOT YET EXTRACTED'}</div>
        </div>
      </div>
      <div class="cm-body" id="cm-body"></div>`;
  }

  // Populate cm-body
  const body=modal.querySelector('.cm-body')||modal.querySelector('#cm-body');
  let abHTML='';
  c.abilities.forEach(a=>{
    abHTML+=`<div class="cm-ability">
      <div class="cm-ability-name">${a.name}</div>
      <span class="cm-ability-type">${a.type}</span>
      <div class="cm-ability-desc">${isUnlocked?a.desc:'[CLASSIFIED — Creature not yet extracted]'}</div>
    </div>`;
  });
  abHTML+=`<div class="cm-passive">
    <div class="cm-passive-name">PASSIVE: ${c.passive.name}</div>
    <div class="cm-ability-desc">${isUnlocked?c.passive.desc:'[CLASSIFIED]'}</div>
  </div>`;

  body.innerHTML=`
    <div class="cm-lore">${c.lore}</div>
    <div class="cm-section-label">ABILITIES</div>
    <div class="cm-abilities-grid">${abHTML}</div>
    <div class="cm-section-label" style="margin-top:18px">HOW TO OBTAIN</div>
    <div class="cm-obtain-section">
      <div class="cm-obtain-icon">${c.obtain.icon}</div>
      <div>
        <div class="cm-obtain-label">UNLOCK CONDITION</div>
        <div class="cm-obtain-cond">${c.obtain.desc}</div>
      </div>
    </div>
    <div class="cm-army-bonus" style="margin-top:12px">ARMY BONUS: ${c.armyBonus}</div>`;

  bg.classList.add('open');
}
function closeCreatureModal(){if(typeof playUIClose==='function')playUIClose();document.getElementById('creature-modal-bg').classList.remove('open');}

function toast(msg){
  const e=document.querySelector('.toast');if(e)e.remove();
  const t=document.createElement('div');t.className='toast';t.textContent=msg;
  document.body.appendChild(t);setTimeout(()=>{if(t.parentNode)t.remove();},3000);
}

/* ── BOSS MODAL ── */
function openBossModal(bossId){if(typeof playUIOpen==='function')playUIOpen();
  const boss=BOSSES.find(b=>b.id===bossId);if(!boss)return;
  const isDefeated=S.bossDefeated.includes(boss.id);
  const isActive=S.level>=boss.level;
  const tc=boss.themeColor||'#7c3aed';
  const gc=boss.glowColor||'rgba(124,58,237,0.5)';
  const progress=isDefeated?boss.hpRequired:(S.bossProgress[boss.id]||0);
  const hpRemain=isDefeated?0:boss.hpRequired-progress;
  const hpPct=Math.min((progress/boss.hpRequired)*100,100);

  let bg=document.getElementById('boss-modal-bg');
  if(!bg){
    bg=document.createElement('div');
    bg.id='boss-modal-bg';
    bg.innerHTML=`<div class="boss-modal" id="boss-modal-inner"></div>`;
    bg.onclick=function(e){if(e.target===bg)closeBossModal();};
    document.body.appendChild(bg);
    // inject base styles if not present
    if(!document.getElementById('boss-modal-style')){
      const s=document.createElement('style');
      s.id='boss-modal-style';
      s.textContent=`
        #boss-modal-bg{position:fixed;inset:0;z-index:700;background:rgba(0,0,0,.95);
          display:flex;align-items:flex-start;justify-content:center;
          overflow-y:auto;padding:32px 20px;backdrop-filter:blur(16px);}
        .boss-modal{max-width:680px;width:100%;background:#0a0a14;
          border:1.5px solid ${tc};border-radius:16px;overflow:hidden;
          box-shadow:0 0 60px ${gc};animation:bm-in .4s cubic-bezier(.22,1,.36,1) both;}
        @keyframes bm-in{from{opacity:0;transform:scale(.94) translateY(20px)}to{opacity:1;transform:none}}
        .bm-close{position:absolute;top:14px;right:16px;background:rgba(0,0,0,.7);
          border:1px solid #374151;color:#9ca3af;padding:5px 14px;border-radius:20px;
          cursor:pointer;font-family:'Orbitron',monospace;font-size:10px;letter-spacing:2px;z-index:10;}
        .bm-close:hover{color:#fff;border-color:#7c3aed;}
        .bm-art{position:relative;height:420px;overflow:hidden;background:#060610;}
        .bm-art img{width:100%;height:100%;object-fit:contain;object-position:center;
          animation:bm-ken 10s ease-in-out infinite alternate;}
        @keyframes bm-ken{0%{transform:scale(1)}100%{transform:scale(1.07) translateY(-10px)}}
        .bm-art-vignette{position:absolute;inset:0;
          background:linear-gradient(to bottom,rgba(0,0,0,.1) 0%,rgba(0,0,0,0) 40%,rgba(10,10,20,.98) 100%);pointer-events:none;}
        .bm-art-scan{position:absolute;left:0;right:0;height:2px;
          background:linear-gradient(90deg,transparent,${tc}60,transparent);
          animation:bm-scan 5s linear infinite;pointer-events:none;}
        @keyframes bm-scan{0%{top:0;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}
        .bm-nameplate{position:absolute;bottom:0;left:0;right:0;padding:20px 24px 16px;
          animation:bm-name .6s cubic-bezier(.22,1,.36,1) .1s both;}
        @keyframes bm-name{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        .bm-boss-name{font-family:'Orbitron',monospace;font-size:1.7rem;font-weight:900;
          color:#fff;letter-spacing:2px;text-shadow:0 0 30px ${tc};}
        .bm-species{font-family:'Orbitron',monospace;font-size:.6rem;letter-spacing:4px;
          color:rgba(255,255,255,.5);margin-top:4px;}
        .bm-badges{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;}
        .bm-pill{font-family:'Orbitron',monospace;font-size:9px;font-weight:700;
          letter-spacing:1.5px;padding:3px 12px;border-radius:20px;border:1px solid;}
        .bm-body{padding:24px 28px 32px;display:flex;flex-direction:column;gap:16px;}
        .bm-lore{font-size:.87rem;color:rgba(255,255,255,.65);line-height:1.8;
          border-left:2px solid ${tc};padding:12px 16px;background:${tc}08;border-radius:0 8px 8px 0;}
        .bm-sec{font-family:'Orbitron',monospace;font-size:.58rem;letter-spacing:4px;
          color:${tc};margin-top:4px;}
        .bm-ability{display:flex;align-items:flex-start;gap:10px;padding:8px 12px;
          background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);
          border-left:2px solid ${tc}60;border-radius:0 8px 8px 0;}
        .bm-ability-dot{width:6px;height:6px;border-radius:50%;background:${tc};flex-shrink:0;margin-top:5px;}
        .bm-hp-track{height:10px;background:rgba(255,255,255,.06);border-radius:5px;overflow:hidden;border:1px solid rgba(255,255,255,.08);}
        .bm-hp-bar{height:100%;border-radius:5px;box-shadow:0 0 10px ${gc};transition:width .6s ease;}
        .bm-reward{display:flex;gap:12px;align-items:center;padding:10px 16px;
          border:1px solid ${tc}30;background:${tc}08;border-radius:10px;}
      `;
      document.head.appendChild(s);
    }
  }

  const stateLabel=isDefeated?'✓ DEFEATED':isActive?'▶ RAID ACTIVE':'◼ LOCKED';
  const stateBg=isDefeated?'rgba(74,222,128,.15)':isActive?`${tc}20`:'rgba(55,65,81,.3)';
  const stateColor=isDefeated?'#4ade80':isActive?tc:'#6b7280';

  const abilitiesHTML=boss.abilities.map(a=>`
    <div class="bm-ability">
      <div class="bm-ability-dot"></div>
      <span style="font-family:'Orbitron',monospace;font-size:10px;color:rgba(255,255,255,.75);letter-spacing:.5px">${a}</span>
    </div>`).join('');

  document.getElementById('boss-modal-inner').innerHTML=`
    <div class="bm-art" style="border-color:${tc}">
      <button class="bm-close" onclick="closeBossModal()">✕ CLOSE</button>
      ${boss.image?`<img src="${boss.image}" alt="${boss.name}">`:`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:100px">${boss.icon}</div>`}
      <div class="bm-art-vignette"></div>
      <div class="bm-art-scan"></div>
      <div class="bm-nameplate">
        <div class="bm-boss-name">${boss.name}</div>
        <div class="bm-species">${boss.species}</div>
        <div class="bm-badges">
          <span class="bm-pill" style="border-color:${tc};color:${tc}">LV.${boss.level} BOSS</span>
          <span class="bm-pill" style="border-color:${stateColor};color:${stateColor};background:${stateBg}">${stateLabel}</span>
        </div>
      </div>
    </div>
    <div class="bm-body">
      <div class="bm-lore">${boss.lore}</div>
      <div class="bm-sec">◈ BOSS ABILITIES</div>
      <div style="display:flex;flex-direction:column;gap:8px">${abilitiesHTML}</div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span class="bm-sec" style="margin:0">${isDefeated?'COMBAT TERMINATED':'BOSS HP'}</span>
          <span style="font-family:'Orbitron',monospace;font-size:11px;font-weight:700;color:${isDefeated?'#4ade80':tc}">${isDefeated?'0 / '+boss.hpRequired:'HP: '+hpRemain+' / '+boss.hpRequired}</span>
        </div>
        <div class="bm-hp-track">
          <div class="bm-hp-bar" style="width:${isDefeated?'100':hpPct}%;background:${isDefeated?'linear-gradient(90deg,#4ade80,#22c55e)':`linear-gradient(90deg,${tc},${tc}cc)`}"></div>
        </div>
        ${isActive&&!isDefeated?`<div style="font-size:10px;color:rgba(255,255,255,.35);font-family:'Orbitron',monospace;margin-top:6px">⚔ Each habit completion deals 1 damage</div>`:''}
      </div>
      <div class="bm-reward">
        <span style="font-family:'Orbitron',monospace;font-size:9px;font-weight:700;letter-spacing:2px;color:${tc}">🏆 REWARD</span>
        <span style="font-size:12px;color:rgba(255,255,255,.75)">${boss.reward}</span>
      </div>
    </div>`;

  // Update border to match boss color
  document.querySelector('.boss-modal').style.borderColor=tc;
  document.querySelector('.boss-modal').style.boxShadow=`0 0 60px ${gc}`;

  bg.style.display='flex';
}
function closeBossModal(){if(typeof playUIClose==='function')playUIClose();
  const bg=document.getElementById('boss-modal-bg');
  if(bg) bg.style.display='none';
}
// RENDER FUNCTIONS
function renderHeader(){
  const rank=getRank(S.level);
  const b=document.getElementById('header-rank-badge');
  b.textContent=rank.label;b.style.color=rank.color;b.style.borderColor=rank.color;
  document.getElementById('header-level').textContent='LV.'+S.level;
  document.getElementById('header-streak').textContent=S.streak+' DAY STREAK';
  const today=todayKey(),dt=new Date(today+'T00:00:00');
  const days=['SUN','MON','TUE','WED','THU','FRI','SAT'],months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  document.getElementById('header-date').textContent=`${days[dt.getDay()]} ${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
}
function renderSidebar(){
  if(!S.playerName)return;
  const char=CHARS[S.playerName],rank=getRank(S.level);
  document.getElementById('sidebar-avatar').src=char.image;
  document.getElementById('sidebar-name').textContent=char.displayName;
  document.getElementById('sidebar-class').textContent=rank.cls;
  const badge=document.getElementById('sidebar-rank-badge');
  badge.textContent=rank.label;badge.style.color=rank.color;badge.style.borderColor=rank.color+'80';
  document.getElementById('sidebar-level').textContent='LV. '+S.level;
  const xpN=xpForLevel(S.level);
  document.getElementById('sidebar-xp-label').textContent=S.xp+' / '+xpN+' XP';
  document.getElementById('sidebar-xp-fill').style.width=((S.xp/xpN)*100)+'%';
  const maxStat=Math.max(...Object.values(S.stats),10);
  ['STR','INT','AGI','VIT','SEN'].forEach(st=>{
    const v=S.stats[st]||1;
    document.getElementById('stat-bar-'+st).style.width=((v/maxStat)*100)+'%';
    document.getElementById('stat-val-'+st).textContent=v;
  });
  // Equipped weapons chips
  const wc=document.getElementById('sidebar-weapons');wc.innerHTML='';
  S.habits.forEach(h=>{
    const w=getEquippedWeapon(h.id);
    if(w)wc.innerHTML+=`<div class="weapon-equip-chip" style="border-color:${w.rarityColor}40;color:${w.rarityColor}" title="${w.name}">${h.icon} ${w.icon}</div>`;
  });
  renderGateWidget();
}
function renderGateWidget(){
  const today=todayKey(),wk=getWeekKey(today);
  const gate=S.completedGates[wk]||{days:[],rank:'?'};
  document.getElementById('sidebar-gate-title').textContent='GATE '+wk;
  const dt=new Date(today+'T00:00:00');const dow=(dt.getDay()+6)%7;
  const mon=new Date(dt);mon.setDate(dt.getDate()-dow);
  const container=document.getElementById('gate-days-mini');container.innerHTML='';
  for(let i=0;i<7;i++){
    const d=new Date(mon);d.setDate(mon.getDate()+i);const dKey=d.toISOString().split('T')[0];
    const div=document.createElement('div');
    div.className='gate-day-mini'+(gate.days&&gate.days.includes(dKey)?' done':'')+(dKey===today?' today':'');
    div.textContent=WEEK_DAYS[i].charAt(0);container.appendChild(div);
  }
  const count=gate.days?gate.days.length:0;
  document.getElementById('gate-progress-text').innerHTML=`<span>${count}</span>/7 DAYS`;
}
function renderDateStrip(){
  const strip=document.getElementById('quest-date-strip');if(!strip)return;
  const today=todayKey(),selY=calYear,selM=calMonth;
  const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const MSHORT=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // Year row
  let yHtml='<div class="cal-year-row">';
  for(let y=2026;y<=2028;y++) yHtml+=`<button class="cal-year-btn${selY===y?' active':''}" onclick="setCalYear(${y})">${y}</button>`;
  yHtml+='</div>';
  // Month row
  let mHtml='<div class="cal-month-row">';
  for(let m=0;m<12;m++) mHtml+=`<button class="cal-month-btn${selM===m?' active':''}" onclick="setCalMonth(${m})">${MSHORT[m]}</button>`;
  mHtml+='</div>';
  // Calendar grid header
  const DAYS=['Mo','Tu','We','Th','Fr','Sa','Su'];
  let gHtml=`<div class="cal-panel"><div class="cal-month-label">${MON[selM]} ${selY}</div><div class="cal-grid">`;
  DAYS.forEach(d=>gHtml+=`<div class="cal-hdr">${d}</div>`);
  const firstD=new Date(selY,selM,1);
  const startOffset=(firstD.getDay()+6)%7;
  const daysInMonth=new Date(selY,selM+1,0).getDate();
  for(let pad=0;pad<startOffset;pad++) gHtml+='<div class="cal-empty"></div>';
  for(let d=1;d<=daysInMonth;d++){
    const dKey=`${selY}-${String(selM+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isFuture=dKey>today,isToday=dKey===today,isSel=dKey===selectedQuestDate;
    const data=S.habitData[dKey]||{};
    const dayH=getHabitsForDate(dKey);const done=dayH.filter(h=>data[h.id]).length,total=dayH.length;
    const allDone=done===total&&total>0,someDone=done>0&&!allDone;
    const cls=['cal-day',isSel?'selected':'',isToday?'is-today':'',isFuture?'future':'',allDone?'all-done':someDone?'partial':''].filter(Boolean).join(' ');
    gHtml+=`<div class="${cls}" onclick="selectQuestDate('${dKey}')" title="${dKey}">
      <span class="cal-day-num">${d}</span>
      ${allDone?'<span class="cal-check">✓</span>':done>0?`<span class="cal-partial">${done}</span>`:''}
    </div>`;
  }
  gHtml+='</div></div>';
  const body=document.getElementById('cal-body');
  if(!body){
    strip.innerHTML=`<button class="cal-toggle-btn" id="cal-toggle-btn" onclick="toggleCalendar()"><span class="cal-toggle-icon">📅</span><span class="cal-toggle-label">BROWSE BY DATE</span><span class="cal-chevron">▼</span></button><div class="cal-body" id="cal-body" style="max-height:0">${yHtml+mHtml+gHtml}</div>`;
  } else {
    body.innerHTML=yHtml+mHtml+gHtml;
    if(calOpen) body.style.maxHeight=body.scrollHeight+'px';
  }
  // scroll selected day into view
  setTimeout(()=>{const s=strip.querySelector('.cal-day.selected');if(s)s.scrollIntoView({behavior:'smooth',block:'nearest'});},60);
}
function setCalYear(y){calYear=y;renderDateStrip();}
function setCalMonth(m){calMonth=m;renderDateStrip();}
function renderQuests(){
  const today=todayKey();
  if(!selectedQuestDate)selectedQuestDate=today;
  const date=selectedQuestDate,isFuture=date>today,isToday=date===today;
  const data=S.habitData[date]||{};
  renderDateStrip();
  const lbl=document.getElementById('quest-date-label');
  if(lbl){
    const d=new Date(date+'T00:00:00');
    const opts={weekday:'long',year:'numeric',month:'long',day:'numeric'};
    const tag=isToday?'today':isFuture?'future':'past';
    const label=isToday?'⚡ TODAY':isFuture?'🔮 UPCOMING':'📅 '+d.toLocaleDateString('en-GB',opts).toUpperCase();
    lbl.innerHTML=`<span class="qdl-tag ${tag}">${label}</span>`;
  }
  const container=document.getElementById('quest-grid');container.innerHTML='';
  const habitsForDay=getHabitsForDate(date);
  habitsForDay.forEach(h=>{
    const done=!!data[h.id];const w=getEquippedWeapon(h.id);
    const div=document.createElement('div');
    div.className='quest-card'+(done?' done':'');div.id='card-'+h.id;
    div.innerHTML=`
      <div class="quest-status-badge">COMPLETE</div>
      <div class="quest-card-top">
        <div class="quest-icon-wrap">${h.icon}</div>
        <div class="quest-meta">
          <div class="quest-name">${h.name}</div>
          <div class="quest-desc">${h.desc}</div>
          ${w?`<div style="font-size:.65rem;color:#fbbf24;margin-top:4px">${w.icon} ${w.name} · <span style="color:rgba(255,255,255,.5)">${w.skill}</span></div>`:''}
        </div>
      </div>
      <div class="quest-reward">
        <span class="reward-pill">+${h.xp} XP</span>
        ${getStreakMultiplier()>1?`<span class="reward-pill streak-mult">${getStreakMultiplier()}x</span>`:''}
        <span class="reward-pill">+1 ${h.stat}</span>
        ${countHabitCompletions(h.id)?`<span class="reward-pill">${countHabitCompletions(h.id)}x done</span>`:''}
        ${(()=>{const hs=getHabitStreak(h.id);return hs>0?`<span class="reward-pill habit-streak">🔥 ${hs}</span>`:'';})()}
      </div>
      <button class="quest-btn ${done?'done-btn':''} ${isFuture?'future-btn':''}"
        ${isFuture?'disabled':''} onclick="${isFuture?'':('toggleHabit(\''+h.id+'\')')}">
        ${isFuture?'🔒 NOT YET':done?'✓  COMPLETED — UNDO':'▶  ACCEPT QUEST'}
      </button>`;
    container.appendChild(div);
  });
  const total=habitsForDay.length,doneCount=habitsForDay.filter(h=>data[h.id]).length;
  const pct=total>0?Math.round((doneCount/total)*100):0;
  const fill=document.getElementById('daily-bar-fill');
  fill.style.width=pct+'%';fill.className='daily-bar-fill'+(pct>=100?' full':'');
  document.getElementById('daily-progress-value').textContent=`${doneCount}/${total} QUESTS — ${pct}% XP`;
  document.getElementById('streak-current').textContent=S.streak;
  document.getElementById('streak-longest').textContent=S.longestStreak;
  const liveDays=Object.keys(S.habitData).filter(ds=>isDayActive(ds)).length;S.totalDaysCompleted=liveDays;document.getElementById('streak-total-days').textContent=liveDays;const ttd=document.getElementById('streak-tasks-done');if(ttd)ttd.textContent=getTotalTasksDone();
}

function renderAscension(){
  const c=document.getElementById('tower-container');c.innerHTML='';
  for(let i=1;i<=30;i++){
    const node=STORY[i-1];
    const isU=i<=S.storyProgress,isC=i===S.storyProgress+1,isL=!isU&&!isC;
    let cls='floor-item ';
    if(isU)cls+='unlocked';else if(isC)cls+='current';else cls+='locked';
    let sCls='',sTxt='';
    if(isU){sCls='done';sTxt='CLEARED';}else if(isC){sCls='next';sTxt='NEXT';}else{sCls='locked';sTxt='LOCKED';}
    c.innerHTML+=`<div class="${cls}" ${isU?'onclick="openStory('+(i-1)+')"':''}>
      <span class="floor-num">FLOOR ${String(i).padStart(2,'0')}</span>
      <span class="floor-dot"></span>
      <span class="floor-arc">${node.arc}</span>
      <span class="floor-title-text">${isL?'???':node.title}</span>
      <span class="floor-status ${sCls}">${sTxt}</span>
    </div>`;
  }
}
function openStory(idx){if(typeof playUIStory==='function')playUIStory();
  const node=STORY[idx];
  document.getElementById('story-modal-floor').textContent='FLOOR '+String(idx+1).padStart(2,'0');
  document.getElementById('story-modal-arc').textContent=node.arc.toUpperCase();
  document.getElementById('story-modal-title').textContent=node.title.toUpperCase();
  document.getElementById('story-modal-text').textContent=node.text;
  document.getElementById('story-modal-bg').classList.add('open');
}
function closeStory(){if(typeof playUIClose==='function')playUIClose();document.getElementById('story-modal-bg').classList.remove('open');}
// RENDER: ARMY, ARMORY, BOSSES, GATES, CALENDAR, TABS, INTRO, INIT
let armySubView='all';
function switchArmyView(view){if(typeof playUINav==='function')playUINav();
  armySubView=view;
  document.querySelectorAll('.army-sub-btn').forEach(b=>b.classList.remove('active'));
  document.querySelector('[data-army="'+view+'"]').classList.add('active');
  document.querySelectorAll('.army-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('army-panel-'+view).classList.add('active');
  if(view==='all')renderBestiary();else renderMyArmy();
}

function buildCreatureCard(cr,showFullInfo){
  const unlocked=S.unlockedCreatures.includes(cr.id);
  const hasImage=cr.image&&cr.image.length>0;
  const div=document.createElement('div');
  div.className='creature-card'+(unlocked?' unlocked':' locked')+(hasImage?' has-art':'');
  div.style.setProperty('--card-tier-color',cr.color);
  div.onclick=()=>openCreatureModal(cr.id);

  if(hasImage){
    // Portrait art card layout
    div.innerHTML=`
      <div class="creature-art-wrap">
        <img class="creature-art" src="${cr.image}" alt="${cr.name}" ${!unlocked?'style="filter:grayscale(1) brightness(.35)"':''}>
        <div class="creature-art-overlay"></div>
        <div class="creature-art-badges">
          <span class="creature-tier-badge">${cr.tier}-RANK</span>
          ${unlocked?`<span class="creature-status-pill in-army">IN ARMY</span>`:`<span class="creature-status-pill locked">LOCKED</span>`}
        </div>
        <div class="creature-art-nameplate">
          <div class="creature-name">${cr.name}</div>
          <div class="creature-species">${cr.species} · ${cr.habitat}</div>
        </div>
      </div>
      <div class="creature-card-body">
        <div class="creature-lore">${unlocked?cr.lore:'[CLASSIFIED] Complete the required objective to extract this creature.'}</div>
        <div class="creature-abilities">
          ${cr.abilities.map(a=>`<span class="ability-tag">${unlocked?a.name:'???'}</span>`).join('')}
          <span class="ability-tag passive-tag">PASSIVE</span>
        </div>
        <div class="creature-obtain-row">
          <span style="font-size:1rem">${cr.obtain.icon}</span>
          <span class="creature-obtain-text">${cr.obtain.desc}</span>
        </div>
      </div>`;
  } else {
    // Emoji fallback card (for creatures without art yet)
    div.innerHTML=`
      <div class="creature-card-top">
        <div class="creature-icon-big">${cr.icon}</div>
        <div class="creature-card-meta">
          <div class="creature-tier-badge">${cr.tier}-RANK</div>
          <div class="creature-name">${cr.name}</div>
          <div class="creature-species">${cr.species} · ${cr.habitat}</div>
        </div>
      </div>
      <div class="creature-lore">${unlocked?cr.lore:'[CLASSIFIED] This creature has not yet been extracted. Complete the required objective to add it to your army.'}</div>
      <div class="creature-abilities">
        ${cr.abilities.map(a=>`<span class="ability-tag">${unlocked?a.name:'???'}</span>`).join('')}
        <span class="ability-tag passive-tag">PASSIVE</span>
      </div>
      <div class="creature-obtain-row">
        <span style="font-size:1rem">${cr.obtain.icon}</span>
        <span class="creature-obtain-text">${cr.obtain.desc}</span>
        <span class="creature-status-pill ${unlocked?'in-army':'locked'}">${unlocked?'IN ARMY':'LOCKED'}</span>
      </div>`;
  }
  return div;
}

function renderBestiary(){
  const c=document.getElementById('bestiary-grid');c.innerHTML='';
  CREATURES.forEach(cr=>c.appendChild(buildCreatureCard(cr,false)));
}
function renderMyArmy(){
  const c=document.getElementById('myarmy-grid');c.innerHTML='';
  const myCreatures=CREATURES.filter(cr=>S.unlockedCreatures.includes(cr.id));
  if(!myCreatures.length){c.innerHTML='<div class="empty-state">NO CREATURES EXTRACTED YET<br><span style="font-size:.75rem;color:var(--text-dim)">Complete objectives to summon your army.</span></div>';return;}
  myCreatures.forEach(cr=>{
    const div=buildCreatureCard(cr,true);
    // In My Army view, also show army bonus
    if(cr.image){
      const bonus=document.createElement('div');
      bonus.className='creature-army-bonus';bonus.textContent=cr.armyBonus;
      div.querySelector('.creature-card-body').appendChild(bonus);
    }
    c.appendChild(div);
  });
}

function renderArmory(){
  const c=document.getElementById('armory-container');c.innerHTML='';
  WEAPONS_DATA.forEach(wd=>{
    const tier=getWeaponTier(wd.habitId);
    const completions=countHabitCompletions(wd.habitId);
    const active=tier>0?wd.tiers[tier-1]:null;
    const nextTier=wd.tiers.find(t=>completions<t.threshold);
    const pct=nextTier?Math.min((completions/nextTier.threshold)*100,100):100;

    // Build tier slots HTML
    let tiersHTML='';
    wd.tiers.forEach(t=>{
      const isUnlocked=tier>=t.tier,isActive=tier===t.tier;
      if(t.image){
        // Image-based tier slot
        tiersHTML+=`<div class="weapon-tier-slot ${isActive?'active':isUnlocked?'unlocked':'locked'}"
          style="${isActive?'border-color:'+t.rarityColor+';box-shadow:0 0 14px '+t.rarityColor+'50':isUnlocked?'border-color:'+t.rarityColor+'40':''}"
          onclick="showWeaponDetail('${wd.habitId}',${t.tier-1})" title="${t.name} — ${t.threshold} completions">
          <img src="${t.image}" class="weapon-slot-img ${!isUnlocked?'locked-img':''}" alt="${t.name}">
          <div class="weapon-slot-label" style="color:${isUnlocked?t.rarityColor:'#64748b'}">${isUnlocked?t.rarity:'LOCKED'}</div>
        </div>`;
      } else {
        // Emoji tier dot
        tiersHTML+=`<div class="weapon-tier-dot ${isActive?'active':isUnlocked?'unlocked':'locked'}"
          style="${isActive?'border-color:'+t.rarityColor+';box-shadow:0 0 10px '+t.rarityColor+'60':isUnlocked?'border-color:'+t.rarityColor+'80':''}"
          title="${t.name} — ${t.threshold} completions" onclick="showWeaponDetail('${wd.habitId}',${t.tier-1})">
          ${isUnlocked?t.icon:'🔒'}
        </div>`;
      }
    });

    // Active weapon art (if has image)
    const artHTML = active&&active.image
      ? `<div class="weapon-art-row">
           <div class="weapon-art-frame" style="border-color:${active.rarityColor}40">
             <img src="${active.image}" class="weapon-art-img" alt="${active.name}">
             <div class="weapon-art-gradient" style="background:linear-gradient(to right,rgba(5,8,22,.95) 30%,transparent 100%)"></div>
             <div class="weapon-art-info">
               <div class="weapon-prog-name equipped" style="color:${active.rarityColor}">${active.name}</div>
               <div style="font-family:'Orbitron',sans-serif;font-size:.55rem;letter-spacing:2px;color:${active.rarityColor};margin:4px 0;padding:2px 10px;border:1px solid ${active.rarityColor};border-radius:20px;display:inline-block">${active.rarity}</div>
             </div>
           </div>
         </div>` : '';

    c.innerHTML+=`<div class="weapon-progression">
      <div class="weapon-prog-header">
        <span class="weapon-prog-icon">${wd.icon}</span>
        <div style="flex:1">
          <div class="weapon-prog-habit">${wd.habitName} · ${wd.lineName}</div>
          ${!active||!active.image?`<div class="weapon-prog-name ${active?'equipped':''}" style="${active?'color:'+active.rarityColor:''}">${active?active.name:'COMPLETE QUESTS TO UNLOCK'}</div>`:''}
        </div>
      </div>
      ${artHTML}
      <div class="weapon-tiers">${tiersHTML}</div>
      ${active?`<div class="weapon-skill-box" style="border-color:${active.rarityColor}30;background:${active.rarityColor}08;margin-top:12px">
        <div class="weapon-skill-name" style="color:${active.rarityColor}">${active.icon} ${active.skill}</div>
        <div class="weapon-skill-desc">${active.skillDesc}</div>
      </div>`:''}
      <div class="weapon-prog-bar-wrap" style="margin-top:10px"><div class="weapon-prog-bar-fill" style="width:${pct}%;background:${active?active.rarityColor:'#3b82f6'}"></div></div>
      <div class="weapon-completions">${completions} completions completed · Next: <span>${nextTier?nextTier.threshold+'× → '+nextTier.name:'ALL TIERS UNLOCKED ✓'}</span></div>
    </div>`;
  });
}
function showWeaponDetail(habitId,tierIdx){
  const wd=WEAPONS_DATA.find(w=>w.habitId===habitId);if(!wd)return;
  const w=wd.tiers[tierIdx];if(!w)return;
  const isUnlocked=getWeaponTier(habitId)>=w.tier;
  if(!isUnlocked){toast('WEAPON LOCKED — complete '+w.threshold+'× '+wd.habitName+' to unlock '+w.name);return;}
  // If weapon has image, show a richer modal
  if(w.image){
    openWeaponModal(w,wd);return;
  }
  showSystemNotif(w.icon,w.name,`Rarity: ${w.rarity}\nSkill: ${w.skill}\n\n${w.skillDesc}`,false);
}
function openWeaponModal(w,wd){
  const bg=document.getElementById('weapon-drop-bg');
  document.getElementById('wd-rarity').textContent=w.rarity;
  document.getElementById('wd-rarity').style.color=w.rarityColor;
  document.getElementById('wd-icon').textContent='';
  // Show weapon image inside the modal icon area
  let imgEl=document.getElementById('wd-art-img');
  if(!imgEl){imgEl=document.createElement('img');imgEl.id='wd-art-img';imgEl.className='wd-art-img';
    document.getElementById('wd-icon').parentNode.insertBefore(imgEl,document.getElementById('wd-icon'));}
  imgEl.src=w.image;imgEl.style.display='block';
  document.getElementById('wd-name').textContent=w.name;
  document.getElementById('wd-skill-name').textContent=w.skill;
  document.getElementById('wd-skill-desc').textContent=w.skillDesc;
  // Update button text
  const btn=bg.querySelector('.wd-btn');if(btn)btn.textContent='[ EQUIPPED ]';
  bg.classList.add('open');
}

function renderBosses(){
  const c=document.getElementById('boss-grid');c.innerHTML='';
  BOSSES.forEach(boss=>{
    const isActive=S.level>=boss.level;
    const isDefeated=S.bossDefeated.includes(boss.id);
    const isLocked=!isActive&&!isDefeated;
    const progress=isDefeated?boss.hpRequired:(S.bossProgress[boss.id]||0);
    const hpPct=Math.min((progress/boss.hpRequired)*100,100);
    const hpRemain=isDefeated?0:boss.hpRequired-progress;
    const tc=boss.themeColor||'#f87171';
    const gc=boss.glowColor||'rgba(248,113,113,0.5)';
    let stateClass='boss-locked';
    if(isDefeated)stateClass='boss-defeated';
    else if(isActive)stateClass='boss-active';
    const abilitiesHTML=boss.abilities.map(a=>`
      <div class="boss-ability-row" style="border-left-color:${tc}60">
        <span class="boss-ability-dot" style="background:${tc}"></span>
        <span class="boss-ability-text">${a}</span>
      </div>`).join('');
    const div=document.createElement('div');
    div.className=`boss-card-epic ${stateClass}`;
    div.style.cursor='pointer';
    div.onclick=()=>openBossModal(boss.id);
    div.style.setProperty('--boss-color',tc);
    div.style.setProperty('--boss-glow',gc);
    div.innerHTML=`
      <div class="boss-art-wrap ${isLocked?'boss-art-locked':''}">
        ${boss.image?`<img src="${boss.image}" class="boss-art-img" alt="${boss.name}">`:`<div class="boss-art-placeholder">${boss.icon}</div>`}
        <div class="boss-art-vignette"></div>
        ${isActive&&!isDefeated?'<div class="boss-active-pulse"></div>':''}
        ${isDefeated?`<div class="boss-defeated-overlay"><div class="boss-vanquished-text">VANQUISHED</div><div class="boss-vanquished-check">✓</div></div>`:''}
        ${isLocked?`<div class="boss-locked-overlay"><div class="boss-locked-text">⚔ LEVEL ${boss.level} REQUIRED</div></div>`:''}
        <div class="boss-art-badges">
          <span class="boss-level-pill" style="border-color:${tc};color:${tc}">LV.${boss.level} BOSS</span>
          ${isDefeated?`<span class="boss-status-pill defeated">✓ DEFEATED</span>`:
            isActive?`<span class="boss-status-pill active">▶ RAID ACTIVE</span>`:
            `<span class="boss-status-pill locked">◼ LOCKED</span>`}
        </div>
        <div class="boss-nameplate">
          <div class="boss-epic-name" style="text-shadow:0 0 20px ${tc}">${boss.name}</div>
          <div class="boss-epic-species">${boss.species}</div>
        </div>
      </div>
      <div class="boss-card-body">
        <div class="boss-lore-text">${boss.lore}</div>
        <div class="boss-section-label" style="color:${tc}">◈ BOSS ABILITIES</div>
        <div class="boss-abilities-list">${abilitiesHTML}</div>
        <div class="boss-hp-section">
          <div class="boss-hp-header">
            <span class="boss-hp-label-txt" style="color:${tc}">${isDefeated?'COMBAT TERMINATED':'BOSS HP'}</span>
            <span class="boss-hp-counter" style="color:${isDefeated?'#4ade80':tc}">${isDefeated?'0 / '+boss.hpRequired:'HP: '+hpRemain+' / '+boss.hpRequired}</span>
          </div>
          <div class="boss-hp-track">
            <div class="boss-hp-bar" style="width:${isDefeated?0:100-hpPct}%;background:linear-gradient(90deg,${tc},${tc}cc)"></div>
          </div>
          ${isDefeated?`<div class="boss-hp-track boss-hp-complete"></div>`:''}
          ${isActive&&!isDefeated?`<div class="boss-dmg-hint">⚔ Each habit completion deals 1 damage to this boss</div>`:''}
        </div>
        <div class="boss-reward-row" style="border-color:${tc}30;background:${tc}08">
          <span class="boss-reward-label" style="color:${tc}">🏆 REWARD</span>
          <span class="boss-reward-text">${boss.reward}</span>
        </div>
      </div>`;
    c.appendChild(div);
  });
}

function toggleGateDay(dKey, wk){
  if(!S.completedGates[wk]) S.completedGates[wk]={days:[],rank:''};
  const gate=S.completedGates[wk];
  const idx=gate.days.indexOf(dKey);
  if(idx>=0){ gate.days.splice(idx,1); }
  else { gate.days.push(dKey); }
  const dc=gate.days.length;
  if(dc>=7)gate.rank='S';
  else if(dc>=5)gate.rank='A';
  else if(dc>=3)gate.rank='B';
  else if(dc>0)gate.rank='C';
  else gate.rank='';
  S.totalDaysCompleted=Object.keys(S.habitData).filter(ds=>isDayActive(ds)).length;
  recalcStreak();saveState();renderGates();renderSidebar();renderHeader();
  if(typeof playUIClick==='function') playUIClick();
  toast(idx>=0 ? '📅 Day removed' : '✅ Day marked complete');
}
function renderGates(){
  const c=document.getElementById('gates-grid');c.innerHTML='';
  const today=todayKey(),currWk=getWeekKey(today),currYear=parseInt(today.split('-')[0]);
  for(let yr=2026;yr<=2028;yr++){
    // Generate all ISO weeks for this year
    const weeks=[];
    const d=new Date(yr,0,1);
    while(true){
      const dKey=d.toISOString().split('T')[0];
      const wk=getWeekKey(dKey);
      const wkYr=parseInt(wk.split('-W')[0]);
      if(wkYr>yr)break;
      if(wkYr===yr&&!weeks.includes(wk))weeks.push(wk);
      d.setDate(d.getDate()+7);
      if(d.getFullYear()>yr+1)break;
    }
    weeks.sort();
    const clearedCount=weeks.filter(wk=>(S.completedGates[wk]||{}).days?.length>=7).length;
    const isCurrentYear=yr===currYear;
    const expanded=yr<=currYear;
    let cardsHTML='';
    weeks.forEach(wk=>{
      const gate=S.completedGates[wk]||{days:[],rank:''};
      const isActive=wk===currWk;
      const daysDone=gate.days?gate.days.length:0,pct=(daysDone/7)*100;
      let rc='#94a3b8';
      if(gate.rank==='S')rc='#fbbf24';else if(gate.rank==='A')rc='#fb923c';
      else if(gate.rank==='B')rc='#c084fc';else if(gate.rank==='C')rc='#60a5fa';
      const [wkYr,wkNum]=wk.split('-W');
      const jan4=new Date(parseInt(wkYr),0,4);
      const startDate=new Date(jan4.getTime()+((parseInt(wkNum)-1)*7-(jan4.getDay()||7)+1)*86400000);
      let dotsHTML='',isFutureWeek=true;
      for(let i=0;i<7;i++){
        const dd=new Date(startDate);dd.setDate(startDate.getDate()+i);
        const dKey=dd.toISOString().split('T')[0];
        const isDone=gate.days&&gate.days.includes(dKey);
        const isToday2=dKey===today,isFutDay=dKey>today,isPast=dKey<today&&!isDone;
        if(!isFutDay)isFutureWeek=false;
        const dc=isDone?'complete':isToday2?'today':isPast?'missed':isFutDay?'future':'';
        const isPastClickable=dKey<today||isToday2;
        const dotClick=isPastClickable?`onclick="toggleGateDay('${dKey}','${wk}')" title="Toggle day"`:'';
        dotsHTML+=`<div class="gate-dot ${dc}${isPastClickable?' gate-dot-clickable':''}" ${dotClick}>${WEEK_DAYS[i].charAt(0)}</div>`;
      }
      const cleared=daysDone>=7;
      const statusLabel=isActive?'ACTIVE':cleared?'CLEARED':isFutureWeek?'UPCOMING':'ENDED';
      const rankBadge=gate.rank&&gate.rank!==''?
        `<span class="gate-rank-badge" style="color:${rc};border-color:${rc}80">${gate.rank}-RANK</span>`:
        `<span class="gate-rank-badge" style="color:#64748b;border-color:#64748b40">${isActive?'IN PROGRESS':isFutureWeek?'UPCOMING':'INCOMPLETE'}</span>`;
      const cardId=wk===currWk?' id="current-gate-card"':'';
      cardsHTML+=`<div class="gate-card${isActive?' active-gate':''}${cleared?' cleared-gate':''}${isFutureWeek?' future-gate':''}"${cardId}>
        <div class="gate-card-header"><span class="gate-card-title">GATE ${wk}</span>${rankBadge}</div>
        <div class="gate-week-dots">${dotsHTML}</div>
        <div class="gate-bar-wrap"><div class="gate-bar-fill" style="width:${pct}%"></div></div>
        <div class="gate-footer">
          <span class="gate-footer-text"><span>${daysDone}</span>/7 days</span>
          <span class="gate-footer-text">${statusLabel}</span>
        </div></div>`;
    });
    c.innerHTML+=`<div class="gate-year-section">
      <div class="gate-year-header" onclick="toggleYearSection(${yr})">
        <span class="gate-year-label">${yr}</span>
        <span class="gate-year-stats">${clearedCount} cleared · ${weeks.length} weeks</span>
        <span class="gate-year-chevron" id="gate-chevron-${yr}">${expanded?'▼':'▶'}</span>
      </div>
      <div class="gate-year-body" id="gate-body-${yr}" style="${expanded?'':'display:none'}">
        <div class="gate-year-grid">${cardsHTML}</div>
      </div></div>`;
  }
  setTimeout(()=>{const el=document.getElementById('current-gate-card');if(el)el.scrollIntoView({behavior:'smooth',block:'center'});},150);
}
function toggleYearSection(yr){
  const body=document.getElementById('gate-body-'+yr);
  const chev=document.getElementById('gate-chevron-'+yr);
  if(!body)return;
  const hidden=body.style.display==='none';
  body.style.display=hidden?'':'none';
  if(chev)chev.textContent=hidden?'▼':'▶';
  if(typeof playUINav==='function')playUINav();
}



function renderCalendar(){
  // Heatmap — last 90 days
  const grid=document.getElementById('heatmap-grid');
  if(grid){
    grid.innerHTML='';
    for(let i=89;i>=0;i--){
      const d=new Date();d.setDate(d.getDate()-i);
      const key=d.toISOString().split('T')[0];
      const pct=getDayCompletion(key);
      let val=0;
      if(pct>0)val=1;
      if(pct>=0.25)val=2;
      if(pct>=0.5)val=3;
      if(pct>=0.75)val=4;
      if(pct>=1)val=5;
      const cell=document.createElement('div');
      cell.className='heatmap-cell';
      cell.dataset.val=val;
      cell.title=key+': '+(Math.round(pct*100))+'%';
      grid.appendChild(cell);
    }
  }
  // Stats table
  const rank=getRank(S.level);
  const el=id=>document.getElementById(id);
  if(el('cal-level'))el('cal-level').textContent=S.level;
  if(el('cal-rank'))el('cal-rank').textContent=rank.label;
  if(el('cal-total-xp'))el('cal-total-xp').textContent=(S.totalXPEarned||0)+' XP';
  if(el('cal-days'))el('cal-days').textContent=S.totalDaysCompleted||0;
  if(el('cal-streak'))el('cal-streak').textContent=S.streak||0;
  if(el('cal-longest'))el('cal-longest').textContent=S.longestStreak||0;
  if(el('cal-shadows'))el('cal-shadows').textContent=(S.unlockedCreatures||[]).length+'/'+CREATURES.length;
  if(el('cal-floors'))el('cal-floors').textContent=(S.storyProgress||0)+'/30';
  // Draw radar
  setTimeout(drawRadarChart,50);
}
function drawRadarChart(){
  const canvas=document.getElementById('stats-radar');
  if(!canvas||!canvas.getContext)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height,cx=W/2,cy=H/2,r=Math.min(W,H)/2-36;
  const stats=['STR','INT','AGI','VIT','SEN'];
  const colors=['#ef4444','#3b82f6','#22c55e','#a855f7','#f59e0b'];
  const maxVal=Math.max(10,...stats.map(s=>S.stats[s]||1));
  ctx.clearRect(0,0,W,H);
  // Grid rings
  for(let ring=1;ring<=5;ring++){
    ctx.beginPath();
    stats.forEach((s,i)=>{
      const angle=(Math.PI*2*i/stats.length)-Math.PI/2;
      const rr=r*(ring/5);
      const x=cx+Math.cos(angle)*rr,y=cy+Math.sin(angle)*rr;
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    });
    ctx.closePath();ctx.strokeStyle='rgba(139,92,246,0.15)';ctx.lineWidth=1;ctx.stroke();
  }
  // Axes
  stats.forEach((s,i)=>{
    const angle=(Math.PI*2*i/stats.length)-Math.PI/2;
    ctx.beginPath();ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r);
    ctx.strokeStyle='rgba(139,92,246,0.25)';ctx.lineWidth=1;ctx.stroke();
  });
  // Filled polygon
  ctx.beginPath();
  stats.forEach((s,i)=>{
    const val=Math.min(S.stats[s]||1,maxVal);
    const angle=(Math.PI*2*i/stats.length)-Math.PI/2;
    const rr=r*(val/maxVal);
    const x=cx+Math.cos(angle)*rr,y=cy+Math.sin(angle)*rr;
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  });
  ctx.closePath();
  ctx.fillStyle='rgba(124,58,237,0.18)';ctx.fill();
  ctx.strokeStyle='#7c3aed';ctx.lineWidth=2;ctx.stroke();
  // Points + labels
  stats.forEach((s,i)=>{
    const val=Math.min(S.stats[s]||1,maxVal);
    const angle=(Math.PI*2*i/stats.length)-Math.PI/2;
    const rr=r*(val/maxVal);
    const x=cx+Math.cos(angle)*rr,y=cy+Math.sin(angle)*rr;
    ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fillStyle=colors[i];ctx.fill();
    const lx=cx+Math.cos(angle)*(r+24),ly=cy+Math.sin(angle)*(r+24);
    ctx.fillStyle=colors[i];ctx.font='bold 11px monospace';
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(s+' '+(S.stats[s]||1),lx,ly);
  });
}
function renderAchievements(){
  const c=document.getElementById('achievements-grid');if(!c)return;
  const count=S.achievements.length;
  const el=document.getElementById('ach-count');
  if(el)el.textContent=count+'/'+ACHIEVEMENTS.length+' UNLOCKED';
  c.innerHTML='';
  ACHIEVEMENTS.forEach(a=>{
    const unlocked=S.achievements.includes(a.id);
    c.innerHTML+=`<div class="ach-card${unlocked?' unlocked':''}">
      <div class="ach-icon">${unlocked?a.icon:'🔒'}</div>
      <div class="ach-body">
        <div class="ach-name">${a.name}</div>
        <div class="ach-desc">${a.desc}</div>
        ${unlocked?`<div class="ach-xp">+${a.xp} XP REWARD</div>`:''}
      </div>
      ${unlocked?'<div class="ach-badge">✓</div>':''}
    </div>`;
  });
}
function showDayComplete(date){
  if(date!==todayKey())return;
  const o=document.getElementById('day-complete-overlay');if(!o)return;
  const data=S.habitData[date]||{};
  const xpBase=S.habits.reduce((s,h)=>s+(data[h.id]?h.xp:0),0);
  const mult=getStreakMultiplier();const crB=getCreatureXPBonus();
  const xpTotal=Math.round(xpBase*mult*(1+crB));
  document.getElementById('dc-streak').textContent=S.streak+' DAY STREAK';
  document.getElementById('dc-xp').textContent='+'+xpTotal+' XP EARNED';
  document.getElementById('dc-mult').textContent=mult>1?'🔥 '+mult+'x STREAK BONUS ACTIVE':'';
  document.getElementById('dc-creature').textContent=crB>0?'🐉 +'+(Math.round(crB*100))+'% ARMY BONUS':'';
  o.classList.add('open');
  if(typeof playLevelUp==='function')playLevelUp();
  setTimeout(()=>closeDayComplete(),5000);
}
function closeDayComplete(){const o=document.getElementById('day-complete-overlay');if(o)o.classList.remove('open');}
function checkWeeklyRecap(){
  const today=todayKey();
  const d=new Date(today+'T00:00:00');d.setDate(d.getDate()-7);
  const lastWeek=getWeekKey(d.toISOString().split('T')[0]);
  if(S.lastRecapWeek===lastWeek)return;
  const gate=S.completedGates[lastWeek];
  if(!gate||!gate.days||gate.days.length===0){S.lastRecapWeek=lastWeek;saveState();return;}
  S.lastRecapWeek=lastWeek;saveState();
  const daysDone=gate.days.length;
  const tasksTotal=gate.days.reduce((sum,dKey)=>{
    const dd=S.habitData[dKey]||{};
    return sum+getHabitsForDate(dKey).filter(h=>dd[h.id]).length;
  },0);
  // Build scores across every habit seen that week (per-day aware)
  const scores={};const allWeekHabits=new Map();
  gate.days.forEach(dKey=>{getHabitsForDate(dKey).forEach(h=>{if(!allWeekHabits.has(h.id))allWeekHabits.set(h.id,h);});});
  allWeekHabits.forEach((h,hid)=>{scores[hid]=gate.days.filter(dKey=>S.habitData[dKey]&&S.habitData[dKey][hid]).length;});
  const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const best=allWeekHabits.get(sorted[0]?.[0]);
  const worst=allWeekHabits.get(sorted[sorted.length-1]?.[0]);
  setTimeout(()=>showWeeklyRecap(lastWeek,daysDone,tasksTotal,best,worst,gate.rank),1200);
}
function showWeeklyRecap(week,daysDone,tasks,best,worst,rank){
  const o=document.getElementById('weekly-recap-overlay');if(!o)return;
  document.getElementById('wr-week').textContent='WEEK '+week;
  document.getElementById('wr-days').textContent=daysDone+'/7 days completed';
  document.getElementById('wr-tasks').textContent=tasks+' total tasks done';
  document.getElementById('wr-rank').textContent=rank?rank+'-RANK GATE':'GATE INCOMPLETE';
  document.getElementById('wr-best').textContent=best?best.icon+' '+best.name+' (best)':'-';
  document.getElementById('wr-worst').textContent=worst?worst.icon+' '+worst.name+' (needs work)':'-';
  o.classList.add('open');
  if(typeof playUISuccess==='function')playUISuccess();
}
function closeWeeklyRecap(){const o=document.getElementById('weekly-recap-overlay');if(o)o.classList.remove('open');}
function toggleSidebar(){
  const sidebar=document.getElementById('game-sidebar')||document.querySelector('.game-sidebar');
  const overlay=document.getElementById('sidebar-overlay');
  if(!sidebar)return;
  const isOpen=sidebar.classList.contains('sidebar-open');
  if(isOpen){
    sidebar.classList.remove('sidebar-open');
    if(overlay)overlay.classList.remove('active');
    document.body.style.overflow='';
  } else {
    sidebar.classList.add('sidebar-open');
    if(overlay)overlay.classList.add('active');
    document.body.style.overflow='hidden';
  }
}
function renderAll(){
  renderHeader();renderSidebar();
  const active=document.querySelector('.tab-panel.active');
  const id=active?active.id:'';
  if(id==='tab-quests')renderQuests();
  if(id==='tab-ascension')renderAscension();
  if(id==='tab-army'){if(armySubView==='all')renderBestiary();else renderMyArmy();}
  if(id==='tab-armory')renderArmory();
  if(id==='tab-bosses')renderBosses();
  if(id==='tab-gates')renderGates();
  if(id==='tab-calendar')renderCalendar();if(id==='tab-achievements')renderAchievements();
}
function switchTab(tabId){if(typeof playUINav==='function')playUINav();{const s=document.querySelector('.game-sidebar');const o=document.getElementById('sidebar-overlay');if(s&&s.classList.contains('sidebar-open')){s.classList.remove('sidebar-open');if(o)o.classList.remove('active');document.body.style.overflow='';}};
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelector('[data-tab="'+tabId+'"]').classList.add('active');
  document.getElementById(tabId).classList.add('active');
  if(tabId==='tab-quests')renderQuests();
  if(tabId==='tab-ascension')renderAscension();
  if(tabId==='tab-army'){renderBestiary();switchArmyView('all');}
  if(tabId==='tab-armory')renderArmory();
  if(tabId==='tab-bosses')renderBosses();
  if(tabId==='tab-gates')renderGates();if(tabId==='tab-achievements')renderAchievements();
  if(tabId==='tab-calendar')renderCalendar();
}

// INTRO
const INTRO_LINES=[
  '> ANOMALY DETECTED. SCANNING...',
  '> PATTERN CONFIRMED: HUMAN. COGNITIVE SIGNATURE UNIQUE.',
  '> RUNNING GAP ANALYSIS — CURRENT OUTPUT vs POSSIBLE OUTPUT.',
  '> WARNING: THE GAP IS SIGNIFICANT.',
  '> ROOT CAUSE: ENTROPY. DISTRACTION. COMFORT MISTAKEN FOR IDENTITY.',
  '> THIS IS NOT A FLAW. THIS IS A STARTING CONDITION.',
  '> HAKAI PROTOCOL — ACTIVATING.',
  '> HAKAI: TO BREAK. TO DESTROY WHAT LIMITS YOU.',
  '> THE SYSTEM DOES NOT GRANT POWER.',
  '> IT REVEALS WHAT WAS ALWAYS THERE.',
  '> HUNTER DESIGNATION REQUIRED.',
  '> PROCEED.',
];
let introIdx=0,introTyping=false,typeInterval=null;
function typewriterLine(text,el,cb){
  el.innerHTML='';introTyping=true;let i=0;clearInterval(typeInterval);
  typeInterval=setInterval(()=>{
    el.innerHTML=text.slice(0,i+1)+'<span class="blink"> </span>';i++;
    if(i>=text.length){clearInterval(typeInterval);introTyping=false;setTimeout(cb,900);}
  },45);
}
function nextIntroLine(){
  if(introTyping){clearInterval(typeInterval);introTyping=false;
    document.getElementById('intro-lines').innerHTML=INTRO_LINES[introIdx]+'<span class="blink"> </span>';return;}
  introIdx++;
  if(introIdx>=INTRO_LINES.length){goToSelect();return;}
  const el=document.getElementById('intro-lines');
  typewriterLine(INTRO_LINES[introIdx],el,()=>{
    if(introIdx>=INTRO_LINES.length-1)document.getElementById('intro-btn-row').style.opacity='1';
    else nextIntroLine();
  });
}
function startIntro(){introIdx=0;typewriterLine(INTRO_LINES[0],document.getElementById('intro-lines'),()=>nextIntroLine());}
function skipIntro(){clearInterval(typeInterval);goToSelect();}
function goToSelect(){
  const intro=document.getElementById('screen-intro');
  intro.style.transition='opacity .5s ease';intro.style.opacity='0';
  setTimeout(()=>{intro.style.display='none';
    if(S.playerName)showGame();else document.getElementById('screen-select').classList.add('visible');
  },500);
}
function selectChar(name){
  S.playerName=name;saveState();
  const sel=document.getElementById('screen-select');
  sel.style.transition='opacity .5s ease';sel.style.opacity='0';
  setTimeout(()=>{sel.style.display='none';showGame();
    setTimeout(()=>showSystemNotif('⚔️','HUNTER REGISTRATION COMPLETE',
      'Welcome, '+CHARS[name].displayName+'.\nRank: E-RANK\nComplete daily quests to ascend.\nThe protocol has begun.'),800);
  },500);
}
function showGame(){
  document.getElementById('screen-game').classList.add('visible');
  checkCreatureUnlocks();renderAll();switchTab('tab-quests');
}
function exportProgress(){if(typeof playUISuccess==='function')playUISuccess();
  const blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download='hakai_v2_backup_'+todayKey()+'.json';a.click();toast('PROGRESS EXPORTED');
}
function importProgress(file){
  const r=new FileReader();
  r.onload=()=>{try{S=JSON.parse(r.result);saveState();location.reload();}catch(e){toast('IMPORT FAILED');}};
  r.readAsText(file);
}
function selectChar_reset(){
  S.playerName=null;saveState();
  document.getElementById('screen-game').classList.remove('visible');
  const sel=document.getElementById('screen-select');sel.style.opacity='1';sel.style.display='';sel.classList.add('visible');
}



/* ═══════════════════════════════════════════════
   LAUNCH CINEMATIC — runs every time on open
═══════════════════════════════════════════════ */
function showLaunchCinematic(onComplete){
  const returning = !!(S && S.playerName);
  const name = returning ? S.playerName : null;
  const level = returning ? (S.level||1) : null;
  const streak = returning ? (S.streak||0) : null;
  const rank = returning ? getRank(S.level||1).label : null;

  const todayStr = new Date().toDateString();
  const lastCin = localStorage.getItem('hakai_cin_date');
  const fastMode = (lastCin === todayStr);
  localStorage.setItem('hakai_cin_date', todayStr);

  // Inject styles
  const style = document.createElement('style');
  style.id = 'cin-style';
  style.textContent = `
    #cin{position:fixed;inset:0;z-index:99999;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;cursor:pointer;}
    #cin canvas{position:absolute;inset:0;width:100%;height:100%;opacity:.18;}
    #cin-inner{position:relative;z-index:2;text-align:center;width:100%;max-width:700px;padding:0 24px;}
    #cin-boot{font-family:'Share Tech Mono',monospace;font-size:.72rem;color:rgba(100,220,255,.6);letter-spacing:2px;min-height:80px;text-align:left;margin:0 auto 28px;max-width:420px;white-space:pre-wrap;}
    #cin-logo{font-family:'Orbitron',sans-serif;font-size:clamp(2.2rem,8vw,4.8rem);font-weight:900;letter-spacing:.15em;color:#fff;text-shadow:0 0 40px rgba(109,40,217,.8),0 0 80px rgba(109,40,217,.3);opacity:0;transform:scale(.92);transition:opacity .5s ease,transform .5s ease;}
    #cin-logo.show{opacity:1;transform:scale(1);}
    #cin-logo.glitch{animation:cGlitch .4s steps(2,end);}
    #cin-sub{font-family:'Orbitron',sans-serif;font-size:clamp(.5rem,2vw,.75rem);letter-spacing:.35em;color:rgba(109,40,217,.7);margin-top:10px;opacity:0;transition:opacity .6s ease .2s;}
    #cin-sub.show{opacity:1;}
    #cin-welcome{font-family:'Share Tech Mono',monospace;font-size:.8rem;color:rgba(245,158,11,.9);letter-spacing:2px;margin-top:32px;min-height:28px;opacity:0;transition:opacity .4s ease;}
    #cin-welcome.show{opacity:1;}
    #cin-bar-wrap{width:280px;height:3px;background:rgba(109,40,217,.18);border-radius:2px;margin:28px auto 0;overflow:hidden;opacity:0;transition:opacity .3s ease;}
    #cin-bar-wrap.show{opacity:1;}
    #cin-bar{height:100%;width:0%;background:linear-gradient(90deg,#6d28d9,#f59e0b);border-radius:2px;transition:width 1.4s cubic-bezier(.4,0,.2,1);}
    #cin-bar.full{width:100%;}
    #cin-skip{position:absolute;bottom:28px;right:32px;font-family:'Orbitron',sans-serif;font-size:.42rem;letter-spacing:2px;color:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.1);padding:6px 14px;border-radius:2px;transition:.2s;}
    #cin-skip:hover{color:rgba(255,255,255,.5);border-color:rgba(255,255,255,.3);}
    #cin-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;transition:opacity .12s ease;}
    #cin-gate{position:absolute;inset:0;z-index:10;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35);}
    #cin-gate span{font-family:'Orbitron',sans-serif;font-size:.55rem;letter-spacing:3px;color:rgba(255,255,255,.65);border:1px solid rgba(109,40,217,.5);padding:14px 26px;border-radius:4px;animation:cGatePulse 1.3s ease-in-out infinite;background:rgba(10,5,20,.5);}
    @keyframes cGatePulse{0%,100%{opacity:.55;box-shadow:0 0 0 rgba(109,40,217,0);}50%{opacity:1;box-shadow:0 0 20px rgba(109,40,217,.35);}}
    @keyframes cGlitch{
      0%{text-shadow:2px 0 #f59e0b,-2px 0 #6d28d9,0 0 40px rgba(109,40,217,.8);clip-path:inset(10% 0 80% 0);}
      25%{text-shadow:-2px 0 #f59e0b,2px 0 #6d28d9,0 0 40px rgba(109,40,217,.8);clip-path:inset(60% 0 10% 0);}
      50%{text-shadow:2px 0 #f59e0b,-2px 0 #6d28d9,0 0 40px rgba(109,40,217,.8);clip-path:inset(30% 0 50% 0);}
      75%{text-shadow:-2px 0 #f59e0b,2px 0 #6d28d9,0 0 40px rgba(109,40,217,.8);clip-path:inset(0% 0 0% 0);}
      100%{text-shadow:0 0 40px rgba(109,40,217,.8),0 0 80px rgba(109,40,217,.3);clip-path:none;}
    }
  `;
  document.head.appendChild(style);

  // Build overlay
  const cin = document.createElement('div');
  cin.id = 'cin';
  cin.innerHTML = `
    <canvas id="cin-canvas"></canvas>
    <div id="cin-inner">
      <div id="cin-boot"></div>
      <div id="cin-logo">HAKAI<br>PROTOCOL</div>
      <div id="cin-sub">BREAK WHAT LIMITS YOU &nbsp;·&nbsp; BECOME WHAT REMAINS</div>
      <div id="cin-welcome"></div>
      <div id="cin-bar-wrap"><div id="cin-bar"></div></div>
    </div>
    <div id="cin-skip">[ SKIP ]</div>
    <div id="cin-flash"></div>
  `;
  document.body.appendChild(cin);

  // Particle canvas
  const canvas = document.getElementById('cin-canvas');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const ctx2 = canvas.getContext('2d');
  const particles = Array.from({length:60},()=>({
    x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
    r:Math.random()*1.5+.5,
    color:Math.random()>.5?'rgba(109,40,217,':'rgba(245,158,11,'
  }));
  let animFrame;
  function drawParticles(){
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    ctx2.strokeStyle='rgba(109,40,217,.06)';ctx2.lineWidth=1;
    for(let x=0;x<canvas.width;x+=40){ctx2.beginPath();ctx2.moveTo(x,0);ctx2.lineTo(x,canvas.height);ctx2.stroke();}
    for(let y=0;y<canvas.height;y+=40){ctx2.beginPath();ctx2.moveTo(0,y);ctx2.lineTo(canvas.width,y);ctx2.stroke();}
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;
      if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;
      ctx2.beginPath();ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx2.fillStyle=p.color+'.7)';ctx2.fill();
    });
    animFrame=requestAnimationFrame(drawParticles);
  }
  drawParticles();

  function typeInto(el,text,speed,done){
    let i=0;el.textContent='';
    const iv=setInterval(()=>{
      el.textContent+=text[i++];
      if(i>=text.length){clearInterval(iv);if(done)done();}
    },speed);
    return iv;
  }

  let completed=false;
  function enterGame(){
    if(completed)return;completed=true;
    cancelAnimationFrame(animFrame);
    const flash=document.getElementById('cin-flash');
    flash.style.opacity='1';
    setTimeout(()=>{
      cin.style.opacity='0';cin.style.transition='opacity .5s ease';
      setTimeout(()=>{
        cin.remove();document.getElementById('cin-style').remove();
        onComplete();
      },500);
    },120);
  }

  cin.addEventListener('click',enterGame);

  const logo=document.getElementById('cin-logo');
  const sub=document.getElementById('cin-sub');
  const wel=document.getElementById('cin-welcome');
  const barW=document.getElementById('cin-bar-wrap');
  const bar=document.getElementById('cin-bar');
  const bootEl=document.getElementById('cin-boot');

  const welcomeLine = returning
    ? '> WELCOME BACK, '+name+' · LV '+level+' '+rank+' · STREAK '+streak+' DAYS'
    : '> HUNTER DESIGNATION REQUIRED. CHOOSE YOUR ARCHETYPE.';

  function beginSequence(){
    if(!fastMode&&typeof playCinematicHum==='function')playCinematicHum();
    if(fastMode){
      // FAST REPLAY — same-day reopen: quick logo flash, no boot lines
      const skipBtn=document.getElementById('cin-skip');if(skipBtn)skipBtn.style.display='none';
      logo.classList.add('show');
      setTimeout(()=>{
        logo.classList.add('glitch');
        if(typeof playCinematicStinger==='function')playCinematicStinger();
      },150);
      setTimeout(()=>sub.classList.add('show'),350);
      setTimeout(()=>{
        wel.classList.add('show');
        wel.textContent=welcomeLine;
        if(typeof playCinematicWhoosh==='function')playCinematicWhoosh();
        barW.classList.add('show');
        setTimeout(()=>bar.classList.add('full'),60);
        setTimeout(enterGame,900);
      },550);
      return;
    }

    // FULL CINEMATIC — first open of the day
    const lines=[
      '> HAKAI PROTOCOL — INITIALIZATION SEQUENCE',
      returning
        ? '> HUNTER FILE DETECTED. LOADING PROFILE...'
        : '> NO HUNTER FILE FOUND. FIRST-TIME REGISTRATION REQUIRED.',
      '> CALIBRATING NEURAL INTERFACE...',
      '> SYSTEM READY.',
    ];

    let lineIdx=0;
    function nextLine(){
      if(lineIdx>=lines.length){
        logo.classList.add('show');
        setTimeout(()=>{
          logo.classList.add('glitch');
          if(typeof playCinematicStinger==='function')playCinematicStinger();
        },400);
        setTimeout(()=>sub.classList.add('show'),700);
        setTimeout(()=>{
          wel.classList.add('show');
          if(typeof playCinematicWhoosh==='function')playCinematicWhoosh();
          typeInto(wel,welcomeLine,22,()=>{
            barW.classList.add('show');
            setTimeout(()=>bar.classList.add('full'),80);
            setTimeout(enterGame,1700);
          });
        },1100);
        return;
      }
      const line=lines[lineIdx++];
      typeInto(bootEl,(bootEl.textContent?'\n':'')+line,28,()=>{
        setTimeout(nextLine,220);
      });
    }
    setTimeout(nextLine,200);
  }

  // GATE — wait for a real user gesture so the AudioContext unlocks
  // instantly and the boot hum/stinger play in sync with the visuals
  const gate=document.createElement('div');
  gate.id='cin-gate';
  gate.innerHTML='<span>[ CLICK OR PRESS ANY KEY TO INITIALIZE ]</span>';
  cin.appendChild(gate);
  let gateOpened=false;
  function openGate(e){
    if(gateOpened)return;gateOpened=true;
    if(e&&e.stopPropagation)e.stopPropagation();
    if(typeof unlockAudioContext==='function')unlockAudioContext();
    gate.remove();
    beginSequence();
  }
  gate.addEventListener('click',openGate);
  document.addEventListener('keydown',openGate,{once:true});
}

window.addEventListener('DOMContentLoaded',()=>{
  loadState();recalcStreak();
  // Always hide the old intro screen
  const introEl=document.getElementById('screen-intro');
  if(introEl)introEl.style.display='none';
  // Always play cinematic, then go to game or char select
  showLaunchCinematic(()=>{
    if(S.playerName){showGame();}
    else{const sel=document.getElementById('screen-select');if(sel){sel.style.display='';sel.classList.add('visible');}}
  });
});

/* ═══════════════════════════════════════════════
   FULLSCREEN TOGGLE — small button, top right
   ESC exits fullscreen natively (browser default)
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.createElement('button');
  btn.id='fullscreen-toggle-btn';
  btn.title='Toggle Fullscreen (Esc to exit)';
  btn.textContent='⛶';
  btn.style.cssText='position:fixed;top:12px;right:88px;z-index:9000;'
    +'background:rgba(20,10,40,.85);border:1px solid #3b2060;'
    +'color:#a78bfa;width:34px;height:34px;border-radius:8px;'
    +'cursor:pointer;font-size:16px;display:flex;'
    +'align-items:center;justify-content:center;'
    +'backdrop-filter:blur(6px);transition:all .2s;';
  btn.onmouseenter=()=>btn.style.borderColor='#7c3aed';
  btn.onmouseleave=()=>btn.style.borderColor='#3b2060';
  btn.onclick=()=>{
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen().catch(()=>{});
    }else{
      document.exitFullscreen().catch(()=>{});
    }
  };
  document.body.appendChild(btn);
  document.addEventListener('fullscreenchange',()=>{
    btn.textContent=document.fullscreenElement?'⤢':'⛶';
  });
});
