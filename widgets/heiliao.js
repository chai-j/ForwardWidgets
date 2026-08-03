WidgetMetadata = {
  id: "chai.heiliao",
  title: "黑料网",
  version: "1.0.2",
  requiredVersion: "0.0.1",
  description: "分类浏览、详情和视频流解析；自动过滤投放内容、列表广告与播放器前后贴广告",
  author: "chai-j",
  site: "https://heiliao.com",
  detailCacheDuration: 120,
  globalParams: [
    {
      name: "base_url",
      title: "基础 URL",
      type: "input",
      value: "https://heiliao.com",
    },
  ],
  modules: [
    {
      id: "browse",
      title: "分类浏览",
      description: "浏览站内文章，外链广告卡片会被自动过滤",
      functionName: "loadArticles",
      cacheDuration: 300,
      requiresWebView: false,
      params: [
        {
          name: "sort_by",
          title: "分类",
          type: "enumeration",
          value: "/",
          enumOptions: [
            { title: "全部最新", value: "/" },
            { title: "最新黑料", value: "/hlcg/" },
            { title: "今日热瓜", value: "/jrrs/" },
            { title: "热门 TOP10", value: "/top/hot/" },
            { title: "收藏 TOP10", value: "/top/favorites/" },
            { title: "每日 TOP10", value: "/mrrb/" },
            { title: "周榜精选", value: "/zbjx/" },
            { title: "月榜热瓜", value: "/ybrg/" },
            { title: "热门黑料", value: "/jqrm/" },
            { title: "经典黑料", value: "/lsdg/" },
            { title: "反差女友", value: "/fczq/" },
            { title: "校园黑料", value: "/xycg/" },
            { title: "网红黑料", value: "/whhl/" },
            { title: "明星丑闻", value: "/mxcw/" },
            { title: "原创社区", value: "/ycsq/" },
            { title: "推特社区", value: "/ttsq/" },
            { title: "网黄合集", value: "/whhj/" },
            { title: "探花专区", value: "/thzq/" },
            { title: "厕拍抄底", value: "/cpcd/" },
            { title: "社会新闻", value: "/shxw/" },
            { title: "官场爆料", value: "/gchl/" },
            { title: "影视短剧", value: "/ysdj/" },
            { title: "全球奇闻", value: "/qqqw/" },
            { title: "黑料课堂", value: "/hlkt/" },
            { title: "每日大赛", value: "/mrds/" },
            { title: "激情小说", value: "/jqxs/" },
            { title: "桃图杂志", value: "/ttzz/" },
            { title: "深夜综艺", value: "/syzy/" },
            { title: "黑料爆改", value: "/hlbg/" },
            { title: "独家爆料", value: "/djbl/" },
            { title: "往期大事记", value: "/memora/" },
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
};

const HEILIAO_DEFAULT_BASE_URL = "https://heiliao.com";
const HEILIAO_CATEGORY_PATHS = [
  "/", "/hlcg/", "/jrrs/", "/top/hot/", "/top/favorites/", "/mrrb/",
  "/zbjx/", "/ybrg/", "/jqrm/", "/lsdg/", "/fczq/", "/xycg/", "/whhl/",
  "/mxcw/", "/ycsq/", "/ttsq/", "/whhj/", "/thzq/", "/cpcd/", "/shxw/",
  "/gchl/", "/ysdj/", "/qqqw/", "/hlkt/", "/mrds/", "/jqxs/", "/ttzz/",
  "/syzy/", "/hlbg/", "/djbl/", "/memora/",
];
const HEILIAO_HEADERS = {
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7",
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
};

function heiliaoText(value) {
  return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
}

function parseHeiliaoOrigin(value) {
  const match = heiliaoText(value).match(/^(https?):\/\/([^/?#]+)(?:[/?#]|$)/i);
  if (!match) return null;
  const protocol = match[1].toLowerCase();
  const authority = match[2].toLowerCase();
  const hostMatch = authority.match(/^([a-z0-9.-]+)(?::\d+)?$/i);
  if (!hostMatch) return null;
  const hostname = hostMatch[1];
  if (hostname !== "heiliao.com" && !hostname.endsWith(".heiliao.com")) return null;
  return { origin: protocol + "://" + authority, protocol: protocol };
}

function normalizeHeiliaoBaseUrl(value) {
  const parsed = parseHeiliaoOrigin(value || HEILIAO_DEFAULT_BASE_URL);
  return parsed ? parsed.origin : HEILIAO_DEFAULT_BASE_URL;
}

function heiliaoAbsoluteUrl(value, baseUrl) {
  const raw = heiliaoText(value);
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("//")) return "https:" + raw;
  const base = normalizeHeiliaoBaseUrl(baseUrl);
  return base + (raw.startsWith("/") ? raw : "/" + raw);
}

function normalizeHeiliaoArticleUrl(value, baseUrl) {
  const base = parseHeiliaoOrigin(normalizeHeiliaoBaseUrl(baseUrl));
  if (!base) return "";
  let raw = heiliaoText(value);
  if (raw.startsWith("//")) raw = base.protocol + ":" + raw;

  let path = "";
  if (/^https?:\/\//i.test(raw)) {
    const parsed = parseHeiliaoOrigin(raw);
    if (!parsed || parsed.origin !== base.origin) return "";
    const remainder = raw.match(/^https?:\/\/[^/?#]+([\s\S]*)$/i);
    path = remainder ? remainder[1] : "";
  } else if (raw.startsWith("/")) {
    path = raw;
  }
  path = path.split(/[?#]/, 1)[0];
  if (!/^\/archives\/\d+\/?$/.test(path)) return "";
  return base.origin + path.replace(/\/?$/, "/");
}

function normalizeHeiliaoCategory(value) {
  const path = heiliaoText(value);
  return HEILIAO_CATEGORY_PATHS.indexOf(path) >= 0 ? path : "/";
}

function buildHeiliaoListUrl(baseUrl, category, page) {
  const base = normalizeHeiliaoBaseUrl(baseUrl);
  const path = normalizeHeiliaoCategory(category);
  const pageNumber = Math.max(1, parseInt(page, 10) || 1);
  if (/^\/top\/(?:hot|favorites)\/$/.test(path)) return base + path;
  if (pageNumber === 1) return base + path;
  if (path === "/") return base + "/page/" + pageNumber + "/";
  return base + path + "page/" + pageNumber + "/";
}

function heiliaoStatus(response) {
  return Number((response && (response.statusCode || response.status)) || 200);
}

function heiliaoResponsePayload(response) {
  if (!response) throw new Error("黑料网没有返回数据");
  const status = heiliaoStatus(response);
  let payload = response.data !== undefined ? response.data : response.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch (_) {
      if (status >= 400) throw new Error("黑料网请求失败: HTTP " + status);
      return payload;
    }
  }
  if (status >= 400) throw new Error("黑料网请求失败: HTTP " + status);
  return payload;
}

async function fetchHeiliaoHtml(url) {
  const response = await Widget.http.get(url, {
    headers: Object.assign({}, HEILIAO_HEADERS, { Referer: normalizeHeiliaoBaseUrl(url) + "/" }),
    allow_redirects: true,
  });
  const html = String(heiliaoResponsePayload(response) || "");
  if (!html || /Just a moment|Attention Required|cf-chl-|Cloudflare Ray ID/i.test(html)) {
    throw new Error("黑料网页面为空或被站点防护拦截");
  }
  return html;
}

function heiliaoImageUrl(node, baseUrl) {
  if (!node || !node.length) return "";
  return heiliaoAbsoluteUrl(
    node.attr("z-image-loader-url") ||
      node.attr("data-image-zoom") ||
      node.attr("data-original") ||
      node.attr("data-src") ||
      node.attr("src"),
    baseUrl
  );
}

function parseHeiliaoArticleCards(html, baseUrl) {
  const $ = Widget.html.load(html);
  const items = [];
  const seen = new Set();

  $(".video-list .video-item").each(function (_, element) {
    const card = $(element);
    const anchor = card.find("a").first();
    if (!anchor.length) return;
    if (
      anchor.hasClass("tjtagmanager") ||
      anchor.attr("data-event") === "ad_click" ||
      card.find('.tjtagmanager, [data-event="ad_click"]').length
    ) return;
    const link = normalizeHeiliaoArticleUrl(anchor.attr("href"), baseUrl);
    if (!link || seen.has(link)) return;

    const image = card.find("img").first();
    const title = heiliaoText(card.find(".title").first().text() || anchor.attr("title") || image.attr("alt"));
    if (!title) return;
    const cover = heiliaoImageUrl(image, baseUrl);

    seen.add(link);
    items.push({
      id: link,
      type: "url",
      mediaType: "movie",
      link: link,
      title: title,
      coverUrl: cover || undefined,
      posterPath: cover || undefined,
      detailPoster: cover || undefined,
      backdropPath: cover || undefined,
    });
  });

  $(".top-list-items .top-list-item").each(function (_, element) {
    const card = $(element);
    const anchor = card.find('a[href*="/archives/"]').first();
    const link = normalizeHeiliaoArticleUrl(anchor.attr("href"), baseUrl);
    if (!link || seen.has(link)) return;
    const title = heiliaoText(card.find(".top-rank-text").first().text());
    if (!title) return;

    seen.add(link);
    items.push({
      id: link,
      type: "url",
      mediaType: "movie",
      link: link,
      title: title,
    });
  });

  $(".memora-timeline a.memora-card").each(function (_, element) {
    const anchor = $(element);
    const link = normalizeHeiliaoArticleUrl(anchor.attr("href"), baseUrl);
    if (!link || seen.has(link)) return;
    const title = heiliaoText(anchor.text());
    if (!title) return;

    seen.add(link);
    items.push({
      id: link,
      type: "url",
      mediaType: "movie",
      link: link,
      title: title,
    });
  });
  return items;
}

function applyHeiliaoCover(item, cover) {
  const url = heiliaoText(cover);
  if (!url) return item;
  item.coverUrl = url;
  item.posterPath = url;
  item.detailPoster = url;
  item.backdropPath = url;
  return item;
}

function isHeiliaoPlaceholderCover(value) {
  return /\/(?:logo-nav|logo2)\.[a-z0-9]+(?:[?#]|$)/i.test(heiliaoText(value));
}

function extractHeiliaoDetailCover(html, baseUrl) {
  const players = parseHeiliaoPlayers(html, baseUrl);
  const playerCover = players[0] && players[0].pic;
  if (playerCover && !isHeiliaoPlaceholderCover(playerCover)) return playerCover;

  const $ = Widget.html.load(html);
  const images = collectHeiliaoDetailImages($, baseUrl);
  const metaCover = heiliaoAbsoluteUrl(heiliaoMeta($, "meta[property='og:image']"), baseUrl);
  if (metaCover && !isHeiliaoPlaceholderCover(metaCover)) return metaCover;
  return images[0] || "";
}

async function enrichHeiliaoArticleCovers(items, baseUrl) {
  const pending = items.filter(function (item) {
    return !item.coverUrl || isHeiliaoPlaceholderCover(item.coverUrl);
  });
  for (let offset = 0; offset < pending.length; offset += 6) {
    const batch = pending.slice(offset, offset + 6);
    await Promise.all(batch.map(async function (item) {
      try {
        applyHeiliaoCover(item, extractHeiliaoDetailCover(await fetchHeiliaoHtml(item.link), baseUrl));
      } catch (_) {}
    }));
  }
  return items;
}

async function loadArticles(params = {}) {
  const baseUrl = normalizeHeiliaoBaseUrl(params.base_url);
  const url = buildHeiliaoListUrl(baseUrl, params.sort_by, params.page);
  try {
    const items = parseHeiliaoArticleCards(await fetchHeiliaoHtml(url), baseUrl);
    return await enrichHeiliaoArticleCovers(items, baseUrl);
  } catch (error) {
    console.error("黑料网列表加载失败:", error && error.message ? error.message : error);
    throw error;
  }
}

function collectHeiliaoJsonLdNodes(value, output) {
  if (!value) return;
  if (Array.isArray(value)) {
    value.forEach(function (item) { collectHeiliaoJsonLdNodes(item, output); });
    return;
  }
  if (typeof value !== "object") return;
  output.push(value);
  if (Array.isArray(value["@graph"])) collectHeiliaoJsonLdNodes(value["@graph"], output);
}

function findHeiliaoArticleJsonLd($) {
  const nodes = [];
  $("script[type='application/ld+json']").each(function (_, element) {
    try {
      collectHeiliaoJsonLdNodes(JSON.parse($(element).html() || ""), nodes);
    } catch (_) {}
  });
  return nodes.find(function (node) {
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    return types.some(function (type) { return /^(?:Article|NewsArticle|BlogPosting)$/i.test(String(type || "")); });
  }) || {};
}

function heiliaoMeta($, selector) {
  return heiliaoText($(selector).first().attr("content"));
}

function isHeiliaoMediaUrl(value) {
  const url = heiliaoText(value);
  return /^https?:\/\//i.test(url) && /\.(?:m3u8|mp4)(?:[?#]|$)/i.test(url);
}

function heiliaoMediaKey(value) {
  return heiliaoText(value).replace(/[?#][\s\S]*$/, "");
}

function parseHeiliaoPlayers(html, baseUrl) {
  const $ = Widget.html.load(html);
  const players = [];
  $(".dplayer[config]").each(function (index, element) {
    const node = $(element);
    let config;
    try {
      config = JSON.parse(node.attr("config") || "{}");
    } catch (_) {
      return;
    }
    const video = config && config.video && typeof config.video === "object" ? config.video : {};
    const routes = [];
    const seen = new Set();
    const configuredRoutes = Array.isArray(video.urls) ? video.urls : [];
    configuredRoutes.forEach(function (route, routeIndex) {
      const url = heiliaoText(route && route.url);
      const key = heiliaoMediaKey(url);
      if (!isHeiliaoMediaUrl(url) || seen.has(key)) return;
      seen.add(key);
      routes.push({ name: heiliaoText(route.name) || "线路 " + (routeIndex + 1), url: url });
    });
    const defaultUrl = heiliaoText(video.url);
    const defaultKey = heiliaoMediaKey(defaultUrl);
    if (isHeiliaoMediaUrl(defaultUrl) && !seen.has(defaultKey)) {
      routes.unshift({ name: "默认线路", url: defaultUrl });
    }
    if (!routes.length) return;
    players.push({
      id: heiliaoText(node.attr("data-video_id")) || "video-" + (index + 1),
      title: heiliaoText(node.attr("data-video_title")) || "视频 " + (index + 1),
      pic: heiliaoAbsoluteUrl(video.pic, baseUrl),
      routes: routes,
    });
  });
  return players;
}

function collectHeiliaoDetailImages($, baseUrl) {
  const images = [];
  const seen = new Set();
  $(".editormd-preview img[data-image-preview], .editormd-preview img[data-image-zoom]").each(function (_, element) {
    const url = heiliaoImageUrl($(element), baseUrl);
    if (!url || seen.has(url) || /\/hc237\/uploads\/default\/other\//i.test(url)) return;
    seen.add(url);
    images.push(url);
  });
  return images;
}

async function loadDetail(link) {
  const baseUrl = normalizeHeiliaoBaseUrl(link);
  const url = normalizeHeiliaoArticleUrl(link, baseUrl);
  if (!url) return null;
  try {
    const html = await fetchHeiliaoHtml(url);
    const $ = Widget.html.load(html);
    const article = findHeiliaoArticleJsonLd($);
    const players = parseHeiliaoPlayers(html, baseUrl);
    const images = collectHeiliaoDetailImages($, baseUrl);
    const title = heiliaoText(
      article.headline || heiliaoMeta($, "meta[property='og:title']") || $(".detail-title, h1").first().text()
    );
    const description = heiliaoText(
      article.description || heiliaoMeta($, "meta[property='og:description']") || heiliaoMeta($, "meta[name='description']")
    );
    const firstPlayer = players[0];
    const firstRoute = firstPlayer && firstPlayer.routes[0];
    const cover = (firstPlayer && firstPlayer.pic) || heiliaoAbsoluteUrl(
      article.image && (typeof article.image === "string" ? article.image : article.image.url),
      baseUrl
    ) || heiliaoMeta($, "meta[property='og:image']") || images[0] || "";
    const episodeItems = players.map(function (player, index) {
      const route = player.routes[0];
      return {
        id: route.url,
        type: "url",
        mediaType: "movie",
        link: url,
        title: players.length > 1 ? "视频 " + (index + 1) : title,
        description: player.title,
        episode: index + 1,
        videoUrl: route.url,
        coverUrl: player.pic || cover || undefined,
        posterPath: player.pic || cover || undefined,
        detailPoster: player.pic || cover || undefined,
        backdropPath: player.pic || cover || undefined,
        playerType: "app",
      };
    });

    return {
      id: url,
      type: "url",
      mediaType: "movie",
      link: url,
      title: title || "黑料网文章",
      description: description || undefined,
      releaseDate: heiliaoText(article.datePublished) || undefined,
      coverUrl: cover || undefined,
      posterPath: cover || undefined,
      detailPoster: cover || undefined,
      backdropPath: cover || undefined,
      backdropPaths: images,
      videoUrl: firstRoute ? firstRoute.url : undefined,
      episodeItems: episodeItems,
      playerType: firstRoute ? "app" : undefined,
    };
  } catch (error) {
    console.error("黑料网详情加载失败:", error && error.message ? error.message : error);
    throw error;
  }
}
