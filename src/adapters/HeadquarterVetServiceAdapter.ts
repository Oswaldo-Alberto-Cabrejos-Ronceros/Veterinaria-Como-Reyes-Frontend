import type { HeadquarterVetService } from '@/services/HeadquarterVetService/domain/models/HeadquarterVetService'
import type { HeadquarterVetService as HeadquarterVetServiceView } from '@/models/HeadquarterVetService'
import { VeterinaryServiceAdapter } from './VeterinaryServiceAdapter'

export class HeadquarterVetServiceAdapter {
  static toHeadquarterVetServiceView(
    headquarterVetService: HeadquarterVetService,
  ): HeadquarterVetServiceView {
    return {
      id: headquarterVetService.id,
      headquarterId: headquarterVetService.headquarterId,
      service: VeterinaryServiceAdapter.toView(headquarterVetService.service),
    }
  }
}
