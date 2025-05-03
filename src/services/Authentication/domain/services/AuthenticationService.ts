import type { User,UserRequest } from "../models/User";

export interface AuthenticationService{
  login(email:string,password:string):Promise<User>;
  register(user:UserRequest):Promise<User>;
  logout():Promise<void>
}
