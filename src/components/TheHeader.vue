<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { RouterLink } from 'vue-router'
import Image from 'primevue/image'
import LogoWhite from '@/assets/images/logos/logo-white.png'
import Button from 'primevue/button'
import ButtonTheme from './ButtonTheme.vue'
</script>

<template>
  <Menubar class="bg-primary-900 dark:bg-primary-950 rounded-none border-0 ">
    <template #start>
      <div class="flex items-center gap-3 ">
        <i class="pi pi-bars text-xl text-surface-0 transition-colors duration-200 hover:text-surface-200 dark:hover:text-surface-300"/>
        <RouterLink to="/">
          <Image :src="LogoWhite" alt="Logo" width="48" />
        </RouterLink>
      </div>
    </template>
    <template #end>
    <div class="flex items-center gap-2">
      <ButtonTheme/>
      <Button icon="pi pi-sun" severity="info" rounded aria-label="Calendario" class="button-the-header" />
      <Button icon="pi pi-calendar" severity="info" rounded aria-label="Calendario" class="button-the-header" />
      <Button icon="pi pi-bell" severity="info" rounded aria-label="Notificaciones" class="button-the-header" />
      <Button icon="pi pi-user" severity="info" rounded aria-label="Usuario" class="button-the-header"  />
    </div>
    </template>
  </Menubar>
</template>


