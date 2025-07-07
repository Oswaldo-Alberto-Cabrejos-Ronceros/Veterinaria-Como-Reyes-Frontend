import type { Appointment } from '@/services/Appointment/domain/models/Appointment'
import type { Appointment as AppointmentView } from '@/models/Appointment'
import { EmployeeAdapter } from './EmployeeAdapter'
import { AnimalAdapter } from './AnimalAdapter'
import type { AppointmentRequest } from '@/services/Appointment/domain/models/Appointment'
import type { AppointmentRequest as AppointmentRequestView } from '@/models/AppointmentRequest'
import type { InfoBasicAppointment } from '@/services/Appointment/domain/models/Appointment'
import type { InfoBasicAppointmentClient } from '@/models/InfoBasicAppointmentClient'
import { DateAdapter } from './DateAdapter'
import { FormatAdapter } from './FormatAdapter'
import type { AppointmentList as AppointmentListView } from '@/models/AppointmentList'
import type { AppointmentList } from '@/services/Appointment/domain/models/Appointment'

export class AppointmentAdapter {
  static toAppointmentView(appoinment: Appointment): AppointmentView {
    return {
      id: appoinment.appointmentId,
      scheduleDateTime: DateAdapter.fromISOFormalToStringFull(appoinment.scheduleDateTime),
      creationDate: DateAdapter.fromISOFormalToStringFull(appoinment.creationDate),
      cancellationNote: appoinment.cancellationNote,
      statusAppointment: FormatAdapter.toCaptalizeCaseWithout_(appoinment.statusAppointment),
      headquarterVetService: { id: appoinment.headquarterVetService.id },
      assignedEmployee: appoinment.assignedEmployee
        ? EmployeeAdapter.toEmployeeView(appoinment.assignedEmployee)
        : undefined,
      pet: AnimalAdapter.toPetView(appoinment.animal),
    }
  }
  static fromAppoinmentRequestViewToAppoinmentRequest(
    appointmentRequest: AppointmentRequestView,
  ): AppointmentRequest {
    return {
      scheduleDateTime: DateAdapter.fromDateAndTimeStringToString(
        appointmentRequest.date,
        appointmentRequest.time,
      ),
      comment: appointmentRequest?.comment,
      headquarterVetServiceId: appointmentRequest.headquarterVetServiceId,
      animalId: appointmentRequest.petId,
      paymentMethodId: appointmentRequest.paymentMethodId,
    }
  }

  static fromInfoBasicAppointmentToInfoBasicAppointmentInfoClient(
    infoBasicAppointment: InfoBasicAppointment,
  ): InfoBasicAppointmentClient {
    return {
      id: infoBasicAppointment.id,
      date: infoBasicAppointment.date,
      time: infoBasicAppointment.time,
      pet: {
        name: infoBasicAppointment.animalName,
      },
      service: {
        name: infoBasicAppointment.serviceName,
        description: infoBasicAppointment.serviceDescription,
        image: infoBasicAppointment.serviceImage,
      },
      categoryService: {
        name: infoBasicAppointment.categoryServiceName,
      },
      status: infoBasicAppointment.status,
      duration: infoBasicAppointment.duration,
    }
  }

  static fromAppointementListToAppointmentListView(
    appointmentList: AppointmentList,
  ): AppointmentListView {
    return {
      id: appointmentList.appointmentId,
      date: appointmentList.day,
      headquarter: appointmentList.headquarter,
      categoryService: appointmentList.categoryService,
      appointmentStatus: FormatAdapter.toCaptalizeCaseWithout_ (appointmentList.appointmentStatus),
    }
  }
}
