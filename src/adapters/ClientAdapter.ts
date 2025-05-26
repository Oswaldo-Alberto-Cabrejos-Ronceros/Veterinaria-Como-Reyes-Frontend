import type { Client } from '@/services/Client/domain/models/Client'
import type { Client as ClientView } from '@/models/Client'

export class ClientAdapter {
  static toClientView(client: Client): ClientView {
    return {
      clientId: client.clientId,
      dni: client.dni,
      names: client.name,
      lastnames: client.lastName,
      phone: client.phone,
      address: client.address,
      birthdate: client.birthDate,
      headquarter: {
        headquarterId: client.headquarter.headquarterId,
        name: client.headquarter.name,
      },
      user: {
        userId: client.user?.userId,
        email: client.user?.email
      },
    }
  }
}
