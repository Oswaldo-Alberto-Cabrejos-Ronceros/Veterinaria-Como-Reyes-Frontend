import type { Employee, EmployeeRequest } from '@/services/Employee/domain/models/Employee'
import type { Employee as EmployeeView } from '@/models/Employee'
import type { FormValues as EmployeeAddSchema } from '@/validation-schemas-forms/schema-add-employee'
import type { FormValues as EmployeeEditSchema } from '@/validation-schemas-forms/schema-edit.employee'
import { DateAdapter } from './DateAdapter'

export class EmployeeAdapter {
  //for adapt from employee to employeeView
  static toEmployeeView(employee: Employee): EmployeeView {
    return {
      userId: employee.user?.userId,
      employeeId: employee.employeeId,
      dni: employee.dni,
      cmvp: employee?.cmvp,
      names: employee.name,
      lastnames: employee.lastName,
      address: employee.address,
      phone: employee.phone,
      headquarter: {
        headquarterId: employee.headquarter.headquarterId,
        name: employee.headquarter.name,
      },
      birthdate: employee.birthDate,
      dirImage: employee.dirImage,
      roles: employee.roles,
    }
  }

  //para adaptar de schema add a EmployeeRequest
  static fromSchemaAddToEmployeeRequest(schemaAdd: EmployeeAddSchema): EmployeeRequest {
    return {
      dni: schemaAdd.dni,
      cmvp: schemaAdd.cmvp,
      name: schemaAdd.names,
      lastName: schemaAdd.lastnames,
      address: schemaAdd.address,
      phone: schemaAdd.phone,
      birthDate: DateAdapter.toDateYYYYmmDD(schemaAdd.birthdate),
      dirImage: schemaAdd.dirImage,
      headquarter: {
        headquarterId: schemaAdd.headquarterId,
      },
      user: {
        email: schemaAdd.email,
        password: schemaAdd.password,
      },
      roles: [
        {
          roleId: schemaAdd.roleId,
        },
      ],
    }
  }

  //para adaptar de schema edit a EmployeeRequest

  static fromSchemaEditToEmployeeRequest(schemaEdit: EmployeeEditSchema): EmployeeRequest {
    return {
      dni: schemaEdit.dni,
      cmvp: schemaEdit.cmvp,
      name: schemaEdit.names,
      lastName: schemaEdit.lastnames,
      address: schemaEdit.address,
      phone: schemaEdit.phone,
      birthDate: DateAdapter.toDateYYYYmmDD(schemaEdit.birthdate),
      dirImage: schemaEdit.dirImage,
      headquarter: {
        headquarterId: schemaEdit.headquarterId,
      },
      roles: [
        {
          roleId: schemaEdit.roleId,
        },
      ],
    }
  }
}
