WidgetMetadata = {
  id: "chai.wallhaven",
  title: "Wallhaven 壁纸",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "Wallhaven SFW 壁纸浏览、筛选、搜索与大图详情",
  author: "chai-j",
  site: "https://wallhaven.cc",
  icon: "https://wallhaven.cc/favicon.ico",
  detailCacheDuration: 1800,
  modules: [
    {
      id: "browse",
      title: "壁纸浏览",
      description: "按分类、排序、分辨率和比例浏览 SFW 壁纸",
      functionName: "loadWallpapers",
      cacheDuration: 900,
      requiresWebView: false,
      params: [
        {
          name: "keyword",
          title: "关键词",
          type: "input",
          value: "",
          description: "可选，支持 Wallhaven 搜索语法",
        },
        {
          name: "categories",
          title: "分类",
          type: "enumeration",
          value: "111",
          enumOptions: [
            { title: "全部", value: "111" },
            { title: "综合", value: "100" },
            { title: "动漫", value: "010" },
            { title: "人物", value: "001" },
          ],
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          value: "date_added",
          enumOptions: [
            { title: "最新上传", value: "date_added" },
            { title: "浏览最多", value: "views" },
            { title: "收藏最多", value: "favorites" },
            { title: "排行榜", value: "toplist" },
          ],
        },
        {
          name: "top_range",
          title: "排行范围",
          type: "enumeration",
          value: "1M",
          belongTo: {
            paramName: "sort_by",
            value: ["toplist"],
          },
          enumOptions: [
            { title: "一天", value: "1d" },
            { title: "三天", value: "3d" },
            { title: "一周", value: "1w" },
            { title: "一个月", value: "1M" },
            { title: "三个月", value: "3M" },
            { title: "半年", value: "6M" },
            { title: "一年", value: "1y" },
          ],
        },
        {
          name: "atleast",
          title: "最低分辨率",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "不限", value: "" },
            { title: "1920 × 1080", value: "1920x1080" },
            { title: "2560 × 1440", value: "2560x1440" },
            { title: "3840 × 2160", value: "3840x2160" },
          ],
        },
        {
          name: "ratios",
          title: "画面比例",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "不限", value: "" },
            { title: "16:9", value: "16x9" },
            { title: "16:10", value: "16x10" },
            { title: "21:9", value: "21x9" },
            { title: "9:16 竖屏", value: "9x16" },
            { title: "1:1 方形", value: "1x1" },
          ],
        },
        {
          name: "page",
          title: "页码",
          type: "page",
          value: "1",
        },
      ],
    },
  ],
  search: {
    title: "搜索壁纸",
    functionName: "searchWallpapers",
    params: [
      {
        name: "keyword",
        title: "关键词",
        type: "input",
        value: "",
      },
      {
        name: "categories",
        title: "分类",
        type: "enumeration",
        value: "111",
        enumOptions: [
          { title: "全部", value: "111" },
          { title: "综合", value: "100" },
          { title: "动漫", value: "010" },
          { title: "人物", value: "001" },
        ],
      },
      {
        name: "page",
        title: "页码",
        type: "page",
        value: "1",
      },
    ],
  },
};

const WALLHAVEN_API_BASE = "https://wallhaven.cc/api/v1";
const WALLHAVEN_SITE_BASE = "https://wallhaven.cc";
const WALLHAVEN_HEADERS = {
  Accept: "application/json",
  Referer: "https://wallhaven.cc/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
};

const WALLHAVEN_CATEGORIES = ["111", "100", "010", "001"];
const WALLHAVEN_SORTING = ["date_added", "relevance", "views", "favorites", "toplist"];
const WALLHAVEN_TOP_RANGES = ["1d", "3d", "1w", "1M", "3M", "6M", "1y"];
const WALLHAVEN_RESOLUTIONS = ["", "1920x1080", "2560x1440", "3840x2160"];
const WALLHAVEN_RATIOS = ["", "16x9", "16x10", "21x9", "9x16", "1x1"];

function wallhavenChoice(value, allowed, fallback) {
  const text = String(value == null ? "" : value);
  return allowed.includes(text) ? text : fallback;
}

function wallhavenPageNumber(value) {
  return Math.max(1, parseInt(value, 10) || 1);
}

function buildWallhavenUrl(path, params) {
  const pairs = [];
  Object.keys(params || {}).forEach(function (key) {
    const value = params[key];
    if (value === undefined || value === null || value === "") return;
    pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(value)));
  });
  return WALLHAVEN_API_BASE + path + (pairs.length ? "?" + pairs.join("&") : "");
}

function wallhavenStatus(response) {
  return Number((response && (response.statusCode || response.status)) || 200);
}

async function requestWallhavenJson(url) {
  const response = await Widget.http.get(url, {
    headers: WALLHAVEN_HEADERS,
    allow_redirects: true,
  });
  const status = wallhavenStatus(response);
  if (!response || status >= 400) {
    if (status === 429) throw new Error("Wallhaven API 请求过于频繁，请稍后再试");
    throw new Error("Wallhaven API 请求失败: HTTP " + status);
  }

  let payload = response.data;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch (_) {
      throw new Error("Wallhaven API 返回了无效 JSON");
    }
  }
  if (!payload || typeof payload !== "object") {
    throw new Error("Wallhaven API 返回数据为空");
  }
  return payload;
}

function extractWallhavenId(value) {
  const text = String(value || "").trim();
  if (/^[a-z0-9]{6}$/i.test(text)) return text.toLowerCase();
  const pageMatch = text.match(/\/w\/([a-z0-9]{6})(?:[/?#]|$)/i);
  if (pageMatch) return pageMatch[1].toLowerCase();
  const imageMatch = text.match(/wallhaven-([a-z0-9]{6})\.(?:jpe?g|png|webp)(?:[?#]|$)/i);
  return imageMatch ? imageMatch[1].toLowerCase() : "";
}

function wallhavenPageUrl(id) {
  const wallpaperId = extractWallhavenId(id);
  return wallpaperId ? WALLHAVEN_SITE_BASE + "/w/" + wallpaperId : "";
}

function safeWallhavenImageUrl(value) {
  try {
    const parsed = new URL(String(value || ""));
    const hostname = parsed.hostname.toLowerCase();
    if (parsed.protocol !== "https:") return "";
    if (hostname !== "w.wallhaven.cc" && hostname !== "th.wallhaven.cc") return "";
    return parsed.toString();
  } catch (_) {
    return "";
  }
}

function wallhavenCategoryLabel(value) {
  const labels = {
    general: "综合",
    anime: "动漫",
    people: "人物",
  };
  return labels[String(value || "").toLowerCase()] || "壁纸";
}

function wallhavenFileSize(value) {
  const size = Number(value) || 0;
  if (!size) return "";
  if (size >= 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + " MB";
  return (size / 1024).toFixed(1) + " KB";
}

function wallhavenDescription(item) {
  const parts = [];
  const category = wallhavenCategoryLabel(item && item.category);
  if (category) parts.push("分类：" + category);
  if (item && item.resolution) parts.push("分辨率：" + item.resolution);
  if (item && item.views != null) parts.push("浏览：" + item.views);
  if (item && item.favorites != null) parts.push("收藏：" + item.favorites);
  return parts.join(" · ");
}

function mapWallhavenListItem(item) {
  if (!item || item.purity !== "sfw") return null;
  const id = extractWallhavenId(item.id);
  const link = wallhavenPageUrl(id);
  if (!id || !link) return null;

  const thumbs = item.thumbs || {};
  const largeThumb = safeWallhavenImageUrl(thumbs.large || thumbs.original || thumbs.small);
  const poster = safeWallhavenImageUrl(thumbs.original || thumbs.large || thumbs.small);
  if (!largeThumb && !poster) return null;

  return {
    id: link,
    type: "url",
    mediaType: "movie",
    link: link,
    title: "Wallhaven " + id + (item.resolution ? " · " + item.resolution : ""),
    description: wallhavenDescription(item),
    genreTitle: wallhavenCategoryLabel(item.category),
    releaseDate: item.created_at || undefined,
    coverUrl: largeThumb || poster,
    backdropPath: largeThumb || poster,
    posterPath: poster || largeThumb,
  };
}

function wallhavenQueryFromParams(params) {
  const options = params || {};
  const genreId = /^\d+$/.test(String(options.genreId || "")) ? String(options.genreId) : "";
  return genreId ? "id:" + genreId : String(options.keyword || "").trim();
}

async function loadWallpapers(params = {}) {
  const categories = wallhavenChoice(params.categories, WALLHAVEN_CATEGORIES, "111");
  const sorting = wallhavenChoice(params.sort_by, WALLHAVEN_SORTING, "date_added");
  const topRange = wallhavenChoice(params.top_range, WALLHAVEN_TOP_RANGES, "1M");
  const atleast = wallhavenChoice(params.atleast, WALLHAVEN_RESOLUTIONS, "");
  const ratios = wallhavenChoice(params.ratios, WALLHAVEN_RATIOS, "");
  const url = buildWallhavenUrl("/search", {
    q: wallhavenQueryFromParams(params),
    categories: categories,
    purity: "100",
    sorting: sorting,
    order: "desc",
    topRange: sorting === "toplist" ? topRange : "",
    atleast: atleast,
    ratios: ratios,
    page: wallhavenPageNumber(params.page),
  });

  try {
    const payload = await requestWallhavenJson(url);
    const data = Array.isArray(payload.data) ? payload.data : [];
    return data.map(mapWallhavenListItem).filter(Boolean);
  } catch (error) {
    console.error("Wallhaven 壁纸列表加载失败:", error && error.message ? error.message : error);
    return [];
  }
}

async function searchWallpapers(params = {}) {
  return loadWallpapers({
    keyword: params.keyword,
    categories: params.categories,
    sort_by: "relevance",
    page: params.page,
  });
}

function wallhavenDetailTitle(item) {
  const tags = Array.isArray(item.tags) ? item.tags : [];
  const names = tags
    .filter(function (tag) {
      return tag && tag.purity === "sfw" && tag.name;
    })
    .slice(0, 3)
    .map(function (tag) {
      return String(tag.name).trim();
    })
    .filter(Boolean);
  return names.length ? names.join(" · ") : "Wallhaven " + extractWallhavenId(item.id);
}

function wallhavenDetailDescription(item) {
  const lines = [wallhavenDescription(item)];
  const size = wallhavenFileSize(item.file_size);
  if (size) lines.push("文件：" + size + (item.file_type ? " · " + item.file_type : ""));
  if (item.uploader && item.uploader.username) lines.push("上传者：" + item.uploader.username);
  if (item.source) lines.push("来源：" + item.source);
  const image = safeWallhavenImageUrl(item.path);
  if (image) lines.push("原图：" + image);
  return lines.filter(Boolean).join("\n");
}

async function loadDetail(link) {
  const id = extractWallhavenId(link);
  if (!id) return null;

  try {
    const payload = await requestWallhavenJson(buildWallhavenUrl("/w/" + id, {}));
    const item = payload.data;
    if (!item || item.purity !== "sfw") return null;

    const pageUrl = wallhavenPageUrl(id);
    const fullImage = safeWallhavenImageUrl(item.path);
    const thumbs = item.thumbs || {};
    const largeThumb = safeWallhavenImageUrl(thumbs.large || thumbs.original || thumbs.small);
    const poster = safeWallhavenImageUrl(thumbs.original || thumbs.large || thumbs.small);
    if (!fullImage && !largeThumb && !poster) return null;

    const tags = Array.isArray(item.tags) ? item.tags : [];
    const genreItems = tags
      .filter(function (tag) {
        return tag && tag.purity === "sfw" && /^\d+$/.test(String(tag.id)) && tag.name;
      })
      .slice(0, 20)
      .map(function (tag) {
        return { id: String(tag.id), title: String(tag.name).trim() };
      });

    return {
      id: pageUrl,
      type: "url",
      mediaType: "movie",
      link: pageUrl,
      title: wallhavenDetailTitle(item),
      description: wallhavenDetailDescription(item),
      genreTitle: wallhavenCategoryLabel(item.category),
      genreItems: genreItems.length ? genreItems : undefined,
      releaseDate: item.created_at || undefined,
      coverUrl: fullImage || largeThumb || poster,
      backdropPath: fullImage || largeThumb || poster,
      posterPath: poster || largeThumb || fullImage,
      detailPoster: poster || largeThumb || fullImage,
      backdropPaths: fullImage ? [fullImage] : undefined,
    };
  } catch (error) {
    console.error("Wallhaven 壁纸详情加载失败:", error && error.message ? error.message : error);
    return null;
  }
}
