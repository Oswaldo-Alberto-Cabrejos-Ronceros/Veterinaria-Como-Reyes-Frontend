<script lang="ts" setup>
import CardPrimary from './CardPrimary.vue'
import Image from 'primevue/image'

defineProps<{
  appointmentId: number
  serviceImageUrl: string
  serviceName: string
  petName: string
  date: string
  time: string
}>()
</script>
<template>
  <CardPrimary>
    <div class="w-full flex justify-end">
      <Image
        :src="serviceImageUrl"
        image-class="size-40 object-cover"
        :alt="serviceName"
      />
      <div class="flex-1 flex flex-col gap-2 p-3">
        <p class="text-lg font-medium">{{ serviceName }}</p>
        <p>{{ petName }}</p>
        <div class="w-full flex justify-between text-lg flex-1 items-end">
          <p>{{ date }}</p>
          <p>{{ time }}</p>
        </div>
      </div>
    </div>
  </CardPrimary>
</template>
