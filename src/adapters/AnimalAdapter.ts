import type { Animal, AnimalRequest } from '@/services/Animal/domain/models/Animal'
import type { Pet as PetView } from '@/models/Pet'
import type { FormValues as PetAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-pet'
import { DateAdapter } from './DateAdapter'

export class AnimalAdapter {
  static toPetView(animal: Animal): PetView {
    return {
      id: animal.animalId,
      name: animal.name,
      gender: animal.gender,
      weight: animal.weight,
      birthdate: animal.birthDate,
      comment: animal.animalComment,
      urlImage: animal.urlImage,
      specie: {
        id: animal.breed.specie.specieId,
        name: animal.breed.specie.name,
      },
      breed: {
        id: animal.breed.breedId,
        name: animal.breed.name,
      },
      clientId: animal.clientId,
    }
  }
  static fromSchemaAddEditToPetRequest(schemaAddEdit: PetAddEditSchema): AnimalRequest {
    return {
      name: schemaAddEdit.name,
      gender: schemaAddEdit.gender,
      weight: schemaAddEdit.weight,
      birthDate: schemaAddEdit.birthdate
        ? DateAdapter.toDateYYYYmmDD(schemaAddEdit.birthdate)
        : undefined,
      animalComment: schemaAddEdit.comment,
      urlImage: schemaAddEdit.urlImage,
      breed: {
        breedId: schemaAddEdit.breedId,
      },
      //fix
      clientId: Number(schemaAddEdit.ownerDni),
    }
  }
}
