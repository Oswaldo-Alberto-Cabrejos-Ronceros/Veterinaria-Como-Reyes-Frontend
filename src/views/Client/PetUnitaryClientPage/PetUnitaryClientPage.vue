<script lang="ts" setup>
import type { Pet } from '@/models/Pet'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import Image from 'primevue/image'
import DatePicker from 'primevue/datepicker'
import CardAppointmentSecondary from '@/components/CardAppointmentSecondary.vue'

const props = defineProps<{
  petId: string
}>()

const petData = ref<Pet | null>(null)

onMounted(() => {
  petData.value = {
    id: 1,
    name: 'Nico',
    gender: 'M',
    weight: 8.2,
    birthdate: '2015-05-21',
    comment: `"Milo es un gato de raza mestiza con un pelaje suave y denso de color gris con reflejos plateados que le dan una apariencia elegante.
    Tiene ojos grandes y verdes que parecen escanear todo a su alrededor con curiosidad constante. Es un gato tranquilo, independiente y muy observador,
    aunque cuando entra en confianza se vuelve extremadamente cariñoso y ronroneador. Le encanta observar desde las ventanas, dormir en lugares soleados
    y jugar con juguetes que imitan plumas o ratones. Aunque es reservado al principio, crea lazos muy fuertes con quienes le brindan cariño y respeto. Se
    adapta bien a espacios pequeños y es ideal para departamentos, ya que no necesita salir al exterior para estar feliz. Milo está completamente vacunado,
    esterilizado y acostumbrado al arenero. `,
    urlImage: 'https://optimumpet.com.br/media/uploads/2023/05/anos-vive-gato-01.webp',
    specie: {
      id: 1,
      name: 'Gato',
    },
    breed: {
      id: 1,
      name: 'Persa',
    },
    clientId: 2,
  }
  console.log(props.petId)
})

//examples for appointments
const appointments = [
  {
    appointmentId: 101,
    appointmentStatus: 'Pendiente',
    date: '2025-06-05',
    duration: '45 min',
    serviceName: 'Baño Canino',
    serviceDescription: 'Baño completo con productos especiales para el cuidado del pelaje canino.',
  },
  {
    appointmentId: 102,
    appointmentStatus: 'Completado',
    date: '2025-06-01',
    duration: '30 min',
    serviceName: 'Consulta Veterinaria',
    serviceDescription:
      'Evaluación médica general para detectar enfermedades y controlar el estado de salud.',
  },
  {
    appointmentId: 103,
    appointmentStatus: 'Cancelado',
    date: '2025-05-29',
    duration: '15 min',
    serviceName: 'Vacunación Antirrábica',
    serviceDescription: 'Aplicación de vacuna antirrábica según el calendario nacional.',
  },
  {
    appointmentId: 104,
    appointmentStatus: 'En progreso',
    date: '2025-06-03',
    duration: '20 min',
    serviceName: 'Desparasitación Interna',
    serviceDescription: 'Tratamiento para eliminar parásitos intestinales en mascotas.',
  },
  {
    appointmentId: 105,
    appointmentStatus: 'Pendiente',
    date: '2025-06-06',
    duration: '10 min',
    serviceName: 'Corte de Uñas',
    serviceDescription: 'Recorte de uñas para evitar lesiones o molestias al caminar.',
  },
]
</script>
<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <div class="textLg flex gap-2">
          <h3 class="h3">{{ petData?.name }}</h3>
          <p>{{ petData?.specie.name }}</p>
          <p>{{ petData?.breed.name }}</p>
        </div>
      </template>
      <template #content>
        <div class="w-full flex flex-col gap-2">
          <!-- section 1 pet information -->
          <div class="flex gap-3 flex-col sm:flex-row">
            <!-- image -->
            <Image
              :src="petData?.urlImage"
              :alt="petData?.name"
              image-class=" sm:size-56 md:size-64 lg:size-72 xl:size-80 object-cover rounded"
              preview
            />
            <!-- content -->
            <div class="flex-1 flex sie flex-col gap-1 textLg">
              <div class="flex sie items-center justify-between">
                <p>Nacimiento: {{ petData?.birthdate }}</p>
                <i
                  :class="
                    petData?.gender === 'H'
                      ? 'pi pi-venus text-pink-500 text-xl'
                      : 'pi pi-mars text-blue-600 text-xl'
                  "
                ></i>
              </div>

              <p>Peso: {{ petData?.weight }} Kg</p>
              <p>Comentario:</p>
              <p class="textBase">{{ petData?.comment }}</p>
            </div>
          </div>
          <!-- section appointements -->
          <!-- title and select -->
          <div class="w-full flex justify-between items-center">
            <h3 class="h3">Mis citas</h3>
            <div>
              <!-- for month -->
              <DatePicker view="month" date-format="mm-yy"></DatePicker>
              <!-- for yerar -->
            </div>

          </div>
                      <div class="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
              <CardAppointmentSecondary
                v-for="appointment in appointments"
                :key="appointment.appointmentId"
                :appointment-id="appointment.appointmentId"
                :appointment-status="appointment.appointmentStatus"
                :date="appointment.date"
                :duration="appointment.duration"
                :service-name="appointment.serviceName"
                :service-description="appointment.serviceDescription"
              ></CardAppointmentSecondary>
            </div>
        </div>
      </template>
    </Card>
  </div>
</template>
