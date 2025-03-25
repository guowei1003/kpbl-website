# Capybara Rules - 卡皮巴拉规则分享网站

一个用于分享和发现各种规则的平台，网站以卡皮巴拉作为吉祥物，提供了一个愉快的用户体验。

## 项目特点

- 🌙 支持黑暗/浅色主题切换
- 🌍 支持中文/英文国际化
- 🦫 可爱的卡皮巴拉动画图标和首页动画
- 📱 响应式设计，适配各种设备
- ⚡ 基于 Nuxt 3 的高性能SSR渲染

## 功能实现

1. **网站 Logo**：采用SVG实现的卡皮巴拉动画图形，具有简单动画效果。
2. **导航栏**：包含首页和规则页面链接，以及语言切换和主题切换功能。
3. **首页动画**：实现了卡皮巴拉在四处眺望的CSS动画效果。
4. **规则页面**：左右布局，左侧为规则标签导航，右侧为规则卡片，卡片内容包括规则、描述、点赞等信息。
5. **国际化支持**：使用@nuxtjs/i18n实现中英文切换。
6. **主题切换**：使用@nuxtjs/color-mode实现浅色和深色主题切换。

## 技术栈

- **前端框架**: Nuxt 3, Vue 3, TypeScript
- **UI组件**: TailwindCSS, naive-ui
- **状态管理**: Pinia
- **国际化**: @nuxtjs/i18n
- **数据请求**: Axios
- **Markdown渲染**: markdown-it

## 开发设置

确保安装了依赖:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## 开发服务器

在 `http://localhost:3000` 启动开发服务器:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev
```

## 生产构建

构建生产应用:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build
```

## 项目结构

```
.
├── assets/           # 静态资源（CSS、图像、SVG）
├── components/       # Vue组件
├── layouts/          # 页面布局
├── locales/          # 国际化翻译文件
├── pages/            # 页面组件
├── public/           # 公共静态文件
├── types/            # TypeScript类型定义
├── utils/            # 工具函数和API服务
├── app.vue           # 应用入口
├── nuxt.config.ts    # Nuxt配置
└── tailwind.config.js # TailwindCSS配置
```
