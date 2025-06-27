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
import { RouterLink } from 'vue-router'
import { useClient } from '@/composables/useClient'
import { useAppointment } from '@/composables/useAppointment'
import type { BasicServiceForAppointment } from '@/models/BasicServiceForAppointment'

//methods
const { getEntityId } = useAuthentication()

const { error: petError, loading: petLoading, getPetByClientId } = usePet()

const {
  error: servicesError,
  loading: servicesLoading,
  getServicesByHeadquarterAndSpecies,
} = useAppointment()

const { myInfoAsClient } = useClient()

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
  loadServicesByHeadquarterSpecie()
})

const loadPets = async () => {
  const clientId = getEntityId()
  if (clientId) {
    pets.value = await getPetByClientId(clientId)
  }
}

const loadServicesByHeadquarterSpecie = async () => {
  const clientId = getEntityId()
  if (clientId) {
    const infoClient = await myInfoAsClient(clientId)
    const headquarterId = infoClient.headquarter.id
    const pet = pets.value[0]
    if (pet) {
      services.value = await getServicesByHeadquarterAndSpecies(headquarterId, pet.specieId)
    }
  }
}

const services = ref<BasicServiceForAppointment[]>([])
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
                  v-if="petLoading.getPetByClientId"
                  severity="warn"
                  size="small"
                  variant="simple"
                >
                  Cargando ...
                </Message>
                <!-- for messague error -->
                <Message
                  v-if="petError.getPetByClientId"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  Error al cargar tus mascotas
                </Message>
                <RouterLink v-for="pet in pets" :key="pet.id" :to="`/client/my-pets/${pet.id}`">
                  <CardPetPrimary
                    :key="pet.id"
                    :petId="pet.id"
                    :petImageUrl="pet.urlImage"
                    :petName="pet.name"
                    :petSpecie="pet.specieName"
                    :petBreed="pet.breedName"
                    :petGender="pet.gender"
                    :birthdate="pet.birthdate"
                  ></CardPetPrimary
                ></RouterLink>
              </div>
            </ScrollPanel>
          </div>

          <!-- services -->

          <div>
            <h3 class="text-xl mb-4">Servicios disponibles</h3>
            <ScrollPanel class="h-96 pr-4">
              <div class="flex flex-col gap-2">
                <!-- for messague loading  -->
                <Message
                  v-if="servicesLoading.getServicesByHeadquarterAndSpecies"
                  severity="warn"
                  size="small"
                  variant="simple"
                >
                  Cargando ...
                </Message>
                <!-- for messague error -->
                <Message
                  v-if="servicesError.getServicesByHeadquarterAndSpecies"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  Error al cargar tus mascotas
                </Message>
                <CardServicePrimary
                  v-for="service in services"
                  :key="service.id"
                  :serviceId="service.id"
                  :serviceName="service.name"
                  :serviceImageUrl="service.imageUrl"
                  :specieName="service.specie.name"
                  :categoryName="service.category.name"
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
