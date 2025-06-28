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

onMounted(async () => {
  loadCares()
})

//methods for care

//for loads care
const loadCares = async () => {
  headquartersOptions.value = headquartersServicesToOptionsSelect(await getAllHeadquarters())
  servicesOptions.value = headquartersServicesToOptionsSelect(await getAllVeterinaryServices())
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
        </div>
      </template>
    </Card>
  </div>
</template>
