<script lang="ts" setup>
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import CardPetPrimary from '@/components/CardPetPrimary.vue'
defineProps<{
    pets: {
    petId: number
    petImageUrl: string
    petName: string
    petSpecie: string
    petBreed: string
    petGender: string
    birthdate: string
  }[]
}>()
</script>

<template>
  <!-- for pet -->
  <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="1">
    <div class="min-h-48">
      <p>Escoga la mascota</p>
      <div class="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-4">
        <CardPetPrimary
          v-for="pet in pets"
          :key="pet.petId"
          :petId="pet.petId"
          :petImageUrl="pet.petImageUrl"
          :petName="pet.petName"
          :petSpecie="pet.petSpecie"
          :petBreed="pet.petBreed"
          :petGender="pet.petGender"
          :birthdate="pet.birthdate"
        ></CardPetPrimary>
      </div>
    </div>
    <div class="flex justify-end">
      <Button
        label="Siguiente"
        icon="pi pi-arrow-right"
        icon-pos="right"
        @click="activateCallback('2')"
      />
    </div>
  </StepPanel>
</template>
