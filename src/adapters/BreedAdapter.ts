import type { Breed } from '@/services/Breed/domain/models/Breed'
import type { Breed as BreedView } from '@/models/Breed'

export class BreedAdapter {
  static toBreedView(breed: Breed): BreedView {
    return {
      id: breed.breedId,
      name: breed.name,
      specie: {
        id: breed.specie.specieId,
        name: breed.specie.name,
      },
    }
  }
}
