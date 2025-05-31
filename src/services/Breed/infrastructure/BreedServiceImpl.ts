import type { BreedService } from '../domain/services/BreedService'
import type { Breed } from '../domain/models/Breed'
import type { HttpClient } from '@/services/Http/model/HttpClient'

export class BreedServiceImpl implements BreedService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/breed'

  async getBreedById(breedId: number): Promise<Breed> {
    const response = await this.httpClient.get<Breed>(`${this.url}/${breedId}`)
    return response.data
  }

  async getAllBreeds(): Promise<Breed[]> {
    const response = await this.httpClient.get<Breed[]>(this.url)
    return response.data
  }

  async getBreedsBySpecie(specieId: number): Promise<Breed[]> {
    const response = await this.httpClient.get<Breed[]>(`${this.url}/specie/${specieId}`)
    return response.data
  }

  async createBreed(breed: Breed): Promise<Breed> {
    const response = await this.httpClient.post<Breed>(this.url, breed)
    return response.data
  }

  async updateBreed(breedId: number, breed: Breed): Promise<Breed> {
    const response = await this.httpClient.put<Breed>(`${this.url}/${breedId}`, breed)
    return response.data
  }

  async deleteBreed(breedId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${breedId}`)
  }
}
