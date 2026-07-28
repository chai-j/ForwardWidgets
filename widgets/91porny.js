WidgetMetadata = {
  "id": "chai.91porny",
  "title": "91Porny",
  "description": "91Porny 分类、来源切换、搜索与在线播放",
  "version": "2.3.0",
  "requiredVersion": "0.0.1",
  "author": "chai-j",
  "site": "https://91porny.com",
  "detailCacheDuration": 60,
  "modules": [
    {
      "id": "browse",
      "title": "分类浏览",
      "description": "合并 91Porny、蝌蚪窝和精选视频来源",
      "functionName": "getList",
      "cacheDuration": 3600,
      "requiresWebView": false,
      "params": [
        {
          "name": "source",
          "title": "视频来源",
          "type": "enumeration",
          "value": "91porny",
          "enumOptions": [
            {
              "title": "91Porny",
              "value": "91porny"
            },
            {
              "title": "蝌蚪窝视频",
              "value": "kedou"
            },
            {
              "title": "精选视频",
              "value": "vod"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "分类",
          "description": "分类",
          "type": "enumeration",
          "value": "latest",
          "enumOptions": [
            {
              "value": "latest",
              "title": "最近更新"
            },
            {
              "value": "hd",
              "title": "高清视频"
            },
            {
              "value": "recent-favorite",
              "title": "最近加精"
            },
            {
              "value": "hot-list",
              "title": "当前最热"
            },
            {
              "value": "recent-rating",
              "title": "最近得分"
            },
            {
              "value": "nonpaid",
              "title": "非付费"
            },
            {
              "value": "ori",
              "title": "91原创"
            },
            {
              "value": "long-list",
              "title": "10分钟以上"
            },
            {
              "value": "longer-list",
              "title": "20分钟以上"
            },
            {
              "value": "month-discuss",
              "title": "本月讨论"
            },
            {
              "value": "top-favorite",
              "title": "本月收藏"
            },
            {
              "value": "most-favorite",
              "title": "收藏最多"
            },
            {
              "value": "top-list",
              "title": "本月最热"
            },
            {
              "value": "top-last",
              "title": "上月最热"
            }
          ],
          "belongTo": {
            "paramName": "source",
            "value": [
              "91porny"
            ]
          }
        },
        {
          "name": "sort_by_kedou",
          "title": "分类",
          "description": "分类",
          "type": "enumeration",
          "value": "chinese",
          "enumOptions": [
            {
              "value": "chinese",
              "title": "国产"
            },
            {
              "value": "europe-america",
              "title": "欧美"
            },
            {
              "value": "fornication",
              "title": "乱伦"
            },
            {
              "value": "japan-korea",
              "title": "日韩"
            },
            {
              "value": "anime",
              "title": "动漫"
            },
            {
              "value": "homosexual",
              "title": "同性"
            },
            {
              "value": "hd",
              "title": "高清AV"
            },
            {
              "value": "sm",
              "title": "SM专区"
            },
            {
              "value": "jijin",
              "title": "片商集锦"
            },
            {
              "value": "guodong",
              "title": "果冻传媒"
            },
            {
              "value": "xingkong",
              "title": "星空传媒"
            },
            {
              "value": "madou",
              "title": "麻豆传媒"
            },
            {
              "value": "tianmei",
              "title": "天美传媒"
            },
            {
              "value": "jingdong",
              "title": "精东影业"
            },
            {
              "value": "swag",
              "title": "台湾SWAG"
            },
            {
              "value": "tuzi",
              "title": "兔子先生"
            },
            {
              "value": "mitao",
              "title": "蜜桃传媒"
            },
            {
              "value": "huangjia",
              "title": "皇家华人"
            }
          ],
          "belongTo": {
            "paramName": "source",
            "value": [
              "kedou"
            ]
          }
        },
        {
          "name": "sort_by_vod",
          "title": "分类",
          "description": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "value": "",
              "title": "最新视频"
            },
            {
              "value": "原创",
              "title": "原创"
            },
            {
              "value": "转发",
              "title": "转发"
            },
            {
              "value": "赞助",
              "title": "赞助"
            }
          ],
          "belongTo": {
            "paramName": "source",
            "value": [
              "vod"
            ]
          }
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page",
          "value": "1"
        },
        {
          "name": "base_url",
          "title": "基础 URL",
          "type": "input",
          "value": "https://91porny.com"
        }
      ]
    }
  ],
  "search": {
    "title": "91Porny",
    "functionName": "search",
    "params": [
      {
        "name": "keyword",
        "title": "关键词",
        "type": "input",
        "description": "搜索的关键词",
        "value": ""
      },
      {
        "name": "page",
        "title": "页码",
        "type": "page",
        "value": "1"
      },
      {
        "name": "base_url",
        "title": "基础 URL",
        "type": "input",
        "value": "https://91porny.com"
      }
    ]
  }
};

const DEFAULT_BASE_URL = "https://91porny.com";
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36";
const DEFAULT_HEADERS = {
  "User-Agent": USER_AGENT,
  "Accept-Language": "zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
};

function normalizeBaseUrl(value) {
  const url = String(value || DEFAULT_BASE_URL).trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(url) ? url : DEFAULT_BASE_URL;
}

function absoluteUrl(value, baseUrl) {
  const url = String(value || "").trim();
  if (!url) return "";
  if (url.startsWith("//")) return "https:" + url;
  if (/^https?:\/\//i.test(url)) return url;
  return normalizeBaseUrl(baseUrl) + (url.startsWith("/") ? url : "/" + url);
}

function responseStatus(response) {
  return Number(response && (response.statusCode || response.status) || 200);
}

async function loadHtml(url, options) {
  const response = await Widget.http.get(url, {
    headers: Object.assign({}, DEFAULT_HEADERS, options && options.headers),
    allow_redirects: true,
  });
  if (!response || responseStatus(response) >= 400 || typeof response.data !== "string") {
    throw new Error("请求失败: " + (responseStatus(response) || "未知错误"));
  }
  return Widget.html.load(response.data);
}

function coverFromStyle(style, baseUrl) {
  const match = String(style || "").match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/i);
  return match ? absoluteUrl(match[1], baseUrl) : "";
}

function getVideoList($, baseUrl) {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  return Array.from($(".video-elem")).map(function (element) {
    const $item = $(element);
    const href = $item.find("a[href]").first().attr("href");
    if (!href) return null;
    const link = absoluteUrl(href, normalizedBaseUrl);
    if (!link) return null;
    const cover = coverFromStyle($item.find(".img").first().attr("style"), normalizedBaseUrl);
    const title = $item.find(".title").first().text().trim();
    if (!title) return null;
    const durationText = $item.find(".layer").first().text().trim();
    return {
      id: link,
      type: "url",
      mediaType: "movie",
      link: link,
      title: title,
      coverUrl: cover || undefined,
      posterPath: cover || undefined,
      backdropPath: cover || undefined,
      durationText: durationText || undefined,
      playerType: "system",
    };
  }).filter(Boolean);
}

async function get91List(params = {}) {
  const baseUrl = normalizeBaseUrl(params.base_url);
  const category = params.sort_by || "latest";
  const page = Math.max(1, parseInt(params.page, 10) || 1);
  try {
    const $ = await loadHtml(baseUrl + "/video/category/" + encodeURIComponent(category) + "/" + page);
    return getVideoList($, baseUrl);
  } catch (error) {
    console.error("91Porny 视频列表加载失败", error);
    return [];
  }
}

async function getKedouList(params = {}) {
  const baseUrl = normalizeBaseUrl(params.base_url);
  const category = params.sort_by || "chinese";
  const page = Math.max(1, parseInt(params.page, 10) || 1);
  try {
    const $ = await loadHtml(baseUrl + "/videos/categories/" + encodeURIComponent(category) + "/" + page);
    return getVideoList($, baseUrl);
  } catch (error) {
    console.error("蝌蚪窝视频列表加载失败", error);
    return [];
  }
}

async function getVodList(params = {}) {
  const baseUrl = normalizeBaseUrl(params.base_url);
  const category = String(params.sort_by || "").trim();
  const page = Math.max(1, parseInt(params.page, 10) || 1);
  let url = baseUrl + "/vod";
  if (category) url += "/" + encodeURIComponent(category);
  url += "?page=" + page;
  try {
    const $ = await loadHtml(url);
    return getVideoList($, baseUrl);
  } catch (error) {
    console.error("精选视频列表加载失败", error);
    return [];
  }
}

async function getList(params = {}) {
  const source = params.source || "91porny";
  if (source === "kedou") return getKedouList({ ...params, sort_by: params.sort_by_kedou || "chinese" });
  if (source === "vod") return getVodList({ ...params, sort_by: params.sort_by_vod || "" });
  return get91List({ ...params, sort_by: params.sort_by || "latest" });
}
async function loadDetail(link) {
  const originalLink = String(link || "").trim();
  if (!originalLink) return null;
  const realUrl = originalLink.includes("/viewhd/")
    ? originalLink.replace("/viewhd/", "/view/")
    : originalLink;
  const originMatch = realUrl.match(/^(https?:\/\/[^/]+)/i);
  const baseUrl = originMatch ? originMatch[1] : DEFAULT_BASE_URL;
  try {
    const $ = await loadHtml(realUrl, { headers: { Referer: realUrl } });
    const $video = $("#video-play").first();
    const videoUrl = absoluteUrl(String($video.attr("data-src") || "").replace(/&amp;/g, "&"), baseUrl);
    if (!videoUrl) throw new Error("未找到视频资源");
    const cover = absoluteUrl($video.attr("data-poster"), baseUrl);
    const relatedItems = getVideoList($, baseUrl).filter(function (item) {
      return item.link !== originalLink && item.link !== realUrl;
    });
    return {
      id: originalLink,
      type: "url",
      mediaType: "movie",
      link: originalLink,
      title: String($("meta[property='og:title']").attr("content") || $("h1").first().text() || "91Porny 视频").trim(),
      description: String($("meta[property='og:description']").attr("content") || "").trim() || undefined,
      releaseDate: String($("meta[property='video:release_date']").attr("content") || "").trim() || undefined,
      coverUrl: cover || undefined,
      posterPath: cover || undefined,
      backdropPath: cover || undefined,
      videoUrl: videoUrl,
      playerType: "system",
      customHeaders: {
        Referer: realUrl,
        "User-Agent": USER_AGENT,
      },
      relatedItems: relatedItems.length ? relatedItems.slice(0, 20) : undefined,
    };
  } catch (error) {
    console.error("视频详情加载失败", error);
    return null;
  }
}

async function search(params = {}) {
  const keyword = String(params.keyword || "").trim();
  if (!keyword) return [];
  const baseUrl = normalizeBaseUrl(params.base_url);
  const page = Math.max(1, parseInt(params.page, 10) || 1);
  try {
    const $ = await loadHtml(baseUrl + "/search?keywords=" + encodeURIComponent(keyword) + "&page=" + page);
    return getVideoList($, baseUrl);
  } catch (error) {
    console.error("搜索结果加载失败", error);
    return [];
  }
}
