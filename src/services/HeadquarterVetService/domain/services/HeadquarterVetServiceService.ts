import type { HeadquarterVetService } from '../models/HeadquarterVetService'
import type { HeadquarterVetServiceRequest } from '../models/HeadquarterVetService'
import type { EmployeeBasicInfo } from '@/services/Employee/domain/models/Employee'

export interface HeadquarterVetServiceService {
  getAll(): Promise<HeadquarterVetService[]>
  getById(id: number): Promise<HeadquarterVetService>
  getByHeadquarter(headquarterId: number): Promise<HeadquarterVetService[]>
  create(request: HeadquarterVetServiceRequest): Promise<HeadquarterVetService>
  update(id: number, request: HeadquarterVetServiceRequest): Promise<HeadquarterVetService>
  delete(id: number): Promise<void>
  listVeterinariansByHeadVetService(headquarterVetServiceId: number): Promise<EmployeeBasicInfo[]>
  enableHeadquarterVetService(id: number): Promise<void>
  updateSimultaneousCapacity(id: number, capacity: number): Promise<void>
}
