<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import MenuNav from '@/components/MenuNav.vue'

//for menuItems
const items = ref<MenuItem[]>([
  {
    label: 'Inicio',
    icon: 'pi pi-home',
    to: '/client/home',
  },
  {
    label: 'Citas',
    icon: 'pi pi-clipboard',
    to: '/client/my-appointments',
  },
])

const showMenu = ref(true)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>
<template>
  <div class="w-full min-h-screen flex flex-col">
    <TheHeader @toggle-menu="toggleMenu" />

    <main class="w-full flex-1 flex p-2 overflow-hidden">
      <MenuNav :items="items" :show-menu="showMenu" @update:show-menu="showMenu = $event" />
      <section class="flex-1 h-auto px-0.5 xs:px-4 transition-all duration-200 ease-out">
        <router-view />
      </section>
    </main>
  </div>
</template>
