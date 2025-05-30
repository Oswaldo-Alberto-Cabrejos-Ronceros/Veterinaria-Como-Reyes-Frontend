<script setup lang="ts">
import { inject, onMounted, type Ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { schema } from '@/validation-schemas-forms/schema-add-edit-headquarter'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-headquarter'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { ref } from 'vue'

//form
const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    phone: '',
    address: '',
    email: '',
    district: '',
    province: '',
    departament: '',
  },
})

//fieldMap

const fieldMap = {
  name: defineField('name'),
  phone: defineField('phone'),
  address: defineField('address'),
  email: defineField('email'),
}

//for additionals

const [province, provinceAttrs] = defineField('province')
const [district, districtAttrs] = defineField('district')
const [departament, departamentAttrs] = defineField('departament')

//textfields
const textFields: { title: string; key: keyof typeof fieldMap; type: string; icon: string }[] = [
  {
    title: 'Nombre',
    key: 'name',
    type: 'text',
    icon: 'pi-user',
  },

  {
    title: 'Teléfono',
    key: 'phone',
    type: 'tel',
    icon: 'pi-mobile',
  },
  {
    title: 'Dirección',
    key: 'address',
    type: 'text',
    icon: 'pi-map-marker',
  },

  {
    title: 'Email',
    key: 'email',
    type: 'email',
    icon: 'pi-envelope',
  },
]

//for submit

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    headquarterData?: FormValues
  }
}>

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

const departaments = [
  { name: 'Ica', value: 'Ica' },
  { name: 'Lima', value: 'Lima' },
  { name: 'Arequipa', value: 'Arequipa' },
  { name: 'Ancash', value: 'Ancash' },
]

//for title

const title = ref<string>('Agregar')

onMounted(() => {
  if (dialogRef.value.data) {
    console.log(dialogRef.value.data)
    const params = dialogRef.value.data.headquarterData
    if (params) {
      Object.entries(fieldMap).forEach(([key, [value]]) => {
        value.value = String(params[key as keyof typeof params])
      })
      district.value = params.district
      title.value = 'Editar'
    }
  }
})
</script>

<template>
  <Card class="card-dialog-form-layout">
    <template #title>
      <h3 class="h3 text-center">{{ title }} Sede</h3>
    </template>
    <template #content>
      <form @submit.prevent="onSubmit" class="form-dialog-layout">
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
        <div class="button-form-container-grid-end">
          <Button
            class="w-full max-w-md"
            :label="title"
            type="submit"
            severity="success"
            icon="pi pi-save"
            iconPos="right"
          />
        </div>

        <!-- province -->
        <div>
          <label class="block mb-2">Province</label>
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

        <!-- departament -->
        <div>
          <label class="block mb-2">Departamento</label>
          <Select
            class="w-full"
            v-bind="departamentAttrs"
            v-model="departament"
            :options="departaments"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Departamento"
          />

          <Message v-if="errors.district" severity="error" size="small" variant="simple">
            {{ errors.district }}
          </Message>
        </div>
      </form>
    </template>
  </Card>
</template>
