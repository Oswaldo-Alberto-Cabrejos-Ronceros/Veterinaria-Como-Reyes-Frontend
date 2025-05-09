<script setup lang="ts">
import { ref, onMounted,inject } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import type { Ref } from 'vue'
import type { Client } from '@/models/Client'



//props for working with dynamicdialog
const dialogRef = inject('dialogRef') as Ref<{
  data: {
    clientData:Client
  }
}>


const clientData=ref<Client|null>(null)
const firstName=ref<string>('')
  const firstLastName=ref<string>('')




onMounted(() => {
 clientData.value= dialogRef.value.data.clientData
 firstName.value = clientData.value.names.split(' ')[0]
 firstLastName.value = clientData.value.lastnames.split(' ')[0]
})

//for elements to see

const elements: { title: string; key: keyof Client; icon: string }[] = [
  {
    title: 'Dni',
    key: 'dni',
    icon: 'pi-id-card',
  },
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
    icon: 'pi-mobile',
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
    key: 'birthdate',
    icon: 'pi-calendar',
  },
  {
    title: 'Email',
    key: 'email',
    icon: 'pi-envelope',
  },
]
</script>

<template>
  <Card class="h-auto w-full sm:w-xl bg-transparent shadow-none">
    <template #title>
      <h3 class="h3 text-center">Cliente: {{`${firstName} ${firstLastName}`}}</h3>
    </template>

    <template v-if="clientData" #content>
      <div class="flex-1 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(element, id) in elements" :key="id">
            <label class="block mb-2">{{ element.title }}</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi ${element.icon}`"></i>
              </InputGroupAddon>
              <InputText :value="clientData[element.key]" disabled class="w-full" />
            </InputGroup>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
