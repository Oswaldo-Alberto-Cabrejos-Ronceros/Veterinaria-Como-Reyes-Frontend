<script setup lang="ts">
import { Button } from 'primevue';
//fuction for change theme
const toggleDarkTheme=()=>{
  document.documentElement.classList.toggle('dark');
  console.log("Cambiando tema")
}
</script>

<template>
<Button label="Cambiar Modo" @click="toggleDarkTheme()" />
</template>
