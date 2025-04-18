<script setup lang="ts">
import Card from 'primevue/card'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Image from 'primevue/image'
import LogoRose from '@/assets/images/logos/logo-rose.png'
import Button from 'primevue/button'
import { defineEmits, reactive } from 'vue'
//emitter
const emit = defineEmits(['emit-login'])

//function that emit login action
const doLogin = () => {
  emit('emit-login',formLoginData)
  console.log('Emitiendo',formLoginData)
}

const formLoginData = reactive({ email: '', password: '' })
</script>

<template>
  <form @submit.prevent="doLogin()">
  <Card
    class="h-auto w-xl flex flex-col items-center justify-center text-neutral-950 dark:text-surface-0 dark:bg-surface-800"
  >
    <!-- header for image -->
    <template #header> <Image :src="LogoRose" alt="Logo" width="220" /></template>

    <template #title>
      <h3 class="h3 text-center">Iniciar Sesion</h3>
    </template>
    <!-- for inputs -->

    <template #content>
      <!-- for inputs internal -->
      <div class="flex flex-col gap-4">
        <!-- for email -->
        <p>Email</p>
        <InputGroup class="h-auto w-md">
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText v-model="formLoginData.email" type="email" placeholder="Email" />
        </InputGroup>
        <!-- for password -->
        <p class="textBase">Contraseña</p>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password v-model="formLoginData.password" toggleMask :feedback="false" placeholder="Contraseña" />
        </InputGroup>
      </div>
    </template>
    <!-- for bottons -->
    <template #footer>
      <Button
      type="submit"
        class="w-md mt-4"
        label="Ingresar"
        severity="success"
        icon="pi pi-sign-in"
        iconPos="right"
      />
    </template>

  </Card>
</form>
</template>
