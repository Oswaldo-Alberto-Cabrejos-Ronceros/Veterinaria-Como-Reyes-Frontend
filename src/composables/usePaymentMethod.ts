import { paymentMethodUseCases } from '@/dependency-injection/payment-method.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { PaymentMethod } from '@/services/PaymentMethod/domain/models/PaymentMethod'
import type { PaymentMethod as PaymentMethodView } from '@/models/PaymentMethod'
import type { FormValues as PaymentMethodSchema } from '@/validation-schemas-forms/schema-add-edit-payment-method'
import { PaymentMethodAdapter } from '@/adapters/PaymentMethodAdapter'
import type { PageResponse } from '@/services/models/PageResponse'

export function usePaymentMethod() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const createPaymentMethod = async (schema: PaymentMethodSchema): Promise<PaymentMethodView> => {
    const req = PaymentMethodAdapter.fromSchemaAddEditToRequest(schema)
    const res = await runUseCase('createPaymentMethod', () =>
      paymentMethodUseCases.createPaymentMethod.execute(req),
    )
    return PaymentMethodAdapter.toView(res)
  }

  const updatePaymentMethod = async (
    id: number,
    schema: PaymentMethodSchema,
  ): Promise<PaymentMethodView> => {
    const req = PaymentMethodAdapter.fromSchemaAddEditToRequest(schema)
    const res = await runUseCase('updatePaymentMethod', () =>
      paymentMethodUseCases.updatePaymentMethod.execute(id, req),
    )
    return PaymentMethodAdapter.toView(res)
  }

  const deletePaymentMethod = async (id: number) => {
    await runUseCase('deletePaymentMethod', () =>
      paymentMethodUseCases.deletePaymentMethod.execute(id),
    )
  }

  const getAllPaymentMethods = async (): Promise<PaymentMethodView[]> => {
    const methods: PaymentMethod[] = await runUseCase('getAllPaymentMethods', () =>
      paymentMethodUseCases.getAllPaymentMethods.execute(),
    )
    return methods.map(PaymentMethodAdapter.toView)
  }

  const getPaymentMethodById = async (id: number): Promise<PaymentMethodView> => {
    const method: PaymentMethod = await runUseCase('getPaymentMethodById', () =>
      paymentMethodUseCases.getPaymentMethodById.execute(id),
    )
    return PaymentMethodAdapter.toView(method)
  }

  const activatePaymentMethod = async (id: number): Promise<void> => {
    await runUseCase('activatePaymentMethod', () =>
      paymentMethodUseCases.activatePaymentMethod.execute(id),
    )
  }

  const searchPaymentMethods = async (
    page: number,
    size: number,
    name?: string,
    status?: boolean,
  ): Promise<PageResponse<PaymentMethodView>> => {
    const result = await runUseCase('searchPaymentMethod', () =>
      paymentMethodUseCases.searchPaymentMethod.execute(page, size, name, status),
    )
    return {
      ...result,
      content: result.content.map(PaymentMethodAdapter.toView),
    }
  }

  return {
    loading,
    error,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    getAllPaymentMethods,
    getPaymentMethodById,
    activatePaymentMethod,
    searchPaymentMethods,
  }
}
