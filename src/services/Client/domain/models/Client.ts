export interface Client {
  clientId: number
  dni: string
  name: string
  lastName: string
  address: string
  phone: string
  birthDate: string
  dirImage: string
  headquarter: {
    headquarterId: number
    name: string
  }
  user?: {
    userId?: number
    email: string
    password?: string
  }
  blockNote?: string
}

export interface ClientRequest {
  dni: string
  name: string
  lastName: string
  address: string
  phone: string
  birthDate: string
  dirImage?: string
  headquarter: {
    headquarterId: number
  }
  user?: {
    email: string
    password: string
  }
}


export interface MyInfoClient{
  clientId:number,
  user:{
        id:number
    email:string
  }
  dni:string,
  names:string,
  LastNames:string,
  phone:string,
  address:string,
  headquarter:{
    id:number,
    name:string
  }
}

export interface ClientUpdateAsClient{
   address:string,
  phone:string,
  hearheadquarterId:number
}