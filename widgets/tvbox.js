var WidgetMetadata = {
  id: "chai.tvbox",
  title: "TVBox 影视源",
  version: "3.1.0",
  requiredVersion: "0.0.6",
  description: "内置常规影视 TVBox 采集站，为每个内置源写入真实分类目录，并支持跨源聚合与更新时段筛选（自动过滤 18+ 站点）。",
  author: "chai-j",
  detailCacheDuration: 120,
  globalParams: [
    {
      name: "preset",
      title: "内置配置",
      type: "enumeration",
      value: "all",
      description: "默认使用全部常规影视配置（已排除 18+ 站点）。选「全部聚合」或搜索时生效。",
      enumOptions: [
        { title: "全部影视配置", value: "all" },
        { title: "只用追加地址", value: "none" },
        { title: "Moon TVBox 合并站", value: "moon" },
        { title: "TVBox 官方推荐站", value: "tvboxorg" },
        { title: "XPTV 综合站", value: "xptv" },
        { title: "Tvbox1 资源站", value: "hd9211" },
        { title: "lubin776 综合站", value: "lubinzy" },
        { title: "tvurl 量子资源站", value: "tvurl" },
        { title: "每日推荐聚合站", value: "hebijunge" },
        { title: "liu673cn 影视站", value: "liu673cn" },
        { title: "maoystv 影视站", value: "maoystv" },
        { title: "HowKongFish 合并站", value: "howkongfish" }
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
              "title": "🎬 电影天堂",
              "value": "dyttzy"
            },
            {
              "title": "⚡ 非凡影视",
              "value": "ffzy"
            },
            {
              "title": "🌪️ 暴风资源",
              "value": "bfzy"
            },
            {
              "title": "🥑 量子资源",
              "value": "lzi"
            },
            {
              "title": "🐉 索尼高清",
              "value": "suoni"
            },
            {
              "title": "🦊 火狐采集",
              "value": "hhzy"
            },
            {
              "title": "☁️ 百度云资源",
              "value": "baiduyun"
            },
            {
              "title": "🚀 极速资源",
              "value": "jisu"
            },
            {
              "title": "🍶 茅台资源",
              "value": "maotai"
            },
            {
              "title": "👭 播剧影视",
              "value": "ysxq"
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
              "title": "🎬 电影",
              "value": "movie"
            },
            {
              "title": "📺 连续剧",
              "value": "tv"
            },
            {
              "title": "🎨 动漫",
              "value": "anime"
            },
            {
              "title": "🎤 综艺",
              "value": "variety"
            },
            {
              "title": "📱 短剧",
              "value": "short"
            },
            {
              "title": "🎥 纪录片",
              "value": "doc"
            },
            {
              "title": "💥 动作片",
              "value": "action"
            },
            {
              "title": "😂 喜剧片",
              "value": "comedy"
            },
            {
              "title": "🛸 科幻片",
              "value": "scifi"
            },
            {
              "title": "👻 恐怖片",
              "value": "horror"
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
      "id": "dyttzy",
      "title": "🎬 电影天堂",
      "subtitle": "电影天堂 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_dyttzy",
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
              "title": "电影片",
              "value": "1"
            },
            {
              "title": "连续剧",
              "value": "2"
            },
            {
              "title": "综艺片",
              "value": "3"
            },
            {
              "title": "动漫片",
              "value": "4"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "香港剧",
              "value": "14"
            },
            {
              "title": "韩国剧",
              "value": "15"
            },
            {
              "title": "欧美剧",
              "value": "16"
            },
            {
              "title": "记录片",
              "value": "20"
            },
            {
              "title": "台湾剧",
              "value": "21"
            },
            {
              "title": "日本剧",
              "value": "22"
            },
            {
              "title": "海外剧",
              "value": "23"
            },
            {
              "title": "泰国剧",
              "value": "24"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "港台综艺",
              "value": "26"
            },
            {
              "title": "日韩综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "国产动漫",
              "value": "29"
            },
            {
              "title": "日韩动漫",
              "value": "30"
            },
            {
              "title": "欧美动漫",
              "value": "31"
            },
            {
              "title": "港台动漫",
              "value": "32"
            },
            {
              "title": "海外动漫",
              "value": "33"
            },
            {
              "title": "伦理片",
              "value": "34"
            },
            {
              "title": "短剧",
              "value": "36"
            },
            {
              "title": "动画片",
              "value": "37"
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
      "id": "ffzy",
      "title": "⚡ 非凡影视",
      "subtitle": "非凡影视 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_ffzy",
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
              "title": "电影片",
              "value": "1"
            },
            {
              "title": "连续剧",
              "value": "2"
            },
            {
              "title": "综艺片",
              "value": "3"
            },
            {
              "title": "动漫片",
              "value": "4"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "香港剧",
              "value": "14"
            },
            {
              "title": "韩国剧",
              "value": "15"
            },
            {
              "title": "欧美剧",
              "value": "16"
            },
            {
              "title": "记录片",
              "value": "20"
            },
            {
              "title": "台湾剧",
              "value": "21"
            },
            {
              "title": "日本剧",
              "value": "22"
            },
            {
              "title": "海外剧",
              "value": "23"
            },
            {
              "title": "泰国剧",
              "value": "24"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "港台综艺",
              "value": "26"
            },
            {
              "title": "日韩综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "国产动漫",
              "value": "29"
            },
            {
              "title": "日韩动漫",
              "value": "30"
            },
            {
              "title": "欧美动漫",
              "value": "31"
            },
            {
              "title": "港台动漫",
              "value": "32"
            },
            {
              "title": "海外动漫",
              "value": "33"
            },
            {
              "title": "伦理片",
              "value": "34"
            },
            {
              "title": "短剧",
              "value": "36"
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
      "id": "bfzy",
      "title": "🌪️ 暴风资源",
      "subtitle": "暴风资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_bfzy",
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
              "title": "电影片",
              "value": "20"
            },
            {
              "title": "动作片",
              "value": "21"
            },
            {
              "title": "喜剧片",
              "value": "22"
            },
            {
              "title": "恐怖片",
              "value": "23"
            },
            {
              "title": "科幻片",
              "value": "24"
            },
            {
              "title": "爱情片",
              "value": "25"
            },
            {
              "title": "剧情片",
              "value": "26"
            },
            {
              "title": "战争片",
              "value": "27"
            },
            {
              "title": "纪录片",
              "value": "28"
            },
            {
              "title": "理论片",
              "value": "29"
            },
            {
              "title": "连续剧",
              "value": "30"
            },
            {
              "title": "国产剧",
              "value": "31"
            },
            {
              "title": "欧美剧",
              "value": "32"
            },
            {
              "title": "香港剧",
              "value": "33"
            },
            {
              "title": "韩国剧",
              "value": "34"
            },
            {
              "title": "台湾剧",
              "value": "35"
            },
            {
              "title": "日本剧",
              "value": "36"
            },
            {
              "title": "海外剧",
              "value": "37"
            },
            {
              "title": "泰国剧",
              "value": "38"
            },
            {
              "title": "动漫片",
              "value": "39"
            },
            {
              "title": "国产动漫",
              "value": "40"
            },
            {
              "title": "日韩动漫",
              "value": "41"
            },
            {
              "title": "欧美动漫",
              "value": "42"
            },
            {
              "title": "港台动漫",
              "value": "43"
            },
            {
              "title": "海外动漫",
              "value": "44"
            },
            {
              "title": "综艺片",
              "value": "45"
            },
            {
              "title": "大陆综艺",
              "value": "46"
            },
            {
              "title": "港台综艺",
              "value": "47"
            },
            {
              "title": "日韩综艺",
              "value": "48"
            },
            {
              "title": "欧美综艺",
              "value": "49"
            },
            {
              "title": "动画片",
              "value": "50"
            },
            {
              "title": "电影解说",
              "value": "51"
            },
            {
              "title": "预告片",
              "value": "52"
            },
            {
              "title": "体育赛事",
              "value": "53"
            },
            {
              "title": "足球",
              "value": "54"
            },
            {
              "title": "篮球",
              "value": "55"
            },
            {
              "title": "网球",
              "value": "56"
            },
            {
              "title": "斯诺克",
              "value": "57"
            },
            {
              "title": "短剧大全",
              "value": "58"
            },
            {
              "title": "重生民国",
              "value": "59"
            },
            {
              "title": "穿越年代",
              "value": "60"
            },
            {
              "title": "现代言情",
              "value": "61"
            },
            {
              "title": "反转爽文",
              "value": "62"
            },
            {
              "title": "女恋总裁",
              "value": "63"
            },
            {
              "title": "闪婚离婚",
              "value": "64"
            },
            {
              "title": "都市脑洞",
              "value": "65"
            },
            {
              "title": "古装仙侠",
              "value": "66"
            },
            {
              "title": "福利",
              "value": "67"
            },
            {
              "title": "AI漫剧",
              "value": "68"
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
      "id": "lzi",
      "title": "🥑 量子资源",
      "subtitle": "量子资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_lzi",
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
              "title": "电影片",
              "value": "1"
            },
            {
              "title": "连续剧",
              "value": "2"
            },
            {
              "title": "综艺片",
              "value": "3"
            },
            {
              "title": "动漫片",
              "value": "4"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "香港剧",
              "value": "14"
            },
            {
              "title": "韩国剧",
              "value": "15"
            },
            {
              "title": "欧美剧",
              "value": "16"
            },
            {
              "title": "记录片",
              "value": "20"
            },
            {
              "title": "台湾剧",
              "value": "21"
            },
            {
              "title": "日本剧",
              "value": "22"
            },
            {
              "title": "海外剧",
              "value": "23"
            },
            {
              "title": "泰国剧",
              "value": "24"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "港台综艺",
              "value": "26"
            },
            {
              "title": "日韩综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "国产动漫",
              "value": "29"
            },
            {
              "title": "日韩动漫",
              "value": "30"
            },
            {
              "title": "欧美动漫",
              "value": "31"
            },
            {
              "title": "港台动漫",
              "value": "32"
            },
            {
              "title": "海外动漫",
              "value": "33"
            },
            {
              "title": "伦理片",
              "value": "34"
            },
            {
              "title": "电影解说",
              "value": "35"
            },
            {
              "title": "体育",
              "value": "36"
            },
            {
              "title": "足球",
              "value": "37"
            },
            {
              "title": "篮球",
              "value": "38"
            },
            {
              "title": "网球",
              "value": "39"
            },
            {
              "title": "斯诺克",
              "value": "40"
            },
            {
              "title": "预告片",
              "value": "45"
            },
            {
              "title": "短剧",
              "value": "46"
            },
            {
              "title": "动画片",
              "value": "49"
            },
            {
              "title": "AI漫剧",
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
      "id": "suoni",
      "title": "🐉 索尼高清",
      "subtitle": "索尼高清 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_suoni",
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
              "title": "电影",
              "value": "1"
            },
            {
              "title": "电视剧",
              "value": "2"
            },
            {
              "title": "综艺",
              "value": "3"
            },
            {
              "title": "动漫",
              "value": "4"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "欧美剧",
              "value": "14"
            },
            {
              "title": "韩剧",
              "value": "15"
            },
            {
              "title": "日剧",
              "value": "16"
            },
            {
              "title": "港剧",
              "value": "17"
            },
            {
              "title": "台剧",
              "value": "18"
            },
            {
              "title": "泰剧",
              "value": "19"
            },
            {
              "title": "纪录片",
              "value": "20"
            },
            {
              "title": "海外剧",
              "value": "23"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "日韩综艺",
              "value": "26"
            },
            {
              "title": "港台综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "国产动漫",
              "value": "29"
            },
            {
              "title": "日韩动漫",
              "value": "30"
            },
            {
              "title": "欧美动漫",
              "value": "31"
            },
            {
              "title": "动画片",
              "value": "39"
            },
            {
              "title": "港台动漫",
              "value": "44"
            },
            {
              "title": "海外动漫",
              "value": "45"
            },
            {
              "title": "演唱会",
              "value": "47"
            },
            {
              "title": "体育赛事",
              "value": "48"
            },
            {
              "title": "篮球",
              "value": "49"
            },
            {
              "title": "足球",
              "value": "50"
            },
            {
              "title": "预告片",
              "value": "51"
            },
            {
              "title": "斯诺克",
              "value": "52"
            },
            {
              "title": "影视解说",
              "value": "53"
            },
            {
              "title": "爽文短剧",
              "value": "54"
            },
            {
              "title": "伦理",
              "value": "55"
            },
            {
              "title": "港台三级",
              "value": "56"
            },
            {
              "title": "韩国伦理",
              "value": "57"
            },
            {
              "title": "西方伦理",
              "value": "58"
            },
            {
              "title": "日本伦理",
              "value": "59"
            },
            {
              "title": "两性课堂",
              "value": "60"
            },
            {
              "title": "写真热舞",
              "value": "61"
            },
            {
              "title": "4K电影",
              "value": "62"
            },
            {
              "title": "有声动漫",
              "value": "63"
            },
            {
              "title": "女频恋爱",
              "value": "64"
            },
            {
              "title": "反转爽剧",
              "value": "65"
            },
            {
              "title": "古装仙侠",
              "value": "66"
            },
            {
              "title": "年代穿越",
              "value": "67"
            },
            {
              "title": "脑洞悬疑",
              "value": "68"
            },
            {
              "title": "现代都市",
              "value": "69"
            },
            {
              "title": "邵氏电影",
              "value": "70"
            },
            {
              "title": "Netflix电影",
              "value": "71"
            },
            {
              "title": "Netflix自制剧",
              "value": "72"
            },
            {
              "title": "擦边短剧",
              "value": "73"
            },
            {
              "title": "预告解说",
              "value": "74"
            },
            {
              "title": "科普学习",
              "value": "75"
            },
            {
              "title": "漫剧",
              "value": "76"
            },
            {
              "title": "儿童儿歌",
              "value": "77"
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
      "id": "hhzy",
      "title": "🦊 火狐采集",
      "subtitle": "火狐采集 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_hhzy",
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
              "title": "电视剧",
              "value": "1"
            },
            {
              "title": "电影",
              "value": "2"
            },
            {
              "title": "欧美剧",
              "value": "3"
            },
            {
              "title": "香港剧",
              "value": "4"
            },
            {
              "title": "韩剧",
              "value": "5"
            },
            {
              "title": "日剧",
              "value": "6"
            },
            {
              "title": "马泰剧",
              "value": "7"
            },
            {
              "title": "伦理片",
              "value": "8"
            },
            {
              "title": "动作片",
              "value": "9"
            },
            {
              "title": "爱情片",
              "value": "10"
            },
            {
              "title": "喜剧片",
              "value": "11"
            },
            {
              "title": "科幻片",
              "value": "12"
            },
            {
              "title": "恐怖片",
              "value": "13"
            },
            {
              "title": "剧情片",
              "value": "14"
            },
            {
              "title": "战争片",
              "value": "15"
            },
            {
              "title": "记录片",
              "value": "16"
            },
            {
              "title": "动漫",
              "value": "17"
            },
            {
              "title": "内地剧",
              "value": "20"
            },
            {
              "title": "动画片",
              "value": "23"
            },
            {
              "title": "中国动漫",
              "value": "24"
            },
            {
              "title": "日本动漫",
              "value": "25"
            },
            {
              "title": "欧美动漫",
              "value": "26"
            },
            {
              "title": "综艺",
              "value": "27"
            },
            {
              "title": "台湾剧",
              "value": "28"
            },
            {
              "title": "大陆综艺",
              "value": "30"
            },
            {
              "title": "日韩综艺",
              "value": "31"
            },
            {
              "title": "港台综艺",
              "value": "32"
            },
            {
              "title": "欧美综艺",
              "value": "33"
            },
            {
              "title": "灾难片",
              "value": "34"
            },
            {
              "title": "悬疑片",
              "value": "35"
            },
            {
              "title": "犯罪片",
              "value": "36"
            },
            {
              "title": "奇幻片",
              "value": "37"
            },
            {
              "title": "短剧",
              "value": "38"
            },
            {
              "title": "预告片",
              "value": "39"
            },
            {
              "title": "体育赛事",
              "value": "40"
            },
            {
              "title": "足球",
              "value": "41"
            },
            {
              "title": "篮球",
              "value": "42"
            },
            {
              "title": "台球",
              "value": "43"
            },
            {
              "title": "其他赛事",
              "value": "44"
            },
            {
              "title": "古装仙侠",
              "value": "45"
            },
            {
              "title": "现代都市",
              "value": "46"
            },
            {
              "title": "穿越年代",
              "value": "47"
            },
            {
              "title": "言情总裁",
              "value": "48"
            },
            {
              "title": "重生民国",
              "value": "49"
            },
            {
              "title": "反转爽剧",
              "value": "50"
            },
            {
              "title": "脑洞悬疑",
              "value": "51"
            },
            {
              "title": "擦边短剧",
              "value": "52"
            },
            {
              "title": "AI漫剧",
              "value": "53"
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
      "id": "baiduyun",
      "title": "☁️ 百度云资源",
      "subtitle": "百度云资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_baiduyun",
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
              "title": "电影",
              "value": "1"
            },
            {
              "title": "电视剧",
              "value": "2"
            },
            {
              "title": "综艺",
              "value": "3"
            },
            {
              "title": "动漫",
              "value": "4"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "大陆剧",
              "value": "13"
            },
            {
              "title": "欧美剧",
              "value": "14"
            },
            {
              "title": "韩剧",
              "value": "15"
            },
            {
              "title": "日剧",
              "value": "16"
            },
            {
              "title": "港澳剧",
              "value": "17"
            },
            {
              "title": "台湾剧",
              "value": "18"
            },
            {
              "title": "泰剧",
              "value": "19"
            },
            {
              "title": "纪录片",
              "value": "20"
            },
            {
              "title": "其他剧",
              "value": "23"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "日韩综艺",
              "value": "26"
            },
            {
              "title": "港台综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "国产动漫",
              "value": "29"
            },
            {
              "title": "日韩动漫",
              "value": "30"
            },
            {
              "title": "欧美动漫",
              "value": "31"
            },
            {
              "title": "动画电影",
              "value": "39"
            },
            {
              "title": "港台动漫",
              "value": "44"
            },
            {
              "title": "海外动漫",
              "value": "45"
            },
            {
              "title": "演唱会",
              "value": "47"
            },
            {
              "title": "体育赛事",
              "value": "48"
            },
            {
              "title": "篮球",
              "value": "49"
            },
            {
              "title": "足球",
              "value": "50"
            },
            {
              "title": "预告片",
              "value": "51"
            },
            {
              "title": "斯诺克",
              "value": "52"
            },
            {
              "title": "影视解说",
              "value": "53"
            },
            {
              "title": "ai短剧",
              "value": "54"
            },
            {
              "title": "伦理",
              "value": "55"
            },
            {
              "title": "港台三级",
              "value": "56"
            },
            {
              "title": "韩国伦理",
              "value": "57"
            },
            {
              "title": "西方伦理",
              "value": "58"
            },
            {
              "title": "日本伦理",
              "value": "59"
            },
            {
              "title": "两性课堂",
              "value": "60"
            },
            {
              "title": "写真热舞",
              "value": "61"
            },
            {
              "title": "4K电影",
              "value": "62"
            },
            {
              "title": "有声动漫",
              "value": "63"
            },
            {
              "title": "女频恋爱",
              "value": "64"
            },
            {
              "title": "反转爽剧",
              "value": "65"
            },
            {
              "title": "古装仙侠",
              "value": "66"
            },
            {
              "title": "年代穿越",
              "value": "67"
            },
            {
              "title": "脑洞悬疑",
              "value": "68"
            },
            {
              "title": "现代都市",
              "value": "69"
            },
            {
              "title": "邵氏电影",
              "value": "70"
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
      "id": "jisu",
      "title": "🚀 极速资源",
      "subtitle": "极速资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_jisu",
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
              "title": "电视剧",
              "value": "1"
            },
            {
              "title": "电影",
              "value": "2"
            },
            {
              "title": "欧美剧",
              "value": "3"
            },
            {
              "title": "香港剧",
              "value": "4"
            },
            {
              "title": "韩剧",
              "value": "5"
            },
            {
              "title": "日剧",
              "value": "6"
            },
            {
              "title": "马泰剧",
              "value": "7"
            },
            {
              "title": "伦理片",
              "value": "8"
            },
            {
              "title": "动作片",
              "value": "9"
            },
            {
              "title": "爱情片",
              "value": "10"
            },
            {
              "title": "喜剧片",
              "value": "11"
            },
            {
              "title": "科幻片",
              "value": "12"
            },
            {
              "title": "恐怖片",
              "value": "13"
            },
            {
              "title": "剧情片",
              "value": "14"
            },
            {
              "title": "战争片",
              "value": "15"
            },
            {
              "title": "记录片",
              "value": "16"
            },
            {
              "title": "动漫",
              "value": "17"
            },
            {
              "title": "内地剧",
              "value": "20"
            },
            {
              "title": "动画片",
              "value": "23"
            },
            {
              "title": "中国动漫",
              "value": "24"
            },
            {
              "title": "日本动漫",
              "value": "25"
            },
            {
              "title": "欧美动漫",
              "value": "26"
            },
            {
              "title": "综艺",
              "value": "27"
            },
            {
              "title": "台湾剧",
              "value": "28"
            },
            {
              "title": "体育赛事",
              "value": "29"
            },
            {
              "title": "大陆综艺",
              "value": "30"
            },
            {
              "title": "日韩综艺",
              "value": "31"
            },
            {
              "title": "港台综艺",
              "value": "32"
            },
            {
              "title": "欧美综艺",
              "value": "33"
            },
            {
              "title": "灾难片",
              "value": "34"
            },
            {
              "title": "悬疑片",
              "value": "35"
            },
            {
              "title": "犯罪片",
              "value": "36"
            },
            {
              "title": "奇幻片",
              "value": "37"
            },
            {
              "title": "短剧",
              "value": "38"
            },
            {
              "title": "预告片",
              "value": "39"
            },
            {
              "title": "足球",
              "value": "40"
            },
            {
              "title": "篮球",
              "value": "41"
            },
            {
              "title": "台球",
              "value": "42"
            },
            {
              "title": "其他赛事",
              "value": "43"
            },
            {
              "title": "古装仙侠",
              "value": "45"
            },
            {
              "title": "现代都市",
              "value": "46"
            },
            {
              "title": "穿越年代",
              "value": "47"
            },
            {
              "title": "言情总裁",
              "value": "48"
            },
            {
              "title": "重生民国",
              "value": "49"
            },
            {
              "title": "反转爽剧",
              "value": "50"
            },
            {
              "title": "脑洞悬疑",
              "value": "52"
            },
            {
              "title": "擦边短剧",
              "value": "53"
            },
            {
              "title": "AI漫剧",
              "value": "54"
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
      "id": "maotai",
      "title": "🍶 茅台资源",
      "subtitle": "茅台资源 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_maotai",
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
              "title": "电影",
              "value": "1"
            },
            {
              "title": "连续剧",
              "value": "2"
            },
            {
              "title": "综艺片",
              "value": "3"
            },
            {
              "title": "动漫",
              "value": "4"
            },
            {
              "title": "纪录片",
              "value": "5"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "爱情片",
              "value": "7"
            },
            {
              "title": "喜剧片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "香港剧",
              "value": "14"
            },
            {
              "title": "欧美剧",
              "value": "15"
            },
            {
              "title": "韩剧",
              "value": "16"
            },
            {
              "title": "动漫电影",
              "value": "20"
            },
            {
              "title": "泰国剧",
              "value": "21"
            },
            {
              "title": "日本剧",
              "value": "22"
            },
            {
              "title": "台湾剧",
              "value": "23"
            },
            {
              "title": "海外剧",
              "value": "24"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "日韩综艺",
              "value": "26"
            },
            {
              "title": "港台综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "演唱会",
              "value": "29"
            },
            {
              "title": "国产动漫",
              "value": "30"
            },
            {
              "title": "日本动漫",
              "value": "31"
            },
            {
              "title": "欧美动漫",
              "value": "32"
            },
            {
              "title": "海外动漫",
              "value": "33"
            },
            {
              "title": "伦理片",
              "value": "34"
            },
            {
              "title": "新闻资讯",
              "value": "35"
            },
            {
              "title": "体育赛事",
              "value": "36"
            },
            {
              "title": "短剧大全",
              "value": "37"
            },
            {
              "title": "篮球",
              "value": "38"
            },
            {
              "title": "足球",
              "value": "39"
            },
            {
              "title": "网球",
              "value": "40"
            },
            {
              "title": "斯诺克",
              "value": "41"
            },
            {
              "title": "LPL",
              "value": "42"
            },
            {
              "title": "重生民国",
              "value": "43"
            },
            {
              "title": "穿越现代",
              "value": "44"
            },
            {
              "title": "反转爽剧",
              "value": "45"
            },
            {
              "title": "言情总裁",
              "value": "46"
            },
            {
              "title": "现代都市",
              "value": "47"
            },
            {
              "title": "古装仙侠",
              "value": "48"
            },
            {
              "title": "悬疑烧脑",
              "value": "49"
            },
            {
              "title": "惊悚片",
              "value": "50"
            },
            {
              "title": "电影资讯",
              "value": "51"
            },
            {
              "title": "娱乐新闻",
              "value": "52"
            },
            {
              "title": "预告片",
              "value": "53"
            },
            {
              "title": "AI短剧",
              "value": "54"
            },
            {
              "title": "擦边短剧",
              "value": "55"
            },
            {
              "title": "AI动漫",
              "value": "56"
            },
            {
              "title": "记录片",
              "value": "57"
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
      "id": "ysxq",
      "title": "👭 播剧影视",
      "subtitle": "播剧影视 · 真实分类浏览与更新时段筛选",
      "functionName": "loadSite_ysxq",
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
              "title": "电影",
              "value": "1"
            },
            {
              "title": "连续剧",
              "value": "2"
            },
            {
              "title": "综艺",
              "value": "3"
            },
            {
              "title": "动漫",
              "value": "4"
            },
            {
              "title": "B站",
              "value": "5"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "港台剧",
              "value": "14"
            },
            {
              "title": "日韩剧",
              "value": "15"
            },
            {
              "title": "欧美剧",
              "value": "16"
            },
            {
              "title": "惊悚片",
              "value": "20"
            },
            {
              "title": "奇幻片",
              "value": "21"
            },
            {
              "title": "文艺片",
              "value": "22"
            },
            {
              "title": "悬疑片",
              "value": "23"
            },
            {
              "title": "纪录片",
              "value": "24"
            },
            {
              "title": "犯罪片",
              "value": "25"
            },
            {
              "title": "动画片",
              "value": "26"
            },
            {
              "title": "伦理片",
              "value": "27"
            },
            {
              "title": "其他片",
              "value": "28"
            },
            {
              "title": "泰国剧",
              "value": "29"
            },
            {
              "title": "国内综艺",
              "value": "30"
            },
            {
              "title": "日韩综艺",
              "value": "31"
            },
            {
              "title": "欧美综艺",
              "value": "32"
            },
            {
              "title": "大陆动漫",
              "value": "33"
            },
            {
              "title": "日韩动漫",
              "value": "34"
            },
            {
              "title": "欧美动漫",
              "value": "35"
            },
            {
              "title": "BiLiBiLi",
              "value": "37"
            },
            {
              "title": "新加坡",
              "value": "38"
            },
            {
              "title": "港台综艺",
              "value": "39"
            },
            {
              "title": "歌舞片",
              "value": "40"
            },
            {
              "title": "演唱会",
              "value": "41"
            },
            {
              "title": "古装片",
              "value": "42"
            },
            {
              "title": "历史片",
              "value": "43"
            },
            {
              "title": "冒险片",
              "value": "44"
            },
            {
              "title": "体育赛事",
              "value": "45"
            },
            {
              "title": "青春片",
              "value": "46"
            },
            {
              "title": "灾难片",
              "value": "47"
            },
            {
              "title": "经典片",
              "value": "48"
            },
            {
              "title": "其他动漫",
              "value": "49"
            },
            {
              "title": "其他剧",
              "value": "50"
            },
            {
              "title": "西部片",
              "value": "51"
            },
            {
              "title": "番剧",
              "value": "52"
            },
            {
              "title": "直播",
              "value": "53"
            },
            {
              "title": "港台动漫",
              "value": "54"
            },
            {
              "title": "海外综艺",
              "value": "55"
            },
            {
              "title": "足球",
              "value": "56"
            },
            {
              "title": "篮球",
              "value": "57"
            },
            {
              "title": "网球",
              "value": "58"
            },
            {
              "title": "海外剧",
              "value": "59"
            },
            {
              "title": "短剧",
              "value": "60"
            },
            {
              "title": "番剧",
              "value": "61"
            },
            {
              "title": "少儿片",
              "value": "62"
            },
            {
              "title": "斯诺克",
              "value": "63"
            },
            {
              "title": "预告片",
              "value": "65"
            },
            {
              "title": "电影解说",
              "value": "66"
            },
            {
              "title": "网络电影",
              "value": "67"
            },
            {
              "title": "新马泰动漫",
              "value": "68"
            },
            {
              "title": "重生民国",
              "value": "69"
            },
            {
              "title": "穿越年代",
              "value": "70"
            },
            {
              "title": "现代都市",
              "value": "71"
            },
            {
              "title": "反转爽文",
              "value": "72"
            },
            {
              "title": "女恋总裁",
              "value": "73"
            },
            {
              "title": "闪婚离婚",
              "value": "74"
            },
            {
              "title": "脑洞悬疑",
              "value": "75"
            },
            {
              "title": "古装仙侠",
              "value": "76"
            },
            {
              "title": "电视直播",
              "value": "77"
            },
            {
              "title": "电影轮播",
              "value": "78"
            },
            {
              "title": "电视剧轮播",
              "value": "79"
            },
            {
              "title": "海外频道",
              "value": "80"
            },
            {
              "title": "动漫频道",
              "value": "81"
            },
            {
              "title": "熊猫频道",
              "value": "82"
            },
            {
              "title": "体育频道",
              "value": "83"
            },
            {
              "title": "国内频道",
              "value": "84"
            },
            {
              "title": "武侠片",
              "value": "85"
            },
            {
              "title": "4K电影",
              "value": "86"
            },
            {
              "title": "邵氏电影",
              "value": "87"
            },
            {
              "title": "Netflix电影",
              "value": "88"
            },
            {
              "title": "Netflix自制剧",
              "value": "89"
            },
            {
              "title": "有声动漫",
              "value": "90"
            },
            {
              "title": "擦边短剧",
              "value": "91"
            },
            {
              "title": "漫剧",
              "value": "92"
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
      "id": "loadResource",
      "title": "播放资源",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 120,
      "params": []
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
  { id: "moon", title: "Moon TVBox 合并站", url: "https://raw.githubusercontent.com/heart1016/tvbox/refs/heads/main/moon_tvbox_sites_merged.json" },
  { id: "tvboxorg", title: "TVBox 官方推荐站", url: "https://raw.githubusercontent.com/TVboxorg/TVbox/main/dist/official.json" },
  { id: "xptv", title: "XPTV 综合站", url: "https://raw.githubusercontent.com/fangkuia/XPTV/main/all.json" },
  { id: "hd9211", title: "Tvbox1 资源站", url: "https://raw.githubusercontent.com/hd9211/Tvbox1/main/zy.json" },
  { id: "lubinzy", title: "lubin776 综合站", url: "https://raw.githubusercontent.com/lubin776/0/main/zy.json" },
  { id: "tvurl", title: "tvurl 量子资源站", url: "https://raw.githubusercontent.com/ne7359/tvurl/main/0825.json" },
  { id: "hebijunge", title: "每日推荐聚合站", url: "https://raw.githubusercontent.com/hebijunge/tvbox-config/main/tvbox_recommended.json" },
  { id: "liu673cn", title: "liu673cn 影视站", url: "https://raw.githubusercontent.com/liu673cn/box/main/m.json" },
  { id: "maoystv", title: "maoystv 影视站", url: "https://raw.githubusercontent.com/maoystv/6/main/tv.json" },
  { id: "howkongfish", title: "HowKongFish 合并站", url: "https://raw.githubusercontent.com/HowKongFish/tvbox-json/main/merged.json" }
];
var BUILTIN_SITES = {
  dyttzy: { key: "dyttzy", name: "电影天堂", api: "http://caiji.dyttzyapi.com/api.php/provide/vod", playUrl: "", searchable: true },
  ffzy: { key: "ffzy", name: "非凡影视", api: "http://ffzy5.tv/api.php/provide/vod", playUrl: "", searchable: true },
  bfzy: { key: "bfzy", name: "暴风资源", api: "https://bfzyapi.com/api.php/provide/vod", playUrl: "", searchable: true },
  lzi: { key: "lzi", name: "量子资源", api: "https://cj.lziapi.com/api.php/provide/vod", playUrl: "", searchable: true },
  suoni: { key: "suoni", name: "索尼高清", api: "https://suoniapi.com/api.php/provide/vod", playUrl: "", searchable: true },
  hhzy: { key: "hhzy", name: "火狐采集", api: "https://hhzyapi.com/api.php/provide/vod", playUrl: "", searchable: true },
  baiduyun: { key: "baiduyun", name: "百度云资源", api: "https://api.apibdzy.com/api.php/provide/vod", playUrl: "", searchable: true },
  jisu: { key: "jisu", name: "极速资源", api: "https://jszyapi.com/api.php/provide/vod", playUrl: "", searchable: true },
  maotai: { key: "maotai", name: "茅台资源", api: "https://caiji.maotaizy.cc/api.php/provide/vod", playUrl: "", searchable: true },
  ysxq: { key: "ysxq", name: "播剧影视", api: "https://www.ysxq.cc/api.php/provide/vod", playUrl: "", searchable: true }
};
var NSFW_HOSTS = {
  "155api.com": true, "8day.icu": true, "91av.cyou": true, "91jpzyw.com": true, "91md.me": true,
  "99zy.pw": true, "a.uezy.pw": true, "aosikazy.com": true, "aosikazy1.com": true, "aosikazy2.com": true,
  "api.11bat.com": true, "19q.cc": true, "api.apilyzy.com": true, "api.bwzyz.com": true,
  "api.bwzym3u8.com": true, "api.ddapi.cc": true, "api.douapi.cc": true, "api.heiapi.cc": true,
  "api.huosuapi.cc": true, "api.kdapi.info": true, "api.kudian70.com": true, "api.sexnguon.com": true,
  "api.sexpeach3.com": true, "api.souavzy.vip": true, "api.souavzyw.net": true, "api.suboapi.com": true,
  "api.vnzyz.com": true, "api.xiaojizy.live": true, "api.xjzyapi.com": true, "api.yikanapi.com": true,
  "api.yinwoapi.com": true, "api.ykapi.net": true, "apidanaizi.com": true, "apilj.com": true,
  "apilsbzy1.com": true, "apittzy.com": true, "apiyutu.com": true, "caiji.semaozy.net": true,
  "chujia.cc": true, "cj.apiabzy.com": true, "ckbh1.xyz": true, "ckzy.me": true, "ckzy1.com": true,
  "dj.696618.xyz": true, "fhapi9.com": true, "fqzy.me": true, "fqzy4.me": true, "gayapi.com": true,
  "heiliaozyapi.com": true, "hsckzy.vip": true, "hsckzy001.com": true, "hsckzy888.com": true,
  "jipinvip.com": true, "jkunzyapi.com": true, "json.xgbbk8.com": true, "kkzy.me": true,
  "lbapi9.com": true, "mgzyz1.com": true, "naixxzy.com": true, "naixxzy1.com": true,
  "reba.aishunxs.com": true, "sewozyapi.com": true, "shayuapi.com": true, "siwazyw.cc": true,
  "siwazyw.tv": true, "slapibf.com": true, "thzy1.me": true, "to.to-long.com": true, "vnzyz.com": true,
  "888dav.com": true, "asmr19.in": true, "caoliuzyw.com": true, "feifei67.com": true,
  "jializyzapi.com": true, "jingpinx.com": true, "saobi2.com": true, "sextaohua.com": true,
  "xiangjiaozyw.com": true, "xxibaozyw.com": true, "yeszy1.com": true, "xingba111.com": true,
  "xingba222.com": true, "xvidapi.com": true, "xxavs.com": true, "xzybb2.com": true, "yutuzy10.com": true
};
var NSFW_TEXT_RE = /🔞|18\+|成人|福利|三级片|伦理|无码|有码|色窝|淫窝|老色逼|色逼|老鸭|丝袜|麻豆|杏吧|桃花|大奶子|奶香|鸡坤|jkun|番号|草榴|香蕉|黄色仓库|湿乐园|越南|色猫|souav|sexnguon|avdb|xvid|9kg|asmr19/i;
var DISCOVER_PREFERRED_HOSTS = [
  "caiji.dyttzyapi.com", "ffzy5.tv", "bfzyapi.com", "cj.lziapi.com",
  "suoniapi.com", "hhzyapi.com", "jszyapi.com", "caiji.maotaizy.cc"
];
var GENRE_MATCHERS = {
  movie: { title: "电影", patterns: [/^电影/i, /电影片/i, /动作片/i, /喜剧片/i, /爱情片/i, /科幻片/i, /恐怖片/i, /剧情片/i] },
  tv: { title: "连续剧", patterns: [/^连续剧/i, /^剧集/i, /^电视剧/i, /国产剧/i, /香港剧/i, /韩国剧/i, /欧美剧/i, /日本剧/i, /海外剧/i] },
  anime: { title: "动漫", patterns: [/^动漫/i, /动漫/i, /动画/i] },
  variety: { title: "综艺", patterns: [/^综艺/i, /综艺/i] },
  short: { title: "短剧", patterns: [/短剧/i, /爽剧/i] },
  doc: { title: "纪录片", patterns: [/纪录/i, /记录/i] },
  action: { title: "动作片", patterns: [/动作/i] },
  comedy: { title: "喜剧片", patterns: [/喜剧/i] },
  scifi: { title: "科幻片", patterns: [/科幻/i] },
  horror: { title: "恐怖片", patterns: [/恐怖/i, /惊悚/i] }
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

async function discoverRoutes(params, sites, genreKey) {
  const pool = prioritizeSites(sites).slice(0, 14);
  if (!genreKey) {
    return pool.map(site => ({ site: site, typeId: "" }));
  }
  const cacheKey = "discover:" + String(params.preset || "") + "|" + String(params.configUrls || "") + "|" + genreKey;
  try {
    const hit = Widget.storage.get(cacheKey);
    if (hit && hit.savedAt && Date.now() - hit.savedAt < CACHE_MS && Array.isArray(hit.routes) && hit.routes.length) {
      return hit.routes;
    }
  } catch (e) { /* 缓存不可用时直接探测 */ }
  const settled = await mapPool(pool, 6, async function (site) {
    try {
      const classes = await siteClasses(site);
      const typeId = matchGenreId(classes, genreKey);
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

function mergeDiscoverCards(buckets) {
  const cards = [];
  const seen = {};
  let cursor = 0;
  for (;;) {
    let added = false;
    for (let i = 0; i < buckets.length; i++) {
      if (cursor < buckets[i].length) {
        const card = buckets[i][cursor];
        const nameKey = normalize(card.title) || card.id;
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

function loadSite_dyttzy(params) { return loadBuiltinSite("dyttzy", params); }
function loadSite_ffzy(params) { return loadBuiltinSite("ffzy", params); }
function loadSite_bfzy(params) { return loadBuiltinSite("bfzy", params); }
function loadSite_lzi(params) { return loadBuiltinSite("lzi", params); }
function loadSite_suoni(params) { return loadBuiltinSite("suoni", params); }
function loadSite_hhzy(params) { return loadBuiltinSite("hhzy", params); }
function loadSite_baiduyun(params) { return loadBuiltinSite("baiduyun", params); }
function loadSite_jisu(params) { return loadBuiltinSite("jisu", params); }
function loadSite_maotai(params) { return loadBuiltinSite("maotai", params); }
function loadSite_ysxq(params) { return loadBuiltinSite("ysxq", params); }

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
  const buckets = settled.filter(list => Array.isArray(list) && list.length);
  if (!buckets.length) {
    if (page > 1) return [];
    throw new Error("聚合源暂时没有返回数据，请切换分类或稍后重试");
  }
  return mergeDiscoverCards(buckets);
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

async function searchSiteOptions(params) {
  const sites = await enabledSites(params);
  return [{ title: "全部（最多 " + SEARCH_LIMIT + " 个）", value: "" }].concat(sites.map(site => ({
    title: site.name + " (" + site.key + ")",
    value: site.key
  })));
}

async function siteClasses(site) {
  const cacheKey = "classes:" + apiFingerprint(site.api);
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

function isNsfwSite(site) {
  const api = String(site.api || "").trim();
  const host = hostOf(api).toLowerCase().split(":")[0];
  const bareHost = host.replace(/^www\./, "");
  if (NSFW_HOSTS[host] || NSFW_HOSTS[bareHost]) return true;
  const label = String(site.key || "") + " " + String(site.name || "") + " " + api;
  return NSFW_TEXT_RE.test(label);
}

function addSite(site, allow, seen, sites) {
  if (!isJsonCms(site) || isNsfwSite(site)) return;
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
