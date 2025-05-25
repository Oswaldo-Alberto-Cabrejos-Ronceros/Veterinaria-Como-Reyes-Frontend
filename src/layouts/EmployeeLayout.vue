<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import type { MenuItem } from 'primevue/menuitem'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MenuNav from '@/components/MenuNav.vue'

//for now getting the role by router
const route = useRoute()
const role = ref(route.meta.role as string)

const roleMap: Record<string, number> = {
  ADMINISTRATOR: 0,
  MANAGER: 1,
  VETERINARY: 2,
  RECEPTIONIST: 3,
}

const items = ref<MenuItem[][]>([
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/administrator/home',
    },
    {
      label: 'Empleados',
      icon: 'pi pi-users',
      to: '/employee/administrator/employee-management',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/employee/administrator/client-management',
    },
    {
      label: 'Mascotas',
      icon: 'pi pi-github',
      to: '/employee/administrator/pets-management',
    },
    {
      label: 'Categorias',
      icon: 'pi pi-sort-amount-up-alt',
      to: '/employee/administrator/category-management',
    },
    {
      label: 'Servicios',
      icon: 'pi pi-calendar-plus',
      to: '/employee/administrator/services-management',
    },
    {
      label: 'Métodos de Pago',
      icon: 'pi pi-wallet',
      to: '/employee/administrator/payment-method-management',
    },
    {
      label: 'Sedes',
      icon: 'pi pi-map-marker',
      to: '/employee/administrator/headquarter-management',
    },
    {
      label: 'Roles y Permisos',
      icon: 'pi pi-user-plus',
      to: '/employee/administrator/roles-permission',
    },
    {
      label: 'Especies',
      icon: 'pi pi-github',
      to: '/employee/administrator/species-management',
    },
    {
      label: 'Razas',
      icon: 'pi pi-github',
      to: '/employee/administrator/breeds-management',
    },
    {
      label: 'Servicios por Sede',
      icon: 'pi pi-arrow-right-arrow-left',
      to: '/employee/administrator/services-headquarters-management',
    },
    {
      label: 'Pagos',
      icon: 'pi pi-receipt',
      to: '/employee/administrator/payment-management',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/manager/home',
    },
    {
      label: 'Empleados',
      icon: 'pi pi-users',
      to: '/employee/manager/employee-management',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/employee/manager/client-management',
    },
    {
      label: 'Mascotas',
      icon: 'pi pi-github',
      to: '/employee/manager/pets-management',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/veterinary/home',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/',
    },
    {
      label: 'Mascotas',
      icon: 'pi pi-github',
      to: '/employee/veterinary/pets-management',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/receptionist/home',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/',
    },
    {
      label: 'Mascotas',
      icon: 'pi pi-github',
      to: '/employee/receptionist/pets-management',
    },
    {
      label: 'Pagos',
      icon: 'pi pi-receipt',
      to: '/employee/receptionist/payment-management',
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

const showMenu = ref(true)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>
<template>
  <div class="w-full min-h-screen flex flex-col">
    <TheHeader @toggle-menu="toggleMenu" />

    <main class="w-full flex-1 flex p-2 overflow-hidden">
      <MenuNav :items="itemsRole" :show-menu="showMenu" @update:show-menu="showMenu = $event" />

      <section class="flex-1 h-auto px-0.5 xs:px-4 transition-all duration-200 ease-out">
        <router-view />
      </section>
    </main>
  </div>
</template>
