<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-edit-client'
import type { FormValues } from '@/validation-schemas-forms/schema-edit-client'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import type { Ref } from 'vue'
import { inject, onMounted } from 'vue'

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    names: '',
    lastnames: '',
    phone: '',
    address: '',
    birthdate: undefined,
    headquarterId: undefined,
  },
})

//first fields

const fieldMap = {
  dni: defineField('dni'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
  phone: defineField('phone'),
  address: defineField('address'),
}

//for additinal fields

const [birthdate, birthdateAttrs] = defineField('birthdate')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')

//textfields

const textFields: { title: string; key: keyof typeof fieldMap; icon: string }[] = [
  {
    title: 'DNI',
    key: 'dni',
    icon: 'pi-id-card',
  },
  {
    title: 'Nombres',
    key: 'names',
    icon: 'pi-user',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
  },
  {
    title: 'Phone',
    key: 'phone',
    icon: 'pi-mobile',
  },
  {
    title: 'Dirección',
    key: 'address',
    icon: 'pi-home',
  },
]

//for submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//headquarterIds
const headquarkers = [
  { name: 'Ica', value: 1 },
  { name: 'Parcona', value: 2 },
  { name: 'Tinguiña', value: 3 },
]

//for dialog

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    clientData: FormValues
  }
}>

onMounted(() => {
  const params = dialogRef.value.data
  Object.entries(fieldMap).forEach(([key, [value]]) => {
    value.value = String(params.clientData[key as keyof typeof params.clientData])
  })
  headquarterId.value = params.clientData.headquarterId
  if (params.clientData.birthdate instanceof Date) birthdate.value = params.clientData.birthdate
})
</script>

<template>
  <Card
    class="h-auto w-[80vw] md:w-auto bg-transparent shadow-none"
  >
    <template #title>
      <h3 class="h3 text-center">Editar Datos</h3>
    </template>

    <template #content>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 text-neutral-950 dark:text-surface-0"
      >
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
            />
          </InputGroup>
          <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
            {{ errors[element.key] }}
          </Message>
        </div>
        <div>
          <label class="block mb-2">Fecha de nacimiento</label>
          <DatePicker
            v-bind="birthdateAttrs"
            v-model="birthdate"
            showIcon
            fluid
            iconDisplay="input"
          />

          <Message v-if="errors.birthdate" severity="error" size="small" variant="simple">
            {{ errors.birthdate }}
          </Message>
        </div>
        <div>
          <label class="block mb-2">Sede</label>
          <Select
            class="w-full"
            v-bind="headquarterIdAttrs"
            v-model="headquarterId"
            :options="headquarkers"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Sede"
          />

          <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
            {{ errors.headquarterId }}
          </Message>
        </div>
        <div class="flex items-center justify-center col-span-full">
<Button class="w-full max-w-md" label="Editar" type="submit" severity="success" icon="pi pi-save" iconPos="right" />
        </div>

      </form>
    </template>
  </Card>
</template>
