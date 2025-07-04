<script lang="ts" setup>
import { DateAdapter } from '@/adapters/DateAdapter'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import CardNewsPrimary from '@/components/CardNewsPrimary.vue'
import Button from 'primevue/button'
import CardAppointmentQuintary from '@/components/CardAppointmentQuintary.vue'
import CardPetWaiting from '@/components/CardPetWaiting.vue'
import Tag from 'primevue/tag'
const { getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()


const myInfoEmployee = ref<MyInfoEmployee | null>(null)

const entityId = ref<number | null>(null)

const today = DateAdapter.toFormatView(new Date())

onMounted(() => {
  loadMyInfo()
})

const loadMyInfo = async () => {
  const entityIdGet = getEntityId()
  entityId.value = entityIdGet
  if (entityIdGet) {
    myInfoEmployee.value = await getEmployeeMyInfo(entityIdGet)
  }
}

const news: { title: string; icon: string; content: string; plus?: string }[] = [
  {
    title: 'Citas hoy',
    icon: 'pi-calendar',
    content: '15',
    plus: '3 confirmadas, 2 pendientes',
  },
  {
    title: 'Atenciones registradas hoy',
    icon: 'pi-clipboard',
    content: '10',
    plus: '+2 desde ayer',
  },
  {
    title: 'N° de mascotas atendidas',
    icon: 'pi-github',
    content: '15',
    plus: '+4 desde ayer',
  },
  {
    title: 'Horas programadas',
    icon: 'pi-clock',
    content: 'S/ 150',
    plus: '+5 desde ayer',
  },
]

const vetAppointments: {
  appointementId: number
  petName: string
  petBreed: string
  serviceName: string
  serviceDuration: string
  ownerName: string
  time: string
  status: string
}[] = [
  {
    appointementId: 5,
    petName: 'Luna',
    petBreed: 'Golden Retriever',
    serviceName: 'Consulta General',
    serviceDuration: '30 minutos',
    ownerName: 'Carlos Rojas',
    time: '08:30',
    status: 'Confirmada',
  },
  {
    appointementId: 7,
    petName: 'Milo',
    petBreed: 'Persa',
    serviceName: 'Vacunación',
    serviceDuration: '15 minutos',
    ownerName: 'Ana Torres',
    time: '09:00',
    status: 'En curso',
  },
  {
    appointementId: 8,
    petName: 'Rocky',
    petBreed: 'Bulldog Inglés',
    serviceName: 'Desparasitación',
    serviceDuration: '20 minutos',
    ownerName: 'Luis Fernández',
    time: '10:15',
    status: 'Completada',
  },
  {
    appointementId: 9,
    petName: 'Nina',
    petBreed: 'Labrador',
    serviceName: 'Control postoperatorio',
    serviceDuration: '25 minutos',
    ownerName: 'Sandra Díaz',
    time: '11:00',
    status: 'Confirmada',
  },
  {
    appointementId: 10,
    petName: 'Max',
    petBreed: 'Shih Tzu',
    serviceName: 'Consulta General',
    serviceDuration: '30 minutos',
    ownerName: 'Diego Herrera',
    time: '11:45',
    status: 'En curso',
  },
]

const petsWaitings: {
  clientName: string
  clientLastname: string
  petName: string
  serviceName: string
  breedName: string
}[] = [
  {
    clientName: 'Lucía',
    clientLastname: 'González',
    petName: 'Toby',
    serviceName: 'Consulta General',
    breedName: 'Labrador Retriever',
  },
  {
    clientName: 'Diego',
    clientLastname: 'Salas',
    petName: 'Mish',
    serviceName: 'Vacunación',
    breedName: 'Maine Coon',
  },
  {
    clientName: 'Andrea',
    clientLastname: 'Cáceres',
    petName: 'Luna',
    serviceName: 'Desparasitación',
    breedName: 'Shih Tzu',
  },
  {
    clientName: 'Jorge',
    clientLastname: 'Ruiz',
    petName: 'Max',
    serviceName: 'Baño y Corte',
    breedName: 'Poodle Toy',
  },
  {
    clientName: 'Camila',
    clientLastname: 'Fernández',
    petName: 'Coco',
    serviceName: 'Chequeo Postoperatorio',
    breedName: 'Bulldog Francés',
  },
]
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">
          Bienvenido Dr.
          <strong> {{ myInfoEmployee?.names }} </strong>
        </h2>
      </template>
      <template #subtitle>
        <p class="Plg">{{ today }}</p>
      </template>
      <template #content>
        <!-- news -->
        <div class="w-full grid grid-cols-4 gap-x-12 mt-4">
          <CardNewsPrimary
            v-for="(noticia, index) in news"
            :key="index"
            :title="noticia.title"
            :icon="noticia.icon"
            :content="noticia.content"
            :plus="noticia.plus"
          >
          </CardNewsPrimary>
        </div>
        <!-- quicky actions -->
        <Card class="card-primary min-h-24 mt-4">
          <template #title>
            <div class="flex gap-2 items-center">
              <i class=" pi pi-clipboard"></i>
              <p>Acciones rápidas</p>
            </div>
          </template>
          <template #subtitle>
            <p>Funciones más utilizadas</p>
            <div class="grid grid-cols-4 gap-x-12 mt-2">
              <Button
                label="Atender cita"
                iconPos="top"
                icon="pi pi-clipboard"
                severity="success"
              ></Button>
              <Button
                label="Buscar paciente"
                iconPos="top"
                icon="pi pi-search"
                severity="info"
              ></Button>
              <Button
                label="Registrar informe médico"
                severity="warn"
                iconPos="top"
                icon="pi pi-pen-to-square"
              ></Button>
              <Button
                label="Solicitar cita"
                severity="help"
                iconPos="top"
                icon="pi pi-plus"
              ></Button>
            </div>
          </template>
        </Card>
        <div class="grid grid-cols-2 gap-x-12 mt-4">
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <div class="flex gap-2 items-center">
                  <i class="pi pi-calendar"></i>
                  <h2 class="h3 font-semibold">Citas de Hoy</h2>
                </div>

                <Tag value="8 programadas" severity="secondary" class="self-start"></Tag>
              </div>
            </template>
            <template #subtitle>
              <p>Agenda completa del dia</p>
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-1.5">
                <CardAppointmentQuintary
                  v-for="appoinment of vetAppointments"
                  :key="appoinment.appointementId"
                  v-bind="appoinment"
                ></CardAppointmentQuintary>
              </div>
            </template>
          </Card>
          <div class="grid grid-cols-2 gap-x-12">
            <!-- waiting room -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
          <div class="flex gap-2 items-center">
                  <i class="pi pi-users"></i>
                  <h2 class="h3 font-semibold">Sala de espera</h2>
                </div>
                  <Tag value="3 esperando" severity="secondary" class="self-start"></Tag>
                </div>
              </template>
              <template #subtitle>
                <p>Clientes en espera</p>
              </template>
              <template #content>
                <div class="w-full flex flex-col gap-1">
                  <CardPetWaiting v-for="(pet, index) of petsWaitings" :key="index" v-bind="pet" />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
