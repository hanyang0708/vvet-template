import { createRouter, createWebHashHistory } from 'vue-router';

const history = createWebHashHistory();

const router = createRouter({
    history, // 路由模式
    routes: [
        {
            // 主页
            path: '/',
            name: 'Index',
            component: () => import("@/components/HelloWorld.vue")
        }
    ],
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;
