import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '@/views/dashboard/DashBoard.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import AddStore from '@/views/dashboard/AddStore.vue'
import EmployeeManagement from '@/views/employee/EmployeeManagement.vue'
import StoreManagement from '@/views/store/StoreManagement.vue'
import { useAuthStore } from '@/stores/auth'
import MainComponenet from '@/views/store/MainComponenet.vue'
import AddEmployeeDialog from '@/views/employee/AddEmployeeDialog.vue'

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
      path: '/store/:id',
      name: 'StoreManagement',
      component: StoreManagement,
      children: [
        {
          path: '',
          name: 'MainComponent',
          component: MainComponenet,
        },
        {
          path: 'employee',
          name: 'Employee',
          component: EmployeeManagement,
        },
      ],
    },
    {
      path: '/dashboard/addStore',
      name: 'AddStore',
      component: AddStore,
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
