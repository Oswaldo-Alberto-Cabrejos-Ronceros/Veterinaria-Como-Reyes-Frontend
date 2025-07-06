import type { SpecieService } from '../domain/services/SpecieService'
import type { Specie, SpecieRequest } from '../domain/models/Specie'
import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { PageResponse } from '@/services/models/PageResponse'

export class SpecieServiceImpl implements SpecieService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/species'

  async getSpecieById(specieId: number): Promise<Specie> {
    const response = await this.httpClient.get<Specie>(`${this.url}/${specieId}`)
    return response.data
  }

  async getAllSpecies(): Promise<Specie[]> {
    const response = await this.httpClient.get<Specie[]>(this.url)
    return response.data
  }

  async createSpecie(specieRequest: SpecieRequest): Promise<Specie> {
    const response = await this.httpClient.post<Specie>(this.url, specieRequest)
    return response.data
  }

  async updateSpecie(specieId: number, specieRequest: SpecieRequest): Promise<Specie> {
    const response = await this.httpClient.put<Specie>(`${this.url}/${specieId}`, specieRequest)
    return response.data
  }

  async deleteSpecie(specieId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${specieId}`)
  }
  async activateSpecie(specieId: number): Promise<void> {
    await this.httpClient.put(`${this.url}/${specieId}/activate`, {})
  }

  async searchSpecies(
    page: number,
    size: number,
    name?: string,
    status?: boolean
  ): Promise<PageResponse<Specie>> {
    const params: Record<string, string | number> = {
      page,
      size,
    }

    if (name) params.name = name
    if (status !== undefined) params.status = String(status)

    const response = await this.httpClient.get<PageResponse<Specie>>(
      `${this.url}/search`,
      params
    )
    return response.data
  }
}
