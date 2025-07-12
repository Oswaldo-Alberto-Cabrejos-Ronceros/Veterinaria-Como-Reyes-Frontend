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
import { useAppointment } from '@/composables/useAppointment'
import type { AppointmentStatsForReceptionist } from '@/services/Appointment/domain/models/Appointment'
import { useClient } from '@/composables/useClient'
import type { ClientStatsToday } from '@/services/Client/domain/models/Client'
import type { CareStatsToday } from '@/services/Care/domain/models/Care'
import { useCare } from '@/composables/useCare'
import type { IncomeStatsToday } from '@/services/Payment/domain/models/Payment'
import { usePayment } from '@/composables/usePayment'
import type { CareAndAppointmentPanelEmployee } from '@/models/CareAndAppointmentPanelEmployee'
import type { RecentPayment } from '@/models/RecientPayment'
import { useRouter } from 'vue-router'
import ScrollPanel from 'primevue/scrollpanel'

import Paginator from 'primevue/paginator'

const { getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()

const { getAppointmentsByHeadquarterId, getStatsForReceptionist } = useAppointment()

const { getRecentCompletedPayments, getTodayIncomeStats } = usePayment()

const { getClientStatsToday } = useClient()

const { getCareStatsToday } = useCare()

const { getCaresByHeadquarterId } = useCare()

const paymentsRecent = ref<RecentPayment[]>([])

const myInfoEmployee = ref<MyInfoEmployee | null>(null)

const carePending = ref<CareAndAppointmentPanelEmployee[]>([])

const appointmentsTotayStats = ref<AppointmentStatsForReceptionist | null>(null)

const todayAppointments = ref<CareAndAppointmentPanelEmployee[]>([])

const paymentStatsToday = ref<IncomeStatsToday | null>(null)

const clientStatsToday = ref<ClientStatsToday | null>()

const careStatsToday = ref<CareStatsToday | null>(null)

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

  clientStatsToday.value = await getClientStatsToday()

  paymentStatsToday.value = await getTodayIncomeStats()
  if (myInfoEmployee.value) {
    const headquarterId = myInfoEmployee.value.headquarter.id
    careStatsToday.value = await getCareStatsToday(headquarterId)
    appointmentsTotayStats.value = await getStatsForReceptionist(headquarterId)

    todayAppointments.value = await getAppointmentsByHeadquarterId(headquarterId)
    carePending.value = await getCaresByHeadquarterId(headquarterId)
    paymentsRecent.value = await getRecentCompletedPayments(headquarterId)
  }
}

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

const router = useRouter()
const redirect = (name: string) => {
  router.push({ name: name })
}

const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)
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
        <div class="w-full grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-4">
          <CardNewsPrimary
            v-if="appointmentsTotayStats"
            title="Citas hoy"
            icon="pi-calendar"
            :content="appointmentsTotayStats.totalAppointmentsToday.toString()"
            :plus="`${appointmentsTotayStats.confirmedAppointmentsToday} confirmada, ${appointmentsTotayStats.pendingAppointmentsToday} pendientes`"
          >
          </CardNewsPrimary>
          <CardNewsPrimary
            v-if="clientStatsToday"
            title="Clientes atendidos"
            icon="pi-users"
            :content="clientStatsToday.todayClientsAttended.toString()"
            :plus="`+${clientStatsToday.totalClientsAttended - clientStatsToday.todayClientsAttended} desde ayer`"
          ></CardNewsPrimary>

          <CardNewsPrimary
            v-if="careStatsToday"
            title="Atenciones registradas"
            icon="pi-users"
            :content="careStatsToday.todayCares.toString()"
            :plus="`+${careStatsToday.totalCares - careStatsToday.todayCares} desde ayer`"
          ></CardNewsPrimary>

          <CardNewsPrimary
            v-if="careStatsToday"
            title="Ingresos hoy"
            icon="pi-chart-line"
            :content="`S/ ${careStatsToday.todayCares.toString()}`"
          ></CardNewsPrimary>
        </div>
        <!-- quicky actions -->
        <Card class="card-primary min-h-24 mt-4">
          <template #title>
            <p>Acciones rápidas</p>
          </template>
          <template #subtitle>
            <p>Funciones utilizadas frecuentemente</p>
            <div
              class="grid grid-cols-1 xs:grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-2"
            >
              <Button
                label="Nueva cita"
                iconPos="top"
                icon="pi pi-plus"
                @click="redirect('receptionist-appointment-management')"
              ></Button>
              <Button
                label="Buscar cliente"
                variant="outlined"
                iconPos="top"
                icon="pi pi-search"
                severity="secondary"
                @click="redirect('receptionist-client-management')"
              ></Button>
              <Button
                label="Registrar atención"
                severity="secondary"
                variant="outlined"
                iconPos="top"
                icon="pi pi-clipboard"
                @click="redirect('receptionist-care-management')"
              ></Button>
              <Button
                label="Procesar pago"
                severity="secondary"
                variant="outlined"
                iconPos="top"
                icon="pi pi-credit-card"
                @click="redirect('receptionist-payment-management')"
              ></Button>
            </div>
          </template>
        </Card>
        <!-- section 2 -->
        <div class="grid grid-cols-1 2xl:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12 mt-4">
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h2 class="h3 font-semibold">Citas de Hoy</h2>
                <Tag :value="`${todayAppointments.length} citas`" severity="secondary" class="self-start"></Tag>
              </div>
            </template>
            <template #subtitle>
              <p>Agenda completa del dia</p>
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-1.5">
                <ScrollPanel v-if="todayAppointments.length > 0" class="h-56">
                  <CardAppointmentQuaternary
                    v-for="(appointment, index) of todayAppointments"
                    :key="index"
                    :pet-name="appointment.pet.name"
                    :service-name="appointment.serviceName"
                    :owner-name="appointment.clientName"
                    :time="appointment.hour"
                    :status="appointment.status"
                    :employee-name="''"
                    :pet-breed="''"
                  >
                  </CardAppointmentQuaternary>
                </ScrollPanel>
                <div
                  class="flex min-h-44 max-h-56 items-center justify-center"
                  v-if="todayAppointments.length === 0"
                >
                  <p>No citas que mostrar</p>
                </div>
              </div>
            </template>
            <template #footer>
              <Button
                label="Ver todas las citas"
                variant="text"
                icon="pi pi-eye"
                size="small"
                class="mt-2 w-full"
                @click="redirect('receptionist-appointment-management')"
              >
              </Button>
            </template>
          </Card>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12">
            <!-- waiting room -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
                  <h2 class="h3 font-semibold">Sala de espera</h2>
                  <Tag :value="`${carePending.length} esperando`" severity="secondary" class="self-start"></Tag>
                </div>
              </template>
              <template #subtitle>
                <p>Clientes en espera</p>
              </template>
              <template #content>
                <ScrollPanel v-if="carePending.length > 0" class="h-56">
                  <div class="w-full flex flex-col gap-1">
                    <CardClientWaiting
                      v-for="(client, index) of carePending"
                      :key="index"
                      :clientName="client.clientName"
                      :petName="client.pet.name"
                      :serviceName="client.serviceName"
                    ></CardClientWaiting></div
                ></ScrollPanel>
                <div
                  class="flex min-h-44 max-h-56 items-center justify-center"
                  v-if="carePending.length === 0"
                >
                  <p>No atenciones que mostrar</p>
                </div>
              </template>
            </Card>
            <!-- payments -->

            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
                  <h2 class="h3 font-semibold">Ultimos pagos</h2>
                  <Tag :value="`${paymentsRecent.length} pendientes`" severity="secondary" class="self-start"></Tag>
                </div>
              </template>
              <template #content>
                <div class="w-full flex flex-col gap-1">
                  <ScrollPanel v-if="paymentsRecent.length > 0" class="h-64"
                    ><!-- key -->
                    <div class="w-full flex flex-col gap-1">
                      <CardPaymentPrimary
                        v-for="(payment, index) in paymentsRecent"
                        :key="index"
                        :clientName="payment.clientFullName"
                        :petName="payment.petName"
                        :serviceName="payment.serviceName"
                        clientDni=""
                        :date="payment.paymentDate || ''"
                        :time="payment.paymentTime || ''"
                        :amount="payment.amount"
                        :status="payment.paymentStatus"
                      />
                    </div>
                  </ScrollPanel>
                  <div
                    class="flex min-h-44 max-h-56 items-center justify-center"
                    v-if="paymentsRecent.length === 0"
                  >
                    <p>No pagos que mostrar</p>
                  </div>
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
              <div class="flex flex-col sm:flex-row w-full justify-end gap-2">
                <InputGroup>
                  <InputGroupAddon>
                    <i class="pi pi-search"></i>
                  </InputGroupAddon>
                  <InputText placeholder="Busque un servicio ..." />
                </InputGroup>
                <div class="grid grid-cols-2 gap-2 min-w-2xs text-sm">
                  <Select placeholder="Categoria"></Select>
                  <Select placeholder="Especie"></Select>
                </div>
              </div>
              <!-- services cards -->
              <div
                class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-12 gap-y-6 mt-4"
              >
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
              <Paginator
                lazy
                :rows="rows"
                :first="first"
                :totalRecords="totalRecords"
                :rows-per-page-options="[2, 4, 6, 8, 10]"
              />
            </div>
          </template>
        </Card>
      </template>
    </Card>
  </div>
</template>
