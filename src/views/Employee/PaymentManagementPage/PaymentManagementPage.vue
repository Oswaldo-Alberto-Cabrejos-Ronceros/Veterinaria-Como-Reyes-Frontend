<script lang="ts" setup>
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-payment'
import type { FormValues as SearchPaymentMethodSchema } from '@/validation-schemas-forms/schema-search-payment'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Message from 'primevue/message'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import Payments from '@/assets/data/payments.json'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref } from 'vue'

//form
const { handleSubmit, errors, defineField } = useForm<SearchPaymentMethodSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    headquarterId: undefined,
    serviceId: undefined,
    date: undefined,
  },
})

const [dni, dniAttrs] = defineField('dni')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [servicesId, servicesIdAttrs] = defineField('serviceId')
const [date, dateAttrs] = defineField('date')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//headquarterIds
const headquarters = [
  { name: 'Ica', value: 1 },
  { name: 'Parcona', value: 2 },
  { name: 'Tinguiña', value: 3 },
]

//servicesId
const services = [
  { name: 'Corte de pelo', value: 1 },
  { name: 'Cirugía', value: 2 },
  { name: 'Radiografía', value: 3 },
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
        <h3 class="h3">Pagos</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <!-- cliente -->
            <div>
              <label class="block mb-2">Cliente</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-id-card"></i>
                </InputGroupAddon>
                <InputText v-model="dni" v-bind="dniAttrs" class="w-full" placeholder="Dni" />
              </InputGroup>
              <Message v-if="errors.dni" severity="error" size="small" variant="simple">
                {{ errors.dni }}
              </Message>
            </div>
            <!-- sedes -->
            <div>
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-bind="headquarterIdAttrs"
                v-model="headquarterId"
                :options="headquarters"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sede"
              />

              <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
                {{ errors.headquarterId }}
              </Message>
            </div>

            <!-- services -->

            <div>
              <label class="block mb-2">Servicio</label>
              <Select
                class="w-full"
                v-bind="servicesIdAttrs"
                v-model="servicesId"
                :options="services"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Servicio"
              />

              <Message v-if="errors.serviceId" severity="error" size="small" variant="simple">
                {{ errors.serviceId }}
              </Message>
            </div>

            <div>
              <label class="block mb-2">Fecha de nacimiento</label>
              <DatePicker v-bind="dateAttrs" v-model="date" showIcon fluid iconDisplay="input" />
              <Message v-if="errors.date" severity="error" size="small" variant="simple">
                {{ errors.date }}
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

          <!-- tabla -->

          <DataTable
            :value="Payments"
            paginator
            :rows="10"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-user-plus"
                  iconPos="right"
                  severity="success"
                  label="Agregar Pago"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column field="clientDni" sortable header="Cliente" style="width: 10%"></Column>
            <Column
              field="headquarter"
              sortable
              header="Sede"
              class="hidden lg:table-cell"
              style="width: 12%"
            ></Column>
            <Column
              field="service"
              class="hidden xl:table-cell"
              header="Servicio"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="amount"
              class="hidden xs:table-cell sm:hidden lg:table-cell"
              header="Monto"
              sortable
              style="width: 10%"
            ></Column>
            <Column
              field="paymentMethod"
              class="hidden xl:table-cell"
              header="M.Pago"
              sortable
              style="width: 10%"
            ></Column>
            <Column
              field="date"
              class="table-cell sm:hidden lg:table-cell"
              header="Fecha"
              sortable
              style="width: 10%"
            ></Column>
            <Column
              field="state"
              class="hidden md:table-cell"
              header="Estado"
              sortable
              style="width: 12%"
            ></Column>
            <Column>
              <template #body="{}">
                <div
                  class="flex justify-between items-center flex-col sm:flex-row lg:flex-row gap-1"
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
