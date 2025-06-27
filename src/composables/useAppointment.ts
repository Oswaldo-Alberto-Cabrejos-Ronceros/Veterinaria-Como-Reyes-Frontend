import { useAsyncHandler } from './useAsyncHandler'
import type { Appointment as AppointmentView } from '@/models/Appointment'
import { appointmentUsesCases } from '@/dependency-injection/appointment.container'
import { AppointmentAdapter } from '@/adapters/AppointmentAdapter'
import type { AppointmentRequest } from '@/services/Appointment/domain/models/Appointment'
import type { TimesForTurn as TimesForTurnView } from '@/models/TimesForTurn'
import { TimesForTurnAdapter } from '@/adapters/TimesForTurnAdapter'
import type { BasicServiceForAppointment as BasicServiceForAppointmentView } from '@/models/BasicServiceForAppointment'
import { BasicServiceForAppointmentAdapter } from '@/adapters/BasicServiceForAppoinment'
import { DateAdapter } from '@/adapters/DateAdapter'

export function useAppointment() {
  //get from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use casos

  const completeAppointment = async (appointmentId: number): Promise<AppointmentView> => {
    const appointment = await runUseCase('completeAppointment', () =>
      appointmentUsesCases.completeAppointment.execute(appointmentId),
    )
    return AppointmentAdapter.toAppointmentView(appointment)
  }

  const confirmAppointment = async (appointmentId: number): Promise<AppointmentView> => {
    const appointment = await runUseCase('confirmAppointment', () =>
      appointmentUsesCases.confirmAppointment.execute(appointmentId),
    )
    return AppointmentAdapter.toAppointmentView(appointment)
  }

  const createAppointment = async (
    appointmentRequest: AppointmentRequest,
  ): Promise<AppointmentView> => {
    const appointment = await runUseCase('createAppointment', () =>
      appointmentUsesCases.createAppointment.execute(appointmentRequest),
    )
    return AppointmentAdapter.toAppointmentView(appointment)
  }

  const deleteAppointment = async (appointmentId: number) => {
    await runUseCase('deleteAppointment', () =>
      appointmentUsesCases.deleteAppointment.execute(appointmentId),
    )
  }

  const getAllAppointments = async (): Promise<AppointmentView[]> => {
    const appointments = await runUseCase('getAllAppointments', () =>
      appointmentUsesCases.getAllAppointments.execute(),
    )
    return appointments.map((appointment) => AppointmentAdapter.toAppointmentView(appointment))
  }
  const getAvailableTimes = async (
    headquarterVetServiceId: number,
    date: Date,
  ): Promise<TimesForTurnView[]> => {
    const dateParsed = DateAdapter.toDateYYYYmmDD(date)
    const times = await runUseCase('getAvailableTimes', () =>
      appointmentUsesCases.getAvailableTimes.execute(headquarterVetServiceId, dateParsed),
    )
    return times.map((time) => TimesForTurnAdapter.toTimesForTurnView(time))
  }

  const getServicesByHeadquarterAndSpecies = async (
    headquarterId: number,
    speciesId: number,
  ): Promise<BasicServiceForAppointmentView[]> => {
    let services = await runUseCase('getServicesByHeadquarterAndSpecies', () =>
      appointmentUsesCases.getServicesByHeadquarterAndSpecies.execute(headquarterId, speciesId),
    )
    if(!services){
      services=[]
    }
    return services.map((service) =>
      BasicServiceForAppointmentAdapter.toBasicServiceForAppointmentView(service),
    )
  }

  const updateAppointment = async (
    appointmentId: number,
    appointmentRequest: AppointmentRequest,
  ): Promise<AppointmentView> => {
    const appointment = await runUseCase('updateAppointment', () =>
      appointmentUsesCases.updateAppointment.execute(appointmentId, appointmentRequest),
    )
    return AppointmentAdapter.toAppointmentView(appointment)
  }

  return {
    loading,
    error,
    completeAppointment,
    createAppointment,
    confirmAppointment,
    deleteAppointment,
    getAllAppointments,
    getAvailableTimes,
    getServicesByHeadquarterAndSpecies,
    updateAppointment,
  }
}
