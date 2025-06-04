<script setup lang="ts">
import PerfilCard from './components/PerfilCard.vue'
import EditClientCard from '@/views/Common/PerfilPage/components/EditClientCard.vue'
import { useDialog } from 'primevue/usedialog'
import type { MyInfoClient } from '@/models/MyInfoClient'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import { useClient } from '@/composables/useClient'
import { useEmployee } from '@/composables/useEmployee'
import { onMounted, ref } from 'vue'
import { useAuthentication } from '@/composables/useAuthentication'

//methods for get
const { getEntityId, getMainRole } = useAuthentication()
const { myInfoAsClient } = useClient()
const { getEmployeeMyInfo } = useEmployee()
//ref for myInfoClient
const myInfoClient = ref<MyInfoClient | null>(null)
//ref for myInfoEmployee
const myInfoEmployee = ref<MyInfoEmployee | null>(null)
//const myInfo
const myInfo = ref<MyInfoClient | MyInfoEmployee | null>(null)

onMounted(async () => {
  const role = getMainRole()
  const entityId = getEntityId()
  console.log(role,entityId)
  if (role && entityId) {
    if (role.toUpperCase() === 'CLIENTE') {
      myInfoClient.value = await myInfoAsClient(entityId)
      console.log(myInfoClient.value)
      myInfo.value=myInfoClient.value
    } else {
      myInfoEmployee.value = await getEmployeeMyInfo(entityId)
      myInfo.value=myInfoEmployee.value
    }
  }
  console.log(myInfo.value)
})
//for open dynamic dialog
const dialog = useDialog()

//for client
const showEditClient = () => {
  dialog.open(EditClientCard, {
    data: {
      address: myInfoClient.value?.user.email,
      headquarterId: myInfoClient.value?.headquarter.id,
      phone: myInfoClient.value?.phone,
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
    <PerfilCard v-if="myInfo" :user-data="myInfo" @edit:client="showEditClient" />
  </div>
</template>
