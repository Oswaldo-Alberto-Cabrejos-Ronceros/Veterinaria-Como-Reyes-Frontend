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
import { onMounted, ref } from 'vue'
import Select from 'primevue/select'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import AddEditBreedCard from './components/AddEditBreedCard.vue'
import { useDialog, useToast } from 'primevue'
import type { Breed } from '@/models/Breed'
import type { FormValues as AddEditBreedSchema } from '@/validation-schemas-forms/schema-add-edit-breed'
import { useConfirm } from 'primevue'
import { useBreed } from '@/composables/useBreed'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Specie } from '@/models/Specie'
import { useSpecie } from '@/composables/useSpecie'

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

const { loading, error, getAllBreeds, createBreed, updateBreed, deleteBreed } = useBreed()

const { getAllSpecies } = useSpecie()

const breeds = ref<Breed[]>([])

const speciesOptions = ref<OptionSelect[]>([])

onMounted(() => {
  loadBreeds()
})

//for load breeds

const loadBreeds = async () => {
  breeds.value = await getAllBreeds()
  speciesOptions.value = speciesToOptionsSelect(await getAllSpecies())
}

//for species to options Select

const speciesToOptionsSelect = (species: Specie[]): OptionSelect[] => {
  return species.map((specie) => ({
    value: specie.id,
    name: specie.name,
  }))
}

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

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for dialog
const dialog = useDialog()

const addBreed = () => {
  dialog.open(AddEditBreedCard, {
    props: {
      modal: true,
      header:'Agregar raza'
    },
    data: {
      speciesOptions: speciesOptions,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditBreedSchema
      if (data) {
        const breed = await createBreed(data)
        console.log('Datos recibidos', breed)
        loadBreeds()
        showToast('Raza agregada exitosamente: ' + breed.name)
      }
    },
  })
}

const editBreed = (breedData: Breed) => {
  dialog.open(AddEditBreedCard, {
    props: {
      modal: true,
      header:`${breedData.name}`
    },
    data: {
      breedData: {
        name: breedData.name,
        specieId: breedData.specie.id,
      } as AddEditBreedSchema,
      speciesOptions: speciesOptions,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditBreedSchema
      if (data) {
        const breed = await updateBreed(breedData.id, data)
        console.log('Datos recibidos', breed)
        loadBreeds()
        showToast('Raza editada exitosamente: ' + breed.name)
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup

const deleteBreedAction = (event: MouseEvent | KeyboardEvent, breedData: Breed) => {
  confirm.require({
    group:'confirmPopupGeneral',
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
    accept: async () => {
      console.log('Eliminando método ', breedData.id)
      await deleteBreed(breedData.id)
      loadBreeds()
      showToast('Raza eliminada exitosamente: ' + breedData.name)
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

//for activate
const { activateBreed } = useBreed()

const activateBreedAction = (event: MouseEvent | KeyboardEvent, breed: Breed) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere activar esta raza?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Activar',
      severity: 'success',
    },
    accept: async () => {
      await activateBreed(breed.id)
      loadBreeds()
      showToast('Raza activada exitosamente: ' + breed.name)
    },
    reject: () => {
      console.log('Cancelando activación')
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
                :options="speciesOptions"
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

          <!-- for messague loading  -->
          <Message v-if="loading.getAllBreeds" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllBreeds" severity="error" size="small" variant="simple">
            Error al cargar las categorias
          </Message>

          <!-- table -->
          <DataTable
            :value="breeds"
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
            <Column sortable header="Especie" style="width: 30%" class="hidden xs:table-cell">
              <template #body="{ data }">
                {{ data.specie.name }}
              </template>
            </Column>
            <Column>
              <template #body="{ data }">
                <div
                  class="flex justify-between items-center flex-row xs:flex-col lg:flex-row gap-1"
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
                    @click="editBreed(data)"
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="deleteBreedAction($event, data)"
                  ></Button>
                  <Button
                    icon="pi pi-power-off"
                    severity="success"
                    variant="outlined"
                    rounded
                    @click="activateBreedAction($event, data)"
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
