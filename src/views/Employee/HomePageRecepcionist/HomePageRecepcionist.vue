<script lang="ts" setup>
import { DateAdapter } from '@/adapters/DateAdapter'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import CardNewsPrimary from '@/components/CardNewsPrimary.vue'
import Button from 'primevue/button'
import CardAppointmentQuaternary from '@/components/CardAppointmentQuaternary.vue'
import Tag from 'primevue/tag'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import CardServiceTerciary from '@/components/CardServiceTerciary.vue'
import CardClientWaiting from '@/components/CardClientWaiting.vue'
import CardPaymentPrimary from '@/components/CardPaymentPrimary.vue'

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
    title: 'Clientes atendidos',
    icon: 'pi-users',
    content: '10',
    plus: '+3 desde ayer',
  },
  {
    title: 'Atenciones registradas',
    icon: 'pi-user',
    content: '15',
    plus: '+4 desde ayer',
  },
  {
    title: 'Ingresos hoy',
    icon: 'pi-chart-line',
    content: 'S/ 150',
    plus: '+5% desde ayer',
  },
]

const appointments = [
  {
    petName: 'Luna',
    petBreed: 'Labrador Retriever',
    employeeName: 'Dra. María Torres',
    serviceName: 'Consulta general',
    ownerName: 'Juan Pérez',
    time: '09:00 AM',
    status: 'En curso',
  },
  {
    petName: 'Max',
    petBreed: 'Bulldog Francés',
    employeeName: 'Dr. Carlos Ramos',
    serviceName: 'Vacunación',
    ownerName: 'Laura Díaz',
    time: '10:15 AM',
    status: 'Programada',
  },
  {
    petName: 'Nala',
    petBreed: 'Pomerania',
    employeeName: 'Dra. Ana Gutiérrez',
    serviceName: 'Desparasitación',
    ownerName: 'Ricardo Torres',
    time: '11:30 AM',
    status: 'Finalizada',
  },
  {
    petName: 'Rocky',
    petBreed: 'Rottweiler',
    employeeName: 'Dr. Luis Mendoza',
    serviceName: 'Control dental',
    ownerName: 'Mariana Salas',
    time: '01:00 PM',
    status: 'Programada',
  },
  {
    petName: 'Mía',
    petBreed: 'Golden Retriever',
    employeeName: 'Dra. Valeria Soto',
    serviceName: 'Cirugía menor',
    ownerName: 'Pedro García',
    time: '03:45 PM',
    status: 'Cancelada',
  },
]

const services: {
  serviceId: number
  serviceName: string
  serviceImageUrl: string
  specieName: string
  categoryName: string
  duration: number
  price: string
}[] = [
  {
    serviceId: 1,
    serviceName: 'Consulta general',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Canino',
    categoryName: 'Salud',
    duration: 30,
    price: '50.00',
  },
  {
    serviceId: 2,
    serviceName: 'Vacunación antirrábica',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Felino',
    categoryName: 'Prevención',
    duration: 15,
    price: '25.00',
  },
  {
    serviceId: 3,
    serviceName: 'Desparasitación interna',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Canino',
    categoryName: 'Prevención',
    duration: 20,
    price: '30.00',
  },
  {
    serviceId: 4,
    serviceName: 'Control dental',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Felino',
    categoryName: 'Higiene',
    duration: 25,
    price: '45.00',
  },
  {
    serviceId: 5,
    serviceName: 'Corte de uñas',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Canino',
    categoryName: 'Estética',
    duration: 10,
    price: '15.00',
  },
  {
    serviceId: 6,
    serviceName: 'Baño medicinal',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Felino',
    categoryName: 'Tratamiento',
    duration: 40,
    price: '60.00',
  },
  {
    serviceId: 7,
    serviceName: 'Esterilización',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Canino',
    categoryName: 'Cirugía',
    duration: 90,
    price: '120.00',
  },
  {
    serviceId: 8,
    serviceName: 'Limpieza de oídos',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Felino',
    categoryName: 'Higiene',
    duration: 15,
    price: '20.00',
  },
  {
    serviceId: 9,
    serviceName: 'Ecografía',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Canino',
    categoryName: 'Diagnóstico',
    duration: 30,
    price: '70.00',
  },
  {
    serviceId: 10,
    serviceName: 'Radiografía',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Felino',
    categoryName: 'Diagnóstico',
    duration: 35,
    price: '80.00',
  },
  {
    serviceId: 11,
    serviceName: 'Consulta geriátrica',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Canino',
    categoryName: 'Salud',
    duration: 40,
    price: '55.00',
  },
  {
    serviceId: 12,
    serviceName: 'Cirugía menor',
    serviceImageUrl:
      'https://clinicaveterinarium.es/wp-content/uploads/2019/11/Realmente-es-necesario-llevar-el-gato-al-veterinario.jpg',
    specieName: 'Felino',
    categoryName: 'Cirugía',
    duration: 60,
    price: '100.00',
  },
]

const clientWaiting: {
  clientName: string
  clientLastname: string
  petName: string
  serviceName: string
}[] = [
  {
    clientName: 'Carlos',
    clientLastname: 'Ramírez',
    petName: 'Toby',
    serviceName: 'Consulta general',
  },
  {
    clientName: 'Andrea',
    clientLastname: 'Mendoza',
    petName: 'Luna',
    serviceName: 'Vacunación',
  },
  {
    clientName: 'Luis',
    clientLastname: 'García',
    petName: 'Rocky',
    serviceName: 'Corte de uñas',
  },
  {
    clientName: 'María',
    clientLastname: 'Lopez',
    petName: 'Mimi',
    serviceName: 'Desparasitación',
  },
  {
    clientName: 'Pedro',
    clientLastname: 'Fernández',
    petName: 'Max',
    serviceName: 'Control dental',
  },
]

const payments: {
  clientName: string
  clientLastname: string
  petName: string
  serviceName: string
  clientDni: string
  date: string
  time: string
  amount: number
  status: string
}[] = [
  {
    clientName: 'Ana',
    clientLastname: 'Gómez',
    petName: 'Luna',
    serviceName: 'Consulta general',
    clientDni: '72839471',
    date: '2025-07-03',
    time: '09:00 AM',
    amount: 50.0,
    status: 'Pagado',
  },
  {
    clientName: 'Luis',
    clientLastname: 'Ramírez',
    petName: 'Toby',
    serviceName: 'Vacunación',
    clientDni: '71583924',
    date: '2025-07-02',
    time: '10:30 AM',
    amount: 25.0,
    status: 'Pendiente',
  },
  {
    clientName: 'María',
    clientLastname: 'Fernández',
    petName: 'Nina',
    serviceName: 'Desparasitación',
    clientDni: '74920385',
    date: '2025-07-01',
    time: '11:15 AM',
    amount: 30.0,
    status: 'Pagado',
  },
  {
    clientName: 'Pedro',
    clientLastname: 'Sánchez',
    petName: 'Rocky',
    serviceName: 'Control dental',
    clientDni: '73819264',
    date: '2025-07-03',
    time: '01:45 PM',
    amount: 45.0,
    status: 'Pagado',
  },
  {
    clientName: 'Laura',
    clientLastname: 'Vargas',
    petName: 'Mimi',
    serviceName: 'Corte de uñas',
    clientDni: '76283917',
    date: '2025-07-03',
    time: '03:00 PM',
    amount: 15.0,
    status: 'Pendiente',
  },
]
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
        <!-- quicky actions -->
        <Card class="card-primary min-h-24 mt-4">
          <template #title>
            <p>Acciones rápidas</p>
          </template>
          <template #subtitle>
            <p>Funciones utilizadas frecuentemente</p>
            <div class="grid grid-cols-4 gap-x-12 mt-2">
              <Button label="Nueva cita" iconPos="top" icon="pi pi-plus"></Button>
              <Button
                label="Buscar cliente"
                variant="outlined"
                iconPos="top"
                icon="pi pi-search"
                severity="secondary"
              ></Button>
              <Button
                label="Registrar atención"
                severity="secondary"
                variant="outlined"
                iconPos="top"
                icon="pi pi-clipboard"
              ></Button>
              <Button
                label="Procesar pago"
                severity="secondary"
                variant="outlined"
                iconPos="top"
                icon="pi pi-credit-card"
              ></Button>
            </div>
          </template>
        </Card>
        <!-- section 2 -->
        <div class="grid grid-cols-2 gap-x-12 mt-4">
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h2 class="h3 font-semibold">Citas de Hoy</h2>
                <Tag value="8 programadas" severity="secondary" class="self-start"></Tag>
              </div>
            </template>
            <template #subtitle>
              <p>Agenda completa del dia</p>
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-1.5">
                <CardAppointmentQuaternary
                  v-for="(appointment, index) of appointments"
                  :key="index"
                  :pet-name="appointment.petName"
                  :service-name="appointment.serviceName"
                  :owner-name="appointment.ownerName"
                  :time="appointment.time"
                  :status="appointment.status"
                  :employee-name="appointment.employeeName"
                  :pet-breed="appointment.petBreed"
                >
                </CardAppointmentQuaternary>
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
            <!-- waiting room -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
                  <h2 class="h3 font-semibold">Sala de espera</h2>
                  <Tag value="3 esperando" severity="secondary" class="self-start"></Tag>
                </div>
              </template>
              <template #subtitle>
                <p>Clientes en espera</p>
              </template>
              <template #content>
                <div class="w-full flex flex-col gap-1">
                  <CardClientWaiting
                    v-for="(client, index) of clientWaiting"
                    :key="index"
                    :clientName="client.clientName"
                    :clientLastname="client.clientLastname"
                    :petName="client.petName"
                    :serviceName="client.serviceName"
                  ></CardClientWaiting>
                </div>
              </template>
            </Card>
            <!-- payments -->

            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
                  <h2 class="h3 font-semibold">Ultimos pagos</h2>
                  <Tag value="2 pendientes" severity="secondary" class="self-start"></Tag>
                </div>
              </template>
              <template #content>
                <div class="w-full flex flex-col gap-1">
                  <CardPaymentPrimary
                    v-for="(payment, index) in payments"
                    :key="index"
                    :clientName="payment.clientName"
                    :clientLastname="payment.clientLastname"
                    :petName="payment.petName"
                    :serviceName="payment.serviceName"
                    :clientDni="payment.clientDni"
                    :date="payment.date"
                    :time="payment.time"
                    :amount="payment.amount"
                    :status="payment.status"
                  />
                </div>
              </template>
            </Card>
          </div>
        </div>
        <!-- for services -->
        <Card class="card-primary min-h-24 mt-4">
          <template #title>
            <div class="w-full flex items-center gap-2">
              <i class="pi pi-search text-primary"></i>
              <h2 class="h3 font-semibold">Catalogo de servicios</h2>
            </div>
          </template>
          <template #subtitle>
            <p>Busque y filtre servicios para agendar citas</p>
          </template>
          <template #content>
            <div class="flex flex-col w-full">
              <div class="flex w-full justify-end gap-2">
                <InputGroup>
                  <InputGroupAddon>
                    <i class="pi pi-search"></i>
                  </InputGroupAddon>
                  <InputText placeholder="Busque un servicio ..." />
                </InputGroup>
                <div class="flex gap-2 text-sm">
                  <Select placeholder="Categoria"></Select>
                  <Select placeholder="Especie"></Select>
                </div>
              </div>
              <!-- services cards -->
              <div class="w-full grid grid-cols-4 gap-x-12 gap-y-6 mt-4">
                <CardServiceTerciary
                  v-for="service of services"
                  :key="service.serviceId"
                  :serviceId="service.serviceId"
                  :serviceName="service.serviceName"
                  :serviceImageUrl="service.serviceImageUrl"
                  :specieName="service.specieName"
                  :categoryName="service.categoryName"
                  :duration="service.duration"
                  :price="service.price"
                >
                </CardServiceTerciary>
              </div>
            </div>
          </template>
        </Card>
      </template>
    </Card>
  </div>
</template>
