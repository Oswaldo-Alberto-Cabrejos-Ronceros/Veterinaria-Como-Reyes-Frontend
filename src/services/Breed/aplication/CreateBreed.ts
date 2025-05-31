import type { BreedService } from '../domain/services/BreedService'
import type { Breed } from '../domain/models/Breed'

export class CreateBreed {
  constructor(private readonly service: BreedService) {}

  async execute(breed: Breed): Promise<Breed> {
    return await this.service.createBreed(breed)
  }
}
