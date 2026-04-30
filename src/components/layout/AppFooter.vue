<script setup lang="ts">
const socialLinks = [
  { icon: '🐙', title: 'GitHub', href: '#' },
  { icon: '🐦', title: 'Twitter', href: '#' },
  { icon: '✉️', title: 'Email', href: '#' },
  { icon: '📚', title: '掘金', href: '#' }
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__links">
        <a
          v-for="link in socialLinks"
          :key="link.title"
          :href="link.href"
          class="footer__link"
          :title="link.title"
        >
          {{ link.icon }}
        </a>
      </div>
      <p class="footer__text">
        © 2026 星辰博客 · 用 ❤️ 和代码构建 · Powered by
        <a href="#">星辰</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 48px 0;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer__links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.footer__link {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.2s;
}

.footer__link:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px var(--accent-glow);
}

.footer__text {
  font-size: 0.85rem;
  color: var(--text-dim);
}

.footer__text a {
  color: var(--accent);
}
</style>
