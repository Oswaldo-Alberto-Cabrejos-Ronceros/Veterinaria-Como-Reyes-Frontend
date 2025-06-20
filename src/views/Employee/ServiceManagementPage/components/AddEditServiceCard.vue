<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { schema } from '@/validation-schemas-forms/schema-add-edit-service'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-service'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import IftaLabel from 'primevue/iftalabel'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { inject, onMounted } from 'vue'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { OptionSelect } from '@/models/OptionSelect'
//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    description: '',
    price: undefined,
    duration: undefined,
    dirImage: '',
    specieId: undefined,
    categoryId: undefined,
  },
})

//fields

const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')
const [price, priceAttrs] = defineField('price')
const [duration, durationAttrs] = defineField('duration')
const [dirImage, dirImageAttrs] = defineField('dirImage')
const [specieId, specieIdAttrs] = defineField('specieId')
const [categoryId, categoryIdAttrs] = defineField('categoryId')

//for submit

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values)
})


//headquarter options
const speciesOptions = ref<OptionSelect[]>([])

//roles options
const categoriesOptions = ref<OptionSelect[]>([])



//for dialog

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data:{
    serviceData?:FormValues,
    speciesOptions?:OptionSelect[],
    categoriesOptions?:OptionSelect[]
  }
}>


//title reactive
const title = ref<string>('Agregar')

//for edit
onMounted(()=>{
  if(dialogRef.value.data){
    const params = dialogRef.value.data.serviceData
    const speciesOptionsGet = dialogRef.value.data.speciesOptions
    const categoriesOptionsGet = dialogRef.value.data.categoriesOptions
    if(params){
      title.value='Editar'
      name.value=params.name
      description.value=params.description
      price.value=params.price
      duration.value=params.duration
      dirImage.value=params.dirImage
      specieId.value = params.specieId
      categoryId.value= params.categoryId
    }
    if(speciesOptionsGet){
      speciesOptions.value = speciesOptionsGet
    }
    if(categoriesOptionsGet) {
      categoriesOptions.value = categoriesOptionsGet
    }
  }
})
</script>

<template>
  <Card class="card-dialog-form-layout">
    <template #title>
      <h3 class="h3 text-center">{{title}} Servicio</h3>
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
        <!-- price -->

                <div>
          <label class="block mb-2">Precio</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-info"></i>
            </InputGroupAddon>
            <InputNumber
              v-model="price"
              v-bind="priceAttrs"
              fluid
              class="w-full"
              placeholder="Price"
            />
          </InputGroup>
          <Message v-if="errors.price" severity="error" size="small" variant="simple">
            {{ errors.price }}
          </Message>
        </div>

        <!-- duration -->

                <div>
          <label class="block mb-2">Duración</label>
          <DatePicker
          timeOnly
            v-bind="durationAttrs"
            v-model="duration"
            showIcon
            fluid
            iconDisplay="input"
          />
          <Message v-if="errors.duration" severity="error" size="small" variant="simple">
            {{ errors.duration }}
          </Message>
        </div>

         <!-- image -->
        <div>
          <label class="block mb-2">Imagen</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-image"></i>
            </InputGroupAddon>
            <InputText v-model="dirImage" v-bind="dirImageAttrs" class="w-full" placeholder="Imagen" />
          </InputGroup>
          <Message v-if="errors.dirImage" severity="error" size="small" variant="simple">
            {{ errors.dirImage }}
          </Message>
        </div>

        <!-- specie -->

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

        <!-- category -->

                <div>
          <label class="block mb-2">Categoria</label>
          <Select
            class="w-full"
            v-bind="categoryIdAttrs"
            v-model="categoryId"
            :options="categoriesOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Categoria"
          />

          <Message v-if="errors.categoryId" severity="error" size="small" variant="simple">
            {{ errors.categoryId }}
          </Message>
        </div>

        <!-- description -->

                <div>
          <label class="block mb-2">Descripción</label>

          <IftaLabel>
            <Textarea
              id="description"
              v-model="description"
              v-bind="descriptionAttrs"
              rows="5"
              class="resize-none w-full"
            />
            <label for="description">Descripción</label>
          </IftaLabel>

          <Message v-if="errors.description" severity="error" size="small" variant="simple">
            {{ errors.description }}
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
