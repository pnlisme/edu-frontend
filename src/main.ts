import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/index.css'
// import '@/assets/css/style.css'
// video
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import 'vue-loading-overlay/dist/css/index.css'
// language
import enHome from './locales/en/home.json'
import viHome from './locales/vi/home.json'

const i18n = createI18n({
  locale: 'vi', // Ngôn ngữ mặc định
  fallbackLocale: 'en', // Ngôn ngữ dự phòng
  messages: {
    en: {
      home: enHome
    },
    vi: {
      home: viHome
    }
  }
})
const pinia = createPinia()
const app = createApp(App)
app.use(VuePlyr, {
  plyr: {}
})
app.use(i18n)
app.use(VideoPlayer)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
