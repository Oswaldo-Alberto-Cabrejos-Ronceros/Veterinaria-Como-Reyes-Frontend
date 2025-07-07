import { GetAllCares } from '@/services/Care/aplication/GetAllCares'
import { GetCareById } from '@/services/Care/aplication/GetCareById'
import { GetCareByAppointment } from '@/services/Care/aplication/GetCareByAppointment'
import { CreateCare } from '@/services/Care/aplication/CreateCare'
import { CompleteCare } from '@/services/Care/aplication/CompleteCare'
import { UpdateCare } from '@/services/Care/aplication/UpdateCare'
import { CreateCareFromAppointment } from '@/services/Care/aplication/CreateCareFromAppointment'
import { CreateCareFromRequest } from '@/services/Care/aplication/CreateCareFromRequest'
import { SearchCares } from '@/services/Care/aplication/SearchCares'
import { CareServiceImpl } from '@/services/Care/infrastructure/CardServiceImpl'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'

// Instancia del cliente HTTP
const axiosHttpClient = new AxiosHttpClient()

// Instancia del servicio concreto de Care
const careService = new CareServiceImpl(axiosHttpClient)

// Exporta todos los casos de uso con la dependencia inyectada
export const careUsesCases = {
  getAllCares: new GetAllCares(careService),
  getCareById: new GetCareById(careService),
  getCareByAppointment: new GetCareByAppointment(careService),
  createCare: new CreateCare(careService),
  completeCare: new CompleteCare(careService),
  updateCare: new UpdateCare(careService),
  createCareFromAppointment: new CreateCareFromAppointment(careService),
  createCareFromRequest: new CreateCareFromRequest(careService),
  searchCares: new SearchCares(careService),
}
