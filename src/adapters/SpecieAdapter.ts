import type { Specie } from '@/services/Specie/domain/models/Specie'
import type { Specie as SpecieView } from '@/models/Specie'

export class SpecieAdapter {
  static toSpecieView(specie: Specie): SpecieView {
    return {
      id: specie.specieId,
      name: specie.name,
      imagePath: specie.imagePath,
    }
  }
}
