import type { Animal } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class CreateAnimal {
  constructor(private readonly animalService: AnimalService) {}

  async execute(animal: Animal): Promise<Animal> {
    return await this.animalService.createAnimal(animal)
  }
}
