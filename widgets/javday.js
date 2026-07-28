WidgetMetadata = {
  "id": "chai.javday",
  "title": "JAVDay",
  "version": "2.1.0",
  "requiredVersion": "0.0.1",
  "description": "JAVDay 搜索、分类与在线播放",
  "author": "chai-j",
  "site": "https://javday.app",
  "detailCacheDuration": 60,
  "modules": [
    {
      "id": "browse",
      "title": "分类浏览",
      "description": "合并最新、人气、有码、无码和厂商分类",
      "functionName": "loadPage",
      "cacheDuration": 3600,
      "requiresWebView": false,
      "params": [
        {
          "name": "url",
          "title": "列表类型",
          "type": "enumeration",
          "value": "https://javday.app/label/new/",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": "https://javday.app/label/new/"
            },
            {
              "title": "人气系列",
              "value": "https://javday.app/label/hot/"
            },
            {
              "title": "新作上市",
              "value": "https://javday.app/category/new-release/"
            },
            {
              "title": "有码视频",
              "value": "https://javday.app/category/censored/"
            },
            {
              "title": "无码视频",
              "value": "https://javday.app/category/uncensored/"
            },
            {
              "title": "无码流出",
              "value": "https://javday.app/category/uncensored-leaked/"
            },
            {
              "title": "杏吧视频",
              "value": "https://javday.app/category/sex8/"
            },
            {
              "title": "玩偶姐姐",
              "value": "https://javday.app/category/hongkongdoll/"
            },
            {
              "title": "国产 AV",
              "value": "https://javday.app/category/chinese-av/"
            },
            {
              "title": "国产厂商 · 麻豆传媒",
              "value": "https://javday.app/index.php/category/madou/"
            },
            {
              "title": "国产厂商 · 果冻传媒",
              "value": "https://javday.app/index.php/category/91zhipianchang/"
            },
            {
              "title": "国产厂商 · 天美传媒",
              "value": "https://javday.app/index.php/category/timi/"
            },
            {
              "title": "国产厂商 · 星空无限",
              "value": "https://javday.app/index.php/category/xingkong/"
            },
            {
              "title": "国产厂商 · 皇家华人",
              "value": "https://javday.app/index.php/category/royalasianstudio/"
            },
            {
              "title": "国产厂商 · 蜜桃影像",
              "value": "https://javday.app/index.php/category/mtgw/"
            },
            {
              "title": "国产厂商 · 精东影业",
              "value": "https://javday.app/index.php/category/jdav/"
            },
            {
              "title": "国产厂商 · 台湾 AV",
              "value": "https://javday.app/index.php/category/twav/"
            },
            {
              "title": "国产厂商 · JVID",
              "value": "https://javday.app/index.php/category/jvid/"
            },
            {
              "title": "国产厂商 · 萝莉社",
              "value": "https://javday.app/index.php/category/luolisheus/"
            },
            {
              "title": "国产厂商 · 糖心VLOG",
              "value": "https://javday.app/index.php/category/txvlog/"
            },
            {
              "title": "国产厂商 · Psychoporn TW",
              "value": "https://javday.app/index.php/category/psychoporn-tw/"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "排序方式",
          "type": "enumeration",
          "value": "new",
          "enumOptions": [
            {
              "title": "最新上架",
              "value": "new"
            },
            {
              "title": "人气最高",
              "value": "popular"
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
