export interface PaymentMethod {
  paymentMethodId: number;
  name: string;
  description?: string;
  status: boolean;
}

export interface PaymentMethodRequest {
  name: string;
  description?: string;
}
