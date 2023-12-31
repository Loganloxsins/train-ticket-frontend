import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/index.vue';
import UserPage from '../pages/user.vue';
import LoginPage from '../pages/login.vue';
//import { isAuthenticated, getUserRole } from '../utils/auth';
import SearchPage from '../pages/search.vue';
import OrderPage from '../pages/order.vue';
import RoutePage from '../pages/route.vue';
import TrainPage from '../pages/train.vue';
import StationPage from '../pages/station.vue';
import {useUserStore} from "~/stores/user";
const user = useUserStore();

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
    {
        path: '/user/search',
        name: 'search',
        component: SearchPage,
        meta: { requiresAuth: true, role: 'passenger' }
    },
    {
        path: '/user/order',
        name: 'order',
        component: OrderPage,
        meta: { requiresAuth: true, role: 'passenger' }
    },
    {
        path: '/user/vipregister',
        name: 'vipregister',
        component: VipregisterPage,
        meta: { requiresAuth: true, role: 'passenger' }
    },
    {
        path: '/user/point',
        name: 'point',
        component: PointPage,
        meta: { requiresAuth: true, role: 'passenger' }
    },
    {
        path: '/admin/route',
        name: 'route',
        component: RoutePage,
        meta: { requiresAuth: true, role: 'admin' }
    },
    {
        path: '/admin/train',
        name: 'train',
        component: TrainPage,
        meta: { requiresAuth: true, role: 'admin' }
    },
    {
        path: '/admin/station',
        name: 'station',
        component: StationPage,
        meta: { requiresAuth: true, role: 'admin' }
    },
    {
        path: '/admin/route',
        name: 'route',
        component: RoutePage,
        meta: { requiresAuth: true, role: 'admin' }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
//刷新处理

// 添加全局导航守卫
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  
    if (to.path !== '/index' && !isLoggedIn) {
      // 用户未登录，重定向到登录页
      next('/index');
    } else if (to.path === '/index' && isLoggedIn) {
      // 用户已登录，重定向到首页或其他需要跳转的页面
      next('/userhome');
    } else {
      // 其他情况，允许继续导航
      next();
    }
  });

// router.beforeEach((to, from, next) => {
//     if(to.meta.requiresAuth ){
//         if(store.state.user.username){
//             next();
//     }
// }else{
//     user.$state.username = localStorage.getItem('username');
   


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
