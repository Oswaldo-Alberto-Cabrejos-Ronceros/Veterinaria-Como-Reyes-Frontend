<script lang="ts" setup>
import { onMounted } from 'vue'
import CardAppointmentInfo from '@/components/CardAppointmentInfo.vue'
import CardPetInfo from '@/components/CardPetInfo.vue'
import CardOwnerInfo from '@/components/CardOwnerInfo.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'
import CardVitalSigns from './components/CardVitalSigns.vue'
import CardHistoryVeterinaryRecord from './components/CardHistoryVeterinaryRecord.vue'
import CardAddVeterinaryRecord from './components/CardAddVeterinaryRecord.vue'
import Divider from 'primevue/divider'
import Button from 'primevue/button'

const props = defineProps<{
  appointmentId: string
}>()
onMounted(async () => {
  console.log(props.appointmentId)
})

const appointmentInfo: {
  time: string
  serviceDuration: number
  serviceName: string
  veterinaryName: string
  comentario?: string
} = {
  time: '9:30',
  serviceDuration: 30,
  serviceName: 'Consulta general',
  veterinaryName: 'Paolo Cueva',
  comentario: 'Consulta de rutina',
}

const petInfo: {
  name: string
  specieName: string
  breedName: string
  weight: number
  birthdate: string
  gender: string
  comment: string
  urlImage: string
} = {
  name: 'Thor',
  specieName: 'Perro',
  breedName: 'Salchicha',
  weight: 15,
  birthdate: '05/12/2023',
  gender: 'Macho',
  comment: 'Perro juguetón, le encanta correr, celoso, no le gusta que se le acerquen al dueño',
  urlImage: 'https://www.hola.com/horizon/43/d1eaad20c4c6-adobestock47432136.jpg',
}

const ownerInfo: {
  name: string
  lastname: string
  phone: string
  email: string
  address: string
} = {
  name: 'Oswaldo Alberto',
  lastname: 'Cabrejos Ronceros',
  phone: '984156123',
  email: 'oswaldocabrejosr@gmail.com',
  address: 'Av. Brasil',
}
const records = [
  {
    recordId: 1,
    description: 'Control general de salud',
    serviceName: 'Consulta veterinaria',
    status: 'Finalizado',
    date: '2025-07-05',
    time: '10:00',
    employeeName: 'Sandra Muñoz',
  },
  {
    recordId: 2,
    description: 'Aplicación de vacunas',
    serviceName: 'Vacunación',
    status: 'En curso',
    date: '2025-07-05',
    time: '11:30',
    employeeName: 'Carlos Ramírez',
  },
  {
    recordId: 3,
    description: 'Baño y corte de pelo',
    serviceName: 'Estética canina',
    status: 'Pendiente',
    date: '2025-07-06',
    time: '09:00',
    employeeName: 'Karen Ruiz',
  },
  {
    recordId: 4,
    description: 'Cirugía menor programada',
    serviceName: 'Cirugía veterinaria',
    status: 'Finalizado',
    date: '2025-07-04',
    time: '15:00',
    employeeName: 'Javier Torres',
  },
  {
    recordId: 5,
    description: 'Evaluación de comportamiento',
    serviceName: 'Etología',
    status: 'Cancelado',
    date: '2025-07-03',
    time: '16:30',
    employeeName: 'Adriana Vega',
  },
]
</script>

<template>
  <div class="layout-principal-flex flex-col gap-2">
    <CardAppointmentInfo v-bind="appointmentInfo" />
    <div class="w-full grid grid-cols-2 gap-4">
      <CardPetInfo v-bind="petInfo"></CardPetInfo>
      <CardOwnerInfo v-bind="ownerInfo" />
    </div>
    <!-- actions -->
    <Card class="card-primary">
      <template #content>
        <Tabs value="0">
          <TabList>
            <Tab value="0"> <i class="pi pi-clipboard"> </i> <span>Exámen</span> </Tab>
            <Tab value="1"> <i class="pi pi-book"> </i> <span>Historial</span> </Tab>
            <Tab value="2"> <i class="pi pi-pen-to-square"> </i> <span>Diagnóstico</span> </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0"><CardVitalSigns></CardVitalSigns></TabPanel>
            <TabPanel value="1">
              <CardHistoryVeterinaryRecord :veterinaryRecords="records" />
            </TabPanel>
            <TabPanel value="2"><CardAddVeterinaryRecord /></TabPanel>
          </TabPanels>
        </Tabs>
        <Divider />
        <div class="w-full flex justify-end">
          <Button
            severity="success"
            icon-pos="left"
            icon="pi pi-check-circle"
            label="Finalizar consulta"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
