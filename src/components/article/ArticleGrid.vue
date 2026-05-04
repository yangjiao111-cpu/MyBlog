<script setup lang="ts">
import type { Article } from '@/types'
import ArticleCard from './ArticleCard.vue'
import sidebarImg from '@/assets/珂朵莉.jpg'

defineProps<{
  articles: Article[]
}>()

function goToList() {
  window.open('/articles', '_blank')
}
</script>

<template>
  <section class="articles-section" id="articlesSection">
    <div class="container">
      <div class="articles-section__header anim">
        <div class="articles-section__tag">Blog</div>
        <h2 class="articles-section__title">最新文章</h2>
        <p class="articles-section__desc">技术笔记、项目分享与思考沉淀</p>
      </div>

      <div class="articles-section__body">
        <!-- 左侧文章列表 -->
        <div class="articles-section__list">
          <ArticleCard
            v-for="(article, index) in articles"
            :key="article.id"
            :article="article"
            :index="index"
          />
          <div class="articles-section__more anim" @click="goToList">
            查看全部文章
            <span class="articles-section__arrow">&rarr;</span>
          </div>
        </div>

        <!-- 右侧竖图卡片 -->
        <aside class="articles-section__sidebar anim">
          <div class="sidebar-card">
            <div class="sidebar-card__img-wrap">
              <img
                :src="sidebarImg"
                alt="sidebar decoration"
                class="sidebar-card__img"
                loading="lazy"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.articles-section {
  padding: 100px 0;
}

.articles-section__header {
  text-align: center;
  margin-bottom: 56px;
}

.articles-section__tag {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.articles-section__title {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.articles-section__desc {
  color: var(--text-secondary);
  margin-top: 12px;
  font-size: 1rem;
}

/* ====== 左右分栏主体 ====== */
.articles-section__body {
  display: flex;
  gap: 40px;
  align-items: stretch;
  max-width: 1160px;
  margin: 0 auto;
}

/* ====== 左侧列表 ====== */
.articles-section__list {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* ====== 查看全部入口 ====== */
.articles-section__more {
  padding: 18px 0 4px;
  font-size: 0.9rem;
  color: var(--accent);
  cursor: pointer;
  transition: opacity 0.25s ease;
}

.articles-section__more:hover {
  opacity: 0.7;
}

.articles-section__arrow {
  display: inline-block;
  margin-left: 6px;
  transition: transform 0.25s ease;
}

.articles-section__more:hover .articles-section__arrow {
  transform: translateX(4px);
}

/* ====== 右侧边栏（卡片形式） ====== */
.articles-section__sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar-card {
  background: var(--surface);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  position: sticky;
  top: 100px;
}

.sidebar-card__img-wrap {
  width: 100%;
  aspect-ratio: 3 / 4.2;
  overflow: hidden;
  background: var(--bg-secondary);
}

.sidebar-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top -14% center;
  transition: transform 0.5s ease;
}

.sidebar-card:hover .sidebar-card__img {
  transform: scale(1.04);
}

/* ====== 响应式 ====== */
@media (max-width: 860px) {
  .articles-section__body {
    flex-direction: column;
    align-items: center;
  }

  .articles-section__list {
    width: 100%;
    max-width: 680px;
  }

  .articles-section__sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .articles-section {
    padding: 64px 0;
  }
}

@media (max-width: 480px) {
  .articles-section__title {
    font-size: 1.5rem;
  }

  .articles-section__list {
    max-width: 100%;
  }
}
</style>
