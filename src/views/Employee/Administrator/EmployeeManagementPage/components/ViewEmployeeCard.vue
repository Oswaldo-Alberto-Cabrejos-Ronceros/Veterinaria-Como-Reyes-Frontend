<script setup lang="ts">
import Card from 'primevue/card'
import type { Employee } from '@/models/Employee'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import { inject,onMounted } from 'vue'
import type { Ref } from 'vue'
import { ref } from 'vue'

//props for working with dynamicdialog
const dialogRef = inject('dialogRef') as Ref<{
  data: {
    employeeData:Employee
  }
}>

const employeeData=ref<Employee|null>(null)
const firstName=ref<string>('')
  const firstLastName=ref<string>('')

onMounted(()=>{
  employeeData.value = dialogRef.value.data.employeeData
    firstName.value = employeeData.value.names.split(' ')[0]
    firstLastName.value = employeeData.value.lastnames.split(' ')[0]
})

//separe name and lastnames



//for elements to see

const elements: { title: string; key: keyof Employee; icon: string }[] = [
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
    title: 'DNI',
    key: 'dni',
    icon: 'pi-id-card',
  },
  {
    title: 'CMVP',
    key: 'cmvp',
    icon: 'pi-id-card',
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
  {
    title: 'Rol',
    key: 'role',
    icon: 'pi-address-book',
  },
]
</script>

<template>
  <Card
    class="h-auto w-full sm:w-xl flex flex-col items-center justify-center bg-transparent shadow-none"
  >
    <template v-if="employeeData" #title>
      <div class="flex gap-1 justify-center items-center">
        <h3 v-if="employeeData.role === 'VETERINARIO'" class="h3">Dr.</h3>
        <h3 class="h3">{{ `${firstName} ${firstLastName}` }}</h3>
      </div>
    </template>
    <template v-if="employeeData" #content>
      <div class="flex-1 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(element, id) in elements" :key="id">
            <label class="block mb-2">{{ element.title }}</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi ${element.icon}`"></i>
              </InputGroupAddon>
              <InputText :value="employeeData[element.key]" disabled class="w-full" />
            </InputGroup>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
