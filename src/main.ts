import './assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
//importamos prime vue
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
//import esLocale
import esLocale from '@/assets/locale/es.json'
import Ripple from 'primevue/ripple';
import App from './App.vue'
import router from './router'

import { definePreset } from '@primeuix/themes'

const app = createApp(App)
app.directive('ripple', Ripple);
const MyPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.500}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}',
        },
      },
    },
  },
})

app.use(createPinia())
app.use(PrimeVue, {
  ripple:true,
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.dark',
      prefix: 'p',
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
  locale: esLocale,
})

//user dialog service
app.use(DialogService)
app.use(ConfirmationService)
app.use(ToastService)
app.use(router)

app.mount('#app')
