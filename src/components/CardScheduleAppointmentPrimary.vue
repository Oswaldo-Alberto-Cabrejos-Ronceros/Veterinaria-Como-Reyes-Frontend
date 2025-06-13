<script lang="ts" setup>
import Card from 'primevue/card'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import Step from 'primevue/step'
import StepPanels from 'primevue/steppanels'
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import CardPetPrimary from './CardPetPrimary.vue'
import CardServiceSecondary from './CardServiceSecondary.vue'
import Panel from 'primevue/panel'
import CardScheduleUnitary from './CardScheduleUnitary.vue'
import CardServicePrimary from './CardServicePrimary.vue'

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
  services?: {
    serviceId: number
    serviceName: string
    serviceImageUrl: string
    specieName: string
    categoryName: string
    duration: string
    price: number
  }[]
}>()
// schedule morning
const schedulesMorning: string[] = [
  '8:00 - 8:30',
  '8:45 - 9:15',
  '9:30 - 10:30',
  '10:45 - 11:15',
  '11:30 - 12:00',
]
// schedule afternoon
const schedulesAfternoon: string[] = [
  '12:15 - 12:45',
  '13:00 - 13:30',
  '13:45 - 14:15',
  '14:30 - 15:00',
  '15:15 - 15:45',
  '16:00 - 16:30',
]

// schedule night
const schedulesNight: string[] = [
  '16:45 - 17:15',
  '17:30 - 18:00',
  '18:15 - 18:45',
  '19:00 - 19:30',
  '19:45 - 20:15',
  '20:30 - 21:00',
  '21:15 - 21:45',
  '22:00 - 22:30',
]
</script>

<template>
  <Card class="card-principal-color-neutral">
    <template #title>
      <div class="textLg flex gap-2">
        <p>Agendar cita</p>
      </div>
    </template>
    <template #content>
      <Stepper value="1">
        <!-- options -->
        <StepList>
          <Step value="1"> Mascota </Step>
          <Step value="2"> Servicio </Step>
          <Step value="3"> Horario </Step>
          <Step value="4"> Resumen </Step>
        </StepList>
        <!-- panels -->
        <StepPanels>
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
          <!-- for service -->
          <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="2">
            <div class="min-h-48">
              <p>Servicio</p>
              <div class="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-4">
                <CardServiceSecondary
                  v-for="service in services"
                  :key="service.serviceId"
                  :serviceId="service.serviceId"
                  :serviceName="service.serviceName"
                  :serviceImageUrl="service.serviceImageUrl"
                  :specieName="service.specieName"
                  :categoryName="service.categoryName"
                  :duration="service.duration"
                  :price="service.price"
                ></CardServiceSecondary>
              </div>
            </div>
            <div class="flex justify-between">
              <Button
                label="Atrás"
                severity="secondary"
                icon="pi pi-arrow-left"
                icon-pos="left"
                @click="activateCallback('1')"
              />

              <Button
                label="Siguiente"
                icon="pi pi-arrow-right"
                icon-pos="right"
                @click="activateCallback('3')"
              />
            </div>
          </StepPanel>
          <!-- for schedule -->
          <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="3">
            <div class="min-h-48">
              <p>Escogue horario</p>
              <div class="w-full flex flex-col gap-2 my-4">
                <!-- for morning -->
                <Panel toggleable :collapsed="true">
                  <template #header>
                    <div class="flex gap-2 items-center">
                      <i class="pi pi-sun text-2xl text-yellow-500"></i>
                      <span>Mañana</span>
                    </div>
                  </template>
                  <template #icons>
                    <span>8h-13h</span>
                  </template>
                  <div
                    class="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 my-2"
                  >
                    <CardScheduleUnitary
                      v-for="(schedule, index) of schedulesMorning"
                      :key="index"
                      :time="schedule"
                    ></CardScheduleUnitary>
                  </div>
                </Panel>
                <!-- for afternoon -->
                <Panel toggleable :collapsed="true">
                  <template #header>
                    <div class="flex gap-2 items-center">
                      <i class="pi pi-cloud text-2xl text-orange-400"></i>
                      <span>Tarde</span>
                    </div>
                  </template>
                  <template #icons>
                    <span>13h-18h</span>
                  </template>
                  <div
                    class="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 my-2"
                  >
                    <CardScheduleUnitary
                      v-for="(schedule, index) of schedulesAfternoon"
                      :key="index"
                      :time="schedule"
                    ></CardScheduleUnitary>
                  </div>
                </Panel>

                <!-- night -->
                <Panel toggleable :collapsed="true">
                  <template #header>
                    <div class="flex gap-2 items-center">
                      <i class="pi pi-moon text-2xl text-sky-700"></i>
                      <span>Noche</span>
                    </div>
                  </template>
                  <template #icons>
                    <span>18h-22h</span>
                  </template>
                  <div
                    class="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 my-2"
                  >
                    <CardScheduleUnitary
                      v-for="(schedule, index) of schedulesNight"
                      :key="index"
                      :time="schedule"
                    ></CardScheduleUnitary>
                  </div>
                </Panel>
              </div>
            </div>
            <div class="flex justify-between">
              <Button
                label="Atrás"
                severity="secondary"
                icon="pi pi-arrow-left"
                icon-pos="left"
                @click="activateCallback('2')"
              />

              <Button
                label="Siguiente"
                icon="pi pi-arrow-right"
                icon-pos="right"
                @click="activateCallback('4')"
              />
            </div>
          </StepPanel>
          <!-- for resume -->

          <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="4">
            <div class="min-h-48">
              <p>Resumen</p>
              <div class="w-full grid gap-2 md:grid-cols-1 lg:grid-cols-2 my-4">
                <!-- pet -->
                <div>
                  <p class="block mb-2">Mascota</p>
                  <CardPetPrimary
                    :key="pets[0].petId"
                    :petId="pets[0].petId"
                    :petImageUrl="pets[0].petImageUrl"
                    :petName="pets[0].petName"
                    :petSpecie="pets[0].petSpecie"
                    :petBreed="pets[0].petBreed"
                    :petGender="pets[0].petGender"
                    :birthdate="pets[0].birthdate"
                  ></CardPetPrimary>
                </div>
                <!-- Servicio -->
                <div>
                  <p class="block mb-2">Servicio</p>
                  <CardServicePrimary
                    v-if="services"
                    :key="services[0].serviceId"
                    :serviceId="services[0].serviceId"
                    :serviceName="services[0].serviceName"
                    :serviceImageUrl="services[0].serviceImageUrl"
                    :specieName="services[0].specieName"
                    :categoryName="services[0].categoryName"
                    :duration="services[0].duration"
                    :price="services[0].price"
                  ></CardServicePrimary>
                </div>
              </div>
              <p>Horario</p>
              <div class="flex gap-2 my-4 items-center">
                <i class="pi pi-clock text-2xl"></i>
                <p>17 junio 2025</p>
                <i class="pi pi-calendar text-2xl"></i>
                <p>{{ schedulesAfternoon[0] }}</p>
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
        </StepPanels>
      </Stepper>
    </template>
  </Card>
</template>
