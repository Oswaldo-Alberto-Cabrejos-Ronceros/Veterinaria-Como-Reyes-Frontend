import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Care, CareRequest } from '../domain/models/Care'
import type { CareService } from '../domain/services/CareService'

export class CareServiceImpl implements CareService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly urlBase = `/cares`

  async getAllCares(): Promise<Care[]> {
    const response = await this.httpClient.get<Care[]>(this.urlBase)
    return response.data
  }

  async getCareById(id: number): Promise<Care> {
    const response = await this.httpClient.get<Care>(`${this.urlBase}/${id}`)
    return response.data
  }
  async getCareByAppointment(id: number): Promise<Care[]> {
    const response = await this.httpClient.get<Care[]>(`${this.urlBase}/appointment/${id}`)
    return response.data
  }
  async createCare(careRequest: CareRequest): Promise<Care> {
    const response = await this.httpClient.post<Care>(this.urlBase, careRequest)
    return response.data
  }
  async completeCare(id: number): Promise<Care> {
    const response = await this.httpClient.patch<Care>(`${this.urlBase}/${id}/complete`)
    return response.data
  }
  async updateCare(id: number, careRequest: CareRequest): Promise<Care> {
    const response = await this.httpClient.put<Care>(`${this.urlBase}/${id}`, careRequest)
    return response.data
  }
}
