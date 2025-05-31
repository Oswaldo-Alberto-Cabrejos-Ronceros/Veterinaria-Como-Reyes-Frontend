import type { BreedService } from '../domain/services/BreedService'
import type { Breed } from '../domain/models/Breed'

export class UpdateBreed {
  constructor(private readonly service: BreedService) {}

  async execute(id: number, breed: Breed): Promise<Breed> {
    return await this.service.updateBreed(id, breed)
  }
}
