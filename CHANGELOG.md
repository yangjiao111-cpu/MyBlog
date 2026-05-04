# 博客开发日志

## 2026-04-30

### 项目初始化
- 使用 Vite 8 + Vue 3.5 + TypeScript 脚手架搭建
- 安装 vue-router@4 依赖

### 组件拆分
- NavBar：导航栏，含毛玻璃效果和移动端汉堡菜单
- ThemeToggle：深浅主题切换按钮
- HeroSection：首页 Hero 区 + ParticleBackground 粒子动效
- ScrollHint：向下滚动引导提示
- ArticleCard：文章卡片
- ArticleGrid：文章列表网格
- ArticleDetail：文章详情页（含代码高亮、引用样式）
- AboutSection：关于我页面（技能标签 + 时间线）
- AppFooter：页脚社交链接
- BackToTop：回到顶部按钮

### Composables
- useTheme：主题切换与持久化
- useScrollAnimation：元素的滚动渐入动画（IntersectionObserver）
- useBackToTop：回到顶部显隐控制

### 样式
- variables.css：CSS 变量（深色/浅色双主题配色）
- reset.css：全局重置
- animations.css：公共动画关键帧
- 组件全部使用 scoped 样式，类名 BEM 命名

### 基础设施
- @ 路径别名配置
- Vue Router 单页路由
- 响应式布局适配手机/平板/桌面

### Git 提交记录
- **Commit**: `3cffa0e`
- **Message**: `feat: 初始化个人博客项目`
- **远程仓库**: `origin/master` → `https://github.com/yangjiao111-cpu/MyBlog.git`
- **文件数**: 40 个文件新增
- **内容**: Vite 8 + Vue 3.5 + TypeScript 项目首次提交，含11个Vue组件、3个composables、Vue Router路由、公共样式、6篇示例文章、双主题切换、响应式布局及动效交互

### 品牌名修改 & 头像更新
- 博客名称 "星辰" → "星源"（共 4 处：index.html、NavBar、AboutSection、AppFooter）
- 头像替换：将 emoji 头像 "👨‍💻" 替换为本地图片 `src/assets/喵帕斯.jpg`，使用 `object-fit: cover` 圆角裁剪展示

### 二次元语录 API 接入
- 创建 `src/utils/http.ts`：封装基于 fetch 的通用 HTTP 工具（支持超时、GET/POST、错误处理）
- 创建 `src/apis/index.ts`：对接一言 `v1.hitokoto.cn` API，定义 `getHitokoto()` 接口函数
- HeroSection.vue：清除 `hero__desc` 硬编码文字，改为 `onMounted` 时调用 API 获取随机二次元语录并动态渲染

### 更换语录 API
- 接口从 `v1.hitokoto.cn`（~0.8s）更换为 `api.btstu.cn/yan`（~0.09s），响应速度提升约 9 倍
- 更新 `apis/index.ts` 接口地址和类型定义

### 界面修复
- 修复 scroll-hint 水平居中：改为 `left: 0; right: 0; margin: 0 auto; width: fit-content;` 确保绝对定位元素水平居中
- 恢复 `bottom: 32px` 位置
- 移除全局主题切换过渡效果

### Git 提交记录
- **Commit**: `bd4ee6f`
- **Message**: `feat: 接入二次元语录 API + 品牌名更新 + 头像替换`
- **文件变更**: 9 个文件，144 行新增，15 行删除

### Git 提交记录
- **Commit**: `d657ab5`
- **Message**: `chore: 切换语录 API 并优化加载体验`
- **内容**: API 切换为 Ecylt 接口，LocalStorage 缓存 + 默认文案优化，逻辑拆分

### Git 提交记录
- **Commit**: `4d6a89b`
- **Message**: `feat: 文章列表改为列表布局 + 封面图支持 + 细节优化`
- **内容**: 卡片网格→列表布局，封面图 object-fit 保持比例，新增 views/likes 字段，清理脚手架图标

### Git 提交记录
- **Commit**: `37050fe`
- **Message**: `feat: 文章列表改为扁平化线条分隔布局`
- **内容**: 去掉卡片容器，border-bottom 分隔，左侧文字+右侧封面图，移除 views/likes，标签移至时间右侧

### Git 提交记录
- **Commit**: `6803145`
- **Message**: `feat: 底部模块改造 - SVG 图标 + open in new tab + 品牌色`
- **内容**: 本地 SVG 矢量图标（品牌色），target="_blank" 新窗口打开，图标 20x20，清理旧文件

## 2026-05-03

### Git 提交记录
- **Commit**: `0b38a22`
- **Message**: `feat: 导航栏滚动感知 + 闪烁星星 Logo`
- **内容**: NavBar 滚动时透明→毛玻璃效果，左侧星星 SVG 图标+闪烁动画，链接 hover 下划线

### Git 提交记录
- **Commit**: `8f1dc13`
- **Message**: `feat: GitHub图标深色模式适配 + Hero按钮微调`
- **内容**:
  - 新增白色版 GitHub SVG 图标 (`github-white.svg`)
  - AppFooter 使用 MutationObserver 监听 `data-theme` 属性变化，深色模式自动切换白色图标
  - HeroSection 按钮文字去除箭头

### 主题切换动画优化（对标 Element Plus）

- `useTheme.ts`：新增 `toggleThemeWithTransition()`，基于 **View Transitions API + Web Animations API** 实现圆形展开过渡
  - 从按钮点击位置 `circle(0)` → `circle(maxRadius)` 从小到大扩散覆盖全屏
  - 双向切换统一为裁剪 `::view-transition-new(root)` 层，彻底消除闪烁
  - 不支持 VT 的浏览器降级为 CSS 全局颜色渐变过渡
  - `isVTActive` 标志位 + `watchEffect` 条件跳过，避免 VT 期间响应式冲突
- `variables.css`：新增 VT 伪元素样式规则
  - `animation: none` 禁用浏览器默认淡入淡出
  - `z-index` 控制 old/new 层叠顺序（new 层 z-index: 2147483646）
  - `html` 和通用选择器添加 `transition` 作为降级兜底
- `ThemeToggle.vue`：点击事件从 `toggleTheme` 改为 `toggleThemeWithTransition`

### Git 提交记录
- **Commit**: `b3a3efe`
- **Message**: `feat: 主题切换圆形展开动画（View Transitions API）`
- **内容**: useTheme 新增 VT 圆形过渡，variables.css 新增伪元素样式，ThemeToggle 绑定新切换函数

## 2026-05-04

### Git 提交记录
- **Commit**: `0613102`
- **Message**: `feat: 文章链接改为新标签页打开`
- **内容**: NavBar 文章链接改为 `target=_blank` 新标签页打开首页；ArticleCard 点击文章在新标签页打开详情页（`?id=xxx`）

### 独立文章列表页 & 文章详情页

- **ArticlesView.vue**：新增独立文章列表页（路由 `/articles`）
  - 无限滚动加载，每次 10 篇，下滑自动触发
  - 到底显示"已经到底了"提示，加载中显示脉冲动画
  - 点击文章新标签页打开详情
- **ArticleDetailView.vue**：新增独立文章详情页（路由 `/article/:id`）
  - 去掉顶部 Hero 区域，更简洁的阅读体验
  - 返回按钮：新窗口关闭 / 路由回退自适应
  - 硬编码 fallbackArticle 备用数据 + try-catch 兜底
- **NavBar.vue**：文章链接改用 `window.open()` 新窗口打开
- **ArticleCard.vue**：点击改用 `window.open()` 新标签页打开详情
- **router/index.ts**：新增 `/articles` 和 `/article/:id` 两条独立路由

### Bug 修复：`.anim` 元素时序竞态导致页面空白
- **问题**：全局 `.anim` 类初始 `opacity: 0`，需 IntersectionObserver 加 `.visible` 才显示。但文章数据异步加载（setTimeout/nextTick），Observer 初始化时 DOM 中尚无 `.anim` 元素，导致元素渲染后永远透明
- **方案**：在数据赋值后使用 `nextTick()` 等 DOM 更新完毕，手动给新生成的 `.anim` 元素添加 `.visible` 类

### Git 提交记录
- **Commit**: `3bd9d2f`
- **Message**: `feat: 新增独立文章列表页和文章详情页`
- **文件变更**: 8 个文件变更，595 行新增，62 行删除

### 最新文章模块布局改造（左文右图分栏）

- **HomeView.vue**：首页文章展示从全部改为 3 条（`slice(0, 3)`）
- **ArticleGrid.vue**：从居中单栏列表改为左右分栏布局
  - 左侧：3 条文章列表 + "查看全部文章"入口（跳转 `/articles`）
  - 右侧：珂朵莉竖图卡片（sticky 定位、圆角阴影、无边框）
  - 移动端 ≤860px 自动隐藏右侧卡片，列表居中显示
- **ArticleCard.vue**：
  - 首条文章突出显示：浅色背景 + accent 色条 + 阴影圆角卡片
  - 标题顶部间距 20px，标题字号稍大
  - 摘要从 2 行截断改为 1 行截断
- **类型 & 数据**：彻底移除 `cover` / `coverImg` 字段及相关代码
- **资源**：新增 `珂朵莉.webp` 等图片资源

### Git 提交记录
- **Commit**: `255328b`
- **Message**: `feat: 最新文章模块布局改造（左文右图分栏）`
- **文件变更**: 11 个文件变更，140 行新增，75 行删除

### 文章列表页 Banner + 波浪动画 + 响应式宽屏图片

- **ArticlesView.vue**：全面改造文章列表页视觉体验
  - **顶部全宽 Banner 大图**：浅色主题=宫园薰.jpg，深色主题=七海千秋.jpg
  - **多层视差波浪动画**：Butterfly/Firefly 经典方案，4 层 SVG `<use>` 不同速度/透明度
  - **主题自动响应**：MutationObserver 监听 `data-theme` 变化，Banner 图实时切换
  - **宽屏响应式图片**：`<picture>` + `media="(min-width: 1024px)"` 断点，宽屏自动加载 宫园薰宽屏.jpg / 七海千秋宽屏.png
  - **深色主题宽屏 y 轴居中**：`object-position: center center` 单独覆盖，浅色保持顶部对齐
- **资源更新**：宫园薰.jpg（1.5MB 高清）、七海千秋.jpg、七海千秋宽屏.png（4.5MB）、宫园薰宽屏.jpg（6.8MB）
- **删除旧资源**：宫园薰.avif、七海千秋.webp

### Git 提交记录
- **Commit**: `ef5d990`
- **Message**: `feat: 文章列表页Banner+波浪动画+响应式宽屏图片`
- **文件变更**: 7 个文件变更，175 行新增，8 行删除

## 2026-05-05

### Git 提交记录
- **Commit**: `e3f61ce`
- **Message**: `feat(navbar): 增加 transparent prop 控制背景透明度`
- **内容**:
  - NavBar 新增 `transparent` prop，默认 `false`
  - `transparent=true` 时未滚动状态背景透明 + 白色文字（适配深色 Banner 大图）
  - 滚动后统一加毛玻璃背景，保证可读性
  - `App.vue` 通过 `useRoute` 判断当前路由，`/articles` 页面传入 `transparent`
  - 修复主页浅色主题下导航栏文字看不清的问题

### 导航栏优化与交互修复

- **NavBar.vue**：
  - **Banner 区域文字可读性优化**：未滚动状态下导航栏文字/Logo/汉堡菜单改为白色并添加 `text-shadow`，确保在任意 Banner 大图背景上清晰可读；滚动后恢复正常主题色
  - **移除"关于"入口**：导航栏和移动端弹窗中均删除"关于"链接
  - **点击弹窗外自动关闭**：添加 `document` 全局点击监听，点击导航栏外部区域时自动关闭移动端菜单弹窗
  - **文章跳转改为本标签页**：`window.open` → `router.push('/articles')`

### 文章跳转方式统一

- **ArticleCard.vue**：文章点击从 `window.open('_blank')` 改为 `router.push`，在本标签页内打开详情
- **ArticleGrid.vue**："查看全部文章"从 `window.open` 改为 `router.push`
- **ArticlesView.vue**：文章列表点击从 `window.open` 改为 `router.push`

### 深色模式波浪颜色层次优化

- **ArticlesView.vue**：深色模式下波浪不再是纯黑一片，4 层波浪分别使用不同颜色制造层次感
  - 第 1 层（最上层）：`var(--surface-hover)` `#2a2a38`
  - 第 2 层：`var(--surface)` `#22222e`
  - 第 3 层：`var(--bg-secondary)` `#1a1a24`
  - 第 4 层（最底层）：保持 `var(--bg)`，确保与页面背景无缝衔接
  - 浅色模式下波浪颜色不变（全部 `var(--bg)`）
