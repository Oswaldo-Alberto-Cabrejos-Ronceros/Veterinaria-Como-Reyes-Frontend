<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import Message from 'primevue/message'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import {schema} from '@/validation-schemas-forms/schema-edit-client'
import type {FormValues} from '@/validation-schemas-forms/schema-edit-client'
import { useForm } from 'vee-validate'
import Button from 'primevue/button'
import { inject, onMounted } from "vue";
import type {EditClient} from '@/models/EditClient.ts'

const {handleSubmit, errors,defineField} = useForm<FormValues>({
  validationSchema:toTypedSchema(schema),
  initialValues: {
    celular:'',
    direccion:'',
    fechaNac:undefined,
    sede:undefined
  }
})

//headquarkers
const headquarkers = [
  { name: 'Ica', value: 1},
  { name: 'Parcona', value: 2 },
  { name: 'Tinguiña', value: 3 }
]

const [direccion, direccionAttrs] = defineField('direccion')
const [fechaNac, fechaNacAttrs] = defineField('fechaNac')
const [sede, sedeAttrs] = defineField('sede')
const [celular, celularAttrs] = defineField('celular')

const onSubmit = handleSubmit((values) => {
  emit('save', values)
})

//for dynamicDialog
const dialogRef = inject('dialogRef');

onMounted(() => {
  const params:{editClient:EditClient} = dialogRef.value.data;
  //change default values
  direccion.value(params.direccion);
  fechaNac.value(params.fechanNac);
  sede.value(params.sede);
  celular.value(params.celular);
})

//emit for edit

const emit = defineEmits<{
  (e: 'save', editClient:EditClient): void
}>()

</script>


<template>
  <Card
    class="h-auto w-[90%] sm:w-xl flex flex-col items-center justify-center dark:bg-surface-800"
  >
    <template #title>
      <h3 class="h3 text-center">Editar Datos</h3>
    </template>
    <template #content>
      <form
        @submit.prevent="onSubmit"
        class="flex flex-col gap-4 w-full max-w-xl xs:min-w-96 sm:min-w-md text-neutral-950 dark:text-surface-0"
      >

        <!-- cell phone -->
        <label>Celular</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-mobile"></i>
          </InputGroupAddon>
          <InputText
            v-bind="celularAttrs"
            v-model="celular"
            type="tel"
            placeholder="Celular"

          />
        </InputGroup>

        <Message v-if="errors.celular" severity="error" size="small" variant="simple">
          {{ errors.celular }}
        </Message>


        <!-- address -->
        <label>Dirección</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-home"></i>
          </InputGroupAddon>
          <InputText
            v-bind="direccionAttrs"
            v-model="direccion"
            type="text"
            placeholder="Dirección"

          />
        </InputGroup>

        <Message v-if="errors.direccion" severity="error" size="small" variant="simple">
          {{ errors.direccion }}
        </Message>

        <!-- birthDate -->
        <label>Fecha Nacimiento</label>

        <DatePicker v-bind="fechaNacAttrs" v-model="fechaNac" showIcon fluid iconDisplay="input" />
        <Message v-if="errors.fechaNac" severity="error" size="small" variant="simple">
          {{ errors.fechaNac }}
        </Message>

        <!--sede-->
        <label>Sede</label>
        <Select v-bind="sedeAttrs" v-model="sede" :options="headquarkers" optionLabel="name" optionValue="value" placeholder="Selecciona Sede"  />

        <Message v-if="errors.sede" severity="error" size="small" variant="simple">
          {{ errors.sede }}
        </Message>

        <!-- button -->

        <Button
          label="Registrar"
          type="submit"
          severity="success"
          icon="pi pi-save"
          iconPos="right"
        />


      </form>

    </template>

    </Card>

</template>
