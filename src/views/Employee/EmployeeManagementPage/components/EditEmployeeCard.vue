<script lang="ts" setup>
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-edit.employee'
import type { FormValues } from '@/validation-schemas-forms/schema-edit.employee'
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
import { inject, onMounted, ref } from 'vue'
import type { OptionSelect } from '@/models/OptionSelect'
//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    cmvp: '',
    names: '',
    lastnames: '',
    address: '',
    phone: '',
    dirImage: '',
    headquarterId: undefined,
    birthdate: undefined,
    roleId: undefined,
  },
})

//first field

const fieldMap = {
  dni: defineField('dni'),
  cmvp: defineField('cmvp'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
  address: defineField('address'),
  phone: defineField('phone'),
  dirImage: defineField('dirImage'),
}

//fields additionals

const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [roleId, roleIdAttrs] = defineField('roleId')

//first elements

const textFields: { title: string; key: keyof typeof fieldMap; icon: string }[] = [
  {
    title: 'DNI',
    key: 'dni',
    icon: 'pi-id-card',
  },
  {
    title: 'CMVP',
    key: 'cmvp',
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
    title: 'Dirección',
    key: 'address',
    icon: 'pi-home',
  },
  {
    title: 'Celular',
    key: 'phone',
    icon: 'pi-mobile',
  },
  {
    title: 'Imagen',
    key: 'dirImage',
    icon: 'pi-image',
  },
]

//for submit

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values)
})

//headquarter options
const headquartersOptions = ref<OptionSelect[]>([])

//roles options
const rolesOptions = ref<OptionSelect[]>([])

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    employeeData?: FormValues
    headquartersOptions?: OptionSelect[]
    rolesOptions?: OptionSelect[]
  }
}>
onMounted(() => {
  if (dialogRef.value.data) {
    const params = dialogRef.value.data.employeeData
    const headquartersOptionsGet = dialogRef.value.data.headquartersOptions
    const rolesOptionsGet = dialogRef.value.data.rolesOptions
    if (params) {
      Object.entries(fieldMap).forEach(([key, [value]]) => {
        value.value = String(params[key as keyof typeof params])
      })
      headquarterId.value = params.headquarterId
      birthdate.value = params.birthdate
      roleId.value = params.roleId
    }
    if (headquartersOptionsGet) {
      headquartersOptions.value = headquartersOptionsGet
    }
    if (rolesOptionsGet) {
      rolesOptions.value = rolesOptionsGet
    }
  }
})
</script>

<template>
  <Card class="card-dialog-form-layout">
    <template #title>
      <h3 class="h3 text-center">Editar Datos</h3>
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
          <label class="block mb-2">Rol</label>
          <Select
            class="w-full"
            v-bind="roleIdAttrs"
            v-model="roleId"
            :options="rolesOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Rol"
          />

          <Message v-if="errors.roleId" severity="error" size="small" variant="simple">
            {{ errors.roleId }}
          </Message>
        </div>
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
        <!-- button -->

        <div class="button-form-container-grid-end">
          <Button
            class="w-full max-w-md"
            label="Editar"
            type="submit"
            severity="success"
            icon="pi pi-save"
            iconPos="right"
          />
        </div>
      </form>
    </template>
  </Card>
</template>
