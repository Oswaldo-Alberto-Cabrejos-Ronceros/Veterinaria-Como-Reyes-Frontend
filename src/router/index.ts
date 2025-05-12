import { createRouter, createWebHistory } from 'vue-router'
import ClientLayout from '@/layouts/ClientLayout.vue'
import EmployeeLayout from '@/layouts/EmployeeLayout.vue'
import LoginPage from '@/views/Auth/LoginPage/LoginPage.vue'
import RegistrationPage from '@/views/Auth/Registration/RegistrationPage.vue'
import HomePageClient from '@/views/Client/HomePage/HomePage.vue'
import HomePageEmployee from '@/views/Employee/HomePage/HomePage.vue'
import PerfilPage from '@/views/Common/PerfilPage/PerfilPage.vue'
import EmployeeManagementPage from '@/views/Employee/EmployeeManagementPage/EmployeeManagementPage.vue'
import ClientManagementPage from '@/views/Employee/ClientManagementPage/ClientManagementPage.vue'
import PetsManagementPage from '@/views/Employee/PetsManagementPage/PetsManagementPage.vue'
import ServiceManagementPage from '@/views/Employee/ServiceManagementPage/ServiceManagementPage.vue'
import PaymentMethodManagementPage from '@/views/Employee/PaymentMethodManagementPage/PaymentMethodManagementPage.vue'
import HeadquartersManagementPage from '@/views/Employee/HeadquartersManagementPage/HeadquartersManagementPage.vue'
import CategoryManagementPage from '@/views/Employee/CategoryManagementPage/CategoryManagementPage.vue'
import PetUnitaryPage from '@/views/Common/PetUnitaryPage/PetUnitaryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth/login',
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginPage,
        },
        {
          path: 'registration',
          name: 'registration',
          component: RegistrationPage,
        },
      ],
    },
    {
      path: '/client',
      redirect: '/client/home',
      component: ClientLayout,
      children: [
        {
          path: 'home',
          name: 'client-home',
          component: HomePageClient,
        },
        {
          path: 'perfil',
          name: 'client-perfil',
          component: PerfilPage,
        },
      ],
    },
    {
      path: '/employee',
      component: EmployeeLayout,
      redirect: '/',
      children: [
        {
          path: 'administrador',
          meta: { role: 'ADMINISTRATOR' },
          children: [
            {
              path: 'home',
              name: 'administrator-home',
              component: HomePageEmployee,
            },
            {
              path: 'perfil',
              name: 'administrator-perfil',
              component: PerfilPage,
            },
            {
              path: 'employee-management',
              name: 'administrator-employee-management',
              component: EmployeeManagementPage,
            },
            {
              path: 'client-management',
              name: 'administrator-client-management',
              component: ClientManagementPage,
            },
            {
              path: 'pets-management',
              name: 'administrator-pets-management',
              component: PetsManagementPage,
            },
            {
              path: 'services-management',
              name: 'administrator-services-management',
              component: ServiceManagementPage,
            },
            {
              path: 'payment-method-management',
              name: 'administrator-payment-method-management',
              component: PaymentMethodManagementPage,
            },
            {
              path: 'headquarter-management',
              name: 'administrator-headquarter-management',
              component: HeadquartersManagementPage,
            },
            {
              path: 'category-management',
              name: 'administrator-category-management',
              component: CategoryManagementPage,
            },

            {
              path: 'pet/:id',
              name: 'administrator-pets-management-pet',
              component: PetUnitaryPage,
              props: true,
            },
          ],
        },
        {
          path: 'manager',
          meta: { role: 'MANAGER' },
          redirect: '/employee/manager/home',
          children: [
            {
              path: 'home',
              name: 'manager-home',
              component: HomePageEmployee,
            },
            {
              path: 'perfil',
              name: 'maneger-perfil',
              component: PerfilPage,
            },
            {
              path: 'employee-management',
              name: 'manager-employee-management',
              component: EmployeeManagementPage,
            },
            {
              path: 'client-management',
              name: 'manager-client-management',
              component: ClientManagementPage,
            },
            {
              path: 'pets-management',
              name: 'manager-pets-management',
              component: PetsManagementPage,
            },
          ],
        },
        {
          path: 'receptionist',
          meta: { role: 'RECEPTIONIST' },
          redirect: '/employee/receptionist/home',
          children: [
            {
              path: 'home',
              name: 'receptionist-home',
              component: HomePageEmployee,
            },
            {
              path: 'perfil',
              name: 'receptionist-perfil',
              component: PerfilPage,
            },
            {
              path: 'pets-management',
              name: 'receptionist-pets-management',
              component: PetsManagementPage,
            },
          ],
        },
        {
          path: 'veterinary',
          meta: { role: 'VETERINARY' },
          redirect: '/employee/veterinary/home',
          children: [
            {
              path: 'home',
              name: 'veterinary-home',
              component: HomePageEmployee,
            },
            {
              path: 'perfil',
              name: 'veterinary-perfil',
              component: PerfilPage,
            },
          ],
        },
      ],
    },
  ],
})

export default router
