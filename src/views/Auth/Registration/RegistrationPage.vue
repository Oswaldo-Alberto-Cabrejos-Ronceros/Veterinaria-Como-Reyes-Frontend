<script setup lang="ts">
import CardRegistration from './components/CardRegistration.vue';
import SwitchTheme from '@/components/SwitchTheme.vue';
</script>

<template>
    <div class="layout-principal-flex py-4 relative">
      <div class="p-2 absolute top-0 w-full flex justify-end">
      <SwitchTheme/>
    </div>
        <CardRegistration/>
    </div>
</template>
