<script lang="ts" setup>
import Card from 'primevue/card'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import Step from 'primevue/step'
import StepPanels from 'primevue/steppanels'
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
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
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div class="h-48">
              <p>Mascota</p>
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
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div class="h-48">
              <p>Servicio</p>
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
          <StepPanel v-slot="{ activateCallback }" value="3">
            <div class="h-48">
              <p>Horario</p>
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

          <StepPanel v-slot="{ activateCallback }" value="4">
            <div class="h-48">
              <p>Resument</p>
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
