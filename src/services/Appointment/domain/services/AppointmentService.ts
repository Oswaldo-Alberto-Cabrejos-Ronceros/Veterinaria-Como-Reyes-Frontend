import type { Appointment, AppointmentRequest, BasicServiceForAppointment, TimesForTurn } from "../models/Appointment";

export interface AppointmentService{
  getAllAppointments():Promise<Appointment[]>
  getAppointmentById(appointmentId:number):Promise<Appointment>
  createAppointment(appointmentRequest:AppointmentRequest):Promise<Appointment>
  updateAppointment(appoinmentId:number,appointmentRequest:AppointmentRequest):Promise<Appointment>
  deleteAppointment(appoinmentId:number):Promise<void>
  confirmAppointment(appoinmentId:number):Promise<Appointment>
  completeAppointment(appoinmentId:number):Promise<Appointment>
  getAvailableTimes(headquarterVetServiceId:number,date:string):Promise<TimesForTurn[]>
  getServicesByHeadquarterAndSpecies(headquarterId:number,speciesId:number):Promise<BasicServiceForAppointment[]>
}
