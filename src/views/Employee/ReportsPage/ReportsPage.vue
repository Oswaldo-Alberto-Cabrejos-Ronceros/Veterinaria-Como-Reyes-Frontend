<script lang="ts" setup>
import Card from 'primevue/card'
import CardGenerateReport from '@/components/CardGenerateReport.vue'

const reportTypes: {
  title: string
  icon: string
  description: string
  incluyedFields: string[]
  lastGeneraded: number
}[] = [
  {
    title: 'Ingresos por especie',
    icon: 'fa-solid fa-shield-dog',
    description: 'Recuento de ingresos por especie',
    incluyedFields: ['Cantidad de ingresos', 'Especie'],
    lastGeneraded: 5,
  },
    {
    title: 'Ingresos por especie',
    icon: 'fa-solid fa-shield-dog',
    description: 'Recuento de ingresos por especie',
    incluyedFields: ['Cantidad de ingresos', 'Especie'],
    lastGeneraded: 5,
  },
]
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">Reportes</h2>
      </template>
      <template #subtitle>
        <p>Genera y descarga reportes en formato pdf y excel</p>
      </template>
      <template #content>
        <div class="w-full grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-4">
          <CardGenerateReport
            v-for="(reportType, item) of reportTypes"
            :key="item"
            v-bind="reportType"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
