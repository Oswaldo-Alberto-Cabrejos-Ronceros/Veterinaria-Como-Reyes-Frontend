<script setup lang="ts">
import CardRegistration from './components/CardRegistration.vue'
import SwitchTheme from '@/components/SwitchTheme.vue'
import type { FormValues as RegisterRequest } from '@/validation-schemas-forms/schema-register'
import { useAuthentication } from '@/composables/useAuthentication'
import type { UserClientRegister } from '@/models/UserClientRegister'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'

const { loading, error, registerUserClient } = useAuthentication()

const router = useRouter()

const toast = useToast()

const showToast = (message: string) => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: message,
    life: 3000,
  })
}

watch(()=>error.registerUserClient,
(newVal)=>{
  if(newVal){
    showToast('Error en el registro')
  }
})

//for register
const register = async (registerRequest: RegisterRequest) => {
  await registerUserClient(registerRequest as UserClientRegister)
  router.push('/client/')
}
</script>

<template>
  <div class="layout-full-screen-flex py-4 relative">
    <div class="p-2 absolute top-0 w-full flex justify-end">
      <SwitchTheme />
    </div>
    <CardRegistration :loading="Boolean(loading.registerUserClient)" @register="register($event)" />
  </div>
</template>
