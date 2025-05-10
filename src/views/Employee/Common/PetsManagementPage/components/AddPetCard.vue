<script setup lang="ts">
import { inject, type Ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { schema } from '@/validation-schemas-forms/schema-add-pet'
import type { FormValues } from '@/validation-schemas-forms/schema-add-pet'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import IftaLabel from 'primevue/iftalabel'
import Button from 'primevue/button'
import Message from 'primevue/message'

//form
const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    gender: '',
    weight: undefined,
    birthdate: undefined,
    comment: '',
    specieId: undefined,
    breedId: undefined,
    urlImage: '',
    ownerDni: '',
  },
})

//field

const [name, nameAttrs] = defineField('name')
const [gender, genderAttrs] = defineField('gender')
const [weight, weightAttrs] = defineField('weight')
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [comment, commentAttrs] = defineField('comment')
const [specieId, specieIdAttrs] = defineField('specieId')
const [breedId, breedIdAttrs] = defineField('breedId')
const [urlImage, urlImageAttrs] = defineField('urlImage')
const [ownerDni, ownerDniAttrs] = defineField('ownerDni')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
}>

//genders
const genders = [
  { name: 'Macho', value: 'M' },
  { name: 'Hembra', value: 'H' },
]

const species = [
  { name: 'Perro', value: 1 },
  { name: 'Gato', value: 2 },
]

//breeds
const breeds = [
  { name: 'Pastor Alemán', value: 1 },
  { name: 'Salchicha', value: 2 },
]
</script>

<template>
  <Card class="card-dialog-form-layout">
    <template #title>
      <h3 class="h3 text-center">Agregar Mascota</h3>
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
            placeholder="Selecciona Raza"
          />

          <Message v-if="errors.gender" severity="error" size="small" variant="simple">
            {{ errors.gender }}
          </Message>
        </div>
        <!-- weight -->
        <div>
          <label class="block mb-2">Peso</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-info"></i>
            </InputGroupAddon>
            <InputNumber
              v-model="weight"
              v-bind="weightAttrs"
              fluid
              class="w-full"
              placeholder="Peso"
            />
          </InputGroup>
          <Message v-if="errors.weight" severity="error" size="small" variant="simple">
            {{ errors.weight }}
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

        <!-- comment -->

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

        <div>
          <label class="block mb-2">Raza</label>
          <Select
            class="w-full"
            v-bind="breedIdAttrs"
            v-model="breedId"
            :options="breeds"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Raza"
          />

          <Message v-if="errors.breedId" severity="error" size="small" variant="simple">
            {{ errors.breedId }}
          </Message>
        </div>

        <div>
          <label class="block mb-2">Imagen</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-image"></i>
            </InputGroupAddon>
            <InputText
              v-model="urlImage"
              v-bind="urlImageAttrs"
              class="w-full"
              placeholder="Imagen"
            />
          </InputGroup>
          <Message v-if="errors.urlImage" severity="error" size="small" variant="simple">
            {{ errors.urlImage }}
          </Message>
        </div>

        <div>
          <label class="block mb-2">Dueño</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              v-model="ownerDni"
              v-bind="ownerDniAttrs"
              class="w-full"
              placeholder="Dueño"
            />
          </InputGroup>
          <Message v-if="errors.ownerDni" severity="error" size="small" variant="simple">
            {{ errors.ownerDni }}
          </Message>
        </div>
        <div>
          <label class="block mb-2">Comentario</label>

          <IftaLabel>
            <Textarea
              id="description"
              v-model="comment"
              v-bind="commentAttrs"
              rows="5"
              class="resize-none w-full"
            />
            <label for="description">Comentario</label>
          </IftaLabel>

          <Message v-if="errors.comment" severity="error" size="small" variant="simple">
            {{ errors.comment }}
          </Message>
        </div>
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
