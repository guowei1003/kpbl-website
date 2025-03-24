export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh',
  messages: {
    zh: {
      common: {
        home: "首页",
        rules: "规则库",
        language: "语言",
        theme: {
          light: "浅色模式",
          dark: "深色模式"
        },
        copy: "复制",
        copied: "已复制",
        likes: "点赞数",
        author: "作者",
        publishTime: "发布时间",
        tags: "标签"
      },
      home: {
        heroTitle: "Capybara Rules",
        heroSubtitle: "一个分享和发现各种规则的平台",
        browseCta: "浏览规则库"
      },
      rules: {
        allRules: "所有规则",
        search: "搜索规则",
        popular: "热门规则",
        latest: "最新规则",
        noRules: "暂无规则",
        categories: "分类"
      }
    },
    en: {
      common: {
        home: "Home",
        rules: "Rules",
        language: "Language",
        theme: {
          light: "Light Mode",
          dark: "Dark Mode"
        },
        copy: "Copy",
        copied: "Copied",
        likes: "Likes",
        author: "Author",
        publishTime: "Published",
        tags: "Tags"
      },
      home: {
        heroTitle: "Capybara Rules",
        heroSubtitle: "A platform to share and discover various rules",
        browseCta: "Browse Rules"
      },
      rules: {
        allRules: "All Rules",
        search: "Search Rules",
        popular: "Popular Rules",
        latest: "Latest Rules",
        noRules: "No Rules Found",
        categories: "Categories"
      }
    }
  }
})) 