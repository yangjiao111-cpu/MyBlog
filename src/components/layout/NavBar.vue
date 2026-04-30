<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <router-link to="/" class="navbar__logo">
        <span class="navbar__dot"></span>
        星源博客
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
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  transition: background var(--transition-speed);
}

.navbar__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar__dot {
  width: 10px;
  height: 10px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--accent-glow);
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navbar__links a {
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: color 0.2s;
  position: relative;
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
}

.navbar__hamburger span {
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
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
}
</style>
