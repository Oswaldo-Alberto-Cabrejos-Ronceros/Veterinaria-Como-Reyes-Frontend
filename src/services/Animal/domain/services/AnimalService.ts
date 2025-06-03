import type { Animal,AnimalRequest } from "../models/Animal";

export interface AnimalService{
    getAllAnimals():Promise<Animal[]>;
    getAnimalById(animalId:number):Promise<Animal>;
    getAnimalByClientId(clientId:number):Promise<Animal[]>;
    createAnimal(animalRequest:AnimalRequest):Promise<void>;
    updateAnimal(animalId:number,animalRequest:AnimalRequest):Promise<void>;
    deleteAnimal(animalId:number):Promise<void>
}
