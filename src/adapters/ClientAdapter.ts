import type { Client, ClientRequest } from '@/services/Client/domain/models/Client'
import type { Client as ClientView } from '@/models/Client'
import type { FormValues as ClientAddSchema } from '@/validation-schemas-forms/schema-add-client'
import { DateAdapter } from './DateAdapter'

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
        email: client.user?.email,
      },
    }
  }

  //para adaptar de schema add a ClientRequest
  static fromSchemaAddToClientRequest(schemaAdd: ClientAddSchema): ClientRequest {
    return {
      dni: schemaAdd.dni,
      name: schemaAdd.names,
      lastName: schemaAdd.lastnames,
      address: schemaAdd.address,
      phone: schemaAdd.phone,
      birthDate: DateAdapter.toDateYYYYmmDD(schemaAdd.birthdate),
      headquarter: {
        headquarterId: schemaAdd.headquarterId,
      },
      user: {
        email: schemaAdd.email,
        password: schemaAdd.password,
      },
    }
  }
}
