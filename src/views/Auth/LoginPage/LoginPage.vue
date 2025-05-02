<script setup lang="ts">

import CardLogin from './components/CardLogin.vue'
import SwitchTheme from '@/components/SwitchTheme.vue';

//for theme

</script>
<template>
  <div class="layout-principal-flex relative" >
    <div class="p-2 absolute top-0 w-full flex justify-end">
      <SwitchTheme/>
    </div>


  <CardLogin class=" self-center"/>


  </div>
</template>
