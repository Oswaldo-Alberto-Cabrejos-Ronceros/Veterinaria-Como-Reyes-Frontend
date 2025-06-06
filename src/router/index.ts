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
import RolePermissionManagementPage from '@/views/Employee/RolePermissionManagementPage/RolePermissionManagementPage.vue'
import SpecieManagementPage from '@/views/Employee/SpecieManagementPage/SpecieManagementPage.vue'
import BreedManagementPage from '@/views/Employee/BreedManagementPage/BreedManagementPage.vue'
import ServicesHeadquarterManagementPage from '@/views/Employee/ServicesHeadquarterManagementPage/ServicesHeadquarterManagementPage.vue'
import PaymentManagementPage from '@/views/Employee/PaymentManagementPage/PaymentManagementPage.vue'
//client
import MyAppointmentsClientPage from '@/views/Client/MyAppointmentsClientPage/MyAppointmentsClientPage.vue'
import MyPetsPage from '@/views/Client/MyPetsPage/MyPetsPage.vue'
import PetUnitaryClientPage from '@/views/Client/PetUnitaryClientPage/PetUnitaryClientPage.vue'

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
        {
          path: 'my-appointments',
          name: 'client-my-appointments',
          component: MyAppointmentsClientPage,
        },
        {
          path: 'my-pets',
          name: 'client-my-pets',
          component: MyPetsPage,
        },
        {
          path: 'my-pets/:id',
          name: 'client-pets-unitary-pet',
          component: PetUnitaryClientPage,
          props: true,
        },
      ],
    },
    {
      path: '/employee',
      component: EmployeeLayout,
      redirect: '/',
      children: [
        {
          path: 'administrator',
          meta: { role: 'ADMINISTRATOR' },

          children: [
            {
              path: '',
              redirect: '/employee/administrator/home',
            },
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
              name: 'administrator-pets-unitary-pet',
              component: PetUnitaryPage,
              props: true,
            },
            {
              path: 'roles-permission',
              name: 'administrator-roles-permission-management',
              component: RolePermissionManagementPage,
            },
            {
              path: 'species-management',
              name: 'administrator-species-management',
              component: SpecieManagementPage,
            },
            {
              path: 'breeds-management',
              name: 'administrator-breeds-management',
              component: BreedManagementPage,
            },
            {
              path: 'services-headquarters-management',
              name: 'administrator-services-headquarters-management',
              component: ServicesHeadquarterManagementPage,
            },
            {
              path: 'payment-management',
              name: 'administrator-payment-management',
              component: PaymentManagementPage,
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
            {
              path: 'payment-management',
              name: 'receptionist-payment-management',
              component: PaymentManagementPage,
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
            {
              path: 'pets-management',
              name: 'veterinary-pets-management',
              component: PetsManagementPage,
            },
          ],
        },
      ],
    },
  ],
})

export default router
