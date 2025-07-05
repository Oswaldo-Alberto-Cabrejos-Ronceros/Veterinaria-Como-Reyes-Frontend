<script lang="ts" setup>
import Avatar from 'primevue/avatar'
defineProps<{
  clientName: string
  clientLastname: string
  petName: string
  serviceName: string
}>()
</script>

<template>
  <div class="card-primary flex w-full p-2 items-center gap-3">
    <Avatar class="size-10" shape="circle" :label="clientLastname.charAt(0) + clientName.charAt(0)">
    </Avatar>
    <div class="flex-1 flex flex-col justify-center items-start">
      <p>{{ clientName }} {{ clientLastname }}</p>
      <p class="text-neutral-500 text-sm">{{ petName }} - {{ serviceName }}</p>
    </div>
    <i class="pi pi-clock ml-4 text-lg"> </i>
  </div>
</template>
