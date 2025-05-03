export interface Client {
  userId: number
  clientId: number
  dni: string
  names: string
  lastnames: string
  phone: string,
  address: string,
  birthday: string, // format: (dd/mm/yyyy)
  headquarterName: string,
  headquarterId: number,
  role: string,

}
