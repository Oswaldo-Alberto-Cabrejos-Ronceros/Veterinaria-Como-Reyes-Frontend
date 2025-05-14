<script setup lang="ts">
import Card from 'primevue/card'
import Select from 'primevue/select'
import { ref } from 'vue'
import ServiceHeadquarterSets from '@/assets/data/services-headquarters-sets.json'
import type { ServiceHeadquarterSet } from '@/models/ServiceHeadquarterSet'
import { watch } from 'vue'
import PickList from 'primevue/picklist'

//headquarters
const headquarters = [
  { name: 'Ica', value: 1 },
  { name: 'Parcona', value: 2 },
  { name: 'Subtanjalla', value: 3 },
  { name: 'La Tinguiña', value: 4 },
  { name: 'Pueblo Nuevo', value: 5 },
  { name: 'Chincha Alta', value: 6 },
  { name: 'Nazca', value: 7 },
  { name: 'Vista Alegre', value: 8 },
  { name: 'Tate', value: 9 },
  { name: 'Los Aquijes', value: 10 },
]

//serviceHeadquartersSets
const serviceHeadquartersSets: ServiceHeadquarterSet[] = ServiceHeadquarterSets

const headquarterSelected = ref<number>(1)

const serviceHeadquarterSetSelected = ref<ServiceHeadquarterSet>(
  serviceHeadquartersSets[headquarterSelected.value - 1],
)
//for assignedServices
const assignedServices = ref(serviceHeadquarterSetSelected.value.assignedServices)
//for unassignedServices
const unassignedServices = ref(serviceHeadquarterSetSelected.value.unassignedServices)

//for PickList
const selectedsServices = ref([unassignedServices.value, assignedServices.value])

watch(headquarterSelected, (newValue) => {
  serviceHeadquarterSetSelected.value = serviceHeadquartersSets[newValue - 1]
  console.log(serviceHeadquarterSetSelected.value)
  assignedServices.value=serviceHeadquarterSetSelected.value.assignedServices
  unassignedServices.value=serviceHeadquarterSetSelected.value.unassignedServices
  selectedsServices.value=[unassignedServices.value,assignedServices.value]
})
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión servicios por sede</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <div class="form-search-grid-col-5">
            <!-- for headquarter -->
            <div>
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-model="headquarterSelected"
                :options="headquarters"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Rol"
              />
            </div>
          </div>
          <div class="w-full flex flex-col items-center justify-center">
            <PickList v-model="selectedsServices" dataKey="id" breakpoint="1400px">
              <template #option="{ option }">
                {{ option.serviceName }}
              </template>
            </PickList>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
