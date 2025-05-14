<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import type { MenuItem } from 'primevue/menuitem'
import { computed, ref, watch } from 'vue'
import {useRoute } from 'vue-router'
import MenuNav from '@/components/MenuNav.vue'

//for now getting the role by router
const route = useRoute()
const role = ref(route.meta.role as string)

const roleMap: Record<string, number> = {
  ADMINISTRATOR: 0,
  MANAGER: 1,
  VETERINARY: 2,
  RECEPTIONIST: 3
}

const items = ref<MenuItem[][]>([
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/administrador/home',
    },
    {
      label: 'Empleados',
      icon: 'pi pi-users',
      to: '/employee/administrador/employee-management',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/employee/administrador/client-management',
    },
    {
      label: 'Mascotas',
      icon: 'pi pi-github',
      to: '/employee/administrador/pets-management',
    },
        {
      label: 'Categorias',
      icon: 'pi pi-sort-amount-up-alt',
      to: '/employee/administrador/category-management',
    },
    {
      label: 'Servicios',
      icon: 'pi pi-calendar-plus',
      to: '/employee/administrador/services-management',
    },
        {
      label: 'Métodos de Pago',
      icon: 'pi pi-wallet',
      to: '/employee/administrador/payment-method-management',
    },
    {
      label: 'Sedes',
      icon: 'pi pi-map-marker',
      to: '/employee/administrador/headquarter-management',
    },
        {
      label: 'Roles y Permisos',
      icon: 'pi pi-user-plus',
      to: '/employee/administrador/roles-permission',
    },
    {
      label: 'Especies',
      icon: 'pi pi-github',
      to: '/employee/administrador/species-management',
    },    {
      label: 'Razas',
      icon: 'pi pi-github',
      to: '/employee/administrador/breeds-management',
    },
     {
      label: 'Servicios por Sede',
      icon: 'pi pi-arrow-right-arrow-left',
      to: '/employee/administrador/services-headquarters-management',
    },

  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: 'home',
    },
    {
      label: 'Empleados',
      icon: 'pi pi-users',
      to: 'employee-management',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: 'client-management',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: 'home',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/',
    },
    {
      label: 'Mascotas',
      icon: 'pi pi-github',
      to: 'pets-management',
    },
  ],
])

watch(
  () => route.meta.role,
  (newRole) => {
    role.value = newRole as string
  },

)

const itemsRole = computed(() => items.value[roleMap[role.value]] ?? [])

const showMenu = ref(true);

const toggleMenu = ()=>{
  showMenu.value=!showMenu.value;
}




</script>
<template>
  <div class="w-full min-h-screen flex flex-col">
    <TheHeader @toggle-menu="toggleMenu" />

    <main class="w-full flex-1 flex p-2 overflow-hidden">
<MenuNav :items="itemsRole" :show-menu="showMenu" @update:show-menu="showMenu=$event"/>

      <section
        class="flex-1 h-auto px-0.5 xs:px-4 transition-all duration-200 ease-out"
      >
        <router-view />
      </section>
    </main>
  </div>
</template>

