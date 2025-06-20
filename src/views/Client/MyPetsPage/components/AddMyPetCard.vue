<script lang="ts" setup>
import type { OptionSelect } from '@/models/OptionSelect'
import { schema } from '@/validation-schemas-forms/schema-add-pet-client'
import type { FormValues } from '@/validation-schemas-forms/schema-add-pet-client'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { inject, onMounted, ref, type Ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Message from 'primevue/message'
//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    gender: '',
    birthdate: undefined,
    specieId: undefined,
    breedId: undefined,
  },
})

//field

const [name, nameAttrs] = defineField('name')
const [gender, genderAttrs] = defineField('gender')
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [specieId, specieIdAttrs] = defineField('specieId')
const [breedId, breedIdAttrs] = defineField('breedId')

//for submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//species options
const speciesOptions = ref<OptionSelect[]>([])

//breeds options
const breedsOptions = ref<OptionSelect[]>([])

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    petData?: FormValues
    speciesOptions?: OptionSelect[]
    breedsOptions?: OptionSelect[]
  }
}>

//genders
const genders = [
  { name: 'Macho', value: 'M' },
  { name: 'Hembra', value: 'H' },
]

onMounted(() => {
  if (dialogRef.value.data) {
    const speciesOptionsGet = dialogRef.value.data.speciesOptions
    const breedsOptionsGet = dialogRef.value.data.breedsOptions
    if (speciesOptionsGet) speciesOptions.value = speciesOptionsGet
    if (breedsOptionsGet) breedsOptions.value = breedsOptionsGet
  }
})
</script>
<template>
  <Card class="card-dialog-form-layout">
    <template #title>
      <h3 class="h3 text-center">Agrega a tu mascota</h3>
    </template>
    <template #content>
      <form @submit.prevent="onSubmit" class="form-dialog-layout">
        <!-- name -->
        <div>
          <label class="block mb-2">Nombre</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-info"></i>
            </InputGroupAddon>
            <InputText v-model="name" v-bind="nameAttrs" class="w-full" placeholder="Nombre" />
          </InputGroup>
          <Message v-if="errors.name" severity="error" size="small" variant="simple">
            {{ errors.name }}
          </Message>
        </div>
        <!-- gender -->
        <div>
          <label class="block mb-2">Sexo</label>
          <Select
            class="w-full"
            v-bind="genderAttrs"
            v-model="gender"
            :options="genders"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Sexo"
          />

          <Message v-if="errors.gender" severity="error" size="small" variant="simple">
            {{ errors.gender }}
          </Message>
        </div>
        <!-- birthdate -->
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
          <label class="block mb-2">Especie</label>
          <Select
            class="w-full"
            v-bind="specieIdAttrs"
            v-model="specieId"
            :options="speciesOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Especie"
          />

          <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
            {{ errors.specieId }}
          </Message>
        </div>

        <div>
          <label class="block mb-2">Raza</label>
          <Select
            class="w-full"
            v-bind="breedIdAttrs"
            v-model="breedId"
            :options="breedsOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Raza"
          />

          <Message v-if="errors.breedId" severity="error" size="small" variant="simple">
            {{ errors.breedId }}
          </Message>
        </div>
        <div class="button-form-container-grid-end">
          <Button
            class="w-full max-w-md"
            label="Agregar"
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
