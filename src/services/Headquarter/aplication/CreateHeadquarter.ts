import type { Headquarter } from '../domain/models/Headquarter'
import type { HeadquarterService } from '../domain/services/HeadquarterService'

export class CreateHeadquarter {
  constructor(private readonly headquarterService: HeadquarterService) {}
  async execute(headquarter: Headquarter): Promise<Headquarter> {
    return await this.headquarterService.createHeadquarter(headquarter)
  }
}
