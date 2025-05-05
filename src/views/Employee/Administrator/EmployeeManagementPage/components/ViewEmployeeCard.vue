<script setup lang="ts">
import Card from 'primevue/card'
import type { Employee } from '@/models/Employee'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'

const props = defineProps<{
employeeData:Employee
}>()

//separe name and lastnames
const [firstName] = props.employeeData.names.split(' ')
const [firstLastName] = props.employeeData.lastnames.split(' ')

//for elements to see

const elements:{title:string, key: keyof Employee, icon:string}[]=[
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
    title:'DNI',
    key:'dni',
    icon:"pi-id-card"
  },
  {
    title:'CMVP',
    key:'cmvp',
    icon:"pi-id-card"
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
  }
]

</script>


<template>
<Card class="h-auto w-full sm:w-xl flex flex-col items-center justify-center bg-transparent shadow-none">
    <template #title>
        <div class="flex gap-1 justify-center items-center">
            <h3 v-if="employeeData.role==='VETERINARIO'" class="h3"> Dr.</h3>
            <h3 class="h3">{{`${firstName} ${firstLastName}` }}</h3>
        </div>
      <h3 class="h3 text-center">Editar Datos</h3>
    </template>
    <template #content>

    </template>
</Card>

</template>