<script setup lang="ts">
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Message from 'primevue/message'

//Esquema de validación
const schema = yup.object({
  dni: yup.string().required('El DNI es obligatorio').matches(/^\d{8}$/, 'DNI inválido (8 dígitos)'),
  nombres: yup.string().required('Los nombres son obligatorios'),
  apellidos: yup.string().required('Los apellidos son obligatorios'),
  email: yup.string().required('El email es obligatorio').email('Formato de email inválido'),
  direccion: yup.string().required('La dirección es obligatoria'),
  celular: yup.string().required('El celular es obligatorio').matches(/^9\d{8}$/, 'Celular inválido (debe empezar con 9 y tener 9 dígitos)'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
  confirmarPassword: yup.string()
    .required('Debe confirmar la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  terminos: yup.boolean().oneOf([true], 'Debe aceptar los términos')
})

const { meta } = useForm({
  validationSchema: schema
})
</script>

<template>
  <Card class="w-full md:w-7 shadow-2xl">
    <template #title>Registro de Usuario</template>
    <template #content>
      <Form validate-on-input class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- DNI -->
        <label>DNI</label>
        <Field name="dni" v-slot="{ field, errorMessage }">
          <InputText v-bind="field" placeholder="DNI" :class="{ 'p-invalid': errorMessage }" class="w-full" />
        </Field>
        <ErrorMessage name="dni" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- names -->
        <label>Nombres</label>
        <Field name="nombres" v-slot="{ field, errorMessage }">
          <InputText v-bind="field" placeholder="Nombres" :class="{ 'p-invalid': errorMessage }" class="w-full" />
        </Field>
        <ErrorMessage name="nombres" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- last names -->
        <label>Apellidos</label>
        <Field name="apellidos" v-slot="{ field, errorMessage }">
          <InputText v-bind="field" placeholder="Apellidos" :class="{ 'p-invalid': errorMessage }" class="w-full" />
        </Field>
        <ErrorMessage name="apellidos" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- email -->
        <label>Email</label>
        <Field name="email" v-slot="{ field, errorMessage }">
          <InputText v-bind="field" placeholder="Correo electrónico" :class="{ 'p-invalid': errorMessage }" class="w-full" />
        </Field>
        <ErrorMessage name="email" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- address -->
        <label>Dirección</label>
        <Field name="direccion" v-slot="{ field, errorMessage }">
          <InputText v-bind="field" placeholder="Dirección" :class="{ 'p-invalid': errorMessage }" class="w-full" />
        </Field>
        <ErrorMessage name="direccion" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- cell phone -->
        <label>Celular</label>
        <Field name="celular" v-slot="{ field, errorMessage }">
          <InputText v-bind="field" placeholder="Celular" :class="{ 'p-invalid': errorMessage }" class="w-full" />
        </Field>
        <ErrorMessage name="celular" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- password -->
        <label>Contraseña</label>
        <Field name="password" v-slot="{ field, errorMessage }">
          <Password v-bind="field" toggleMask placeholder="Contraseña" :class="{ 'p-invalid': errorMessage }" class="w-full" />
        </Field>
        <ErrorMessage name="password" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- confirm password -->
        <label>Confirmar Contraseña</label>
        <Field name="confirmarPassword" v-slot="{ field, errorMessage }">
          <Password v-bind="field" toggleMask placeholder="Confirmar contraseña" :class="{ 'p-invalid': errorMessage }" class="w-full" />
        </Field>
        <ErrorMessage name="confirmarPassword" v-slot="{ message }">
          <Message severity="error" :text="message" />
        </ErrorMessage>

        <!-- terms -->
        <div class="col-span-2 flex items-center gap-2">
          <Field name="terminos" type="checkbox" v-slot="{ field }">
            <Checkbox v-bind="field" binary inputId="terminos" />
          </Field>
          <label for="terminos">Acepto los términos y condiciones</label>
        </div>
        <ErrorMessage name="terminos" v-slot="{ message }">
          <Message severity="error" :text="message" class="col-span-2" />
        </ErrorMessage>

        <!-- button -->
        <div class="col-span-2">
          <Button
            label="Registrar"
            type="submit"
            class="w-full"
            :disabled="!meta.valid || !meta.dirty"
          />
        </div>
      </Form>
    </template>
  </Card>
</template>
