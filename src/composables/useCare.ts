import { careUsesCases } from '@/dependency-injection/care.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { Care, Care as CareView } from '@/models/Care'
import { CareAdapter } from '@/adapters/CareAdapter'
import type { CareRequest } from '@/services/Care/domain/models/Care'
import type { FormValues as AddCareFromAppoinmentSchema } from '@/validation-schemas-forms/schema-add-care-from-appointment'
import type { FormValues as AddCareFromRequestSchema } from '@/validation-schemas-forms/schema-add-care'

export function useCare() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const getAllCares = async (): Promise<CareView[]> => {
    const cares = await runUseCase('getAllCares', () => careUsesCases.getAllCares.execute())
    return cares.map((care) => CareAdapter.toView(care))
  }

  const getCareById = async (id: number): Promise<CareView> => {
    const care = await runUseCase('getCareById', () => careUsesCases.getCareById.execute(id))
    return CareAdapter.toView(care)
  }

  const getCareByAppointment = async (id: number): Promise<CareView[]> => {
    const cares = await runUseCase('getCareByAppointment', () =>
      careUsesCases.getCareByAppointment.execute(id),
    )
    return cares.map((care) => CareAdapter.toView(care))
  }

  const createCare = async (careRequest: CareRequest): Promise<Care> => {
    const care = await runUseCase('createCare', () => careUsesCases.createCare.execute(careRequest))
    return CareAdapter.toView(care)
  }

  const completeCare = async (id: number): Promise<CareView> => {
    const care = await runUseCase('completeCare', () => careUsesCases.completeCare.execute(id))
    return CareAdapter.toView(care)
  }

  const updateCare = async (id: number, careRequest: CareRequest): Promise<CareView> => {
    const care = await runUseCase('updateCare', () =>
      careUsesCases.updateCare.execute(id, careRequest),
    )
    return CareAdapter.toView(care)
  }

  const createCareFromAppointment = async (
    schema: AddCareFromAppoinmentSchema,
  ): Promise<CareView> => {
    const careRequest = CareAdapter.fromSchemaToCreateCareFromAppointmentRequest(schema)
    const care = await runUseCase('createCareFromAppointment', () =>
      careUsesCases.createCareFromAppointment.execute(careRequest),
    )
    return CareAdapter.toView(care)
  }

  const createCareFromRequest = async (schema: AddCareFromRequestSchema): Promise<CareView> => {
    const careRequest = CareAdapter.fromSchemaToCareRequestCreate(schema)
    const care = await runUseCase('createCareFromRequest', () =>
      careUsesCases.createCareFromRequest.execute(careRequest),
    )
    return CareAdapter.toView(care)
  }

  return {
    loading,
    error,
    getAllCares,
    getCareById,
    getCareByAppointment,
    createCare,
    completeCare,
    updateCare,
    createCareFromAppointment,
    createCareFromRequest
  }
}
