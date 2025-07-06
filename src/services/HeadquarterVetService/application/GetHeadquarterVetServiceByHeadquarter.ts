import type { HeadquarterVetServiceService } from '../domain/services/HeadquarterVetServiceService'

export class GetHeadquarterVetServiceByHeadquarter {
  constructor(private readonly headquarterVetService: HeadquarterVetServiceService) {}
  async executer(headquarterId: number) {
    return this.headquarterVetService.getByHeadquarter(headquarterId)
  }
}
