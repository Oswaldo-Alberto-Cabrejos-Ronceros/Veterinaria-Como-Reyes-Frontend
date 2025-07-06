<script lang="ts" setup>
import Card from 'primevue/card'
import CardAppointmentSecondary from '@/components/CardAppointmentSecondary.vue'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useAppointment } from '@/composables/useAppointment'
import type { InfoBasicAppointmentClient } from '@/models/InfoBasicAppointmentClient'
import { onMounted, ref } from 'vue'
import { useAuthentication } from '@/composables/useAuthentication'

//methods
const { getEntityId } = useAuthentication()

const {error,loading,getAppointmentsForClient } = useAppointment()

//for get info
const appointments = ref<InfoBasicAppointmentClient[]>([])

const loadAppointments = async () => {
  const clientId = getEntityId()
  if (clientId) {
    appointments.value = await getAppointmentsForClient(clientId)
  }
}

onMounted(()=>{
  loadAppointments()
})
//for router
const router = useRouter()

const redirectToScheduleAppointment = () => {
  router.push('/client/my-appointments/schedule-appointment')
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <div class="flex justify-between">
          <h3 class="h3">Mis citas</h3>
          <Button
            severity="success"
            label="Agendar cita"
            icon="pi pi-calendar"
            iconPos="right"
            @click="redirectToScheduleAppointment()"
          ></Button>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-6 mt-2">
                                          <!-- for messague loading  -->
                <Message
                  v-if="loading.getAppointmentsForClient"
                  severity="warn"
                  size="small"
                  variant="simple"
                >
                  Cargando ...
                </Message>
                <!-- for messague error -->
                <Message
                  v-if="error.getAppointmentsForClient"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  Error al cargar tus citas
                </Message>
          <CardAppointmentSecondary
            v-for="appointment in appointments"
            :key="appointment.id"
            :appointment-id="appointment.id"
            :appointment-status="appointment.status"
            :date="`${appointment.date} ${appointment.time}`"
            :pet-name="appointment.pet.name"
            :duration="appointment.duration"
            :service-name="appointment.service.name"
            :service-description="appointment.service.description"
          ></CardAppointmentSecondary>
        </div>
      </template>
    </Card>
  </div>
</template>
