import { GetAllPayments } from '@/services/Payment/aplication/GetAllPayments'
import { GetPaymentById } from '@/services/Payment/aplication/GetPaymentById'
import { CreatePayment } from '@/services/Payment/aplication/CreatePayment'
import { UpdatePayment } from '@/services/Payment/aplication/UpdatePayment'
import { DeletePayment } from '@/services/Payment/aplication/DeletePayment'

import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { PaymentServiceImpl } from '@/services/Payment/infrastructure/PaymentServiceImpl'

// Instancia del cliente HTTP
const axiosHttpClient = new AxiosHttpClient()

// Instancia de la implementación del servicio de pagos
const paymentService = new PaymentServiceImpl(axiosHttpClient)

// Exposición de todos los casos de uso con la dependencia inyectada
export const paymentUsesCases = {
  getAllPayments: new GetAllPayments(paymentService),
  getPaymentById: new GetPaymentById(paymentService),
  createPayment: new CreatePayment(paymentService),
  updatePayment: new UpdatePayment(paymentService),
  deletePayment: new DeletePayment(paymentService)
}
