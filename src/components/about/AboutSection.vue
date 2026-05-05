<script setup lang="ts">
import { useScrollAnimation } from '@/composables'

const skills = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Node.js',
  'Python',
  'CSS/Sass',
  'Tailwind',
  'Docker',
  'PostgreSQL'
]

const timeline = [
  {
    date: '2025 - 至今',
    title: 'AI全栈开发',
    desc: '负责产品的架构设计与性能优化'
  },
  {
    date: '2024 - 2025',
    title: '前端开发者',
    desc: '独立完成多个项目的前端开发与部署'
  },
  {
    date: '2023 - 2024',
    title: '初级程序员',
    desc: '从零学习计算机技术，参与团队项目开发'
  }
]

useScrollAnimation()
</script>

<template>
  <section class="about" id="about">
    <div class="container">
      <div class="about__header anim">
        <div class="about__tag">About</div>
        <h2 class="about__title">关于我</h2>
        <p class="about__desc">一个有趣的人，做着有趣的事</p>
      </div>

      <div class="about__grid anim">
        <div class="about__avatar-wrap">
          <img class="about__avatar" src="@/assets/喵帕斯.jpg" alt="头像" />
        </div>

        <div class="about__info">
          <h3 class="about__name">星源</h3>
          <div class="about__role">全栈开发者 / 设计爱好者</div>
          <p class="about__bio">
            热爱编程与设计，相信技术可以让世界变得更好。擅长前端开发，对
            AI 和交互体验有浓厚兴趣。
            工作之余喜欢写博客记录所学所想，也享受探索新技术带来的乐趣。
            座右铭：保持好奇，持续创造。
          </p>

          <div class="about__skills">
            <h4 class="about__skills-title">技术栈</h4>
            <div class="about__skills-tags">
              <span v-for="skill in skills" :key="skill" class="about__skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="about__timeline-section">
            <h4 class="about__timeline-title">经历</h4>
            <div class="about__timeline">
              <div v-for="item in timeline" :key="item.date" class="about__timeline-item">
                <div class="about__timeline-date">{{ item.date }}</div>
                <div class="about__timeline-item-title">{{ item.title }}</div>
                <div class="about__timeline-item-desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 100px 0;
  background: var(--bg-secondary);
}

.about__header {
  text-align: center;
  margin-bottom: 56px;
}

.about__tag {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.about__title {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.about__desc {
  color: var(--text-secondary);
  margin-top: 12px;
  font-size: 1rem;
}

.about__grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 48px;
  align-items: start;
}

.about__avatar-wrap {
  display: flex;
  justify-content: center;
}

.about__avatar {
  width: 200px;
  height: 200px;
  border-radius: 24px;
  object-fit: cover;
  box-shadow: 0 8px 32px var(--accent-glow);
}

.about__name {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.about__role {
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 16px;
}

.about__bio {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 28px;
}

.about__skills {
  margin-top: 24px;
  margin-bottom: 32px;
}

.about__skills-title {
  font-weight: 700;
  margin-bottom: 12px;
}

.about__skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.about__skill-tag {
  padding: 6px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.82rem;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.about__skill-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--tag-bg);
}

.about__timeline-title {
  font-weight: 700;
  margin-bottom: 16px;
}

.about__timeline {
  position: relative;
  padding-left: 28px;
}

.about__timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--border);
}

.about__timeline-item {
  position: relative;
  margin-bottom: 24px;
}

.about__timeline-item::before {
  content: '';
  position: absolute;
  left: -25px;
  top: 8px;
  width: 10px;
  height: 10px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-glow);
}

.about__timeline-date {
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-bottom: 4px;
}

.about__timeline-item-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 4px;
}

.about__timeline-item-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .about {
    padding: 64px 0;
  }

  .about__grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 32px;
  }

  .about__skills-tags {
    justify-content: center;
  }
}
</style>
