<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 50
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
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
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
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

      <ul class="navbar__links" :class="{ 'navbar__links--open': isMenuOpen }">
        <li>
          <router-link to="/" @click="isMenuOpen = false">文章</router-link>
        </li>
        <li>
          <a href="#about" @click="isMenuOpen = false">关于</a>
        </li>
        <li>
          <slot name="theme-toggle" />
        </li>
      </ul>

      <button class="navbar__hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
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
  background: transparent;
}

.navbar--scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 1px 0 var(--border), 0 4px 20px rgba(0, 0, 0, 0.06);
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

.navbar--scrolled .navbar__logo {
  opacity: 1;
}

.navbar__star {
  display: block;
  color: var(--accent);
}

.navbar--scrolled .navbar__home-icon {
  opacity: 0.85;
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

  .navbar__links--open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--nav-bg);
    backdrop-filter: blur(20px);
    padding: 16px 24px;
    gap: 16px;
    border-bottom: 1px solid var(--border);
  }

  .navbar--scrolled .navbar__links--open {
    top: 56px;
  }
}
</style>
