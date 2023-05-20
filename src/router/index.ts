import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/index.vue';
import UserPage from '../pages/user.vue';
import AdminPage from '../pages/admin.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: HomePage
    },
    {
        path: '/user',
        name: 'user',
        component: UserPage,
        meta: { requiresAuth: true, role: 'passenger' } // 需要乘客身份才能访问
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminPage,
        meta: { requiresAuth: true, role: 'admin' } // 需要管理员身份才能访问
    },
    //其他路由配置
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
//TODO：身份验证
// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !isAuthenticated()) {
//         // 如果需要登录权限并且用户未登录，重定向到登录页或其他处理方式
//         next('/login');
//     } else if (to.meta.role && getUserRole() !== to.meta.role) {
//         // 如果需要特定身份才能访问，且用户身份与要求不符，重定向到适当的页面
//         if (getUserRole() === 'passenger') {
//             next('/user');
//         } else if (getUserRole() === 'admin') {
//             next('/admin');
//         } else {
//             next('/'); // 其他情况重定向到主页或适当的页面
//         }
//     } else {
//         next(); // 其他情况允许继续导航
//     }
// });

export default router;
