export interface User{
  id: number,
  rol:string,
  name:string,
  lastname:string
}

export interface UserRequest{
  dni:string,
  names:string,
  lastnames:string,
  email:string,
  address:string,
  cellphone:string,
  password:string
}

