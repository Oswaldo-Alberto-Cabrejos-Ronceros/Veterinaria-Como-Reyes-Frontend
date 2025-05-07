<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-pet'
import type { FormValues } from '@/validation-schemas-forms/schema-search-pet'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Button from 'primevue/button'
import Select from 'primevue/select'

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    ownerDni: '',
    specieId: undefined,
    breedId: undefined,
    gender: undefined,
  },
})

const textFields = {
  name: defineField('name'),
  ownerDni: defineField('ownerDni'),
}

//for selects field

const [specieId, specieIdAttrs] = defineField('specieId')
const [breedId, breedIdAttrs] = defineField('breedId')
const [gender, genderAttrs] = defineField('gender')

const searchTextElementsClient: { title: string; key: keyof typeof textFields; icon: string }[] = [
  {
    title: 'Nombre',
    key: 'name',
    icon: 'pi-info',
  },
  {
    title: 'Dueño',
    key: 'ownerDni',
    icon: 'pi-user',
  },
]

//roles
const species = [
  { name: 'Perro', value: 1 },
  { name: 'Gato', value: 2 },
]

//breeds
const breeds = [
  { name: 'Pastor Alemán', value: 1 },
  { name: 'Salchicha', value: 2 },
]

//genders
const genders = [
  { name: 'Macho', value: 'M' },
  { name: 'Hembra', value: 'H' },
]

//for submit

const onSubmit = handleSubmit((values)=>{
  console.log(values)
})

</script>

<template>
  <div class="layout-principal-flex">
<Card class="card-principal-color-neutral">
  <template #title>
        <h3 class="h3">Gestión de mascotas</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="element in searchTextElementsClient" :key="element.key">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText
                  v-model="textFields[element.key][0].value"
                  v-bind="textFields[element.key][1]"
                  class="w-full"
                  :placeholder="element.title"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
              </Message>
            </div>
            <div>
              <label class="block mb-2">Especie</label>
              <Select
                class="w-full"
                v-bind="specieIdAttrs"
                v-model="specieId"
                :options="species"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Rol"
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
                :options="breeds"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Rol"
              />

              <Message v-if="errors.breedId" severity="error" size="small" variant="simple">
                {{ errors.breedId }}
              </Message>
            </div>
            <div>
              <label class="block mb-2">Sexo</label>
              <Select
                class="w-full"
                v-bind="genderAttrs"
                v-model="gender"
                :options="genders"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Rol"
              />

              <Message v-if="errors.gender" severity="error" size="small" variant="simple">
                {{ errors.gender }}
              </Message>
            </div>
            <div class="flex items-end justify-center">
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
