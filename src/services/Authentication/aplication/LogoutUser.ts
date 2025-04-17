import type { AuthenticationService } from '../domain/services/AuthenticationService'
import { useAuthenticationStore } from '@/stores/authenticationStore'
export class LogoutUser {
  constructor(private authenticationService: AuthenticationService) {}
  async execute() {
    await this.authenticationService.logout()
    //store
    const authenticationStore = useAuthenticationStore()
    authenticationStore.cleanUser()
  }
}
