import { createRouter, createWebHistory } from 'vue-router'
import ClientLayout from '@/layouts/ClientLayout.vue'
import EmployeeLayout from '@/layouts/EmployeeLayout.vue'
import LoginPage from '@/views/Auth/LoginPage/LoginPage.vue'
import RegistrationPage from '@/views/Auth/Registration/RegistrationPage.vue'
import HomePageClient from '@/views/Client/HomePage/HomePage.vue'
import HomePageAdministrator from '@/views/Employee/Administrator/HomePage/HomePage.vue'
import HomePageManager from '@/views/Employee/Manager/HomePage/HomePage.vue'
import HomePageReceptionist from '@/views/Employee/Receptionist/HomePage/HomePage.vue'
import HomePageVeterinary from '@/views/Employee/Veterinary/HomePage/HomePage.vue'

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
        },
        {
          path:'registration',
          name:'registration',
          component:RegistrationPage
        }
      ]
    },
    {
      path:'/client',
      redirect:'/client/home',
      component:ClientLayout,
      children:[
        {
          path:'home',
          name:'client-home',
          component:HomePageClient
        }
      ]
    },
    {
      path:'/employee',
      component:EmployeeLayout,
      redirect:'/',
      children:[
        {
          path:'administrador',
          meta: { role:'ADMINISTRATOR' },
          children:[
            {
              path:'home',
              name:'administrator-home',
              component:HomePageAdministrator
            }
          ]
        },
        {
          path:'manager',
          meta: { role:'MANAGER' },
          redirect:'/employee/manager/home',
          children:[
            {
              path:'home',
              name:'manager-home',
              component:HomePageManager
            }
          ]
        },
        {
          path:'receptionist',
          meta: { role:'RECEPTIONIST' },
          redirect:'/employee/receptionist/home',
          children:[
            {
              path:'home',
              name:'receptionist-home',
              component:HomePageReceptionist
            }
          ]
        },
        {
          path:'veterinary',
          meta: { role:'VETERINARY' },
          redirect:'/employee/veterinary/home',
          children:[
            {
              path:'home',
              name:'veterinary-home',
              component:HomePageVeterinary
            }
          ]
        }
      ]
    }
  ],
})

export default router
