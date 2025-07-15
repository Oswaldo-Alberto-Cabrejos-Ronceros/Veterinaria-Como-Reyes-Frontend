<script setup lang="ts">
import type { OptionSelect } from '@/models/OptionSelect'
import { inject, onMounted, type Ref } from 'vue'
import { schema } from '@/validation-schemas-forms/schema-add-edit-veterinary-record'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-veterinary-record'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Select from 'primevue/select'

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    recordData: FormValues
  }
}>

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    careId: undefined,
    employeeId: undefined,
    dateCreate: undefined,
    diagnosis: undefined,
    treatment: undefined,
    observation: undefined,
    resultUrl: undefined,
    status: undefined,
  },
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

const [careId] = defineField('careId')
const [employeeId] = defineField('employeeId')

const [diagnosis, diagnosisAttrs] = defineField('diagnosis')
const [treatment, treatmentAttrs] = defineField('treatment')
const [observation, observationAttrs] = defineField('observation')
const [resultUrl, resultUrlAttrs] = defineField('resultUrl')
const [status, statusAttrs] = defineField('status')

onMounted(() => {
  if (dialogRef.value.data) {
    const params = dialogRef.value.data.recordData
    careId.value = params.careId
    employeeId.value = params.employeeId
    diagnosis.value = params.diagnosis
    treatment.value = params.treatment
    observation.value = params.observation
    resultUrl.value = params.resultUrl
    status.value = params.status
  }
})

const statusOptions: OptionSelect[] = [
  {
    value: 'EN_CURSO',
    name: 'En curso',
  },
  {
    value: 'COMPLETADO',
    name: 'Completado',
  },
  {
    value: 'OBSERVACION',
    name: 'Observación',
  },
]
</script>

<template>
  <div class="card-dialog-form-layout min-w-md">
      <form @submit.prevent="onSubmit">
        <!-- Diagnóstico -->
        <label class="block mb-2">Diagnóstico</label>
        <Textarea
          class="w-full mb-1"
          auto-resize
          placeholder="Describa el diagnóstico"
          v-model="diagnosis"
          v-bind="diagnosisAttrs"
        />
        <Message v-if="errors.diagnosis" severity="error" size="small" variant="simple">
          {{ errors.diagnosis }}
        </Message>

        <!-- Tratamiento -->
        <label class="block mt-3 mb-2">Tratamiento</label>
        <Textarea
          class="w-full mb-1"
          auto-resize
          placeholder="Describa el tratamiento"
          v-model="treatment"
          v-bind="treatmentAttrs"
        />
        <Message v-if="errors.treatment" severity="error" size="small" variant="simple">
          {{ errors.treatment }}
        </Message>

        <!-- Observaciones -->
        <label class="block mt-3 mb-2">Observaciones</label>
        <Textarea
          class="w-full mb-1"
          auto-resize
          placeholder="Observaciones adicionales"
          v-model="observation"
          v-bind="observationAttrs"
        />
        <Message v-if="errors.observation" severity="error" size="small" variant="simple">
          {{ errors.observation }}
        </Message>

        <!-- URL resultado -->
        <label class="block mt-3 mb-2">URL del resultado</label>
        <Textarea
          class="w-full mb-1"
          auto-resize
          placeholder="Enlace al resultado"
          v-model="resultUrl"
          v-bind="resultUrlAttrs"
        />
        <Message v-if="errors.resultUrl" severity="error" size="small" variant="simple">
          {{ errors.resultUrl }}
        </Message>

        <label class="block mb-2">Estado</label>
        <Select
          class="w-full"
          v-bind="statusAttrs"
          v-model="status"
          :options="statusOptions"
          :invalid="Boolean(errors.status)"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Especie"
        />

        <Message v-if="errors.status" severity="error" size="small" variant="simple">
          {{ errors.status }}
        </Message>

        <!-- Botón guardar -->
        <Button
          type="submit"
          severity="success"
          label="Guardar"
          class="w-full mt-4"
          icon-pos="left"
          icon="pi pi-save"
        />
      </form>
    </div>
</template>
