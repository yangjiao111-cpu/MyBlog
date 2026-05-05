<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { DrawerRoot, DrawerContent, DrawerOverlay, DrawerTitle } from 'vaul-vue'

interface Props {
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false,
})

const isScrolled = ref(false)
const isMenuOpen = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 50
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function openArticles() {
  isMenuOpen.value = false
  window.open('/articles', '_blank')
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav
    class="navbar"
    :class="{
      'navbar--scrolled': isScrolled,
      'navbar--transparent': props.transparent,
    }"
  >
    <div class="navbar__inner">
      <router-link to="/" class="navbar__logo">
        <svg class="navbar__star" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor"/>
          <path d="M12 22L13 18L12 14L11 18L12 22Z" fill="currentColor" opacity="0.6"/>
          <path d="M18 20L17 17L18 14L19 17L18 20Z" fill="currentColor" opacity="0.4"/>
          <path d="M6 20L7 17L6 14L5 17L6 20Z" fill="currentColor" opacity="0.4"/>
        </svg>
        星源
      </router-link>

      <ul class="navbar__links">
        <li>
          <a href="javascript:void(0)" @click="openArticles">文章</a>
        </li>
        <li>
          <slot name="theme-toggle" />
        </li>
      </ul>

      <button class="navbar__hamburger" @click.stop="toggleMenu">
        <span :class="{ 'navbar__hamburger--open': isMenuOpen }"></span>
        <span :class="{ 'navbar__hamburger--open': isMenuOpen }"></span>
        <span :class="{ 'navbar__hamburger--open': isMenuOpen }"></span>
      </button>
    </div>

    <!-- vaul-vue 顶部抽屉 -->
    <DrawerRoot
      v-model:open="isMenuOpen"
      direction="top"
      :dismissible="true"
      :modal="true"
      :should-scale-background="false"
      :handle-only="true"
    >
      <DrawerOverlay class="navbar__drawer-overlay" />
      <DrawerContent class="navbar__drawer-content">
        <DrawerTitle class="sr-only">导航菜单</DrawerTitle>
        <ul class="navbar__drawer-links">
          <li>
            <a href="javascript:void(0)" @click="openArticles">文章</a>
          </li>
          <li>
            <slot name="theme-toggle" />
          </li>
        </ul>
      </DrawerContent>
    </DrawerRoot>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition:
    background 0.3s ease,
    box-shadow 0.3s ease,
    height 0.3s ease;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.navbar--scrolled {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 1px 0 var(--border), 0 4px 20px rgba(0, 0, 0, 0.06);
}

.navbar--transparent:not(.navbar--scrolled) {
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.navbar--transparent:not(.navbar--scrolled) .navbar__logo {
  color: #fff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.navbar--transparent:not(.navbar--scrolled) .navbar__star {
  color: #fff;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
}

.navbar--transparent:not(.navbar--scrolled) .navbar__links a {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.navbar--transparent:not(.navbar--scrolled) .navbar__links a:hover {
  color: #fff;
}

.navbar--transparent:not(.navbar--scrolled) .navbar__hamburger span {
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.navbar__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: height 0.3s ease;
}

.navbar--scrolled .navbar__inner {
  height: 56px;
}

.navbar__logo {
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.9;
  transition: opacity 0.3s;
  text-decoration: none;
  color: inherit;
}

.navbar__logo {
  opacity: 1;
}

.navbar__star {
  display: block;
  color: var(--accent);
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
}

.navbar__links a {
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: color 0.2s;
  position: relative;
  text-decoration: none;
}

.navbar__links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
  transition: width 0.3s;
}

.navbar__links a:hover {
  color: var(--text);
}

.navbar__links a:hover::after {
  width: 100%;
}

.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  cursor: pointer;
  background: none;
  border: none;
}

.navbar__hamburger span {
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  display: block;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  .navbar__hamburger {
    display: flex;
  }

  .navbar__links {
    display: none;
  }

  /* 汉堡图标动画：三条线变 X */
  .navbar__hamburger--open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .navbar__hamburger--open:nth-child(2) {
    opacity: 0;
  }
  .navbar__hamburger--open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  /* vaul-vue 遮罩层样式 */
  .navbar__drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 99;
  }

  /* vaul-vue 抽屉内容样式 */
  .navbar__drawer-content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 101;
    background: var(--surface);
    border-radius: 0 0 16px 16px;
    padding: 8px 0 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    outline: none;
  }

  .navbar__drawer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 16px;
  }

  .navbar__drawer-links a {
    display: block;
    padding: 12px 16px;
    font-size: 0.95rem;
    color: var(--text);
    text-decoration: none;
    border-radius: 10px;
    transition: background 0.2s;
    text-align: center;
  }

  .navbar__drawer-links a:hover {
    background: var(--surface-hover);
  }

  .navbar__drawer-links li:has(.theme-toggle) {
    padding: 8px 16px;
    display: flex;
    justify-content: center;
  }

  /* 无障碍隐藏标题 */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}
</style>
