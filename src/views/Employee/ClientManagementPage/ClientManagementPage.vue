<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-client'
import type { FormValues as SchemaSearchClient } from '@/validation-schemas-forms/schema-search-client'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Button from 'primevue/button'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'
import { useConfirm } from 'primevue'
import ViewClientCard from './components/ViewClientCard.vue'
import { useDialog, useToast } from 'primevue'
import AddClientCard from './components/AddClientCard.vue'
import EditClientCard from './components/EditClientCard.vue'
//form
import type { FormValues as SchemaEditClient } from '@/validation-schemas-forms/schema-edit-client'
import type { FormValues as SchemaClientAdd } from '@/validation-schemas-forms/schema-add-client'
import { useClient } from '@/composables/useClient'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Headquarter } from '@/models/Headquarter'
import Select from 'primevue/select'
import { useHeadquarter } from '@/composables/useHeadquarter'
import { debounce } from 'lodash'
import type { ClientList } from '@/models/ClientList'

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
const { loading, error, createClient, updateClient, deleteClient, searchClient, getClientById } = useClient()

const { getAllHeadquarters } = useHeadquarter()

//clients
//refs
const clients = ref<ClientList[]>([])
const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

onMounted(async () => {
  loadClients()
})

//for search clients

const searchClientsDebounce = debounce(() => {
  loadClients()
})

//for load clients
const loadClients = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await searchClient(
    fieldMap.dni[0].value,
    fieldMap.names[0].value,
    fieldMap.lastnames[0].value,
    status.value,
    headquarterId.value,
    page,
    size,
  )
  clients.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements

  headquartersOptions.value = headquartersToOptionsSelect(await getAllHeadquarters())
}

const { errors, defineField } = useForm<SchemaSearchClient>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    names: '',
    lastnames: '',
    status: true,
    headquarterId: undefined,
  },
})

const fieldMap = {
  dni: defineField('dni'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
}

//aditionals fields
const [status, statusAttrs] = defineField('status')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')

//for dialog
const dialog = useDialog()

const viewClient = async (clientData: ClientList) => {
  dialog.open(ViewClientCard, {
    data: {
      clientData: await getClientById(clientData.id),
    },
    props: {
      modal: true,
      header: `${clientData.lastnames}, ${clientData.names}`,
    },
  })
}

const addClient = () => {
  dialog.open(AddClientCard, {
    props: {
      modal: true,
      header: 'Agregar cliente',
    },
    onClose: async (options) => {
      const data = options?.data as SchemaClientAdd
      if (data) {
        const client = await createClient(data)
        console.log('Datos recibidos', client)
        loadClients()
        showToast('Cliente agregado exitosamente: ' + client.names)
      }
    },
  })
}

const editClient = async (clientData: ClientList) => {
  const client = await getClientById(clientData.id)
  dialog.open(EditClientCard, {
    data: {
      clientData: {
        dni: client.dni,
        names: client.names,
        lastnames: client.lastnames,
        phone: client.phone,
        address: client.phone,
        birthdate: new Date(client.birthdate),
        headquarterId: client.headquarter.headquarterId,
      } as SchemaEditClient,
    },
    props: {
      modal: true,
      header: `${clientData.lastnames}, ${clientData.names}`,
    },
    onClose: async (options) => {
      const data = options?.data as SchemaEditClient
      if (data) {
        console.log(clientData)
        const client = await updateClient(clientData.id, data)
        console.log('Datos recibidos', client)
        loadClients()
        showToast('Cliente editado exitosamente: ' + client.names)
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup
const deleteClientAction = (event: MouseEvent | KeyboardEvent, client: ClientList) => {
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
      console.log('Eliminando Empleado ', client.id)
      await deleteClient(client.id)
      loadClients()
      showToast('Cliente eliminado exitosamente: ' + client.names)
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

const searchElementsClient: { title: string; key: keyof typeof fieldMap; icon: string }[] = [
  {
    title: 'DNI',
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
]

//for export

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}

//options
const statusOptions: OptionSelect[] = [
  {
    value: true,
    name: 'Activo',
  },
  {
    value: false,
    name: 'Desativado',
  },
]

const headquartersOptions = ref<OptionSelect[]>([])

const headquartersToOptionsSelect = (headquarters: Headquarter[]): OptionSelect[] => {
  return headquarters.map((headquarter) => ({
    value: headquarter.id,
    name: headquarter.name,
  }))
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de Clientes</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <!-- form -->
          <form class="form-search-grid-col-5">
            <div v-for="element in searchElementsClient" :key="element.key">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText
                  v-model="fieldMap[element.key][0].value"
                  v-bind="fieldMap[element.key][1]"
                  :invalid="Boolean(errors[element.key])"
                  class="w-full"
                  :placeholder="element.title"
                  @update:model-value="searchClientsDebounce()"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
              </Message>
            </div>

            <!-- headquarter -->
            <div>
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-bind="headquarterIdAttrs"
                v-model="headquarterId"
                :invalid="Boolean(errors.headquarterId)"
                :options="headquartersOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sede"
                showClear
                @update:model-value="searchClientsDebounce()"
              />
            </div>

            <!-- status -->

            <div>
              <label class="block mb-2">Estado</label>
              <Select
                class="w-full"
                v-bind="statusAttrs"
                v-model="status"
                :options="statusOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Estado"
                @update:model-value="searchClientsDebounce()"
              />

              <Message v-if="errors.status" severity="error" size="small" variant="simple">
                {{ errors.status }}
              </Message>
            </div>
          </form>
          <!-- for messague loading  -->
          <Message v-if="loading.getAllClients" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllClients" severity="error" size="small" variant="simple">
            Error al cargar los clientes
          </Message>
          <DataTable
            :value="clients"
            paginator
            :rows="rows"
            :totalRecords="totalRecords"
            :lazy="true"
            :first="first"
            :loading="loading.searchClient"
            @page="loadClients"
            :rows-per-page-options="[1, 2, 3, 4]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-user-plus"
                  iconPos="right"
                  severity="success"
                  label="Agregar Cliente"
                  @click="addClient"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column
              field="dni"
              sortable
              header="DNI"
              class="hidden lg:table-cell"
              style="width: 18%"
            ></Column>
            <Column field="names" sortable header="Nombres" style="width: 18%"></Column>
            <Column
              field="lastnames"
              class="hidden md:table-cell"
              header="Apellidos"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              class="hidden lg:table-cell"
              header="Sede"
              field="headquarterName"
              sortable
              style="width: 15%"
            >
            </Column>
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
                    @click="viewClient(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="editClient(data)"
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="deleteClientAction($event, data)"
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
