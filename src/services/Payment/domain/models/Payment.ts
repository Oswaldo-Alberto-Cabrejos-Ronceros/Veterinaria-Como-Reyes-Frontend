export interface Payment {
  paymentId: number
  amount: number
  paymentDateTime: string
  status: string
  appointmentId: number
  careId?: number
  paymentMethodId: number
}

export interface PaymentRequest {
  amount: number
  paymentDateTime: string
  status: string
  appointmentId: number
  careId?: number
  paymentMethodId: number
}

export interface PaymentList {
  id: number
  headquarterName: string
  serviceName: string
  clientDni: string
  amount: string
  status: string
  paymentMethod: string
  paymentDate: string
}
