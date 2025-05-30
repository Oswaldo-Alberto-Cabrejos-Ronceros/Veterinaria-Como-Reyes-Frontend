import type { Headquarter } from '../domain/models/Headquarter'
import type { HeadquarterService } from '../domain/services/HeadquarterService'

export class UpdateHeadquarter {
  constructor(private readonly headquarterService: HeadquarterService) {}

  async execute(headquarterId: number, headquarter: Headquarter): Promise<Headquarter> {
    return await this.headquarterService.updateHeadquarter(headquarterId, headquarter)
  }
}
