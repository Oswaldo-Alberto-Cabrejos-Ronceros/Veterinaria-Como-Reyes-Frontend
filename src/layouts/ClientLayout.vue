<script setup lang="ts" >
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
<TheHeader>
  <router-view/>
</TheHeader>
  </div>
</template>
