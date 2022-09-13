import { createRouter, createWebHistory, } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    name: 'lost',
    path: '/:_(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * @description: 白名单
 */
// const whiteNames = ['/login', '/license']

// router.beforeEach((to) => {

// });

export default router;
