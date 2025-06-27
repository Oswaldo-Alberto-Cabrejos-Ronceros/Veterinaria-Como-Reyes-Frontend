<script lang="ts" setup>
import CardScheduleAppointmentPrimary from '@/components/CardScheduleAppointmentPrimary/CardScheduleAppointmentPrimary.vue'
import { useAuthentication } from '@/composables/useAuthentication'
import { usePet } from '@/composables/usePet'
import type { PetByClient } from '@/models/PetByClient'
import { onMounted, ref } from 'vue'
import Message from 'primevue/message'
import type { BasicServiceForAppointment } from '@/models/BasicServiceForAppointment'
import { useAppointment } from '@/composables/useAppointment'
import { useClient } from '@/composables/useClient'
import type { TimesForTurn } from '@/models/TimesForTurn'

//methods
const { getEntityId } = useAuthentication()

const { myInfoAsClient } = useClient()

const { error, loading, getPetByClientId } = usePet()

const { getServicesByHeadquarterAndSpecies, getAvailableTimes } = useAppointment()

const pets = ref<PetByClient[]>([])
//for services
const services = ref<BasicServiceForAppointment[]>([])
//for times for turn
const timesTurn = ref<TimesForTurn[]>([])

//for selected
const petSelected = ref<PetByClient | null>(null)
const serviceSelected = ref<BasicServiceForAppointment | null>(null)

//get all for view
onMounted(() => {
  loadPets()
})

//for load pets
const loadPets = async () => {
  const clientId = getEntityId()
  if (clientId) {
    pets.value = await getPetByClientId(clientId)
  }
}

//for load services
const loadServices = async (pet: PetByClient) => {
  const clientId = getEntityId()
  console.log(clientId)
  if (clientId) {
    const infoClient = await myInfoAsClient(clientId)
    console.log(infoClient)
    services.value = await getServicesByHeadquarterAndSpecies(
      infoClient.headquarter.id,
      pet.specieId,
    )
    console.log(services.value)
  }
}

//for load times for turn
const loadTimeTurn = async (headquarterServiceId: number, date: Date) => {
  timesTurn.value = await getAvailableTimes(headquarterServiceId, date)
  console.log(timesTurn.value)
}

//for get pet selected
const getPetSelected = (pet: PetByClient) => {
  console.log('Obtenido padre', pet)
  petSelected.value = pet
  loadServices(pet)
}

//for get service selected

const getServiceSelected = (service: BasicServiceForAppointment) => {
  console.log('Obteniendo padre', service)
  const today: Date = new Date()
  serviceSelected.value = service
  loadTimeTurn(service.headquarterServiceId, today)
}

const getNewDate = (date: Date) => {
  console.log('Obtenido padre', date)
  if (serviceSelected.value) {
    loadTimeTurn(serviceSelected.value.headquarterServiceId, date)
    console.log('Nuevos valores', timesTurn.value)
  }
}
</script>

<template>
  <div class="layout-principal-flex">
    <!-- for messague loading  -->
    <Message v-if="loading.getPetByClientId" severity="warn" size="small" variant="simple">
      Cargando ...
    </Message>
    <!-- for messague error -->
    <Message v-if="error.getPetByClientId" severity="error" size="small" variant="simple">
      Error al cargar tus mascotas
    </Message>
    <CardScheduleAppointmentPrimary
      @pet-selected="getPetSelected($event)"
      @service-selected="getServiceSelected($event)"
      @date-change="getNewDate($event)"
      :pets="pets"
      :services="services"
      :schedules="timesTurn"
    >
    </CardScheduleAppointmentPrimary>
  </div>
</template>
