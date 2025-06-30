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
import type { InfoBasicAppointmentClient } from '@/models/InfoBasicAppointmentClient'

//methods
const { getEntityId } = useAuthentication()

const { error: petError, loading: petLoading, getPetByClientId } = usePet()

const {
  error: appointmentError,
  loading: appointmentLoading,
  getServicesByHeadquarterAndSpecies,
  getAppointmentsForClient,
} = useAppointment()

const { myInfoAsClient } = useClient()

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
const services = ref<BasicServiceForAppointment[]>([])
const appointments = ref<InfoBasicAppointmentClient[]>([])
//get all for view
onMounted(() => {
  loadPets()
  loadServicesByHeadquarterSpecie()
  loadAppointments()
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

const loadAppointments = async () => {
  const clientId = getEntityId()
  if (clientId) {
    appointments.value = await getAppointmentsForClient(clientId)
  }
}
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
            <ScrollPanel class="h-96 pr-4">
              <div class="flex flex-col gap-2">
                                <!-- for messague loading  -->
                <Message
                  v-if="appointmentLoading.getAppointmentsForClient"
                  severity="warn"
                  size="small"
                  variant="simple"
                >
                  Cargando ...
                </Message>
                <!-- for messague error -->
                <Message
                  v-if="appointmentError.getAppointmentsForClient"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  Error al cargar tus citas
                </Message>
                <CardAppointmentPrimary
                  v-for="appointment in appointments"
                  :key="appointment.id"
                  :appointmentId="appointment.id"
                  :serviceImageUrl="appointment.service.image"
                  :serviceName="appointment.service.name"
                  :petName="appointment.pet.name"
                  :date="appointment.date"
                  :time="appointment.time"
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
                    v-ripple
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
                  v-if="appointmentLoading.getServicesByHeadquarterAndSpecies"
                  severity="warn"
                  size="small"
                  variant="simple"
                >
                  Cargando ...
                </Message>
                <!-- for messague error -->
                <Message
                  v-if="appointmentError.getServicesByHeadquarterAndSpecies"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  Error al cargar los servicios
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
