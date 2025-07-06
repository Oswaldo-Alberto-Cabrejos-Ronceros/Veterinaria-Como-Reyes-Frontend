<script lang="ts" setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { ref } from 'vue'

const props = defineProps<{
  serviceName: string
  price: number
}>()

//ref

const subtotal = ref<number>(props.price * 0.82)
const igv = ref<number>(Number((props.price - subtotal.value).toFixed(1)))
</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-money-bill"></i>
        <p>Facturación</p>
      </div>
    </template>
    <template #subtitle>
      <p>Procesamiento de pago</p>
    </template>
    <template #content>
      <h3 class="textLg font-semibold">Servicio programado</h3>
      <div
        class="mt-4 rounded-sm bg-surface-100 dark:bg-surface-800 flex items-center justify-between p-3"
      >
        <p class="textLg font-semibold">{{ serviceName }}</p>
        <p class="textLg font-semibold text-green-600 dark:text-green-400">S/ 80</p>
      </div>
      <Divider />
      <div class="textLg flex items-center justify-between">
        <p>Subtotal:</p>
        <p>S/ {{ subtotal }}</p>
      </div>
      <div class="textLg flex items-center justify-between mt-2">
        <p>IGV (18%):</p>
        <p>S/ {{ igv }}</p>
      </div>
      <Divider />
      <div
        class="textLg mb-4 font-bold text-green-600 dark:text-green-400 flex items-center justify-between"
      >
        <p>Total:</p>
        <p>S/ {{ price }}</p>
      </div>
      <p>Método de pago</p>
      <Select placeholder="Seleccione método de pago" class="w-full mt-4" fluid />
      <div class="w-full flex gap-4 mt-4">
        <Button
          severity="success"
          icon-pos="left"
          icon="pi pi-credit-card"
          label="Procesar pago"
          class="flex-1"
        />
        <Button
          label="Generar Boleta"
          icon="pi pi-receipt"
          icon-pos="left"
          variant="outlined"
          severity="secondary"
        />
      </div>
    </template>
  </Card>
</template>
