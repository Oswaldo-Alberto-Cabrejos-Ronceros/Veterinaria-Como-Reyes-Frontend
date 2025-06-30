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
  async getAllPaymentsForTable(page: number, size: number, sort?: string): Promise<PaymentList[]> {
    const params: Record<string, string | number> = {
      page: page,
      size: size,
    }

    if (sort) {
      params.sort = sort
    }
    const response = await this.httpClient.get<PaymentList[]>(`${this.urlBase}/list`, params)
    return response.data
  }
  async searchPayments(
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
  ): Promise<PaymentList[]> {
    const params: Record<string, string | number> = {
      page,
      size,
    }

    if (options.dni) {
      params.dni = options.dni
    }

    if (options.headquarterId !== undefined) {
      params.headquarterId = options.headquarterId
    }

    if (options.serviceId !== undefined) {
      params.serviceId = options.serviceId
    }

    if (options.status) {
      params.status = options.status
    }

    if (options.startDate) {
      params.startDate = options.startDate
    }

    if (options.endDate) {
      params.endDate = options.endDate
    }

    if (sort) {
      params.sort = sort
    }

    const response = await this.httpClient.get<PaymentList[]>(`${this.urlBase}/search`, params)
    return response.data
  }
}
