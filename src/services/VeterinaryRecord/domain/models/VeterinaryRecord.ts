export interface VeterinaryRecord {
  id: number
  careId: number
  employeeId:number
  dateCreate: string
  diagnosis: string
  treatment: string
  observation: string
  resultUrl: string
  statusVeterinaryRecord: string
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

export interface VeterinaryRecordInfoTable {
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
