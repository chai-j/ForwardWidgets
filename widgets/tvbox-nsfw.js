var WidgetMetadata = {
  id: "chai.tvbox-nsfw",
  title: "TVBox 福利源",
  version: "2.4.0",
  requiredVersion: "0.0.6",
  description: "内置福利 TVBox 采集站，为每个内置源写入真实分类目录，并支持精简聚合发现与自定义聚合关键词。不含 TMDB 自动播源入口。",
  author: "chai-j",
  detailCacheDuration: 120,
  globalParams: [
    {
      name: "preset",
      title: "内置配置",
      type: "enumeration",
      value: "all",
      description: "默认使用全部内置福利地址。选「全部聚合」或搜索时生效。",
      enumOptions: [
        { title: "全部福利配置", value: "all" },
        { title: "只用追加地址", value: "none" },
        { title: "福利影视资源", value: "fuli" },
        { title: "Cluntop 福利站", value: "fun" },
        { title: "lubin776 福利站", value: "lubin18" },
        { title: "大树 18+ 福利站", value: "dashu18" },
        { title: "TvBox JAV 福利站", value: "jav" },
        { title: "dlgt7 福利站", value: "dlgt7" },
        { title: "gxnas 9kg 福利站", value: "gxnas" },
        { title: "ewctt 福利站", value: "ewctt" }
      ]
    },
    {
      name: "configUrls",
      title: "追加配置地址",
      type: "input",
      description: "额外的 TVBox 福利 JSON 地址，逗号、空格或换行分隔。会和上面选中的配置一起用。",
      placeholders: [{ title: "https://example.com/tvbox-nsfw.json", value: "" }]
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
      "id": "discover",
      "title": "🌟 聚合发现",
      "subtitle": "跨源按大类浏览，可在右上角切换源、分类与更新时段",
      "functionName": "loadDiscover",
      "cacheDuration": 120,
      "params": [
        {
          "name": "site",
          "title": "源",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部聚合",
              "value": ""
            },
            {
              "title": "🕵️ 黑料资源",
              "value": "heiliao"
            },
            {
              "title": "🎞️ 麻豆视频",
              "value": "91md"
            },
            {
              "title": "🚀 精东影业",
              "value": "chujia"
            },
            {
              "title": "🥛 奶香香",
              "value": "naixxzy"
            },
            {
              "title": "🏆 奥斯卡资源",
              "value": "aosikazy"
            },
            {
              "title": "🍑 杏吧资源",
              "value": "xgbbk8"
            },
            {
              "title": "🔞 搜AV资源",
              "value": "souav"
            },
            {
              "title": "💎 精品资源",
              "value": "jingpin"
            },
            {
              "title": "🍒 大奶子资源",
              "value": "danaizi"
            },
            {
              "title": "🦈 鲨鱼资源",
              "value": "shayu"
            },
            {
              "title": "🌶️ 辣椒资源",
              "value": "lajiao"
            },
            {
              "title": "🐔 鸡坤资源",
              "value": "jkun"
            },
            {
              "title": "🐆 乐播资源",
              "value": "lebo"
            },
            {
              "title": "💧 滴滴资源",
              "value": "didi"
            },
            {
              "title": "⚡ 155资源",
              "value": "155"
            },
            {
              "title": "🐇 玉兔资源",
              "value": "yutu"
            },
            {
              "title": "🌲 森林资源",
              "value": "senlin"
            },
            {
              "title": "🔥 火速资源",
              "value": "huosu"
            },
            {
              "title": "😈 嘿嘿资源",
              "value": "heihei"
            },
            {
              "title": "🎬 CK资源",
              "value": "ck"
            },
            {
              "title": "🫘 豆豆资源",
              "value": "doudou"
            },
            {
              "title": "🐥 小鸡资源",
              "value": "xiaoji"
            },
            {
              "title": "🍅 番茄资源",
              "value": "fanqie"
            },
            {
              "title": "📦 黄色仓库",
              "value": "hsck"
            },
            {
              "title": "💋 老色逼资源",
              "value": "lsb"
            },
            {
              "title": "📀 番号资源",
              "value": "fanhao"
            }
          ]
        },
        {
          "name": "genre",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "🕵️ 国产探花",
              "value": "tanhua"
            },
            {
              "title": "🍉 黑料资源",
              "value": "heiliao"
            },
            {
              "title": "🎬 麻豆传媒",
              "value": "media"
            },
            {
              "title": "🤖 AI短剧",
              "value": "ai_short"
            },
            {
              "title": "🔓 日本无码",
              "value": "uncensored"
            },
            {
              "title": "🇯🇵 日本有码",
              "value": "censored"
            },
            {
              "title": "🎨 动漫里番",
              "value": "anime"
            },
            {
              "title": "🎀 Cosplay",
              "value": "cosplay"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "customDiscover",
      "title": "✨ 自定义聚合",
      "subtitle": "在模板或设置中填写任意分类/关键词，生成专属跨源聚合行",
      "functionName": "loadCustomDiscover",
      "cacheDuration": 120,
      "params": [
        {
          "name": "keywords",
          "title": "分类 / 关键词",
          "type": "input",
          "description": "多个词用逗号或空格分隔（如：人妻,熟女 或 黑丝），会优先匹配源分类，也可用于搜索。",
          "placeholders": [
            {
              "title": "例：人妻,熟女",
              "value": ""
            }
          ]
        },
        {
          "name": "matchMode",
          "title": "匹配方式",
          "type": "enumeration",
          "value": "auto",
          "enumOptions": [
            {
              "title": "自动（先匹配分类，无则搜片名）",
              "value": "auto"
            },
            {
              "title": "仅匹配源分类名称",
              "value": "classOnly"
            },
            {
              "title": "仅按片名跨源搜索",
              "value": "searchOnly"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "heiliao",
      "title": "🕵️ 黑料资源",
      "subtitle": "黑料资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_heiliao",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "中文字幕",
              "value": "1"
            },
            {
              "title": "日本有码",
              "value": "2"
            },
            {
              "title": "日本无码",
              "value": "3"
            },
            {
              "title": "AV解说",
              "value": "4"
            },
            {
              "title": "cosplay",
              "value": "5"
            },
            {
              "title": "都市激情",
              "value": "20"
            },
            {
              "title": "校园情事",
              "value": "21"
            },
            {
              "title": "人妻纵情",
              "value": "22"
            },
            {
              "title": "风俗伦理",
              "value": "23"
            },
            {
              "title": "另类小说",
              "value": "24"
            },
            {
              "title": "武侠古典",
              "value": "25"
            },
            {
              "title": "长篇连载",
              "value": "26"
            },
            {
              "title": "黑丝诱惑",
              "value": "27"
            },
            {
              "title": "SWAG",
              "value": "28"
            },
            {
              "title": "自拍偷拍",
              "value": "29"
            },
            {
              "title": "激情动漫",
              "value": "30"
            },
            {
              "title": "网红主播",
              "value": "31"
            },
            {
              "title": "探花系列",
              "value": "32"
            },
            {
              "title": "三级伦理",
              "value": "33"
            },
            {
              "title": "VR视角",
              "value": "34"
            },
            {
              "title": "国产传媒",
              "value": "35"
            },
            {
              "title": "素人搭讪",
              "value": "36"
            },
            {
              "title": "门事件",
              "value": "37"
            },
            {
              "title": "抖阴视频",
              "value": "38"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "91md",
      "title": "🎞️ 麻豆视频",
      "subtitle": "麻豆视频 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_91md",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "麻豆视频",
              "value": "1"
            },
            {
              "title": "91制片厂",
              "value": "2"
            },
            {
              "title": "天美传媒",
              "value": "3"
            },
            {
              "title": "蜜桃传媒",
              "value": "4"
            },
            {
              "title": "皇家华人",
              "value": "5"
            },
            {
              "title": "星空传媒",
              "value": "6"
            },
            {
              "title": "精东影业",
              "value": "7"
            },
            {
              "title": "海角社区",
              "value": "8"
            },
            {
              "title": "成人头条",
              "value": "9"
            },
            {
              "title": "乌鸦传媒",
              "value": "10"
            },
            {
              "title": "兔子先生",
              "value": "20"
            },
            {
              "title": "杏吧原创",
              "value": "21"
            },
            {
              "title": "玩偶姐姐",
              "value": "22"
            },
            {
              "title": "mini传媒",
              "value": "23"
            },
            {
              "title": "大象传媒",
              "value": "24"
            },
            {
              "title": "91视频",
              "value": "25"
            },
            {
              "title": "PsychoPorn",
              "value": "26"
            },
            {
              "title": "糖心Vlog",
              "value": "27"
            },
            {
              "title": "萝莉社",
              "value": "29"
            },
            {
              "title": "性视界",
              "value": "30"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "chujia",
      "title": "🚀 精东影业",
      "subtitle": "精东影业 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_chujia",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "麻豆视频",
              "value": "1"
            },
            {
              "title": "中文字幕",
              "value": "2"
            },
            {
              "title": "日本无码",
              "value": "3"
            },
            {
              "title": "日本有码",
              "value": "4"
            },
            {
              "title": "童颜巨乳",
              "value": "5"
            },
            {
              "title": "校园萝莉",
              "value": "6"
            },
            {
              "title": "女优明星",
              "value": "7"
            },
            {
              "title": "制服诱惑",
              "value": "9"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "naixxzy",
      "title": "🥛 奶香香",
      "subtitle": "奶香香 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_naixxzy",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "精品国产",
              "value": "1"
            },
            {
              "title": "精品日韩",
              "value": "2"
            },
            {
              "title": "精品综合",
              "value": "3"
            },
            {
              "title": "精品小说",
              "value": "4"
            },
            {
              "title": "精品美图",
              "value": "5"
            },
            {
              "title": "国产自拍",
              "value": "20"
            },
            {
              "title": "主播诱惑",
              "value": "21"
            },
            {
              "title": "探花约炮",
              "value": "22"
            },
            {
              "title": "偷拍偷窥",
              "value": "23"
            },
            {
              "title": "网曝吃瓜",
              "value": "24"
            },
            {
              "title": "抖阴短片",
              "value": "25"
            },
            {
              "title": "传媒剧情",
              "value": "26"
            },
            {
              "title": "日韩主播",
              "value": "27"
            },
            {
              "title": "日韩无码",
              "value": "28"
            },
            {
              "title": "中文字幕",
              "value": "29"
            },
            {
              "title": "AV解说",
              "value": "30"
            },
            {
              "title": "换脸明星",
              "value": "31"
            },
            {
              "title": "强奸乱伦",
              "value": "32"
            },
            {
              "title": "女优明星",
              "value": "33"
            },
            {
              "title": "欧美激情",
              "value": "34"
            },
            {
              "title": "重口激情",
              "value": "35"
            },
            {
              "title": "三级伦理",
              "value": "36"
            },
            {
              "title": "剧情动漫",
              "value": "37"
            },
            {
              "title": "SM调教",
              "value": "38"
            },
            {
              "title": "女同性恋",
              "value": "39"
            },
            {
              "title": "VR视角",
              "value": "40"
            },
            {
              "title": "都市言情",
              "value": "41"
            },
            {
              "title": "暴力侵犯",
              "value": "42"
            },
            {
              "title": "家庭伦伦",
              "value": "43"
            },
            {
              "title": "性感身体",
              "value": "44"
            },
            {
              "title": "角色扮演",
              "value": "45"
            },
            {
              "title": "福利姬",
              "value": "46"
            },
            {
              "title": "漫画连载",
              "value": "47"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "aosikazy",
      "title": "🏆 奥斯卡资源",
      "subtitle": "奥斯卡资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_aosikazy",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "xgbbk8",
      "title": "🍑 杏吧资源",
      "subtitle": "杏吧资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_xgbbk8",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "视频一区",
              "value": "1"
            },
            {
              "title": "日韩无码",
              "value": "54"
            },
            {
              "title": "国产主播",
              "value": "55"
            },
            {
              "title": "视频三区",
              "value": "56"
            },
            {
              "title": "日韩精品",
              "value": "57"
            },
            {
              "title": "欧美劲爆",
              "value": "58"
            },
            {
              "title": "成人动漫",
              "value": "59"
            },
            {
              "title": "自拍偷拍",
              "value": "60"
            },
            {
              "title": "伦理影片",
              "value": "61"
            },
            {
              "title": "中文字幕",
              "value": "62"
            },
            {
              "title": "人妻系列",
              "value": "63"
            },
            {
              "title": "制服诱惑",
              "value": "64"
            },
            {
              "title": "强奸乱伦",
              "value": "65"
            },
            {
              "title": "AV明星",
              "value": "66"
            },
            {
              "title": "SM重味",
              "value": "68"
            },
            {
              "title": "视频二区",
              "value": "69"
            },
            {
              "title": "巨乳尤物",
              "value": "70"
            },
            {
              "title": "颜射系列",
              "value": "71"
            },
            {
              "title": "口交视频",
              "value": "72"
            },
            {
              "title": "自慰系列",
              "value": "73"
            },
            {
              "title": "教师学生",
              "value": "74"
            },
            {
              "title": "群P换妻",
              "value": "75"
            },
            {
              "title": "AI换脸",
              "value": "76"
            },
            {
              "title": "AV解说",
              "value": "78"
            },
            {
              "title": "视频四区",
              "value": "79"
            },
            {
              "title": "吃瓜黑料",
              "value": "80"
            },
            {
              "title": "酒店探花",
              "value": "81"
            },
            {
              "title": "直播裸聊",
              "value": "82"
            },
            {
              "title": "反差母狗",
              "value": "83"
            },
            {
              "title": "颜值正义",
              "value": "84"
            },
            {
              "title": "熟女少妇",
              "value": "85"
            },
            {
              "title": "人兽乱交",
              "value": "86"
            },
            {
              "title": "国产传媒",
              "value": "89"
            },
            {
              "title": "视频五区",
              "value": "90"
            },
            {
              "title": "野战车震",
              "value": "91"
            },
            {
              "title": "SM调教",
              "value": "92"
            },
            {
              "title": "家庭乱伦",
              "value": "93"
            },
            {
              "title": "百合女同",
              "value": "94"
            },
            {
              "title": "学生空姐",
              "value": "95"
            },
            {
              "title": "撸管必看",
              "value": "96"
            },
            {
              "title": "偷情少妇",
              "value": "97"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "souav",
      "title": "🔞 搜AV资源",
      "subtitle": "搜AV资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_souav",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "中文传媒",
              "value": "20"
            },
            {
              "title": "国产",
              "value": "21"
            },
            {
              "title": "欧美AV",
              "value": "22"
            },
            {
              "title": "日本AV",
              "value": "23"
            },
            {
              "title": "传媒-麻豆传媒",
              "value": "24"
            },
            {
              "title": "传媒-精东影业",
              "value": "25"
            },
            {
              "title": "传媒-蜜桃传媒",
              "value": "26"
            },
            {
              "title": "传媒-果冻传媒",
              "value": "27"
            },
            {
              "title": "传媒-星空无限传媒",
              "value": "28"
            },
            {
              "title": "传媒-SA国际传媒",
              "value": "29"
            },
            {
              "title": "传媒-性视界传媒",
              "value": "30"
            },
            {
              "title": "国产-自拍",
              "value": "31"
            },
            {
              "title": "国产-偷拍",
              "value": "32"
            },
            {
              "title": "国产-探花",
              "value": "33"
            },
            {
              "title": "国产-主播",
              "value": "34"
            },
            {
              "title": "传媒-天美传媒",
              "value": "35"
            },
            {
              "title": "欧美-高清无码",
              "value": "36"
            },
            {
              "title": "欧美-高清有码",
              "value": "37"
            },
            {
              "title": "日本-中文字幕",
              "value": "38"
            },
            {
              "title": "日本-无码流出",
              "value": "39"
            },
            {
              "title": "日本-高清有码",
              "value": "40"
            },
            {
              "title": "传媒-皇家华人",
              "value": "41"
            },
            {
              "title": "欧美-中文字幕",
              "value": "42"
            },
            {
              "title": "明星网黄",
              "value": "43"
            },
            {
              "title": "刘玥",
              "value": "44"
            },
            {
              "title": "玩偶姐姐",
              "value": "45"
            },
            {
              "title": "动漫",
              "value": "46"
            },
            {
              "title": "台湾粉红兔",
              "value": "47"
            },
            {
              "title": "吃瓜黑料",
              "value": "48"
            },
            {
              "title": "变态暗网",
              "value": "49"
            },
            {
              "title": "小众口味",
              "value": "50"
            },
            {
              "title": "男同",
              "value": "51"
            },
            {
              "title": "小众女同",
              "value": "52"
            },
            {
              "title": "TS人妖",
              "value": "53"
            },
            {
              "title": "传媒-扣扣传媒",
              "value": "54"
            },
            {
              "title": "恐怖色情",
              "value": "55"
            },
            {
              "title": "人兽杂交",
              "value": "56"
            },
            {
              "title": "迷奸强奸",
              "value": "57"
            },
            {
              "title": "重口味",
              "value": "58"
            },
            {
              "title": "传媒-91传媒",
              "value": "59"
            },
            {
              "title": "传媒-杏吧传媒",
              "value": "60"
            },
            {
              "title": "传媒-起点传媒",
              "value": "61"
            },
            {
              "title": "传媒-CCAV成人头条",
              "value": "62"
            },
            {
              "title": "传媒-渡边传媒",
              "value": "63"
            },
            {
              "title": "传媒-辣椒原创",
              "value": "64"
            },
            {
              "title": "传媒-红斯灯影像",
              "value": "65"
            },
            {
              "title": "传媒-情欲国潮",
              "value": "66"
            },
            {
              "title": "传媒-糖心传媒",
              "value": "67"
            },
            {
              "title": "传媒-乐播传媒",
              "value": "68"
            },
            {
              "title": "传媒-葫芦影业",
              "value": "69"
            },
            {
              "title": "传媒-其他传媒",
              "value": "70"
            },
            {
              "title": "伦理道德",
              "value": "71"
            },
            {
              "title": "热门大瓜",
              "value": "72"
            },
            {
              "title": "学生校园",
              "value": "73"
            },
            {
              "title": "领导官员",
              "value": "74"
            },
            {
              "title": "裸贷黑料",
              "value": "75"
            },
            {
              "title": "白虎萌妹",
              "value": "76"
            },
            {
              "title": "国产-节目企划",
              "value": "77"
            },
            {
              "title": "动漫-黄漫",
              "value": "78"
            },
            {
              "title": "动漫-里番中字",
              "value": "79"
            },
            {
              "title": "AV解说",
              "value": "80"
            },
            {
              "title": "水果派",
              "value": "81"
            },
            {
              "title": "短视频",
              "value": "82"
            },
            {
              "title": "SM虐待",
              "value": "83"
            },
            {
              "title": "NTR 绿帽",
              "value": "84"
            },
            {
              "title": "国产-网红",
              "value": "85"
            },
            {
              "title": "国产-户外",
              "value": "86"
            },
            {
              "title": "国产-吃瓜",
              "value": "87"
            },
            {
              "title": "AI换脸",
              "value": "88"
            },
            {
              "title": "日本-东京热",
              "value": "89"
            },
            {
              "title": "日本-一本道",
              "value": "90"
            },
            {
              "title": "国产-台湾JVID",
              "value": "91"
            },
            {
              "title": "韩国AV",
              "value": "92"
            },
            {
              "title": "韩国-主播",
              "value": "93"
            },
            {
              "title": "吃瓜资讯",
              "value": "94"
            },
            {
              "title": "必看大瓜",
              "value": "95"
            },
            {
              "title": "网红黑料",
              "value": "96"
            },
            {
              "title": "海外吃瓜",
              "value": "97"
            },
            {
              "title": "偷拍自拍",
              "value": "98"
            },
            {
              "title": "道德伦理",
              "value": "99"
            },
            {
              "title": "吃瓜新闻",
              "value": "100"
            },
            {
              "title": "直播大秀",
              "value": "101"
            },
            {
              "title": "日本-素人",
              "value": "102"
            },
            {
              "title": "饼干姐姐",
              "value": "103"
            },
            {
              "title": "台北娜娜",
              "value": "104"
            },
            {
              "title": "柚子猫",
              "value": "105"
            },
            {
              "title": "桥本香菜",
              "value": "106"
            },
            {
              "title": "小欣奈",
              "value": "107"
            },
            {
              "title": "御梦子",
              "value": "108"
            },
            {
              "title": "捅主任",
              "value": "109"
            },
            {
              "title": "水冰月",
              "value": "110"
            },
            {
              "title": "黑椒盖饭",
              "value": "111"
            },
            {
              "title": "冉冉学姐",
              "value": "112"
            },
            {
              "title": "粉色情人",
              "value": "113"
            },
            {
              "title": "鸡教练",
              "value": "114"
            },
            {
              "title": "唐伯虎",
              "value": "115"
            },
            {
              "title": "地雷系",
              "value": "116"
            },
            {
              "title": "白菜妹妹",
              "value": "117"
            },
            {
              "title": "小二先生",
              "value": "118"
            },
            {
              "title": "AI制作",
              "value": "119"
            },
            {
              "title": "AI漫剧",
              "value": "120"
            },
            {
              "title": "AI短剧",
              "value": "122"
            },
            {
              "title": "AI魔改",
              "value": "123"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "jingpin",
      "title": "💎 精品资源",
      "subtitle": "精品资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_jingpin",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "国产",
              "value": "1"
            },
            {
              "title": "日本",
              "value": "2"
            },
            {
              "title": "欧美",
              "value": "3"
            },
            {
              "title": "动漫",
              "value": "4"
            },
            {
              "title": "偷拍自拍",
              "value": "8"
            },
            {
              "title": "国产大制作",
              "value": "9"
            },
            {
              "title": "乱伦毁三观",
              "value": "10"
            },
            {
              "title": "嫖妓全过程",
              "value": "11"
            },
            {
              "title": "淫乱学生妹",
              "value": "12"
            },
            {
              "title": "黑料不打烊",
              "value": "13"
            },
            {
              "title": "监控摄像头",
              "value": "14"
            },
            {
              "title": "主播网红",
              "value": "15"
            },
            {
              "title": "高清无码",
              "value": "20"
            },
            {
              "title": "中文字幕",
              "value": "21"
            },
            {
              "title": "成人综艺",
              "value": "22"
            },
            {
              "title": "媚黑母狗",
              "value": "23"
            },
            {
              "title": "为国争光",
              "value": "24"
            },
            {
              "title": "少女破处",
              "value": "25"
            },
            {
              "title": "人兽典藏",
              "value": "26"
            },
            {
              "title": "中文剧情",
              "value": "27"
            },
            {
              "title": "燃烧荷尔蒙",
              "value": "28"
            },
            {
              "title": "女同口交",
              "value": "29"
            },
            {
              "title": "重口味",
              "value": "30"
            },
            {
              "title": "3D动漫",
              "value": "31"
            },
            {
              "title": "剧情故事",
              "value": "32"
            },
            {
              "title": "同人动漫",
              "value": "33"
            },
            {
              "title": "激情中字",
              "value": "35"
            },
            {
              "title": "东南亚",
              "value": "41"
            },
            {
              "title": "AI短剧",
              "value": "42"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "danaizi",
      "title": "🍒 大奶子资源",
      "subtitle": "大奶子资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_danaizi",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "视频一区",
              "value": "1"
            },
            {
              "title": "视频二区",
              "value": "2"
            },
            {
              "title": "视频三区",
              "value": "3"
            },
            {
              "title": "视频四区",
              "value": "4"
            },
            {
              "title": "精品推荐",
              "value": "20"
            },
            {
              "title": "国产主播",
              "value": "21"
            },
            {
              "title": "国产乱伦",
              "value": "22"
            },
            {
              "title": "自拍偷拍",
              "value": "23"
            },
            {
              "title": "制服丝袜",
              "value": "24"
            },
            {
              "title": "网曝事件",
              "value": "25"
            },
            {
              "title": "传媒探花",
              "value": "26"
            },
            {
              "title": "清纯学生",
              "value": "27"
            },
            {
              "title": "A V 解说",
              "value": "28"
            },
            {
              "title": "淫妻作乐",
              "value": "29"
            },
            {
              "title": "港台辣妹",
              "value": "30"
            },
            {
              "title": "足浴撩妹",
              "value": "31"
            },
            {
              "title": "反差母狗",
              "value": "32"
            },
            {
              "title": "A I 换脸",
              "value": "33"
            },
            {
              "title": "V R 视角",
              "value": "34"
            },
            {
              "title": "重口性癖",
              "value": "35"
            },
            {
              "title": "制服诱惑",
              "value": "36"
            },
            {
              "title": "丝袜美腿",
              "value": "37"
            },
            {
              "title": "中文字幕",
              "value": "38"
            },
            {
              "title": "无码流出",
              "value": "39"
            },
            {
              "title": "多人群交",
              "value": "40"
            },
            {
              "title": "凌辱快感",
              "value": "41"
            },
            {
              "title": "角色剧情",
              "value": "42"
            },
            {
              "title": "强奸乱伦",
              "value": "43"
            },
            {
              "title": "韩国三级",
              "value": "44"
            },
            {
              "title": "欧美激情",
              "value": "45"
            },
            {
              "title": "人妻熟女",
              "value": "46"
            },
            {
              "title": "主奴调教",
              "value": "47"
            },
            {
              "title": "动漫卡通",
              "value": "48"
            },
            {
              "title": "变性伪娘",
              "value": "49"
            },
            {
              "title": "女同性恋",
              "value": "50"
            },
            {
              "title": "野外露出",
              "value": "51"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "shayu",
      "title": "🦈 鲨鱼资源",
      "subtitle": "鲨鱼资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_shayu",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "国产情色",
              "value": "1"
            },
            {
              "title": "日本无码",
              "value": "2"
            },
            {
              "title": "AV明星",
              "value": "3"
            },
            {
              "title": "中文字幕",
              "value": "20"
            },
            {
              "title": "网红主播",
              "value": "21"
            },
            {
              "title": "成人动漫",
              "value": "22"
            },
            {
              "title": "欧美情色",
              "value": "23"
            },
            {
              "title": "国模私拍",
              "value": "24"
            },
            {
              "title": "长腿丝袜",
              "value": "25"
            },
            {
              "title": "邻家人妻",
              "value": "26"
            },
            {
              "title": "韩国伦理",
              "value": "27"
            },
            {
              "title": "香港伦理",
              "value": "28"
            },
            {
              "title": "精品推荐",
              "value": "31"
            },
            {
              "title": "原纱央莉",
              "value": "32"
            },
            {
              "title": "柚木TINA",
              "value": "33"
            },
            {
              "title": "大桥未久",
              "value": "34"
            },
            {
              "title": "AV明星1",
              "value": "35"
            },
            {
              "title": "仁科百华",
              "value": "36"
            },
            {
              "title": "天海翼",
              "value": "37"
            },
            {
              "title": "小川阿佐美",
              "value": "38"
            },
            {
              "title": "三上悠亚",
              "value": "39"
            },
            {
              "title": "长泽梓",
              "value": "40"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "lajiao",
      "title": "🌶️ 辣椒资源",
      "subtitle": "辣椒资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_lajiao",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "国产自拍",
              "value": "1"
            },
            {
              "title": "欧美极品",
              "value": "2"
            },
            {
              "title": "日韩无码",
              "value": "3"
            },
            {
              "title": "AV明星",
              "value": "4"
            },
            {
              "title": "中文字幕",
              "value": "20"
            },
            {
              "title": "动漫精品",
              "value": "21"
            },
            {
              "title": "极骚萝莉",
              "value": "22"
            },
            {
              "title": "人妖视频",
              "value": "23"
            },
            {
              "title": "重咸口味",
              "value": "24"
            },
            {
              "title": "三级自慰",
              "value": "25"
            },
            {
              "title": "强奸乱伦",
              "value": "26"
            },
            {
              "title": "独家擂台格斗",
              "value": "27"
            },
            {
              "title": "辣椒GIGA",
              "value": "28"
            },
            {
              "title": "HEYZO",
              "value": "31"
            },
            {
              "title": "独家DMM",
              "value": "32"
            },
            {
              "title": "HEY诱惑",
              "value": "33"
            },
            {
              "title": "童颜巨乳",
              "value": "34"
            },
            {
              "title": "高潮喷吹",
              "value": "35"
            },
            {
              "title": "激情口交",
              "value": "36"
            },
            {
              "title": "绝美少女",
              "value": "37"
            },
            {
              "title": "首次亮相",
              "value": "38"
            },
            {
              "title": "柚木TINA",
              "value": "39"
            },
            {
              "title": "原纱央莉",
              "value": "40"
            },
            {
              "title": "大桥未久",
              "value": "41"
            },
            {
              "title": "AV明星1",
              "value": "42"
            },
            {
              "title": "仁科百华",
              "value": "43"
            },
            {
              "title": "天海翼",
              "value": "44"
            },
            {
              "title": "小川阿佐美",
              "value": "45"
            },
            {
              "title": "三上悠亚",
              "value": "46"
            },
            {
              "title": "长泽梓",
              "value": "47"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "jkun",
      "title": "🐔 鸡坤资源",
      "subtitle": "鸡坤资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_jkun",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "中文字幕",
              "value": "1"
            },
            {
              "title": "日本有码",
              "value": "2"
            },
            {
              "title": "日本无码",
              "value": "3"
            },
            {
              "title": "AV解说",
              "value": "4"
            },
            {
              "title": "cosplay",
              "value": "5"
            },
            {
              "title": "都市激情",
              "value": "20"
            },
            {
              "title": "校园情事",
              "value": "21"
            },
            {
              "title": "人妻纵情",
              "value": "22"
            },
            {
              "title": "风俗伦理",
              "value": "23"
            },
            {
              "title": "另类小说",
              "value": "24"
            },
            {
              "title": "武侠古典",
              "value": "25"
            },
            {
              "title": "长篇连载",
              "value": "26"
            },
            {
              "title": "黑丝诱惑",
              "value": "27"
            },
            {
              "title": "SWAG",
              "value": "28"
            },
            {
              "title": "自拍偷拍",
              "value": "29"
            },
            {
              "title": "激情动漫",
              "value": "30"
            },
            {
              "title": "网红主播",
              "value": "31"
            },
            {
              "title": "探花系列",
              "value": "32"
            },
            {
              "title": "三级伦理",
              "value": "33"
            },
            {
              "title": "VR视角",
              "value": "34"
            },
            {
              "title": "国产传媒",
              "value": "35"
            },
            {
              "title": "素人搭讪",
              "value": "36"
            },
            {
              "title": "门事件",
              "value": "37"
            },
            {
              "title": "抖阴视频",
              "value": "38"
            },
            {
              "title": "成人笑话",
              "value": "39"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "lebo",
      "title": "🐆 乐播资源",
      "subtitle": "乐播资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_lebo",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "亚洲情色",
              "value": "1"
            },
            {
              "title": "国产主播",
              "value": "2"
            },
            {
              "title": "国产自拍",
              "value": "3"
            },
            {
              "title": "无码专区",
              "value": "4"
            },
            {
              "title": "欧美性爱",
              "value": "5"
            },
            {
              "title": "熟女人妻",
              "value": "6"
            },
            {
              "title": "强奸乱伦",
              "value": "7"
            },
            {
              "title": "巨乳美乳",
              "value": "8"
            },
            {
              "title": "中文字幕",
              "value": "9"
            },
            {
              "title": "制服诱惑",
              "value": "10"
            },
            {
              "title": "女同性恋",
              "value": "11"
            },
            {
              "title": "卡通动画",
              "value": "12"
            },
            {
              "title": "视频伦理",
              "value": "13"
            },
            {
              "title": "少女萝莉",
              "value": "14"
            },
            {
              "title": "重口色情",
              "value": "15"
            },
            {
              "title": "人兽性交",
              "value": "16"
            },
            {
              "title": "福利姬",
              "value": "33"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "didi",
      "title": "💧 滴滴资源",
      "subtitle": "滴滴资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_didi",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "国产专区",
              "value": "20"
            },
            {
              "title": "国产厂商",
              "value": "21"
            },
            {
              "title": "主播视讯",
              "value": "22"
            },
            {
              "title": "日本无码",
              "value": "23"
            },
            {
              "title": "日本有码",
              "value": "24"
            },
            {
              "title": "中文字幕",
              "value": "25"
            },
            {
              "title": "中字无码",
              "value": "26"
            },
            {
              "title": "中字有码",
              "value": "27"
            },
            {
              "title": "水果派解说",
              "value": "28"
            },
            {
              "title": "麻豆传媒",
              "value": "29"
            },
            {
              "title": "91制片厂",
              "value": "30"
            },
            {
              "title": "蜜桃影像传媒",
              "value": "31"
            },
            {
              "title": "天美传媒",
              "value": "32"
            },
            {
              "title": "精东影业",
              "value": "33"
            },
            {
              "title": "星空无限传媒",
              "value": "34"
            },
            {
              "title": "台湾swag",
              "value": "35"
            },
            {
              "title": "其他传媒",
              "value": "36"
            },
            {
              "title": "三级伦理",
              "value": "37"
            },
            {
              "title": "美女写真",
              "value": "38"
            },
            {
              "title": "卡通动漫",
              "value": "39"
            },
            {
              "title": "采集教程",
              "value": "40"
            },
            {
              "title": "葫芦影业",
              "value": "41"
            },
            {
              "title": "糖心Vlog",
              "value": "42"
            },
            {
              "title": "欧美性爱",
              "value": "43"
            },
            {
              "title": "黑料事件",
              "value": "44"
            },
            {
              "title": "SM调教",
              "value": "45"
            },
            {
              "title": "女同系列",
              "value": "46"
            },
            {
              "title": "男同系列",
              "value": "47"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "155",
      "title": "⚡ 155资源",
      "subtitle": "155资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_155",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "无码专区",
              "value": "1"
            },
            {
              "title": "麻豆传媒",
              "value": "2"
            },
            {
              "title": "制服诱惑",
              "value": "3"
            },
            {
              "title": "三级伦理",
              "value": "4"
            },
            {
              "title": "AI换脸",
              "value": "5"
            },
            {
              "title": "中文字幕",
              "value": "6"
            },
            {
              "title": "卡通动漫",
              "value": "7"
            },
            {
              "title": "欧美系列",
              "value": "8"
            },
            {
              "title": "美女主播",
              "value": "9"
            },
            {
              "title": "国产自拍",
              "value": "10"
            },
            {
              "title": "熟女人妻",
              "value": "11"
            },
            {
              "title": "萝莉少女",
              "value": "12"
            },
            {
              "title": "女同性爱",
              "value": "13"
            },
            {
              "title": "多人群交",
              "value": "14"
            },
            {
              "title": "美乳巨乳",
              "value": "15"
            },
            {
              "title": "强奸乱伦",
              "value": "16"
            },
            {
              "title": "抖音视频",
              "value": "33"
            },
            {
              "title": "韩国主播",
              "value": "34"
            },
            {
              "title": "网红头条",
              "value": "35"
            },
            {
              "title": "网爆黑料",
              "value": "36"
            },
            {
              "title": "欧美无码",
              "value": "37"
            },
            {
              "title": "女优明星",
              "value": "38"
            },
            {
              "title": "SM调教",
              "value": "39"
            },
            {
              "title": "AV解说",
              "value": "40"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "yutu",
      "title": "🐇 玉兔资源",
      "subtitle": "玉兔资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_yutu",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "精品推荐",
              "value": "20"
            },
            {
              "title": "国产精品",
              "value": "21"
            },
            {
              "title": "主播秀色",
              "value": "22"
            },
            {
              "title": "日本有码",
              "value": "23"
            },
            {
              "title": "日本无码",
              "value": "24"
            },
            {
              "title": "中文字幕",
              "value": "25"
            },
            {
              "title": "童颜巨乳",
              "value": "26"
            },
            {
              "title": "性感人妻",
              "value": "27"
            },
            {
              "title": "强奸乱伦",
              "value": "28"
            },
            {
              "title": "欧美情色",
              "value": "29"
            },
            {
              "title": "三级伦理",
              "value": "31"
            },
            {
              "title": "卡通动漫",
              "value": "32"
            },
            {
              "title": "丝袜OL",
              "value": "33"
            },
            {
              "title": "自拍偷拍",
              "value": "35"
            },
            {
              "title": "日本片商",
              "value": "36"
            },
            {
              "title": "剧情介绍",
              "value": "44"
            },
            {
              "title": "网曝系列",
              "value": "56"
            },
            {
              "title": "麻豆传媒",
              "value": "57"
            },
            {
              "title": "明星换脸",
              "value": "60"
            },
            {
              "title": "国产乱伦",
              "value": "61"
            },
            {
              "title": "国产丝袜",
              "value": "62"
            },
            {
              "title": "国产SM",
              "value": "63"
            },
            {
              "title": "国产人妻",
              "value": "64"
            },
            {
              "title": "探花嫖娼",
              "value": "65"
            },
            {
              "title": "同性恋",
              "value": "66"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "senlin",
      "title": "🌲 森林资源",
      "subtitle": "森林资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_senlin",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "精品推荐",
              "value": "20"
            },
            {
              "title": "国产色情",
              "value": "22"
            },
            {
              "title": "主播直播",
              "value": "23"
            },
            {
              "title": "亚洲无码",
              "value": "24"
            },
            {
              "title": "亚洲有码",
              "value": "25"
            },
            {
              "title": "中文字幕",
              "value": "26"
            },
            {
              "title": "巨乳美乳",
              "value": "27"
            },
            {
              "title": "人妻熟女",
              "value": "28"
            },
            {
              "title": "强奸乱伦",
              "value": "29"
            },
            {
              "title": "欧美精品",
              "value": "30"
            },
            {
              "title": "萝莉少女",
              "value": "31"
            },
            {
              "title": "伦理三级",
              "value": "32"
            },
            {
              "title": "成人动漫",
              "value": "33"
            },
            {
              "title": "自拍偷拍",
              "value": "34"
            },
            {
              "title": "制服丝袜",
              "value": "35"
            },
            {
              "title": "口交颜射",
              "value": "36"
            },
            {
              "title": "日本精品",
              "value": "37"
            },
            {
              "title": "Cosplay",
              "value": "38"
            },
            {
              "title": "素人自拍",
              "value": "39"
            },
            {
              "title": "台湾辣妹",
              "value": "40"
            },
            {
              "title": "韩国御姐",
              "value": "41"
            },
            {
              "title": "唯美港姐",
              "value": "42"
            },
            {
              "title": "东南亚AV",
              "value": "43"
            },
            {
              "title": "欺辱凌辱",
              "value": "44"
            },
            {
              "title": "剧情介绍",
              "value": "45"
            },
            {
              "title": "多人多P",
              "value": "46"
            },
            {
              "title": "91探花",
              "value": "47"
            },
            {
              "title": "网红流出",
              "value": "48"
            },
            {
              "title": "野外露出",
              "value": "49"
            },
            {
              "title": "古装扮演",
              "value": "50"
            },
            {
              "title": "女优系列",
              "value": "51"
            },
            {
              "title": "可爱学生",
              "value": "52"
            },
            {
              "title": "风情旗袍",
              "value": "53"
            },
            {
              "title": "兽耳系列",
              "value": "54"
            },
            {
              "title": "瑜伽裤",
              "value": "55"
            },
            {
              "title": "闷骚护士",
              "value": "56"
            },
            {
              "title": "过膝袜",
              "value": "57"
            },
            {
              "title": "网曝门",
              "value": "58"
            },
            {
              "title": "传媒出品",
              "value": "59"
            },
            {
              "title": "女同性恋",
              "value": "60"
            },
            {
              "title": "男同性恋",
              "value": "61"
            },
            {
              "title": "恋腿狂魔",
              "value": "63"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "huosu",
      "title": "🔥 火速资源",
      "subtitle": "火速资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_huosu",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "国产伦理",
              "value": "47"
            },
            {
              "title": "香港伦理",
              "value": "48"
            },
            {
              "title": "台湾伦理",
              "value": "49"
            },
            {
              "title": "韩国伦理",
              "value": "50"
            },
            {
              "title": "日本伦理",
              "value": "51"
            },
            {
              "title": "西方伦理",
              "value": "52"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "heihei",
      "title": "😈 嘿嘿资源",
      "subtitle": "嘿嘿资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_heihei",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "国产视频",
              "value": "48"
            },
            {
              "title": "国产自拍",
              "value": "49"
            },
            {
              "title": "国产偷拍",
              "value": "50"
            },
            {
              "title": "国产探花",
              "value": "51"
            },
            {
              "title": "国产主播",
              "value": "52"
            },
            {
              "title": "国产户外",
              "value": "53"
            },
            {
              "title": "黑料吃瓜",
              "value": "54"
            },
            {
              "title": "传媒厂商",
              "value": "55"
            },
            {
              "title": "麻豆传媒",
              "value": "56"
            },
            {
              "title": "精东影业",
              "value": "57"
            },
            {
              "title": "蜜桃传媒",
              "value": "58"
            },
            {
              "title": "果冻传媒",
              "value": "59"
            },
            {
              "title": "天美传媒",
              "value": "60"
            },
            {
              "title": "星空传媒",
              "value": "61"
            },
            {
              "title": "皇家华人",
              "value": "62"
            },
            {
              "title": "起点传媒",
              "value": "63"
            },
            {
              "title": "渡边传媒",
              "value": "64"
            },
            {
              "title": "葫芦影业",
              "value": "65"
            },
            {
              "title": "红斯灯影像",
              "value": "66"
            },
            {
              "title": "水果派解说",
              "value": "67"
            },
            {
              "title": "SA传媒",
              "value": "68"
            },
            {
              "title": "糖心Vlog",
              "value": "69"
            },
            {
              "title": "性视界",
              "value": "70"
            },
            {
              "title": "水果派解说",
              "value": "71"
            },
            {
              "title": "日本AV",
              "value": "72"
            },
            {
              "title": "日本无码",
              "value": "73"
            },
            {
              "title": "日本有码",
              "value": "74"
            },
            {
              "title": "中字无码",
              "value": "75"
            },
            {
              "title": "中字有码",
              "value": "76"
            },
            {
              "title": "特殊嗜好",
              "value": "77"
            },
            {
              "title": "绿帽换妻",
              "value": "78"
            },
            {
              "title": "SM调教",
              "value": "79"
            },
            {
              "title": "男同系列",
              "value": "80"
            },
            {
              "title": "女同系列",
              "value": "81"
            },
            {
              "title": "乱伦系列",
              "value": "82"
            },
            {
              "title": "网黄自制",
              "value": "83"
            },
            {
              "title": "台北娜娜",
              "value": "84"
            },
            {
              "title": "玩偶姐姐",
              "value": "85"
            },
            {
              "title": "饼干姐姐",
              "value": "86"
            },
            {
              "title": "黑椒盖饭",
              "value": "87"
            },
            {
              "title": "冉冉学姐",
              "value": "88"
            },
            {
              "title": "小水水",
              "value": "89"
            },
            {
              "title": "柚子猫",
              "value": "90"
            },
            {
              "title": "捅主任",
              "value": "91"
            },
            {
              "title": "鸡教练",
              "value": "92"
            },
            {
              "title": "刘玥",
              "value": "93"
            },
            {
              "title": "三级伦理",
              "value": "94"
            },
            {
              "title": "国产伦理",
              "value": "95"
            },
            {
              "title": "香港伦理",
              "value": "96"
            },
            {
              "title": "台湾伦理",
              "value": "97"
            },
            {
              "title": "韩国伦理",
              "value": "98"
            },
            {
              "title": "日本伦理",
              "value": "99"
            },
            {
              "title": "西方伦理",
              "value": "100"
            },
            {
              "title": "欧美AV",
              "value": "101"
            },
            {
              "title": "美女写真",
              "value": "102"
            },
            {
              "title": "成人动漫",
              "value": "103"
            },
            {
              "title": "扣扣传媒",
              "value": "104"
            },
            {
              "title": "爱豆传媒",
              "value": "105"
            },
            {
              "title": "乌托邦传媒",
              "value": "106"
            },
            {
              "title": "爱神传媒",
              "value": "107"
            },
            {
              "title": "香蕉传媒",
              "value": "108"
            },
            {
              "title": "大象传媒",
              "value": "109"
            },
            {
              "title": "其他传媒",
              "value": "110"
            },
            {
              "title": "米菲兔",
              "value": "111"
            },
            {
              "title": "短视频",
              "value": "112"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "ck",
      "title": "🎬 CK资源",
      "subtitle": "CK资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_ck",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "伦理片",
              "value": "20"
            },
            {
              "title": "教程",
              "value": "21"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "doudou",
      "title": "🫘 豆豆资源",
      "subtitle": "豆豆资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_doudou",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "采集教程",
              "value": "40"
            },
            {
              "title": "国产视频",
              "value": "47"
            },
            {
              "title": "国产传媒",
              "value": "48"
            },
            {
              "title": "国产探花",
              "value": "49"
            },
            {
              "title": "极品学生",
              "value": "50"
            },
            {
              "title": "野战户外",
              "value": "51"
            },
            {
              "title": "网曝黑料",
              "value": "52"
            },
            {
              "title": "日本有码",
              "value": "53"
            },
            {
              "title": "主播大秀",
              "value": "54"
            },
            {
              "title": "校园春色",
              "value": "56"
            },
            {
              "title": "SM虐待",
              "value": "57"
            },
            {
              "title": "巨乳系列",
              "value": "59"
            },
            {
              "title": "偷拍自拍",
              "value": "61"
            },
            {
              "title": "强奸乱伦",
              "value": "62"
            },
            {
              "title": "制服诱惑",
              "value": "63"
            },
            {
              "title": "欧美精品",
              "value": "64"
            },
            {
              "title": "三级伦理",
              "value": "68"
            },
            {
              "title": "AV解说",
              "value": "69"
            },
            {
              "title": "成人动漫",
              "value": "70"
            },
            {
              "title": "日本无码",
              "value": "71"
            },
            {
              "title": "重口猎奇",
              "value": "72"
            },
            {
              "title": "少妇人妻",
              "value": "74"
            },
            {
              "title": "角色扮演",
              "value": "75"
            },
            {
              "title": "女同性恋",
              "value": "76"
            },
            {
              "title": "黑人专区",
              "value": "77"
            },
            {
              "title": "中文字幕",
              "value": "78"
            },
            {
              "title": "男同性恋",
              "value": "80"
            },
            {
              "title": "反差系列",
              "value": "81"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "xiaoji",
      "title": "🐥 小鸡资源",
      "subtitle": "小鸡资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_xiaoji",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "国产自拍",
              "value": "1"
            },
            {
              "title": "日韩AV",
              "value": "2"
            },
            {
              "title": "欧美精品",
              "value": "3"
            },
            {
              "title": "异族风情",
              "value": "4"
            },
            {
              "title": "动漫专栏",
              "value": "5"
            },
            {
              "title": "强奸迷奸",
              "value": "9"
            },
            {
              "title": "丝袜制服",
              "value": "10"
            },
            {
              "title": "国产厂牌",
              "value": "11"
            },
            {
              "title": "SM调教",
              "value": "12"
            },
            {
              "title": "乱伦",
              "value": "13"
            },
            {
              "title": "网曝黑料",
              "value": "14"
            },
            {
              "title": "主播网红",
              "value": "15"
            },
            {
              "title": "自拍偷拍",
              "value": "16"
            },
            {
              "title": "口交自慰",
              "value": "17"
            },
            {
              "title": "群交多P",
              "value": "18"
            },
            {
              "title": "AI换脸",
              "value": "19"
            },
            {
              "title": "素人特摄",
              "value": "20"
            },
            {
              "title": "无码高清",
              "value": "21"
            },
            {
              "title": "经典有码",
              "value": "22"
            },
            {
              "title": "中文字幕",
              "value": "23"
            },
            {
              "title": "性感网红",
              "value": "24"
            },
            {
              "title": "重口调教",
              "value": "25"
            },
            {
              "title": "厂牌经典",
              "value": "26"
            },
            {
              "title": "人兽",
              "value": "27"
            },
            {
              "title": "其他",
              "value": "28"
            },
            {
              "title": "东南亚",
              "value": "29"
            },
            {
              "title": "阿拉伯",
              "value": "30"
            },
            {
              "title": "印巴拉丁",
              "value": "31"
            },
            {
              "title": "激情H漫",
              "value": "32"
            },
            {
              "title": "3D",
              "value": "33"
            },
            {
              "title": "国产三级",
              "value": "41"
            },
            {
              "title": "学生萝莉",
              "value": "43"
            },
            {
              "title": "日韩三级",
              "value": "44"
            },
            {
              "title": "蓝光超清",
              "value": "45"
            },
            {
              "title": "日韩精选",
              "value": "48"
            },
            {
              "title": "国产精选",
              "value": "49"
            },
            {
              "title": "欧美精选",
              "value": "50"
            },
            {
              "title": "VR专区",
              "value": "52"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "fanqie",
      "title": "🍅 番茄资源",
      "subtitle": "番茄资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_fanqie",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "视频一区",
              "value": "1"
            },
            {
              "title": "视频二区",
              "value": "2"
            },
            {
              "title": "欧美精品",
              "value": "3"
            },
            {
              "title": "偷拍自拍",
              "value": "6"
            },
            {
              "title": "国产大制作",
              "value": "7"
            },
            {
              "title": "乱伦毁三观",
              "value": "8"
            },
            {
              "title": "主播女网红",
              "value": "9"
            },
            {
              "title": "黑料网曝",
              "value": "10"
            },
            {
              "title": "高清无码",
              "value": "13"
            },
            {
              "title": "中文字幕",
              "value": "14"
            },
            {
              "title": "欧美精品",
              "value": "20"
            },
            {
              "title": "淫乱学生妹",
              "value": "21"
            },
            {
              "title": "动漫精选",
              "value": "22"
            },
            {
              "title": "动漫精选",
              "value": "23"
            },
            {
              "title": "高清有码",
              "value": "24"
            },
            {
              "title": "日本素人",
              "value": "25"
            },
            {
              "title": "视频三区",
              "value": "26"
            },
            {
              "title": "无码流出",
              "value": "27"
            },
            {
              "title": "FC2",
              "value": "28"
            },
            {
              "title": "会所技师",
              "value": "29"
            },
            {
              "title": "国产推荐",
              "value": "30"
            },
            {
              "title": "探花约炮",
              "value": "31"
            },
            {
              "title": "韩国直播",
              "value": "32"
            },
            {
              "title": "国产直播",
              "value": "33"
            },
            {
              "title": "淫妻绿帽",
              "value": "34"
            },
            {
              "title": "制服诱惑",
              "value": "35"
            },
            {
              "title": "重口猎奇",
              "value": "36"
            },
            {
              "title": "东京热",
              "value": "37"
            },
            {
              "title": "一本道",
              "value": "38"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "hsck",
      "title": "📦 黄色仓库",
      "subtitle": "黄色仓库 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_hsck",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "国产区",
              "value": "1"
            },
            {
              "title": "AV区",
              "value": "2"
            },
            {
              "title": "欧美区",
              "value": "3"
            },
            {
              "title": "动漫区",
              "value": "5"
            },
            {
              "title": "网红主播",
              "value": "6"
            },
            {
              "title": "国产传媒",
              "value": "7"
            },
            {
              "title": "探花系列",
              "value": "8"
            },
            {
              "title": "人妻熟女",
              "value": "9"
            },
            {
              "title": "日本无码",
              "value": "10"
            },
            {
              "title": "美乳巨乳",
              "value": "11"
            },
            {
              "title": "强制侵犯",
              "value": "12"
            },
            {
              "title": "制服诱惑",
              "value": "13"
            },
            {
              "title": "绝色佳人",
              "value": "14"
            },
            {
              "title": "风俗泡泡浴",
              "value": "15"
            },
            {
              "title": "家庭乱伦",
              "value": "16"
            },
            {
              "title": "AV解说",
              "value": "17"
            },
            {
              "title": "三级电影",
              "value": "18"
            },
            {
              "title": "少女萝莉",
              "value": "20"
            },
            {
              "title": "SM调教",
              "value": "21"
            },
            {
              "title": "绝顶潮吹",
              "value": "22"
            },
            {
              "title": "魔镜系列",
              "value": "23"
            },
            {
              "title": "时间停止",
              "value": "24"
            },
            {
              "title": "催眠洗脑",
              "value": "25"
            },
            {
              "title": "漫改系列",
              "value": "26"
            },
            {
              "title": "电车痴汉",
              "value": "27"
            },
            {
              "title": "淫欲痴女",
              "value": "28"
            },
            {
              "title": "AI换脸",
              "value": "29"
            },
            {
              "title": "其他区",
              "value": "30"
            },
            {
              "title": "网曝门",
              "value": "31"
            },
            {
              "title": "TS专区",
              "value": "32"
            },
            {
              "title": "女性向系列",
              "value": "33"
            },
            {
              "title": "女同性恋",
              "value": "34"
            },
            {
              "title": "男同性恋",
              "value": "35"
            },
            {
              "title": "欧美精品",
              "value": "36"
            },
            {
              "title": "国产自拍",
              "value": "37"
            },
            {
              "title": "日本动漫",
              "value": "38"
            },
            {
              "title": "3D动漫",
              "value": "39"
            },
            {
              "title": "韩国主播",
              "value": "40"
            },
            {
              "title": "泰国风情",
              "value": "41"
            },
            {
              "title": "OnlyFans",
              "value": "42"
            },
            {
              "title": "AI短剧",
              "value": "43"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "lsb",
      "title": "💋 老色逼资源",
      "subtitle": "老色逼资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_lsb",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "精品推荐",
              "value": "20"
            },
            {
              "title": "国产精品",
              "value": "21"
            },
            {
              "title": "主播秀色",
              "value": "22"
            },
            {
              "title": "日本有码",
              "value": "23"
            },
            {
              "title": "日本无码",
              "value": "24"
            },
            {
              "title": "中文字幕",
              "value": "25"
            },
            {
              "title": "童颜巨乳",
              "value": "26"
            },
            {
              "title": "性感人妻",
              "value": "27"
            },
            {
              "title": "强奸乱伦",
              "value": "28"
            },
            {
              "title": "欧美情色",
              "value": "29"
            },
            {
              "title": "三级伦理",
              "value": "31"
            },
            {
              "title": "卡通动漫",
              "value": "32"
            },
            {
              "title": "丝袜OL",
              "value": "33"
            },
            {
              "title": "自拍偷拍",
              "value": "35"
            },
            {
              "title": "日本片商",
              "value": "36"
            },
            {
              "title": "剧情介绍",
              "value": "44"
            },
            {
              "title": "网曝系列",
              "value": "56"
            },
            {
              "title": "麻豆传媒",
              "value": "57"
            },
            {
              "title": "明星换脸",
              "value": "60"
            },
            {
              "title": "国产乱伦",
              "value": "61"
            },
            {
              "title": "国产丝袜",
              "value": "62"
            },
            {
              "title": "国产SM",
              "value": "63"
            },
            {
              "title": "国产人妻",
              "value": "64"
            },
            {
              "title": "探花嫖娼",
              "value": "65"
            },
            {
              "title": "同性恋",
              "value": "66"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
      "id": "fanhao",
      "title": "📀 番号资源",
      "subtitle": "番号资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_fanhao",
      "cacheDuration": 120,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "🌟 全部最新",
              "value": ""
            },
            {
              "title": "制服丝袜",
              "value": "1"
            },
            {
              "title": "群交淫乱",
              "value": "2"
            },
            {
              "title": "无码专区",
              "value": "3"
            },
            {
              "title": "偷拍自拍",
              "value": "4"
            },
            {
              "title": "卡通动漫",
              "value": "5"
            },
            {
              "title": "中文字幕",
              "value": "6"
            },
            {
              "title": "欧美性爱",
              "value": "7"
            },
            {
              "title": "巨乳美乳",
              "value": "8"
            },
            {
              "title": "国产裸聊",
              "value": "9"
            },
            {
              "title": "国产自拍",
              "value": "10"
            },
            {
              "title": "国产盗摄",
              "value": "11"
            },
            {
              "title": "伦理三级",
              "value": "12"
            },
            {
              "title": "女同性恋",
              "value": "13"
            },
            {
              "title": "少女萝莉",
              "value": "14"
            },
            {
              "title": "人妖系列",
              "value": "15"
            },
            {
              "title": "虚拟VR",
              "value": "16"
            },
            {
              "title": "亚州图片",
              "value": "17"
            },
            {
              "title": "欧美图片",
              "value": "18"
            },
            {
              "title": "美腿丝袜",
              "value": "19"
            },
            {
              "title": "网友自拍",
              "value": "20"
            },
            {
              "title": "清纯唯美",
              "value": "21"
            },
            {
              "title": "另类图片",
              "value": "22"
            },
            {
              "title": "卡通贴图",
              "value": "23"
            },
            {
              "title": "熟女乱伦",
              "value": "24"
            },
            {
              "title": "现代激情",
              "value": "25"
            },
            {
              "title": "古典武侠",
              "value": "26"
            },
            {
              "title": "暴力强奸",
              "value": "27"
            },
            {
              "title": "校园春色",
              "value": "28"
            },
            {
              "title": "家庭乱伦",
              "value": "29"
            },
            {
              "title": "长篇连载",
              "value": "30"
            },
            {
              "title": "情色幽默",
              "value": "31"
            },
            {
              "title": "淫妻交换",
              "value": "32"
            }
          ]
        },
        {
          "name": "sort_by",
          "title": "更新时段",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部时间",
              "value": ""
            },
            {
              "title": "24 小时内",
              "value": "24"
            },
            {
              "title": "近 7 天",
              "value": "168"
            },
            {
              "title": "近 30 天",
              "value": "720"
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
  { id: "fuli", title: "福利影视资源", url: "https://raw.githubusercontent.com/ddavidaurora/TVbox-interface/99cc2162519721d023843f230deaa453cf8d0570/tvbox-%E7%A6%8F%E5%88%A9.json" },
  { id: "fun", title: "Cluntop 福利站", url: "https://raw.githubusercontent.com/cluntop/tvbox/refs/heads/main/fun.json" },
  { id: "lubin18", title: "lubin776 福利站", url: "https://raw.githubusercontent.com/lubin776/tvbox/main/18.json" },
  { id: "dashu18", title: "大树 18+ 福利站", url: "https://raw.githubusercontent.com/963540817/dashu/main/18%2B.json" },
  { id: "jav", title: "TvBox JAV 福利站", url: "https://raw.githubusercontent.com/shichuanenhui/TvBox/main/jav.json" },
  { id: "dlgt7", title: "dlgt7 福利站", url: "https://raw.githubusercontent.com/dlgt7/TVbox-interface/main/jj.json" },
  { id: "gxnas", title: "gxnas 9kg 福利站", url: "https://raw.githubusercontent.com/gxnas/TvBox/main/9kg.json" },
  { id: "ewctt", title: "ewctt 福利站", url: "https://raw.githubusercontent.com/ewctt/tvbox/main/fun.json" }
];
var BUILTIN_SITES = {
  heiliao: { key: "heiliao", name: "黑料资源", api: "https://heiliaozyapi.com/api.php/provide/vod", playUrl: "", searchable: true },
  "91md": { key: "91md", name: "麻豆视频", api: "https://91md.me/api.php/provide/vod", playUrl: "", searchable: true },
  chujia: { key: "chujia", name: "精东影业", api: "http://chujia.cc/api.php/provide/vod/from/m3u8/", playUrl: "", searchable: true },
  naixxzy: { key: "naixxzy", name: "奶香香", api: "https://naixxzy.com/api.php/provide/vod", playUrl: "", searchable: true },
  aosikazy: { key: "aosikazy", name: "奥斯卡资源", api: "https://aosikazy.com/api.php/provide/vod", playUrl: "", searchable: true },
  xgbbk8: { key: "xgbbk8", name: "杏吧资源", api: "https://json.xgbbk8.com/api.php/provide/vod", playUrl: "", searchable: true },
  souav: { key: "souav", name: "搜AV资源", api: "https://api.souavzy.vip/api.php/provide/vod", playUrl: "", searchable: true },
  jingpin: { key: "jingpin", name: "精品资源", api: "https://www.jingpinx.com/api.php/provide/vod", playUrl: "", searchable: true },
  danaizi: { key: "danaizi", name: "大奶子资源", api: "https://apidanaizi.com/api.php/provide/vod", playUrl: "", searchable: true },
  shayu: { key: "shayu", name: "鲨鱼资源", api: "https://shayuapi.com/api.php/provide/vod", playUrl: "", searchable: true },
  lajiao: { key: "lajiao", name: "辣椒资源", api: "https://apilj.com/api.php/provide/vod", playUrl: "", searchable: true },
  jkun: { key: "jkun", name: "鸡坤资源", api: "https://jkunzyapi.com/api.php/provide/vod", playUrl: "", searchable: true },
  lebo: { key: "lebo", name: "乐播资源", api: "https://lbapi9.com/api.php/provide/vod", playUrl: "", searchable: true },
  didi: { key: "didi", name: "滴滴资源", api: "https://api.ddapi.cc/api.php/provide/vod", playUrl: "", searchable: true },
  "155": { key: "155", name: "155资源", api: "https://155api.com/api.php/provide/vod", playUrl: "", searchable: true },
  yutu: { key: "yutu", name: "玉兔资源", api: "https://apiyutu.com/api.php/provide/vod", playUrl: "", searchable: true },
  senlin: { key: "senlin", name: "森林资源", api: "https://slapibf.com/api.php/provide/vod", playUrl: "", searchable: true },
  huosu: { key: "huosu", name: "火速资源", api: "https://api.huosuapi.cc/api.php/provide/vod", playUrl: "", searchable: true },
  heihei: { key: "heihei", name: "嘿嘿资源", api: "https://api.heiapi.cc/api.php/provide/vod", playUrl: "", searchable: true },
  ck: { key: "ck", name: "CK资源", api: "https://www.ckzy1.com/api.php/provide/vod", playUrl: "", searchable: true },
  doudou: { key: "doudou", name: "豆豆资源", api: "https://api.douapi.cc/api.php/provide/vod", playUrl: "", searchable: true },
  xiaoji: { key: "xiaoji", name: "小鸡资源", api: "https://api.xiaojizy.live/provide/vod", playUrl: "", searchable: true },
  fanqie: { key: "fanqie", name: "番茄资源", api: "https://fqzy.me/api.php/provide/vod", playUrl: "", searchable: true },
  hsck: { key: "hsck", name: "黄色仓库", api: "https://hsckzy888.com/api.php/provide/vod/at/json", playUrl: "", searchable: true },
  lsb: { key: "lsb", name: "老色逼资源", api: "https://apilsbzy1.com/api.php/provide/vod", playUrl: "", searchable: true },
  fanhao: { key: "fanhao", name: "番号资源", api: "http://fhapi9.com/api.php/provide/vod", playUrl: "", searchable: true }
};

var DISCOVER_PREFERRED_HOSTS = [
  "heiliaozyapi.com", "api.souavzy.vip", "hsckzy888.com", "api.heiapi.cc", "91md.me",
  "www.jingpinx.com", "slapibf.com", "apiyutu.com", "jkunzyapi.com", "fqzy.me",
  "naixxzy.com", "api.xiaojizy.live", "lbapi9.com", "155api.com"
];
var GENRE_MATCHERS = {
  tanhua: { title: "国产探花", patterns: [/国产.?探花/i, /探花系列/i, /91探花/i, /酒店探花/i, /探花/i, /国产.?自拍/i, /自拍偷拍/i, /偷拍自拍/i, /国产.?偷拍/i, /偷拍/i, /自拍/i] },
  heiliao: { title: "黑料资源", patterns: [/黑料吃瓜/i, /吃瓜黑料/i, /黑料不打烊/i, /网[曝爆]黑料/i, /黑料/i, /吃瓜/i, /网[曝爆]/i, /门事件/i] },
  media: { title: "麻豆传媒", patterns: [/麻豆视频/i, /麻豆传媒/i, /麻豆/i] },
  ai_short: { title: "AI短剧", patterns: [/AI短剧/i, /AI漫剧/i, /AI魔改/i, /AI制作/i, /A\s*I.*换脸/i, /AI换脸/i, /\bAI\b/i] },
  uncensored: { title: "日本无码", patterns: [/日本.?无码/i, /日韩无码/i, /亚洲无码/i, /无码专区/i, /无码流出/i, /高清无码/i, /无码/i] },
  censored: { title: "日本有码", patterns: [/日本.?有码/i, /高清有码/i, /经典有码/i, /亚洲有码/i, /有码/i, /日本AV/i, /日韩AV/i, /精品日韩/i] },
  anime: { title: "动漫里番", patterns: [/里番/i, /激情动漫/i, /成人动漫/i, /日本动漫/i, /动漫/i, /卡通/i, /H漫/i] },
  cosplay: { title: "Cosplay", patterns: [/cosplay/i, /角色扮演/i, /古装扮演/i, /制服诱惑/i, /制服/i] }
};

function prioritizeSites(sites) {
  return sites.slice().sort((a, b) => {
    const ha = hostOf(a.api).toLowerCase().split(":")[0];
    const hb = hostOf(b.api).toLowerCase().split(":")[0];
    const ia = DISCOVER_PREFERRED_HOSTS.indexOf(ha);
    const ib = DISCOVER_PREFERRED_HOSTS.indexOf(hb);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    return 0;
  });
}

function matchGenreId(classes, genreKey) {
  const rule = GENRE_MATCHERS[genreKey];
  if (!rule) return "";
  for (let i = 0; i < rule.patterns.length; i++) {
    const pattern = rule.patterns[i];
    for (let j = 0; j < classes.length; j++) {
      if (pattern.test(classes[j].type_name)) return classes[j].type_id;
    }
  }
  return "";
}

function matchTokensInClasses(classes, tokens) {
  for (let i = 0; i < tokens.length; i++) {
    const token = String(tokens[i] || "").trim().toLowerCase();
    if (!token) continue;
    for (let j = 0; j < classes.length; j++) {
      if (String(classes[j].type_name || "").toLowerCase().indexOf(token) >= 0) {
        return classes[j].type_id;
      }
    }
  }
  return "";
}

async function discoverRoutesBy(params, sites, cacheTag, matcher) {
  const pool = prioritizeSites(sites).slice(0, 14);
  if (!matcher) {
    return pool.map(site => ({ site: site, typeId: "" }));
  }
  const cacheKey = "nsfw-discover:" + String(params.preset || "") + "|" + String(params.configUrls || "") + "|" + cacheTag;
  try {
    const hit = Widget.storage.get(cacheKey);
    if (hit && hit.savedAt && Date.now() - hit.savedAt < CACHE_MS && Array.isArray(hit.routes) && hit.routes.length) {
      return hit.routes;
    }
  } catch (e) { /* 缓存不可用时直接探测 */ }
  const settled = await mapPool(pool, 6, async function (site) {
    try {
      const classes = await siteClasses(site);
      const typeId = matcher(classes);
      return typeId ? { site: site, typeId: typeId } : null;
    } catch (e) {
      return null;
    }
  });
  const routes = settled.filter(Boolean);
  if (routes.length) {
    try { Widget.storage.set(cacheKey, { savedAt: Date.now(), routes: routes }); } catch (e) { /* 忽略 */ }
  }
  return routes;
}

async function fetchDiscoverRoutes(routes, params, page) {
  const targets = routes.slice(0, 4);
  const settled = await mapPool(targets, 4, async function (route) {
    const query = applyCmsFilters({ ac: "detail", pg: page }, params);
    if (route.typeId) query.t = route.typeId;
    try {
      const data = await cmsGet(route.site.api, query);
      return vodList(data).map(vod => vodCard(vod, route.site));
    } catch (e) {
      return [];
    }
  });
  return settled.filter(list => Array.isArray(list) && list.length);
}

async function discoverRoutes(params, sites, genreKey) {
  return discoverRoutesBy(
    params,
    sites,
    genreKey || "all",
    genreKey ? classes => matchGenreId(classes, genreKey) : null
  );
}

function mergeDiscoverCards(buckets) {
  const cards = [];
  const seen = {};
  let cursor = 0;
  for (;;) {
    let added = false;
    for (let i = 0; i < buckets.length; i++) {
      if (cursor < buckets[i].length) {
        const card = buckets[i][cursor];
        const nameKey = normalizeKey(card.title) || card.id;
        if (!seen[nameKey]) {
          seen[nameKey] = true;
          cards.push(card);
        }
        added = true;
      }
    }
    if (!added || cards.length >= 40) break;
    cursor += 1;
  }
  return cards.slice(0, 40);
}

function normalizeKey(value) {
  return String(value || "").toLowerCase().replace(/[\s:：\-—_.·,，!！?？'"“”`~～]/g, "");
}

function applyCmsFilters(query, params) {
  const hours = Number(params.sort_by || params.hours);
  if (Number.isFinite(hours) && hours > 0) query.h = Math.floor(hours);
  return query;
}

async function resolveSelectedSite(params) {
  const siteKey = String(params.site || "").trim();
  if (!siteKey) return null;
  if (BUILTIN_SITES[siteKey]) return BUILTIN_SITES[siteKey];
  return requireSite(params, siteKey);
}

async function loadBuiltinSite(siteKey, params) {
  params = params || {};
  const site = BUILTIN_SITES[siteKey] || await requireSite(params, siteKey);
  const page = pageNumber(params.page);
  const category = String(params.category || "").trim();
  const query = applyCmsFilters({ ac: "detail", pg: page }, params);
  if (category) query.t = category;
  const data = await cmsGet(site.api, query);
  const list = vodList(data).map(vod => vodCard(vod, site));
  if (!list.length && page === 1) {
    throw new Error(site.name + " 当前分类下暂无内容，请切换分类或更新时段");
  }
  return list;
}

function loadSite_heiliao(params) { return loadBuiltinSite("heiliao", params); }
function loadSite_91md(params) { return loadBuiltinSite("91md", params); }
function loadSite_chujia(params) { return loadBuiltinSite("chujia", params); }
function loadSite_naixxzy(params) { return loadBuiltinSite("naixxzy", params); }
function loadSite_aosikazy(params) { return loadBuiltinSite("aosikazy", params); }
function loadSite_xgbbk8(params) { return loadBuiltinSite("xgbbk8", params); }
function loadSite_souav(params) { return loadBuiltinSite("souav", params); }
function loadSite_jingpin(params) { return loadBuiltinSite("jingpin", params); }
function loadSite_danaizi(params) { return loadBuiltinSite("danaizi", params); }
function loadSite_shayu(params) { return loadBuiltinSite("shayu", params); }
function loadSite_lajiao(params) { return loadBuiltinSite("lajiao", params); }
function loadSite_jkun(params) { return loadBuiltinSite("jkun", params); }
function loadSite_lebo(params) { return loadBuiltinSite("lebo", params); }
function loadSite_didi(params) { return loadBuiltinSite("didi", params); }
function loadSite_155(params) { return loadBuiltinSite("155", params); }
function loadSite_yutu(params) { return loadBuiltinSite("yutu", params); }
function loadSite_senlin(params) { return loadBuiltinSite("senlin", params); }
function loadSite_huosu(params) { return loadBuiltinSite("huosu", params); }
function loadSite_heihei(params) { return loadBuiltinSite("heihei", params); }
function loadSite_ck(params) { return loadBuiltinSite("ck", params); }
function loadSite_doudou(params) { return loadBuiltinSite("doudou", params); }
function loadSite_xiaoji(params) { return loadBuiltinSite("xiaoji", params); }
function loadSite_fanqie(params) { return loadBuiltinSite("fanqie", params); }
function loadSite_hsck(params) { return loadBuiltinSite("hsck", params); }
function loadSite_lsb(params) { return loadBuiltinSite("lsb", params); }
function loadSite_fanhao(params) { return loadBuiltinSite("fanhao", params); }

async function loadDiscover(params) {
  params = params || {};
  const page = pageNumber(params.page);
  const genreKey = String(params.genre || "").trim();
  const pickedSite = await resolveSelectedSite(params);
  if (pickedSite) {
    let categoryId = "";
    if (genreKey) {
      try {
        categoryId = matchGenreId(await siteClasses(pickedSite), genreKey);
      } catch (e) {
        categoryId = "";
      }
    }
    if (!genreKey || categoryId) {
      const query = applyCmsFilters({ ac: "detail", pg: page }, params);
      if (categoryId) query.t = categoryId;
      const data = await cmsGet(pickedSite.api, query);
      const list = vodList(data).map(vod => vodCard(vod, pickedSite));
      if (list.length || page > 1) return list;
    }
  }
  const sites = await enabledSites(params);
  const routes = await discoverRoutes(params, sites, genreKey);
  if (!routes.length) {
    const label = GENRE_MATCHERS[genreKey] ? GENRE_MATCHERS[genreKey].title : genreKey;
    throw new Error("当前启用的源里没有找到「" + label + "」分类");
  }
  const buckets = await fetchDiscoverRoutes(routes, params, page);
  if (!buckets.length) {
    if (page > 1) return [];
    throw new Error("聚合源暂时没有返回数据，请切换分类或稍后重试");
  }
  return mergeDiscoverCards(buckets);
}

async function loadCustomDiscover(params) {
  params = params || {};
  const tokens = splitList(params.keywords);
  if (!tokens.length) throw new Error("请先在参数里填写至少一个分类或关键词");
  const mode = String(params.matchMode || "auto");
  const page = pageNumber(params.page);
  if (mode !== "searchOnly") {
    const sites = await enabledSites(params);
    const routes = await discoverRoutesBy(
      params,
      sites,
      "custom:" + tokens.join(","),
      classes => matchTokensInClasses(classes, tokens)
    );
    if (routes.length) {
      const buckets = await fetchDiscoverRoutes(routes, params, page);
      if (buckets.length) return mergeDiscoverCards(buckets);
      if (page > 1) return [];
    }
    if (mode === "classOnly") {
      throw new Error("当前启用的源里没有匹配「" + tokens.join(" / ") + "」的分类");
    }
  }
  return search({
    preset: params.preset,
    configUrls: params.configUrls,
    siteKeys: params.siteKeys,
    keyword: tokens[0],
    page: String(page)
  });
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

async function searchSiteOptions(params) {
  const sites = await enabledSites(params);
  return [{ title: "全部（最多 " + SEARCH_LIMIT + " 个）", value: "" }].concat(sites.map(site => ({
    title: site.name + " (" + site.key + ")",
    value: site.key
  })));
}

async function siteClasses(site) {
  const cacheKey = "nsfw-classes:" + apiFingerprint(site.api);
  try {
    const hit = Widget.storage.get(cacheKey);
    if (hit && hit.savedAt && Date.now() - hit.savedAt < CACHE_MS && Array.isArray(hit.classes)) return hit.classes;
  } catch (e) { /* 缓存不可用时直接请求 */ }
  const data = await cmsGet(site.api, { ac: "list" });
  const classes = (data && Array.isArray(data.class) ? data.class : [])
    .filter(item => item && item.type_id != null && item.type_name)
    .map(item => ({ type_id: String(item.type_id), type_name: String(item.type_name) }));
  try { Widget.storage.set(cacheKey, { savedAt: Date.now(), classes: classes }); } catch (e) { /* 忽略缓存失败 */ }
  return classes;
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
      ? "分类：" + classes.map(item => String(item.type_name) + " " + String(item.type_id)).join("、")
      : site.name
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
  const cacheKey = "nsfw-sites:" + String(params.preset || "") + "|" + String(params.configUrls || "") + "|" + String(params.siteKeys || "");
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
      const message = e && e.message ? e.message : "读取失败";
      const hint = /响应体超过上限/i.test(message) ? "（服务器不支持分片且响应体超过 Rex 上限）" : "";
      return { error: url + "：" + message + hint };
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
  });
  if (!sites.length) {
    throw new Error("配置里没有可用的 JSON 采集站。只读取 sites JSON，不解析 JS 插件或 md5 校验文件。");
  }
  console.log("TVBox 福利可用采集接口", sites.length, "个");
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

function apiFingerprint(api) {
  let raw = String(api || "").trim();
  const hashAt = raw.indexOf("#");
  if (hashAt >= 0) raw = raw.slice(0, hashAt);
  raw = raw.replace(/\/+$/, "").toLowerCase();
  const at = raw.indexOf("//");
  if (at < 0) return raw;
  const rest = raw.slice(at + 2);
  const slash = rest.indexOf("/");
  const host = slash < 0 ? rest : rest.slice(0, slash);
  const tail = slash < 0 ? "" : rest.slice(slash);
  return raw.slice(0, at) + "//" + host.replace(/:80$/, "").replace(/:443$/, "") + tail;
}

function shortHash(value) {
  let hash = 2166136261;
  const text = String(value || "");
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

function addSite(site, allow, seen, sites) {
  if (!isJsonCms(site)) return;
  const api = String(site.api).trim();
  const fingerprint = "api:" + apiFingerprint(api);
  if (!apiFingerprint(api) || seen[fingerprint]) return;
  const name = String(site.name || "").trim();
  const key = String(site.key || "").trim() || ("cms:" + shortHash(apiFingerprint(api)));
  if (allow.length && allow.indexOf(key) < 0) return;
  seen[fingerprint] = true;
  sites.push({
    key: key,
    name: name || key,
    api: api,
    playUrl: String(site.playUrl || "").trim(),
    searchable: !(site.searchable === 0 || site.searchable === "0")
  });
}

function parseConfigText(text) {
  const original = String(text || "").replace(/^﻿/, "").trim();
  if (!original) throw new Error("配置内容是空的");
  if (/^[a-f0-9]{32}$/i.test(original)) throw new Error("这是 md5 校验文件，不是 TVBox 配置");
  if (/^<!doctype html/i.test(original) || /^<html/i.test(original)) throw new Error("这是网页，不是 TVBox 配置");
  try { return JSON.parse(original); } catch (e) { /* 尝试清洗注释和异常字符 */ }
  let cleaned = original.replace(/\/\*[\s\S]*?\*\//g, "");
  cleaned = cleaned.replace(/^[ \t]*\/\/[^\n]*(?:\r?\n|$)/gm, "");
  try { return JSON.parse(cleaned); } catch (e) { /* 继续修复字符串内换行 */ }
  let inside = false;
  let escaped = false;
  let fixed = "";
  for (let i = 0; i < cleaned.length; i++) {
    const ch = cleaned[i];
    if (inside) {
      if (escaped) {
        fixed += ch;
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        fixed += ch;
        escaped = true;
        continue;
      }
      if (ch === '"') {
        fixed += ch;
        inside = false;
        continue;
      }
      if (ch === "\r") continue;
      if (ch === "\n") continue;
      const code = ch.charCodeAt(0);
      fixed += code < 32 ? " " : ch;
      continue;
    }
    if (ch === '"') inside = true;
    fixed += ch;
  }
  try { return JSON.parse(fixed); } catch (e) { throw new Error("配置不是 JSON"); }
}

function asObject(data) {
  if (data && typeof data === "object") return data;
  if (typeof data === "string") return parseConfigText(data);
  throw new Error("配置不是 JSON");
}

async function loadConfigDoc(url) {
  return asObject(await httpGet(url));
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
  const order = ["ac", "ids", "wd", "t", "area", "year", "h", "pg"];
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
        "Accept": "application/json"
      }
    });
  } catch (e) {
    throw new Error(e && e.message ? e.message : "网络错误");
  }
  return response ? response.data : null;
}

function encodeLink(payload) {
  return "tvbox-nsfw:" + encodeURIComponent(JSON.stringify(payload));
}

function decodeLink(link) {
  const raw = String(link || "");
  let encoded = "";
  if (raw.indexOf("tvbox-nsfw:") === 0) encoded = raw.slice(11);
  else if (raw.indexOf("tvbox:") === 0) encoded = raw.slice(6);
  else throw new Error("无法识别的详情链接");
  let payload;
  try { payload = JSON.parse(decodeURIComponent(encoded)); }
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
