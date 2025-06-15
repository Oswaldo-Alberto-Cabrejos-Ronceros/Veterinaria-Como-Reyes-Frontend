<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { onMounted, ref } from 'vue'
import type { Role } from '@/models/Role'
import { watch } from 'vue'
import { useDialog, useToast } from 'primevue'
import AddEditRoleCard from './components/AddEditRoleCard.vue'
import type { FormValues as AddEditRoleSchema } from '@/validation-schemas-forms/schema-add-edit-roles'
import ModulesPermissions from '@/assets/data/modules-permissions.json'
import ModulePermissionCard from './components/ModulePermissionCard.vue'
import { useRole } from '@/composables/useRole'
import type { OptionSelect } from '@/models/OptionSelect'

//toast
const toast = useToast()

const showToast = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Éxito',
    detail: message,
    life: 3000,
  })
}

//methods

const { loading, error, getAllRoles, createRole, updateRole } = useRole()

//for roles

const roles = ref<Role[]>([])

//options roles

const rolesOptions = ref<OptionSelect[]>([])

//roles information

const roleSelect = ref<number>(0)

const roleSelectInf = ref<Role | null>(null)

const description = ref<string>('')

const position = ref<string>('')

onMounted(() => loadRoles())

//load roles

const loadRoles = async () => {
  roles.value = await getAllRoles()
  rolesOptions.value = rolesToOptionsSelect(roles.value)
  //cargamos informacion para los ref de informacion del rol seleccionado
  if (roles.value.length > 0) {
    roleSelect.value = roles.value[0].id
    const firstRole = roles.value.find((role) => role.id === roleSelect.value)
    if (firstRole) {
      roleSelectInf.value = firstRole
      description.value = firstRole.description
      position.value = String(firstRole.position)
    }
  }
}

//for get options from roles

const rolesToOptionsSelect = (roles: Role[]): OptionSelect[] => {
  return roles.map((role) => ({
    value: role.id,
    name: role.name,
  }))
}

watch(roleSelect, (newValue) => {
  const selected = roles.value.find((role) => role.id === newValue)
  if (selected) {
    roleSelectInf.value = selected
    description.value = selected.description
    position.value = String(selected.position)
  }
})

const dialog = useDialog()

const addRole = () => {
  dialog.open(AddEditRoleCard, {
    props: {
      modal: true,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditRoleSchema
      if (data) {
        const role = await createRole(data)
        console.log('Datos recibidos', role)
        showToast('Rol agregado exitosamente: ' + data.name)
        loadRoles()
      }
    },
  })
}

//for edit
const editRole = (roleData: Role) => {
  dialog.open(AddEditRoleCard, {
    props: {
      modal: true,
    },
    data: {
      roleData: roleData as AddEditRoleSchema,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditRoleSchema
      if (data) {
        const role = await updateRole(roleData.id, data)
        console.log('Datos recibidos', role)
        showToast('Rol editado exitosamente: ' + data.name)
        loadRoles()
      }
    },
  })
}

const editPermissions = (permissions: { name: string; code: number }[]) => {
  console.log(permissions)
}
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
                :options="rolesOptions"
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
                v-if="roleSelectInf"
                @click="editRole(roleSelectInf)"
              />
            </div>
          </div>
          <!-- for cards -->

          <Message v-if="loading.getAllRoles" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllRoles" severity="error" size="small" variant="simple">
            Error al cargar los roles
          </Message>

          <div class="form-search-grid-col-5">
            <div v-for="modulePermission in ModulesPermissions" :key="modulePermission.name">
              <ModulePermissionCard
                :name="modulePermission.name"
                :permisions="modulePermission.permissions"
                :authorized-permissions="modulePermission.authorizedPermissions"
                @edit-permissions="editPermissions($event)"
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
