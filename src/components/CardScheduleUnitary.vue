<script lang="ts" setup>
defineProps<{
  time:string
  selected?:boolean
}>()
</script>

<template>
  <div v-ripple class="rounded-xl w-32 overflow-hidden h-min border border-neutral-200 dark:border-neutral-50 shadow bg-surface-0 dark:bg-slate-900 p-1.5 transition-all duration-200 hover:scale-103 hover:bg-surface-100 hover:dark:bg-slate-950 cursor-pointer"
  :class="selected?' bg-surface-100 hover:bg-surface-50 dark:bg-slate-950 hover:dark:bg-slate-900 border-primary-500 dark:border-primary-900':''">
      <div class="w-full text-center">
        <p>{{ time }}</p>
      </div>
  </div>


</template>


