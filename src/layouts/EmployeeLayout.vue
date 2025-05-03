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
  MANAGER: 0,
  ADMINISTRATOR: 1,
  VETERINARY: 2,
  RECEPTIONIST: 3,
}

const items = ref<MenuItem[][]>([
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: 'home',
    },
    {
      label: 'Empleados',
      icon: 'pi pi-users',
      to: '/',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/',
    },
    {
      label: 'Administradores',
      icon: 'pi pi-users',
      to: '/',
    },
    {
      label: 'Mascotas',
      icon: 'pi pi-github',
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
      label: 'Empleados',
      icon: 'pi pi-users',
      to: '/',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/',
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
      to: '/',
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

