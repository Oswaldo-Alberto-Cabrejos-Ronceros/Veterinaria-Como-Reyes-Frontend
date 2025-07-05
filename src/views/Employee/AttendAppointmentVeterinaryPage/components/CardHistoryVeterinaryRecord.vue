<script lang="ts" setup>
import Card from 'primevue/card'
import CardVeterinaryRecordSecondary from '@/components/CardVeterinaryRecordSecondary.vue'
defineProps<{
  veterinaryRecords: {
    recordId: number
    description: string
    serviceName: string
    status: string
    date: string
    time: string
    employeeName: string
  }[]
}>()
</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-file"></i>
        <p>Historial Médico</p>
      </div>
    </template>
    <template #subtitle>
      <p>Consultas y diagnosticos anteriores</p>
    </template>
    <template #content>
      <CardVeterinaryRecordSecondary class="mt-2"
        v-for="record of veterinaryRecords"
        :key="record.recordId"
        v-bind="record"
      />
    </template>
  </Card>
</template>
