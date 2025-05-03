<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { RouterLink } from 'vue-router'
import Image from 'primevue/image'
import LogoWhite from '@/assets/images/logos/logo-white.png'
import Button from 'primevue/button'
import { useThemeStore } from '@/stores/themeStore'
import { computed } from 'vue'

const themeStore = useThemeStore();

const iconTheme= computed(()=>(
  themeStore.isDark?"pi-moon":'pi-sun'
))

const emit = defineEmits(['toggle-menu']);
const emitToggleMenu = ()=>{
  emit('toggle-menu')
};



</script>

<template>
  <header>
  <Menubar class="bg-primary-900 dark:bg-primary-950 rounded-none border-0 ">
    <template #start>
      <div class="flex items-center gap-3 ">
        <i class="pi pi-bars text-xl text-surface-0 transition-colors duration-200 hover:text-surface-200 dark:hover:text-surface-300 cursor-pointer" @click="emitToggleMenu"/>
        <RouterLink to="home">
          <Image :src="LogoWhite" alt="Logo" width="48" />
        </RouterLink>
      </div>
    </template>
    <template #end>
    <div class="flex items-center gap-2">
      <Button :icon="`pi ${iconTheme}`" severity="info" rounded aria-label="Calendario" class="button-the-header" @click="themeStore.toggleTheme"/>
      <Button icon="pi pi-calendar" severity="info" rounded aria-label="Calendario" class="button-the-header" />
      <Button icon="pi pi-bell" severity="info" rounded aria-label="Notificaciones" class="button-the-header" />
      <RouterLink to="perfil"><Button icon="pi pi-user" severity="info" rounded aria-label="Usuario" class="button-the-header"  /></RouterLink>
    </div>
    </template>
  </Menubar>
</header>
</template>



