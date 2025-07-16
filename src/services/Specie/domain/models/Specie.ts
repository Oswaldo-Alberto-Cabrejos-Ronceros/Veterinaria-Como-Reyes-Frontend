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

export interface SpecieList {
  specieId: number
  name: string
  status: boolean
}

export interface TopSpeciesByAppointments {
  speciesNames: string[]
  appointmentCounts: number[]
}

export interface TopSpeciesCare {
  speciesLabels: string[]
  totalCounts: number[]
}
