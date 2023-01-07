import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/views/main/mainRoutes';

const routes = [
  ...mainRoutes,
  {
    path: '/:catchAll(.*)',
    redirect: '/main/all',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
