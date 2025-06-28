import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { VeterinaryRecordRequest, VeterinaryRecord } from '../domain/models/VeterinaryRecord'
import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'

export class VeterinaryRecordServiceImpl implements VeterinaryRecordService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url = '/veterinary-records'

  async create(veterinaryRecordRequest: VeterinaryRecordRequest): Promise<VeterinaryRecord> {
    const response = await this.httpClient.post<VeterinaryRecord>(this.url, veterinaryRecordRequest)
    return response.data
  }
  async update(
    id: number,
    veterinaryRecordRequest: VeterinaryRecordRequest,
  ): Promise<VeterinaryRecord> {
    const response = await this.httpClient.put<VeterinaryRecord>(
      `${this.url}/${id}`,
      veterinaryRecordRequest,
    )
    return response.data
  }
  async findAll(): Promise<VeterinaryRecord[]> {
    const response = await this.httpClient.get<VeterinaryRecord[]>(this.url)
    return response.data
  }
  async findById(id: number): Promise<VeterinaryRecord> {
    const response = await this.httpClient.get<VeterinaryRecord>(`${this.url}/${id}`)
    return response.data
  }

  async setEnCurso(id: number): Promise<VeterinaryRecord> {
    const response = await this.httpClient.patch<VeterinaryRecord>(`${this.url}/${id}/status/curso`)
    return response.data
  }

  async setCompletado(id: number): Promise<VeterinaryRecord> {
    const response = await this.httpClient.patch<VeterinaryRecord>(
      `${this.url}/${id}/status/completado`,
    )
    return response.data
  }
  async setObservacion(id: number): Promise<VeterinaryRecord> {
    const response = await this.httpClient.patch<VeterinaryRecord>(
      `${this.url}/${id}/status/observacion`,
    )
    return response.data
  }
  async getAllInfoVeterinaryRecordsByAnimal(
    animalId: number,
    page?: number,
    size?: number,
  ): Promise<VeterinaryRecord[]> {
    const params = new URLSearchParams()
    if (page) params.append('page', String(page))
    if (size) params.append('size', String(size))
    const response = await this.httpClient.get<VeterinaryRecord[]>(
      `${this.url}/${animalId}?${params.toString()}`,
    )
    return response.data
  }
}
