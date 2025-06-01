export interface PaymentMethod {
  paymentMethodId?: number;
  name: string;
  description?: string;
}

export interface PaymentMethodRequest {
  name: string;
  description?: string;
}
