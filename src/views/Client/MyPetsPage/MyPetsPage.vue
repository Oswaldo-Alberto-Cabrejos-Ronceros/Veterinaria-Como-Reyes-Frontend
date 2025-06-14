<script lang="ts" setup>
import Card from 'primevue/card'
import CardPetSecondary from '@/components/CardPetSecondary.vue'
import Button from 'primevue/button'
import { useDialog } from 'primevue'
import AddMyPetCard from './components/AddMyPetCard.vue'
import { useSpecie } from '@/composables/useSpecie'
import { useBreed } from '@/composables/useBreed'
import type { Specie } from '@/models/Specie'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Breed } from '@/models/Breed'
import type { FormValues as AddMyPetSchema } from '@/validation-schemas-forms/schema-add-pet-client'

//methods
const { getAllSpecies } = useSpecie()

const { getAllBreeds } = useBreed()

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

//example for pets
const pets = [
  {
    petId: 1,
    petImageUrl: 'https://definicion.de/wp-content/uploads/2018/01/gato-1.jpg',
    petName: 'Luna',
    petDescription: 'Gata muy juguetona y amigable',
    petSpecie: 'Felino',
    petBreed: 'Siamesa',
    petGender: 'H',
    petWeight: 4.2,
    birthdate: '2020-04-15',
  },
  {
    petId: 2,
    petImageUrl: 'https://definicion.de/wp-content/uploads/2018/01/gato-1.jpg',
    petName: 'Max',
    petDescription: 'Perro leal, protector y energético',
    petSpecie: 'Canino',
    petBreed: 'Pastor Alemán',
    petGender: 'M',
    petWeight: 32.5,
    birthdate: '2019-08-23',
  },
  {
    petId: 3,
    petImageUrl: 'https://definicion.de/wp-content/uploads/2018/01/gato-1.jpg',
    petName: 'Kiwi',
    petDescription: 'Ave tranquila, ideal para interiores',
    petSpecie: 'Ave',
    petBreed: 'Periquito Australiano',
    petGender: 'H',
    petWeight: 0.09,
    birthdate: '2022-01-10',
  },
  {
    petId: 4,
    petImageUrl: 'https://definicion.de/wp-content/uploads/2018/01/gato-1.jpg',
    petName: 'Rocky',
    petDescription: 'Perro muy cariñoso, ideal para niños',
    petSpecie: 'Canino',
    petBreed: 'Labrador Retriever',
    petGender: 'M',
    petWeight: 28.0,
    birthdate: '2021-03-04',
  },
  {
    petId: 5,
    petImageUrl: 'https://definicion.de/wp-content/uploads/2018/01/gato-1.jpg',
    petName: 'Mía',
    petDescription: 'Gata tranquila, le gusta dormir en ventanas',
    petSpecie: 'Felino',
    petBreed: 'Persa',
    petGender: 'H',
    petWeight: 3.8,
    birthdate: '2020-11-12',
  },
]

//for dialog
const dialog = useDialog()

//for add
const addPet = async () => {
  dialog.open(AddMyPetCard, {
    props: {
      modal: true
    },
    data: {
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
      breedsOptions: breedsToOptionsSelect(await getAllBreeds()),
    },
    onClose: async (options) => {
      const data = options?.data as AddMyPetSchema
      if (data) {
        console.log(data)
      }
    },
  })
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <div class="w-full flex items-center justify-between">
          <h3 class="h3">Mis mascotas</h3>
          <Button
            severity="success"
            label="Agregar mascota"
            icon="pi pi-plus-circle"
            iconPos="right"
            @click="addPet()"
          />
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <RouterLink v-for="pet in pets" :key="pet.petId" :to="`/client/my-pets/${pet.petId}`">
            <CardPetSecondary
              :id="pet.petId"
              :image-url="pet.petImageUrl"
              :name="pet.petName"
              :description="pet.petDescription"
              :specie="pet.petSpecie"
              :breed="pet.petBreed"
              :gender="pet.petGender"
              :weight="pet.petWeight"
              :birthdate="pet.birthdate"
            ></CardPetSecondary>
          </RouterLink>
        </div>
      </template>
    </Card>
  </div>
</template>
