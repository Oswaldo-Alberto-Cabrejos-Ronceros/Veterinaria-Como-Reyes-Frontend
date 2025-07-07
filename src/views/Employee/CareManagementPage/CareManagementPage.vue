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
import { useRoute, useRouter } from 'vue-router'
import type { DataTablePageEvent } from 'primevue/datatable'
import { debounce } from 'lodash'

onMounted(async () => {
  headquartersOptions.value = headquartersServicesToOptionsSelect(await getAllHeadquarters())
  servicesOptions.value = headquartersServicesToOptionsSelect(await getAllVeterinaryServices())
  await loadCares()
})

//methods for care
const { loading, error, searchCares, completeCare, createCareFromRequest } = useCare()

//for cares

const cares = ref<Care[]>([])

const totalRecords = ref(0)
const rows = ref(10)
const first = ref(0)

//for loads care
const loadCares = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size

  const formattedDate = date.value ? date.value.toISOString().split('T')[0] : undefined

  const result = await searchCares(
    status.value,
    formattedDate,
    headquarterId.value,
    headquarterServiceId.value,
    page,
    size
  )

  cares.value = result.content
  totalRecords.value = result.totalElements
}

const searchCaresDebounced = debounce(() => {
  loadCares()
}, 400)


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
const onSubmit = handleSubmit(async () => {
  first.value = 0 // resetear a página 0
  await loadCares()
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
      header: 'Crear atención',
    },
    onClose: async (options) => {
      const data = options?.data as AddCareFromRequestSchema
      console.log(data)
      if (data) {
        const care = await createCareFromRequest(data)
        loadCares()
        showToast(`Atención creada: ${care.dateTime}`)
      }
    },
  })
}
const router = useRouter()
const route = useRoute()

const viewCare = (careId: number) => {
  router.push(`${route.fullPath}/care/${careId}`)
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
                :invalid="Boolean(errors.date)"
                @update:model-value="searchCaresDebounced"
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
                @update:model-value="searchCaresDebounced"
                :invalid="Boolean(errors.headquarterId)"
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
                @update:model-value="searchCaresDebounced"
                :invalid="Boolean(errors.headquarterServiceId)"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Servicio"
              />

              <Message v-if="errors.headquarterServiceId" severity="error" size="small" variant="simple">
                {{ errors.headquarterServiceId }}
              </Message>
            </div>

            <div>
              <label class="block mb-2">Estado</label>
              <Select
                class="w-full"
                v-bind="statusAttrs"
                v-model="status"
                :options="statusOptions"
                @update:model-value="searchCaresDebounced"
                :invalid="Boolean(errors.status)"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Estado"
              />

              <Message v-if="errors.status" severity="error" size="small" variant="simple">
                {{ errors.status }}
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
          <Message v-if="loading.searchCares" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.searchCares" severity="error" size="small" variant="simple">
            Error al cargar las atenciones
          </Message>
          <!-- table -->
          <DataTable
            :value="cares"
            lazy
            paginator
            :rows="rows"
            :first="first"
            :totalRecords="totalRecords"
            :loading="loading.searchCares"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            @page="loadCares"
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
                    icon="pi pi-calendar-clock"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="viewCare(slotProps.data.id)"
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
