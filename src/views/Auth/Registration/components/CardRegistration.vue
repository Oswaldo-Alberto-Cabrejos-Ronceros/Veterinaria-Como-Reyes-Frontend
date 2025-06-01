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
    names: '',
    lastnames: '',
    email: '',
    address: '',
    phone: '',
    birthdate:undefined,
    headquarter:undefined,
    password: '',
    confirmPassword: '',
    term: false,
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
const [names, namesAttrs] = defineField('names')
const [lastnames, lastnamesAttrs] = defineField('lastnames')
const [email, emailAttrs] = defineField('email')
const [address, addressAttrs] = defineField('address')
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [headquarter, headquarterAttrs] = defineField('headquarter')
const [phone, phoneAttrs] = defineField('phone')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const [term, termAttrs] = defineField('term')

//for emit register
const emit = defineEmits(['register'])

//for send
const onSubmit = handleSubmit((values) => {
  emit('register',values)
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
            v-bind="namesAttrs"
            v-model="names"
            type="text"
            placeholder="Nombres"

          />
        </InputGroup>

        <Message v-if="errors.names" severity="error" size="small" variant="simple">
          {{ errors.names }}
        </Message>

        <!-- last names -->
        <label>Apellidos</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            v-bind="lastnamesAttrs"
            v-model="lastnames"
            type="text"
            placeholder="Apellidos"

          />
        </InputGroup>

        <Message v-if="errors.lastnames" severity="error" size="small" variant="simple">
          {{ errors.lastnames }}
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
            v-bind="addressAttrs"
            v-model="address"
            type="text"
            placeholder="Dirección"

          />
        </InputGroup>

        <Message v-if="errors.address" severity="error" size="small" variant="simple">
          {{ errors.address }}
        </Message>

        <!-- cell phone -->
        <label>Celular</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-mobile"></i>
          </InputGroupAddon>
          <InputText
            v-bind="phoneAttrs"
            v-model="phone"
            type="tel"
            placeholder="Celular"

          />
        </InputGroup>

        <Message v-if="errors.phone" severity="error" size="small" variant="simple">
          {{ errors.phone }}
        </Message>

        <!-- birthDate -->
        <label>Fecha Nacimiento</label>

        <DatePicker v-bind="birthdateAttrs" v-model="birthdate" showIcon fluid iconDisplay="input" />
        <Message v-if="errors.birthdate" severity="error" size="small" variant="simple">
          {{ errors.birthdate }}
        </Message>

        <!--headquarker-->
        <label>Sede</label>
        <Select v-bind="headquarterAttrs" v-model="headquarter" :options="headquarkers" optionLabel="name" optionValue="value" placeholder="Selecciona headquarker"  />

        <Message v-if="errors.headquarter" severity="error" size="small" variant="simple">
          {{ errors.headquarter }}
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
            v-bind="confirmPasswordAttrs"
            v-model="confirmPassword"
            toggleMask
            placeholder="Confirmar contraseña"
          />
        </InputGroup>

        <Message v-if="errors.confirmPassword" severity="error" size="small" variant="simple">
          {{ errors.confirmPassword }}
        </Message>

        <!-- terms -->
        <div class="col-span-2 flex items-center gap-2">
          <Checkbox v-bind="termAttrs" v-model="term" binary inputId="term" />
          <label for="term">Acepto los términos y condiciones</label>
        </div>
        <Message v-if="errors.term" severity="error" size="small" variant="simple">
          {{ errors.term }}
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
