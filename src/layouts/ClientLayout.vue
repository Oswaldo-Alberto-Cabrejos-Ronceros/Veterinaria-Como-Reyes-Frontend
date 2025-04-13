<script setup lang="ts" >
import TheHeader from '@/components/TheHeader.vue';
import type { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';
import Menu from 'primevue/menu';
import { RouterLink } from 'vue-router';

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

</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <TheHeader />
    <main class="w-full flex-1 flex p-2">
      <aside class="w-64"> <Menu :model="items">
          <template #item="{ item, props }">
            <router-link v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom >
              <a :href="href" v-bind="props.action" @click="navigate" class="flex align-items-center">
                <span v-if="item.icon" :class="item.icon" class="mr-2"></span>
                <span>{{ item.label }}</span>
              </a>
            </router-link>
          </template>
        </Menu>
      </aside>
      <section class="flex-1 h-auto p-4"> <router-view />
      </section>

    </main>

  </div>
</template>

