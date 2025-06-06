<script setup lang="ts">
import Card from 'primevue/card'
import CardAppointmentPrimary from '@/components/CardAppointmentPrimary.vue'
import ScrollPanel from 'primevue/scrollpanel'
import CardTestPrimary from '@/components/CardTestPrimary.vue'
import CardPetPrimary from '@/components/CardPetPrimary.vue'

//examples for cardsAppointment
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

//examples for testCards
const testExamples = [
  {
    testName: 'Examen de Sangre',
    testId: 101,
    petName: 'Firulais',
    testStatus: 'Pendiente',
  },
  {
    testName: 'Radiografía Torácica',
    testId: 102,
    petName: 'Michi',
    testStatus: 'Completado',
  },
  {
    testName: 'Ecografía Abdominal',
    testId: 103,
    petName: 'Rocky',
    testStatus: 'En Proceso',
  },
  {
    testName: 'Análisis de Orina',
    testId: 104,
    petName: 'Luna',
    testStatus: 'Cancelado',
  },
  {
    testName: 'Prueba de Alergia',
    testId: 105,
    petName: 'Toby',
    testStatus: 'Completado',
  },
]

//example for pet cards
const pets = [
  {
    petId: 1,
    petImageUrl: 'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso-1024x576.jpg?auth=6df4e6dc984f247b317b99504b5a8a650bcd2a232b5d6684141c42a2e2c32577&smart=true&width=992&height=558&quality=85',
    petName: 'Firulais',
    petSpecie: 'Perro',
    petBreed: 'Labrador Retriever',
    petGender: 'M',
    birthdate: '2020-03-15',
  },
  {
    petId: 2,
    petImageUrl: 'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Siamese201.jpg?itok=j9A2IvjN',
    petName: 'Michi',
    petSpecie: 'Gato',
    petBreed: 'Siames',
    petGender: 'H',
    birthdate: '2019-11-02',
  },
  {
    petId: 3,
    petImageUrl: 'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso-1024x576.jpg?auth=6df4e6dc984f247b317b99504b5a8a650bcd2a232b5d6684141c42a2e2c32577&smart=true&width=992&height=558&quality=85',
    petName: 'Rocky',
    petSpecie: 'Perro',
    petBreed: 'Bulldog Francés',
    petGender: 'M',
    birthdate: '2021-01-20',
  },
  {
    petId: 4,
    petImageUrl: 'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Siamese201.jpg?itok=j9A2IvjN',
    petName: 'Luna',
    petSpecie: 'Gato',
    petBreed: 'Persa',
    petGender: 'H',
    birthdate: '2022-06-10',
  },
  {
    petId: 5,
    petImageUrl: 'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso-1024x576.jpg?auth=6df4e6dc984f247b317b99504b5a8a650bcd2a232b5d6684141c42a2e2c32577&smart=true&width=992&height=558&quality=85',
    petName: 'Toby',
    petSpecie: 'Perro',
    petBreed: 'Beagle',
    petGender: 'M',
    birthdate: '2018-09-07',
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
        <div class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 min-h-full">
          <!-- apointments -->
          <div>
            <h3 class="text-xl mb-4">Citas Programadas</h3>
            <ScrollPanel class="max-h-96 pr-4">
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
                ></CardAppointmentPrimary>
              </div>
            </ScrollPanel>
          </div>

          <!-- test -->
          <div>
            <h3 class="text-xl mb-4">Analisis pendientes</h3>
            <ScrollPanel class="max-h-96 pr-4">
              <div class="flex flex-col gap-2">
                <CardTestPrimary
                  v-for="test in testExamples"
                  :key="test.testId"
                  :testName="test.testName"
                  :testId="test.testId"
                  :petName="test.petName"
                  :testStatus="test.testStatus"
                ></CardTestPrimary>
              </div>
            </ScrollPanel>
          </div>

          <!-- pets -->
          <div>
            <h3 class="text-xl mb-4">Mis Mascotas</h3>
            <ScrollPanel class="max-h-96 pr-4">
              <div class="flex flex-col gap-2">
                <CardPetPrimary
                  v-for="pet in pets"
                  :key="pet.petId"
                  :petId="pet.petId"
                  :petImageUrl="pet.petImageUrl"
                  :petName="pet.petName"
                  :petSpecie="pet.petSpecie"
                  :petBreed="pet.petBreed"
                  :petGender="pet.petGender"
                  :birthdate="pet.birthdate"
                ></CardPetPrimary>
              </div>
            </ScrollPanel>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
