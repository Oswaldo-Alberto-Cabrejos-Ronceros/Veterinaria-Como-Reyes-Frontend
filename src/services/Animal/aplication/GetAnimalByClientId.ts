import type { Animal } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class GetAnimalByClientId {
  constructor(private readonly animalService: AnimalService) {}
  async execute(clientId: number): Promise<Animal[]> {
    return await this.animalService.getAnimalByClientId(clientId)
  }
}
