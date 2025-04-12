import { createRouter, createWebHistory } from 'vue-router'
import ClientLayout from '@/layouts/ClientLayout.vue'
import EmployeeLayout from '@/layouts/EmployeeLayout.vue'
import LoginPage from '@/views/LoginPage/LoginPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/auth/login'
    },
    {
      path:'/auth',
      children:[
        {
          path:'login',
          name:'login',
          component:LoginPage
        }
      ]
    },
    {
      path:'/client',
      component:ClientLayout
    },
    {
      path:'/employee',
      component:EmployeeLayout
    }
  ],
})

export default router
