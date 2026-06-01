let flowerUsd = 0.084887;
let flowerUsdChange = 0.3326;
const publicFarmEndpoint = "";
const flowerCoinGeckoId = "flower-2";
const sflWorldUrl = "https://sfl.world/";
const corsProxyUrl = "https://api.allorigins.win/raw?url=";
const localApiBase = "";

const itemTranslations = {
  Wood: "Madera",
  Stone: "Piedra",
  Iron: "Hierro",
  Gold: "Oro",
  Coal: "Carbon",
  Crimstone: "Crimstone",
  "Coins (1k)": "Monedas (1k)",
  Coins: "Monedas",
  Egg: "Huevo",
  Pumpkin: "Calabaza",
  Wheat: "Trigo",
  Carrot: "Zanahoria",
  Milk: "Leche",
  Salt: "Sal",
  "Refined Salt": "Sal refinada",
  Honey: "Miel",
  Leather: "Cuero",
  Wool: "Lana",
  Feather: "Pluma",
  Sunflower: "Girasol",
  Potato: "Papa",
  Tomato: "Tomate",
  Lemon: "Limon",
  Blueberry: "Arandano",
  Orange: "Naranja",
  Apple: "Manzana",
  Banana: "Banana",
  Corn: "Maiz"
};

const hiddenMarketNames = new Set([
  "coal",
  "carbon",
  "coins",
  "coins (1k)",
  "oil",
  "frost",
  "frost pebble",
  "dewbe",
  "dewberry",
  "refined salt"
]);

function isHiddenMarketName(name = "") {
  return hiddenMarketNames.has(getMarketKey(name));
}

function isVisibleMarketItem(item) {
  return !isHiddenMarketName(item?.marketName || item?.name || item?.esName || "");
}

const marketItems = [
  {
    id: "wood",
    name: "Wood",
    marketName: "Wood",
    esName: "Madera",
    icon: getSflWorldImage("Wood"),
    price: 0.0155,
    trend: -13.56,
    spark: [0.0177, 0.0176, 0.017, 0.0164, 0.016, 0.0157, 0.015, 0.0153]
  },
  {
    id: "stone",
    name: "Stone",
    marketName: "Stone",
    esName: "Piedra",
    icon: getSflWorldImage("Stone"),
    price: 0.0273,
    trend: 0.37,
    spark: [0.0272, 0.0272, 0.0268, 0.0269, 0.0265, 0.0267, 0.0263, 0.0268]
  },
  {
    id: "iron",
    name: "Iron Ore",
    marketName: "Iron",
    esName: "Hierro",
    icon: getSflWorldImage("Iron"),
    price: 0.0869,
    trend: -1.03,
    spark: [0.0878, 0.0881, 0.0875, 0.0875, 0.0884, 0.0873, 0.0853, 0.0857]
  },
  {
    id: "gold",
    name: "Gold Ore",
    marketName: "Gold",
    esName: "Oro",
    icon: getSflWorldImage("Gold"),
    price: 0.3,
    trend: -15.32,
    spark: [0.3543, 0.33, 0.3179, 0.3183, 0.3234, 0.312, 0.3038, 0.3017]
  },
  {
    id: "coal",
    name: "Coal",
    marketName: "Coal",
    esName: "Carbon",
    icon: getSflWorldImage("Coal"),
    price: 0.03,
    trend: 6.72,
    spark: [18, 19, 28, 25, 34, 31, 43]
  },
  {
    id: "crimstone",
    name: "Crimstone",
    marketName: "Crimstone",
    esName: "Crimstone",
    icon: getSflWorldImage("Crimstone"),
    price: 0.6772,
    trend: -0.7,
    spark: [0.682, 0.6754, 0.684, 0.6822, 0.6859, 0.6762, 0.6654, 0.67]
  },
  {
    id: "coins",
    name: "Coins (1k)",
    marketName: "Coins",
    esName: "Monedas (1k)",
    icon: "https://sfl.world/img/coin.png",
    price: 0.009,
    trend: 1.21,
    spark: [24, 31, 29, 36, 33, 38, 45]
  },
  {
    id: "egg",
    name: "Egg",
    marketName: "Egg",
    esName: "Huevo",
    icon: getSflWorldImage("Egg"),
    price: 0.0209,
    trend: -9.88,
    spark: [0.0243, 0.024, 0.0231, 0.0226, 0.0216, 0.021, 0.0218, 0.022]
  },
  {
    id: "pumpkin",
    name: "Pumpkin",
    marketName: "Pumpkin",
    esName: "Calabaza",
    icon: getSflWorldImage("Pumpkin"),
    price: 0.0009,
    trend: 0,
    spark: [0.0009, 0.0009, 0.0009, 0.0009, 0.0009, 0.0009, 0.0009, 0.0009]
  },
  {
    id: "wheat",
    name: "Wheat",
    marketName: "Wheat",
    esName: "Trigo",
    icon: getSflWorldImage("Wheat"),
    price: 0.017,
    trend: -6.59,
    spark: [0.0182, 0.0172, 0.0169, 0.017, 0.0174, 0.0172, 0.0171, 0.0172]
  },
  {
    id: "carrot",
    name: "Carrot",
    marketName: "Carrot",
    esName: "Zanahoria",
    icon: getSflWorldImage("Carrot"),
    price: 0.002,
    trend: 11.11,
    spark: [0.0018, 0.0018, 0.0019, 0.0019, 0.0019, 0.0021, 0.0021, 0.0021]
  },
  {
    id: "milk",
    name: "Milk",
    marketName: "Milk",
    esName: "Leche",
    icon: getSflWorldImage("Milk"),
    price: 0.1375,
    trend: -3.44,
    spark: [0.1424, 0.1404, 0.1398, 0.1377, 0.1369, 0.1384, 0.1368, 0.1377]
  }
];

const buildingGoals = [
  {
    id: "hen-house-1",
    esName: "Gallinero: Nivel 1 a 2",
    enName: "Hen House: Level 1 to 2",
    category: "Animales",
    time: "1h 00m",
    xp: "+50 XP",
    directFlower: 0,
    resources: [
      { itemId: "wood", amount: 500 },
      { itemId: "iron", amount: 50 },
      { itemId: "gold", amount: 40 },
      { itemId: "crimstone", amount: 10 },
      { itemId: "coins", amount: 7500 }
    ]
  },
  {
    id: "kitchen-1",
    esName: "Cocina: Nivel 1 a 2",
    enName: "Kitchen: Level 1 to 2",
    category: "Produccion",
    time: "45m",
    xp: "+35 XP",
    directFlower: 8,
    resources: [
      { itemId: "wood", amount: 350 },
      { itemId: "stone", amount: 220 },
      { itemId: "wheat", amount: 120 }
    ]
  },
  {
    id: "workbench-1",
    esName: "Banco de trabajo: Nivel 1 a 2",
    enName: "Workbench: Level 1 to 2",
    category: "Produccion",
    time: "30m",
    xp: "+25 XP",
    directFlower: 5,
    resources: [
      { itemId: "wood", amount: 240 },
      { itemId: "stone", amount: 180 },
      { itemId: "iron", amount: 20 }
    ]
  },
  {
    id: "barn-1",
    esName: "Granero: Nivel 1 a 2",
    enName: "Barn: Level 1 to 2",
    category: "Animales",
    time: "2h 00m",
    xp: "+80 XP",
    directFlower: 15,
    resources: [
      { itemId: "wood", amount: 650 },
      { itemId: "stone", amount: 300 },
      { itemId: "gold", amount: 12 },
      { itemId: "milk", amount: 20 }
    ]
  },
  {
    id: "bakery-1",
    esName: "Panaderia: Nivel 1 a 2",
    enName: "Bakery: Level 1 to 2",
    category: "Produccion",
    time: "1h 30m",
    xp: "+60 XP",
    directFlower: 10,
    resources: [
      { itemId: "wood", amount: 420 },
      { itemId: "stone", amount: 260 },
      { itemId: "wheat", amount: 180 },
      { itemId: "egg", amount: 25 }
    ]
  },
  {
    id: "deli-1",
    esName: "Deli: Nivel 1 a 2",
    enName: "Deli: Level 1 to 2",
    category: "Produccion",
    time: "2h 00m",
    xp: "+75 XP",
    directFlower: 12,
    resources: [
      { itemId: "wood", amount: 480 },
      { itemId: "iron", amount: 35 },
      { itemId: "tomato", amount: 90 },
      { itemId: "leather", amount: 12 }
    ]
  },
  {
    id: "smoothie-shack-1",
    esName: "Smoothie Shack: Nivel 1 a 2",
    enName: "Smoothie Shack: Level 1 to 2",
    category: "Produccion",
    time: "1h 45m",
    xp: "+70 XP",
    directFlower: 10,
    resources: [
      { itemId: "wood", amount: 360 },
      { itemId: "apple", amount: 35 },
      { itemId: "orange", amount: 35 },
      { itemId: "blueberry", amount: 35 }
    ]
  },
  {
    id: "compost-bin-1",
    esName: "Compost Bin: Nivel 1 a 2",
    enName: "Compost Bin: Level 1 to 2",
    category: "Compost",
    time: "20m",
    xp: "+20 XP",
    directFlower: 2,
    resources: [
      { itemId: "wood", amount: 120 },
      { itemId: "rhubarb", amount: 10 },
      { itemId: "carrot", amount: 5 }
    ]
  },
  {
    id: "turbo-composter-1",
    esName: "Turbo Composter: Nivel 1 a 2",
    enName: "Turbo Composter: Level 1 to 2",
    category: "Compost",
    time: "40m",
    xp: "+35 XP",
    directFlower: 5,
    resources: [
      { itemId: "iron", amount: 20 },
      { itemId: "soybean", amount: 15 },
      { itemId: "corn", amount: 8 },
      { itemId: "oil", amount: 2 }
    ]
  },
  {
    id: "premium-composter-1",
    esName: "Premium Composter: Nivel 1 a 2",
    enName: "Premium Composter: Level 1 to 2",
    category: "Compost",
    time: "1h 20m",
    xp: "+55 XP",
    directFlower: 8,
    resources: [
      { itemId: "gold", amount: 10 },
      { itemId: "egg", amount: 20 },
      { itemId: "banana", amount: 10 },
      { itemId: "lemon", amount: 10 }
    ]
  },
  {
    id: "greenhouse-1",
    esName: "Invernadero: Nivel 1 a 2",
    enName: "Greenhouse: Level 1 to 2",
    category: "Cultivos",
    time: "3h 00m",
    xp: "+110 XP",
    directFlower: 20,
    resources: [
      { itemId: "wood", amount: 800 },
      { itemId: "stone", amount: 500 },
      { itemId: "iron", amount: 80 },
      { itemId: "grape", amount: 15 },
      { itemId: "rice", amount: 15 }
    ]
  },
  {
    id: "market-1",
    esName: "Market Stall: Nivel 1 a 2",
    enName: "Market Stall: Level 1 to 2",
    category: "Comercio",
    time: "1h 15m",
    xp: "+45 XP",
    directFlower: 6,
    resources: [
      { itemId: "wood", amount: 300 },
      { itemId: "stone", amount: 120 },
      { itemId: "coins", amount: 2500 }
    ]
  },
  {
    id: "warehouse-1",
    esName: "Warehouse: Nivel 1 a 2",
    enName: "Warehouse: Level 1 to 2",
    category: "Almacenamiento",
    time: "2h 30m",
    xp: "+90 XP",
    directFlower: 18,
    resources: [
      { itemId: "wood", amount: 950 },
      { itemId: "stone", amount: 550 },
      { itemId: "iron", amount: 60 },
      { itemId: "leather", amount: 18 }
    ]
  },
  {
    id: "fire-pit-1",
    esName: "Fogata: Nivel 1 a 2",
    enName: "Fire Pit: Level 1 to 2",
    category: "Produccion",
    time: "25m",
    xp: "+20 XP",
    directFlower: 3,
    resources: [
      { itemId: "wood", amount: 160 },
      { itemId: "stone", amount: 80 },
      { itemId: "coal", amount: 20 }
    ]
  },
  {
    id: "lava-pit-spring",
    esName: "Lava Pit: receta Spring",
    enName: "Lava Pit: Spring recipe",
    category: "Infernos",
    time: "4h 00m",
    xp: "+150 XP",
    directFlower: 0,
    resources: [
      { itemId: "rhubarb", amount: 2000 },
      { itemId: "crimstone", amount: 10 }
    ]
  },
  {
    id: "lava-pit-summer",
    esName: "Lava Pit: receta Summer",
    enName: "Lava Pit: Summer recipe",
    category: "Infernos",
    time: "4h 00m",
    xp: "+150 XP",
    directFlower: 0,
    resources: [
      { itemId: "oil", amount: 70 },
      { itemId: "pepper", amount: 750 },
      { itemId: "zucchini", amount: 1000 },
      { itemId: "crimstone", amount: 4 }
    ]
  },
  {
    id: "crafting-box-1",
    esName: "Crafting Box: Nivel 1 a 2",
    enName: "Crafting Box: Level 1 to 2",
    category: "Produccion",
    time: "35m",
    xp: "+25 XP",
    directFlower: 4,
    resources: [
      { itemId: "wood", amount: 220 },
      { itemId: "stone", amount: 140 },
      { itemId: "iron", amount: 12 }
    ]
  }
];

const extraMarketItems = [
  ["salt", "Salt", "Sal", 0.0039],
  ["refined-salt", "Refined Salt", "Sal refinada", 0.0394],
  ["oil", "Oil", "Oil", 0.45],
  ["leather", "Leather", "Cuero", 0.08],
  ["wool", "Wool", "Lana", 0.06],
  ["feather", "Feather", "Pluma", 0.025],
  ["tomato", "Tomato", "Tomate", 0.01],
  ["potato", "Potato", "Papa", 0.001],
  ["rhubarb", "Rhubarb", "Rhubarb", 0.002],
  ["zucchini", "Zucchini", "Zucchini", 0.003],
  ["yam", "Yam", "Yam", 0.006],
  ["cabbage", "Cabbage", "Cabbage", 0.004],
  ["broccoli", "Broccoli", "Broccoli", 0.008],
  ["soybean", "Soybean", "Soybean", 0.004],
  ["beetroot", "Beetroot", "Beetroot", 0.006],
  ["pepper", "Pepper", "Pepper", 0.015],
  ["cauliflower", "Cauliflower", "Cauliflower", 0.01],
  ["parsnip", "Parsnip", "Parsnip", 0.006],
  ["eggplant", "Eggplant", "Eggplant", 0.012],
  ["corn", "Corn", "Maiz", 0.01],
  ["onion", "Onion", "Onion", 0.018],
  ["radish", "Radish", "Radish", 0.02],
  ["turnip", "Turnip", "Turnip", 0.01],
  ["kale", "Kale", "Kale", 0.018],
  ["artichoke", "Artichoke", "Artichoke", 0.025],
  ["barley", "Barley", "Barley", 0.025],
  ["apple", "Apple", "Manzana", 0.08],
  ["banana", "Banana", "Banana", 0.09],
  ["blueberry", "Blueberry", "Arandano", 0.07],
  ["lemon", "Lemon", "Limon", 0.08],
  ["orange", "Orange", "Naranja", 0.08],
  ["grape", "Grape", "Grape", 0.2],
  ["rice", "Rice", "Rice", 0.15],
  ["olive", "Olive", "Olive", 0.25]
];

extraMarketItems.forEach(([id, name, esName, price]) => {
  if (isHiddenMarketName(name) || isHiddenMarketName(esName)) return;
  if (marketItems.some((item) => item.id === id)) return;
  marketItems.push({
    id,
    name,
    marketName: name,
    esName,
    icon: getSflWorldImage(name),
    price,
    trend: 0,
    spark: [price, price * 1.02, price * 0.98, price * 1.01, price]
  });
});

for (let index = marketItems.length - 1; index >= 0; index -= 1) {
  if (!isVisibleMarketItem(marketItems[index])) marketItems.splice(index, 1);
}

const profileAvatars = [
  { id: "farmer-h", src: "sfl-app-imagen/farmer-H.png", banner: "sfl-app-imagen/farmer-banner.png", label: "Farmer" },
  { id: "farmer-f", src: "sfl-app-imagen/farmer-F.png", banner: "sfl-app-imagen/farmer-bannerM.png", label: "Farmer" },
  { id: "exploradora", src: "sfl-app-imagen/exploradora.png", banner: "sfl-app-imagen/exploradora-banner.png", label: "Exploradora" },
  { id: "cazador", src: "sfl-app-imagen/cazador.png", banner: "sfl-app-imagen/cazador-banner.png", label: "Cazador" },
  { id: "pescador", src: "sfl-app-imagen/pescador.png", banner: "sfl-app-imagen/pescador-banner.png", label: "Pescador" },
  { id: "minero", src: "sfl-app-imagen/minero.png", banner: "sfl-app-imagen/minero-banner.png", label: "Minero" },
  { id: "chef", src: "sfl-app-imagen/cheff.png", banner: "sfl-app-imagen/Cocinera-banner.png", label: "Chef" },
  { id: "lenador", src: "sfl-app-imagen/le%C3%B1ador.png", banner: "sfl-app-imagen/le%C3%B1ador.banner.png", label: "Lenador" }
];

const profileBanners = [
  { id: "night", label: "Noche" },
  { id: "forest", label: "Bosque" },
  { id: "desert", label: "Desierto" },
  { id: "volcano", label: "Volcan" }
];

const state = {
  balance: 0,
  farmId: "",
  farmName: "Modo demo",
  farmSource: "Demo local",
  farmStats: "",
  farmBalances: {},
  farmStock: {},
  farmAnimals: [],
  farmBumpkin: null,
  farmUpdatedAt: "",
  nftItems: [],
  nftSearch: "",
  nftType: "effects",
  selectedAsset: null,
  alertRules: JSON.parse(localStorage.getItem("sflPriceAlerts") || "{}"),
  profileName: localStorage.getItem("sflProfileName") || "",
  profileBio: localStorage.getItem("sflProfileBio") || "",
  profileAvatar: localStorage.getItem("sflProfileAvatar") || "farmer-h",
  profileBanner: localStorage.getItem("sflProfileBanner") || "night",
  profileBannerImage: localStorage.getItem("sflProfileBannerImage") || "",
  communityPosts: [],
  communityEditing: false,
  favorites: new Set(["wood", "iron", "gold"]),
  inventory: {
    wood: 120,
    stone: 80,
    iron: 8,
    gold: 2,
    coal: 30,
    crimstone: 0,
    coins: 1200,
    egg: 12,
    pumpkin: 80,
    wheat: 60,
    carrot: 45,
    milk: 5
  },
  quantities: {},
  selectedGoalId: "hen-house-1"
  , language: localStorage.getItem("sflMarketLang") || "es"
};

const marketList = document.querySelector("#marketList");
const searchInput = document.querySelector("#marketSearch");
const balanceInput = document.querySelector("#flowerBalance");
const cartTotal = document.querySelector("#cartTotal");
const cartGap = document.querySelector("#cartGap");
const goalTotal = document.querySelector("#goalTotal");
const goalGap = document.querySelector("#goalGap");
const buildingSelect = document.querySelector("#buildingSelect");
const recipeBreakdown = document.querySelector("#recipeBreakdown");
const refreshBtn = document.querySelector("#refreshBtn");
const lastUpdated = document.querySelector("#lastUpdated");
const buildTime = document.querySelector("#buildTime");
const buildXp = document.querySelector("#buildXp");
const screens = document.querySelectorAll("[data-screen]");
const viewButtons = document.querySelectorAll("[data-view]");
const topItem = document.querySelector("#topItem");
const bestTrend = document.querySelector("#bestTrend");
const activeItems = document.querySelector("#activeItems");
const missingTotal = document.querySelector("#missingTotal");
const farmGate = document.querySelector("#farmGate");
const farmIdInput = document.querySelector("#farmIdInput");
const loadFarmBtn = document.querySelector("#loadFarmBtn");
const demoFarmBtn = document.querySelector("#demoFarmBtn");
const clearFarmBtn = document.querySelector("#clearFarmBtn");
const changeFarmBtn = document.querySelector("#changeFarmBtn");
const syncFarmBtn = document.querySelector("#syncFarmBtn");
const farmGateStatus = document.querySelector("#farmGateStatus");
const farmProfileName = document.querySelector("#farmProfileName");
const farmProfileMeta = document.querySelector("#farmProfileMeta");
const farmProfileStats = document.querySelector("#farmProfileStats");
const farmProfileBalances = document.querySelector("#farmProfileBalances");
const farmDashboardName = document.querySelector("#farmDashboardName");
const farmDashboardMeta = document.querySelector("#farmDashboardMeta");
const farmDashboardLabel = document.querySelector("#farmDashboardLabel");
const farmHeroAvatar = document.querySelector("#farmHeroAvatar");
const farmBalanceGrid = document.querySelector("#farmBalanceGrid");
const farmActivityGrid = document.querySelector("#farmActivityGrid");
const farmActivityTitle = document.querySelector("#farmActivityTitle");
const farmProfileTitle = document.querySelector("#farmProfileTitle");
const farmProfileBadge = document.querySelector("#farmProfileBadge");
const profileDisplayName = document.querySelector("#profileDisplayName");
const profileBio = document.querySelector("#profileBio");
const profileStatus = document.querySelector("#profileStatus");
const saveProfileBtn = document.querySelector("#saveProfileBtn");
const editProfileBtn = document.querySelector("#editProfileBtn");
const profileModal = document.querySelector("#profileModal");
const closeProfileModal = document.querySelector("#closeProfileModal");
const profileBioPreview = document.querySelector("#profileBioPreview");
const profileAvatarPicker = document.querySelector("#profileAvatarPicker");
const profileBannerUpload = document.querySelector("#profileBannerUpload");
const farmAnimalList = document.querySelector("#farmAnimalList");
const farmAnimalCount = document.querySelector("#farmAnimalCount");
const farmDashboardSync = document.querySelector("#farmDashboardSync");
const changeAvatarBtn = document.querySelector("#changeAvatarBtn");
const changeBannerBtn = document.querySelector("#changeBannerBtn");
const avatarModal = document.querySelector("#avatarModal");
const closeAvatarModal = document.querySelector("#closeAvatarModal");
const communityForm = document.querySelector("#communityForm");
const communityFarmId = document.querySelector("#communityFarmId");
const communityName = document.querySelector("#communityName");
const communityNeed = document.querySelector("#communityNeed");
const communityMessage = document.querySelector("#communityMessage");
const communityStatus = document.querySelector("#communityStatus");
const publishCommunityBtn = document.querySelector("#publishCommunityBtn");
const communityList = document.querySelector("#communityList");
const communityConnectedName = document.querySelector("#communityConnectedName");
const refreshCommunityBtn = document.querySelector("#refreshCommunityBtn");
const useMyFarmBtn = document.querySelector("#useMyFarmBtn");
const ownCommunityPost = document.querySelector("#ownCommunityPost");
const openPostModalBtn = document.querySelector("#openPostModalBtn");
const closePostModalBtn = document.querySelector("#closePostModalBtn");
const communityComposerAvatar = document.querySelector("#communityComposerAvatar");
const communityComposerText = document.querySelector("#communityComposerText");
const publicProfileModal = document.querySelector("#publicProfileModal");
const publicProfileCard = document.querySelector("#publicProfileCard");
const closePublicProfile = document.querySelector("#closePublicProfile");
const publicProfileBanner = document.querySelector("#publicProfileBanner");
const publicProfileAvatar = document.querySelector("#publicProfileAvatar");
const publicProfileName = document.querySelector("#publicProfileName");
const publicProfileMeta = document.querySelector("#publicProfileMeta");
const publicProfileMessage = document.querySelector("#publicProfileMessage");
const publicProfileLikes = document.querySelector("#publicProfileLikes");
const publicProfileCleans = document.querySelector("#publicProfileCleans");
const publicProfileVisit = document.querySelector("#publicProfileVisit");
const nftMarketList = document.querySelector("#nftMarketList");
const nftSearch = document.querySelector("#nftSearch");
const nftTypeFilter = document.querySelector("#nftTypeFilter");
const refreshNftBtn = document.querySelector("#refreshNftBtn");
const nftSource = document.querySelector("#nftSource");
const nftStatus = document.querySelector("#nftStatus");
const settingsLanguageBtn = document.querySelector("#settingsLanguageBtn");
const settingsConnectBtn = document.querySelector("#settingsConnectBtn");
const settingsClearFarmBtn = document.querySelector("#settingsClearFarmBtn");
const settingsRefreshBtn = document.querySelector("#settingsRefreshBtn");
const settingsStatus = document.querySelector("#settingsStatus");
const appVisitsLabel = document.querySelector("#appVisitsLabel");
const appVisitsToday = document.querySelector("#appVisitsToday");
const appVisitsTodayLabel = document.querySelector("#appVisitsTodayLabel");
const appVisitsTotal = document.querySelector("#appVisitsTotal");
const appVisitsTotalLabel = document.querySelector("#appVisitsTotalLabel");
const viewMarketBtn = document.querySelector(".outline-btn");
const addMissingBtn = document.querySelector(".solid-btn");
const chartRangeButtons = document.querySelectorAll(".chart-title button");
const notificationBtn = document.querySelector(".icon-btn");
const languageButtons = document.querySelectorAll("[data-lang-toggle]");
const flowerUsdPrice = document.querySelector("#flowerUsdPrice");
const homeFlowerUsdPrice = document.querySelector("#homeFlowerUsdPrice");
const homeBalance = document.querySelector("#homeBalance");
const homeBalanceHint = document.querySelector("#homeBalanceHint");
const homeFarmName = document.querySelector("#homeFarmName");
const homeFarmMeta = document.querySelector("#homeFarmMeta");
const homeFarmStats = document.querySelector("#homeFarmStats");
const homeFarmBalances = document.querySelector("#homeFarmBalances");
const homeTopItem = document.querySelector("#homeTopItem");
const homeBestTrend = document.querySelector("#homeBestTrend");
const homeActiveItems = document.querySelector("#homeActiveItems");
const homeSummaryTitle = document.querySelector("#homeSummaryTitle");
const homeSummaryText = document.querySelector("#homeSummaryText");
const marketSource = document.querySelector("#marketSource");
const marketStatus = document.querySelector("#marketStatus");
const assetDetailPanel = document.querySelector("#assetDetailPanel");
const assetDetailType = document.querySelector("#assetDetailType");
const assetDetailTitle = document.querySelector("#assetDetailTitle");
const assetDetailImage = document.querySelector("#assetDetailImage");
const assetDetailPrice = document.querySelector("#assetDetailPrice");
const assetDetailMeta = document.querySelector("#assetDetailMeta");
const assetDetailChart = document.querySelector("#assetDetailChart");
const closeAssetDetail = document.querySelector("#closeAssetDetail");
const alertUpBtn = document.querySelector("#alertUpBtn");
const alertDownBtn = document.querySelector("#alertDownBtn");
const assetMarketLink = document.querySelector("#assetMarketLink");
const assetAlertStatus = document.querySelector("#assetAlertStatus");

function formatFlower(value, short = false) {
  const suffix = short ? " F" : " FLOWER";
  return `${formatMarketNumber(value)}${suffix}`;
}

function formatMarketNumber(value) {
  const absolute = Math.abs(value);
  if (absolute === 0) return "0.000000";
  if (absolute < 0.001) return value.toFixed(8);
  if (absolute < 1) return value.toFixed(6);
  return value.toFixed(4);
}

function formatUsd(value) {
  const usd = value * flowerUsd;
  return `$${usd < 0.0001 ? usd.toFixed(8) : usd.toFixed(6)}`;
}

function formatCompactNumber(value) {
  return value.toLocaleString(state.language === "es" ? "es-CL" : "en-US", {
    maximumFractionDigits: value < 100 ? 4 : 0
  });
}

function getItem(itemId) {
  return marketItems.find((item) => item.id === itemId);
}

function t(es, en) {
  return state.language === "es" ? es : en;
}

function itemLabel(item) {
  return state.language === "es" ? item.esName || itemTranslations[item.name] || item.name : item.name;
}

function goalLabel(goal) {
  return state.language === "es" ? goal.esName || goal.name : goal.enName || goal.name;
}

function needLabel(need) {
  const labels = {
    clean: t("Limpieza", "Cleaning"),
    visit: t("Visitas", "Visits"),
    trade: t("Intercambio", "Trade"),
    tips: t("Consejos", "Tips")
  };
  return labels[need] || labels.clean;
}

function relativeTimeLabel(dateValue) {
  const created = new Date(dateValue).getTime();
  if (!Number.isFinite(created)) return "";
  const minutes = Math.max(Math.round((Date.now() - created) / 60000), 0);
  if (minutes < 1) return t("Ahora", "Now");
  if (minutes < 60) return t(`Hace ${minutes} min`, `${minutes} min ago`);
  const hours = Math.round(minutes / 60);
  if (hours < 24) return t(`Hace ${hours} h`, `${hours} h ago`);
  const days = Math.round(hours / 24);
  return t(`Hace ${days} d`, `${days} d ago`);
}

function slugifyItemName(name) {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getSflWorldImage(name) {
  return `${sflWorldUrl}img/source/${encodeURIComponent(name)}.png`;
}

function getMarketKey(name) {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

function findMarketItemByName(name) {
  const key = getMarketKey(name);
  return marketItems.find((item) => getMarketKey(item.marketName || item.name) === key);
}

function normalizeMarketUpdate(update) {
  if (!update) return update;
  const key = getMarketKey(update.marketName || update.name || "");
  const next = { ...update };
  if (key === "salt") {
    next.id = "salt";
    next.name = "Salt";
    next.marketName = "Salt";
    next.esName = itemTranslations.Salt;
    if (Number(next.price) > 0.02) next.price = Number(next.price) / 10;
  }
  if (key === "refined salt") {
    next.id = "refined-salt";
    next.name = "Refined Salt";
    next.marketName = "Refined Salt";
    next.esName = itemTranslations["Refined Salt"];
  }
  return next;
}

function calculateTrend(spark) {
  if (!spark || spark.length < 2) return 0;
  const first = spark[0];
  const last = spark[spark.length - 1];
  if (!first) return 0;
  return ((last - first) / first) * 100;
}

function parseSflWorldPrices(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const rows = [...doc.querySelectorAll("tr")];
  const updates = new Map();

  rows.forEach((row) => {
    const link = row.querySelector('a[href*="/tools/trade/?name="]');
    const sparkNode = row.querySelector(".inlinesparkline");
    const priceCell = row.querySelector("td.ta-right.nw");
    if (!link || !sparkNode || !priceCell) return;

    const url = new URL(link.getAttribute("href"), sflWorldUrl);
    const marketName = url.searchParams.get("name");
    const price = Number(priceCell.textContent.replace(/[^0-9.]/g, ""));
    const spark = sparkNode.textContent
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value));

    if (marketName && Number.isFinite(price) && spark.length > 1) {
      updates.set(getMarketKey(marketName), normalizeMarketUpdate({
        name: marketName,
        id: slugifyItemName(marketName),
        marketName,
        esName: itemTranslations[marketName] || marketName,
        icon: getSflWorldImage(marketName),
        tradeUrl: url.href,
        price,
        spark,
        trend: calculateTrend(spark)
      }));
    }
  });

  return updates;
}

function textFromHtml(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function numberFromHtml(value = "") {
  const match = textFromHtml(value).match(/-?[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?/);
  return match ? Number(match[0].replace(/,/g, "")) : null;
}

function parseFarmInfoHtml(html, farmId) {
  const pickValue = (label) => {
    const pattern = new RegExp(`<td class="ta-left">${label}<\\/td><td class="ta-left">([\\s\\S]*?)<\\/td>`, "i");
    return textFromHtml(html.match(pattern)?.[1] || "");
  };
  const pickBalance = (label) => {
    const pattern = new RegExp(`<b>([0-9,.]+)<\\/b>\\s*<small>${label}<\\/small>`, "i");
    const match = html.match(pattern);
    return match ? Number(match[1].replace(/,/g, "")) : null;
  };

  return {
    source: "SFL World public farm",
    farm: {
      id: farmId,
      name: textFromHtml(html.match(/<td colspan="2" class="ta-left h4">[\s\S]*?<b>([^<]+)<\/b>/)?.[1] || `Farm #${farmId}`),
      level: numberFromHtml(pickValue("Bumpkin level")),
      expansion: numberFromHtml(pickValue("Expansion No")),
      island: pickValue("Island"),
      biome: pickValue("Biome"),
      faction: pickValue("Faction"),
      balances: {
        coins: pickBalance("Coins"),
        flower: pickBalance("Flower"),
        gem: pickBalance("Gem"),
        marks: pickBalance("Marks")
      }
    }
  };
}

function parsePublicStockHtml(html) {
  const rows = html.match(/<tr onclick="toggleSource[\s\S]*?<\/tr>/g) || [];
  return rows.reduce((stock, row) => {
    const name = textFromHtml(row.match(/toggleSource\([0-9]+,&quot;([^&]+)&quot;\)/)?.[1] || "");
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => textFromHtml(match[1]));
    const amount = Number(cells.find((cell, index) => index > 1 && /^-?[0-9]+(?:\.[0-9]+)?$/.test(cell)));

    if (name && Number.isFinite(amount)) stock[name] = amount;
    return stock;
  }, {});
}

function parsePublicAnimalsHtml(html) {
  const rows = html.match(/<tr onclick="\$\(&quot;#[\s\S]*?<\/tr>/g) || [];

  return rows
    .map((row) => {
      const image = row.match(/<img src="([^"]*(?:\/img\/animals\/|\/game-assets\/animals\/)[^"]+)"[^>]*title="([^"]+)"/);
      if (!image || !row.includes("Level")) return null;

      const status = textFromHtml(row.match(/<div class="badge[^"]*">([\s\S]*?)<\/div>/)?.[1] || "");
      const level = numberFromHtml(row.match(/Level\s*<b>([^<]+)<\/b>/)?.[1] || "");
      const age = textFromHtml(row.match(/Age\s*<b>([^<]+)<\/b>/)?.[1] || "");
      const exp = numberFromHtml(row.match(/Exp\s*<b>([^<]+)<\/b>/)?.[1] || "");
      const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => textFromHtml(match[1]));

      return {
        type: image[2],
        image: image[1].startsWith("http") ? image[1] : `${sflWorldUrl.replace(/\/$/, "")}${image[1]}`,
        status,
        level,
        age,
        exp,
        ready: cells.at(-1) || ""
      };
    })
    .filter(Boolean);
}

async function fetchTextWithFallback(url) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
  } catch (directError) {
    const response = await fetch(`${corsProxyUrl}${encodeURIComponent(url)}`, { cache: "no-store" });
    if (!response.ok) throw directError;
    return response.text();
  }
}

async function loadFlowerUsdPrice() {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${flowerCoinGeckoId}&vs_currencies=usd&include_24hr_change=true`;

  try {
    let response;
    try {
      response = await fetch(`${localApiBase}/api/flower`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Local API HTTP ${response.status}`);
    } catch {
      response = await fetch(url, { cache: "no-store" });
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const price = Number(data?.[flowerCoinGeckoId]?.usd);
    const change = Number(data?.[flowerCoinGeckoId]?.usd_24h_change);
    if (!Number.isFinite(price)) throw new Error("Missing FLOWER price");

    flowerUsd = price;
    if (Number.isFinite(change)) flowerUsdChange = change;
    flowerUsdPrice.textContent = `$${price.toFixed(4)} ${flowerUsdChange >= 0 ? "+" : ""}${flowerUsdChange.toFixed(1)}%`;
    if (homeFlowerUsdPrice) homeFlowerUsdPrice.textContent = flowerUsdPrice.textContent;
  } catch {
    flowerUsdPrice.textContent = `$${flowerUsd.toFixed(4)} ${flowerUsdChange >= 0 ? "+" : ""}${flowerUsdChange.toFixed(1)}%`;
    if (homeFlowerUsdPrice) homeFlowerUsdPrice.textContent = flowerUsdPrice.textContent;
  }
}

async function loadRealMarketPrices() {
  marketStatus.textContent = t("Cargando precios reales...", "Loading real prices...");

  try {
    let updates;
    let source = "SFL World";

    try {
      const response = await fetch(`${localApiBase}/api/market`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Local API HTTP ${response.status}`);
      const data = await response.json();
      updates = new Map(data.items.map((item) => {
        const normalized = normalizeMarketUpdate({
          id: slugifyItemName(item.name),
          name: item.name,
          marketName: item.name,
          esName: itemTranslations[item.name] || item.name,
          icon: getSflWorldImage(item.name),
          tradeUrl: item.tradeUrl,
          price: item.price,
          spark: item.spark,
          trend: item.trend
        });
        return [getMarketKey(normalized.marketName || normalized.name), normalized];
      }));
      source = data.source || "SFL World";
    } catch {
      const html = await fetchTextWithFallback(sflWorldUrl);
      updates = parseSflWorldPrices(html);
    }

    let applied = 0;
    const nextItems = [];

    updates.forEach((update) => {
      if (!isVisibleMarketItem(update)) return;
      const existing = findMarketItemByName(update.marketName || update.name);
      nextItems.push({
        ...(existing || {}),
        ...update,
        id: existing?.id || update.id,
        esName: existing?.esName || update.esName,
        icon: update.icon || existing?.icon || getSflWorldImage(update.name)
      });
      applied += 1;
    });

    marketItems.forEach((item) => {
      if (!isVisibleMarketItem(item)) return;
      if (nextItems.some((entry) => entry.id === item.id)) return;
      nextItems.push(item);
    });

    if (!applied) throw new Error("No market rows matched");

    marketItems.splice(0, marketItems.length, ...nextItems);

    marketSource.textContent = source;
    marketStatus.textContent = t(
      `${applied} precios reales cargados. Actualiza para refrescar.`,
      `${applied} real prices loaded. Refresh to update.`
    );
    lastUpdated.textContent = t("SFL World actualizado", "SFL World updated");
  } catch {
    marketSource.textContent = t("Fallback local", "Local fallback");
    marketStatus.textContent = t(
      "No se pudo leer SFL World desde este navegador. Se usan ultimos precios semilla.",
      "Could not read SFL World from this browser. Using seeded latest prices."
    );
    lastUpdated.textContent = t("Precios fallback", "Fallback prices");
  }

  renderMarket();
  renderSummary();
  checkPriceAlerts();
}

function saveFarmSession() {
  localStorage.setItem("sflMarketFarm", JSON.stringify({
    farmId: state.farmId,
    farmName: state.farmName,
    farmSource: state.farmSource,
    farmStats: state.farmStats,
    farmBalances: state.farmBalances,
    farmStock: state.farmStock,
    farmAnimals: state.farmAnimals,
    farmBumpkin: state.farmBumpkin,
    farmUpdatedAt: state.farmUpdatedAt,
    farmSocialPoints: state.farmSocialPoints,
    farmLevel: state.farmLevel,
    farmExpansion: state.farmExpansion,
    farmIsland: state.farmIsland,
    farmFaction: state.farmFaction,
    farmVip: state.farmVip,
    farmVerified: state.farmVerified,
    profileName: state.profileName,
    profileBio: state.profileBio,
    profileAvatar: state.profileAvatar,
    profileBanner: state.profileBanner,
    profileBannerImage: state.profileBannerImage,
    balance: state.balance,
    inventory: state.inventory
  }));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

async function compressBannerFile(file) {
  const original = await readFileAsDataUrl(file);
  if (!/^image\//.test(file.type || "")) return original;

  try {
    const image = new Image();
    image.decoding = "async";
    image.src = original;
    await image.decode();

    const maxWidth = 1200;
    const scale = Math.min(1, maxWidth / Math.max(image.naturalWidth || 1, 1));
    const width = Math.max(1, Math.round((image.naturalWidth || 1) * scale));
    const height = Math.max(1, Math.round((image.naturalHeight || 1) * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.78);
  } catch {
    return original;
  }
}

function loadFarmSession() {
  const saved = localStorage.getItem("sflMarketFarm");
  if (!saved) return false;

  try {
    const session = JSON.parse(saved);
    state.farmId = session.farmId || "";
    state.farmName = session.farmName || "Granja conectada";
    state.farmSource = session.farmSource || "Sesion guardada";
    state.farmStats = session.farmStats || "";
    state.farmBalances = session.farmBalances || {};
    state.farmStock = session.farmStock || {};
    state.farmAnimals = session.farmAnimals || [];
    state.farmBumpkin = session.farmBumpkin || null;
    state.farmUpdatedAt = session.farmUpdatedAt || "";
    state.farmSocialPoints = session.farmSocialPoints || 0;
    state.farmLevel = session.farmLevel || "";
    state.farmExpansion = session.farmExpansion || "";
    state.farmIsland = session.farmIsland || "";
    state.farmFaction = session.farmFaction || "";
    state.farmVip = Boolean(session.farmVip);
    state.farmVerified = Boolean(session.farmVerified);
    state.profileName = session.profileName || localStorage.getItem("sflProfileName") || "";
    state.profileBio = session.profileBio || localStorage.getItem("sflProfileBio") || "";
    state.profileAvatar = session.profileAvatar || localStorage.getItem("sflProfileAvatar") || state.profileAvatar;
    state.profileBanner = session.profileBanner || localStorage.getItem("sflProfileBanner") || state.profileBanner;
    state.profileBannerImage = session.profileBannerImage || localStorage.getItem("sflProfileBannerImage") || state.profileBannerImage;
    state.balance = Number(session.balance) || 0;
    state.inventory = { ...state.inventory, ...(session.inventory || {}) };
    balanceInput.value = state.balance;
    return Boolean(state.farmId);
  } catch {
    localStorage.removeItem("sflMarketFarm");
    return false;
  }
}

function setGateVisible(visible) {
  farmGate.classList.toggle("hidden", !visible);
}

function renderFarmProfile() {
  farmProfileName.textContent = state.farmName;
  farmProfileMeta.textContent = state.farmId
    ? `Farm ID ${state.farmId} - ${state.farmSource}${state.farmUpdatedAt ? ` - ${t("Consultado", "Checked")} ${relativeTimeLabel(state.farmUpdatedAt)}` : ""}`
    : t("Agrega tu Farm ID al entrar.", "Add your Farm ID when entering.");
  farmProfileStats.textContent = state.farmStats || t("Inventario editable", "Editable inventory");
  farmProfileBalances.innerHTML = Object.entries(state.farmBalances || {})
    .filter(([, value]) => Number.isFinite(Number(value)))
    .map(([label, value]) => `<b>${label}: ${formatCompactNumber(Number(value))}</b>`)
    .join("");
  syncFarmBtn.disabled = !state.farmId || state.farmId === "demo";
  renderFarmDashboard();
  renderCommunityConnectedFarm();
  renderHomeDashboard();
}

function renderHomeDashboard() {
  if (!homeBalance) return;
  const balances = Object.entries(state.farmBalances || {})
    .filter(([, value]) => Number.isFinite(Number(value)));
  homeBalance.textContent = formatFlower(Number(state.balance) || 0, true);
  homeBalanceHint.textContent = state.farmId
    ? t("Balance leido desde los datos publicos disponibles.", "Balance read from available public data.")
    : t("Conecta tu granja para ver tu balance publico.", "Connect your farm to see your public balance.");
  homeFarmName.textContent = state.farmName;
  homeFarmMeta.textContent = state.farmId
    ? `Farm ID ${state.farmId}${state.farmUpdatedAt ? ` - ${t("Consultado", "Checked")} ${relativeTimeLabel(state.farmUpdatedAt)}` : ""}`
    : t("Agrega tu Farm ID al entrar.", "Add your Farm ID when entering.");
  homeFarmStats.textContent = state.farmStats || t("Inventario editable", "Editable inventory");
  homeFarmBalances.innerHTML = balances
    .map(([label, value]) => `<b>${label}: ${formatCompactNumber(Number(value))}</b>`)
    .join("");
  if (homeFlowerUsdPrice && flowerUsdPrice) homeFlowerUsdPrice.textContent = flowerUsdPrice.textContent;
  renderHomeMarketSummary();
}

function renderFarmDashboard() {
  const displayName = state.profileName || state.farmName;
  farmDashboardName.textContent = displayName;
  const avatar = getProfileAvatar();
  farmHeroAvatar.src = avatar.src;
  const farmHero = document.querySelector(".farm-hero");
  farmHero.className = `farm-hero ${state.profileBannerImage ? "custom-banner" : `banner-${state.profileBanner}`}`;
  farmHero.style.setProperty("--profile-banner-image", state.profileBannerImage ? `url("${state.profileBannerImage}")` : "none");
  communityComposerAvatar.src = avatar.src;
  farmDashboardLabel.textContent = state.farmId ? `Farm ID ${state.farmId}` : "Farm ID";
  const heroMeta = [
    state.farmLevel ? `Lv ${state.farmLevel}` : "",
    state.farmIsland || state.farmStats || ""
  ].filter(Boolean).join(" - ");
  farmDashboardMeta.textContent = state.farmId
    ? [heroMeta || state.farmSource, state.farmUpdatedAt ? `${t("Consultado", "Checked")} ${relativeTimeLabel(state.farmUpdatedAt)}` : ""].filter(Boolean).join(" - ")
    : t("Conecta tu granja para ver datos publicos.", "Connect your farm to see public data.");
  profileDisplayName.value = state.profileName || state.farmName || "";
  profileBio.value = state.profileBio || "";
  profileBioPreview.textContent = state.profileBio || t("Sin mensaje publico todavia.", "No public message yet.");
  farmProfileBadge.textContent = state.farmId && state.farmId !== "demo" ? `ID ${state.farmId}` : t("Local", "Local");
  renderProfilePickers();

  const balances = Object.entries(state.farmBalances || {})
    .filter(([, value]) => Number.isFinite(Number(value)));
  const balanceLookup = Object.fromEntries(balances.map(([label, value]) => [label.toLowerCase(), Number(value)]));
  const statCards = [
    { icon: "https://sfl.world/img/flower.png", fallback: "F", label: "Flower", value: balanceLookup.flower ?? state.balance },
    { icon: "https://sfl.world/img/gem.png", fallback: "G", label: "Gems", value: balanceLookup.gems ?? balanceLookup.gem ?? 0 },
    { icon: "https://sfl.world/img/mark.png", fallback: "M", label: "Marks", value: balanceLookup.marks ?? balanceLookup.mark ?? 0 },
    { icon: "", fallback: "S", label: "Social", value: state.farmSocialPoints || 0 }
  ];
  farmBalanceGrid.innerHTML = statCards.map((card) => `
    <article>
      <em>${card.icon ? `<img src="${card.icon}" alt="${card.label}" onerror="this.replaceWith(document.createTextNode('${card.fallback}'))">` : card.fallback}</em>
      <span>${card.label}</span>
      <strong>${formatCompactNumber(Number(card.value) || 0)}</strong>
    </article>
  `).join("");

  const profileRows = [
    ["S", "Social", state.farmSocialPoints ? `${formatCompactNumber(state.farmSocialPoints)} pts` : ""],
    ["Lv", t("Nivel", "Level"), state.farmLevel ? state.farmLevel : ""],
    ["Ex", t("Expansion", "Expansion"), state.farmExpansion ? state.farmExpansion : ""],
    ["Is", t("Isla", "Island"), state.farmIsland || ""],
    ["Fa", t("Faccion", "Faction"), state.farmFaction || ""],
    ["VIP", "VIP", state.farmVip ? t("Activo", "Active") : ""],
    ["OK", t("Verificado", "Verified"), state.farmVerified ? t("Si", "Yes") : ""]
  ].filter(([, , value]) => value);
  profileStatus.innerHTML = profileRows.length
    ? profileRows.map(([icon, label, value]) => `<article><em>${icon}</em><b>${label}</b><span>${value}</span></article>`).join("")
    : t("Pulsa Sync para cargar el perfil publico.", "Tap Sync to load the public profile.");
  renderFarmActivity();

  const animals = state.farmAnimals || [];
  const animalTypes = animals.reduce((counts, animal) => {
    counts[animal.type] = (counts[animal.type] || 0) + 1;
    return counts;
  }, {});
  farmAnimalCount.textContent = Object.entries(animalTypes)
    .map(([type, amount]) => `${amount} ${type}`)
    .join(" / ") || "0";
  farmAnimalList.innerHTML = animals.length
    ? animals.slice(0, 18).map((animal) => {
        const wakeLabel = animalWakeLabel(animal);
        return `
        <article class="animal-wake-card">
          <img src="${animal.image}" alt="${animal.type}">
          <div>
            <strong>${animal.type}</strong>
            <span>${t("Nivel", "Level")} ${animal.level || "-"} - ${animal.status || t("Sin estado", "No status")}</span>
          </div>
          <small>${wakeLabel}</small>
        </article>
      `;
      }).join("")
    : `<p class="empty-state">${t("Aun no hay datos publicos de animales. Pulsa Sync para intentar actualizar.", "No public animal data yet. Tap Sync to try refreshing.")}</p>`;

  farmDashboardSync.disabled = !state.farmId || state.farmId === "demo";
}

function getVisitedFarms() {
  try {
    return JSON.parse(localStorage.getItem("sflVisitedFarms") || "[]");
  } catch {
    return [];
  }
}

function renderFarmActivity() {
  const ownPost = getOwnCommunityPost();
  const likesReceived = Math.max(
    Number(ownPost?.likes) || 0,
    Array.isArray(ownPost?.likedBy) ? ownPost.likedBy.length : 0
  );
  const clientId = getCommunityClientId();
  const helpsCompleted = state.communityPosts.filter((post) => (
    Array.isArray(post.cleanedBy) && post.cleanedBy.includes(clientId)
  )).length;
  const farmsVisited = getVisitedFarms().length;

  const activityCards = [
    { icon: "L", label: t("Likes recibidos", "Likes received"), value: likesReceived },
    { icon: "V", label: t("Granjas visitadas", "Farms visited"), value: farmsVisited },
    { icon: "C", label: t("Ayudas completadas", "Helps completed"), value: helpsCompleted }
  ];

  farmActivityGrid.innerHTML = activityCards.map((card) => `
    <article>
      <em>${card.icon}</em>
      <span>${card.label}</span>
      <strong>${formatCompactNumber(Number(card.value) || 0)}</strong>
    </article>
  `).join("");
}

function getCommunityClientId() {
  if (state.farmId && state.farmId !== "demo") {
    return `farm:${state.farmId}`;
  }
  let clientId = localStorage.getItem("sflCommunityClientId");
  if (!clientId) {
    clientId = `guest:${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("sflCommunityClientId", clientId);
  }
  return clientId;
}

function getAppVisitorId() {
  let visitorId = localStorage.getItem("sflAppVisitorId");
  if (!visitorId) {
    visitorId = `visitor:${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("sflAppVisitorId", visitorId);
  }
  return visitorId;
}

function renderAppVisitStats(stats = {}) {
  if (!appVisitsToday || !appVisitsTotal) return;
  appVisitsToday.textContent = formatCompactNumber(Number(stats.today) || 0);
  appVisitsTotal.textContent = formatCompactNumber(Number(stats.total) || 0);
}

async function trackAppVisit() {
  try {
    const response = await fetch(`${localApiBase}/api/analytics/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId: getAppVisitorId() })
    });
    if (!response.ok) throw new Error("Analytics API failed");
    renderAppVisitStats(await response.json());
  } catch {
    renderAppVisitStats({});
  }
}

function getCleanCount(post) {
  const cleanedByCount = Array.isArray(post.cleanedBy) ? post.cleanedBy.length : 0;
  return Math.min(6, Math.max(Number(post.cleanCount) || 0, cleanedByCount));
}

function hasCleanedPost(post) {
  return Array.isArray(post.cleanedBy) && post.cleanedBy.includes(getCommunityClientId());
}

function hasLikedPost(post) {
  return Array.isArray(post.likedBy) && post.likedBy.includes(getCommunityClientId());
}

function animalWakeLabel(animal) {
  const raw = [animal.ready, animal.status, animal.age].filter(Boolean).join(" - ");
  if (!raw) return t("Sin dato publico", "No public time");
  if (/ready|awake|despierto|listo/i.test(raw)) return t("Listo ahora", "Ready now");
  return raw;
}

function getProfileAvatar(id = state.profileAvatar) {
  return profileAvatars.find((avatar) => avatar.id === id) || profileAvatars[0];
}

function normalizeProfileAvatarId(value = "") {
  const raw = String(value || "");
  const byId = profileAvatars.find((avatar) => avatar.id === raw);
  if (byId) return byId.id;
  const bySrc = profileAvatars.find((avatar) => decodeURIComponent(avatar.src).toLowerCase() === decodeURIComponent(raw).toLowerCase());
  return bySrc?.id || state.profileAvatar || profileAvatars[0].id;
}

function getBannerForAvatarSrc(src = "") {
  const normalized = decodeURIComponent(String(src)).toLowerCase();
  const match = profileAvatars.find((avatar) => decodeURIComponent(avatar.src).toLowerCase() === normalized);
  return match?.banner || profileAvatars[0].banner;
}

function renderProfilePickers() {
  profileAvatarPicker.innerHTML = profileAvatars.map((avatar) => `
    <button type="button" class="${state.profileAvatar === avatar.id ? "active" : ""}" data-avatar-id="${avatar.id}" title="${avatar.label}">
      <img src="${avatar.src}" alt="${avatar.label}">
    </button>
  `).join("");
}

function renderCommunityConnectedFarm() {
  const connected = state.farmId && state.farmId !== "demo";
  communityConnectedName.textContent = connected
    ? `${state.farmName || `Farm #${state.farmId}`} - Farm ID ${state.farmId}`
    : t("Conecta tu Farm ID para publicar.", "Connect your Farm ID to post.");
  useMyFarmBtn.textContent = connected ? t("ID conectado", "ID connected") : t("Conectar ID", "Connect ID");
}

function getOwnCommunityPost() {
  if (!state.farmId || state.farmId === "demo") return null;
  return state.communityPosts.find((post) => isOwnCommunityFarm(post)) || null;
}

function isOwnCommunityFarm(post) {
  if (!post || !state.farmId || state.farmId === "demo") return false;
  return String(post.farmId || "") === String(state.farmId || "");
}

function renderCommunityComposer() {
  const ownPost = getOwnCommunityPost();
  const showForm = !ownPost || state.communityEditing;
  communityForm.classList.add("hidden");
  ownCommunityPost.classList.add("hidden");
  ownCommunityPost.innerHTML = "";

  if (!ownPost || state.communityEditing) {
    document.querySelector("#publishCommunityBtn").textContent = ownPost
      ? t("Guardar publicacion", "Save post")
      : t("Publicar", "Post");
    return;
  }
}

function renderCommunityPosts() {
  communityList.innerHTML = state.communityPosts.length
    ? state.communityPosts.map((post) => {
        const cleanCount = getCleanCount(post);
        const cleanProgress = Math.round((cleanCount / 6) * 100);
        const isOwnFarm = isOwnCommunityFarm(post);
        const cleaned = hasCleanedPost(post);
        const liked = hasLikedPost(post);
        const likes = Math.max(Number(post.likes) || 0, Array.isArray(post.likedBy) ? post.likedBy.length : 0);
        const isFull = cleanCount >= 6;
        const buttonLabel = isFull
          ? t("Completo", "Full")
          : cleaned
            ? t("Ya limpiada", "Cleaned")
            : isOwnFarm
              ? t("Tu granja", "Your farm")
              : t("Marcar limpieza", "Mark cleaned");
        return `
        <article class="community-post ${isFull ? "is-complete" : ""}">
          <div class="community-post-main">
            <span>${needLabel(post.need)} - ${relativeTimeLabel(post.createdAt)}</span>
            <strong>${post.nickname || `Farm #${post.farmId}`}</strong>
            <p>${post.message || t("Disponible para visitas.", "Open for visits.")}</p>
          </div>
          <div class="community-actions">
            <code>${post.farmId}</code>
            <button type="button" class="like-btn ${liked ? "liked" : ""}" data-like-post="${post.id}">${liked ? "♥" : "♡"} ${likes}</button>
            <a href="${post.visitUrl}" target="_blank" rel="noreferrer">${t("Visitar", "Visit")}</a>
          </div>
          <div class="community-clean">
            <div class="clean-meter" aria-label="${cleanCount}/6"><span style="--clean-progress:${cleanProgress}%"></span></div>
            <strong class="clean-count">${cleanCount}/6</strong>
            <button type="button" data-clean-post="${post.id}" ${isFull || cleaned || isOwnFarm ? "disabled" : ""}>${buttonLabel}</button>
          </div>
        </article>
      `;
      }).join("")
    : `<p class="empty-state">${t("Todavia no hay granjas publicadas.", "No farms posted yet.")}</p>`;
}

function renderCommunityPostsRich() {
  communityList.innerHTML = state.communityPosts.length
    ? state.communityPosts.map((post) => {
        const cleanCount = getCleanCount(post);
        const cleanProgress = Math.round((cleanCount / 6) * 100);
        const isOwnFarm = isOwnCommunityFarm(post);
        const cleaned = hasCleanedPost(post);
        const liked = hasLikedPost(post);
        const likes = Math.max(Number(post.likes) || 0, Array.isArray(post.likedBy) ? post.likedBy.length : 0);
        const isFull = cleanCount >= 6;
        const buttonLabel = isFull
          ? t("Completo", "Full")
          : cleaned
            ? t("Ya limpiada", "Cleaned")
            : isOwnFarm
              ? t("Tu granja", "Your farm")
              : t("Marcar limpieza", "Mark cleaned");
        const avatar = post.avatar || getProfileAvatar("farmer-h").src;
        const banner = post.banner || "night";
        const bannerStyle = post.bannerImage ? ` style="--post-banner-image:url('${post.bannerImage}')" ` : "";
        const level = post.level || "?";
        const views = Math.max(Number(post.visits) || 0, Array.isArray(post.visitedBy) ? post.visitedBy.length : 0);
        const islandLine = [post.island || t("Isla desconocida", "Unknown island"), post.faction || ""]
          .filter(Boolean)
          .join(" - ");
        return `
        <article class="community-post community-profile-card banner-${banner} ${isFull ? "is-complete" : ""}">
          <img class="community-avatar" src="${avatar}" alt="${post.nickname || `Farm #${post.farmId}`}">
          <div class="community-post-main">
            <span>${relativeTimeLabel(post.createdAt)}</span>
            <strong>${post.nickname || `Farm #${post.farmId}`} <b class="verified-dot"></b></strong>
            <small>${islandLine}</small>
            <p>${post.message || t("Disponible para visitas.", "Open for visits.")}</p>
          </div>
          <div class="level-pill">Lv ${level}</div>
          <div class="community-clean-label">${t("Limpiezas de hoy", "Today cleanings")}</div>
          <div class="community-clean">
            <div class="clean-meter" aria-label="${cleanCount}/6"><span style="--clean-progress:${cleanProgress}%"></span></div>
            <strong class="clean-count">${cleanCount}/6</strong>
            <button type="button" data-clean-post="${post.id}" ${isFull || cleaned || isOwnFarm ? "disabled" : ""}>${buttonLabel}</button>
          </div>
          <div class="community-actions">
            <button type="button" class="like-btn ${liked ? "liked" : ""}" data-like-post="${post.id}">${liked ? "&hearts;" : "&#9825;"} ${likes}</button>
            <span class="visit-count">${views} ${t("visitas", "visits")}</span>
            <code>${post.farmId}</code>
            <a href="${post.visitUrl}" target="_blank" rel="noreferrer">${t("Visitar granja", "Visit farm")}</a>
          </div>
        </article>
      `;
      }).join("")
    : `<p class="empty-state">${t("Todavia no hay granjas publicadas.", "No farms posted yet.")}</p>`;
}

renderCommunityPosts = renderCommunityPostsRich;

function renderCommunityPostsSocial() {
  renderCommunityComposer();
  communityList.innerHTML = state.communityPosts.length
    ? state.communityPosts.map((post) => {
      try {
        const cleanCount = getCleanCount(post);
        const cleanProgress = Math.round((cleanCount / 6) * 100);
        const isOwnFarm = isOwnCommunityFarm(post);
        const cleaned = hasCleanedPost(post);
        const liked = hasLikedPost(post);
        const likes = Math.max(Number(post.likes) || 0, Array.isArray(post.likedBy) ? post.likedBy.length : 0);
        const isFull = cleanCount >= 6;
        const avatar = post.avatar || getProfileAvatar("farmer-h").src;
        const avatarBanner = post.bannerImage || getBannerForAvatarSrc(avatar);
        const bannerImage = String(avatarBanner || "").replace(/"/g, "%22");
        const bannerStyle = bannerImage ? `style="--post-banner-image:url(&quot;${bannerImage}&quot;)"` : "";
        const level = post.level || "?";
        const views = Math.max(Number(post.visits) || 0, Array.isArray(post.visitedBy) ? post.visitedBy.length : 0);
        const islandLine = [post.island || t("Isla desconocida", "Unknown island"), post.faction || ""]
          .filter(Boolean)
          .join(" - ");
        return `
        <article class="community-social-card custom-post-banner ${isFull ? "is-complete" : ""} ${isOwnFarm ? "is-own-post" : ""}" data-farm-id="${post.farmId}" ${bannerStyle}>
          <div class="community-card-main">
            <div class="community-avatar-banner">
              <button class="profile-open-btn avatar-open-btn" type="button" data-open-profile="${post.id}" aria-label="${t("Abrir perfil", "Open profile")}">
                <img class="community-avatar" src="${avatar}" alt="${post.nickname || `Farm #${post.farmId}`}">
              </button>
            </div>
            <div class="community-card-content">
              <div class="community-card-topline">
                <span class="inline-level-pill">Lv ${level}</span>
                <button class="profile-name-btn" type="button" data-open-profile="${post.id}">${post.nickname || `Farm #${post.farmId}`}</button>
                <span>${relativeTimeLabel(post.createdAt)}</span>
              </div>
              <p class="player-meta">${islandLine}</p>
              <div class="community-message">
                <p>${post.message || t("Gracias por ayudar a limpiar mi granja.", "Thanks for helping clean my farm.")}</p>
              </div>
              <div class="social-clean">
                <span>${t("Limpiezas de hoy", "Today cleanings")}</span>
                <div class="clean-meter" aria-label="${cleanCount}/6"><span style="--clean-progress:${cleanProgress}%"></span></div>
                <strong>${cleanCount}/6</strong>
              </div>
            </div>
          </div>
          <div class="community-card-footer">
            <button class="like-stat ${liked ? "liked" : ""}" type="button" data-like-post="${post.id}">&hearts; ${likes}</button>
            <span class="visit-count">${views} ${t("visitas", "visits")}</span>
            ${isOwnFarm ? `
              <div class="own-inline-actions">
                <button type="button" data-edit-own-post>${t("Editar", "Edit")}</button>
                <button type="button" data-delete-own-post>${t("Eliminar", "Delete")}</button>
              </div>
            ` : `<a class="visit-farm-btn" href="${post.visitUrl}" target="_blank" rel="noreferrer" data-clean-post="${post.id}" ${isFull || cleaned ? "" : `data-auto-clean="true"`}>${t("Visitar granja", "Visit farm")}</a>`}
          </div>
        </article>
      `;
      } catch (error) {
        console.warn("No se pudo renderizar una publicacion", error, post);
        return "";
      }
      }).join("")
    : `<p class="empty-state">${t("Todavia no hay granjas publicadas.", "No farms posted yet.")}</p>`;
}

renderCommunityPosts = renderCommunityPostsSocial;

function openPublicProfile(postId) {
  const post = state.communityPosts.find((entry) => entry.id === postId);
  if (!post) return;
  incrementCommunityPostVisit(postId);

  const cleanCount = getCleanCount(post);
  const likes = Math.max(Number(post.likes) || 0, Array.isArray(post.likedBy) ? post.likedBy.length : 0);
  const avatar = post.avatar || getProfileAvatar("farmer-h").src;
  const banner = post.banner || "night";
  const avatarBanner = post.bannerImage || getBannerForAvatarSrc(avatar);
  const island = post.island || t("Isla desconocida", "Unknown island");
  const level = post.level || "?";

  publicProfileCard.className = `public-profile-card ${avatarBanner ? "custom-post-banner" : `banner-${banner}`}`;
  publicProfileCard.style.setProperty("--post-banner-image", avatarBanner ? `url("${avatarBanner}")` : "none");
  publicProfileBanner.className = `public-profile-banner ${avatarBanner ? "custom-post-banner" : `banner-${banner}`}`;
  publicProfileBanner.style.setProperty("--post-banner-image", avatarBanner ? `url("${avatarBanner}")` : "none");
  publicProfileAvatar.src = avatar;
  publicProfileName.textContent = post.nickname || `Farm #${post.farmId}`;
  publicProfileMeta.textContent = `Farm ID ${post.farmId} - Lv ${level} - ${island}`;
  publicProfileMessage.textContent = post.message || t("Gracias por ayudar a limpiar mi granja.", "Thanks for helping clean my farm.");
  publicProfileLikes.textContent = formatCompactNumber(likes);
  publicProfileCleans.textContent = `${cleanCount}/6`;
  publicProfileVisit.href = post.visitUrl || `https://sunflower-land.com/play/#/visit/${post.farmId}`;
  publicProfileVisit.textContent = t("Visitar granja", "Visit farm");
  publicProfileModal.classList.remove("hidden");
}

function closePublicProfileModal() {
  publicProfileModal.classList.add("hidden");
}

function renderNftMarket() {
  const term = state.nftSearch.toLowerCase();
  const items = state.nftItems
    .filter((item) => {
      if (state.nftType === "effects") return item.hasEffect || item.boost;
      return state.nftType === "all" || item.type === state.nftType;
    })
    .filter((item) => !term || `${item.name} ${item.tag} ${item.boost}`.toLowerCase().includes(term))
    .slice(0, 220);

  nftMarketList.innerHTML = items.length
    ? items.map((item) => `
      <article class="nft-market-row ${item.hasEffect || item.boost ? "has-effect" : ""}" data-asset-kind="nft" data-asset-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <span>${item.type === "wearable" ? "Wearable" : "Collectible"}${item.tag ? ` - ${item.tag}` : ""}</span>
          <strong>${item.name}</strong>
          <p>${item.boost || (item.tradable ? t("Tradable en market", "Tradable on market") : t("No tradable", "Not tradable"))}</p>
          <div class="nft-badges">
            <b class="${item.tradable ? "ok" : "bad"}">${item.tradable ? t("Tradable", "Tradable") : t("No tradable", "Not tradable")}</b>
            <b class="${item.withdrawable ? "ok" : "bad"}">${item.withdrawable ? t("Retirable", "Withdrawable") : t("No retirable", "Not withdrawable")}</b>
          </div>
        </div>
        <div class="nft-price-box">
          <strong>${Number.isFinite(item.flower) ? `${formatMarketNumber(item.flower)} F` : "-"}</strong>
          <span>${Number.isFinite(item.usd) ? `$${item.usd.toFixed(2)}` : ""}</span>
          ${getNftSparkline(item)}
          <a href="${item.game || item.opensea}" target="_blank" rel="noreferrer">${t("Ver", "View")}</a>
        </div>
      </article>
    `).join("")
    : `<p class="empty-state">${t("No hay NFTs para mostrar con ese filtro.", "No NFTs match that filter.")}</p>`;
}

async function loadNftMarket() {
  nftStatus.textContent = t("Cargando NFTs reales...", "Loading real NFTs...");
  refreshNftBtn.disabled = true;
  try {
    const response = await fetch(`${localApiBase}/api/nfts`, { cache: "no-store" });
    if (!response.ok) throw new Error("NFT API failed");
    const data = await response.json();
    state.nftItems = Array.isArray(data.items) ? data.items : [];
    nftSource.textContent = data.source || "SFL World";
    const effectCount = state.nftItems.filter((item) => item.hasEffect || item.boost).length;
    nftStatus.textContent = t(
      `${state.nftItems.length} NFTs con precio cargados; ${effectCount} con efecto.`,
      `${state.nftItems.length} priced NFTs loaded; ${effectCount} with effects.`
    );
  } catch {
    nftStatus.textContent = t("No pude cargar NFTs reales todavia.", "Could not load real NFTs yet.");
  } finally {
    refreshNftBtn.disabled = false;
    renderNftMarket();
    checkPriceAlerts();
  }
}

function getNftSparkline(item) {
  const base = Number(item.flower || item.usd || 1);
  const values = getSyntheticNftSeries(item);
  const points = sparklinePoints(values, 50, 30, 26, 20, 7);
  const trend = values.at(-1) >= values[0] ? "up" : "down";
  return `<svg class="nft-spark ${trend}" viewBox="0 0 50 30" aria-hidden="true"><polyline points="${points}"></polyline></svg>`;
}

function getSyntheticNftSeries(item) {
  const base = Number(item.flower || item.usd || 1);
  const seed = Array.from(item.name || "nft").reduce((total, char) => total + char.charCodeAt(0), 0);
  return Array.from({ length: 16 }, (_, index) => {
    const wave = Math.sin((seed + index * 17) / 11) * 0.08;
    const drift = ((seed % 9) - 4) * 0.006 * index;
    return Math.max(base * (1 + wave + drift), base * 0.55);
  });
}

function sparklinePoints(values, width = 56, height = 48, yBase = 42, yRange = 30, xStep = 9) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  return values.map((value, index) => {
    const x = index * xStep;
    const y = yBase - ((value - min) / Math.max(max - min, 0.000001)) * yRange;
    return `${x},${y}`;
  }).join(" ");
}

function getAssetByKey(kind, id) {
  if (kind === "resource") {
    const item = getItem(id);
    if (!item) return null;
    return {
      key: `${kind}:${id}`,
      kind,
      id,
      title: itemLabel(item),
      image: item.icon,
      price: item.price,
      meta: `${formatUsd(item.price)} - ${item.trend >= 0 ? "+" : ""}${item.trend.toFixed(2)}%`,
      series: item.spark,
      url: getSunflowerMarketUrl(item)
    };
  }

  const nft = state.nftItems.find((item) => item.id === id);
  if (!nft) return null;
  return {
    key: `${kind}:${id}`,
    kind,
    id,
    title: nft.name,
    image: nft.image,
    price: nft.flower,
    meta: `${nft.type === "wearable" ? "Wearable" : "Collectible"}${nft.tag ? ` - ${nft.tag}` : ""}`,
    series: getSyntheticNftSeries(nft),
    url: nft.game || nft.opensea
  };
}

const sunflowerMarketplaceIds = {
  Sunflower: 201,
  Potato: 202,
  Pumpkin: 203,
  Carrot: 204,
  Cabbage: 205,
  Beetroot: 206,
  Cauliflower: 207,
  Parsnip: 208,
  Radish: 209,
  Wheat: 210,
  Kale: 211,
  Apple: 212,
  Blueberry: 213,
  Orange: 214,
  Eggplant: 215,
  Corn: 216,
  Banana: 217,
  Soybean: 251,
  Grape: 252,
  Rice: 253,
  Olive: 254,
  Tomato: 255,
  Lemon: 256,
  Barley: 257,
  Rhubarb: 258,
  Zucchini: 259,
  Yam: 260,
  Broccoli: 261,
  Pepper: 262,
  Onion: 263,
  Turnip: 264,
  Artichoke: 265,
  Duskberry: 266,
  Lunara: 267,
  Celestine: 268,
  Wood: 601,
  Stone: 602,
  Iron: 603,
  "Iron Ore": 603,
  Gold: 604,
  "Gold Ore": 604,
  Egg: 605,
  Honey: 614,
  Leather: 641,
  Wool: 642,
  "Merino Wool": 643,
  Feather: 644,
  Milk: 645,
  Crimstone: 636,
  Obsidian: 663,
  Salt: 665,
  "Goblin Emblem": 741,
  "Bumpkin Emblem": 742,
  "Sunflorian Emblem": 743,
  "Nightshade Emblem": 744,
  Acorn: 2630,
  Ruffroot: 2631,
  "Chewed Bone": 2632,
  "Heart leaf": 2633,
  "Heart Leaf": 2633,
  Moonfur: 2634,
  Ribbon: 2636,
  "Wild Grass": 2638
};

function renderLargeChart(values) {
  const width = 300;
  const points = sparklinePoints(values, width, 130, 112, 92, values.length > 1 ? width / (values.length - 1) : 20);
  const trend = values.at(-1) >= values[0] ? "up" : "down";
  const circles = chartPointData(values).map((point) => `
    <circle cx="${point.x}" cy="${point.y}" r="5">
      <title>${point.label}: ${formatMarketNumber(point.value)} FLOWER</title>
    </circle>
  `).join("");
  return `<svg class="large-price-chart ${trend}" viewBox="0 0 310 130" role="img" aria-label="Precio ultimas 24 horas">
    <defs>
      <linearGradient id="detailChartFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="currentColor" stop-opacity="0.28"></stop>
        <stop offset="100%" stop-color="currentColor" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
    <text x="0" y="14">24h</text>
    <text x="250" y="124">Ahora</text>
    <polyline points="${points}"></polyline>
    <polygon points="0,126 ${points} 300,126" fill="url(#detailChartFill)"></polygon>
    ${circles}
  </svg>`;
}

function chartPointData(values) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const width = 300;
  return values.map((value, index) => {
    const x = values.length > 1 ? index * (width / (values.length - 1)) : 0;
    const y = 112 - ((value - min) / Math.max(max - min, 0.000001)) * 92;
    const hoursAgo = Math.round(24 - (index * 24) / Math.max(values.length - 1, 1));
    return {
      x,
      y,
      value,
      label: hoursAgo <= 0 ? t("Ahora", "Now") : t(`Hace ${hoursAgo}h`, `${hoursAgo}h ago`)
    };
  });
}

function getSunflowerMarketUrl(item) {
  if (item.game) return item.game;
  const name = item.marketName || item.name;
  const id = sunflowerMarketplaceIds[name];
  if (id) return `https://sunflower-land.com/play/#/marketplace/collectibles/${id}`;
  return "https://sunflower-land.com/play/#/marketplace";
}

function openAssetDetail(kind, id) {
  const asset = getAssetByKey(kind, id);
  if (!asset) return;
  state.selectedAsset = asset;
  assetDetailType.textContent = kind === "resource" ? t("Recurso", "Resource") : "NFT";
  assetDetailTitle.textContent = asset.title;
  assetDetailImage.src = asset.image;
  assetDetailImage.alt = asset.title;
  assetDetailPrice.textContent = `${formatMarketNumber(asset.price)} FLOWER`;
  assetDetailMeta.textContent = asset.meta;
  assetDetailChart.innerHTML = renderLargeChart(asset.series);
  assetMarketLink.href = asset.url;
  assetMarketLink.textContent = kind === "resource" ? t("Ver en Sunflower", "View in Sunflower") : t("Ver en market", "View market");
  const rule = state.alertRules[asset.key];
  assetAlertStatus.textContent = rule
    ? t(`Alerta activa: si ${rule.direction === "up" ? "sube" : "baja"} desde ${formatMarketNumber(rule.baseline)} F.`, `Alert active: if it goes ${rule.direction} from ${formatMarketNumber(rule.baseline)} F.`)
    : t("Selecciona una alerta para este precio.", "Choose an alert for this price.");
  assetDetailPanel.classList.remove("hidden");
}

function closeAssetPanel() {
  assetDetailPanel.classList.add("hidden");
}

async function saveAssetAlert(direction) {
  const asset = state.selectedAsset;
  if (!asset) return;
  if ("Notification" in window && Notification.permission === "default") {
    try { await Notification.requestPermission(); } catch {}
  }
  state.alertRules[asset.key] = {
    direction,
    baseline: asset.price,
    title: asset.title,
    kind: asset.kind,
    id: asset.id
  };
  localStorage.setItem("sflPriceAlerts", JSON.stringify(state.alertRules));
  assetAlertStatus.textContent = t(
    `Listo: te avisare si ${direction === "up" ? "sube" : "baja"} desde ${formatMarketNumber(asset.price)} F.`,
    `Done: I will alert you if it goes ${direction} from ${formatMarketNumber(asset.price)} F.`
  );
}

function notifyPriceAlert(rule, currentPrice) {
  const message = `${rule.title}: ${formatMarketNumber(rule.baseline)} F -> ${formatMarketNumber(currentPrice)} F`;
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("SFL Market", { body: message });
  } else {
    marketStatus.textContent = message;
    nftStatus.textContent = message;
  }
}

function checkPriceAlerts() {
  Object.entries(state.alertRules).forEach(([key, rule]) => {
    const asset = getAssetByKey(rule.kind, rule.id);
    if (!asset || !Number.isFinite(asset.price)) return;
    const triggered = rule.direction === "up"
      ? asset.price > rule.baseline
      : asset.price < rule.baseline;
    if (!triggered) return;
    notifyPriceAlert(rule, asset.price);
    delete state.alertRules[key];
    localStorage.setItem("sflPriceAlerts", JSON.stringify(state.alertRules));
  });
}

function updateBottomNavLabels() {
  document.querySelectorAll(".bottom-nav").forEach((nav) => {
    const labels = {
      home: t("Inicio", "Home"),
      market: "Market",
      farm: t("Mi Granja", "My Farm"),
      upgrades: "+",
      community: t("Comunidad", "Community"),
      settings: t("Ajustes", "Settings"),
      nfts: "NFT"
    };
    nav.querySelectorAll("[data-view]").forEach((button) => {
      const view = button.dataset.view;
      button.textContent = labels[view] || button.textContent;
    });
  });
}

async function loadCommunityPosts() {
  refreshCommunityBtn.disabled = true;
  try {
    const response = await fetch(`${localApiBase}/api/community`, { cache: "no-store" });
    if (!response.ok) throw new Error("Community API failed");
    const data = await response.json();
    state.communityPosts = Array.isArray(data.posts) ? data.posts : [];
    localStorage.setItem("sflCommunityPosts", JSON.stringify(state.communityPosts));
    communityStatus.textContent = t("Tablon actualizado.", "Board updated.");
  } catch {
    state.communityPosts = JSON.parse(localStorage.getItem("sflCommunityPosts") || "[]");
    communityStatus.textContent = t("Modo local: no pude leer el servidor.", "Local mode: could not read the server.");
  } finally {
    refreshCommunityBtn.disabled = false;
    renderCommunityPosts();
    renderFarmDashboard();
  }
}

async function publishCommunityPost(event) {
  event.preventDefault();
  const farmId = state.farmId && state.farmId !== "demo" ? state.farmId : "";
  if (!farmId) {
    communityStatus.textContent = t("Primero conecta tu Farm ID para publicar.", "Connect your Farm ID before posting.");
    setGateVisible(true);
    return;
  }

  const payload = {
    farmId,
    nickname: state.profileName || state.farmName || communityName.value.trim() || `Farm #${farmId}`,
    need: "clean",
    message: communityMessage.value.trim() || state.profileBio,
    avatar: getProfileAvatar().src,
    banner: state.profileBanner,
    bannerImage: state.profileBannerImage,
    island: state.farmIsland || state.farmStats || "",
    faction: state.farmFaction || "",
    level: Number(state.farmLevel) || null,
    visits: 0
  };

  communityStatus.textContent = t("Publicando...", "Posting...");
  try {
    const response = await fetch(`${localApiBase}/api/community`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    state.communityPosts = Array.isArray(data.posts) ? data.posts : [data.post, ...state.communityPosts].filter(Boolean);
    localStorage.setItem("sflCommunityPosts", JSON.stringify(state.communityPosts));
    communityMessage.value = "";
    state.communityEditing = false;
    communityForm.classList.add("hidden");
    communityStatus.textContent = t("Publicado. Otros granjeros ya pueden visitar tu ID.", "Posted. Other farmers can visit your ID now.");
  } catch (error) {
    const post = {
      id: `${Date.now()}`,
      ...payload,
      visitUrl: `https://sunflower-land.com/play/#/visit/${farmId}`,
      cleanCount: 0,
      cleanedBy: [],
      likes: 0,
      likedBy: [],
      capacity: 6,
      createdAt: new Date().toISOString()
    };
    state.communityPosts = [post, ...state.communityPosts.filter((entry) => entry.farmId !== farmId)].slice(0, 80);
    localStorage.setItem("sflCommunityPosts", JSON.stringify(state.communityPosts));
    state.communityEditing = false;
    communityForm.classList.add("hidden");
    communityStatus.textContent = t(
      `Publicado en modo local. Servidor: ${error.message || "sin detalle"}`,
      `Posted in local mode. Server: ${error.message || "no detail"}`
    );
  }
  renderCommunityPosts();
  renderFarmDashboard();
}

async function deleteOwnCommunityPost() {
  const ownPost = getOwnCommunityPost();
  if (!ownPost) return;

  communityStatus.textContent = t("Eliminando publicacion...", "Deleting post...");
  try {
    const response = await fetch(`${localApiBase}/api/community/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: ownPost.id, farmId: state.farmId })
    });
    if (!response.ok) throw new Error("Delete failed");
    const data = await response.json();
    state.communityPosts = Array.isArray(data.posts) ? data.posts : state.communityPosts.filter((post) => post.id !== ownPost.id);
    communityStatus.textContent = t("Publicacion eliminada.", "Post deleted.");
  } catch {
    state.communityPosts = state.communityPosts.filter((post) => post.id !== ownPost.id);
    communityStatus.textContent = t("Publicacion eliminada en modo local.", "Post deleted in local mode.");
  }
  state.communityEditing = false;
  localStorage.setItem("sflCommunityPosts", JSON.stringify(state.communityPosts));
  renderCommunityPosts();
  renderFarmDashboard();
}

function editOwnCommunityPost() {
  const ownPost = getOwnCommunityPost();
  if (!ownPost) return;
  state.communityEditing = true;
  communityMessage.value = ownPost.message || "";
  renderCommunityPosts();
  communityForm.classList.remove("hidden");
  communityMessage.focus();
}

async function markCommunityPostCleaned(postId) {
  const cleanerId = getCommunityClientId();
  const post = state.communityPosts.find((entry) => entry.id === postId);
  if (!post || isOwnCommunityFarm(post) || hasCleanedPost(post) || getCleanCount(post) >= 6) return;

  communityStatus.textContent = t("Marcando limpieza...", "Marking cleaning...");
  try {
    const response = await fetch(`${localApiBase}/api/community/clean`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, cleanerId })
    });
    if (!response.ok) throw new Error("Clean update failed");
    const data = await response.json();
    state.communityPosts = Array.isArray(data.posts) ? data.posts : state.communityPosts;
    localStorage.setItem("sflCommunityPosts", JSON.stringify(state.communityPosts));
    communityStatus.textContent = t("Limpieza marcada. Gracias por ayudar.", "Cleaning marked. Thanks for helping.");
  } catch {
    post.cleanedBy = Array.isArray(post.cleanedBy) ? post.cleanedBy : [];
    if (!post.cleanedBy.includes(cleanerId)) post.cleanedBy.push(cleanerId);
    post.cleanCount = Math.min(6, post.cleanedBy.length);
    localStorage.setItem("sflCommunityPosts", JSON.stringify(state.communityPosts));
    communityStatus.textContent = t("Limpieza marcada en modo local.", "Cleaning marked in local mode.");
  }
  renderCommunityPosts();
}

async function incrementCommunityPostVisit(postId) {
  const visitorId = getCommunityClientId();
  const post = state.communityPosts.find((entry) => entry.id === postId);
  if (!post || isOwnCommunityFarm(post)) return;

  post.visitedBy = Array.isArray(post.visitedBy) ? post.visitedBy : [];
  if (post.visitedBy.includes(visitorId)) return;

  try {
    const response = await fetch(`${localApiBase}/api/community/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, visitorId })
    });
    if (!response.ok) throw new Error("Visit update failed");
    const data = await response.json();
    state.communityPosts = Array.isArray(data.posts) ? data.posts : state.communityPosts;
  } catch {
    post.visitedBy.push(visitorId);
    post.visits = post.visitedBy.length;
  }
  localStorage.setItem("sflCommunityPosts", JSON.stringify(state.communityPosts));
  renderCommunityPosts();
}

async function toggleCommunityPostLike(postId) {
  const likerId = getCommunityClientId();
  const post = state.communityPosts.find((entry) => entry.id === postId);
  if (!post) return;

  try {
    const response = await fetch(`${localApiBase}/api/community/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, likerId })
    });
    if (!response.ok) throw new Error("Like update failed");
    const data = await response.json();
    state.communityPosts = Array.isArray(data.posts) ? data.posts : state.communityPosts;
    localStorage.setItem("sflCommunityPosts", JSON.stringify(state.communityPosts));
  } catch {
    post.likedBy = Array.isArray(post.likedBy) ? post.likedBy : [];
    if (post.likedBy.includes(likerId)) {
      post.likedBy = post.likedBy.filter((entry) => entry !== likerId);
    } else {
      post.likedBy.push(likerId);
    }
    post.likes = post.likedBy.length;
    localStorage.setItem("sflCommunityPosts", JSON.stringify(state.communityPosts));
  }
  renderCommunityPosts();
}

function applyRemoteProfile(profile) {
  if (!profile || !state.farmId || profile.farmId !== state.farmId) return false;
  if (profile.nickname) state.profileName = profile.nickname;
  if (profile.bio) state.profileBio = profile.bio;
  if (profile.avatar) state.profileAvatar = normalizeProfileAvatarId(profile.avatar);
  if (profile.banner) state.profileBanner = profile.banner;
  state.profileBannerImage = profile.bannerImage || "";
  localStorage.setItem("sflProfileName", state.profileName);
  localStorage.setItem("sflProfileBio", state.profileBio);
  localStorage.setItem("sflProfileAvatar", state.profileAvatar);
  localStorage.setItem("sflProfileBanner", state.profileBanner);
  localStorage.setItem("sflProfileBannerImage", state.profileBannerImage);
  saveFarmSession();
  return true;
}

async function loadRemoteFarmProfile(farmId = state.farmId) {
  if (!farmId || farmId === "demo") return false;
  try {
    const response = await fetch(`${localApiBase}/api/profile/${encodeURIComponent(farmId)}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Profile API failed");
    const data = await response.json();
    const applied = applyRemoteProfile(data.profile);
    if (applied) renderFarmProfile();
    return applied;
  } catch {
    return false;
  }
}

async function saveRemoteFarmProfile() {
  if (!state.farmId || state.farmId === "demo") return false;
  try {
    const response = await fetch(`${localApiBase}/api/profile/${encodeURIComponent(state.farmId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: state.profileName,
        bio: state.profileBio,
        avatar: state.profileAvatar,
        banner: state.profileBanner,
        bannerImage: state.profileBannerImage
      })
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function saveProfileSettings() {
  state.profileName = profileDisplayName.value.trim();
  state.profileBio = profileBio.value.trim();
  localStorage.setItem("sflProfileName", state.profileName);
  localStorage.setItem("sflProfileBio", state.profileBio);
  localStorage.setItem("sflProfileAvatar", state.profileAvatar);
  localStorage.setItem("sflProfileBanner", state.profileBanner);
  localStorage.setItem("sflProfileBannerImage", state.profileBannerImage);
  saveFarmSession();
  saveRemoteFarmProfile();
  renderFarmProfile();
  profileModal.classList.add("hidden");
}

function applyDemoFarm(farmId = "demo") {
  state.farmId = farmId;
  state.farmName = farmId === "demo" ? "Granja demo" : `Farm #${farmId}`;
  state.farmSource = t("Inventario demo editable", "Editable demo inventory");
  state.farmStats = t("Balance e inventario editables", "Editable balance and inventory");
  state.farmBalances = {};
  state.farmStock = {};
  state.farmAnimals = [];
  state.balance = state.balance || 25;
  balanceInput.value = state.balance;
  saveFarmSession();
  renderFarmProfile();
  renderSummary();
  setGateVisible(false);
}

async function fetchPublicFarm(farmId) {
  const endpoint = publicFarmEndpoint || `${localApiBase}/api/farm/`;
  const cacheBust = Date.now();

  try {
    const response = await fetch(`${endpoint}${encodeURIComponent(farmId)}?t=${cacheBust}`, {
      cache: "reload",
      headers: {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });
    if (!response.ok) throw new Error("No se pudo leer la granja publica.");
    return response.json();
  } catch {
    const html = await fetchTextWithFallback(`${sflWorldUrl}land/${encodeURIComponent(farmId)}?t=${cacheBust}`);
    let publicStock = {};

    try {
      const stockHtml = await fetchTextWithFallback(`${sflWorldUrl}stock/${encodeURIComponent(farmId)}?t=${cacheBust}`);
      publicStock = parsePublicStockHtml(stockHtml);
    } catch {
      publicStock = {};
    }

    let animals = [];
    try {
      const animalsHtml = await fetchTextWithFallback(`${sflWorldUrl}land/${encodeURIComponent(farmId)}/animals?t=${cacheBust}`);
      animals = parsePublicAnimalsHtml(animalsHtml);
    } catch {
      animals = [];
    }

    return {
      ...parseFarmInfoHtml(html, farmId),
      publicStock,
      animals
    };
  }
}

function applyPublicFarmData(farmId, farmData) {
  const farm = farmData?.farm || farmData;
  state.farmId = farmId;
  state.farmName = farm?.username || farm?.name || `Farm #${farmId}`;
  state.farmSource = farmData?.source
    ? t(`${farmData.source} (puede ir con retraso)`, `${farmData.source} (may lag)`)
    : t("Datos publicos (pueden ir con retraso)", "Public data (may lag)");
  state.farmUpdatedAt = farmData?.updatedAt || new Date().toISOString();
  state.farmStats = [
    farm?.level ? `Lvl ${farm.level}` : "",
    farm?.island || "",
    farm?.biome || ""
  ].filter(Boolean).join(" - ") || t("Inventario editable", "Editable inventory");
  state.farmSocialPoints = Number(farm?.socialPoints) || 0;
  state.farmLevel = farm?.level || "";
  state.farmExpansion = farm?.expansion || "";
  state.farmIsland = farm?.island || farm?.biome || "";
  state.farmFaction = farm?.faction || "";
  state.farmVip = Boolean(farm?.vip);
  state.farmVerified = Boolean(farm?.verified);
  state.farmBalances = {
    FLOWER: Number(farm?.balances?.flower),
    Coins: Number(farm?.balances?.coins),
    Gems: Number(farm?.balances?.gem),
    Marks: Number(farm?.balances?.marks)
  };
  state.farmStock = farmData?.publicStock || farmData?.inventory || farmData?.resources || {};
  state.farmAnimals = Array.isArray(farmData?.animals) ? farmData.animals : [];
  state.farmBumpkin = farmData?.bumpkin || farm?.bumpkin || null;

  const flower = Number(farm?.balances?.flower || farm?.balance?.flower || farm?.flower || farm?.sfl);
  if (Number.isFinite(flower)) {
    state.balance = flower;
    balanceInput.value = flower;
  }

  const inventory = farmData?.inventory || farmData?.resources || farmData?.publicStock;
  if (inventory && typeof inventory === "object") {
    marketItems.forEach((marketItem) => {
      const itemId = marketItem.id;
      const item = getItem(itemId);
      const directValue = inventory[itemId]
        ?? inventory[item?.name]
        ?? inventory[item?.marketName]
        ?? inventory[item?.name?.replace(" Ore", "")]
        ?? inventory[item?.marketName?.replace(" Ore", "")]
        ?? inventory[item?.name?.toLowerCase()];
      const amount = Number(directValue);
      if (Number.isFinite(amount)) state.inventory[itemId] = amount;
    });
  }

  saveFarmSession();
  renderFarmProfile();
  renderSummary();
  setGateVisible(false);
}

async function loadFarmById() {
  const farmId = farmIdInput.value.trim();

  if (!farmId) {
    farmGateStatus.textContent = t("Escribe tu Farm ID para continuar.", "Enter your Farm ID to continue.");
    return;
  }

  loadFarmBtn.disabled = true;
  farmGateStatus.textContent = t("Buscando datos publicos de la granja...", "Looking for public farm data...");

  try {
    const farmData = await fetchPublicFarm(farmId);
    applyPublicFarmData(farmId, farmData);
    await loadRemoteFarmProfile(farmId);
    farmGateStatus.textContent = t("Granja conectada con datos publicos.", "Farm connected with public data.");
  } catch (error) {
    state.farmId = farmId;
    farmGateStatus.textContent = t(
      "No pude leer inventario real con solo el ID. Entre en modo demo editable para ese Farm ID.",
      "I could not read real inventory with only the ID. Entering editable demo mode for this Farm ID."
    );
    applyDemoFarm(farmId);
  } finally {
    loadFarmBtn.disabled = false;
  }
}

async function syncConnectedFarm() {
  if (!state.farmId || state.farmId === "demo") {
    setGateVisible(true);
    return;
  }

  syncFarmBtn.disabled = true;
  syncFarmBtn.textContent = t("Sync...", "Sync...");
  state.farmSource = t("Sincronizando...", "Syncing...");
  renderFarmProfile();

  try {
    const farmData = await fetchPublicFarm(state.farmId);
    applyPublicFarmData(state.farmId, farmData);
    await loadRemoteFarmProfile(state.farmId);
  } catch {
    state.farmSource = t("No se pudo sincronizar", "Could not sync");
    renderFarmProfile();
  } finally {
    syncFarmBtn.disabled = false;
    syncFarmBtn.textContent = "Sync";
  }
}

function getSparkline(item) {
  const points = sparklinePoints(item.spark, 56, 48, 42, 30, 9);

  return `<svg viewBox="0 0 56 48" aria-hidden="true"><polyline points="${points}"></polyline></svg>`;
}

function calculateCartTotal() {
  return marketItems.reduce((total, item) => {
    const quantity = state.quantities[item.id] || 0;
    return total + quantity * item.price;
  }, 0);
}

function calculateGoalTotal(goal) {
  const resourcesTotal = goal.resources.reduce((total, resource) => {
    const item = getItem(resource.itemId);
    return total + resource.amount * (item?.price || 0);
  }, 0);

  return goal.directFlower + resourcesTotal;
}

function calculateMissingTotal(goal) {
  return goal.resources.reduce((total, resource) => {
    const item = getItem(resource.itemId);
    const owned = state.inventory[resource.itemId] || 0;
    const missing = Math.max(resource.amount - owned, 0);
    return total + missing * (item?.price || 0);
  }, goal.directFlower);
}

function getGapMessage(total, emptyMessage) {
  if (total <= 0) return emptyMessage;

  const missing = Math.max(total - state.balance, 0);
  if (missing === 0) return t("Ya te alcanza con tu balance actual.", "Your current balance is enough.");

  return t(`Te faltan ${formatFlower(missing)}.`, `You still need ${formatFlower(missing)}.`);
}

function renderTranslations() {
  document.documentElement.lang = state.language;
  languageButtons.forEach((button) => {
    button.textContent = state.language === "es" ? "ES" : "EN";
  });

  document.querySelector(".gate-brand p").textContent = t(
    "Conecta tu granja para calcular con tus recursos.",
    "Connect your farm to calculate with your own resources."
  );
  document.querySelector('label[for="farmIdInput"]').textContent = "Farm ID";
  farmIdInput.placeholder = t("Ej: 6777707846793896", "Ex: 6777707846793896");
  loadFarmBtn.textContent = t("Entrar", "Enter");
  demoFarmBtn.textContent = t("Usar demo", "Use demo");
  clearFarmBtn.textContent = t("Cambiar ID", "Change ID");

  const marketTab = document.querySelector(".tabs [data-view='market']");
  const farmTab = document.querySelector(".tabs [data-view='farm']");
  const communityTab = document.querySelector(".tabs [data-view='community']");
  const nftsTab = document.querySelector(".tabs [data-view='nfts']");
  if (marketTab) marketTab.textContent = "Market";
  if (farmTab) farmTab.textContent = t("Mi granja", "My farm");
  if (communityTab) communityTab.textContent = t("Comunidad", "Community");
  if (nftsTab) nftsTab.textContent = "NFTs";
  document.querySelector(".search-box span").textContent = t("Buscar", "Search");
  searchInput.placeholder = t("Buscar producto...", "Search product...");
  refreshBtn.textContent = t("Actualizar", "Refresh");
  document.querySelector(".balance-card span").textContent = t("Tus FLOWER disponibles", "Your available FLOWER");
  document.querySelector(".home-farm-card span").textContent = t("Granja conectada", "Connected farm");
  document.querySelector(".market-phone .farm-profile span").textContent = t("Granja conectada", "Connected farm");
  changeFarmBtn.textContent = t("Conectar", "Connect");
  syncFarmBtn.textContent = "Sync";
  document.querySelector(".quick-stats div:nth-child(1) span").textContent = t("Item mas caro", "Most expensive");
  document.querySelector(".quick-stats div:nth-child(2) span").textContent = t("Mejor tendencia", "Best trend");
  document.querySelector(".quick-stats div:nth-child(3) span").textContent = t("Items activos", "Active items");
  document.querySelector(".source-card span").textContent = t("Fuente market", "Market source");

  const tableLabels = document.querySelectorAll(".table-head span");
  [t("Producto", "Product"), t("Precio", "Price"), "24h", t("Cant.", "Qty"), "Total"]
    .forEach((label, index) => { tableLabels[index].textContent = label; });

  document.querySelector(".total-card span").textContent = t("Total general", "Grand total");
  document.querySelector(".market-phone .watch-card span").textContent = t("Lista rapida", "Quick list");
  document.querySelector(".market-phone .watch-card strong").textContent = t("Compra inteligente", "Smart buying");
  document.querySelector(".market-phone .watch-card p").textContent = t(
    "Marca cantidades en Market y compara tu balance antes de comprar.",
    "Set Market quantities and compare against your balance before buying."
  );
  document.querySelector(".market-phone .watch-card button").textContent = t("Pedir limpieza", "Ask for cleaning");
  if (homeSummaryTitle) homeSummaryTitle.textContent = t("Compra inteligente", "Smart buying");
  if (homeSummaryText) homeSummaryText.textContent = t(
    "Marca cantidades en Market y compara tu balance antes de comprar.",
    "Set Market quantities and compare against your balance before buying."
  );

  document.querySelector(".farm-phone .upgrade-header h2").textContent = t("Mi granja", "My farm");
  document.querySelector("#farmDashboardLabel").textContent = "Farm ID";
  farmDashboardSync.textContent = "Sync";
  farmProfileTitle.textContent = t("Perfil publico", "Public profile");
  farmActivityTitle.textContent = t("Actividad", "Activity");
  document.querySelector("#profileDisplayNameLabel").textContent = t("Nombre para comunidad", "Community display name");
  document.querySelector("#profileAvatarLabel").textContent = t("Cambiar avatar", "Change avatar");
  changeAvatarBtn.textContent = t("Cambiar avatar", "Change avatar");
  changeBannerBtn.textContent = t("Cambiar banner", "Change banner");
  editProfileBtn.textContent = t("Editar perfil", "Edit profile");
  document.querySelector("#profileModalTitle").textContent = t("Editar perfil", "Edit profile");
  profileDisplayName.placeholder = t("Tu nombre publico", "Your public name");
  profileBio.placeholder = t("Mensaje corto para tu perfil", "Short profile message");
  saveProfileBtn.textContent = t("Guardar perfil", "Save profile");
  profileStatus.textContent = t("Se usa al publicar en Comunidad.", "Used when posting in Community.");
  document.querySelector("#farmAnimalsTitle").textContent = t("Despertar de animales", "Animal wake-up");
  document.querySelector("#farmNoteTitle").textContent = t("Datos conectados", "Connected data");
  document.querySelector("#farmNoteText").textContent = t(
    "Usamos los datos publicos de SFL World por Farm ID. Pulsa Sync cuando quieras refrescar balances y animales.",
    "We use SFL World public data by Farm ID. Tap Sync whenever you want to refresh balances and animals."
  );

  document.querySelector(".community-phone .upgrade-header h2").textContent = t("Comunidad", "Community");
  document.querySelector("#communityKicker").textContent = t("Tablon de granjas", "Farm board");
  document.querySelector("#communityTitle").textContent = t("Publica tu Farm ID", "Post your Farm ID");
  document.querySelector("#communitySubtitle").textContent = t(
    "Otros granjeros podran visitar tu granja y ayudarte a limpiar.",
    "Other farmers can visit your farm and help clean it."
  );
  communityComposerText.textContent = t("¿Que necesitas hoy?", "What do you need today?");
  document.querySelector("#communityModalTitle").textContent = t("Nueva publicacion", "New post");
  closePostModalBtn.textContent = "x";
  useMyFarmBtn.textContent = t("ID conectado", "ID connected");
  document.querySelector("#communityConnectedFarm span").textContent = t(
    "Tu publicacion usara automaticamente la granja conectada",
    "Your post will automatically use the connected farm"
  );
  document.querySelector('label[for="communityFarmId"]').textContent = "Farm ID";
  document.querySelector('label[for="communityName"]').textContent = t("Nombre", "Name");
  document.querySelector('label[for="communityNeed"]').textContent = t("Necesito", "Need");
  document.querySelector('label[for="communityMessage"]').textContent = t("Mensaje", "Message");
  document.querySelector("#publishCommunityBtn").textContent = t("Publicar", "Post");
  document.querySelector("#communityListTitle").textContent = t("Granjas publicadas", "Posted farms");
  refreshCommunityBtn.textContent = t("Actualizar", "Refresh");
  communityNeed.options[0].textContent = t("Limpieza / ayuda", "Cleaning / help");
  communityNeed.options[1].textContent = t("Visitas", "Visits");
  communityNeed.options[2].textContent = t("Intercambio", "Trade");
  communityNeed.options[3].textContent = t("Consejos", "Tips");
  communityFarmId.placeholder = t("Ej: 6777707846793896", "Ex: 6777707846793896");
  communityName.placeholder = t("Tu nombre o granja", "Your name or farm");
  communityMessage.placeholder = t("Ej: tengo la granja sucia, gracias por visitar :)", "Ex: my farm needs cleaning, thanks for visiting :)");
  renderCommunityConnectedFarm();

  document.querySelector(".nfts-phone .upgrade-header h2").textContent = "NFTs";
  document.querySelector("#nftKicker").textContent = t("Market NFT", "NFT market");
  document.querySelector("#nftTitle").textContent = t("Precios de NFTs", "NFT prices");
  document.querySelector("#nftSubtitle").textContent = t(
    "Collectibles y wearables con ultimo precio de venta en SFL World.",
    "Collectibles and wearables with latest sale price from SFL World."
  );
  refreshNftBtn.textContent = t("Actualizar", "Refresh");
  document.querySelector(".nft-tools .search-box span").textContent = t("Buscar", "Search");
  nftSearch.placeholder = t("Buscar NFT...", "Search NFT...");
  nftTypeFilter.options[0].textContent = t("Con efecto", "With effects");
  nftTypeFilter.options[1].textContent = t("Todos", "All");

  document.querySelector(".settings-phone .upgrade-header h2").textContent = t("Ajustes", "Settings");
  document.querySelector("#settingsKicker").textContent = t("Preferencias", "Preferences");
  document.querySelector("#settingsTitle").textContent = t("Control de la app", "App control");
  document.querySelector("#settingsSubtitle").textContent = t("Cambia idioma, sesion y datos locales.", "Change language, session and local data.");
  settingsLanguageBtn.textContent = t("Cambiar idioma", "Change language");
  settingsConnectBtn.textContent = t("Conectar otra granja", "Connect another farm");
  settingsClearFarmBtn.textContent = t("Borrar granja guardada", "Clear saved farm");
  settingsRefreshBtn.textContent = t("Actualizar precios", "Refresh prices");
  if (appVisitsLabel) appVisitsLabel.textContent = t("Visitas de la app", "App visits");
  if (appVisitsTodayLabel) appVisitsTodayLabel.textContent = t("Hoy", "Today");
  if (appVisitsTotalLabel) appVisitsTotalLabel.textContent = t("Total", "Total");
  updateBottomNavLabels();

  document.querySelector(".upgrade-phone .upgrade-header h2").textContent = "Upgrades";
  document.querySelector(".upgrade-kicker").textContent = t("Mejora de nivel", "Level upgrade");
  document.querySelector(".select-label").textContent = t("Objetivo", "Goal");
  document.querySelector(".stat-grid div:nth-child(1) span").textContent = t("Tiempo", "Time");
  document.querySelector(".stat-grid div:nth-child(2) span").textContent = t("Experiencia", "Experience");
  document.querySelector("#materialsTitle").textContent = t("Materiales necesarios", "Required materials");

  const materialLabels = document.querySelectorAll(".materials-head span");
  [t("Material", "Material"), t("Necesitas", "Need"), t("Tienes", "Have"), t("Falta", "Missing"), t("Precio", "Price"), "Total"]
    .forEach((label, index) => { materialLabels[index].textContent = label; });

  document.querySelector(".upgrade-total > div:first-child span").textContent = t("Total si compras todo", "Total if buying all");
  document.querySelector(".missing-buy-row span").textContent = t("Comprar faltantes", "Buy missing only");
  document.querySelector(".outline-btn").textContent = t("Ver en Market", "View in Market");
  document.querySelector(".solid-btn").textContent = t("Agregar", "Add");
  document.querySelector(".chart-title h3").textContent = t("Evolucion del costo total", "Total cost evolution");
  document.querySelector(".tip-card strong").textContent = t("Consejo", "Tip");
  document.querySelector(".tip-card p").textContent = t(
    "Compara el total completo contra lo que realmente te falta segun tu inventario.",
    "Compare the full total against what you actually miss based on your inventory."
  );
  renderNftMarket();
}

function renderMarket() {
  const query = searchInput.value.trim().toLowerCase();

  marketList.innerHTML = "";

  marketItems
    .filter((item) => `${item.name} ${item.esName}`.toLowerCase().includes(query))
    .forEach((item) => {
      const quantity = state.quantities[item.id] || "";
      const subtotal = (state.quantities[item.id] || 0) * item.price;
      const trendClass = item.trend >= 0 ? "up" : "down";
      const trendLabel = `${item.trend >= 0 ? "+" : ""}${item.trend.toFixed(2)}%`;
      const isFavorite = state.favorites.has(item.id);
      const card = document.createElement("article");
      card.className = "market-row compact-market-row";
      card.dataset.assetKind = "resource";
      card.dataset.assetId = item.id;

      card.innerHTML = `
        <div class="product-cell">
          <img src="${item.icon}" alt="${item.name}">
          <div>
            <button class="star-btn ${isFavorite ? "active" : ""}" type="button" data-favorite-id="${item.id}" aria-label="Favorito ${itemLabel(item)}">${isFavorite ? "★" : "☆"}</button>
            <strong>${itemLabel(item)}</strong>
          </div>
        </div>
        <div class="price-cell">
          <strong>${formatMarketNumber(item.price)}</strong>
          <span>${formatUsd(item.price)}</span>
        </div>
        <div class="trend-cell ${trendClass}">
          ${getSparkline(item)}
          <span>${trendLabel}</span>
        </div>
        <input class="quantity-input" type="number" min="0" step="1" inputmode="numeric" value="${quantity}" data-item-id="${item.id}" aria-label="${t("Cantidad de", "Quantity of")} ${itemLabel(item)}">
        <strong class="line-total" data-line-total="${item.id}">${formatFlower(subtotal, true)}</strong>
      `;

      marketList.appendChild(card);
    });
}

function renderMarketStats() {
  const mostExpensive = [...marketItems].sort((a, b) => b.price - a.price)[0];
  const best = [...marketItems].sort((a, b) => b.trend - a.trend)[0];
  const activeCount = marketItems.filter((item) => (state.quantities[item.id] || 0) > 0).length;

  topItem.textContent = mostExpensive ? `${itemLabel(mostExpensive)} ${formatMarketNumber(mostExpensive.price)} F` : "-";
  bestTrend.textContent = best ? `${itemLabel(best)} ${best.trend >= 0 ? "+" : ""}${best.trend.toFixed(2)}%` : "-";
  activeItems.textContent = t(`${activeCount} activos / ${state.favorites.size} fav`, `${activeCount} active / ${state.favorites.size} fav`);
  renderHomeMarketSummary();
}

function renderHomeMarketSummary() {
  if (!homeTopItem) return;
  const mostExpensive = [...marketItems].sort((a, b) => b.price - a.price)[0];
  const best = [...marketItems].sort((a, b) => b.trend - a.trend)[0];
  const activeCount = marketItems.filter((item) => (state.quantities[item.id] || 0) > 0).length;
  const total = calculateCartTotal();

  homeTopItem.textContent = mostExpensive ? `${itemLabel(mostExpensive)} ${formatMarketNumber(mostExpensive.price)} F` : "-";
  homeBestTrend.textContent = best ? `${itemLabel(best)} ${best.trend >= 0 ? "+" : ""}${best.trend.toFixed(2)}%` : "-";
  homeActiveItems.textContent = t(`${activeCount} activos / ${state.favorites.size} fav`, `${activeCount} active / ${state.favorites.size} fav`);
  homeSummaryTitle.textContent = total > 0 ? t("Compra calculada", "Calculated cart") : t("Compra inteligente", "Smart buy");
  homeSummaryText.textContent = total > 0
    ? `${t("Total marcado", "Selected total")}: ${formatFlower(total, true)}`
    : t("Marca cantidades en Market y compara tu balance antes de comprar.", "Set Market quantities and compare against your balance before buying.");
}

function renderGoalOptions() {
  buildingSelect.innerHTML = buildingGoals
    .map((goal) => `<option value="${goal.id}">${goalLabel(goal)}</option>`)
    .join("");
  buildingSelect.value = state.selectedGoalId;
}

function renderGoal() {
  const goal = buildingGoals.find((entry) => entry.id === state.selectedGoalId) || buildingGoals[0];
  const total = calculateGoalTotal(goal);
  const missing = calculateMissingTotal(goal);

  buildTime.textContent = goal.time;
  buildXp.textContent = goal.xp;
  document.querySelector(".upgrade-hero h3").textContent = goalLabel(goal).split(":")[0];
  document.querySelector(".upgrade-kicker").textContent = goal.category
    ? `${t("Categoria", "Category")}: ${goal.category}`
    : t("Mejora de nivel", "Level upgrade");
  goalTotal.textContent = formatFlower(total);
  missingTotal.textContent = formatFlower(missing);
  goalGap.textContent = getGapMessage(missing, t("Selecciona una estructura para calcular el objetivo.", "Choose a structure to calculate the goal."));
  renderCostChart(goal);

  const directRow = goal.directFlower > 0
    ? `
        <div class="material-row">
          <div class="material-name"><span class="direct-icon">F</span><strong>Costo directo</strong></div>
          <span>1</span>
          <span>0</span>
          <span>1</span>
          <span>${formatMarketNumber(goal.directFlower)}</span>
          <strong>${formatFlower(goal.directFlower, true)}</strong>
        </div>
    `
    : "";

  const rows = goal.resources
    .map((resource) => {
      const item = getItem(resource.itemId);
      const totalResourcePrice = resource.amount * (item?.price || 0);
      const owned = state.inventory[resource.itemId] || 0;
      const missingAmount = Math.max(resource.amount - owned, 0);
      const missingClass = missingAmount > 0 ? "needs-more" : "has-enough";
      const trendClass = (item?.trend || 0) >= 0 ? "up" : "down";

      return `
        <div class="material-row">
          <div class="material-name">
            <img src="${item?.icon || ""}" alt="${item?.name || resource.itemId}">
            <strong>${item ? itemLabel(item) : resource.itemId}</strong>
          </div>
          <span>${resource.amount.toLocaleString("es-CL")}</span>
          <input class="inventory-input" type="number" min="0" step="1" value="${owned}" data-inventory-id="${resource.itemId}" aria-label="Tienes ${item?.name || resource.itemId}">
          <span class="${missingClass}">${missingAmount.toLocaleString("es-CL")}</span>
          <span>${item ? formatMarketNumber(item.price) : "0.000000"}</span>
          <strong class="${trendClass}">${formatFlower(totalResourcePrice, true)}</strong>
        </div>
      `;
    })
    .join("");

  recipeBreakdown.innerHTML = directRow + rows;
}

function renderCostChart(goal) {
  const chart = document.querySelector(".big-chart");
  const totals = goal.resources.map((resource) => {
    const item = getItem(resource.itemId);
    const spark = item?.spark || [item?.price || 0];
    return { amount: resource.amount, spark };
  });
  const length = Math.max(...totals.map((entry) => entry.spark.length), 2);
  const series = Array.from({ length }, (_, index) => {
    return totals.reduce((total, entry) => {
      const value = entry.spark[index] ?? entry.spark.at(-1) ?? 0;
      return total + value * entry.amount;
    }, goal.directFlower);
  });
  const max = Math.max(...series);
  const min = Math.min(...series);
  const points = series.map((value, index) => {
    const x = (index / Math.max(series.length - 1, 1)) * 100;
    const y = 88 - ((value - min) / Math.max(max - min, 0.0001)) * 68;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  const trend = calculateTrend(series);
  const trendClass = trend >= 0 ? "up" : "down";

  chart.innerHTML = `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="costFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="rgba(99, 240, 66, 0.38)" />
          <stop offset="100%" stop-color="rgba(99, 240, 66, 0.02)" />
        </linearGradient>
      </defs>
      <polyline class="area" points="0,100 ${points} 100,100"></polyline>
      <polyline class="line" points="${points}"></polyline>
    </svg>
    <div class="chart-metrics">
      <span>${formatFlower(series.at(-1))}</span>
      <strong class="${trendClass}">${trend >= 0 ? "+" : ""}${trend.toFixed(2)}%</strong>
    </div>
  `;
}

function addMissingResourcesToMarket() {
  const goal = buildingGoals.find((entry) => entry.id === state.selectedGoalId) || buildingGoals[0];
  goal.resources.forEach((resource) => {
    const owned = state.inventory[resource.itemId] || 0;
    const missing = Math.max(resource.amount - owned, 0);
    if (missing > 0) state.quantities[resource.itemId] = missing;
  });
  renderMarket();
  renderSummary();
  setActiveScreen("market");
}

function focusGoalResourcesInMarket() {
  const goal = buildingGoals.find((entry) => entry.id === state.selectedGoalId) || buildingGoals[0];
  const firstResource = goal.resources[0];
  const item = firstResource ? getItem(firstResource.itemId) : null;
  searchInput.value = item ? itemLabel(item) : "";
  renderMarket();
  setActiveScreen("market");
}

function renderSummary() {
  const total = calculateCartTotal();

  cartTotal.textContent = formatFlower(total, true);
  cartGap.textContent = getGapMessage(total, t("Agrega cantidades para calcular tu compra.", "Add quantities to calculate your purchase."));
  renderMarketStats();
  renderHomeDashboard();
  renderGoal();
}

async function refreshMarketData() {
  refreshBtn.disabled = true;
  refreshBtn.textContent = t("Cargando...", "Loading...");
  await Promise.allSettled([loadFlowerUsdPrice(), loadRealMarketPrices()]);
  refreshBtn.disabled = false;
  refreshBtn.textContent = t("Actualizar", "Refresh");
}

function setActiveScreen(screenName) {
  const targetScreen = screenName === "upgrades" ? "community" : screenName;
  screens.forEach((screen) => {
    screen.classList.toggle("active-screen", screen.dataset.screen === targetScreen);
  });

  viewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === targetScreen);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

marketList.addEventListener("input", (event) => {
  const input = event.target;
  if (!input.matches("[data-item-id]")) return;

  const itemId = input.dataset.itemId;
  const item = getItem(itemId);
  const value = Number(input.value);
  const quantity = Number.isFinite(value) ? Math.max(value, 0) : 0;
  const lineTotal = input.closest(".market-row")?.querySelector("[data-line-total]");

  state.quantities[itemId] = quantity;
  if (lineTotal && item) {
    lineTotal.textContent = formatFlower(quantity * item.price, true);
  }
  renderSummary();
});

marketList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-favorite-id]");
  if (!button) {
    if (event.target.closest("input")) return;
    const row = event.target.closest("[data-asset-kind='resource']");
    if (row) openAssetDetail("resource", row.dataset.assetId);
    return;
  }

  const itemId = button.dataset.favoriteId;
  if (state.favorites.has(itemId)) {
    state.favorites.delete(itemId);
  } else {
    state.favorites.add(itemId);
  }

  renderMarket();
  renderMarketStats();
});

nftMarketList.addEventListener("click", (event) => {
  if (event.target.closest("a")) return;
  const row = event.target.closest("[data-asset-kind='nft']");
  if (row) openAssetDetail("nft", row.dataset.assetId);
});

closeAssetDetail.addEventListener("click", closeAssetPanel);
assetDetailPanel.addEventListener("click", (event) => {
  if (event.target === assetDetailPanel) closeAssetPanel();
});
alertUpBtn.addEventListener("click", () => saveAssetAlert("up"));
alertDownBtn.addEventListener("click", () => saveAssetAlert("down"));

recipeBreakdown.addEventListener("input", (event) => {
  const input = event.target;
  if (!input.matches("[data-inventory-id]")) return;

  const value = Number(input.value);
  state.inventory[input.dataset.inventoryId] = Number.isFinite(value) ? Math.max(value, 0) : 0;
  renderGoal();
});

searchInput.addEventListener("input", renderMarket);

balanceInput.addEventListener("input", () => {
  const value = Number(balanceInput.value);
  state.balance = Number.isFinite(value) ? Math.max(value, 0) : 0;
  renderSummary();
});

buildingSelect.addEventListener("change", () => {
  state.selectedGoalId = buildingSelect.value;
  renderGoal();
});

refreshBtn.addEventListener("click", refreshMarketData);
refreshNftBtn.addEventListener("click", loadNftMarket);
nftSearch.addEventListener("input", () => {
  state.nftSearch = nftSearch.value.trim();
  renderNftMarket();
});
nftTypeFilter.addEventListener("change", () => {
  state.nftType = nftTypeFilter.value;
  renderNftMarket();
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveScreen(button.dataset.view));
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.language = state.language === "es" ? "en" : "es";
    localStorage.setItem("sflMarketLang", state.language);
    renderTranslations();
    renderGoalOptions();
    renderFarmProfile();
    renderMarket();
    renderCommunityPosts();
    renderSummary();
  });
});

loadFarmBtn.addEventListener("click", loadFarmById);

farmIdInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loadFarmById();
});

demoFarmBtn.addEventListener("click", () => applyDemoFarm());

clearFarmBtn.addEventListener("click", () => {
  localStorage.removeItem("sflMarketFarm");
  farmIdInput.value = "";
  farmGateStatus.textContent = "Sesion borrada. Escribe otro Farm ID o usa demo.";
});

changeFarmBtn.addEventListener("click", () => {
  farmIdInput.value = state.farmId === "demo" ? "" : state.farmId;
  setGateVisible(true);
});

syncFarmBtn.addEventListener("click", syncConnectedFarm);
farmDashboardSync.addEventListener("click", syncConnectedFarm);
communityForm.addEventListener("submit", publishCommunityPost);
publishCommunityBtn.addEventListener("click", (event) => {
  event.preventDefault();
  publishCommunityPost(event);
});
refreshCommunityBtn.addEventListener("click", loadCommunityPosts);
communityList.addEventListener("click", (event) => {
  const profileButton = event.target.closest("[data-open-profile]");
  if (profileButton) {
    openPublicProfile(profileButton.dataset.openProfile);
    return;
  }
  const visitLink = event.target.closest(".visit-farm-btn");
  if (visitLink) {
    const card = visitLink.closest("[data-farm-id]");
    const farmId = card?.dataset.farmId;
    if (visitLink.dataset.cleanPost) {
      incrementCommunityPostVisit(visitLink.dataset.cleanPost);
    }
    if (farmId) {
      const visited = new Set(getVisitedFarms());
      visited.add(farmId);
      localStorage.setItem("sflVisitedFarms", JSON.stringify([...visited]));
      renderFarmActivity();
    }
    if (visitLink.dataset.autoClean === "true" && visitLink.dataset.cleanPost) {
      markCommunityPostCleaned(visitLink.dataset.cleanPost);
    }
    return;
  }
  const cleanButton = event.target.closest("[data-clean-post]");
  if (cleanButton) markCommunityPostCleaned(cleanButton.dataset.cleanPost);
  const likeButton = event.target.closest("[data-like-post]");
  if (likeButton) toggleCommunityPostLike(likeButton.dataset.likePost);
  if (event.target.closest("[data-edit-own-post]")) editOwnCommunityPost();
  if (event.target.closest("[data-delete-own-post]")) deleteOwnCommunityPost();
});
closePublicProfile.addEventListener("click", closePublicProfileModal);
publicProfileModal.addEventListener("click", (event) => {
  if (event.target === publicProfileModal) closePublicProfileModal();
});
ownCommunityPost.addEventListener("click", (event) => {
  if (event.target.closest("[data-edit-own-post]")) editOwnCommunityPost();
  if (event.target.closest("[data-delete-own-post]")) deleteOwnCommunityPost();
});
profileAvatarPicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-avatar-id]");
  if (!button) return;
  state.profileAvatar = button.dataset.avatarId;
  localStorage.setItem("sflProfileAvatar", state.profileAvatar);
  saveFarmSession();
  saveRemoteFarmProfile();
  avatarModal.classList.add("hidden");
  renderFarmProfile();
});
profileBannerUpload.addEventListener("change", async () => {
  const file = profileBannerUpload.files?.[0];
  if (!file) return;
  changeBannerBtn.disabled = true;
  changeBannerBtn.textContent = t("Guardando...", "Saving...");
  try {
    state.profileBannerImage = await compressBannerFile(file);
    localStorage.setItem("sflProfileBannerImage", state.profileBannerImage);
    saveFarmSession();
    await saveRemoteFarmProfile();
    renderFarmProfile();
  } finally {
    changeBannerBtn.disabled = false;
    changeBannerBtn.textContent = t("Cambiar banner", "Change banner");
    profileBannerUpload.value = "";
  }
});
changeAvatarBtn.addEventListener("click", () => {
  avatarModal.classList.remove("hidden");
});
changeBannerBtn.addEventListener("click", () => {
  profileBannerUpload.click();
});
closeAvatarModal.addEventListener("click", () => {
  avatarModal.classList.add("hidden");
});
avatarModal.addEventListener("click", (event) => {
  if (event.target === avatarModal) avatarModal.classList.add("hidden");
});
editProfileBtn.addEventListener("click", () => {
  profileModal.classList.remove("hidden");
  profileDisplayName.focus();
});
closeProfileModal.addEventListener("click", () => {
  profileModal.classList.add("hidden");
});
profileModal.addEventListener("click", (event) => {
  if (event.target === profileModal) profileModal.classList.add("hidden");
});
openPostModalBtn.addEventListener("click", () => {
  if (!state.farmId || state.farmId === "demo") {
    setGateVisible(true);
    return;
  }
  const ownPost = getOwnCommunityPost();
  state.communityEditing = Boolean(ownPost);
  communityMessage.value = ownPost?.message || "";
  communityForm.classList.remove("hidden");
  communityMessage.focus();
});
closePostModalBtn.addEventListener("click", () => {
  state.communityEditing = false;
  communityForm.classList.add("hidden");
});
communityForm.addEventListener("click", (event) => {
  if (event.target === communityForm) {
    state.communityEditing = false;
    communityForm.classList.add("hidden");
  }
});
saveProfileBtn.addEventListener("click", saveProfileSettings);
useMyFarmBtn.addEventListener("click", () => {
  if (state.farmId && state.farmId !== "demo") {
    communityFarmId.value = state.farmId;
    communityName.value = state.farmName;
    communityStatus.textContent = t("Tu Farm ID conectado se usara al publicar.", "Your connected Farm ID will be used when posting.");
  } else {
    setGateVisible(true);
  }
});
viewMarketBtn.addEventListener("click", focusGoalResourcesInMarket);
addMissingBtn.addEventListener("click", addMissingResourcesToMarket);
chartRangeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chartRangeButtons.forEach((entry) => entry.classList.toggle("active", entry === button));
    renderGoal();
  });
});
notificationBtn.addEventListener("click", () => setActiveScreen("community"));
settingsLanguageBtn.addEventListener("click", () => {
  state.language = state.language === "es" ? "en" : "es";
  localStorage.setItem("sflMarketLang", state.language);
  renderTranslations();
  renderGoalOptions();
  renderFarmProfile();
  renderMarket();
  renderCommunityPosts();
  renderSummary();
  settingsStatus.textContent = t("Idioma actualizado.", "Language updated.");
});
settingsConnectBtn.addEventListener("click", () => setGateVisible(true));
settingsClearFarmBtn.addEventListener("click", () => {
  localStorage.removeItem("sflMarketFarm");
  applyDemoFarm();
  settingsStatus.textContent = t("Granja guardada borrada.", "Saved farm cleared.");
});
settingsRefreshBtn.addEventListener("click", async () => {
  settingsStatus.textContent = t("Actualizando...", "Refreshing...");
  await Promise.allSettled([refreshMarketData(), syncConnectedFarm()]);
  settingsStatus.textContent = t("Cuenta y precios actualizados.", "Account and prices refreshed.");
});

let autoRefreshRunning = false;

async function autoRefreshConnectedAccount() {
  if (autoRefreshRunning || !state.farmId || state.farmId === "demo") return;
  autoRefreshRunning = true;
  try {
    await Promise.allSettled([
      syncConnectedFarm(),
      loadRemoteFarmProfile(),
      refreshMarketData(),
      loadCommunityPosts(),
      loadNftMarket()
    ]);
    settingsStatus.textContent = t("Datos actualizados automaticamente.", "Data refreshed automatically.");
  } finally {
    autoRefreshRunning = false;
  }
}

renderGoalOptions();
renderTranslations();
const previewMode = new URLSearchParams(window.location.search).get("preview") === "1";
if (previewMode) {
  applyDemoFarm();
  setGateVisible(false);
} else if (loadFarmSession()) {
  setGateVisible(false);
  setTimeout(() => loadRemoteFarmProfile(), 250);
  setTimeout(() => syncConnectedFarm(), 700);
} else {
  setGateVisible(true);
}
renderFarmProfile();
renderMarket();
renderSummary();
loadCommunityPosts();
refreshMarketData();
loadNftMarket();
trackAppVisit();
setInterval(autoRefreshConnectedAccount, 5 * 60 * 1000);

const initialView = new URLSearchParams(window.location.search).get("view");
if (initialView) {
  setActiveScreen(initialView);
}
