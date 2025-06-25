import type { AppointmentService } from '../domain/services/AppointmentService'

export class deleteAppointment {
  constructor(private readonly appointmentService: AppointmentService) {}
  async execute(appointmentId: number) {
    await this.appointmentService.deleteAppointment(appointmentId)
  }
}
