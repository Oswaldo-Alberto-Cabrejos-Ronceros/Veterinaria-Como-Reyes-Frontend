<script setup lang="ts">
import Card from 'primevue/card'
import CardAppointmentPrimary from '@/components/CardAppointmentPrimary.vue'
import ScrollPanel from 'primevue/scrollpanel'

import CardPetPrimary from '@/components/CardPetPrimary.vue'
import CardServicePrimary from '@/components/CardServicePrimary.vue'
import { useAuthentication } from '@/composables/useAuthentication'
import { usePet } from '@/composables/usePet'
import type { PetByClient } from '@/models/PetByClient'
import { onMounted, ref } from 'vue'
import Message from 'primevue/message'
import { RouterLink, useRouter } from 'vue-router'
import { useClient } from '@/composables/useClient'
import { useAppointment } from '@/composables/useAppointment'
import type { BasicServiceForAppointment } from '@/models/BasicServiceForAppointment'
import type { InfoBasicAppointmentClient } from '@/models/InfoBasicAppointmentClient'
import Button from 'primevue/button'

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

const namesAndLastnames = ref<{ name: string; lastnames: string }>({
  name: '',
  lastnames: '',
})

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
    namesAndLastnames.value = {
      name: infoClient.names,
      lastnames: infoClient.lastnames,
    }
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

const router = useRouter()
const redirect = (url: string) => {
  router.push(url)
}

</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">
          !Hola
          <strong> {{ namesAndLastnames.name }} {{ namesAndLastnames.lastnames }} </strong>! 👋
        </h2>
      </template>
      <template #subtitle>
        <p class="textLg">Bienvenido al portal de Veterinaria Reyes</p>
      </template>
      <template #content>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
          <!-- apointments -->
          <Card class="card-primary">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h3>Citas Programadas</h3>
                <Button label="Nueva Cita" @click="redirect('/client/my-appointments/schedule-appointment')" icon="pi pi-plus" size="small"> </Button>
              </div>
            </template>
            <template #subtitle>
              <p>Sus proximas citas</p>
            </template>
            <template #content>
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
            </template>
          </Card>

          <!-- pets -->
          <Card class="card-primary">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h3>Mis Mascotas</h3>
                <Button label="Ver todas" @click="redirect('/client/my-pets')" variant="outlined" size="small"> </Button>
              </div>
            </template>
            <template #subtitle>
              <p>Datos de tus engreidos</p>
            </template>
            <template #content>
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
            </template>
          </Card>
        </div>
        <!-- services -->
        <Card class="card-primary mt-4">
          <template #title>
            <h3>Servicios disponibles</h3>
          </template>

          <template #subtitle>
            <p>Conoce los servicios que tenemos disponibles para el cuadado de tus mascotas</p>
          </template>
          <template #content>
            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
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
          </template>
          <template #footer>
            <Button
              class="w-full"
              size="small"
              iconPos="right"
              icon="pi pi-arrow-right"
              variant="text"
              label="Ver todos los servicios"
            />
          </template>
        </Card>
      </template>
    </Card>
  </div>
</template>
