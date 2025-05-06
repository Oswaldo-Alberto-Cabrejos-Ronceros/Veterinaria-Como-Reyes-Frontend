<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-client'
import type { FormValues } from '@/validation-schemas-forms/schema-search-client'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    names: '',
    lastnames: '',
    phone: '',
    email: '',
  },
})

const fieldMap = {
  dni: defineField('dni'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
  phone: defineField('phone'),
  email: defineField('email'),
}

const searchElementsClient: { title: string; key: keyof typeof fieldMap; icon: string }[] = [
  {
    title: 'DNI',
    key: 'dni',
    icon: 'pi-id-card',
  },
  {
    title: 'Nombres',
    key: 'names',
    icon: 'pi-user',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
  },
  {
    title: 'Celular',
    key: 'phone',
    icon: 'pi-mobile',
  },
  {
    title: 'Email',
    key: 'email',
    icon: 'pi-envelope',
  },
]

//for submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de Clientes</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <!-- form -->
          <form @submit.prevent="onSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="element in searchElementsClient" :key="element.key">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText
                  v-model="fieldMap[element.key][0].value"
                  v-bind="fieldMap[element.key][1]"
                  class="w-full"
                  :placeholder="element.title"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
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
