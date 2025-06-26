import type { Employee } from "./Employee"
import type { HeadquarterVetService } from "./HeadquarterVetService"
import type { Pet } from "./Pet"

export interface Appointment {
  id: number
  scheduleDateTime: string
  creationDate: string
  cancellationNote?: string
  statusAppointment: string
  headquarterVetService:HeadquarterVetService
  assignedEmployee:Employee
  pet:Pet
}
