<script setup lang="ts">
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'

import Card from 'primevue/card'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Image from 'primevue/image'
import LogoRose from '@/assets/images/logos/logo-rose.png'
import Button from 'primevue/button'
import Message from 'primevue/message'

//Esquema de validación
const schema = yup.object({
  email: yup.string().required('El email es obligatorio').email('Formato inválido'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
})

const { meta } = useForm({
  validationSchema: schema
})
</script>

<template>
  <Card class="h-auto w-xl flex flex-col items-center justify-center text-neutral-950 dark:text-surface-0 dark:bg-surface-800">
    <template #header>
      <Image :src="LogoRose" alt="Logo" width="220" />
    </template>

    <template #title>
      <h3 class="h3 text-center">Iniciar Sesión</h3>
    </template>

    <template #content>
      <Form
        validate-on-input
        class="flex flex-col gap-4 w-full max-w-md"
      >
        <!-- email -->
        <label>Email</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <Field
            name="email"
            rules="required|email"
            v-slot="{ field, errorMessage }"
          >
            <InputText
              v-bind="field"
              placeholder="Email"
              :class="{ 'p-invalid': errorMessage }"
            />
          </Field>
        </InputGroup>
        <ErrorMessage name="email" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- password -->
        <label>Contraseña</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Field
            name="password"
            rules="required|min:6"
            v-slot="{ field, errorMessage }"
          >
            <Password
              v-bind="field"
              toggleMask
              :feedback="false"
              placeholder="Contraseña"
              :class="{ 'p-invalid': errorMessage }"
            />
          </Field>
        </InputGroup>
        <ErrorMessage name="password" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- button -->
        <Button
          label="Ingresar"
          type="submit"
          icon="pi pi-sign-in"
          iconPos="right"
          class="mt-4"
          :disabled="!meta.valid || !meta.dirty"
        />
      </Form>
    </template>
  </Card>
</template>
