<script lang="ts" setup>
import { inject,onMounted,ref, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { schema } from '@/validation-schemas-forms/schema-add-care'
import type { FormValues } from '@/validation-schemas-forms/schema-add-care'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Message from 'primevue/message'
import type { OptionSelect } from '@/models/OptionSelect'
import type { PetByClient } from '@/models/PetByClient'
import type { BasicServiceForAppointment } from '@/models/BasicServiceForAppointment'
import { useClient } from '@/composables/useClient'
import { useAuthentication } from '@/composables/useAuthentication'
import { usePet } from '@/composables/usePet'
import { useEmployee } from '@/composables/useEmployee'
import { useAppointment } from '@/composables/useAppointment'
import type { Employee } from '@/models/Employee'


//for methods
const { getEntityId } = useAuthentication()

const { getClientByDni } = useClient()

const { getPetByClientId } = usePet()

const { getAllEmployees,getEmployeeById } = useEmployee()

const { getServicesByHeadquarterAndSpecies } = useAppointment()

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    headquarterVetServiceId: undefined,
    ownerDni: undefined,
    ownerId: undefined,
    ownerName: '',
    petId: undefined,
    employeeId:undefined
  },
})

//field
const [headquarterVetServiceId, headquarterVetServiceIdAttrs] = defineField('headquarterVetServiceId')
const [ownerDni, ownerDniAttrs] = defineField('ownerDni')

const [ownerId, ownerIdAttrs] = defineField('ownerId')
const [ownerName, ownerNameAttrs] = defineField('ownerName')
const [petId, petIdAttrs] = defineField('petId')
const [employeeId, employeeIdAttrs] = defineField('employeeId')



//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
}>

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//refs
const petsOptions = ref<OptionSelect[]>([])
const petsClient = ref<PetByClient[]>([])
const serviceHeadquarterOptions = ref<OptionSelect[]>([])
const headquarterId = ref<number | null>(null)
const employeesOptions = ref<OptionSelect[]>([])

//for search client

const searchClient = async () => {
  if (ownerDni.value && ownerDni.value.length === 8) {
    try {
      const getOwner = await getClientByDni(ownerDni.value)

      ownerName.value = getOwner.fullName
      ownerId.value = getOwner.id
      const petsGet = await getPetByClientId(ownerId.value)
      petsOptions.value = petToOptionsSelect(petsGet)
      petsClient.value = petsGet
    } catch (e) {
      console.error('Error al obtener el nombre del dueño', e)
      ownerName.value = ''
      ownerId.value = 0
      petsOptions.value = []
      petsClient.value = []
    }
  }

}

//for obtain headquarters Service

const loadHeadquartersService = async () => {
  if (headquarterId.value) {
    //get pet client
    const petClient = petsClient.value.find((pet) => pet.id === petId.value)
    if (petClient) {
      serviceHeadquarterOptions.value = serviceHeadquartersToOptionsSelect(
        await getServicesByHeadquarterAndSpecies(headquarterId.value, petClient.specieId),
      )
    }
  }
}
//for obtain options from pet
const petToOptionsSelect = (items: PetByClient[]): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.name,
  }))
}
//for obtain options from serviceHeadquarter
const serviceHeadquartersToOptionsSelect = (
  items: BasicServiceForAppointment[],
): OptionSelect[] => {
  return items.map((item) => ({
    value: item.headquarterServiceId,
    name: item.name,
  }))
}
//for obtain options from pet
const employeeToOptionsSelect = (items: Employee[]): OptionSelect[] => {
  return items.map((item) => ({
    value: item.employeeId,
    name: `${item.lastnames} ${item.names}`,
  }))
}

onMounted(async () => {
  const employeeId = getEntityId()
  if (employeeId) {
    headquarterId.value = (await getEmployeeById(employeeId)).headquarter.headquarterId
  }
   employeesOptions.value=employeeToOptionsSelect(await getAllEmployees())
})


</script>

<template>
  <div class="card-dialog-form-layout">

            <form @submit.prevent="onSubmit" class="form-dialog-layout">
                      <!-- owner dni -->
        <div>
          <label class="block mb-2">DNI del dueño</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              v-model="ownerDni"
              v-bind="ownerDniAttrs"
              class="w-full"
              placeholder="Busque dueño por DNI"
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
            @change="loadHeadquartersService()"
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

          <Message
            v-if="errors.headquarterVetServiceId"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ errors.headquarterVetServiceId }}
          </Message>
        </div>
                <div>
          <label class="block mb-2">Empleado</label>
          <Select
            class="w-full"
            v-bind="employeeIdAttrs"
            v-model="employeeId"
            :options="employeesOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Empleado"
          />

          <Message v-if="errors.employeeId" severity="error" size="small" variant="simple">
            {{ errors.employeeId }}
          </Message>
        </div>
        <div class="button-form-container-grid-end">
          <Button
            class="w-full max-w-md"
            label="Registrar"
            type="submit"
            severity="success"
            icon="pi pi-save"
            iconPos="right"
          />
        </div>
            </form>
  </div>
</template>


