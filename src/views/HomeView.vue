<script setup lang="ts">
import HeroSection from '@/components/hero/HeroSection.vue'
import ArticleGrid from '@/components/article/ArticleGrid.vue'
import AboutSection from '@/components/about/AboutSection.vue'
import { articles } from '@/data/articles'
import { useScrollAnimation } from '@/composables'

useScrollAnimation()
</script>

<template>
  <main>
    <HeroSection />
    <ArticleGrid :articles="articles" />
    <AboutSection />
  </main>
</template>
