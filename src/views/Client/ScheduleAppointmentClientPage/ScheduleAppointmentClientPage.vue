<script lang="ts" setup>
import CardScheduleAppointmentPrimary from '@/components/CardScheduleAppointmentPrimary/CardScheduleAppointmentPrimary.vue'
import { useAuthentication } from '@/composables/useAuthentication'
import { usePet } from '@/composables/usePet'
import type { PetByClient } from '@/models/PetByClient'
import { onMounted, ref } from 'vue'
import Message from 'primevue/message'
import type { BasicServiceForAppointment } from '@/models/BasicServiceForAppointment'

//methods
const { getEntityId } = useAuthentication()

const { error, loading, getPetByClientId } = usePet()

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
//for services examples
const services: BasicServiceForAppointment[] = []
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
    <CardScheduleAppointmentPrimary :pets="pets" :services="services">
    </CardScheduleAppointmentPrimary>
  </div>
</template>
