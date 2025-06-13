<script lang="ts" setup>
import StepPanel from 'primevue/steppanel'
import Panel from 'primevue/panel'
import Button from 'primevue/button'
import CardScheduleUnitary from '@/components/CardScheduleUnitary.vue'
defineProps<{
  schedulesMorning?:string[],
  schedulesAfternoon?:string[],
  schedulesNight?:string[]
}>()
</script>

<template>
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
</template>
