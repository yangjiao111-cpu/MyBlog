import { ref, watchEffect } from 'vue'

export function useTheme() {
  const theme = ref<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  )

  const themeIcon = ref(theme.value === 'dark' ? '🌙' : '☀️')

  /** 标志位：View Transition 进行中时跳过 watchEffect 的自动 DOM 同步 */
  let isVTActive = false

  function toggleTheme() {
    const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(nextTheme)
  }

  /**
   * 纯 DOM 操作切换主题（不触发 Vue 响应式，用于 View Transition 回调内部）
   */
  function applyThemeToDOM(t: 'dark' | 'light') {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
  }

  /**
   * 圆形展开过渡切换主题（对标 Element Plus）
   * - 支持 View Transitions API 的浏览器：真实内容圆形扩散
   * - 不支持的浏览器：降级为直接切换（配合 CSS 全局渐变过渡）
   */
  function toggleThemeWithTransition(event: MouseEvent) {
    if (!(document as any).startViewTransition) {
      toggleTheme()
      return
    }

    const x = event.clientX
    const y = event.clientY

    // 计算最大半径：覆盖整个视口
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const nextTheme = theme.value === 'dark' ? 'light' : 'dark'

    // 标记 VT 进行中
    isVTActive = true

    const transition = document.startViewTransition(() => {
      // 回调内只做纯 DOM 操作，完全绕开 Vue 响应式系统
      applyThemeToDOM(nextTheme)
    })

    transition.ready.then(() => {
      // 双向统一：始终裁剪 new 层，圆从小到大展开
      document.documentElement.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${radius}px at ${x}px ${y}px)` }
        ],
        {
          duration: 450,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })

    transition.finished.then(() => {
      isVTActive = false
      // 动画结束后才更新 Vue 响应式状态
      theme.value = nextTheme
    })
  }

  /** 应用主题到 DOM 和状态 */
  function applyTheme(t: 'dark' | 'light') {
    theme.value = t
  }

  // 非 VT 模式下自动同步 DOM
  watchEffect(() => {
    if (!isVTActive) {
      document.documentElement.setAttribute('data-theme', theme.value)
      themeIcon.value = theme.value === 'dark' ? '🌙' : '☀️'
      localStorage.setItem('theme', theme.value)
    }
  })

  return {
    theme,
    themeIcon,
    toggleTheme,
    toggleThemeWithTransition,
  }
}
