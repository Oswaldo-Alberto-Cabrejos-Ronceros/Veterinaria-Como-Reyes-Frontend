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
import type { FormValues as EditEmployeeSchema } from '@/validation-schemas-forms/schema-edit.employee'
import type { FormValues as AddEmployeeSchema } from '@/validation-schemas-forms/schema-add-employee'
import { onMounted, ref } from 'vue'
import { useDialog } from 'primevue/usedialog'
import { useToast } from 'primevue'
import ViewEmployeeCard from './components/ViewEmployeeCard.vue'
import { useConfirm } from 'primevue'
import EditEmployeeCard from './components/EditEmployeeCard.vue'
import AddEmployeeCard from './components/AddEmployeeCard.vue'
import { useEmployee } from '@/composables/useEmployee'
import { useRole } from '@/composables/useRole'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Role } from '@/models/Role'
import { useHeadquarter } from '@/composables/useHeadquarter'
import type { Headquarter } from '@/models/Headquarter'
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

//methotds

const {
  loading,
  error,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  blockEmployee,
  searchEmployees,
} = useEmployee()

const { getAllRoles } = useRole()

const { getAllHeadquarters } = useHeadquarter()

//employees

const employees = ref<Employee[]>([])

const rolesOptions = ref<OptionSelect[]>([])

const headquartersOptions = ref<OptionSelect[]>([])

onMounted(async () => {
  loadEmployees()
})

const loadEmployees = async () => {
  employees.value = await getAllEmployees()
  rolesOptions.value = rolesToOptionsSelect(await getAllRoles())
  headquartersOptions.value = headquartersToOptionsSelect(await getAllHeadquarters())
}

//for get options from roles

const rolesToOptionsSelect = (roles: Role[]): OptionSelect[] => {
  return roles.map((role) => ({
    value: role.id,
    name: role.name,
  }))
}

//for get options from headquarters

const headquartersToOptionsSelect = (headquarters: Headquarter[]): OptionSelect[] => {
  return headquarters.map((headquarter) => ({
    value: headquarter.id,
    name: headquarter.name,
  }))
}

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    cmvp: '',
    names: '',
    lastnames: '',
    rol: undefined,
    headquarter: undefined,
  },
})

const fieldMap = {
  dni: defineField('dni'),
  cmvp: defineField('cmvp'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
}

const [rol, rolAttrs] = defineField('rol')
const [headquarter, headquarterAttrs] = defineField('headquarter')

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

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  const pageSearchEmployees = await searchEmployees(
    values.dni,
    values.names,
    values.lastnames,
    undefined,
    values.headquarter,
  )
  const employeesSearch = pageSearchEmployees.content
  employees.value = employeesSearch
})


//for dialog
const dialog = useDialog()

//for add
const addEmployee = async () => {
  dialog.open(AddEmployeeCard, {
    props: {
      modal: true,
      header:'Agregar empleado',
    },
    data: {
      headquartersOptions: headquartersToOptionsSelect(await getAllHeadquarters()),
      rolesOptions: rolesToOptionsSelect(await getAllRoles()),
    },
    onClose: async (options) => {
      const data = options?.data as AddEmployeeSchema
      if (data) {
        const employee = await createEmployee(data)
        console.log('Datos recibidos:', employee)
        loadEmployees()
        showToast('Empleado agregado exitosamente: ' + employee.names)
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
            header:`${employeeData.lastnames} ,${employeeData.names}`
    },
  })
}

//for edit
const editEmployee = async (employeeData: Employee) => {
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
        birthdate: new Date(employeeData.birthdate),
        dirImage: employeeData.dirImage,
        roleId: employeeData.roles[0].roleId,
      } as EditEmployeeSchema,
      headquartersOptions: headquartersToOptionsSelect(await getAllHeadquarters()),
      rolesOptions: rolesToOptionsSelect(await getAllRoles()),
    },
    props: {
      modal: true,
      header:`${employeeData.lastnames} , ${employeeData.names}`
    },
    onClose: async (options) => {
      const data = options?.data as EditEmployeeSchema
      if (data) {
        const employee = await updateEmployee(employeeData.employeeId, data)
        console.log('Datos recibidos:', employee)
        loadEmployees()
        showToast('Empleado editado exitosamente: ' + employee.names)
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup
const deleteEmployee = (event: MouseEvent | KeyboardEvent, employee: Employee) => {
  confirm.require({
    group: 'confirmPopupGeneral',
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
    accept: async () => {
      console.log('Eliminando Empleado ', employee.employeeId)
      await blockEmployee(employee.employeeId)
      showToast('Cliente eliminado exitosamente: ' + employee.names)
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
            <!-- rol -->
            <div>
              <label class="block mb-2">Rol</label>
              <Select
                class="w-full"
                v-bind="rolAttrs"
                v-model="rol"
                :options="rolesOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Rol"
              />

              <Message v-if="errors.rol" severity="error" size="small" variant="simple">
                {{ errors.rol }}
              </Message>
            </div>
            <!-- headquarter -->
            <div>
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-bind="headquarterAttrs"
                v-model="headquarter"
                :options="headquartersOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sede"
              />

              <Message v-if="errors.headquarter" severity="error" size="small" variant="simple">
                {{ errors.headquarter }}
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
          <Message v-if="loading.getAllEmployees" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllEmployees" severity="error" size="small" variant="simple">
            Error al cargar los empleados
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
