import type { AppointmentService } from '../domain/services/AppointmentService'
import type { AppointmentStatsForReceptionist } from '../domain/models/Appointment'

export class GetStatsForReceptionistUseCase {
  constructor(private readonly service: AppointmentService) {}

  async execute(): Promise<AppointmentStatsForReceptionist> {
    return await this.service.getStatsForReceptionist()
  }
}
