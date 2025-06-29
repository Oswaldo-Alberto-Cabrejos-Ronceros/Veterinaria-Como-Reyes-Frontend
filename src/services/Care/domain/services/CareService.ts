import type { Care, CareRequest } from '../models/Care'

export interface CareService {
  getAllCares(): Promise<Care[]>
  getCareById(id: number): Promise<Care>
  getCareByAppointment(id: number): Promise<Care[]>
  createCare(careRequest: CareRequest): Promise<Care>
  completeCare(id: number): Promise<Care>
  updateCare(id: number, careRequest: CareRequest): Promise<Care>
}
