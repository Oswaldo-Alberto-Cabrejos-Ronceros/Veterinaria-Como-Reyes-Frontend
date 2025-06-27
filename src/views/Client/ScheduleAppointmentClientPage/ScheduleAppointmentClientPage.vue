<script lang="ts" setup>
import CardScheduleAppointmentPrimary from '@/components/CardScheduleAppointmentPrimary/CardScheduleAppointmentPrimary.vue'
import { useAuthentication } from '@/composables/useAuthentication'
import { usePet } from '@/composables/usePet'
import type { PetByClient } from '@/models/PetByClient'
import { onMounted, ref } from 'vue'
import Message from 'primevue/message'

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
