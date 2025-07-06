<script lang="ts" setup>
import Card from 'primevue/card'
import Image from 'primevue/image'
defineProps<{
  serviceId: number
  serviceName: string
  serviceImageUrl: string
  specieName: string
  categoryName: string
  duration: number
  price: string
  selected?: boolean
}>()
</script>

<template>
  <Card
    class="overflow-hidden card-primary max-w-lg transition-opacity duration-300 hover:opacity-80 group cursor-pointer"
    :class="
      selected
        ? ' bg-surface-100 hover:bg-surface-50 dark:bg-surface-950 hover:dark:bg-surface-900 !border-primary-500 !dark:border-primary-900'
        : ''
    "
  >
    <template #header>
      <Image
        :src="serviceImageUrl"
        image-class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        :alt="serviceName"
      />
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
