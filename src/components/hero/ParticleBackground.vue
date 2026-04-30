<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'

const particles = ref<CSSProperties[]>([])

for (let i = 0; i < 20; i++) {
  const size = `${2 + Math.random() * 4}px`
  particles.value.push({
    left: `${Math.random() * 100}%`,
    top: `${80 + Math.random() * 20}%`,
    animationDuration: `${6 + Math.random() * 8}s`,
    animationDelay: `${Math.random() * 6}s`,
    width: size,
    height: size
  })
}
</script>

<template>
  <div class="particle-background">
    <div
      v-for="(p, index) in particles"
      :key="index"
      class="particle-background__item"
      :style="p"
    ></div>
  </div>
</template>

<style scoped>
.particle-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle-background__item {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat linear infinite;
}
</style>
