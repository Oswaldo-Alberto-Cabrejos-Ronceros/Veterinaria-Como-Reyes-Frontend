import { clientUsesCases } from '@/dependency-injection/client.container'
import { useAsyncHandler } from './useAsyncHandler'
import type { Client } from '@/services/Client/domain/models/Client'
import type { Client as ClientView } from '@/models/Client'
import { ClientAdapter } from '@/adapters/ClientAdapter'
import type { FormValues as ClientAddSchema } from '@/validation-schemas-forms/schema-add-client'
import type { PageResponse } from '@/services/models/PageResponse'

export function useClient() {
  //from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases
  const blockClient = async (clientId: number, note: string) => {
    await runUseCase('blockClient', () => clientUsesCases.blockClient.execute(clientId, note))
  }

  //fix
  const createClient = async (clientAddSchema: ClientAddSchema): Promise<ClientView> => {
    const clientRequest = ClientAdapter.fromSchemaAddToClientRequest(clientAddSchema)
    const clientCreate: Client = await runUseCase('createClient', () =>
      clientUsesCases.createClient.execute(clientRequest),
    )
    //adapt
    return ClientAdapter.toClientView(clientCreate)
  }

  const deleteClient = async (clientId: number) => {
    await runUseCase('deleteClient', () => clientUsesCases.deleteClient.execute(clientId))
  }

  const getAllClients = async (): Promise<ClientView[]> => {
    const clients: Client[] = await runUseCase('getAllClients', () =>
      clientUsesCases.getAllClients.execute(),
    )
    return clients.map((client) => ClientAdapter.toClientView(client))
  }

  const getClientById = async (clientId: number): Promise<ClientView> => {
    const client: Client = await runUseCase('getClientById', () =>
      clientUsesCases.getClientById.execute(clientId),
    )
    return ClientAdapter.toClientView(client)
  }

  const myInfoAsClient = async (clientId: number): Promise<ClientView> => {
    const client: Client = await runUseCase('myInfoAsClient', () =>
      clientUsesCases.myInfoAsClient.execute(clientId),
    )
    return ClientAdapter.toClientView(client)
  }

  const searchClient = async (
    dni?: string,
    name?: string,
    lastName?: string,
    status?: boolean,
    headquarterId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<ClientView>> => {
    const pageClient = await runUseCase('searchClient', () =>
      clientUsesCases.searchClient.execute(dni, name, lastName, status, headquarterId, page, size),
    )
    const clientsView = pageClient.content.map((client) => ClientAdapter.toClientView(client))
    return {
      ...pageClient,
      content: clientsView,
    }
  }

  const updateBlockNote = async (clientId: number, blockNote: string): Promise<string> => {
    return await runUseCase('updateBlockNote', () =>
      clientUsesCases.updateBlockNote.execute(clientId, blockNote),
    )
  }

  //fix
  /*const updateClient = async (clientId: number, client: Client): Promise<ClientView> => {
    const clientUpdated = await runUseCase('updateClient', () =>
      clientUsesCases.updateClient.execute(clientId, client),
    )
    return ClientAdapter.toClientView(clientUpdated)
  }*/

  //fix
  const updateClientAsClient = async (clientId: number, client: Client): Promise<string> => {
    return await runUseCase('updateClientAsClient', () =>
      clientUsesCases.updateClientAsClient.execute(clientId, client),
    )
  }
  return{
    loading,
    error,
    blockClient,
    createClient,
    deleteClient,
    getAllClients,
    getClientById,
    myInfoAsClient,
    searchClient,
    updateBlockNote,

    updateClientAsClient
  }
}
