import type { PaymentMethod, PaymentMethodRequest } from '@/services/PaymentMethod/domain/models/PaymentMethod'
import type { PaymentMethod as PaymentMethodView } from '@/models/PaymentMethod'
import type { FormValues as PaymentMethodSchema } from '@/validation-schemas-forms/schema-add-edit-payment-method'

export class PaymentMethodAdapter {
  static toView(method: PaymentMethod): PaymentMethodView {
    return {
      id: method.paymentMethodId,
      name: method.name,
      description: method.description,
    }
  }

  static fromSchemaAddEditToRequest(schema: PaymentMethodSchema): PaymentMethodRequest {
    return {
      name: schema.name,
      description: schema.description,
    }
  }
}
