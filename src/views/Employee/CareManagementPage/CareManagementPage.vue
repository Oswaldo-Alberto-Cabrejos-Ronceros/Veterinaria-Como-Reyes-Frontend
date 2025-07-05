<script lang="ts" setup>
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-care'
import type { FormValues as SearchCareSchema } from '@/validation-schemas-forms/schema-search-care'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Message from 'primevue/message'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import type { OptionSelect } from '@/models/OptionSelect'
import { useHeadquarter } from '@/composables/useHeadquarter'
import { useVeterinaryService } from '@/composables/useVeterinaryService'
import { onMounted, ref } from 'vue'
import type { Headquarter } from '@/models/Headquarter'
import type { Service } from '@/models/Service'
import { useCare } from '@/composables/useCare'
import type { Care } from '@/models/Care'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDialog, useToast } from 'primevue'
import AddEditCareCard from './components/AddEditCareCard.vue'
import type { FormValues as AddCareFromRequestSchema } from '@/validation-schemas-forms/schema-add-care'

onMounted(async () => {
  loadCares()
})

//methods for care
const { loading, error, getAllCares, completeCare,createCareFromRequest } = useCare()

//for cares

const cares = ref<Care[]>([])

//for loads care
const loadCares = async () => {
  cares.value = await getAllCares()
  headquartersOptions.value = headquartersServicesToOptionsSelect(await getAllHeadquarters())
  servicesOptions.value = headquartersServicesToOptionsSelect(await getAllVeterinaryServices())
}

const onCompleteCare = async (careId: number) => {
  try {
    await completeCare(careId)
    await loadCares()
  } catch (err) {
    console.error('Error al completar atención', err)
  }
}

const { handleSubmit, errors, defineField } = useForm<SearchCareSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    headquarterId: undefined,
    headquarterServiceId: undefined,
    date: undefined,
    status: '',
  },
})

const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [headquarterServiceId, headquarterServiceIdAttrs] = defineField('headquarterServiceId')
const [date, dateAttrs] = defineField('date')
const [status, statusAttrs] = defineField('status')

//for submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
})
//for get headquarters and services
const { getAllHeadquarters } = useHeadquarter()
const { getAllVeterinaryServices } = useVeterinaryService()
const headquartersOptions = ref<OptionSelect[]>([])
const servicesOptions = ref<OptionSelect[]>([])
//for get options from headquarters

const headquartersServicesToOptionsSelect = (items: Headquarter[] | Service[]): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.name,
  }))
}

//for status

const statusOptions: OptionSelect[] = [
  {
    value: 'EN_CURSO',
    name: 'En Curso',
  },
  {
    value: 'COMPLETADO',
    name: 'Completada',
  },
]

//for export

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}

//for toast
const toast = useToast()

const showToast = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Exito',
    detail: message,
    life: 3000,
  })
}


//for dialog
const dialog = useDialog()

//for add
const addCare = async () => {
  dialog.open(AddEditCareCard, {
    props: {
      modal: true,
    },
    onClose: async (options) => {
      const data = options?.data as AddCareFromRequestSchema
      console.log(data)
      if(data){
        const care = await createCareFromRequest(data)
        loadCares()
        showToast(`Atención creada: ${care.dateTime}`)
      }
    },
  })
}
</script>
<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de atenciones</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <div>
              <label class="block mb-2">Fecha</label>
              <DatePicker
                showIcon
                fluid
                iconDisplay="input"
                class="w-full"
                v-bind="dateAttrs"
                v-model="date"
                placeholder="Selecciona Fecha"
              />

              <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
                {{ errors.headquarterId }}
              </Message>
            </div>
            <!-- headquarter -->
            <div>
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-bind="headquarterIdAttrs"
                v-model="headquarterId"
                :options="headquartersOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sede"
              />

              <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
                {{ errors.headquarterId }}
              </Message>
            </div>
            <!-- service -->

            <!-- headquarter -->
            <div>
              <label class="block mb-2">Servicio</label>
              <Select
                class="w-full"
                v-bind="headquarterServiceIdAttrs"
                v-model="headquarterServiceId"
                :options="servicesOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Servicio"
              />

              <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
                {{ errors.headquarterId }}
              </Message>
            </div>

            <div>
              <label class="block mb-2">Estado</label>
              <Select
                class="w-full"
                v-bind="statusAttrs"
                v-model="status"
                :options="statusOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Estado"
              />

              <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
                {{ errors.headquarterId }}
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
          <Message v-if="loading.getAllCares" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllCares" severity="error" size="small" variant="simple">
            Error al cargar las atenciones
          </Message>
          <!-- table -->
          <DataTable
            v-if="cares"
            :value="cares"
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
                  label="Agregar Atencíon"
                  @click="addCare()"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column
              field="dateTime"
              sortable
              header="Dia programado"
              class="hidden lg:table-cell"
              style="width: 30%"
            ></Column>
            <Column
              field="statusCare"
              sortable
              header="Estado"
              class="hidden lg:table-cell"
              style="width: 30%"
            ></Column>
            <Column>
              <template #body="slotProps">
                <div
                  class="flex justify-between items-center flex-row lg:flex-col xl:flex-row gap-1"
                >
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Eliminar"
                    rounded
                  ></Button>
                  <!-- completar si esta en curso -->
                  <Button
                    v-if="slotProps.data.statusCare === 'EN_CURSO'"
                    icon="pi pi-check-circle"
                    severity="success"
                    variant="outlined"
                    aria-label="Completar"
                    rounded
                    @click="onCompleteCare(slotProps.data.id)"
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
