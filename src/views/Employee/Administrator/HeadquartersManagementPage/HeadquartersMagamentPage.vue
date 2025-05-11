<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-headquarter'
import type { FormValues as SearchHeadquarterSchema } from '@/validation-schemas-forms/schema-search-headquarter'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'

//form
const { handleSubmit, errors, defineField } = useForm<SearchHeadquarterSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    location: '',
    province: '',
    district: '',
    phone: '',
    email: '',
  },
})

//fieldMap

const fieldMap = {
  location: defineField('location'),
  phone: defineField('phone'),
  email: defineField('email'),
}

//for additionals

const [province, provinceAttrs] = defineField('province')
const [district, districtAttrs] = defineField('district')

//textfields
const textFields: { title: string; key: keyof typeof fieldMap; type: string; icon: string }[] = [
  {
    title: 'Dirección',
    key: 'location',
    type: 'text',
    icon: 'pi-map-marker',
  },
  {
    title: 'Teléfono',
    key: 'phone',
    type: 'tel',
    icon: 'pi-mobile',
  },
  {
    title: 'Teléfono',
    key: 'email',
    type: 'email',
    icon: 'pi-envelope',
  },
]

//for submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
})

const provinces = [
  { name: 'Ica', value: 'Ica' },
  { name: 'Chincha', value: 'Chincha' },
  { name: 'Pisco', value: 'Pisco' },
  { name: 'Nazca', value: 'Nazca' },
]

const districts = [
  { name: 'Ica', value: 'Ica' },
  { name: 'Parcona', value: 'Parcona' },
  { name: 'Chincha', value: 'Chincha' },
  { name: 'Pisco', value: 'Pisco' },
  { name: 'Nazca', value: 'Nazca' },
]
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de sedes</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <!-- province -->
            <div>
              <label class="block mb-2">Provincia</label>
              <Select
                class="w-full"
                v-bind="provinceAttrs"
                v-model="province"
                :options="provinces"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Provincia"
              />

              <Message v-if="errors.province" severity="error" size="small" variant="simple">
                {{ errors.province }}
              </Message>
            </div>

            <!-- district -->
            <div>
              <label class="block mb-2">Distrito</label>
              <Select
                class="w-full"
                v-bind="districtAttrs"
                v-model="district"
                :options="districts"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Distrito"
              />

              <Message v-if="errors.district" severity="error" size="small" variant="simple">
                {{ errors.district }}
              </Message>
            </div>
            <div v-for="element in textFields" :key="element.key">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText
                  v-model="fieldMap[element.key][0].value"
                  v-bind="fieldMap[element.key][1]"
                  class="w-full"
                  :placeholder="element.title"
                  :type="element.type"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
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
