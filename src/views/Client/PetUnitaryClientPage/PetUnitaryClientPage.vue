<script lang="ts" setup>
import type { Pet } from '@/models/Pet'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import Image from 'primevue/image'
import DatePicker from 'primevue/datepicker'
import Message from 'primevue/message'
import { usePet } from '@/composables/usePet'
import { useVeterinaryRecord } from '@/composables/useVeterinaryRecord'
import type { VeterinaryRecordInfoTable } from '@/models/VeterinaryRecordInfoTable'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useAuthentication } from '@/composables/useAuthentication'
const props = defineProps<{
  petId: string
}>()

const { loading: petLoading, error: petError, getPetById } = usePet()

const roleMain = ref<string>('')

const { getMainRole } = useAuthentication()

const {
  loading: veterinaryRecordLoading,
  error: veterinaryRecordError,
  getAllInfoVeterinaryRecordsByPet,
} = useVeterinaryRecord()

const petData = ref<Pet | null>(null)
//for record
const veterinaryRecords = ref<VeterinaryRecordInfoTable[]>([])

const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

//for loadVeterinaryRecords
const loadVeterinaryRecords = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await getAllInfoVeterinaryRecordsByPet(Number(props.petId), page, size)
  veterinaryRecords.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements
}

onMounted(async () => {
  petData.value = await getPetById(Number(props.petId))
  const role = getMainRole()
  if (role) {
    roleMain.value = role
  }
  loadVeterinaryRecords()
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
        <Message v-if="petLoading.getPetById" severity="warn" size="small" variant="simple">
          Cargando ...
        </Message>
        <!-- for messague error -->
        <Message v-if="petError.getPetById" severity="error" size="small" variant="simple">
          Error al cargar la información de la mascota
        </Message>
        <div class="textLg flex gap-2">
          <h3 class="h3">{{ petData?.name }}</h3>
          <p>{{ petData?.specie.name }}</p>
          <p>{{ petData?.breed.name }}</p>
        </div>
      </template>
      <template #content>
        <div class="w-full flex flex-col gap-2">
          <!-- section 1 pet information -->
          <div class="flex gap-3 flex-col sm:flex-row">
            <!-- image -->
            <Image
              :src="petData?.urlImage"
              :alt="petData?.name"
              image-class=" sm:size-56 md:size-64 lg:size-72 xl:size-80 object-cover rounded"
              preview
            />
            <!-- content -->
            <div class="flex-1 flex sie flex-col gap-1 textLg">
              <div class="flex sie items-center justify-between">
                <p>Nacimiento: {{ petData?.birthdate }}</p>
                <i
                  :class="
                    petData?.gender === 'H'
                      ? 'pi pi-venus text-pink-500 text-xl'
                      : 'pi pi-mars text-blue-600 text-xl'
                  "
                ></i>
              </div>

              <p>Peso: {{ petData?.weight }} Kg</p>
              <p>Comentario:</p>
              <p class="textBase">{{ petData?.comment }}</p>
            </div>
          </div>
          <!-- section appointements -->
          <!-- title and select -->
          <div class="w-full flex justify-between items-center">
            <h3 class="h3">Mis historial clínico</h3>
            <div>
              <!-- for month -->
              <DatePicker view="month" date-format="mm-yy"></DatePicker>
              <!-- for yerar -->
            </div>
          </div>
          <Message
            v-if="veterinaryRecordLoading.getPetById"
            severity="warn"
            size="small"
            variant="simple"
          >
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message
            v-if="veterinaryRecordError.getPetById"
            severity="error"
            size="small"
            variant="simple"
          >
            Error al cargar el historial de la mascota
          </Message>
          <!-- table -->
          <DataTable
            v-if="veterinaryRecords"
            :value="veterinaryRecords"
            paginator
            :rows="rows"
            :totalRecords="totalRecords"
            :lazy="true"
            :first="first"
            :loading="veterinaryRecordLoading.getAllInfoVeterinaryRecordsByPet"
            @page="loadVeterinaryRecords"
            :rows-per-page-options="[4, 8, 12]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-end gap-2 pb-4">
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
              </div>
            </template>
            <Column field="date" sortable header="Fecha" style="width: 10%"></Column>
            <Column
              field="nameHeadquarter"
              sortable
              header="Sede"
              class="hidden lg:table-cell"
              style="width: 12%"
            ></Column>
            <Column
              field="nameEmployee"
              class="hidden xl:table-cell"
              header="Empleado"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="diagnosis"
              class="hidden xs:table-cell sm:hidden lg:table-cell"
              header="Diagnostico"
              sortable
              style="width: 10%"
            ></Column>
            <Column
              field="treatment"
              class="hidden xl:table-cell"
              header="Tratamiento"
              sortable
              style="width: 10%"
            ></Column>
            <Column
              field="observation"
              class="table-cell sm:hidden lg:table-cell"
              header="Observación"
              sortable
              style="width: 10%"
            ></Column>
            <Column
              field="status"
              class="hidden md:table-cell"
              header="Estado"
              sortable
              style="width: 12%"
            ></Column>
            <Column header="Acciones" v-if="roleMain !== 'Cliente'">
              <template #body>
                <div class="flex items-center flex-col sm:flex-row lg:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    size="small"
                    aria-label="Ver"
                    rounded
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    size="small"
                    aria-label="Editar"
                    rounded
                  ></Button>
                  <Button
                    icon="pi pi-file"
                    severity="success"
                    variant="text"
                    size="small"
                    aria-label="Descargar archivo"
                    rounded
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
