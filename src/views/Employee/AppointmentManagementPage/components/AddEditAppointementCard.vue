
<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import IftaLabel from 'primevue/iftalabel'
import Button from 'primevue/button'
import Message from 'primevue/message'
import type { OptionSelect } from '@/models/OptionSelect'
import { useClient } from '@/composables/useClient'
import {schema} from '@/validation-schemas-forms/schema-add-appointment'
import type {FormValues} from '@/validation-schemas-forms/schema-add-appointment'
import { usePet } from '@/composables/usePet'
import { useAppointment } from '@/composables/useAppointment'
import { useHeadquarter } from '@/composables/useHeadquarter'

const { getClientByDni } = useClient()

const { getAllHeadquarters } = useHeadquarter()


const {getPetByClientId} = usePet()

const {getAvailableTimes,getServicesByHeadquarterAndSpecies} = useAppointment()

onMounted(async ()=>{
  loadHeadquarter()
})

const headquartersOptions = ref<OptionSelect[]>([])

//for get options from headquarters

const loadHeadquarter = async()=>{
    headquartersOptions.value = headquartersToOptionsSelect(await getAllHeadquarters())
}

const headquartersToOptionsSelect = (headquarters: Headquarter[]): OptionSelect[] => {
  return headquarters.map((headquarter) => ({
    value: headquarter.id,
    name: headquarter.name,
  }))
}

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    scheduleDateTime:'',
    date:new Date(),
    comment:'',
    headquarterVetServiceId:undefined,
    ownerDni:undefined,
    ownerId:undefined,
    ownerName:'',
    petId:undefined,
    paymentMethodId:undefined
  },
})

//field
const [scheduleDateTime, scheduleDateTimeAttrs] = defineField('scheduleDateTime')
const [date, dateAttrs] = defineField('date')
const [comment, commentAttrs] = defineField('comment')
const [headquarterVetServiceId, headquarterVetServiceIdAttrs] = defineField('headquarterVetServiceId')
const [ownerDni, ownerDniAttrs] = defineField('ownerDni')
const [ownerId, ownerIdAttrs] = defineField('ownerId')
const [ownerName, ownerNameAttrs] = defineField('ownerName')
const [petId,petIdAttrs] = defineField('petId')
const [paymentMethodId, paymentMethodIdAttrs] = defineField('paymentMethodId')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//for paymentsMethods options

const paymentMethodsOptions = ref<OptionSelect[]>([])
const petsOptions = ref<OptionSelect[]>([])
const serviceHeadquarterOptions = ref<OptionSelect[]>([])
const scheduleDateTimeOptions = ref<OptionSelect[]>([])

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    paymentMethodsOptions?: OptionSelect[]
  }
}>


//for search client

const searchClient = async () => {
  if (ownerDni.value &&  ownerDni.value.length === 8) {
    try {
      const getOwner = await getClientByDni(ownerDni.value)

      ownerName.value = getOwner.fullName
      ownerId.value = getOwner.id
    } catch (e) {
      console.error('Error al obtener el nombre del dueño', e)
      ownerName.value = ''
      ownerId.value = 0
    }
  }
}

onMounted(()=>{
  if (dialogRef.value.data) {
    console.log(dialogRef.value.data)
    const paymentMethodsOptionsGet = dialogRef.value.data.paymentMethodsOptions
    if(paymentMethodsOptionsGet) paymentMethodsOptions.value=paymentMethodsOptionsGet
  }
})

</script>

<template>
<Card class="card-dialog-form-layout">
      <template #title>
        <h3 class="h3 text-center">Agendar cita</h3>
      </template>
      <template #content>
      <form @submit.prevent="onSubmit" class="form-dialog-layout">
              <form @submit.prevent="onSubmit" class="form-dialog-layout">
        <!-- owner dni -->
        <div>
          <label class="block mb-2">Dni del dueño</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              v-model="ownerDni"
              v-bind="ownerDniAttrs"
              class="w-full"
              placeholder="Dueño DNI"
            />
            <InputGroupAddon>
              <Button
                icon="pi pi-search"
                severity="secondary"
                variant="text"
                @click="searchClient()"
              />
            </InputGroupAddon>
          </InputGroup>

          <Message v-if="errors.ownerDni" severity="error" size="small" variant="simple">
            {{ errors.ownerDni }}
          </Message>
        </div>
        <!-- owner name -->
        <div>
          <label class="block mb-2">Nombre del dueño</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              v-model="ownerName"
              v-bind="ownerNameAttrs"
              class="w-full"
              placeholder="Nombre del dueño"
              disabled
            />
          </InputGroup>

          <Message v-if="errors.ownerName" severity="error" size="small" variant="simple">
            {{ errors.ownerName }}
          </Message>

        </div>
         <InputNumber v-model="ownerId" v-bind="ownerIdAttrs" hidden />

                 <div>
          <label class="block mb-2">Mascota</label>
          <Select
            class="w-full"
            v-bind="petIdAttrs"
            v-model="petId"
            :options="petsOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Mascota"
          />

          <Message v-if="errors.petId" severity="error" size="small" variant="simple">
            {{ errors.petId }}
          </Message>
        </div>


                         <div>
          <label class="block mb-2">Servicio</label>
          <Select
            class="w-full"
            v-bind="headquarterVetServiceIdAttrs"
            v-model="headquarterVetServiceId"
            :options="serviceHeadquarterOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Servicio"
          />

          <Message v-if="errors.petId" severity="error" size="small" variant="simple">
            {{ errors.petId }}
          </Message>
        </div>

               <div>
          <label class="block mb-2">Fecha</label>
          <DatePicker
            v-bind="dateAttrs"
            v-model="date"
            showIcon
            fluid
            iconDisplay="input"
          />

          <Message v-if="errors.date" severity="error" size="small" variant="simple">
            {{ errors.date }}
          </Message>
        </div>

                                 <div>
          <label class="block mb-2">Horario</label>
          <Select
            class="w-full"
            v-bind="scheduleDateTimeAttrs"
            v-model="scheduleDateTime"
            :options="scheduleDateTimeOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Servicio"
          />

          <Message v-if="errors.scheduleDateTime" severity="error" size="small" variant="simple">
            {{ errors.scheduleDateTime }}
          </Message>
        </div>

                                         <div>
          <label class="block mb-2">Método de pago</label>
          <Select
            class="w-full"
            v-bind="paymentMethodIdAttrs"
            v-model="paymentMethodId"
            :options="paymentMethodsOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Servicio"
          />

          <Message v-if="errors.paymentMethodId" severity="error" size="small" variant="simple">
            {{ errors.paymentMethodId }}
          </Message>
        </div>

                <div>
          <label class="block mb-2">Comentario</label>

          <IftaLabel>
            <Textarea
              id="description"
              v-model="comment"
              v-bind="commentAttrs"
              rows="5"
              class="resize-none w-full"
            />
            <label for="description">Comentario</label>
          </IftaLabel>

          <Message v-if="errors.comment" severity="error" size="small" variant="simple">
            {{ errors.comment }}
          </Message>
        </div>
        <div class="button-form-container-grid-end">
          <Button
            class="w-full max-w-md"
            label="Agendar"
            type="submit"
            severity="success"
            icon="pi pi-save"
            iconPos="right"
          />
        </div>
        </form>
      </template>
</Card>
</template>
