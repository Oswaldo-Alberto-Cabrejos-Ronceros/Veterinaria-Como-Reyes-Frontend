<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-add-client'
import type { FormValues } from '@/validation-schemas-forms/schema-add-client'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Password from 'primevue/password'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import type { Ref } from 'vue'
import { inject } from 'vue'

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
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const fieldMap = {
  dni: defineField('dni'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
  phone: defineField('phone'),
  address: defineField('address'),
}

//for adittionals
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

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
    title: 'Phone',
    key: 'phone',
    icon: 'pi-mobile',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
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
  dialogRef.value.close(values as FormValues)
})

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
}>

//headquarterIds
const headquarkers = [
  { name: 'Ica', value: 1 },
  { name: 'Parcona', value: 2 },
  { name: 'Tinguiña', value: 3 },
]
</script>

<template>
  <Card
    class="h-auto w-full sm:w-xl flex flex-col items-center justify-center bg-transparent shadow-none"
  >
    <template #title>
      <h3 class="h3 text-center">Agregar Cliente</h3>
    </template>

    <template #content>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mx-auto"
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

        <div>
          <label class="block mb-2">Email</label>

          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-envelope"></i>
            </InputGroupAddon>
            <InputText
              v-bind="emailAttrs"
              v-model="email"
              type="text"
              placeholder="Correo electrónico"
            />
          </InputGroup>

          <Message v-if="errors.email" severity="error" size="small" variant="simple">
            {{ errors.email }}
          </Message>
        </div>

        <div>
          <label class="block mb-2">Contraseña</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <Password
              v-bind="passwordAttrs"
              v-model="password"
              toggleMask
              :feedback="false"
              placeholder="Contraseña"
            />
          </InputGroup>
          <Message v-if="errors.password" severity="error" size="small" variant="simple">
            {{ errors.password }}
          </Message>
        </div>

        <div>
          <label class="block mb-2">Confirmar contraseña</label>

          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <Password
              v-bind="confirmPasswordAttrs"
              v-model="confirmPassword"
              toggleMask
              placeholder="Confirmar contraseña"
            />
          </InputGroup>

          <Message v-if="errors.confirmPassword" severity="error" size="small" variant="simple">
            {{ errors.confirmPassword }}
          </Message>
        </div>
      </form>
    </template>
  </Card>
</template>
