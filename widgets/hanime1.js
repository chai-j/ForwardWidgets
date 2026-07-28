WidgetMetadata = {
  "id": "chai.hanime1",
  "title": "Hanime1",
  "version": "2.1.0",
  "requiredVersion": "0.0.1",
  "description": "Hanime1 浏览、搜索、中文字幕与多清晰度播放",
  "author": "chai-j",
  "site": "https://hanime1.me",
  "detailCacheDuration": 300,
  "modules": [
    {
      "id": "browse",
      "title": "分类浏览",
      "functionName": "loadVideos",
      "cacheDuration": 900,
      "requiresWebView": false,
      "params": [
        {
          "name": "genre",
          "title": "影片类型",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
            },
            {
              "title": "里番",
              "value": "hentai"
            },
            {
              "title": "泡面番",
              "value": "short_anime"
            },
            {
              "title": "Motion Anime",
              "value": "motion"
            },
            {
              "title": "3DCG",
              "value": "3dcg"
            },
            {
              "title": "2.5D",
              "value": "2_5d"
            },
            {
              "title": "2D 动画",
              "value": "2d"
            },
            {
              "title": "AI 生成",
              "value": "ai"
            },
            {
              "title": "MMD",
              "value": "mmd"
            },
            {
              "title": "Cosplay",
              "value": "cosplay"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "排序",
          "type": "enumeration",
          "value": "new_release",
          "enumOptions": [
            {
              "title": "最新上市",
              "value": "new_release"
            },
            {
              "title": "最新上传",
              "value": "latest_upload"
            },
            {
              "title": "本日排行",
              "value": "daily_rank"
            },
            {
              "title": "本周排行",
              "value": "weekly_rank"
            },
            {
              "title": "本月排行",
              "value": "monthly_rank"
            },
            {
              "title": "观看次数",
              "value": "views"
            },
            {
              "title": "时长最长",
              "value": "duration"
            },
            {
              "title": "他们在看",
              "value": "watching"
            }
          ]
        },
        {
          "name": "subtitle",
          "title": "字幕筛选",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部影片",
              "value": "all"
            },
            {
              "title": "中文字幕",
              "value": "chinese"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "loadResource",
      "title": "加载播放资源",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 0,
      "requiresWebView": false,
      "params": []
    }
  ],
  "search": {
    "title": "搜索影片",
    "functionName": "searchVideos",
    "params": [
      {
        "name": "keyword",
        "title": "关键词",
        "type": "input",
        "value": ""
      },
      {
        "name": "sort_by",
        "title": "排序",
        "type": "enumeration",
        "value": "new_release",
        "enumOptions": [
          {
            "title": "最新上市",
            "value": "new_release"
          },
          {
            "title": "最新上传",
            "value": "latest_upload"
          },
          {
            "title": "本日排行",
            "value": "daily_rank"
          },
          {
            "title": "本周排行",
            "value": "weekly_rank"
          },
          {
            "title": "本月排行",
            "value": "monthly_rank"
          },
          {
            "title": "观看次数",
            "value": "views"
          },
          {
            "title": "时长最长",
            "value": "duration"
          },
          {
            "title": "他们在看",
            "value": "watching"
          }
        ]
      },
      {
        "name": "page",
        "title": "页码",
        "type": "page"
      }
    ]
  }
};

var HANIME_HOSTS = ["https://hanime1.com", "https://hanime1.me"];
var HANIME_BASE_URL = HANIME_HOSTS[0];
var HANIME_USER_AGENT =
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

function pageHeaders(referer) {
  return {
    "User-Agent": HANIME_USER_AGENT,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.7,en;q=0.6",
    Referer: referer || HANIME_BASE_URL + "/",
  };
}

function playbackHeaders(referer) {
  return {
    "User-Agent": HANIME_USER_AGENT,
    Referer: referer || HANIME_BASE_URL + "/",
  };
}

function isBlockedPage(html) {
  return /Just a moment|Attention Required|cf-error-details|Sorry, you have been blocked|Cloudflare Ray ID/i.test(
    html || ""
  );
}

function hostSwap(url, host) {
  return String(url || "").replace(/^https?:\/\/[^/]+/i, host);
}

function normalizeSiteUrl(value) {
  var url = decodeHtml(cleanText(value));
  if (!url || /^javascript:/i.test(url)) return "";
  if (url.indexOf("//") === 0) url = "https:" + url;
  if (url.charAt(0) === "/") url = HANIME_BASE_URL + url;
  if (!/^https?:\/\//i.test(url)) url = HANIME_BASE_URL + "/" + url;
  return url.split("#")[0];
}

function normalizeWatchUrl(value) {
  var url = normalizeSiteUrl(value);
  if (!/^https?:\/\/(?:www\.)?hanime1\.(?:com|me)\/watch\?v=\d+/i.test(url)) return "";
  return url;
}

function normalizeFilterUrl(value) {
  var url = normalizeSiteUrl(value);
  if (!/^https?:\/\/(?:www\.)?hanime1\.(?:com|me)\/(?:search|user\/?)/i.test(url)) return "";
  return url;
}

function imageValue(value) {
  var raw = decodeHtml(cleanText(value));
  if (!raw) return "";
  // 仅对真正的 srcset（逗号后带宽度）取第一项，不破坏签名 URL 中的逗号。
  if (/\s+\d+w(?:\s*,|$)/i.test(raw)) raw = raw.split(",")[0];
  return cleanText(raw).split(/\s+/)[0];
}

function sortValue(value) {
  var values = {
    new_release: "最新上市",
    latest_upload: "最新上傳",
    daily_rank: "本日排行",
    weekly_rank: "本週排行",
    monthly_rank: "本月排行",
    views: "觀看次數",
    duration: "時長最長",
    watching: "他們在看",
  };
  return values[value] || "";
}

function genreValue(value) {
  var values = {
    hentai: "裏番",
    short_anime: "泡麵番",
    motion: "Motion Anime",
    "3dcg": "3DCG",
    "2_5d": "2.5D",
    "2d": "2D動畫",
    ai: "AI生成",
    mmd: "MMD",
    cosplay: "Cosplay",
  };
  return values[value] || "";
}

function buildRequest(params, fixedTags) {
  params = params || {};
  var requestParams = {};
  var keyword = cleanText(params.keyword);
  var genre = genreValue(params.genre);
  var sort = sortValue(params.sort_by);
  var page = Math.max(1, parseInt(params.page, 10) || 1);
  if (keyword) {
    requestParams.query = keyword;
    requestParams.broad = "on";
  }
  if (genre) requestParams.genre = genre;
  if (sort) requestParams.sort = sort;
  if (fixedTags && fixedTags.length) requestParams["tags[]"] = fixedTags[0];
  if (page > 1) requestParams.page = String(page);
  return { url: HANIME_BASE_URL + "/search", params: requestParams };
}

async function requestHtml(url, params, referer) {
  var candidates = [url];
  for (var i = 0; i < HANIME_HOSTS.length; i++) {
    var candidate = hostSwap(url, HANIME_HOSTS[i]);
    if (candidates.indexOf(candidate) < 0) candidates.push(candidate);
  }

  var lastError = null;
  for (var j = 0; j < candidates.length; j++) {
    try {
      var response = await Widget.http.get(candidates[j], {
        headers: pageHeaders(referer || candidates[j]),
        params: params || {},
        allow_redirects: true,
      });
      var status = Number(response && (response.statusCode || response.status) || 200);
      var html = String(response && response.data || "");
      if (status >= 400) throw new Error("HTTP " + status);
      if (!html || isBlockedPage(html)) throw new Error("站点防护页面");
      return { url: candidates[j], html: html };
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error("Hanime1 请求失败：" + (lastError && lastError.message || "未知错误"));
}

function appendPage(url, page) {
  var pageNumber = Math.max(1, parseInt(page, 10) || 1);
  if (pageNumber <= 1) return url;
  return url + (url.indexOf("?") >= 0 ? "&" : "?") + "page=" + pageNumber;
}

async function loadJumpedListing(params) {
  params = params || {};
  var target = normalizeFilterUrl(params.genreId || params.peopleId || "");
  if (!target) return null;
  var response = await requestHtml(appendPage(target, params.page), {}, HANIME_BASE_URL + "/");
  return parseVideoList(response.html);
}

async function searchVideos(params) {
  if (!cleanText(params && params.keyword)) return [];
  var jumped = await loadJumpedListing(params);
  if (jumped) return jumped;
  var request = buildRequest(params || {}, []);
  var response = await requestHtml(request.url, request.params, HANIME_BASE_URL + "/");
  return parseVideoList(response.html);
}

async function loadVideos(params) {
  var jumped = await loadJumpedListing(params);
  if (jumped) return jumped;
  var fixedTags = params && params.subtitle === "chinese" ? ["中文字幕"] : [];
  var request = buildRequest(params || {}, fixedTags);
  var response = await requestHtml(request.url, request.params, HANIME_BASE_URL + "/");
  return parseVideoList(response.html);
}
function normalizeCardLink(value) {
  var url = normalizeSiteUrl(value);
  return normalizeWatchUrl(url);
}

function cardImage($, $card) {
  var $image = $card.find("img.main-thumb").first();
  if (!$image.length) $image = $card.find("img").first();
  return imageValue(
    $image.attr("data-src") ||
      $image.attr("data-original") ||
      $image.attr("data-srcset") ||
      $image.attr("src")
  );
}

function cardToVideoItem($, element) {
  var $card = $(element);
  var href =
    $card.attr("href") ||
    $card.find("a.video-link").first().attr("href") ||
    $card.find("a[href*='/watch?v=']").first().attr("href") ||
    "";
  var link = normalizeCardLink(href);
  if (!link) return null;

  var $image = $card.find("img.main-thumb").first();
  var title = cleanText(
    $card.attr("title") ||
      $card.find(".title").first().text() ||
      $card.find(".card-mobile-title").first().text() ||
      ($image.length ? $image.attr("alt") : "")
  );
  if (!title) return null;

  var cover = cardImage($, $card);
  var duration = cleanText(
    $card.find(".duration").first().text() ||
      $card.find(".card-mobile-duration").first().text()
  );
  var author = cleanText(
    $card.find(".subtitle a").first().text() ||
      $card.find(".card-mobile-user").first().text() ||
      $card.find(".home-rows-videos-user").first().text()
  );
  var stats = [];
  $card.find(".stat-item").each(function (_, stat) {
    var text = cleanText($(stat).text()).replace(/^thumb_up\s*/i, "");
    if (text && stats.indexOf(text) < 0) stats.push(text);
  });
  var description = [];
  if (author) description.push("作者：" + author);
  if (stats.length) description.push(stats.join(" · "));

  return {
    id: link,
    type: "url",
    title: title,
    coverUrl: cover || undefined,
    posterPath: cover || undefined,
    backdropPath: cover || undefined,
    mediaType: "movie",
    durationText: duration || undefined,
    description: description.join("\n") || undefined,
    link: link,
    playerType: "system",
  };
}

function parseVideoList(html) {
  var $ = Widget.html.load(html);
  var items = [];
  var seen = {};
  function addCandidates(selector) {
    $(selector).each(function (_, element) {
      var item = cardToVideoItem($, element);
      if (!item || seen[item.link]) return;
      seen[item.link] = true;
      items.push(item);
    });
  }
  addCandidates("div.video-item-container");
  addCandidates(".content-padding-new .search-doujin-videos");
  addCandidates(".home-rows-videos-wrapper > a[href*='/watch?v=']");
  addCandidates("a.video-link[href*='/watch?v=']");
  return items;
}

function jsonLdVideo($) {
  var result = {};
  $("script[type='application/ld+json']").each(function (_, element) {
    if (result.name && result.thumbnailUrl) return;
    try {
      var parsed = JSON.parse($(element).html() || "null");
      var values = Array.isArray(parsed) ? parsed : [parsed];
      for (var i = 0; i < values.length; i++) {
        var value = values[i] || {};
        if (Array.isArray(value["@graph"])) values = values.concat(value["@graph"]);
        if (value["@type"] === "VideoObject" || value.contentUrl || value.thumbnailUrl) {
          result = value;
          return;
        }
      }
    } catch (_) {
      // 忽略损坏的 JSON-LD，继续使用 DOM 兜底。
    }
  });
  return result;
}

function sourceQuality(source) {
  var match = String(source && source.label || "").match(/(\d{3,4})/);
  return match ? parseInt(match[1], 10) : 0;
}

function extractVideoSources($, html) {
  var sources = [];
  var seen = {};
  function addSource(url, label, type) {
    var value = decodeHtml(cleanText(url));
    if (!/^https?:\/\//i.test(value) || !/\.(?:mp4|m3u8)(?:[?#]|$)/i.test(value) || seen[value]) return;
    seen[value] = true;
    var cleanLabel = cleanText(label);
    var quality = cleanLabel.match(/(\d{3,4})/);
    sources.push({
      url: value,
      label: quality ? quality[1] + "p" : cleanLabel || "默认清晰度",
      type: cleanText(type),
    });
  }
  $("video#player source[src], video source[src], source[src]").each(function (_, element) {
    var $source = $(element);
    addSource(
      $source.attr("src"),
      $source.attr("size") || $source.attr("label") || $source.attr("res") || $source.attr("data-quality"),
      $source.attr("type")
    );
  });
  $("video#player[src], video[src]").each(function (_, element) {
    var $video = $(element);
    addSource($video.attr("src"), $video.attr("data-quality"), $video.attr("type"));
  });
  var matches = String(html || "").match(
    /https?:\/\/[^"'\s<>]+\.(?:mp4|m3u8)(?:\?[^"'\s<>]*)?/gi
  ) || [];
  for (var i = 0; i < matches.length && i < 30; i++) {
    addSource(matches[i], "默认清晰度", /\.m3u8(?:\?|$)/i.test(matches[i]) ? "application/x-mpegURL" : "video/mp4");
  }
  sources.sort(function (a, b) {
    return sourceQuality(b) - sourceQuality(a);
  });
  return sources;
}

function firstMeta($, selector, attribute) {
  return cleanText($(selector).first().attr(attribute || "content"));
}

function parseReleaseDate(value) {
  var match = cleanText(value).match(/(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/);
  if (!match) return "";
  return match[1] + "-" + String(match[2]).padStart(2, "0") + "-" + String(match[3]).padStart(2, "0");
}

function detailGenreItems($) {
  var result = [];
  var seen = {};
  $(".single-video-tag a[href], a[href*='tags%5B%5D='], a[href*='/search?genre=']").each(function (_, element) {
    var $link = $(element);
    var id = normalizeFilterUrl($link.attr("href"));
    var title = cleanText($link.text()).replace(/\s*\(\d+\)\s*$/, "");
    if (!id || !title || seen[id]) return;
    seen[id] = true;
    result.push({ id: id, title: title });
  });
  return result.slice(0, 30);
}

function detailPeople($) {
  var result = [];
  var seen = {};
  $(".video-details-wrapper a[href*='/user/'], #video-artist-name[href*='/user/']").each(function (_, element) {
    var $link = $(element);
    var id = normalizeFilterUrl($link.attr("href"));
    var $image = $link.find("img").first();
    var title = cleanText(($image.length && $image.attr("alt")) || $link.text());
    if (!id || !title || seen[id]) return;
    seen[id] = true;
    result.push({
      id: id,
      title: title,
      avatar: imageValue($image.attr("data-src") || $image.attr("src")) || undefined,
      role: "作者",
    });
  });
  return result.slice(0, 20);
}

function cleanTitle(value) {
  return cleanText(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/\s*[-–|]\s*H動漫.*$/i, "")
    .replace(/\s*[-–|]\s*Hanime1\.me.*$/i, "")
    .trim();
}

function parseDetail(link, html) {
  var $ = Widget.html.load(html);
  var jsonLd = jsonLdVideo($);
  var title = cleanTitle(
    $("#shareBtn-title").first().text() ||
      jsonLd.name ||
      firstMeta($, "meta[property='og:title']") ||
      firstMeta($, "meta[name='twitter:title']") ||
      $("h1, h3.title").first().text() ||
      $("title").first().text()
  );
  var description = cleanText(
    $(".video-caption-text").first().text() ||
      jsonLd.description ||
      firstMeta($, "meta[property='og:description']") ||
      firstMeta($, "meta[name='description']")
  );
  var cover = imageValue(
    jsonLd.thumbnailUrl ||
      firstMeta($, "meta[property='og:image']") ||
      firstMeta($, "meta[name='twitter:image']") ||
      $("video#player").first().attr("poster")
  );
  var sources = extractVideoSources($, html);
  var releaseDate = cleanText(jsonLd.uploadDate || jsonLd.datePublished) || parseReleaseDate($("body").text());
  var relatedItems = parseVideoList(html).filter(function (item) {
    return item.link !== link;
  }).slice(0, 12);
  var item = {
    id: link,
    type: "url",
    title: title || "Hanime1 视频",
    description: description || undefined,
    coverUrl: cover || undefined,
    posterPath: cover || undefined,
    backdropPath: cover || undefined,
    mediaType: "movie",
    releaseDate: releaseDate || undefined,
    videoUrl: sources.length ? sources[0].url : undefined,
    genreItems: detailGenreItems($),
    peoples: detailPeople($),
    relatedItems: relatedItems.length ? relatedItems : undefined,
    link: link,
    playerType: "system",
  };
  if (sources.length) item.customHeaders = playbackHeaders(link);
  return item;
}

async function loadDetail(link) {
  var normalizedLink = normalizeWatchUrl(link);
  if (!normalizedLink) return null;
  try {
    var response = await requestHtml(normalizedLink, {}, HANIME_BASE_URL + "/");
    return parseDetail(normalizedLink, response.html);
  } catch (error) {
    console.error("[Hanime1] 详情请求失败:", error.message || error);
    throw error;
  }
}

async function loadResource(params) {
  params = params || {};
  var directUrl = cleanText(params.videoUrl);
  if (directUrl && /^https?:\/\//i.test(directUrl)) {
    return [{
      name: "默认清晰度",
      description: "页面直链",
      url: directUrl,
      customHeaders: playbackHeaders(params.link || HANIME_BASE_URL + "/"),
      playerType: "system",
    }];
  }
  var link = normalizeWatchUrl(params.link || params.id || "");
  if (!link) throw new Error("缺少 Hanime1 播放页链接");
  var response = await requestHtml(link, {}, HANIME_BASE_URL + "/");
  var $ = Widget.html.load(response.html);
  var sources = extractVideoSources($, response.html);
  if (!sources.length) throw new Error("Hanime1 页面没有找到可播放资源");
  return sources.map(function (source) {
    return {
      name: source.label,
      description: source.type || (/\.m3u8(?:\?|$)/i.test(source.url) ? "HLS" : "MP4"),
      url: source.url,
      customHeaders: playbackHeaders(link),
      playerType: "system",
    };
  });
}
