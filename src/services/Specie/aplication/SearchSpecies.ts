import type { SpecieService } from '../domain/services/SpecieService'
import type { PageResponse } from '@/services/models/PageResponse'
import type { Specie } from '../domain/models/Specie'

export class SearchSpecies {
  constructor(private readonly service: SpecieService) {}

  execute(
    page: number,
    size: number,
    name?: string,
    status?: boolean
  ): Promise<PageResponse<Specie>> {
    return this.service.searchSpecies(page, size, name, status)
  }
}
