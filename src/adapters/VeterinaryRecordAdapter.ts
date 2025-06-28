import type { VeterinaryRecord } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import type { VeterinaryRecord as VeterinaryRecordView } from '@/models/VeterinaryRecord'

export class VeterinaryRecordAdapter {
  static toVeterinaryRecordView(veterinaryRecord: VeterinaryRecord): VeterinaryRecordView {
    return {
      id: veterinaryRecord.id,
      date: veterinaryRecord.date,
      nameHeadquarter: veterinaryRecord.nameHeadquarter,
      nameEmployee: veterinaryRecord.nameEmployee,
      diagnosis: veterinaryRecord.diagnosis,
      treatment: veterinaryRecord.treatment,
      observation: veterinaryRecord.observation,
      resultUrl: veterinaryRecord.resultUrl,
      status: veterinaryRecord.status,
    }
  }
}
