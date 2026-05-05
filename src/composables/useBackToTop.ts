import { ref, onMounted, onUnmounted } from 'vue'

export function useBackToTop() {
  const isVisible = ref(false)

  function handleScroll() {
    isVisible.value = window.scrollY > 0
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isVisible,
    scrollToTop
  }
}
