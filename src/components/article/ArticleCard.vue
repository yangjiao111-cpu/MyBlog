<script setup lang="ts">
import type { Article } from '@/types'

defineProps<{
  article: Article
  index: number
}>()

defineEmits<{
  click: [articleId: number]
}>()
</script>

<template>
  <article
    class="article-card anim"
    :style="{ transitionDelay: `${index * 0.08}s` }"
    @click="$emit('click', article.id)"
  >
    <div class="article-card__inner">
      <div class="article-card__body" :class="{ 'article-card__body--full': !article.coverImg }">
        <span class="article-card__tag">{{ article.tag }}</span>
        <h3 class="article-card__title">{{ article.title }}</h3>
        <p class="article-card__excerpt">{{ article.excerpt }}</p>
        <div class="article-card__footer">
          <span class="article-card__date">{{ article.date }}</span>
          <span class="article-card__dot">·</span>
          <span>{{ article.readTime }}</span>
        </div>
      </div>
      <div v-if="article.coverImg" class="article-card__thumb">
        <img :src="article.coverImg" :alt="article.title" class="article-card__thumb-img" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.article-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
}

.article-card:hover {
  border-color: var(--accent);
  box-shadow: var(--card-shadow);
}

.article-card__inner {
  padding: 20px 24px;
  display: flex;
  align-items: stretch;
  gap: 12px;
}

.article-card__body {
  flex: 1;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.article-card__body--full {
  flex: 1;
  width: 100%;
}

.article-card__tag {
  display: inline-block;
  width: fit-content;
  padding: 2px 10px;
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.5px;
}

.article-card__title {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.5;
  margin: 2px 0;
}

.article-card:hover .article-card__title {
  color: var(--accent);
}

.article-card__excerpt {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 2px 0;
}

.article-card__footer {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  color: var(--text-dim);
  font-size: 0.8rem;
  margin-top: 4px;
}

.article-card__dot {
  margin: 0 4px;
}

.article-card__stat {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.article-card__thumb {
  width: 260px;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 12px;
  margin: auto 0;
}

.article-card__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

@media (max-width: 640px) {
  .article-card__inner {
    flex-direction: column;
  }

  .article-card__thumb {
    width: 100%;
    height: 180px;
    border-radius: 12px;
    order: 1;
  }

  .article-card__body {
    order: 0;
  }
}
</style>
