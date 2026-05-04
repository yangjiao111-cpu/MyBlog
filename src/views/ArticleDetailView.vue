<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Article } from '@/types'
import { articles } from '@/data/articles'
import { useScrollAnimation } from '@/composables'

useScrollAnimation()

const route = useRoute()
const router = useRouter()

// 硬编码备用数据，确保页面一定有内容可渲染
const fallbackArticle: Article = {
  id: 0,
  title: 'Vue 3 Composition API 完全指南',
  tag: '前端技术',
  date: '2026-05-04',
  readTime: '10 分钟',
  cover: 'cover-fallback',
  emoji: '🚀',
  excerpt: '深入理解 Vue 3 Composition API 的设计思想与使用技巧，从 setup 到 composables，带你掌握现代 Vue 开发方式。',
  content: `
    <p>Vue 3 的 Composition API 是一个革命性的更新，它提供了更灵活的代码组织方式，让逻辑复用变得前所未有的简单。</p>

    <h3>为什么需要 Composition API？</h3>
    <p>在 Vue 2 的 Options API 中，我们按照 <code>data</code>、<code>methods</code>、<code>computed</code> 等选项来组织代码。当组件变得复杂时，相关逻辑会被分散在不同的选项中，阅读和维护都很困难。</p>
    <p>Composition API 允许我们按照逻辑功能来组织代码，将相关的响应式数据、计算属性和方法放在一起。</p>

    <h3>ref 与 reactive</h3>
    <p>Composition API 提供了两种创建响应式数据的方式：</p>
    <pre><code>// ref：适合基本类型，访问时需要 .value
const count = ref(0)
count.value++

// reactive：适合对象，直接访问属性
const state = reactive({ count: 0 })
state.count++</code></pre>

    <h3>生命周期钩子</h3>
    <p>原来的生命周期钩子现在可以作为函数导入使用：</p>
    <ul>
      <li><code>onMounted</code> — 组件挂载后</li>
      <li><code>onUpdated</code> — 组件更新后</li>
      <li><code>onUnmounted</code> — 组件卸载后</li>
    </ul>

    <blockquote>Composition API 不是用来取代 Options API 的，而是提供了更强大的逻辑组织能力。你可以根据场景灵活选择。</blockquote>

    <h3>Composables：逻辑复用的最佳实践</h3>
    <p>通过自定义 composable 函数，可以将逻辑提取为可复用的模块：</p>
    <pre><code>// useCounter.ts
import { ref } from 'vue'
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  return { count, increment, decrement }
}</code></pre>
    <p>在组件中使用：</p>
    <pre><code>import { useCounter } from '@/composables/useCounter'
const { count, increment, decrement } = useCounter(10)</code></pre>

    <p>掌握了 Composition API，你的 Vue 开发效率将提升一个档次。它不仅能让代码更清晰，还能大幅提升逻辑复用能力。</p>
  `
}

const article = ref<Article | null>(null)
const notFound = ref(false)

onMounted(() => {
  try {
    const id = Number(route.params.id)
    const found = articles.find((a) => a.id === id)
    if (found) {
      article.value = found
    } else {
      article.value = fallbackArticle
    }
  } catch (e) {
    console.error('加载文章失败:', e)
    article.value = fallbackArticle
  }

  // 等待 DOM 更新后，重新观察新生成的 .anim 元素
  nextTick(() => {
    document.querySelectorAll('.article-detail-page .anim').forEach((el) => {
      el.classList.add('visible')
    })
  })
})

function goBack() {
  // 如果是从新窗口打开的，尝试关闭窗口
  if (window.history.length <= 1) {
    window.close()
  } else {
    router.back()
  }
}
</script>

<template>
  <main class="article-detail-page">
    <div class="article-detail-page__container">
      <a class="article-detail-page__back" @click="goBack">
        ← 返回
      </a>

      <template v-if="article">
        <div class="article-detail-page__header anim">
          <span class="article-detail-page__tag">{{ article.tag }}</span>
          <h1 class="article-detail-page__title">{{ article.title }}</h1>
          <div class="article-detail-page__meta">
            <span>📅 {{ article.date }}</span>
            <span class="article-detail-page__meta-sep">·</span>
            <span>⏱ {{ article.readTime }}</span>
          </div>
        </div>
        <div class="article-detail-page__content anim" v-html="article.content"></div>
      </template>

      <div v-else-if="notFound" class="article-detail-page__not-found anim">
        <p>文章不存在 🤔</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.article-detail-page {
  min-height: 100vh;
  background: var(--bg);
  padding: 80px 24px 100px;
}

.article-detail-page__container {
  max-width: 760px;
  margin: 0 auto;
}

.article-detail-page__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 32px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
}

.article-detail-page__back:hover {
  color: var(--accent);
  background: var(--tag-bg);
}

.article-detail-page__header {
  margin-bottom: 40px;
}

.article-detail-page__tag {
  display: inline-block;
  padding: 4px 12px;
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.article-detail-page__title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 16px;
  color: var(--text);
}

.article-detail-page__meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-dim);
  font-size: 0.9rem;
}

.article-detail-page__meta-sep {
  opacity: 0.5;
}

.article-detail-page__content {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--text-secondary);
}

.article-detail-page__content :deep(p) {
  margin-bottom: 20px;
}

.article-detail-page__content :deep(h3) {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin: 36px 0 16px;
}

.article-detail-page__content :deep(code) {
  background: var(--code-bg);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Fira Code', 'Consolas', monospace;
}

.article-detail-page__content :deep(pre) {
  background: var(--code-bg);
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid var(--border);
}

.article-detail-page__content :deep(pre code) {
  background: none;
  padding: 0;
}

.article-detail-page__content :deep(blockquote) {
  border-left: 3px solid var(--accent);
  padding: 12px 20px;
  margin: 20px 0;
  background: var(--accent-glow);
  border-radius: 0 8px 8px 0;
  font-style: italic;
}

.article-detail-page__content :deep(ul),
.article-detail-page__content :deep(ol) {
  padding-left: 24px;
  margin-bottom: 20px;
  list-style: disc;
}

.article-detail-page__content :deep(ol) {
  list-style: decimal;
}

.article-detail-page__content :deep(li) {
  margin-bottom: 8px;
}

.article-detail-page__not-found {
  text-align: center;
  padding: 120px 0;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .article-detail-page {
    padding: 70px 20px 80px;
  }
}
</style>
