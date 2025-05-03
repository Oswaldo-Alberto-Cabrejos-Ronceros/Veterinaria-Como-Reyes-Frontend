import { describe, it, expect } from 'vitest'
import { RegisterUser } from '@/services/Authentication/aplication/ResgisterUser'
import { AuthenticationServiceMock } from '@/__mocks__/AuthenticationServiceMock'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthenticationStore } from '@/stores/authenticationStore'
import { beforeEach } from 'vitest'
describe('RegisterUser', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('when user register in, it must be saved in the store', async () => {
    const authService = new AuthenticationServiceMock()
    const registerUser = new RegisterUser(authService)
    const user = await registerUser.execute({
      dni: '78451223',
      names: 'Oswaldo Alberto',
      lastnames: 'Cabrejos Ronceros',
      email: 'OswCab@gmail.com',
      address: 'Direccion',
      cellphone: '984123125',
      password: '122456',
    })
    const authenticationStore = useAuthenticationStore()
    expect(user.name).toBe('Oswaldo Alberto')
    expect(authenticationStore.user?.id).toBe(1)
    expect(authenticationStore.user?.name).toBe('Oswaldo Alberto')
    expect(authenticationStore.user?.rol).toBe('ADMIN')
    expect(authenticationStore.userRole).toBe('ADMIN')
  })
})
