<script setup lang="ts">
const emit = defineEmits<{
  click: []
}>()

const scrollDown = () => {
  document.getElementById('articlesSection')?.scrollIntoView({ behavior: 'smooth' })
  emit('click')
}
</script>

<template>
  <div class="scroll-hint" @click="scrollDown">
    <span>向下滚动</span>
    <div class="scroll-hint__arrow"></div>
  </div>
</template>

<style scoped>
.scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-dim);
  font-size: 0.8rem;
  animation: float 3s ease-in-out infinite;
  cursor: pointer;
}

.scroll-hint__arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid var(--text-dim);
  border-bottom: 2px solid var(--text-dim);
  transform: rotate(45deg);
}
</style>
