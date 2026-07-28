WidgetMetadata = {
  "id": "chai.javday",
  "title": "JAVDay",
  "version": "2.0.0",
  "requiredVersion": "0.0.1",
  "description": "JAVDay 搜索、榜单、分类与在线播放",
  "author": "chai-j",
  "site": "https://javday.app",
  "detailCacheDuration": 60,
  "modules": [
    {
      "title": "最新更新",
      "description": "浏览最新更新视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "列表地址",
          "type": "constant",
          "description": "列表地址",
          "value": "https://javday.app/label/new/"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "latest"
    },
    {
      "title": "人气系列",
      "description": "浏览人气系列视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "列表地址",
          "type": "constant",
          "description": "列表地址",
          "value": "https://javday.app/label/hot/"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "popular"
    },
    {
      "title": "新作上市",
      "description": "浏览新作上市视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "列表地址",
          "type": "constant",
          "description": "列表地址",
          "value": "https://javday.app/category/new-release/"
        },
        {
          "name": "sort_by",
          "title": "排序方式",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新上架",
              "value": "new"
            },
            {
              "title": "人气最高",
              "value": "popular"
            }
          ],
          "description": "选择视频排序方式",
          "value": "new"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "newRelease"
    },
    {
      "title": "有码视频",
      "description": "浏览有码分类视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "列表地址",
          "type": "constant",
          "description": "列表地址",
          "value": "https://javday.app/category/censored/"
        },
        {
          "name": "sort_by",
          "title": "排序方式",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新上架",
              "value": "new"
            },
            {
              "title": "人气最高",
              "value": "popular"
            }
          ],
          "description": "选择视频排序方式",
          "value": "popular"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "censored"
    },
    {
      "title": "无码视频",
      "description": "浏览无码分类视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "列表地址",
          "type": "constant",
          "description": "列表地址",
          "value": "https://javday.app/category/uncensored/"
        },
        {
          "name": "sort_by",
          "title": "排序方式",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新上架",
              "value": "new"
            },
            {
              "title": "人气最高",
              "value": "popular"
            }
          ],
          "description": "选择视频排序方式",
          "value": "new"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "uncensored"
    },
    {
      "title": "无码流出",
      "description": "浏览无码流出视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "列表地址",
          "type": "constant",
          "description": "列表地址",
          "value": "https://javday.app/category/uncensored-leaked/"
        },
        {
          "name": "sort_by",
          "title": "排序方式",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新上架",
              "value": "new"
            },
            {
              "title": "人气最高",
              "value": "popular"
            }
          ],
          "description": "选择视频排序方式",
          "value": "new"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "leaked"
    },
    {
      "title": "杏吧视频",
      "description": "浏览杏吧分类视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "列表地址",
          "type": "constant",
          "description": "列表地址",
          "value": "https://javday.app/category/sex8/"
        },
        {
          "name": "sort_by",
          "title": "排序方式",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新上架",
              "value": "new"
            },
            {
              "title": "人气最高",
              "value": "popular"
            }
          ],
          "description": "选择视频排序方式",
          "value": "popular"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "sex8"
    },
    {
      "title": "玩偶姐姐",
      "description": "浏览玩偶姐姐视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "列表地址",
          "type": "constant",
          "description": "列表地址",
          "value": "https://javday.app/category/hongkongdoll/"
        },
        {
          "name": "sort_by",
          "title": "排序方式",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新上架",
              "value": "new"
            },
            {
              "title": "人气最高",
              "value": "popular"
            }
          ],
          "description": "选择视频排序方式",
          "value": "popular"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "hongkongdoll"
    },
    {
      "title": "国产 AV",
      "description": "浏览国产 AV视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "列表地址",
          "type": "constant",
          "description": "列表地址",
          "value": "https://javday.app/category/chinese-av/"
        },
        {
          "name": "sort_by",
          "title": "排序方式",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新上架",
              "value": "new"
            },
            {
              "title": "人气最高",
              "value": "popular"
            }
          ],
          "description": "选择视频排序方式",
          "value": "popular"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "chineseAv"
    },
    {
      "title": "国产厂商",
      "description": "按厂商标签浏览国产厂商视频",
      "requiresWebView": false,
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "params": [
        {
          "name": "url",
          "title": "厂商选择",
          "type": "enumeration",
          "belongTo": {
            "paramName": "sort_by",
            "value": [
              "new",
              "popular"
            ]
          },
          "enumOptions": [
            {
              "title": "麻豆传媒",
              "value": "https://javday.app/index.php/category/madou/"
            },
            {
              "title": "果冻传媒",
              "value": "https://javday.app/index.php/category/91zhipianchang/"
            },
            {
              "title": "天美传媒",
              "value": "https://javday.app/index.php/category/timi/"
            },
            {
              "title": "星空无限",
              "value": "https://javday.app/index.php/category/xingkong/"
            },
            {
              "title": "皇家华人",
              "value": "https://javday.app/index.php/category/royalasianstudio/"
            },
            {
              "title": "蜜桃影像",
              "value": "https://javday.app/index.php/category/mtgw/"
            },
            {
              "title": "精东影业",
              "value": "https://javday.app/index.php/category/jdav/"
            },
            {
              "title": "台湾 AV",
              "value": "https://javday.app/index.php/category/twav/"
            },
            {
              "title": "JVID",
              "value": "https://javday.app/index.php/category/jvid/"
            },
            {
              "title": "萝莉社",
              "value": "https://javday.app/index.php/category/luolisheus/"
            },
            {
              "title": "糖心VLOG",
              "value": "https://javday.app/index.php/category/txvlog/"
            },
            {
              "title": "Psychoporn TW",
              "value": "https://javday.app/index.php/category/psychoporn-tw/"
            }
          ],
          "value": "https://javday.app/index.php/category/madou/",
          "description": "选择要浏览的厂商"
        },
        {
          "name": "sort_by",
          "title": "🔢 排序方式",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新上架",
              "value": "new"
            },
            {
              "title": "人气最高",
              "value": "popular"
            }
          ],
          "value": "new",
          "description": "选择视频排序方式"
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ],
      "id": "studios"
    }
  ],
  "search": {
    "title": "搜索视频",
    "functionName": "search",
    "params": [
      {
        "name": "keyword",
        "title": "女優/番號/關鍵字搜索…",
        "type": "input",
        "value": "",
        "description": "女優/番號/關鍵字搜索…"
      },
      {
        "name": "page",
        "title": "页码",
        "type": "page",
        "description": "搜索结果页码"
      }
    ]
  }
};

const JAVDAY_LOG_PREFIX = "ForwardWidget: JAVDay -";
const JAVDAY_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36";

function extractCategoryId(url) {
  const match = url.match(/\/([^/]+)\/?$/);
  if (match && match[1]) {
    return match[1].replace(/\/+$/, '');
  }

  const parts = url.split('/').filter(part => part.length > 0);
  return parts[parts.length - 1] || url.split('/').slice(-2, -1)[0] || 'unknown';
}

function buildPageUrl(baseUrl, sortBy, page) {
  const categoryId = extractCategoryId(baseUrl);

  const cleanBaseUrl = baseUrl.replace(/index\.php\//g, '');

  let path;
  if (sortBy === "popular") {
    path = `/fiter/by/hits/id/${categoryId}`;
  } else {
    path = cleanBaseUrl.includes('label/')
      ? cleanBaseUrl.replace(/\/page\/\d+\/?$/, '').replace(/\/+$/, '')
      : `/category/${categoryId}`;
  }

  if (page > 1) {
    return `${path}/page/${page}/`;
  }

  return `${path}/`;
}

function getFullUrl(path) {
  if (path.startsWith("http")) return path;
  if (path.startsWith("//")) return `https:${path}`;

  return `https://javday.app${path}`;
}

function getCoverImgSrc($item) {
  const coverElement = $item.find(".videoBox-cover");
  const styleAttr = coverElement.attr("style");

  if (styleAttr) {
    const match = styleAttr.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
    if (match && match[1]) {
      const extractedUrl = match[1];

      if (extractedUrl.startsWith("//")) {
        return `https:${extractedUrl}`;
      }

      if (extractedUrl.startsWith("http")) {
        return extractedUrl;
      }

      return `https://javday.app${extractedUrl.startsWith("/") ? "" : "/"}${extractedUrl}`;
    }
  }
  return "";
}

function extractVideoUrlFromDPlayerScript(scriptContent) {
  if (!scriptContent) return null;

  const regexes = [
    /video\s*:\s*{\s*[^}]*url\s*:\s*['"]([^'"]+)['"]/,
    /url\s*:\s*['"]([^'"]+\.m3u8[^'"]*)['"]/
  ];

  for (const regex of regexes) {
    const match = scriptContent.match(regex);
    if (match && match[1]) return match[1].replace(/\\\//g, '/');
  }

  return null;
}

async function loadPage(params = {}) {
  const baseUrl = params.url;
  const sortBy = params.sort_by || "new";
  const page = parseInt(params.page, 10) || 1;

  const pagePath = buildPageUrl(baseUrl, sortBy, page);
  const targetUrl = getFullUrl(pagePath);

  try {
    const response = await Widget.http.get(targetUrl, {
      headers: {
        "User-Agent": JAVDAY_USER_AGENT,
        Referer: "https://javday.app/",
      },
    });

    if (!response?.data) {
      throw new Error("无法获取页面内容");
    }

    const $ = Widget.html.load(response.data);
    const videoItems = [];

    $(".video-wrapper .videoBox").each((index, element) => {
      const $item = $(element);
      let link = $item.attr("href");
      const title = $item.find(".videoBox-info .title").text().trim();
      const imgSrc = getCoverImgSrc($item);

      if (!link || !title) return;

      if (!link.startsWith("http")) {
        link = link.startsWith("//")
          ? `https:${link}`
          : `https://javday.app${link.startsWith("/") ? "" : "/"}${link}`;
      }

      link = link.replace(/([^:]\/)\/+/g, '$1');

      videoItems.push({
        id: link,
        type: "url",
        title: title,
        coverUrl: imgSrc || undefined,
        posterPath: imgSrc || undefined,
        backdropPath: imgSrc,
        link: link,
        description: `来自JAVDay | 排序:${sortBy === "new" ? "最新上架" : "人气最高"}`,
        mediaType: "movie",
        playerType: "system",
      });
    });

    return videoItems;
  } catch (error) {
    console.error(`${JAVDAY_LOG_PREFIX} 获取视频失败: ${error.message}`);
    throw error;
  }
}

async function search(params = {}) {
  const keyword = String(params.keyword || "").trim();
  const page = parseInt(params.page, 10) || 1;

  if (!keyword) {
    return [];
  }

  const encodedKeyword = encodeURIComponent(keyword);

  let searchUrl;
  if (page === 1) {
    searchUrl = `https://javday.app/search/?wd=${encodedKeyword}`;
  } else {
    searchUrl = `https://javday.app/search/page/${page}/wd/${encodedKeyword}/`;
  }

  try {
    const response = await Widget.http.get(searchUrl, {
      headers: {
        "User-Agent": JAVDAY_USER_AGENT,
        Referer: "https://javday.app/",
      },
    });

    if (!response?.data) {
      throw new Error("无法获取搜索结果");
    }

    const $ = Widget.html.load(response.data);
    const videoItems = [];

    $(".video-wrapper .videoBox").each((index, element) => {
      const $item = $(element);
      let link = $item.attr("href");
      const title = $item.find(".videoBox-info .title").text().trim();
      const imgSrc = getCoverImgSrc($item);

      if (!link || !title) return;

      if (!link.startsWith("http")) {
        link = link.startsWith("//")
          ? `https:${link}`
          : `https://javday.app${link.startsWith("/") ? "" : "/"}${link}`;
      }

      link = link.replace(/([^:]\/)\/+/g, '$1');

      videoItems.push({
        id: link,
        type: "url",
        title: title,
        coverUrl: imgSrc || undefined,
        posterPath: imgSrc || undefined,
        backdropPath: imgSrc,
        link: link,
        description: `搜索: ${keyword}`,
        mediaType: "movie",
        playerType: "system",
      });
    });

    return videoItems;
  } catch (error) {
    console.error(`${JAVDAY_LOG_PREFIX} 搜索失败: ${error.message}`);
    throw error;
  }
}

async function loadDetail(link) {

  try {
    const response = await Widget.http.get(link, {
      headers: {
        "User-Agent": JAVDAY_USER_AGENT,
        Referer: link,
      },
    });

    if (!response?.data) {
      throw new Error("无法获取详情页内容");
    }

    const $ = Widget.html.load(response.data);

    const title =
      $("meta[property='og:title']").attr("content") ||
      $("h1").first().text().trim() ||
      $("title").first().text().trim() ||
      "JAVDay 视频";
    const cover =
      $("meta[property='og:image']").attr("content") ||
      $("video").first().attr("poster") ||
      "";
    const description =
      $("meta[property='og:description']").attr("content") ||
      $("meta[name='description']").attr("content") ||
      "";
    const makeDetail = (videoUrl) => ({
      id: link,
      type: "url",
      title: title,
      description: description || undefined,
      coverUrl: cover || undefined,
      posterPath: cover || undefined,
      backdropPath: cover || undefined,
      videoUrl: getFullUrl(String(videoUrl || "").replace(/\\\//g, '/')),
      mediaType: "movie",
      link: link,
      playerType: "system",
      customHeaders: {
        Referer: link,
        "User-Agent": JAVDAY_USER_AGENT,
      },
    });

    const dplayerScript = Array.from($("script"))
      .find(el => {
        const scriptContent = $(el).html();
        return scriptContent && scriptContent.includes("new DPlayer");
      });

    if (dplayerScript) {
      const scriptContent = $(dplayerScript).html();
      const videoUrl = extractVideoUrlFromDPlayerScript(scriptContent);
      if (videoUrl) {
        return makeDetail(videoUrl);
      }
    }

    const videoSrc = $("video#J_prismPlayer").attr("src") ||
                   $("source[src*='.m3u8']").attr("src") ||
                   $("video source").attr("src");

    if (videoSrc) {
      return makeDetail(videoSrc);
      }

      const scriptSources = Array.from($("script"))
      .map(el => $(el).html())
      .find(content => content && content.includes(".m3u8"));

    if (scriptSources) {
      const m3u8Match = scriptSources.match(/['"](https?:\/\/[^'"]+\.m3u8[^'"]*)['"]/);
      if (m3u8Match && m3u8Match[1]) {
        return makeDetail(m3u8Match[1]);
      }
    }

    const playerVideo = $("video[src]").attr("src") ||
                      $("iframe[src*='player']").attr("src");

    if (playerVideo) {
      return makeDetail(playerVideo);
    }

    throw new Error("无法找到视频源");
  } catch (error) {
    console.error(`${JAVDAY_LOG_PREFIX} 加载详情失败: ${error.message}`);
    throw error;
  }
}
