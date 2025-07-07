import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { AppointmentService } from '../domain/services/AppointmentService'
import type {
  Appointment,
  AppointmentRequest,
  TimesForTurn,
  BasicServiceForAppointment,
  InfoBasicAppointment,
  AppointmentList,
} from '../domain/models/Appointment'
import type { SearchAppointmentParams } from '../domain/models/SearchAppointmentParams'
import type { PageResponse } from '@/services/models/PageResponse'

export class AppointmentServiceImpl implements AppointmentService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/appointments'

  async getAllAppointments(): Promise<Appointment[]> {
    const response = await this.httpClient.get<Appointment[]>(`${this.url}`)
    return response.data
  }

  async getAppointmentById(appointmentId: number): Promise<Appointment> {
    const response = await this.httpClient.get<Appointment>(`${this.url}/${appointmentId}`)
    return response.data
  }
  async createAppointment(appointmentRequest: AppointmentRequest): Promise<Appointment> {
    const response = await this.httpClient.post<Appointment>(`${this.url}`, appointmentRequest)
    return response.data
  }
  async updateAppointment(
    appoinmentId: number,
    appoimentRequest: AppointmentRequest,
  ): Promise<Appointment> {
    const response = await this.httpClient.put<Appointment>(
      `${this.url}/${appoinmentId}`,
      appoimentRequest,
    )
    return response.data
  }
  async deleteAppointment(appoinmentId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${appoinmentId}`)
  }
  async confirmAppointment(appoinmentId: number): Promise<Appointment> {
    const response = await this.httpClient.patch<Appointment>(`${this.url}/${appoinmentId}/confirm`)
    return response.data
  }
  async completeAppointment(appoinmentId: number): Promise<Appointment> {
    const response = await this.httpClient.patch<Appointment>(
      `${this.url}/${appoinmentId}/complete`,
    )
    return response.data
  }
  async getAvailableTimes(headquarterVetServiceId: number, date: string): Promise<TimesForTurn[]> {
    const params = new URLSearchParams()
    //for headquarterVetServiceI
    params.append('headquarterVetServiceId', headquarterVetServiceId.toString())
    params.append('date', date)
    const response = await this.httpClient.get<TimesForTurn[]>(
      `${this.url}/available-times?${params.toString()}`,
    )
    return response.data
  }
  async getServicesByHeadquarterAndSpecies(
    headquarterId: number,
    speciesId: number,
  ): Promise<BasicServiceForAppointment[]> {
    const params = new URLSearchParams()
    params.append('headquarterId', headquarterId.toString())
    params.append('speciesId', speciesId.toString())
    const response = await this.httpClient.get<BasicServiceForAppointment[]>(
      `${this.url}/services?${params.toString()}`,
    )
    return response.data
  }

  async getAppointmentsForClient(clientId: number): Promise<InfoBasicAppointment[]> {
    const response = await this.httpClient.get<InfoBasicAppointment[]>(
      `${this.url}/client/${clientId}/panel`,
    )
    return response.data
  }

  async searchAppointments(params: SearchAppointmentParams): Promise<PageResponse<AppointmentList>> {
    const queryParams: Record<string, string | number> = {}

    if (params.day) queryParams.day = params.day
    if (params.headquarter) queryParams.headquarter = params.headquarter
    if (params.categoryService) queryParams.categoryService = params.categoryService
    if (params.appointmentStatus) queryParams.appointmentStatus = params.appointmentStatus
    if (params.page !== undefined) queryParams.page = params.page
    if (params.size !== undefined) queryParams.size = params.size
    if (params.sort) queryParams.sort = params.sort

    const response = await this.httpClient.get<PageResponse<AppointmentList>>(
      `${this.url}/search`,
      queryParams,
    )
    return response.data
  }
}
