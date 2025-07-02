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
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
const props = defineProps<{
  petId: string
}>()

const { loading: petLoading, error: petError, getPetById } = usePet()

const {
  loading: veterinaryRecordLoading,
  error: veterinaryRecordError,
  getAllInfoVeterinaryRecordsByPet,
} = useVeterinaryRecord()

const petData = ref<Pet | null>(null)
//for record
const veterinaryRecords = ref<VeterinaryRecordInfoTable[]>([])

//for loadVeterinaryRecords
const loadVeterinaryRecords = async (petId: number) => {
  veterinaryRecords.value = await getAllInfoVeterinaryRecordsByPet(petId)
}

onMounted(async () => {
  console.log(props.petId)
  console.log(Number(props.petId))
  petData.value = await getPetById(Number(props.petId))
  console.log(props.petId)
  // loadVeterinaryRecords(Number(props.petId))
  veterinaryRecords.value=[
  {
    id: 1,
    date: "2025-06-15",
    nameHeadquarter: "Veterinaria Central",
    nameEmployee: "Dra. Carmen Ríos",
    diagnosis: "Infección urinaria",
    treatment: "Antibióticos por 7 días",
    observation: "Revisar en una semana",
    resultUrl: "/resultados/1.pdf",
    status: "FINALIZADO"
  },
  {
    id: 2,
    date: "2025-06-16",
    nameHeadquarter: "Clínica Los Andes",
    nameEmployee: "Dr. Luis Torres",
    diagnosis: "Parvovirus",
    treatment: "Hospitalización y sueros",
    observation: "En observación",
    resultUrl: "/resultados/2.pdf",
    status: "EN_CURSO"
  },
  {
    id: 3,
    date: "2025-06-17",
    nameHeadquarter: "Vet Pet Center",
    nameEmployee: "Dra. Ana Mendoza",
    diagnosis: "Otitis canina",
    treatment: "Limpieza y gotas otológicas",
    observation: "Control en 5 días",
    resultUrl: "/resultados/3.pdf",
    status: "FINALIZADO"
  },
  {
    id: 4,
    date: "2025-06-18",
    nameHeadquarter: "Veterinaria El Buen Amigo",
    nameEmployee: "Dr. Pedro Alvarado",
    diagnosis: "Alergia alimentaria",
    treatment: "Cambio de dieta",
    observation: "Control mensual",
    resultUrl: "/resultados/4.pdf",
    status: "EN_CURSO"
  },
  {
    id: 5,
    date: "2025-06-19",
    nameHeadquarter: "Clínica Animal Vida",
    nameEmployee: "Dra. Karla Ruiz",
    diagnosis: "Dermatitis",
    treatment: "Corticoides tópicos",
    observation: "Mejoría parcial",
    resultUrl: "/resultados/5.pdf",
    status: "FINALIZADO"
  },
  {
    id: 6,
    date: "2025-06-20",
    nameHeadquarter: "VetSalud Surco",
    nameEmployee: "Dr. Andrés Salazar",
    diagnosis: "Gastritis",
    treatment: "Dieta blanda y antiácidos",
    observation: "Evaluar vómitos persistentes",
    resultUrl: "/resultados/6.pdf",
    status: "FINALIZADO"
  },
  {
    id: 7,
    date: "2025-06-21",
    nameHeadquarter: "Veterinaria Santa Rosa",
    nameEmployee: "Dra. Lucía Fernández",
    diagnosis: "Anemia",
    treatment: "Suplementos y transfusión",
    observation: "Requiere seguimiento",
    resultUrl: "/resultados/7.pdf",
    status: "EN_CURSO"
  },
  {
    id: 8,
    date: "2025-06-22",
    nameHeadquarter: "Centro Vet Pachacamac",
    nameEmployee: "Dr. Henry Poma",
    diagnosis: "Fractura en extremidad",
    treatment: "Inmovilización con férula",
    observation: "Evaluar cirugía ortopédica",
    resultUrl: "/resultados/8.pdf",
    status: "EN_CURSO"
  },
  {
    id: 9,
    date: "2025-06-23",
    nameHeadquarter: "Animal Care Express",
    nameEmployee: "Dra. Evelyn Díaz",
    diagnosis: "Infección ocular",
    treatment: "Gotas oftálmicas cada 8 horas",
    observation: "Revisar en 3 días",
    resultUrl: "/resultados/9.pdf",
    status: "FINALIZADO"
  },
  {
    id: 10,
    date: "2025-06-24",
    nameHeadquarter: "Veterinaria San Miguel",
    nameEmployee: "Dr. Óscar Rojas",
    diagnosis: "Pulgas y garrapatas",
    treatment: "Baño medicado y pipeta",
    observation: "Aplicar nuevamente en 1 mes",
    resultUrl: "/resultados/10.pdf",
    status: "FINALIZADO"
  }
]
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
            :rows="10"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar ficha clínica"
                />
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
            <Column>
              <template #body>
                <div
                  class="flex justify-between items-center flex-col sm:flex-row lg:flex-row gap-1"
                >
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="outlined"
                    aria-label="Filter"
                    rounded
                  ></Button>
                  <Button
                    icon="pi pi-file"
                    severity="success"
                    variant="outlined"
                    aria-label="Filter"
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
