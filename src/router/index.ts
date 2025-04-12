import { createRouter, createWebHistory } from 'vue-router'

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
    }
  ],
})

export default router
