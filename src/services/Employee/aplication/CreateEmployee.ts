
import type { Employee } from '../domain/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'

export class CreateEmployee {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(employee: Employee): Promise<Employee> {
    return await this.employeeService.createEmployee(employee)
  }
}
