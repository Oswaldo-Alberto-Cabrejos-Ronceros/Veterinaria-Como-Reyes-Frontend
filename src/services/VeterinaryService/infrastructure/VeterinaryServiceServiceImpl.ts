import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'
import type { VeterinaryService, VeterinaryServiceList, VeterinaryServiceRequest } from '../domain/models/VeterinaryService'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PageResponse } from '@/services/models/PageResponse'

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
  async activateVeterinaryService(serviceId: number): Promise<void> {
    await this.httpClient.put(`${this.url}/${serviceId}/activate`, {})
  }

  async searchVeterinaryServices(
    page: number,
    size: number,
    name?: string,
    specie?: string,
    category?: string,
    status?: boolean,
  ): Promise<PageResponse<VeterinaryServiceList>> {
    const params: Record<string, string | number> = {
      page,
      size,
    }

    if (name) params.name = name
    if (specie) params.specie = specie
    if (category) params.category = category
    if (status !== undefined) params.status = String(status)

    const response = await this.httpClient.get<PageResponse<VeterinaryServiceList>>(
      `${this.url}/search`,
      params
    )

    return response.data
  }

}
