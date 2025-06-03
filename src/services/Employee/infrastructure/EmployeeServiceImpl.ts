import type { EmployeeService } from '../domain/services/EmployeeService'
import type { PageResponse } from '@/services/models/PageResponse'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Employee, EmployeeRequest, MyInfoEmployee } from '../domain/models/Employee'

export class EmployeeServiceImpl implements EmployeeService {
  //inject httpClient
  constructor(private readonly httpClient: HttpClient) {}
  private urlBase = '/employee'

  async getAllEmployees(): Promise<Employee[]> {
    const response = await this.httpClient.get<Employee[]>(this.urlBase)
    return response.data
  }
  async getEmployeeById(employeeId: number): Promise<Employee> {
    const response = await this.httpClient.get<Employee>(`${this.urlBase}/${employeeId}`)
    return response.data
  }
  async createEmployee(employeeRequest: EmployeeRequest): Promise<Employee> {
    const response = await this.httpClient.post<Employee>(this.urlBase, employeeRequest)
    return response.data
  }
  async updateEmployee(employeeId: number, employeeRequest: EmployeeRequest): Promise<Employee> {
    const response = await this.httpClient.put<Employee>(
      `${this.urlBase}/${employeeId}`,
      employeeRequest,
    )
    return response.data
  }
  async blockEmployee(employeeId: number): Promise<void> {
    await this.httpClient.patch(`${this.urlBase}/${employeeId}/block`)
  }
  async restoreEmployee(employeeId: number): Promise<void> {
    console.log(employeeId)
    await this.httpClient.patch(`${this.urlBase}/${employeeId}/restore`)
  }
  async searchEmployees(
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Employee>> {
    //params for url
    const params = new URLSearchParams()

    //for dni
    if (dni) params.append('dni', dni)
    //for name
    if (name) params.append('name', name)
    //for lastname
    if (lastName) params.append('lastName', lastName)
    //for status
    if (status != undefined) params.append('status', String(status))
    //for headquarter
    if (headquarterId != undefined) params.append('headquarterId', String(headquarterId))
    //for page
    if (page != undefined) params.append('page', String(page))
    //for size
    if (size != undefined) params.append('size', String(size))
    const response = await this.httpClient.get<PageResponse<Employee>>(
      `${this.urlBase}/search?${params.toString()}`,
    )
    return response.data
  }
  async getEmployeeMyInfo(employeeId: number): Promise<MyInfoEmployee> {
    const response = await this.httpClient.get<MyInfoEmployee>(`${this.urlBase}/${employeeId}/myInfo`)
    return response.data
  }
}
