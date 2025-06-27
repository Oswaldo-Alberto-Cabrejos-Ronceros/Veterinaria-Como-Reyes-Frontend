<script lang="ts" setup>
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import CardPetPrimary from '@/components/CardPetPrimary.vue'
import CardServicePrimary from '@/components/CardServicePrimary.vue'
import type { PetByClient } from '@/models/PetByClient';
defineProps<{
  petSelected?:PetByClient
  serviceSelected?:{
        serviceId: number
    serviceName: string
    serviceImageUrl: string
    specieName: string
    categoryName: string
    duration: string
    price: number
  }
  dateSelected?:string
  scheduleSelected?:string
}>()
</script>


<template>
           <!-- for resume -->

          <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="4">
            <div class="min-h-48">
              <p>Resumen</p>
              <div class="w-full grid gap-2 md:grid-cols-1 lg:grid-cols-2 my-4">
                <!-- pet -->
                <div>
                  <p class="block mb-2">Mascota</p>
                  <CardPetPrimary v-if="petSelected"
                    :petId="petSelected.id"
                    :petImageUrl="petSelected.urlImage"
                    :petName="petSelected.name"
                    :petSpecie="petSelected.specieName"
                    :petBreed="petSelected.breedName"
                    :petGender="petSelected.gender"
                    :birthdate="petSelected.birthdate"
                  ></CardPetPrimary>
                </div>
                <!-- Servicio -->
                <div>
                  <p class="block mb-2">Servicio</p>
                  <CardServicePrimary
                    v-if="serviceSelected"
                    :key="serviceSelected.serviceId"
                    :serviceId="serviceSelected.serviceId"
                    :serviceName="serviceSelected.serviceName"
                    :serviceImageUrl="serviceSelected.serviceImageUrl"
                    :specieName="serviceSelected.specieName"
                    :categoryName="serviceSelected.categoryName"
                    :duration="serviceSelected.duration"
                    :price="serviceSelected.price"
                  ></CardServicePrimary>
                </div>
              </div>
              <p>Horario</p>
              <div class="flex gap-2 my-4 items-center">
                <i class="pi pi-clock text-2xl"></i>
                <p>{{dateSelected}}</p>
                <i class="pi pi-calendar text-2xl"></i>
                <p>{{ scheduleSelected }}</p>
              </div>
              <p>Pago</p>
            </div>
            <div class="flex justify-between">
              <Button
                label="Atrás"
                severity="secondary"
                icon="pi pi-arrow-left"
                icon-pos="left"
                @click="activateCallback('3')"
              />

              <Button label="Agendar" security="success" />
            </div>
          </StepPanel>
</template>

