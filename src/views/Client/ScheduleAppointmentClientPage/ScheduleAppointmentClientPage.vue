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
import type { FormatTime } from '@/models/FormatTime'
import { usePaymentMethod } from '@/composables/usePaymentMethod'
import type { PaymentMethod } from '@/models/PaymentMethod'

//methods
const { getEntityId } = useAuthentication()

const { getAllPaymentMethods } = usePaymentMethod()

const { myInfoAsClient } = useClient()

const { error, loading, getPetByClientId } = usePet()

const { getServicesByHeadquarterAndSpecies, getAvailableTimes } = useAppointment()

const pets = ref<PetByClient[]>([])
const paymentMethods = ref<PaymentMethod[]>([])
//for services
const services = ref<BasicServiceForAppointment[]>([])
//for times for turn
const timesTurn = ref<TimesForTurn[]>([])
//for selected
const petSelected = ref<PetByClient | null>(null)
const serviceSelected = ref<BasicServiceForAppointment | null>(null)
const timeSelected = ref<FormatTime | null>(null)
const dateSelected = ref<Date | null>(null)

//get all for view
onMounted(() => {
  loadPets()
  loadPaymentMethods()
})

//for load pets
const loadPets = async () => {
  const clientId = getEntityId()
  if (clientId) {
    pets.value = await getPetByClientId(clientId)
  }
}

const loadPaymentMethods = async () => {
  paymentMethods.value = await getAllPaymentMethods()
  console.log(paymentMethods.value)
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
  dateSelected.value = today
  serviceSelected.value = service
  loadTimeTurn(service.headquarterServiceId, today)
}

const getNewDate = (date: Date) => {
  console.log('Obtenido padre', date)
  if (serviceSelected.value) {
    dateSelected.value = date
    loadTimeTurn(serviceSelected.value.headquarterServiceId, date)
    console.log('Nuevos valores', timesTurn.value)
  }
}

const getTimeSelected = (time: FormatTime) => {
  console.log('Obtenido padre', time)
  timeSelected.value = time
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
      @time-selected="getTimeSelected($event)"
      :payment-methods="paymentMethods"
      :pets="pets"
      :services="services"
      :schedules="timesTurn"
      :pet-selected="petSelected || undefined"
      :serviceSelected="serviceSelected || undefined"
      :date-selected="dateSelected || undefined"
      :time-selected="timeSelected || undefined"
    >
    </CardScheduleAppointmentPrimary>
  </div>
</template>
