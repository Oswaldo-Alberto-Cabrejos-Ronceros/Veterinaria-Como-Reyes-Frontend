<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-breed'
import type { FormValues as SearchBreedSchema } from '@/validation-schemas-forms/schema-search-breed'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { ref } from 'vue'
import Select from 'primevue/select'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Breeds from '@/assets/data/breeds.json'
import AddEditBreedCard from './components/AddEditBreedCard.vue'
import { useDialog } from 'primevue'
import type { Breed } from '@/models/Breed'
import type { FormValues as AddEditBreedSchema } from '@/validation-schemas-forms/schema-add-edit-breed'
import { useConfirm } from 'primevue'
//form
const { handleSubmit, errors, defineField } = useForm<SearchBreedSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    specieId: undefined,
  },
})

const [name, nameAttrs] = defineField('name')
const [specieId, specieIdAttrs] = defineField('specieId')

const species = [
  { name: 'Perro', value: 1 },
  { name: 'Gato', value: 2 },
]

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for dialog
const dialog = useDialog()

const addBreed = ()=>{
  dialog.open(AddEditBreedCard,{
    props:{
      modal:true
    },
    onClose:(data)=>{
      if(data){
        console.log('Datps recibidos', data )
      }
    }
  })
}

const editPaymentMethod = (breedData:Breed)=>{
  dialog.open(AddEditBreedCard,{
    props:{
      modal:true
    },
    data:{
      breedData: {
        name:breedData.name,
        specieId:breedData.specie.id
      } as AddEditBreedSchema
    }
  })
}


//for confirm
const confirm = useConfirm()

//for delete with confirm popup

const deleteBreed = (event: MouseEvent | KeyboardEvent, breedData: Breed) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar esta raza?',
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
      console.log('Eliminando método ', breedData.id)
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
        <h3 class="h3">Gestión razas</h3>
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
            :value="Breeds"
            paginator
            :rows="10"
            :rows-per-page-options="[5, 10, 15, 20]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Raza"
                  @click="addBreed"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
                </div>
              </template>
                <Column field="name" sortable header="Nombre" style="width: 40%"></Column>
                <Column sortable header="Especie" style="width: 30%" class=" hidden xs:table-cell">
                <template #body="{data}">
                  {{ data.specie.name }}
                </template>
                </Column>
                <Column>
                  <template #body="{ data }">
                    <div class="flex justify-between items-center flex-row xs:flex-col lg:flex-row gap-1">
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
                        @click="editPaymentMethod(data)"
                      ></Button>
                      <Button
                        icon="pi pi-trash"
                        severity="danger"
                        variant="outlined"
                        aria-label="Filter"
                        rounded
                        @click="deleteBreed($event,data)"
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
