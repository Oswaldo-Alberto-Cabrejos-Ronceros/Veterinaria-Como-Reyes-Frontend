import type { VeterinaryRecordRequest } from '@/services/VeterinaryRecord/domain/models/VeterinaryRecord'
import { useAsyncHandler } from './useAsyncHandler'
import { veterinaryRecordUsesCases } from '@/dependency-injection/veterinary-record.container'
import { VeterinaryRecordAdapter } from '@/adapters/VeterinaryRecordAdapter'
import type { FormValues as SchemaAddEditVeterinaryRecord } from '@/validation-schemas-forms/schema-add-edit-veterinary-record'

export function useVeterinaryRecord() {
  const { loading, error, runUseCase } = useAsyncHandler()

  const createVeterinaryRecord = async (schemaVeterinaryRecord: SchemaAddEditVeterinaryRecord) => {
   const request = VeterinaryRecordAdapter.fromSchemaToVeterinaryRecordRequest(schemaVeterinaryRecord)
    const veterinaryRecord = await runUseCase('createVeterinaryRecord', () =>
      veterinaryRecordUsesCases.createVeterinaryRecord.execute(request),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const findAllVeterinaryRecord = async () => {
    const veterinaryRecords = await runUseCase('findAllVeterinaryRecord', () =>
      veterinaryRecordUsesCases.findAllVeterinaryRecord.execute(),
    )
    return veterinaryRecords.map((veterinaryRecord) =>
      VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord),
    )
  }

  const findVeterinaryRecordById = async (id: number) => {
    const veterinaryRecord = await runUseCase('findVeterinaryRecordById', () =>
      veterinaryRecordUsesCases.findVeterinaryRecordById.execute(id),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const getAllInfoVeterinaryRecordsByPet = async (petId: number) => {
    const pageVeterinaryRecords = await runUseCase('getAllInfoVeterinaryRecordsByPet', () =>
      veterinaryRecordUsesCases.getAllInfoVeterinaryRecordsByAnimal.execute(petId),
    )
    const veterinaryRecords = pageVeterinaryRecords.content
    return veterinaryRecords.map((veterinaryRecord) =>
      VeterinaryRecordAdapter.fromVetRecordInfoTableToVetRecorIndoTableView(veterinaryRecord),
    )
  }

  const updateVeterinaryRecord = async (
    id: number,
    veterinaryRecordRequest: VeterinaryRecordRequest,
  ) => {
    const veterinaryRecord = await runUseCase('updateVeterinaryRecord', () =>
      veterinaryRecordUsesCases.updateVeterinaryRecord.execute(id, veterinaryRecordRequest),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const setVeterinaryRecordCompletado = async (id: number) => {
    const veterinaryRecord = await runUseCase('setVeterinaryRecordCompletado', () =>
      veterinaryRecordUsesCases.setVeterinaryRecordCompletado.execute(id),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const setVeterinaryRecordEnCurso = async (id: number) => {
    const veterinaryRecord = await runUseCase('setVeterinaryRecordEnCurso', () =>
      veterinaryRecordUsesCases.setVeterinaryRecordEnCurso.execute(id),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  const setVeterinaryRecordObservacion = async (id: number) => {
    const veterinaryRecord = await runUseCase('setVeterinaryRecordObservacion', () =>
      veterinaryRecordUsesCases.setVeterinaryRecordObservacion.execute(id),
    )
    return VeterinaryRecordAdapter.toVeterinaryRecordView(veterinaryRecord)
  }

  return {
    loading,
    error,
    createVeterinaryRecord,
    findAllVeterinaryRecord,
    findVeterinaryRecordById,
    getAllInfoVeterinaryRecordsByPet,
    updateVeterinaryRecord,
    setVeterinaryRecordCompletado,
    setVeterinaryRecordEnCurso,
    setVeterinaryRecordObservacion,
  }
}
