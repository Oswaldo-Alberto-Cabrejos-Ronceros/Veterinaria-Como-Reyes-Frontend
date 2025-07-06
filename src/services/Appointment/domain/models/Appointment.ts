import type { Animal } from '@/services/Animal/domain/models/Animal'
import type { Employee } from '@/services/Employee/domain/models/Employee'

export interface Appointment {
  appointmentId: number
  scheduleDateTime: string
  creationDate: string
  cancellationNote?: string
  statusAppointment: string
  headquarterVetService: {id:number}
  assignedEmployee?: Employee
  animal: Animal
}

export interface AppointmentRequest {
  scheduleDateTime: string
  comment?: string
  headquarterVetServiceId: number
  animalId: number
  paymentMethodId: number
}


export interface TimesForTurn {
  turn: string
  times: FormatTime[]
}

export interface FormatTime {
  time: string
  timeRange: string
}

export interface BasicServiceForAppointment {
  headquarterServiceId: number
  serviceId:number
  name: string
  description: string
  price: string
  duration: number
  specieName:string
  serviceImageUrl:string
  categoryName:string
}


export interface InfoBasicAppointment{
  id:number
  date:string
  time:string
  animalName:string
  serviceName:string
  serviceDescription:string
  serviceImage:string
  categoryServiceName:string
  status:string
  duration:number
}
