import type { HeadquarterVetService } from '@/services/HeadquarterVetService/domain/models/HeadquarterVetService'
import type { HeadquarterVetService as HeadquarterVetServiceView } from '@/models/HeadquarterVetService'
import { VeterinaryServiceAdapter } from './VeterinaryServiceAdapter'
import type { FormValues as AddHeadquarterVetServiceSchema} from '@/validation-schemas-forms/schema-add-headquarter-vet-service'
import type { HeadquarterVetServiceRequest } from '@/services/HeadquarterVetService/domain/models/HeadquarterVetService'
export class HeadquarterVetServiceAdapter {
  static toHeadquarterVetServiceView(
    headquarterVetService: HeadquarterVetService,
  ): HeadquarterVetServiceView {
    return {
      id: headquarterVetService.id,
      headquarterId: headquarterVetService.headquarterId,
      service: VeterinaryServiceAdapter.toView(headquarterVetService.service),
      simultaneousCapacity: headquarterVetService.simultaneousCapacity,
      status: headquarterVetService.status,
    }
  }
  static fromSchemaToRequest(schema:AddHeadquarterVetServiceSchema):HeadquarterVetServiceRequest{
    return{
        headquarterId: schema.headquarterId,
  service: {
    serviceId: schema.serviceId,
  },

  simultaneousCapacity: schema.simultaneousCapacity
    }
  }
}
