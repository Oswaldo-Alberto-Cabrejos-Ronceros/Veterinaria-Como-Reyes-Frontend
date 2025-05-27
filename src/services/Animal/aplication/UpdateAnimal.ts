import type { Animal } from '../domain/models/Animal'
import type { AnimalService } from '../domain/services/AnimalService'

export class UpdateAnimal {
  constructor(private readonly animalService: AnimalService) {}
  async execute(animalId: number, animal: Animal): Promise<Animal> {
    return await this.animalService.updateAnimal(animalId, animal)
  }
}
