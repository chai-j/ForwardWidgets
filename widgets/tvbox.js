var WidgetMetadata = {
  id: "chai.tvbox",
  title: "TVBox 源",
  version: "1.2.0",
  requiredVersion: "0.0.6",
  description: "从内置 TVBox 配置里浏览 JSON 采集站（type 为 1，接口路径包含 provide/vod），并从 JS 插件包中提取采集接口。下拉是单选；要再用别的地址，填到「追加配置地址」。带账号密码的源不会写入公开模块。",
  author: "chai-j",
  detailCacheDuration: 120,
  globalParams: [
    {
      name: "preset",
      title: "内置配置",
      type: "enumeration",
      value: "all",
      description: "默认使用全部内置地址。Rex 参数不能多选，要只用其中一份就在这里改；要再加地址，填下一项。JS 插件包只提取里面的采集接口，不执行爬虫代码。",
      enumOptions: [
        { title: "全部内置源", value: "all" },
        { title: "只用追加地址", value: "none" },
        { title: "Moon 合并", value: "moon" },
        { title: "饭太硬", value: "fty" },
        { title: "fun", value: "fun" },
        { title: "福利", value: "fuli" },
        { title: "饭太硬导航（网页）", value: "fty-nav" },
        { title: "Venera 索引", value: "venera" },
        { title: "catpaw（JS，需认证）", value: "catpaw" },
        { title: "kstore（JS）", value: "kstore" },
        { title: "xiaosage（JS）", value: "xiaosage" },
        { title: "Yswag（JS）", value: "yswag" },
        { title: "lmentor（JS）", value: "lmentor" }
      ]
    },
    {
      name: "configUrls",
      title: "追加配置地址",
      type: "input",
      description: "额外的 TVBox JSON 地址，逗号、空格或换行分隔。会和上面选中的配置一起用。",
      placeholders: [{ title: "https://example.com/tvbox.json", value: "" }]
    },
    {
      name: "siteKeys",
      title: "只启用这些源",
      type: "input",
      description: "站点 key，逗号或空格分隔。留空表示配置里的全部 JSON 采集站。",
      placeholders: [{ title: "留空为全部", value: "" }]
    }
  ],
  modules: [
    {
      id: "sites",
      title: "源列表",
      subtitle: "配置里可用的 JSON 采集站",
      functionName: "loadSites",
      cacheDuration: 600,
      params: []
    },
    {
      id: "browse",
      title: "浏览",
      subtitle: "按源和分类翻页",
      functionName: "loadBrowse",
      cacheDuration: 120,
      params: [
        {
          name: "site",
          title: "源",
          type: "enumeration",
          description: "选项来自上面的配置地址。",
          enumOptions: [{ title: "请先填写配置地址", value: "" }],
          dynamicOptions: { functionName: "siteOptions", dependsOn: ["preset", "configUrls", "siteKeys"] }
        },
        {
          name: "category",
          title: "分类",
          type: "enumeration",
          enumOptions: [{ title: "全部分类", value: "" }],
          dynamicOptions: { functionName: "categoryOptions", dependsOn: ["site", "preset", "configUrls", "siteKeys"] }
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "loadResource",
      title: "播放资源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 120,
      params: []
    }
  ],
  search: {
    id: "search",
    title: "搜索",
    functionName: "search",
    cacheDuration: 120,
    params: [
      {
        name: "keyword",
        title: "关键词",
        type: "input",
        placeholders: [{ title: "片名", value: "" }]
      },
      { name: "page", title: "页码", type: "page" },
      {
        name: "site",
        title: "源",
        type: "enumeration",
        description: "不选则搜索已启用的源，最多 8 个。",
        enumOptions: [{ title: "全部（最多 8 个）", value: "" }],
        dynamicOptions: { functionName: "searchSiteOptions", dependsOn: ["preset", "configUrls", "siteKeys"] }
      }
    ]
  }
};

var SEARCH_LIMIT = 8;
var CACHE_MS = 5 * 60 * 1000;
var PRESETS = [
  { id: "moon", title: "Moon 合并", url: "https://raw.githubusercontent.com/heart1016/tvbox/refs/heads/main/moon_tvbox_sites_merged.json" },
  { id: "fty", title: "饭太硬", url: "https://raw.githubusercontent.com/qist/tvbox/master/fty.json" },
  { id: "fun", title: "fun", url: "https://raw.githubusercontent.com/cluntop/tvbox/refs/heads/main/fun.json" },
  { id: "fuli", title: "福利", url: "https://raw.githubusercontent.com/ddavidaurora/TVbox-interface/99cc2162519721d023843f230deaa453cf8d0570/tvbox-福利.json" },
  { id: "fty-nav", title: "饭太硬导航", url: "https://fty.888484.xyz/tv" },
  { id: "venera", title: "Venera 索引", url: "https://cdn.jsdelivr.net/gh/venera-app/venera-configs@main/index.json" },
  { id: "catpaw", title: "catpaw", url: "https://catpaw.douer.me/index.js.md5" },
  { id: "kstore", title: "kstore", url: "https://9280.kstore.vip/cat/index.js.md5" },
  { id: "xiaosage", title: "xiaosage", url: "https://xiaosage.361123.xyz/index.js.md5" },
  { id: "yswag", title: "Yswag", url: "https://raw.githubusercontent.com/Yswag/xptv-extensions/refs/heads/jstv/index.js.md5" },
  { id: "lmentor", title: "lmentor", url: "https://raw.githubusercontent.com/Darklessing/catvod/refs/heads/main/lmentor/index.js.md5" }
];

async function loadSites(params) {
  const sites = await enabledSites(params);
  return sites.map(siteCard);
}

async function loadBrowse(params) {
  const site = await requireSite(params, params.site);
  const data = await cmsGet(site.api, {
    ac: "detail",
    t: String(params.category || "").trim(),
    pg: pageNumber(params.page)
  });
  return vodList(data).map(vod => vodCard(vod, site));
}

async function search(params) {
  const keyword = String(params.keyword || "").trim();
  if (!keyword) throw new Error("请输入关键词");
  const targets = await searchTargets(params);
  const page = pageNumber(params.page);
  const settled = await mapPool(targets, 4, site => searchSite(site, keyword, page));
  const cards = [];
  let failures = 0;
  settled.forEach(item => {
    if (!item || item.error) {
      failures += 1;
      return;
    }
    cards.push.apply(cards, item.cards);
  });
  if (!cards.length && failures === targets.length) {
    throw new Error("搜索失败：" + (settled[0] && settled[0].error ? settled[0].error : "采集站没有响应"));
  }
  return cards.slice(0, 60);
}

async function loadDetail(link) {
  const payload = decodeLink(link);
  if (payload.kind === "site") return siteDetail(payload);
  if (payload.kind !== "vod" || !payload.id) throw new Error("无法识别的详情链接");
  const vod = await fetchVod(payload);
  return vodDetail(vod, payload);
}

async function loadResource(params) {
  params = params || {};
  if (typeof params.link === "string" && params.link.indexOf("tvbox:") === 0) {
    const payload = decodeLink(params.link);
    if (payload.kind === "site") return [];
    const vod = await fetchVod(payload);
    const streams = streamsFromVod(vod, payload, params.episode, true);
    if (!streams.length) throw new Error("没有可播放的地址");
    return streams.slice(0, 40);
  }
  const query = String(params.seriesName || params.episodeName || "").trim();
  if (!query) throw new Error("没有可搜索的片名");
  const targets = await searchTargets(params);
  const settled = await mapPool(targets, 4, site => searchSite(site, query, 1));
  const streams = [];
  settled.forEach(item => {
    if (!item || item.error) return;
    item.vods.forEach(vod => {
      if (!titleMatches(vod.vod_name, query)) return;
      const site = item.site;
      streams.push.apply(streams, streamsFromVod(vod, {
        playUrl: site.playUrl,
        name: site.name
      }, params.episode, false));
    });
  });
  if (!streams.length) throw new Error("没有匹配的播放地址");
  return streams.slice(0, 40);
}

async function siteOptions(params) {
  const sites = await enabledSites(params);
  return sites.map(site => ({ title: site.name + " (" + site.key + ")", value: site.key }));
}

async function searchSiteOptions(params) {
  const sites = await enabledSites(params);
  return [{ title: "全部（最多 " + SEARCH_LIMIT + " 个）", value: "" }].concat(sites.map(site => ({
    title: site.name + " (" + site.key + ")",
    value: site.key
  })));
}

async function categoryOptions(params) {
  const site = await findSite(params, params.site);
  if (!site) return [{ title: "全部分类", value: "" }];
  const data = await cmsGet(site.api, { ac: "list" });
  const options = [{ title: "全部分类", value: "" }];
  const classes = data && Array.isArray(data.class) ? data.class : [];
  classes.forEach(item => {
    if (!item || item.type_id == null || !item.type_name) return;
    options.push({ title: String(item.type_name), value: String(item.type_id) });
  });
  return options;
}

function siteCard(site) {
  return {
    id: "site:" + site.key,
    type: "url",
    title: site.name,
    subtitle: site.key + " · " + hostOf(site.api) + (site.searchable ? "" : " · 不可搜"),
    link: encodeLink({
      kind: "site",
      api: site.api,
      playUrl: site.playUrl,
      key: site.key,
      name: site.name
    })
  };
}

async function siteDetail(payload) {
  const site = {
    key: payload.key,
    name: payload.name || payload.key,
    api: payload.api,
    playUrl: payload.playUrl || "",
    searchable: true
  };
  const data = await cmsGet(site.api, { ac: "detail", pg: 1 });
  const classes = data && Array.isArray(data.class) ? data.class : [];
  const item = {
    id: "site:" + site.key,
    type: "url",
    title: site.name,
    subtitle: site.key,
    link: encodeLink(payload),
    description: classes.length
      ? "分类：" + classes.map(item => String(item.type_name) + " " + String(item.type_id)).join("、") + "。翻页请用「浏览」。"
      : "翻页请用「浏览」并选择这个源。"
  };
  const related = vodList(data).slice(0, 20).map(vod => vodCard(vod, site));
  if (related.length) item.relatedItems = related;
  return item;
}

function vodCard(vod, site) {
  const id = String(vod.vod_id);
  const item = {
    id: site.key + ":" + id,
    type: "url",
    title: String(vod.vod_name || "未命名"),
    link: encodeLink({
      kind: "vod",
      api: site.api,
      id: id,
      playUrl: site.playUrl || "",
      key: site.key,
      name: site.name
    })
  };
  const subtitle = [vod.vod_remarks, vod.type_name, vod.vod_year, site.name].filter(Boolean).map(String);
  if (subtitle.length) item.subtitle = subtitle.join(" · ");
  const pic = cleanPic(vod.vod_pic);
  if (pic) {
    item.posterPath = pic;
    item.coverUrl = pic;
  }
  const text = stripHtml(vod.vod_content || vod.vod_blurb || "");
  if (text) item.description = text.slice(0, 500);
  const date = releaseDateOf(vod);
  if (date) item.releaseDate = date;
  const rating = scoreOf(vod);
  if (rating) item.rating = rating;
  return item;
}

function vodDetail(vod, payload) {
  const site = {
    key: payload.key || "cms",
    name: payload.name || "",
    api: payload.api,
    playUrl: payload.playUrl || ""
  };
  const item = vodCard(vod, site);
  item.link = encodeLink({
    kind: "vod",
    api: payload.api,
    id: String(payload.id),
    playUrl: site.playUrl,
    key: site.key,
    name: site.name
  });
  const typeName = String(vod.type_name || "").trim();
  if (typeName) {
    item.genreTitle = typeName;
    item.genreItems = [{ id: String(vod.type_id != null ? vod.type_id : typeName), title: typeName }];
  }
  const lines = parseLines(vod, site.playUrl);
  const episodes = [];
  lines.forEach((line, lineIndex) => {
    line.episodes.forEach((episode, episodeIndex) => {
      episodes.push({
        id: String(payload.id) + ":" + lineIndex + ":" + episodeIndex,
        type: "url",
        title: line.name + " · " + episode.title,
        episode: episode.episode,
        videoUrl: episode.url
      });
    });
  });
  if (episodes.length) item.episodeItems = episodes;
  if (episodes.length === 1) item.videoUrl = episodes[0].videoUrl;
  const count = episodes.reduce((max, episode) => Math.max(max, episode.episode), 0);
  item.mediaType = count > 1 || typeName.indexOf("剧") >= 0 ? "tv" : "movie";
  return item;
}

function streamsFromVod(vod, payload, episode, fallbackAll) {
  const lines = parseLines(vod, payload.playUrl || "");
  const want = Number(episode);
  const siteName = payload.name || payload.key || "采集站";
  const picked = [];
  lines.forEach(line => {
    const chosen = want ? line.episodes.filter(item => item.episode === want) : line.episodes.slice(0, 1);
    chosen.forEach(item => {
      picked.push({ name: siteName + " · " + line.name + " · " + item.title, url: item.url });
    });
  });
  if (want && !picked.length && fallbackAll) {
    lines.forEach(line => {
      line.episodes.forEach(item => {
        picked.push({ name: siteName + " · " + line.name + " · " + item.title, url: item.url });
      });
    });
  }
  return picked;
}

function parseLines(vod, playUrl) {
  const froms = String(vod.vod_play_from || "").split("$$$");
  const groups = String(vod.vod_play_url || "").split("$$$");
  const lines = [];
  groups.forEach((group, index) => {
    const lineName = String(froms[index] || ("线路" + (index + 1))).trim() || ("线路" + (index + 1));
    const episodes = [];
    let fallback = 0;
    String(group || "").split("#").forEach(piece => {
      if (!piece) return;
      const cut = piece.indexOf("$");
      const label = (cut >= 0 ? piece.slice(0, cut) : "").trim();
      const rawUrl = (cut >= 0 ? piece.slice(cut + 1) : piece).trim();
      const url = playable(rawUrl, playUrl);
      if (!url) return;
      fallback += 1;
      const title = label || ("第" + fallback + "集");
      episodes.push({ title: title, url: url, episode: episodeNumber(title, fallback) });
    });
    if (episodes.length) lines.push({ name: lineName, episodes: episodes });
  });
  return lines;
}

function playable(url, playUrl) {
  let raw = String(url || "").trim();
  if (!raw) return "";
  if (raw.indexOf("//") === 0) raw = "https:" + raw;
  if (isDirect(raw)) return raw;
  const prefix = String(playUrl || "").trim();
  if (!prefix) return raw;
  if (prefix.indexOf(raw) >= 0) return prefix;
  return prefix + raw;
}

function isDirect(url) {
  return /\.(m3u8|mp4|flv|mkv|mpd|ts|m4v)(\?|#|$)/i.test(url);
}

function episodeNumber(title, fallback) {
  const matched = /第\s*0*(\d+)\s*集/.exec(title) || /^0*(\d+)$/.exec(String(title || "").trim());
  if (matched) return Number(matched[1]);
  return fallback;
}

function titleMatches(name, query) {
  const left = normalize(name);
  const right = normalize(query);
  if (!left || !right) return false;
  if (left === right) return true;
  if (right.length < 2) return false;
  return left.indexOf(right) >= 0 || right.indexOf(left) >= 0;
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[\s:：\-—_.·,，!！?？'"“”`~～]/g, "");
}

async function searchSite(site, keyword, page) {
  try {
    const data = await cmsGet(site.api, { ac: "detail", wd: keyword, pg: page });
    const vods = vodList(data);
    return { site: site, vods: vods, cards: vods.map(vod => vodCard(vod, site)) };
  } catch (e) {
    console.log("跳过源 " + site.key, e && e.message ? e.message : "请求失败");
    return { error: e && e.message ? e.message : "请求失败" };
  }
}

async function searchTargets(params) {
  const sites = await enabledSites(params);
  const picked = String(params.site || "").trim();
  if (picked) return [await requireSite(params, picked)];
  const searchable = sites.filter(site => site.searchable);
  const pool = searchable.length ? searchable : sites;
  if (pool.length > SEARCH_LIMIT) {
    console.log("搜索只使用前 " + SEARCH_LIMIT + " 个源", pool.slice(0, SEARCH_LIMIT).map(site => site.key).join(","));
  }
  return pool.slice(0, SEARCH_LIMIT);
}

async function fetchVod(payload) {
  const data = await cmsGet(payload.api, { ac: "detail", ids: payload.id });
  const vod = vodList(data)[0];
  if (!vod) throw new Error("没有找到这部影片");
  return vod;
}

function vodList(data) {
  if (data && Array.isArray(data.list)) return data.list;
  return [];
}

async function enabledSites(params) {
  const cacheKey = "sites:" + String(params.preset || "") + "|" + String(params.configUrls || "") + "|" + String(params.siteKeys || "");
  try {
    const hit = Widget.storage.get(cacheKey);
    if (hit && hit.savedAt && Date.now() - hit.savedAt < CACHE_MS && Array.isArray(hit.sites)) return hit.sites;
  } catch (e) { /* 缓存不可用时直接请求 */ }
  const urls = selectedUrls(params);
  if (!urls.length) throw new Error("请选择一个内置配置，或填写追加地址");
  const fetched = await mapPool(urls, 4, async function (url) {
    try {
      return { doc: await loadConfigDoc(url) };
    } catch (e) {
      return { error: url + "：" + (e && e.message ? e.message : "读取失败") };
    }
  });
  const docs = [];
  const errors = [];
  fetched.forEach(item => {
    if (item && item.doc) docs.push(item.doc);
    else if (item && item.error) errors.push(item.error);
  });
  if (!docs.length) throw new Error(errors.join("；") || "没有读到配置");
  if (errors.length) console.log("部分配置读取失败", errors.join("；"));
  const allow = splitList(params.siteKeys);
  const seen = {};
  const sites = [];
  docs.forEach(doc => {
    extractSites(doc).forEach(site => addSite(site, allow, seen, sites));
    extractJsSites(doc).forEach(site => addSite(site, allow, seen, sites));
  });
  if (!sites.length) {
    throw new Error("配置里没有可用的 JSON 采集站或可提取的采集接口。jar、js、py 爬虫代码不会运行。");
  }
  console.log("TVBox 可用采集接口", sites.length, "个");
  try { Widget.storage.set(cacheKey, { savedAt: Date.now(), sites: sites }); } catch (e) { /* 忽略缓存失败 */ }
  return sites;
}

function selectedUrls(params) {
  const preset = String(params.preset || "all");
  const extra = splitList(params.configUrls);
  const urls = [];
  if (preset === "all") {
    PRESETS.forEach(item => urls.push(item.url));
  } else if (preset !== "none") {
    const found = PRESETS.filter(item => item.id === preset)[0];
    if (!found) throw new Error("没有这个内置配置：" + preset);
    urls.push(found.url);
  }
  extra.forEach(url => {
    if (urls.indexOf(url) < 0) urls.push(url);
  });
  return urls;
}

async function findSite(params, key) {
  const id = String(key || "").trim();
  if (!id) return null;
  const sites = await enabledSites(params);
  for (let i = 0; i < sites.length; i++) if (sites[i].key === id) return sites[i];
  return null;
}

async function requireSite(params, key) {
  const id = String(key || "").trim();
  if (!id) throw new Error("请选择一个源");
  const site = await findSite(params, id);
  if (!site) throw new Error("没有这个 JSON 采集站：" + id);
  return site;
}

function isJsonCms(site) {
  if (!site || typeof site !== "object") return false;
  if (String(site.type) !== "1") return false;
  const api = String(site.api || "").trim();
  if (!/^https?:\/\//i.test(api)) return false;
  return /provide\/vod/i.test(api);
}

function extractSites(doc) {
  if (Array.isArray(doc)) return doc;
  if (doc && Array.isArray(doc.sites)) return doc.sites;
  return [];
}

function addSite(site, allow, seen, sites) {
  if (!isJsonCms(site)) return;
  const key = String(site.key || "").trim();
  if (!key || seen[key]) return;
  if (allow.length && allow.indexOf(key) < 0) return;
  seen[key] = true;
  sites.push({
    key: key,
    name: String(site.name || key),
    api: String(site.api).trim(),
    playUrl: String(site.playUrl || "").trim(),
    searchable: !(site.searchable === 0 || site.searchable === "0")
  });
}

function extractJsSites(doc) {
  if (!doc || typeof doc !== "object") return [];
  if (typeof doc.jsText !== "string" || !doc.jsText) return [];
  const found = [];
  const seen = {};
  const re = /(?:https?:)?\/\/[^\s"'`]+?api\.php\/provide\/vod\/?/gi;
  let match;
  while ((match = re.exec(doc.jsText)) !== null) {
    let api = String(match[0] || "").replace(/\\+$/, "");
    if (api.indexOf("//") === 0) api = "https:" + api;
    if (seen[api] || /^https?:\/\/example\.com\//i.test(api)) continue;
    seen[api] = true;
    found.push({
      key: "js:" + hostOf(api) + ":" + found.length,
      name: hostOf(api) + " JS 采集",
      type: 1,
      api: api,
      searchable: 1
    });
  }
  return found;
}

async function loadConfigDoc(url) {
  const target = /\.js\.md5(?:\?|#|$)/i.test(url) ? url.replace(/\.js\.md5(?=\?|#|$)/i, ".js") : url;
  const data = await httpGet(target);
  if (data && typeof data === "object") return data;
  if (typeof data === "string") {
    const text = data.replace(/^﻿/, "").trim();
    if (/\.js(?:\?|#|$)/i.test(target) && !/^[a-f0-9]{32}$/i.test(text)) return { jsText: text };
  }
  return asObject(data);
}

function asObject(data) {
  if (data && typeof data === "object") return data;
  if (typeof data === "string") {
    const text = data.replace(/^﻿/, "").trim();
    if (!text) throw new Error("配置内容是空的");
    if (/^[a-f0-9]{32}$/i.test(text)) throw new Error("这是 md5 校验文件，不是 TVBox 配置");
    if (/^<!doctype html/i.test(text) || /^<html/i.test(text)) throw new Error("这是网页，不是 TVBox 配置");
    try { return JSON.parse(text); } catch (e) { throw new Error("配置不是 JSON"); }
  }
  throw new Error("配置不是 JSON");
}

function splitList(value) {
  return String(value || "").split(/[\s,，]+/).map(item => item.trim()).filter(Boolean);
}

function pageNumber(value) {
  const page = Number(value);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
}

function cmsUrl(api, query) {
  const raw = String(api || "").trim();
  const hashAt = raw.indexOf("#");
  const hash = hashAt >= 0 ? raw.slice(hashAt) : "";
  const base = hashAt >= 0 ? raw.slice(0, hashAt) : raw;
  const queryAt = base.indexOf("?");
  const path = queryAt >= 0 ? base.slice(0, queryAt) : base;
  const params = {};
  if (queryAt >= 0) {
    base.slice(queryAt + 1).split("&").forEach(pair => {
      if (!pair) return;
      const cut = pair.indexOf("=");
      const key = decodeURIComponent(cut >= 0 ? pair.slice(0, cut) : pair);
      const value = decodeURIComponent(cut >= 0 ? pair.slice(cut + 1) : "");
      if (key) params[key] = value;
    });
  }
  Object.keys(query || {}).forEach(key => {
    const value = query[key];
    if (value === undefined || value === null || value === "") return;
    params[key] = String(value);
  });
  const order = ["ac", "ids", "wd", "t", "pg"];
  const keys = Object.keys(params).sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia < 0 && ib < 0) return a < b ? -1 : a > b ? 1 : 0;
    if (ia < 0) return 1;
    if (ib < 0) return -1;
    return ia - ib;
  });
  const qs = keys.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])).join("&");
  return path + (qs ? "?" + qs : "") + hash;
}

async function cmsGet(api, query) {
  let data;
  try {
    data = await httpGet(cmsUrl(api, query));
  } catch (e) {
    throw new Error("采集站请求失败：" + (e && e.message ? e.message : "网络错误"));
  }
  if (typeof data === "string") {
    try { data = JSON.parse(data.replace(/^﻿/, "")); }
    catch (e) { throw new Error("采集站没有返回 JSON"); }
  }
  if (!data || typeof data !== "object") throw new Error("采集站没有返回 JSON");
  if (data.code != null && String(data.code) !== "1" && !Array.isArray(data.list)) {
    throw new Error(data.msg ? String(data.msg) : "采集站返回失败");
  }
  return data;
}

async function httpGet(url) {
  let response;
  try {
    response = await Widget.http.request({
      url: url,
      method: "GET",
      timeout: 12,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RexTVBox/1.0)",
        Accept: "application/json"
      }
    });
  } catch (e) {
    throw new Error(e && e.message ? e.message : "网络错误");
  }
  return response ? response.data : null;
}

function encodeLink(payload) {
  return "tvbox:" + encodeURIComponent(JSON.stringify(payload));
}

function decodeLink(link) {
  const raw = String(link || "");
  if (raw.indexOf("tvbox:") !== 0) throw new Error("无法识别的详情链接");
  let payload;
  try { payload = JSON.parse(decodeURIComponent(raw.slice(6))); }
  catch (e) { throw new Error("无法识别的详情链接"); }
  if (!payload || typeof payload !== "object" || !payload.api) throw new Error("无法识别的详情链接");
  return payload;
}

function cleanPic(value) {
  const first = String(value || "").split(",")[0].trim();
  if (!first) return "";
  if (first.indexOf("//") === 0) return "https:" + first;
  if (/^https?:\/\//i.test(first)) return first;
  return "";
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#?\w+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function releaseDateOf(vod) {
  const published = String(vod.vod_pubdate || "").trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(published)) return published.slice(0, 10);
  const year = String(vod.vod_year || "").trim();
  if (/^\d{4}$/.test(year)) return year + "-01-01";
  if (/^\d{4}$/.test(published)) return published + "-01-01";
  return "";
}

function scoreOf(vod) {
  const value = String(vod.vod_score != null ? vod.vod_score : "").trim();
  if (!value || !Number.isFinite(Number(value)) || Number(value) <= 0) return "";
  return value;
}

function hostOf(api) {
  const matched = /^https?:\/\/([^/]+)/i.exec(String(api || ""));
  return matched ? matched[1] : String(api || "");
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let cursor = 0;
  async function worker() {
    for (;;) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      out[index] = await fn(items[index], index);
    }
  }
  const workers = Math.max(1, Math.min(limit, items.length));
  const tasks = [];
  for (let i = 0; i < workers; i++) tasks.push(worker());
  await Promise.all(tasks);
  return out;
}
