<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-payment-method'
import type { FormValues as SearchPaymentMethotSchema } from '@/validation-schemas-forms/schema-search-payment-method'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'
import type { PaymentMethod } from '@/models/PaymentMethod'
import { useConfirm } from 'primevue'
import AddEditPaymentMethodCard from './components/AddEditPaymentMethodCard.vue'
import { useDialog, useToast } from 'primevue'
import type { FormValues as AddEditPaymentMethodSchema } from '@/validation-schemas-forms/schema-add-edit-payment-method'
import ViewPaymentMethodCard from './components/ViewPaymentMethodCard.vue'
import { usePaymentMethod } from '@/composables/usePaymentMethod'

//toast
const toast = useToast()

const showToast = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Éxito',
    detail: message,
    life: 3000,
  })
}

//get from compose

const {
  loading,
  error,
  getAllPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} = usePaymentMethod()

//payment methods

const paymentMethods = ref<PaymentMethod[]>([])

onMounted(() => {
  loadPaymentMethods()
})

//for load payment methods

const loadPaymentMethods = async () => {
  paymentMethods.value = await getAllPaymentMethods()
}

//form
const { handleSubmit, errors, defineField } = useForm<SearchPaymentMethotSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
  },
})

const [name, nameAttrs] = defineField('name')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for dialog
const dialog = useDialog()

const addPaymentMethod = () => {
  dialog.open(AddEditPaymentMethodCard, {
    props: {
      modal: true,
      header:'Agregar método de pago'
    },
    onClose: async (options) => {
      const data = options?.data as AddEditPaymentMethodSchema
      if (data) {
        const paymentMethod = await createPaymentMethod(data)
        console.log('Datos recibidos del dialogo', paymentMethod)
        loadPaymentMethods()
        showToast('Método de pago agregado correctamente.')
      }
    },
  })
}

const viewPaymentMethod = (paymentMethodData: PaymentMethod) => {
  dialog.open(ViewPaymentMethodCard, {
    props: {
      modal: true,
      header:`${paymentMethodData.name}`
    },
    data: {
      paymentMethodData: paymentMethodData,
    },
  })
}

const editPaymentMethod = (paymentMethodData: PaymentMethod) => {
  dialog.open(AddEditPaymentMethodCard, {
    props: {
      modal: true,
      header:`${paymentMethodData.name}`
    },
    data: {
      paymentMethodData: paymentMethodData as AddEditPaymentMethodSchema,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditPaymentMethodSchema
      if (data) {
        const paymentMethod = await updatePaymentMethod(paymentMethodData.id, data)
        console.log('Datos recibidos del dialogo', paymentMethod)
        loadPaymentMethods()
        showToast('Método de pago editado correctamente.')
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup

const deletePaymentMethodAction = (
  event: MouseEvent | KeyboardEvent,
  paymentMethod: PaymentMethod,
) => {
  confirm.require({
    group:'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar este método?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Eliminar',
      severity: 'danger',
    },
    accept: async () => {
      console.log('Eliminando método ', paymentMethod.id)
      await deletePaymentMethod(paymentMethod.id)
      showToast('Método de pago eliminado correctamente.')
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

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
        <h3 class="h3">Gestión de metodos de pago</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <div>
              <label class="block mb-2">Nombre</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-info"></i>
                </InputGroupAddon>
                <InputText v-model="name" v-bind="nameAttrs" class="w-full" placeholder="Nombre" />
              </InputGroup>
              <Message v-if="errors.name" severity="error" size="small" variant="simple">
                {{ errors.name }}
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

          <!-- for messague loading  -->
          <Message
            v-if="loading.getAllPaymentMethods"
            severity="warn"
            size="small"
            variant="simple"
          >
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllPaymentMethods" severity="error" size="small" variant="simple">
            Error al cargar los sedes
          </Message>

          <!-- table -->
          <DataTable
            :value="paymentMethods"
            paginator
            :rows="10"
            :rows-per-page-options="[5, 10]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Método"
                  @click="addPaymentMethod"
                />
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>

            <Column field="name" sortable header="Nombre" style="width: 20%"></Column>
            <Column
              field="description"
              class="hidden md:table-cell"
              header="Descripción"
              sortable
              style="width: 60%"
            ></Column>
            <Column>
              <template #body="{ data }">
                <div class="flex justify-between items-center flex-col sm:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="viewPaymentMethod(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="editPaymentMethod(data)"
                  ></Button>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                    @click="deletePaymentMethodAction($event, data)"
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
