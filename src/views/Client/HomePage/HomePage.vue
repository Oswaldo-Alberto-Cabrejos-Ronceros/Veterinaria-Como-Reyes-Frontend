<script setup lang="ts">
import Card from 'primevue/card'
import CardAppointmentPrimary from '@/components/CardAppointmentPrimary.vue'
import ScrollPanel from 'primevue/scrollpanel'
import CardTestPrimary from '@/components/CardTestPrimary.vue'
import CardPetPrimary from '@/components/CardPetPrimary.vue'
import CardServicePrimary from '@/components/CardServicePrimary.vue'
import { useAuthentication } from '@/composables/useAuthentication'
import { usePet } from '@/composables/usePet'
import type { PetByClient } from '@/models/PetByClient'
import { onMounted, ref } from 'vue'
import Message from 'primevue/message'

//methods
const { getEntityId } = useAuthentication()

const { error, loading, getPetByClientId } = usePet()

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
const pets = ref<PetByClient[]>([])
//get all for view
onMounted(() => {
  loadPets()
})

const loadPets = async () => {
  const clientId = getEntityId()
  if (clientId) {
    pets.value = await getPetByClientId(clientId)
  }
}
const services = [
  {
    serviceId: 1,
    serviceName: 'Baño Canino',
    serviceImageUrl:
      'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Perro',
    categoryName: 'Estética',
    duration: '45 min',
    price: 40.0,
  },
  {
    serviceId: 2,
    serviceName: 'Consulta Veterinaria Felina',
    serviceImageUrl:
      'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Gato',
    categoryName: 'Consulta',
    duration: '30 min',
    price: 50.0,
  },
  {
    serviceId: 3,
    serviceName: 'Vacunación Antirrábica',
    serviceImageUrl:
      'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Perro',
    categoryName: 'Vacunación',
    duration: '15 min',
    price: 25.0,
  },
  {
    serviceId: 4,
    serviceName: 'Corte de Uñas',
    serviceImageUrl:
      'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Perro',
    categoryName: 'Estética',
    duration: '10 min',
    price: 10.0,
  },
  {
    serviceId: 5,
    serviceName: 'Desparasitación Interna',
    serviceImageUrl:
      'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Gato',
    categoryName: 'Medicina Preventiva',
    duration: '20 min',
    price: 35.0,
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
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 min-h-full"
        >
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
            <ScrollPanel class="h-96 pr-4">
              <div class="flex flex-col gap-2">
                <!-- for messague loading  -->
                <Message
                  v-if="loading.getPetByClientId"
                  severity="warn"
                  size="small"
                  variant="simple"
                >
                  Cargando ...
                </Message>
                <!-- for messague error -->
                <Message
                  v-if="error.getPetByClientId"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  Error al cargar tus mascotas
                </Message>
                <CardPetPrimary
                  v-for="pet in pets"
                  :key="pet.id"
                  :petId="pet.id"
                  :petImageUrl="pet.urlImage"
                  :petName="pet.name"
                  :petSpecie="pet.specieName"
                  :petBreed="pet.breedName"
                  :petGender="pet.gender"
                  :birthdate="pet.birthdate"
                ></CardPetPrimary>
              </div>
            </ScrollPanel>
          </div>

          <!-- services -->

          <div>
            <h3 class="text-xl mb-4">Servicios disponibles</h3>
            <ScrollPanel class="max-h-96 pr-4">
              <div class="flex flex-col gap-2">
                <CardServicePrimary
                  v-for="service in services"
                  :key="service.serviceId"
                  :serviceId="service.serviceId"
                  :serviceName="service.serviceName"
                  :serviceImageUrl="service.serviceImageUrl"
                  :specieName="service.specieName"
                  :categoryName="service.categoryName"
                  :duration="service.duration"
                  :price="service.price"
                ></CardServicePrimary>
              </div>
            </ScrollPanel>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
