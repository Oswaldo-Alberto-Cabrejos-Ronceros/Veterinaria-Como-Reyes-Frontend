<script lang="ts" setup>
import Card from 'primevue/card'
import Image from 'primevue/image'
defineProps<{
  serviceId: number
  serviceName: string
  serviceImageUrl: string
  specieName: string
  categoryName: string
  duration: string
  price: number
}>()
</script>

<template>
  <Card class="overflow-hidden max-w-lg">
    <template #header>
      <Image :src="serviceImageUrl" image-class="w-full h-40 object-cover" :alt="serviceName" />
    </template>
    <template #content>
      <div class="flex w-full flex-col gap-2">
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
    </template>
  </Card>
</template>
