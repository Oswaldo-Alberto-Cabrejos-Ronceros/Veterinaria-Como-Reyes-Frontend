<script setup lang="ts">
import CardRegistration from './components/CardRegistration.vue';
import SwitchTheme from '@/components/SwitchTheme.vue';
import  type { FormValues as RegisterRequest} from '@/validation-schemas-forms/schema-register';
import { useAuthentication } from '@/composables/useAuthentication';
import type { UserClientRegister } from '@/models/UserClientRegister';


const {loading, error, registerUserClient}=useAuthentication()

//for register
const register= async (registerRequest:RegisterRequest)=>{
  console.log('emitiendo',registerRequest)
  const user = await registerUserClient(registerRequest as UserClientRegister)
  console.log("Registrado",user)
}

</script>

<template>
    <div class="layout-full-screen-flex py-4 relative">
      <div class="p-2 absolute top-0 w-full flex justify-end">
      <SwitchTheme/>
    </div>
        <CardRegistration @register="register($event)"/>
    </div>
      <p v-if="loading.registerUserClient||loading.registerUserClient">Cargando ...</p>
    <p v-if="error.registerUserClient||error.registerUserClient">Error al iniciar session</p>
</template>
