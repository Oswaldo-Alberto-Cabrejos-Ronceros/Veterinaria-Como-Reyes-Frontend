import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { CreateSpecie } from '@/services/Specie/aplication/CreateSpecie'
import { DeleteSpecie } from '@/services/Specie/aplication/DeleteSpecie'
import { GetAllSpecies } from '@/services/Specie/aplication/GetAllSpecies'
import { GetSpecieById } from '@/services/Specie/aplication/GetSpecieById'
import { UpdateSpecie } from '@/services/Specie/aplication/UpdateSpecie'
import { SpecieServiceImpl } from '@/services/Specie/infrastructure/SpecieServiceImpl'

//instantiete AxiosHttpCliente
const axiosHttpClient = new AxiosHttpClient()
//instantiete service implementation
const specieService = new SpecieServiceImpl(axiosHttpClient)

//expose uses cases

export const specieUsesCases = {
  //inject dependency
  createSpecie: new CreateSpecie(specieService),
  deleteSpecie: new DeleteSpecie(specieService),
  getAllSpecies: new GetAllSpecies(specieService),
  getSpecieById: new GetSpecieById(specieService),
  updateSpecie: new UpdateSpecie(specieService),
}
