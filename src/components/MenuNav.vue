<script setup lang="ts">

import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import Menu from 'primevue/menu'
import { RouterLink } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'

//define props
const props = defineProps<{
  items:MenuItem[],
  showMenu:boolean
}>()

//emits
const emit = defineEmits<{
  (e: 'update:showMenu', value: boolean): void
}>()

const emitCloseMenu= ()=>{
  emit('update:showMenu',false)
}

const asideRef = ref<HTMLElement | null>(null)
const menuWrapperRef = ref<HTMLElement | null>(null)

//for closes menu if do click outside menu
const handleClick = (event: MouseEvent) => {
  const target = event.target as Node;
  const clickedInsideHeader = document.querySelector('header')?.contains(target);
  if (
    props.showMenu &&
    window.innerWidth < 640 &&
    asideRef.value &&
    !menuWrapperRef.value?.contains(target)
    &&!clickedInsideHeader
  ) {
    emitCloseMenu()
  }
}

//event for verify if show menu is true, if width screen < 640, close cmenu
const handleResize = ()=>{
  if(window.innerWidth<640 && props.showMenu){
    emitCloseMenu()
  }
}

//for close menu if screen < 640 and click in item menu

const handleMenuItemClick=(navigate: ()=> void)=>{
  navigate();
  if(window.innerWidth<640){
    emitCloseMenu()
  }
}

// add listener and verify if screen < 640
onMounted(() => {
  document.addEventListener('click', handleClick)
  window.addEventListener('resize',handleResize)
  if(window.innerWidth<640){
    emitCloseMenu()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
  window.removeEventListener('resize',handleResize)
})
</script>

<template>

<aside
  ref="asideRef"
  :class="['transition-all duration-200 ease-out fixed sm:relative h-screen sm:h-auto z-40 top-0 left-0 backdrop-blur-xs', showMenu ? ' w-screen sm:w-52 md:w-64' : 'w-0']"
  class="overflow-hidden"
>
  <div class="w-2/3 sm:w-auto " ref="menuWrapperRef">
    <Menu :model="props.items" class="h-screen sm:h-min dark:bg-slate-800">
      <template #item="{ item, props }">
        <router-link
          v-if="item.to"
          v-slot="{ navigate,isActive }"
          :to="item.to"
          custom
        >
          <a
            v-bind="props.action"
            @click="handleMenuItemClick(navigate)"
            :class="['flex align-items-center', isActive ? 'text-primary-600 bg-primary-100 dark:text-primary-300 dark:bg-slate-900':'']"
          >
            <span v-if="item.icon" :class="item.icon" class="mr-2"></span>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
  </div>
</aside>
</template>
