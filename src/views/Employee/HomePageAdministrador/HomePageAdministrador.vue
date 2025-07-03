<script setup lang="ts">
import { DateAdapter } from '@/adapters/DateAdapter'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import CardNewsPrimary from '@/components/CardNewsPrimary.vue'
import Button from 'primevue/button'

const { getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()

const myInfoEmployee = ref<MyInfoEmployee | null>(null)

const entityId = ref<number | null>(null)

const today = DateAdapter.toFormatView(new Date())

const news: { title: string; icon: string; content: string; plus?: string }[] = [
  {
    title: 'Citas hoy',
    icon: 'pi-calendar',
    content: '15',
    plus: '+2 desde ayer',
  },
  {
    title: 'Pacientes activos',
    icon: 'pi-heart',
    content: '85',
    plus: '+8 este mes',
  },
  {
    title: 'Clientes',
    icon: 'pi-user',
    content: '40',
    plus: '+3 este mes',
  },
  {
    title: 'Ingresos mes',
    icon: 'pi-chart-line',
    content: 'S/ 5000',
    plus: '+15% vs mes anterior',
  },
]

onMounted(() => {
  loadMyInfo()
})

const loadMyInfo = async () => {
  const entityIdGet = getEntityId()
  entityId.value = entityIdGet
  if (entityIdGet) {
    myInfoEmployee.value = await getEmployeeMyInfo(entityIdGet)
  }
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">
          Bienvenido
          <strong> {{ myInfoEmployee?.names }} </strong>
        </h2>
      </template>
      <template #subtitle>
        <p class="Plg">{{ today }}</p>
      </template>
      <template #content>
        <!-- news -->
        <div class="w-full grid grid-cols-4 gap-x-12 mt-4">
          <CardNewsPrimary
            v-for="(noticia, index) in news"
            :key="index"
            :title="noticia.title"
            :icon="noticia.icon"
            :content="noticia.content"
            :plus="noticia.plus"
          >
          </CardNewsPrimary>
        </div>
        <!-- section 2 -->
        <div class="grid grid-cols-2 gap-x-12 mt-4">
          <Card class="card-primary min-h-24">
            <template #title>
              <div class="w-full flex justify-between items-baseline">
                <h2 class="h3 font-semibold">Proximas citas</h2>
              <Button label="Nueva Cita" icon="pi pi-plus" >

              </Button>
              </div>
            </template>
            <template #subtitle>
              <p>Citas programadas para hoy</p>
            </template>
          </Card>
        </div>
      </template>
    </Card>
  </div>
</template>
