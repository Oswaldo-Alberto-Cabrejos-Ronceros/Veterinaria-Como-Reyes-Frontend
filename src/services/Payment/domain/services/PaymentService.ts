import type { Payment, PaymentList } from '../models/Payment'

export interface PaymentService {
  getAllPayments(): Promise<Payment[]>
  getPaymentById(id: number): Promise<Payment>
  createPayment(paymentRequest: PaymentRequest): Promise<Payment>
  updatePayment(id: number, paymentRequest: PaymentRequest): Promise<Payment>
  deletePayment(id: number): Promise<void>
  getAllPaymentsForTable(page: number, size: number, sort?: string): Promise<PaymentList[]>
  searchPayments(
    page: number,
    size: number,
    options: {
      dni?: string
      headquarterId?: number
      serviceId?: number
      status?: string
      startDate?: string
      endDate?: string
    },
    sort?: string,
  ): Promise<PaymentList[]>
}
