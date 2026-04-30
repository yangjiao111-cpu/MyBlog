<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '@/components/hero/HeroSection.vue'
import ArticleGrid from '@/components/article/ArticleGrid.vue'
import AboutSection from '@/components/about/AboutSection.vue'
import ArticleDetail from '@/components/article/ArticleDetail.vue'
import { articles } from '@/data/articles'
import { useScrollAnimation } from '@/composables'

const router = useRouter()
const selectedArticleId = ref<number | null>(null)

const selectedArticle = ref(articles[0])

useScrollAnimation()

function handleSelectArticle(id: number) {
  selectedArticleId.value = id
  selectedArticle.value = articles.find((a) => a.id === id) || articles[0]
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleBack() {
  selectedArticleId.value = null
  // re-trigger card animations
  setTimeout(() => {
    document
      .querySelectorAll('.articles-section .anim')
      .forEach((el) => {
        el.classList.remove('visible')
        setTimeout(() => el.classList.add('visible'), 50)
      })
  }, 50)
}

// support route query param for direct article links
watch(
  () => router.currentRoute.value.query.id,
  (id) => {
    if (id) {
      const numId = Number(id)
      const found = articles.find((a) => a.id === numId)
      if (found) {
        handleSelectArticle(numId)
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <main>
    <HeroSection />
    <ArticleGrid
      v-if="selectedArticleId === null"
      :articles="articles"
      @select="handleSelectArticle"
    />
    <ArticleDetail
      v-else
      :article="selectedArticle"
      @back="handleBack"
    />
    <AboutSection v-if="selectedArticleId === null" />
  </main>
</template>
