<script setup lang="ts">
import PerfilCard from './components/PerfilCard.vue'
import EditClientCard from '@/views/Common/PerfilPage/components/EditClientCard.vue'
import { useDialog } from 'primevue/usedialog'
import type { MyInfoClient } from '@/models/MyInfoClient'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'

const myInfoClient: MyInfoClient = {
  clientId: 101,
  user: {
    id: 5,
    email: "cliente.ejemplo@correo.com"
  },
  dni: "12345678",
  names: "Carlos Alberto",
  lastnames: "Ramírez Quispe",
  phone: "987654321",
  address: "Av. Los Próceres 123, Lima",
  headquarter: {
    id: 2,
    name: "Sede Central"
  }
}

const myInfoEmployee: MyInfoEmployee = {
  employeeId: 202,
  user: {
    id: 12,
    email: "maria.torres@empresa.com"
  },
  dni: "87654321",
  cmvp: "CMVP-45678", // Puedes omitirlo si no aplica
  names: "María Fernanda",
  lastnames: "Torres Salazar",
  address: "Jr. Las Rosas 456, Arequipa",
  phone: "912345678",
  headquarter: {
    id: 3,
    name: "Sede Arequipa"
  },
  birthdate: "1990-07-15",
  dirImage: "https://example.com/images/maria-torres.jpg", // Opcional
  roles: [
    {
      id: 1,
      name: "Veterinario"
    }
  ]
}

//for open dynamic dialog
const dialog = useDialog()

//for client
const showEditClient = () => {
  dialog.open(EditClientCard, {
    data: {
      address: myInfoClient.user.email,
      headquarterId: myInfoClient.headquarter.id,
      phone: myInfoClient.phone
    },
    props: {
      modal: true,
    },
    onClose: (data) => {
      // Escuchar el evento 'close' y recibir los datos
      if (data) {
        console.log('Datos recibidos del diálogo:', data)
      }
    },
  })
}

</script>

<template>
  <div class="layout-principal-flex">
    <PerfilCard
      :user-data="myInfoClient"
      @edit:client="showEditClient"
    />
  </div>
</template>
