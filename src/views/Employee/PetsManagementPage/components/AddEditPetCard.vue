<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { schema } from '@/validation-schemas-forms/schema-add-edit-pet'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-pet'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import IftaLabel from 'primevue/iftalabel'
import Button from 'primevue/button'
import Message from 'primevue/message'
import type { OptionSelect } from '@/models/OptionSelect'

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

//species options
const speciesOptions = ref<OptionSelect[]>([])

//breeds options
const breedsOptions = ref<OptionSelect[]>([])

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    petData?: FormValues,
    speciesOptions?:OptionSelect[],
    breedsOptions?:OptionSelect[]
  }
}>

//genders
const genders = [
  { name: 'Macho', value: 'M' },
  { name: 'Hembra', value: 'H' },
]


const title = ref<string>('Agregar')

onMounted(() => {
  if (dialogRef.value.data) {
    console.log(dialogRef.value.data)
    const params = dialogRef.value.data.petData
    const speciesOptionsGet = dialogRef.value.data.speciesOptions
    const breedsOptionsGet = dialogRef.value.data.breedsOptions
    //set data if edit
    if (params) {
      title.value='Editar'
      name.value = params.name
      gender.value = params.gender
      weight.value = params.weight
      birthdate.value = params.birthdate
      comment.value = params.comment
      specieId.value = params.specieId
      breedId.value = params.breedId
      urlImage.value = params.urlImage
      ownerDni.value = params.ownerDni
    }
    if(speciesOptionsGet) speciesOptions.value=speciesOptionsGet
    if(breedsOptionsGet) breedsOptions.value = breedsOptionsGet
  }
})
</script>

<template>
  <Card class="card-dialog-form-layout">
    <template #title>
      <h3 class="h3 text-center">{{title}} Mascota</h3>
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
            :label="title"
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
