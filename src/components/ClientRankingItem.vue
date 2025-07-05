<script lang="ts" setup>
import Avatar from 'primevue/avatar'
defineProps<{
  clientName: string
  clientLastname: string
  clientDni: string
}>()
</script>
<template>
  <div class="flex w-full p-2 items-center gap-3">
    <Avatar class="size-10"  shape="circle" :label="clientLastname.charAt(0) + clientName.charAt(0)"> </Avatar>
    <div class="flex-1 flex flex-col justify-center items-start">
      <p class="font-semibold">{{ `${clientName} ${clientLastname}` }}</p>
      <p class="text-neutral-500">{{ clientDni }}</p>
    </div>
  </div>
</template>
