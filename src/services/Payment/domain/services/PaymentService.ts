import type { Payment } from '../models/Payment'

export interface PaymentService {
  getAllPayments(): Promise<Payment[]>
  getPaymentById(id: number): Promise<Payment>
  createPayment(paymentRequest: PaymentRequest): Promise<Payment>
  updatePayment(id: number, paymentRequest: PaymentRequest): Promise<Payment>
  deletePayment(id: number): Promise<void>
}
