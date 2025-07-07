import type { HttpClient } from '@/services/Http/model/HttpClient'
import type { Care, CareRequest, CareRequestCreate, CreateCareFromAppointmentRequest } from '../domain/models/Care'
import type { CareService } from '../domain/services/CareService'
import type { PageResponse } from '@/services/models/PageResponse'

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

  async  createCareFromAppointment(createCareFromAppointment: CreateCareFromAppointmentRequest): Promise<Care> {
    const response = await this.httpClient.post<Care>(`${this.urlBase}/from-appointment`,createCareFromAppointment)
    return response.data
  }

  async  createCareFromRequest(careRequest: CareRequestCreate): Promise<Care> {
    const response = await this.httpClient.post<Care>(`${this.urlBase}/from-request`,careRequest)
    return response.data
  }

  async searchCares(
    status?: string,
    fecha?: string,
    idHeadquarter?: number,
    idService?: number,
    page?: number,
    size?: number
  ): Promise<PageResponse<Care>> {
    const params = new URLSearchParams()

    if (status) params.append('estado', status)
    if (fecha) params.append('fecha', fecha)
    if (idHeadquarter !== undefined) params.append('idHeadquarter', idHeadquarter.toString())
    if (idService !== undefined) params.append('idService', idService.toString())
    if (page !== undefined) params.append('page', page.toString())
    if (size !== undefined) params.append('size', size.toString())

    const response = await this.httpClient.get<PageResponse<Care>>(
      `${this.urlBase}/search?${params.toString()}`
    )

    return response.data
  }
}
