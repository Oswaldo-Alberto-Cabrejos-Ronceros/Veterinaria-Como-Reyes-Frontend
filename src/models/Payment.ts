export interface Payment {
  id: number
  clientDni: string
  headquarter: string
  headquarterId: number
  service: string
  serviceId: number
  amount: number
  paymentMethod: string
  paymentMethodId: number
  date: string | Date
  time: string | Date
  state: string
  employeeAssigned: string
}
