import type { Headquarter } from '@/services/Headquarter/domain/models/Headquarter'
import type { Headquarter as HeadquarterView } from '@/models/Headquarter'
import type { FormValues as HeadquarterAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-headquarter'
import type { HeadquarterRequest } from '@/services/Headquarter/domain/models/Headquarter'

export class HeadquarterAdapter {
  static toHeadquarterView(headquarter: Headquarter): HeadquarterView {
    return {
      id: headquarter.headquarterId,
      name: headquarter.name,
      phone: headquarter.phone,
      address: headquarter.address,
      email: headquarter.email,
      district: headquarter.district,
      province: headquarter.province,
      departament: headquarter.department,
    }
  }
  static fromSchemaAddEditToHeadquarterRequest(
    schemaAddEdit: HeadquarterAddEditSchema,
  ): HeadquarterRequest {
    return {
      name: schemaAddEdit.name,
      phone: schemaAddEdit.phone,
      address: schemaAddEdit.address,
      email: schemaAddEdit.email,
      district: schemaAddEdit.district,
      province: schemaAddEdit.province,
      department: schemaAddEdit.departament,
    }
  }
}
