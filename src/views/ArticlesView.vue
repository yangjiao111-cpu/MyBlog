<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { Article } from '@/types'
import { articles } from '@/data/articles'
import { useScrollAnimation } from '@/composables'

useScrollAnimation()

const PAGE_SIZE = 10
const loadedCount = ref(0)
const displayedArticles = ref<Article[]>([])
const hasMore = ref(true)
const isLoading = ref(false)

function loadMore() {
  if (isLoading.value || !hasMore.value) return
  isLoading.value = true

  // 模拟加载延迟
  setTimeout(() => {
    const next = articles.slice(loadedCount.value, loadedCount.value + PAGE_SIZE)
    displayedArticles.value.push(...next)
    loadedCount.value += next.length
    hasMore.value = loadedCount.value < articles.length
    isLoading.value = false

    // 等待 DOM 更新后，给新渲染的 .anim 元素添加 visible 类
    nextTick(() => {
      document.querySelectorAll('.articles-page__list .anim').forEach((el) => {
        el.classList.add('visible')
      })
    })
  }, 400)
}

function handleArticleClick(id: number) {
  const url = `${window.location.origin}/article/${id}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  // 距离底部 200px 时触发加载
  if (scrollTop + clientHeight >= scrollHeight - 200) {
    loadMore()
  }
}

onMounted(() => {
  loadMore()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <main class="articles-page">
    <div class="articles-page__container">
      <div class="articles-page__header anim">
        <div class="articles-page__tag">Blog</div>
        <h1 class="articles-page__title">文章列表</h1>
        <p class="articles-page__desc">技术笔记、项目分享与思考沉淀</p>
      </div>

      <div class="articles-page__list">
        <article
          v-for="(article, index) in displayedArticles"
          :key="article.id"
          class="article-item anim"
          :style="{ transitionDelay: `${index * 0.06}s` }"
          @click="handleArticleClick(article.id)"
        >
          <div class="article-item__inner">
            <div class="article-item__main">
              <h3 class="article-item__title">{{ article.title }}</h3>
              <p class="article-item__excerpt">{{ article.excerpt }}</p>
              <div class="article-item__meta">
                <span class="article-item__date">{{ article.date }}</span>
                <span class="article-item__meta-sep">·</span>
                <span>{{ article.readTime }}</span>
                <span class="article-item__tag">{{ article.tag }}</span>
              </div>
            </div>
            <div v-if="article.coverImg" class="article-item__thumb">
              <img :src="article.coverImg" :alt="article.title" class="article-item__thumb-img" />
            </div>
          </div>
        </article>
      </div>

      <div v-if="isLoading" class="articles-page__loading">
        <span class="articles-page__loading-dot"></span>
        <span class="articles-page__loading-dot"></span>
        <span class="articles-page__loading-dot"></span>
      </div>

      <div v-if="!hasMore && displayedArticles.length > 0" class="articles-page__end">
        — 已经到底了 —
      </div>
    </div>
  </main>
</template>

<style scoped>
.articles-page {
  min-height: 100vh;
  background: var(--bg);
  padding: 100px 24px;
}

.articles-page__container {
  max-width: 860px;
  margin: 0 auto;
}

.articles-page__header {
  text-align: center;
  margin-bottom: 56px;
}

.articles-page__tag {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.articles-page__title {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--text);
}

.articles-page__desc {
  color: var(--text-secondary);
  margin-top: 12px;
  font-size: 1rem;
}

/* 文章列表项（与首页 ArticleCard 保持一致） */
.article-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
}

.article-item:first-child {
  padding-top: 0;
}

.article-item:last-child {
  border-bottom: none;
}

.article-item:hover .article-item__title {
  color: var(--accent);
}

.article-item__inner {
  display: flex;
  align-items: center;
  gap: 16px;
}

.article-item__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.article-item__title {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--text);
  transition: color 0.2s;
}

.article-item__excerpt {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-item__meta {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-top: 4px;
}

.article-item__meta-sep {
  margin: 0 2px;
}

.article-item__tag {
  margin-left: 8px;
  padding: 2px 8px;
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.article-item__thumb {
  width: auto;
  height: 120px;
  aspect-ratio: 1.75 / 1;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 12px;
}

.article-item__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* 加载动画 */
.articles-page__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 40px 0;
}

.articles-page__loading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.4;
  animation: loadingPulse 1.2s ease-in-out infinite;
}

.articles-page__loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.articles-page__loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loadingPulse {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* 到底提示 */
.articles-page__end {
  text-align: center;
  color: var(--text-dim);
  font-size: 0.85rem;
  padding: 40px 0 20px;
}

@media (max-width: 768px) {
  .articles-page {
    padding: 80px 20px;
  }
}

@media (max-width: 640px) {
  .article-item__inner {
    flex-direction: column;
  }

  .article-item__thumb {
    width: 100%;
    height: auto;
    aspect-ratio: 1.75 / 1;
    order: -1;
  }
}
</style>
