import type { PageResponse } from '@/services/models/PageResponse'
import type { Client,ClientRequest } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'
import type { HttpClient } from '@/services/Http/model/HttpClient'

export class ClientServiceImpl implements ClientService {
  //inject httpClient
  constructor(private readonly httpClient: HttpClient) {}
  private urlBase = '/client'

  async getClientById(clientId: number): Promise<Client> {
    const response = await this.httpClient.get<Client>(`${this.urlBase}/${clientId}`)
    return response.data
  }
  async searchClients(
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Client>> {
    const params = new URLSearchParams()

    //for dni
    if (dni) params.append('dni', dni)
    //for name
    if (name) params.append('name', name)
    //for lastname
    if (lastName) params.append('lastName', lastName)
    //for status
    if (status != undefined) params.append('status', String(status))
    //for headquarter
    if (headquarterId != undefined) params.append('headquarterId', String(headquarterId))
    //for page
    if (page != undefined) params.append('page', String(page))
    //for size
    if (size != undefined) params.append('size', String(size))

    const response = await this.httpClient.get<PageResponse<Client>>(
      `${this.urlBase}/search?${params.toString()}`,
    )
    return response.data
  }
  async createClient(clientRequest: ClientRequest): Promise<Client> {
    const response = await this.httpClient.post<Client>(this.urlBase, clientRequest)
    return response.data
  }
  async getAllClients(): Promise<Client[]> {
    const response = await this.httpClient.get<Client[]>(this.urlBase)
    return response.data
  }
  async updateClient(clientId: number,clientRequest: ClientRequest): Promise<Client> {
    const response = await this.httpClient.put<Client>(`${this.urlBase}/${clientId}`, clientRequest)
    return response.data
  }
  async blockClient(clientId: number, note: string): Promise<void> {
    await this.httpClient.patch<void>(`${this.urlBase}/${clientId}/block`, {
      note: note,
    })
  }
  async deleteClient(clientId: number): Promise<void> {
    await this.httpClient.delete<void>(`${this.urlBase}/${clientId}`)
  }
  async myInfoAsClient(clientId: number): Promise<Client> {
    const response = this.httpClient.get<Client>(`${this.urlBase}/${clientId}/my-info`)
    return (await response).data
  }
  async updateClientAsClient(clientId: number, client: Client): Promise<string> {
    const response = await this.httpClient.put<string>(
      `${this.urlBase}/${clientId}/update-my-info`,
      client,
    )
    return response.data
  }
  async updateBlockNote(clientId: number, blockNote: string): Promise<string> {
    const response = await this.httpClient.patch<string>(`${this.urlBase}/${clientId}/blockNote`, {
      blockNote: blockNote,
    })
    return response.data
  }
}
