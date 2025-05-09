<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

const props = defineProps<{
  pet: {
    name: string
    owner: string
    species: string
    breed: string
    sex: string
  }
}>()

const emit = defineEmits(['submit'])

const name = ref('')
const owner = ref('')
const species = ref('')
const breed = ref('')
const sex = ref('')

onMounted(() => {
  name.value = props.pet.name
  owner.value = props.pet.owner
  species.value = props.pet.species
  breed.value = props.pet.breed
  sex.value = props.pet.sex
})

function onSubmit() {
  emit('submit', {
    name: name.value,
    owner: owner.value,
    species: species.value,
    breed: breed.value,
    sex: sex.value
  })
}
</script>

<template>
  <Card class="h-auto w-full sm:w-xl bg-transparent shadow-none">
    <template #title>
      <h3 class="h3 text-center">Mascota: {{ name }}</h3>
    </template>

    <template #content>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mx-auto text-neutral-950 dark:text-surface-0"
      >
        <!-- Nombre -->
        <div>
          <label>Nombre</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-paw" /></InputGroupAddon>
            <InputText v-model="name" placeholder="Nombre de la mascota" />
          </InputGroup>
        </div>

        <!-- Dueño -->
        <div>
          <label>Dueño</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-user" /></InputGroupAddon>
            <InputText v-model="owner" placeholder="Nombre del dueño" />
          </InputGroup>
        </div>

        <!-- Especie -->
        <div>
          <label>Especie</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-tag" /></InputGroupAddon>
            <InputText v-model="species" placeholder="Ej. Perro, Gato" />
          </InputGroup>
        </div>

        <!-- Raza -->
        <div>
          <label>Raza</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-tag" /></InputGroupAddon>
            <InputText v-model="breed" placeholder="Raza de la mascota" />
          </InputGroup>
        </div>

        <!-- Sexo -->
        <div>
          <label>Sexo</label>
          <InputGroup>
            <InputGroupAddon><i class="pi pi-venus-mars" /></InputGroupAddon>
            <InputText v-model="sex" placeholder="Macho o Hembra" />
          </InputGroup>
        </div>

        <!-- Botón Guardar -->
        <div class="sm:col-span-2 text-center mt-4">
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-md">Guardar</button>
        </div>
      </form>
    </template>
  </Card>
</template>
