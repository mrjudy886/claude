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

  // --- 稀有 (15) ---
  { id: 'phoenix_feather', name: '凤凰羽', icon: '🪶', type: 'rare', category: 'rare', price: 300, effect: { health: 50, energy: 30 }, desc: '传说中凤凰落下的羽毛，蕴含重生之力 🔥', consumable: true },
  { id: 'dragon_heart', name: '龙之心', icon: '💗', type: 'rare', category: 'rare', price: 500, effect: { hunger: 50, happiness: 30, energy: 30, health: 20 }, desc: '龙族核心精华，全属性大幅提升 🐲', consumable: true },
  { id: 'starlight_elixir', name: '星光药剂', icon: '🌟', type: 'rare', category: 'rare', price: 400, effect: { happiness: 60, energy: 40 }, desc: '用星尘酿造的神秘药剂，喝下后心情大好 ✨', consumable: true },
  { id: 'void_crystal', name: '虚空水晶', icon: '🔮', type: 'rare', category: 'rare', price: 600, effect: { energy: 80 }, desc: '蕴含虚空能量的水晶，瞬间精力充沛 🌀', consumable: true },
  { id: 'celestial_fruit', name: '天界仙果', icon: '🍑', type: 'rare', category: 'rare', price: 450, effect: { hunger: 80, health: 30 }, desc: '天界圣树结出的果实，食之延年益寿 🌈', consumable: true },
  { id: 'eternal_spring', name: '永恒之泉', icon: '💧', type: 'rare', category: 'rare', price: 350, effect: { cleanliness: 100, happiness: 20 }, desc: '永不干涸的神泉水，一滴即净 🫧', consumable: true },
  { id: 'chaos_gem', name: '混沌宝石', icon: '💠', type: 'rare', category: 'rare', price: 800, effect: { hunger: 40, happiness: 40, energy: 40, cleanliness: 40, health: 40 }, desc: '蕴含混沌之力的宝石，全属性恢复 🌌', consumable: true },
  { id: 'time_hourglass', name: '时之沙漏', icon: '⏳', type: 'rare', category: 'rare', price: 250, desc: '倒转时间的沙漏，加速花园所有作物 ⏰', consumable: true },
  { id: 'lucky_clover', name: '四叶草', icon: '🍀', type: 'rare', category: 'rare', price: 200, effect: { happiness: 30 }, desc: '传说中的幸运四叶草，增加幸运值 🌈', consumable: true },
  { id: 'moon_tear', name: '月之泪', icon: '🌙', type: 'rare', category: 'rare', price: 550, effect: { health: 60, happiness: 20 }, desc: '月光凝结而成的晶莹泪滴 💫', consumable: true },
  { id: 'sun_essence', name: '太阳精华', icon: '☀️', type: 'rare', category: 'rare', price: 650, effect: { energy: 60, hunger: 30, happiness: 20 }, desc: '凝聚太阳核心能量的精华液 🔆', consumable: true },
  { id: 'rainbow_gem', name: '彩虹宝石', icon: '🌈', type: 'rare', category: 'rare', price: 1000, effect: { happiness: 80 }, desc: '七色光芒汇聚的至高宝石 💎', consumable: false },
  { id: 'ancient_scroll', name: '远古卷轴', icon: '📜', type: 'rare', category: 'rare', price: 750, effect: { happiness: 50 }, desc: '记载着远古智慧的神秘卷轴 🏛️', consumable: false },
  { id: 'cosmic_dust', name: '宇宙尘埃', icon: '🌌', type: 'rare', category: 'rare', price: 900, effect: { energy: 50, health: 50 }, desc: '来自遥远星系的神秘尘埃，蕴含宇宙之力 💫', consumable: true },
  { id: 'genesis_seed', name: '创世种子', icon: '🌰', type: 'seed', category: 'rare', price: 500, growTime: 600, harvestValue: 500, harvestIcon: '🌳', harvestName: '世界树果实', harvestId: 'world_tree_fruit', desc: '传说中的创世种子，可长出世界树 🌍 (10分钟)' },

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
  // --- 初级料理 (简单食材) ---
  { id: 'fried_egg', name: '煎蛋', icon: '🍳', difficulty: 1, ingredients: [{ id: 'egg', qty: 1 }], value: 8, xp: 3, flavor: '简单的快手早餐~ ☀️' },
  { id: 'milk_tea', name: '奶茶', icon: '🧋', difficulty: 1, ingredients: [{ id: 'milk', qty: 1 }], value: 10, xp: 3, flavor: '来一杯暖暖的奶茶吧 (´▽`ʃ♡ƪ)' },
  { id: 'toast', name: '黄油吐司', icon: '🍞', difficulty: 1, ingredients: [{ id: 'flour', qty: 1 }, { id: 'butter', qty: 1 }], value: 12, xp: 4, flavor: '酥脆金黄！✧' },
  { id: 'omelette', name: '蛋卷', icon: '🥚', difficulty: 1, ingredients: [{ id: 'egg', qty: 2 }], value: 14, xp: 4, flavor: '蓬松柔软的蛋卷~ 🌸' },

  // --- 中级料理 ---
  { id: 'honey_bread', name: '蜂蜜面包', icon: '🍯', difficulty: 2, ingredients: [{ id: 'flour', qty: 1 }, { id: 'honey', qty: 1 }], value: 18, xp: 5, flavor: '甜蜜蜜~ (ﾉ´ヮ`)ﾉ*:・ﾟ✧' },
  { id: 'honey_milk', name: '蜂蜜牛奶', icon: '🥛', difficulty: 2, ingredients: [{ id: 'honey', qty: 1 }, { id: 'milk', qty: 1 }], value: 18, xp: 5, flavor: '温暖治愈的一杯 ♡' },
  { id: 'milk_chocolate', name: '牛奶巧克力', icon: '🍫', difficulty: 2, ingredients: [{ id: 'milk', qty: 1 }, { id: 'chocolate', qty: 1 }], value: 22, xp: 6, flavor: '浓浓巧克力香~ ₍ᐢ..ᐢ₎♡' },
  { id: 'butter_cookie', name: '黄油曲奇', icon: '🍪', difficulty: 2, ingredients: [{ id: 'flour', qty: 1 }, { id: 'butter', qty: 1 }, { id: 'egg', qty: 1 }], value: 20, xp: 6, flavor: '酥脆小饼干！(⌒▽⌒)' },
  { id: 'egg_tart', name: '蛋挞', icon: '🥧', difficulty: 2, ingredients: [{ id: 'egg', qty: 1 }, { id: 'milk', qty: 1 }, { id: 'butter', qty: 1 }], value: 22, xp: 7, flavor: '金黄酥皮好诱人~ (ㆁωㆁ)' },
  { id: 'pancake', name: '松饼', icon: '🥞', difficulty: 2, ingredients: [{ id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'milk', qty: 1 }], value: 20, xp: 6, flavor: '堆叠松饼塔！٩(◕‿◕)۶' },

  // --- 高级料理 ---
  { id: 'bread_pudding', name: '面包布丁', icon: '🍮', difficulty: 3, ingredients: [{ id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'milk', qty: 1 }], value: 25, xp: 8, flavor: '软糯Q弹~ (´ε` )♡' },
  { id: 'cream_puff', name: '奶油泡芙', icon: '🧁', difficulty: 3, ingredients: [{ id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'cream', qty: 1 }], value: 28, xp: 8, flavor: '爆浆泡芙！(ﾉ◕ヮ◕)ﾉ*:・ﾟ' },
  { id: 'fruit_salad', name: '水果沙拉', icon: '🥗', difficulty: 3, ingredients: [{ id: 'apple', qty: 1 }, { id: 'strawberry', qty: 1 }, { id: 'honey', qty: 1 }], value: 25, xp: 7, flavor: '彩色水果拼盘~ 🌈' },
  { id: 'strawberry_shake', name: '草莓奶昔', icon: '🥤', difficulty: 3, ingredients: [{ id: 'strawberry', qty: 1 }, { id: 'milk', qty: 1 }, { id: 'cream', qty: 1 }], value: 30, xp: 10, flavor: '粉粉的少女心~ ♡(*´∀`*)人(*´∀`*)♡' },
  { id: 'pumpkin_soup', name: '南瓜汤', icon: '🥣', difficulty: 3, ingredients: [{ id: 'pumpkin', qty: 1 }, { id: 'milk', qty: 1 }, { id: 'butter', qty: 1 }], value: 35, xp: 10, flavor: '温暖的秋日味道~ 🍂' },
  { id: 'chocolate_banana', name: '巧克力香蕉', icon: '🍌', difficulty: 3, ingredients: [{ id: 'chocolate', qty: 1 }, { id: 'cream', qty: 1 }], value: 28, xp: 8, flavor: '经典搭配！(≧◡≦)' },
  { id: 'honey_lemon', name: '蜂蜜柠檬茶', icon: '🍋', difficulty: 3, ingredients: [{ id: 'honey', qty: 1 }, { id: 'carrot', qty: 1 }], value: 22, xp: 7, flavor: '清新解渴~ 🌿' },

  // --- 大师料理 ---
  { id: 'watermelon_slush', name: '西瓜冰沙', icon: '🍧', difficulty: 4, ingredients: [{ id: 'watermelon', qty: 1 }, { id: 'cream', qty: 1 }], value: 40, xp: 12, flavor: '夏日必备！(ﾉ´ヮ`)ﾉ*:・ﾟ✧' },
  { id: 'choco_cake', name: '巧克力蛋糕', icon: '🎂', difficulty: 4, ingredients: [{ id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'chocolate', qty: 1 }, { id: 'butter', qty: 1 }], value: 50, xp: 15, flavor: '双层巧克力！甜蜜暴击~ 💝' },
  { id: 'crepe', name: '法式可丽饼', icon: '🥞', difficulty: 4, ingredients: [{ id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'butter', qty: 1 }, { id: 'cream', qty: 1 }], value: 45, xp: 14, flavor: '优雅的法式风味~ ✨' },
  { id: 'tiramisu', name: '提拉米苏', icon: '🍰', difficulty: 4, ingredients: [{ id: 'cream', qty: 1 }, { id: 'chocolate', qty: 1 }, { id: 'egg', qty: 1 }], value: 48, xp: 14, flavor: '意式经典甜品！♡(ŐωŐ人)' },
  { id: 'carrot_cake', name: '胡萝卜蛋糕', icon: '🥕', difficulty: 4, ingredients: [{ id: 'carrot', qty: 2 }, { id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'cream', qty: 1 }], value: 42, xp: 13, flavor: '健康又美味！🥕✨' },
  { id: 'tomato_soup', name: '罗宋汤', icon: '🍅', difficulty: 4, ingredients: [{ id: 'tomato', qty: 2 }, { id: 'butter', qty: 1 }], value: 35, xp: 11, flavor: '浓郁番茄香~ 🍲' },

  // --- 传说料理 ---
  { id: 'rainbow_cake', name: '彩虹蛋糕', icon: '🌈', difficulty: 5, ingredients: [{ id: 'flour', qty: 1 }, { id: 'egg', qty: 1 }, { id: 'cream', qty: 1 }, { id: 'honey', qty: 1 }, { id: 'strawberry', qty: 1 }], value: 80, xp: 25, flavor: '七彩梦幻蛋糕！✧*。٩(ˊᗜˋ*)و✧*。' },
  { id: 'truffle_pasta', name: '松露意面', icon: '🍝', difficulty: 5, ingredients: [{ id: 'flour', qty: 1 }, { id: 'truffle', qty: 1 }, { id: 'butter', qty: 1 }], value: 120, xp: 30, flavor: '米其林级别的享受！(☆▽☆)' },
  { id: 'choco_truffle', name: '松露巧克力', icon: '🍬', difficulty: 5, ingredients: [{ id: 'truffle', qty: 1 }, { id: 'chocolate', qty: 1 }, { id: 'cream', qty: 1 }], value: 150, xp: 35, flavor: '极致奢华巧克力！💎' },
  { id: 'golden_feast', name: '黄金盛宴', icon: '👑', difficulty: 5, ingredients: [{ id: 'golden_apple', qty: 1 }, { id: 'honey', qty: 1 }, { id: 'cream', qty: 1 }, { id: 'truffle', qty: 1 }], value: 300, xp: 50, flavor: '传说中的帝王料理！(ﾉ◕ヮ◕)ﾉ*:・ﾟ👑' },
  { id: 'world_tree_tea', name: '世界树茶', icon: '🌳', difficulty: 5, ingredients: [{ id: 'world_tree_fruit', qty: 1 }, { id: 'honey', qty: 1 }], value: 350, xp: 60, flavor: '蕴含世界之力的神茶！🌍✨' },
  { id: 'cosmic_parfait', name: '宇宙圣代', icon: '🪐', difficulty: 5, ingredients: [{ id: 'cream', qty: 1 }, { id: 'chocolate', qty: 1 }, { id: 'honey', qty: 1 }, { id: 'strawberry', qty: 1 }], value: 90, xp: 28, flavor: '银河般绚丽的甜品！🌌💫' },
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
  { id: 'cook_4', name: '烹饪之神', series: '烹饪之神', icon: '🍳', tier: 3, target: 30, stat: 'uniqueRecipes', desc: '解锁所有菜谱', reward: 500 },
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
  { id: 'dq_feed3', desc: '喂食宠物3次', icon: '🍖', stat: 'timesFeeding', target: 3, coinReward: 15, xpReward: 10, type: 'delta', flavor: '宠物饿了呢~ (´；ω；`)' },
  { id: 'dq_feed5', desc: '喂食宠物5次', icon: '🍔', stat: 'timesFeeding', target: 5, coinReward: 25, xpReward: 15, type: 'delta', flavor: '让Clawd吃个饱！(ﾉ´ヮ`)ﾉ*:・ﾟ✧' },
  { id: 'dq_game1', desc: '玩一局小游戏', icon: '🎮', stat: 'gamesPlayed', target: 1, coinReward: 10, xpReward: 8, type: 'delta', flavor: '来玩耍吧~ ╰(▔∀▔)╯' },
  { id: 'dq_game3', desc: '玩3局小游戏', icon: '🕹️', stat: 'gamesPlayed', target: 3, coinReward: 25, xpReward: 15, type: 'delta', flavor: '游戏达人就是你！(ง •̀_•́)ง' },
  { id: 'dq_harvest2', desc: '收获2个农作物', icon: '🌾', stat: 'totalHarvests', target: 2, coinReward: 20, xpReward: 12, type: 'delta', flavor: '丰收的季节到了~ 🌈' },
  { id: 'dq_harvest5', desc: '收获5个农作物', icon: '🌻', stat: 'totalHarvests', target: 5, coinReward: 35, xpReward: 18, type: 'delta', flavor: '大丰收！(⌐■_■)' },
  { id: 'dq_earn50', desc: '赚取50金币', icon: '💰', stat: 'totalCoinsEarned', target: 50, coinReward: 20, xpReward: 15, type: 'delta', flavor: '钱钱快到碗里来~ (つ✧ω✧)つ' },
  { id: 'dq_earn100', desc: '赚取100金币', icon: '💎', stat: 'totalCoinsEarned', target: 100, coinReward: 35, xpReward: 20, type: 'delta', flavor: '致富之路！₍₍ ◝(°꒳°)◜ ₎₎' },
  { id: 'dq_water5', desc: '浇水5次', icon: '💧', stat: 'timesWatering', target: 5, coinReward: 15, xpReward: 8, type: 'delta', flavor: '植物需要水分哦~ 🌱' },
  { id: 'dq_water10', desc: '浇水10次', icon: '🚿', stat: 'timesWatering', target: 10, coinReward: 25, xpReward: 12, type: 'delta', flavor: '勤劳的小园丁！(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧' },
  { id: 'dq_buy1', desc: '购买1件物品', icon: '🛒', stat: 'itemsBought', target: 1, coinReward: 10, xpReward: 5, type: 'delta', flavor: '买买买~ ╰(*°▽°*)╯' },
  { id: 'dq_buy3', desc: '购买3件物品', icon: '🛍️', stat: 'itemsBought', target: 3, coinReward: 20, xpReward: 10, type: 'delta', flavor: '购物小达人！✧*。٩(ˊᗜˋ*)و✧*。' },
  { id: 'dq_toy1', desc: '使用1个玩具', icon: '🧸', stat: 'timesPlaying', target: 1, coinReward: 10, xpReward: 5, type: 'delta', flavor: '玩具时间到~ ₍ᐢ..ᐢ₎♡' },
  { id: 'dq_fish1', desc: '钓1条鱼', icon: '🎣', stat: 'totalFished', target: 1, coinReward: 15, xpReward: 8, type: 'delta', flavor: '鱼儿快上钩！🐟' },
  { id: 'dq_fish3', desc: '钓3条鱼', icon: '🐠', stat: 'totalFished', target: 3, coinReward: 30, xpReward: 15, type: 'delta', flavor: '钓鱼大师出没！(o゜▽゜)o☆' },
  { id: 'dq_cook1', desc: '做1道菜', icon: '🍳', stat: 'totalCooked', target: 1, coinReward: 15, xpReward: 8, type: 'delta', flavor: '厨房小当家~ 🔥' },
  { id: 'dq_cook3', desc: '做3道菜', icon: '👨‍🍳', stat: 'totalCooked', target: 3, coinReward: 30, xpReward: 15, type: 'delta', flavor: '大厨驾到！ヾ(≧▽≦*)o' },
  { id: 'dq_clean2', desc: '给宠物洗澡2次', icon: '🧼', stat: 'timesCleaning', target: 2, coinReward: 12, xpReward: 6, type: 'delta', flavor: '干干净净最舒服~ 🫧' },
  { id: 'dq_plant3', desc: '种植3株作物', icon: '🌱', stat: 'totalPlanted', target: 3, coinReward: 18, xpReward: 10, type: 'delta', flavor: '播下希望的种子！🌷' },
  { id: 'dq_win2', desc: '赢得2场游戏', icon: '🏆', stat: 'gamesWon', target: 2, coinReward: 25, xpReward: 12, type: 'delta', flavor: '胜利属于你！(ﾉ>ω<)ﾉ' },
  { id: 'dq_battle1', desc: '进行1场对战', icon: '⚔️', stat: 'battlesStarted', target: 1, coinReward: 20, xpReward: 10, type: 'delta', flavor: '勇士出发！🛡️' },
  { id: 'dq_spin1', desc: '转动幸运转盘', icon: '🎡', stat: 'wheelSpins', target: 1, coinReward: 10, xpReward: 5, type: 'delta', flavor: '今天运气好吗？(☆▽☆)' },
];

const WEEKLY_QUEST_POOL = [
  { id: 'wq_earn500', desc: '累计赚取500金币', icon: '💰', stat: 'totalCoinsEarned', target: 500, coinReward: 120, xpReward: 60, type: 'delta', flavor: '本周财富目标！(つ✧ω✧)つ💎' },
  { id: 'wq_earn1000', desc: '累计赚取1000金币', icon: '🏦', stat: 'totalCoinsEarned', target: 1000, coinReward: 200, xpReward: 80, type: 'delta', flavor: '超级理财王！₍₍ (ง ˙ω˙)ว ⁾⁾' },
  { id: 'wq_win5', desc: '赢得5场小游戏', icon: '🏆', stat: 'gamesWon', target: 5, coinReward: 80, xpReward: 40, type: 'delta', flavor: '不败神话！(ง •̀_•́)ง✧' },
  { id: 'wq_win10', desc: '赢得10场小游戏', icon: '👑', stat: 'gamesWon', target: 10, coinReward: 150, xpReward: 60, type: 'delta', flavor: '传说中的冠军！✧*。٩(ˊᗜˋ*)و✧*。' },
  { id: 'wq_harvest10', desc: '收获10个农作物', icon: '🌾', stat: 'totalHarvests', target: 10, coinReward: 60, xpReward: 35, type: 'delta', flavor: '金色的麦田~ 🌅' },
  { id: 'wq_harvest25', desc: '收获25个农作物', icon: '🌈', stat: 'totalHarvests', target: 25, coinReward: 120, xpReward: 50, type: 'delta', flavor: '农业大亨！( •̀ ω •́ )✧' },
  { id: 'wq_dailyall', desc: '完成所有每日任务', icon: '⭐', stat: 'dailyQuestsCompleted', target: 3, coinReward: 100, xpReward: 50, type: 'delta', flavor: '勤劳的小蜜蜂~ 🐝' },
  { id: 'wq_levelup', desc: '提升1个等级', icon: '📈', stat: 'levelsGained', target: 1, coinReward: 50, xpReward: 30, type: 'delta', flavor: '越来越强了！ᕦ(ò_óˇ)ᕤ' },
  { id: 'wq_levelup3', desc: '提升3个等级', icon: '🚀', stat: 'levelsGained', target: 3, coinReward: 150, xpReward: 80, type: 'delta', flavor: '火箭般的成长！🔥' },
  { id: 'wq_feed20', desc: '喂食宠物20次', icon: '🍖', stat: 'timesFeeding', target: 20, coinReward: 80, xpReward: 40, type: 'delta', flavor: 'Clawd的小吃货！(ﾉ´ヮ`)ﾉ*:・ﾟ🍕' },
  { id: 'wq_fish15', desc: '钓15条鱼', icon: '🐟', stat: 'totalFished', target: 15, coinReward: 100, xpReward: 50, type: 'delta', flavor: '海的王者！🌊' },
  { id: 'wq_cook10', desc: '做10道菜', icon: '👨‍🍳', stat: 'totalCooked', target: 10, coinReward: 90, xpReward: 45, type: 'delta', flavor: '周末大厨！ヾ(≧▽≦*)o🔥' },
  { id: 'wq_buy10', desc: '购买10件物品', icon: '🛍️', stat: 'itemsBought', target: 10, coinReward: 70, xpReward: 35, type: 'delta', flavor: '剁手星期~ ✨' },
  { id: 'wq_battle5', desc: '进行5场对战', icon: '⚔️', stat: 'battlesStarted', target: 5, coinReward: 100, xpReward: 50, type: 'delta', flavor: '战斗不止！(ノ◕ヮ◕)ノ*:・ﾟ✧' },
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
      battlesStarted: 0,
      wheelSpins: 0,
      totalActions: 0,
      level: 1,
    },
    unlockedAchievements: [],
    cookedRecipes: [],
    quests: { daily: [], weekly: [], lastDailyRefresh: 0, lastWeeklyRefresh: 0 },
    wheel: { lastFreeSpin: 0 },
    fishing: { rodLevel: 0 },
    battle: {
      petHP: 100,
      petMaxHP: 100,
      petAttack: 10,
      petDefense: 5,
      petSpeed: 8,
      skills: [
        { id: 'scratch', name: '抓击', icon: '🐾', damage: 15, type: 'normal', cooldown: 0, maxCooldown: 0, desc: '基础物理攻击' },
        { id: 'bite', name: '撕咬', icon: '🦷', damage: 22, type: 'normal', cooldown: 0, maxCooldown: 1, desc: '用力咬一口' },
      ],
      stolenSkills: [],
      battleWins: 0,
      battleLosses: 0,
      currentOpponent: null,
      battleLog: [],
      inBattle: false,
    },
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
  // CRITICAL: Bind tabs FIRST before anything else can throw
  bindTabs();
  bindTitleBar();

  try {
    if (window.electronAPI && window.electronAPI.getGameState) {
      const saved = await window.electronAPI.getGameState();
      if (saved && saved.stats) {
        gameState = mergeState(saved);
      }
    }
  } catch (e) {
    console.error('无法加载存档，使用默认状态', e);
  }

  try {
    catchUpTime();
  } catch (e) {
    console.error('catchUpTime error:', e);
  }

  try {
    refreshQuests();
  } catch (e) {
    console.error('refreshQuests error:', e);
  }

  bindStatusActions();
  bindQuestTabs();

  try {
    renderAll();
  } catch (e) {
    console.error('renderAll error:', e);
  }

  statusIntervalId = setInterval(tickStatus, 1000);
  gardenIntervalId = setInterval(tickGarden, 1000);
  autoSaveIntervalId = setInterval(saveGame, 30000);
  minuteTrackerId = setInterval(() => {
    gameState.trackers.minutesPlayed++;
  }, 60000);

  if (window.electronAPI && window.electronAPI.onGameStateUpdate) {
    window.electronAPI.onGameStateUpdate((data) => {
      if (data && data.stats) {
        try {
          gameState = mergeState(data);
          renderAll();
        } catch (e) {
          console.error('state update error:', e);
        }
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
    battle: { ...(def.battle || {}), ...(saved.battle || {}), skills: saved.battle?.skills || def.battle.skills, stolenSkills: saved.battle?.stolenSkills || [] },
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
        case 'battle': renderBattle(); break;
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
  const statEmojis = {
    hunger: { high: '😋', mid: '😐', low: '😰', crit: '💀' },
    happiness: { high: '😄', mid: '😐', low: '😰', crit: '💀' },
    energy: { high: '⚡', mid: '😐', low: '😰', crit: '💀' },
    cleanliness: { high: '✨', mid: '😐', low: '😰', crit: '💀' },
    health: { high: '💗', mid: '😐', low: '😰', crit: '💀' },
  };

  for (const stat of stats) {
    const val = Math.round(gameState.stats[stat]);
    const valEl = document.getElementById(stat + '-val');
    const barEl = document.getElementById(stat + '-bar');

    const emoji = val > 60 ? statEmojis[stat].high : val > 30 ? statEmojis[stat].mid : val < 10 ? statEmojis[stat].crit : statEmojis[stat].low;

    if (valEl) valEl.textContent = `${emoji} ${val}/100`;
    if (barEl) {
      barEl.style.width = val + '%';
      const cls = getBarClass(val);
      barEl.className = 'stat-bar-fill ' + cls;
      // Apply gradient colors based on value
      if (val >= 60) {
        barEl.style.background = 'linear-gradient(90deg, #51cf66, #40c057)';
      } else if (val >= 30) {
        barEl.style.background = 'linear-gradient(90deg, #fcc419, #fab005)';
      } else if (val >= 15) {
        barEl.style.background = 'linear-gradient(90deg, #ff922b, #fd7e14)';
      } else {
        barEl.style.background = 'linear-gradient(90deg, #ff6b6b, #fa5252)';
      }
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
    case 'heal': {
      const medQty = getInventoryQty('medicine');
      if (medQty > 0) {
        removeFromInventory('medicine', 1);
        s.health = Math.min(100, s.health + 30);
        showToast('使用药品治疗了 Clawd！', 'success');
      } else {
        s.health = Math.min(100, s.health + 10);
        showToast('简单治疗了一下，买药品效果更好！', 'info');
      }
      triggerPetAnimation('emotion-love');
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
    selectedInventoryItem = null;
    return;
  }

  for (const invItem of items) {
    const def = findItemDef(invItem.itemId);
    const icon = def ? def.icon : '📦';
    const name = def ? def.name : invItem.itemId;
    const isSelected = selectedInventoryItem === invItem.itemId;

    const card = document.createElement('div');
    card.className = 'inv-card' + (isSelected ? ' selected' : '');
    card.innerHTML = `
      <div class="inv-card-icon">${icon}</div>
      <div class="inv-card-qty">x${invItem.quantity}</div>
      <div class="inv-card-name">${name}</div>
    `;

    card.addEventListener('click', () => selectInventoryItem(invItem.itemId));
    grid.appendChild(card);
  }

  // Fill empty slots
  const totalSlots = Math.max(16, items.length + (4 - (items.length % 4)));
  for (let i = items.length; i < totalSlots; i++) {
    const slot = document.createElement('div');
    slot.className = 'inv-card empty';
    slot.innerHTML = '<div class="inv-card-icon" style="opacity:0.15">-</div>';
    grid.appendChild(slot);
  }

  // Detail panel for selected item
  if (selectedInventoryItem) {
    const invItem = items.find(i => i.itemId === selectedInventoryItem);
    if (invItem) {
      const def = findItemDef(invItem.itemId);
      const icon = def ? def.icon : '📦';
      const name = def ? def.name : invItem.itemId;
      const type = def ? def.type : '其他';
      const desc = def ? def.desc : '';
      const effectStr = def && def.effect ? formatEffect(def.effect) : '';

      const detailPanel = document.createElement('div');
      detailPanel.className = 'inv-detail-panel';
      detailPanel.innerHTML = `
        <div class="inv-detail-header">
          <span class="inv-detail-icon">${icon}</span>
          <div class="inv-detail-info">
            <div class="inv-detail-name">${name}</div>
            <div class="inv-detail-type">${getTypeName(type)} | 数量: ${invItem.quantity}</div>
          </div>
        </div>
        ${desc ? '<div class="inv-detail-desc">' + desc + '</div>' : ''}
        ${effectStr ? '<div class="inv-detail-effect">' + effectStr + '</div>' : ''}
        <div class="inv-detail-actions">
          <button class="inv-action-btn use-btn" id="inv-use-btn">使用</button>
          <button class="inv-action-btn sell-btn" id="inv-sell-btn">出售</button>
          <button class="inv-action-btn discard-btn" id="inv-discard-btn">丢弃</button>
        </div>
      `;
      grid.appendChild(detailPanel);

      // Bind detail actions
      const useBtn = detailPanel.querySelector('#inv-use-btn');
      const sellBtn = detailPanel.querySelector('#inv-sell-btn');
      const discardBtn = detailPanel.querySelector('#inv-discard-btn');

      useBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (def) handleUseItem(def, invItem);
        selectedInventoryItem = null;
        renderInventory();
      });

      sellBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (def && invItem.quantity > 0) {
          const sellPrice = Math.max(1, Math.floor((def.price || 5) / 2));
          removeFromInventory(invItem.itemId, 1);
          addCoins(sellPrice);
          showToast(`卖出了 ${icon} ${name}，获得 ${sellPrice} 金币！`, 'success');
          selectedInventoryItem = null;
          renderInventory();
          saveGame();
        }
      });

      discardBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (invItem.quantity > 0) {
          removeFromInventory(invItem.itemId, 1);
          showToast(`丢弃了 ${icon} ${name}！`, 'info');
          selectedInventoryItem = null;
          renderInventory();
          saveGame();
        }
      });
    }
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
    { key: 'rare', label: '💎 稀有' },
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

  const effectEmojis = { hunger: '🍔', happiness: '😊', energy: '⚡', cleanliness: '🫧', health: '💗' };
  const effectNames = { hunger: '饱食度', happiness: '心情', energy: '精力', cleanliness: '清洁度', health: '健康' };

  for (const item of items) {
    const canAfford = gameState.coins >= item.price;
    const owned = getInventoryQty(item.id);
    const card = document.createElement('div');
    card.className = 'shop-card' + (canAfford ? '' : ' cant-afford');

    let effectHtml = '';
    if (item.effect) {
      const parts = [];
      for (const [key, val] of Object.entries(item.effect)) {
        const sign = val > 0 ? '+' : '';
        const emoji = effectEmojis[key] || '';
        const label = effectNames[key] || key;
        parts.push(`${sign}${val} ${label} ${emoji}`);
      }
      effectHtml = parts.join(' | ');
    } else if (item.type === 'seed') {
      effectHtml = `收获价值 🪙${item.harvestValue} | ${item.harvestIcon} ${item.harvestName}`;
    } else {
      effectHtml = item.desc;
    }

    card.innerHTML = `
      <div class="shop-card-icon">${item.icon}</div>
      <div class="shop-card-name">${item.name}</div>
      <div class="shop-card-desc">${item.desc} ✨</div>
      <div class="shop-card-effect">${effectHtml}</div>
      <div class="shop-card-footer">
        <span class="shop-card-price">🪙 ${item.price}</span>
        <button class="shop-buy-btn" ${canAfford ? '' : 'disabled'}>购买</button>
      </div>
      ${owned > 0 ? '<span class="shop-card-owned">已拥有: ' + owned + '</span>' : ''}
    `;

    card.addEventListener('click', () => buyShopItem(item.id));
    const buyBtn = card.querySelector('.shop-buy-btn');
    buyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      buyShopItem(item.id);
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

function buyShopItem(itemId) {
  const item = findItemDef(itemId);
  if (!item) return;
  if (gameState.coins < item.price) {
    showToast('金币不足！😢', 'error');
    return;
  }
  gameState.coins -= item.price;
  addToInventory(itemId, 1);
  gameState.trackers.itemsBought++;
  gameState.trackers.totalSpent += item.price;
  showToast(`购买了 ${item.icon} ${item.name}！`, 'success');
  addXp(2);
  triggerPetAnimation('game-shop');
  updateQuestProgress();
  checkAchievements();
  renderShop();
  renderInventory();
  renderTopBar();
  saveGame();
}

let selectedInventoryItem = null;

function selectInventoryItem(itemId) {
  selectedInventoryItem = (selectedInventoryItem === itemId) ? null : itemId;
  renderInventory();
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
let activeQuestTab = 'daily';

function refreshQuests() {
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayMs = todayStart.getTime();

  if (!gameState.quests) {
    gameState.quests = { daily: [], weekly: [], lastDailyRefresh: 0, lastWeeklyRefresh: 0 };
  }

  if (!gameState.quests.lastDailyRefresh || gameState.quests.lastDailyRefresh < todayMs || !gameState.quests.daily || gameState.quests.daily.length === 0) {
    gameState.quests.daily = generateDailyQuests();
    gameState.quests.lastDailyRefresh = now;
    gameState.quests.dailySnapshot = { ...gameState.trackers };
  }

  const weekMs = 7 * 24 * 60 * 60 * 1000;
  if (!gameState.quests.lastWeeklyRefresh || now - gameState.quests.lastWeeklyRefresh > weekMs || !gameState.quests.weekly || gameState.quests.weekly.length === 0) {
    gameState.quests.weekly = generateWeeklyQuests();
    gameState.quests.lastWeeklyRefresh = now;
    gameState.quests.weeklySnapshot = { ...gameState.trackers };
  }
}

function generateDailyQuests() {
  const shuffled = [...DAILY_QUEST_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5).map((q) => ({ ...q, completed: false }));
}

function generateWeeklyQuests() {
  const shuffled = [...WEEKLY_QUEST_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4).map((q) => ({ ...q, completed: false }));
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

  refreshQuests();

  const quests = activeQuestTab === 'daily' ? (gameState.quests.daily || []) : (gameState.quests.weekly || []);
  const snap = activeQuestTab === 'daily' ? (gameState.quests.dailySnapshot || {}) : (gameState.quests.weeklySnapshot || {});
  const isDaily = activeQuestTab === 'daily';

  const completedCount = quests.filter(q => q.completed).length;
  const totalCount = quests.length;

  const tabBtns = document.querySelectorAll('.quest-tab-btn');
  tabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.questType === activeQuestTab);
  });

  let html = '';

  html += `<div class="quest-summary-bar">
    <div class="quest-summary-left">
      <span class="quest-summary-icon">${isDaily ? '☀️' : '📅'}</span>
      <span class="quest-summary-text">${isDaily ? '每日任务' : '每周任务'}</span>
    </div>
    <div class="quest-summary-right">
      <span class="quest-summary-count">${completedCount} / ${totalCount} 已完成</span>
      <div class="quest-summary-progress">
        <div class="quest-summary-progress-fill" style="width:${totalCount > 0 ? (completedCount / totalCount * 100) : 0}%"></div>
      </div>
    </div>
  </div>`;

  if (quests.length === 0) {
    html += `<div class="quest-empty">
      <div class="quest-empty-icon">📋</div>
      <div class="quest-empty-text">暂无任务，请稍后再来~ (´・ω・\`)</div>
    </div>`;
  }

  for (const quest of quests) {
    const current = gameState.trackers[quest.stat] || 0;
    const baseline = snap[quest.stat] || 0;
    const delta = Math.max(0, current - baseline);
    const progress = Math.min(1, delta / quest.target);
    const pctVal = Math.round(progress * 100);

    html += `<div class="quest-card ${quest.completed ? 'completed' : ''} ${pctVal >= 100 && !quest.completed ? 'ready-claim' : ''}">
      <div class="quest-card-icon-wrap">
        <span class="quest-card-icon">${quest.icon || '📌'}</span>
        ${quest.completed ? '<span class="quest-check">✅</span>' : ''}
      </div>
      <div class="quest-card-body">
        <div class="quest-card-title">${quest.desc}</div>
        <div class="quest-card-flavor">${quest.flavor || ''}</div>
        <div class="quest-progress-bar">
          <div class="quest-progress-fill ${quest.completed ? 'done' : ''}" style="width:${quest.completed ? 100 : pctVal}%"></div>
        </div>
        <div class="quest-card-footer">
          <span class="quest-progress-label">${quest.completed ? '已完成!' : `${delta} / ${quest.target}`}</span>
          <span class="quest-card-reward">🪙 ${quest.coinReward} &nbsp; ✨ ${quest.xpReward}xp</span>
        </div>
      </div>
    </div>`;
  }

  if (completedCount === totalCount && totalCount > 0) {
    html += `<div class="quest-all-done">
      <span>🎉</span> 全部完成！太厉害了~ ヾ(≧▽≦*)o <span>🎉</span>
    </div>`;
  }

  container.innerHTML = html;
}

function bindQuestTabs() {
  document.querySelectorAll('.quest-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeQuestTab = btn.dataset.questType || 'daily';
      renderQuests();
    });
  });
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

  gameState.trackers.wheelSpins = (gameState.trackers.wheelSpins || 0) + 1;

  setTimeout(() => {
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
const DIFFICULTY_INFO = [
  null,
  { name: '入门', icon: '⭐', color: '#8b949e' },
  { name: '简单', icon: '⭐⭐', color: '#58a6ff' },
  { name: '中级', icon: '⭐⭐⭐', color: '#3fb950' },
  { name: '大师', icon: '⭐⭐⭐⭐', color: '#d29922' },
  { name: '传说', icon: '⭐⭐⭐⭐⭐', color: '#f85149' },
];

function renderCooking() {
  const cookingArea = document.getElementById('cooking-area');
  if (!cookingArea) return;

  const totalRecipes = RECIPES.length;
  const cookedCount = gameState.cookedRecipes.length;

  let html = '';

  html += `<div class="cooking-header-bar">
    <div class="cooking-header-left">
      <span class="cooking-header-icon">👨‍🍳</span>
      <span class="cooking-header-title">Clawd の 美食厨房</span>
    </div>
    <div class="cooking-header-right">
      <span class="cooking-header-stat">📖 已解锁 ${cookedCount}/${totalRecipes} 道菜</span>
    </div>
  </div>`;

  html += `<div class="cooking-progress-wrap">
    <div class="cooking-progress-bar">
      <div class="cooking-progress-fill" style="width:${totalRecipes > 0 ? (cookedCount / totalRecipes * 100) : 0}%"></div>
    </div>
    <div class="cooking-progress-label">${cookedCount === totalRecipes ? '🎉 全部解锁！你是料理之神！ヾ(≧▽≦*)o' : `还差 ${totalRecipes - cookedCount} 道菜解锁全图鉴~ (ง •̀_•́)ง`}</div>
  </div>`;

  const grouped = {};
  for (const recipe of RECIPES) {
    const d = recipe.difficulty || 1;
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(recipe);
  }

  for (const [diff, recipes] of Object.entries(grouped)) {
    const info = DIFFICULTY_INFO[diff] || DIFFICULTY_INFO[1];
    html += `<div class="cooking-diff-section">
      <div class="cooking-diff-header" style="border-left:3px solid ${info.color}">
        <span class="cooking-diff-stars">${info.icon}</span>
        <span class="cooking-diff-name" style="color:${info.color}">${info.name}料理</span>
        <span class="cooking-diff-count">(${recipes.length}道)</span>
      </div>
      <div class="cooking-grid">`;

    for (const recipe of recipes) {
      const hasAll = recipe.ingredients.every((ing) => getInventoryQty(ing.id) >= ing.qty);
      const cooked = gameState.cookedRecipes.includes(recipe.id);

      html += `<div class="recipe-card ${hasAll ? 'can-cook' : ''} ${cooked ? 'cooked-before' : ''}" data-recipe-id="${recipe.id}">
        <div class="recipe-card-top">
          <span class="recipe-card-icon">${recipe.icon}</span>
          ${cooked ? '<span class="recipe-cooked-badge">✅ 已解锁</span>' : ''}
        </div>
        <div class="recipe-card-name">${recipe.name}</div>
        <div class="recipe-card-flavor">${recipe.flavor || ''}</div>
        <div class="recipe-card-ings">
          ${recipe.ingredients.map((ing) => {
            const def = findItemDef(ing.id);
            const have = getInventoryQty(ing.id);
            const enough = have >= ing.qty;
            const icon = def ? def.icon : '📦';
            const name = def ? def.name : ing.id;
            return `<span class="recipe-ing-tag ${enough ? 'have' : 'missing'}">${icon} ${name} <span class="ing-qty">${have}/${ing.qty}</span></span>`;
          }).join('')}
        </div>
        <div class="recipe-card-bottom">
          <span class="recipe-card-value">🪙 ${recipe.value}</span>
          <span class="recipe-card-xp">✨ ${recipe.xp}xp</span>
        </div>
        <button class="recipe-cook-btn ${hasAll ? '' : 'disabled'}" ${hasAll ? '' : 'disabled'} data-recipe-id="${recipe.id}">
          ${hasAll ? '🔥 开始烹饪！' : '🔒 食材不足'}
        </button>
      </div>`;
    }

    html += `</div></div>`;
  }

  cookingArea.innerHTML = html;

  cookingArea.querySelectorAll('.recipe-cook-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const recipe = RECIPES.find(r => r.id === btn.dataset.recipeId);
      if (recipe) cookRecipe(recipe);
    });
  });
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
    fish: '鱼类', rare: '稀有',
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

// ============================================================
// 对战系统 (赛尔号风格)
// ============================================================
const NPC_OPPONENTS = [
  {
    id: 'slime', name: '史莱姆', icon: '🟢', level: 1,
    hp: 60, attack: 6, defense: 3, speed: 5,
    skills: [
      { id: 'bounce', name: '弹跳', icon: '🔵', damage: 10, type: 'normal', desc: '弹跳攻击' },
      { id: 'sticky', name: '黏液', icon: '💧', damage: 8, type: 'water', desc: '黏糊糊的攻击' },
    ],
    reward: { coins: 15, xp: 10 },
    stealChance: 0.25,
  },
  {
    id: 'fire_fox', name: '火焰狐', icon: '🦊', level: 3,
    hp: 80, attack: 12, defense: 5, speed: 10,
    skills: [
      { id: 'ember', name: '火花', icon: '🔥', damage: 18, type: 'fire', desc: '喷射小火焰' },
      { id: 'flame_tail', name: '烈焰尾击', icon: '🌋', damage: 25, type: 'fire', desc: '用燃烧的尾巴攻击', maxCooldown: 2 },
      { id: 'fox_agility', name: '灵动', icon: '💨', damage: 0, type: 'buff', desc: '提升速度', buff: { speed: 5 } },
    ],
    reward: { coins: 25, xp: 18 },
    stealChance: 0.20,
  },
  {
    id: 'ice_bear', name: '冰霜熊', icon: '🐻‍❄️', level: 5,
    hp: 120, attack: 14, defense: 10, speed: 4,
    skills: [
      { id: 'ice_claw', name: '冰爪', icon: '🧊', damage: 20, type: 'ice', desc: '冰冻利爪攻击' },
      { id: 'frost_breath', name: '寒冰吐息', icon: '❄️', damage: 28, type: 'ice', desc: '吐出冰霜', maxCooldown: 2 },
      { id: 'bear_guard', name: '熊之守护', icon: '🛡️', damage: 0, type: 'buff', desc: '提升防御', buff: { defense: 8 } },
    ],
    reward: { coins: 40, xp: 30 },
    stealChance: 0.15,
  },
  {
    id: 'thunder_hawk', name: '雷电鹰', icon: '🦅', level: 8,
    hp: 100, attack: 18, defense: 7, speed: 15,
    skills: [
      { id: 'thunder_strike', name: '雷击', icon: '⚡', damage: 24, type: 'electric', desc: '从空中发动雷击' },
      { id: 'wind_blade', name: '风刃', icon: '🌀', damage: 20, type: 'wind', desc: '锋利的风之刃' },
      { id: 'dive_bomb', name: '俯冲轰炸', icon: '💥', damage: 35, type: 'normal', desc: '高速俯冲攻击', maxCooldown: 3 },
    ],
    reward: { coins: 60, xp: 45 },
    stealChance: 0.12,
  },
  {
    id: 'shadow_wolf', name: '暗影狼', icon: '🐺', level: 10,
    hp: 110, attack: 20, defense: 8, speed: 12,
    skills: [
      { id: 'shadow_bite', name: '暗影撕咬', icon: '🌑', damage: 26, type: 'dark', desc: '暗影之力附身攻击' },
      { id: 'howl', name: '嚎叫', icon: '🌙', damage: 0, type: 'buff', desc: '提升攻击力', buff: { attack: 6 } },
      { id: 'pack_hunt', name: '群狼围猎', icon: '🐺', damage: 40, type: 'dark', desc: '召唤同伴一起攻击', maxCooldown: 3 },
    ],
    reward: { coins: 80, xp: 60 },
    stealChance: 0.10,
  },
  {
    id: 'crystal_dragon', name: '水晶龙', icon: '🐉', level: 15,
    hp: 180, attack: 25, defense: 15, speed: 10,
    skills: [
      { id: 'crystal_breath', name: '水晶吐息', icon: '💎', damage: 32, type: 'crystal', desc: '吐出水晶碎片' },
      { id: 'dragon_claw', name: '龙爪', icon: '🐲', damage: 28, type: 'normal', desc: '强力龙爪攻击' },
      { id: 'crystal_shield', name: '水晶护盾', icon: '🔮', damage: 0, type: 'buff', desc: '大幅提升防御', buff: { defense: 12 } },
      { id: 'dragon_rage', name: '龙之怒', icon: '🔥', damage: 50, type: 'fire', desc: '愤怒的龙息', maxCooldown: 4 },
    ],
    reward: { coins: 120, xp: 90 },
    stealChance: 0.08,
  },
  {
    id: 'phoenix', name: '不死鸟', icon: '🔥', level: 20,
    hp: 200, attack: 30, defense: 12, speed: 14,
    skills: [
      { id: 'phoenix_fire', name: '凤凰之火', icon: '🔥', damage: 35, type: 'fire', desc: '神圣火焰攻击' },
      { id: 'rebirth_flame', name: '重生之焰', icon: '✨', damage: 0, type: 'heal', desc: '恢复30%HP', healPercent: 30 },
      { id: 'sun_blast', name: '烈日爆破', icon: '☀️', damage: 45, type: 'fire', desc: '太阳能量爆发', maxCooldown: 3 },
      { id: 'phoenix_wing', name: '凤翼天翔', icon: '🦅', damage: 55, type: 'wind', desc: '展翅攻击', maxCooldown: 4 },
    ],
    reward: { coins: 200, xp: 150 },
    stealChance: 0.05,
  },
  {
    id: 'void_king', name: '虚空之王', icon: '👾', level: 30,
    hp: 300, attack: 35, defense: 20, speed: 12,
    skills: [
      { id: 'void_blast', name: '虚空冲击', icon: '🌀', damage: 40, type: 'dark', desc: '虚空能量冲击' },
      { id: 'dimension_rift', name: '次元裂缝', icon: '🕳️', damage: 55, type: 'dark', desc: '撕裂空间', maxCooldown: 3 },
      { id: 'void_shield', name: '虚空屏障', icon: '🛡️', damage: 0, type: 'buff', desc: '虚空护盾', buff: { defense: 15 } },
      { id: 'annihilation', name: '湮灭', icon: '💀', damage: 70, type: 'dark', desc: '终极毁灭攻击', maxCooldown: 5 },
    ],
    reward: { coins: 500, xp: 300 },
    stealChance: 0.03,
  },
  // --- 20+ additional opponents ---
  {
    id: 'poison_mushroom', name: '毒蘑菇', icon: '🍄', level: 2,
    hp: 55, attack: 7, defense: 4, speed: 3,
    skills: [
      { id: 'spore_burst', name: '孢子爆破', icon: '🍄', damage: 12, type: 'poison', desc: '释放毒孢子' },
      { id: 'toxic_cloud', name: '毒雾', icon: '☠️', damage: 8, type: 'poison', desc: '弥漫的毒气', hits: 2 },
      { id: 'regen_cap', name: '再生菌盖', icon: '🌿', damage: 0, type: 'heal', desc: '恢复20%HP', healPercent: 20 },
    ],
    reward: { coins: 12, xp: 8 },
    stealChance: 0.28,
  },
  {
    id: 'rock_spirit', name: '石头精灵', icon: '🪨', level: 4,
    hp: 100, attack: 10, defense: 12, speed: 3,
    skills: [
      { id: 'rock_throw', name: '投石', icon: '🪨', damage: 16, type: 'earth', desc: '扔出巨石' },
      { id: 'earthquake', name: '地震波', icon: '🌍', damage: 22, type: 'earth', desc: '大地的震动', maxCooldown: 2 },
      { id: 'stone_skin', name: '石化皮肤', icon: '🛡️', damage: 0, type: 'buff', desc: '防御大幅提升', buff: { defense: 10 } },
    ],
    reward: { coins: 20, xp: 15 },
    stealChance: 0.22,
  },
  {
    id: 'ocean_jellyfish', name: '海洋水母', icon: '🪼', level: 6,
    hp: 75, attack: 15, defense: 5, speed: 7,
    skills: [
      { id: 'tentacle_shock', name: '触手电击', icon: '⚡', damage: 20, type: 'electric', desc: '带电的触手攻击' },
      { id: 'water_pulse', name: '水之脉动', icon: '🌊', damage: 16, type: 'water', desc: '海水冲击' },
      { id: 'paralyze_sting', name: '麻痹之刺', icon: '💉', damage: 14, type: 'electric', desc: '使对手麻痹的毒刺' },
      { id: 'deep_sea_heal', name: '深海回复', icon: '💧', damage: 0, type: 'heal', desc: '恢复25%HP', healPercent: 25 },
    ],
    reward: { coins: 35, xp: 25 },
    stealChance: 0.18,
  },
  {
    id: 'flower_fairy', name: '花仙子', icon: '🧚', level: 7,
    hp: 85, attack: 11, defense: 6, speed: 11,
    skills: [
      { id: 'petal_dance', name: '花瓣飞舞', icon: '🌸', damage: 18, type: 'nature', desc: '漫天花瓣攻击' },
      { id: 'vine_whip', name: '藤鞭', icon: '🌿', damage: 15, type: 'nature', desc: '藤蔓抽打' },
      { id: 'fairy_heal', name: '仙子祝福', icon: '✨', damage: 0, type: 'heal', desc: '恢复30%HP', healPercent: 30 },
      { id: 'pollen_sleep', name: '催眠花粉', icon: '💤', damage: 10, type: 'nature', desc: '催眠花粉攻击' },
    ],
    reward: { coins: 45, xp: 32 },
    stealChance: 0.16,
  },
  {
    id: 'iron_knight', name: '钢铁骑士', icon: '🤖', level: 9,
    hp: 140, attack: 16, defense: 18, speed: 5,
    skills: [
      { id: 'steel_slash', name: '钢铁斩', icon: '⚔️', damage: 22, type: 'metal', desc: '钢剑劈砍' },
      { id: 'shield_bash', name: '盾击', icon: '🛡️', damage: 18, type: 'metal', desc: '用盾牌猛击' },
      { id: 'iron_fortress', name: '铁壁', icon: '🏰', damage: 0, type: 'buff', desc: '防御力大幅提升', buff: { defense: 12 } },
      { id: 'holy_strike', name: '圣光斩', icon: '✨', damage: 30, type: 'holy', desc: '注入圣光的一击', maxCooldown: 2 },
    ],
    reward: { coins: 55, xp: 40 },
    stealChance: 0.13,
  },
  {
    id: 'desert_scorpion', name: '沙漠蝎王', icon: '🦂', level: 11,
    hp: 130, attack: 22, defense: 14, speed: 9,
    skills: [
      { id: 'scorpion_sting', name: '毒尾刺', icon: '🦂', damage: 28, type: 'poison', desc: '剧毒的尾刺攻击' },
      { id: 'sand_storm', name: '沙尘暴', icon: '🏜️', damage: 22, type: 'earth', desc: '卷起沙尘暴' },
      { id: 'burrow_strike', name: '潜地突袭', icon: '🕳️', damage: 32, type: 'earth', desc: '从地下突然袭击', maxCooldown: 2 },
      { id: 'venom_boost', name: '毒液强化', icon: '☠️', damage: 0, type: 'buff', desc: '攻击力提升', buff: { attack: 8 } },
    ],
    reward: { coins: 70, xp: 52 },
    stealChance: 0.11,
  },
  {
    id: 'ghost_mage', name: '幽灵法师', icon: '👻', level: 12,
    hp: 95, attack: 24, defense: 8, speed: 13,
    skills: [
      { id: 'soul_bolt', name: '灵魂弹', icon: '👻', damage: 26, type: 'dark', desc: '灵魂能量射击' },
      { id: 'phantom_curse', name: '幽灵诅咒', icon: '🌑', damage: 20, type: 'dark', desc: '降低对手防御', hits: 2 },
      { id: 'spirit_drain', name: '灵魂吸取', icon: '💜', damage: 18, type: 'dark', desc: '吸取生命值', healPercent: 15, type: 'heal' },
      { id: 'ghost_vanish', name: '幽灵消隐', icon: '💨', damage: 0, type: 'buff', desc: '提升速度和闪避', buff: { speed: 8 } },
    ],
    reward: { coins: 75, xp: 55 },
    stealChance: 0.10,
  },
  {
    id: 'lava_behemoth', name: '熔岩巨兽', icon: '🌋', level: 14,
    hp: 200, attack: 26, defense: 16, speed: 4,
    skills: [
      { id: 'lava_slam', name: '熔岩重击', icon: '🌋', damage: 30, type: 'fire', desc: '熔岩巨拳砸地' },
      { id: 'eruption', name: '火山喷发', icon: '🔥', damage: 42, type: 'fire', desc: '猛烈喷发', maxCooldown: 3 },
      { id: 'magma_armor', name: '岩浆护甲', icon: '🛡️', damage: 0, type: 'buff', desc: '防御和攻击提升', buff: { defense: 8, attack: 5 } },
      { id: 'molten_wave', name: '熔流冲击', icon: '🌊', damage: 35, type: 'fire', desc: '熔岩波浪席卷', maxCooldown: 2 },
    ],
    reward: { coins: 100, xp: 75 },
    stealChance: 0.09,
  },
  {
    id: 'aurora_spirit', name: '极光精灵', icon: '🌌', level: 16,
    hp: 120, attack: 28, defense: 10, speed: 16,
    skills: [
      { id: 'aurora_beam', name: '极光射线', icon: '🌈', damage: 32, type: 'light', desc: '七彩极光攻击' },
      { id: 'prismatic_flash', name: '棱光闪耀', icon: '💎', damage: 28, type: 'light', desc: '耀眼光芒攻击' },
      { id: 'starlight_barrier', name: '星光屏障', icon: '✨', damage: 0, type: 'buff', desc: '防御和速度提升', buff: { defense: 6, speed: 6 } },
      { id: 'northern_lights', name: '北极光爆发', icon: '🌌', damage: 48, type: 'light', desc: '极光汇聚的终极一击', maxCooldown: 3 },
    ],
    reward: { coins: 130, xp: 95 },
    stealChance: 0.08,
  },
  {
    id: 'time_hunter', name: '时间猎手', icon: '⏳', level: 18,
    hp: 150, attack: 27, defense: 12, speed: 18,
    skills: [
      { id: 'time_slash', name: '时间斩', icon: '⏳', damage: 30, type: 'time', desc: '切割时间线的一刀' },
      { id: 'temporal_rewind', name: '时光倒流', icon: '⏪', damage: 0, type: 'heal', desc: '恢复35%HP', healPercent: 35 },
      { id: 'haste', name: '时间加速', icon: '⏩', damage: 0, type: 'buff', desc: '速度大幅提升', buff: { speed: 10 } },
      { id: 'chrono_strike', name: '时空乱流', icon: '🕐', damage: 52, type: 'time', desc: '扭曲时空的猛击', maxCooldown: 3 },
    ],
    reward: { coins: 160, xp: 120 },
    stealChance: 0.07,
  },
  {
    id: 'nature_titan', name: '自然泰坦', icon: '🌳', level: 19,
    hp: 220, attack: 22, defense: 20, speed: 6,
    skills: [
      { id: 'root_slam', name: '根须猛击', icon: '🌿', damage: 28, type: 'nature', desc: '巨大树根攻击' },
      { id: 'natures_wrath', name: '自然之怒', icon: '🌳', damage: 40, type: 'nature', desc: '大自然的愤怒', maxCooldown: 2 },
      { id: 'photosynthesis', name: '光合作用', icon: '☀️', damage: 0, type: 'heal', desc: '恢复25%HP', healPercent: 25 },
      { id: 'thorn_fortress', name: '荆棘堡垒', icon: '🌹', damage: 0, type: 'buff', desc: '防御大幅提升', buff: { defense: 14 } },
    ],
    reward: { coins: 170, xp: 125 },
    stealChance: 0.07,
  },
  {
    id: 'chaos_dragon', name: '混沌魔龙', icon: '🐲', level: 22,
    hp: 250, attack: 32, defense: 18, speed: 11,
    skills: [
      { id: 'chaos_breath', name: '混沌吐息', icon: '🌀', damage: 38, type: 'chaos', desc: '混沌能量吐息' },
      { id: 'void_claw', name: '虚无之爪', icon: '🐲', damage: 34, type: 'dark', desc: '撕裂虚空的龙爪' },
      { id: 'chaos_shield', name: '混沌护甲', icon: '🔮', damage: 0, type: 'buff', desc: '全属性提升', buff: { attack: 5, defense: 8, speed: 3 } },
      { id: 'oblivion_blast', name: '遗忘爆破', icon: '💥', damage: 58, type: 'chaos', desc: '毁灭一切的混沌能量', maxCooldown: 4 },
    ],
    reward: { coins: 250, xp: 180 },
    stealChance: 0.06,
  },
  {
    id: 'frost_empress', name: '冰霜女皇', icon: '👸', level: 24,
    hp: 190, attack: 30, defense: 15, speed: 14,
    skills: [
      { id: 'blizzard', name: '暴风雪', icon: '❄️', damage: 35, type: 'ice', desc: '席卷一切的暴风雪' },
      { id: 'ice_prison', name: '冰牢', icon: '🧊', damage: 28, type: 'ice', desc: '冰之牢笼' },
      { id: 'frost_nova', name: '冰霜新星', icon: '💠', damage: 48, type: 'ice', desc: '冰霜能量大爆发', maxCooldown: 3 },
      { id: 'frozen_heart', name: '冰封之心', icon: '💙', damage: 0, type: 'heal', desc: '恢复30%HP', healPercent: 30 },
    ],
    reward: { coins: 280, xp: 200 },
    stealChance: 0.06,
  },
  {
    id: 'star_guardian', name: '星辰守护者', icon: '⭐', level: 25,
    hp: 230, attack: 33, defense: 20, speed: 13,
    skills: [
      { id: 'star_rain', name: '星雨', icon: '🌠', damage: 36, type: 'cosmic', desc: '流星群落下' },
      { id: 'constellation_shield', name: '星座护盾', icon: '🛡️', damage: 0, type: 'buff', desc: '星辰守护之力', buff: { defense: 12, speed: 4 } },
      { id: 'galaxy_burst', name: '银河爆发', icon: '🌌', damage: 55, type: 'cosmic', desc: '银河能量集中爆发', maxCooldown: 3 },
      { id: 'stellar_heal', name: '星光治愈', icon: '✨', damage: 0, type: 'heal', desc: '恢复35%HP', healPercent: 35 },
    ],
    reward: { coins: 300, xp: 220 },
    stealChance: 0.05,
  },
  {
    id: 'abyss_lord', name: '深渊领主', icon: '😈', level: 28,
    hp: 280, attack: 36, defense: 22, speed: 10,
    skills: [
      { id: 'abyss_gaze', name: '深渊凝视', icon: '👁️', damage: 38, type: 'dark', desc: '来自深渊的注视' },
      { id: 'dark_eruption', name: '暗黑喷发', icon: '🌑', damage: 48, type: 'dark', desc: '深渊能量喷涌', maxCooldown: 2 },
      { id: 'soul_harvest', name: '灵魂收割', icon: '💀', damage: 42, type: 'dark', desc: '收割灵魂', healPercent: 20, type: 'heal' },
      { id: 'abyssal_wrath', name: '深渊之怒', icon: '😈', damage: 65, type: 'dark', desc: '深渊领主的终极怒火', maxCooldown: 4 },
    ],
    reward: { coins: 400, xp: 280 },
    stealChance: 0.04,
  },
  {
    id: 'celestial_general', name: '天界神将', icon: '⚔️', level: 32,
    hp: 320, attack: 38, defense: 25, speed: 14,
    skills: [
      { id: 'divine_slash', name: '神圣斩击', icon: '⚔️', damage: 42, type: 'holy', desc: '注入神力的一斩' },
      { id: 'heavenly_judgment', name: '天罚', icon: '⚡', damage: 55, type: 'holy', desc: '来自天界的审判', maxCooldown: 3 },
      { id: 'divine_protection', name: '神圣守护', icon: '🛡️', damage: 0, type: 'buff', desc: '全属性提升', buff: { attack: 8, defense: 10, speed: 5 } },
      { id: 'celestial_fury', name: '天界之怒', icon: '✨', damage: 72, type: 'holy', desc: '天界最强一击', maxCooldown: 5 },
    ],
    reward: { coins: 600, xp: 400 },
    stealChance: 0.03,
  },
  {
    id: 'creator_god', name: '创世之神', icon: '🌟', level: 35,
    hp: 380, attack: 40, defense: 28, speed: 15,
    skills: [
      { id: 'genesis_beam', name: '创世光束', icon: '🌟', damage: 45, type: 'cosmic', desc: '创造万物的光芒' },
      { id: 'divine_creation', name: '神圣创造', icon: '✨', damage: 0, type: 'heal', desc: '恢复40%HP', healPercent: 40 },
      { id: 'universal_law', name: '万物法则', icon: '📜', damage: 0, type: 'buff', desc: '全属性大幅提升', buff: { attack: 10, defense: 12, speed: 8 } },
      { id: 'big_bang', name: '创世爆炸', icon: '💥', damage: 80, type: 'cosmic', desc: '宇宙大爆炸之力', maxCooldown: 5 },
    ],
    reward: { coins: 800, xp: 500 },
    stealChance: 0.02,
  },
  {
    id: 'storm_emperor', name: '风暴帝王', icon: '🌪️', level: 26,
    hp: 210, attack: 34, defense: 14, speed: 20,
    skills: [
      { id: 'typhoon', name: '台风', icon: '🌪️', damage: 36, type: 'wind', desc: '猛烈的台风攻击' },
      { id: 'lightning_storm', name: '雷暴', icon: '⚡', damage: 42, type: 'electric', desc: '雷暴交加', maxCooldown: 2 },
      { id: 'storm_surge', name: '风暴涌动', icon: '🌊', damage: 0, type: 'buff', desc: '速度和攻击提升', buff: { speed: 8, attack: 6 } },
      { id: 'annihilating_tempest', name: '灭世风暴', icon: '🌀', damage: 60, type: 'wind', desc: '毁灭一切的终极风暴', maxCooldown: 4 },
    ],
    reward: { coins: 320, xp: 240 },
    stealChance: 0.05,
  },
  {
    id: 'blood_vampire', name: '血族亲王', icon: '🧛', level: 17,
    hp: 160, attack: 25, defense: 10, speed: 14,
    skills: [
      { id: 'blood_drain', name: '吸血', icon: '🩸', damage: 22, type: 'dark', desc: '吸取鲜血回复HP' },
      { id: 'bat_swarm', name: '蝙蝠群', icon: '🦇', damage: 18, type: 'dark', desc: '召唤蝙蝠群攻击', hits: 3 },
      { id: 'crimson_feast', name: '血色盛宴', icon: '🩸', damage: 0, type: 'heal', desc: '恢复30%HP', healPercent: 30 },
      { id: 'night_terror', name: '夜之恐惧', icon: '🌑', damage: 38, type: 'dark', desc: '暗夜的恐怖力量', maxCooldown: 2 },
    ],
    reward: { coins: 140, xp: 105 },
    stealChance: 0.08,
  },
  {
    id: 'cosmos_devourer', name: '宇宙吞噬者', icon: '🕳️', level: 40,
    hp: 450, attack: 42, defense: 30, speed: 12,
    skills: [
      { id: 'devour_star', name: '吞星', icon: '🌑', damage: 50, type: 'cosmic', desc: '吞噬星球的力量' },
      { id: 'gravity_crush', name: '重力碾压', icon: '🕳️', damage: 45, type: 'cosmic', desc: '黑洞般的重力' },
      { id: 'cosmic_absorption', name: '宇宙吸收', icon: '🌌', damage: 0, type: 'heal', desc: '恢复35%HP', healPercent: 35 },
      { id: 'supernova', name: '超新星爆发', icon: '💥', damage: 90, type: 'cosmic', desc: '恒星毁灭级爆炸', maxCooldown: 5 },
    ],
    reward: { coins: 1200, xp: 800 },
    stealChance: 0.02,
  },
  {
    id: 'lord_of_eternity', name: '永恒之主', icon: '♾️', level: 50,
    hp: 600, attack: 50, defense: 35, speed: 20,
    skills: [
      { id: 'eternal_flame', name: '永恒之焰', icon: '🔥', damage: 55, type: 'cosmic', desc: '永不熄灭的火焰' },
      { id: 'time_stop', name: '时间停止', icon: '⏳', damage: 0, type: 'buff', desc: '全属性极大提升', buff: { attack: 15, defense: 15, speed: 12 } },
      { id: 'infinity_heal', name: '无限回复', icon: '♾️', damage: 0, type: 'heal', desc: '恢复50%HP', healPercent: 50 },
      { id: 'end_of_all', name: '终焉', icon: '💀', damage: 120, type: 'cosmic', desc: '终结一切的绝对力量', maxCooldown: 6 },
    ],
    reward: { coins: 2000, xp: 1500 },
    stealChance: 0.01,
  },
];

const LEARNABLE_SKILLS_BY_LEVEL = [
  { level: 2, skill: { id: 'power_strike', name: '力量打击', icon: '💪', damage: 20, type: 'normal', cooldown: 0, maxCooldown: 1, desc: '集中力量的攻击' } },
  { level: 4, skill: { id: 'quick_dash', name: '疾风冲刺', icon: '💨', damage: 18, type: 'wind', cooldown: 0, maxCooldown: 0, desc: '快速冲刺攻击' } },
  { level: 6, skill: { id: 'fire_punch', name: '烈焰拳', icon: '🔥', damage: 25, type: 'fire', cooldown: 0, maxCooldown: 2, desc: '燃烧的拳头' } },
  { level: 8, skill: { id: 'ice_beam', name: '冰冻光线', icon: '❄️', damage: 28, type: 'ice', cooldown: 0, maxCooldown: 2, desc: '极寒光线' } },
  { level: 10, skill: { id: 'thunder_bolt', name: '雷电球', icon: '⚡', damage: 30, type: 'electric', cooldown: 0, maxCooldown: 2, desc: '雷电能量球' } },
  { level: 13, skill: { id: 'shadow_strike', name: '暗影突袭', icon: '🌑', damage: 32, type: 'dark', cooldown: 0, maxCooldown: 2, desc: '暗影中突然袭击' } },
  { level: 16, skill: { id: 'crystal_cannon', name: '水晶炮', icon: '💎', damage: 38, type: 'crystal', cooldown: 0, maxCooldown: 3, desc: '水晶能量炮击' } },
  { level: 20, skill: { id: 'mega_strike', name: '超级打击', icon: '⭐', damage: 45, type: 'normal', cooldown: 0, maxCooldown: 3, desc: '超强力打击' } },
  { level: 25, skill: { id: 'dragon_breath', name: '龙息术', icon: '🐲', damage: 50, type: 'fire', cooldown: 0, maxCooldown: 4, desc: '龙之吐息' } },
  { level: 30, skill: { id: 'ultimate_blast', name: '终极爆破', icon: '💥', damage: 60, type: 'normal', cooldown: 0, maxCooldown: 5, desc: '最强大的攻击技能' } },
  { level: 35, skill: { id: 'holy_judgment', name: '圣光审判', icon: '✨', damage: 65, type: 'holy', cooldown: 0, maxCooldown: 4, desc: '神圣光芒的审判' } },
  { level: 38, skill: { id: 'chaos_nova', name: '混沌新星', icon: '🌀', damage: 58, type: 'chaos', cooldown: 0, maxCooldown: 3, desc: '混沌能量大爆发' } },
  { level: 40, skill: { id: 'cosmic_ray', name: '宇宙射线', icon: '🌌', damage: 72, type: 'cosmic', cooldown: 0, maxCooldown: 4, desc: '来自宇宙深处的毁灭射线' } },
  { level: 42, skill: { id: 'phoenix_rebirth', name: '浴火重生', icon: '🔥', damage: 0, type: 'heal', cooldown: 0, maxCooldown: 5, desc: '恢复40%HP', healPercent: 40 } },
  { level: 45, skill: { id: 'time_warp', name: '时空扭曲', icon: '⏳', damage: 68, type: 'time', cooldown: 0, maxCooldown: 4, desc: '扭曲时空的致命一击' } },
  { level: 48, skill: { id: 'soul_reaper', name: '灵魂收割者', icon: '💀', damage: 78, type: 'dark', cooldown: 0, maxCooldown: 5, desc: '收割一切灵魂' } },
  { level: 50, skill: { id: 'divine_wrath', name: '神之怒', icon: '⚡', damage: 85, type: 'holy', cooldown: 0, maxCooldown: 5, desc: '神明的愤怒降临' } },
  { level: 55, skill: { id: 'big_bang_strike', name: '创世一击', icon: '💥', damage: 95, type: 'cosmic', cooldown: 0, maxCooldown: 6, desc: '宇宙大爆炸级别的攻击' } },
  { level: 60, skill: { id: 'eternal_oblivion', name: '永恒湮灭', icon: '♾️', damage: 110, type: 'cosmic', cooldown: 0, maxCooldown: 6, desc: '终结一切的永恒力量' } },
  { level: 70, skill: { id: 'omnipotence', name: '全知全能', icon: '🌟', damage: 0, type: 'buff', cooldown: 0, maxCooldown: 6, desc: '全属性极大提升', buff: { attack: 20, defense: 20, speed: 15 } } },
];

// Battle state (not persisted, per-session)
let battleState = null;

function getBattlePetStats() {
  const b = gameState.battle;
  const lvl = gameState.level;
  return {
    name: gameState.petName,
    icon: '🐱',
    hp: b.petMaxHP + (lvl - 1) * 8,
    maxHP: b.petMaxHP + (lvl - 1) * 8,
    attack: b.petAttack + (lvl - 1) * 2,
    defense: b.petDefense + Math.floor((lvl - 1) * 1.5),
    speed: b.petSpeed + Math.floor((lvl - 1) * 0.8),
    skills: [...b.skills, ...b.stolenSkills].map(s => ({...s, cooldown: 0})),
    level: lvl,
  };
}

function startBattle(opponentId) {
  const opp = NPC_OPPONENTS.find(o => o.id === opponentId);
  if (!opp) return;

  const petStats = getBattlePetStats();
  battleState = {
    pet: { ...petStats },
    opponent: {
      ...opp,
      currentHP: opp.hp,
      maxHP: opp.hp,
      skills: opp.skills.map(s => ({...s, cooldown: 0})),
      buffedAttack: opp.attack,
      buffedDefense: opp.defense,
      buffedSpeed: opp.speed,
    },
    log: [],
    turn: 0,
    phase: 'player_turn',
    stealAttempted: false,
    petBuffedAttack: petStats.attack,
    petBuffedDefense: petStats.defense,
    petBuffedSpeed: petStats.speed,
  };

  battleState.log.push(`⚔️ ${petStats.name} VS ${opp.icon} ${opp.name} (Lv.${opp.level})`);
  battleState.log.push('战斗开始！');

  gameState.battle.inBattle = true;
  gameState.trackers.battlesStarted = (gameState.trackers.battlesStarted || 0) + 1;
  renderBattleField();
}

function playerUseSkill(skillIndex) {
  if (!battleState || battleState.phase !== 'player_turn') return;

  const pet = battleState.pet;
  const opp = battleState.opponent;
  const allSkills = pet.skills;
  const skill = allSkills[skillIndex];
  if (!skill) return;
  if (skill.cooldown > 0) {
    showToast(`${skill.name} 冷却中 (${skill.cooldown}回合)`, 'error');
    return;
  }

  battleState.turn++;

  // Player attacks
  if (skill.type === 'buff' && skill.buff) {
    if (skill.buff.attack) battleState.petBuffedAttack += skill.buff.attack;
    if (skill.buff.defense) battleState.petBuffedDefense += skill.buff.defense;
    if (skill.buff.speed) battleState.petBuffedSpeed += skill.buff.speed;
    battleState.log.push(`🐱 使用了 ${skill.icon} ${skill.name}！属性提升了！`);
  } else if (skill.type === 'heal' && skill.healPercent) {
    const heal = Math.floor(pet.maxHP * skill.healPercent / 100);
    pet.hp = Math.min(pet.maxHP, pet.hp + heal);
    battleState.log.push(`🐱 使用了 ${skill.icon} ${skill.name}！恢复了 ${heal} HP！`);
  } else {
    const atk = battleState.petBuffedAttack;
    const def = opp.buffedDefense;
    const baseDmg = skill.damage + atk - def;
    const variance = 0.85 + Math.random() * 0.3;
    const crit = Math.random() < 0.1;
    let dmg = Math.max(1, Math.floor(baseDmg * variance));
    if (crit) dmg = Math.floor(dmg * 1.5);
    opp.currentHP = Math.max(0, opp.currentHP - dmg);
    battleState.log.push(`🐱 使用了 ${skill.icon} ${skill.name}！${crit ? '💥暴击！' : ''}造成 ${dmg} 点伤害！`);
  }

  if (skill.maxCooldown) skill.cooldown = skill.maxCooldown;
  // Reduce all skill cooldowns
  allSkills.forEach(s => { if (s !== skill && s.cooldown > 0) s.cooldown--; });

  if (opp.currentHP <= 0) {
    battleWin();
    return;
  }

  // Opponent turn
  battleState.phase = 'opponent_turn';
  setTimeout(() => opponentTurn(), 800);
  renderBattleField();
}

function opponentTurn() {
  if (!battleState) return;
  const pet = battleState.pet;
  const opp = battleState.opponent;

  // Pick a skill (AI: prefer higher damage, use buffs sometimes)
  const usable = opp.skills.filter(s => !s.cooldown || s.cooldown <= 0);
  if (usable.length === 0) {
    battleState.log.push(`${opp.icon} ${opp.name} 无法行动！`);
    battleState.phase = 'player_turn';
    renderBattleField();
    return;
  }

  const skill = usable[Math.floor(Math.random() * usable.length)];

  if (skill.type === 'buff' && skill.buff) {
    if (skill.buff.attack) opp.buffedAttack += skill.buff.attack;
    if (skill.buff.defense) opp.buffedDefense += skill.buff.defense;
    if (skill.buff.speed) opp.buffedSpeed += skill.buff.speed;
    battleState.log.push(`${opp.icon} 使用了 ${skill.icon} ${skill.name}！属性提升了！`);
  } else if (skill.type === 'heal' && skill.healPercent) {
    const heal = Math.floor(opp.maxHP * skill.healPercent / 100);
    opp.currentHP = Math.min(opp.maxHP, opp.currentHP + heal);
    battleState.log.push(`${opp.icon} 使用了 ${skill.icon} ${skill.name}！恢复了 ${heal} HP！`);
  } else {
    const atk = opp.buffedAttack;
    const def = battleState.petBuffedDefense;
    const baseDmg = skill.damage + atk - def;
    const variance = 0.85 + Math.random() * 0.3;
    const crit = Math.random() < 0.1;
    let dmg = Math.max(1, Math.floor(baseDmg * variance));
    if (crit) dmg = Math.floor(dmg * 1.5);
    pet.hp = Math.max(0, pet.hp - dmg);
    battleState.log.push(`${opp.icon} 使用了 ${skill.icon} ${skill.name}！${crit ? '💥暴击！' : ''}造成 ${dmg} 点伤害！`);
  }

  if (skill.maxCooldown) skill.cooldown = skill.maxCooldown;
  opp.skills.forEach(s => { if (s !== skill && s.cooldown > 0) s.cooldown--; });

  if (pet.hp <= 0) {
    battleLose();
    return;
  }

  battleState.phase = 'player_turn';
  renderBattleField();
}

function attemptSteal() {
  if (!battleState || battleState.stealAttempted) {
    showToast('本次战斗已经尝试过夺取技能了！', 'error');
    return;
  }
  battleState.stealAttempted = true;
  const opp = NPC_OPPONENTS.find(o => o.id === battleState.opponent.id);
  if (!opp) return;

  const chance = opp.stealChance;
  const oppHPPercent = battleState.opponent.currentHP / battleState.opponent.maxHP;
  const adjustedChance = chance + (1 - oppHPPercent) * 0.15;

  if (Math.random() < adjustedChance) {
    const stealable = opp.skills.filter(s => {
      const allMySkills = [...gameState.battle.skills, ...gameState.battle.stolenSkills];
      return !allMySkills.some(ms => ms.id === s.id);
    });
    if (stealable.length > 0) {
      const stolen = stealable[Math.floor(Math.random() * stealable.length)];
      const newSkill = { ...stolen, cooldown: 0 };
      gameState.battle.stolenSkills.push(newSkill);
      battleState.pet.skills.push({ ...newSkill });
      battleState.log.push(`🎉 成功夺取了 ${stolen.icon} ${stolen.name}！`);
      showToast(`学会了新技能: ${stolen.icon} ${stolen.name}！`, 'achievement');
    } else {
      battleState.log.push('对手的技能你都已经学会了！');
    }
  } else {
    battleState.log.push('❌ 夺取技能失败！');
    showToast('夺取失败！对手HP越低成功率越高', 'error');
  }

  // This counts as a turn, opponent attacks
  battleState.phase = 'opponent_turn';
  setTimeout(() => opponentTurn(), 800);
  renderBattleField();
}

function battleWin() {
  if (!battleState) return;
  const opp = NPC_OPPONENTS.find(o => o.id === battleState.opponent.id);
  gameState.battle.battleWins++;
  gameState.battle.inBattle = false;

  if (opp) {
    addCoins(opp.reward.coins);
    addXp(opp.reward.xp);
    battleState.log.push(`🎉 胜利！获得 ${opp.reward.coins} 金币 + ${opp.reward.xp} 经验`);
  }

  // Check for new skills learned by level
  checkBattleLevelSkills();

  battleState.phase = 'victory';
  triggerPetAnimation('emotion-excited');
  updateQuestProgress();
  checkAchievements();
  renderBattleField();
}

function battleLose() {
  if (!battleState) return;
  gameState.battle.battleLosses++;
  gameState.battle.inBattle = false;
  battleState.log.push('💀 战斗失败...下次再努力吧！');
  battleState.phase = 'defeat';
  triggerPetAnimation('emotion-cry');
  renderBattleField();
}

function fleeBattle() {
  if (!battleState) return;
  gameState.battle.inBattle = false;
  battleState = null;
  showToast('成功逃跑了！', 'info');
  renderBattle();
}

function checkBattleLevelSkills() {
  const lvl = gameState.level;
  for (const entry of LEARNABLE_SKILLS_BY_LEVEL) {
    if (lvl >= entry.level) {
      const allSkills = [...gameState.battle.skills, ...gameState.battle.stolenSkills];
      if (!allSkills.some(s => s.id === entry.skill.id)) {
        gameState.battle.skills.push({ ...entry.skill, cooldown: 0 });
        showToast(`等级${entry.level}解锁新技能: ${entry.skill.icon} ${entry.skill.name}！`, 'achievement');
      }
    }
  }
}

function renderBattle() {
  const area = document.getElementById('battle-area');
  if (!area) return;

  if (battleState && battleState.phase !== 'victory' && battleState.phase !== 'defeat') {
    renderBattleField();
    return;
  }

  // Show opponent selection
  let html = '<div class="battle-stats">';
  html += `<div class="battle-stat-row"><span>战绩</span><span>胜${gameState.battle.battleWins} / 负${gameState.battle.battleLosses}</span></div>`;
  html += `<div class="battle-stat-row"><span>已学技能</span><span>${gameState.battle.skills.length + gameState.battle.stolenSkills.length}个</span></div>`;
  html += '</div>';

  html += '<div class="battle-section-title">选择对手</div>';
  html += '<div class="opponent-list">';
  for (const opp of NPC_OPPONENTS) {
    const locked = gameState.level < Math.max(1, opp.level - 2);
    html += `<div class="opponent-card ${locked ? 'locked' : ''}" ${locked ? '' : `onclick="startBattle('${opp.id}')"`}>`;
    html += `<div class="opponent-icon">${opp.icon}</div>`;
    html += `<div class="opponent-info">`;
    html += `<div class="opponent-name">${locked ? '???' : opp.name} <span class="opponent-level">Lv.${opp.level}</span></div>`;
    html += `<div class="opponent-detail">${locked ? `需要 Lv.${Math.max(1, opp.level - 2)} 解锁` : `奖励: ${opp.reward.coins}金币 ${opp.reward.xp}经验`}</div>`;
    html += '</div></div>';
  }
  html += '</div>';

  html += '<div class="battle-section-title">我的技能</div>';
  html += '<div class="my-skills-list">';
  const allSkills = [...gameState.battle.skills, ...gameState.battle.stolenSkills];
  for (const skill of allSkills) {
    html += `<div class="skill-tag"><span>${skill.icon}</span> ${skill.name} <span class="skill-dmg">${skill.damage > 0 ? skill.damage + '伤害' : skill.desc}</span></div>`;
  }
  html += '</div>';

  area.innerHTML = html;
}

function renderBattleField() {
  const area = document.getElementById('battle-area');
  if (!area || !battleState) return;

  const pet = battleState.pet;
  const opp = battleState.opponent;
  const petHPPct = Math.max(0, (pet.hp / pet.maxHP) * 100);
  const oppHPPct = Math.max(0, (opp.currentHP / opp.maxHP) * 100);

  let html = '<div class="battlefield">';

  // Opponent side
  html += '<div class="battle-entity opponent-side">';
  html += `<div class="entity-name">${opp.icon} ${opp.name} <span class="entity-level">Lv.${opp.level}</span></div>`;
  html += `<div class="hp-bar-battle"><div class="hp-bar-fill-battle opponent-hp" style="width:${oppHPPct}%"></div></div>`;
  html += `<div class="hp-text">${Math.ceil(opp.currentHP)} / ${opp.maxHP}</div>`;
  html += '</div>';

  // VS
  html += '<div class="vs-indicator">⚔️ VS</div>';

  // Pet side
  html += '<div class="battle-entity pet-side">';
  html += `<div class="entity-name">🐱 ${pet.name} <span class="entity-level">Lv.${pet.level}</span></div>`;
  html += `<div class="hp-bar-battle"><div class="hp-bar-fill-battle pet-hp" style="width:${petHPPct}%"></div></div>`;
  html += `<div class="hp-text">${Math.ceil(pet.hp)} / ${pet.maxHP}</div>`;
  html += '</div>';

  html += '</div>'; // .battlefield

  // Battle log
  html += '<div class="battle-log">';
  const recentLogs = battleState.log.slice(-6);
  for (const log of recentLogs) {
    html += `<div class="log-entry">${log}</div>`;
  }
  html += '</div>';

  // Actions
  if (battleState.phase === 'player_turn') {
    html += '<div class="battle-actions">';
    html += '<div class="battle-skills">';
    pet.skills.forEach((skill, i) => {
      const disabled = skill.cooldown > 0;
      html += `<button class="battle-skill-btn ${disabled ? 'on-cooldown' : ''}" ${disabled ? 'disabled' : `onclick="playerUseSkill(${i})"`} title="${skill.desc}">`;
      html += `<span class="skill-btn-icon">${skill.icon}</span>`;
      html += `<span class="skill-btn-name">${skill.name}</span>`;
      if (disabled) html += `<span class="skill-cd">${skill.cooldown}回合</span>`;
      else if (skill.damage > 0) html += `<span class="skill-btn-dmg">${skill.damage}</span>`;
      html += '</button>';
    });
    html += '</div>';
    html += '<div class="battle-extra-actions">';
    html += `<button class="battle-action-btn steal-btn" ${battleState.stealAttempted ? 'disabled' : ''} onclick="attemptSteal()">🎯 夺取技能</button>`;
    html += '<button class="battle-action-btn flee-btn" onclick="fleeBattle()">🏃 逃跑</button>';
    html += '</div>';
    html += '</div>';
  } else if (battleState.phase === 'opponent_turn') {
    html += '<div class="battle-waiting">对手行动中...</div>';
  } else if (battleState.phase === 'victory') {
    html += '<div class="battle-result victory">';
    html += '<div class="result-title">🎉 胜利！</div>';
    html += '<button class="battle-action-btn" onclick="battleState=null;renderBattle()">返回</button>';
    html += '</div>';
  } else if (battleState.phase === 'defeat') {
    html += '<div class="battle-result defeat">';
    html += '<div class="result-title">💀 失败</div>';
    html += '<button class="battle-action-btn" onclick="battleState=null;renderBattle()">返回</button>';
    html += '</div>';
  }

  area.innerHTML = html;
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
  renderBattle();
}

// ============================================================
// 启动
// ============================================================
document.addEventListener('DOMContentLoaded', init);
