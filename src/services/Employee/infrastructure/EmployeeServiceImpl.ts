import type { Employee } from '@/models/Employee'
import type { EmployeeService } from '../domain/services/EmployeeService'
import type { PageResponse } from '@/services/models/PageResponse'

export class EmployeeServiceImpl implements EmployeeService {
  getAllEmployees(): Promise<Employee[]> {
    throw new Error('Method not implemented.')
  }
  getEmployeeById(employeeId: number): Promise<Employee> {
    console.log(employeeId)
    throw new Error('Method not implemented.')
  }
  createEmployee(employee: Employee): Promise<Employee> {
    console.log(employee)
    throw new Error('Method not implemented.')
  }
  updateEmployee(employee: Employee): Promise<Employee> {
    console.log(employee)
    throw new Error('Method not implemented.')
  }
  blockEmployee(employeeId: number): Promise<void> {
    console.log(employeeId)
    throw new Error('Method not implemented.')
  }
  restoreEmployee(employeeId: number): Promise<void> {
    console.log(employeeId)
    throw new Error('Method not implemented.')
  }
  searchEmployees(
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Employee>> {
    console.log(dni, name, lastName, status, headquarterId, page, size)
    throw new Error('Method not implemented.')
  }
  getEmployeeMyInfo(employeeId: number): Promise<Employee> {
    console.log(employeeId)
    throw new Error('Method not implemented.')
  }
}
