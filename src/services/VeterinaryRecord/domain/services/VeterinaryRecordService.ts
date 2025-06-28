import type { VeterinaryRecord, VeterinaryRecordRequest } from '../models/VeterinaryRecord'

export interface VeterinaryRecordService {
  create(veterinaryRecordRequest: VeterinaryRecordRequest): Promise<VeterinaryRecord>
  update(veterinaryRecordRequest: VeterinaryRecordRequest): Promise<VeterinaryRecord>
  findAll(): Promise<VeterinaryRecord[]>
  findById(id: number): Promise<VeterinaryRecord>
  setEnCurso(id: number): Promise<VeterinaryRecord>
  setCompletado(id: number): Promise<VeterinaryRecord>
  setObservacion(id: number): Promise<VeterinaryRecord>
  getAllInfoVeterinaryRecordsByAnimal(
    animalId: number,
    page?: number,
    size?: number,
  ): Promise<VeterinaryRecord[]>
}
