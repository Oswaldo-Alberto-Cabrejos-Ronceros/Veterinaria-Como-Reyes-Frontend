import type { Specie } from '../models/Specie'
import type { PageResponse } from '@/services/models/PageResponse'

export interface SpecieService {
  getSpecieById(specieId: number): Promise<Specie>
  getAllSpecies(): Promise<Specie[]>
  searchSpecies(name?: string, page?: number, size?: number): Promise<PageResponse<Specie>>
  createSpecie(specie: Specie): Promise<Specie>
  updateSpecie(specieId: number, specie: Specie): Promise<Specie>
  deleteSpecie(specieId: number): Promise<void>
}
