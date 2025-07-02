import type { Care } from '@/services/Care/domain/models/Care'
import type { Care as CareView } from '@/models/Care'
import type { FormValues as AddCareFromAppoinmentSchema } from '@/validation-schemas-forms/schema-add-care-from-appointment'
import type { FormValues as AddCareFromRequestSchema } from '@/validation-schemas-forms/schema-add-care'
import type { CreateCareFromAppointmentRequest } from '@/services/Care/domain/models/Care'
import type { CareRequestCreate } from '@/services/Care/domain/models/Care'

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
  static fromSchemaToCreateCareFromAppointmentRequest(
    schema: AddCareFromAppoinmentSchema,
  ): CreateCareFromAppointmentRequest {
    return {
      appointmentId: schema.appointmentId,
      employeeId: schema.employeeId,
    }
  }

  static fromSchemaToCareRequestCreate(schema: AddCareFromRequestSchema): CareRequestCreate {
    return {
      headquarterVetServiceId: schema.headquarterVetServiceId,
      animalId: schema.petId,
      employeeId: schema.employeeId,
    }
  }
}
