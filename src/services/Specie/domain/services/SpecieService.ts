import type { Specie, SpecieRequest } from '../models/Specie'
import type { PageResponse } from '@/services/models/PageResponse'

export interface SpecieService {
  getSpecieById(specieId: number): Promise<Specie>
  getAllSpecies(): Promise<Specie[]>
  createSpecie(specieRequest: SpecieRequest): Promise<Specie>
  updateSpecie(specieId: number, specieRequest: SpecieRequest): Promise<Specie>
  deleteSpecie(specieId: number): Promise<void>
  activateSpecie(specieId: number): Promise<void>
  searchSpecies(
    page: number,
    size: number,
    name?: string,
    status?: boolean
  ): Promise<PageResponse<Specie>>
}
