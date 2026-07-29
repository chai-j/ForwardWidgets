WidgetMetadata = {
  id: "chai.heiliao-news",
  title: "黑料网·公开资讯",
  version: "0.1.1",
  requiredVersion: "0.0.1",
  description: "公开资讯浏览框架；过滤敏感内容，不解析媒体资源",
  author: "chai-j",
  site: "https://heiliao.com",
  detailCacheDuration: 300,
  modules: [
    {
      id: "browse",
      title: "公开资讯",
      description: "仅浏览社会新闻与全球奇闻的公开元数据",
      functionName: "loadArticles",
      cacheDuration: 600,
      requiresWebView: false,
      params: [
        {
          name: "sort_by",
          title: "分类",
          type: "enumeration",
          value: "/shxw/",
          enumOptions: [
            { title: "社会新闻", value: "/shxw/" },
            { title: "全球奇闻", value: "/qqqw/" },
          ],
        },
        {
          name: "page",
          title: "页码",
          type: "page",
          value: "1",
        },
        {
          name: "base_url",
          title: "基础 URL",
          type: "input",
          value: "https://heiliao.com",
        },
      ],
    },
  ],
};

const HEILIAO_DEFAULT_BASE_URL = "https://heiliao.com";
const HEILIAO_SAFE_CATEGORIES = ["/shxw/", "/qqqw/"];
const HEILIAO_HEADERS = {
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
};

// 这里只做尽力过滤，避免把明显涉及私密影像、深伪或成人内容的条目带入模块。
const HEILIAO_SENSITIVE_PATTERN =
  /私密|不雅|偷拍|偷录|裸照|艳照|床照|私拍|泄密|泄露|换脸|深伪|成人视频|色情|情色|性爱|做爱|性交|自慰|内射|无码|裸聊|走光|露出|乱伦|约炮|操粉|福利姬|网黄|强奸|性侵|性虐|未成年|萝莉|AI.{0,8}(?:明星|换脸)/i;

function normalizeHeiliaoBaseUrl(value) {
  const raw = String(value || HEILIAO_DEFAULT_BASE_URL).trim();
  const origin = parseHeiliaoOrigin(raw);
  return origin ? origin.origin : HEILIAO_DEFAULT_BASE_URL;
}

function heiliaoAbsoluteUrl(value, baseUrl) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("//")) return "https:" + raw;
  const base = normalizeHeiliaoBaseUrl(baseUrl);
  return base + (raw.startsWith("/") ? raw : "/" + raw);
}

function parseHeiliaoOrigin(value) {
  const match = String(value || "").trim().match(/^(https?):\/\/([^/?#]+)(?:[/?#]|$)/i);
  if (!match) return null;
  const protocol = match[1].toLowerCase();
  const authority = match[2].toLowerCase();
  const authorityMatch = authority.match(/^([a-z0-9.-]+)(?::\d+)?$/i);
  if (!authorityMatch) return null;
  const hostname = authorityMatch[1];
  if (hostname !== "heiliao.com" && !hostname.endsWith(".heiliao.com")) return null;
  return {
    origin: protocol + "://" + authority,
    protocol: protocol,
    authority: authority,
  };
}

function normalizeHeiliaoArticleUrl(value, baseUrl) {
  const baseOrigin = parseHeiliaoOrigin(normalizeHeiliaoBaseUrl(baseUrl));
  if (!baseOrigin) return "";

  let raw = String(value || "").trim();
  if (raw.startsWith("//")) raw = baseOrigin.protocol + ":" + raw;

  let path = "";
  if (/^https?:\/\//i.test(raw)) {
    const absoluteOrigin = parseHeiliaoOrigin(raw);
    if (!absoluteOrigin || absoluteOrigin.origin !== baseOrigin.origin) return "";
    const remainder = raw.match(/^https?:\/\/[^/?#]+([\s\S]*)$/i);
    path = remainder ? remainder[1] : "";
  } else if (raw.startsWith("/")) {
    path = raw;
  } else {
    return "";
  }

  path = path.split(/[?#]/, 1)[0];
  if (!/^\/archives\/\d+\/?$/.test(path)) return "";
  return baseOrigin.origin + path.replace(/\/?$/, "/");
}

function normalizeHeiliaoCategory(value) {
  const category = String(value || "");
  return HEILIAO_SAFE_CATEGORIES.indexOf(category) >= 0 ? category : HEILIAO_SAFE_CATEGORIES[0];
}

function buildHeiliaoListUrl(baseUrl, category, page) {
  const base = normalizeHeiliaoBaseUrl(baseUrl);
  const path = normalizeHeiliaoCategory(category);
  const pageNumber = Math.max(1, parseInt(page, 10) || 1);
  return pageNumber === 1 ? base + path : base + path + "page/" + pageNumber + "/";
}

function heiliaoResponseStatus(response) {
  return Number((response && (response.statusCode || response.status)) || 200);
}

function cleanHeiliaoText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function isAllowedHeiliaoText(value) {
  const text = cleanHeiliaoText(value);
  return Boolean(text) && !HEILIAO_SENSITIVE_PATTERN.test(text);
}

async function fetchHeiliaoHtml(url) {
  const response = await Widget.http.get(url, {
    headers: Object.assign({}, HEILIAO_HEADERS, { Referer: normalizeHeiliaoBaseUrl(url) + "/" }),
    allow_redirects: true,
  });
  const status = heiliaoResponseStatus(response);
  const html = String((response && response.data) || "");
  if (!response || status >= 400) {
    throw new Error("黑料网请求失败: HTTP " + status);
  }
  if (!html || /Just a moment|Attention Required|cf-chl-|Cloudflare Ray ID/i.test(html)) {
    throw new Error("黑料网页面为空或被站点防护拦截");
  }
  return html;
}

function parseHeiliaoArticleCards(html, baseUrl) {
  const $ = Widget.html.load(html);
  const results = [];
  const seen = new Set();

  $(".video-list .video-item, .video-item").each(function (_, element) {
    const item = $(element);
    const anchor = item.find('a[href*="/archives/"]').first();
    const link = normalizeHeiliaoArticleUrl(anchor.attr("href"), baseUrl);
    if (!link || seen.has(link)) return;

    const image = item.find("img").first();
    const title = cleanHeiliaoText(
      item.find(".title").first().text() || anchor.attr("title") || image.attr("alt")
    );
    if (!isAllowedHeiliaoText(title)) return;

    seen.add(link);
    results.push({
      id: link,
      type: "url",
      mediaType: "movie",
      link: link,
      title: title,
      description: "公开资讯索引；仅提供页面元数据，不解析媒体资源。",
    });
  });

  return results;
}

async function loadArticles(params = {}) {
  const baseUrl = normalizeHeiliaoBaseUrl(params.base_url);
  const url = buildHeiliaoListUrl(baseUrl, params.sort_by, params.page);
  try {
    const html = await fetchHeiliaoHtml(url);
    return parseHeiliaoArticleCards(html, baseUrl);
  } catch (error) {
    console.error("黑料网公开资讯加载失败:", error && error.message ? error.message : error);
    return [];
  }
}

function collectHeiliaoJsonLdNodes(value, output) {
  if (!value) return;
  if (Array.isArray(value)) {
    value.forEach(function (item) {
      collectHeiliaoJsonLdNodes(item, output);
    });
    return;
  }
  if (typeof value !== "object") return;
  output.push(value);
  if (Array.isArray(value["@graph"])) {
    collectHeiliaoJsonLdNodes(value["@graph"], output);
  }
}

function findHeiliaoArticleJsonLd($) {
  const nodes = [];
  $("script[type='application/ld+json']").each(function (_, element) {
    try {
      collectHeiliaoJsonLdNodes(JSON.parse($(element).html() || ""), nodes);
    } catch (_) {
      // 忽略单个无效的 JSON-LD 区块，继续使用页面 meta 信息。
    }
  });
  return (
    nodes.find(function (node) {
      const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
      return types.some(function (type) {
        return /^(?:Article|NewsArticle|BlogPosting)$/i.test(String(type || ""));
      });
    }) || {}
  );
}

function heiliaoMetaContent($, selector) {
  return cleanHeiliaoText($(selector).first().attr("content"));
}

async function loadDetail(link) {
  const rawLink = String(link || "").trim();
  const baseUrl = normalizeHeiliaoBaseUrl(rawLink);
  const url = normalizeHeiliaoArticleUrl(rawLink, baseUrl);
  if (!url) return null;

  try {
    const html = await fetchHeiliaoHtml(url);
    const $ = Widget.html.load(html);
    const article = findHeiliaoArticleJsonLd($);
    const title = cleanHeiliaoText(
      article.headline ||
        heiliaoMetaContent($, "meta[property='og:title']") ||
        $("h1").first().text() ||
        $(".title").first().text()
    );
    const summary = cleanHeiliaoText(
      article.description ||
        heiliaoMetaContent($, "meta[property='og:description']") ||
        heiliaoMetaContent($, "meta[name='description']")
    );

    if (!isAllowedHeiliaoText(title)) return null;
    const safeSummary = summary && isAllowedHeiliaoText(summary) ? summary : "公开资讯索引；媒体资源未解析。";
    const releaseDate = cleanHeiliaoText(article.datePublished);

    return {
      id: url,
      type: "url",
      mediaType: "movie",
      link: url,
      title: title,
      description: safeSummary,
      releaseDate: releaseDate || undefined,
    };
  } catch (error) {
    console.error("黑料网公开资讯详情加载失败:", error && error.message ? error.message : error);
    return null;
  }
}
