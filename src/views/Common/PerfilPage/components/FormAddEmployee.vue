<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'

const props = defineProps<{
  employee: {
    firstName: string
    secondName: string
    lastName: string
    secondLastName: string
    cmvp: string
    dni: string
    phone: string
    address: string
    email: string
    role: string
  }
}>()
const emit = defineEmits(['submit'])

const firstName = ref('')
const secondName = ref('')
const lastName = ref('')
const secondLastName = ref('')
const cmvp = ref('')
const dni = ref('')
const phone = ref('')
const address = ref('')
const email = ref('')
const role = ref('')

onMounted(() => {
  firstName.value = props.employee.firstName
  secondName.value = props.employee.secondName
  lastName.value = props.employee.lastName
  secondLastName.value = props.employee.secondLastName
  cmvp.value = props.employee.cmvp
  dni.value = props.employee.dni
  phone.value = props.employee.phone
  address.value = props.employee.address
  email.value = props.employee.email
  role.value = props.employee.role
})

const roles = [
  { name: 'Administrador', value: 'general' },
  { name: 'Veterinario', value: 'veterinarian' },
  { name: 'Recepcionista', value: 'receptionist' },
]

function onSubmit() {
  emit ('submit',{
    firstName: firstName.value,
    secondName: secondName.value,
    lastName: lastName.value,
    secondLastName: secondLastName.value,
    cmvp: cmvp.value,
    dni: dni.value,
    phone: phone.value,
    address: address.value,
    email: email.value,
    role: role.value
  })
}
</script>

<template>
  <Card class="h-auto w-full sm:w-xl bg-transparent shadow-none">
    <template #title>
      <h3 class="h3 text-center">Agregar Empleado</h3>
    </template>

    <template #content>
      <form @submit.prevent="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mx-auto text-neutral-950 dark:text-surface-0">

        <!-- Nombres -->
        <div>
          <label>Nombres</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400"><i class="pi pi-user" /></InputGroupAddon>
            <InputText v-model="firstName" placeholder="Primer nombre" />
          </InputGroup>
        </div>

        <div>
          <label>&nbsp;</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400"><i class="pi pi-user" /></InputGroupAddon>
            <InputText v-model="secondName" placeholder="Segundo nombre" />
          </InputGroup>
        </div>

        <!-- Apellidos -->
        <div>
          <label>Apellidos</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400"><i class="pi pi-user" /></InputGroupAddon>
            <InputText v-model="lastName" placeholder="Primer apellido" />
          </InputGroup>
        </div>

        <div>
          <label>&nbsp;</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400"><i class="pi pi-user" /></InputGroupAddon>
            <InputText v-model="secondLastName" placeholder="Segundo apellido" />
          </InputGroup>
        </div>

        <!-- CMVP -->
        <div>
          <label>CMVP</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400"><i class="pi pi-id-card" /></InputGroupAddon>
            <InputText v-model="cmvp" placeholder="CMVP" />
          </InputGroup>
        </div>

        <!-- DNI -->
        <div>
          <label>DNI</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400"><i class="pi pi-id-card" /></InputGroupAddon>
            <InputText v-model="dni" placeholder="DNI" />
          </InputGroup>
        </div>

        <!-- Teléfono -->
        <div>
          <label>Teléfono</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400"><i class="pi pi-phone" /></InputGroupAddon>
            <InputText v-model="phone" placeholder="Teléfono" />
          </InputGroup>
        </div>

        <!-- Dirección -->
        <div>
          <label>Dirección</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400"><i class="pi pi-home" /></InputGroupAddon>
            <InputText v-model="address" placeholder="Dirección" />
          </InputGroup>
        </div>

        <!-- Email -->
        <div>
          <label>Email</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400"><i class="pi pi-envelope" /></InputGroupAddon>
            <InputText v-model="email" placeholder="Email" />
          </InputGroup>
        </div>

        <!-- Rol -->
        <div>
          <label>Rol</label>
          <Select
            v-model="role"
            :options="roles"
            optionLabel="name"
            optionValue="value"
            placeholder="Rol"
            class="w-full"
          />
        </div>

        <!-- Botón -->
        <div class="sm:col-span-2 text-center mt-4">
          <Button
            type="submit"
            label="Guardar"
            icon="pi pi-save"
            class="border-none"
            style="background-color: #00C950; color: white;"
          />
        </div>

      </form>
    </template>
  </Card>
</template>
