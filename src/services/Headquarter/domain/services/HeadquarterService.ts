import type { Headquarter } from '../models/Headquarter'

export interface HeadquarterService {
  getAllHeadquarters(): Promise<Headquarter[]>

  getHeadquarterById(id: number): Promise<Headquarter>

  createHeadquarter(headquarter: Headquarter): Promise<Headquarter>

  updateHeadquarter(id: number, headquarter: Headquarter): Promise<Headquarter>

  deleteHeadquarter(id: number): Promise<void>
}
