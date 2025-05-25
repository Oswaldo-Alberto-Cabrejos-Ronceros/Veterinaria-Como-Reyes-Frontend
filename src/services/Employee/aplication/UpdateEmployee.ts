import type { Employee } from '@/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'

export class updateEmployee {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(employee: Employee, employeeId: number): Promise<Employee> {
    return await this.employeeService.updateEmployee(employee, employeeId)
  }
}
