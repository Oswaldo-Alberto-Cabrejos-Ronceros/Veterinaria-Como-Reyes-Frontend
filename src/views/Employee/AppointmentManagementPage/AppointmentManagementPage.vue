<script lang="ts" setup>
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-appointment'
import type { FormValues as SearchAppointmentSchema } from '@/validation-schemas-forms/schema-search-appointment'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Message from 'primevue/message'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import type { OptionSelect } from '@/models/OptionSelect'
import { useHeadquarter } from '@/composables/useHeadquarter'
import { ref } from 'vue'
import { onMounted } from 'vue'
import type { Headquarter } from '@/models/Headquarter'
import type { Category } from '@/models/Category'
import { useCategory } from '@/composables/useCategory'
import { useAppointment } from '@/composables/useAppointment'
import type { Appointment } from '@/models/Appointment'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

onMounted(async () => {
  loadAppoinments()
})

//methods for appointments
const { loading, error, getAllAppointments } = useAppointment()

//for appoinments

const appointments = ref<Appointment[]>([])

//for load appoinments

const loadAppoinments = async () => {
  appointments.value = await getAllAppointments()
  headquartersOptions.value = headquartersCategoriesToOptionsSelect(await getAllHeadquarters())
  categoriesOptions.value = headquartersCategoriesToOptionsSelect(await getAllCategories())
}

//form
const { handleSubmit, errors, defineField } = useForm<SearchAppointmentSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    headquarterId: undefined,
    categoryId: undefined,
    date: undefined,
    status: undefined,
  },
})

const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [categoryId, categoryIdAttrs] = defineField('categoryId')
const [date, dateAttrs] = defineField('date')
const [status, statusAttrs] = defineField('status')
//for submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for get headquarters and categories
const { getAllHeadquarters } = useHeadquarter()
const { getAllCategories } = useCategory()
const headquartersOptions = ref<OptionSelect[]>([])
const categoriesOptions = ref<OptionSelect[]>([])

//for get options from headquarters

const headquartersCategoriesToOptionsSelect = (
  items: Headquarter[] | Category[],
): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.name,
  }))
}

//for status

const statusOptions: OptionSelect[] = [
  {
    value: 'PROGRAMADA',
    name: 'Programada',
  },
  {
    value: 'CANCELADA',
    name: 'Cancelada',
  },
  {
    value: 'CONFIRMADA',
    name: 'Confirmada',
  },
  {
    value: 'COMPLETADA',
    name: 'Completada',
  },
]

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
        <h3 class="h3">Gestión de citas</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <!-- date -->
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

              <Message v-if="errors.categoryId" severity="error" size="small" variant="simple">
                {{ errors.categoryId }}
              </Message>
            </div>
            <!-- status -->
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
          <Message v-if="loading.getAllAppointments" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllAppointments" severity="error" size="small" variant="simple">
            Error al cargar las citas
          </Message>
          <!-- table -->
          <DataTable
            v-if="appointments"
            :value="appointments"
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
                  label="Agregar Cita"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column
              field="scheduleDateTime"
              sortable
              header="Dia programado"
              class="hidden lg:table-cell"
              style="width: 18%"
            ></Column>
            <Column
              field="creationDate"
              class="hidden lg:table-cell"
              header="Dia creado"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="statusAppointment"
              class="hidden lg:table-cell"
              header="Estado"
              sortable
              style="width: 15%"
            ></Column>
            <Column class="hidden md:table-cell" header="Mascota" sortable style="width: 15%">
              <template #body="{ data }">
                {{ data.pet.name }}
              </template></Column
            >
            <Column >
              <template #body >
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
                    aria-label="Filter"
                    rounded
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
