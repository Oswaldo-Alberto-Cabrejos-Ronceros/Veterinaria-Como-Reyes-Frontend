<script setup lang="ts">
import Card from 'primevue/card'
import CardAppointmentPrimary from '@/components/CardAppointmentPrimary.vue'
import ScrollPanel from 'primevue/scrollpanel'

const cardsAppointmentPrimaryPropsExamples = [
  {
    serviceImageUrl:
      'https://cdn-3.expansion.mx/dims4/default/de4dfa6/2147483647/resize/1280x/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F25%2F6d%2Fa3d0b9864c02ac9012d14c2885c1%2Fistock-1489457497.jpg',
    serviceName: 'Grooming',
    petName: 'Firulais',
    date: '2025-06-05',
    time: '10:00 AM',
    appointmentId: 0,
  },
  {
    serviceImageUrl:
      'https://cdn-3.expansion.mx/dims4/default/de4dfa6/2147483647/resize/1280x/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F25%2F6d%2Fa3d0b9864c02ac9012d14c2885c1%2Fistock-1489457497.jpg',
    serviceName: 'Vacunación',
    petName: 'Misha',
    date: '2025-06-06',
    time: '02:30 PM',
    appointmentId: 1,
  },
  {
    serviceImageUrl:
      'https://cdn-3.expansion.mx/dims4/default/de4dfa6/2147483647/resize/1280x/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F25%2F6d%2Fa3d0b9864c02ac9012d14c2885c1%2Fistock-1489457497.jpg',
    serviceName: 'Consulta general',
    petName: 'Rocky',
    date: '2025-06-07',
    time: '11:15 AM',
    appointmentId: 2,
  },
  {
    serviceImageUrl:
      'https://cdn-3.expansion.mx/dims4/default/de4dfa6/2147483647/resize/1280x/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F25%2F6d%2Fa3d0b9864c02ac9012d14c2885c1%2Fistock-1489457497.jpg',
    serviceName: 'Desparasitación',
    petName: 'Luna',
    date: '2025-06-08',
    time: '09:45 AM',
    appointmentId: 3,
  },
  {
    serviceImageUrl:
      'https://cdn-3.expansion.mx/dims4/default/de4dfa6/2147483647/resize/1280x/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F25%2F6d%2Fa3d0b9864c02ac9012d14c2885c1%2Fistock-1489457497.jpg',
    serviceName: 'Baño medicado',
    petName: 'Thor',
    date: '2025-06-09',
    time: '04:00 PM',
    appointmentId: 3,
  },
]
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Bienvenido</h3>
      </template>
      <template #content>
        <div class="w-full grid grid-cols-3 min-h-full">
          <div>
          <h3 class="text-xl mb-2">Citas Programadas</h3>
          <ScrollPanel class=" max-h-96 pr-4">
            <div class="flex flex-col gap-2">

            <CardAppointmentPrimary
              v-for="example in cardsAppointmentPrimaryPropsExamples"
              :key="example.appointmentId"
              :appointmentId="example.appointmentId"
              :serviceImageUrl="example.serviceImageUrl"
              :serviceName="example.serviceName"
              :petName="example.serviceName"
              :date="example.date"
              :time="example.time"
            ></CardAppointmentPrimary
          >
            </div>
</ScrollPanel>
          </div>

        </div>
      </template>
    </Card>
  </div>
</template>
