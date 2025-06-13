<script lang="ts" setup>
import CardScheduleAppointmentPrimary from '@/components/CardScheduleAppointmentPrimary/CardScheduleAppointmentPrimary.vue';
const pets = [
  {
    petId: 1,
    petImageUrl:
      'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso-1024x576.jpg?auth=6df4e6dc984f247b317b99504b5a8a650bcd2a232b5d6684141c42a2e2c32577&smart=true&width=992&height=558&quality=85',
    petName: 'Firulais',
    petSpecie: 'Perro',
    petBreed: 'Labrador Retriever',
    petGender: 'M',
    birthdate: '2020-03-15',
  },
  {
    petId: 2,
    petImageUrl:
      'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Siamese201.jpg?itok=j9A2IvjN',
    petName: 'Michi',
    petSpecie: 'Gato',
    petBreed: 'Siames',
    petGender: 'H',
    birthdate: '2019-11-02',
  },
  {
    petId: 3,
    petImageUrl:
      'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso-1024x576.jpg?auth=6df4e6dc984f247b317b99504b5a8a650bcd2a232b5d6684141c42a2e2c32577&smart=true&width=992&height=558&quality=85',
    petName: 'Rocky',
    petSpecie: 'Perro',
    petBreed: 'Bulldog Francés',
    petGender: 'M',
    birthdate: '2021-01-20',
  },
  {
    petId: 4,
    petImageUrl:
      'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Siamese201.jpg?itok=j9A2IvjN',
    petName: 'Luna',
    petSpecie: 'Gato',
    petBreed: 'Persa',
    petGender: 'H',
    birthdate: '2022-06-10',
  },
  {
    petId: 5,
    petImageUrl:
      'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso-1024x576.jpg?auth=6df4e6dc984f247b317b99504b5a8a650bcd2a232b5d6684141c42a2e2c32577&smart=true&width=992&height=558&quality=85',
    petName: 'Toby',
    petSpecie: 'Perro',
    petBreed: 'Beagle',
    petGender: 'M',
    birthdate: '2018-09-07',
  },
]

//for services examples
const services = [
  {
    serviceId: 1,
    serviceName: 'Baño Canino',
    serviceImageUrl: 'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Perro',
    categoryName: 'Estética',
    duration: '45 min',
    price: 40.0,
  },
  {
    serviceId: 2,
    serviceName: 'Consulta Veterinaria Felina',
    serviceImageUrl: 'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Gato',
    categoryName: 'Consulta',
    duration: '30 min',
    price: 50.0,
  },
  {
    serviceId: 3,
    serviceName: 'Vacunación Antirrábica',
    serviceImageUrl: 'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Perro',
    categoryName: 'Vacunación',
    duration: '15 min',
    price: 25.0,
  },
  {
    serviceId: 4,
    serviceName: 'Corte de Uñas',
    serviceImageUrl: 'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Perro',
    categoryName: 'Estética',
    duration: '10 min',
    price: 10.0,
  },
  {
    serviceId: 5,
    serviceName: 'Desparasitación Interna',
    serviceImageUrl: 'https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2016/08/vet-744x465.jpg',
    specieName: 'Gato',
    categoryName: 'Medicina Preventiva',
    duration: '20 min',
    price: 35.0,
  },
]
</script>

<template>
<div class="layout-principal-flex">
<CardScheduleAppointmentPrimary :pets="pets" :services="services">

</CardScheduleAppointmentPrimary>
</div>
</template>


