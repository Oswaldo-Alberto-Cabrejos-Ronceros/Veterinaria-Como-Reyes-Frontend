import type { VeterinaryService, VeterinaryServiceRequest } from '@/services/VeterinaryService/domain/models/VeterinaryService'
import type { FormValues as VeterinaryServiceAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-service'
import type { Service as VeterinaryServiceView } from '@/models/Service'
import { DateAdapter } from './DateAdapter'

export class VeterinaryServiceAdapter {
  static toView(service: VeterinaryService): VeterinaryServiceView {
    return {
      id: service.serviceId!,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      dirImage: '',
      specie: service.specie.name,
      specieId: service.specie.specieId,
      category: service.category.name,
      categoryId: service.category.categoryId,
    }
  }

  static fromSchemaAddEditToRequest(
    schema: VeterinaryServiceAddEditSchema,
  ): VeterinaryServiceRequest {
    return {
      name: schema.name,
      description: schema.description,
      price: schema.price,
      duration: DateAdapter.toTimeHHmmSS(schema.duration),
      specieId: schema.specieId,
      categoryId: schema.categoryId,
    }
  }
}
