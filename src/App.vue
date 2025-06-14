<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/themeStore'
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';

const themeStore = useThemeStore();
onMounted(()=>{
themeStore.initTheme();
});
</script>

<template>
  <RouterView />
  <DynamicDialog />
  <ConfirmPopup/>
  <Toast/>
</template>

