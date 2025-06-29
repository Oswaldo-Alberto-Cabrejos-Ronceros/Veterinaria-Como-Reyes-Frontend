export interface Payment {
  paymentId: number
  amount: number
  paymentDateTime: string
  status: string
  appointmentId: number
  careId: number
  paymentMethodId: number
}


export interface PaymentRequest {
  amount: number
  paymentDateTime: string
  status: string
  appointmentId: number
  careId: number
  paymentMethodId: number
}
