import type { Specie } from '@/services/Specie/domain/models/Specie'
import type { Category } from '@/services/Category/domain/models/Category'

export interface VeterinaryService {
  serviceId: number
  name: string
  description: string
  price: number
  duration: string
  specie: Specie
  category: Category
}

export interface VeterinaryServiceRequest {
  name: string
  description: string
  price: number
  duration: string
  specie: {
    specieId: number
  }
  category: {
    categoryId: number
  }
}
