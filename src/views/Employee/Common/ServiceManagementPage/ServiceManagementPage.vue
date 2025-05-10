<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-service'
import type { FormValues as SearchServiceSchema } from '@/validation-schemas-forms/schema-search-service'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Services from '@/assets/data/services.json'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Service } from '@/models/Service'
import { useConfirm, useDialog } from 'primevue'
import { ref } from 'vue'
import AddEditServiceCard from './components/AddEditServiceCard.vue'
import type { FormValues as AddEditServiceSchema } from '@/validation-schemas-forms/schema-add-edit-service'

//form
const { handleSubmit, errors, defineField } = useForm<SearchServiceSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    specieId: undefined,
    categoryId: undefined,
  },
})

//fields
const [name, nameAttrs] = defineField('name')
const [specieId, specieIdAttrs] = defineField('specieId')
const [categoryId, categoryIdAttrs] = defineField('categoryId')

//for submit

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for specie
const species = [
  { name: 'Perro', value: 1 },
  { name: 'Gato', value: 2 },
]

//for category

const categories = [
  { name: 'Cuidado', value: 1 },
  { name: 'Médico', value: 1 },
]

//for dialog
const dialog = useDialog()

//for add

const addService = ()=>{
  dialog.open(AddEditServiceCard,{
    props:{
      modal:true
    },
    onClose:(data)=>{
      if(data){
        console.log('Datos recibidos del dialogo', data)
      }
    }
  })
}

//for edit

const editService = (serviceData:Service)=>{
  dialog.open(AddEditServiceCard,{
    props:{
      modal:true
    },
    data:{
      serviceData:{
        name:serviceData.name,
        description:serviceData.description,
        price:serviceData.price,
        duration:new Date (),
        dirImage:serviceData.dirImage,
        specieId:serviceData.specieId,
        categoryId:serviceData.categoryId
      } as AddEditServiceSchema
    }
  })
}



//for confirm
const confirm = useConfirm()

//for delete with confirm popup
const deleteEmployee = (event: MouseEvent | KeyboardEvent, service: Service) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar este servicio?',
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
      console.log('Eliminando Empleado ', service.id)
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
        <h3 class="h3">Gestión de servicios</h3>
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
            <!-- specie -->
            <div>
              <label class="block mb-2">Especie</label>
              <Select
                class="w-full"
                v-bind="specieIdAttrs"
                v-model="specieId"
                :options="species"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Especie"
              />

              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
              </Message>
            </div>
            <!-- category -->
            <div>
              <label class="block mb-2">Categoria</label>
              <Select
                class="w-full"
                v-bind="categoryIdAttrs"
                v-model="categoryId"
                :options="categories"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Categoria"
              />
              <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
                {{ errors.specieId }}
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
          <!-- table -->
          <DataTable
            :value="Services"
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
                  label="Agregar Servicio"
                  @click="addService"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column
              field="name"
              sortable
              header="Nombre"
              class="hidden lg:table-cell"
              style="width: 18%"
            ></Column>
            <Column field="category" sortable header="Categoria" style="width: 18%"></Column>
            <Column
              field="description"
              class="hidden lg:table-cell"
              header="Descripción"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="price"
              class="hidden lg:table-cell"
              header="Precio"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="specie"
              class="hidden md:table-cell"
              header="Especie"
              sortable
              style="width: 15%"
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
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="editService(data)"
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
