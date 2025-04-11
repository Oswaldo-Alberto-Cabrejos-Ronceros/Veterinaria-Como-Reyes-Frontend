<script setup lang="ts">
import  InputGroup  from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import ButtonTheme from '@/components/ButtonTheme.vue';
</script>
<template>
<div>
<ButtonTheme/>
<h2>Bienvenido</h2>
<InputGroup>
    <InputGroupAddon class="text-neutral-400" >
        <i class="pi pi-user"></i>
    </InputGroupAddon>
    <InputText  placeholder="Username" />
</InputGroup>
</div>
</template>
