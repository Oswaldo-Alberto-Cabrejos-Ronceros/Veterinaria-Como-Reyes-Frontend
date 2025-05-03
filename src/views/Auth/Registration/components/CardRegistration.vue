<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import { toTypedSchema } from '@vee-validate/yup'
import { schema } from '@/validation-schemas-forms/schema-register'
import type { FormValues } from '@/validation-schemas-forms/schema-register'
import { useForm } from 'vee-validate'
import LogoRose from '@/assets/images/logos/logo-rose.png'
import LogoWhite from '@/assets/images/logos/logo-white.png'
import Image from 'primevue/image'
import Message from 'primevue/message'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useThemeStore } from '@/stores/themeStore'
import { computed } from 'vue'


const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    nombres: '',
    apellidos: '',
    email: '',
    direccion: '',
    celular: '',
    fechaNac:undefined,
    sede:undefined,
    password: '',
    confirmarPassword: '',
    terminos: false,
  },
})


//headquarkers
const headquarkers = [
  { name: 'Ica', value: 1},
  { name: 'Parcona', value: 2 },
  { name: 'Tinguiña', value: 3 }
]

// binding

const [dni, dniAttrs] = defineField('dni')
const [nombres, nombresAttrs] = defineField('nombres')
const [apellidos, apellidosAttrs] = defineField('apellidos')
const [email, emailAttrs] = defineField('email')
const [direccion, direccionAttrs] = defineField('direccion')
const [fechaNac, fechaNacAttrs] = defineField('fechaNac')
const [sede, sedeAttrs] = defineField('sede')
const [celular, celularAttrs] = defineField('celular')
const [password, passwordAttrs] = defineField('password')
const [confirmarPassword, confirmarPasswordAttrs] = defineField('confirmarPassword')
const [terminos, terminosAttrs] = defineField('terminos')

//for send

const onSubmit = handleSubmit((values) => {
  console.log(values)
})


//for theme

const storeTheme = useThemeStore();
const imageLogo=computed(()=>(
  storeTheme.isDark? LogoWhite: LogoRose
))

</script>

<template>
  <Card
    class="h-auto w-[90%] sm:w-xl flex flex-col items-center justify-center dark:bg-surface-800"
  >
    <template #header>
      <Image :src="imageLogo" alt="Logo" width="220" />
    </template>
    <template #title><h3 class="h3 text-center">Registro</h3></template>
    <template #content>
      <form
        @submit.prevent="onSubmit"
        class="flex flex-col gap-4 w-full max-w-xl xs:min-w-96 sm:min-w-md text-neutral-950 dark:text-surface-0"
      >
        <!-- DNI -->
        <label>DNI</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-bind="dniAttrs" v-model="dni" type="text" placeholder="DNI"  />
        </InputGroup>

        <Message v-if="errors.dni" severity="error" size="small" variant="simple">
          {{ errors.dni }}
        </Message>

        <!-- names -->
        <label>Nombres</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            v-bind="nombresAttrs"
            v-model="nombres"
            type="text"
            placeholder="Nombres"

          />
        </InputGroup>

        <Message v-if="errors.nombres" severity="error" size="small" variant="simple">
          {{ errors.nombres }}
        </Message>

        <!-- last names -->
        <label>Apellidos</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            v-bind="apellidosAttrs"
            v-model="apellidos"
            type="text"
            placeholder="Apellidos"

          />
        </InputGroup>

        <Message v-if="errors.apellidos" severity="error" size="small" variant="simple">
          {{ errors.apellidos }}
        </Message>

        <!-- email -->
        <label>Email</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-envelope"></i>
          </InputGroupAddon>
          <InputText
            v-bind="emailAttrs"
            v-model="email"
            type="text"
            placeholder="Correo electrónico"

          />
        </InputGroup>

        <Message v-if="errors.email" severity="error" size="small" variant="simple">
          {{ errors.email }}
        </Message>

        <!-- address -->
        <label>Dirección</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-home"></i>
          </InputGroupAddon>
          <InputText
            v-bind="direccionAttrs"
            v-model="direccion"
            type="text"
            placeholder="Dirección"

          />
        </InputGroup>

        <Message v-if="errors.direccion" severity="error" size="small" variant="simple">
          {{ errors.direccion }}
        </Message>

        <!-- cell phone -->
        <label>Celular</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-mobile"></i>
          </InputGroupAddon>
          <InputText
            v-bind="celularAttrs"
            v-model="celular"
            type="tel"
            placeholder="Celular"

          />
        </InputGroup>

        <Message v-if="errors.celular" severity="error" size="small" variant="simple">
          {{ errors.celular }}
        </Message>

        <!-- birthDate -->
        <label>Fecha Nacimiento</label>

        <DatePicker v-bind="fechaNacAttrs" v-model="fechaNac" showIcon fluid iconDisplay="input" />
        <Message v-if="errors.fechaNac" severity="error" size="small" variant="simple">
          {{ errors.fechaNac }}
        </Message>

        <!--sede-->
        <label>Sede</label>
        <Select v-bind="sedeAttrs" v-model="sede" :options="headquarkers" optionLabel="name" optionValue="value" placeholder="Selecciona Sede"  />

        <Message v-if="errors.sede" severity="error" size="small" variant="simple">
          {{ errors.sede }}
        </Message>


        <!-- password -->
        <label>Contraseña</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password
            v-bind="passwordAttrs"
            v-model="password"
            toggleMask
            :feedback="false"
            placeholder="Contraseña"
          />
        </InputGroup>
        <Message v-if="errors.password" severity="error" size="small" variant="simple">
          {{ errors.password }}
        </Message>

        <!-- confirm password -->
        <label>Confirmar Contraseña</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password
            v-bind="confirmarPasswordAttrs"
            v-model="confirmarPassword"
            toggleMask
            placeholder="Confirmar contraseña"
          />
        </InputGroup>

        <Message v-if="errors.confirmarPassword" severity="error" size="small" variant="simple">
          {{ errors.confirmarPassword }}
        </Message>

        <!-- terms -->
        <div class="col-span-2 flex items-center gap-2">
          <Checkbox v-bind="terminosAttrs" v-model="terminos" binary inputId="terminos" />
          <label for="terminos">Acepto los términos y condiciones</label>
        </div>
        <Message v-if="errors.terminos" severity="error" size="small" variant="simple">
          {{ errors.terminos }}
        </Message>
        <!-- button -->

          <Button
            label="Registrar"
            type="submit"
            icon="pi pi-check-circle"
            iconPos="right"
          />
      </form>
    </template>
  </Card>
</template>
