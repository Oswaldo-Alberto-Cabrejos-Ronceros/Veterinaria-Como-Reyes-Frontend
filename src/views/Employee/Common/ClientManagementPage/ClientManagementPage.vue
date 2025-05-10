<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-client'
import type { FormValues as SchemaSearchClient } from '@/validation-schemas-forms/schema-search-client'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Button from 'primevue/button'
import Clients from '@/assets/data/clients.json'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref } from 'vue'
import type { Client } from '@/models/Client'
import { useConfirm } from 'primevue'
import ViewClientCard from './components/ViewClientCard.vue'
import { useDialog } from 'primevue'
import AddClientCard from './components/AddClientCard.vue'
import EditClientCard from './components/EditClientCard.vue'
//form
import type { FormValues as SchemaEditClient } from '@/validation-schemas-forms/schema-edit-client'
const { handleSubmit, errors, defineField } = useForm< SchemaSearchClient>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    names: '',
    lastnames: '',
    phone: '',
    email: '',
  },
})

const fieldMap = {
  dni: defineField('dni'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
  phone: defineField('phone'),
  email: defineField('email'),
}



//for dialog
const dialog = useDialog();

const viewClient=(clientData:Client)=>{
dialog.open(ViewClientCard,{
  data:{
    clientData:clientData
  },
  props:{
    modal:true
  }
})
}

const addClient = ()=>{
  dialog.open(AddClientCard,{
    props:{
      modal: true
    },
    onClose: (data) => {
      if (data) {
        console.log('Datos recibidos del diálogo:',data);
      }
    }
  });
}


const editClient = (clientData:Client)=>{
dialog.open(EditClientCard,{
  data:{
    clientData:{
      dni:clientData.dni,
      names:clientData.names,
      lastnames:clientData.lastnames,
      phone:clientData.phone,
      address:clientData.phone,
      birthdate:new Date(), //for now
      headquarterId:clientData.headquarterId
    } as SchemaEditClient
  },
  props:{
    modal:true
  },
  onClose:(data)=>{
    if(data){
      console.log("Datos recibidos del dialogo:",data)
    }
  }
})
}


//for confirm
const confirm = useConfirm();


//for delete with confirm popup
const deleteClient = (event:MouseEvent|KeyboardEvent,client:Client) => {
  confirm.require({
    target:event.currentTarget as HTMLElement,
    message:'¿Seguro que quiere eliminar a este empleado?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps:{
      label:'Cancelar',
      severity:'secondary',
      outlined: true
    },
    acceptProps:{
      label:'Eliminar',
      severity:'danger'
    },
    accept:()=>{
      console.log('Eliminando Empleado ', client.clientId)
    },
    reject:()=>{
      console.log('Cancelando')
    }
  })
}


const searchElementsClient: { title: string; key: keyof typeof fieldMap; icon: string }[] = [
  {
    title: 'DNI',
    key: 'dni',
    icon: 'pi-id-card',
  },
  {
    title: 'Nombres',
    key: 'names',
    icon: 'pi-user',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
  },
  {
    title: 'Celular',
    key: 'phone',
    icon: 'pi-mobile',
  },
  {
    title: 'Email',
    key: 'email',
    icon: 'pi-envelope',
  },
]

//for submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
})


//for export

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de Clientes</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <!-- form -->
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <div v-for="element in searchElementsClient" :key="element.key">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText
                  v-model="fieldMap[element.key][0].value"
                  v-bind="fieldMap[element.key][1]"
                  class="w-full"
                  :placeholder="element.title"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
              </Message>
            </div>
            <div class="form-button-search-container-grid-col-5">
              <!-- button -->
              <Button
                label="Buscar"
                type="submit"
                severity="info"
                icon="pi pi-search"
                iconPos="right"
                class="w-full"
              />
            </div>
          </form>
          <DataTable :value="Clients"
          paginator
            :rows="10"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            ref="dt">
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button icon="pi pi-user-plus" iconPos="right" severity="success" label="Agregar Cliente" @click="addClient"  />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column field="dni" sortable header="DNI" class=" hidden lg:table-cell" style="width: 18%"></Column>
            <Column field="names" sortable header="Nombres" style="width: 18%"></Column>
            <Column field="lastnames" class=" hidden md:table-cell" header="Apellidos" sortable style="width: 15%"></Column>
            <Column field="phone" class=" hidden xl:table-cell" header="Celular" sortable style="width: 15%"></Column>
            <Column field="email" class=" hidden lg:table-cell" header="Correo" sortable style="width: 15%"></Column>
            <Column >
              <template #body="{ data }">
                <div class="flex justify-between items-center flex-row lg:flex-col xl:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="viewClient(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="editClient(data)"
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="deleteClient($event,data)"
                  ></Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
