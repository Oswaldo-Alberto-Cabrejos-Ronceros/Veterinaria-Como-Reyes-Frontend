import type { VeterinaryService, VeterinaryServiceRequest } from "../models/VeterinaryService";
import type { PageResponse } from '@/services/models/PageResponse'

export interface VeterinaryServiceService {
  getVeterinaryServiceById(id: number): Promise<VeterinaryService>;
  getAllVeterinaryServices(): Promise<VeterinaryService[]>;
  getAllServicesBySpecie(specieId: number): Promise<VeterinaryService[]>;
  getAllServicesByCategory(categoryId: number): Promise<VeterinaryService[]>;
  createVeterinaryService(service: VeterinaryServiceRequest): Promise<VeterinaryService>;
  updateVeterinaryService(id: number, service: VeterinaryServiceRequest): Promise<VeterinaryService>;
  deleteVeterinaryService(id: number): Promise<void>;
  activateVeterinaryService(serviceId: number): Promise<void>
  searchVeterinaryServices(
    page: number,
    size: number,
    filters: {
      name?: string
      specie?: string
      category?: string
      status?: boolean
    },
    sort?: string
  ): Promise<PageResponse<VeterinaryService>>
}
