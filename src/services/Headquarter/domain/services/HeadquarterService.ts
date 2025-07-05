import type { Headquarter, HeadquarterRequest } from '../models/Headquarter'

export interface HeadquarterService {
  getAllHeadquarters(): Promise<Headquarter[]>

  getHeadquarterById(id: number): Promise<Headquarter>

  createHeadquarter(headquarterRequest: HeadquarterRequest): Promise<Headquarter>

  updateHeadquarter(id: number, headquarterRequest: HeadquarterRequest): Promise<Headquarter>

  deleteHeadquarter(id: number): Promise<void>

  activateHeadquarter(id: number): Promise<void>
}
