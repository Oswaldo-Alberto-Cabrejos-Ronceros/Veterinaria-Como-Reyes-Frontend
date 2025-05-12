<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import Roles from '@/assets/data/roles.json'
import type { Role } from '@/models/Role'
import { watch } from 'vue'
//for roles

const roles = [
  { name: 'Administrador', value: 0 },
  { name: 'Veterinario', value: 1 },
  { name: 'Recepcionista', value: 2 },
]

//roles information

const rolesInfo:Role[] = Roles;

const roleSelect = (ref<number>(1))

const description = ref<string>(rolesInfo[roleSelect.value].description)

const position = ref<string>(String(rolesInfo[roleSelect.value].position))

watch(roleSelect,(newValue)=>{
const selectedRole = rolesInfo[newValue]
if(selectedRole){
  description.value = selectedRole.description
  position.value= String(selectedRole.position)
}
})


onMounted(()=>{
  console.log(rolesInfo)
})

//for select role



</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de Roles y Permisos</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <div class="form-search-grid-col-5">

            <!-- specie -->
            <div>
              <label class="block mb-2">Role</label>
              <Select
                class="w-full"
                :options="roles"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Role"
                v-model="roleSelect"
              />
            </div>

            <!-- description -->
            <div>
              <label class="block mb-2">Descripción</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-info"></i>
                </InputGroupAddon>
                <InputText class="w-full" v-model="description" placeholder="Descripción" disabled />
              </InputGroup>
            </div>

            <!-- position -->


                        <div>
              <label class="block mb-2">Posición</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-sort-alt"></i>
                </InputGroupAddon>
                <InputText class="w-full" placeholder="Posición" v-model="position" disabled />
              </InputGroup>
            </div>

                        <div class="form-button-search-container-grid-col-5">
              <!-- button -->
              <Button
                label="Editar"
                type="submit"
                severity="info"
                icon="pi pi-pencil"
                iconPos="right"
                class="w-full"
              />
            </div>

          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
