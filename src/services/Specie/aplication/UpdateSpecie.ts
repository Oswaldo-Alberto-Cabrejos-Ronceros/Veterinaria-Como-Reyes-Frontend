import type { SpecieService } from '../domain/services/SpecieService'
import type { Specie } from '../domain/models/Specie'

export class UpdateSpecie {
  constructor(private readonly service: SpecieService) {}

  async execute(specieId: number, specie: Specie): Promise<Specie> {
    return await this.service.updateSpecie(specieId, specie)
  }
}
