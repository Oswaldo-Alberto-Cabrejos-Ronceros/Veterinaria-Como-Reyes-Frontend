import type { Employee } from '@/services/Employee/domain/models/Employee'
import type { Employee as EmployeeView } from '@/models/Employee'
export class EmployeeAdapter {
  //for adapt from employee to employeeView
  static toEmployeeView(employee: Employee): EmployeeView {
    return {
      userId: employee.user?.userId,
      employeeId: employee.employeeId,
      dni: employee.dni,
      cmvp: employee.cmvp,
      names: employee.name,
      lastnames: employee.lastName,
      address: employee.address,
      phone: employee.phone,
      headquarter: {
        headquarterId: employee.headquarter.headquarterId,
        name: employee.headquarter.name,
      },
      birthDate: employee.birthDate,
      dirImage: employee.dirImage,
      roles: employee.roles,
    }
  }
}
