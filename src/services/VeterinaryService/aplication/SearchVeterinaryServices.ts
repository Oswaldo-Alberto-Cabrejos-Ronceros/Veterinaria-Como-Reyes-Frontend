import type { VeterinaryServiceService } from '../domain/services/VeterinaryServiceService'
import type { PageResponse } from '@/services/models/PageResponse'
import type { VeterinaryServiceList } from '../domain/models/VeterinaryService'

export class SearchVeterinaryServices {
  constructor(private readonly service: VeterinaryServiceService) {}

  execute(
    page: number,
    size: number,
    name?: string,
    specie?: string,
    category?: string,
    status?: boolean,
  ): Promise<PageResponse<VeterinaryServiceList>> {
    return this.service.searchVeterinaryServices(page, size, name, specie, category, status)
  }
}
