import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      meta: { transition: 'fade' },
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/DetailsView.vue'),
      props: { default: true, sidebar: false }
    }
  ]
})

export default router
