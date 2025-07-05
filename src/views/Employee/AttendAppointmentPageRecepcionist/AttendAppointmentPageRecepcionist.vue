<script lang="ts" setup>
import { onMounted } from 'vue'
import CardAppointmentInfo from '@/components/CardAppointmentInfo.vue'
import CardPetInfo from '@/components/CardPetInfo.vue'

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
  urlImage:string
} = {
  name: 'Thor',
  specieName: 'Perro',
  breedName: 'Salchicha',
  weight: 15,
  birthdate: '05/12/2023',
  gender: 'Macho',
  comment: 'Perro juguetón, le encanta correr, celoso, no le gusta que se le acerquen al dueño',
  urlImage: 'https://www.hola.com/horizon/43/d1eaad20c4c6-adobestock47432136.jpg'
}
</script>

<template>
  <div class="layout-principal-flex flex-col gap-2">
    <CardAppointmentInfo v-bind="appointmentInfo" />
    <div class="w-full grid grid-cols-2 gap-4">
    <CardPetInfo v-bind="petInfo"></CardPetInfo>
    </div>

  </div>
</template>
