import { useAsyncHandler } from './useAsyncHandler'
import { employeeUsesCases } from '@/dependency-injection/employee.container'
import { EmployeeAdapter } from '@/adapters/EmployeeAdapter'
import type { Employee } from '@/services/Employee/domain/models/Employee'
import type { Employee as EmployeeView } from '@/models/Employee'
import type { PageResponse } from '@/services/models/PageResponse'

export function useEmployee() {
  //fet from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases

  const blockEmployee = async (employeeId: number) => {
    await runUseCase('blockEmployee', () => employeeUsesCases.blockEmployee.execute(employeeId))
  }

  //create

  const getAllEmployees = async (): Promise<EmployeeView[]> => {
    const employees: Employee[] = await runUseCase('getAllEmployees', () =>
      employeeUsesCases.getAllEmployees.execute(),
    )
    //adapt
    return employees.map((employee) => EmployeeAdapter.toEmployeeView(employee))
  }

  const getEmployeeById = async (employeeId: number): Promise<EmployeeView> => {
    const employee: Employee = await runUseCase('getEmployeeById', () =>
      employeeUsesCases.getEmployeeById.execute(employeeId),
    )
    return EmployeeAdapter.toEmployeeView(employee)
  }

  const getEmployeeMyInfo = async (employeeId: number): Promise<EmployeeView> => {
    const employee: Employee = await runUseCase('getEmployeeMyInfo', () =>
      employeeUsesCases.getEmployeeMyInfo.execute(employeeId),
    )
    return EmployeeAdapter.toEmployeeView(employee)
  }

  const restoreEmployee = async (employeeId: number) => {
    await runUseCase('restoreEmployee', () => employeeUsesCases.restoreEmployee.execute(employeeId))
  }

  const searchEmployees = async (
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<EmployeeView>> => {
    const pageEmployee = await runUseCase('searchEmployees', () =>
      employeeUsesCases.searchEmployees.execute(
        dni,
        name,
        lastName,
        status,
        headquarterId,
        page,
        size,
      ),
    )
    const employeesView = pageEmployee.content.map((employee) =>
      EmployeeAdapter.toEmployeeView(employee),
    )
    return {
      ...pageEmployee,
      content: employeesView,
    }
  }

  //update

  return {
    loading,
    error,
    blockEmployee,
    getAllEmployees,
    getEmployeeById,
    getEmployeeMyInfo,
    restoreEmployee,
    searchEmployees,
  }
}
