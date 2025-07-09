import type { Breed, BreedRequest } from '@/services/Breed/domain/models/Breed'
import type { Breed as BreedView } from '@/models/Breed'
import type { FormValues as BreedAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-breed'
import type { BreedList } from '@/models/BreedList'

export class BreedAdapter {
  static toBreedView(breed: Breed): BreedView {
    return {
      id: breed.breedId,
      name: breed.name,
      status: breed.status,
      specie: {
        id: breed.specie.specieId,
        name: breed.specie.name,
      },
    }
  }
  static fromSchemaAddEditToBreedRequest(schemaAddEdit: BreedAddEditSchema): BreedRequest {
    return {
      name: schemaAddEdit.name,
      specie: {
        specieId: schemaAddEdit.specieId,
      },
    }
  }
  static fromBreedListToBreedListView(breed: Breed): BreedList {
    return {
      id: breed.breedId,
      name: breed.name,
      specieName: breed.specie.name,
      status: String(breed.status),
    }
  }
}
