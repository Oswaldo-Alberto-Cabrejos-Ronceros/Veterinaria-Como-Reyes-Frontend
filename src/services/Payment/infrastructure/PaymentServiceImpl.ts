import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PaymentService } from '../domain/services/PaymentService'
import type {
  IncomeStatsToday,
  Payment,
  PaymentList,
  PaymentStatsForPanelAdmin,
  RecentPayment,
  WeeklyIncome,
} from '../domain/models/Payment'
import type { PageResponse } from '@/services/models/PageResponse'

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
  async getAllPaymentsForTable(
    page: number,
    size: number,
    sort?: string,
  ): Promise<PageResponse<PaymentList>> {
    const params: Record<string, string | number> = {
      page: page,
      size: size,
    }

    if (sort) {
      params.sort = sort
    }
    const response = await this.httpClient.get<Promise<PageResponse<PaymentList>>>(
      `${this.urlBase}/list`,
      { params: params },
    )
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
  ): Promise<PageResponse<PaymentList>> {
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

    const response = await this.httpClient.get<PageResponse<PaymentList>>(
      `${this.urlBase}/search`,
      { params: params },
    )
    return response.data
  }

  async getCompletedPaymentsStats(): Promise<PaymentStatsForPanelAdmin> {
    const response = await this.httpClient.get<PaymentStatsForPanelAdmin>(
      `${this.urlBase}/panel-admin/stats`,
    )
    return response.data
  }

  async getPaymentsStatsByHeadquarter(headquarterId: number): Promise<PaymentStatsForPanelAdmin> {
    const response = await this.httpClient.get<PaymentStatsForPanelAdmin>(
      `${this.urlBase}/panel-manager/stats/${headquarterId}`,
    )
    return response.data
  }

  async setPaymentStatusComplete(paymentId: number): Promise<void> {
    await this.httpClient.put<void>(`${this.urlBase}/${paymentId}/status/completed`, {})
  }

  async setPaymentStatusCancelled(paymentId: number): Promise<void> {
    await this.httpClient.put<void>(`${this.urlBase}/${paymentId}/status/cancelled`, {})
  }

  async setPaymentStatusPending(paymentId: number): Promise<void> {
    await this.httpClient.put<void>(`${this.urlBase}/${paymentId}/status/pending`, {})
  }

  async setPaymentStatusRefunded(paymentId: number): Promise<void> {
    await this.httpClient.put<void>(`${this.urlBase}/${paymentId}/status/refunded`, {})
  }
  async getTodayIncomeStats(): Promise<IncomeStatsToday> {
    const response = await this.httpClient.get<IncomeStatsToday>(
      `${this.urlBase}/panel-receptionist/income-today`,
    )
    return response.data
  }

  async getRecentCompletedPayments(headquarterId: number): Promise<RecentPayment[]> {
    const response = await this.httpClient.get<RecentPayment[]>(
      `${this.urlBase}/recent-completed/${headquarterId}`,
    )
    return response.data
  }
  async getWeeklyIncomeGeneral(): Promise<WeeklyIncome> {
    const response = await this.httpClient.get<WeeklyIncome>('/panel-admin/payment/weekly')
    return response.data
  }

  async getWeeklyIncomeByHeadquarter(headquarterId: number): Promise<WeeklyIncome> {
    const response = await this.httpClient.get<WeeklyIncome>(
      `/panel-manager/payment/weekly/${headquarterId}`,
    )
    return response.data
  }
}
