import type { Animal,AnimalRequest } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class UpdateAnimal {
  constructor(private readonly animalService: AnimalService) {}
  async execute(animalId: number, animalRequest: AnimalRequest): Promise<Animal> {
    return await this.animalService.updateAnimal(animalId, animalRequest)
  }
}
