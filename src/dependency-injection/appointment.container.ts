import { CompleteAppointment } from '@/services/Appointment/aplication/CompleteAppointment'
import { ConfirmAppointment } from '@/services/Appointment/aplication/ConfirmAppointment'
import { CreateAppointment } from '@/services/Appointment/aplication/CreateAppointment'
import { DeleteAppointment } from '@/services/Appointment/aplication/DeleteAppointment'
import { GetAllAppointments } from '@/services/Appointment/aplication/GetAllAppointments'
import { GetAppointmentById } from '@/services/Appointment/aplication/GetAppointmentById'
import { GetAvailableTimes } from '@/services/Appointment/aplication/GetAvailableTimes'
import { GetServicesByHeadquarterAndSpecies } from '@/services/Appointment/aplication/GetServicesByHeadquarterAndSpecies'
import { UpdateAppointment } from '@/services/Appointment/aplication/UpdateAppointment'
import { GetAppointmentsForClient } from '@/services/Appointment/aplication/GetAppointmentsForClient'
import { SearchAppointments } from '@/services/Appointment/aplication/SearchAppointment'
import { AppointmentServiceImpl } from '@/services/Appointment/infrastructure/AppointmentServiceImpl'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'

// Instancia de cliente HTTP
const axiosHttpClient = new AxiosHttpClient()

// Instancia de implementación del servicio de citas
const appointmentService = new AppointmentServiceImpl(axiosHttpClient)

// Exposición de casos de uso con inyección de dependencias
export const appointmentUsesCases = {
  completeAppointment: new CompleteAppointment(appointmentService),
  confirmAppointment: new ConfirmAppointment(appointmentService),
  createAppointment: new CreateAppointment(appointmentService),
  deleteAppointment: new DeleteAppointment(appointmentService),
  getAllAppointments: new GetAllAppointments(appointmentService),
  getAppointmentById: new GetAppointmentById(appointmentService),
  getAvailableTimes: new GetAvailableTimes(appointmentService),
  getServicesByHeadquarterAndSpecies: new GetServicesByHeadquarterAndSpecies(appointmentService),
  updateAppointment: new UpdateAppointment(appointmentService),
  getAppointmentsForClient: new GetAppointmentsForClient(appointmentService),
  searchAppointment: new SearchAppointments(appointmentService),
}
