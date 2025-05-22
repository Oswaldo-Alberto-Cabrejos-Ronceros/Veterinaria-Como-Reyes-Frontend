<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import Message from 'primevue/message'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { schema } from '@/validation-schemas-forms/schema-edit-self-client'
import type { FormValues } from '@/validation-schemas-forms//schema-edit-self-client'
import { useForm } from 'vee-validate'
import Button from 'primevue/button'
import { inject, onMounted } from 'vue'
import type { EditSelfClient } from '@/models/EditSelfClient'
import { toTypedSchema } from '@vee-validate/yup'
import type { Ref } from 'vue'

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    phone: '',
    address: '',
    birthdate: undefined,
    headquarterId: undefined,
  },
})

//headquarterIds
const headquarkers = [
  { name: 'Ica', value: 1 },
  { name: 'Parcona', value: 2 },
  { name: 'Tinguiña', value: 3 },
]

const [address, addressAttrs] = defineField('address')
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [phone, phoneAttrs] = defineField('phone')

const onSubmit = handleSubmit((values) => {
  dialogRef.value.close(values as EditSelfClient)
})

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: EditSelfClient) => void
  data: EditSelfClient
}>

onMounted(() => {
  const params = dialogRef.value.data
  //change default values
  address.value = params.address
  birthdate.value = params.birthdate
  headquarterId.value = params.headquarterId
  phone.value = params.phone
})

//emit for edit
</script>

<template>
  <Card class="card-dialog-form-layout">
    <template #title>
      <h3 class="h3 text-center">Editar Datos</h3>
    </template>
    <template #content>
      <form @submit.prevent="onSubmit" class="form-dialog-layout">
        <!-- cell phone -->
        <div>
          <label class="block mb-2">Celular</label>

          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-mobile"></i>
            </InputGroupAddon>
            <InputText v-bind="phoneAttrs" v-model="phone" type="tel" placeholder="Celular" />
          </InputGroup>

          <Message v-if="errors.phone" severity="error" size="small" variant="simple">
            {{ errors.phone }}
          </Message>
        </div>
        <!-- address -->
        <div>
          <label class="block mb-2">Dirección</label>

          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-home"></i>
            </InputGroupAddon>
            <InputText
              v-bind="addressAttrs"
              v-model="address"
              type="text"
              placeholder="Dirección"
            />
          </InputGroup>

          <Message v-if="errors.address" severity="error" size="small" variant="simple">
            {{ errors.address }}
          </Message>
        </div>

        <!-- birthDate -->
        <div>
          <label class="block mb-2">Fecha Nacimiento</label>

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
        <!--for headquarte-->
        <div>
          <label class="block mb-2">Sede</label>
          <Select
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

        <!-- button -->

        <div class="button-form-container-grid-end">
          <Button
            label="Editar"
            type="submit"
            severity="success"
            icon="pi pi-save"
            iconPos="right"
            class="w-full max-w-md"
          />
        </div>
      </form>
    </template>
  </Card>
</template>
