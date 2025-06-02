import type { Animal,AnimalRequest } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class CreateAnimal {
  constructor(private readonly animalService: AnimalService) {}

  async execute(animalRequest: AnimalRequest): Promise<Animal> {
    return await this.animalService.createAnimal(animalRequest)
  }
}
