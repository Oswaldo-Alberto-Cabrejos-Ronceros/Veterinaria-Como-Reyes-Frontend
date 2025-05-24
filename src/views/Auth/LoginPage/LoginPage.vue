<script setup lang="ts">
import CardLogin from './components/CardLogin.vue'
import SwitchTheme from '@/components/SwitchTheme.vue'
import type { FormValues as LoginSchema } from '@/validation-schemas-forms/schema-login'

//fuction for get info for cardLogin
const login = (loginRequest: { loginRequest: LoginSchema; isEmployee: boolean }) => {
  console.log('recibido', loginRequest)
}
</script>
<template>
  <div class="layout-full-screen-flex relative">
    <div class="p-2 absolute top-0 w-full flex justify-end">
      <SwitchTheme />
    </div>
    <CardLogin @login="login($event)" class="self-center" />
  </div>
</template>
