import { describe, it, expect } from 'vitest'
import { LoginUser } from '@/services/Authentication/aplication/LoginUser'
import { AuthenticationServiceMock } from '@/__mocks__/AuthenticationServiceMock'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthenticationStore } from '@/stores/authenticationStore'
import { beforeEach } from 'vitest'

describe('LoginUser', () => {
  beforeEach(() => {
    //enabled pinia
    setActivePinia(createPinia())
  })

  it('when user log in, it must be saved in the store', async () => {
    const authService = new AuthenticationServiceMock()
    const loginUser = new LoginUser(authService)
    const user = await loginUser.execute('test@gmail.com', '12354')
    const authenticationStore = useAuthenticationStore()
    expect(user.name).toBe('Jesus')
    expect(authenticationStore.user?.name).toBe('Jesus')
    expect(authenticationStore.user?.id).toBe(1)
    expect(authenticationStore.user?.rol).toBe('ADMIN')
    expect(authenticationStore.userRole).toBe('ADMIN')
  })
})
