export interface Employee {
  employeeId: number
  dni: string
  cmvp?: string
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
  roles: { roleId: number; name: string }[]
}

export interface EmployeeRequest {
  dni: string
  cmvp?: string
  name: string
  lastName: string
  address: string
  phone: string
  birthDate: string
  dirImage: string
  headquarter: {
    headquarterId: number
  }
  user?: {
    email: string
    password: string
  }
  roles: { roleId: number }[]
}
