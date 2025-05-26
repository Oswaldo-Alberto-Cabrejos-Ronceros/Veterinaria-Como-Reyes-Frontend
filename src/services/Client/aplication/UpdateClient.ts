import type { Client } from '../domain/models/Client'
import type { ClientService } from '../domain/services/ClientService'

export class UpdateClient {
  constructor(private readonly clientService: ClientService) {}
  async execute(clientId: number, client: Client): Promise<Client> {
    return await this.clientService.updateClient(clientId, client)
  }
}
