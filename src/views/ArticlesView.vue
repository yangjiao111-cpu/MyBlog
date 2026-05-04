<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { Article } from '@/types'
import { articles } from '@/data/articles'
import { useScrollAnimation } from '@/composables'
import lightBannerImg from '@/assets/宫园薰.jpg'
import lightBannerWideImg from '@/assets/宫园薰宽屏.jpg'
import darkBannerImg from '@/assets/七海千秋.jpg'
import darkBannerWideImg from '@/assets/七海千秋宽屏.png'

useScrollAnimation()

// 主题检测（响应式）
const currentTheme = ref<'dark' | 'light'>(
  (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark'
)

// 监听 DOM 属性变化以响应主题切换
const themeObserver = new MutationObserver(() => {
  const theme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light'
  if (theme && theme !== currentTheme.value) {
    currentTheme.value = theme
  }
})

const PAGE_SIZE = 10
const loadedCount = ref(0)
const displayedArticles = ref<Article[]>([])
const hasMore = ref(true)
const isLoading = ref(false)
const isPageReady = ref(false)

function loadMore() {
  if (isLoading.value || !hasMore.value) return
  isLoading.value = true

  setTimeout(() => {
    const next = articles.slice(loadedCount.value, loadedCount.value + PAGE_SIZE)
    displayedArticles.value.push(...next)
    loadedCount.value += next.length
    hasMore.value = loadedCount.value < articles.length
    isLoading.value = false

    nextTick(() => {
      document.querySelectorAll('.articles-page__list .anim').forEach((el) => {
        el.classList.add('visible')
      })
    })
  }, 400)
}

function handleArticleClick(id: number) {
  window.open(`/article/${id}`, '_blank')
}

function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  if (scrollTop + clientHeight >= scrollHeight - 200) {
    loadMore()
  }
}

onMounted(() => {
  loadMore()
  window.addEventListener('scroll', onScroll, { passive: true })
  // 启动主题监听
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  // 等待 Banner 图片加载完成，设置最小加载时间避免闪烁
  const bannerImg = document.querySelector('.articles-page__banner-img') as HTMLImageElement
  const minLoadTime = 400
  const startTime = Date.now()

  const markReady = () => {
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, minLoadTime - elapsed)
    setTimeout(() => {
      isPageReady.value = true
    }, remaining)
  }

  if (bannerImg) {
    if (bannerImg.complete) {
      markReady()
    } else {
      bannerImg.addEventListener('load', markReady, { once: true })
      bannerImg.addEventListener('error', markReady, { once: true })
    }
  } else {
    markReady()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  themeObserver.disconnect()
})
</script>

<template>
  <main class="articles-page" :class="{ 'theme-dark': currentTheme === 'dark' }">
    <!-- 页面加载动画 -->
    <Transition name="fade">
      <div v-if="!isPageReady" class="articles-page__loader">
        <div class="articles-page__loader-inner">
          <div class="articles-page__loader-dot"></div>
          <div class="articles-page__loader-dot"></div>
          <div class="articles-page__loader-dot"></div>
        </div>
      </div>
    </Transition>

    <!-- 顶部大图 Banner -->
    <section v-show="isPageReady" class="articles-page__banner">
      <picture>
        <!-- 宽屏版：屏幕宽度 ≥1024px 时加载 -->
        <source
          media="(min-width: 1024px)"
          :srcset="currentTheme === 'dark' ? darkBannerWideImg : lightBannerWideImg"
        />
        <!-- 默认（普通版） -->
        <img
          :src="currentTheme === 'dark' ? darkBannerImg : lightBannerImg"
          alt="banner"
          class="articles-page__banner-img"
          loading="eager"
        />
      </picture>
      <!-- 波浪分隔线（Butterfly/Firefly 经典多层视差） -->
      <div class="articles-page__wave">
        <svg
          class="wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"
            />
          </defs>
          <g class="wave-parallax">
            <use href="#gentle-wave" x="48" y="0" />
            <use href="#gentle-wave" x="48" y="3" />
            <use href="#gentle-wave" x="48" y="5" />
            <use href="#gentle-wave" x="48" y="7" />
          </g>
        </svg>
      </div>
    </section>

    <!-- 文章列表区域 -->
    <div v-show="isPageReady" class="articles-page__container">
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
/* ====== 顶部 Banner 大图 ====== */
.articles-page__banner {
  position: relative;
  width: 100%;
  /* 用 aspect-ratio 保持图片比例，避免固定高度导致拉伸模糊 */
  aspect-ratio: 21 / 9;
  min-height: 320px;
  max-height: 580px;
  overflow: hidden;
}

.articles-page__banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 顶部对齐：人物脸部在图片上方，确保宽屏裁切时从底部裁，脸部始终可见 */
  object-position: top center;
}

/* 深色主题宽屏：七海千秋宽屏图片 y 轴居中 */
@media (min-width: 1024px) {
  .theme-dark .articles-page__banner-img {
    object-position: center center;
  }
}

/* ====== 波浪动画（Butterfly/Firefly 经典多层视差） ====== */
.articles-page__wave {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -11px;
  z-index: 5;
  line-height: 0;
}

.wave-svg {
  width: 100%;
  height: 5rem;
  display: block;
}

/* 所有波浪层共用动画 */
.wave-parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  fill: var(--bg);
}

/* 第 1 层（最顶层，y=0，最快，半透明） */
.wave-parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
  opacity: 0.75;
}

/* 第 2 层（y=3） */
.wave-parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
  opacity: 0.5;
}

/* 第 3 层（y=5） */
.wave-parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
  opacity: 0.22;
}

/* 第 4 层（最底层，y=7，最慢，完全不透明=背景色） */
.wave-parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
  opacity: 1;
}

/* 深色模式下波浪颜色层次优化：从浅到深，增加质感 */
.theme-dark .wave-parallax > use:nth-child(1) {
  fill: var(--surface-hover);
}

.theme-dark .wave-parallax > use:nth-child(2) {
  fill: var(--surface);
}

.theme-dark .wave-parallax > use:nth-child(3) {
  fill: var(--bg-secondary);
}

/* 第 4 层保持 var(--bg)，确保与页面背景无缝衔接 */

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .wave-svg {
    height: 40px;
    min-height: 40px;
  }
}

/* ====== 页面加载动画 ====== */
.articles-page__loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}

.articles-page__loader-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}

.articles-page__loader-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  animation: loaderBounce 1.4s ease-in-out infinite both;
}

.articles-page__loader-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.articles-page__loader-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loaderBounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 加载动画淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ====== 页面主体 ====== */
.articles-page {
  min-height: 100vh;
  background: var(--bg);
}

.articles-page__container {
  max-width: 860px;
  margin: 0 auto;
  padding: 60px 24px 100px;
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

/* 文章列表项 */
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

/* ====== 响应式 ====== */
@media (max-width: 768px) {
  .articles-page__banner {
    aspect-ratio: 16 / 9;
    min-height: 200px;
    max-height: 360px;
  }

  .articles-page__container {
    padding: 48px 20px 80px;
  }
}

@media (max-width: 640px) {
  .article-item__inner {
    flex-direction: column;
  }
}
</style>
