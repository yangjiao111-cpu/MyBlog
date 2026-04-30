<script setup lang="ts">
import { useTheme } from '@/composables'

const { themeIcon, toggleTheme } = useTheme()
</script>

<template>
  <button class="theme-toggle" :title="`切换主题`" @click="toggleTheme">
    {{ themeIcon }}
  </button>
</template>

<style scoped>
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.theme-toggle:hover {
  background: var(--surface-hover);
  border-color: var(--accent);
  transform: rotate(20deg);
}
</style>
