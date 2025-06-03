import type { PageResponse } from '@/services/models/PageResponse'
import type { Client, ClientRequest } from '../models/Client'

export interface ClientService {
  getClientById(clientId: number): Promise<Client>
  searchClients(
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Client>>
  createClient(clientRequest: ClientRequest): Promise<Client>
  getAllClients(): Promise<Client[]>
  updateClient(clientId: number, clientRequest: ClientRequest): Promise<Client>
  blockClient(clientId: number, note: string): Promise<void>
  deleteClient(clientId: number): Promise<void>
  myInfoAsClient(clientId: number): Promise<Client>
  updateClientAsClient(clientId: number, client: Client): Promise<string>
  updateBlockNote(clientId: number, blockNote: string): Promise<string>
}
