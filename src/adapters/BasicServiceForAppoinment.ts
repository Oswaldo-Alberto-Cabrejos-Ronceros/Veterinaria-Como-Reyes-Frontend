import type { BasicServiceForAppointment } from '@/services/Appointment/domain/models/Appointment'
import type { BasicServiceForAppointment as BasicServiceForAppointmentView } from '@/models/BasicServiceForAppointment'

export class BasicServiceForAppointmentAdapter {
  static toBasicServiceForAppointmentView(
    basicServiceForAppointment: BasicServiceForAppointment,
  ): BasicServiceForAppointmentView {
    return {
      id: basicServiceForAppointment.headquarterServiceId,
      name: basicServiceForAppointment.name,
      description: basicServiceForAppointment.description,
      price: basicServiceForAppointment.price,
      duration: basicServiceForAppointment.duration,
    }
  }
}
