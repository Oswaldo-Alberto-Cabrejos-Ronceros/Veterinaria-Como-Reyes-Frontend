<script setup lang="ts">
import PerfilCard from './components/PerfilCard.vue';
/*import type { Client } from '@/models/Client';*/

import type { Employee } from '@/models/Employee';/*
const exampleClient: Client = {
  userId: 1,
  clientId: 1001,
  dni: "12345678",
  names: "Juan Carlos",
  lastnames: "Pérez Gómez",
  phone:"984512312",
  headquarterName: "Sucursal Lima Centro",
  role: "Cliente"
}*/

const exampleEmployee: Employee = {
  userId: 10,
  employeeId: 2001,
  dni: "87654321",
  cmvp: "CMVP123456",
  names: "María Fernanda",
  lastnames: "Ramírez López",
  address: "Av. Siempre Viva 123, Miraflores",
  phone: "987654321",
  headquarterName: "Sucursal San Isidro",
  birthDate: "1990-05-15",
  dirImage: "https://www.giorgiline.com/wp-content/uploads/2023/12/hombre-sonriente-que-sostiene-smartphone-1536x1024.jpg",
  role: "Veterinario"
}
</script>

<template>
  <div class="layout-principal-flex">
<PerfilCard :user-data="exampleEmployee"/>

  </div>
</template>
