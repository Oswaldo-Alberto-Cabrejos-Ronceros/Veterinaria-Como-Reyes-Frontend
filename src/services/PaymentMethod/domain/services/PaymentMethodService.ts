import type { PaymentMethod, PaymentMethodRequest } from '../models/PaymentMethod';

export interface PaymentMethodService {
  getPaymentMethodById(id: number): Promise<PaymentMethod>;
  getAllPaymentMethods(): Promise<PaymentMethod[]>;
  createPaymentMethod(data: PaymentMethodRequest): Promise<PaymentMethod>;
  updatePaymentMethod(id: number, data: PaymentMethodRequest): Promise<PaymentMethod>;
  deletePaymentMethod(id: number): Promise<void>;
}
