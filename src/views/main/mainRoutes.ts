import { h, resolveComponent } from 'vue';
import { withNestedView } from '@/router/loadView';
import type { RouteRecordRaw } from 'vue-router';

const loadView = withNestedView('main');

export const mainRoutes: RouteRecordRaw[] = [
  {
    name: 'Main',
    path: '/',
    redirect: '/main/all',
    component: {
      render: () => h(resolveComponent('router-view')),
    },
    children: [
      {
        name: 'MainPage',
        path: '/main/:id',
        component: loadView('MainPage'),
      },
    ],
  },
];
