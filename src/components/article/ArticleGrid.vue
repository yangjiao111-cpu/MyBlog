<script setup lang="ts">
import type { Article } from '@/types'
import ArticleCard from './ArticleCard.vue'

defineProps<{
  articles: Article[]
}>()

defineEmits<{
  select: [articleId: number]
}>()
</script>

<template>
  <section class="articles-section" id="articlesSection">
    <div class="container">
      <div class="articles-section__header anim">
        <div class="articles-section__tag">Blog</div>
        <h2 class="articles-section__title">最新文章</h2>
        <p class="articles-section__desc">技术笔记、项目分享与思考沉淀</p>
      </div>
      <div class="articles-section__list">
        <ArticleCard
          v-for="(article, index) in articles"
          :key="article.id"
          :article="article"
          :index="index"
          @click="(id) => $emit('select', id)"
        />
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

.articles-section__list {
  display: flex;
  flex-direction: column;
  max-width: 860px;
  margin: 0 auto;
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
}
</style>
