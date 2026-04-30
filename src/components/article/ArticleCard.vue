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
    <div class="article-card__cover-wrap">
      <div
        class="article-card__cover-placeholder"
        :class="article.cover"
      >
        {{ article.emoji }}
      </div>
    </div>
    <div class="article-card__body">
      <div class="article-card__meta">
        <span class="article-card__tag">{{ article.tag }}</span>
        <span>{{ article.date }}</span>
        <span>·</span>
        <span>{{ article.readTime }}</span>
      </div>
      <h3 class="article-card__title">{{ article.title }}</h3>
      <p class="article-card__excerpt">{{ article.excerpt }}</p>
    </div>
  </article>
</template>

<style scoped>
.article-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--card-shadow);
  border-color: var(--accent);
}

.article-card__cover-wrap {
  overflow: hidden;
  position: relative;
}

.article-card__cover-placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  transition: transform 0.4s ease;
}

.article-card:hover .article-card__cover-placeholder {
  transform: scale(1.05);
}

.article-card__body {
  padding: 20px;
}

.article-card__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-bottom: 10px;
}

.article-card__tag {
  padding: 3px 10px;
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.article-card__title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.4;
  transition: color 0.2s;
}

.article-card:hover .article-card__title {
  color: var(--accent);
}

.article-card__excerpt {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
