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
  dirImage: string
  headquarter: {
    headquarterId: number
  }
  user: {
    email: string
    password: string
  }
}
