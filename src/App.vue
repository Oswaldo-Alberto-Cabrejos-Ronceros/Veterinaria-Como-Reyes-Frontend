<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/themeStore';
import DynamicDialog from 'primevue/dynamicdialog'

const themeStore = useThemeStore();
onMounted(()=>{
themeStore.initTheme();
});
</script>

<template>
  <RouterView />
  <DynamicDialog />
</template>

