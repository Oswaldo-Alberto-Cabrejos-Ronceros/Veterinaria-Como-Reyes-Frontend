import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import * as components from 'primevue'
import router from '@/router'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mountWithPrimeVueAndRouter(component: any, options = {}) {
  return mount(component, {
    global: {
      plugins: [PrimeVue,router],
      components: {
        ...components
      }
    },
    ...options
  })
}
