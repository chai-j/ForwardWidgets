var WidgetMetadata = {
    id: "hanime1_me",
    title: "Hanime1",
    description: "浏览、筛选和播放 Hanime1 视频",
    author: "chai-j",
    site: "https://hanime1.me",
    version: "1.0.0",
    requiredVersion: "0.0.2",
    detailCacheDuration: 300,
    search: {
        title: "搜索影片",
        functionName: "searchVideos",
        params: [
            {
                name: "keyword",
                title: "搜索关键词",
                type: "input",
                description: "输入标题、作者或标签",
                value: ""
            },
            {
                name: "sort_by",
                title: "排序",
                type: "enumeration",
                description: "搜索结果排序方式",
                value: "new_release",
                enumOptions: [
                    { title: "最新上市", value: "new_release" },
                    { title: "最新上传", value: "latest_upload" },
                    { title: "本日排行", value: "daily_rank" },
                    { title: "本周排行", value: "weekly_rank" },
                    { title: "本月排行", value: "monthly_rank" },
                    { title: "观看次数", value: "views" },
                    { title: "时长最长", value: "duration" },
                    { title: "他们在看", value: "watching" }
                ]
            },
            {
                name: "page",
                title: "页码",
                type: "page",
                description: "搜索结果页码",
                value: "1"
            }
        ]
    },
    modules: [
        {
            id: "browse",
            title: "分类浏览",
            description: "按影片类型和排序方式浏览 Hanime1",
            type: "video",
            requiresWebView: false,
            functionName: "loadVideos",
            cacheDuration: 900,
            params: [
                {
                    name: "genre",
                    title: "影片类型",
                    type: "enumeration",
                    description: "选择影片类型",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "里番", value: "hentai" },
                        { title: "泡面番", value: "short_anime" },
                        { title: "Motion Anime", value: "motion" },
                        { title: "3DCG", value: "3dcg" },
                        { title: "2.5D", value: "2_5d" },
                        { title: "2D 动画", value: "2d" },
                        { title: "AI 生成", value: "ai" },
                        { title: "MMD", value: "mmd" },
                        { title: "Cosplay", value: "cosplay" }
                    ]
                },
                {
                    name: "sort_by",
                    title: "排序",
                    type: "enumeration",
                    description: "排序方式",
                    value: "new_release",
                    enumOptions: [
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                {
                    name: "page",
                    title: "页码",
                    type: "page",
                    description: "列表页码",
                    value: "1"
                }
            ]
        },
        {
            id: "chinese_subtitles",
            title: "中文字幕",
            description: "浏览带中文字幕标签的影片",
            type: "video",
            requiresWebView: false,
            functionName: "loadChineseSubtitles",
            cacheDuration: 900,
            params: [
                {
                    name: "genre",
                    title: "影片类型",
                    type: "enumeration",
                    description: "选择影片类型",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "里番", value: "hentai" },
                        { title: "泡面番", value: "short_anime" },
                        { title: "Motion Anime", value: "motion" },
                        { title: "3DCG", value: "3dcg" },
                        { title: "2.5D", value: "2_5d" },
                        { title: "2D 动画", value: "2d" },
                        { title: "AI 生成", value: "ai" },
                        { title: "MMD", value: "mmd" },
                        { title: "Cosplay", value: "cosplay" }
                    ]
                },
                {
                    name: "sort_by",
                    title: "排序",
                    type: "enumeration",
                    description: "排序方式",
                    value: "new_release",
                    enumOptions: [
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" }
                    ]
                },
                {
                    name: "page",
                    title: "页码",
                    type: "page",
                    description: "列表页码",
                    value: "1"
                }
            ]
        },
        {
            id: "loadResource",
            title: "加载播放资源",
            description: "播放时获取可用清晰度",
            type: "stream",
            requiresWebView: false,
            functionName: "loadResource",
            cacheDuration: 0,
            params: []
        }
    ]
};

var BASE_URL = "https://hanime1.me";
var REQUEST_TIMEOUT = 15000;
var USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";

function getPageHeaders(referer) {
    return {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.7,en;q=0.6",
        "Referer": referer || BASE_URL + "/"
    };
}

function getPlaybackHeaders(referer) {
    return {
        "User-Agent": USER_AGENT,
        "Referer": referer || BASE_URL + "/"
    };
}

function isBlockedPage(html) {
    return /Just a moment|Attention Required|cf-error-details|Sorry, you have been blocked|Cloudflare Ray ID/i.test(html || "");
}

async function fetchHtml(url, referer) {
    var response = await Widget.http.get(url, {
        headers: getPageHeaders(referer),
        timeout: REQUEST_TIMEOUT,
        allow_redirects: true
    });
    var status = Number(response && (response.statusCode || response.status) || 200);
    var html = String(response && response.data || "");
    if (status >= 400) {
        throw new Error("Hanime1 请求失败：HTTP " + status);
    }
    if (!html || isBlockedPage(html)) {
        throw new Error("Hanime1 站点防护拒绝了请求，请稍后重试或更换网络");
    }
    return html;
}

function cleanText(value) {
    return String(value || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(value) {
    return String(value || "")
        .replace(/&amp;/g, "&")
        .replace(/&#x2F;/gi, "/")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, "\"");
}

function normalizeSiteUrl(value) {
    var url = decodeEntities(cleanText(value));
    if (!url || /^javascript:/i.test(url)) return "";
    if (url.indexOf("//") === 0) return "https:" + url;
    if (url.indexOf("/") === 0) return BASE_URL + url;
    if (!/^https?:\/\//i.test(url)) return BASE_URL + "/" + url;
    return url;
}

function normalizeWatchUrl(value) {
    var url = normalizeSiteUrl(value);
    if (!/^https?:\/\/(?:www\.)?hanime1\.me\/watch\?v=\d+/i.test(url)) return "";
    return url;
}

function normalizeImageUrl(value) {
    var raw = decodeEntities(cleanText(value));
    if (!raw) return "";
    if (raw.indexOf(",") >= 0) raw = raw.split(",")[0];
    raw = cleanText(raw).split(/\s+/)[0];
    return normalizeSiteUrl(raw);
}

function normalizeFilterUrl(value) {
    var url = normalizeSiteUrl(value);
    if (!/^https?:\/\/(?:www\.)?hanime1\.me\/(?:search|user\/)/i.test(url)) return "";
    return url;
}

function appendPage(url, page) {
    var pageNumber = Math.max(1, parseInt(page, 10) || 1);
    if (pageNumber <= 1) return url;
    var separator = url.indexOf("?") >= 0 ? "&" : "?";
    return url + separator + "page=" + pageNumber;
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
        watching: "他們在看"
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
        cosplay: "Cosplay"
    };
    return values[value] || "";
}

function buildSearchUrl(params, fixedTags) {
    params = params || {};
    var query = [];
    var keyword = cleanText(params.keyword);
    var genre = genreValue(params.genre);
    var sort = sortValue(params.sort_by);
    var page = Math.max(1, parseInt(params.page, 10) || 1);

    if (keyword) {
        query.push("query=" + encodeURIComponent(keyword));
        query.push("broad=on");
    }
    if (genre) query.push("genre=" + encodeURIComponent(genre));
    if (sort) query.push("sort=" + encodeURIComponent(sort));

    var tags = fixedTags || [];
    for (var i = 0; i < tags.length; i++) {
        if (tags[i]) query.push("tags%5B%5D=" + encodeURIComponent(tags[i]));
    }
    if (page > 1) query.push("page=" + page);
    return BASE_URL + "/search" + (query.length ? "?" + query.join("&") : "");
}

function findCardImage($, $card) {
    var preferred = $card.find("img.main-thumb").first();
    var src = preferred.attr("data-src") || preferred.attr("data-original") || preferred.attr("data-srcset") || preferred.attr("src");
    if (src) return normalizeImageUrl(src);

    var selected = "";
    $card.find("img").each(function (_, image) {
        if (selected) return;
        var $image = $(image);
        var candidate = $image.attr("data-src") || $image.attr("data-original") || $image.attr("data-srcset") || $image.attr("src") || "";
        if (!candidate || /background|avatar|logo/i.test(candidate)) return;
        selected = normalizeImageUrl(candidate);
    });
    return selected;
}

function cardToVideoItem($, element) {
    var $card = $(element);
    var href = $card.attr("href")
        || $card.find("a.video-link").first().attr("href")
        || $card.find("a.overlay").first().attr("href")
        || "";
    var link = normalizeWatchUrl(href);
    if (!link) return null;

    var title = cleanText(
        $card.find(".title").first().text()
        || $card.find(".card-mobile-title").first().text()
        || $card.find(".home-rows-videos-title").first().text()
        || $card.find("img").first().attr("alt")
    );
    if (!title) return null;

    var cover = findCardImage($, $card);
    var durationText = cleanText(
        $card.find(".duration").first().text()
        || $card.find(".card-mobile-duration").first().text()
    );
    var author = cleanText(
        $card.find(".subtitle a").first().text()
        || $card.find(".card-mobile-user").first().text()
        || $card.find(".home-rows-videos-user").first().text()
    );
    var statistics = [];
    $card.find(".stat-item").each(function (_, stat) {
        var text = cleanText($(stat).text()).replace(/^thumb_up\s*/i, "");
        if (text && statistics.indexOf(text) < 0) statistics.push(text);
    });
    var descriptionParts = [];
    if (author) descriptionParts.push("作者：" + author);
    if (statistics.length) descriptionParts.push(statistics.join(" · "));

    return {
        id: link,
        type: "url",
        title: title,
        coverUrl: cover || undefined,
        backdropPath: cover || undefined,
        mediaType: "movie",
        durationText: durationText || undefined,
        description: descriptionParts.join("\n") || undefined,
        link: link,
        playerType: "system"
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
    addCandidates("a[href*='/watch?v=']");
    return items;
}

async function loadJumpedListing(params) {
    params = params || {};
    var target = normalizeFilterUrl(params.genreId || params.peopleId || "");
    if (!target) return null;
    target = appendPage(target, params.page);
    var html = await fetchHtml(target, BASE_URL + "/");
    return parseVideoList(html);
}

async function searchVideos(params) {
    var jumped = await loadJumpedListing(params);
    if (jumped) return jumped;
    var url = buildSearchUrl(params || {}, []);
    var html = await fetchHtml(url, BASE_URL + "/");
    return parseVideoList(html);
}

async function loadVideos(params) {
    var jumped = await loadJumpedListing(params);
    if (jumped) return jumped;
    var url = buildSearchUrl(params || {}, []);
    var html = await fetchHtml(url, BASE_URL + "/");
    return parseVideoList(html);
}

async function loadChineseSubtitles(params) {
    var jumped = await loadJumpedListing(params);
    if (jumped) return jumped;
    var url = buildSearchUrl(params || {}, ["中文字幕"]);
    var html = await fetchHtml(url, BASE_URL + "/");
    return parseVideoList(html);
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
            // Ignore malformed metadata and continue with DOM fallbacks.
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
        var normalized = decodeEntities(cleanText(url));
        if (!/^https?:\/\//i.test(normalized) || seen[normalized]) return;
        seen[normalized] = true;
        var cleanLabel = cleanText(label);
        var qualityMatch = cleanLabel.match(/(\d{3,4})/);
        sources.push({
            url: normalized,
            label: qualityMatch ? qualityMatch[1] + "p" : (cleanLabel || "默认清晰度"),
            type: cleanText(type)
        });
    }

    $("video#player source[src], video source[src]").each(function (_, element) {
        var $source = $(element);
        addSource(
            $source.attr("src"),
            $source.attr("size") || $source.attr("label") || $source.attr("res") || $source.attr("data-quality"),
            $source.attr("type")
        );
    });
    $("video#player[src], video[src]").each(function (_, element) {
        var $video = $(element);
        addSource($video.attr("src"), $video.attr("data-quality") || "默认清晰度", $video.attr("type"));
    });

    var sourceAssignment = String(html || "").match(/source\s*=\s*['\"](https?:\/\/[^'\"]+)['\"]/i);
    if (sourceAssignment) addSource(sourceAssignment[1], "默认清晰度", "video/mp4");

    var mediaMatches = String(html || "").match(/https?:\/\/[^\"'\s<>]+\.(?:mp4|m3u8)(?:\?[^\"'\s<>]*)?/gi) || [];
    for (var i = 0; i < mediaMatches.length && i < 20; i++) {
        addSource(mediaMatches[i], "默认清晰度", /\.m3u8(?:\?|$)/i.test(mediaMatches[i]) ? "application/x-mpegURL" : "video/mp4");
    }

    sources.sort(function (a, b) {
        return sourceQuality(b) - sourceQuality(a);
    });
    return sources;
}

function detailGenreItems($) {
    var items = [];
    var seen = {};
    $(".single-video-tag a[href], a[href*='tags%5B%5D=']").each(function (_, element) {
        if (items.length >= 40) return;
        var $link = $(element);
        var title = cleanText($link.text()).replace(/\s*\(\d+\)\s*$/, "");
        var id = normalizeFilterUrl($link.attr("href"));
        if (!title || !id || seen[id]) return;
        seen[id] = true;
        items.push({ id: id, title: title });
    });
    return items;
}

function detailPeople($) {
    var people = [];
    var seen = {};
    $(".video-details-wrapper a[href*='/user/'], #video-artist-name[href*='/user/']").each(function (_, element) {
        if (people.length >= 12) return;
        var $link = $(element);
        var id = normalizeFilterUrl($link.attr("href"));
        var image = $link.find("img").first();
        var title = cleanText(image.attr("alt") || $link.text());
        if (!id || !title || seen[id]) return;
        seen[id] = true;
        people.push({
            id: id,
            title: title,
            avatar: normalizeImageUrl(image.attr("data-src") || image.attr("src")) || undefined,
            role: "作者"
        });
    });
    return people;
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
        $("#shareBtn-title").first().text()
        || jsonLd.name
        || $("meta[property='og:title']").attr("content")
        || $("meta[name='twitter:title']").attr("content")
        || $("h1, h3.title").first().text()
        || $("title").text()
    );
    var description = cleanText(
        $(".video-caption-text").first().text()
        || jsonLd.description
        || $("meta[property='og:description']").attr("content")
        || $("meta[name='description']").attr("content")
    );
    var cover = normalizeImageUrl(
        jsonLd.thumbnailUrl
        || $("meta[property='og:image']").attr("content")
        || $("meta[name='twitter:image']").attr("content")
        || $("video#player").attr("poster")
    );
    var sources = extractVideoSources($, html);
    var releaseDate = cleanText(jsonLd.uploadDate || jsonLd.datePublished);
    if (!releaseDate) {
        var dateMatch = cleanText($(".video-details-wrapper").text()).match(/\d{4}-\d{2}-\d{2}/);
        if (dateMatch) releaseDate = dateMatch[0];
    }

    var relatedItems = parseVideoList(html).filter(function (item) {
        return item.link !== link;
    }).slice(0, 12);
    var genreItems = detailGenreItems($);
    var peoples = detailPeople($);

    return {
        id: link,
        type: "url",
        title: title || "Hanime1 视频",
        description: description || undefined,
        coverUrl: cover || undefined,
        backdropPath: cover || undefined,
        mediaType: "movie",
        releaseDate: releaseDate || undefined,
        videoUrl: sources.length ? sources[0].url : undefined,
        genreItems: genreItems.length ? genreItems : undefined,
        peoples: peoples.length ? peoples : undefined,
        relatedItems: relatedItems.length ? relatedItems : undefined,
        link: link,
        playerType: "system",
        customHeaders: sources.length ? getPlaybackHeaders(link) : undefined
    };
}

async function loadDetail(link) {
    var normalizedLink = normalizeWatchUrl(link);
    if (!normalizedLink) throw new Error("无效的 Hanime1 详情链接");
    var html = await fetchHtml(normalizedLink, BASE_URL + "/");
    return parseDetail(normalizedLink, html);
}

async function loadResource(params) {
    params = params || {};
    var link = normalizeWatchUrl(params.link || params.id || "");
    var directUrl = cleanText(params.videoUrl);

    if (!link && /^https?:\/\//i.test(directUrl)) {
        return [{
            name: "默认清晰度",
            description: "站点直链",
            url: directUrl,
            customHeaders: getPlaybackHeaders(BASE_URL + "/"),
            playerType: "system"
        }];
    }
    if (!link) throw new Error("缺少 Hanime1 播放页链接");

    var html = await fetchHtml(link, BASE_URL + "/");
    var $ = Widget.html.load(html);
    var sources = extractVideoSources($, html);
    if (!sources.length) throw new Error("未找到可播放资源，页面结构可能已更新");

    return sources.map(function (source) {
        return {
            name: source.label,
            description: source.type || (/\.m3u8(?:\?|$)/i.test(source.url) ? "HLS" : "MP4"),
            url: source.url,
            customHeaders: getPlaybackHeaders(link),
            playerType: "system"
        };
    });
}
