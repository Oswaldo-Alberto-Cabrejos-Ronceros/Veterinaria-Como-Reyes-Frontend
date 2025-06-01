import type { Client, ClientRequest } from '@/services/Client/domain/models/Client'
import type { Client as ClientView } from '@/models/Client'
import type { FormValues as ClientAddSchema } from '@/validation-schemas-forms/schema-add-client'
import type { FormValues as ClientEditSchema } from '@/validation-schemas-forms/schema-edit-client'
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

  //para adaptar de schema edit a ClientRequest
  static fromSchemaEditToClientRequest(schemaEdit: ClientEditSchema): ClientRequest {
    return {
      dni: schemaEdit.dni,
      name: schemaEdit.names,
      lastName: schemaEdit.lastnames,
      address: schemaEdit.address,
      phone: schemaEdit.phone,
      birthDate: DateAdapter.toDateYYYYmmDD(schemaEdit.birthdate),
      headquarter: {
        headquarterId: schemaEdit.headquarterId,
      },
    }
  }
}
