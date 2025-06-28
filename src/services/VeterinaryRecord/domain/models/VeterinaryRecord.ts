export interface VeterinaryRecord {
  id: number
  date: string
  nameHeadquarter: string
  nameEmployee: string
  diagnosis: string
  treatment: string
  observation: string
  resultUrl: string
  status: string
}

export interface VeterinaryRecordRequest {
  date: string
  nameHeadquarter: string
  nameEmployee: string
  diagnosis: string
  treatment: string
  observation: string
  resultUrl: string
  status: string
}
