
<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-service'
import type { FormValues } from '@/validation-schemas-forms/schema-search-service'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'

//form 
const {handleSubmit, errors, defineField}=useForm<FormValues>({
    validationSchema:toTypedSchema(schema),
    initialValues:{
        name:'',
        specieId:undefined,
        categoryId:undefined
    }
})

//fields
const [name, nameAttrs]= defineField('name')
const [specieId, specieIdAttrs]= defineField('specieId')
const [categoryId,categoryIdAttrs]= defineField('categoryId')

//for submit

const onSubmit = handleSubmit((values)=>{
    console.log(values)
})

//for specie
const species = [
  { name: 'Perro', value: 1 },
  { name: 'Gato', value: 2 },
]

//for category

const categories = [
{ name: 'Cuidado', value: 1 },
{ name: 'Médico', value: 1 },
]



</script>


<template>
<div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
        <template #title>
        <h3 class="h3">Gestión de servicios</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
            <form @submit.prevent="onSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
              <label class="block mb-2">Nombre</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-info"></i>
                </InputGroupAddon>
                <InputText
                  v-model="name"
                  v-bind="nameAttrs"
                  class="w-full"
                  placeholder="Nombre"
                />
              </InputGroup>
              <Message v-if="errors.name" severity="error" size="small" variant="simple">
                {{ errors.name}}
              </Message>
            </div>
            <!-- specie -->
            <div>
              <label class="block mb-2">Especie</label>
              <Select
                class="w-full"
                v-bind="specieIdAttrs"
                v-model="specieId"
                :options="species"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Especie"
              />

              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
              </Message>
            </div>
<!-- category -->
<div>
              <label class="block mb-2">Categoria</label>
              <Select
                class="w-full"
                v-bind="categoryIdAttrs"
                v-model="categoryId"
                :options="categories"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Categoria"
              />
              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
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