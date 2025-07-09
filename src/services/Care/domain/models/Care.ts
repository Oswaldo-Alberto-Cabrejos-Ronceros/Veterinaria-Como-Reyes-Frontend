export interface Care {
  careId: number
  dateTime: string
  statusCare: string
  headquarterVetServiceId: number
  appointmentId?: number
  animalId: number,
  employeeId:number
}

export interface CareRequest {
  dateTime: string
  statusCare: string
  headquarterVetServiceId: number
  appointmentId?: number
  animalId: number
}


export interface CreateCareFromAppointmentRequest{
  appointmentId:number,
  employeeId:number
}

export interface CareRequestCreate {
  headquarterVetServiceId:number,
  animalId:number,
  employeeId:number
}

export interface  CareStatsToday {
  totalCares: number;
  todayCares: number;
}
