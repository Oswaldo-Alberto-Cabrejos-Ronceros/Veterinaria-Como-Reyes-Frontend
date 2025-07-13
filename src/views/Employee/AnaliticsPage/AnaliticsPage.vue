<script lang="ts" setup>
import Card from 'primevue/card'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import CardNewsPrimary from '@/components/CardNewsPrimary.vue'
import { onMounted, ref } from 'vue'
import Chart from 'primevue/chart'

onMounted(() => {
  chartDataIncome.value = setChartDataIncome()
  chartOptionsIncome.value = setChartOptionsIncome()
  chartDataServices.value = setChartDataServices()
  chartOptionsServices.value = setChartOptionsServices()
  chartDataAppointments.value = setChartDataAppointments()
  chartOptionsAppointments.value = setChartOptionsAppointments()

  //operationals

  chartDataPacients.value = setChartDataPacients()
  chartOptionsPacients.value = setChartOptionsPacients()
  chartDataSpecies.value = setChartDataSpecies()
  chartOptionsSpecies.value = setChartOptionsSpecies()
  chartDataVeterinarians.value = setChartDataVeterinarians()
  chartOptionsVeterinarians.value = setChartOptionsVeterinarians()
})

const chartDataIncome = ref()
const chartOptionsIncome = ref()
const chartDataServices = ref()
const chartOptionsServices = ref()

const chartDataAppointments = ref()
const chartOptionsAppointments = ref()

//operationals

const chartDataPacients = ref()
const chartOptionsPacients = ref()

const chartDataSpecies = ref()
const chartOptionsSpecies = ref()

const chartDataVeterinarians = ref()
const chartOptionsVeterinarians = ref()

//data and options for sales
const setChartDataIncome = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ingresos',
        data: [500, 600, 800, 500, 200, 660, 500, 1000, 800, 900, 400, 1200],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-green-500'),
        tension: 0.4,
      },
    ],
  }
}

const setChartOptionsIncome = () => {
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

const setChartDataServices = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: ['Baño perro', 'Vacunacion parvovirus', 'Otros'],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-gray-500'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-gray-400'),
        ],
      },
    ],
  }
}

const setChartOptionsServices = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor,
        },
      },
    },
  }
}

const setChartDataAppointments = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    datasets: [
      {
        label: 'Citas completadas',
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'Citas canceladas',
        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  }
}
const setChartOptionsAppointments = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
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
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  }
}

//operationals

const setChartDataPacients = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Pacientes Recurrentes',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
      },
      {
        label: 'Pacientes nuevos',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: true,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue('--p-orange-500'),
      },
    ],
  }
}
const setChartOptionsPacients = () => {
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

const setChartDataSpecies = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-pink-500'),
          documentStyle.getPropertyValue('--p-gray-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-purple-500'),
          documentStyle.getPropertyValue('--p-cyan-500'),
        ],
        label: 'My dataset',
      },
    ],
    labels: ['Perro', 'Gato', 'Loro', 'Cuy', 'otros'],
  }
}
const setChartOptionsSpecies = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
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
      r: {
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

const setChartDataVeterinarians = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['Dra. Maria', 'Dr. Jesus', 'Dr. Carmen', 'Dr. Jorge', 'Dr. Karla'],
    datasets: [
      {
        label: 'Pacientes',
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: [65, 59, 80, 81, 56],
      },
      {
        label: 'Citas',
        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        data: [28, 48, 40, 19, 86],
      },
    ],
  }
}
const setChartOptionsVeterinarians = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
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
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
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
        <h2 class="h2">Analiticas</h2>
      </template>
      <template #subtitle>
        <p class="textLg">Analisis y metricas de la clinica</p>
      </template>
      <template #content>
        <Tabs value="0">
          <TabList>
            <Tab value="0">Financieras</Tab>
            <Tab value="1">Operacionales</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <Card class="card-principal-color-neutral">
                <template #title>
                  <h2 class="h2">Financieras</h2>
                </template>
                <template #subtitle>
                  <p class="textLg">Analisis de ingresos y rentabilidad</p>
                </template>
                <template #content>
                  <div
                    class="w-full grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-4"
                  >
                    <CardNewsPrimary
                      :title="'Ingresos del mes'"
                      icon="pi-money-bill"
                      :content="'S/ 9000'"
                      :plus="'8.5% vs mes anterior'"
                    >
                    </CardNewsPrimary>
                    <CardNewsPrimary
                      :title="'Atenciones semanales'"
                      icon="pi-clock"
                      :content="'500'"
                      :plus="'8.5% vs semana anterior'"
                    >
                    </CardNewsPrimary>
                    <CardNewsPrimary
                      :title="'Citas semanales'"
                      icon="pi-calendar"
                      :content="'350'"
                      :plus="'8.5% vs semana anterior'"
                    >
                    </CardNewsPrimary>
                    <CardNewsPrimary
                      :title="'Tasa de exito'"
                      icon="pi-chart-line"
                      :content="'94.5%'"
                      :plus="'Citas completadas exitosamente'"
                    >
                    </CardNewsPrimary>
                  </div>
                  <Card class="card-primary min-h-24 mt-4">
                    <template #title>
                      <h2 class="h2">Evolución financiera anual</h2>
                    </template>

                    <template #subtitle>
                      <p>Ingresos por mes</p>
                    </template>
                    <template #content>
                      <Chart
                        type="line"
                        :data="chartDataIncome"
                        :options="chartOptionsIncome"
                        class="h-[30rem]"
                      />
                    </template>
                  </Card>

                  <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 mt-4">
                    <!-- chart donut -->
                    <Card class="card-primary min-h-24">
                      <template #title>
                        <h2 class="h2">Distribucion de servicios</h2>
                      </template>
                      <template #subtitle>
                        <p>Porcentaje por servicio</p>
                      </template>
                      <template #content>
                        <div class="card flex justify-center">
                          <Chart
                            type="doughnut"
                            :data="chartDataServices"
                            :options="chartOptionsServices"
                            class="w-full md:w-[30rem]"
                          />
                        </div>
                      </template>
                    </Card>
                    <!-- appointments -->
                    <Card class="card-primary min-h-24">
                      <template #title>
                        <h2 class="h2">Cita por Dia de la semana</h2>
                      </template>
                      <template #subtitle>
                        <p>Distribucion semanal de citas</p>
                      </template>
                      <template #content>
                        <div class="card flex justify-center">
                          <Chart
                            type="bar"
                            :data="chartDataAppointments"
                            :options="chartOptionsAppointments"
                            class="h-[30rem] w-full"
                          />
                        </div>
                      </template>
                    </Card>
                  </div>
                </template>
              </Card>
            </TabPanel>
            <TabPanel value="1">
              <Card class="card-principal-color-neutral">
                <template #title>
                  <h2 class="h2">Operacionales</h2>
                </template>
                <template #subtitle>
                  <p class="textLg">Analisis de pacientes y veterinarios</p>
                </template>
                <template #content>
                  <!-- news -->
                  <div
                    class="w-full grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-4"
                  >
                    <CardNewsPrimary
                      :title="'Total de pacientes'"
                      icon="pi-heart"
                      :content="'S/ 9000'"
                      :plus="'+ 12% vs mes anterior'"
                    >
                    </CardNewsPrimary>
                    <CardNewsPrimary
                      :title="'Total de clientes'"
                      icon="pi-user"
                      :content="'100'"
                      :plus="'+ 5% vs semana anterior'"
                    >
                    </CardNewsPrimary>
                    <CardNewsPrimary
                      :title="'Veterinarios activos'"
                      icon="pi-users"
                      :content="'50'"
                      :plus="'Nuestro equipo'"
                    >
                    </CardNewsPrimary>
                    <CardNewsPrimary
                      :title="'Ingresos por veterinario'"
                      icon="pi-money-bill"
                      :content="'S/ 5000'"
                      :plus="'promedio mensual'"
                    >
                    </CardNewsPrimary>
                  </div>
                  <Card class="card-primary min-h-24 mt-4">
                    <template #title>
                      <h2 class="h2">Evolución de pacientes</h2>
                    </template>
                    <template #subtitle>
                      <p>Pacientes nuevos vs recurrentes por mes</p>
                    </template>
                    <template #content>
                      <Chart
                        type="line"
                        :data="chartDataAppointments"
                        :options="chartOptionsAppointments"
                        class="h-[30rem]"
                      />
                    </template>
                  </Card>

                  <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 mt-4">
                    <!-- species -->
                    <Card class="card-primary min-h-24">
                      <template #title>
                        <h2 class="h2">Distribucion por especies</h2>
                      </template>
                      <template #subtitle>
                        <p>Tipos de pacientes atendidos</p>
                      </template>
                      <template #content>
                        <div class="card flex justify-center">
                          <Chart
                            type="polarArea"
                            :data="chartDataSpecies"
                            :options="chartOptionsSpecies"
                            class="w-full md:w-[30rem]"
                          />
                        </div>
                      </template>
                    </Card>
                    <!-- veterinarians -->

                    <Card class="card-primary min-h-24">
                      <template #title>
                        <h2 class="h2">Rendimiento por veterinario</h2>
                      </template>
                      <template #subtitle>
                        <p>Pacientes atendidos</p>
                      </template>
                      <template #content>
                        <div class="card flex justify-center">
                          <Chart
                            type="bar"
                            :data="chartDataVeterinarians"
                            :options="chartOptionsVeterinarians"
                            class="h-[30rem] w-full"
                          />
                        </div>
                      </template>
                    </Card>
                  </div>
                </template>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
