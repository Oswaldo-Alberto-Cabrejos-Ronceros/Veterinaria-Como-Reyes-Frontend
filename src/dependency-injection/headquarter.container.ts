import { CreateHeadquarter } from '@/services/Headquarter/aplication/CreateHeadquarter'
import { DeleteHeadquarter } from '@/services/Headquarter/aplication/DeleteHeadquarter'
import { GetAllHeadquarters } from '@/services/Headquarter/aplication/GetAllHeadquarters'
import { GetHeadquarterById } from '@/services/Headquarter/aplication/getHeadquarterById'
import { UpdateHeadquarter } from '@/services/Headquarter/aplication/UpdateHeadquarter'
import { HeadquarterServiceImpl } from '@/services/Headquarter/infrastructure/HeadquarterServiceImpl'
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'

//instantiete AxiosHttpCliente
const axiosHttpClient = new AxiosHttpClient()
//instantiete service implementation
const headquarterService = new HeadquarterServiceImpl(axiosHttpClient)

//exporse uses cases

export const headquarterUsesCases = {
  //inject dependency
  createHeadquarter: new CreateHeadquarter(headquarterService),
  deleteHeadquarter: new DeleteHeadquarter(headquarterService),
  getAllHeadquarters: new GetAllHeadquarters(headquarterService),
  getHeadquarterById: new GetHeadquarterById(headquarterService),
  updateHeadquarter: new UpdateHeadquarter(headquarterService),
}
