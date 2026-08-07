// ============================================================
// Clawd Game Panel - Full Game Logic
// ============================================================

// --- Shop Item Definitions ---
const SHOP_ITEMS = [
  // Food
  { id: "bread", name: "Bread", icon: "🍞", type: "food", price: 5, effect: { hunger: 15 }, desc: "Simple and filling" },
  { id: "apple", name: "Apple", icon: "🍎", type: "food", price: 8, effect: { hunger: 12, health: 3 }, desc: "An apple a day..." },
  { id: "cookie", name: "Cookie", icon: "🍪", type: "food", price: 10, effect: { hunger: 10, happiness: 5 }, desc: "Sweet treat" },
  { id: "salad", name: "Salad", icon: "🥗", type: "food", price: 12, effect: { hunger: 14, health: 5 }, desc: "Healthy greens" },
  { id: "pizza", name: "Pizza", icon: "🍕", type: "food", price: 15, effect: { hunger: 25, happiness: 5 }, desc: "Everyone loves pizza" },
  { id: "icecream", name: "Ice Cream", icon: "🍨", type: "food", price: 18, effect: { hunger: 8, happiness: 15 }, desc: "Cool and creamy" },
  { id: "cake", name: "Cake", icon: "🎂", type: "food", price: 20, effect: { hunger: 20, happiness: 10 }, desc: "Party time!" },
  { id: "ramen", name: "Ramen", icon: "🍜", type: "food", price: 25, effect: { hunger: 30, energy: 5 }, desc: "Warm and hearty" },
  { id: "sushi", name: "Sushi", icon: "🍣", type: "food", price: 30, effect: { hunger: 22, health: 8 }, desc: "Fresh and delicious" },
  { id: "steak", name: "Steak", icon: "🥩", type: "food", price: 40, effect: { hunger: 40, energy: 10 }, desc: "Premium cut" },

  // Toys
  { id: "ball", name: "Ball", icon: "⚽", type: "toy", price: 15, effect: { happiness: 15 }, desc: "Bounce around!" },
  { id: "book", name: "Book", icon: "📚", type: "toy", price: 20, effect: { happiness: 10, energy: -5 }, desc: "Knowledge is fun" },
  { id: "kite", name: "Kite", icon: "🪁", type: "toy", price: 25, effect: { happiness: 20, energy: -10 }, desc: "Fly high!" },
  { id: "bowtie", name: "Bowtie", icon: "🎀", type: "toy", price: 25, effect: { happiness: 12 }, desc: "Looking dapper" },
  { id: "puzzle", name: "Puzzle", icon: "🧩", type: "toy", price: 30, effect: { happiness: 18 }, desc: "Brain teaser" },
  { id: "teddy", name: "Teddy Bear", icon: "🧸", type: "toy", price: 40, effect: { happiness: 25 }, desc: "Cuddly friend" },
  { id: "skateboard", name: "Skateboard", icon: "🛹", type: "toy", price: 60, effect: { happiness: 30, energy: -15 }, desc: "Radical!" },
  { id: "guitar", name: "Guitar", icon: "🎸", type: "toy", price: 80, effect: { happiness: 35, energy: -10 }, desc: "Rock on!" },
  { id: "gameconsole", name: "Game Console", icon: "🎮", type: "toy", price: 100, effect: { happiness: 40 }, desc: "Ultimate entertainment" },

  // Seeds
  { id: "carrot_seed", name: "Carrot Seed", icon: "🥕", type: "seed", price: 5, growTime: 30, harvestValue: 12, harvestIcon: "🥕", harvestName: "Carrot", desc: "Grows fast (30s)" },
  { id: "tomato_seed", name: "Tomato Seed", icon: "🍅", type: "seed", price: 8, growTime: 60, harvestValue: 20, harvestIcon: "🍅", harvestName: "Tomato", desc: "Juicy (60s)" },
  { id: "sunflower_seed", name: "Sunflower Seed", icon: "🌻", type: "seed", price: 12, growTime: 90, harvestValue: 30, harvestIcon: "🌻", harvestName: "Sunflower", desc: "Bright (90s)" },
  { id: "strawberry_seed", name: "Strawberry Seed", icon: "🍓", type: "seed", price: 15, growTime: 120, harvestValue: 38, harvestIcon: "🍓", harvestName: "Strawberry", desc: "Sweet (2m)" },
  { id: "pumpkin_seed", name: "Pumpkin Seed", icon: "🎃", type: "seed", price: 20, growTime: 180, harvestValue: 50, harvestIcon: "🎃", harvestName: "Pumpkin", desc: "Big harvest (3m)" },
  { id: "watermelon_seed", name: "Watermelon Seed", icon: "🍉", type: "seed", price: 25, growTime: 240, harvestValue: 65, harvestIcon: "🍉", harvestName: "Watermelon", desc: "Refreshing (4m)" },
  { id: "golden_apple_seed", name: "Golden Apple Seed", icon: "🌟", type: "seed", price: 50, growTime: 300, harvestValue: 120, harvestIcon: "🌟", harvestName: "Golden Apple", desc: "Legendary (5m)" },

  // Tools
  { id: "watering_can", name: "Watering Can", icon: "🚰", type: "tool", price: 10, desc: "Water your plants", uses: 20 },
  { id: "fertilizer", name: "Fertilizer", icon: "💩", type: "tool", price: 15, desc: "Grow 2x faster", uses: 5 },
  { id: "super_fertilizer", name: "Super Fertilizer", icon: "✨", type: "tool", price: 30, desc: "Grow 4x faster", uses: 3 },
  { id: "golden_tools", name: "Golden Tools", icon: "🔱", type: "tool", price: 100, desc: "Infinite watering", uses: 999 },

  // Decorations
  { id: "sunglasses", name: "Sunglasses", icon: "🕶️", type: "decoration", price: 30, effect: { happiness: 5 }, desc: "Cool look" },
  { id: "tophat", name: "Top Hat", icon: "🎩", type: "decoration", price: 50, effect: { happiness: 8 }, desc: "Classy" },
  { id: "cape", name: "Cape", icon: "🩼", type: "decoration", price: 80, effect: { happiness: 12 }, desc: "Heroic style" },
  { id: "crown", name: "Crown", icon: "👑", type: "decoration", price: 200, effect: { happiness: 20 }, desc: "Royalty!" },
];

// --- Achievement Definitions ---
const ACHIEVEMENTS = [
  { id: "first_meal", name: "First Meal", icon: "🍽️", desc: "Feed your pet for the first time", target: 1, stat: "timesFeeding" },
  { id: "first_harvest", name: "First Harvest", icon: "🌾", desc: "Harvest your first crop", target: 1, stat: "totalHarvests" },
  { id: "coin_collector", name: "Coin Collector", icon: "💰", desc: "Accumulate 100 coins", target: 100, stat: "peakCoins" },
  { id: "rich", name: "Rich!", icon: "🤑", desc: "Accumulate 1,000 coins", target: 1000, stat: "peakCoins" },
  { id: "mega_rich", name: "Mega Rich", icon: "💸", desc: "Accumulate 5,000 coins", target: 5000, stat: "peakCoins" },
  { id: "green_thumb", name: "Green Thumb", icon: "🌱", desc: "Harvest 10 crops", target: 10, stat: "totalHarvests" },
  { id: "master_gardener", name: "Master Gardener", icon: "🌺", desc: "Harvest 50 crops", target: 50, stat: "totalHarvests" },
  { id: "happy_pet", name: "Happy Pet", icon: "😄", desc: "Reach 100 happiness", target: 1, stat: "maxHappiness" },
  { id: "healthy_pet", name: "Healthy Pet", icon: "💪", desc: "All stats above 80 at once", target: 1, stat: "allStatsHigh" },
  { id: "game_winner", name: "Game Winner", icon: "🏅", desc: "Win your first mini-game", target: 1, stat: "gamesWon" },
  { id: "game_master", name: "Game Master", icon: "🎮", desc: "Win 10 mini-games", target: 10, stat: "gamesWon" },
  { id: "game_legend", name: "Game Legend", icon: "🔥", desc: "Win 50 mini-games", target: 50, stat: "gamesWon" },
  { id: "shopping_spree", name: "Shopping Spree", icon: "🛒", desc: "Buy 20 items", target: 20, stat: "itemsBought" },
  { id: "big_spender", name: "Big Spender", icon: "💳", desc: "Spend 500 total coins", target: 500, stat: "totalSpent" },
  { id: "level_5", name: "Level 5", icon: "⭐", desc: "Reach level 5", target: 5, stat: "level" },
  { id: "level_10", name: "Level 10", icon: "🌟", desc: "Reach level 10", target: 10, stat: "level" },
  { id: "level_20", name: "Level 20", icon: "💫", desc: "Reach level 20", target: 20, stat: "level" },
  { id: "well_fed", name: "Well Fed", icon: "🤤", desc: "Feed your pet 25 times", target: 25, stat: "timesFeeding" },
  { id: "playful", name: "Playful", icon: "🤹", desc: "Play with your pet 20 times", target: 20, stat: "timesPlaying" },
  { id: "clean_freak", name: "Clean Freak", icon: "🧼", desc: "Clean your pet 15 times", target: 15, stat: "timesCleaning" },
  { id: "click_champion", name: "Click Champion", icon: "👆", desc: "Score 50+ in Click Frenzy", target: 1, stat: "clickChampion" },
  { id: "perfect_memory", name: "Perfect Memory", icon: "🧠", desc: "Win Memory Match in under 12 moves", target: 1, stat: "perfectMemory" },
  { id: "seed_collector", name: "Seed Collector", icon: "🌰", desc: "Plant 30 seeds", target: 30, stat: "totalPlanted" },
  { id: "dedicated", name: "Dedicated", icon: "❤️", desc: "Perform 100 total actions", target: 100, stat: "totalActions" },
];

// --- Mini-Game Definitions ---
const MINI_GAMES = [
  { id: "click_frenzy", name: "Click Frenzy", icon: "👆", desc: "Click as fast as you can!", reward: "1 coin per 5 clicks" },
  { id: "memory_match", name: "Memory Match", icon: "🧠", desc: "Match the emoji pairs", reward: "Up to 30 coins" },
  { id: "rps", name: "Rock Paper Scissors", icon: "✊", desc: "Best of 5 rounds", reward: "Up to 10 coins" },
  { id: "catch_game", name: "Catch Game", icon: "🦋", desc: "Catch falling items!", reward: "2 coins per catch" },
  { id: "number_guess", name: "Number Guess", icon: "🔢", desc: "Guess 1-100", reward: "Fewer guesses = more coins" },
];

// --- Default Game State ---
function createDefaultState() {
  return {
    petName: "Clawd",
    level: 1,
    xp: 0,
    coins: 100,
    stats: {
      hunger: 100,
      happiness: 100,
      energy: 100,
      cleanliness: 100,
      health: 100,
    },
    inventory: [
      { itemId: "bread", quantity: 3 },
      { itemId: "ball", quantity: 1 },
      { itemId: "carrot_seed", quantity: 2 },
    ],
    garden: Array(16).fill(null),
    achievementProgress: {},
    trackers: {
      timesFeeding: 0,
      timesPlaying: 0,
      timesCleaning: 0,
      totalHarvests: 0,
      totalPlanted: 0,
      gamesWon: 0,
      itemsBought: 0,
      totalSpent: 0,
      peakCoins: 100,
      maxHappiness: 0,
      allStatsHigh: 0,
      clickChampion: 0,
      perfectMemory: 0,
      totalActions: 0,
      level: 1,
    },
    unlockedAchievements: [],
    lastUpdate: Date.now(),
  };
}

// ============================================================
// GAME STATE
// ============================================================
let gameState = createDefaultState();
let statusIntervalId = null;
let gardenIntervalId = null;
let autoSaveIntervalId = null;
let currentMiniGame = null;

// ============================================================
// INITIALIZATION
// ============================================================
async function init() {
  try {
    if (window.electronAPI && window.electronAPI.getGameState) {
      const saved = await window.electronAPI.getGameState();
      if (saved && saved.stats) {
        gameState = mergeState(saved);
      }
    }
  } catch (e) {
    console.log("No saved state, using defaults");
  }

  // Catch up on time elapsed since last save
  catchUpTime();

  // Bind UI
  bindTabs();
  bindStatusActions();

  // Render everything
  renderTopBar();
  renderStatus();
  renderInventory();
  renderShop();
  renderGarden();
  renderGamesList();
  renderAchievements();

  // Start timers
  statusIntervalId = setInterval(tickStatus, 1000);
  gardenIntervalId = setInterval(tickGarden, 1000);
  autoSaveIntervalId = setInterval(saveGame, 30000);

  // Listen for external state updates
  if (window.electronAPI && window.electronAPI.onGameStateUpdate) {
    window.electronAPI.onGameStateUpdate((data) => {
      if (data && data.stats) {
        gameState = mergeState(data);
        renderAll();
      }
    });
  }
}

function mergeState(saved) {
  const def = createDefaultState();
  return {
    ...def,
    ...saved,
    stats: { ...def.stats, ...(saved.stats || {}) },
    trackers: { ...def.trackers, ...(saved.trackers || {}) },
    garden: saved.garden || def.garden,
    inventory: saved.inventory || def.inventory,
    unlockedAchievements: saved.unlockedAchievements || [],
    achievementProgress: saved.achievementProgress || {},
  };
}

function catchUpTime() {
  const now = Date.now();
  const elapsed = (now - (gameState.lastUpdate || now)) / 1000;
  if (elapsed <= 0) return;

  const s = gameState.stats;
  s.hunger = Math.max(0, s.hunger - elapsed / 60);
  s.happiness = Math.max(0, s.happiness - elapsed / 90);
  s.energy = Math.max(0, s.energy - elapsed / 120);
  s.cleanliness = Math.max(0, s.cleanliness - elapsed / 180);
  updateHealth();

  // Advance garden plots
  gameState.garden.forEach((plot) => {
    if (plot && plot.state === "growing") {
      plot.elapsed = (plot.elapsed || 0) + elapsed;
    }
  });

  gameState.lastUpdate = now;
}

// ============================================================
// SAVE / LOAD
// ============================================================
async function saveGame() {
  gameState.lastUpdate = Date.now();
  try {
    if (window.electronAPI && window.electronAPI.saveGameState) {
      window.electronAPI.saveGameState(gameState);
    }
  } catch (e) {
    console.error("Save failed", e);
  }
}

// ============================================================
// TAB NAVIGATION
// ============================================================
function bindTabs() {
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
      tab.classList.add("active");
      const tabId = tab.dataset.tab;
      document.getElementById("tab-" + tabId).classList.add("active");

      // Refresh content when switching tabs
      if (tabId === "inventory") renderInventory();
      if (tabId === "shop") renderShop();
      if (tabId === "garden") renderGarden();
      if (tabId === "achievements") renderAchievements();
    });
  });
}

// ============================================================
// TOP BAR
// ============================================================
function renderTopBar() {
  document.getElementById("pet-name").textContent = gameState.petName;
  document.getElementById("level-num").textContent = gameState.level;
  const xpNeeded = getXpForLevel(gameState.level);
  const pct = Math.min(100, (gameState.xp / xpNeeded) * 100);
  document.getElementById("xp-bar").style.width = pct + "%";
  document.getElementById("xp-text").textContent = `${gameState.xp} / ${xpNeeded} XP`;
  document.getElementById("coins-count").textContent = gameState.coins;
}

function getXpForLevel(level) {
  return Math.floor(100 * Math.pow(1.15, level - 1));
}

function addXp(amount) {
  gameState.xp += amount;
  let xpNeeded = getXpForLevel(gameState.level);
  while (gameState.xp >= xpNeeded) {
    gameState.xp -= xpNeeded;
    gameState.level++;
    gameState.trackers.level = gameState.level;
    showToast(`Level Up! Now level ${gameState.level}`, "achievement");
    triggerPetAnimation("happy");
    xpNeeded = getXpForLevel(gameState.level);
    checkAchievements();
  }
  renderTopBar();
}

function addCoins(amount) {
  gameState.coins += amount;
  if (gameState.coins > gameState.trackers.peakCoins) {
    gameState.trackers.peakCoins = gameState.coins;
  }
  renderTopBar();
  checkAchievements();
}

function spendCoins(amount) {
  if (gameState.coins < amount) return false;
  gameState.coins -= amount;
  gameState.trackers.totalSpent += amount;
  renderTopBar();
  checkAchievements();
  return true;
}

// ============================================================
// STATUS SYSTEM
// ============================================================
function tickStatus() {
  const s = gameState.stats;
  s.hunger = Math.max(0, s.hunger - 1 / 60);
  s.happiness = Math.max(0, s.happiness - 1 / 90);
  s.energy = Math.max(0, s.energy - 1 / 120);
  s.cleanliness = Math.max(0, s.cleanliness - 1 / 180);
  updateHealth();
  renderStatus();

  gameState.lastUpdate = Date.now();
}

function updateHealth() {
  const s = gameState.stats;
  let healthTarget = 100;
  const stats = [s.hunger, s.happiness, s.energy, s.cleanliness];
  for (const v of stats) {
    if (v < 20) healthTarget -= 15;
    else if (v < 40) healthTarget -= 8;
    else if (v < 60) healthTarget -= 3;
  }
  healthTarget = Math.max(0, Math.min(100, healthTarget));
  // Smooth approach
  s.health += (healthTarget - s.health) * 0.05;
  s.health = Math.max(0, Math.min(100, s.health));
}

function getBarClass(value) {
  if (value >= 60) return "high";
  if (value >= 35) return "medium";
  if (value >= 15) return "low";
  return "critical";
}

function renderStatus() {
  const stats = ["hunger", "happiness", "energy", "cleanliness", "health"];
  for (const stat of stats) {
    const val = Math.round(gameState.stats[stat]);
    const valEl = document.getElementById(stat + "-val");
    const barEl = document.getElementById(stat + "-bar");
    if (valEl) valEl.textContent = val;
    if (barEl) {
      barEl.style.width = val + "%";
      barEl.className = "stat-bar-fill " + getBarClass(val);
    }
  }
}

function bindStatusActions() {
  document.querySelectorAll(".action-btn[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      handleStatusAction(action);
    });
  });
}

function handleStatusAction(action) {
  const s = gameState.stats;
  gameState.trackers.totalActions++;

  switch (action) {
    case "feed": {
      const foodItems = getInventoryItemsByType("food");
      if (foodItems.length === 0) {
        showToast("No food in inventory! Visit the shop.", "warning");
        return;
      }
      // Use the first food item
      const food = foodItems[0];
      const shopDef = SHOP_ITEMS.find((i) => i.id === food.itemId);
      if (!shopDef) return;
      removeFromInventory(food.itemId, 1);
      if (shopDef.effect.hunger) s.hunger = Math.min(100, s.hunger + shopDef.effect.hunger);
      if (shopDef.effect.happiness) s.happiness = Math.min(100, s.happiness + shopDef.effect.happiness);
      if (shopDef.effect.health) s.health = Math.min(100, s.health + shopDef.effect.health);
      if (shopDef.effect.energy) s.energy = Math.min(100, s.energy + shopDef.effect.energy);
      gameState.trackers.timesFeeding++;
      showToast(`Fed ${shopDef.icon} ${shopDef.name}!`, "success");
      triggerPetAnimation("happy");
      addXp(5);
      break;
    }
    case "play": {
      const toyItems = getInventoryItemsByType("toy");
      if (toyItems.length === 0) {
        // Free play but less effective
        s.happiness = Math.min(100, s.happiness + 8);
        s.energy = Math.max(0, s.energy - 5);
        showToast("Played with Clawd!", "success");
      } else {
        const toy = toyItems[0];
        const shopDef = SHOP_ITEMS.find((i) => i.id === toy.itemId);
        if (shopDef && shopDef.effect) {
          if (shopDef.effect.happiness) s.happiness = Math.min(100, s.happiness + shopDef.effect.happiness);
          if (shopDef.effect.energy) s.energy = Math.max(0, s.energy + (shopDef.effect.energy || 0));
          showToast(`Played with ${shopDef.icon} ${shopDef.name}!`, "success");
        }
        // Toys don't get consumed (they're durable)
      }
      gameState.trackers.timesPlaying++;
      triggerPetAnimation("happy");
      addXp(3);
      break;
    }
    case "rest": {
      s.energy = Math.min(100, s.energy + 20);
      s.happiness = Math.max(0, s.happiness - 3);
      showToast("Clawd took a rest!", "success");
      triggerPetAnimation("sleeping");
      addXp(2);
      break;
    }
    case "clean": {
      s.cleanliness = Math.min(100, s.cleanliness + 30);
      s.happiness = Math.min(100, s.happiness + 3);
      gameState.trackers.timesCleaning++;
      showToast("Clawd is squeaky clean!", "success");
      triggerPetAnimation("happy");
      addXp(3);
      break;
    }
  }

  // Check for happy / healthy achievements
  if (s.happiness >= 100) gameState.trackers.maxHappiness = 1;
  if (s.hunger >= 80 && s.happiness >= 80 && s.energy >= 80 && s.cleanliness >= 80) {
    gameState.trackers.allStatsHigh = 1;
  }

  updateHealth();
  renderStatus();
  checkAchievements();
}

// ============================================================
// INVENTORY SYSTEM
// ============================================================
function getInventoryItemsByType(type) {
  return gameState.inventory.filter((inv) => {
    const def = SHOP_ITEMS.find((i) => i.id === inv.itemId);
    return def && def.type === type && inv.quantity > 0;
  });
}

function addToInventory(itemId, qty) {
  const existing = gameState.inventory.find((i) => i.itemId === itemId);
  if (existing) {
    existing.quantity += qty;
  } else {
    gameState.inventory.push({ itemId, quantity: qty });
  }
}

function removeFromInventory(itemId, qty) {
  const existing = gameState.inventory.find((i) => i.itemId === itemId);
  if (!existing) return false;
  existing.quantity -= qty;
  if (existing.quantity <= 0) {
    gameState.inventory = gameState.inventory.filter((i) => i.itemId !== itemId);
  }
  return true;
}

function getInventoryQty(itemId) {
  const item = gameState.inventory.find((i) => i.itemId === itemId);
  return item ? item.quantity : 0;
}

function renderInventory() {
  const grid = document.getElementById("inventory-grid");
  grid.innerHTML = "";

  // Show owned items
  const items = gameState.inventory.filter((i) => i.quantity > 0);
  for (const invItem of items) {
    const def = SHOP_ITEMS.find((i) => i.id === invItem.itemId);
    if (!def) continue;

    const slot = document.createElement("div");
    slot.className = "inv-slot";
    slot.innerHTML = `
      <div class="tooltip">
        <div>${def.icon} ${def.name}</div>
        <div class="tooltip-type">${capitalize(def.type)}</div>
        ${def.effect ? `<div class="tooltip-effect">${formatEffect(def.effect)}</div>` : ""}
        ${def.desc ? `<div class="tooltip-effect">${def.desc}</div>` : ""}
      </div>
      <span class="item-icon">${def.icon}</span>
      <span class="item-name">${def.name}</span>
      <span class="item-qty">x${invItem.quantity}</span>
    `;

    slot.addEventListener("click", () => handleUseItem(def, invItem));
    grid.appendChild(slot);
  }

  // Fill empty slots to make grid look complete
  const totalSlots = Math.max(16, items.length + (4 - (items.length % 4)));
  for (let i = items.length; i < totalSlots; i++) {
    const slot = document.createElement("div");
    slot.className = "inv-slot empty";
    slot.innerHTML = `<span class="item-icon" style="opacity:0.2">-</span>`;
    grid.appendChild(slot);
  }
}

function handleUseItem(def, invItem) {
  if (def.type === "food") {
    showModal(def.icon, `Use ${def.name}?`, formatEffect(def.effect), () => {
      if (invItem.quantity <= 0) return;
      removeFromInventory(def.id, 1);
      const s = gameState.stats;
      if (def.effect.hunger) s.hunger = Math.min(100, s.hunger + def.effect.hunger);
      if (def.effect.happiness) s.happiness = Math.min(100, s.happiness + def.effect.happiness);
      if (def.effect.health) s.health = Math.min(100, s.health + def.effect.health);
      if (def.effect.energy) s.energy = Math.min(100, s.energy + def.effect.energy);
      gameState.trackers.timesFeeding++;
      gameState.trackers.totalActions++;
      showToast(`Used ${def.icon} ${def.name}!`, "success");
      triggerPetAnimation("happy");
      addXp(5);
      updateHealth();
      renderStatus();
      renderInventory();
      checkAchievements();
    });
  } else if (def.type === "toy") {
    showModal(def.icon, `Play with ${def.name}?`, formatEffect(def.effect), () => {
      const s = gameState.stats;
      if (def.effect.happiness) s.happiness = Math.min(100, s.happiness + def.effect.happiness);
      if (def.effect.energy) s.energy = Math.max(0, s.energy + (def.effect.energy || 0));
      gameState.trackers.timesPlaying++;
      gameState.trackers.totalActions++;
      showToast(`Played with ${def.icon} ${def.name}!`, "success");
      triggerPetAnimation("happy");
      addXp(3);
      renderStatus();
      checkAchievements();
    });
  } else if (def.type === "decoration") {
    showModal(def.icon, `Equip ${def.name}?`, def.desc, () => {
      const s = gameState.stats;
      if (def.effect && def.effect.happiness) s.happiness = Math.min(100, s.happiness + def.effect.happiness);
      gameState.trackers.totalActions++;
      showToast(`Equipped ${def.icon} ${def.name}!`, "success");
      triggerPetAnimation("happy");
      addXp(2);
      renderStatus();
      checkAchievements();
    });
  } else if (def.type === "seed") {
    showToast("Go to Garden tab to plant seeds!", "");
  } else if (def.type === "tool") {
    showToast("Go to Garden tab to use tools!", "");
  }
}

// ============================================================
// SHOP SYSTEM
// ============================================================
let shopCategory = "food";

function renderShop() {
  const catContainer = document.getElementById("shop-categories");
  const gridContainer = document.getElementById("shop-grid");

  // Category buttons
  const categories = ["food", "toy", "seed", "tool", "decoration"];
  const catLabels = { food: "Food", toy: "Toys", seed: "Seeds", tool: "Tools", decoration: "Decor" };
  const catIcons = { food: "🍔", toy: "🎮", seed: "🌱", tool: "🔧", decoration: "🎩" };

  catContainer.innerHTML = "";
  for (const cat of categories) {
    const btn = document.createElement("button");
    btn.className = "shop-cat-btn" + (cat === shopCategory ? " active" : "");
    btn.textContent = `${catIcons[cat]} ${catLabels[cat]}`;
    btn.addEventListener("click", () => {
      shopCategory = cat;
      renderShop();
    });
    catContainer.appendChild(btn);
  }

  // Items
  const items = SHOP_ITEMS.filter((i) => i.type === shopCategory);
  gridContainer.innerHTML = "";

  for (const item of items) {
    const canAfford = gameState.coins >= item.price;
    const card = document.createElement("div");
    card.className = "shop-item" + (canAfford ? "" : " cant-afford");
    card.innerHTML = `
      <span class="item-icon">${item.icon}</span>
      <span class="item-name">${item.name}</span>
      <span class="item-desc">${item.desc}</span>
      <span class="item-price">🪙 ${item.price}</span>
      <button class="buy-btn" ${canAfford ? "" : "disabled"}>Buy</button>
    `;

    const buyBtn = card.querySelector(".buy-btn");
    buyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      buyItem(item);
    });
    gridContainer.appendChild(card);
  }
}

function buyItem(item) {
  if (!spendCoins(item.price)) {
    showToast("Not enough coins!", "warning");
    return;
  }
  addToInventory(item.id, 1);
  gameState.trackers.itemsBought++;
  gameState.trackers.totalActions++;
  showToast(`Bought ${item.icon} ${item.name}!`, "success");
  addXp(2);
  renderShop();
  checkAchievements();
}

// ============================================================
// GARDEN SYSTEM
// ============================================================
let gardenMode = "none"; // "none", "plant", "water", "fertilize"
let selectedSeed = null;

function renderGarden() {
  const grid = document.getElementById("garden-grid");
  grid.innerHTML = "";

  for (let i = 0; i < 16; i++) {
    const plot = gameState.garden[i];
    const div = document.createElement("div");
    div.className = "garden-plot" + (plot ? "" : " empty");

    if (!plot) {
      div.innerHTML = `<span class="plot-icon" style="opacity:0.3">⬛</span><span class="plot-label">Empty</span>`;
    } else if (plot.state === "growing") {
      const progress = getGrowthProgress(plot);
      const stage = getGrowthStage(progress);
      const stageIcons = { sprout: "🌱", young: "🌿", mature: "🌾" };
      const needsWater = plot.needsWater;
      div.innerHTML = `
        <span class="water-indicator ${needsWater ? "needs-water" : ""}">💧</span>
        <span class="plot-icon">${stageIcons[stage]}</span>
        <span class="plot-label">${plot.cropName}</span>
        <div class="plot-progress"><div class="plot-progress-fill" style="width:${Math.min(100, progress * 100)}%"></div></div>
      `;
    } else if (plot.state === "ready") {
      div.innerHTML = `
        <span class="plot-icon">${plot.harvestIcon}</span>
        <span class="plot-label">Harvest!</span>
      `;
      div.style.borderColor = "#39ff14";
      div.style.boxShadow = "0 0 10px rgba(57,255,20,0.4)";
    }

    div.addEventListener("click", () => handlePlotClick(i));
    grid.appendChild(div);
  }

  renderGardenTools();
  renderSeedSelector();
}

function renderGardenTools() {
  const container = document.getElementById("garden-tools");
  container.innerHTML = "";

  const tools = [
    { mode: "plant", icon: "🌱", label: "Plant" },
    { mode: "water", icon: "💧", label: "Water" },
    { mode: "fertilize", icon: "✨", label: "Fertilize" },
  ];

  for (const tool of tools) {
    const btn = document.createElement("button");
    btn.className = "garden-tool-btn" + (gardenMode === tool.mode ? " active" : "");
    btn.innerHTML = `<span class="tool-icon">${tool.icon}</span> ${tool.label}`;
    btn.addEventListener("click", () => {
      gardenMode = gardenMode === tool.mode ? "none" : tool.mode;
      renderGarden();
    });
    container.appendChild(btn);
  }
}

function renderSeedSelector() {
  const container = document.getElementById("seed-selector");
  const list = document.getElementById("seed-list");

  if (gardenMode !== "plant") {
    container.classList.remove("visible");
    return;
  }

  container.classList.add("visible");
  list.innerHTML = "";

  const seeds = getInventoryItemsByType("seed");
  if (seeds.length === 0) {
    list.innerHTML = '<span style="color:var(--text-muted);font-size:11px;">No seeds. Buy some from the shop!</span>';
    return;
  }

  for (const seedInv of seeds) {
    const def = SHOP_ITEMS.find((i) => i.id === seedInv.itemId);
    if (!def) continue;

    const opt = document.createElement("button");
    opt.className = "seed-option" + (selectedSeed === def.id ? " selected" : "");
    opt.innerHTML = `${def.icon} ${def.name} (x${seedInv.quantity})`;
    opt.addEventListener("click", () => {
      selectedSeed = def.id;
      renderSeedSelector();
    });
    list.appendChild(opt);
  }
}

function handlePlotClick(index) {
  const plot = gameState.garden[index];

  if (plot && plot.state === "ready") {
    // Harvest
    harvestPlot(index);
    return;
  }

  if (gardenMode === "plant" && !plot) {
    if (!selectedSeed) {
      showToast("Select a seed first!", "warning");
      return;
    }
    plantSeed(index, selectedSeed);
  } else if (gardenMode === "water" && plot && plot.state === "growing") {
    waterPlot(index);
  } else if (gardenMode === "fertilize" && plot && plot.state === "growing") {
    fertilizePlot(index);
  } else if (!plot) {
    showToast("Select Plant mode and a seed to plant here.", "");
  }
}

function plantSeed(index, seedId) {
  const seedDef = SHOP_ITEMS.find((i) => i.id === seedId);
  if (!seedDef) return;
  if (getInventoryQty(seedId) <= 0) {
    showToast("No seeds left!", "warning");
    return;
  }

  removeFromInventory(seedId, 1);
  gameState.garden[index] = {
    state: "growing",
    seedId,
    cropName: seedDef.harvestName || seedDef.name,
    harvestIcon: seedDef.harvestIcon || seedDef.icon,
    harvestValue: seedDef.harvestValue || 10,
    growTime: seedDef.growTime || 60,
    elapsed: 0,
    growMultiplier: 1,
    needsWater: false,
    waterStage: 0,
    plantedAt: Date.now(),
  };
  gameState.trackers.totalPlanted++;
  gameState.trackers.totalActions++;

  showToast(`Planted ${seedDef.icon} ${seedDef.harvestName || seedDef.name}!`, "success");
  addXp(2);
  renderGarden();
  checkAchievements();
}

function waterPlot(index) {
  const plot = gameState.garden[index];
  if (!plot || plot.state !== "growing") return;

  // Check for watering can
  const wateringCan = getInventoryQty("watering_can");
  const goldenTools = getInventoryQty("golden_tools");

  if (goldenTools <= 0 && wateringCan <= 0) {
    showToast("You need a Watering Can! Buy one from the shop.", "warning");
    return;
  }

  if (goldenTools <= 0) {
    // Use regular watering can (consumes a use)
    removeFromInventory("watering_can", 1);
    addToInventory("watering_can", 0); // Ensure tracking
  }

  plot.needsWater = false;
  plot.waterStage++;
  // Watering gives a small growth boost
  plot.elapsed += plot.growTime * 0.05;
  gameState.trackers.totalActions++;

  showToast("Watered the plant!", "success");
  addXp(1);
  renderGarden();
}

function fertilizePlot(index) {
  const plot = gameState.garden[index];
  if (!plot || plot.state !== "growing") return;

  const superFert = getInventoryQty("super_fertilizer");
  const regularFert = getInventoryQty("fertilizer");

  if (superFert > 0) {
    removeFromInventory("super_fertilizer", 1);
    plot.growMultiplier = 4;
    showToast("Applied Super Fertilizer! 4x growth!", "success");
  } else if (regularFert > 0) {
    removeFromInventory("fertilizer", 1);
    plot.growMultiplier = Math.max(plot.growMultiplier, 2);
    showToast("Applied Fertilizer! 2x growth!", "success");
  } else {
    showToast("No fertilizer! Buy some from the shop.", "warning");
    return;
  }

  gameState.trackers.totalActions++;
  addXp(2);
  renderGarden();
  checkAchievements();
}

function harvestPlot(index) {
  const plot = gameState.garden[index];
  if (!plot || plot.state !== "ready") return;

  const value = plot.harvestValue;
  addCoins(value);
  gameState.trackers.totalHarvests++;
  gameState.trackers.totalActions++;

  showToast(`Harvested ${plot.harvestIcon} ${plot.cropName}! +${value} coins`, "success");
  triggerPetAnimation("happy");
  addXp(8);

  gameState.garden[index] = null;
  renderGarden();
  checkAchievements();
}

function tickGarden() {
  let changed = false;
  for (let i = 0; i < 16; i++) {
    const plot = gameState.garden[i];
    if (!plot || plot.state !== "growing") continue;

    plot.elapsed += 1 * (plot.growMultiplier || 1);

    const progress = getGrowthProgress(plot);

    // Need water at ~40% progress
    if (!plot.needsWater && plot.waterStage === 0 && progress > 0.4) {
      plot.needsWater = true;
      changed = true;
    }

    // Ready to harvest
    if (progress >= 1) {
      plot.state = "ready";
      changed = true;
      showToast(`${plot.harvestIcon} ${plot.cropName} is ready to harvest!`, "success");
    }
  }
  if (changed) renderGarden();
}

function getGrowthProgress(plot) {
  return Math.min(1, (plot.elapsed || 0) / (plot.growTime || 60));
}

function getGrowthStage(progress) {
  if (progress < 0.33) return "sprout";
  if (progress < 0.66) return "young";
  return "mature";
}

// ============================================================
// MINI-GAMES
// ============================================================
function renderGamesList() {
  const container = document.getElementById("games-list");
  container.innerHTML = "";

  for (const game of MINI_GAMES) {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <span class="game-icon">${game.icon}</span>
      <span class="game-name">${game.name}</span>
      <span class="game-desc">${game.desc}</span>
      <span class="game-reward">🪙 ${game.reward}</span>
    `;
    card.addEventListener("click", () => startMiniGame(game.id));
    container.appendChild(card);
  }
}

function startMiniGame(gameId) {
  const area = document.getElementById("mini-game-area");
  area.classList.add("active");
  currentMiniGame = gameId;

  switch (gameId) {
    case "click_frenzy":
      initClickFrenzy(area);
      break;
    case "memory_match":
      initMemoryMatch(area);
      break;
    case "rps":
      initRPS(area);
      break;
    case "catch_game":
      initCatchGame(area);
      break;
    case "number_guess":
      initNumberGuess(area);
      break;
  }
}

function closeMiniGame() {
  const area = document.getElementById("mini-game-area");
  area.classList.remove("active");
  area.innerHTML = "";
  currentMiniGame = null;
}

// --- Click Frenzy ---
function initClickFrenzy(area) {
  let clicks = 0;
  let timeLeft = 10;
  let started = false;
  let timer = null;

  area.innerHTML = `
    <div class="mini-game-header">
      <span class="mini-game-title">👆 Click Frenzy</span>
      <button class="mini-game-close" id="mg-close">Close</button>
    </div>
    <div class="mini-game-stats">
      Clicks: <span id="cf-clicks">0</span> &nbsp; Time: <span id="cf-time">10</span>s
    </div>
    <div class="mini-game-body">
      <button class="game-start-btn" id="cf-start">START!</button>
      <div class="click-target" id="cf-target" style="display:none;">👊</div>
    </div>
  `;

  document.getElementById("mg-close").addEventListener("click", () => {
    clearInterval(timer);
    closeMiniGame();
  });

  document.getElementById("cf-start").addEventListener("click", function () {
    this.style.display = "none";
    document.getElementById("cf-target").style.display = "flex";
    started = true;

    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("cf-time").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        endClickFrenzy(clicks);
      }
    }, 1000);
  });

  document.getElementById("cf-target").addEventListener("click", () => {
    if (!started || timeLeft <= 0) return;
    clicks++;
    document.getElementById("cf-clicks").textContent = clicks;
  });
}

function endClickFrenzy(clicks) {
  const coins = Math.floor(clicks / 5);
  if (coins > 0) {
    addCoins(coins);
    gameState.trackers.gamesWon++;
    if (clicks >= 50) gameState.trackers.clickChampion = 1;
  }
  gameState.trackers.totalActions++;
  addXp(clicks > 0 ? 5 : 1);

  const area = document.getElementById("mini-game-area");
  const body = area.querySelector(".mini-game-body");
  if (body) {
    body.innerHTML = `
      <div class="game-over-msg">Clicks: ${clicks}<br>Earned: ${coins} coins!</div>
      <button class="game-start-btn" id="cf-retry">Play Again</button>
    `;
    document.getElementById("cf-retry").addEventListener("click", () => initClickFrenzy(area));
  }
  checkAchievements();
}

// --- Memory Match ---
function initMemoryMatch(area) {
  const emojis = ["🍎", "🍊", "🍋", "🍍", "🍓", "🍉", "🍑", "🍒"];
  let cards = [...emojis, ...emojis];
  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  let flipped = [];
  let matched = 0;
  let moves = 0;
  let locked = false;

  area.innerHTML = `
    <div class="mini-game-header">
      <span class="mini-game-title">🧠 Memory Match</span>
      <button class="mini-game-close" id="mg-close">Close</button>
    </div>
    <div class="mini-game-stats">
      Moves: <span id="mm-moves">0</span> &nbsp; Matched: <span id="mm-matched">0</span>/8
    </div>
    <div class="mini-game-body">
      <div class="memory-grid" id="mm-grid"></div>
    </div>
  `;

  document.getElementById("mg-close").addEventListener("click", closeMiniGame);

  const grid = document.getElementById("mm-grid");
  cards.forEach((emoji, idx) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.index = idx;
    card.dataset.emoji = emoji;
    card.textContent = "?";
    card.addEventListener("click", () => {
      if (locked || card.classList.contains("flipped") || card.classList.contains("matched")) return;
      card.classList.add("flipped");
      card.textContent = emoji;
      flipped.push(card);

      if (flipped.length === 2) {
        moves++;
        document.getElementById("mm-moves").textContent = moves;
        locked = true;

        if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
          flipped[0].classList.add("matched");
          flipped[1].classList.add("matched");
          matched++;
          document.getElementById("mm-matched").textContent = matched;
          flipped = [];
          locked = false;

          if (matched === 8) {
            endMemoryMatch(moves);
          }
        } else {
          setTimeout(() => {
            flipped[0].classList.remove("flipped");
            flipped[0].textContent = "?";
            flipped[1].classList.remove("flipped");
            flipped[1].textContent = "?";
            flipped = [];
            locked = false;
          }, 600);
        }
      }
    });
    grid.appendChild(card);
  });
}

function endMemoryMatch(moves) {
  let coins;
  if (moves <= 10) coins = 30;
  else if (moves <= 14) coins = 20;
  else if (moves <= 18) coins = 15;
  else coins = 10;

  addCoins(coins);
  gameState.trackers.gamesWon++;
  if (moves <= 12) gameState.trackers.perfectMemory = 1;
  gameState.trackers.totalActions++;
  addXp(10);

  setTimeout(() => {
    const area = document.getElementById("mini-game-area");
    const body = area.querySelector(".mini-game-body");
    if (body) {
      body.innerHTML = `
        <div class="game-over-msg">Completed in ${moves} moves!<br>Earned: ${coins} coins!</div>
        <button class="game-start-btn" id="mm-retry">Play Again</button>
      `;
      document.getElementById("mm-retry").addEventListener("click", () => initMemoryMatch(area));
    }
  }, 500);
  checkAchievements();
}

// --- Rock Paper Scissors ---
function initRPS(area) {
  let playerWins = 0;
  let cpuWins = 0;
  let round = 0;
  const maxRounds = 5;

  area.innerHTML = `
    <div class="mini-game-header">
      <span class="mini-game-title">✊ Rock Paper Scissors</span>
      <button class="mini-game-close" id="mg-close">Close</button>
    </div>
    <div class="mini-game-stats">
      Round: <span id="rps-round">1</span>/5 &nbsp;
      You: <span id="rps-pwins">0</span> &nbsp;
      CPU: <span id="rps-cwins">0</span>
    </div>
    <div class="mini-game-body">
      <div class="rps-choices">
        <button class="rps-btn" data-choice="rock">✊</button>
        <button class="rps-btn" data-choice="paper">✋</button>
        <button class="rps-btn" data-choice="scissors">✌️</button>
      </div>
      <div class="rps-result" id="rps-result">Choose your move!</div>
    </div>
  `;

  document.getElementById("mg-close").addEventListener("click", closeMiniGame);

  const choices = ["rock", "paper", "scissors"];
  const icons = { rock: "✊", paper: "✋", scissors: "✌️" };

  area.querySelectorAll(".rps-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (round >= maxRounds) return;
      round++;
      const player = btn.dataset.choice;
      const cpu = choices[Math.floor(Math.random() * 3)];
      const result = document.getElementById("rps-result");

      let outcome;
      if (player === cpu) {
        outcome = "draw";
        result.textContent = `${icons[player]} vs ${icons[cpu]} - Draw!`;
        result.className = "rps-result draw";
      } else if (
        (player === "rock" && cpu === "scissors") ||
        (player === "paper" && cpu === "rock") ||
        (player === "scissors" && cpu === "paper")
      ) {
        outcome = "win";
        playerWins++;
        result.textContent = `${icons[player]} vs ${icons[cpu]} - You win!`;
        result.className = "rps-result win";
      } else {
        outcome = "lose";
        cpuWins++;
        result.textContent = `${icons[player]} vs ${icons[cpu]} - You lose!`;
        result.className = "rps-result lose";
      }

      document.getElementById("rps-round").textContent = Math.min(round + 1, maxRounds);
      document.getElementById("rps-pwins").textContent = playerWins;
      document.getElementById("rps-cwins").textContent = cpuWins;

      if (round >= maxRounds) {
        setTimeout(() => endRPS(playerWins, cpuWins), 800);
      }
    });
  });
}

function endRPS(playerWins, cpuWins) {
  const won = playerWins > cpuWins;
  const coins = won ? 10 : playerWins >= cpuWins ? 3 : 0;

  if (coins > 0) addCoins(coins);
  if (won) gameState.trackers.gamesWon++;
  gameState.trackers.totalActions++;
  addXp(5);

  const area = document.getElementById("mini-game-area");
  const body = area.querySelector(".mini-game-body");
  if (body) {
    const msg = won ? "You Win!" : playerWins === cpuWins ? "Draw!" : "You Lose!";
    body.innerHTML = `
      <div class="game-over-msg">${msg}<br>Score: ${playerWins}-${cpuWins}<br>Earned: ${coins} coins!</div>
      <button class="game-start-btn" id="rps-retry">Play Again</button>
    `;
    document.getElementById("rps-retry").addEventListener("click", () => initRPS(area));
  }
  checkAchievements();
}

// --- Catch Game ---
function initCatchGame(area) {
  let catches = 0;
  let timeLeft = 30;
  let started = false;
  let timer = null;
  let spawnTimer = null;
  const fallingEmojis = ["🍎", "🍊", "⭐", "💎", "🍪", "🌟", "🍓"];

  area.innerHTML = `
    <div class="mini-game-header">
      <span class="mini-game-title">🦋 Catch Game</span>
      <button class="mini-game-close" id="mg-close">Close</button>
    </div>
    <div class="mini-game-stats">
      Caught: <span id="cg-caught">0</span> &nbsp; Time: <span id="cg-time">30</span>s
    </div>
    <div class="mini-game-body">
      <button class="game-start-btn" id="cg-start">START!</button>
      <div class="catch-area" id="cg-area" style="display:none;"></div>
    </div>
  `;

  document.getElementById("mg-close").addEventListener("click", () => {
    clearInterval(timer);
    clearInterval(spawnTimer);
    closeMiniGame();
  });

  document.getElementById("cg-start").addEventListener("click", function () {
    this.style.display = "none";
    const catchArea = document.getElementById("cg-area");
    catchArea.style.display = "block";
    started = true;

    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("cg-time").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        clearInterval(spawnTimer);
        endCatchGame(catches);
      }
    }, 1000);

    spawnTimer = setInterval(() => {
      if (!started) return;
      spawnFallingItem(catchArea, fallingEmojis, (x, y) => {
        catches++;
        document.getElementById("cg-caught").textContent = catches;
        // Show catch effect
        const effect = document.createElement("div");
        effect.className = "catch-effect";
        effect.textContent = "+2";
        effect.style.left = x + "px";
        effect.style.top = y + "px";
        catchArea.appendChild(effect);
        setTimeout(() => effect.remove(), 500);
      });
    }, 600);
  });
}

function spawnFallingItem(container, emojis, onCatch) {
  const item = document.createElement("div");
  item.className = "falling-item";
  item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  const x = Math.random() * (container.offsetWidth - 30);
  item.style.left = x + "px";
  item.style.top = "-30px";

  const duration = 2000 + Math.random() * 1500;
  item.style.animationDuration = duration + "ms";

  item.addEventListener("click", (e) => {
    e.stopPropagation();
    onCatch(e.offsetX + parseInt(item.style.left), parseInt(item.style.top) || 0);
    item.remove();
  });

  container.appendChild(item);

  setTimeout(() => {
    if (item.parentNode) item.remove();
  }, duration);
}

function endCatchGame(catches) {
  const coins = catches * 2;
  if (coins > 0) {
    addCoins(coins);
    gameState.trackers.gamesWon++;
  }
  gameState.trackers.totalActions++;
  addXp(catches > 0 ? 8 : 1);

  const area = document.getElementById("mini-game-area");
  const body = area.querySelector(".mini-game-body");
  if (body) {
    body.innerHTML = `
      <div class="game-over-msg">Caught: ${catches} items<br>Earned: ${coins} coins!</div>
      <button class="game-start-btn" id="cg-retry">Play Again</button>
    `;
    document.getElementById("cg-retry").addEventListener("click", () => initCatchGame(area));
  }
  checkAchievements();
}

// --- Number Guess ---
function initNumberGuess(area) {
  const target = Math.floor(Math.random() * 100) + 1;
  let guesses = 0;
  let won = false;

  area.innerHTML = `
    <div class="mini-game-header">
      <span class="mini-game-title">🔢 Number Guess</span>
      <button class="mini-game-close" id="mg-close">Close</button>
    </div>
    <div class="mini-game-stats">
      Guesses: <span id="ng-guesses">0</span> &nbsp; Range: 1-100
    </div>
    <div class="mini-game-body">
      <div class="guess-input-row">
        <input type="number" class="guess-input" id="ng-input" min="1" max="100" placeholder="?">
        <button class="guess-btn" id="ng-btn">Guess</button>
      </div>
      <div class="guess-hint" id="ng-hint">Enter a number 1-100</div>
    </div>
  `;

  document.getElementById("mg-close").addEventListener("click", closeMiniGame);

  const input = document.getElementById("ng-input");
  const btn = document.getElementById("ng-btn");
  const hint = document.getElementById("ng-hint");

  function doGuess() {
    if (won) return;
    const val = parseInt(input.value);
    if (isNaN(val) || val < 1 || val > 100) {
      hint.textContent = "Enter 1-100!";
      hint.className = "guess-hint";
      return;
    }

    guesses++;
    document.getElementById("ng-guesses").textContent = guesses;
    input.value = "";

    if (val === target) {
      won = true;
      hint.textContent = `Correct! It was ${target}!`;
      hint.className = "guess-hint correct";
      endNumberGuess(guesses);
    } else if (val < target) {
      hint.textContent = `${val} is too LOW!`;
      hint.className = "guess-hint higher";
    } else {
      hint.textContent = `${val} is too HIGH!`;
      hint.className = "guess-hint lower";
    }
  }

  btn.addEventListener("click", doGuess);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doGuess();
  });
  input.focus();
}

function endNumberGuess(guesses) {
  let coins;
  if (guesses <= 3) coins = 25;
  else if (guesses <= 5) coins = 15;
  else if (guesses <= 7) coins = 10;
  else coins = 5;

  addCoins(coins);
  gameState.trackers.gamesWon++;
  gameState.trackers.totalActions++;
  addXp(8);

  setTimeout(() => {
    const area = document.getElementById("mini-game-area");
    const body = area.querySelector(".mini-game-body");
    if (body) {
      body.innerHTML = `
        <div class="game-over-msg">Guessed in ${guesses} tries!<br>Earned: ${coins} coins!</div>
        <button class="game-start-btn" id="ng-retry">Play Again</button>
      `;
      document.getElementById("ng-retry").addEventListener("click", () => initNumberGuess(area));
    }
  }, 1000);
  checkAchievements();
}

// ============================================================
// ACHIEVEMENTS
// ============================================================
function renderAchievements() {
  const grid = document.getElementById("achievements-grid");
  grid.innerHTML = "";

  for (const ach of ACHIEVEMENTS) {
    const unlocked = gameState.unlockedAchievements.includes(ach.id);
    const currentVal = gameState.trackers[ach.stat] || 0;
    const progress = Math.min(1, currentVal / ach.target);

    const card = document.createElement("div");
    card.className = "achievement-card " + (unlocked ? "unlocked" : "locked");
    card.innerHTML = `
      <span class="achievement-icon">${ach.icon}</span>
      <div class="achievement-info">
        <div class="achievement-name">${ach.name}</div>
        <div class="achievement-desc">${ach.desc}</div>
        ${
          !unlocked
            ? `<div class="achievement-progress">
                <div class="achievement-progress-fill" style="width:${progress * 100}%"></div>
              </div>`
            : ""
        }
      </div>
    `;
    grid.appendChild(card);
  }
}

function checkAchievements() {
  for (const ach of ACHIEVEMENTS) {
    if (gameState.unlockedAchievements.includes(ach.id)) continue;

    const currentVal = gameState.trackers[ach.stat] || 0;
    if (currentVal >= ach.target) {
      gameState.unlockedAchievements.push(ach.id);
      showToast(`Achievement Unlocked: ${ach.icon} ${ach.name}!`, "achievement");
      triggerPetAnimation("happy");
      addXp(15);
    }
  }
}

// ============================================================
// PET ANIMATION INTEGRATION
// ============================================================
function triggerPetAnimation(state) {
  try {
    if (window.electronAPI && window.electronAPI.setPetAnimation) {
      window.electronAPI.setPetAnimation(state);
    }
  } catch (e) {
    // Not connected, no-op
  }
}

// ============================================================
// UI UTILITIES
// ============================================================
function showToast(message, type) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast" + (type ? " " + type : "");
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 2600);
}

function showModal(icon, title, desc, onConfirm) {
  const overlay = document.getElementById("modal-overlay");
  document.getElementById("modal-icon").textContent = icon;
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-desc").textContent = desc;

  const actions = document.getElementById("modal-actions");
  actions.innerHTML = "";

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "modal-btn confirm";
  confirmBtn.textContent = "Use";
  confirmBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
    onConfirm();
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "modal-btn cancel";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  actions.appendChild(confirmBtn);
  actions.appendChild(cancelBtn);
  overlay.classList.add("active");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatEffect(effect) {
  if (!effect) return "";
  const parts = [];
  for (const [key, val] of Object.entries(effect)) {
    const sign = val > 0 ? "+" : "";
    parts.push(`${capitalize(key)} ${sign}${val}`);
  }
  return parts.join(", ");
}

function renderAll() {
  renderTopBar();
  renderStatus();
  renderInventory();
  renderShop();
  renderGarden();
  renderAchievements();
}

// ============================================================
// TITLE BAR CONTROLS
// ============================================================
document.getElementById("btn-close")?.addEventListener("click", () => {
  if (window.electronAPI.closePanel) window.electronAPI.closePanel();
});
document.getElementById("btn-minimize")?.addEventListener("click", () => {
  if (window.electronAPI.minimizePanel) window.electronAPI.minimizePanel();
});

// ============================================================
// BOOT
// ============================================================
document.addEventListener("DOMContentLoaded", init);
