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
      name: 'worms',
      path: '/worms',
      component: () => import('@/views/MarineSpeciesView.vue'),
    },
  ],
});

export default router;
