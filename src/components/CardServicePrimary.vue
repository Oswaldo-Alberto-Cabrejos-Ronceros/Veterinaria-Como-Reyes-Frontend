<script lang="ts" setup>
import CardPrimary from './CardPrimary.vue'
import Image from 'primevue/image'
defineProps<{
  serviceId:number,
  serviceName: string
  serviceImageUrl: string
  specieName: string
  categoryName: string
  duration: number
  price: number
}>()
</script>

<template>
  <CardPrimary>
    <div class="w-full flex justify-end h-40">
      <Image :src="serviceImageUrl" image-class="size-40 object-cover" :alt="serviceName" />
      <div class="flex-1 flex flex-col gap-2 p-3">
        <p class="text-lg font-medium">{{ serviceName }}</p>
        <p>{{ specieName }}</p>
        <p>{{ categoryName }}</p>
        <div class="w-full flex gap-1 text-lg flex-1 items-center justify-between">
          <div class="flex gap-1 text-pink-500 items-center">
            <i class="pi pi-clock text-xl"></i>
            <p>{{ duration }}</p>
          </div>

          <div class="flex gap-1 text-green-500 items-center">
            <i class="pi pi-money-bill text-xl"></i>
            <p>S/{{ price }}</p>
          </div>
        </div>
      </div>
    </div>
  </CardPrimary>
</template>
