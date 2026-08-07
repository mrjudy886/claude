const { app, BrowserWindow, Tray, Menu, screen, ipcMain, nativeImage, globalShortcut } = require("electron");
const path = require("path");
const fs = require("fs");

let petWindow = null;
let gameWindow = null;
let tray = null;

const PET_SIZE = 120;
const SAVE_FILE = path.join(app.getPath("userData"), "clawd-save.json");
const SAVE_INTERVAL = 30000;

// ─── Default Game State ───
function createDefaultState() {
  return {
    petName: "Clawd",
    level: 1,
    xp: 0,
    coins: 100,
    totalCoinsEarned: 100,
    stats: { hunger: 80, happiness: 80, energy: 100, cleanliness: 90, health: 100 },
    inventory: [
      { id: "bread", name: "Bread", icon: "🍞", type: "food", effect: { hunger: 15 }, quantity: 3, sellPrice: 2 },
      { id: "ball", name: "Ball", icon: "⚽", type: "toy", effect: { happiness: 20 }, quantity: 1, sellPrice: 5 },
      { id: "carrot_seed", name: "Carrot Seed", icon: "🥕", type: "seed", growTime: 60000, harvestItem: { id: "carrot", name: "Carrot", icon: "🥕", type: "food", effect: { hunger: 10 }, sellPrice: 8 }, quantity: 2, sellPrice: 1 },
    ],
    garden: Array(16).fill(null),
    achievements: {},
    achievementNotifications: [],
    totalItemsBought: 0,
    totalCropsHarvested: 0,
    totalGamesPlayed: 0,
    totalGamesWon: 0,
    totalFoodFed: 0,
    totalToysUsed: 0,
    playTimeSeconds: 0,
    createdAt: Date.now(),
    lastSaved: Date.now(),
    lastTick: Date.now(),
  };
}

let gameState = createDefaultState();

// ─── Save / Load ───
function loadGameState() {
  try {
    if (fs.existsSync(SAVE_FILE)) {
      const data = JSON.parse(fs.readFileSync(SAVE_FILE, "utf-8"));
      gameState = { ...createDefaultState(), ...data };
      const elapsed = (Date.now() - (gameState.lastTick || Date.now())) / 1000;
      if (elapsed > 0 && elapsed < 86400) {
        gameState.stats.hunger = Math.max(0, gameState.stats.hunger - elapsed / 60);
        gameState.stats.happiness = Math.max(0, gameState.stats.happiness - elapsed / 90);
        gameState.stats.energy = Math.min(100, gameState.stats.energy + elapsed / 60);
        gameState.stats.cleanliness = Math.max(0, gameState.stats.cleanliness - elapsed / 180);
      }
      gameState.lastTick = Date.now();
    }
  } catch (e) {
    console.error("Failed to load save:", e.message);
    gameState = createDefaultState();
  }
}

function saveGameState() {
  try {
    gameState.lastSaved = Date.now();
    gameState.lastTick = Date.now();
    fs.writeFileSync(SAVE_FILE, JSON.stringify(gameState, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save:", e.message);
  }
}

// ─── Stat Decay Timer ───
let statDecayTimer = null;
function startStatDecay() {
  statDecayTimer = setInterval(() => {
    const s = gameState.stats;
    s.hunger = Math.max(0, s.hunger - 1);
    s.happiness = Math.max(0, s.happiness - 0.67);
    s.energy = Math.max(0, s.energy - 0.5);
    s.cleanliness = Math.max(0, s.cleanliness - 0.33);

    const lowCount = [s.hunger, s.happiness, s.energy, s.cleanliness].filter(v => v < 20).length;
    if (lowCount >= 2) s.health = Math.max(0, s.health - 1);
    else if (lowCount === 0 && s.health < 100) s.health = Math.min(100, s.health + 0.5);

    gameState.playTimeSeconds += 60;
    broadcastState();
    checkAchievements();

    if (petWindow && !petWindow.isDestroyed()) {
      petWindow.webContents.send("stats-update", gameState.stats);
    }
  }, 60000);
}

// ─── Garden Timer ───
let gardenTimer = null;
function startGardenTimer() {
  gardenTimer = setInterval(() => {
    let changed = false;
    gameState.garden.forEach((plot, i) => {
      if (!plot || plot.stage === "ready") return;
      const elapsed = Date.now() - plot.plantedAt;
      const growTime = plot.growTime || 60000;
      if (plot.stage === "sprout" && elapsed > growTime * 0.33 && plot.watered >= 1) {
        plot.stage = "young";
        changed = true;
      } else if (plot.stage === "young" && elapsed > growTime * 0.66 && plot.watered >= 2) {
        plot.stage = "mature";
        changed = true;
      } else if (plot.stage === "mature" && elapsed > growTime && plot.watered >= 3) {
        plot.stage = "ready";
        changed = true;
      }
    });
    if (changed) broadcastState();
  }, 5000);
}

// ─── Achievements ───
const ACHIEVEMENTS = {
  first_meal: { name: "First Meal", desc: "Feed your pet for the first time", icon: "🍞", check: (s) => s.totalFoodFed >= 1 },
  foodie: { name: "Foodie", desc: "Feed your pet 10 times", icon: "🍔", check: (s) => s.totalFoodFed >= 10 },
  gourmet: { name: "Gourmet", desc: "Feed your pet 50 times", icon: "🍳", check: (s) => s.totalFoodFed >= 50 },
  first_harvest: { name: "First Harvest", desc: "Harvest your first crop", icon: "🌾", check: (s) => s.totalCropsHarvested >= 1 },
  green_thumb: { name: "Green Thumb", desc: "Harvest 10 crops", icon: "🌱", check: (s) => s.totalCropsHarvested >= 10 },
  master_gardener: { name: "Master Gardener", desc: "Harvest 50 crops", icon: "🌻", check: (s) => s.totalCropsHarvested >= 50 },
  coin_collector: { name: "Coin Collector", desc: "Earn 100 coins total", icon: "🪙", check: (s) => s.totalCoinsEarned >= 100 },
  rich: { name: "Getting Rich", desc: "Earn 500 coins total", icon: "💰", check: (s) => s.totalCoinsEarned >= 500 },
  wealthy: { name: "Wealthy", desc: "Earn 2000 coins total", icon: "💎", check: (s) => s.totalCoinsEarned >= 2000 },
  tycoon: { name: "Tycoon", desc: "Earn 10000 coins total", icon: "🏦", check: (s) => s.totalCoinsEarned >= 10000 },
  happy_pet: { name: "Happy Pet", desc: "Reach 100 happiness", icon: "😊", check: (s) => s.stats.happiness >= 100 },
  healthy_pet: { name: "Healthy Pet", desc: "All stats above 80", icon: "💪", check: (s) => Object.values(s.stats).every(v => v >= 80) },
  gamer: { name: "Gamer", desc: "Play 10 mini-games", icon: "🎮", check: (s) => s.totalGamesPlayed >= 10 },
  game_master: { name: "Game Master", desc: "Win 20 mini-games", icon: "🏆", check: (s) => s.totalGamesWon >= 20 },
  shopper: { name: "Shopper", desc: "Buy 10 items", icon: "🛒", check: (s) => s.totalItemsBought >= 10 },
  shopping_spree: { name: "Shopping Spree", desc: "Buy 50 items", icon: "🎁", check: (s) => s.totalItemsBought >= 50 },
  level5: { name: "Rising Star", desc: "Reach level 5", icon: "⭐", check: (s) => s.level >= 5 },
  level10: { name: "Veteran", desc: "Reach level 10", icon: "🌟", check: (s) => s.level >= 10 },
  level20: { name: "Legend", desc: "Reach level 20", icon: "💫", check: (s) => s.level >= 20 },
  playtime1h: { name: "Loyal Friend", desc: "Play for 1 hour", icon: "⏰", check: (s) => s.playTimeSeconds >= 3600 },
  playtime10h: { name: "Best Friend", desc: "Play for 10 hours", icon: "💕", check: (s) => s.playTimeSeconds >= 36000 },
  first_toy: { name: "Playful", desc: "Use a toy for the first time", icon: "🧸", check: (s) => s.totalToysUsed >= 1 },
};

function checkAchievements() {
  let newAchievements = [];
  for (const [id, ach] of Object.entries(ACHIEVEMENTS)) {
    if (!gameState.achievements[id] && ach.check(gameState)) {
      gameState.achievements[id] = { unlockedAt: Date.now() };
      newAchievements.push({ id, ...ach });
    }
  }
  if (newAchievements.length > 0) {
    gameState.achievementNotifications.push(...newAchievements);
    broadcastState();
    if (petWindow && !petWindow.isDestroyed()) {
      petWindow.webContents.send("achievement-unlocked", newAchievements[0]);
    }
  }
}

function addXP(amount) {
  gameState.xp += amount;
  const xpNeeded = gameState.level * 100;
  while (gameState.xp >= xpNeeded) {
    gameState.xp -= xpNeeded;
    gameState.level++;
    if (petWindow && !petWindow.isDestroyed()) {
      petWindow.webContents.send("level-up", gameState.level);
    }
  }
}

// ─── Shop Catalog ───
const SHOP_CATALOG = [
  { id: "bread", name: "Bread", icon: "🍞", type: "food", effect: { hunger: 15 }, price: 5, sellPrice: 2 },
  { id: "apple", name: "Apple", icon: "🍎", type: "food", effect: { hunger: 10, health: 5 }, price: 8, sellPrice: 3 },
  { id: "cake", name: "Cake", icon: "🎂", type: "food", effect: { hunger: 25, happiness: 10 }, price: 20, sellPrice: 8 },
  { id: "sushi", name: "Sushi", icon: "🍣", type: "food", effect: { hunger: 30, happiness: 5 }, price: 30, sellPrice: 12 },
  { id: "pizza", name: "Pizza", icon: "🍕", type: "food", effect: { hunger: 20, happiness: 8 }, price: 15, sellPrice: 6 },
  { id: "cookie", name: "Cookie", icon: "🍪", type: "food", effect: { hunger: 8, happiness: 12 }, price: 10, sellPrice: 4 },
  { id: "steak", name: "Steak", icon: "🥩", type: "food", effect: { hunger: 40, energy: 10 }, price: 40, sellPrice: 16 },
  { id: "salad", name: "Salad", icon: "🥗", type: "food", effect: { hunger: 12, health: 10 }, price: 12, sellPrice: 5 },
  { id: "icecream", name: "Ice Cream", icon: "🍨", type: "food", effect: { hunger: 5, happiness: 20 }, price: 18, sellPrice: 7 },
  { id: "ramen", name: "Ramen", icon: "🍜", type: "food", effect: { hunger: 35, energy: 5 }, price: 25, sellPrice: 10 },
  { id: "coffee", name: "Coffee", icon: "☕", type: "food", effect: { energy: 30, happiness: 5 }, price: 10, sellPrice: 4 },
  { id: "tea", name: "Tea", icon: "🍵", type: "food", effect: { energy: 15, health: 5, cleanliness: 3 }, price: 8, sellPrice: 3 },
  { id: "ball", name: "Ball", icon: "⚽", type: "toy", effect: { happiness: 20, energy: -10 }, price: 15, sellPrice: 5 },
  { id: "kite", name: "Kite", icon: "🪁", type: "toy", effect: { happiness: 25, energy: -15 }, price: 25, sellPrice: 10 },
  { id: "game_console", name: "Game Console", icon: "🎮", type: "toy", effect: { happiness: 35, energy: -5 }, price: 100, sellPrice: 40 },
  { id: "guitar", name: "Guitar", icon: "🎸", type: "toy", effect: { happiness: 30, energy: -8 }, price: 80, sellPrice: 30 },
  { id: "skateboard", name: "Skateboard", icon: "🛹", type: "toy", effect: { happiness: 28, energy: -20 }, price: 60, sellPrice: 22 },
  { id: "book", name: "Book", icon: "📚", type: "toy", effect: { happiness: 15, energy: -3 }, price: 20, sellPrice: 8 },
  { id: "puzzle", name: "Puzzle", icon: "🧩", type: "toy", effect: { happiness: 18, energy: -5 }, price: 30, sellPrice: 12 },
  { id: "teddy", name: "Teddy Bear", icon: "🧸", type: "toy", effect: { happiness: 22, energy: 5 }, price: 40, sellPrice: 15 },
  { id: "paint_set", name: "Paint Set", icon: "🎨", type: "toy", effect: { happiness: 25, energy: -10 }, price: 35, sellPrice: 14 },
  { id: "telescope", name: "Telescope", icon: "🔭", type: "toy", effect: { happiness: 20, energy: -5 }, price: 50, sellPrice: 20 },
  { id: "carrot_seed", name: "Carrot Seed", icon: "🥕", type: "seed", growTime: 60000, harvestItem: { id: "carrot", name: "Carrot", icon: "🥕", type: "food", effect: { hunger: 10 }, sellPrice: 8 }, price: 5, sellPrice: 1 },
  { id: "tomato_seed", name: "Tomato Seed", icon: "🍅", type: "seed", growTime: 90000, harvestItem: { id: "tomato", name: "Tomato", icon: "🍅", type: "food", effect: { hunger: 12, health: 5 }, sellPrice: 12 }, price: 8, sellPrice: 2 },
  { id: "sunflower_seed", name: "Sunflower Seed", icon: "🌻", type: "seed", growTime: 120000, harvestItem: { id: "sunflower", name: "Sunflower", icon: "🌻", type: "food", effect: { happiness: 15 }, sellPrice: 18 }, price: 12, sellPrice: 3 },
  { id: "strawberry_seed", name: "Strawberry Seed", icon: "🍓", type: "seed", growTime: 150000, harvestItem: { id: "strawberry", name: "Strawberry", icon: "🍓", type: "food", effect: { hunger: 8, happiness: 12 }, sellPrice: 22 }, price: 15, sellPrice: 4 },
  { id: "pumpkin_seed", name: "Pumpkin Seed", icon: "🎃", type: "seed", growTime: 200000, harvestItem: { id: "pumpkin", name: "Pumpkin", icon: "🎃", type: "food", effect: { hunger: 30 }, sellPrice: 30 }, price: 20, sellPrice: 5 },
  { id: "watermelon_seed", name: "Watermelon Seed", icon: "🍉", type: "seed", growTime: 250000, harvestItem: { id: "watermelon", name: "Watermelon", icon: "🍉", type: "food", effect: { hunger: 25, happiness: 10 }, sellPrice: 38 }, price: 25, sellPrice: 6 },
  { id: "golden_apple_seed", name: "Golden Apple Seed", icon: "🍏", type: "seed", growTime: 300000, harvestItem: { id: "golden_apple", name: "Golden Apple", icon: "🍏", type: "food", effect: { hunger: 50, health: 30, happiness: 20 }, sellPrice: 80 }, price: 50, sellPrice: 12 },
  { id: "soap", name: "Soap", icon: "🧼", type: "tool", effect: { cleanliness: 30 }, price: 8, sellPrice: 3 },
  { id: "shampoo", name: "Shampoo", icon: "🧴", type: "tool", effect: { cleanliness: 50 }, price: 15, sellPrice: 6 },
  { id: "medicine", name: "Medicine", icon: "💊", type: "tool", effect: { health: 30 }, price: 25, sellPrice: 10 },
  { id: "energy_drink", name: "Energy Drink", icon: "⚡", type: "tool", effect: { energy: 40 }, price: 20, sellPrice: 8 },
  { id: "fertilizer", name: "Fertilizer", icon: "💩", type: "tool", effect: { gardenSpeed: 2 }, price: 15, sellPrice: 5 },
  { id: "super_fertilizer", name: "Super Fertilizer", icon: "✨", type: "tool", effect: { gardenSpeed: 4 }, price: 30, sellPrice: 12 },
  { id: "top_hat", name: "Top Hat", icon: "🎩", type: "decoration", effect: { happiness: 5 }, price: 50, sellPrice: 20 },
  { id: "crown", name: "Crown", icon: "👑", type: "decoration", effect: { happiness: 15 }, price: 200, sellPrice: 80 },
  { id: "sunglasses", name: "Sunglasses", icon: "🕶️", type: "decoration", effect: { happiness: 8 }, price: 30, sellPrice: 12 },
  { id: "bowtie", name: "Bowtie", icon: "🎀", type: "decoration", effect: { happiness: 6 }, price: 25, sellPrice: 10 },
  { id: "cape", name: "Cape", icon: "🦸", type: "decoration", effect: { happiness: 12 }, price: 80, sellPrice: 30 },
];

function broadcastState() {
  const stateForUI = {
    ...gameState,
    shopCatalog: SHOP_CATALOG,
    achievementDefs: ACHIEVEMENTS,
  };
  if (gameWindow && !gameWindow.isDestroyed()) {
    gameWindow.webContents.send("game-state-update", stateForUI);
  }
}

// ─── IPC Handlers ───
ipcMain.handle("get-game-state", () => {
  return { ...gameState, shopCatalog: SHOP_CATALOG, achievementDefs: ACHIEVEMENTS };
});

ipcMain.on("save-game-state", (_, state) => {
  Object.assign(gameState, state);
  saveGameState();
});

ipcMain.handle("earn-coins", (_, amount) => {
  gameState.coins += amount;
  gameState.totalCoinsEarned += amount;
  addXP(Math.ceil(amount / 2));
  checkAchievements();
  broadcastState();
  return gameState.coins;
});

ipcMain.handle("spend-coins", (_, amount) => {
  if (gameState.coins < amount) return { ok: false, coins: gameState.coins };
  gameState.coins -= amount;
  broadcastState();
  return { ok: true, coins: gameState.coins };
});

ipcMain.handle("buy-item", (_, itemId) => {
  const catalog = SHOP_CATALOG.find(i => i.id === itemId);
  if (!catalog) return { ok: false, reason: "Item not found" };
  if (gameState.coins < catalog.price) return { ok: false, reason: "Not enough coins" };

  gameState.coins -= catalog.price;
  gameState.totalItemsBought++;

  const existing = gameState.inventory.find(i => i.id === itemId);
  if (existing) {
    existing.quantity++;
  } else {
    gameState.inventory.push({ ...catalog, quantity: 1 });
  }
  addXP(5);
  checkAchievements();
  broadcastState();
  return { ok: true };
});

ipcMain.handle("sell-item", (_, itemId) => {
  const item = gameState.inventory.find(i => i.id === itemId);
  if (!item || item.quantity <= 0) return { ok: false };
  item.quantity--;
  if (item.quantity <= 0) {
    gameState.inventory = gameState.inventory.filter(i => i.id !== itemId);
  }
  const sellPrice = item.sellPrice || 1;
  gameState.coins += sellPrice;
  gameState.totalCoinsEarned += sellPrice;
  checkAchievements();
  broadcastState();
  return { ok: true, earned: sellPrice };
});

ipcMain.handle("use-item", (_, itemId) => {
  const item = gameState.inventory.find(i => i.id === itemId);
  if (!item || item.quantity <= 0) return { ok: false };

  if (item.type === "food") {
    item.quantity--;
    if (item.quantity <= 0) gameState.inventory = gameState.inventory.filter(i => i.id !== itemId);
    for (const [stat, val] of Object.entries(item.effect || {})) {
      if (gameState.stats[stat] !== undefined) {
        gameState.stats[stat] = Math.min(100, Math.max(0, gameState.stats[stat] + val));
      }
    }
    gameState.totalFoodFed++;
    addXP(3);
    if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "life-eat");
  } else if (item.type === "toy") {
    for (const [stat, val] of Object.entries(item.effect || {})) {
      if (gameState.stats[stat] !== undefined) {
        gameState.stats[stat] = Math.min(100, Math.max(0, gameState.stats[stat] + val));
      }
    }
    gameState.totalToysUsed++;
    addXP(3);
    const toyAnims = ["play-dance", "play-ball", "play-game", "play-music", "play-jump"];
    const anim = toyAnims[Math.floor(Math.random() * toyAnims.length)];
    if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", anim);
  } else if (item.type === "tool") {
    item.quantity--;
    if (item.quantity <= 0) gameState.inventory = gameState.inventory.filter(i => i.id !== itemId);
    for (const [stat, val] of Object.entries(item.effect || {})) {
      if (stat === "gardenSpeed") continue;
      if (gameState.stats[stat] !== undefined) {
        gameState.stats[stat] = Math.min(100, Math.max(0, gameState.stats[stat] + val));
      }
    }
    if (item.effect.cleanliness) {
      if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "life-shower");
    }
    if (item.effect.health) {
      if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "emotion-love");
    }
    addXP(2);
  } else if (item.type === "decoration") {
    for (const [stat, val] of Object.entries(item.effect || {})) {
      if (gameState.stats[stat] !== undefined) {
        gameState.stats[stat] = Math.min(100, Math.max(0, gameState.stats[stat] + val));
      }
    }
    addXP(1);
    if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "life-dress");
  }

  checkAchievements();
  broadcastState();
  return { ok: true };
});

ipcMain.handle("plant-seed", (_, plotIndex, seedId) => {
  if (plotIndex < 0 || plotIndex >= 16) return { ok: false };
  if (gameState.garden[plotIndex] !== null) return { ok: false, reason: "Plot occupied" };

  const seed = gameState.inventory.find(i => i.id === seedId && i.type === "seed");
  if (!seed || seed.quantity <= 0) return { ok: false, reason: "No seeds" };

  seed.quantity--;
  if (seed.quantity <= 0) gameState.inventory = gameState.inventory.filter(i => i.id !== seedId);

  gameState.garden[plotIndex] = {
    seedId: seed.id,
    name: seed.name.replace(" Seed", ""),
    icon: seed.harvestItem ? seed.harvestItem.icon : seed.icon,
    stage: "sprout",
    plantedAt: Date.now(),
    growTime: seed.growTime || 60000,
    watered: 0,
    harvestItem: seed.harvestItem || null,
  };

  addXP(2);
  if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "game-plant");
  broadcastState();
  return { ok: true };
});

ipcMain.handle("water-plot", (_, plotIndex) => {
  const plot = gameState.garden[plotIndex];
  if (!plot || plot.stage === "ready") return { ok: false };
  plot.watered++;
  addXP(1);
  if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "game-water");
  broadcastState();
  return { ok: true };
});

ipcMain.handle("harvest-plot", (_, plotIndex) => {
  const plot = gameState.garden[plotIndex];
  if (!plot || plot.stage !== "ready") return { ok: false };

  if (plot.harvestItem) {
    const existing = gameState.inventory.find(i => i.id === plot.harvestItem.id);
    if (existing) {
      existing.quantity++;
    } else {
      gameState.inventory.push({ ...plot.harvestItem, quantity: 1 });
    }
  }

  gameState.totalCropsHarvested++;
  gameState.garden[plotIndex] = null;
  addXP(5);
  if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "game-harvest");
  checkAchievements();
  broadcastState();
  return { ok: true };
});

ipcMain.handle("get-achievements", () => {
  return { unlocked: gameState.achievements, defs: ACHIEVEMENTS };
});

ipcMain.handle("game-won", (_, coinsEarned) => {
  gameState.totalGamesPlayed++;
  gameState.totalGamesWon++;
  gameState.coins += coinsEarned;
  gameState.totalCoinsEarned += coinsEarned;
  addXP(10);
  checkAchievements();
  broadcastState();
  if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "emotion-excited");
  return { ok: true };
});

ipcMain.handle("game-lost", () => {
  gameState.totalGamesPlayed++;
  addXP(3);
  checkAchievements();
  broadcastState();
  return { ok: true };
});

ipcMain.on("set-pet-animation", (_, anim) => {
  if (petWindow && !petWindow.isDestroyed()) {
    petWindow.webContents.send("set-animation", anim);
  }
});

// ─── Keyboard Activity Detection ───
let lastKeyActivity = 0;
let keyActivityTimer = null;
function startKeyboardDetection() {
  keyActivityTimer = setInterval(() => {
    try {
      const idle = require("electron").powerMonitor.getSystemIdleTime();
      if (idle < 3 && Date.now() - lastKeyActivity > 5000) {
        lastKeyActivity = Date.now();
        if (petWindow && !petWindow.isDestroyed()) {
          petWindow.webContents.send("user-typing");
        }
      }
    } catch (e) {}
  }, 3000);
}

// ─── Window Creation ───
function createPetWindow() {
  const { width: screenW, height: screenH } = screen.getPrimaryDisplay().workAreaSize;

  petWindow = new BrowserWindow({
    width: PET_SIZE,
    height: PET_SIZE,
    x: Math.floor(screenW / 2 - PET_SIZE / 2),
    y: screenH - PET_SIZE - 20,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  });

  petWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  petWindow.setIgnoreMouseEvents(false);
  if (process.platform === "darwin") petWindow.setWindowButtonVisibility(false);

  petWindow.loadFile(path.join(__dirname, "index.html"));
  petWindow.on("closed", () => { petWindow = null; });
}

function createGameWindow() {
  if (gameWindow && !gameWindow.isDestroyed()) {
    gameWindow.focus();
    return;
  }

  const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;

  gameWindow = new BrowserWindow({
    width: 900,
    height: 650,
    x: Math.floor(sw / 2 - 450),
    y: Math.floor(sh / 2 - 325),
    frame: false,
    resizable: true,
    minWidth: 700,
    minHeight: 500,
    backgroundColor: "#1a1a2e",
    webPreferences: {
      preload: path.join(__dirname, "preload-game.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  gameWindow.loadFile(path.join(__dirname, "game-panel.html"));
  gameWindow.on("closed", () => { gameWindow = null; });
}

ipcMain.on("open-game-panel", () => createGameWindow());

ipcMain.on("close-game-panel", () => {
  if (gameWindow && !gameWindow.isDestroyed()) gameWindow.close();
});

ipcMain.on("minimize-game-panel", () => {
  if (gameWindow && !gameWindow.isDestroyed()) gameWindow.minimize();
});

function createTray() {
  const iconPath = path.join(__dirname, "..", "assets", "icon.png");
  let trayIcon;
  try {
    trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  } catch {
    trayIcon = nativeImage.createEmpty();
  }

  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Show Clawd", click: () => { if (petWindow) { petWindow.show(); } } },
    { label: "Game Panel", click: () => createGameWindow() },
    { type: "separator" },
    { label: "Reset Position", click: () => {
      if (petWindow) {
        const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;
        petWindow.setPosition(Math.floor(sw / 2 - PET_SIZE / 2), sh - PET_SIZE - 20);
      }
    }},
    { type: "separator" },
    { label: "Quit", click: () => { saveGameState(); app.quit(); } },
  ]);

  tray.setToolTip("Clawd Desktop Pet");
  tray.setContextMenu(contextMenu);
}

// ─── Drag IPC ───
ipcMain.on("drag-start", (_, { dx, dy }) => {
  if (!petWindow) return;
  const [x, y] = petWindow.getPosition();
  petWindow.setPosition(x + dx, y + dy);
});

ipcMain.on("get-cursor-pos", (event) => {
  if (!petWindow) { event.returnValue = { x: 0, y: 0 }; return; }
  const cursor = screen.getCursorScreenPoint();
  const [wx, wy] = petWindow.getPosition();
  const [ww, wh] = petWindow.getSize();
  event.returnValue = { x: cursor.x - wx - ww / 2, y: cursor.y - wy - wh / 2 };
});

ipcMain.on("set-ignore-mouse", (_, ignore) => {
  if (petWindow) petWindow.setIgnoreMouseEvents(ignore, { forward: true });
});

// ─── App Lifecycle ───
app.whenReady().then(() => {
  loadGameState();
  createPetWindow();
  createTray();
  startStatDecay();
  startGardenTimer();
  startKeyboardDetection();

  setInterval(saveGameState, SAVE_INTERVAL);
});

app.on("before-quit", () => saveGameState());
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (!petWindow) createPetWindow(); });
