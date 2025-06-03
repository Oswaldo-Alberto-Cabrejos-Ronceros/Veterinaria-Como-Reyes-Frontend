//importamos container de casos de uso
import { authenticationUseCases } from '@/dependency-injection/auth.container'
import type { User } from '@/services/Authentication/domain/models/User'
import { useAsyncHandler } from './useAsyncHandler'
import { useAuthenticationStore } from '@/stores/authenticationStore'
import { UserAdapter } from '@/adapters/UserAdapter'
import type { UserClientRegister } from '@/models/UserClientRegister'

export function useAuthentication() {
  //get from useAsyncHandler
  const { loading, error, runUseCase } = useAsyncHandler()
  //instance autenthenticationStore
  const autenthenticationStore = useAuthenticationStore()

  //expose uses cases
  const loginClient = async (email: string, password: string) => {
    const userClient: User = await runUseCase('loginClient', () =>
      authenticationUseCases.loginClient.execute(email, password),
    )
    //adaptamos
    const userSession = UserAdapter.toUserSession(userClient)
    autenthenticationStore.setUser(userSession)
    return userSession
  }

  const loginEmployee = async (email: string, password: string) => {
    const userClient: User = await runUseCase('loginEmployee', () =>
      authenticationUseCases.loginEmployee.execute(email, password),
    )
    //adapt
    const userSession = UserAdapter.toUserSession(userClient)
    autenthenticationStore.setUser(userSession)
    return userSession
  }

  const logoutUser = async () => {
    autenthenticationStore.cleanUser()
    return await runUseCase('logout', () => authenticationUseCases.logoutUser.execute())
  }

  const registerUserClient = async (userClient: UserClientRegister) => {
    //adapt
    const userClientRequest = UserAdapter.userClientRegisterToUserClientRequest(userClient)
    const userRegister = await runUseCase('registerUserClient', () =>
      authenticationUseCases.registerUserClient.execute(userClientRequest),
    )
    //adapt
    const userSession = UserAdapter.toUserSession(userRegister)
    autenthenticationStore.setUser(userSession)
    return userSession
  }

  //para obtener el rol de un usuario
  const getMainRole =()=>{
    return autenthenticationStore.userRole
  }
  return {
    loading,
    error,
    loginClient,
    loginEmployee,
    logoutUser,
    registerUserClient,
    getMainRole
  }
}
