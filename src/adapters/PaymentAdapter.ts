import type { Payment } from '@/services/Payment/domain/models/Payment'
import type { Payment as PaymentView } from '@/models/Payment'
import type { PaymentList } from '@/services/Payment/domain/models/Payment'
import type { PaymentList as PaymentListView } from '@/models/PaymentList'

export class PaymentAdapter {
  static toPaymentView(payment: Payment): PaymentView {
    return {
      id: payment.paymentId,
      amount: payment.amount,
      paymentDateTime: payment.paymentDateTime,
      status: payment.status,
      appointmentId: payment.appointmentId,
      careId: payment.careId,
      paymentMethodId: payment.paymentMethodId,
    }
  }

  
}
