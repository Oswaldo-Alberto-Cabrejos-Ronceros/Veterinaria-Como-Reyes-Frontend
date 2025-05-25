<script setup lang="ts">
import Card from 'primevue/card'
import type { Employee } from '@/models/Employee'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import { inject, onMounted } from 'vue'
import type { Ref } from 'vue'
import { ref } from 'vue'

//props for working with dynamicdialog
const dialogRef = inject('dialogRef') as Ref<{
  data: {
    employeeData: Employee
  }
}>

const employeeData = ref<Employee | null>(null)
const firstName = ref<string>('')
const firstLastName = ref<string>('')

onMounted(() => {
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
    title: 'Fecha Nacimiento',
    key: 'birthdate',
    icon: 'pi-calendar',
  }
]
</script>

<template>
  <Card class="card-dialog-form-layout">
    <template v-if="employeeData" #title>
      <div class="flex gap-1 justify-center items-center">
        <h3 v-if="employeeData.roles[0].name === 'Veterinario'" class="h3">Dr.</h3>
        <h3 class="h3">{{ `${firstName} ${firstLastName}` }}</h3>
      </div>
    </template>
    <template v-if="employeeData" #content>
      <div class="flex-1 space-y-6">
        <div class="form-dialog-layout">
          <div v-for="(element, id) in elements" :key="id">
            <label class="block mb-2">{{ element.title }}</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi ${element.icon}`"></i>
              </InputGroupAddon>
              <InputText :value="employeeData[element.key]" disabled class="w-full" />
            </InputGroup>
          </div>
          <!-- headquarter -->
          <div>
            <label class="block mb-2">Sede</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi pi-address-book`"></i>
              </InputGroupAddon>
              <InputText :value="employeeData.headquarter.name" disabled class="w-full" />
            </InputGroup>
          </div>

          <!-- role -->

                    <div>
            <label class="block mb-2">Role</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi pi-home`"></i>
              </InputGroupAddon>
              <InputText :value="employeeData.roles[0].name" disabled class="w-full" />
            </InputGroup>
          </div>

        </div>
      </div>
    </template>
  </Card>
</template>
