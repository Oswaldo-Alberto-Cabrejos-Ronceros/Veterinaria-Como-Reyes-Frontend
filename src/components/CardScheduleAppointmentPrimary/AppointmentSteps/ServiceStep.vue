<script lang="ts" setup>
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import CardServiceSecondary from '@/components/CardServiceSecondary.vue'
defineProps<{
  services?: {
    serviceId: number
    serviceName: string
    serviceImageUrl: string
    specieName: string
    categoryName: string
    duration: string
    price: number
  }[]
}>()
</script>

<template>
  <!-- for service -->
  <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="2">
    <div class="min-h-48">
      <p>Servicio</p>
      <div class="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-4">
        <CardServiceSecondary
          v-for="service in services"
          :key="service.serviceId"
          :serviceId="service.serviceId"
          :serviceName="service.serviceName"
          :serviceImageUrl="service.serviceImageUrl"
          :specieName="service.specieName"
          :categoryName="service.categoryName"
          :duration="service.duration"
          :price="service.price"
        ></CardServiceSecondary>
      </div>
    </div>
    <div class="flex justify-between">
      <Button
        label="Atrás"
        severity="secondary"
        icon="pi pi-arrow-left"
        icon-pos="left"
        @click="activateCallback('1')"
      />

      <Button
        label="Siguiente"
        icon="pi pi-arrow-right"
        icon-pos="right"
        @click="activateCallback('3')"
      />
    </div>
  </StepPanel>
</template>
