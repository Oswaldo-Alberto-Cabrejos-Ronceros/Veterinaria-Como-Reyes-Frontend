<script setup lang="ts">
import { inject, onMounted, type Ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { schema } from '@/validation-schemas-forms/schema-add-edit-breed'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-breed'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    specieId: undefined,
    dirImagen: '',
  },
})

//fields
const [name, nameAttrs] = defineField('name')
const [specieId, specieIdAttrs] = defineField('specieId')
const [dirImagen, dirImagenAttrs] = defineField('dirImagen')

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
}>

//roles
const species = [
  { name: 'Perro', value: 1 },
  { name: 'Gato', value: 2 },
]

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})
</script>

<template>
  <Card class="card-dialog-form-layout">
    <template #header>
      <h3 class="h3 text-center">Agregar Raza</h3>
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

                <!-- name -->
        <div>
          <label class="block mb-2">Imagen</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-image"></i>
            </InputGroupAddon>
            <InputText v-model="dirImagen" v-bind="dirImagenAttrs" class="w-full" placeholder="Imagen" />
          </InputGroup>
          <Message v-if="errors.dirImagen" severity="error" size="small" variant="simple">
            {{ errors.dirImagen }}
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
