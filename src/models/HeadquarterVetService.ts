import type { Service } from './Service'

export interface HeadquarterVetService {
  id: number
  headquarterId: number
  service: Service
}
