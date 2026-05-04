<script setup lang="ts">
import type { Article } from '@/types'

const props = defineProps<{
  article: Article
  index: number
}>()

defineEmits<{
  click: [articleId: number]
}>()

function handleClick() {
  const url = `${window.location.origin}${window.location.pathname}?id=${props.article.id}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <article
    class="article-item anim"
    :style="{ transitionDelay: `${index * 0.06}s` }"
    @click="handleClick"
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
</template>

<style scoped>
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
