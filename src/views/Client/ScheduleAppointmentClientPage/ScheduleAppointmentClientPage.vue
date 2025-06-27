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

//methods
const { getEntityId } = useAuthentication()

const { myInfoAsClient } = useClient()

const { error, loading, getPetByClientId } = usePet()

const { getServicesByHeadquarterAndSpecies } = useAppointment()

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
//for services examples
const services = ref<BasicServiceForAppointment[]>([])

//for get pet selected
const getPetSelected = (pet: PetByClient) => {
  console.log('Obtenido padre', pet)
  loadServices(pet)
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
      :pets="pets"
      :services="services"
    >
    </CardScheduleAppointmentPrimary>
  </div>
</template>
