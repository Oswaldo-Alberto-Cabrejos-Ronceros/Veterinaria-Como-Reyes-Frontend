import type { VeterinaryService } from '@/services/VeterinaryService/domain/models/VeterinaryService'

export interface HeadquarterVetService {
  id: number
  headquarterId: number
  service: VeterinaryService
  simultaneousCapacity: number
  status: boolean
}

export interface HeadquarterVetServiceRequest {
  headquarterId: number
  service: {
    serviceId: number
  }

  simultaneousCapacity: number
}
