<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import githubIcon from '@/assets/github.svg'
import githubWhiteIcon from '@/assets/github-white.svg'
import bilibiliIcon from '@/assets/bilibili.svg'
import csdnIcon from '@/assets/csdn.svg'
import juejinIcon from '@/assets/juejin.svg'

// 响应式主题状态（通过 MutationObserver 同步 data-theme 变化）
const isDark = ref(document.documentElement.getAttribute('data-theme') === 'dark')

let observer: MutationObserver | null = null

onMounted(() => {
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'data-theme') {
        isDark.value = document.documentElement.getAttribute('data-theme') === 'dark'
      }
    }
  })
  observer.observe(document.documentElement, { attributes: true })
})

onUnmounted(() => {
  observer?.disconnect()
})

const githubIconSrc = computed(() => isDark.value ? githubWhiteIcon : githubIcon)

const socialLinks = computed(() => [
  { icon: githubIconSrc.value, title: 'GitHub', href: 'https://github.com/yangjiao111-cpu' },
  { icon: bilibiliIcon, title: 'Bilibili', href: 'https://space.bilibili.com/1126818000?spm_id_from=333.1007.0.0' },
  { icon: csdnIcon, title: 'CSDN', href: 'https://blog.csdn.net/piaolianyangjiao?spm=1000.2115.3001.5343' },
  { icon: juejinIcon, title: '掘金', href: 'https://juejin.cn/user/4047715900077963' }
])
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__links">
        <a
          v-for="link in socialLinks"
          :key="link.title"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__link"
          :title="link.title"
        >
          <img v-if="link.icon.length > 5" :src="link.icon" :alt="link.title" class="footer__icon" />
          <span v-else>{{ link.icon }}</span>
        </a>
      </div>
      <p class="footer__text">
        © 2026 星源博客 · 用 ❤️ 和代码构建 · Powered by
        <a href="#">星源</a>
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
  transition: all 0.2s;
  overflow: hidden;
}

.footer__icon {
  width: 20px;
  height: 20px;
  display: block;
  image-rendering: auto;
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