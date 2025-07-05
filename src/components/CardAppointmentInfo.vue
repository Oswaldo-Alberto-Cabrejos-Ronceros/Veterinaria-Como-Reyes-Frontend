<script lang="ts" setup>
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  time: string
  serviceDuration: number
  serviceName: string
  veterinaryName: string
  comentario?: string
}>()

const itemsInfo = ref<{ title: string; icon: string; content: string }[]>([
  {
    title: 'Hora',
    icon: 'pi pi-clock',
    content: '',
  },
  {
    title: 'Servicio',
    icon: ' pi pi-calendar-plus',
    content: '',
  },
  {
    title: 'Veterinario',
    icon: ' pi pi-user',
    content: '',
  },
])

onMounted(() => {
  itemsInfo.value[0].content = `${props.time} (${props.serviceDuration} min)`
  itemsInfo.value[1].content = props.serviceName
  itemsInfo.value[2].content = `Dr. ${props.veterinaryName}`
})
</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-calendar"></i>
        <p>Información de la cita</p>
      </div>
    </template>
    <template #content>
      <div class="w-full grid grid-cols-3 gap-4">
        <div v-for="(item, index) in itemsInfo" :key="index" class="w-full flex gap-4">
          <i :class="`${item.icon} self-center`"></i>
          <div class="flex-1">
            <p>{{ item.title }}</p>
            <p class="text-neutral-500">{{ item.content }}</p>
          </div>
        </div>
      </div>
      <div
        class=" mt-4 p-4 shadow-none border-1 rounded-sm border-blue-500 bg-blue-50 dark:bg-transparent text-blue-600 dark:text-blue-400 w-full flex flex-col"
      >
        <p>Comentario:</p>
        <p v-if="comentario">{{ comentario }}</p>
        <p v-else>No hay comentario</p>
      </div>
    </template>
  </Card>
</template>
