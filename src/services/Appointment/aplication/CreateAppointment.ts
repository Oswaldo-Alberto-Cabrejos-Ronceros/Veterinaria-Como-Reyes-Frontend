import type { AppointmentRequest } from '../domain/models/Appointment'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class createAppointment {
  constructor(private readonly appointmentService: AppointmentService) {}
  async execute(appointmentRequest: AppointmentRequest) {
    return await this.appointmentService.createAppointment(appointmentRequest)
  }
}
