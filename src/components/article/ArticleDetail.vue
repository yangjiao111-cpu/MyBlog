<script setup lang="ts">
import type { Article } from '@/types'

defineProps<{
  article: Article
}>()

defineEmits<{
  back: []
}>()
</script>

<template>
  <section class="article-detail">
    <div class="container">
      <a class="article-detail__back" @click="$emit('back')">
        ← 返回文章列表
      </a>
      <div class="article-detail__header">
        <span class="article-detail__tag">{{ article.tag }}</span>
        <h1 class="article-detail__title">{{ article.title }}</h1>
        <div class="article-detail__meta">
          <span>📅 {{ article.date }}</span>
          <span>·</span>
          <span>⏱ {{ article.readTime }}</span>
        </div>
      </div>
      <div class="article-detail__content" v-html="article.content"></div>
    </div>
  </section>
</template>

<style scoped>
.article-detail {
  padding: 100px 0;
}

.article-detail__back {
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

.article-detail__back:hover {
  color: var(--accent);
  background: var(--tag-bg);
}

.article-detail__header {
  margin-bottom: 40px;
}

.article-detail__tag {
  display: inline-block;
  padding: 4px 12px;
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.article-detail__title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 16px;
}

.article-detail__meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-dim);
  font-size: 0.9rem;
}

.article-detail__content {
  max-width: 760px;
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--text-secondary);
}

.article-detail__content :deep(p) {
  margin-bottom: 20px;
}

.article-detail__content :deep(h3) {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin: 36px 0 16px;
}

.article-detail__content :deep(code) {
  background: var(--code-bg);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Fira Code', 'Consolas', monospace;
}

.article-detail__content :deep(pre) {
  background: var(--code-bg);
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid var(--border);
}

.article-detail__content :deep(pre code) {
  background: none;
  padding: 0;
}

.article-detail__content :deep(blockquote) {
  border-left: 3px solid var(--accent);
  padding: 12px 20px;
  margin: 20px 0;
  background: var(--accent-glow);
  border-radius: 0 8px 8px 0;
  font-style: italic;
}

.article-detail__content :deep(ul),
.article-detail__content :deep(ol) {
  padding-left: 24px;
  margin-bottom: 20px;
  list-style: disc;
}

.article-detail__content :deep(ol) {
  list-style: decimal;
}

.article-detail__content :deep(li) {
  margin-bottom: 8px;
}
</style>
