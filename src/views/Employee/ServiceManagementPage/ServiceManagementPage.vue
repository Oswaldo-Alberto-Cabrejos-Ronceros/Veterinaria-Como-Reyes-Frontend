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
  getAllVeterinaryServices,
  createVeterinaryService,
  updateVeterinaryService,
  deleteVeterinaryService,
  activateVeterinaryService,
} = useVeterinaryService()

const { getAllSpecies } = useSpecie()

const { getAllCategories } = useCategory()

//services

const services = ref<Service[]>([])

const speciesOptions = ref<OptionSelect[]>([])

const categoriesOptions = ref<OptionSelect[]>([])

onMounted(async () => {
  loadServices()
  speciesOptions.value = speciesToOptionsSelect(await getAllSpecies())
  categoriesOptions.value = categoriesToOptionsSelect(await getAllCategories())
})

const loadServices = async () => {
  services.value = await getAllVeterinaryServices()
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

const viewService = (serviceData: Service) => {
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

const editService = async (serviceData: Service) => {
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

//for delete with confirm popup
const deleteService = (event: MouseEvent | KeyboardEvent, service: Service) => {
  confirm.require({
    group:'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar este servicio?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Eliminar',
      severity: 'danger',
    },
    accept: async () => {
      console.log('Eliminando Empleado ', service.id)
      await deleteVeterinaryService(service.id)
      showToast('Servicio eliminado exitosamente: ' + service.name)
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

//for activate service
const activarServicio = async (service: Service) => {
  await activateVeterinaryService(service.id)
  showToast('Servicio activado exitosamente: ' + service.name)
  loadServices()
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
                <InputText v-model="name" v-bind="nameAttrs" class="w-full" placeholder="Nombre" />
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
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Especie"
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
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Categoria"
              />
              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
              </Message>
            </div>
            <div class="form-button-search-container-grid-col-5">
              <!-- button -->
              <Button
                label="Buscar"
                type="submit"
                severity="info"
                icon="pi pi-search"
                iconPos="right"
                class="w-full"
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
            :rows="10"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
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
            <Column>
              <template #body="{ data }">
                <div
                  class="flex justify-between items-center flex-row lg:flex-col xl:flex-row gap-1"
                >
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="viewService(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="editService(data)"
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="deleteService($event, data)"
                  ></Button>
                  <Button
                    icon="pi pi-check-circle"
                    severity="success"
                    variant="outlined"
                    aria-label="Activar"
                    rounded
                    @click="activarServicio(data)"
                  ></Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
