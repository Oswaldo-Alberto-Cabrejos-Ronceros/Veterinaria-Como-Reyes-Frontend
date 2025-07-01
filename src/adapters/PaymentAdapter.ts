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

  static fromPaymentListToPaymentListView(paymentList: PaymentList): PaymentListView {
    return {
      id: paymentList.id,
      headquarterName: paymentList.headquarterName,
      serviceName: paymentList.serviceName,
      clientDni: paymentList.clientDni,
      amount: paymentList.amount,
      status: paymentList.status,
      paymentMethod: paymentList.paymentMethod,
      paymentDate: paymentList.paymentDate,
    }
  }
}
