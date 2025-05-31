import { specieUsesCases } from '@/dependency-injection/specie.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { Specie } from '@/services/Specie/domain/models/Specie'
import { SpecieAdapter } from '@/adapters/SpecieAdapter'
import type { Specie as SpecieView } from '@/models/Specie'

export function useSpecie() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases

  //create

  const deleteSpecie = async (specieId: number) => {
    await runUseCase('deleteSpecie', () => specieUsesCases.deleteSpecie.execute(specieId))
  }

  const getAllSpecies = async (): Promise<SpecieView[]> => {
    const species: Specie[] = await runUseCase('getAllSpecies', () =>
      specieUsesCases.getAllSpecies.execute(),
    )
    //adapt
    return species.map((specie) => SpecieAdapter.toSpecieView(specie))
  }

  const getSpecieById = async (specieId: number): Promise<SpecieView> => {
    const specie: Specie = await runUseCase('getSpecieById', () =>
      specieUsesCases.getSpecieById.execute(specieId),
    )
    return SpecieAdapter.toSpecieView(specie)
  }

  //update

  return {
    loading,
    error,
    deleteSpecie,
    getAllSpecies,
    getSpecieById,
  }
}
