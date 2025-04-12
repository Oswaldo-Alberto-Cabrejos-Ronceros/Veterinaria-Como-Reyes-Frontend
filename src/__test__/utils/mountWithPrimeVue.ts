import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import * as components from 'primevue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mountWithPrimeVue(component: any, options = {}) {
  return mount(component, {
    global: {
      plugins: [PrimeVue],
      components: {
        ...components
      }
    },
    ...options
  })
}
