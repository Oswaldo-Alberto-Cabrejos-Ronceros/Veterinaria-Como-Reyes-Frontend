<script setup lang="ts">
import CardLogin from './components/CardLogin.vue'
import SwitchTheme from '@/components/SwitchTheme.vue'
import type { FormValues as LoginSchema } from '@/validation-schemas-forms/schema-login'
import { useAuthentication } from '@/composables/useAuthentication'

//get methods for use
const {loading,error,loginClient,loginEmployee} = useAuthentication()
//fuction for get info for cardLogin
const login = async (loginRequest: { loginRequest: LoginSchema; isEmployee: boolean }) => {
    console.log('recibido', loginRequest)
    if(loginRequest.isEmployee){
      const user= await loginEmployee(loginRequest.loginRequest.email,loginRequest.loginRequest.password);
      console.log('Inicio de session correcto como empleado',user)
    } else{
      const user= await loginClient(loginRequest.loginRequest.email,loginRequest.loginRequest.password)
       console.log('Inicio de session correcto como client',user)
    }
}
</script>
<template>
  <div class="layout-full-screen-flex relative">
    <div class="p-2 absolute top-0 w-full flex justify-end">
      <SwitchTheme />
    </div>
    <CardLogin @login="login($event)" class="self-center" />
    <p v-if="loading.loginClient||loading.loginEmployee">Cargando ...</p>
    <p v-if="error.loginClient||error.loginEmployee">Error al iniciar session</p>
  </div>
</template>
