<script setup lang="ts">
import { inject, onMounted, type Ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { schema } from '@/validation-schemas-forms/schema-add-edit-specie'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-specie'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { ref } from 'vue'

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
  },
})

//fields
const [name, nameAttrs] = defineField('name')
const [imagePath,imagePathAttrs] = defineField('imagePath')

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void,
  data:{
    specieData?:FormValues
  }
}>

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

const title = ref<string>('Agregar')


onMounted(()=>{
  if(dialogRef.value.data){
    console.log(dialogRef.value.data)
    const params = dialogRef.value.data.specieData
    //set data if edit
    if(params){
      title.value='Editar'
      name.value = params.name
    }
  }
})


</script>

<template>
  <Card class="card-dialog-form-layout">
    <template #header>
      <h3 class="h3 text-center">{{title}} Especie</h3>
    </template>
    <template #content>
      <form @submit.prevent="onSubmit" class="form-dialog-layout-flex-col">
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

                <!-- image -->
        <div>
          <label class="block mb-2">Image</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-image"></i>
            </InputGroupAddon>
            <InputText v-model="imagePath" v-bind="imagePathAttrs" class="w-full" placeholder="Imagen" />
          </InputGroup>
          <Message v-if="errors.imagePath" severity="error" size="small" variant="simple">
            {{ errors.imagePath }}
          </Message>
        </div>
        <Button
          class="w-full max-w-md"
          :label="title"
          type="submit"
          severity="success"
          icon="pi pi-save"
          iconPos="right"
        />
      </form>
    </template>
  </Card>
</template>
