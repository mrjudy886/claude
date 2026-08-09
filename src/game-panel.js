// ============================================================
// Clawd 游戏面板 - 完整游戏引擎
// 所有文本均为中文
// ============================================================

// ============================================================
// 商店物品定义 (50+)
// ============================================================
const SHOP_ITEMS = [
  // --- 食物 (12) ---
  { id: 'bread', name: '面包', icon: '🍞', type: 'food', category: 'food', price: 5, effect: { hunger: 15 }, desc: '简单但能填饱肚子' },
  { id: 'apple', name: '苹果', icon: '🍎', type: 'food', category: 'food', price: 8, effect: { hunger: 12, health: 3 }, desc: '每天一个苹果，医生远离我' },
  { id: 'cookie', name: '饼干', icon: '🍪', type: 'food', category: 'food', price: 10, effect: { hunger: 10, happiness: 5 }, desc: '香甜酥脆的小零食' },
  { id: 'salad', name: '沙拉', icon: '🥗', type: 'food', category: 'food', price: 12, effect: { hunger: 14, health: 5 }, desc: '健康绿色蔬菜' },
  { id: 'pizza', name: '披萨', icon: '🍕', type: 'food', category: 'food', price: 15, effect: { hunger: 25, happiness: 5 }, desc: '谁不爱披萨呢' },
  { id: 'icecream', name: '冰淇淋', icon: '🍨', type: 'food', category: 'food', price: 18, effect: { hunger: 8, happiness: 15 }, desc: '冰凉爽口的甜品' },
  { id: 'cake', name: '蛋糕', icon: '🎂', type: 'food', category: 'food', price: 20, effect: { hunger: 20, happiness: 10 }, desc: '庆祝时刻必备' },
  { id: 'ramen', name: '拉面', icon: '🍜', type: 'food', category: 'food', price: 25, effect: { hunger: 30, energy: 5 }, desc: '热腾腾的一碗拉面' },
  { id: 'sushi', name: '寿司', icon: '🍣', type: 'food', category: 'food', price: 30, effect: { hunger: 22, health: 8 }, desc: '新鲜美味的寿司' },
  { id: 'steak', name: '牛排', icon: '🥩', type: 'food', category: 'food', price: 40, effect: { hunger: 40, energy: 10 }, desc: '顶级牛排，鲜嫩多汁' },
  { id: 'lobster', name: '龙虾', icon: '🦞', type: 'food', category: 'food', price: 60, effect: { hunger: 35, happiness: 15, health: 5 }, desc: '豪华海鲜大餐' },
  { id: 'feast', name: '满汉全席', icon: '🍱', type: 'food', category: 'food', price: 200, effect: { hunger: 100, happiness: 30, energy: 20, health: 10 }, desc: '传说中的帝王盛宴' },

  // --- 玩具 (10) ---
  { id: 'ball', name: '皮球', icon: '⚽', type: 'toy', category: 'toy', price: 15, effect: { happiness: 15, energy: -5 }, desc: '一起来踢球吧' },
  { id: 'kite', name: '风筝', icon: '🪁', type: 'toy', category: 'toy', price: 25, effect: { happiness: 20, energy: -10 }, desc: '在天空中自由翱翔' },
  { id: 'puzzle', name: '拼图', icon: '🧩', type: 'toy', category: 'toy', price: 30, effect: { happiness: 18 }, desc: '锻炼脑力的好工具' },
  { id: 'rubik', name: '魔方', icon: '🟩', type: 'toy', category: 'toy', price: 20, effect: { happiness: 12 }, desc: '经典益智玩具' },
  { id: 'easel', name: '画板', icon: '🎨', type: 'toy', category: 'toy', price: 35, effect: { happiness: 22 }, desc: '画出心中的世界' },
  { id: 'teddy', name: '泰迪熊', icon: '🧸', type: 'toy', category: 'toy', price: 40, effect: { happiness: 25 }, desc: '最柔软的小伙伴' },
  { id: 'telescope', name: '望远镜', icon: '🔭', type: 'toy', category: 'toy', price: 50, effect: { happiness: 28 }, desc: '探索星空的奥秘' },
  { id: 'skateboard', name: '滑板', icon: '🛹', type: 'toy', category: 'toy', price: 60, effect: { happiness: 30, energy: -15 }, desc: '酷炫滑板少年' },
  { id: 'guitar', name: '吉他', icon: '🎸', type: 'toy', category: 'toy', price: 80, effect: { happiness: 35, energy: -10 }, desc: '弹奏美妙的旋律' },
  { id: 'gameconsole', name: '游戏机', icon: '🎮', type: 'toy', category: 'toy', price: 100, effect: { happiness: 40 }, desc: '终极娱乐神器' },

  // --- 种子 (8) ---
  { id: 'carrot_seed', name: '胡萝卜种子', icon: '🥕', type: 'seed', category: 'seed', price: 5, growTime: 30, harvestValue: 12, harvestIcon: '🥕', harvestName: '胡萝卜', harvestId: 'carrot', desc: '生长迅速 (30秒)' },
  { id: 'tomato_seed', name: '番茄种子', icon: '🍅', type: 'seed', category: 'seed', price: 8, growTime: 60, harvestValue: 20, harvestIcon: '🍅', harvestName: '番茄', harvestId: 'tomato', desc: '多汁美味 (60秒)' },
  { id: 'sunflower_seed', name: '向日葵种子', icon: '🌻', type: 'seed', category: 'seed', price: 12, growTime: 90, harvestValue: 30, harvestIcon: '🌻', harvestName: '向日葵', harvestId: 'sunflower', desc: '阳光灿烂 (90秒)' },
  { id: 'strawberry_seed', name: '草莓种子', icon: '🍓', type: 'seed', category: 'seed', price: 15, growTime: 120, harvestValue: 38, harvestIcon: '🍓', harvestName: '草莓', harvestId: 'strawberry', desc: '香甜可口 (2分钟)' },
  { id: 'pumpkin_seed', name: '南瓜种子', icon: '🎃', type: 'seed', category: 'seed', price: 20, growTime: 180, harvestValue: 50, harvestIcon: '🎃', harvestName: '南瓜', harvestId: 'pumpkin', desc: '大丰收 (3分钟)' },
  { id: 'watermelon_seed', name: '西瓜种子', icon: '🍉', type: 'seed', category: 'seed', price: 25, growTime: 240, harvestValue: 65, harvestIcon: '🍉', harvestName: '西瓜', harvestId: 'watermelon', desc: '清凉解暑 (4分钟)' },
  { id: 'golden_apple_seed', name: '金苹果种子', icon: '🌟', type: 'seed', category: 'seed', price: 50, growTime: 300, harvestValue: 120, harvestIcon: '🌟', harvestName: '金苹果', harvestId: 'golden_apple', desc: '传说之果 (5分钟)' },
  { id: 'rainbow_flower_seed', name: '彩虹花种子', icon: '🌈', type: 'seed', category: 'seed', price: 100, growTime: 420, harvestValue: 250, harvestIcon: '🌈', harvestName: '彩虹花', harvestId: 'rainbow_flower', desc: '梦幻珍品 (7分钟)' },

  // --- 工具 (8) ---
  { id: 'soap', name: '肥皂', icon: '🧼', type: 'tool', category: 'tool', price: 8, effect: { cleanliness: 25 }, desc: '基础清洁用品', consumable: true },
  { id: 'shampoo', name: '洗发水', icon: '🧴', type: 'tool', category: 'tool', price: 15, effect: { cleanliness: 40, happiness: 5 }, desc: '让毛发柔顺光亮', consumable: true },
  { id: 'medicine', name: '药品', icon: '💊', type: 'tool', category: 'tool', price: 25, effect: { health: 30 }, desc: '恢复健康值', consumable: true },
  { id: 'energy_drink', name: '能量饮料', icon: '🥤', type: 'tool', category: 'tool', price: 20, effect: { energy: 35 }, desc: '瞬间充满活力', consumable: true },
  { id: 'fertilizer', name: '肥料', icon: '💩', type: 'tool', category: 'tool', price: 15, desc: '让作物生长速度翻倍', consumable: true },
  { id: 'super_fertilizer', name: '超级肥料', icon: '✨', type: 'tool', category: 'tool', price: 30, desc: '让作物生长速度4倍', consumable: true },
  { id: 'rod_upgrade', name: '鱼竿升级', icon: '🎣', type: 'tool', category: 'tool', price: 50, desc: '提升钓鱼成功率', consumable: false },
  { id: 'adv_oven', name: '高级烤箱', icon: '🔥', type: 'tool', category: 'tool', price: 80, desc: '解锁高级食谱', consumable: false },

  // --- 装饰 (8) ---
  { id: 'tophat', name: '礼帽', icon: '🎩', type: 'decoration', category: 'decoration', price: 50, effect: { happiness: 8 }, desc: '绅士必备' },
  { id: 'sunglasses', name: '墨镜', icon: '🕶️', type: 'decoration', category: 'decoration', price: 30, effect: { happiness: 5 }, desc: '酷酷的造型' },
  { id: 'bowtie', name: '领结', icon: '🎀', type: 'decoration', category: 'decoration', price: 25, effect: { happiness: 4 }, desc: '优雅的点缀' },
  { id: 'cape', name: '披风', icon: '🦸', type: 'decoration', category: 'decoration', price: 80, effect: { happiness: 12 }, desc: '英雄气概' },
  { id: 'wings', name: '翅膀', icon: '🪽', type: 'decoration', category: 'decoration', price: 150, effect: { happiness: 18 }, desc: '自由飞翔的梦想' },
  { id: 'crown', name: '皇冠', icon: '👑', type: 'decoration', category: 'decoration', price: 200, effect: { happiness: 20 }, desc: '尊贵的皇家头饰' },
  { id: 'halo', name: '光环', icon: '😇', type: 'decoration', category: 'decoration', price: 300, effect: { happiness: 25 }, desc: '神圣的光芒' },
  { id: 'dragon_set', name: '龙之套装', icon: '🐉', type: 'decoration', category: 'decoration', price: 500, effect: { happiness: 40 }, desc: '传说中的龙族装备' },

  // --- 鱼饵 (5) ---
  { id: 'basic_bait', name: '普通鱼饵', icon: '🪱', type: 'bait', category: 'bait', price: 3, fishBonus: 0, desc: '基础鱼饵，聊胜于无' },
  { id: 'good_bait', name: '高级鱼饵', icon: '🐛', type: 'bait', category: 'bait', price: 8, fishBonus: 1, desc: '更好的鱼饵，更好的收获' },
  { id: 'gold_bait', name: '金色鱼饵', icon: '✨', type: 'bait', category: 'bait', price: 20, fishBonus: 2, desc: '闪闪发光，鱼儿争相上钩' },
  { id: 'legend_bait', name: '传说鱼饵', icon: '🌟', type: 'bait', category: 'bait', price: 50, fishBonus: 3, desc: '传说中的鱼饵，可能钓到传说鱼' },
  { id: 'ultimate_bait', name: '万能鱼饵', icon: '💎', type: 'bait', category: 'bait', price: 100, fishBonus: 4, desc: '极品鱼饵，传说鱼概率大增' },

  // --- 食材 (8) ---
  { id: 'flour', name: '面粉', icon: '🌾', type: 'ingredient', category: 'ingredient', price: 3, desc: '烹饪的基础材料' },
  { id: 'egg', name: '鸡蛋', icon: '🥚', type: 'ingredient', category: 'ingredient', price: 5, desc: '新鲜的鸡蛋' },
  { id: 'milk', name: '牛奶', icon: '🥛', type: 'ingredient', category: 'ingredient', price: 8, desc: '纯正的鲜牛奶' },
  { id: 'butter', name: '黄油', icon: '🧈', type: 'ingredient', category: 'ingredient', price: 10, desc: '烘焙好帮手' },
  { id: 'chocolate', name: '巧克力', icon: '🍫', type: 'ingredient', category: 'ingredient', price: 15, desc: '浓郁可可风味' },
  { id: 'cream', name: '奶油', icon: '🍦', type: 'ingredient', category: 'ingredient', price: 12, desc: '丝滑柔软的奶油' },
  { id: 'honey', name: '蜂蜜', icon: '🍯', type: 'ingredient', category: 'ingredient', price: 20, desc: '天然甜蜜的蜂蜜' },
  { id: 'truffle', name: '松露', icon: '🍄', type: 'ingredient', category: 'ingredient', price: 80, desc: '极其稀有的美味' },
];

// ============================================================
// 鱼类定义
// ============================================================
const FISH_TYPES = [
  // 普通
  { id: 'crucian', name: '鲫鱼', icon: '🐟', rarity: 'common', value: 5, weight: 40 },
  { id: 'carp', name: '鲤鱼', icon: '🐠', rarity: 'common', value: 8, weight: 35 },
  { id: 'grass_fish', name: '草鱼', icon: '🐟', rarity: 'common', value: 10, weight: 25 },
  // 稀有
  { id: 'goldfish', name: '金鱼', icon: '🐠', rarity: 'rare', value: 20, weight: 15 },
  { id: 'pufferfish', name: '河豚', icon: '🐡', rarity: 'rare', value: 25, weight: 12 },
  { id: 'swordfish', name: '剑鱼', icon: '🗡️', rarity: 'rare', value: 30, weight: 10 },
  // 史诗
  { id: 'lobster_fish', name: '龙虾', icon: '🦞', rarity: 'epic', value: 50, weight: 6 },
  { id: 'octopus', name: '章鱼', icon: '🐙', rarity: 'epic', value: 60, weight: 5 },
  { id: 'tuna', name: '金枪鱼', icon: '🐟', rarity: 'epic', value: 80, weight: 4 },
  // 传说
  { id: 'mermaid_tear', name: '美人鱼之泪', icon: '💧', rarity: 'legendary', value: 200, weight: 1 },
  { id: 'dragon_fish', name: '龙鱼', icon: '🐲', rarity: 'legendary', value: 500, weight: 0.5 },
  { id: 'sea_king_heart', name: '海王之心', icon: '💙', rarity: 'legendary', value: 1000, weight: 0.2 },
];

const RARITY_NAMES = { common: '普通', rare: '稀有', epic: '史诗', legendary: '传说' };
const RARITY_COLORS = { common: '#aaa', rare: '#4dabf7', epic: '#be4bdb', legendary: '#ffd43b' };

// ============================================================
// 食谱定义 (15+)
// ============================================================
const RECIPES = [
  { id: 'fried_egg', name: '煎蛋', icon: '🍳', ingredients: [{ id: 'egg', qty: 1 }], value: 8, xp: 3 },
  { id: 'honey_bread', name: '蜂蜜面包', icon: '🍞', ingredients: [{ id: 'bread', qty: 1 }, { id: 'honey', qty: 1 }], value: 15, xp: 5 },
  { id: 'bread_pudding', name: '面包布丁', icon: '🍮', ingredients: [{ id: 'bread', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'milk', qty: 1 }], value: 25, xp: 8 },
  { id: 'strawberry_shake', name: '草莓奶昔', icon: '🥤', ingredients: [{ id: 'strawberry', qty: 1 }, { id: 'milk', qty: 1 }, { id: 'cream', qty: 1 }], value: 30, xp: 10 },
  { id: 'pumpkin_soup', name: '南瓜汤', icon: '🥣', ingredients: [{ id: 'pumpkin', qty: 1 }, { id: 'milk', qty: 1 }, { id: 'butter', qty: 1 }], value: 35, xp: 10 },
  { id: 'watermelon_slush', name: '西瓜冰沙', icon: '🍧', ingredients: [{ id: 'watermelon', qty: 1 }, { id: 'icecream', qty: 1 }], value: 40, xp: 12 },
  { id: 'choco_cake', name: '巧克力蛋糕', icon: '🎂', ingredients: [{ id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'chocolate', qty: 1 }, { id: 'butter', qty: 1 }], value: 50, xp: 15 },
  { id: 'cream_puff', name: '奶油泡芙', icon: '🧁', ingredients: [{ id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'cream', qty: 1 }], value: 28, xp: 8 },
  { id: 'milk_chocolate', name: '牛奶巧克力', icon: '🍫', ingredients: [{ id: 'milk', qty: 1 }, { id: 'chocolate', qty: 1 }], value: 22, xp: 6 },
  { id: 'butter_cookie', name: '黄油曲奇', icon: '🍪', ingredients: [{ id: 'flour', qty: 1 }, { id: 'butter', qty: 1 }, { id: 'egg', qty: 1 }], value: 20, xp: 6 },
  { id: 'honey_milk', name: '蜂蜜牛奶', icon: '🥛', ingredients: [{ id: 'honey', qty: 1 }, { id: 'milk', qty: 1 }], value: 18, xp: 5 },
  { id: 'rainbow_cake', name: '彩虹蛋糕', icon: '🌈', ingredients: [{ id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'cream', qty: 1 }, { id: 'honey', qty: 1 }, { id: 'strawberry', qty: 1 }], value: 80, xp: 25 },
  { id: 'truffle_pasta', name: '松露意面', icon: '🍝', ingredients: [{ id: 'flour', qty: 1 }, { id: 'truffle', qty: 1 }, { id: 'butter', qty: 1 }], value: 120, xp: 30 },
  { id: 'golden_feast', name: '黄金盛宴', icon: '👑', ingredients: [{ id: 'golden_apple', qty: 1 }, { id: 'honey', qty: 1 }, { id: 'cream', qty: 1 }, { id: 'truffle', qty: 1 }], value: 300, xp: 50 },
  { id: 'fruit_salad', name: '水果沙拉', icon: '🥗', ingredients: [{ id: 'apple', qty: 1 }, { id: 'strawberry', qty: 1 }, { id: 'honey', qty: 1 }], value: 25, xp: 7 },
  { id: 'choco_truffle', name: '松露巧克力', icon: '🍬', ingredients: [{ id: 'truffle', qty: 1 }, { id: 'chocolate', qty: 1 }, { id: 'cream', qty: 1 }], value: 150, xp: 35 },
];

// ============================================================
// 成就定义 (40+, 含段位系统)
// ============================================================
const ACHIEVEMENT_TIERS = [
  { name: '青铜', icon: '🥉', color: '#cd7f32' },
  { name: '白银', icon: '🥈', color: '#c0c0c0' },
  { name: '黄金', icon: '🥇', color: '#ffd700' },
  { name: '铂金', icon: '💠', color: '#e5e4e2' },
  { name: '钻石', icon: '💎', color: '#b9f2ff' },
  { name: '大师', icon: '🏅', color: '#ff6b6b' },
  { name: '挑战者', icon: '🏆', color: '#ff4500' },
];

const ACHIEVEMENTS = [
  // 美食家系列
  { id: 'food_1', name: '初尝美味', series: '美食家', icon: '🍽️', tier: 0, target: 1, stat: 'timesFeeding', desc: '喂食宠物1次', reward: 5 },
  { id: 'food_2', name: '美食爱好者', series: '美食家', icon: '🍽️', tier: 1, target: 10, stat: 'timesFeeding', desc: '喂食宠物10次', reward: 15 },
  { id: 'food_3', name: '资深食客', series: '美食家', icon: '🍽️', tier: 2, target: 50, stat: 'timesFeeding', desc: '喂食宠物50次', reward: 50 },
  { id: 'food_4', name: '美食鉴赏家', series: '美食家', icon: '🍽️', tier: 3, target: 200, stat: 'timesFeeding', desc: '喂食宠物200次', reward: 150 },
  { id: 'food_5', name: '美食之神', series: '美食家', icon: '🍽️', tier: 4, target: 500, stat: 'timesFeeding', desc: '喂食宠物500次', reward: 500 },
  // 园艺大师系列
  { id: 'garden_1', name: '初次收获', series: '园艺大师', icon: '🌾', tier: 0, target: 1, stat: 'totalHarvests', desc: '收获1次', reward: 5 },
  { id: 'garden_2', name: '小小园丁', series: '园艺大师', icon: '🌾', tier: 1, target: 10, stat: 'totalHarvests', desc: '收获10次', reward: 20 },
  { id: 'garden_3', name: '园艺达人', series: '园艺大师', icon: '🌾', tier: 2, target: 50, stat: 'totalHarvests', desc: '收获50次', reward: 60 },
  { id: 'garden_4', name: '丰收之王', series: '园艺大师', icon: '🌾', tier: 3, target: 200, stat: 'totalHarvests', desc: '收获200次', reward: 200 },
  { id: 'garden_5', name: '园艺传说', series: '园艺大师', icon: '🌾', tier: 4, target: 500, stat: 'totalHarvests', desc: '收获500次', reward: 500 },
  // 财富传说系列
  { id: 'wealth_1', name: '小有积蓄', series: '财富传说', icon: '💰', tier: 0, target: 100, stat: 'totalCoinsEarned', desc: '累计获得100金币', reward: 10 },
  { id: 'wealth_2', name: '小康之家', series: '财富传说', icon: '💰', tier: 1, target: 500, stat: 'totalCoinsEarned', desc: '累计获得500金币', reward: 30 },
  { id: 'wealth_3', name: '富甲一方', series: '财富传说', icon: '💰', tier: 2, target: 2000, stat: 'totalCoinsEarned', desc: '累计获得2000金币', reward: 100 },
  { id: 'wealth_4', name: '金融大亨', series: '财富传说', icon: '💰', tier: 3, target: 10000, stat: 'totalCoinsEarned', desc: '累计获得10000金币', reward: 500 },
  { id: 'wealth_5', name: '财富传说', series: '财富传说', icon: '💰', tier: 4, target: 50000, stat: 'totalCoinsEarned', desc: '累计获得50000金币', reward: 2000 },
  // 游戏达人系列
  { id: 'game_1', name: '初试身手', series: '游戏达人', icon: '🎮', tier: 0, target: 1, stat: 'gamesPlayed', desc: '玩1次小游戏', reward: 5 },
  { id: 'game_2', name: '游戏爱好者', series: '游戏达人', icon: '🎮', tier: 1, target: 10, stat: 'gamesPlayed', desc: '玩10次小游戏', reward: 15 },
  { id: 'game_3', name: '游戏高手', series: '游戏达人', icon: '🎮', tier: 2, target: 50, stat: 'gamesPlayed', desc: '玩50次小游戏', reward: 50 },
  { id: 'game_4', name: '游戏大师', series: '游戏达人', icon: '🎮', tier: 3, target: 200, stat: 'gamesPlayed', desc: '玩200次小游戏', reward: 200 },
  { id: 'game_5', name: '游戏传说', series: '游戏达人', icon: '🎮', tier: 4, target: 500, stat: 'gamesPlayed', desc: '玩500次小游戏', reward: 500 },
  // 胜利之星系列
  { id: 'win_1', name: '首次胜利', series: '胜利之星', icon: '⭐', tier: 0, target: 1, stat: 'gamesWon', desc: '赢得1场游戏', reward: 10 },
  { id: 'win_2', name: '常胜将军', series: '胜利之星', icon: '⭐', tier: 1, target: 10, stat: 'gamesWon', desc: '赢得10场游戏', reward: 30 },
  { id: 'win_3', name: '不败神话', series: '胜利之星', icon: '⭐', tier: 2, target: 50, stat: 'gamesWon', desc: '赢得50场游戏', reward: 100 },
  { id: 'win_4', name: '传奇冠军', series: '胜利之星', icon: '⭐', tier: 3, target: 200, stat: 'gamesWon', desc: '赢得200场游戏', reward: 300 },
  // 购物狂系列
  { id: 'shop_1', name: '初次购物', series: '购物狂', icon: '🛒', tier: 0, target: 1, stat: 'itemsBought', desc: '购买1件物品', reward: 5 },
  { id: 'shop_2', name: '购物达人', series: '购物狂', icon: '🛒', tier: 1, target: 10, stat: 'itemsBought', desc: '购买10件物品', reward: 15 },
  { id: 'shop_3', name: '购物狂人', series: '购物狂', icon: '🛒', tier: 2, target: 50, stat: 'itemsBought', desc: '购买50件物品', reward: 50 },
  { id: 'shop_4', name: '购物传说', series: '购物狂', icon: '🛒', tier: 3, target: 200, stat: 'itemsBought', desc: '购买200件物品', reward: 200 },
  // 等级提升系列
  { id: 'level_1', name: '崭露头角', series: '等级提升', icon: '📈', tier: 0, target: 5, stat: 'level', desc: '达到5级', reward: 20 },
  { id: 'level_2', name: '初露锋芒', series: '等级提升', icon: '📈', tier: 1, target: 10, stat: 'level', desc: '达到10级', reward: 50 },
  { id: 'level_3', name: '实力非凡', series: '等级提升', icon: '📈', tier: 2, target: 20, stat: 'level', desc: '达到20级', reward: 100 },
  { id: 'level_4', name: '登峰造极', series: '等级提升', icon: '📈', tier: 3, target: 50, stat: 'level', desc: '达到50级', reward: 300 },
  { id: 'level_5', name: '满级大佬', series: '等级提升', icon: '📈', tier: 4, target: 100, stat: 'level', desc: '达到100级', reward: 1000 },
  // 忠诚伙伴系列 (hours played in minutes tracked)
  { id: 'loyal_1', name: '新朋友', series: '忠诚伙伴', icon: '❤️', tier: 0, target: 60, stat: 'minutesPlayed', desc: '陪伴1小时', reward: 10 },
  { id: 'loyal_2', name: '好伙伴', series: '忠诚伙伴', icon: '❤️', tier: 1, target: 600, stat: 'minutesPlayed', desc: '陪伴10小时', reward: 50 },
  { id: 'loyal_3', name: '忠实伙伴', series: '忠诚伙伴', icon: '❤️', tier: 2, target: 6000, stat: 'minutesPlayed', desc: '陪伴100小时', reward: 200 },
  { id: 'loyal_4', name: '永恒之友', series: '忠诚伙伴', icon: '❤️', tier: 3, target: 30000, stat: 'minutesPlayed', desc: '陪伴500小时', reward: 500 },
  // 钓鱼大师系列
  { id: 'fish_1', name: '钓鱼新手', series: '钓鱼大师', icon: '🎣', tier: 0, target: 1, stat: 'totalFished', desc: '钓到1条鱼', reward: 5 },
  { id: 'fish_2', name: '钓鱼好手', series: '钓鱼大师', icon: '🎣', tier: 1, target: 10, stat: 'totalFished', desc: '钓到10条鱼', reward: 20 },
  { id: 'fish_3', name: '钓鱼达人', series: '钓鱼大师', icon: '🎣', tier: 2, target: 50, stat: 'totalFished', desc: '钓到50条鱼', reward: 60 },
  { id: 'fish_4', name: '传说钓手', series: '钓鱼大师', icon: '🎣', tier: 3, target: 1, stat: 'legendaryFished', desc: '钓到传说鱼', reward: 200 },
  // 烹饪之神系列
  { id: 'cook_1', name: '初入厨房', series: '烹饪之神', icon: '🍳', tier: 0, target: 1, stat: 'totalCooked', desc: '做1道菜', reward: 5 },
  { id: 'cook_2', name: '家庭厨师', series: '烹饪之神', icon: '🍳', tier: 1, target: 10, stat: 'totalCooked', desc: '做10道菜', reward: 20 },
  { id: 'cook_3', name: '烹饪大师', series: '烹饪之神', icon: '🍳', tier: 2, target: 30, stat: 'totalCooked', desc: '做30道菜', reward: 60 },
  { id: 'cook_4', name: '烹饪之神', series: '烹饪之神', icon: '🍳', tier: 3, target: 16, stat: 'uniqueRecipes', desc: '解锁所有菜谱', reward: 300 },
];

// ============================================================
// 小游戏定义 (8)
// ============================================================
const MINI_GAMES = [
  { id: 'click_frenzy', name: '疯狂点击', icon: '👆', desc: '10秒内疯狂点击！', reward: '每5次点击获得1金币' },
  { id: 'memory_match', name: '记忆翻牌', icon: '🧠', desc: '翻开配对的卡牌', reward: '最多30金币' },
  { id: 'rps', name: '猜拳大战', icon: '✊', desc: '五局三胜制', reward: '最多10金币' },
  { id: 'catch_game', name: '接金币', icon: '🪙', desc: '30秒内接住掉落物品！', reward: '每次接住获得2金币' },
  { id: 'number_guess', name: '猜数字', icon: '🔢', desc: '猜一个1-100的数字', reward: '猜的次数越少奖励越多' },
  { id: 'whack_mole', name: '打地鼠', icon: '🐹', desc: '3x3格子，快速打地鼠！', reward: '每只地鼠3金币' },
  { id: 'math_challenge', name: '算术挑战', icon: '🧮', desc: '快速答对算术题', reward: '每题5-10金币' },
  { id: 'brick_breaker', name: '弹球消除', icon: '🧱', desc: '简易弹球打砖块', reward: '每块砖2金币' },
];

// ============================================================
// 任务池定义
// ============================================================
const DAILY_QUEST_POOL = [
  { id: 'dq_feed3', desc: '喂食宠物3次', stat: 'timesFeeding', target: 3, coinReward: 15, xpReward: 10, type: 'delta' },
  { id: 'dq_game1', desc: '玩一局小游戏', stat: 'gamesPlayed', target: 1, coinReward: 10, xpReward: 8, type: 'delta' },
  { id: 'dq_harvest2', desc: '收获2个农作物', stat: 'totalHarvests', target: 2, coinReward: 20, xpReward: 12, type: 'delta' },
  { id: 'dq_earn50', desc: '赚取50金币', stat: 'totalCoinsEarned', target: 50, coinReward: 20, xpReward: 15, type: 'delta' },
  { id: 'dq_water5', desc: '浇水5次', stat: 'timesWatering', target: 5, coinReward: 15, xpReward: 8, type: 'delta' },
  { id: 'dq_buy1', desc: '购买1件物品', stat: 'itemsBought', target: 1, coinReward: 10, xpReward: 5, type: 'delta' },
  { id: 'dq_toy1', desc: '使用1个玩具', stat: 'timesPlaying', target: 1, coinReward: 10, xpReward: 5, type: 'delta' },
  { id: 'dq_fish1', desc: '钓1条鱼', stat: 'totalFished', target: 1, coinReward: 15, xpReward: 8, type: 'delta' },
  { id: 'dq_cook1', desc: '做1道菜', stat: 'totalCooked', target: 1, coinReward: 15, xpReward: 8, type: 'delta' },
];

const WEEKLY_QUEST_POOL = [
  { id: 'wq_earn200', desc: '累计赚取200金币', stat: 'totalCoinsEarned', target: 200, coinReward: 80, xpReward: 40, type: 'delta' },
  { id: 'wq_win5', desc: '赢得5场小游戏', stat: 'gamesWon', target: 5, coinReward: 60, xpReward: 30, type: 'delta' },
  { id: 'wq_harvest10', desc: '收获10个农作物', stat: 'totalHarvests', target: 10, coinReward: 60, xpReward: 35, type: 'delta' },
  { id: 'wq_dailyall', desc: '完成所有每日任务', stat: 'dailyQuestsCompleted', target: 3, coinReward: 100, xpReward: 50, type: 'delta' },
  { id: 'wq_levelup', desc: '达到新等级', stat: 'levelsGained', target: 1, coinReward: 50, xpReward: 30, type: 'delta' },
];

// ============================================================
// 幸运转盘定义
// ============================================================
const WHEEL_PRIZES = [
  { name: '10 金币', icon: '🪙', type: 'coins', amount: 10, weight: 25 },
  { name: '20 金币', icon: '🪙', type: 'coins', amount: 20, weight: 20 },
  { name: '50 金币', icon: '💰', type: 'coins', amount: 50, weight: 12 },
  { name: '100 金币', icon: '💰', type: 'coins', amount: 100, weight: 6 },
  { name: '200 金币', icon: '💎', type: 'coins', amount: 200, weight: 3 },
  { name: '随机食物', icon: '🍔', type: 'random_food', weight: 15 },
  { name: '随机种子', icon: '🌱', type: 'random_seed', weight: 10 },
  { name: '稀有装饰', icon: '👑', type: 'random_decoration', weight: 4 },
  { name: '大奖 1000 金币', icon: '🎉', type: 'coins', amount: 1000, weight: 1 },
  { name: '能量饮料', icon: '🥤', type: 'item', itemId: 'energy_drink', weight: 4 },
];

// ============================================================
// 默认游戏状态
// ============================================================
function createDefaultState() {
  return {
    petName: 'Clawd',
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
      { itemId: 'bread', quantity: 3 },
      { itemId: 'ball', quantity: 1 },
      { itemId: 'carrot_seed', quantity: 2 },
      { itemId: 'basic_bait', quantity: 5 },
    ],
    garden: Array(16).fill(null),
    achievementProgress: {},
    trackers: {
      timesFeeding: 0,
      timesPlaying: 0,
      timesCleaning: 0,
      timesWatering: 0,
      totalHarvests: 0,
      totalPlanted: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      itemsBought: 0,
      totalSpent: 0,
      totalCoinsEarned: 100,
      totalFished: 0,
      legendaryFished: 0,
      totalCooked: 0,
      uniqueRecipes: 0,
      minutesPlayed: 0,
      levelsGained: 0,
      dailyQuestsCompleted: 0,
      totalActions: 0,
      level: 1,
    },
    unlockedAchievements: [],
    cookedRecipes: [],
    quests: { daily: [], weekly: [], lastDailyRefresh: 0, lastWeeklyRefresh: 0 },
    wheel: { lastFreeSpin: 0 },
    fishing: { rodLevel: 0 },
    lastUpdate: Date.now(),
    firstPlayTime: Date.now(),
  };
}

// ============================================================
// 全局游戏状态
// ============================================================
let gameState = createDefaultState();
let statusIntervalId = null;
let gardenIntervalId = null;
let autoSaveIntervalId = null;
let minuteTrackerId = null;
let currentMiniGame = null;
let fishingState = null; // { phase, timer, baitId }

// ============================================================
// 初始化
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
    console.log('无法加载存档，使用默认状态');
  }

  catchUpTime();
  refreshQuests();

  bindTabs();
  bindStatusActions();
  bindTitleBar();

  renderAll();

  statusIntervalId = setInterval(tickStatus, 1000);
  gardenIntervalId = setInterval(tickGarden, 1000);
  autoSaveIntervalId = setInterval(saveGame, 30000);
  minuteTrackerId = setInterval(() => {
    gameState.trackers.minutesPlayed++;
  }, 60000);

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
    garden: saved.garden && saved.garden.length === 16 ? saved.garden : def.garden,
    inventory: saved.inventory || def.inventory,
    unlockedAchievements: saved.unlockedAchievements || [],
    achievementProgress: saved.achievementProgress || {},
    cookedRecipes: saved.cookedRecipes || [],
    quests: { ...def.quests, ...(saved.quests || {}) },
    wheel: { ...def.wheel, ...(saved.wheel || {}) },
    fishing: { ...def.fishing, ...(saved.fishing || {}) },
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

  // 离线花园生长
  gameState.garden.forEach((plot) => {
    if (plot && plot.state === 'growing') {
      plot.elapsed = (plot.elapsed || 0) + elapsed * (plot.growMultiplier || 1);
    }
  });

  // 离线时间计入陪伴
  gameState.trackers.minutesPlayed += Math.floor(elapsed / 60);

  gameState.lastUpdate = now;
}

// ============================================================
// 存档
// ============================================================
async function saveGame() {
  gameState.lastUpdate = Date.now();
  try {
    if (window.electronAPI && window.electronAPI.saveGameState) {
      window.electronAPI.saveGameState(gameState);
    }
  } catch (e) {
    console.error('存档失败', e);
  }
}

// ============================================================
// 标签页导航 (修复版)
// ============================================================
function bindTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // 移除所有 active
      document.querySelectorAll('.nav-tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));

      // 激活当前
      tab.classList.add('active');
      const tabId = tab.dataset.tab;
      const panel = document.getElementById('tab-' + tabId);
      if (panel) panel.classList.add('active');

      // 切换时刷新内容
      switch (tabId) {
        case 'status': renderStatus(); break;
        case 'inventory': renderInventory(); break;
        case 'shop': renderShop(); break;
        case 'garden': renderGarden(); break;
        case 'games': renderGamesList(); break;
        case 'achievements': renderAchievements(); break;
        case 'quests': renderQuests(); break;
        case 'wheel': renderWheel(); break;
        case 'cooking': renderCooking(); break;
        case 'fishing': renderFishing(); break;
      }
    });
  });
}

// ============================================================
// 标题栏控制
// ============================================================
function bindTitleBar() {
  const closeBtn = document.getElementById('btn-close');
  const minBtn = document.getElementById('btn-minimize');
  if (closeBtn) closeBtn.addEventListener('click', () => {
    saveGame();
    if (window.electronAPI && window.electronAPI.closePanel) window.electronAPI.closePanel();
  });
  if (minBtn) minBtn.addEventListener('click', () => {
    if (window.electronAPI && window.electronAPI.minimizePanel) window.electronAPI.minimizePanel();
  });
}

// ============================================================
// 顶部信息栏
// ============================================================
function renderTopBar() {
  const nameEl = document.getElementById('pet-name');
  const levelEl = document.getElementById('level-num');
  const xpBar = document.getElementById('xp-bar');
  const xpText = document.getElementById('xp-text');
  const coinsEl = document.getElementById('coins-count');

  if (nameEl) nameEl.textContent = gameState.petName;
  if (levelEl) levelEl.textContent = gameState.level;

  const xpNeeded = getXpForLevel(gameState.level);
  const pct = Math.min(100, (gameState.xp / xpNeeded) * 100);
  if (xpBar) xpBar.style.width = pct + '%';
  if (xpText) xpText.textContent = `${gameState.xp} / ${xpNeeded} 经验`;
  if (coinsEl) coinsEl.textContent = gameState.coins;
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
    gameState.trackers.levelsGained++;
    showToast(`升级了！当前等级 ${gameState.level}`, 'achievement');
    triggerPetAnimation('game-levelup');
    xpNeeded = getXpForLevel(gameState.level);
    checkAchievements();
  }
  renderTopBar();
}

function addCoins(amount) {
  gameState.coins += amount;
  gameState.trackers.totalCoinsEarned += amount;
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
// 状态系统
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
  const statValues = [s.hunger, s.happiness, s.energy, s.cleanliness];
  for (const v of statValues) {
    if (v < 20) healthTarget -= 15;
    else if (v < 40) healthTarget -= 8;
    else if (v < 60) healthTarget -= 3;
  }
  healthTarget = Math.max(0, Math.min(100, healthTarget));
  s.health += (healthTarget - s.health) * 0.05;
  s.health = Math.max(0, Math.min(100, s.health));
}

function getBarClass(value) {
  if (value >= 60) return 'high';
  if (value >= 35) return 'medium';
  if (value >= 15) return 'low';
  return 'critical';
}

function renderStatus() {
  const stats = ['hunger', 'happiness', 'energy', 'cleanliness', 'health'];
  for (const stat of stats) {
    const val = Math.round(gameState.stats[stat]);
    const valEl = document.getElementById(stat + '-val');
    const barEl = document.getElementById(stat + '-bar');
    if (valEl) valEl.textContent = val;
    if (barEl) {
      barEl.style.width = val + '%';
      barEl.className = 'stat-bar-fill ' + getBarClass(val);
    }
  }
}

function bindStatusActions() {
  document.querySelectorAll('.action-btn[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      handleStatusAction(btn.dataset.action);
    });
  });
}

function handleStatusAction(action) {
  const s = gameState.stats;
  gameState.trackers.totalActions++;

  switch (action) {
    case 'feed': {
      const foodItems = getInventoryItemsByType('food');
      if (foodItems.length === 0) {
        showToast('背包里没有食物了！快去商店买吧', 'error');
        return;
      }
      const food = foodItems[0];
      const shopDef = findItemDef(food.itemId);
      if (!shopDef) return;
      removeFromInventory(food.itemId, 1);
      applyEffect(shopDef.effect);
      gameState.trackers.timesFeeding++;
      showToast(`喂食了 ${shopDef.icon} ${shopDef.name}！`, 'success');
      triggerPetAnimation('life-eat');
      addXp(5);
      break;
    }
    case 'play': {
      const toyItems = getInventoryItemsByType('toy');
      if (toyItems.length === 0) {
        s.happiness = Math.min(100, s.happiness + 8);
        s.energy = Math.max(0, s.energy - 5);
        showToast('和 Clawd 玩耍了一会儿！', 'success');
      } else {
        const toy = toyItems[0];
        const shopDef = findItemDef(toy.itemId);
        if (shopDef && shopDef.effect) {
          applyEffect(shopDef.effect);
          showToast(`使用了 ${shopDef.icon} ${shopDef.name} 玩耍！`, 'success');
        }
      }
      gameState.trackers.timesPlaying++;
      const anims = ['play-dance', 'play-ball', 'play-game'];
      triggerPetAnimation(anims[Math.floor(Math.random() * anims.length)]);
      addXp(3);
      break;
    }
    case 'rest': {
      s.energy = Math.min(100, s.energy + 20);
      s.happiness = Math.max(0, s.happiness - 3);
      showToast('Clawd 休息了一会儿，精力恢复了！', 'success');
      triggerPetAnimation('sleeping');
      addXp(2);
      break;
    }
    case 'clean': {
      // 检查是否有清洁用品
      const soapQty = getInventoryQty('soap');
      const shampooQty = getInventoryQty('shampoo');
      if (shampooQty > 0) {
        removeFromInventory('shampoo', 1);
        s.cleanliness = Math.min(100, s.cleanliness + 40);
        s.happiness = Math.min(100, s.happiness + 5);
        showToast('用洗发水给 Clawd 洗了个澡！', 'success');
      } else if (soapQty > 0) {
        removeFromInventory('soap', 1);
        s.cleanliness = Math.min(100, s.cleanliness + 25);
        showToast('用肥皂给 Clawd 洗干净了！', 'success');
      } else {
        s.cleanliness = Math.min(100, s.cleanliness + 15);
        showToast('Clawd 简单清洗了一下！买肥皂效果更好哦', 'info');
      }
      gameState.trackers.timesCleaning++;
      triggerPetAnimation('life-shower');
      addXp(3);
      break;
    }
  }

  updateHealth();
  renderStatus();
  renderInventory();
  updateQuestProgress();
  checkAchievements();
}

function applyEffect(effect) {
  if (!effect) return;
  const s = gameState.stats;
  if (effect.hunger) s.hunger = Math.min(100, s.hunger + effect.hunger);
  if (effect.happiness) s.happiness = Math.min(100, s.happiness + effect.happiness);
  if (effect.energy) s.energy = Math.min(100, Math.max(0, s.energy + effect.energy));
  if (effect.cleanliness) s.cleanliness = Math.min(100, s.cleanliness + effect.cleanliness);
  if (effect.health) s.health = Math.min(100, s.health + effect.health);
}

// ============================================================
// 物品系统
// ============================================================
function findItemDef(itemId) {
  return SHOP_ITEMS.find((i) => i.id === itemId);
}

function getInventoryItemsByType(type) {
  return gameState.inventory.filter((inv) => {
    const def = findItemDef(inv.itemId);
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
  if (!existing || existing.quantity < qty) return false;
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
  const grid = document.getElementById('inventory-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const items = gameState.inventory.filter((i) => i.quantity > 0);
  if (items.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:20px;">背包空空如也...快去商店买些东西吧！</div>';
    return;
  }

  for (const invItem of items) {
    const def = findItemDef(invItem.itemId);
    // 也可能是收获的作物或钓到的鱼(无定义)
    const icon = def ? def.icon : '📦';
    const name = def ? def.name : invItem.itemId;
    const type = def ? def.type : '其他';
    const desc = def ? def.desc : '';

    const slot = document.createElement('div');
    slot.className = 'inv-slot';
    slot.innerHTML = `
      <div class="tooltip">
        <div>${icon} ${name}</div>
        <div class="tooltip-type">${getTypeName(type)}</div>
        ${def && def.effect ? '<div class="tooltip-effect">' + formatEffect(def.effect) + '</div>' : ''}
        ${desc ? '<div class="tooltip-effect">' + desc + '</div>' : ''}
      </div>
      <span class="item-icon">${icon}</span>
      <span class="item-name">${name}</span>
      <span class="item-qty">x${invItem.quantity}</span>
    `;

    slot.addEventListener('click', () => handleUseItem(def, invItem));
    grid.appendChild(slot);
  }

  // 填充空槽
  const totalSlots = Math.max(16, items.length + (4 - (items.length % 4)));
  for (let i = items.length; i < totalSlots; i++) {
    const slot = document.createElement('div');
    slot.className = 'inv-slot empty';
    slot.innerHTML = '<span class="item-icon" style="opacity:0.2">-</span>';
    grid.appendChild(slot);
  }
}

function handleUseItem(def, invItem) {
  if (!def) return;
  if (def.type === 'food') {
    showModal(def.icon, `使用 ${def.name}？`, formatEffect(def.effect), [
      { text: '使用', cls: 'confirm', action: () => {
        if (invItem.quantity <= 0) return;
        removeFromInventory(def.id, 1);
        applyEffect(def.effect);
        gameState.trackers.timesFeeding++;
        gameState.trackers.totalActions++;
        showToast(`使用了 ${def.icon} ${def.name}！`, 'success');
        triggerPetAnimation('life-eat');
        addXp(5);
        updateHealth();
        renderStatus();
        renderInventory();
        updateQuestProgress();
        checkAchievements();
      }},
      { text: '取消', cls: 'cancel' },
    ]);
  } else if (def.type === 'toy') {
    showModal(def.icon, `使用 ${def.name} 玩耍？`, formatEffect(def.effect), [
      { text: '玩耍', cls: 'confirm', action: () => {
        applyEffect(def.effect);
        gameState.trackers.timesPlaying++;
        gameState.trackers.totalActions++;
        showToast(`使用了 ${def.icon} ${def.name} 玩耍！`, 'success');
        triggerPetAnimation('play-ball');
        addXp(3);
        renderStatus();
        updateQuestProgress();
        checkAchievements();
      }},
      { text: '取消', cls: 'cancel' },
    ]);
  } else if (def.type === 'tool' && def.consumable && def.effect) {
    showModal(def.icon, `使用 ${def.name}？`, formatEffect(def.effect), [
      { text: '使用', cls: 'confirm', action: () => {
        if (invItem.quantity <= 0) return;
        removeFromInventory(def.id, 1);
        applyEffect(def.effect);
        gameState.trackers.totalActions++;
        showToast(`使用了 ${def.icon} ${def.name}！`, 'success');
        addXp(2);
        renderStatus();
        renderInventory();
        checkAchievements();
      }},
      { text: '取消', cls: 'cancel' },
    ]);
  } else if (def.type === 'decoration') {
    showModal(def.icon, `装备 ${def.name}？`, def.desc, [
      { text: '装备', cls: 'confirm', action: () => {
        applyEffect(def.effect);
        gameState.trackers.totalActions++;
        showToast(`装备了 ${def.icon} ${def.name}！`, 'success');
        triggerPetAnimation('emotion-proud');
        addXp(2);
        renderStatus();
        checkAchievements();
      }},
      { text: '取消', cls: 'cancel' },
    ]);
  } else if (def.type === 'seed') {
    showToast('去花园标签页种植种子吧！', 'info');
  } else if (def.type === 'bait') {
    showToast('去钓鱼标签页使用鱼饵吧！', 'info');
  } else if (def.type === 'ingredient') {
    showToast('去烹饪标签页使用食材吧！', 'info');
  } else if (def.type === 'tool') {
    showToast('去花园标签页使用工具吧！', 'info');
  }
}

// ============================================================
// 商店系统
// ============================================================
let shopCategory = 'food';

function renderShop() {
  const catContainer = document.getElementById('shop-categories');
  const gridContainer = document.getElementById('shop-grid');
  if (!catContainer || !gridContainer) return;

  const categories = [
    { key: 'food', label: '🍞 食物' },
    { key: 'toy', label: '🧸 玩具' },
    { key: 'seed', label: '🌱 种子' },
    { key: 'tool', label: '🔧 工具' },
    { key: 'decoration', label: '👑 装饰' },
    { key: 'bait', label: '🎣 鱼饵' },
    { key: 'ingredient', label: '🍳 食材' },
  ];

  catContainer.innerHTML = '';
  for (const cat of categories) {
    const btn = document.createElement('button');
    btn.className = 'shop-cat-btn' + (cat.key === shopCategory ? ' active' : '');
    btn.textContent = cat.label;
    btn.addEventListener('click', () => {
      shopCategory = cat.key;
      renderShop();
      triggerPetAnimation('game-shop');
    });
    catContainer.appendChild(btn);
  }

  const items = SHOP_ITEMS.filter((i) => i.category === shopCategory);
  gridContainer.innerHTML = '';

  for (const item of items) {
    const canAfford = gameState.coins >= item.price;
    const owned = getInventoryQty(item.id);
    const card = document.createElement('div');
    card.className = 'shop-item' + (canAfford ? '' : ' cant-afford');
    card.innerHTML = `
      <span class="item-icon">${item.icon}</span>
      <span class="item-name">${item.name}</span>
      <span class="item-desc">${item.desc}</span>
      ${owned > 0 ? '<span class="item-owned">已拥有: ' + owned + '</span>' : ''}
      <span class="item-price">🪙 ${item.price}</span>
      <button class="buy-btn" ${canAfford ? '' : 'disabled'}>购买</button>
    `;

    const buyBtn = card.querySelector('.buy-btn');
    buyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      buyItem(item);
    });
    gridContainer.appendChild(card);
  }
}

function buyItem(item) {
  if (!spendCoins(item.price)) {
    showToast('金币不足！', 'error');
    return;
  }
  addToInventory(item.id, 1);
  gameState.trackers.itemsBought++;
  gameState.trackers.totalActions++;
  showToast(`购买了 ${item.icon} ${item.name}！`, 'success');
  triggerPetAnimation('game-shop');
  addXp(2);
  renderShop();
  renderInventory();
  updateQuestProgress();
  checkAchievements();
}

// ============================================================
// 花园系统 (4x4)
// ============================================================
let gardenMode = 'none';
let selectedSeed = null;

function renderGarden() {
  const grid = document.getElementById('garden-grid');
  const seedList = document.getElementById('seed-list');
  if (!grid) return;
  grid.innerHTML = '';

  const growthStageNames = ['发芽', '幼苗', '成熟', '可收获'];
  const growthStageIcons = ['🌱', '🌿', '🌾'];

  for (let i = 0; i < 16; i++) {
    const plot = gameState.garden[i];
    const div = document.createElement('div');
    div.className = 'garden-plot' + (plot ? '' : ' empty');

    if (!plot) {
      div.innerHTML = '<span class="plot-icon" style="opacity:0.3">⬛</span><span class="plot-label">空地</span>';
    } else if (plot.state === 'growing') {
      const progress = getGrowthProgress(plot);
      const stageIdx = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
      const needsWater = plot.needsWater;
      div.innerHTML = `
        ${needsWater ? '<span class="water-indicator needs-water">💧</span>' : ''}
        <span class="plot-icon">${growthStageIcons[stageIdx]}</span>
        <span class="plot-label">${plot.cropName} (${growthStageNames[stageIdx]})</span>
        <div class="plot-progress"><div class="plot-progress-fill" style="width:${Math.min(100, progress * 100)}%"></div></div>
      `;
    } else if (plot.state === 'ready') {
      div.innerHTML = `
        <span class="plot-icon">${plot.harvestIcon}</span>
        <span class="plot-label">可收获！</span>
      `;
      div.style.borderColor = '#39ff14';
      div.style.boxShadow = '0 0 10px rgba(57,255,20,0.4)';
    }

    div.addEventListener('click', () => handlePlotClick(i));
    grid.appendChild(div);
  }

  // 花园工具按钮 -- render inline if no garden-tools element
  renderGardenToolsInline(grid);
  renderSeedSelector();
}

function renderGardenToolsInline(afterEl) {
  // We look for a garden-tools container; if not found, we skip (tools are in the seed list area)
  const container = document.getElementById('garden-tools');
  if (!container) return;
  container.innerHTML = '';

  const tools = [
    { mode: 'plant', icon: '🌱', label: '种植' },
    { mode: 'water', icon: '💧', label: '浇水' },
    { mode: 'fertilize', icon: '✨', label: '施肥' },
  ];

  for (const tool of tools) {
    const btn = document.createElement('button');
    btn.className = 'garden-tool-btn' + (gardenMode === tool.mode ? ' active' : '');
    btn.innerHTML = `<span class="tool-icon">${tool.icon}</span> ${tool.label}`;
    btn.addEventListener('click', () => {
      gardenMode = gardenMode === tool.mode ? 'none' : tool.mode;
      renderGarden();
    });
    container.appendChild(btn);
  }
}

function renderSeedSelector() {
  const container = document.getElementById('seed-selector');
  const list = document.getElementById('seed-list');
  if (!list) return;

  if (gardenMode !== 'plant') {
    if (container) container.classList.remove('visible');
    return;
  }

  if (container) container.classList.add('visible');
  list.innerHTML = '';

  const seeds = getInventoryItemsByType('seed');
  if (seeds.length === 0) {
    list.innerHTML = '<span style="color:var(--text-muted);font-size:11px;">没有种子了，去商店买一些吧！</span>';
    return;
  }

  for (const seedInv of seeds) {
    const def = findItemDef(seedInv.itemId);
    if (!def) continue;
    const opt = document.createElement('button');
    opt.className = 'seed-option' + (selectedSeed === def.id ? ' selected' : '');
    opt.innerHTML = `${def.icon} ${def.name} (x${seedInv.quantity})`;
    opt.addEventListener('click', () => {
      selectedSeed = def.id;
      renderSeedSelector();
    });
    list.appendChild(opt);
  }
}

function handlePlotClick(index) {
  const plot = gameState.garden[index];

  if (plot && plot.state === 'ready') {
    harvestPlot(index);
    return;
  }

  if (gardenMode === 'plant' && !plot) {
    if (!selectedSeed) {
      showToast('请先选择一颗种子！', 'error');
      return;
    }
    plantSeed(index, selectedSeed);
  } else if (gardenMode === 'water' && plot && plot.state === 'growing') {
    waterPlot(index);
  } else if (gardenMode === 'fertilize' && plot && plot.state === 'growing') {
    fertilizePlot(index);
  } else if (!plot) {
    showToast('选择"种植"模式并选一颗种子来种下', 'info');
  }
}

function plantSeed(index, seedId) {
  const seedDef = findItemDef(seedId);
  if (!seedDef) return;
  if (getInventoryQty(seedId) <= 0) {
    showToast('种子不够了！', 'error');
    return;
  }

  removeFromInventory(seedId, 1);
  gameState.garden[index] = {
    state: 'growing',
    seedId,
    cropName: seedDef.harvestName || seedDef.name,
    harvestIcon: seedDef.harvestIcon || seedDef.icon,
    harvestValue: seedDef.harvestValue || 10,
    harvestId: seedDef.harvestId || seedId,
    growTime: seedDef.growTime || 60,
    elapsed: 0,
    growMultiplier: 1,
    needsWater: false,
    waterStage: 0,
    plantedAt: Date.now(),
  };
  gameState.trackers.totalPlanted++;
  gameState.trackers.totalActions++;

  showToast(`种下了 ${seedDef.icon} ${seedDef.harvestName || seedDef.name}！`, 'success');
  triggerPetAnimation('game-plant');
  addXp(2);
  renderGarden();
  renderInventory();
  updateQuestProgress();
  checkAchievements();
}

function waterPlot(index) {
  const plot = gameState.garden[index];
  if (!plot || plot.state !== 'growing') return;

  plot.needsWater = false;
  plot.waterStage++;
  plot.elapsed += plot.growTime * 0.08;
  gameState.trackers.timesWatering++;
  gameState.trackers.totalActions++;

  showToast('浇水成功！植物长得更快了', 'success');
  triggerPetAnimation('game-water');
  addXp(1);
  renderGarden();
  updateQuestProgress();
}

function fertilizePlot(index) {
  const plot = gameState.garden[index];
  if (!plot || plot.state !== 'growing') return;

  const superFert = getInventoryQty('super_fertilizer');
  const regularFert = getInventoryQty('fertilizer');

  if (superFert > 0) {
    removeFromInventory('super_fertilizer', 1);
    plot.growMultiplier = 4;
    showToast('施了超级肥料！生长速度4倍！', 'success');
  } else if (regularFert > 0) {
    removeFromInventory('fertilizer', 1);
    plot.growMultiplier = Math.max(plot.growMultiplier, 2);
    showToast('施了肥料！生长速度2倍！', 'success');
  } else {
    showToast('没有肥料了！去商店购买吧', 'error');
    return;
  }

  gameState.trackers.totalActions++;
  addXp(2);
  renderGarden();
  renderInventory();
  checkAchievements();
}

function harvestPlot(index) {
  const plot = gameState.garden[index];
  if (!plot || plot.state !== 'ready') return;

  const value = plot.harvestValue;
  addCoins(value);

  // 将收获物加入背包（如果有harvestId，可以用于烹饪）
  if (plot.harvestId) {
    addToInventory(plot.harvestId, 1);
  }

  gameState.trackers.totalHarvests++;
  gameState.trackers.totalActions++;

  showToast(`收获了 ${plot.harvestIcon} ${plot.cropName}！+${value} 金币`, 'success');
  triggerPetAnimation('game-harvest');
  addXp(8);

  gameState.garden[index] = null;
  renderGarden();
  renderInventory();
  updateQuestProgress();
  checkAchievements();
}

function tickGarden() {
  let changed = false;
  for (let i = 0; i < 16; i++) {
    const plot = gameState.garden[i];
    if (!plot || plot.state !== 'growing') continue;

    plot.elapsed += 1 * (plot.growMultiplier || 1);
    const progress = getGrowthProgress(plot);

    if (!plot.needsWater && plot.waterStage === 0 && progress > 0.4) {
      plot.needsWater = true;
      changed = true;
    }
    if (!plot.needsWater && plot.waterStage === 1 && progress > 0.7) {
      plot.needsWater = true;
      changed = true;
    }

    if (progress >= 1) {
      plot.state = 'ready';
      changed = true;
      showToast(`${plot.harvestIcon} ${plot.cropName} 成熟了！快去收获吧`, 'success');
    }
  }
  if (changed) renderGarden();
}

function getGrowthProgress(plot) {
  return Math.min(1, (plot.elapsed || 0) / (plot.growTime || 60));
}

// ============================================================
// 小游戏系统 (8个)
// ============================================================
function renderGamesList() {
  const container = document.getElementById('games-list');
  if (!container) return;
  container.innerHTML = '';

  for (const game of MINI_GAMES) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <span class="game-icon">${game.icon}</span>
      <span class="game-name">${game.name}</span>
      <span class="game-desc">${game.desc}</span>
      <span class="game-reward">🪙 ${game.reward}</span>
    `;
    card.addEventListener('click', () => startMiniGame(game.id));
    container.appendChild(card);
  }
}

function startMiniGame(gameId) {
  const area = document.getElementById('mini-game-area');
  if (!area) return;
  area.classList.add('active');
  currentMiniGame = gameId;
  gameState.trackers.gamesPlayed++;
  gameState.trackers.totalActions++;

  switch (gameId) {
    case 'click_frenzy': initClickFrenzy(area); break;
    case 'memory_match': initMemoryMatch(area); break;
    case 'rps': initRPS(area); break;
    case 'catch_game': initCatchGame(area); break;
    case 'number_guess': initNumberGuess(area); break;
    case 'whack_mole': initWhackMole(area); break;
    case 'math_challenge': initMathChallenge(area); break;
    case 'brick_breaker': initBrickBreaker(area); break;
  }
  updateQuestProgress();
  checkAchievements();
}

function closeMiniGame() {
  const area = document.getElementById('mini-game-area');
  if (area) {
    area.classList.remove('active');
    area.innerHTML = '';
  }
  currentMiniGame = null;
}

function miniGameHeader(title, closeFn) {
  return `
    <div class="mini-game-header">
      <span class="mini-game-title">${title}</span>
      <button class="mini-game-close" id="mg-close">关闭</button>
    </div>
  `;
}

function bindClose(extraFn) {
  document.getElementById('mg-close').addEventListener('click', () => {
    if (extraFn) extraFn();
    closeMiniGame();
  });
}

// --- 疯狂点击 ---
function initClickFrenzy(area) {
  let clicks = 0;
  let timeLeft = 10;
  let timer = null;

  area.innerHTML = `
    ${miniGameHeader('👆 疯狂点击')}
    <div class="mini-game-stats">
      点击: <span id="cf-clicks">0</span> &nbsp; 时间: <span id="cf-time">10</span>秒
    </div>
    <div class="mini-game-body">
      <button class="game-start-btn" id="cf-start">开始!</button>
      <div class="click-target" id="cf-target" style="display:none;">👊</div>
    </div>
  `;

  bindClose(() => clearInterval(timer));

  document.getElementById('cf-start').addEventListener('click', function () {
    this.style.display = 'none';
    document.getElementById('cf-target').style.display = 'flex';
    timer = setInterval(() => {
      timeLeft--;
      const el = document.getElementById('cf-time');
      if (el) el.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        endClickFrenzy(clicks, area);
      }
    }, 1000);
  });

  document.getElementById('cf-target').addEventListener('click', () => {
    if (timeLeft <= 0) return;
    clicks++;
    const el = document.getElementById('cf-clicks');
    if (el) el.textContent = clicks;
  });
}

function endClickFrenzy(clicks, area) {
  const coins = Math.floor(clicks / 5);
  if (coins > 0) {
    addCoins(coins);
    gameState.trackers.gamesWon++;
    triggerPetAnimation('emotion-excited');
  }
  addXp(Math.max(1, Math.floor(clicks / 10)));

  const body = area.querySelector('.mini-game-body');
  if (body) {
    body.innerHTML = `
      <div class="game-over-msg">点击次数: ${clicks}<br>获得: ${coins} 金币！</div>
      <button class="game-start-btn" id="cf-retry">再来一局</button>
    `;
    document.getElementById('cf-retry').addEventListener('click', () => {
      gameState.trackers.gamesPlayed++;
      initClickFrenzy(area);
    });
  }
  updateQuestProgress();
  checkAchievements();
}

// --- 记忆翻牌 ---
function initMemoryMatch(area) {
  const emojis = ['🍎', '🍊', '🍋', '🍍', '🍓', '🍉', '🍑', '🍒'];
  let cards = [...emojis, ...emojis];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  let flipped = [];
  let matched = 0;
  let moves = 0;
  let locked = false;

  area.innerHTML = `
    ${miniGameHeader('🧠 记忆翻牌')}
    <div class="mini-game-stats">
      翻牌: <span id="mm-moves">0</span>次 &nbsp; 配对: <span id="mm-matched">0</span>/8
    </div>
    <div class="mini-game-body">
      <div class="memory-grid" id="mm-grid"></div>
    </div>
  `;

  bindClose();

  const grid = document.getElementById('mm-grid');
  cards.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = idx;
    card.dataset.emoji = emoji;
    card.textContent = '?';
    card.addEventListener('click', () => {
      if (locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
      card.classList.add('flipped');
      card.textContent = emoji;
      flipped.push(card);

      if (flipped.length === 2) {
        moves++;
        document.getElementById('mm-moves').textContent = moves;
        locked = true;

        if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
          flipped[0].classList.add('matched');
          flipped[1].classList.add('matched');
          matched++;
          document.getElementById('mm-matched').textContent = matched;
          flipped = [];
          locked = false;
          if (matched === 8) endMemoryMatch(moves, area);
        } else {
          setTimeout(() => {
            flipped[0].classList.remove('flipped');
            flipped[0].textContent = '?';
            flipped[1].classList.remove('flipped');
            flipped[1].textContent = '?';
            flipped = [];
            locked = false;
          }, 600);
        }
      }
    });
    grid.appendChild(card);
  });
}

function endMemoryMatch(moves, area) {
  let coins;
  if (moves <= 10) coins = 30;
  else if (moves <= 14) coins = 20;
  else if (moves <= 18) coins = 15;
  else coins = 10;

  addCoins(coins);
  gameState.trackers.gamesWon++;
  triggerPetAnimation('emotion-excited');
  addXp(10);

  setTimeout(() => {
    const body = area.querySelector('.mini-game-body');
    if (body) {
      body.innerHTML = `
        <div class="game-over-msg">${moves}次翻牌完成！<br>获得: ${coins} 金币！</div>
        <button class="game-start-btn" id="mm-retry">再来一局</button>
      `;
      document.getElementById('mm-retry').addEventListener('click', () => {
        gameState.trackers.gamesPlayed++;
        initMemoryMatch(area);
      });
    }
  }, 500);
  updateQuestProgress();
  checkAchievements();
}

// --- 猜拳大战 ---
function initRPS(area) {
  let playerWins = 0;
  let cpuWins = 0;
  let round = 0;
  const maxRounds = 5;

  area.innerHTML = `
    ${miniGameHeader('✊ 猜拳大战')}
    <div class="mini-game-stats">
      回合: <span id="rps-round">1</span>/5 &nbsp;
      你: <span id="rps-pwins">0</span> &nbsp;
      对手: <span id="rps-cwins">0</span>
    </div>
    <div class="mini-game-body">
      <div class="rps-choices">
        <button class="rps-btn" data-choice="rock">✊<br>石头</button>
        <button class="rps-btn" data-choice="paper">✋<br>布</button>
        <button class="rps-btn" data-choice="scissors">✌️<br>剪刀</button>
      </div>
      <div class="rps-result" id="rps-result">选择你的出招！</div>
    </div>
  `;

  bindClose();

  const choices = ['rock', 'paper', 'scissors'];
  const icons = { rock: '✊', paper: '✋', scissors: '✌️' };
  const names = { rock: '石头', paper: '布', scissors: '剪刀' };

  area.querySelectorAll('.rps-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (round >= maxRounds) return;
      round++;
      const player = btn.dataset.choice;
      const cpu = choices[Math.floor(Math.random() * 3)];
      const result = document.getElementById('rps-result');

      if (player === cpu) {
        result.textContent = `${icons[player]} vs ${icons[cpu]} - 平局！`;
        result.className = 'rps-result draw';
      } else if (
        (player === 'rock' && cpu === 'scissors') ||
        (player === 'paper' && cpu === 'rock') ||
        (player === 'scissors' && cpu === 'paper')
      ) {
        playerWins++;
        result.textContent = `${icons[player]} vs ${icons[cpu]} - 你赢了！`;
        result.className = 'rps-result win';
      } else {
        cpuWins++;
        result.textContent = `${icons[player]} vs ${icons[cpu]} - 你输了！`;
        result.className = 'rps-result lose';
      }

      document.getElementById('rps-round').textContent = Math.min(round + 1, maxRounds);
      document.getElementById('rps-pwins').textContent = playerWins;
      document.getElementById('rps-cwins').textContent = cpuWins;

      if (round >= maxRounds) {
        setTimeout(() => endRPS(playerWins, cpuWins, area), 800);
      }
    });
  });
}

function endRPS(playerWins, cpuWins, area) {
  const won = playerWins > cpuWins;
  const coins = won ? 10 : playerWins === cpuWins ? 3 : 0;

  if (coins > 0) addCoins(coins);
  if (won) {
    gameState.trackers.gamesWon++;
    triggerPetAnimation('emotion-excited');
  }
  addXp(5);

  const body = area.querySelector('.mini-game-body');
  if (body) {
    const msg = won ? '你赢了！' : playerWins === cpuWins ? '平局！' : '你输了！';
    body.innerHTML = `
      <div class="game-over-msg">${msg}<br>比分: ${playerWins}-${cpuWins}<br>获得: ${coins} 金币！</div>
      <button class="game-start-btn" id="rps-retry">再来一局</button>
    `;
    document.getElementById('rps-retry').addEventListener('click', () => {
      gameState.trackers.gamesPlayed++;
      initRPS(area);
    });
  }
  updateQuestProgress();
  checkAchievements();
}

// --- 接金币 ---
function initCatchGame(area) {
  let catches = 0;
  let timeLeft = 30;
  let timer = null;
  let spawnTimer = null;
  const fallingEmojis = ['🍎', '🍊', '⭐', '💎', '🍪', '🌟', '🍓', '🪙'];

  area.innerHTML = `
    ${miniGameHeader('🪙 接金币')}
    <div class="mini-game-stats">
      接住: <span id="cg-caught">0</span> &nbsp; 时间: <span id="cg-time">30</span>秒
    </div>
    <div class="mini-game-body">
      <button class="game-start-btn" id="cg-start">开始!</button>
      <div class="catch-area" id="cg-area" style="display:none;"></div>
    </div>
  `;

  bindClose(() => { clearInterval(timer); clearInterval(spawnTimer); });

  document.getElementById('cg-start').addEventListener('click', function () {
    this.style.display = 'none';
    const catchArea = document.getElementById('cg-area');
    catchArea.style.display = 'block';

    timer = setInterval(() => {
      timeLeft--;
      const el = document.getElementById('cg-time');
      if (el) el.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        clearInterval(spawnTimer);
        endCatchGame(catches, area);
      }
    }, 1000);

    spawnTimer = setInterval(() => {
      spawnFallingItem(catchArea, fallingEmojis, () => {
        catches++;
        const el = document.getElementById('cg-caught');
        if (el) el.textContent = catches;
      });
    }, 600);
  });
}

function spawnFallingItem(container, emojis, onCatch) {
  const item = document.createElement('div');
  item.className = 'falling-item';
  item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  const x = Math.random() * (container.offsetWidth - 30);
  item.style.left = x + 'px';
  item.style.top = '-30px';
  const duration = 2000 + Math.random() * 1500;
  item.style.animationDuration = duration + 'ms';

  item.addEventListener('click', (e) => {
    e.stopPropagation();
    onCatch();
    item.remove();
  });

  container.appendChild(item);
  setTimeout(() => { if (item.parentNode) item.remove(); }, duration);
}

function endCatchGame(catches, area) {
  const coins = catches * 2;
  if (coins > 0) {
    addCoins(coins);
    gameState.trackers.gamesWon++;
    triggerPetAnimation('emotion-excited');
  }
  addXp(Math.max(1, Math.floor(catches / 2)));

  const body = area.querySelector('.mini-game-body');
  if (body) {
    body.innerHTML = `
      <div class="game-over-msg">接住了 ${catches} 个物品<br>获得: ${coins} 金币！</div>
      <button class="game-start-btn" id="cg-retry">再来一局</button>
    `;
    document.getElementById('cg-retry').addEventListener('click', () => {
      gameState.trackers.gamesPlayed++;
      initCatchGame(area);
    });
  }
  updateQuestProgress();
  checkAchievements();
}

// --- 猜数字 ---
function initNumberGuess(area) {
  const target = Math.floor(Math.random() * 100) + 1;
  let guesses = 0;
  let won = false;

  area.innerHTML = `
    ${miniGameHeader('🔢 猜数字')}
    <div class="mini-game-stats">
      猜测: <span id="ng-guesses">0</span>次 &nbsp; 范围: 1-100
    </div>
    <div class="mini-game-body">
      <div class="guess-input-row">
        <input type="number" class="guess-input" id="ng-input" min="1" max="100" placeholder="?">
        <button class="guess-btn" id="ng-btn">猜！</button>
      </div>
      <div class="guess-hint" id="ng-hint">输入1-100的数字</div>
    </div>
  `;

  bindClose();

  const input = document.getElementById('ng-input');
  const btn = document.getElementById('ng-btn');
  const hint = document.getElementById('ng-hint');

  function doGuess() {
    if (won) return;
    const val = parseInt(input.value);
    if (isNaN(val) || val < 1 || val > 100) {
      hint.textContent = '请输入1-100的数字！';
      return;
    }
    guesses++;
    document.getElementById('ng-guesses').textContent = guesses;
    input.value = '';

    if (val === target) {
      won = true;
      hint.textContent = `正确！答案就是 ${target}！`;
      hint.className = 'guess-hint correct';
      endNumberGuess(guesses, area);
    } else if (val < target) {
      hint.textContent = `${val} 太小了！再大一点`;
      hint.className = 'guess-hint higher';
    } else {
      hint.textContent = `${val} 太大了！再小一点`;
      hint.className = 'guess-hint lower';
    }
  }

  btn.addEventListener('click', doGuess);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doGuess(); });
  input.focus();
}

function endNumberGuess(guesses, area) {
  let coins;
  if (guesses <= 3) coins = 25;
  else if (guesses <= 5) coins = 15;
  else if (guesses <= 7) coins = 10;
  else coins = 5;

  addCoins(coins);
  gameState.trackers.gamesWon++;
  triggerPetAnimation('emotion-excited');
  addXp(8);

  setTimeout(() => {
    const body = area.querySelector('.mini-game-body');
    if (body) {
      body.innerHTML = `
        <div class="game-over-msg">${guesses}次猜中！<br>获得: ${coins} 金币！</div>
        <button class="game-start-btn" id="ng-retry">再来一局</button>
      `;
      document.getElementById('ng-retry').addEventListener('click', () => {
        gameState.trackers.gamesPlayed++;
        initNumberGuess(area);
      });
    }
  }, 800);
  updateQuestProgress();
  checkAchievements();
}

// --- 打地鼠 ---
function initWhackMole(area) {
  let score = 0;
  let timeLeft = 15;
  let timer = null;
  let moleTimer = null;

  area.innerHTML = `
    ${miniGameHeader('🐹 打地鼠')}
    <div class="mini-game-stats">
      得分: <span id="wm-score">0</span> &nbsp; 时间: <span id="wm-time">15</span>秒
    </div>
    <div class="mini-game-body">
      <button class="game-start-btn" id="wm-start">开始!</button>
      <div class="mole-grid" id="wm-grid" style="display:none;"></div>
    </div>
  `;

  bindClose(() => { clearInterval(timer); clearInterval(moleTimer); });

  // Create 3x3 grid
  const grid = document.getElementById('wm-grid');
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.className = 'mole-hole';
    hole.dataset.index = i;
    hole.textContent = '⬛';
    hole.addEventListener('click', () => {
      if (hole.classList.contains('mole-active')) {
        score++;
        const el = document.getElementById('wm-score');
        if (el) el.textContent = score;
        hole.classList.remove('mole-active');
        hole.textContent = '💥';
        setTimeout(() => { hole.textContent = '⬛'; }, 200);
      }
    });
    grid.appendChild(hole);
  }

  document.getElementById('wm-start').addEventListener('click', function () {
    this.style.display = 'none';
    grid.style.display = 'grid';

    timer = setInterval(() => {
      timeLeft--;
      const el = document.getElementById('wm-time');
      if (el) el.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        clearInterval(moleTimer);
        endWhackMole(score, area);
      }
    }, 1000);

    moleTimer = setInterval(() => {
      // Clear previous moles
      grid.querySelectorAll('.mole-active').forEach((h) => {
        h.classList.remove('mole-active');
        h.textContent = '⬛';
      });
      // Spawn 1-2 moles
      const count = Math.random() > 0.6 ? 2 : 1;
      const indices = [];
      while (indices.length < count) {
        const idx = Math.floor(Math.random() * 9);
        if (!indices.includes(idx)) indices.push(idx);
      }
      indices.forEach((idx) => {
        const hole = grid.children[idx];
        hole.classList.add('mole-active');
        hole.textContent = '🐹';
      });
    }, 700);
  });
}

function endWhackMole(score, area) {
  const coins = score * 3;
  if (coins > 0) {
    addCoins(coins);
    gameState.trackers.gamesWon++;
    triggerPetAnimation('emotion-excited');
  }
  addXp(Math.max(1, score));

  const body = area.querySelector('.mini-game-body');
  if (body) {
    body.innerHTML = `
      <div class="game-over-msg">打中了 ${score} 只地鼠！<br>获得: ${coins} 金币！</div>
      <button class="game-start-btn" id="wm-retry">再来一局</button>
    `;
    document.getElementById('wm-retry').addEventListener('click', () => {
      gameState.trackers.gamesPlayed++;
      initWhackMole(area);
    });
  }
  updateQuestProgress();
  checkAchievements();
}

// --- 算术挑战 ---
function initMathChallenge(area) {
  let score = 0;
  let totalCoins = 0;
  let questionNum = 0;
  const maxQuestions = 10;
  let currentAnswer = 0;
  let startTime = 0;

  area.innerHTML = `
    ${miniGameHeader('🧮 算术挑战')}
    <div class="mini-game-stats">
      题目: <span id="mc-qnum">0</span>/${maxQuestions} &nbsp;
      正确: <span id="mc-score">0</span> &nbsp;
      金币: <span id="mc-coins">0</span>
    </div>
    <div class="mini-game-body">
      <div class="math-question" id="mc-question">准备好了吗？</div>
      <div class="guess-input-row">
        <input type="number" class="guess-input" id="mc-input" placeholder="答案">
        <button class="guess-btn" id="mc-btn">确定</button>
      </div>
      <div class="guess-hint" id="mc-hint">按确定或回车提交答案</div>
    </div>
  `;

  bindClose();

  function nextQuestion() {
    if (questionNum >= maxQuestions) {
      endMathChallenge(score, totalCoins, area);
      return;
    }
    questionNum++;
    document.getElementById('mc-qnum').textContent = questionNum;

    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b;
    if (op === '*') {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
    } else {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 50) + 1;
    }
    if (op === '-' && a < b) [a, b] = [b, a];

    const opDisplay = op === '*' ? 'x' : op;
    document.getElementById('mc-question').textContent = `${a} ${opDisplay} ${b} = ?`;
    currentAnswer = op === '+' ? a + b : op === '-' ? a - b : a * b;
    startTime = Date.now();
    document.getElementById('mc-input').value = '';
    document.getElementById('mc-input').focus();
    document.getElementById('mc-hint').textContent = '快速回答获得更多金币！';
    document.getElementById('mc-hint').className = 'guess-hint';
  }

  function submitAnswer() {
    const val = parseInt(document.getElementById('mc-input').value);
    if (isNaN(val)) return;

    const elapsed = (Date.now() - startTime) / 1000;
    const hint = document.getElementById('mc-hint');

    if (val === currentAnswer) {
      score++;
      const bonus = elapsed < 3 ? 10 : elapsed < 5 ? 7 : 5;
      totalCoins += bonus;
      document.getElementById('mc-score').textContent = score;
      document.getElementById('mc-coins').textContent = totalCoins;
      hint.textContent = `正确！+${bonus} 金币 (${elapsed.toFixed(1)}秒)`;
      hint.className = 'guess-hint correct';
    } else {
      hint.textContent = `错误！正确答案是 ${currentAnswer}`;
      hint.className = 'guess-hint lower';
    }

    setTimeout(nextQuestion, 1000);
  }

  document.getElementById('mc-btn').addEventListener('click', submitAnswer);
  document.getElementById('mc-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitAnswer();
  });

  nextQuestion();
}

function endMathChallenge(score, totalCoins, area) {
  if (totalCoins > 0) {
    addCoins(totalCoins);
    gameState.trackers.gamesWon++;
    triggerPetAnimation('emotion-excited');
  }
  addXp(Math.max(1, score * 3));

  const body = area.querySelector('.mini-game-body');
  if (body) {
    body.innerHTML = `
      <div class="game-over-msg">答对 ${score}/10 题！<br>获得: ${totalCoins} 金币！</div>
      <button class="game-start-btn" id="mc-retry">再来一局</button>
    `;
    document.getElementById('mc-retry').addEventListener('click', () => {
      gameState.trackers.gamesPlayed++;
      initMathChallenge(area);
    });
  }
  updateQuestProgress();
  checkAchievements();
}

// --- 弹球消除 ---
function initBrickBreaker(area) {
  area.innerHTML = `
    ${miniGameHeader('🧱 弹球消除')}
    <div class="mini-game-stats">
      砖块: <span id="bb-bricks">0</span> &nbsp; 金币: <span id="bb-coins">0</span>
    </div>
    <div class="mini-game-body">
      <canvas id="bb-canvas" width="300" height="280" style="background:#111;border-radius:8px;display:block;margin:0 auto;cursor:pointer;"></canvas>
    </div>
  `;

  bindClose();

  const canvas = document.getElementById('bb-canvas');
  const ctx = canvas.getContext('2d');

  // 游戏参数
  const paddleW = 60, paddleH = 8;
  let paddleX = (canvas.width - paddleW) / 2;
  const ballR = 5;
  let ballX = canvas.width / 2, ballY = canvas.height - 30;
  let ballDX = 2.5, ballDY = -2.5;
  let bricksDestroyed = 0;
  let running = true;

  // 砖块
  const cols = 6, rows = 4, brickW = 44, brickH = 14, brickPad = 4, brickTop = 20, brickLeft = 6;
  const bricks = [];
  const brickColors = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#be4bdb'];
  for (let r = 0; r < rows; r++) {
    bricks[r] = [];
    for (let c = 0; c < cols; c++) {
      bricks[r][c] = { alive: true };
    }
  }

  // 鼠标/触摸控制
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    paddleX = Math.max(0, Math.min(canvas.width - paddleW, e.clientX - rect.left - paddleW / 2));
  });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    paddleX = Math.max(0, Math.min(canvas.width - paddleW, e.touches[0].clientX - rect.left - paddleW / 2));
  }, { passive: false });

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 砖块
    let allGone = true;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!bricks[r][c].alive) continue;
        allGone = false;
        const bx = brickLeft + c * (brickW + brickPad);
        const by = brickTop + r * (brickH + brickPad);
        ctx.fillStyle = brickColors[r % brickColors.length];
        ctx.fillRect(bx, by, brickW, brickH);
      }
    }

    if (allGone) {
      running = false;
      endBrickBreaker(bricksDestroyed, area);
      return;
    }

    // 球
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    // 挡板
    ctx.fillStyle = '#4dabf7';
    ctx.fillRect(paddleX, canvas.height - 16, paddleW, paddleH);

    // 球移动
    ballX += ballDX;
    ballY += ballDY;

    // 墙壁碰撞
    if (ballX + ballR > canvas.width || ballX - ballR < 0) ballDX = -ballDX;
    if (ballY - ballR < 0) ballDY = -ballDY;

    // 挡板碰撞
    if (ballY + ballR > canvas.height - 16 && ballX > paddleX && ballX < paddleX + paddleW) {
      ballDY = -Math.abs(ballDY);
      // 根据击中位置调整角度
      const hitPos = (ballX - paddleX) / paddleW;
      ballDX = 4 * (hitPos - 0.5);
    }

    // 掉落
    if (ballY + ballR > canvas.height) {
      running = false;
      endBrickBreaker(bricksDestroyed, area);
      return;
    }

    // 砖块碰撞
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!bricks[r][c].alive) continue;
        const bx = brickLeft + c * (brickW + brickPad);
        const by = brickTop + r * (brickH + brickPad);
        if (ballX > bx && ballX < bx + brickW && ballY - ballR < by + brickH && ballY + ballR > by) {
          bricks[r][c].alive = false;
          ballDY = -ballDY;
          bricksDestroyed++;
          document.getElementById('bb-bricks').textContent = bricksDestroyed;
          document.getElementById('bb-coins').textContent = bricksDestroyed * 2;
        }
      }
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

function endBrickBreaker(bricksDestroyed, area) {
  const coins = bricksDestroyed * 2;
  if (coins > 0) {
    addCoins(coins);
    gameState.trackers.gamesWon++;
    triggerPetAnimation('emotion-excited');
  }
  addXp(Math.max(1, bricksDestroyed));

  const body = area.querySelector('.mini-game-body');
  if (body) {
    body.innerHTML = `
      <div class="game-over-msg">消除了 ${bricksDestroyed} 块砖！<br>获得: ${coins} 金币！</div>
      <button class="game-start-btn" id="bb-retry">再来一局</button>
    `;
    document.getElementById('bb-retry').addEventListener('click', () => {
      gameState.trackers.gamesPlayed++;
      initBrickBreaker(area);
    });
  }
  updateQuestProgress();
  checkAchievements();
}

// ============================================================
// 成就系统
// ============================================================
function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // 按系列分组
  const seriesMap = {};
  for (const ach of ACHIEVEMENTS) {
    if (!seriesMap[ach.series]) seriesMap[ach.series] = [];
    seriesMap[ach.series].push(ach);
  }

  for (const [series, achs] of Object.entries(seriesMap)) {
    const seriesDiv = document.createElement('div');
    seriesDiv.className = 'achievement-series';
    seriesDiv.innerHTML = `<div class="achievement-series-title">${series}</div>`;

    for (const ach of achs) {
      const unlocked = gameState.unlockedAchievements.includes(ach.id);
      const currentVal = gameState.trackers[ach.stat] || 0;
      const progress = Math.min(1, currentVal / ach.target);
      const tierInfo = ACHIEVEMENT_TIERS[ach.tier];

      const card = document.createElement('div');
      card.className = 'achievement-card ' + (unlocked ? 'unlocked' : 'locked');
      card.innerHTML = `
        <span class="achievement-icon">${ach.icon}</span>
        <div class="achievement-info">
          <div class="achievement-name">
            <span class="achievement-tier" style="color:${tierInfo.color}">${tierInfo.icon} ${tierInfo.name}</span>
            ${ach.name}
          </div>
          <div class="achievement-desc">${ach.desc}</div>
          ${!unlocked ? `
            <div class="achievement-progress">
              <div class="achievement-progress-fill" style="width:${progress * 100}%"></div>
            </div>
            <div class="achievement-progress-text">${currentVal} / ${ach.target}</div>
          ` : '<div class="achievement-progress-text" style="color:#39ff14;">已完成! +' + ach.reward + ' 金币</div>'}
        </div>
      `;
      seriesDiv.appendChild(card);
    }
    grid.appendChild(seriesDiv);
  }
}

function checkAchievements() {
  for (const ach of ACHIEVEMENTS) {
    if (gameState.unlockedAchievements.includes(ach.id)) continue;

    const currentVal = gameState.trackers[ach.stat] || 0;
    if (currentVal >= ach.target) {
      gameState.unlockedAchievements.push(ach.id);
      const tierInfo = ACHIEVEMENT_TIERS[ach.tier];
      showToast(`${tierInfo.icon} 成就解锁: ${ach.name}! +${ach.reward}金币`, 'achievement');
      triggerPetAnimation('emotion-proud');
      addCoins(ach.reward);
      addXp(15);
    }
  }
}

// ============================================================
// 任务系统
// ============================================================
function refreshQuests() {
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayMs = todayStart.getTime();

  // 每日任务刷新
  if (!gameState.quests.lastDailyRefresh || gameState.quests.lastDailyRefresh < todayMs) {
    gameState.quests.daily = generateDailyQuests();
    gameState.quests.lastDailyRefresh = now;
    // 保存当前trackers快照用于delta计算
    gameState.quests.dailySnapshot = { ...gameState.trackers };
  }

  // 每周任务刷新 (每7天)
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  if (!gameState.quests.lastWeeklyRefresh || now - gameState.quests.lastWeeklyRefresh > weekMs) {
    gameState.quests.weekly = generateWeeklyQuests();
    gameState.quests.lastWeeklyRefresh = now;
    gameState.quests.weeklySnapshot = { ...gameState.trackers };
  }
}

function generateDailyQuests() {
  const shuffled = [...DAILY_QUEST_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((q) => ({ ...q, completed: false }));
}

function generateWeeklyQuests() {
  const shuffled = [...WEEKLY_QUEST_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2).map((q) => ({ ...q, completed: false }));
}

function updateQuestProgress() {
  const dailySnap = gameState.quests.dailySnapshot || {};
  const weeklySnap = gameState.quests.weeklySnapshot || {};

  let dailyCompleted = 0;
  for (const quest of (gameState.quests.daily || [])) {
    if (quest.completed) { dailyCompleted++; continue; }
    const current = gameState.trackers[quest.stat] || 0;
    const baseline = dailySnap[quest.stat] || 0;
    const delta = current - baseline;
    if (delta >= quest.target) {
      quest.completed = true;
      dailyCompleted++;
      addCoins(quest.coinReward);
      addXp(quest.xpReward);
      gameState.trackers.dailyQuestsCompleted++;
      showToast(`每日任务完成: ${quest.desc}! +${quest.coinReward}金币`, 'achievement');
    }
  }

  for (const quest of (gameState.quests.weekly || [])) {
    if (quest.completed) continue;
    const current = gameState.trackers[quest.stat] || 0;
    const baseline = weeklySnap[quest.stat] || 0;
    const delta = current - baseline;
    if (delta >= quest.target) {
      quest.completed = true;
      addCoins(quest.coinReward);
      addXp(quest.xpReward);
      showToast(`每周任务完成: ${quest.desc}! +${quest.coinReward}金币`, 'achievement');
    }
  }
}

function renderQuests() {
  const container = document.getElementById('quest-list');
  if (!container) return;
  container.innerHTML = '';

  // 每日任务
  const dailyHeader = document.createElement('div');
  dailyHeader.className = 'quest-section-title';
  dailyHeader.textContent = '每日任务 (每天刷新)';
  container.appendChild(dailyHeader);

  const dailySnap = gameState.quests.dailySnapshot || {};
  for (const quest of (gameState.quests.daily || [])) {
    const current = gameState.trackers[quest.stat] || 0;
    const baseline = dailySnap[quest.stat] || 0;
    const delta = Math.max(0, current - baseline);
    const progress = Math.min(1, delta / quest.target);

    const div = document.createElement('div');
    div.className = 'quest-card' + (quest.completed ? ' completed' : '');
    div.innerHTML = `
      <div class="quest-info">
        <div class="quest-desc">${quest.completed ? '✅' : '⬜'} ${quest.desc}</div>
        <div class="quest-reward">奖励: 🪙${quest.coinReward} +${quest.xpReward}经验</div>
        ${!quest.completed ? `
          <div class="quest-progress">
            <div class="quest-progress-fill" style="width:${progress * 100}%"></div>
          </div>
          <div class="quest-progress-text">${delta} / ${quest.target}</div>
        ` : ''}
      </div>
    `;
    container.appendChild(div);
  }

  // 每周任务
  const weeklyHeader = document.createElement('div');
  weeklyHeader.className = 'quest-section-title';
  weeklyHeader.style.marginTop = '16px';
  weeklyHeader.textContent = '每周任务 (每周刷新)';
  container.appendChild(weeklyHeader);

  const weeklySnap = gameState.quests.weeklySnapshot || {};
  for (const quest of (gameState.quests.weekly || [])) {
    const current = gameState.trackers[quest.stat] || 0;
    const baseline = weeklySnap[quest.stat] || 0;
    const delta = Math.max(0, current - baseline);
    const progress = Math.min(1, delta / quest.target);

    const div = document.createElement('div');
    div.className = 'quest-card' + (quest.completed ? ' completed' : '');
    div.innerHTML = `
      <div class="quest-info">
        <div class="quest-desc">${quest.completed ? '✅' : '⬜'} ${quest.desc}</div>
        <div class="quest-reward">奖励: 🪙${quest.coinReward} +${quest.xpReward}经验</div>
        ${!quest.completed ? `
          <div class="quest-progress">
            <div class="quest-progress-fill" style="width:${progress * 100}%"></div>
          </div>
          <div class="quest-progress-text">${delta} / ${quest.target}</div>
        ` : ''}
      </div>
    `;
    container.appendChild(div);
  }
}

// ============================================================
// 幸运转盘
// ============================================================
function renderWheel() {
  const wheelArea = document.getElementById('wheel-area');
  if (!wheelArea) return;

  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const canFreeSpin = !gameState.wheel.lastFreeSpin || gameState.wheel.lastFreeSpin < todayStart.getTime();

  wheelArea.innerHTML = `
    <div class="wheel-container">
      <div class="wheel-display" id="wheel-display">
        <div class="wheel-pointer">▼</div>
        <div class="wheel-circle" id="wheel-circle">
          ${WHEEL_PRIZES.map((p, i) => {
            const angle = (360 / WHEEL_PRIZES.length) * i;
            return `<div class="wheel-segment" style="transform:rotate(${angle}deg)">${p.icon}</div>`;
          }).join('')}
        </div>
      </div>
      <div class="wheel-info">
        <div class="wheel-prizes-list">
          ${WHEEL_PRIZES.map((p) => `<div class="wheel-prize-item">${p.icon} ${p.name}</div>`).join('')}
        </div>
        <div class="wheel-buttons">
          <button class="wheel-spin-btn" id="wheel-free" ${canFreeSpin ? '' : 'disabled'}>
            ${canFreeSpin ? '免费转一次！' : '今日已用'}
          </button>
          <button class="wheel-spin-btn paid" id="wheel-paid">
            花费 20 金币再转一次
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('wheel-free').addEventListener('click', () => {
    if (!canFreeSpin) return;
    gameState.wheel.lastFreeSpin = Date.now();
    spinWheel();
  });

  document.getElementById('wheel-paid').addEventListener('click', () => {
    if (!spendCoins(20)) {
      showToast('金币不足！需要20金币', 'error');
      return;
    }
    spinWheel();
  });
}

function spinWheel() {
  // 禁用按钮
  const freeBtn = document.getElementById('wheel-free');
  const paidBtn = document.getElementById('wheel-paid');
  if (freeBtn) freeBtn.disabled = true;
  if (paidBtn) paidBtn.disabled = true;

  // 加权随机选择
  const totalWeight = WHEEL_PRIZES.reduce((s, p) => s + p.weight, 0);
  let rand = Math.random() * totalWeight;
  let prizeIdx = 0;
  for (let i = 0; i < WHEEL_PRIZES.length; i++) {
    rand -= WHEEL_PRIZES[i].weight;
    if (rand <= 0) { prizeIdx = i; break; }
  }

  const prize = WHEEL_PRIZES[prizeIdx];
  const segAngle = 360 / WHEEL_PRIZES.length;
  const targetAngle = 360 * 5 + (360 - prizeIdx * segAngle); // 5 full rotations + target

  const circle = document.getElementById('wheel-circle');
  if (circle) {
    circle.style.transition = 'transform 3s cubic-bezier(0.17,0.67,0.12,0.99)';
    circle.style.transform = `rotate(${targetAngle}deg)`;
  }

  setTimeout(() => {
    // 发奖
    awardWheelPrize(prize);
    renderWheel();
  }, 3200);
}

function awardWheelPrize(prize) {
  let message = '';
  switch (prize.type) {
    case 'coins':
      addCoins(prize.amount);
      message = `恭喜获得 ${prize.amount} 金币！`;
      break;
    case 'random_food': {
      const foods = SHOP_ITEMS.filter((i) => i.type === 'food');
      const f = foods[Math.floor(Math.random() * foods.length)];
      addToInventory(f.id, 1);
      message = `恭喜获得 ${f.icon} ${f.name}！`;
      break;
    }
    case 'random_seed': {
      const seeds = SHOP_ITEMS.filter((i) => i.type === 'seed');
      const s = seeds[Math.floor(Math.random() * seeds.length)];
      addToInventory(s.id, 1);
      message = `恭喜获得 ${s.icon} ${s.name}！`;
      break;
    }
    case 'random_decoration': {
      const decs = SHOP_ITEMS.filter((i) => i.type === 'decoration');
      const d = decs[Math.floor(Math.random() * decs.length)];
      addToInventory(d.id, 1);
      message = `恭喜获得 ${d.icon} ${d.name}！`;
      break;
    }
    case 'item':
      addToInventory(prize.itemId, 1);
      const itemDef = findItemDef(prize.itemId);
      message = `恭喜获得 ${itemDef ? itemDef.icon + ' ' + itemDef.name : prize.itemId}！`;
      break;
  }

  showModal('🎰', '幸运转盘', message, [{ text: '太棒了！', cls: 'confirm' }]);
  addXp(5);
}

// ============================================================
// 烹饪系统
// ============================================================
function renderCooking() {
  const cookingArea = document.getElementById('cooking-area');
  if (!cookingArea) return;
  cookingArea.innerHTML = '';

  const title = document.createElement('div');
  title.className = 'cooking-title';
  title.textContent = '食谱大全';
  cookingArea.appendChild(title);

  for (const recipe of RECIPES) {
    const hasAll = recipe.ingredients.every((ing) => getInventoryQty(ing.id) >= ing.qty);
    const cooked = gameState.cookedRecipes.includes(recipe.id);

    const card = document.createElement('div');
    card.className = 'recipe-card' + (hasAll ? ' can-cook' : '') + (cooked ? ' cooked-before' : '');
    card.innerHTML = `
      <div class="recipe-header">
        <span class="recipe-icon">${recipe.icon}</span>
        <span class="recipe-name">${recipe.name}</span>
        <span class="recipe-value">售价: 🪙${recipe.value}</span>
      </div>
      <div class="recipe-ingredients">
        ${recipe.ingredients.map((ing) => {
          const def = findItemDef(ing.id);
          const have = getInventoryQty(ing.id);
          const enough = have >= ing.qty;
          const icon = def ? def.icon : '📦';
          const name = def ? def.name : ing.id;
          return `<span class="recipe-ing ${enough ? 'have' : 'missing'}">${icon} ${name} x${ing.qty} (${have})</span>`;
        }).join('')}
      </div>
      <button class="cook-btn" ${hasAll ? '' : 'disabled'}>${hasAll ? '开始烹饪' : '食材不足'}</button>
    `;

    if (hasAll) {
      card.querySelector('.cook-btn').addEventListener('click', () => cookRecipe(recipe));
    }

    cookingArea.appendChild(card);
  }
}

function cookRecipe(recipe) {
  // 扣食材
  for (const ing of recipe.ingredients) {
    if (!removeFromInventory(ing.id, ing.qty)) {
      showToast('食材不足！', 'error');
      return;
    }
  }

  // 获得金币
  addCoins(recipe.value);
  gameState.trackers.totalCooked++;
  if (!gameState.cookedRecipes.includes(recipe.id)) {
    gameState.cookedRecipes.push(recipe.id);
    gameState.trackers.uniqueRecipes = gameState.cookedRecipes.length;
  }
  gameState.trackers.totalActions++;

  showToast(`烹饪了 ${recipe.icon} ${recipe.name}！卖出获得 ${recipe.value} 金币`, 'success');
  triggerPetAnimation('life-cook');
  addXp(recipe.xp || 5);

  renderCooking();
  renderInventory();
  updateQuestProgress();
  checkAchievements();
}

// ============================================================
// 钓鱼系统
// ============================================================
function renderFishing() {
  const fishingArea = document.getElementById('fishing-area');
  if (!fishingArea) return;
  fishingArea.innerHTML = '';

  // 鱼饵选择
  const baits = getInventoryItemsByType('bait');
  const hasBait = baits.length > 0;

  fishingArea.innerHTML = `
    <div class="fishing-scene">
      <div class="fishing-water" id="fishing-water">
        <div class="fishing-rod" id="fishing-rod">🎣</div>
        <div class="fishing-status" id="fishing-status">
          ${hasBait ? '选择鱼饵，然后点击"抛竿"开始钓鱼' : '没有鱼饵了！去商店购买'}
        </div>
      </div>
    </div>
    <div class="fishing-controls">
      <div class="bait-selector" id="bait-selector">
        <div class="bait-title">选择鱼饵:</div>
        ${baits.map((b) => {
          const def = findItemDef(b.itemId);
          return `<button class="bait-option" data-bait="${b.itemId}">${def.icon} ${def.name} (x${b.quantity})</button>`;
        }).join('')}
        ${!hasBait ? '<div style="color:var(--text-muted)">没有鱼饵</div>' : ''}
      </div>
      <button class="cast-btn" id="cast-btn" ${hasBait ? '' : 'disabled'}>抛竿！</button>
    </div>
    <div class="fish-collection">
      <div class="fish-title">鱼类图鉴:</div>
      <div class="fish-list">
        ${FISH_TYPES.map((f) => {
          const caught = getInventoryQty(f.id) > 0 || (gameState.trackers['caught_' + f.id] || 0) > 0;
          return `<div class="fish-entry ${caught ? 'caught' : 'unknown'}" style="border-color:${RARITY_COLORS[f.rarity]}">
            <span>${caught ? f.icon : '❓'}</span>
            <span>${caught ? f.name : '???'}</span>
            <span style="color:${RARITY_COLORS[f.rarity]}">${RARITY_NAMES[f.rarity]}</span>
            <span>🪙${f.value}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;

  let selectedBait = baits.length > 0 ? baits[0].itemId : null;

  // 鱼饵选择
  fishingArea.querySelectorAll('.bait-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      fishingArea.querySelectorAll('.bait-option').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedBait = btn.dataset.bait;
    });
  });

  // 自动选中第一个
  const firstBait = fishingArea.querySelector('.bait-option');
  if (firstBait) firstBait.classList.add('selected');

  // 抛竿
  document.getElementById('cast-btn').addEventListener('click', () => {
    if (!selectedBait || getInventoryQty(selectedBait) <= 0) {
      showToast('没有鱼饵了！', 'error');
      return;
    }
    startFishing(selectedBait);
  });
}

function startFishing(baitId) {
  removeFromInventory(baitId, 1);
  const baitDef = findItemDef(baitId);
  const bonus = baitDef ? baitDef.fishBonus || 0 : 0;

  const castBtn = document.getElementById('cast-btn');
  const status = document.getElementById('fishing-status');
  const rod = document.getElementById('fishing-rod');

  if (castBtn) castBtn.disabled = true;
  if (status) status.textContent = '等待鱼上钩...';
  if (rod) rod.style.animation = 'fishing-bob 1s ease-in-out infinite';

  triggerPetAnimation('life-fish');

  const waitTime = 3000 + Math.random() * 5000;

  setTimeout(() => {
    if (status) {
      status.textContent = '有鱼上钩了！快点击！';
      status.className = 'fishing-status fish-bite';
    }
    if (rod) rod.textContent = '🎣❗';

    let caught = false;
    const catchWindow = 2000;

    const clickHandler = () => {
      if (caught) return;
      caught = true;
      status.removeEventListener('click', clickHandler);
      rod.removeEventListener('click', clickHandler);
      reelInFish(bonus);
    };

    if (status) status.addEventListener('click', clickHandler);
    if (rod) rod.addEventListener('click', clickHandler);

    setTimeout(() => {
      if (!caught) {
        if (status) {
          status.textContent = '鱼跑掉了...再试一次吧';
          status.className = 'fishing-status';
        }
        if (rod) {
          rod.textContent = '🎣';
          rod.style.animation = '';
        }
        if (castBtn) castBtn.disabled = false;
      }
    }, catchWindow);
  }, waitTime);
}

function reelInFish(baitBonus) {
  // 根据鱼饵加成决定钓到的鱼
  const adjustedFish = FISH_TYPES.map((f) => {
    let w = f.weight;
    if (f.rarity === 'rare') w += baitBonus * 3;
    if (f.rarity === 'epic') w += baitBonus * 2;
    if (f.rarity === 'legendary') w += baitBonus * 1.5;
    return { ...f, adjustedWeight: Math.max(0.1, w) };
  });

  const totalW = adjustedFish.reduce((s, f) => s + f.adjustedWeight, 0);
  let rand = Math.random() * totalW;
  let caught = adjustedFish[0];
  for (const f of adjustedFish) {
    rand -= f.adjustedWeight;
    if (rand <= 0) { caught = f; break; }
  }

  // 加入背包
  addToInventory(caught.id, 1);
  gameState.trackers.totalFished++;
  gameState.trackers['caught_' + caught.id] = (gameState.trackers['caught_' + caught.id] || 0) + 1;
  if (caught.rarity === 'legendary') gameState.trackers.legendaryFished++;
  gameState.trackers.totalActions++;

  const rarityName = RARITY_NAMES[caught.rarity];
  const rarityColor = RARITY_COLORS[caught.rarity];

  showToast(`钓到了 ${caught.icon} ${caught.name}！(${rarityName}) 价值 ${caught.value} 金币`, caught.rarity === 'legendary' ? 'achievement' : 'success');

  if (caught.rarity === 'legendary') {
    showModal(caught.icon, '传说之鱼！', `你钓到了传说级的 ${caught.name}！价值 ${caught.value} 金币！`, [
      { text: '卖出 (+' + caught.value + '金币)', cls: 'confirm', action: () => {
        removeFromInventory(caught.id, 1);
        addCoins(caught.value);
        showToast(`卖出了 ${caught.icon} ${caught.name}！+${caught.value} 金币`, 'success');
        renderFishing();
      }},
      { text: '收藏', cls: 'cancel' },
    ]);
  }

  addXp(caught.rarity === 'legendary' ? 30 : caught.rarity === 'epic' ? 15 : caught.rarity === 'rare' ? 8 : 3);

  const status = document.getElementById('fishing-status');
  const rod = document.getElementById('fishing-rod');
  const castBtn = document.getElementById('cast-btn');

  if (status) {
    status.innerHTML = `钓到了 <span style="color:${rarityColor}">${caught.icon} ${caught.name}</span>！`;
    status.className = 'fishing-status';
  }
  if (rod) {
    rod.textContent = '🎣';
    rod.style.animation = '';
  }
  if (castBtn) castBtn.disabled = false;

  renderInventory();
  updateQuestProgress();
  checkAchievements();
}

// ============================================================
// 宠物动画触发
// ============================================================
function triggerPetAnimation(state) {
  try {
    if (window.electronAPI && window.electronAPI.setPetAnimation) {
      window.electronAPI.setPetAnimation(state);
    }
  } catch (e) {
    // 未连接，忽略
  }
}

// ============================================================
// UI 工具函数
// ============================================================
function showToast(message, type) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ' ' + type : '');
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 2600);
}

function showModal(icon, title, desc, buttons) {
  const overlay = document.getElementById('modal-overlay');
  const iconEl = document.getElementById('modal-icon');
  const titleEl = document.getElementById('modal-title');
  const descEl = document.getElementById('modal-desc');
  const actionsEl = document.getElementById('modal-actions');

  if (!overlay) return;

  if (iconEl) iconEl.textContent = icon;
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc;

  if (actionsEl) {
    actionsEl.innerHTML = '';
    // buttons is an array of { text, cls, action }
    if (!buttons || !Array.isArray(buttons)) {
      buttons = [{ text: '确定', cls: 'confirm' }];
    }
    for (const btn of buttons) {
      const b = document.createElement('button');
      b.className = 'modal-btn ' + (btn.cls || 'confirm');
      b.textContent = btn.text;
      b.addEventListener('click', () => {
        overlay.classList.remove('active');
        if (btn.action) btn.action();
      });
      actionsEl.appendChild(b);
    }
  }

  overlay.classList.add('active');
}

function getTypeName(type) {
  const names = {
    food: '食物', toy: '玩具', seed: '种子', tool: '工具',
    decoration: '装饰', bait: '鱼饵', ingredient: '食材',
    fish: '鱼类',
  };
  return names[type] || type;
}

function formatEffect(effect) {
  if (!effect) return '';
  const names = {
    hunger: '饱食度', happiness: '心情', energy: '精力',
    cleanliness: '清洁度', health: '健康',
  };
  const parts = [];
  for (const [key, val] of Object.entries(effect)) {
    const sign = val > 0 ? '+' : '';
    parts.push(`${names[key] || key} ${sign}${val}`);
  }
  return parts.join(', ');
}

function renderAll() {
  renderTopBar();
  renderStatus();
  renderInventory();
  renderShop();
  renderGarden();
  renderGamesList();
  renderAchievements();
  renderQuests();
  renderWheel();
  renderCooking();
  renderFishing();
}

// ============================================================
// 启动
// ============================================================
document.addEventListener('DOMContentLoaded', init);
