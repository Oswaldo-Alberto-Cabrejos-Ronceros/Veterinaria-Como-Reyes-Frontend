import type { Care } from '@/services/Care/domain/models/Care'
import type { Care as CareView } from '@/models/Care'

export class CareAdapter {
  static toView(care: Care): CareView {
    return {
      id: care.careId,
      dateTime: care.dateTime,
      statusCare: care.statusCare,
      headquarterVetService: {
        id: care.headquarterVetServiceId,
      },
      appointment: {
        id: care?.appointmentId,
      },
      pet: {
        id: care.animalId,
      },
    }
  }
}
