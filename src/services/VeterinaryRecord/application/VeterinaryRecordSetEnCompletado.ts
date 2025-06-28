import type { VeterinaryRecordService } from '../domain/services/VeterinaryRecordService'

export class VeterinaryRecordSetEnCompletado {
  constructor(private readonly veterinaryRecordService: VeterinaryRecordService) {}
  async execute(id: number) {
    return this.veterinaryRecordService.setCompletado(id)
  }
}
