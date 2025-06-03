import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'
import type { VeterinaryService, VeterinaryServiceRequest } from '../domain/models/VeterinaryService'
import type { HttpClient } from '@/services/Http/model/HttpClient'

export class VeterinaryServiceServiceImpl implements VeterinaryServiceService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/veterinary-services'

  async getVeterinaryServiceById(serviceId: number): Promise<VeterinaryService> {
    const response = await this.httpClient.get<VeterinaryService>(`${this.url}/${serviceId}`)
    return response.data
  }

  async getAllVeterinaryServices(): Promise<VeterinaryService[]> {
    const response = await this.httpClient.get<VeterinaryService[]>(this.url)
    return response.data
  }

  async getAllServicesBySpecie(specieId: number): Promise<VeterinaryService[]> {
    const response = await this.httpClient.get<VeterinaryService[]>(`${this.url}/specie/${specieId}`)
    return response.data
  }

  async getAllServicesByCategory(categoryId: number): Promise<VeterinaryService[]> {
    const response = await this.httpClient.get<VeterinaryService[]>(`${this.url}/category/${categoryId}`)
    return response.data
  }

  async createVeterinaryService(serviceRequest: VeterinaryServiceRequest): Promise<VeterinaryService> {
    const response = await this.httpClient.post<VeterinaryService>(this.url, serviceRequest)
    return response.data
  }

  async updateVeterinaryService(serviceId: number,serviceRequest: VeterinaryServiceRequest): Promise<VeterinaryService> {
    const response = await this.httpClient.put<VeterinaryService>(`${this.url}/${serviceId}`, serviceRequest)
    return response.data
  }

  async deleteVeterinaryService(serviceId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${serviceId}`)
  }
}
