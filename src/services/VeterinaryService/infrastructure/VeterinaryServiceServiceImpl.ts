import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'
import type { VeterinaryService } from '../domain/models/VeterinaryService'
import type { HttpClient } from '@/services/Http/model/HttpClient'

export class VeterinaryServiceServiceImpl implements VeterinaryServiceService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/veterinary-services'

  async getById(serviceId: number): Promise<VeterinaryService> {
    const response = await this.httpClient.get<VeterinaryService>(`${this.url}/${serviceId}`)
    return response.data
  }

  async getAll(): Promise<VeterinaryService[]> {
    const response = await this.httpClient.get<VeterinaryService[]>(this.url)
    return response.data
  }

  async getBySpecie(specieId: number): Promise<VeterinaryService[]> {
    const response = await this.httpClient.get<VeterinaryService[]>(`${this.url}/specie/${specieId}`)
    return response.data
  }

  async getByCategory(categoryId: number): Promise<VeterinaryService[]> {
    const response = await this.httpClient.get<VeterinaryService[]>(`${this.url}/category/${categoryId}`)
    return response.data
  }

  async create(service: VeterinaryService): Promise<VeterinaryService> {
    const response = await this.httpClient.post<VeterinaryService>(this.url, service)
    return response.data
  }

  async update(serviceId: number, service: VeterinaryService): Promise<VeterinaryService> {
    const response = await this.httpClient.put<VeterinaryService>(`${this.url}/${serviceId}`, service)
    return response.data
  }

  async delete(serviceId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${serviceId}`)
  }
}
