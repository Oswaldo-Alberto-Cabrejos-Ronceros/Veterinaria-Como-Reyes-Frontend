<script lang="ts" setup>
import { inject, onMounted, ref, type Ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { schema } from '@/validation-schemas-forms/schema-add-care-from-appointment'
import type { FormValues } from '@/validation-schemas-forms/schema-add-care-from-appointment'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Message from 'primevue/message'
import type { OptionSelect } from '@/models/OptionSelect'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import type { Employee } from '@/models/Employee'
//methods
const { getEntityId } = useAuthentication()
const { getAllEmployees,getEmployeeById } = useEmployee()

//refs
const employeesOptions = ref<OptionSelect[]>([])
const headquarterId = ref<number | null>(null)



const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    appointmentId: undefined,
    employeeId: undefined,
  },
})

//field
const [appointmentId, appointmentIdAttrs] = defineField('appointmentId')
const [employeeId, employeeIdAttrs] = defineField('employeeId')

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    appointmentId: number
  }
}>

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//for obtain options from pet
const employeeToOptionsSelect = (items: Employee[]): OptionSelect[] => {
  return items.map((item) => ({
    value: item.employeeId,
    name: `${item.lastnames} ${item.names}`,
  }))
}

onMounted(async () => {
  //obtenemos el id de la cita
  if (dialogRef.value.data) {
    const appointmentIdGet = dialogRef.value.data.appointmentId
    appointmentId.value = appointmentIdGet
  }
    const employeeId = getEntityId()
  if (employeeId) {
    headquarterId.value = (await getEmployeeById(employeeId)).headquarter.headquarterId
  }
  employeesOptions.value=employeeToOptionsSelect(await getAllEmployees())
})
</script>
<template>
  <div class="card-dialog-form-layout">

      <form @submit.prevent="onSubmit" class="form-dialog-layout-flex-col">
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

        <InputNumber v-model="appointmentId" v-bind="appointmentIdAttrs" hidden />
                <Button
            class="w-full max-w-md"
            label="Registrar"
            type="submit"
            severity="success"
            icon="pi pi-save"
            iconPos="right"
          />
      </form>
    </div>
</template>
