WidgetMetadata = {
  id: "chai.missav",
  title: "MissAV",
  version: "3.0.0",
  requiredVersion: "0.0.1",
  description: "MissAV 搜索、分类、榜单与播放",
  author: "chai-j",
  site: "https://missav.ai",
  detailCacheDuration: 300,
  modules: [
    {
      id: "recent",
      title: "最近更新",
      functionName: "loadRecent",
      cacheDuration: 900,
      requiresWebView: false,
      params: [{ name: "page", title: "页码", type: "page" }],
    },
    {
      id: "release",
      title: "新作上市",
      functionName: "loadRelease",
      cacheDuration: 900,
      requiresWebView: false,
      params: [{ name: "page", title: "页码", type: "page" }],
    },
    {
      id: "todayHot",
      title: "今日热门",
      functionName: "loadTodayHot",
      cacheDuration: 900,
      requiresWebView: false,
      params: [{ name: "page", title: "页码", type: "page" }],
    },
    {
      id: "weeklyHot",
      title: "本周热门",
      functionName: "loadWeeklyHot",
      cacheDuration: 900,
      requiresWebView: false,
      params: [{ name: "page", title: "页码", type: "page" }],
    },
    {
      id: "monthlyHot",
      title: "本月热门",
      functionName: "loadMonthlyHot",
      cacheDuration: 900,
      requiresWebView: false,
      params: [{ name: "page", title: "页码", type: "page" }],
    },
    {
      id: "chineseSubtitle",
      title: "中文字幕",
      functionName: "loadChineseSubtitle",
      cacheDuration: 900,
      requiresWebView: false,
      params: [{ name: "page", title: "页码", type: "page" }],
    },
    {
      id: "category",
      title: "分类浏览",
      functionName: "loadCategory",
      cacheDuration: 900,
      requiresWebView: false,
      params: [
        {
          name: "url",
          title: "分类",
          type: "enumeration",
          value: "https://missav.ai/cn/new",
          enumOptions: [
            { title: "最近更新", value: "https://missav.ai/cn/new" },
            { title: "新作上市", value: "https://missav.ai/cn/release" },
            { title: "无码流出", value: "https://missav.ai/cn/uncensored-leak" },
            { title: "FC2", value: "https://missav.ai/cn/fc2" },
            { title: "HEYZO", value: "https://missav.ai/cn/heyzo" },
            { title: "东京热", value: "https://missav.ai/cn/tokyohot" },
            { title: "中文字幕", value: "https://missav.ai/cn/chinese-subtitle" },
            { title: "高清", value: "https://missav.ai/cn/genres/高清" },
            { title: "独家", value: "https://missav.ai/cn/genres/独家" },
          ],
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" },
          ],
        },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "loadResource",
      title: "加载播放资源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      requiresWebView: false,
      params: [],
    },
  ],
  search: {
    title: "搜索影片",
    functionName: "searchVideos",
    params: [
      { name: "keyword", title: "关键词", type: "input", value: "" },
      {
        name: "sort_by",
        title: "排序",
        type: "enumeration",
        value: "released_at",
        enumOptions: [
          { title: "发行日期", value: "released_at" },
          { title: "最近更新", value: "published_at" },
          { title: "收藏数", value: "saved" },
          { title: "今日浏览数", value: "today_views" },
          { title: "本周浏览数", value: "weekly_views" },
          { title: "本月浏览数", value: "monthly_views" },
          { title: "总浏览数", value: "views" },
        ],
      },
      { name: "page", title: "页码", type: "page" },
    ],
  },
};

var MISSAV_BASE_URL = "https://missav.ai";
var MISSAV_USER_AGENT =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";

function cleanText(value) {
  return String(value == null ? "" : value)
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2f;/gi, "/")
    .replace(/&#x2F;/g, "/");
}

function missavHeaders(referer) {
  return {
    "User-Agent": MISSAV_USER_AGENT,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.7",
    Referer: referer || MISSAV_BASE_URL + "/cn",
  };
}

function isBlockedPage(html) {
  return /Just a moment|Attention Required|cf-error-details|Cloudflare Ray ID|challenge-platform/i.test(
    html || ""
  );
}

function decodeUrlPart(value) {
  try {
    return decodeURIComponent(value);
  } catch (_) {
    return value;
  }
}

function normalizeUrl(value) {
  var url = decodeHtml(cleanText(value));
  if (!url || /^javascript:/i.test(url)) return "";
  if (url.indexOf("//") === 0) url = "https:" + url;
  if (url.charAt(0) === "/") url = MISSAV_BASE_URL + url;
  if (!/^https?:\/\//i.test(url)) return "";
  return url.split("#")[0];
}

function isMissavHost(url) {
  return /^https?:\/\/(?:www\.)?missav\.ai(?:\/|$)/i.test(String(url || ""));
}

function urlPath(url) {
  var match = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)/i);
  return match ? match[1] : "";
}

function isVideoUrl(url) {
  if (!isMissavHost(url)) return false;
  var path = urlPath(url).replace(/\/+$/, "");
  // 当前站点有时会把地区路由前加上 dm 数字前缀；影片链接本身仍是
  // /cn/<slug>，这里两种形式都接受，但不把 /cn 等导航链接当影片。
  var match = path.match(/^\/(?:dm\d+\/)?[a-z]{2,3}\/([^/]+)$/i);
  if (!match) return false;
  var slug = decodeUrlPart(match[1]);
  if (
    /^(new|release|search|today-hot|weekly-hot|monthly-hot|chinese-subtitle|uncensored-leak|fc2|heyzo|tokyohot|genres|actress|actor|star|maker|label|vr|dm\d+)$/i.test(
      slug
    )
  ) {
    return false;
  }
  return /^[a-z0-9][a-z0-9-]*$/i.test(slug);
}

function normalizeVideoUrl(value) {
  var url = normalizeUrl(value);
  return isVideoUrl(url) ? url : "";
}

function normalizeListingUrl(value) {
  var url = normalizeUrl(value);
  if (!url || !isMissavHost(url)) return MISSAV_BASE_URL + "/cn/new";
  var path = urlPath(url);
  if (!/^\/(?:dm\d+\/)?[a-z]{2,3}(?:\/|$)/i.test(path)) return MISSAV_BASE_URL + "/cn/new";
  return url;
}

function pageParams(params, defaultSort) {
  params = params || {};
  var result = {};
  var sort = cleanText(params.sort_by || defaultSort || "");
  var page = Math.max(1, parseInt(params.page, 10) || 1);
  if (sort) result.sort = sort;
  if (page > 1) result.page = String(page);
  return result;
}

async function requestHtml(url, params) {
  var response = await Widget.http.get(url, {
    headers: missavHeaders(url),
    params: params || {},
    allow_redirects: true,
  });
  var status = Number(response && (response.statusCode || response.status) || 200);
  var html = String(response && response.data || "");
  if (status >= 400) throw new Error("MissAV 请求失败：HTTP " + status);
  if (!html || isBlockedPage(html)) {
    throw new Error("MissAV 被站点防护拦截，请稍后重试或更换网络");
  }
  return html;
}

async function fetchListing(url, params) {
  try {
    var html = await requestHtml(url, params);
    var items = parseVideoList(html);
    if (!items.length) throw new Error("MissAV 页面没有解析到影片条目");
    return items;
  } catch (error) {
    console.error("[MissAV] 列表请求失败:", error.message || error);
    throw error;
  }
}

async function searchVideos(params) {
  params = params || {};
  var keyword = cleanText(params.keyword);
  if (!keyword) return [];
  var url = MISSAV_BASE_URL + "/cn/search/" + encodeURIComponent(keyword);
  return fetchListing(url, pageParams(params, "released_at"));
}

async function loadRecent(params) {
  return fetchListing(MISSAV_BASE_URL + "/cn/new", pageParams(params, "published_at"));
}

async function loadRelease(params) {
  return fetchListing(MISSAV_BASE_URL + "/cn/release", pageParams(params, "released_at"));
}

async function loadTodayHot(params) {
  return fetchListing(MISSAV_BASE_URL + "/cn/today-hot", pageParams(params, "today_views"));
}

async function loadWeeklyHot(params) {
  return fetchListing(MISSAV_BASE_URL + "/cn/weekly-hot", pageParams(params, "weekly_views"));
}

async function loadMonthlyHot(params) {
  return fetchListing(MISSAV_BASE_URL + "/cn/monthly-hot", pageParams(params, "monthly_views"));
}

async function loadChineseSubtitle(params) {
  return fetchListing(MISSAV_BASE_URL + "/cn/chinese-subtitle", pageParams(params, "released_at"));
}

async function loadCategory(params) {
  params = params || {};
  var url = params.genreId || params.peopleId || params.url || MISSAV_BASE_URL + "/cn/new";
  return fetchListing(normalizeListingUrl(url), pageParams(params, "released_at"));
}

function imageValue($image) {
  if (!$image || !$image.length) return "";
  var value =
    $image.attr("data-src") ||
    $image.attr("data-original") ||
    $image.attr("data-lazy-src") ||
    $image.attr("src") ||
    "";
  return decodeHtml(cleanText(value));
}

function videoCodeFromUrl(url) {
  var path = urlPath(url);
  var value = path.split("/").pop() || "";
  return decodeUrlPart(value)
    .replace(/-uncensored-leak$/i, "")
    .toUpperCase();
}

function parseVideoList(html) {
  var $ = Widget.html.load(html);
  var items = [];
  var seen = {};

  $("a[href]").each(function (_, element) {
    var $link = $(element);
    var link = normalizeVideoUrl($link.attr("href"));
    if (!link || seen[link]) return;

    var $image = $link.find("img").first();
    if (!$image.length) $image = $link.closest("div").find("img").first();
    if (!$image.length && !$link.attr("title")) return;

    var title = cleanText(
      $link.attr("title") ||
        $image.attr("alt") ||
        $link.find("[class*='title']").first().text() ||
        $link.text()
    );
    var code = videoCodeFromUrl(link);
    if (!title) title = code;
    if (!title) return;

    var cover = imageValue($image);
    var duration = cleanText(
      $link.find(".duration").first().text() ||
        $link.closest("div").find(".duration").first().text()
    );
    seen[link] = true;
    items.push({
      id: link,
      type: "url",
      title: title,
      coverUrl: cover || undefined,
      posterPath: cover || undefined,
      backdropPath: cover || "https://fourhoi.com/" + code + "/cover-t.jpg",
      mediaType: "movie",
      durationText: duration || undefined,
      description: "番号: " + code,
      link: link,
      playerType: "system",
    });
  });
  return items;
}

function sourceQuality(source) {
  var match = String(source && source.label || "").match(/(\d{3,4})/);
  return match ? parseInt(match[1], 10) : 0;
}

function extractMediaSources($, html) {
  var sources = [];
  var seen = {};

  function addSource(url, label, type) {
    var value = decodeHtml(cleanText(url)).replace(/\\\//g, "/");
    if (!/^https?:\/\//i.test(value) || !/\.(?:m3u8|mp4)(?:[?#]|$)/i.test(value) || seen[value]) return;
    seen[value] = true;
    var text = cleanText(label);
    var quality = text.match(/(\d{3,4})/);
    sources.push({
      url: value,
      label: quality ? quality[1] + "p" : text || "默认清晰度",
      type: cleanText(type),
    });
  }

  $("video source[src], source[src]").each(function (_, element) {
    var $source = $(element);
    addSource(
      $source.attr("src"),
      $source.attr("size") || $source.attr("label") || $source.attr("res"),
      $source.attr("type")
    );
  });
  $("video[src]").each(function (_, element) {
    var $video = $(element);
    addSource($video.attr("src"), $video.attr("data-quality"), $video.attr("type"));
  });

  var rawHtml = String(html || "");
  var escapedHtml = rawHtml.replace(/\\\//g, "/");
  var matches = escapedHtml.match(
    /https?:\/\/[^"'\s<>]+\.(?:m3u8|mp4)(?:\?[^"'\s<>]*)?/gi
  ) || [];
  for (var i = 0; i < matches.length && i < 30; i++) {
    addSource(
      matches[i].replace(/\\\//g, "/"),
      "默认清晰度",
      /\.m3u8(?:\?|$)/i.test(matches[i]) ? "application/x-mpegURL" : "video/mp4"
    );
  }

  // MissAV 当前播放器通常把 surrit/nineyu 的 UUID 放在脚本变量里，
  // 不一定直接渲染 <source>。兼容明文/转义 URL，以及旧版 seek 变量。
  if (!sources.length) {
    var playlistMatch = escapedHtml.match(
      /https?:\/\/(?:surrit|nineyu)\.com\/[^"'\s<>]+\/playlist\.m3u8(?:\?[^"'\s<>]*)?/i
    );
    if (playlistMatch) {
      addSource(playlistMatch[0], "默认清晰度", "application/x-mpegURL");
    }
  }
  if (!sources.length) {
    $("script").each(function (_, element) {
      if (sources.length) return;
      var script = String($(element).html() || "").replace(/\\\//g, "/");
      if (!/(?:playlist\.m3u8|(?:^|[^a-z])seek(?:[^a-z]|$))/i.test(script)) return;
      var uuid = script.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
      if (uuid) addSource("https://surrit.com/" + uuid[0] + "/playlist.m3u8", "默认清晰度", "application/x-mpegURL");
    });
  }
  sources.sort(function (a, b) {
    return sourceQuality(b) - sourceQuality(a);
  });
  return sources;
}

function firstMeta($, selector, attribute) {
  var value = $(selector).first().attr(attribute || "content");
  return cleanText(value);
}

function parseReleaseDate(text) {
  var match = cleanText(text).match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
  if (!match) return "";
  return match[1] + "-" + String(match[2]).padStart(2, "0") + "-" + String(match[3]).padStart(2, "0");
}

function parseDetailTags($) {
  var result = [];
  var seen = {};
  $("a[href*='/genres/'], .video-details a[href*='/cn/genres/']").each(function (_, element) {
    var $link = $(element);
    var id = normalizeListingUrl($link.attr("href"));
    var title = cleanText($link.text());
    if (!title || !id || seen[id]) return;
    seen[id] = true;
    result.push({ id: id, title: title });
  });
  return result.slice(0, 30);
}

function parsePeople($) {
  var result = [];
  var seen = {};
  $("a[href*='/actress/'], a[href*='/actor/'], a[href*='/star/']").each(function (_, element) {
    var $link = $(element);
    var id = normalizeListingUrl($link.attr("href"));
    var title = cleanText($link.text());
    if (!title || !id || seen[id]) return;
    seen[id] = true;
    result.push({ id: id, title: title, role: "演员" });
  });
  return result.slice(0, 20);
}

function parseDetail(link, html) {
  var $ = Widget.html.load(html);
  var code = videoCodeFromUrl(link);
  var title =
    firstMeta($, "meta[property='og:title']") ||
    cleanText($("h1").first().text()) ||
    cleanText($("title").first().text()).replace(/\s*-\s*MissAV.*$/i, "") ||
    code;
  var description =
    firstMeta($, "meta[property='og:description']") ||
    firstMeta($, "meta[name='description']") ||
    cleanText($(".video-description, .description").first().text());
  var cover =
    firstMeta($, "meta[property='og:image']") ||
    firstMeta($, "meta[name='twitter:image']") ||
    cleanText($("video").first().attr("poster"));
  var detailText = cleanText($("body").text());
  var releaseDate = parseReleaseDate(detailText);
  var sources = extractMediaSources($, html);
  var item = {
    id: link,
    type: "url",
    title: title,
    description: description || "番号: " + code,
    coverUrl: cover || undefined,
    posterPath: cover || undefined,
    backdropPath: cover || "https://fourhoi.com/" + code + "/cover-t.jpg",
    mediaType: "movie",
    releaseDate: releaseDate || undefined,
    videoUrl: sources.length ? sources[0].url : undefined,
    genreItems: parseDetailTags($),
    peoples: parsePeople($),
    link: link,
    playerType: "system",
  };
  if (sources.length) {
    item.customHeaders = missavHeaders(link);
  }
  return item;
}

async function loadDetail(link) {
  var normalized = normalizeVideoUrl(link);
  if (!normalized) return null;
  try {
    var html = await requestHtml(normalized, {});
    return parseDetail(normalized, html);
  } catch (error) {
    console.error("[MissAV] 详情请求失败:", error.message || error);
    throw error;
  }
}

async function loadResource(params) {
  params = params || {};
  var directUrl = cleanText(params.videoUrl);
  if (directUrl && /^(?:https?:\/\/)/i.test(directUrl)) {
    return [{
      name: "默认清晰度",
      description: "页面直链",
      url: directUrl,
      customHeaders: missavHeaders(params.link || MISSAV_BASE_URL + "/cn"),
      playerType: "system",
    }];
  }

  var link = normalizeVideoUrl(params.link || params.id);
  if (!link) throw new Error("缺少 MissAV 播放页链接");
  var html = await requestHtml(link, {});
  var $ = Widget.html.load(html);
  var sources = extractMediaSources($, html);
  if (!sources.length) throw new Error("MissAV 页面没有找到可播放资源");
  return sources.map(function (source) {
    return {
      name: source.label,
      description: source.type || "视频",
      url: source.url,
      customHeaders: missavHeaders(link),
      playerType: "system",
    };
  });
}
