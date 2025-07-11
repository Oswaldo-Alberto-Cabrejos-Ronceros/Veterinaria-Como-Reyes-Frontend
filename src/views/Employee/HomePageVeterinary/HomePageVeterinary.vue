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
import Chart from 'primevue/chart'
import CardVeterinaryRecord from '@/components/CardVeterinaryRecord.vue'
import ScrollPanel from 'primevue/scrollpanel'
import CardPetTerciary from '@/components/CardPetTerciary.vue'
import { useAppointment } from '@/composables/useAppointment'
import type { AppointmentStatsToday } from '@/services/Appointment/domain/models/Appointment'
import type { CareAndAppointmentPanelEmployee } from '@/models/CareAndAppointmentPanelEmployee'
import { useRouter } from 'vue-router'
import { useCare } from '@/composables/useCare'
import type { VeterinaryRecordStats } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import { useVeterinaryRecord } from '@/composables/useVeterinaryRecord'
import type { RecentMedicalRecord } from '@/models/RecentMedicalRecord'
import type { RecentPatient } from '@/models/RecentPatient'
const { getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()

const { getCareAndAppointmentsForEmployee } = useAppointment()
const appointments = ref<CareAndAppointmentPanelEmployee[]>([])

const statsRecords = ref<VeterinaryRecordStats | null>(null)

const { getRecentPatientsByEmployee, getCaresForEmployee } = useCare()

const recentsPacients = ref<RecentPatient[]>([])

const { getStatsByVeterinarian } = useVeterinaryRecord()

const careRecents = ref<CareAndAppointmentPanelEmployee[]>([])

const { getTodayAppointmentStatsByHeadquarter } = useAppointment()

const paymentStats = ref<AppointmentStatsToday | null>(null)

const myInfoEmployee = ref<MyInfoEmployee | null>(null)

const entityId = ref<number | null>(null)

const today = DateAdapter.toFormatView(new Date())

onMounted(async () => {
  loadMyInfo()
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const chartData = ref()
const chartOptions = ref()

//data and options for sales
const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['02/06', '09/06', '16/06', '23/06', '30/06'],
    datasets: [
      {
        label: 'Atenciones',
        data: [65, 59, 80, 81, 50],
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

const loadMyInfo = async () => {
  const entityIdGet = getEntityId()
  entityId.value = entityIdGet
  if (entityIdGet) {
    myInfoEmployee.value = await getEmployeeMyInfo(entityIdGet)
    paymentStats.value = await getTodayAppointmentStatsByHeadquarter(
      myInfoEmployee.value.headquarter.id,
    )
    careRecents.value = await getCareAndAppointmentsForEmployee(entityIdGet)
    appointments.value = await getCaresForEmployee(entityIdGet)
    statsRecords.value = await getStatsByVeterinarian(entityIdGet)
    recentsPacients.value = await getRecentPatientsByEmployee(entityIdGet)
  }
}

const news: { title: string; icon: string; content: string; plus?: string }[] = [
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

const recentPets = ref<RecentMedicalRecord[]>([])

const newsStadistics: { title: string; icon: string; content: string; plus?: string }[] = [
  {
    title: 'Pacientes',
    icon: 'pi-github',
    content: '20',
  },
  {
    title: 'Atenciones',
    icon: 'pi-clipboard',
    content: '10',
  },
  {
    title: 'Horas acumuladas',
    icon: 'pi-clock',
    content: '5',
  },
]

const appoinmentsAbstract: { title: string; value: number }[] = [
  {
    title: 'Completadas',
    value: 1,
  },
  {
    title: 'En curso',
    value: 1,
  },
  {
    title: 'Pendientes',
    value: 5,
  },
]

const router = useRouter()

const redirect = (url: string) => {
  router.push(url)
}
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
        <p class="textLg">{{ today }}</p>
      </template>
      <template #content>
        <!-- news -->
        <div class="w-full grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-4">
          <CardNewsPrimary
            v-if="paymentStats"
            title="Citas hoy"
            icon="pi-calendar"
            :content="paymentStats.totalAppointments.toString()"
          >
          </CardNewsPrimary>

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
              <i class="pi pi-clipboard"></i>
              <p>Acciones rápidas</p>
            </div>
          </template>
          <template #subtitle>
            <p>Funciones más utilizadas</p>
            <div
              class="grid grid-cols-1 xs:grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-2"
            >
              <Button
                label="Atender cita"
                iconPos="top"
                icon="pi pi-clipboard"
                severity="success"
                @click="redirect('/employee/veterinary/appointments')"
              ></Button>
              <Button
                label="Buscar paciente"
                iconPos="top"
                icon="pi pi-search"
                severity="info"
                @click="redirect('/employee/veterinary/pets-management')"
              ></Button>
              <Button
                label="Registrar informe médico"
                severity="warn"
                iconPos="top"
                icon="pi pi-pen-to-square"
                @click="redirect('/employee/veterinary/pets-management')"
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
        <div class="grid grid-cols-1 2xl:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12 mt-4">
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
                  v-for="appoinment of appointments"
                  :appointement-id="appoinment.id"
                  :key="appoinment.id"
                  :pet-name="appoinment.pet.name"
                  :pet-breed="''"
                  :service-name="appoinment.serviceName"
                  :service-duration="''"
                  :owner-name="appoinment.clientName"
                  :time="appoinment.hour"
                  :status="appoinment.status"
                ></CardAppointmentQuintary>
                <!-- abstract  -->

                <div
                  v-if="statsRecords"
                  class="p-4 shadow-none border-1 rounded-sm border-blue-500 bg-blue-50 dark:bg-transparent w-full flex flex-col gap-2 xl:flex-row justify-between items-center"
                >
                  <div class="flex gap-4">
                    <div
                      v-for="(abstract, index) of appoinmentsAbstract"
                      :key="index"
                      class="text-blue-600 dark:text-blue-400 text-center"
                    >
                      <p class="textLg">
                        {{ abstract.title }}
                      </p>
                      <p class="H3 font-bold">
                        {{ abstract.value }}
                      </p>
                    </div>
                  </div>
                  <Button
                    label="Ver agenda completa"
                    class="w-full xl:w-auto"
                    variant="outlined"
                    severity="secondary"
                  />
                </div>
              </div>
            </template>
          </Card>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12">
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
                  <CardPetWaiting
                    v-for="(care, index) of careRecents"
                    :key="index"
                    :client-name="care.clientName"
                    :pet-name="care.pet.name"
                    :service-name="care.serviceName"
                    breed-name=""
                  />
                </div>
              </template>
            </Card>
            <!-- stadistics -->
            <Card class="card-primary min-h-24 max-h-full">
              <template #title>
                <div class="w-full flex justify-between items-baseline">
                  <div class="flex gap-2 items-center">
                    <i class="pi pi-chart-line"></i>
                    <h2 class="h3 font-semibold">Estadísticas</h2>
                  </div>
                  <Button
                    label="Exportar"
                    severity="secondary"
                    icon-pos="left"
                    icon=" pi pi-download"
                    size="small"
                    class="py-1.5"
                  />
                </div>
              </template>
              <template #subtitle>
                <p>Resumen de su actividad</p>
              </template>
              <template #content>
                <div class="w-full flex flex-col gap-2">
                  <div class="flex gap-2 items-center">
                    <i class="pi pi-calendar"></i>
                    <h2 class="h3 font-semibold">Del mes</h2>
                  </div>
                  <!-- card news -->
                  <div class="w-full grid grid-cols-1 3xl:grid-cols-2 gap-y-3 gap-x-6">
                    <CardNewsPrimary
                      v-for="(noticia, index) in newsStadistics"
                      :key="index"
                      :title="noticia.title"
                      :icon="noticia.icon"
                      :content="noticia.content"
                      :plus="noticia.plus"
                    >
                    </CardNewsPrimary>
                  </div>
                  <h2 class="h3 font-semibold">Atenciones del ultimo mes</h2>
                  <div class="flex-1">
                    <Chart
                      type="line"
                      :data="chartData"
                      :options="chartOptions"
                      class="w-full h-min"
                    />
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <div class="grid grid-cols-1 2xl:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-12 mt-4">
          <!-- last diagnosis  -->
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <div class="flex gap-2 items-center">
                  <i class="pi pi-file"></i>
                  <h2 class="h3 font-semibold">Ultimos diagnosticos</h2>
                </div>
                <Tag value="5 registros" severity="secondary" class="self-start"></Tag>
              </div>
            </template>
            <template #subtitle>
              <p>Historial de diagnostico recientes</p>
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-1.5 items-end" v-if="statsRecords">
                <!-- abstract -->
                <div class="w-full grid grid-cols-2 3xl:grid-cols-4 gap-y-3 gap-x-6">
                  <CardNewsPrimary
                    title="En curso"
                    icon="pi-clock"
                    :content="statsRecords.enCurso.toString()"
                  >
                  </CardNewsPrimary>

                  <CardNewsPrimary
                    title="Completado"
                    icon="pi-check-circle"
                    :content="statsRecords.completado.toString()"
                  >
                  </CardNewsPrimary>

                  <CardNewsPrimary
                    title="Observación"
                    icon="pi-info-circle"
                    :content="statsRecords.observacion.toString()"
                  >
                  </CardNewsPrimary>

                  <CardNewsPrimary
                    title="Total"
                    icon="pi-file"
                    :content="statsRecords.total.toString()"
                  >
                  </CardNewsPrimary>
                </div>
                <ScrollPanel class="h-[30rem] mt-2 w-full">
                  <CardVeterinaryRecord
                    class="mb-2"
                    v-for="record in recentPets"
                    :key="record.id"
                    :record-id="record.id"
                    :date="record.recordMedicalDate"
                    :pet-name="record.petName"
                    :breed-name="record.breedName"
                    :status="record.status"
                    :service-name="record.serviceName"
                    :client-name="record.clientFullName"
                    :diagnosis-content="record.diagnosis"
                    :treatment="record.treatment"
                    :observations="record.observations"
                  ></CardVeterinaryRecord
                ></ScrollPanel>

                <Button
                  class="mt-2"
                  iconPos="right"
                  icon="pi pi-arrow-right"
                  label="Ver historial completo"
                  variant="text"
                  severity="info"
                />
              </div>
            </template>
          </Card>
          <!-- pet recent -->
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <div class="flex gap-2 items-center">
                  <i class="pi pi-heart"></i>
                  <h2 class="h3 font-semibold">Pacientes Recientes</h2>
                </div>
                <Tag value="5 pacientes" severity="secondary" class="self-start"></Tag>
              </div>
            </template>
            <template #subtitle>
              <p>Historial de pacientes atendidos recientemente</p>
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-1.5 items-end">
                <CardPetTerciary v-for="pet of recentsPacients" :key="pet.petId" :pet-id="pet.petId"
                :pet-name="pet.petName" :pet-breed="pet.breedName" :pet-image="''"  :pet-weight="pet.petWeight"
                :pet-gender="pet.petSex" :pet-birtdate="pet.petBirthdate" :owner-name="pet.clientFullName" :last-appoinment-date="pet.lastVisitDate"
                />
              </div>
              <Button
                class="mt-2 w-full"
                iconPos="right"
                icon="pi pi-arrow-right"
                label="Ver historial completo"
                variant="text"
              />
            </template>
          </Card>
        </div>
      </template>
    </Card>
  </div>
</template>
