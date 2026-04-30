<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BackToTop from '@/components/common/BackToTop.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { useBackToTop } from '@/composables'

const { isVisible, scrollToTop } = useBackToTop()
</script>

<template>
  <NavBar>
    <template #theme-toggle>
      <ThemeToggle />
    </template>
  </NavBar>
  <RouterView />
  <AppFooter />
  <BackToTop :is-visible="isVisible" :scroll-to-top="scrollToTop" />
</template>
