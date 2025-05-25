export interface Employee {
  userId?: number
  employeeId: number
  dni: string
  cmvp?: string
  names: string
  lastnames: string
  address: string
  phone: string
  headquarterName: string
  headquarterId:number
  birthDate: string
  dirImage: string
  roles: {roleId:number,name:string}[]
}
