import { animalUsesCases } from '@/dependency-injection/animal.container'
import { useAsyncHandler } from './useAsyncHandler'
import { AnimalAdapter } from '@/adapters/AnimalAdapter'
import type { Animal } from '@/services/Animal/domain/models/Animal'
import type { Pet as PetView } from '@/models/Pet'

export function usePet() {
  const { loading, error, runUseCase } = useAsyncHandler()

  //create

  const deleteAnimal = async (animalId: number): Promise<void> => {
    await runUseCase('deleteAnimal', () => animalUsesCases.deleteAnimal.execute(animalId))
  }

  const getAllAnimals = async (): Promise<PetView[]> => {
    const animals: Animal[] = await runUseCase('getAllAnimals', () =>
      animalUsesCases.getAllAnimals.execute(),
    )
    return animals.map((animal) => AnimalAdapter.toPetView(animal))
  }

  const getAnimalByClientId = async (clientId: number): Promise<PetView[]> => {
    const animals: Animal[] = await runUseCase('getAnimalByClientId', () =>
      animalUsesCases.getAnimalByClientId.execute(clientId),
    )
    //adapt
    return animals.map((animal) => AnimalAdapter.toPetView(animal))
  }

  const getAnimalById = async (animalId: number): Promise<PetView> => {
    const animal: Animal = await runUseCase('getAnimalById', () =>
      animalUsesCases.getAnimalById.execute(animalId),
    )
    return AnimalAdapter.toPetView(animal)
  }

  //update

  return {
    loading,
    error,
    deleteAnimal,
    getAllAnimals,
    getAnimalByClientId,
    getAnimalById,
  }
}
