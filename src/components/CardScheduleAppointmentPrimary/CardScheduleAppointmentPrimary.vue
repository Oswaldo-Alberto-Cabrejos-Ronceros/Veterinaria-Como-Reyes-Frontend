<script lang="ts" setup>
import Card from 'primevue/card'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import Step from 'primevue/step'
import StepPanels from 'primevue/steppanels'
import PetStep from './AppointmentSteps/PetStep.vue'
import ScheduleStep from './AppointmentSteps/ScheduleStep.vue'
import ServiceStep from './AppointmentSteps/ServiceStep.vue'
import ResumeStep from './AppointmentSteps/ResumeStep.vue'
import { onMounted, ref } from 'vue'
import StepItem from 'primevue/stepitem'

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

//for small screen
const isSmallScreen = ref<boolean>(false)

const checkSize = () => {
  isSmallScreen.value = window.innerWidth < 533
}

onMounted(() => {
  checkSize()
  window.addEventListener('resize', checkSize)
})
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
      <Stepper linear value="1" v-if="!isSmallScreen">
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
          <PetStep :pets="pets"></PetStep>
          <!-- for service -->
          <ServiceStep :services="services"></ServiceStep>
          <!-- for schedule -->
          <ScheduleStep
            :schedules-morning="schedulesMorning"
            :schedules-afternoon="schedulesAfternoon"
            :schedules-night="schedulesNight"
          ></ScheduleStep>
          <!-- for resume -->
          <ResumeStep
            v-if="services"
            :petSelected="pets[0]"
            :serviceSelected="services[0]"
            dateSelected="17 de junio del 2025"
            :scheduleSelected="schedulesAfternoon[0]"
          ></ResumeStep>
        </StepPanels>
      </Stepper>
      <Stepper v-if="isSmallScreen" value="1" linear>
        <!-- for pet -->
        <StepItem value="1">
          <Step value="1"> Mascota </Step>
          <!-- for pet -->
          <PetStep :pets="pets"></PetStep>
        </StepItem>
        <StepItem value="2">
          <Step value="2"> Servicio </Step>
          <!-- for service -->
          <ServiceStep :services="services"></ServiceStep>
        </StepItem>
        <StepItem value="3">
          <Step value="3"> Horario </Step>
          <!-- for schedule -->
          <ScheduleStep
            :schedules-morning="schedulesMorning"
            :schedules-afternoon="schedulesAfternoon"
            :schedules-night="schedulesNight"
          ></ScheduleStep>
        </StepItem>
        <StepItem value="4">
          <Step value="4"> Resumen </Step>
          <!-- for resume -->
          <ResumeStep
            v-if="services"
            :petSelected="pets[0]"
            :serviceSelected="services[0]"
            dateSelected="17 de junio del 2025"
            :scheduleSelected="schedulesAfternoon[0]"
          ></ResumeStep>
        </StepItem>
      </Stepper>
    </template>
  </Card>
</template>
