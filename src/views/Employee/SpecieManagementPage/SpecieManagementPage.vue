<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-specie'
import type { FormValues as SearchSpecieSchema } from '@/validation-schemas-forms/schema-search-specie'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { SpecieList } from '@/models/SpecieList'
import { useConfirm } from 'primevue'
import { useDialog, useToast } from 'primevue'
import AddEditSpecie from './components/AddEditSpecieCard.vue'
import type { FormValues as AddEditSpecieSchema } from '@/validation-schemas-forms/schema-add-edit-specie'
import { useSpecie } from '@/composables/useSpecie'
import type { DataTablePageEvent } from 'primevue/datatable'
import { debounce } from 'lodash'
import Tag from 'primevue/tag'

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

//for get species

const { loading, error, createSpecie, updateSpecie, activateSpecie, searchSpecies } = useSpecie()

const species = ref<SpecieList[]>([])

const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)

onMounted(() => {
  loadSpecies()
})

//for load species
const loadSpecies = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const response = await searchSpecies(page, size, name.value)
  species.value = response.content
  totalRecords.value = response.totalElements
}

//form
const { handleSubmit, errors, defineField } = useForm<SearchSpecieSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
  },
})

const [name, nameAttrs] = defineField('name')

const searchSpeciesDebounced = debounce(() => {
  loadSpecies()
}, 400)

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for export

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}

//for dialof

const dialog = useDialog()

const addSpecie = () => {
  dialog.open(AddEditSpecie, {
    props: {
      modal: true,
      header: 'Agregar especie',
    },
    onClose: async (options) => {
      const data = options?.data as AddEditSpecieSchema
      if (data) {
        const specie = await createSpecie(data)
        console.log('Datos recibidos del dialogo', specie)
        showToast('Especie agregada exitosamente: ' + data.name)
        loadSpecies()
      }
    },
  })
}

const editSpecie = (specieData: SpecieList) => {
  dialog.open(AddEditSpecie, {
    props: {
      modal: true,
      header: `${specieData.name}`,
    },
    data: {
      specieData: {
        name: specieData.name,
        imagePath: '',
      } as AddEditSpecieSchema,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditSpecieSchema
      if (data) {
        const specie = await updateSpecie(specieData.id, data)
        console.log('Datos recibidos del dialogo', specie)
        showToast('Especie editada exitosamente: ' + data.name)
        loadSpecies()
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

const deleteSpecie = (event: MouseEvent | KeyboardEvent, specieData: SpecieList) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar esta especie?',
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
      await activateSpecie(specieData.id)
      showToast('Especie eliminada exitosamente: ' + specieData.name)
      loadSpecies()
    },
    reject: () => {
      console.log('Acción cancelada')
    },
  })
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión especies</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <div>
              <label class="block mb-2">Nombre</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-info"></i>
                </InputGroupAddon>
                <InputText
                  v-model="name"
                  v-bind="nameAttrs"
                  :invalid="Boolean(errors.name)"
                  class="w-full"
                  placeholder="Nombre"
                  @update:model-value="searchSpeciesDebounced"
                />
              </InputGroup>
              <Message v-if="errors.name" severity="error" size="small" variant="simple">
                {{ errors.name }}
              </Message>
            </div>
          </form>

          <!-- for messague loading  -->
          <Message v-if="loading.searchSpecies" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.searchSpecies" severity="error" size="small" variant="simple">
            Error al cargar las species
          </Message>

          <!-- table -->
          <DataTable
            :value="species"
            paginator
            lazy
            :rows="rows"
            :first="first"
            :loading="loading.searchSpecies"
            :totalRecords="totalRecords"
            :rows-per-page-options="[5, 10, 20]"
            ref="dt"
            @page="loadSpecies"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Especie"
                  @click="addSpecie"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column field="name" sortable header="Nombre" style="width: 60%" />
            <Column field="status" header="Estado" style="width: 20%">
              <template #body="{ data }">
                <Tag
                  :value="data.status ? 'Activo' : 'Inactivo'"
                  :severity="data.status ? 'success' : 'danger'"
                />
              </template>
            </Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div class="flex items-center flex-col sm:flex-row gap-1">
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    size="small"
                    aria-label="Editar"
                    rounded
                    @click="editSpecie(data)"
                  ></Button>
                  <Button
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    size="small"
                    aria-label="Bloquear"
                    rounded
                    @click="deleteSpecie($event, data)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
