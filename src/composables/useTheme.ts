import { ref, watchEffect } from 'vue'

export function useTheme() {
  const theme = ref<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  )

  const themeIcon = ref(theme.value === 'dark' ? '🌙' : '☀️')

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.value)
    themeIcon.value = theme.value === 'dark' ? '🌙' : '☀️'
    localStorage.setItem('theme', theme.value)
  })

  return {
    theme,
    themeIcon,
    toggleTheme
  }
}
