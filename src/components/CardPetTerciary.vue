<script lang="ts" setup>
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
defineProps<{
  petId: number
  petName: string
  petBreed: string
  petImage: string
  petWeight: number
  petGender: string
  petBirtdate: string
  ownerName: string
  lastAppoinmentDate: string
  nextAppontmentDate: string
}>()
</script>
<template>
  <div class="card-primary flex w-full p-4 gap-3">
    <Avatar class="size-10" shape="circle" :label="petName.slice(0, 2)"> </Avatar>
    <div class="flex-1 flex flex-col gap-1 justify-center items-start">
      <p>{{ petName }}</p>
      <p class="text-neutral-500 text-sm">{{ petBreed }} - {{ ownerName }}</p>
      <div class="flex gap-1 items-center">
        <i class="pi pi-clock"></i>
        <p>Ultima visita: {{ lastAppoinmentDate }}</p>
        <i class="pi pi-calendar"></i>
        <p>Próxima: {{ nextAppontmentDate }}</p>
      </div>
      <div class="flex gap-1">
        <p class="font-semibold">Peso:</p>
        <p>{{ petWeight }} Kg</p>

        <p class="font-semibold">Sexo:</p>
        <p>{{ petGender }} Kg</p>
        <p class="font-semibold">Nacimiento:</p>
        <p>{{ petBirtdate }}</p>
      </div>
      <div class="w-full flex justify-end">
                <Button class="py-1.5"
          label="Ver completo"
          severity="info"
          size="small"
          icon-pos="left"
          icon="pi pi-eye"
        />
      </div>
    </div>
  </div>
</template>
