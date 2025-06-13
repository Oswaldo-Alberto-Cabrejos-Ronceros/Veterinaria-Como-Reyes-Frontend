<script lang="ts" setup>
import Card from 'primevue/card'
import CardAppointmentSecondary from '@/components/CardAppointmentSecondary.vue'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
//examples for cardAppointments
const appointments = [
  {
    appointmentId: 101,
    appointmentStatus: 'Pendiente',
    date: '2025-06-05',
    petName: 'Max',
    duration: '45 min',
    serviceName: 'Baño Canino',
    serviceDescription: 'Baño completo con productos especiales para el cuidado del pelaje canino.',
  },
  {
    appointmentId: 102,
    appointmentStatus: 'Completado',
    date: '2025-06-01',
    petName: 'Luna',
    duration: '30 min',
    serviceName: 'Consulta Veterinaria',
    serviceDescription:
      'Evaluación médica general para detectar enfermedades y controlar el estado de salud.',
  },
  {
    appointmentId: 103,
    appointmentStatus: 'Cancelado',
    date: '2025-05-29',
    petName: 'Milo',
    duration: '15 min',
    serviceName: 'Vacunación Antirrábica',
    serviceDescription: 'Aplicación de vacuna antirrábica según el calendario nacional.',
  },
  {
    appointmentId: 104,
    appointmentStatus: 'En progreso',
    date: '2025-06-03',
    petName: 'Nina',
    duration: '20 min',
    serviceName: 'Desparasitación Interna',
    serviceDescription: 'Tratamiento para eliminar parásitos intestinales en mascotas.',
  },
  {
    appointmentId: 105,
    appointmentStatus: 'Pendiente',
    date: '2025-06-06',
    petName: 'Toby',
    duration: '10 min',
    serviceName: 'Corte de Uñas',
    serviceDescription: 'Recorte de uñas para evitar lesiones o molestias al caminar.',
  },
]

//for router
const router = useRouter()

const redirectToScheduleAppointment = () => {
  router.push('/client/my-appointments/schedule-appointment')
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <div class="flex justify-between">
          <h3 class="h3">Mis citas</h3>
          <Button
            severity="success"
            label="Agendar cita"
            icon="pi pi-calendar"
            iconPos="right"
            @click="redirectToScheduleAppointment()"
          ></Button>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <CardAppointmentSecondary
            v-for="appointment in appointments"
            :key="appointment.appointmentId"
            :appointment-id="appointment.appointmentId"
            :appointment-status="appointment.appointmentStatus"
            :date="appointment.date"
            :pet-name="appointment.petName"
            :duration="appointment.duration"
            :service-name="appointment.serviceName"
            :service-description="appointment.serviceDescription"
          ></CardAppointmentSecondary>
        </div>
      </template>
    </Card>
  </div>
</template>
