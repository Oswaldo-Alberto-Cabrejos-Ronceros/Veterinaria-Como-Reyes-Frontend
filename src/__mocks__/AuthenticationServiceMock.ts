import type { AuthenticationService } from "@/services/Authentication/domain/services/AuthenticationService";
import type { User,UserRequest } from "@/services/Authentication/domain/models/User";

export class AuthenticationServiceMock implements AuthenticationService {
  async login(email: string, password: string): Promise<User> {
    console.log(email,password);
    return{
      id: 1,
      rol:'ADMIN',
      name:'Jesus',
      lastname:'Vazques'
    }
  }
  async register(user: UserRequest): Promise<User> {
    return{
      id: 1,
      rol:'ADMIN',
      name:user.names,
      lastname:user.lastnames
    }
  }
  async logout(): Promise<void> {
    return
  }


}
