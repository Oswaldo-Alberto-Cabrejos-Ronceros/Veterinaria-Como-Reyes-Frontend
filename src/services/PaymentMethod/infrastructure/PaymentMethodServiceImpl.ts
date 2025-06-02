import type { PaymentMethodService } from '../domain/services/PaymentMethodService';
import type { PaymentMethod, PaymentMethodRequest } from '../domain/models/PaymentMethod';
import type { HttpClient } from '@/services/Http/model/HttpClient';

export class PaymentMethodServiceImpl implements PaymentMethodService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/payment-methods';

  async getPaymentMethodById(id: number): Promise<PaymentMethod> {
    const response = await this.httpClient.get<PaymentMethod>(`${this.url}/${id}`);
    return response.data;
  }

  async getAllPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await this.httpClient.get<PaymentMethod[]>(this.url);
    return response.data;
  }

  async createPaymentMethod(data: PaymentMethodRequest): Promise<PaymentMethod> {
    const response = await this.httpClient.post<PaymentMethod>(this.url, data);
    return response.data;
  }

  async updatePaymentMethod(id: number, data: PaymentMethodRequest): Promise<PaymentMethod> {
    const response = await this.httpClient.put<PaymentMethod>(`${this.url}/${id}`, data);
    return response.data;
  }

  async deletePaymentMethod(id: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${id}`);
  }
}
