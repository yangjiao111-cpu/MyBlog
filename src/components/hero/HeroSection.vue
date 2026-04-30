<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHitokoto } from '@/apis'
import ParticleBackground from './ParticleBackground.vue'
import ScrollHint from '@/components/common/ScrollHint.vue'

const emit = defineEmits<{
  startReading: []
}>()

const quoteText = ref('')

onMounted(async () => {
  try {
    const res = await getHitokoto()
    quoteText.value = res.text
  } catch {
    quoteText.value = '睡个好觉，我的朋友'
  }
})

function handleStartReading() {
  emit('startReading')
}
</script>

<template>
  <section class="hero">
    <ParticleBackground />
    <div class="hero__content">
      <div class="hero__greeting">Welcome to My Space</div>
      <h1 class="hero__title">
        用代码书写<br />
        <span class="hero__title--highlight">创意与热爱</span>
      </h1>
      <p class="hero__desc">
        {{ quoteText }}
      </p>
      <a href="#articlesSection" class="hero__cta" @click="handleStartReading">
        开始阅读 →
      </a>
    </div>
    <ScrollHint @click="handleStartReading" />
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: var(--hero-gradient);
}

.hero__content {
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 0 24px;
  animation: fadeUp 1s ease;
}

.hero__greeting {
  font-size: 1rem;
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.hero__title {
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.hero__title--highlight {
  background: linear-gradient(135deg, var(--accent), #f472b6, var(--accent));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease infinite;
}

.hero__desc {
  font-size: 1.15rem;
  color: var(--text-secondary);
  max-width: 560px;
  margin: 0 auto 36px;
  line-height: 1.8;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: var(--accent);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 12px;
  transition: all 0.2s;
  box-shadow: 0 4px 20px var(--accent-glow);
}

.hero__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--accent-glow);
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 2.2rem;
  }
  .hero__desc {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: 1.8rem;
  }
  .hero__cta {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
}
</style>
