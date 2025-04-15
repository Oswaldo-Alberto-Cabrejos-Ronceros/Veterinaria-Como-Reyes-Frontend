<script setup lang="ts">
import Card from 'primevue/card'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button'
import Image from 'primevue/image'
import LogoRose from '@/assets/images/logos/logo-rose.png'
</script>

<template>
  <Card
    class="h-auto flex flex-col p-2 items-center justify-center text-neutral-950 dark:text-surface-0 dark:bg-surface-800"
  >
  <template #header>   <Image :src="LogoRose" alt="Logo" width="140" />  </template>
    <template #title>
      <h3 class="h3 text-center">Registro</h3>
    </template>
    <!-- for inputs -->
    <template #content>
      <!-- for internals inputs -->
      <div class="grid grid-cols-1 gap-2 gap-x-4">
        <!-- for dni -->
        <div class="flex justify-between items-center gap-2">
          <p>DNI</p>
          <InputGroup class="h-auto w-md">
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-id-card"></i>
            </InputGroupAddon>
            <InputText type="text" placeholder="DNI" />
            <InputGroupAddon>
              <Button label="Buscar" />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div class="flex justify-between items-center gap-2">
          <!-- for first name -->
          <p>Nombres</p>
          <InputGroup class="h-auto w-md">
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText type="text" placeholder="Nombres" />
          </InputGroup>
        </div>
        <div class="flex justify-between items-center gap-2">
          <!-- for paternal lastname -->
          <p>Apellidos</p>
          <InputGroup class="h-auto w-md">
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText type="text" placeholder="Apellido Paterno" />
          </InputGroup>
        </div>
        <div class="flex justify-between items-center gap-2">
          <!-- for email -->
          <p>Email</p>
          <InputGroup class="h-auto w-md">
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-at"></i>
            </InputGroupAddon>
            <InputText type="email" placeholder="Email" />
          </InputGroup>
        </div>

        <div class="flex justify-between items-center gap-2">
          <!-- for address -->
          <p>Dirección</p>
          <InputGroup class="h-auto w-md">
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-home"></i>
            </InputGroupAddon>
            <InputText type="text" placeholder="Direccion" />
          </InputGroup>
        </div>

        <div class="flex justify-between items-center gap-2">
          <!-- for cellphone -->
          <p>Celular</p>
          <InputGroup class="h-auto w-md">
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-mobile"></i>
            </InputGroupAddon>
            <InputText type="text" placeholder="Celular" />
          </InputGroup>
        </div>

        <div class="flex justify-between items-center gap-2">
          <!-- for password -->
          <p>Contraseña</p>
          <InputGroup class="h-auto w-md">
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <Password  placeholder="Contraseña" toggleMask  promptLabel="Ingrese Contraseña" weakLabel="Muy simple" mediumLabel="Contreña más compleja" strongLabel="Contraseña segura" />
          </InputGroup>
        </div>
        <div class="flex justify-between items-center gap-2">
          <!-- for password -->
          <p>Confirmar contraseña</p>
          <InputGroup class="h-auto w-md">
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <Password placeholder="Confirmar Contraseña" toggleMask :feedback="false" />
          </InputGroup>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full flex flex-col gap-1 items-center justify-center">
        <div class="flex items-center gap-2 w-full">
        <Checkbox  inputId="Terminos" name="Terminos" binary />
        <label for="Terminos"> Acepto </label>
        <a href="" class="hover:text-primary transition-colors duration-150">Terminos y condiciones</a>
    </div>
        <Button class="w-md mt-4" label="Registrar" severity="success" />
        <div class="flex items-center gap-2">
            <p>Ya tienes una cuenta?</p> 
            <a href=""  class="hover:text-primary transition-colors duration-150">Iniciar Sesion</a>
        </div>
      </div >
    </template>
  </Card>
</template>
