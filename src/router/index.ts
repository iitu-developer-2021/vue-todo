import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/views/main/mainRoutes';

const routes = [...mainRoutes];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
