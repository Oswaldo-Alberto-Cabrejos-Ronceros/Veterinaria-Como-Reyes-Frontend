<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

const props = defineProps<{
  client: {
    firstName: string
    secondName: string
    lastName: string
    secondLastName: string
    dni: string
    phone: string
    address: string
    email: string
  }
}>()
const emit = defineEmits(['submit'])

const firstName = ref('')
const secondName = ref('')
const lastName = ref('')
const secondLastName = ref('')
const dni = ref('')
const phone = ref('')
const address = ref('')
const email = ref('')

onMounted(() => {
  firstName.value = props.client.firstName
  secondName.value = props.client.secondName
  lastName.value = props.client.lastName
  secondLastName.value = props.client.secondLastName
  dni.value = props.client.dni
  phone.value = props.client.phone
  address.value = props.client.address
  email.value = props.client.email
})

function onSubmit() {
  emit('submit', {
    firstName: firstName.value,
    secondName: secondName.value,
    lastName: lastName.value,
    secondLastName: secondLastName.value,
    dni: dni.value,
    phone: phone.value,
    address: address.value,
    email: email.value
  })
}
</script>

<template>
  <Card class="h-auto w-full sm:w-xl bg-transparent shadow-none">
    <template #title>
      <h3 class="h3 text-center">Cliente: Nombre Apellido</h3>
    </template>

    <template #content>
      <form @submit.prevent="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mx-auto">

        <div>
          <label>Primer Nombre</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-user" /></InputGroupAddon>
            <InputText v-model="firstName" placeholder="Primer nombre" />
          </InputGroup>
        </div>

        <div>
          <label>Segundo Nombre</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-user" /></InputGroupAddon>
            <InputText v-model="secondName" placeholder="Segundo nombre" />
          </InputGroup>
        </div>

        <div>
          <label>Primer Apellido</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-user" /></InputGroupAddon>
            <InputText v-model="lastName" placeholder="Primer apellido" />
          </InputGroup>
        </div>

        <div>
          <label>Segundo Apellido</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-user" /></InputGroupAddon>
            <InputText v-model="secondLastName" placeholder="Segundo apellido" />
          </InputGroup>
        </div>

        <div>
          <label>DNI</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-id-card" /></InputGroupAddon>
            <InputText v-model="dni" placeholder="DNI" />
          </InputGroup>
        </div>

        <div>
          <label>Teléfono</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-phone" /></InputGroupAddon>
            <InputText v-model="phone" placeholder="Teléfono" />
          </InputGroup>
        </div>

        <div>
          <label>Dirección</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-home" /></InputGroupAddon>
            <InputText v-model="address" placeholder="Dirección" />
          </InputGroup>
        </div>

        <div>
          <label>Email</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-envelope" /></InputGroupAddon>
            <InputText v-model="email" placeholder="Correo electrónico" />
          </InputGroup>
        </div>

        <!-- Botón Guardar -->
        <div class="sm:col-span-2 text-center mt-4">
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-md">Guardar</button>
        </div>

      </form>
    </template>
  </Card>
</template>
