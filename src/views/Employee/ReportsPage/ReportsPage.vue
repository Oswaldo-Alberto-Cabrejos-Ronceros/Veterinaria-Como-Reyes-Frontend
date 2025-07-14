<script lang="ts" setup>
import Card from 'primevue/card'
import CardGenerateReport from '@/components/CardGenerateReport.vue'
import { useDialog } from 'primevue'
import CardFormGenerateReport from '@/components/CardFormGenerateReport.vue'
import type { FormValues as SchemaGenerateReport } from '@/validation-schemas-forms/schema-generate-report'

const reportTypes: {
  title: string
  icon: string
  description: string
  incluyedFields: string[]
  lastGeneraded: number
}[] = [
  {
    title: 'Ingresos por servicios',
    icon: 'fa-solid fa-shield-dog',
    description: 'Recuento de ingresos por servicios',
    incluyedFields: ['Servicio', 'Precio unitario', 'Cantidad', 'Total'],
    lastGeneraded: 5,
  },
  {
    title: 'Ingresos por metodo de pago',
    icon: 'pi pi-money-bill',
    description: 'Recuento de ingresos por metodos de pago',
    incluyedFields: ['Cantidad de ingresos', 'Especie'],
    lastGeneraded: 5,
  },
  {
    title: 'Atenciones por sede y veterinario',
    icon: 'fa-solid fa-house-medical',
    description: 'Recuento de atenciones por sede y veterinario',
    incluyedFields: ['Cantidad de ingresos', 'Especie'],
    lastGeneraded: 5,
  },
]

const dialog = useDialog()

const generateReport = () => {
  dialog.open(CardFormGenerateReport, {
    props: {
      modal: true,
      header: 'Generar reporte',
    },
    onClose: async (options) => {
      const data = options?.data as SchemaGenerateReport
      if (data) {
        console.log('Datos recibidos', data)
      }
    },
  })
}
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
            v-ripple
            class="cursor-pointer"
            v-for="(reportType, item) of reportTypes"
            :key="item"
            v-bind="reportType"
            @click="generateReport"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
