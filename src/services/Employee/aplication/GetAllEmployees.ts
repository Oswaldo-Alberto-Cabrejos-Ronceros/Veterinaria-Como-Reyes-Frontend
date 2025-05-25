import type { Employee } from '@/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'

export class GetAllEmployees {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(): Promise<Employee[]> {
    return await this.employeeService.getAllEmployees()
  }
}
