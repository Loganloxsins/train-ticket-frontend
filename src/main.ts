import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import "~/styles/index.scss";
import "uno.css";
import routes from '~pages'
import App from './App.vue'
import router from './router';
// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// })这是67陆游配置，我把他单独开了文件

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

// 在路由准备就绪后再挂载Vue应用
router.isReady().then(() => {
    app.mount('#app');
});