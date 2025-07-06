import type { HeadquarterVetService as HeadquarterVetServiceView } from '@/models/HeadquarterVetService'
import type { HeadquarterVetServiceRequest } from '@/services/HeadquarterVetService/domain/models/HeadquarterVetService'
import { useAsyncHandler } from './useAsyncHandler'
import { headquarterVetServiceUsesCases } from '@/dependency-injection/headquarter-vet-service.container'
import { HeadquarterVetServiceAdapter } from '@/adapters/HeadquarterVetServiceAdapter'
import type { EmployeeBasicInfo as EmployeeBasicInfoView } from '@/models/EmployeeBasicInfo'
import { EmployeeAdapter } from '@/adapters/EmployeeAdapter'

export function useHeadquarterVetService() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()
  //expose use casos
  const createHeadquarterVetService = async (
    request: HeadquarterVetServiceRequest,
  ): Promise<HeadquarterVetServiceView> => {
    const service = await runUseCase('createHeadquarterVetService', () =>
      headquarterVetServiceUsesCases.createHeadquarterVetService.execute(request),
    )
    return HeadquarterVetServiceAdapter.toHeadquarterVetServiceView(service)
  }

  const deleteHeadquarterVetService = async (id: number): Promise<void> => {
    await runUseCase('deleteHeadquarterVetService', () =>
      headquarterVetServiceUsesCases.deleteHeadquarterVetService.execute(id),
    )
  }

  const getAllHeadquarterVetService = async (): Promise<HeadquarterVetServiceView[]> => {
    const services = await runUseCase('getAllHeadquarterVetService', () =>
      headquarterVetServiceUsesCases.getAllHeadquarterVetService.execute(),
    )
    return services.map(HeadquarterVetServiceAdapter.toHeadquarterVetServiceView)
  }

  const getHeadquarterVetServiceByHeadquarter = async (
    headquarterId: number,
  ): Promise<HeadquarterVetServiceView[]> => {
    const services = await runUseCase('getHeadquarterVetServiceByHeadquarter', () =>
      headquarterVetServiceUsesCases.getHeadquarterVetServiceByHeadquarter.execute(headquarterId),
    )
    return services.map(HeadquarterVetServiceAdapter.toHeadquarterVetServiceView)
  }

  const getHeadquarterVetServiceById = async (id: number): Promise<HeadquarterVetServiceView> => {
    const service = await runUseCase('getHeadquarterVetServiceById', () =>
      headquarterVetServiceUsesCases.getHeadquarterVetServiceById.execute(id),
    )
    return HeadquarterVetServiceAdapter.toHeadquarterVetServiceView(service)
  }

  const listVeterinariansByHeadVetService = async (
    headquarterVetServiceId: number,
  ): Promise<EmployeeBasicInfoView[]> => {
    const employees = await runUseCase('listVeterinariansByHeadVetService', () =>
      headquarterVetServiceUsesCases.listVeterinariansByHeadVetService.execute(
        headquarterVetServiceId,
      ),
    )
    return employees.map(EmployeeAdapter.fromEmployeeBasicInfoToEmployeeBasicInfoView)
  }

  return {
    loading,
    error,
    createHeadquarterVetService,
    deleteHeadquarterVetService,
    getAllHeadquarterVetService,
    getHeadquarterVetServiceByHeadquarter,
    getHeadquarterVetServiceById,
    listVeterinariansByHeadVetService,
  }
}
