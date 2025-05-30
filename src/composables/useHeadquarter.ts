import { headquarterUsesCases } from '@/dependency-injection/headquarter.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { Headquarter as HeadquarterView } from '@/models/Headquarter'
import type { Headquarter } from '@/services/Headquarter/domain/models/Headquarter'
import { HeadquarterAdapter } from '@/adapters/HeadquarterAdapter'

export function useHeadquarter() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases

  //create

  const deleteHeadquarter = async (headquarterId: number) => {
    await runUseCase('deleteHeadquarter', () =>
      headquarterUsesCases.deleteHeadquarter.execute(headquarterId),
    )
  }

  const getAllHeadquarters = async (): Promise<HeadquarterView[]> => {
    const headquarters: Headquarter[] = await runUseCase('getAllHeadquarters', () =>
      headquarterUsesCases.getAllHeadquarters.execute(),
    )
    //adapt
    return headquarters.map((headquarter) => HeadquarterAdapter.toHeadquarterView(headquarter))
  }

  const getHeadquarterById = async (headquarterId: number): Promise<HeadquarterView> => {
    const headquarter: Headquarter = await runUseCase('getHeadquarterById', () =>
      headquarterUsesCases.getHeadquarterById.execute(headquarterId),
    )
    return HeadquarterAdapter.toHeadquarterView(headquarter)
  }

  //update

  return {
    loading,
    error,
    deleteHeadquarter,
    getAllHeadquarters,
    getHeadquarterById,
  }
}
