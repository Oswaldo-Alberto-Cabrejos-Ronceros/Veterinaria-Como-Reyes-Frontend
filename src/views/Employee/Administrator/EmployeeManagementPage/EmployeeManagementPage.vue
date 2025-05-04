<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-employee'
import type { FormValues } from '@/validation-schemas-forms/schema-search-employee'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Employees from '@/assets/data/employees.json'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Employee } from '@/models/Employee'
import { ref } from 'vue'
//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    cmvp: '',
    names: '',
    lastnames: '',
    rol: undefined,
  },
})

const fieldMap = {
  dni: defineField('dni'),
  cmvp: defineField('cmvp'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
}

const [rol, rolAttrs] = defineField('rol')

const searchElementsEmployee: { title: string; key: keyof typeof fieldMap; icon: string }[] = [
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
    title: 'Nombres',
    key: 'names',
    icon: 'pi-user',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
  },
]

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//roles
const roles = [
  { name: 'Veterinario', value: 1 },
  { name: 'Recepcionista', value: 2 },
  { name: 'Jefe de sede', value: 3 },
]

//for view
const viewEmployee = (employee: Employee) => {
  console.log('Ver', employee)
}

//for edit
const editEmployee = (employee: Employee) => {
  console.log('Editar', employee)
}

//for delete
const deleteEmployee = (employee: Employee) => {
  console.log('Eliminar', employee)
}

//for export

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de empleados</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="element in searchElementsEmployee" :key="element.key">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText
                  v-model="fieldMap[element.key][0].value"
                  v-bind="fieldMap[element.key][1]"
                  class="w-full"
                  :placeholder="element.title"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
              </Message>
            </div>
            <div>
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-bind="rolAttrs"
                v-model="rol"
                :options="roles"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Rol"
              />

              <Message v-if="errors.rol" severity="error" size="small" variant="simple">
                {{ errors.rol }}
              </Message>
            </div>
            <div class="flex items-end justify-center">
              <!-- button -->

              <Button
                label="Buscar"
                type="submit"
                severity="info"
                icon="pi pi-search"
                iconPos="right"
                class="w-full"
              />
            </div>
          </form>
          <!-- imporve design responsive -->
          <!-- table -->
          <DataTable
            :value="Employees"
            paginator
            :rows="10"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button icon="pi pi-user-plus" iconPos="right" severity="success" label="Agregar Empleado" @click="exportCSV" />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column field="names" sortable header="Nombres" class=" hidden lg:table-cell" style="width: 18%"></Column>
            <Column field="lastnames" sortable header="Apellidos" style="width: 18%"></Column>
            <Column field="dni" class=" hidden lg:table-cell" header="DNI" sortable style="width: 15%"></Column>
            <Column field="cmvp" class=" hidden lg:table-cell" header="CMVP" sortable style="width: 15%"></Column>
            <Column field="role" class=" hidden md:table-cell" header="Rol" sortable style="width: 15%"></Column>
            <Column >
              <template #body="{ data }">
                <div class="flex justify-between items-center flex-row lg:flex-col xl:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="viewEmployee(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="editEmployee(data)"
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="deleteEmployee(data)"
                  ></Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
