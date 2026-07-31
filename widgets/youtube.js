/*
 * ForwardWidgets - YouTube 公共 API 模块
 *
 * 这是 API Key 版本：请在导入后填写自己的 YouTube Data API v3 key。
 * 遵循 Forward 官方 stream 模块规范，在真正起播时通过 loadResource 返回临时播放资源。
 */

WidgetMetadata = {
  id: "chai.youtube",
  title: "YouTube",
  description: "搜索、频道、播放列表和公开热门视频，支持自定义解析服务播放",
  author: "chai-j",
  site: "https://www.youtube.com",
  version: "2.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 600,
  globalParams: [
    {
      name: "api_key",
      title: "YouTube API Key",
      type: "input",
      description: "Google Cloud 中启用 YouTube Data API v3 后创建的 API Key",
    },
    {
      name: "resolver_url",
      title: "自定义解析服务地址",
      type: "input",
      value: "",
      description: "必填；例如 https://resolver.example.com 或 http://服务器IP:8787",
    },
    {
      name: "resolver_token",
      title: "解析服务 Token",
      type: "input",
      description: "必填；与自定义解析服务的 RESOLVER_TOKEN 一致",
    },
    {
      name: "region_code",
      title: "热门地区",
      type: "enumeration",
      value: "US",
      enumOptions: [
        { value: "US", title: "美国" },
        { value: "HK", title: "中国香港" },
        { value: "TW", title: "中国台湾" },
        { value: "CN", title: "中国大陆" },
        { value: "JP", title: "日本" },
        { value: "KR", title: "韩国" },
        { value: "SG", title: "新加坡" },
        { value: "MY", title: "马来西亚" },
        { value: "TH", title: "泰国" },
        { value: "ID", title: "印度尼西亚" },
        { value: "PH", title: "菲律宾" },
        { value: "VN", title: "越南" },
        { value: "IN", title: "印度" },
        { value: "GB", title: "英国" },
        { value: "CA", title: "加拿大" },
        { value: "AU", title: "澳大利亚" },
        { value: "DE", title: "德国" },
        { value: "FR", title: "法国" },
        { value: "BR", title: "巴西" },
        { value: "MX", title: "墨西哥" },
      ],
    },
  ],
  modules: [
    {
      id: "loadResource",
      title: "加载资源",
      description: "起播时通过自定义解析服务生成临时播放地址",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: [],
    },
    {
      id: "youtube.home",
      title: "首页推荐",
      description: "公开的地区热门视频榜单，不是登录账号的个性化首页",
      functionName: "loadTrendingVideos",
      requiresWebView: false,
      cacheDuration: 900,
      params: [
        {
          name: "page",
          title: "页码",
          type: "page",
          value: "1",
        },
      ],
    },
    {
      id: "youtube.search",
      title: "视频搜索",
      description: "按关键词搜索 YouTube 视频",
      functionName: "searchVideos",
      requiresWebView: false,
      cacheDuration: 600,
      params: [
        {
          name: "keyword",
          title: "关键词",
          type: "input",
          description: "输入要搜索的视频关键词",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          value: "relevance",
          enumOptions: [
            { value: "relevance", title: "相关度" },
            { value: "date", title: "最新发布" },
            { value: "viewCount", title: "观看次数" },
            { value: "rating", title: "评分" },
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
    {
      id: "youtube.channel",
      title: "频道视频",
      description: "输入频道 ID、@Handle 或频道链接",
      functionName: "loadChannelVideos",
      requiresWebView: false,
      cacheDuration: 900,
      params: [
        {
          name: "channel_id",
          title: "频道 ID / Handle",
          type: "input",
          description: "例如 UC_x5XG1OV2P6uZZ5FSM9Ttw 或 @GoogleDevelopers",
        },
        {
          name: "page",
          title: "页码",
          type: "page",
          value: "1",
        },
      ],
    },
    {
      id: "youtube.playlist",
      title: "播放列表",
      description: "输入播放列表 ID 或包含 list 参数的链接",
      functionName: "loadPlaylistVideos",
      requiresWebView: false,
      cacheDuration: 900,
      params: [
        {
          name: "playlist_id",
          title: "播放列表 ID",
          type: "input",
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
  // Forward 支持的全局搜索入口；同时在 modules 中保留“视频搜索”，方便直接找到。
  search: {
    title: "搜索 YouTube 视频",
    functionName: "searchVideos",
    params: [
      {
        name: "keyword",
        title: "关键词",
        type: "input",
      },
      {
        name: "sort_by",
        title: "排序",
        type: "enumeration",
        value: "relevance",
        enumOptions: [
          { value: "relevance", title: "相关度" },
          { value: "date", title: "最新发布" },
          { value: "viewCount", title: "观看次数" },
          { value: "rating", title: "评分" },
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

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_PAGE_TOKENS = Object.create(null);
let YOUTUBE_LAST_API_KEY = "";

function youtubeText(value) {
  return String(value == null ? "" : value).trim();
}

function youtubeDecodeText(value) {
  let text = youtubeText(value);
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(x[0-9a-f]+|[0-9]+);/gi, function (_, code) {
      const base = String(code).toLowerCase().startsWith("x") ? 16 : 10;
      const number = parseInt(String(code).replace(/^x/i, ""), base);
      return Number.isFinite(number) ? String.fromCodePoint(number) : _;
    });
}

function youtubeApiKey(params) {
  const value = youtubeText(params && params.api_key) || YOUTUBE_LAST_API_KEY;
  if (!value) throw new Error("请先在模块设置中填写 YouTube API Key");
  YOUTUBE_LAST_API_KEY = value;
  return value;
}

function youtubeRegionCode(params) {
  const value = youtubeText(params && params.region_code) || "US";
  return /^[A-Za-z]{2}$/.test(value) ? value.toUpperCase() : "US";
}

function youtubePageNumber(params) {
  return Math.max(1, parseInt(params && params.page, 10) || 1);
}

function youtubeQueryString(query) {
  return Object.keys(query || {})
    .filter(function (key) {
      return query[key] !== undefined && query[key] !== null && String(query[key]) !== "";
    })
    .map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(String(query[key]));
    })
    .join("&");
}

function youtubePayload(response) {
  if (!response) throw new Error("YouTube API 没有返回数据");
  const status = Number(response.statusCode || response.status || 200);
  const data = response.data !== undefined ? response.data : response.body;
  let payload = data;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch (_) {
      throw new Error("YouTube API 返回了无法解析的响应");
    }
  }
  if (status >= 400 || !payload || payload.error) {
    const reason = payload && payload.error && (payload.error.message || payload.error.status);
    throw new Error("YouTube API 请求失败" + (reason ? ": " + reason : " (HTTP " + status + ")"));
  }
  return payload;
}

async function youtubeApi(path, query, params) {
  const request = Object.assign({}, query, { key: youtubeApiKey(params) });
  const url = YOUTUBE_API_BASE + path + "?" + youtubeQueryString(request);
  const response = await Widget.http.get(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "ForwardWidgets-YouTube/2.0.0",
    },
  });
  return youtubePayload(response);
}

function youtubePageCacheKey(kind, value, extra) {
  return [kind, value || "", JSON.stringify(extra || {})].join("|");
}

function youtubePageToken(cacheKey, page) {
  if (page <= 1) return "";
  const previousPageKey = cacheKey + "|" + (page - 1);
  const token = YOUTUBE_PAGE_TOKENS[previousPageKey];
  if (!token) throw new Error("请先从第 1 页开始加载，再继续翻页");
  return token;
}

function rememberYoutubeNextPage(cacheKey, page, token) {
  if (token) YOUTUBE_PAGE_TOKENS[cacheKey + "|" + page] = String(token);
}

function youtubeArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  const length = Number(value.length);
  if (!Number.isFinite(length) || length < 0) return [];
  const result = [];
  for (let index = 0; index < length; index += 1) {
    if (value[index] !== undefined && value[index] !== null) result.push(value[index]);
  }
  return result;
}

function youtubeVideoId(item) {
  if (!item) return "";
  if (typeof item.id === "string") return item.id;
  if (item.id && typeof item.id.videoId === "string") return item.id.videoId;
  if (item.contentDetails && item.contentDetails.videoId) return String(item.contentDetails.videoId);
  return "";
}

function youtubeThumbnail(snippet) {
  const thumbnails = snippet && snippet.thumbnails;
  if (!thumbnails) return "";
  const choice = thumbnails.maxres || thumbnails.standard || thumbnails.high || thumbnails.medium || thumbnails.default;
  return choice && choice.url ? String(choice.url) : "";
}

function youtubeExtractVideoId(value) {
  const text = youtubeText(value);
  if (!text) return "";
  if (/^[\w-]{6,}$/.test(text)) return text;
  const queryMatch = /[?&]v=([\w-]{6,})/i.exec(text);
  if (queryMatch) return queryMatch[1];
  const pathMatch = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/))([\w-]{6,})/i.exec(text);
  return pathMatch ? pathMatch[1] : "";
}

function youtubeDuration(value) {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i.exec(youtubeText(value));
  if (!match) return {};
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  const total = hours * 3600 + minutes * 60 + seconds;
  const hh = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
  return { duration: total, durationText: hh + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0") };
}

function youtubeLiveMetadata(snippet, liveStreamingDetails) {
  const status = youtubeText(snippet && snippet.liveBroadcastContent);
  const details = liveStreamingDetails || {};
  const viewers = youtubeText(details.concurrentViewers);
  if (status === "live" || (details.actualStartTime && !details.actualEndTime)) {
    return {
      durationText: viewers ? "直播中 · " + viewers + " 人观看" : "直播中",
      rating: viewers ? viewers + " 人正在观看" : "正在直播",
      releaseDate: details.actualStartTime || details.scheduledStartTime || undefined,
    };
  }
  if (status === "upcoming" || (details.scheduledStartTime && !details.actualStartTime)) {
    return {
      durationText: "即将直播",
      rating: "即将直播",
      releaseDate: details.scheduledStartTime || undefined,
    };
  }
  return {};
}

function youtubeVideoItem(snippet, id, contentDetails, statistics, liveStreamingDetails) {
  const videoId = youtubeText(id);
  if (!videoId || !snippet) return null;
  const watchUrl = "https://www.youtube.com/watch?v=" + encodeURIComponent(videoId);
  const title = youtubeDecodeText(snippet.title) || "YouTube 视频";
  const cover = youtubeThumbnail(snippet);
  const duration = youtubeDuration(contentDetails && contentDetails.duration);
  const views = statistics && statistics.viewCount != null ? String(statistics.viewCount) : "";
  const liveMetadata = youtubeLiveMetadata(snippet, liveStreamingDetails);
  return Object.assign(
    {
      // type=url 的 id 按 Forward 模型应是对应 URL；解析服务仍可从 id/link 提取视频 ID。
      id: watchUrl,
      type: "url",
      mediaType: "movie",
      link: watchUrl,
      title: title,
      description: youtubeDecodeText(snippet.description) || undefined,
      coverUrl: cover || undefined,
      posterPath: cover || undefined,
      backdropPath: cover || undefined,
      detailPoster: cover || undefined,
      releaseDate: snippet.publishedAt || undefined,
      genreTitle: youtubeDecodeText(snippet.channelTitle) || undefined,
      rating: views ? views + " 次观看" : undefined,
      // 这是稳定的 YouTube 页面地址，不是一次性播放地址；loadResource 会在起播时替换它。
      videoUrl: watchUrl,
    },
    duration,
    liveMetadata
  );
}

function youtubeVideoItems(items) {
  return youtubeArray(items)
    .map(function (item) {
      return youtubeVideoItem(item.snippet, youtubeVideoId(item), item.contentDetails, item.statistics, item.liveStreamingDetails);
    })
    .filter(Boolean);
}

function youtubeOutputVideoId(item) {
  if (!item) return "";
  return youtubeExtractVideoId(item.id) || youtubeExtractVideoId(item.link);
}

async function youtubeVideosByIds(ids, params) {
  const unique = [];
  youtubeArray(ids).forEach(function (id) {
    const value = youtubeText(id);
    if (value && unique.indexOf(value) < 0) unique.push(value);
  });
  if (!unique.length) return [];
  const payload = await youtubeApi("/videos", {
    part: "snippet,contentDetails,statistics,liveStreamingDetails",
    id: unique.join(","),
    maxResults: 50,
  }, params);
  const byId = Object.create(null);
  youtubeVideoItems(payload.items).forEach(function (item) {
    const videoId = youtubeOutputVideoId(item);
    if (videoId) byId[videoId] = item;
  });
  return unique.map(function (id) { return byId[id]; }).filter(Boolean);
}

async function youtubeHydrateItems(items, params) {
  const sourceItems = youtubeArray(items);
  const ids = sourceItems.map(youtubeVideoId).filter(Boolean);
  const hydratedItems = await youtubeVideosByIds(ids, params);
  const byId = Object.create(null);
  hydratedItems.forEach(function (item) {
    const videoId = youtubeOutputVideoId(item);
    if (videoId) byId[videoId] = item;
  });
  return sourceItems
    .map(function (item) {
      const id = youtubeVideoId(item);
      return byId[id] || youtubeVideoItem(
        item.snippet,
        id,
        item.contentDetails,
        item.statistics,
        item.liveStreamingDetails
      );
    })
    .filter(Boolean);
}

function youtubeExtractQueryParam(value, name) {
  const match = new RegExp("[?&]" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^&#]+)", "i").exec(String(value || ""));
  if (!match) return "";
  try { return decodeURIComponent(match[1]); } catch (_) { return match[1]; }
}

function youtubeChannelRef(value) {
  const text = youtubeText(value);
  if (!text) throw new Error("请输入频道 ID、@Handle 或频道链接");
  const channelMatch = /\/channel\/([^/?#]+)/i.exec(text);
  if (channelMatch) return { id: channelMatch[1] };
  const handleMatch = /\/(@[^/?#]+)/i.exec(text);
  if (handleMatch) return { handle: handleMatch[1] };
  if (/^UC[\w-]{10,}$/i.test(text)) return { id: text };
  if (text.charAt(0) === "@") return { handle: text };
  if (/^[\w.-]+$/.test(text)) return { handle: text };
  throw new Error("无法识别频道 ID 或 Handle；请使用 UC... 或 @Handle");
}

function youtubePlaylistId(value) {
  const text = youtubeText(value);
  const fromUrl = youtubeExtractQueryParam(text, "list");
  const id = fromUrl || text;
  if (!id) throw new Error("请输入播放列表 ID 或包含 list 参数的链接");
  return id;
}

async function resolveYoutubeUploadsPlaylist(value, params) {
  const channel = await resolveYoutubeChannel(value, params);
  const uploads = channel.uploads;
  if (!uploads) throw new Error("该频道没有公开视频");
  return { id: uploads, title: channel.title };
}

async function resolveYoutubeChannel(value, params) {
  const ref = youtubeChannelRef(value);
  const query = {
    part: "snippet,contentDetails",
    maxResults: 1,
  };
  if (ref.id) query.id = ref.id;
  else if (ref.handle) query.forHandle = ref.handle;
  const payload = await youtubeApi("/channels", query, params);
  const channel = youtubeArray(payload.items)[0] || null;
  const uploads = channel && channel.contentDetails && channel.contentDetails.relatedPlaylists && channel.contentDetails.relatedPlaylists.uploads;
  if (!channel || !channel.id) throw new Error("找不到该频道");
  return {
    id: String(channel.id),
    uploads: uploads ? String(uploads) : "",
    title: channel.snippet && youtubeDecodeText(channel.snippet.title),
  };
}

async function searchVideos(params) {
  const options = params || {};
  const keyword = youtubeText(options.keyword);
  if (!keyword) return [];
  const page = youtubePageNumber(options);
  const sortBy = ["relevance", "date", "viewCount", "rating"].indexOf(String(options.sort_by)) >= 0 ? String(options.sort_by) : "relevance";
  const cacheKey = youtubePageCacheKey("search", keyword, { sortBy, region: youtubeRegionCode(options) });
  const payload = await youtubeApi("/search", {
    part: "snippet",
    type: "video",
    q: keyword,
    order: sortBy,
    maxResults: 20,
    regionCode: youtubeRegionCode(options),
    pageToken: youtubePageToken(cacheKey, page),
  }, options);
  rememberYoutubeNextPage(cacheKey, page, payload.nextPageToken);
  return youtubeHydrateItems(payload.items, options);
}

async function loadTrendingVideos(params) {
  const options = params || {};
  const page = youtubePageNumber(options);
  const region = youtubeRegionCode(options);
  const cacheKey = youtubePageCacheKey("trending", region, {});
  const payload = await youtubeApi("/videos", {
    part: "snippet,contentDetails,statistics,liveStreamingDetails",
    chart: "mostPopular",
    maxResults: 20,
    regionCode: region,
    pageToken: youtubePageToken(cacheKey, page),
  }, options);
  rememberYoutubeNextPage(cacheKey, page, payload.nextPageToken);
  return youtubeVideoItems(payload.items);
}

async function loadPlaylistVideos(params) {
  const options = params || {};
  const playlist = youtubePlaylistId(options.playlist_id);
  const page = youtubePageNumber(options);
  const cacheKey = youtubePageCacheKey("playlist", playlist, {});
  const payload = await youtubeApi("/playlistItems", {
    part: "snippet,contentDetails",
    playlistId: playlist,
    maxResults: 20,
    pageToken: youtubePageToken(cacheKey, page),
  }, options);
  rememberYoutubeNextPage(cacheKey, page, payload.nextPageToken);
  return youtubeHydrateItems(payload.items, options);
}

async function loadChannelVideos(params) {
  const options = params || {};
  const resolved = await resolveYoutubeUploadsPlaylist(options.channel_id, options);
  const playlistOptions = Object.assign({}, options, { playlist_id: resolved.id });
  return loadPlaylistVideos(playlistOptions);
}

async function loadDetail(link) {
  const value = youtubeText(link);
  const id = youtubeExtractVideoId(value);
  if (!id) return null;
  try {
    const items = await youtubeVideosByIds([id], {});
    return items[0] || {
      id: "https://www.youtube.com/watch?v=" + encodeURIComponent(id),
      type: "url",
      mediaType: "movie",
      link: "https://www.youtube.com/watch?v=" + encodeURIComponent(id),
      title: "YouTube 视频",
      videoUrl: "https://www.youtube.com/watch?v=" + encodeURIComponent(id),
    };
  } catch (error) {
    console.error("YouTube 详情加载失败:", error && error.message ? error.message : error);
    return null;
  }
}

function youtubeResolverPayload(response) {
  if (!response) throw new Error("解析服务没有返回数据");
  const status = Number(response.statusCode || response.status || 200);
  let payload = response.data !== undefined ? response.data : response.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch (_) {
      throw new Error("解析服务返回了无法解析的响应");
    }
  }
  if (status >= 400 || !payload || payload.error) {
    const reason = payload && (payload.detail || payload.error || payload.message);
    throw new Error("解析服务请求失败" + (reason ? ": " + String(reason) : " (HTTP " + status + ")"));
  }
  return payload;
}

function youtubeResolverEndpoint(value, videoId) {
  const baseUrl = youtubeText(value).replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(baseUrl)) throw new Error("解析服务地址必须以 http:// 或 https:// 开头");
  const endpoint = /\/v1\/resolve$/i.test(baseUrl) ? baseUrl : baseUrl + "/v1/resolve";
  return endpoint + "?video_id=" + encodeURIComponent(videoId);
}

function youtubeResolverHeaders(value) {
  const source = value && typeof value === "object" ? value : {};
  const result = {};
  ["User-Agent", "Referer", "Origin", "Accept", "Accept-Language"].forEach(function (name) {
    if (source[name]) result[name] = String(source[name]);
  });
  return result;
}

async function youtubeResolverResource(params, videoId) {
  const token = youtubeText(params && params.resolver_token);
  if (!token) throw new Error("请先在模块设置中填写解析服务 Token");
  const headers = { Accept: "application/json" };
  headers.Authorization = "Bearer " + token;
  headers["X-API-Key"] = token;
  const response = await Widget.http.get(youtubeResolverEndpoint(params.resolver_url, videoId), { headers: headers });
  console.log("[YTDBG-200] resolver response status=" + Number(response && (response.statusCode || response.status || 200)));
  const payload = youtubeResolverPayload(response);
  const url = youtubeText(payload.url);
  if (!/^https?:\/\//i.test(url)) throw new Error("解析服务没有返回有效的播放地址");
  const details = [payload.ext, payload.protocol, payload.format_note].filter(Boolean).join(" · ");
  return {
    name: "自定义解析服务",
    description: details || "yt-dlp 临时播放地址",
    url: url,
    customHeaders: youtubeResolverHeaders(payload.headers || payload.http_headers),
    playerType: payload.player_type === "system" ? "system" : "app",
  };
}

async function loadResource(params) {
  const options = params || {};
  const resolverUrl = youtubeText(options.resolver_url);
  if (!resolverUrl) {
    throw new Error("请先在模块设置中填写自定义解析服务地址");
  }
  const context = {
    id: youtubeText(options.id),
    link: youtubeText(options.link),
    videoUrl: youtubeText(options.videoUrl),
    type: youtubeText(options.type),
    title: youtubeText(options.title),
  };
  console.log("[YTDBG-200] loadResource context=" + JSON.stringify(context));
  const id = youtubeExtractVideoId(options.videoUrl) ||
    youtubeExtractVideoId(options.link) ||
    youtubeExtractVideoId(options.id);
  if (!id) throw new Error("无法从播放上下文中识别 YouTube 视频 ID");
  console.log("[YTDBG-200] loadResource video_id=" + id + " resolver=custom");
  return [await youtubeResolverResource({
    resolver_url: resolverUrl,
    resolver_token: youtubeText(options.resolver_token),
  }, id)];
}
