import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '@/views/dashboard/DashBoard.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashBoard,
    },
    {
      path: '/about',
      name: 'about',
    },
  ],
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.name === 'Dashboard' && !authStore.token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
