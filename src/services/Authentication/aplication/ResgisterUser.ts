import type { UserRequest } from '../domain/models/User'
import type { AuthenticationService } from '../domain/services/AuthenticationService'
import { useAuthenticationStore } from '@/stores/authenticationStore'
export class RegisterUser {
  constructor(private authenticationService: AuthenticationService) {}

  async execute(user: UserRequest) {
    const userAuth = await this.authenticationService.register(user)

    const authenticationStore = useAuthenticationStore()
    authenticationStore.setUser(userAuth)

    return userAuth
  }
}
