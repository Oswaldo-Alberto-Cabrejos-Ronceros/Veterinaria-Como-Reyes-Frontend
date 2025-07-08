import type { PaymentInfoForAppointment } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class GetPaymentInfoForAppointment {
  constructor(private readonly appointmentService: AppointmentService) {}

  async execute(appointmentId: number): Promise<PaymentInfoForAppointment> {
    return await this.appointmentService.getPaymentInfo(appointmentId)
  }
}
