import type { PageResponse } from '@/services/models/PageResponse'
import type { Employee, EmployeeRequest, MyInfoEmployee } from '../models/Employee'

export interface EmployeeService {
  getAllEmployees(): Promise<Employee[]>
  getEmployeeById(employeeId: number): Promise<Employee>
  createEmployee(employeeRequest: EmployeeRequest): Promise<Employee>
  updateEmployee(employeeId: number, employeeRequest: EmployeeRequest): Promise<Employee>
  blockEmployee(employeeId: number): Promise<void>
  restoreEmployee(employeeId: number): Promise<void>
  searchEmployees(
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Employee>>
  getEmployeeMyInfo(employeeId: number): Promise<MyInfoEmployee>
}
