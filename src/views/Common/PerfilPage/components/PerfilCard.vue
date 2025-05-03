<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Image from 'primevue/image'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import type { Client } from '@/models/Client'
import type { Employee } from '@/models/Employee'

const props = defineProps<{
  userData: Client | Employee
}>()

// Separar nombres y apellidos
const [firstName] = props.userData.names.split(' ')
const [firstLastName] = props.userData.lastnames.split(' ')

const elementsClient: { title: string; key: keyof Client; icon: string }[] = [
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
    icon: 'pi-phone',
  },
  {
    title: 'Sede',
    key: 'headquarterName',
    icon: 'pi-home',
  },
]

const elementsEmployee: { title: string; key: keyof Employee; icon: string }[] = [
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
    title: 'Dirección',
    key: 'address',
    icon: 'pi-home',
  },
  {
    title: 'Celular',
    key: 'phone',
    icon: 'pi-phone',
  },
  {
    title: 'Sede',
    key: 'headquarterName',
    icon: 'pi-home',
  },
  {
    title: 'Fecha Nacimiento',
    key: 'birthDate',
    icon: 'pi-calendar',
  },
]

//for check if userdata is client or employee
function isClient(user: Client | Employee): user is Client {
  return (user as Client).clientId !== undefined
}

const clientData = isClient(props.userData) ? props.userData : null

const employeeData = !isClient(props.userData) ? props.userData : null

const profileImageDefault:string="https://img.freepik.com/vector-gratis/circulo-azul-usuario-blanco_78370-4707.jpg?semt=ais_hybrid&w=740"
</script>

<template>
  <Card
    class="h-min min-w-full flex text-neutral-950 dark:text-surface-0 dark:bg-surface-800 px-4 py-4"
  >
    <template #header>
      <div class="flex gap-4 items-center w-full">
        <p class="text-2xl font-medium">Perfil</p>
        <p class="text-md text-gray-400">Role</p>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-6">
        <!-- images and ids -->
        <div class="flex flex-col xs:flex-row items-center gap-4 self-center">
          <div class="relative">
          <div class=" relative w-48 h-48 flex rounded-full overflow-hidden ">
              <Image
                :src="employeeData ? employeeData?.dirImage : profileImageDefault"
                alt="Profile photo"
                class=" w-full h-full object-cover z-10"
                preview
              />

            </div>
            <Button v-if="employeeData" icon="pi pi-camera" rounded aria-label="Foto" class="absolute bottom-2 right-2 z-20"  />
          </div>

            <div class="flex flex-col items-center mt-4">
              <h2 class="text-2xl font-bold">{{ firstName }} {{ firstLastName }}</h2>
              <div class="text-gray-600 mt-1">

                <p>DNI: {{ userData.dni }}</p>
                <p v-if="employeeData && employeeData.cmvp!=null">CMVP: {{ employeeData.cmvp }}</p>
              </div>
            </div>

        </div>

        <!-- Formulario -->
        <div class="flex-1 space-y-6">
          <!-- for Client -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="clientData">
            <div v-for="(element, id) in elementsClient" :key="id">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText :value="clientData[element.key]" disabled class="w-full" />
              </InputGroup>
            </div>
          </div>
          <!-- for Employee -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="employeeData">
            <div v-for="(element, id) in elementsEmployee" :key="id">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText :value="employeeData[element.key]" disabled class="w-full" />
              </InputGroup>
            </div>
          </div>
          <!-- Botón guardar/editar -->
          <div class="pt-4">
            <Button class="w-full" label="Editar" iconPos="right"  icon="pi pi-pencil"/>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
