<script lang="ts" setup>
import CardPetSecondary from '@/components/CardPetSecondary.vue';
//example for pets
const pets = [
  {
    petId: 1,
    petImageUrl: "https://example.com/images/luna.jpg",
    petName: "Luna",
    petDescription: "Gata muy juguetona y amigable",
    petSpecie: "Felino",
    petBreed: "Siamesa",
    petGender: "H",
    petWeight: 4.2,
    birthdate: "2020-04-15"
  },
  {
    petId: 2,
    petImageUrl: "https://example.com/images/max.jpg",
    petName: "Max",
    petDescription: "Perro leal, protector y energético",
    petSpecie: "Canino",
    petBreed: "Pastor Alemán",
    petGender: "M",
    petWeight: 32.5,
    birthdate: "2019-08-23"
  },
  {
    petId: 3,
    petImageUrl: "https://example.com/images/kiwi.jpg",
    petName: "Kiwi",
    petDescription: "Ave tranquila, ideal para interiores",
    petSpecie: "Ave",
    petBreed: "Periquito Australiano",
    petGender: "H",
    petWeight: 0.09,
    birthdate: "2022-01-10"
  },
  {
    petId: 4,
    petImageUrl: "https://example.com/images/rocky.jpg",
    petName: "Rocky",
    petDescription: "Perro muy cariñoso, ideal para niños",
    petSpecie: "Canino",
    petBreed: "Labrador Retriever",
    petGender: "M",
    petWeight: 28.0,
    birthdate: "2021-03-04"
  },
  {
    petId: 5,
    petImageUrl: "https://example.com/images/mia.jpg",
    petName: "Mía",
    petDescription: "Gata tranquila, le gusta dormir en ventanas",
    petSpecie: "Felino",
    petBreed: "Persa",
    petGender: "H",
    petWeight: 3.8,
    birthdate: "2020-11-12"
  }
];
</script>

<template>
  <div class="layout-principal-flex">
<Card class="card-principal-color-neutral">
        <template #title>
        <h3 class="h3">Bienvenido</h3>
      </template>
         <template #content>
          <div class="flex flex-col gap-6">
            <CardPetSecondary v-for="pet in pets" :key="pet.petId" :id="pet.petId" :image-url="pet.petImageUrl"
            :name="pet.petName" :description="pet.petDescription" :specie="pet.petSpecie" :breed="pet.petBreed"
            :gender="pet.petGender" :weight="pet.petWeight" :birthdate="pet.birthdate"></CardPetSecondary>
          </div>
         </template>
</Card>
  </div>
</template>



