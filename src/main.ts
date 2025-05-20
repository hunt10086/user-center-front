// 修正后的main.ts（消除重复挂载）
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'
import router from './router'
import "./access"

const pinia = createPinia()
// 统一初始化
const app = createApp(App)
app.use(Antd)
app.use(router)
app.use(pinia)
app.mount('#app')
