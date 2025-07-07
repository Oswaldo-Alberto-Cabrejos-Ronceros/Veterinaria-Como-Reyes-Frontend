<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-service'
import type { FormValues as SearchServiceSchema } from '@/validation-schemas-forms/schema-search-service'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Service } from '@/models/Service'
import { onMounted, ref } from 'vue'

import { useVeterinaryService } from '@/composables/useVeterinaryService'
import type { Specie } from '@/models/Specie'
import type { OptionSelect } from '@/models/OptionSelect'
import { useSpecie } from '@/composables/useSpecie'
import type { Category } from '@/models/Category'
import { useCategory } from '@/composables/useCategory'
import type { DataTablePageEvent } from 'primevue/datatable'
import { debounce } from 'lodash'
import { useHeadquarter } from '@/composables/useHeadquarter'
import type { Headquarter } from '@/models/Headquarter'
import type { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import type { HeadquarterVetService } from '@/models/HeadquarterVetService'

//methods

const {
  loading,
  error,

  searchVeterinaryServices,
} = useVeterinaryService()

const { getAllSpecies } = useSpecie()

const { getAllCategories } = useCategory()

const { getAllHeadquarters } = useHeadquarter()

const {getHeadquarterVetServiceByHeadquarter} = useHeadquarterVetService()

//services
const headquartersOptions = ref<OptionSelect[]>([])

const services = ref<Service[]>([])

const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)

const speciesOptions = ref<OptionSelect[]>([])

const categoriesOptions = ref<OptionSelect[]>([])

const headquarterServices = ref<[][]HeadquarterVetService>([])

onMounted(async () => {
  loadServices()
  speciesOptions.value = speciesToOptionsSelect(await getAllSpecies())
  categoriesOptions.value = categoriesToOptionsSelect(await getAllCategories())
  headquartersOptions.value = headquartersToOptionsSelect(await getAllHeadquarters())
})

//function for load headquarters service

const loadHeadquarterService = async ()=>{
headquarterServices.value=[]
  headquartersOptions.value.forEach((item)=>{
    headquarterServices.value.push(await getHeadquarterVetServiceByHeadquarter(item.value))
  })
}

const loadServices = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size

  const response = await searchVeterinaryServices(page, size, {
    name: name.value,
    specie: specieId.value?.toString(),
    category: categoryId.value?.toString(),
  })

  services.value = response.content
  totalRecords.value = response.totalElements
}

//form
const { handleSubmit, errors, defineField } = useForm<SearchServiceSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    specieId: undefined,
    categoryId: undefined,
  },
})

//fields
const [name, nameAttrs] = defineField('name')
const [specieId, specieIdAttrs] = defineField('specieId')
const [categoryId, categoryIdAttrs] = defineField('categoryId')

//for submit

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

const searchServicesDebounced = debounce(() => {
  loadServices()
}, 400)

//for species to options Select

const speciesToOptionsSelect = (species: Specie[]): OptionSelect[] => {
  return species.map((specie) => ({
    value: specie.name,
    name: specie.name,
  }))
}

const categoriesToOptionsSelect = (category: Category[]): OptionSelect[] => {
  return category.map((category) => ({
    value: category.name,
    name: category.name,
  }))
}

const headquartersToOptionsSelect = (headquarters: Headquarter[]): OptionSelect[] => {
  return headquarters.map((headquarter) => ({
    value: headquarter.id,
    name: headquarter.name,
  }))
}

//for export

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de servicios por sedes</h3>
      </template>
      <template #subtitle>
        <p>Gestina los servicios disponibles en cada sede</p>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <div>
              <label class="block mb-2">Nombre</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-info"></i>
                </InputGroupAddon>
                <InputText
                  v-model="name"
                  v-bind="nameAttrs"
                  :invalid="Boolean(errors.name)"
                  class="w-full"
                  placeholder="Nombre"
                  @update:model-value="searchServicesDebounced"
                />
              </InputGroup>
              <Message v-if="errors.name" severity="error" size="small" variant="simple">
                {{ errors.name }}
              </Message>
            </div>
            <!-- specie -->
            <div>
              <label class="block mb-2">Especie</label>
              <Select
                class="w-full"
                v-bind="specieIdAttrs"
                v-model="specieId"
                :options="speciesOptions"
                :invalid="Boolean(errors.specieId)"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Especie"
                @update:model-value="searchServicesDebounced"
              />

              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
              </Message>
            </div>
            <!-- category -->
            <div>
              <label class="block mb-2">Categoria</label>
              <Select
                class="w-full"
                v-bind="categoryIdAttrs"
                v-model="categoryId"
                :options="categoriesOptions"
                :invalid="Boolean(errors.specieId)"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Categoria"
                @update:model-value="searchServicesDebounced"
              />
              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
              </Message>
            </div>
            <!-- headquarter -->
            <div>
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                :options="headquartersOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sede"
                showClear
              />
            </div>
          </form>

          <!-- for messague loading  -->
          <Message
            v-if="loading.getAllVeterinaryServices"
            severity="warn"
            size="small"
            variant="simple"
          >
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message
            v-if="error.getAllVeterinaryServices"
            severity="error"
            size="small"
            variant="simple"
          >
            Error al cargar los servicios
          </Message>

          <!-- table -->
          <DataTable
            :value="services"
            paginator
            lazy
            :rows="rows"
            :first="first"
            :totalRecords="totalRecords"
            :loading="loading.searchVeterinaryServices"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            @page="loadServices"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-end gap-2 pb-4">
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column
              field="name"
              sortable
              header="Servicio"
              class="hidden lg:table-cell"
              style="width: 18%"
            ></Column>
            <Column
              v-for="headquarter of headquartersOptions"
              :header="`Sede ${headquarter.name}`"
              :key="headquarter.name"
            >
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
