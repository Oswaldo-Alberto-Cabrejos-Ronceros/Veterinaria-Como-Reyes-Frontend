import type { Appointment } from "@/services/Appointment/domain/models/Appointment";
import type { Appointment as AppointmentView} from "@/models/Appointment";
import { HeadquarterVetServiceAdapter } from "./HeadquarterVetServiceAdapter";
import { EmployeeAdapter } from "./EmployeeAdapter";
import { AnimalAdapter } from "./AnimalAdapter";

export class AppointmentAdapter{
  static toAppointmentView(appoinment:Appointment):AppointmentView{
    return {
      id:appoinment.appointmentId,
      scheduleDateTime:appoinment.scheduleDateTime,
      creationDate:appoinment.creationDate,
      cancellationNote:appoinment.cancellationNote,
      statusAppointment:appoinment.statusAppointment,
      headquarterVetService:HeadquarterVetServiceAdapter.toHeadquarterVetServiceView(appoinment.headquarterVetService),
      assignedEmployee:EmployeeAdapter.toEmployeeView(appoinment.assignedEmployee),
      pet:AnimalAdapter.toPetView(appoinment.animal)
    }
  }
}
