import type { PageResponse } from '@/services/models/PageResponse'
import type { IncomeStatsToday, Payment, PaymentList, PaymentStatsForPanelAdmin, RecentPayment } from '../models/Payment'

export interface PaymentService {
  getAllPayments(): Promise<Payment[]>
  getPaymentById(id: number): Promise<Payment>
  createPayment(paymentRequest: PaymentRequest): Promise<Payment>
  updatePayment(id: number, paymentRequest: PaymentRequest): Promise<Payment>
  deletePayment(id: number): Promise<void>
  getAllPaymentsForTable(page: number, size: number, sort?: string): Promise<PageResponse<PaymentList>>
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
  ): Promise<PageResponse<PaymentList>>
  getCompletedPaymentsStats(): Promise<PaymentStatsForPanelAdmin>
  getPaymentsStatsByHeadquarter(headquarterId: number): Promise<PaymentStatsForPanelAdmin>
setPaymentStatusComplete(paymentId: number): Promise<void>
  setPaymentStatusCancelled(paymentId: number): Promise<void>
setPaymentStatusPending(paymentId: number): Promise<void>
setPaymentStatusRefunded(paymentId: number): Promise<void>
  getTodayIncomeStats(): Promise<IncomeStatsToday>;
  getRecentCompletedPayments(headquarterId: number): Promise<RecentPayment[]>;
}
