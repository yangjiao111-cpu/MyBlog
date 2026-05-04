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
  window.open(`/article/${props.article.id}`, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <article
    class="article-item anim"
    :class="{ 'article-item--first': index === 0 }"
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
  -webkit-line-clamp: 1;
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

/* 首条文章突出显示 */
.article-item--first {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 28px 20px 16px;
  border-bottom: none;
  border-left: 3px solid var(--accent);
  box-shadow: var(--card-shadow);
}

.article-item--first .article-item__title {
  font-size: 1.25rem;
  margin-top: 20px;
}

.article-item--first .article-item__excerpt {
  -webkit-line-clamp: 1;
}
</style>
