<script setup lang="ts">
const { isVisible, scrollToTop } = defineProps<{
  isVisible: boolean
  scrollToTop: () => void
}>()
</script>

<template>
  <Transition name="fade">
    <button
      v-if="isVisible"
      class="back-to-top"
      title="回到顶部"
      @click="scrollToTop"
    >
      ↑
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 90;
  box-shadow: var(--card-shadow);
  transition: all 0.3s;
}

.back-to-top:hover {
  border-color: var(--accent);
  background: var(--accent);
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
