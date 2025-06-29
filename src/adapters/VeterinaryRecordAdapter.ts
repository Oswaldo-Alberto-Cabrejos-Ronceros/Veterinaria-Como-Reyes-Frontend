import type { VeterinaryRecord } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import type { VeterinaryRecord as VeterinaryRecordView } from '@/models/VeterinaryRecord'
import type { VeterinaryRecordInfoTable } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import type { VeterinaryRecordInfoTable as VeterinaryRecordInfoTableView } from '@/models/VeterinaryRecordInfoTable'

export class VeterinaryRecordAdapter {
  static toVeterinaryRecordView(veterinaryRecord: VeterinaryRecord): VeterinaryRecordView {
    return {
      id: veterinaryRecord.id,
      careId: veterinaryRecord.careId,
      employeeId: veterinaryRecord.employeeId,
      date: veterinaryRecord.dateCreate,
      diagnosis: veterinaryRecord.diagnosis,
      treatment: veterinaryRecord.treatment,
      observation: veterinaryRecord.observation,
      resultUrl: veterinaryRecord.resultUrl,
      status: veterinaryRecord.statusVeterinaryRecord,
    }
  }
  static fromVetRecordInfoTableToVetRecorIndoTableView(
    veterinaryRecordInfo: VeterinaryRecordInfoTable,
  ): VeterinaryRecordInfoTableView {
    return {
      id: veterinaryRecordInfo.id,
      date: veterinaryRecordInfo.date,
      nameHeadquarter: veterinaryRecordInfo.nameHeadquarter,
      nameEmployee: veterinaryRecordInfo.nameEmployee,
      diagnosis: veterinaryRecordInfo.diagnosis,
      treatment: veterinaryRecordInfo.treatment,
      observation: veterinaryRecordInfo.observation,
      resultUrl: veterinaryRecordInfo.resultUrl,
      status: veterinaryRecordInfo.status,
    }
  }
}
