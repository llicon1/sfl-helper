const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const PORT = Number(process.env.PORT || 4174);
const ROOT = __dirname;
const SFL_WORLD_URL = "https://sfl.world/";
const FLOWER_COINGECKO_ID = "flower-2";
const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
const COMMUNITY_SEED_FILE = path.join(ROOT, "community-posts.json");
const COMMUNITY_FILE = process.env.VERCEL
  ? path.join(os.tmpdir(), "sfl-market-community-posts.json")
  : COMMUNITY_SEED_FILE;
const PROFILE_FILE = process.env.VERCEL
  ? path.join(os.tmpdir(), "sfl-market-farm-profiles.json")
  : path.join(ROOT, "farm-profiles.json");
const ANALYTICS_FILE = process.env.VERCEL
  ? path.join(os.tmpdir(), "sfl-market-app-visits.json")
  : path.join(ROOT, "app-visits.json");
let nftCache = null;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function send(res, status, body, contentType = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": contentType,
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function cleanText(value = "", max = 120) {
  return String(value)
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function normalizeCommunityPost(entry = {}) {
  const cleanedBy = Array.isArray(entry.cleanedBy)
    ? entry.cleanedBy.map((value) => cleanText(value, 80)).filter(Boolean)
    : [];
  const likedBy = Array.isArray(entry.likedBy)
    ? entry.likedBy.map((value) => cleanText(value, 80)).filter(Boolean)
    : [];
  const visitedBy = Array.isArray(entry.visitedBy)
    ? entry.visitedBy.map((value) => cleanText(value, 80)).filter(Boolean)
    : [];
  const cleanCount = Math.min(6, Math.max(Number(entry.cleanCount) || cleanedBy.length || 0, cleanedBy.length));

  return {
    ...entry,
    need: entry.need || "clean",
    cleanCount,
    cleanedBy,
    likes: Math.max(Number(entry.likes) || 0, likedBy.length),
    likedBy,
    visits: Math.max(Number(entry.visits) || 0, visitedBy.length),
    visitedBy,
    avatar: cleanText(entry.avatar || "", 160),
    banner: cleanText(entry.banner || "night", 32),
    bannerImage: cleanText(entry.bannerImage || "", 1_500_000),
    island: cleanText(entry.island || "", 40),
    faction: cleanText(entry.faction || "", 40),
    level: Number(entry.level) || null,
    capacity: 6
  };
}

function readCommunityPosts() {
  try {
    const data = JSON.parse(fs.readFileSync(COMMUNITY_FILE, "utf8"));
    return Array.isArray(data.posts) ? data.posts.map(normalizeCommunityPost) : [];
  } catch {
    try {
      const data = JSON.parse(fs.readFileSync(COMMUNITY_SEED_FILE, "utf8"));
      return Array.isArray(data.posts) ? data.posts.map(normalizeCommunityPost) : [];
    } catch {
      return [];
    }
  }
}

function writeCommunityPosts(posts) {
  fs.writeFileSync(COMMUNITY_FILE, `${JSON.stringify({ posts }, null, 2)}\n`);
}

function isSupabaseEnabled() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function postToDb(post) {
  return {
    id: post.id,
    farm_id: post.farmId,
    nickname: post.nickname,
    need: post.need,
    message: post.message,
    visit_url: post.visitUrl,
    avatar: post.avatar,
    banner: post.banner,
    banner_image: post.bannerImage,
    island: post.island,
    faction: post.faction,
    level: post.level,
    visits: post.visits,
    clean_count: post.cleanCount,
    cleaned_by: post.cleanedBy,
    likes: post.likes,
    liked_by: post.likedBy,
    visited_by: post.visitedBy,
    capacity: post.capacity,
    created_at: post.createdAt,
    updated_at: post.updatedAt || null
  };
}

function dbToPost(row = {}) {
  return normalizeCommunityPost({
    id: row.id,
    farmId: row.farm_id,
    nickname: row.nickname,
    need: row.need,
    message: row.message,
    visitUrl: row.visit_url,
    avatar: row.avatar,
    banner: row.banner,
    bannerImage: row.banner_image,
    island: row.island,
    faction: row.faction,
    level: row.level,
    visits: row.visits,
    cleanCount: row.clean_count,
    cleanedBy: row.cleaned_by,
    likes: row.likes,
    likedBy: row.liked_by,
    visitedBy: row.visited_by,
    capacity: row.capacity,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
}

function normalizeFarmProfile(profile = {}) {
  return {
    farmId: cleanText(profile.farmId || profile.farm_id || "", 24).replace(/[^0-9]/g, ""),
    nickname: cleanText(profile.nickname || "", 32),
    bio: cleanText(profile.bio || "", 160),
    avatar: cleanText(profile.avatar || "", 160),
    banner: cleanText(profile.banner || "night", 32),
    bannerImage: cleanText(profile.bannerImage || profile.banner_image || "", 1_500_000),
    updatedAt: profile.updatedAt || profile.updated_at || new Date().toISOString()
  };
}

function profileToDb(profile) {
  return {
    farm_id: profile.farmId,
    nickname: profile.nickname,
    bio: profile.bio,
    avatar: profile.avatar,
    banner: profile.banner,
    banner_image: profile.bannerImage,
    updated_at: profile.updatedAt
  };
}

function dbToProfile(row = {}) {
  return normalizeFarmProfile(row);
}

async function supabaseRequest(pathname, options = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${pathname}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase HTTP ${response.status}: ${text}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function supabaseCount(pathname) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${pathname}`, {
    method: "GET",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "count=exact",
      Range: "0-0"
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase HTTP ${response.status}: ${text}`);
  }

  const range = response.headers.get("content-range") || "";
  const total = Number(range.split("/").pop());
  return Number.isFinite(total) ? total : 0;
}

async function readCommunityPostsStore() {
  if (!isSupabaseEnabled()) return readCommunityPosts();
  const rows = await supabaseRequest("community_posts?select=*&order=created_at.desc&limit=80");
  return Array.isArray(rows) ? rows.map(dbToPost) : [];
}

async function writeCommunityPostsStore(posts) {
  if (!isSupabaseEnabled()) {
    writeCommunityPosts(posts);
    return posts;
  }

  const rows = posts.map(postToDb);
  const result = await supabaseRequest("community_posts?on_conflict=farm_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(rows)
  });
  return Array.isArray(result) ? result.map(dbToPost) : posts;
}

async function deleteCommunityPostStore(postId, farmId) {
  if (!isSupabaseEnabled()) {
    const posts = readCommunityPosts();
    const nextPosts = posts.filter((post) => !(post.id === postId && post.farmId === farmId));
    writeCommunityPosts(nextPosts);
    return nextPosts;
  }

  await supabaseRequest(`community_posts?id=eq.${encodeURIComponent(postId)}&farm_id=eq.${encodeURIComponent(farmId)}`, {
    method: "DELETE"
  });
  return readCommunityPostsStore();
}

function readLocalProfiles() {
  try {
    const data = JSON.parse(fs.readFileSync(PROFILE_FILE, "utf8"));
    return Array.isArray(data.profiles) ? data.profiles.map(normalizeFarmProfile) : [];
  } catch {
    return [];
  }
}

function writeLocalProfiles(profiles) {
  fs.writeFileSync(PROFILE_FILE, `${JSON.stringify({ profiles }, null, 2)}\n`);
}

async function readFarmProfileStore(farmId) {
  if (!isSupabaseEnabled()) {
    return readLocalProfiles().find((profile) => profile.farmId === farmId) || null;
  }

  const rows = await supabaseRequest(`farm_profiles?select=*&farm_id=eq.${encodeURIComponent(farmId)}&limit=1`);
  return Array.isArray(rows) && rows[0] ? dbToProfile(rows[0]) : null;
}

async function writeFarmProfileStore(profile) {
  if (!isSupabaseEnabled()) {
    const profiles = readLocalProfiles().filter((entry) => entry.farmId !== profile.farmId);
    profiles.unshift(profile);
    writeLocalProfiles(profiles.slice(0, 200));
    return profile;
  }

  const rows = await supabaseRequest("farm_profiles?on_conflict=farm_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(profileToDb(profile))
  });
  return Array.isArray(rows) && rows[0] ? dbToProfile(rows[0]) : profile;
}

async function handleFarmProfile(req, res) {
  const pathname = new URL(req.url, `http://127.0.0.1:${PORT}`).pathname;
  const farmId = decodeURIComponent(pathname.split("/").pop() || "").replace(/[^0-9]/g, "");

  if (!farmId) {
    send(res, 400, JSON.stringify({ error: "Missing farm id" }));
    return;
  }

  if (req.method === "GET") {
    try {
      send(res, 200, JSON.stringify({ profile: await readFarmProfileStore(farmId) }));
    } catch {
      send(res, 200, JSON.stringify({ profile: null }));
    }
    return;
  }

  if (req.method !== "POST") {
    send(res, 405, JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const payload = await readJsonBody(req);
  const profile = normalizeFarmProfile({
    ...payload,
    farmId,
    updatedAt: new Date().toISOString()
  });

  if (!profile.farmId) {
    send(res, 400, JSON.stringify({ error: "Missing farm id" }));
    return;
  }

  send(res, 200, JSON.stringify({ profile: await writeFarmProfileStore(profile) }));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readLocalVisits() {
  try {
    const data = JSON.parse(fs.readFileSync(ANALYTICS_FILE, "utf8"));
    return Array.isArray(data.visits) ? data.visits : [];
  } catch {
    return [];
  }
}

function writeLocalVisits(visits) {
  fs.writeFileSync(ANALYTICS_FILE, `${JSON.stringify({ visits }, null, 2)}\n`);
}

async function readVisitCounts() {
  const today = todayKey();
  if (!isSupabaseEnabled()) {
    const visits = readLocalVisits();
    return {
      today: visits.filter((visit) => visit.visitDate === today).length,
      total: visits.length
    };
  }

  const [todayCount, totalCount] = await Promise.all([
    supabaseCount(`app_visits?select=id&visit_date=eq.${today}`),
    supabaseCount("app_visits?select=id")
  ]);

  return { today: todayCount, total: totalCount };
}

async function recordAppVisit(visitorId, userAgent = "") {
  const cleanedVisitorId = cleanText(visitorId, 80);
  if (!cleanedVisitorId) return readVisitCounts();

  const today = todayKey();
  const visit = {
    id: `${today}:${cleanedVisitorId}`,
    visitor_id: cleanedVisitorId,
    visit_date: today,
    user_agent: cleanText(userAgent, 180),
    created_at: new Date().toISOString()
  };

  if (!isSupabaseEnabled()) {
    const visits = readLocalVisits();
    if (!visits.some((entry) => entry.id === visit.id)) {
      visits.push({
        id: visit.id,
        visitorId: cleanedVisitorId,
        visitDate: today,
        userAgent: visit.user_agent,
        createdAt: visit.created_at
      });
      writeLocalVisits(visits.slice(-5000));
    }
    return readVisitCounts();
  }

  await supabaseRequest("app_visits?on_conflict=id", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates" },
    body: JSON.stringify(visit)
  });
  return readVisitCounts();
}

async function handleAnalytics(req, res) {
  if (req.method === "GET") {
    send(res, 200, JSON.stringify(await readVisitCounts()));
    return;
  }

  if (req.method !== "POST") {
    send(res, 405, JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const payload = await readJsonBody(req);
  const counts = await recordAppVisit(payload.visitorId, req.headers["user-agent"] || "");
  send(res, 200, JSON.stringify(counts));
}

async function handleCommunity(req, res) {
  if (req.method === "GET") {
    send(res, 200, JSON.stringify({ posts: (await readCommunityPostsStore()).slice(0, 80) }));
    return;
  }

  if (req.method !== "POST") {
    send(res, 405, JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const payload = await readJsonBody(req);
  const farmId = cleanText(payload.farmId, 24).replace(/[^0-9]/g, "");
  const nickname = cleanText(payload.nickname || `Farm #${farmId}`, 32);
  const need = cleanText(payload.need || "clean", 24);
  const message = cleanText(payload.message || "", 180);
  const avatar = cleanText(payload.avatar || "", 160);
  const banner = cleanText(payload.banner || "night", 32);
  const bannerImage = cleanText(payload.bannerImage || "", 1_500_000);
  const island = cleanText(payload.island || "", 40);
  const faction = cleanText(payload.faction || "", 40);
  const level = Number(payload.level) || null;

  if (!farmId) {
    send(res, 400, JSON.stringify({ error: "Farm ID required" }));
    return;
  }

  const post = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    farmId,
    nickname,
    need,
    message,
    visitUrl: `https://sunflower-land.com/play/#/visit/${farmId}`,
    avatar,
    banner,
    bannerImage,
    island,
    faction,
    level,
    visits: 0,
    cleanCount: 0,
    cleanedBy: [],
    likes: 0,
    likedBy: [],
    visitedBy: [],
    capacity: 6,
    createdAt: new Date().toISOString()
  };
  const posts = [post, ...(await readCommunityPostsStore()).filter((entry) => entry.farmId !== farmId)].slice(0, 80);
  await writeCommunityPostsStore(posts);
  send(res, 201, JSON.stringify({ post, posts }));
}

async function handleCommunityClean(req, res) {
  if (req.method !== "POST") {
    send(res, 405, JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const payload = await readJsonBody(req);
  const postId = cleanText(payload.postId, 80);
  const cleanerId = cleanText(payload.cleanerId, 80);
  if (!postId || !cleanerId) {
    send(res, 400, JSON.stringify({ error: "Post ID and cleaner ID required" }));
    return;
  }

  const posts = await readCommunityPostsStore();
  const post = posts.find((entry) => entry.id === postId);
  if (!post) {
    send(res, 404, JSON.stringify({ error: "Post not found" }));
    return;
  }

  if (post.farmId === cleanerId.replace(/^farm:/, "")) {
    send(res, 400, JSON.stringify({ error: "Own farm cannot be marked as cleaned" }));
    return;
  }

  if (!post.cleanedBy.includes(cleanerId) && post.cleanCount < 6) {
    post.cleanedBy.push(cleanerId);
    post.cleanCount = Math.min(6, post.cleanedBy.length);
    post.updatedAt = new Date().toISOString();
    await writeCommunityPostsStore(posts);
  }

  send(res, 200, JSON.stringify({ post, posts }));
}

async function handleCommunityLike(req, res) {
  if (req.method !== "POST") {
    send(res, 405, JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const payload = await readJsonBody(req);
  const postId = cleanText(payload.postId, 80);
  const likerId = cleanText(payload.likerId, 80);
  if (!postId || !likerId) {
    send(res, 400, JSON.stringify({ error: "Post ID and liker ID required" }));
    return;
  }

  const posts = await readCommunityPostsStore();
  const post = posts.find((entry) => entry.id === postId);
  if (!post) {
    send(res, 404, JSON.stringify({ error: "Post not found" }));
    return;
  }

  if (post.likedBy.includes(likerId)) {
    post.likedBy = post.likedBy.filter((entry) => entry !== likerId);
  } else {
    post.likedBy.push(likerId);
  }
  post.likes = post.likedBy.length;
  post.updatedAt = new Date().toISOString();
  await writeCommunityPostsStore(posts);

  send(res, 200, JSON.stringify({ post, posts }));
}

async function handleCommunityVisit(req, res) {
  if (req.method !== "POST") {
    send(res, 405, JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const payload = await readJsonBody(req);
  const postId = cleanText(payload.postId, 80);
  const visitorId = cleanText(payload.visitorId, 80);
  if (!postId || !visitorId) {
    send(res, 400, JSON.stringify({ error: "Post ID and visitor ID required" }));
    return;
  }

  const posts = await readCommunityPostsStore();
  const post = posts.find((entry) => entry.id === postId);
  if (!post) {
    send(res, 404, JSON.stringify({ error: "Post not found" }));
    return;
  }

  if (!Array.isArray(post.visitedBy)) post.visitedBy = [];
  if (!post.visitedBy.includes(visitorId)) {
    post.visitedBy.push(visitorId);
    post.visits = post.visitedBy.length;
    post.updatedAt = new Date().toISOString();
    await writeCommunityPostsStore(posts);
  }

  send(res, 200, JSON.stringify({ post, posts }));
}

async function handleCommunityDelete(req, res) {
  if (req.method !== "POST") {
    send(res, 405, JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const payload = await readJsonBody(req);
  const postId = cleanText(payload.postId, 80);
  const farmId = cleanText(payload.farmId, 24).replace(/[^0-9]/g, "");
  if (!postId || !farmId) {
    send(res, 400, JSON.stringify({ error: "Post ID and Farm ID required" }));
    return;
  }

  const nextPosts = await deleteCommunityPostStore(postId, farmId);
  send(res, 200, JSON.stringify({ posts: nextPosts }));
}

function parseRows(html) {
  const rows = html.match(/<tr>[\s\S]*?<\/tr>/g) || [];

  return rows
    .map((row) => {
      const href = row.match(/href="\/tools\/trade\/\?name=([^"]+)"/)?.[1];
      const price = row.match(/<td class="ta-right nw">[\s\S]*?([0-9]+\.[0-9]+)<\/td>/)?.[1];
      const spark = row.match(/<span class="inlinesparkline">([^<]+)<\/span>/)?.[1];
      if (!href || !price || !spark) return null;

      const values = spark
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isFinite(value));
      const first = values[0] || 0;
      const last = values.at(-1) || 0;
      const trend = first ? ((last - first) / first) * 100 : 0;

      return {
        name: decodeURIComponent(href.replace(/\+/g, " ")),
        price: Number(price),
        spark: values,
        trend,
        tradeUrl: `https://sfl.world/tools/trade/?name=${href}`
      };
    })
    .filter(Boolean);
}

function stripTags(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function numberFromText(value = "") {
  const match = stripTags(value).match(/-?[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?/);
  return match ? Number(match[0].replace(/,/g, "")) : null;
}

function parseInfoValue(html, label) {
  const pattern = new RegExp(`<tr>\\s*<td[^>]*>\\s*${label}\\s*<\\/td>\\s*<td[^>]*>([\\s\\S]*?)<\\/td>\\s*<\\/tr>`, "i");
  return stripTags(html.match(pattern)?.[1] || "");
}

function parseBalance(html, label) {
  const pattern = new RegExp(`<b>([0-9,.]+)<\\/b>\\s*<small>${label}<\\/small>`, "i");
  const match = html.match(pattern);
  return match ? Number(match[1].replace(/,/g, "")) : null;
}

function parseFarmInfo(html, farmId) {
  const infoBlock = html.match(/<div id="collapseInfo"[\s\S]*?(?=<div id="farmTop"|<div id="bumpkin"|<div id="buds"|<div id="landCook")/)?.[0] || html;
  const name = stripTags(infoBlock.match(/<td colspan="2" class="ta-left h4">[\s\S]*?<b>([^<]+)<\/b>/)?.[1] || `Farm #${farmId}`);
  const socialPoints = numberFromText(infoBlock.match(/title="Social points"[\s\S]*?<span class="b">([^<]+)<\/span>/)?.[1] || "");
  const infoRow = (label) => parseInfoValue(infoBlock, label);
  const balanceRow = stripTags(infoBlock.match(/<td[^>]*>\s*Balance\s*<\/td><td[^>]*>([\s\S]*?)<\/td>/)?.[1] || "");

  return {
    id: farmId,
    name,
    socialPoints,
    visitUrl: `https://sunflower-land.com/play/#/visit/${farmId}`,
    sflWorldUrl: `https://sfl.world/land/${farmId}`,
    openSeaUrl: `https://opensea.io/item/polygon/0x2b4a66557a79263275826ad31a4cddc2789334bd/${farmId}`,
    vip: /VIP \(/i.test(infoBlock),
    verified: /Verified/i.test(infoBlock),
    level: numberFromText(infoRow("Bumpkin level")),
    expansion: numberFromText(infoRow("Expansion No")),
    island: infoRow("Island"),
    biome: infoRow("Biome"),
    faction: infoRow("Faction"),
    balanceSummary: balanceRow,
    tax: {
      resource: infoRow("Resource Tax"),
      withdraw: infoRow("Withdraw Tax"),
      free: infoRow("Tax Free"),
      afterWithdraw: infoRow("After withdrawal")
    },
    created: infoRow("Created"),
    telegram: infoRow("Telegram"),
    discord: infoRow("Discord"),
    balances: {
      coins: parseBalance(html, "Coins"),
      flower: parseBalance(html, "Flower"),
      gem: parseBalance(html, "Gem"),
      marks: parseBalance(html, "Marks")
    }
  };
}

function parseBumpkinInfo(html) {
  const block = html.match(/<div class="h6">Bumpkin #1[\s\S]*?(?=<div id="buds"|<div id="landCook"|<div class="position-fixed")/)?.[0] || "";
  if (!block) return null;

  const image = block.match(/<img src="([^"]+)"[^>]*class="w100p"/)?.[1];
  const activities = [...block.matchAll(/<tr><td[^>]*>([\s\S]*?)<\/td><td[^>]*>([\s\S]*?)<\/td><\/tr>/g)]
    .map((match) => ({
      label: stripTags(match[1]),
      value: stripTags(match[2])
    }))
    .filter((entry) => entry.label && !/Activity/i.test(entry.label));

  return {
    image: image ? `https://sfl.world${image}` : "",
    level: numberFromText(block.match(/Level\s*<b>([^<]+)<\/b>/)?.[1] || ""),
    experience: numberFromText(block.match(/Experience\s*<b>([^<]+)<\/b>/)?.[1] || ""),
    activities: activities.slice(0, 10)
  };
}

function parseNftCards(html, type) {
  const cards = html.match(/<div style="width: 170px;"[\s\S]*?(?=<div style="width: 170px;"|<div class="float-none|<div class="position-fixed)/g) || [];

  return cards.map((card) => {
    const name = stripTags(card.match(/<div class="ellipsis[^"]*">([\s\S]*?)<\/div>/)?.[1] || "");
    const image = card.match(/<img src="([^"]+)"/)?.[1] || "";
    const tag = stripTags(card.match(/badge text-bg-secondary[^>]*>([\s\S]*?)<\/span>/)?.[1] || "");
    const usd = numberFromText(card.match(/bi-currency-dollar<\/i>([0-9,.]+)/)?.[1] || "");
    const flower = numberFromText(card.match(/Flower\.png"[^>]*\/>([0-9,.]+)/)?.[1] || "");
    const opensea = card.match(/href="(https:\/\/opensea\.io\/assets[^"]+)"/)?.[1] || "";
    const game = card.match(/href="(https:\/\/sunflower-land\.com\/play\/#\/marketplace[^"]+)"/)?.[1] || "";
    const boost = stripTags(card.match(/text-bg-warning p-5(?: hide)?"><div class="small ta-left">([\s\S]*?)<\/div>/)?.[1] || "");
    if (!name) return null;
    const hasEffect = Boolean(boost) && !/^\s*$/.test(boost);

    return {
      id: `${type}-${slugify(name)}`,
      type,
      name,
      tag,
      image: image.startsWith("http") ? image : `https://sfl.world${image}`,
      usd,
      flower,
      tradable: /text-bg-success[^>]*>\s*Tradable/i.test(card),
      withdrawable: /text-bg-success[^>]*>\s*Withdrawable/i.test(card),
      boost,
      hasEffect,
      opensea,
      game
    };
  }).filter(Boolean);
}

function slugify(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function readNftCache() {
  if (!nftCache) {
    nftCache = require("./nft-cache.json");
  }

  return {
    source: `${nftCache.source || "SFL World NFT market"} cache`,
    updatedAt: nftCache.updatedAt || nftCache.cachedAt || new Date(0).toISOString(),
    items: Array.isArray(nftCache.items) ? nftCache.items : []
  };
}

function parseStockRows(html) {
  const rows = html.match(/<tr onclick="toggleSource[\s\S]*?<\/tr>/g) || [];
  const stock = {};

  rows.forEach((row) => {
    const name = stripTags(row.match(/toggleSource\([0-9]+,&quot;([^&]+)&quot;\)/)?.[1] || "");
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => stripTags(match[1]));
    const amount = Number(cells.find((cell, index) => index > 1 && /^-?[0-9]+(?:\.[0-9]+)?$/.test(cell)));
    if (name && Number.isFinite(amount)) stock[name] = amount;
  });

  return stock;
}

function parseAnimalRows(html) {
  const rows = html.match(/<tr onclick="\$\(&quot;#[\s\S]*?<\/tr>/g) || [];

  return rows
    .map((row) => {
      const image = row.match(/<img src="([^"]*(?:\/img\/animals\/|\/game-assets\/animals\/)[^"]+)"[^>]*title="([^"]+)"/);
      if (!image || !row.includes("Level")) return null;

      const status = stripTags(row.match(/<div class="badge[^"]*">([\s\S]*?)<\/div>/)?.[1] || "");
      const level = numberFromText(row.match(/Level\s*<b>([^<]+)<\/b>/)?.[1] || "");
      const age = stripTags(row.match(/Age\s*<b>([^<]+)<\/b>/)?.[1] || "");
      const exp = numberFromText(row.match(/Exp\s*<b>([^<]+)<\/b>/)?.[1] || "");
      const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => stripTags(match[1]));
      const ready = cells.at(-1) || "";

      return {
        type: image[2],
        image: image[1].startsWith("http") ? image[1] : `https://sfl.world${image[1]}`,
        status,
        level,
        age,
        exp,
        ready
      };
    })
    .filter(Boolean);
}

async function handleFarm(req, res) {
  const pathname = new URL(req.url, `http://127.0.0.1:${PORT}`).pathname;
  const farmId = decodeURIComponent(pathname.split("/").pop() || "").replace(/[^0-9]/g, "");
  if (!farmId) {
    send(res, 400, JSON.stringify({ error: "Missing farm id" }));
    return;
  }

  const cacheBust = Date.now();
  const requestOptions = { headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" } };
  const [landResponse, stockResponse, animalsResponse] = await Promise.all([
    fetch(`https://sfl.world/land/${farmId}?t=${cacheBust}`, requestOptions),
    fetch(`https://sfl.world/stock/${farmId}?t=${cacheBust}`, requestOptions),
    fetch(`https://sfl.world/land/${farmId}/animals?t=${cacheBust}`, requestOptions)
  ]);

  if (!landResponse.ok) throw new Error(`SFL World land HTTP ${landResponse.status}`);

  const landHtml = await landResponse.text();
  const stockHtml = stockResponse.ok ? await stockResponse.text() : "";
  const animalsHtml = animalsResponse.ok ? await animalsResponse.text() : "";

  send(res, 200, JSON.stringify({
    source: "SFL World public farm",
    updatedAt: new Date().toISOString(),
    farm: parseFarmInfo(landHtml, farmId),
    bumpkin: parseBumpkinInfo(landHtml),
    publicStock: stockHtml ? parseStockRows(stockHtml) : {},
    animals: animalsHtml ? parseAnimalRows(animalsHtml) : []
  }));
}

async function handleNfts(res) {
  try {
    const [collectiblesResponse, wearablesResponse] = await Promise.all([
      fetch("https://sfl.world/nft/land", { headers: { "Cache-Control": "no-cache" } }),
      fetch("https://sfl.world/nft/bumpkin", { headers: { "Cache-Control": "no-cache" } })
    ]);

    if (!collectiblesResponse.ok) throw new Error(`SFL World collectibles HTTP ${collectiblesResponse.status}`);
    if (!wearablesResponse.ok) throw new Error(`SFL World wearables HTTP ${wearablesResponse.status}`);

    const [collectiblesHtml, wearablesHtml] = await Promise.all([
      collectiblesResponse.text(),
      wearablesResponse.text()
    ]);

    const items = [
      ...parseNftCards(collectiblesHtml, "collectible"),
      ...parseNftCards(wearablesHtml, "wearable")
    ].filter((item) => Number.isFinite(item.flower) || Number.isFinite(item.usd));

    send(res, 200, JSON.stringify({
      source: "SFL World NFT market",
      updatedAt: new Date().toISOString(),
      items: items.sort((a, b) => {
        if (a.hasEffect !== b.hasEffect) return a.hasEffect ? -1 : 1;
        return (a.flower || Infinity) - (b.flower || Infinity);
      })
    }));
  } catch {
    send(res, 200, JSON.stringify(readNftCache()));
  }
}

async function handleMarket(res) {
  const response = await fetch(`${SFL_WORLD_URL}?t=${Date.now()}`, {
    headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" }
  });
  if (!response.ok) throw new Error(`SFL World HTTP ${response.status}`);

  const html = await response.text();
  send(res, 200, JSON.stringify({
    source: "SFL World",
    updatedAt: new Date().toISOString(),
    items: parseRows(html)
  }));
}

async function handleFlower(res) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${FLOWER_COINGECKO_ID}&vs_currencies=usd&include_24hr_change=true`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`CoinGecko HTTP ${response.status}`);

  const data = await response.json();
  send(res, 200, JSON.stringify(data));
}

function serveStatic(req, res) {
  const requested = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const filePath = path.join(ROOT, requested === "/" ? "index.html" : requested);

  if (!filePath.startsWith(ROOT)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found", "text/plain; charset=utf-8");
      return;
    }

    send(res, 200, data, mimeTypes[path.extname(filePath)] || "application/octet-stream");
  });
}

async function handleRequest(req, res) {
  try {
    if (req.method === "OPTIONS") {
      send(res, 204, "");
      return;
    }

    if (req.url.startsWith("/api/market")) {
      await handleMarket(res);
      return;
    }

    if (req.url.startsWith("/api/flower")) {
      await handleFlower(res);
      return;
    }

    if (req.url.startsWith("/api/farm/")) {
      await handleFarm(req, res);
      return;
    }

    if (req.url.startsWith("/api/profile/")) {
      await handleFarmProfile(req, res);
      return;
    }

    if (req.url.startsWith("/api/nfts")) {
      await handleNfts(res);
      return;
    }

    if (req.url.startsWith("/api/analytics")) {
      await handleAnalytics(req, res);
      return;
    }

    if (req.url.startsWith("/api/community/like")) {
      await handleCommunityLike(req, res);
      return;
    }

    if (req.url.startsWith("/api/community/visit")) {
      await handleCommunityVisit(req, res);
      return;
    }

    if (req.url.startsWith("/api/community/delete")) {
      await handleCommunityDelete(req, res);
      return;
    }

    if (req.url.startsWith("/api/community/clean")) {
      await handleCommunityClean(req, res);
      return;
    }

    if (req.url.startsWith("/api/community")) {
      await handleCommunity(req, res);
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    send(res, 502, JSON.stringify({ error: error.message }));
  }
}

const server = http.createServer(handleRequest);

if (require.main === module && !process.env.VERCEL) {
  server.listen(PORT, "127.0.0.1", () => {
    console.log(`SFL Market running at http://127.0.0.1:${PORT}`);
  });
}

module.exports = handleRequest;
module.exports.handleRequest = handleRequest;
