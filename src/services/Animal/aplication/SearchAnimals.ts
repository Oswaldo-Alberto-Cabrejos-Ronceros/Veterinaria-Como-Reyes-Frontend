import type { PageResponse } from '@/services/models/PageResponse'
import type { SearchAnimalParams } from '../domain/models/SearchAnimalParams'
import type { Animal } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class SearchAnimals {
  constructor(private readonly service: AnimalService) {}

  execute(params: SearchAnimalParams): Promise<PageResponse<Animal>> {
    return this.service.searchAnimals(params)
  }
}
