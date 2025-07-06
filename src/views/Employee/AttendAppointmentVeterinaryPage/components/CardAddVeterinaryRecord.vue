<script lang="ts" setup>
import Card from 'primevue/card'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Button from 'primevue/button'
</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-file"></i>
        <p>Diagnostico y tratamiento</p>
      </div>
    </template>
    <template #content>
      <form>
        <label class="block mb-2">Diagnostico</label>
        <Textarea class="w-full mb-2" auto-resize placeholder="Describa el diagnotico" />
        <label class="block mb-2">Tratamiento</label>
        <Textarea class="w-full mb-2" auto-resize placeholder="Describa el tratamiento" />
        <label class="block mb-2">Observaciones</label>
        <Textarea class="w-full mb-2" auto-resize placeholder="Observaciones adicionales " />
        <label class="block mb-2">Estado del registro</label>
        <Select class="w-full mb-2" placeholder="Seleccionar estado" />
        <Button severity="success" label="Guardar" class="w-full mt-2" icon-pos="left" icon="pi pi-save" />
      </form>
    </template>
  </Card>
</template>
