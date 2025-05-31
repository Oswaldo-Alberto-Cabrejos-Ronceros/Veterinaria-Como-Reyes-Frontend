import type { Specie } from '../models/Specie'

export interface SpecieService {
  getSpecieById(specieId: number): Promise<Specie>
  getAllSpecies(): Promise<Specie[]>
  createSpecie(specie: Specie): Promise<Specie>
  updateSpecie(specieId: number, specie: Specie): Promise<Specie>
  deleteSpecie(specieId: number): Promise<void>
}
