import type { Client } from "../domain/models/Client";
import type { ClientService } from "../domain/services/ClientService";

export class CreateClient{
  constructor(private readonly clientService:ClientService){}

  async execute(client:Client):Promise<Client> {
    return await this.clientService.createClient(client)
  }
}
