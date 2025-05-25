import type { PageResponse } from '@/services/models/PageResponse'
import type { EmployeeService } from '../domain/services/EmployeeService'
import type { Employee } from '../domain/models/Employee'


export class SearchEmployees {
  constructor(private readonly employeeService: EmployeeService) {}
  async execute(
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Employee>> {
    return await this.employeeService.searchEmployees(
      dni,
      name,
      lastName,
      status,
      headquarterId,
      page,
      size,
    )
  }
}
