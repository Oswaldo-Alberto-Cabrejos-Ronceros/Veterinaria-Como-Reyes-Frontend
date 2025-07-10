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
import type { Service as ServiceView } from '@/models/Service'
import { useConfirm, useDialog, useToast } from 'primevue'
import { onMounted, ref } from 'vue'
import AddEditServiceCard from './components/AddEditServiceCard.vue'
import type { FormValues as AddEditServiceSchema } from '@/validation-schemas-forms/schema-add-edit-service'
import ViewServiceCard from './components/ViewServiceCard.vue'
import { useVeterinaryService } from '@/composables/useVeterinaryService'
import type { Specie } from '@/models/Specie'
import type { OptionSelect } from '@/models/OptionSelect'
import { useSpecie } from '@/composables/useSpecie'
import type { Category } from '@/models/Category'
import { useCategory } from '@/composables/useCategory'
import type { DataTablePageEvent } from 'primevue/datatable'
import { debounce } from 'lodash'
import type { ServiceList } from '@/models/ServiceList'

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

//methods

const {
  loading,
  error,
  createVeterinaryService,
  updateVeterinaryService,
  activateVeterinaryService,
  searchVeterinaryServices
} = useVeterinaryService()

const { getAllSpecies } = useSpecie()

const { getAllCategories } = useCategory()

//services

const services = ref<ServiceList[]>([])

const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)

const speciesOptions = ref<OptionSelect[]>([])

const categoriesOptions = ref<OptionSelect[]>([])

onMounted(async () => {
  loadServices()
  speciesOptions.value = speciesToOptionsSelect(await getAllSpecies())
  categoriesOptions.value = categoriesToOptionsSelect(await getAllCategories())
})

const loadServices = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size

  const response = await searchVeterinaryServices(
    page,
    size,
    name.value,
     specieId.value?.toString(),
      categoryId.value?.toString(),
  )
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
    value: specie.id,
    name: specie.name,
  }))
}

const categoriesToOptionsSelect = (category: Category[]): OptionSelect[] => {
  return category.map((category) => ({
    value: category.id,
    name: category.name,
  }))
}

//for dialog
const dialog = useDialog()

//for add

const viewService = (serviceData: ServiceView) => {
  dialog.open(ViewServiceCard, {
    props: {
      modal: true,
            header:`${serviceData.name}`
    },
    data: {
      serviceData: serviceData,
    },
  })
}

const addService = async () => {
  dialog.open(AddEditServiceCard, {
    props: {
      modal: true,
      header:'Agregar servicio'
    },
    data: {
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
      categoriesOptions: categoriesToOptionsSelect(await getAllCategories()),
    },
    onClose: async (options) => {
      const data = options?.data
      if (data) {
        const service = await createVeterinaryService(data)
        console.log('Datos recibidos', service)
        showToast('Servicio agregado exitosamente: ' + data.name)
        loadServices()
      }
    },
  })
}

//for edit

const editService = async (serviceData: ServiceView) => {
  dialog.open(AddEditServiceCard, {
    props: {
      modal: true,
      header:`${serviceData.name}`
    },
    data: {
      serviceData: {
        name: serviceData.name,
        description: serviceData.description,
        price: serviceData.price,
        duration: serviceData.duration,
        dirImage: serviceData.dirImage,
        specieId: serviceData.specieId,
        categoryId: serviceData.categoryId,
      } as AddEditServiceSchema,
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
      categoriesOptions: categoriesToOptionsSelect(await getAllCategories()),
    },
    onClose: async (options) => {
      const data = options?.data
      if (data) {
        const service = await updateVeterinaryService(serviceData.id, data)
        console.log('Datos recibidos', service)
        showToast('Servicio editado exitosamente: ' + data.name)
        loadServices()
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

const deleteService = (event: MouseEvent | KeyboardEvent, serviceData: ServiceList) => {
  const isActive = serviceData.status

  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar este servicio?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: isActive ? 'Desactivar' : 'Activar',
      severity: isActive ? 'danger' : 'success',
    },
    accept: async () => {
      await activateVeterinaryService(serviceData.serviceId)
      showToast('Servicio eliminado exitosamente: ' + serviceData.name)
      loadServices()
    },
    reject: () => {
      console.log('Acción cancelada')
    },
  })
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
        <h3 class="h3">Gestión de servicios</h3>
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
                <InputText v-model="name" v-bind="nameAttrs" :invalid="Boolean(errors.name)" class="w-full" placeholder="Nombre" @update:model-value="searchServicesDebounced" />
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
                showClear
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
                showClear
                @update:model-value="searchServicesDebounced"
              />
              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
              </Message>
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
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Servicio"
                  @click="addService"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column
              field="name"
              sortable
              header="Nombre"
              class="hidden lg:table-cell"
              style="width: 18%"
            ></Column>
            <Column field="category" sortable header="Categoria" style="width: 18%"></Column>
            <Column
              field="description"
              class="hidden lg:table-cell"
              header="Descripción"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="price"
              class="hidden lg:table-cell"
              header="Precio"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="specie"
              class="hidden md:table-cell"
              header="Especie"
              sortable
              style="width: 15%"
            ></Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div
                  class="flex items-center flex-row lg:flex-col xl:flex-row gap-1"
                >
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    aria-label="Filter"
                    rounded
                    size="small"
                    @click="viewService(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    aria-label="Filter"
                    rounded
                    @click="editService(data)"
                    size="small"
                  ></Button>
                  <Button
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    aria-label="Eliminar"
                    rounded
                    size="small"
                    @click="deleteService($event, data)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
