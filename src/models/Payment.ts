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
  date: string
  time: string
  state: string
  employeeAssigned: string
}
