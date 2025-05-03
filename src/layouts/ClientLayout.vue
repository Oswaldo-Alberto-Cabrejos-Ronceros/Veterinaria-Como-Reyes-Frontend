<script setup lang="ts" >
import TheHeader from '@/components/TheHeader.vue'
import type { MenuItem } from 'primevue/menuitem'
import {  ref, } from 'vue'
import Menu from 'primevue/menu'
import { RouterLink} from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'


//for menuItems
const items = ref<MenuItem[]>([
  {
    label:'Inicio',
    icon:'pi pi-home',
    to:'/'
  },
  {
    label:'Citas',
    icon:'pi pi-clipboard',
    to:'/'
  }
])

const showMenu = ref(true);

const toggleMenu = ()=>{
  showMenu.value=!showMenu.value;
}


const asideRef = ref<HTMLElement | null>(null)
const menuWrapperRef = ref<HTMLElement | null>(null)

//for closes menu if do click outside menu
const handleClick = (event: MouseEvent) => {
  const target = event.target as Node;
  const clickedInsideHeader = document.querySelector('header')?.contains(target);
  if (
    showMenu.value &&
    window.innerWidth < 640 &&
    asideRef.value &&
    !menuWrapperRef.value?.contains(target)
    &&!clickedInsideHeader
  ) {
    showMenu.value = false
  }
}

//event for verify if show menu is true, if width screen < 640, close cmenu
const handleResize = ()=>{
  if(window.innerWidth<640 && showMenu.value){
    showMenu.value=false
  }
}

//for close menu if screen < 640 and click in item menu

const handleMenuItemClick=(navigate: ()=> void)=>{
  navigate();
  if(window.innerWidth<640){
    showMenu.value=false
  }
}

// add listener and verify if screen < 640
onMounted(() => {
  document.addEventListener('click', handleClick)
  window.addEventListener('resize',handleResize)
  if(window.innerWidth<640){
    showMenu.value=false
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
  window.removeEventListener('resize',handleResize)
})

</script>
<template>
  <div class="w-full min-h-screen flex flex-col">
    <TheHeader @toggle-menu="toggleMenu" />

    <main class="w-full flex-1 flex p-2 overflow-hidden">
      <aside
  ref="asideRef"
  :class="['transition-all duration-200 ease-out fixed sm:relative h-screen z-40 top-0 left-0 backdrop-blur-xs', showMenu ? ' w-screen sm:w-52 md:w-64' : 'w-0']"
  class="overflow-hidden"
>
  <div class="w-2/3 sm:w-auto " ref="menuWrapperRef">
    <Menu :model="items" class="h-screen sm:h-min">
      <template #item="{ item, props }">
        <router-link
          v-if="item.to"
          v-slot="{ navigate }"
          :to="item.to"
          custom
        >
          <a
            v-bind="props.action"
            @click="handleMenuItemClick(navigate)"
            class="flex align-items-center"
          >
            <span v-if="item.icon" :class="item.icon" class="mr-2"></span>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
  </div>
</aside>

      <section
        class="flex-1 h-auto px-0.5 xs:px-4 transition-all duration-200 ease-out"
      >
        <router-view />
      </section>
    </main>
  </div>
</template>

