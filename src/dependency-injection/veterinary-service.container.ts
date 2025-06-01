import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { CreateVeterinaryService } from '@/services/VeterinaryService/aplication/CreateVeterinaryService'
import { DeleteVeterinaryService } from '@/services/VeterinaryService/aplication/DeleteVeterinaryService'
import { GetAllVeterinaryServices } from '@/services/VeterinaryService/aplication/GetAllVeterinaryService'
import { GetVeterinaryServiceById } from '@/services/VeterinaryService/aplication/GetVeterinaryServiceById'
import { UpdateVeterinaryService } from '@/services/VeterinaryService/aplication/UpdateVeterinaryService'
import { VeterinaryServiceServiceImpl } from '@/services/VeterinaryService/infrastructure/VeterinaryServiceServiceImpl'

const axiosHttpClient = new AxiosHttpClient()
const veterinaryServiceService = new VeterinaryServiceServiceImpl(axiosHttpClient)

export const veterinaryServiceUsesCases = {
  createVeterinaryService: new CreateVeterinaryService(veterinaryServiceService),
  deleteVeterinaryService: new DeleteVeterinaryService(veterinaryServiceService),
  getAllVeterinaryServices: new GetAllVeterinaryServices(veterinaryServiceService),
  getVeterinaryServiceById: new GetVeterinaryServiceById(veterinaryServiceService),
  updateVeterinaryService: new UpdateVeterinaryService(veterinaryServiceService),
}
