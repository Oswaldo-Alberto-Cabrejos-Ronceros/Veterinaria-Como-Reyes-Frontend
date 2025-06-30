import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PaymentService } from '../domain/services/PaymentService'
import type { Payment, PaymentList } from '../domain/models/Payment'

export class PaymentServiceImpl implements PaymentService {
  constructor(private readonly httpClient: HttpClient) {}

  private urlBase = '/payments'

  async getAllPayments(): Promise<Payment[]> {
    const response = await this.httpClient.get<Payment[]>(this.urlBase)
    return response.data
  }
  async getPaymentById(id: number): Promise<Payment> {
    const response = await this.httpClient.get<Payment>(`${this.urlBase}/${id}`)
    return response.data
  }
  async createPayment(paymentRequest: PaymentRequest): Promise<Payment> {
    const response = await this.httpClient.post<Payment>(this.urlBase, paymentRequest)
    return response.data
  }
  async updatePayment(id: number, paymentRequest: PaymentRequest): Promise<Payment> {
    const response = await this.httpClient.put<Payment>(`${this.urlBase}/${id}`, paymentRequest)
    return response.data
  }
  async deletePayment(id: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${id}`)
  }
}
