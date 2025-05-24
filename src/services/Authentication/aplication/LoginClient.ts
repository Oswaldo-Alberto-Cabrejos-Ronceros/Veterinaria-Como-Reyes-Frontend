import type { AuthenticationService } from '../domain/services/AuthenticationService'

export class LoginClient {
  constructor(private authenticationService: AuthenticationService) {}
  async execute(email: string, password: string) {
    const user = await this.authenticationService.loginClient(email, password)
    return user
  }
}
