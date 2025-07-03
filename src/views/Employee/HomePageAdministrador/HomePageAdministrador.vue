<script setup lang="ts">
import { DateAdapter } from '@/adapters/DateAdapter'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import CardNewsPrimary from '@/components/CardNewsPrimary.vue'
import Button from 'primevue/button'
import CardAppintmentTerciary from '@/components/CardAppintmentTerciary.vue'
import ServiceRankingItem from '@/components/ServiceRankingItem.vue'

const { getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()

const myInfoEmployee = ref<MyInfoEmployee | null>(null)

const entityId = ref<number | null>(null)

const today = DateAdapter.toFormatView(new Date())

const news: { title: string; icon: string; content: string; plus?: string }[] = [
  {
    title: 'Citas hoy',
    icon: 'pi-calendar',
    content: '15',
    plus: '+2 desde ayer',
  },
  {
    title: 'Pacientes activos',
    icon: 'pi-heart',
    content: '85',
    plus: '+8 este mes',
  },
  {
    title: 'Clientes',
    icon: 'pi-user',
    content: '40',
    plus: '+3 este mes',
  },
  {
    title: 'Ingresos mes',
    icon: 'pi-chart-line',
    content: 'S/ 5000',
    plus: '+15% vs mes anterior',
  },
]

const appointments: {
  petName: string
  serviceName: string
  ownerName: string
  time: string
  status: string
}[] = [
  {
    petName: 'Toby',
    serviceName: 'Baño antipulgas',
    ownerName: 'Oswaldo Cabrejos',
    time: '09:30',
    status: 'Completado',
  },
  {
    petName: 'Lucky',
    serviceName: 'Vacunación distemper',
    ownerName: 'Diego Aguilar',
    time: '10:30',
    status: 'Confirmado',
  },
  {
    petName: 'Negro',
    serviceName: 'Spa canino',
    ownerName: 'Juan Huacacchi',
    time: '13:30',
    status: 'Confirmado',
  },
]

const serviceStadistics: {
  serviceName: string
  serviceImageUrl: string
  categoryName: string
  value: number
}[] = [
  {
    serviceName: 'Consulta general',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    categoryName: 'Salud',
    value: 25,
  },
  {
    serviceName: 'Vacunación',
    serviceImageUrl:
      'https://www.animalshealth.es/fileuploads/news/perro-vacunacion-guia-mascota-veterinaria-216624624471.jpg',
    categoryName: 'Prevención',
    value: 20,
  },
  {
    serviceName: 'Desparasitación',
    serviceImageUrl:
      'https://petvet.cl/cdn/shop/articles/Guia-completa-de-desparasitacion-para-perros-y-gatos-en-Chile_4000x.jpg?v=1739239655',
    categoryName: 'Prevención',
    value: 18,
  },
  {
    serviceName: 'Cirugía menor',
    serviceImageUrl:
      'https://images.ctfassets.net/denf86kkcx7r/5O20xRkP4ICjnSqkX8zr5z/25e2f3f24f2bafe01dee49ae54bacc99/precio_cirugi_a_canina_-_image_2.jpg?fit=fill&w=1024&q=80',
    categoryName: 'Tratamiento',
    value: 22,
  },
  {
    serviceName: 'Chequeo dental',
    serviceImageUrl:
      'https://cdn.shopify.com/s/files/1/0268/6861/files/How-to-clean-your-dogs-teeth_grande.jpg?v=1528464965',
    categoryName: 'Higiene',
    value: 15,
  },
]

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
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">
          Bienvenido
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
        <!-- section 2 -->
        <div class="grid grid-cols-2 gap-x-12 mt-4">
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h2 class="h3 font-semibold">Proximas citas</h2>
                <Button label="Nueva Cita" icon="pi pi-plus"> </Button>
              </div>
            </template>
            <template #subtitle>
              <p>Citas programadas para hoy</p>
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-1.5">
                <CardAppintmentTerciary
                  v-for="(appointment, index) of appointments"
                  :key="index"
                  :pet-name="appointment.petName"
                  :service-name="appointment.serviceName"
                  :owner-name="appointment.ownerName"
                  :time="appointment.time"
                  :status="appointment.status"
                >
                </CardAppintmentTerciary>
                <Button
                  label="Ver todas las citas"
                  variant="text"
                  icon="pi pi-eye"
                  size="small"
                  class="mt-2"
                >
                </Button>
              </div>
            </template>
          </Card>
          <div class="grid grid-cols-2 gap-x-12">
         <Card class="card-primary min-h-24 max-h-full">
            <template #title>
              <p>Servicios más perdidos</p>
            </template>
            <template #content>
            <ServiceRankingItem
              v-for="(service, index) of serviceStadistics"
              :key="index"
              :serviceName="service.serviceName"
              :serviceImageUrl="service.serviceImageUrl"
              :categoryName="service.categoryName"
              :value="service.value"
            >
            </ServiceRankingItem>
            </template>

          </Card>
          </div>

        </div>
      </template>
    </Card>
  </div>
</template>
