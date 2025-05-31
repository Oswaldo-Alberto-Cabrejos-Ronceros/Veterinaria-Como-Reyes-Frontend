import type { SpecieService } from '../domain/services/SpecieService'
import type { Specie } from '../domain/models/Specie'
import type { HttpClient } from '@/services/Http/model/HttpClient'

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

  async createSpecie(specie: Specie): Promise<Specie> {
    const response = await this.httpClient.post<Specie>(this.url, specie)
    return response.data
  }

  async updateSpecie(specieId: number, specie: Specie): Promise<Specie> {
    const response = await this.httpClient.put<Specie>(`${this.url}/${specieId}`, specie)
    return response.data
  }

  async deleteSpecie(specieId: number): Promise<void> {
    await this.httpClient.delete(`${this.url}/${specieId}`)
  }
}
