import type { PaymentMethod, PaymentMethodRequest, PaymentMethodList } from '../models/PaymentMethod';
import type { PageResponse } from '@/services/models/PageResponse'

export interface PaymentMethodService {
  getPaymentMethodById(id: number): Promise<PaymentMethod>;
  getAllPaymentMethods(): Promise<PaymentMethod[]>;
  createPaymentMethod(data: PaymentMethodRequest): Promise<PaymentMethod>;
  updatePaymentMethod(id: number, data: PaymentMethodRequest): Promise<PaymentMethod>;
  deletePaymentMethod(id: number): Promise<void>;
  activatePaymentMethod(id: number): Promise<void>;
  searchPaymentMethods(
    page: number,
    size: number,
    name?: string,
    status?: boolean,
  ): Promise<PageResponse<PaymentMethodList>>
}
