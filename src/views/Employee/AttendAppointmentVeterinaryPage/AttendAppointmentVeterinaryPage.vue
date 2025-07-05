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
            <TabPanel value="0"></TabPanel>
            <TabPanel value="1"></TabPanel>
            <TabPanel value="2"></TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
