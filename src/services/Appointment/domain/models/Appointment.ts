import type { Animal } from "@/services/Animal/domain/models/Animal"
import type { Employee } from "@/services/Employee/domain/models/Employee"
import type { VeterinaryService } from "@/services/VeterinaryService/domain/models/VeterinaryService"

export interface Appointment{
  appointmentId:number,
  scheduleDateTime:string,
  creationDate:string,
  cancellationNote?:string,
  statusAppointment:string,
  headquarterVetService:HeadquarterVetService,
  assignedEmployee:Employee,
  animal:Animal
}

export interface AppointmentRequest{
  scheduleDateTime:string,
  comment:string,
  headquarterVetServiceId:number,
  assignedEmployeeId:number,
  animalId:number,
  paymentMethodId:number
}

export interface HeadquarterVetService{
      id:number,
    headquarterId:number,
    service:VeterinaryService
}

export interface TimesForTurn{
  turn:string,
  times:FormatTime[]
}

export interface FormatTime{
  getTime:string,
  getTimeRange:string
}


export interface BasicServiceForAppointment{
  headquarterServiceId:number,
  name:string,
  description:string,
  price:number,
  duration:number
}
