import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Animal } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class AnimalServiceImpl implements AnimalService {
  //inject httpClient
  constructor(private readonly httpClient: HttpClient) {}
  private urlBase = '/animal'
  async getAllAnimals(): Promise<Animal[]> {
    const response = await this.httpClient.get<Animal[]>(this.urlBase)
    return response.data
  }
  async getAnimalById(animalId: number): Promise<Animal> {
    const response = await this.httpClient.get<Animal>(`${this.urlBase}/${animalId}`)
    return response.data
  }
  async getAnimalByClientId(clientId: number): Promise<Animal[]> {
    const response = await this.httpClient.get<Animal[]>(`${this.urlBase}/client/${clientId}`)
    return response.data
  }

  async createAnimal(animal: Animal): Promise<Animal> {
    const response = await this.httpClient.post<Animal>(this.urlBase, animal)
    return response.data
  }
  async updateAnimal(animalId: number, animal: Animal): Promise<Animal> {
    const response = await this.httpClient.put<Animal>(`${this.urlBase}/${animalId}`, animal)
    return response.data
  }
  async deleteAnimal(animalId: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${animalId}`)
  }
}
