<script lang="ts" setup>
defineProps<{
  time:string
}>()
</script>

<template>
  <div class="rounded-xl w-32 overflow-hidden h-min border border-neutral-200 dark:border-neutral-50 shadow transition-colors duration-50 bg-surface-0 dark:bg-transparent p-1.5">
      <div class="w-full text-center">
        <p>{{ time }}</p>
      </div>
  </div>


</template>


