import type { Breed } from '../models/Breed'

export interface BreedService {
  getBreedById(breedId: number): Promise<Breed>
  getAllBreeds(): Promise<Breed[]>
  getBreedsBySpecie(specieId: number): Promise<Breed[]>
  createBreed(breed: Breed): Promise<Breed>
  updateBreed(breedId: number, breed: Breed): Promise<Breed>
  deleteBreed(breedId: number): Promise<void>
}

