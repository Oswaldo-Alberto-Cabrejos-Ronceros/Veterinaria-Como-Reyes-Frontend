<script lang="ts" setup>
import { useCare } from '@/composables/useCare'
import { useEmployee } from '@/composables/useEmployee'
import { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import { usePet } from '@/composables/usePet'
import type { Care } from '@/models/Care'
import type { Employee } from '@/models/Employee'
import type { HeadquarterVetService } from '@/models/HeadquarterVetService'
import type { Pet } from '@/models/Pet'
import { onMounted, ref } from 'vue'
import CardAppointmentInfo from '@/components/CardAppointmentInfo.vue'
import CardPetInfo from '@/components/CardPetInfo.vue'
import CardOwnerInfo from '@/components/CardOwnerInfo.vue'
import { useClient } from '@/composables/useClient'
import type { Client } from '@/models/Client'
//import CardBilling from '@/components/CardBilling.vue'
//import type { InfoAppointmentForPanel } from '@/models/InfoAppointmentForPanel'

const props = defineProps<{
  careId: number
}>()

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
//const appointmentInfo = ref<InfoAppointmentForPanel|null>(null)

const loadInfo = async () => {
  care.value = await getCareById(props.careId)
  headquarterVetService.value = await getHeadquarterVetServiceById(
    care.value.headquarterVetService.id,
  )
  pet.value = await getPetById(care.value.pet.id)
  employee.value = await getEmployeeById(care.value.employee.id)
  if (pet.value.clientId) {
    client.value = await getClientById(pet.value.clientId)
  }
}

onMounted(() => {
  loadInfo()
})
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
    </div><!--  <CardBilling serviceName="Consulta General" :price="80" /> -->

  </div>
</template>
