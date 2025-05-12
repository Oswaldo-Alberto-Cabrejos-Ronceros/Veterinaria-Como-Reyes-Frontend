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
import { useDialog } from 'primevue'
import AddEditRoleCard from './components/AddEditRoleCard.vue'
import type { FormValues as AddEditRoleSchema } from '@/validation-schemas-forms/schema-add-edit-roles'
//for roles

const roles = [
  { name: 'Administrador', value: 0 },
  { name: 'Veterinario', value: 1 },
  { name: 'Recepcionista', value: 2 },
]

//roles information

const rolesInfo: Role[] = Roles

const roleSelect = ref<number>(1)

const roleSelectInf = ref<Role>(rolesInfo[roleSelect.value])

const description = ref<string>(roleSelectInf.value.description)

const position = ref<string>(String(roleSelectInf.value.position))

watch(roleSelect, (newValue) => {
  roleSelectInf.value = rolesInfo[newValue]
  if (roleSelectInf.value) {
    description.value = roleSelectInf.value.description
    position.value = String(roleSelectInf.value.position)
  }
})

const dialog = useDialog()

const addRole = () => {
  dialog.open(AddEditRoleCard, {
    props: {
      modal: true,
    },
    onClose: (values) => {
      if (values) {
        console.log(values)
      }
    },
  })
}

//for edit
const editRole = (roleData:Role)=>{
  dialog.open(AddEditRoleCard,{
    props:{
      modal:true
    },
    data:{
      roleData: roleData as AddEditRoleSchema
    }
  })
}

onMounted(() => {
  console.log(rolesInfo)
})
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
                <InputText
                  class="w-full"
                  v-model="description"
                  placeholder="Descripción"
                  disabled
                />
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
                @click="editRole(roleSelectInf)"
              />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="form-search-grid-col-5">
        <div class="form-button-search-container-grid-col-5">
            <!-- button -->
              <Button
                label="Agregar Role"
                type="submit"
                severity="success"
                icon="pi pi-user-plus"
                iconPos="right"
                class="w-full"
                @click="addRole"
              />
        </div>

        </div>


      </template>
    </Card>
  </div>
</template>
