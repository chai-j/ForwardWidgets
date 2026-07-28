WidgetMetadata = {
  id: "chai.91porn",
  title: "91Porn",
  description: "91Porn 分类、搜索与在线播放",
  author: "chai-j",
  site: "https://91porn.com",
  version: "2.1.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  globalParams: [
    {
      name: "base_url",
      title: "基础 URL",
      type: "input",
      value: "https://91porn.com",
    },
  ],
  modules: [
    {
      id: "91porn.list",
      title: "分类视频",
      description: "按 91Porn 分类浏览视频",
      functionName: "get91pornList",
      requiresWebView: false,
      cacheDuration: 3600,
      params: [
        {
          name: "sort_by",
          title: "分类",
          type: "enumeration",
          value: "ori",
          enumOptions: [
            { value: "rf", title: "最近加精" },
            { value: "hot", title: "当前最热" },
            { value: "top", title: "本月最热" },
            { value: "tf", title: "本月收藏" },
            { value: "md", title: "本月讨论" },
            { value: "top&m=-1", title: "上月最热" },
            { value: "ori", title: "91原创" },
            { value: "long", title: "10分钟以上" },
            { value: "longer", title: "20分钟以上" },
            { value: "hd", title: "高清" },
            { value: "mf", title: "收藏最多" },
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
    title: "关键词搜索",
    functionName: "search",
    params: [
      {
        name: "keyword",
        title: "关键词",
        type: "input",
        description: "搜索视频标题或编号",
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

const DEFAULT_BASE_URL = "https://91porn.com";
const DEFAULT_HEADERS = {
  "Accept-Language": "zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
};

function normalizeBaseUrl(value) {
  const text = String(value || DEFAULT_BASE_URL).trim();
  return text.replace(/\/+$/, "");
}

function absoluteUrl(value, baseUrl = DEFAULT_BASE_URL) {
  if (!value) return "";
  const text = String(value).trim();
  if (/^https?:\/\//i.test(text)) return text;
  if (text.startsWith("//")) return `https:${text}`;
  try {
    return new URL(text, normalizeBaseUrl(baseUrl) + "/").toString();
  } catch (_) {
    return `${normalizeBaseUrl(baseUrl)}${text.startsWith("/") ? "" : "/"}${text}`;
  }
}

function responseStatus(response) {
  return Number(response && (response.statusCode || response.status) || 200);
}

async function getHtml(url, options = {}) {
  const response = await Widget.http.get(url, {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...(options.headers || {}),
    },
  });
  const status = responseStatus(response);
  if (!response || status >= 400 || typeof response.data !== "string") {
    throw new Error(`请求 91Porn 失败: ${status || "未知错误"}`);
  }
  return Widget.html.load(response.data);
}

function previewUrlFromImage(imageUrl) {
  if (!imageUrl) return "";
  const filename = String(imageUrl).split("/").pop() || "";
  const videoId = filename.split(".")[0];
  return videoId ? `https://vthumb.killcovid2021.com/thumb/${videoId}.mp4` : "";
}

function parseReleaseDate($, item) {
  try {
    const info = item.find(".info").filter((_, element) =>
      $(element).text().includes("添加时间")
    ).first();
    if (!info.length) return "";
    const text = info.parent().text().replace(/添加时间[:：]?/g, " ").trim();
    return text || (info[0].nextSibling && info[0].nextSibling.textContent || "").trim();
  } catch (_) {
    return "";
  }
}

function parseListItem($, element, baseUrl) {
  const item = $(element);
  if (item.closest(".col-lg-8").length > 0) return null;

  const link = absoluteUrl(item.find("a").first().attr("href"), baseUrl);
  if (!link) return null;

  const cover = item.find(".img-responsive").first().attr("data-src") ||
    item.find(".img-responsive").first().attr("src") || "";
  const title = item.find(".video-title").first().text().trim() ||
    item.find("a").first().text().trim() || "91Porn 视频";
  const result = {
    id: link,
    type: "url",
    mediaType: "movie",
    link,
    title,
    coverUrl: cover || undefined,
    posterPath: cover || undefined,
    backdropPath: cover || undefined,
    durationText: item.find(".duration").first().text().trim() || undefined,
    previewUrl: previewUrlFromImage(cover) || undefined,
    releaseDate: parseReleaseDate($, item) || undefined,
    playerType: "system",
  };
  return result;
}

async function get91pornList(params = {}) {
  const options = params || {};
  const baseUrl = normalizeBaseUrl(options.base_url);
  const category = String(options.sort_by || "ori");
  const page = Math.max(1, Number.parseInt(options.page, 10) || 1);
  const url = `${baseUrl}/v.php?category=${category}&viewtype=basic&page=${page}`;

  try {
    const $ = await getHtml(url);
    return $(".videos-text-align")
      .toArray()
      .map((element) => parseListItem($, element, baseUrl))
      .filter(Boolean);
  } catch (error) {
    console.error("91Porn 列表加载失败:", error);
    return [];
  }
}

async function search(params = {}) {
  const options = params || {};
  const keyword = String(options.keyword || "").trim();
  if (!keyword) return [];

  const baseUrl = normalizeBaseUrl(options.base_url);
  const page = Math.max(1, Number.parseInt(options.page, 10) || 1);
  const url = `${baseUrl}/search_result.php?search_id=${encodeURIComponent(keyword)}&search_type=search_videos&viewtype=basic&page=${page}`;

  try {
    const $ = await getHtml(url);
    const selector = $(".videos-text-align").length
      ? ".videos-text-align"
      : ".video-box, .videoBox";
    return $(selector)
      .toArray()
      .map((element) => parseListItem($, element, baseUrl))
      .filter(Boolean);
  } catch (error) {
    console.error("91Porn 关键词搜索失败:", error);
    return [];
  }
}

function decodeSourceHtml(value) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch (_) {
    return value;
  }
}

function parseDescription($) {
  const html = $("#v_desc").html();
  if (!html) return "";
  try {
    return Widget.html.load(html.replace(/<br\s*\/?>/gi, "\n"))
      .root()
      .text()
      .trim();
  } catch (_) {
    return $("#v_desc").text().trim();
  }
}

async function loadDetail(link) {
  const url = absoluteUrl(link);
  try {
    const $ = await getHtml(url);
    const player = $("#player_one").first();
    const script = player.find("script").text();
    const encodedMatch = script.match(/strencode2\(\s*["']([\s\S]*?)["']\s*\)/i);
    const sourceHtml = decodeSourceHtml(encodedMatch && encodedMatch[1]);
    const sourceDoc = sourceHtml ? Widget.html.load(sourceHtml) : null;
    const rawVideoUrl = sourceDoc && sourceDoc("source").first().attr("src") ||
      player.find("video source, source").first().attr("src") ||
      player.find("video").first().attr("src") || "";
    const videoUrl = absoluteUrl(rawVideoUrl, url);
    if (!videoUrl) throw new Error("未找到视频资源");

    const cover = player.attr("poster") ||
      $("meta[property='og:image']").attr("content") || "";
    const title = $("#videodetails h4").first().text().trim() ||
      $("meta[property='og:title']").attr("content") || "91Porn 视频";
    const result = {
      id: url,
      type: "url",
      mediaType: "movie",
      link: url,
      title,
      coverUrl: cover || undefined,
      posterPath: cover || undefined,
      backdropPath: cover || undefined,
      videoUrl,
      description: parseDescription($) || undefined,
      durationText: $("#useraction .info")
        .filter((_, element) => $(element).text().includes("时长"))
        .find(".video-info-span")
        .text()
        .trim() || undefined,
      releaseDate: $(".title-yakov").first().text().trim() || undefined,
      playerType: "system",
      customHeaders: { Referer: url },
    };

    const relatedItems = $(".well")
      .toArray()
      .map((element) => {
        const item = $(element);
        const relatedLink = absoluteUrl(item.find("a").first().attr("href"), url);
        if (!relatedLink) return null;
        const relatedCover = item.find(".img-responsive").first().attr("src") || "";
        return {
          id: relatedLink,
          type: "url",
          mediaType: "movie",
          link: relatedLink,
          title: item.find(".video-title").first().text().trim() || "相关视频",
          durationText: item.find(".duration").first().text().trim() || undefined,
          coverUrl: relatedCover || undefined,
          posterPath: relatedCover || undefined,
          backdropPath: relatedCover || undefined,
          playerType: "system",
        };
      })
      .filter(Boolean);
    if (relatedItems.length) result.relatedItems = relatedItems;
    return result;
  } catch (error) {
    console.error("91Porn 详情加载失败:", error);
    return null;
  }
}
