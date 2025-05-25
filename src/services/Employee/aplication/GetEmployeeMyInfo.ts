import type { Employee } from '@/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'

export class GetEmployeeMyInfo {
  constructor(private readonly employeeService: EmployeeService) {}
  async execute(employeeId: number): Promise<Employee> {
    return await this.employeeService.getEmployeeMyInfo(employeeId)
  }
}
