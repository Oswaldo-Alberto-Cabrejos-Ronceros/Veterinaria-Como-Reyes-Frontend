<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import type { MenuItem } from 'primevue/menuitem'
import { computed, ref, watch } from 'vue'
import Menu from 'primevue/menu'
import { RouterLink, useRoute } from 'vue-router'

//for now getting the role by router
const route = useRoute()
const role = ref(route.meta.role as string)

const roleMap: Record<string, number> = {
  MANAGER: 0,
  ADMINISTRATOR: 1,
  VETERINARY: 2,
  RECEPTIONIST: 3,
}

const items = ref<MenuItem[][]>([
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/',
    },
    {
      label: 'Empleados',
      icon: 'pi pi-users',
      to: '/',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/',
    },
    {
      label: 'Administradores',
      icon: 'pi pi-users',
      to: '/',
    },
    {
      label: 'Mascotas',
      icon: 'pi pi-github',
      to: '/',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/',
    },
    {
      label: 'Empleados',
      icon: 'pi pi-users',
      to: '/',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/',
    },
    {
      label: 'Mascotas',
      icon: 'pi pi-github',
      to: '/',
    },
  ],
])

watch(
  () => route.meta.role,
  (newRole) => {
    role.value = newRole as string
  },
)

const itemsRole = computed(() => items.value[roleMap[role.value]] ?? [])
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <TheHeader />
    <main class="w-full flex-1 flex p-2">
      <aside class="w-64">
        <Menu :model="itemsRole">
          <template #item="{ item, props }">
            <router-link v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
              <a
                :href="href"
                v-bind="props.action"
                @click="navigate"
                class="flex align-items-center"
              >
                <span v-if="item.icon" :class="item.icon" class="mr-2"></span>
                <span>{{ item.label }}</span>
              </a>
            </router-link>
          </template>
        </Menu>
      </aside>
      <section class="flex-1 h-auto p-4"><router-view /></section>
    </main>
  </div>
</template>
