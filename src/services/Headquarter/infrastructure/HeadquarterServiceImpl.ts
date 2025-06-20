import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { HeadquarterService } from '../domain/services/HeadquarterService'
import type { Headquarter, HeadquarterRequest } from '../domain/models/Headquarter'

export class HeadquarterServiceImpl implements HeadquarterService {
  constructor(private readonly httpClient: HttpClient) {}

  private urlBase = '/headquarters'

  async getAllHeadquarters(): Promise<Headquarter[]> {
    const response = await this.httpClient.get<Headquarter[]>(this.urlBase)
    return response.data
  }

  async getHeadquarterById(id: number): Promise<Headquarter> {
    const response = await this.httpClient.get<Headquarter>(`${this.urlBase}/${id}`)
    return response.data
  }

  async createHeadquarter(headquarterRequest: HeadquarterRequest): Promise<Headquarter> {
    const response = await this.httpClient.post<Headquarter>(this.urlBase, headquarterRequest)
    return response.data
  }

  async updateHeadquarter(id: number, headquarterRequest: HeadquarterRequest): Promise<Headquarter> {
    const response = await this.httpClient.put<Headquarter>(`${this.urlBase}/${id}`, headquarterRequest)
    return response.data
  }

  async deleteHeadquarter(id: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${id}`)
  }
}
