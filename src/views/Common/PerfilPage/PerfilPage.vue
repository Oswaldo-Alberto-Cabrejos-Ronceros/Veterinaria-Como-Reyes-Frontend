<script setup lang="ts">
import PerfilCard from './components/PerfilCard.vue';
import type { Client } from '@/models/Client';

import type { Employee } from '@/models/Employee';
import EditClientCard from '@/views/Common/PerfilPage/components/EditClientCard.vue'
import { useDialog } from 'primevue/usedialog';
import EditEmployeeCard from './components/EditEmployeeCard.vue';

const exampleClient: Client = {
  userId: 1,
  clientId: 1001,
  dni: "12345678",
  names: "Juan Carlos",
  lastnames: "Pérez Gómez",
  phone:"984512312",
  address:"Av. Canto Grande",
  headquarterName: "Sucursal Lima Centro",
  headquarterId:1,
  birthday:"05/10/2004",
  role: "Cliente"
}

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
  headquarterId:1,
  birthDate: "1990-05-15",
  dirImage: "https://www.giorgiline.com/wp-content/uploads/2023/12/hombre-sonriente-que-sostiene-smartphone-1536x1024.jpg",
  role: "Veterinario"
}

//for open dynamic dialog

console.log(exampleClient)
const dialog = useDialog();

//for client
const showEditClient = ()=>{
  dialog.open(EditClientCard,{
    data:{
      address:exampleClient.address,
      birthdate: new Date (exampleClient.birthday),
      headquarterId: exampleClient.headquarterId,
      phone:exampleClient.phone
    },
    props:{
      modal: true
    },
    onClose: (data) => { // Escuchar el evento 'close' y recibir los datos
      if (data) {
        console.log('Datos recibidos del diálogo:',data);
      }
    }
  });
}

//for employee
const showEditEmployee = ()=>{
  dialog.open(EditEmployeeCard,{
    data:{
      address:exampleEmployee.address,
      headquarterId: exampleEmployee.headquarterId,
      phone:exampleEmployee.phone,
      dirImage:exampleEmployee.dirImage
    },
    props:{
      modal: true
    },
    onClose: (data) => { // Escuchar el evento 'close' y recibir los datos
      if (data) {
        console.log('Datos recibidos del diálogo:',data);
      }
    }
  });
}


</script>

<template>
  <div class="layout-principal-flex">
<PerfilCard :user-data="exampleEmployee" @edit:client="showEditClient" @edit:employee="showEditEmployee"/>

  </div>
</template>
