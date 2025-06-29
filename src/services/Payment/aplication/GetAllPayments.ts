import type { PaymentService } from '../domain/services/PaymentService'

export class GetAllPayments {
  constructor(private readonly paymentService: PaymentService) {}

  async executer() {
    return this.paymentService.getAllPayments()
  }
}
