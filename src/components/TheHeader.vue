<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { RouterLink } from 'vue-router'
import Image from 'primevue/image'
import LogoWhite from '@/assets/images/logos/logo-white.png'
import Button from 'primevue/button'
import { useThemeStore } from '@/stores/themeStore'
import { computed } from 'vue'
import { ref } from 'vue'
import Popover from 'primevue/popover'
import { useAuthentication } from '@/composables/useAuthentication'
import { useConfirm } from 'primevue'

defineProps<{
  role:string
}>()

const routeMap: Record<string, string> = {
  ADMINISTRADOR: '/employee/administrator',
  ENCARGADOSEDE: '/employee/maneger',
  VETERINARIO: '/employee/veterinary',
  RECEPCIONISTA: '/employee/receptionist',
  CLIENTE:'/client'
}

const themeStore = useThemeStore()

const iconTheme = computed(() => (themeStore.isDark ? 'pi-moon' : 'pi-sun'))

const emit = defineEmits(['toggle-menu'])
const emitToggleMenu = () => {
  emit('toggle-menu')
}

//for popover
const op = ref()

const toggle = (event: MouseEvent | KeyboardEvent) => {
  op.value.toggle(event)
}

//for session out

const { logoutUser } = useAuthentication()

//for confirm dialog logout
const confirm = useConfirm()

const confirmLogout = async () => {
  op.value.hide()
  confirm.require({
    group: 'confirmDialogGeneral',
    message: '¿Seguro que quieres cerrar sesión',
    header: 'Cerrar sesión',
    icon: 'pi pi-exclamation-circle',
    rejectProps: {
      label: 'No',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Si',
      severity: 'danger',
    },
    accept: () => logoutUser(),
  })
}
</script>

<template>
  <header>
    <Menubar class="bg-primary-900 dark:bg-primary-950 rounded-none border-0">
      <template #start>
        <div class="flex items-center gap-3">
          <i
            class="pi pi-bars text-xl text-surface-0 transition-colors duration-200 hover:text-surface-200 dark:hover:text-surface-300 cursor-pointer"
            @click="emitToggleMenu"
          />
          <RouterLink :to="routeMap[role]??'/'">
            <Image :src="LogoWhite" alt="Logo" width="48" />
          </RouterLink>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Button
            :icon="`pi ${iconTheme}`"
            severity="info"
            rounded
            aria-label="Calendario"
            class="button-the-header"
            @click="themeStore.toggleTheme"
          />
          <Button
            icon="pi pi-calendar"
            severity="info"
            rounded
            aria-label="Calendario"
            class="button-the-header"
          />
          <Button
            icon="pi pi-bell"
            severity="info"
            rounded
            aria-label="Notificaciones"
            class="button-the-header"
          />
          <Button
            icon="pi pi-user"
            severity="info"
            rounded
            aria-label="Usuario"
            class="button-the-header"
            @click="toggle($event)"
          />
          <Popover ref="op">
            <div class="w-44">
              <RouterLink :to="routeMap[role]?`${routeMap[role]}/perfil`:'/'" @click="()=>op.hide()">
                <div v-ripple
                  class="w-full flex items-center justify-between cursor-pointer rounded p-2 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800"
                >
                  <p>Perfil</p>
                  <i class="pi pi-user"></i></div
              ></RouterLink>

              <div v-ripple
                class="w-full flex items-center justify-between cursor-pointer rounded p-2 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800"
                @click="confirmLogout()"
              >
                Cerrar sesión
                <i class="pi pi-sign-out"></i>
              </div>
            </div>
          </Popover>
        </div>
      </template>
    </Menubar>
  </header>
</template>
