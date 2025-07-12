import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchAppointmentParams } from '../models/SearchAppointmentParams'

import type {
  AnimalInfoForAppointment,
  Appointment,
  AppointmentInfoPanelAdmin,
  AppointmentList,
  AppointmentRequest,
  AppointmentStatsForReceptionist,
  AppointmentStatsToday,
  BasicServiceForAppointment,
  CareAndAppointmentPanelEmployee,
  ClientInfoForAppointment,
  InfoAppointmentForPanel,
  InfoBasicAppointment,
  PaymentInfoForAppointment,
  TimesForTurn,
} from '../models/Appointment'

export interface AppointmentService {
  getAllAppointments(): Promise<Appointment[]>
  getAppointmentById(appointmentId: number): Promise<Appointment>
  createAppointment(appointmentRequest: AppointmentRequest): Promise<Appointment>
  updateAppointment(
    appoinmentId: number,
    appointmentRequest: AppointmentRequest,
  ): Promise<Appointment>
  deleteAppointment(appoinmentId: number): Promise<void>
  confirmAppointment(appoinmentId: number): Promise<Appointment>
  completeAppointment(appoinmentId: number): Promise<Appointment>
  getAvailableTimes(headquarterVetServiceId: number, date: string): Promise<TimesForTurn[]>
  getServicesByHeadquarterAndSpecies(
    headquarterId: number,
    speciesId: number,
  ): Promise<BasicServiceForAppointment[]>
  getAppointmentsForClient(clientId: number): Promise<InfoBasicAppointment[]>
  searchAppointments(params: SearchAppointmentParams): Promise<PageResponse<AppointmentList>>
  getAppointmentPanelInfo(appointmentId: number): Promise<InfoAppointmentForPanel>
  getAnimalInfo(appointmentId: number): Promise<AnimalInfoForAppointment>
  getClientInfo(appointmentId: number): Promise<ClientInfoForAppointment>
  getPaymentInfo(appointmentId: number): Promise<PaymentInfoForAppointment>
  getTodayAppointmentStats(): Promise<AppointmentStatsToday>
  getTodayAppointmentStats(): Promise<AppointmentStatsToday>
  getAppointmentsByDateForPanelAdmin(): Promise<AppointmentInfoPanelAdmin[]>
  getAppointmentsByDateForPanelManager(headquarterId: number): Promise<AppointmentInfoPanelAdmin[]>
  getTodayAppointmentStatsByHeadquarter(headquarterId: number): Promise<AppointmentStatsToday>
  getCareAndAppointmentsForEmployee(employeeId: number): Promise<CareAndAppointmentPanelEmployee[]>
  getStatsForReceptionist(headquarterId:number): Promise<AppointmentStatsForReceptionist>
  getAppointmentsByHeadquarterId(headquarterId: number): Promise<CareAndAppointmentPanelEmployee[]>

}
