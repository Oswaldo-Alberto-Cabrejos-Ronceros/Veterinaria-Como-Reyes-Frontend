import type { Animal,AnimalByClient,AnimalRequest } from "../models/Animal";

export interface AnimalService{
    getAllAnimals():Promise<Animal[]>;
    getAnimalById(animalId:number):Promise<Animal>;
    getAnimalByClientId(clientId:number):Promise<AnimalByClient[]>;
    createAnimal(animalRequest:AnimalRequest):Promise<void>;
    updateAnimal(animalId:number,animalRequest:AnimalRequest):Promise<void>;
    deleteAnimal(animalId:number):Promise<void>
}
