import type { BreedService } from '../domain/services/BreedService'
import type { Breed, BreedRequest } from '../domain/models/Breed'
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

  async createBreed(breedRequest: BreedRequest): Promise<Breed> {
    const response = await this.httpClient.post<Breed>(this.url, breedRequest)
    return response.data
  }

  async updateBreed(breedId: number, breedRequest: BreedRequest): Promise<Breed> {
    const response = await this.httpClient.put<Breed>(`${this.url}/${breedId}`, breedRequest)
    return response.data
  }

  async deleteBreed(breedId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${breedId}`)
  }
}
