import type { SpecieService } from '../domain/services/SpecieService'
import type { Specie } from '../domain/models/Specie'

export class CreateSpecie {
  constructor(private readonly service: SpecieService) {}

  async execute(specie: Specie): Promise<Specie> {
    return await this.service.createSpecie(specie)
  }
}
