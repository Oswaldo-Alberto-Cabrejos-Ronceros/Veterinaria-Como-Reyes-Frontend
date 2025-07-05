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
import ClientRankingItem from '@/components/ClientRankingItem.vue'
import Chart from 'primevue/chart'

const { getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()

const myInfoEmployee = ref<MyInfoEmployee | null>(null)

const entityId = ref<number | null>(null)

const today = DateAdapter.toFormatView(new Date())

onMounted(() => {
  loadMyInfo()
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
  chartDataSpecie.value = setChartDataSpecies()
  chartOptionsSpecie.value = setChartOptionsSpecies()
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

const clientsRecent: { clientName: string; clientLastname: string; clientDni: string }[] = [
  {
    clientName: 'Lucía',
    clientLastname: 'Ramírez',
    clientDni: '48392157',
  },
  {
    clientName: 'Carlos',
    clientLastname: 'Fernández',
    clientDni: '72918364',
  },
  {
    clientName: 'María',
    clientLastname: 'Gómez',
    clientDni: '81629475',
  },
  {
    clientName: 'Jorge',
    clientLastname: 'Castro',
    clientDni: '50318249',
  },
  {
    clientName: 'Diana',
    clientLastname: 'Vargas',
    clientDni: '61284793',
  },
]


const chartData = ref()
const chartOptions = ref()
const chartDataSpecie = ref()
const chartOptionsSpecie = ref()

//data and options for sales
const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Ingresos',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-pink-500'),
        tension: 0.4,
      },
    ],
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

//data and options for species

const setChartDataSpecies = () => {
  return {
    labels: ['Gallo', 'Gato', 'Perro', 'Loro'],
    datasets: [
      {
        label: 'Citas',
        data: [54, 60, 100, 20],
        backgroundColor: [
          'rgba(249, 115, 22, 0.2)',
          'rgba(6, 182, 212, 0.2)',
          'rgb(107, 114, 128, 0.2)',
          'rgba(139, 92, 246 0.2)',
        ],
        borderColor: [
          'rgb(249, 115, 22)',
          'rgb(6, 182, 212)',
          'rgb(107, 114, 128)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 1,
      },
    ],
  }
}
const setChartOptionsSpecies = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
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
        <p class="textLg">{{ today }}</p>
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
            <!-- servicios mas pedidos -->
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
            <!-- clientes recientes -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex items-center justify-between">
                  <p>Clientes recientes</p>
                  <Button
                    variant="outlined"
                    rounded
                    icon="pi pi-plus"
                    v-tooltip.left="`Agregar cliente`"
                  >
                  </Button>
                </div>
              </template>
              <template #content>
                <ClientRankingItem
                  v-for="(client, index) of clientsRecent"
                  :key="index"
                  :clientName="client.clientName"
                  :clientLastname="client.clientLastname"
                  :clientDni="client.clientDni"
                ></ClientRankingItem>
              </template>
              <template #footer>
                <Button
                  label="Ver todos los clientes"
                  variant="text"
                  icon="pi pi-users"
                  size="small"
                  class="mt-2 w-full"
                >
                </Button>
              </template>
            </Card>
          </div>
        </div>
        <!-- seccion 3 -->
        <div class="grid grid-cols-2 gap-x-12 mt-4">
          <Card class="card-primary">
            <template #title>
              <p>Ingresos de la última semana</p>
            </template>
            <template #content>
              <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
            </template>
          </Card>

          <Card class="card-primary">
            <template #title>
              <p>Especies por citas</p>
            </template>
            <template #content>
              <div class="w-full min-h-full flex items-end justify-center">
              <Chart
                type="bar"
                :data="chartDataSpecie"
                :options="chartOptionsSpecie"
                class="h-[30rem] w-full flex items-center"
              />
              </div>

            </template>
          </Card>
        </div>
      </template>
    </Card>
  </div>
</template>
