import { animalUsesCases } from '@/dependency-injection/animal.container'
import { useAsyncHandler } from './useAsyncHandler'
import { AnimalAdapter } from '@/adapters/AnimalAdapter'
import type { Animal } from '@/services/Animal/domain/models/Animal'
import type { Pet as PetView } from '@/models/Pet'

export function usePet() {
  const { loading, error, runUseCase } = useAsyncHandler()

  //create

  const deletePet = async (animalId: number): Promise<void> => {
    await runUseCase('deletePet', () => animalUsesCases.deleteAnimal.execute(animalId))
  }

  const getAllPets = async (): Promise<PetView[]> => {
    const animals: Animal[] = await runUseCase('getAllPets', () =>
      animalUsesCases.getAllAnimals.execute(),
    )
    return animals.map((animal) => AnimalAdapter.toPetView(animal))
  }

  const getPetByClientId = async (clientId: number): Promise<PetView[]> => {
    const animals: Animal[] = await runUseCase('getPetByClientId', () =>
      animalUsesCases.getAnimalByClientId.execute(clientId),
    )
    //adapt
    return animals.map((animal) => AnimalAdapter.toPetView(animal))
  }

  const getPetById = async (animalId: number): Promise<PetView> => {
    const animal: Animal = await runUseCase('getPetById', () =>
      animalUsesCases.getAnimalById.execute(animalId),
    )
    return AnimalAdapter.toPetView(animal)
  }

  //update

  return {
    loading,
    error,
    deletePet,
    getAllPets,
    getPetByClientId,
    getPetById,
  }
}
