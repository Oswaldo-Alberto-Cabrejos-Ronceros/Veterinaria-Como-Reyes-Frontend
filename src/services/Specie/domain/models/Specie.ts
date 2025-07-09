export interface Specie {
  specieId: number
  name: string
  imagePath: string
  status: boolean
}

export interface SpecieRequest {
  name: string
  imagePath: string
}

export interface TopSpeciesByAppointments {
  speciesNames: string[]
  appointmentCounts: number[]
}
