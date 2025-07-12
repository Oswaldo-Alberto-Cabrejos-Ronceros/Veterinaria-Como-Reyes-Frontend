<script lang="ts" setup>
import Card from 'primevue/card'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { schema } from '@/validation-schemas-forms/schema-add-edit-veterinary-record'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-veterinary-record'
import { useVeterinaryRecord } from '@/composables/useVeterinaryRecord'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  careId:number,
  employeeId:number,
  disabled:boolean
}>()

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    careId: props.careId,
    employeeId: props.employeeId,
    dateCreate: new Date(),
    diagnosis: '',
    treatment: undefined,
    observation: undefined,
    resultUrl: undefined
  },
})

const {createVeterinaryRecord} = useVeterinaryRecord()

const [diagnosis, diagnosisAttrs] = defineField('diagnosis')
const [treatment, treatmentAttrs] = defineField('treatment')
const [observation, observationAttrs] = defineField('observation')
const [resultUrl, resultUrlAttrs] = defineField('resultUrl')

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

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  const response = await createVeterinaryRecord(values)
  console.log(response)
  showToast(`Registro creado con exito`)
})


</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-file"></i>
        <p>Diagnóstico y tratamiento</p>
      </div>
    </template>
    <template #content>
      <form @submit.prevent="onSubmit">
        <!-- Diagnóstico -->
        <label class="block mb-2">Diagnóstico</label>
        <Textarea
          class="w-full mb-1"
          auto-resize
          placeholder="Describa el diagnóstico"
          v-model="diagnosis"
          v-bind="diagnosisAttrs"
          :disabled="disabled"
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
          :disabled="disabled"
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
          :disabled="disabled"
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
          :disabled="disabled"
        />
        <Message v-if="errors.resultUrl" severity="error" size="small" variant="simple">
          {{ errors.resultUrl }}
        </Message>

        <!-- Botón guardar -->
        <Button
          type="submit"
          severity="success"
          label="Guardar"
          class="w-full mt-4"
          icon-pos="left"
          icon="pi pi-save"
          :disabled="disabled"
        />
      </form>
    </template>
  </Card>
</template>
