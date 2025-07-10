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


export interface CareList {
  careId: number
  careDateTime: string
  statusCare: string

  animalName: string
  animalSpecies: string
  animalBreed: string

  employeeFullName: string

  serviceName: string
  servicePrice: number

  headquarterName: string

  appointmentId: number
}


export interface RecentPatient {
  animalId: number;
  animalName: string;
  breedName: string;
  clientFullName: string;
  lastVisitDate: string;
  animalWeight: number;
  animalSex: string;
  animalBirthDate: string;
}
