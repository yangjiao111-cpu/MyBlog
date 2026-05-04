import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

// 等待 Vue 渲染好第一帧后，再淡出移除 loading
// 避免 Vue 挂载瞬间 loading 消失导致的空白间隙闪烁
nextTick(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const loader = document.getElementById('app-loading')
      if (loader) {
        loader.classList.add('fade-out')
        setTimeout(() => loader.remove(), 400)
      }
    })
  })
})
