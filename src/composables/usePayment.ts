import { useAsyncHandler } from './useAsyncHandler'
import type { Payment as PaymentView } from '@/models/Payment'
import type { PaymentList as PaymentListView } from '@/models/PaymentList'
import { PaymentAdapter } from '@/adapters/PaymentAdapter'
import { paymentUsesCases } from '@/dependency-injection/payment.container'

export function usePayment() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const getAllPayments = async (): Promise<PaymentView[]> => {
    const payments = await runUseCase('getAllPayments', () =>
      paymentUsesCases.getAllPayments.execute(),
    )
    return payments.map((payment) => PaymentAdapter.toPaymentView(payment))
  }

  const getPaymentById = async (id: number): Promise<PaymentView> => {
    const payment = await runUseCase('getPaymentById', () =>
      paymentUsesCases.getPaymentById.execute(id),
    )
    return PaymentAdapter.toPaymentView(payment)
  }

  const createPayment = async (paymentRequest: PaymentRequest): Promise<PaymentView> => {
    const payment = await runUseCase('createPayment', () =>
      paymentUsesCases.createPayment.execute(paymentRequest),
    )
    return PaymentAdapter.toPaymentView(payment)
  }

  const updatePayment = async (
    id: number,
    paymentRequest: PaymentRequest,
  ): Promise<PaymentView> => {
    const payment = await runUseCase('updatePayment', () =>
      paymentUsesCases.updatePayment.execute(id, paymentRequest),
    )
    return PaymentAdapter.toPaymentView(payment)
  }

  const deletePayment = async (id: number): Promise<void> => {
    await runUseCase('deletePayment', () => paymentUsesCases.deletePayment.execute(id))
  }

  const getAllPaymentsForTable = async (
    page: number,
    size: number,
    sort?: string,
  ): Promise<PaymentListView[]> => {
    const payments = await runUseCase('getAllPaymentsForTable', () =>
      paymentUsesCases.getAllPaymentsForTable.execute(page, size, sort),
    )
    return payments.map((payment) => PaymentAdapter.fromPaymentListToPaymentListView(payment))
  }

  const searchPayments = async (
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
  ): Promise<PaymentListView[]> => {
    const payments = await runUseCase('searchPayments', () =>
      paymentUsesCases.searchPayments.execute(page, size, options, sort),
    )
    return payments.map((payment) => PaymentAdapter.fromPaymentListToPaymentListView(payment))
  }

  return {
    loading,
    error,
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
    getAllPaymentsForTable,
    searchPayments,
  }
}
