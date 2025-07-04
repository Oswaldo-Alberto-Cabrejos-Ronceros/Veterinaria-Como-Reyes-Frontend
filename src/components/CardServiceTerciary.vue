<script lang="ts" setup>
import Image from 'primevue/image'
import Button from 'primevue/button'
defineProps<{
  serviceId: number
  serviceName: string
  serviceImageUrl: string
  specieName: string
  categoryName: string
  duration: number
  price: string
}>()
</script>

<template>
  <div class=" card-primary flex w-full p-4 items-center gap-3">
    <Image
      class="size-max shadow self-start"
      image-class=" rounded size-12 object-cover"
      :src="serviceImageUrl"
    />
    <div class="flex-1 flex flex-col gap-1 justify-center items-start">
      <p class="font-semibold">{{ serviceName }}</p>
      <p class="text-neutral-500">{{ `${categoryName} - ${specieName}` }}</p>
      <div class="w-full flex justify-between text-neutral-500">
        <div class="flex gap-1 items-center">
          <i class="pi pi-money-bill"></i>
          <p>S/{{ price }}</p>
          <i class="pi pi-clock"></i>
          <p>{{ duration }} min</p>
        </div>
        <Button class=" py-1.5" size="small" label="Agendar" icon="pi pi-plus" icon-pos="left"></Button>
      </div>
    </div>
  </div>
</template>
