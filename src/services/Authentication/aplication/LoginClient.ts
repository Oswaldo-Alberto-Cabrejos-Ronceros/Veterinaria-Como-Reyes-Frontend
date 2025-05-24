import type { AuthenticationService } from '../domain/services/AuthenticationService'
import { useAuthenticationStore } from '@/stores/authenticationStore'

export class loginClient {
  constructor(private authenticationService: AuthenticationService) {}
  async execute(email: string, password: string) {
    const user = await this.authenticationService.loginClient(email, password)

    //store
    const authenticationStore = useAuthenticationStore()
    authenticationStore.setUser(user)
    return user
  }
}
