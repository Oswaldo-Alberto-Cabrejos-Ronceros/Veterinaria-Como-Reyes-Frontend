export interface MyInfoClient {
  clientId: number
  user: {
    id: number
    email: string
  }
  dni: string
  names: string
  LastNames: string
  phone: string
  address: string
  headquarter: {
    id: number
    name: string
  }
}
