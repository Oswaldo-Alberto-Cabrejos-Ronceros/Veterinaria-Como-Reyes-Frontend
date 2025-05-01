<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Password from 'primevue/password'
import Image from 'primevue/image'
import LogoRose from '@/assets/images/logos/logo-rose.png'
import Button from 'primevue/button'
import Message from 'primevue/message'
import {schema} from '@/validation-schemas-forms/schema-login'
import type {FormValues} from '@/validation-schemas-forms/schema-login'
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate'
// Setup del formulario con tipado
const { handleSubmit, errors,  defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    email: '',
    password: ''
  }
})

// Campos individuales con binding
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

// Al enviar
const onSubmit = handleSubmit((values) => {
  console.log('Valores enviados:', values)
})
</script>

<template>
  <Card class="h-auto w-[90%] sm:w-xl flex flex-col items-center justify-center text-neutral-950 dark:text-surface-0 dark:bg-surface-800 ">
    <template #header>
      <Image :src="LogoRose" alt="Logo" width="220" />
    </template>

    <template #title>
      <h3 class="h3 text-center">Iniciar Sesión</h3>
    </template>

    <template #content>
      <form @submit.prevent="onSubmit"
        class="flex flex-col gap-4 w-full max-w-lg  xs:min-w-96 sm:min-w-md "
      >
        <!-- email -->
        <label>Email</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText v-bind="emailAttrs" v-model="email" type="text" placeholder="Email" />
        </InputGroup>
        <Message v-if="errors.email" severity="error" size="small" variant="simple">
          {{ errors.email }}
        </Message>


        <!-- password -->
        <label>Contraseña</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password v-bind="passwordAttrs" v-model="password" toggleMask :feedback="false" placeholder="Contraseña" />
        </InputGroup>
        <Message v-if="errors.password" severity="error" size="small" variant="simple">
          {{ errors.password }}
        </Message>


        <!-- button -->
        <Button
          label="Ingresar"
          type="submit"
          icon="pi pi-sign-in"
          iconPos="right"
          class="mt-4"
        />
      </form>
    </template>
  </Card>
</template>
