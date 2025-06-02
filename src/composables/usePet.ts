import { animalUsesCases } from '@/dependency-injection/animal.container'
import { useAsyncHandler } from './useAsyncHandler'
import { AnimalAdapter } from '@/adapters/AnimalAdapter'
import type { Animal } from '@/services/Animal/domain/models/Animal'
import type { Pet as PetView } from '@/models/Pet'
import type { FormValues as PetAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-pet'

export function usePet() {
  const { loading, error, runUseCase } = useAsyncHandler()

  //create

  const createPet = async(petAddEditSchema:PetAddEditSchema):Promise<PetView>=>{
    const animalRequest = AnimalAdapter.fromSchemaAddEditToPetRequest(petAddEditSchema);
    const animal:Animal = await runUseCase('createPet',()=>
    animalUsesCases.createAnimal.execute(animalRequest)
    )
    return AnimalAdapter.toPetView(animal)
  }


  const deletePet = async (petId: number): Promise<void> => {
    await runUseCase('deletePet', () => animalUsesCases.deleteAnimal.execute(petId))
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

  const getPetById = async (petId: number): Promise<PetView> => {
    const animal: Animal = await runUseCase('getPetById', () =>
      animalUsesCases.getAnimalById.execute(petId),
    )
    return AnimalAdapter.toPetView(animal)
  }


  //update

    const updatePet = async(petId:number,petAddEditSchema:PetAddEditSchema):Promise<PetView>=>{
    const animalRequest = AnimalAdapter.fromSchemaAddEditToPetRequest(petAddEditSchema);
    const animal:Animal = await runUseCase('updatePet',()=>
    animalUsesCases.updateAnimal.execute(petId,animalRequest)
    )
    return AnimalAdapter.toPetView(animal)
  }


  return {
    loading,
    error,
    createPet,
    deletePet,
    getAllPets,
    getPetByClientId,
    getPetById,
    updatePet
  }
}
