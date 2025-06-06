<script lang="ts" setup>
defineProps<{
  id: number
  imageUrl: string
  name: string
  description: string
  specie: string
  breed: string
  gender: string
  weight: number
  birthdate: string
}>()
</script>

<template>
  <CardPrimary>
    <div class="w-full flex justify-end">
      <Image :src="imageUrl" image-class="size-40 object-cover" :alt="name" />
      <div class="flex-1 flex flex-col gap-2 p-3">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">{{ name }}</h3>
          <p>{{ specie }}</p>
          >
          <p>{{ breed }}</p>
          <i
            :class="
              gender === 'H'
                ? 'pi pi-venus text-pink-500 text-xl'
                : 'pi pi-mars text-blue-600 text-xl'
            "
          ></i>
        </div>
        <div class="flex-1">
          {{ description }}
        </div>
        <div class="w-full flex gap-1 text-lg items-center">
          <div class="flex items-center gap-1">
            <i class="pi pi-calendar text-xl"></i>
            <p>{{ birthdate }}</p>
          </div>
          <div class="flex items-center gap-1">
            <p>{{ weight }}</p>
            <i class="pi pi-arrow-circle-down text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  </CardPrimary>
</template>
