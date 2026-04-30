import type { Article } from '@/types'

export const articles: Article[] = [
  {
    id: 1,
    title: 'CSS 容器查询：响应式设计的新范式',
    tag: '前端技术',
    date: '2026-04-28',
    readTime: '8 分钟',
    cover: 'cover-1',
    emoji: '🎨',
    excerpt:
      '容器查询让组件可以根据自身容器的尺寸来调整样式，彻底改变了传统媒体查询的响应式设计方式...',
    content: `
      <p>长期以来，响应式设计主要依赖媒体查询（Media Queries），根据视口宽度来调整布局。但这种方式有一个根本性问题：它无法让组件真正"感知"自己所处的容器大小。</p>

      <h3>容器查询的基本语法</h3>
      <p>容器查询的核心是 <code>@container</code> 规则，它允许我们根据祖先容器（而不是视口）的尺寸来应用样式：</p>
      <pre><code>.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }
}

@container card (max-width: 399px) {
  .card { flex-direction: column; }
}</code></pre>

      <h3>为什么这很重要？</h3>
      <p>想象一个场景：你的卡片组件同时出现在侧边栏和主内容区。侧边栏宽度只有 300px，而主内容区有 800px。使用媒体查询，你无法让同一组件在两个位置都呈现最佳布局。</p>

      <blockquote>容器查询让组件真正做到了"自适应"，而不仅仅是"响应式"。</blockquote>

      <h3>浏览器兼容性</h3>
      <p>截至 2026 年，所有主流浏览器都已完整支持容器查询，可以放心在项目中使用。对于需要兼容旧浏览器的场景，可以使用 PostCSS 插件进行降级处理。</p>

      <p>容器查询是 CSS 近年来最重要的特性之一，它代表了组件化开发的新方向。掌握它，将让你的代码更加优雅和可维护。</p>
    `
  },
  {
    id: 2,
    title: '用 Three.js 打造沉浸式 3D 网页体验',
    tag: '3D 开发',
    date: '2026-04-20',
    readTime: '12 分钟',
    cover: 'cover-2',
    emoji: '🌐',
    excerpt:
      '从场景搭建到光照设置，从模型加载到交互控制，手把手教你用 Three.js 创建令人惊叹的 3D 网页效果...',
    content: `
      <p>Three.js 是目前最流行的 WebGL 3D 库，它让浏览器中的 3D 开发变得简单而有趣。本文将带你从零开始，构建一个完整的 3D 场景。</p>

      <h3>场景、相机与渲染器</h3>
      <p>Three.js 的三大基础元素：Scene（场景）、Camera（相机）和 Renderer（渲染器）。场景是所有 3D 对象的容器，相机决定了观察视角，渲染器负责将场景绘制到画布上：</p>
      <pre><code>const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);</code></pre>

      <h3>光照与材质</h3>
      <p>没有光照的世界是暗淡的。Three.js 提供了多种光源类型，环境光（AmbientLight）提供基础照明，平行光（DirectionalLight）模拟太阳，点光源（PointLight）模拟灯泡：</p>

      <blockquote>好的光照是 3D 场景成败的关键。建议从简单的三点布光开始练习。</blockquote>

      <p>掌握了这些基础后，你就可以开始创建各种精彩的 3D 网页体验了。从产品展示到游戏，从数据可视化到艺术装置，Three.js 的可能性是无限的。</p>
    `
  },
  {
    id: 3,
    title: 'AI 辅助编程：从工具到工作流的进化',
    tag: 'AI 探索',
    date: '2026-04-15',
    readTime: '10 分钟',
    cover: 'cover-3',
    emoji: '🤖',
    excerpt:
      'AI 编程助手已经从简单的代码补全进化到能够理解项目上下文、生成完整功能模块的智能伙伴...',
    content: `
      <p>回顾 AI 辅助编程的发展历程，我们正在经历一场编程范式的深刻变革。从早期的语法高亮和代码片段，到如今的 AI 对话式编程，工具的智能程度在指数级提升。</p>

      <h3>当前 AI 编程能力的边界</h3>
      <p>现代 AI 编程助手已经能够：</p>
      <ul>
        <li>理解整个项目的代码上下文和架构</li>
        <li>根据自然语言描述生成完整的功能模块</li>
        <li>自动发现并修复潜在的 Bug</li>
        <li>编写和执行测试用例</li>
        <li>优化代码性能和可读性</li>
      </ul>

      <h3>如何建立高效的 AI 协作工作流</h3>
      <p>关键不在于让 AI 写所有代码，而在于建立合理的分工。我的建议是：</p>
      <blockquote>让 AI 处理重复性工作和初稿生成，让人类专注于架构决策、用户体验和业务逻辑。</blockquote>

      <p>AI 不会取代程序员，但善用 AI 的程序员会取代不用 AI 的程序员。拥抱变化，持续学习，才能在这场技术浪潮中保持竞争力。</p>
    `
  },
  {
    id: 4,
    title: '现代 CSS 动画技巧完全指南',
    tag: '前端技术',
    date: '2026-04-08',
    readTime: '15 分钟',
    cover: 'cover-4',
    emoji: '✨',
    excerpt:
      '深入理解 CSS 动画的底层原理，掌握 keyframes、transition、scroll-driven 等动画技术...',
    content: `
      <p>CSS 动画是前端开发中最具表现力的技术之一。一个好的动画能让页面从"能用"变成"好用"，从"好看"变成"惊艳"。</p>

      <h3>Transition vs Animation</h3>
      <p><code>transition</code> 适合简单的状态切换动画，而 <code>@keyframes animation</code> 适合复杂的多步骤动画。理解两者的区别和适用场景是基本功：</p>
      <pre><code>/* Transition: 从 A 状态到 B 状态 */
.button { transition: transform 0.3s ease; }
.button:hover { transform: scale(1.05); }

/* Animation: 多步骤复杂动画 */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.element { animation: bounce 2s infinite; }</code></pre>

      <h3>性能优化要点</h3>
      <p>动画的性能关键在于：只动画 <code>transform</code> 和 <code>opacity</code> 属性。这两个属性的变化由 GPU 加速处理，不会触发昂贵的重排（reflow）和重绘（repaint）。</p>

      <blockquote>60fps 是流畅动画的标准。每帧只有 16.6ms 的时间，务必善待每一毫秒。</blockquote>

      <p>掌握了这些技巧，你就能在项目中创建丝滑流畅、令人印象深刻的动画效果了。</p>
    `
  },
  {
    id: 5,
    title: '从零搭建个人知识管理系统',
    tag: '效率工具',
    date: '2026-04-01',
    readTime: '9 分钟',
    cover: 'cover-5',
    emoji: '📝',
    excerpt:
      '介绍如何用 Obsidian + Git 搭建一套属于自己的知识管理体系，实现知识的沉淀、关联与检索...',
    content: `
      <p>信息爆炸的时代，知识管理能力就是核心竞争力。一个好的知识管理系统，应该像第二大脑一样，帮你存储、组织和调用知识。</p>

      <h3>为什么选择 Obsidian？</h3>
      <p>Obsidian 是一款基于 Markdown 的本地知识管理工具，它的核心优势在于：</p>
      <ul>
        <li>数据完全本地化，隐私有保障</li>
        <li>双向链接功能，构建知识网络</li>
        <li>丰富的插件生态，可高度定制</li>
        <li>纯文本格式，永不锁定</li>
      </ul>

      <h3>我的知识管理方法论</h3>
      <p>我采用"输入 → 加工 → 输出"的三步流程。输入阶段快速记录灵感，加工阶段用双向链接建立关联，输出阶段通过博客和分享来巩固知识。</p>

      <blockquote>知识不是囤积出来的，而是流动出来的。写博客、做分享，是检验知识掌握程度最好的方式。</blockquote>

      <p>建立一套适合自己的知识管理系统，是投资回报率最高的事情之一。</p>
    `
  },
  {
    id: 6,
    title: 'Node.js 服务端渲染实战：Next.js 深度解析',
    tag: '全栈开发',
    date: '2026-03-25',
    readTime: '14 分钟',
    cover: 'cover-6',
    emoji: '⚡',
    excerpt:
      '深入分析 Next.js 的 SSR、SSG、ISR 等渲染策略，结合实际项目场景选择最优方案...',
    content: `
      <p>Next.js 已经成为 React 生态中最流行的全栈框架，它的多种渲染策略让开发者可以根据不同场景选择最佳方案。</p>

      <h3>四种渲染策略对比</h3>
      <ul>
        <li><strong>CSR（客户端渲染）</strong>：页面在浏览器中动态渲染，适合高度交互的页面</li>
        <li><strong>SSR（服务端渲染）</strong>：每次请求时在服务器生成 HTML，适合动态内容</li>
        <li><strong>SSG（静态生成）</strong>：构建时生成静态页面，性能最佳</li>
        <li><strong>ISR（增量静态再生）</strong>：SSG 的升级版，按需更新静态页面</li>
      </ul>

      <h3>如何选择？</h3>
      <p>一个简单的决策标准：内容是否频繁变化？如果是，用 SSR 或 ISR；如果否，用 SSG。对于用户个性化内容，考虑 CSR 或混合策略。</p>

      <blockquote>没有最好的渲染策略，只有最适合当前场景的方案。理解每种策略的优劣，才能做出正确的选择。</blockquote>

      <p>Next.js 的强大不仅在于渲染策略的多样性，更在于它让复杂的全栈开发变得简单优雅。</p>
    `
  }
]
