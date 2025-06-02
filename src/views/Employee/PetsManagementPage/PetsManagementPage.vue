<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-pet'
import type { FormValues as SearchEmployeeSchema } from '@/validation-schemas-forms/schema-search-pet'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { useConfirm } from 'primevue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Pet } from '@/models/Pet'
import { onMounted, ref } from 'vue'
import { useDialog } from 'primevue'
import AddEditPetCard from './components/AddEditPetCard.vue'
import type { FormValues as AddEditPetSchema } from '@/validation-schemas-forms/schema-add-edit-pet'
import { useRouter } from 'vue-router'
import { usePet } from '@/composables/usePet'
import { useSpecie } from '@/composables/useSpecie'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Specie } from '@/models/Specie'
import type { Breed } from '@/models/Breed'
import { useBreed } from '@/composables/useBreed'

//methods

const { loading, error, getAllPets } = usePet()

const { getAllSpecies } = useSpecie()

const { getAllBreeds } = useBreed()

const speciesOptions = ref<OptionSelect[]>([])

const breedsOptions = ref<OptionSelect[]>([])

//pets
const pets = ref<Pet[]>([])
onMounted(async () => {
  loadPets()
})

//for load pets
const loadPets = async () => {
  pets.value = await getAllPets()
  speciesOptions.value = speciesToOptionsSelect(await getAllSpecies())
  breedsOptions.value = breedsToOptionsSelect(await getAllBreeds())
}

//for species to options Select

const speciesToOptionsSelect = (species: Specie[]): OptionSelect[] => {
  return species.map((specie) => ({
    value: specie.id,
    name: specie.name,
  }))
}

// for breeds to optionSelect

const breedsToOptionsSelect = (breeds: Breed[]): OptionSelect[] => {
  return breeds.map((breed) => ({
    value: breed.id,
    name: breed.name,
  }))
}

//form

const { handleSubmit, errors, defineField } = useForm<SearchEmployeeSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    ownerDni: '',
    specieId: undefined,
    breedId: undefined,
    gender: undefined,
  },
})

const textFields = {
  name: defineField('name'),
  ownerDni: defineField('ownerDni'),
}

//for selects field

const [specieId, specieIdAttrs] = defineField('specieId')
const [breedId, breedIdAttrs] = defineField('breedId')
const [gender, genderAttrs] = defineField('gender')

const searchTextElementsClient: { title: string; key: keyof typeof textFields; icon: string }[] = [
  {
    title: 'Nombre',
    key: 'name',
    icon: 'pi-info',
  },
  {
    title: 'Dueño',
    key: 'ownerDni',
    icon: 'pi-user',
  },
]

//genders
const genders = [
  { name: 'Macho', value: 'M' },
  { name: 'Hembra', value: 'H' },
]

//for submit

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for dialog
const dialog = useDialog()

//for add
const addPet = async () => {
  dialog.open(AddEditPetCard, {
    props: {
      modal: true,
    },
    data:{
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
      breedsOptions: breedsToOptionsSelect(await getAllBreeds()),
    },
    onClose: (data) => {
      if (data) {
        console.log('Datos recibidos del dialogo:', data)
      }
    },
  })
}

const router = useRouter()

//for view
const viewPet = (petData: Pet) => {
  router.push({ name: 'administrator-pets-unitary-pet', params: { id: petData.id } })
}

const editPet = async (petData: Pet) => {
  dialog.open(AddEditPetCard, {
    props: {
      modal: true,
    },
    data: {
      petData: {
        name: petData.name,
        gender: petData.gender,
        weight: petData.weight,
        birthdate: new Date(petData.birthdate),
        comment: petData.comment,
        specieId: petData.specie.id,
        breedId: petData.breed.id,
        urlImage: petData.urlImage,
        ownerDni: petData.clientId.toString(),
      } as AddEditPetSchema,
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
      breedsOptions: breedsToOptionsSelect(await getAllBreeds()),
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup
const deleteClient = (event: MouseEvent | KeyboardEvent, pet: Pet) => {
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
      console.log('Eliminando Empleado ', pet.id)
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
        <h3 class="h3">Gestión de mascotas</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <div v-for="element in searchTextElementsClient" :key="element.key">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText
                  v-model="textFields[element.key][0].value"
                  v-bind="textFields[element.key][1]"
                  class="w-full"
                  :placeholder="element.title"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
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
            <div>
              <label class="block mb-2">Raza</label>
              <Select
                class="w-full"
                v-bind="breedIdAttrs"
                v-model="breedId"
                :options="breedsOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Raza"
              />

              <Message v-if="errors.breedId" severity="error" size="small" variant="simple">
                {{ errors.breedId }}
              </Message>
            </div>
            <div>
              <label class="block mb-2">Sexo</label>
              <Select
                class="w-full"
                v-bind="genderAttrs"
                v-model="gender"
                :options="genders"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sexo"
              />

              <Message v-if="errors.gender" severity="error" size="small" variant="simple">
                {{ errors.gender }}
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
          <Message v-if="loading.getAllPets" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllPets" severity="error" size="small" variant="simple">
            Error al cargar las mascotas
          </Message>

          <!-- table -->
          <DataTable
            :value="pets"
            paginator
            :rows="10"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Mascota"
                  @click="addPet"
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
            <Column field="clientId" sortable header="Dueño" style="width: 18%"></Column>
            <Column class="hidden lg:table-cell" header="Especie" sortable style="width: 15%">
              <template #body="{ data }">
                {{ data.specie.name }}
              </template>
            </Column>
            <Column class="hidden lg:table-cell" header="Raza" sortable style="width: 15%">
              <template #body="{ data }">
                {{ data.breed.name }}
              </template>
            </Column>
            <Column
              field="gender"
              class="hidden md:table-cell"
              header="Sexo"
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
                    @click="viewPet(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="editPet(data)"
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="deleteClient($event, data)"
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
