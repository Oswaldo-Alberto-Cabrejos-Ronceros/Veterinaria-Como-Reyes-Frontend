<script lang="ts" setup>
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
defineProps<{
  appointementId: number
  petName: string
  petBreed: string
  serviceName: string
  serviceDuration: string
  ownerName: string
  time: string
  status: string
}>()
</script>
<template>
  <div class="card-primary flex items-center w-full p-4">
    <div class="flex flex-col gap-1.5">
      <i class="pi pi-clock mr-4 text-lg"> </i>
      <p class="text-lg font-semibold">{{ time }}</p>
      <p class="text-neutral-500 text-sm">{{ serviceDuration }}</p>
    </div>
    <!-- info general -->
    <div class="flex-1 flex flex-col mx-4 gap-2">
      <!-- avatar , pet breed and owner name -->
      <div class="flex gap-2">
        <Avatar class="size-10" shape="circle" :label="petName.slice(0, 2)"></Avatar>
        <div class="flex flex-col gap-0.5">
          <h3 class="font-semibold text-lg">{{ petName }}</h3>
          <p class="text-neutral-500 text-sm">{{ petBreed }}</p>
        </div>
      </div>
      <!-- info -->
      <div class="flex gap-2">
        <i class="pi pi-user text-neutral-500"></i>
        <p class="">{{ ownerName }}</p>
      </div>
      <div class="flex gap-2">
        <Button
          label="Ver historial"
          severity="secondary"
          variant="outlined"
          icon-pos="left"
          icon="pi pi-eye"
          class="py-1.5"
        >
        </Button>
        <Button
          v-if="status === 'En curso'"
          label="Finalizar"
          severity="success"
          icon-pos="left"
          icon=" pi pi-check-circle"
          class="py-1.5"
        />
        <Button
          v-if="status === 'Confirmada'"
          label="Atender"
          severity="info"
          icon-pos="left"
          icon="pi pi-clipboard"
          class="py-1.5"
        />
      </div>
    </div>
    <Tag :value="status" severity="secondary"> </Tag>
  </div>
</template>
