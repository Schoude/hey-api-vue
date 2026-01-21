import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      name: 'cats',
      path: '/cats',
      component: () => import('@/views/CatsView.vue'),
    },
    {
      name: 'dogs',
      path: '/dogs',
      component: () => import('@/views/DogsView.vue'),
    },
  ],
});

export default router;
