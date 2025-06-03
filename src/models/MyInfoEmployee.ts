export interface MyInfoEmployee {
  employeeId: number
  user: {
    id: number
    email: string
  }
  dni: string
  cmvp?: string
  names: string
  lastNames: string
  address: string
  phone: string
  headquarter: {
    id: number
    name: string
  }
  birthDate: string
  dirImage?: string
  roles: [
    {
      id: number
      name: string
    },
  ]
}
