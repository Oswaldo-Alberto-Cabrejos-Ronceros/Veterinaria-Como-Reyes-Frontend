
import type { PageResponse } from "@/services/models/PageResponse";
import type { Employee } from "../models/Employee";

export interface EmployeeService{
  getAllEmployees():Promise<Employee[]>;
  getEmployeeById(employeeId:number):Promise<Employee>;
  createEmployee(employee:Employee):Promise<Employee>;
  updateEmployee(employee:Employee,employeeId:number):Promise<Employee>;
  blockEmployee(employeeId:number):Promise<void>;
  restoreEmployee(employeeId:number):Promise<void>;
  searchEmployees(dni?:string,name?:string,lastName?:string,status?:boolean,headquarterId?:number,page?:number,size?:number):Promise<PageResponse<Employee>>
  getEmployeeMyInfo(employeeId:number):Promise<Employee>;
}
