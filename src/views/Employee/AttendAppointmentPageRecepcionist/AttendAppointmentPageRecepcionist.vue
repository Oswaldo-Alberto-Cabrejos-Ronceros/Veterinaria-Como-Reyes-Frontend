<script lang="ts" setup>
import { onMounted } from 'vue'
import CardAppointmentInfo from '@/components/CardAppointmentInfo.vue'
import CardPetInfo from '@/components/CardPetInfo.vue'
import CardOwnerInfo from '@/components/CardOwnerInfo.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Select from 'primevue/select'

const props = defineProps<{
  appointmentId: string
}>()

onMounted(async () => {
  console.log(props.appointmentId)
})

const appointmentInfo: {
  time: string
  serviceDuration: number
  serviceName: string
  veterinaryName: string
  comentario?: string
} = {
  time: '9:30',
  serviceDuration: 30,
  serviceName: 'Consulta general',
  veterinaryName: 'Paolo Cueva',
  comentario: 'Consulta de rutina',
}

const petInfo: {
  name: string
  specieName: string
  breedName: string
  weight: number
  birthdate: string
  gender: string
  comment: string
  urlImage: string
} = {
  name: 'Thor',
  specieName: 'Perro',
  breedName: 'Salchicha',
  weight: 15,
  birthdate: '05/12/2023',
  gender: 'Macho',
  comment: 'Perro juguetón, le encanta correr, celoso, no le gusta que se le acerquen al dueño',
  urlImage: 'https://www.hola.com/horizon/43/d1eaad20c4c6-adobestock47432136.jpg',
}

const ownerInfo: {
  name: string
  lastname: string
  phone: string
  email: string
  address: string
} = {
  name: 'Oswaldo Alberto',
  lastname: 'Cabrejos Ronceros',
  phone: '984156123',
  email: 'oswaldocabrejosr@gmail.com',
  address: 'Av. Brasil',
}
</script>

<template>
  <div class="layout-principal-flex flex-col gap-2">
    <CardAppointmentInfo v-bind="appointmentInfo" />
    <div class="w-full grid grid-cols-2 gap-4">
      <CardPetInfo v-bind="petInfo"></CardPetInfo>
      <CardOwnerInfo v-bind="ownerInfo" />
    </div>
    <!-- control -->
    <Card class="card-primary w-full">
      <template #title>
        <div class="flex gap-2 items-center">
          <i class="pi pi-clock"></i>
          <p>Control de cita</p>
        </div>
      </template>
      <template #subtitle>
        <p>Control de estado y tiempo de la cita</p>
      </template>
      <template #content>
        <div class="w-full grid grid-cols-2 gap-4">
          <!-- complete -->
          <div
            class="p-4 shadow-none border-1 rounded-sm border-blue-500 bg-blue-50 dark:bg-transparent w-full flex justify-between items-center"
          >
            <div class="text-blue-600 dark:text-blue-400">
              <p>Hora de llegada</p>
              <p class="textLg font-bold">10:30</p>
            </div>
            <Button
              size="small"
              icon="pi pi-check-circle"
              icon-pos="left"
              label="Confirmar llegada"
              class="bg-blue-500 border-blue-500"
            />
          </div>
          <!-- time -->
          <div
            class="p-4 shadow-none border-1 rounded-sm border-green-500 bg-green-50 dark:bg-transparent w-full flex justify-between items-center"
          >
            <div class="text-green-600 dark:text-green-400">
              <p>Tiempo de espera</p>
              <p class="textLg font-bold">5 minutos</p>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- payment -->

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
          <p class="textLg font-semibold">Consulta General</p>
          <p class="textLg font-semibold text-green-600 dark:text-green-400">S/ 80</p>
        </div>
        <Divider />
        <div class="textLg flex items-center justify-between">
          <p>Subtotal:</p>
          <p>S/ 65.6</p>
        </div>
        <div class="textLg flex items-center justify-between mt-2">
          <p>IGV (18%):</p>
          <p>S/ 14.4</p>
        </div>
        <Divider />
        <div
          class="textLg mb-4 font-bold text-green-600 dark:text-green-400 flex items-center justify-between"
        >
          <p>Total:</p>
          <p>S/ 80</p>
        </div>
        <p>Método de pago</p>
        <Select placeholder="Seleccione método de pago" class="w-full mt-4" fluid/>
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
  </div>
</template>
