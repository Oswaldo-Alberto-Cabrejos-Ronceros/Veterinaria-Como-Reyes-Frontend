<script setup lang="ts">
import { inject, type Ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { schema } from '@/validation-schemas-forms/schema-add-edit-payment-method'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-payment-method'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Textarea from 'primevue/textarea'
import IftaLabel from 'primevue/iftalabel'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { ref } from 'vue'
import { onMounted } from 'vue'
//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    description: '',
  },
})

//fields
const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    categoryData?: FormValues
  }
}>

const title = ref<string>('Agregar')

onMounted(() => {
  if (dialogRef.value.data) {
    console.log(dialogRef.value.data)
    const params = dialogRef.value.data.categoryData
    //set data if edit
    if (params) {
      title.value = 'Editar'
      name.value = params.name
      description.value = params.description
    }
  }
})
</script>

<template>
  <Card class="card-dialog-form-layout">
    <template #title>
      <h3 class="h3 text-center">Agregar Categoria</h3>
    </template>
    <template #content>
      <form @submit.prevent="onSubmit" class="form-dialog-layout-col-2">
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
            label="Guardar"
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
