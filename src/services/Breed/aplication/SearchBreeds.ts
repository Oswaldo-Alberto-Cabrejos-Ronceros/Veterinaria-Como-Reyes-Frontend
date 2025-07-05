import type { SearchBreedParams } from '../domain/models/SearchBreedParams'
import type { PageResponse } from '@/services/models/PageResponse'
import type { Breed } from '../domain/models/Breed'
import type { BreedService } from '../domain/services/BreedService'

export class SearchBreeds {
  constructor(private readonly service: BreedService) {}

  execute(params: SearchBreedParams): Promise<PageResponse<Breed>> {
    return this.service.searchBreeds(params)
  }
}
