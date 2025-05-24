//importamos container de casos de uso
import { authenticationUseCases } from '@/dependency-injection/auth.container'
import type { UserClientRequest } from '@/services/Authentication/domain/models/User'

export function useAuthentication() {
  //expose uses cases
  const loginClient = async (email: string, password: string) => {
    return await authenticationUseCases.loginClient.execute(email, password)
  }

  const loginEmployee = async (email: string, password: string) => {
    return await authenticationUseCases.loginEmployee.execute(email, password)
  }

  const logoutUser = async () => {
    return await authenticationUseCases.logoutUser.execute()
  }

  const registerUserClient = async (userClient: UserClientRequest) => {
    return await authenticationUseCases.registerUserClient.execute(userClient)
  }

  return {
    loginClient,
    loginEmployee,
    logoutUser,
    registerUserClient,
  }
}
