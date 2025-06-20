<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-headquarter'
import type { FormValues as SearchHeadquarterSchema } from '@/validation-schemas-forms/schema-search-headquarter'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useConfirm, useDialog, useToast } from 'primevue'
import type { Headquarter } from '@/models/Headquarter'
import AddEditHeadquarterCard from './components/AddEditHeadquarterCard.vue'
import type { FormValues as AddEditHeadquarterSchema } from '@/validation-schemas-forms/schema-add-edit-headquarter'
import ViewHeadquaterCard from './components/ViewHeadquaterCard.vue'
import { useHeadquarter } from '@/composables/useHeadquarter'
import type { FormValues as HeadquarterAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-headquarter'

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

//get from compose
const { loading, error, getAllHeadquarters, createHeadquarter, updateHeadquarter,deleteHeadquarter } =
  useHeadquarter()

//headquarters
const headquarters = ref<Headquarter[]>([])

onMounted(() => {
  loadHeadquarters()
})

//for load headquartes

const loadHeadquarters = async () => {
  headquarters.value = await getAllHeadquarters()
}

//form
const { handleSubmit, errors, defineField } = useForm<SearchHeadquarterSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    address: '',
    province: '',
    district: '',
    phone: '',
    email: '',
  },
})

//fieldMap

const fieldMap = {
  name: defineField('name'),
  address: defineField('address'),
  phone: defineField('phone'),
  email: defineField('email'),
}

//for additionals

const [province, provinceAttrs] = defineField('province')
const [district, districtAttrs] = defineField('district')

//textfields
const textFields: { title: string; key: keyof typeof fieldMap; type: string; icon: string }[] = [
  {
    title: 'Name',
    key: 'name',
    type: 'text',
    icon: 'pi-info',
  },
  {
    title: 'Dirección',
    key: 'address',
    type: 'text',
    icon: 'pi-map-marker',
  },
  {
    title: 'Teléfono',
    key: 'phone',
    type: 'tel',
    icon: 'pi-mobile',
  },
  {
    title: 'Email',
    key: 'email',
    type: 'email',
    icon: 'pi-envelope',
  },
]

//for submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
})

const provinces = [
  { name: 'Ica', value: 'Ica' },
  { name: 'Chincha', value: 'Chincha' },
  { name: 'Pisco', value: 'Pisco' },
  { name: 'Nazca', value: 'Nazca' },
]

const districts = [
  { name: 'Ica', value: 'Ica' },
  { name: 'Parcona', value: 'Parcona' },
  { name: 'Chincha', value: 'Chincha' },
  { name: 'Pisco', value: 'Pisco' },
  { name: 'Nazca', value: 'Nazca' },
]

//for dialog
const dialog = useDialog()

//for add
const addHeadquarter = () => {
  dialog.open(AddEditHeadquarterCard, {
    props: {
      modal: true,
    },
    onClose: async (options) => {
      const data = options?.data as HeadquarterAddEditSchema
      if (data) {
        const headquarter = await createHeadquarter(data)
        console.log('Datos recibidos del dialogo', headquarter)
        loadHeadquarters()
        showToast('Sede agregada exitosamente: ' + headquarter.name)
      }
    },
  })
}

//for view
const viewHeadquarter = (headquarterData: Headquarter) => {
  dialog.open(ViewHeadquaterCard, {
    props: {
      modal: true,
    },
    data: {
      headquarterData: headquarterData,
    },
  })
}

//for edit

const editHeadquarter = (headquarterData: Headquarter) => {
  dialog.open(AddEditHeadquarterCard, {
    props: {
      modal: true,
    },
    data: {
      headquarterData: headquarterData as AddEditHeadquarterSchema,
    },
    onClose: async (options) => {
      const data = options?.data as HeadquarterAddEditSchema
      if (data) {
        const headquarter = await updateHeadquarter(headquarterData.id, data)
        console.log(headquarter)
        loadHeadquarters()
        showToast('Sede editada exitosamente: ' + headquarter.name)
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup

const deleteHeadquarterAction = (event: MouseEvent | KeyboardEvent, headquarter: Headquarter) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar esta sede?',
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
      console.log('Eliminando Sede ', headquarter.id)
      await deleteHeadquarter(headquarter.id)
      loadHeadquarters()
      showToast('Sede eliminada exitosamente: ' + headquarter.name)
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
        <h3 class="h3">Gestión de sedes</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <!-- province -->
            <div>
              <label class="block mb-2">Provincia</label>
              <Select
                class="w-full"
                v-bind="provinceAttrs"
                v-model="province"
                :options="provinces"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Provincia"
              />

              <Message v-if="errors.province" severity="error" size="small" variant="simple">
                {{ errors.province }}
              </Message>
            </div>

            <!-- district -->
            <div>
              <label class="block mb-2">Distrito</label>
              <Select
                class="w-full"
                v-bind="districtAttrs"
                v-model="district"
                :options="districts"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Distrito"
              />

              <Message v-if="errors.district" severity="error" size="small" variant="simple">
                {{ errors.district }}
              </Message>
            </div>
            <div v-for="element in textFields" :key="element.key">
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
                  :type="element.type"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
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

          <!-- for messague loading  -->
          <Message v-if="loading.getAllHeadquarters" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllHeadquarters" severity="error" size="small" variant="simple">
            Error al cargar los sedes
          </Message>

          <!-- table -->
          <DataTable
            :value="headquarters"
            paginator
            :rows="10"
            :rows-per-page-options="[5, 10]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Sede"
                  @click="addHeadquarter"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column field="address" sortable header="Dirección" style="width: 25%"></Column>
            <Column
              field="district"
              class="hidden lg:table-cell"
              sortable
              header="Distrito"
              style="width: 15%"
            ></Column>
            <Column
              field="phone"
              class="hidden md:table-cell"
              header="Teléfono"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="email"
              class="hidden lg:table-cell"
              header="Email"
              sortable
              style="width: 25%"
            ></Column>
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
                    @click="viewHeadquarter(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="editHeadquarter(data)"
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="deleteHeadquarterAction($event, data)"
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
