import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@pages/home';
/* import types */
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@pages/detail'),
    children: [
      {
        path: ':id',
        component: () => import('@components/Detail')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
