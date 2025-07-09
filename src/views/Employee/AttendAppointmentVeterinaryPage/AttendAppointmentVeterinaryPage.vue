<script lang="ts" setup>
import { onMounted, ref } from 'vue'
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
import { useCare } from '@/composables/useCare'
import { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import { useEmployee } from '@/composables/useEmployee'
import { usePet } from '@/composables/usePet'
import { useClient } from '@/composables/useClient'
import type { Care } from '@/models/Care'
import type { Employee } from '@/models/Employee'
import type { HeadquarterVetService } from '@/models/HeadquarterVetService'
import type { Pet } from '@/models/Pet'
import type { Client } from '@/models/Client'
import type { FormValues as SchemaEditWeight } from '@/validation-schemas-forms/schema-add-weight-pet'
import { useToast } from 'primevue/usetoast'
const props = defineProps<{
  appointmentId: string
}>()
onMounted(async () => {
  console.log(props.appointmentId)
  loadInfo()
})

const { loading, updatePetWeight } = usePet()
//for toast
//toast
const toast = useToast()

const showToast = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Éxito',
    detail: message,
    life: 3000,
  })
}

const handleEditWeight = async (schema: SchemaEditWeight) => {
  try {
    const petId = pet.value?.id
    if (petId) {
      const response = await updatePetWeight(petId, schema.weight)
      await loadInfo()
      showToast(`Peso actualizado correctamente ${response.name}`)
    }
  } catch (error) {
    console.error('Error al cambiar el peso', error)
  }
}

//methods
const { getCareById } = useCare()
const { getHeadquarterVetServiceById } = useHeadquarterVetService()
const { getPetById } = usePet()
const { getEmployeeById } = useEmployee()
const { getClientById } = useClient()
//ref
const care = ref<Care | null>(null)
const headquarterVetService = ref<HeadquarterVetService | null>(null)
const pet = ref<Pet | null>(null)
const employee = ref<Employee | null>(null)
const client = ref<Client | null>(null)

const loadInfo = async () => {
  care.value = await getCareById(Number(props.appointmentId))
  headquarterVetService.value = await getHeadquarterVetServiceById(
    care.value.headquarterVetService.id,
  )
  pet.value = await getPetById(care.value.pet.id)
  employee.value = await getEmployeeById(care.value.employee.id)
  if (pet.value.clientId) {
    client.value = await getClientById(pet.value.clientId)
  }
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
    <CardAppointmentInfo
      v-if="headquarterVetService && care"
      is-care
      :time="care?.dateTime || ''"
      :serviceDuration="headquarterVetService?.service.duration"
      :serviceName="headquarterVetService.service.name"
      :veterinaryName="`${employee?.names} ${employee?.lastnames}`"
      :status="care?.statusCare"
    />
    <div class="w-full grid grid-cols-2 gap-4">
      <CardPetInfo
        v-if="pet"
        :name="pet.name"
        :specie-name="pet.specie.name"
        :breed-name="pet.breed.name"
        :weight="pet.weight"
        :birthdate="String(pet.birthdate)"
        :gender="pet.gender"
        :comment="pet.comment"
        :url-image="pet.urlImage"
      />
      <CardOwnerInfo
        v-if="client"
        :fullName="`${client.names} ${client.lastnames}`"
        :phone="client.phone"
        :address="client.address"
        :headquarter-name="client.headquarter.name"
      />
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
            <TabPanel value="0"
              ><CardVitalSigns
                @set-weight="handleEditWeight($event)"
                :loading="loading.updatePetWeight"
              ></CardVitalSigns
            ></TabPanel>
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
