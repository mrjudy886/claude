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
      { id: "bread", name: "面包", icon: "🍞", type: "food", effect: { hunger: 15 }, quantity: 3, sellPrice: 2 },
      { id: "ball", name: "皮球", icon: "⚽", type: "toy", effect: { happiness: 20 }, quantity: 1, sellPrice: 5 },
      { id: "carrot_seed", name: "胡萝卜种子", icon: "🥕", type: "seed", growTime: 60000, harvestItem: { id: "carrot", name: "胡萝卜", icon: "🥕", type: "food", effect: { hunger: 10 }, sellPrice: 8 }, quantity: 2, sellPrice: 1 },
      { id: "normal_bait", name: "普通鱼饵", icon: "🪱", type: "bait", quantity: 5, sellPrice: 1 },
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
    totalFishCaught: 0,
    totalDishesCooked: 0,
    totalQuestsCompleted: 0,
    totalWheelSpins: 0,
    playTimeSeconds: 0,
    dailyQuestsDate: null,
    weeklyQuestsDate: null,
    dailyQuests: [],
    weeklyQuests: [],
    lastWheelSpin: null,
    fishCollection: [],
    recipesUnlocked: [],
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
  first_meal: { name: "初次喂食", desc: "第一次喂食宠物", icon: "🍞", check: (s) => s.totalFoodFed >= 1 },
  foodie: { name: "美食家", desc: "喂食宠物10次", icon: "🍔", check: (s) => s.totalFoodFed >= 10 },
  gourmet: { name: "饕餮之徒", desc: "喂食宠物50次", icon: "🍳", check: (s) => s.totalFoodFed >= 50 },
  first_harvest: { name: "第一次收获", desc: "收获第一株作物", icon: "🌾", check: (s) => s.totalCropsHarvested >= 1 },
  green_thumb: { name: "绿手指", desc: "收获10株作物", icon: "🌱", check: (s) => s.totalCropsHarvested >= 10 },
  master_gardener: { name: "园艺大师", desc: "收获50株作物", icon: "🌻", check: (s) => s.totalCropsHarvested >= 50 },
  coin_collector: { name: "零花钱", desc: "累计获得100金币", icon: "🪙", check: (s) => s.totalCoinsEarned >= 100 },
  rich: { name: "小有积蓄", desc: "累计获得500金币", icon: "💰", check: (s) => s.totalCoinsEarned >= 500 },
  wealthy: { name: "富甲一方", desc: "累计获得2000金币", icon: "💎", check: (s) => s.totalCoinsEarned >= 2000 },
  tycoon: { name: "商业大亨", desc: "累计获得10000金币", icon: "🏦", check: (s) => s.totalCoinsEarned >= 10000 },
  happy_pet: { name: "快乐宠物", desc: "快乐值达到100", icon: "😊", check: (s) => s.stats.happiness >= 100 },
  healthy_pet: { name: "健康达标", desc: "所有属性超过80", icon: "💪", check: (s) => Object.values(s.stats).every(v => v >= 80) },
  gamer: { name: "游戏新手", desc: "玩10局小游戏", icon: "🎮", check: (s) => s.totalGamesPlayed >= 10 },
  game_master: { name: "游戏达人", desc: "赢20局小游戏", icon: "🏆", check: (s) => s.totalGamesWon >= 20 },
  shopper: { name: "购物新手", desc: "购买10件物品", icon: "🛒", check: (s) => s.totalItemsBought >= 10 },
  shopping_spree: { name: "购物狂", desc: "购买50件物品", icon: "🎁", check: (s) => s.totalItemsBought >= 50 },
  level5: { name: "初露锋芒", desc: "达到5级", icon: "⭐", check: (s) => s.level >= 5 },
  level10: { name: "小有名气", desc: "达到10级", icon: "🌟", check: (s) => s.level >= 10 },
  level20: { name: "声名远播", desc: "达到20级", icon: "💫", check: (s) => s.level >= 20 },
  playtime1h: { name: "忠实伙伴", desc: "游玩1小时", icon: "⏰", check: (s) => s.playTimeSeconds >= 3600 },
  playtime10h: { name: "最佳好友", desc: "游玩10小时", icon: "💕", check: (s) => s.playTimeSeconds >= 36000 },
  first_toy: { name: "玩伴", desc: "第一次使用玩具", icon: "🧸", check: (s) => s.totalToysUsed >= 1 },
  first_fish: { name: "初次垂钓", desc: "钓到第一条鱼", icon: "🐟", check: (s) => s.totalFishCaught >= 1 },
  first_cook: { name: "初次烹饪", desc: "制作第一道菜", icon: "🍳", check: (s) => s.totalDishesCooked >= 1 },
  quest_starter: { name: "任务新手", desc: "完成5个任务", icon: "📋", check: (s) => s.totalQuestsCompleted >= 5 },
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
  { id: "bread", name: "面包", icon: "🍞", type: "food", effect: { hunger: 15 }, price: 5, sellPrice: 2 },
  { id: "apple", name: "苹果", icon: "🍎", type: "food", effect: { hunger: 10, health: 5 }, price: 8, sellPrice: 3 },
  { id: "cake", name: "蛋糕", icon: "🎂", type: "food", effect: { hunger: 25, happiness: 10 }, price: 20, sellPrice: 8 },
  { id: "sushi", name: "寿司", icon: "🍣", type: "food", effect: { hunger: 30, happiness: 5 }, price: 30, sellPrice: 12 },
  { id: "pizza", name: "披萨", icon: "🍕", type: "food", effect: { hunger: 20, happiness: 8 }, price: 15, sellPrice: 6 },
  { id: "cookie", name: "饼干", icon: "🍪", type: "food", effect: { hunger: 8, happiness: 12 }, price: 10, sellPrice: 4 },
  { id: "steak", name: "牛排", icon: "🥩", type: "food", effect: { hunger: 40, energy: 10 }, price: 40, sellPrice: 16 },
  { id: "salad", name: "沙拉", icon: "🥗", type: "food", effect: { hunger: 12, health: 10 }, price: 12, sellPrice: 5 },
  { id: "icecream", name: "冰淇淋", icon: "🍨", type: "food", effect: { hunger: 5, happiness: 20 }, price: 18, sellPrice: 7 },
  { id: "ramen", name: "拉面", icon: "🍜", type: "food", effect: { hunger: 35, energy: 5 }, price: 25, sellPrice: 10 },
  { id: "coffee", name: "咖啡", icon: "☕", type: "food", effect: { energy: 30, happiness: 5 }, price: 10, sellPrice: 4 },
  { id: "tea", name: "茶", icon: "🍵", type: "food", effect: { energy: 15, health: 5, cleanliness: 3 }, price: 8, sellPrice: 3 },
  { id: "lobster", name: "龙虾", icon: "🦞", type: "food", effect: { hunger: 50, happiness: 15, health: 10 }, price: 60, sellPrice: 24 },
  { id: "feast", name: "满汉全席", icon: "🍱", type: "food", effect: { hunger: 100, happiness: 30, energy: 20, health: 15 }, price: 200, sellPrice: 80 },
  { id: "ball", name: "皮球", icon: "⚽", type: "toy", effect: { happiness: 20, energy: -10 }, price: 15, sellPrice: 5 },
  { id: "kite", name: "风筝", icon: "🪁", type: "toy", effect: { happiness: 25, energy: -15 }, price: 25, sellPrice: 10 },
  { id: "game_console", name: "游戏机", icon: "🎮", type: "toy", effect: { happiness: 35, energy: -5 }, price: 100, sellPrice: 40 },
  { id: "guitar", name: "吉他", icon: "🎸", type: "toy", effect: { happiness: 30, energy: -8 }, price: 80, sellPrice: 30 },
  { id: "skateboard", name: "滑板", icon: "🛹", type: "toy", effect: { happiness: 28, energy: -20 }, price: 60, sellPrice: 22 },
  { id: "book", name: "书本", icon: "📚", type: "toy", effect: { happiness: 15, energy: -3 }, price: 20, sellPrice: 8 },
  { id: "puzzle", name: "拼图", icon: "🧩", type: "toy", effect: { happiness: 18, energy: -5 }, price: 30, sellPrice: 12 },
  { id: "teddy", name: "泰迪熊", icon: "🧸", type: "toy", effect: { happiness: 22, energy: 5 }, price: 40, sellPrice: 15 },
  { id: "paint_set", name: "画板", icon: "🎨", type: "toy", effect: { happiness: 25, energy: -10 }, price: 35, sellPrice: 14 },
  { id: "telescope", name: "望远镜", icon: "🔭", type: "toy", effect: { happiness: 20, energy: -5 }, price: 50, sellPrice: 20 },
  { id: "rubik", name: "魔方", icon: "🧊", type: "toy", effect: { happiness: 16, energy: -3 }, price: 20, sellPrice: 8 },
  { id: "carrot_seed", name: "胡萝卜种子", icon: "🥕", type: "seed", growTime: 60000, harvestItem: { id: "carrot", name: "胡萝卜", icon: "🥕", type: "food", effect: { hunger: 10 }, sellPrice: 8 }, price: 5, sellPrice: 1 },
  { id: "tomato_seed", name: "番茄种子", icon: "🍅", type: "seed", growTime: 90000, harvestItem: { id: "tomato", name: "番茄", icon: "🍅", type: "food", effect: { hunger: 12, health: 5 }, sellPrice: 12 }, price: 8, sellPrice: 2 },
  { id: "sunflower_seed", name: "向日葵种子", icon: "🌻", type: "seed", growTime: 120000, harvestItem: { id: "sunflower", name: "向日葵", icon: "🌻", type: "food", effect: { happiness: 15 }, sellPrice: 18 }, price: 12, sellPrice: 3 },
  { id: "strawberry_seed", name: "草莓种子", icon: "🍓", type: "seed", growTime: 150000, harvestItem: { id: "strawberry", name: "草莓", icon: "🍓", type: "food", effect: { hunger: 8, happiness: 12 }, sellPrice: 22 }, price: 15, sellPrice: 4 },
  { id: "pumpkin_seed", name: "南瓜种子", icon: "🎃", type: "seed", growTime: 200000, harvestItem: { id: "pumpkin", name: "南瓜", icon: "🎃", type: "food", effect: { hunger: 30 }, sellPrice: 30 }, price: 20, sellPrice: 5 },
  { id: "watermelon_seed", name: "西瓜种子", icon: "🍉", type: "seed", growTime: 250000, harvestItem: { id: "watermelon", name: "西瓜", icon: "🍉", type: "food", effect: { hunger: 25, happiness: 10 }, sellPrice: 38 }, price: 25, sellPrice: 6 },
  { id: "golden_apple_seed", name: "金苹果种子", icon: "🍏", type: "seed", growTime: 300000, harvestItem: { id: "golden_apple", name: "金苹果", icon: "🍏", type: "food", effect: { hunger: 50, health: 30, happiness: 20 }, sellPrice: 80 }, price: 50, sellPrice: 12 },
  { id: "rainbow_seed", name: "彩虹花种子", icon: "🌈", type: "seed", growTime: 600000, harvestItem: { id: "rainbow_flower", name: "彩虹花", icon: "🌈", type: "decoration", effect: { happiness: 30 }, sellPrice: 150 }, price: 100, sellPrice: 25 },
  { id: "soap", name: "肥皂", icon: "🧼", type: "tool", effect: { cleanliness: 30 }, price: 8, sellPrice: 3 },
  { id: "shampoo", name: "洗发水", icon: "🧴", type: "tool", effect: { cleanliness: 50 }, price: 15, sellPrice: 6 },
  { id: "medicine", name: "药品", icon: "💊", type: "tool", effect: { health: 30 }, price: 25, sellPrice: 10 },
  { id: "energy_drink", name: "能量饮料", icon: "⚡", type: "tool", effect: { energy: 40 }, price: 20, sellPrice: 8 },
  { id: "fertilizer", name: "肥料", icon: "💩", type: "tool", effect: { gardenSpeed: 2 }, price: 15, sellPrice: 5 },
  { id: "super_fertilizer", name: "超级肥料", icon: "✨", type: "tool", effect: { gardenSpeed: 4 }, price: 30, sellPrice: 12 },
  { id: "fishing_rod_up", name: "鱼竿升级", icon: "🎣", type: "tool", effect: { fishingBonus: 1 }, price: 50, sellPrice: 20 },
  { id: "oven", name: "高级烤箱", icon: "🔥", type: "tool", effect: { cookingBonus: 1 }, price: 80, sellPrice: 30 },
  { id: "normal_bait", name: "普通鱼饵", icon: "🪱", type: "bait", price: 3, sellPrice: 1 },
  { id: "good_bait", name: "高级鱼饵", icon: "🐛", type: "bait", price: 8, sellPrice: 3 },
  { id: "gold_bait", name: "金色鱼饵", icon: "✨", type: "bait", price: 20, sellPrice: 8 },
  { id: "legend_bait", name: "传说鱼饵", icon: "🌟", type: "bait", price: 50, sellPrice: 20 },
  { id: "flour", name: "面粉", icon: "🌾", type: "ingredient", price: 3, sellPrice: 1 },
  { id: "egg", name: "鸡蛋", icon: "🥚", type: "ingredient", price: 5, sellPrice: 2 },
  { id: "milk", name: "牛奶", icon: "🥛", type: "ingredient", price: 8, sellPrice: 3 },
  { id: "butter", name: "黄油", icon: "🧈", type: "ingredient", price: 10, sellPrice: 4 },
  { id: "chocolate", name: "巧克力", icon: "🍫", type: "ingredient", price: 15, sellPrice: 6 },
  { id: "cream", name: "奶油", icon: "🍦", type: "ingredient", price: 12, sellPrice: 5 },
  { id: "honey", name: "蜂蜜", icon: "🍯", type: "ingredient", price: 20, sellPrice: 8 },
  { id: "truffle", name: "松露", icon: "🍄", type: "ingredient", price: 80, sellPrice: 30 },
  { id: "top_hat", name: "礼帽", icon: "🎩", type: "decoration", effect: { happiness: 5 }, price: 50, sellPrice: 20 },
  { id: "crown", name: "皇冠", icon: "👑", type: "decoration", effect: { happiness: 15 }, price: 200, sellPrice: 80 },
  { id: "sunglasses", name: "墨镜", icon: "🕶️", type: "decoration", effect: { happiness: 8 }, price: 30, sellPrice: 12 },
  { id: "bowtie", name: "领结", icon: "🎀", type: "decoration", effect: { happiness: 6 }, price: 25, sellPrice: 10 },
  { id: "cape", name: "披风", icon: "🦸", type: "decoration", effect: { happiness: 12 }, price: 80, sellPrice: 30 },
  { id: "wings", name: "翅膀", icon: "🪽", type: "decoration", effect: { happiness: 18 }, price: 150, sellPrice: 60 },
  { id: "halo", name: "光环", icon: "😇", type: "decoration", effect: { happiness: 20 }, price: 300, sellPrice: 120 },
  { id: "dragon_set", name: "龙之套装", icon: "🐉", type: "decoration", effect: { happiness: 30 }, price: 500, sellPrice: 200 },
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
  if (!catalog) return { ok: false, reason: "物品未找到" };
  if (gameState.coins < catalog.price) return { ok: false, reason: "金币不足" };

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
  if (gameState.garden[plotIndex] !== null) return { ok: false, reason: "地块已被占用" };

  const seed = gameState.inventory.find(i => i.id === seedId && i.type === "seed");
  if (!seed || seed.quantity <= 0) return { ok: false, reason: "没有种子" };

  seed.quantity--;
  if (seed.quantity <= 0) gameState.inventory = gameState.inventory.filter(i => i.id !== seedId);

  gameState.garden[plotIndex] = {
    seedId: seed.id,
    name: seed.name.replace("种子", ""),
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

ipcMain.on("show-pet-context-menu", (event) => {
  const template = [
    { label: "🎮 游戏面板", click: () => createGameWindow() },
    { type: "separator" },
    { label: "待机", click: () => { if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "idle"); } },
    { label: "思考", click: () => { if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "thinking"); } },
    { label: "工作", click: () => { if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "working"); } },
    { label: "开心", click: () => { if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation", "happy"); } },
    { label: "睡觉", click: () => { if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation-command", "sleep"); } },
    { label: "散步", click: () => { if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation-command", "roam"); } },
    { type: "separator" },
    { label: "自动模式", click: () => { if (petWindow && !petWindow.isDestroyed()) petWindow.webContents.send("set-animation-command", "auto-toggle"); } },
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
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
    { label: "显示 Clawd", click: () => { if (petWindow) { petWindow.show(); } } },
    { label: "🎮 游戏面板", click: () => createGameWindow() },
    { type: "separator" },
    { label: "重置位置", click: () => {
      if (petWindow) {
        const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;
        petWindow.setPosition(Math.floor(sw / 2 - PET_SIZE / 2), sh - PET_SIZE - 20);
      }
    }},
    { type: "separator" },
    { label: "退出", click: () => { saveGameState(); app.quit(); } },
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
