import { VeterinaryService, VeterinaryServiceRequest } from "../models/VeterinaryService";

export interface VeterinaryServiceService {
  getVeterinaryServiceById(id: number): Promise<VeterinaryService>;
  getAllVeterinaryServices(): Promise<VeterinaryService[]>;
  getAllServicesBySpecie(specieId: number): Promise<VeterinaryService[]>;
  getAllServicesByCategory(categoryId: number): Promise<VeterinaryService[]>;
  createVeterinaryService(service: VeterinaryServiceRequest): Promise<VeterinaryService>;
  updateVeterinaryService(id: number, service: VeterinaryServiceRequest): Promise<VeterinaryService>;
  deleteVeterinaryService(id: number): Promise<void>;
}
