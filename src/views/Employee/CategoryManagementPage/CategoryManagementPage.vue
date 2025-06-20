<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-category'
import type { FormValues as SearchCategorySchema } from '@/validation-schemas-forms/schema-search-category'
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
import AddEditCategoryCard from './components/AddEditCategoryCard.vue'
import { useDialog, useToast } from 'primevue'
import type { Category } from '@/models/Category'
import type { FormValues as AddEditCategorySchema } from '@/validation-schemas-forms/schema-add-edit-category'
import ViewCategoryCard from './components/ViewCategoryCard.vue'
import { useConfirm } from 'primevue'
import { useCategory } from '@/composables/useCategory'

//for toast
const toast = useToast()

const showToast = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Exito',
    detail: message,
    life: 3000,
  })
}

//methods

const { loading, error, getAllCategories, createCategory, updateCategory, deleteCategory } =
  useCategory()

//categories

const categories = ref<Category[]>([])

onMounted(async () => {
  loadCategories()
})

//load categories
const loadCategories = async () => {
  categories.value = await getAllCategories()
}

//form
const { handleSubmit, errors, defineField } = useForm<SearchCategorySchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
  },
})

const [name, nameAttrs] = defineField('name')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for add

//for dialog
const dialog = useDialog()

const addCategory = () => {
  dialog.open(AddEditCategoryCard, {
    props: {
      modal: true,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditCategorySchema
      if (data) {
        const category = await createCategory(data)
        console.log('Datos recibidos', category)
        loadCategories()
        showToast('Categoria agregada exitosamente: ' + category.name)
      }
    },
  })
}

//edit

const editCategory = (categoryData: Category) => {
  dialog.open(AddEditCategoryCard, {
    props: {
      modal: true,
    },
    data: {
      categoryData: categoryData as AddEditCategorySchema,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditCategorySchema
      const category = await updateCategory(categoryData.id, data)
      console.log('Datos recibidos', category)
      loadCategories()
      showToast('Categoria editada exitosamente: ' + category.name)
    },
  })
}

//for view

const viewCategory = (categoryData: Category) => {
  dialog.open(ViewCategoryCard, {
    props: {
      modal: true,
    },
    data: {
      categoryData: categoryData,
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup

const deleteCategoryAction = (event: MouseEvent | KeyboardEvent, category: Category) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar esta categoria?',
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
      console.log('Eliminando categoria ', category.id)
      await deleteCategory(category.id)
      loadCategories()
      showToast('Categoria eliminada exitosamente: ' + category.name)
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
        <h3 class="h3">Gestión de categorias</h3>
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
                <InputText v-model="name" v-bind="nameAttrs" class="w-full" placeholder="Nombre" />
              </InputGroup>
              <Message v-if="errors.name" severity="error" size="small" variant="simple">
                {{ errors.name }}
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
          <Message v-if="loading.getAllCategories" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllCategories" severity="error" size="small" variant="simple">
            Error al cargar las categorias
          </Message>
          <!-- table -->
          <DataTable
            :value="categories"
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
                  label="Agregar Categoria"
                  @click="addCategory"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>

            <Column field="name" sortable header="Nombre" style="width: 20%"></Column>
            <Column
              field="description"
              class="hidden md:table-cell"
              header="Descripción"
              sortable
              style="width: 60%"
            ></Column>
            <Column>
              <template #body="{ data }">
                <div class="flex justify-between items-center flex-col sm:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="viewCategory(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="editCategory(data)"
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="deleteCategoryAction($event, data)"
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
