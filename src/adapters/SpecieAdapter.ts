import type { Specie, SpecieRequest } from '@/services/Specie/domain/models/Specie'
import type { Specie as SpecieView } from '@/models/Specie'
import type { FormValues as SpecieAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-specie'

export class SpecieAdapter {
  static toSpecieView(specie: Specie): SpecieView {
    return {
      id: specie.specieId,
      name: specie.name,
      imagePath: specie.imagePath,
    }
  }
  //para adaptar de schema a SpecieRequest
  static fromSchemaAddEditToSpecieRequest(schemaAddEdit: SpecieAddEditSchema): SpecieRequest {
    return {
      name: schemaAddEdit.name,
      imagePath: schemaAddEdit.imagePath,
    }
  }
}
