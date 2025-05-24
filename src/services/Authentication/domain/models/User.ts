export interface User {
  userId: number
  entityId: number
  type: string
  mainRole: string
  groupedPermissions: GroupedPermissions
}

export interface GroupedPermissions {
  animal?: string[]
  breed?: string[]
  categorie?: string[]
  client?: string[]
  employee?: string[]
  headquarter?: string[]
  paymentMethod?: string[]
  permission?: string[]
  role?: string[]
  specie?: string[]
  veterinaryService?: string[]
  payment?: string[]
}

export interface UserClientRequest {
  dni: string
  names: string
  lastnames: string
  email: string
  address: string
  phone: string
  birthdate: string
  headquarker: number
  password: string
}
