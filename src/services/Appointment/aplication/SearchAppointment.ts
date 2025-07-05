import type { Appointment } from '../domain/models/Appointment'
import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchAppointmentParams } from '../domain/models/SearchAppointmentParams'
import type { AppointmentService } from '../domain/services/AppointmentService'

export class SearchAppointments {
  constructor(private readonly service: AppointmentService) {}

  execute(params: SearchAppointmentParams): Promise<PageResponse<Appointment>> {
    return this.service.searchAppointments(params)
  }
}
