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
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Employee } from '@/models/Employee'
import { onMounted, ref } from 'vue'
import { useDialog } from 'primevue/usedialog'
import ViewEmployeeCard from './components/ViewEmployeeCard.vue'
import { useConfirm } from 'primevue'
import EditEmployeeCard from './components/EditEmployeeCard.vue'
import type { EditEmployee } from '@/models/EditEmployee'
import AddEmployeeCard from './components/AddEmployeeCard.vue'
import { useEmployee } from '@/composables/useEmployee'

//methotds

const { loading, error, getAllEmployees } = useEmployee()

//employees

const employees = ref<Employee[]>([])

onMounted(async () => {
  employees.value = await getAllEmployees()
})

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

const rolesMap: Record<string, number> = {
  Recepcionista: 1,
  Veterinario: 2,
  'Encargado Sede': 3,
  Administrador: 4,
}

//for dialog
const dialog = useDialog()

//for add
const addEmployee = () => {
  dialog.open(AddEmployeeCard, {
    props: {
      modal: true,
    },
    onClose: (data) => {
      if (data) {
        console.log('Datos recibidos del diálogo:', data)
      }
    },
  })
}

//for view
const viewEmployee = (employeeData: Employee) => {
  dialog.open(ViewEmployeeCard, {
    data: {
      employeeData: employeeData,
    },
    props: {
      modal: true,
    },
  })
}

//for edit
const editEmployee = (employeeData: Employee) => {
  dialog.open(EditEmployeeCard, {
    data: {
      employeeData: {
        dni: employeeData.dni,
        cmvp: employeeData.cmvp,
        names: employeeData.names,
        lastnames: employeeData.lastnames,
        address: employeeData.address,
        phone: employeeData.phone,
        headquarterId: employeeData.headquarter.headquarterId,
        birthdate: new Date(), // for now
        dirImage: employeeData.dirImage,
        roleId: rolesMap[employeeData.roles[0].name],
      } as EditEmployee,
    },
    props: {
      modal: true,
    },
    onClose: (data) => {
      if (data) {
        console.log('Datos recibidos del diálogo:', data)
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup
const deleteEmployee = (event: MouseEvent | KeyboardEvent, employee: Employee) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar a este empleado?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Eliminar',
      severity: 'danger',
    },
    accept: () => {
      console.log('Eliminando Empleado ', employee.employeeId)
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
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
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
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
            <div class="form-button-search-container-grid-col-5">
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
          <!-- for messague loading  -->
          <Message v-if="loading.getAllEmployees" severity="error" size="small" variant="simple">
            {{ loading.getAllEmployees }}
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllEmployees" severity="error" size="small" variant="simple">
            {{ error.getAllEmployees }}
          </Message>
          <!-- table -->
          <DataTable
            v-if="employees"
            :value="employees"
            paginator
            :rows="10"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-user-plus"
                  iconPos="right"
                  severity="success"
                  label="Agregar Empleado"
                  @click="addEmployee"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column
              field="names"
              sortable
              header="Nombres"
              class="hidden lg:table-cell"
              style="width: 18%"
            ></Column>
            <Column field="lastnames" sortable header="Apellidos" style="width: 18%"></Column>
            <Column
              field="dni"
              class="hidden lg:table-cell"
              header="DNI"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="cmvp"
              class="hidden lg:table-cell"
              header="CMVP"
              sortable
              style="width: 15%"
            ></Column>
            <Column class="hidden md:table-cell" header="Rol" sortable style="width: 15%">
              <template #body="{ data }">
                {{ data.roles[0].name }}
              </template></Column
            >
            <Column>
              <template #body="{ data }">
                <div
                  class="flex justify-between items-center flex-row lg:flex-col xl:flex-row gap-1"
                >
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
                    @click="deleteEmployee($event, data)"
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
