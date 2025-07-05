<script lang="ts" setup>
import { onMounted } from 'vue'
import CardAppointmentInfo from '@/components/CardAppointmentInfo.vue'

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
</script>

<template>
  <div class="layout-principal-flex">
    <CardAppointmentInfo v-bind="appointmentInfo" />
  </div>
</template>
